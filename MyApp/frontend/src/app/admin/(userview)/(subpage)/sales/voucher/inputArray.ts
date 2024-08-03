export function getInputArray(): IInputObj[] {
    return [
        {
            comp: "TextInput",
            label: "Mã giảm giá *",
            name: "code",
            type: "text",
            placeholder: "summer-50",
            isRequired: true
        },
        {
            comp: "TextInput",
            label: "% giảm giá *",
            name: "discount",
            type: "number",
            placeholder: "50",
            isRequired: true
        },
        {
            comp: "TextInput",
            label: "Giới hạn dùng",
            name: "quantity",
            type: "number",
            placeholder: "100",
            isRequired: false
        },
        {
            comp: "Select",
            label: "Có sẵn *",
            name: "available",
            options: [
                {
                    id: 0,
                    title: "Không"
                },
                {
                    id: 1,
                    title: "Có"
                },
            ],
            isRequired: true
        },
    ];
}