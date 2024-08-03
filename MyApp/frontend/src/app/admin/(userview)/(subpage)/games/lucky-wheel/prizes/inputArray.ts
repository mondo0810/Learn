import axios from "@/services/axios";

export async function getInputArray(): Promise<IInputObj[]> {
    return [
        {
            comp: "Select",
            label: "Danh sách vòng quay",
            name: "luckyWheel_id",
            options: (await axios.get("/luckywheel-game/public/name")).data.data,
            isRequired: false
        },
        {
            comp: "TextInput",
            label: "Tên phần thưởng *",
            name: "name",
            type: "text",
            placeholder: "Nhập tên hợp lệ...",
            isRequired: true,
        },
        {
            comp: "Select",
            label: "Kiểu phần thưởng *",
            name: "type",
            options: [
                {
                    id: 1,
                    title: "Xu khóa"
                },
                {
                    id: 2,
                    title: "Tài khoản"
                },
            ],
            isRequired: true
        },
        {
            comp: "TextInput",
            label: "Số quân huy",
            name: "value",
            type: "number",
            placeholder: "Nhập số quân huy hợp lệ...",
            helperText: "* Chỉ nhập khi chọn kiểu phần thưởng: xu khóa. Nhập 0 để ra ngẫu nhiên",
            isRequired: false,
        },
        {
            comp: "Select",
            label: "Danh sách nickgame",
            name: "nickgame_category_id",
            options: (await axios.get("/nickgame-category/public/title?type=random")).data.data,
            helperText: "* Chỉ chọn khi chọn kiểu phần thưởng: tài khoản",
            isRequired: false
        },
        {
            comp: "TextInput",
            label: "Xác suất trúng *",
            name: "probability",
            type: "number",
            placeholder: "Nhập xác suất hợp lệ...",
            helperText: "* Tổng xác suất các phần thưởng của vòng quay luôn = 100",
            isRequired: true,
        }
    ];
}