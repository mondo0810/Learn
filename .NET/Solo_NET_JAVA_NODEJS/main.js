let data = [];
let autoSendInterval;

function clearData() {
    data = [];
    clearInterval(autoSendInterval);
    d3.select("#chart").selectAll("*").remove();
}

async function sendRequests() {
    const n = document.getElementById('inputN').value;
    const parsedN = parseInt(n);

    if (parsedN > 50) {
        Swal.fire({
            icon: 'error',
            title: 'Lỗi',
            text: 'Vui lòng nhập một số nhỏ hơn hoặc bằng 50.',
        });
        return;
    }

    if (parsedN > 39) {
        const confirmResult = await Swal.fire({
            icon: 'warning',
            title: 'Xác nhận',
            text: `Bạn có chắc chắn muốn sử dụng số ${parsedN} không? Số lớn hơn 39 có thể bị treo khá lâu.`,
            showCancelButton: true,
            confirmButtonText: 'Đồng ý',
            cancelButtonText: 'Hủy bỏ',
        });

        if (!confirmResult.isConfirmed) {
            return;
        }
    }

    const javaUrl = `http://localhost:8080/java?n=${n}`;
    const netUrl = `http://localhost:5000/net?n=${n}`;
    const nodeUrl = `http://localhost:3000/node?n=${n}`;
    const phpUrl = `http://localhost:8000/php?n=${n}`; // Laravel API URL

    try {
        const [javaResponse, netResponse, nodeResponse, phpResponse] = await Promise.all([
            fetch(javaUrl).then(response => response.json()),
            fetch(netUrl).then(response => response.json()),
            fetch(nodeUrl).then(response => response.json()),
            fetch(phpUrl).then(response => response.json()) // Fetch Laravel API
        ]);

        const currentTime = new Date().toISOString(); // Current time
        document.getElementById('javaResult').innerText = `Spring boot API: ${javaResponse.message} | Time: ${javaResponse.timeTaken} | Time: ${currentTime}`;
        document.getElementById('netResult').innerText = `.NET API: ${netResponse.message} | Time: ${netResponse.timeTaken} | Time: ${currentTime}`;
        document.getElementById('nodeResult').innerText = `ExpressJS API: ${nodeResponse.message} | Time: ${nodeResponse.timeTaken} | Time: ${currentTime}`;
        document.getElementById('phpResult').innerText = `Laravel API: ${phpResponse.message} | Time: ${phpResponse.timeTaken} | Time: ${currentTime}`;

        // Add new data to the array
        data.push({
            api: 'Spring boot API',
            timeTaken: parseFloat(javaResponse.timeTaken),
            timestamp: currentTime
        });
        data.push({
            api: '.NET API',
            timeTaken: parseFloat(netResponse.timeTaken),
            timestamp: currentTime
        });
        data.push({
            api: 'ExpressJS API',
            timeTaken: parseFloat(nodeResponse.timeTaken),
            timestamp: currentTime
        });
        data.push({
            api: 'Laravel API',
            timeTaken: parseFloat(phpResponse.timeTaken),
            timestamp: currentTime
        });

        // Draw charts based on updated data
        drawChart();
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}


function autoSendRequests() {
    if (autoSendInterval) {
        clearInterval(autoSendInterval);
    }
    const minRange = parseInt(document.getElementById('minRange').value);
    const maxRange = parseInt(document.getElementById('maxRange').value);
    const time = parseInt(document.getElementById('rangeInputTime').value);

    autoSendInterval = setInterval(() => {
        const randomN = Math.floor(Math.random() * (maxRange - minRange + 1)) + minRange;
        document.getElementById('inputN').value = randomN;
        sendRequests();
        console.log(time * 10)
    }, (100 - time) * 10);
}

function stopAutoSend() {
    clearInterval(autoSendInterval);
}

function drawChart() {
    // Clear existing chart
    d3.select("#chart").selectAll("*").remove();

    const color = d3.scaleOrdinal()
        .domain(['Spring boot API', '.NET API', 'ExpressJS API', 'Laravel API']) // Include Laravel API
        .range(['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728']); // Add a color for PHP

    const margin = { top: 50, right: 30, bottom: 120, left: 60 };
    const width = 800 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    // Create SVG for line chart
    const svgLine = d3.select("#chart")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    // Create SVG for bar chart
    const svgBar = d3.select("#chart")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    const parseTime = d3.timeParse("%Y-%m-%dT%H:%M:%S.%LZ");

    const line = d3.line()
        .x(d => x(parseTime(d.timestamp)))
        .y(d => y(d.timeTaken));

    const x = d3.scaleTime()
        .domain(d3.extent(data, d => parseTime(d.timestamp)))
        .range([0, width]);

    const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.timeTaken)])
        .nice()
        .range([height, 0]);

    // Function to update chart on zoom
    function zoomed(event) {
        const xz = event.transform.rescaleX(x);
        svgLine.select(".x-axis").call(d3.axisBottom(xz).ticks(5));
        svgLine.selectAll(".line")
            .attr("d", d => line(d)); // Update line path
        svgLine.selectAll(".time-label")
            .attr("x", d => xz(parseTime(d.timestamp)) + 5); // Update time labels

        // Update gridlines
        svgLine.select(".grid")
            .call(makeXGridlines(xz)
                .tickSize(-height)
                .tickFormat("")
            );
    }

    // Zoom behavior
    const zoom = d3.zoom()
        .scaleExtent([1, 10])
        .translateExtent([[0, 0], [width, height]])
        .extent([[0, 0], [width, height]])
        .on("zoom", zoomed);

    // Append a rectangular overlay for zoom
    svgLine.append("rect")
        .attr("class", "zoom-pane")
        .attr("width", width)
        .attr("height", height)
        .attr("fill", "none")
        .attr("pointer-events", "all")
        .call(zoom);

    // Append X gridlines
    svgLine.append("g")
        .attr("class", "grid")
        .attr("transform", `translate(0, ${height})`)
        .call(makeXGridlines(x)
            .tickSize(-height)
            .tickFormat("")
        );

    svgLine.append("g")
        .attr("class", "x-axis")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x).ticks(5))
        .selectAll("text")
        .attr("transform", "rotate(-45)")
        .style("text-anchor", "end");

    svgLine.append("g")
        .call(d3.axisLeft(y));

    // Draw lines
    svgLine.selectAll(".line")
        .data([
            data.filter(d => d.api === 'Spring boot API'),
            data.filter(d => d.api === '.NET API'),
            data.filter(d => d.api === 'ExpressJS API'),
            data.filter(d => d.api === 'Laravel API') // Filter Laravel API data
        ])
        .enter()
        .append("path")
        .attr("class", "line")
        .attr("fill", "none")
        .attr("stroke", d => color(d[0].api))
        .attr("stroke-width", 3)
        .attr("d", d => line(d));

    // Draw time labels
    svgLine.selectAll(".time-label")
        .data(data)
        .enter()
        .append("text")
        .attr("class", "time-label")
        .attr("x", d => x(parseTime(d.timestamp)) + 5)
        .attr("y", d => y(d.timeTaken) - 10)
        .text(d => `${formatTime(parseTime(d.timestamp))} - ${d.timeTaken}ms`)
        .attr("font-size", "12px")
        .attr("fill", d => color(d.api));

    // Draw average timeTaken bar chart
    const apiGroups = d3.group(data, d => d.api);
    const apiAverages = Array.from(apiGroups, ([api, values]) => ({
        api: api,
        averageTime: d3.mean(values, d => d.timeTaken)
    }));

    const xBar = d3.scaleBand()
        .domain(apiAverages.map(d => d.api))
        .range([0, width])
        .padding(0.2);

    const yBar = d3.scaleLinear()
        .domain([0, d3.max(apiAverages, d => d.averageTime)])
        .nice()
        .range([height, 0]);

    svgBar.append("g")
        .selectAll(".bar")
        .data(apiAverages)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", d => xBar(d.api))
        .attr("y", d => yBar(d.averageTime))
        .attr("width", xBar.bandwidth())
        .attr("height", d => height - yBar(d.averageTime))
        .attr("fill", d => color(d.api))


    svgBar.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(xBar))
        .selectAll("text")
        .attr("transform", "rotate(-45)")
        .style("text-anchor", "end");

    // Display average time as text
    svgBar.selectAll(".average-time-label")
        .data(apiAverages)
        .enter()
        .append("text")
        .attr("class", "average-time-label")
        .attr("x", d => xBar(d.api) + xBar.bandwidth() / 2)
        .attr("y", d => yBar(d.averageTime) - 10)
        .text(d => `Average Time: ${d.averageTime.toFixed(2)} ms`)
        .attr("text-anchor", "middle")
        .attr("font-size", "14px")
        .attr("fill", "black");

    // Legend remains the same as before
    const legend = d3.select("body").select(".legend");
    legend.selectAll(".legend-item").remove();

    legend.selectAll(".legend-item")
        .data(color.domain())
        .enter()
        .append("div")
        .attr("class", "legend-item")
        .html(d => `<div style="background-color: ${color(d)};"></div><span>${d}</span>`);
}

// Helper function to create X gridlines
function makeXGridlines(x) {
    return d3.axisBottom(x).ticks(5);
}



function formatTime(time) {
    const hours = time.getHours().toString().padStart(2, '0');
    const minutes = time.getMinutes().toString().padStart(2, '0');
    const seconds = time.getSeconds().toString().padStart(2, '0');

    return `${hours}:${minutes}:${seconds}`;
}
