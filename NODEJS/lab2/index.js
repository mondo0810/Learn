const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public'));
console.log(__dirname);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/home.html');
});

app.use('*', (req, res) => {
    res.send('404 Not Found');
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});