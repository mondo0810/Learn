export function getInputArray(): IInputObj[] {
    return [
        {
            comp: "TextInput",
            label: "Idgame",
            name: "idgame",
            type: "text",
            placeholder: "Nhập idgame...",
            isRequired: false,
        },
        {
            comp: "TextInput",
            label: "Tài khoản",
            name: "game_account",
            type: "text",
            placeholder: "Nhập tài khoản đăng nhập...",
            isRequired: false,
        },
        {
            comp: "TextInput",
            label: "Mật khẩu",
            name: "game_password",
            type: "text",
            placeholder: "Nhập mật khẩu đăng nhập...",
            isRequired: false,
        },
        {
            comp: "Select",
            label: "Trạng thái *",
            name: "status",
            isRequired: true,
            options: [
                {
                    id: 0,
                    title: "Đang xử lý"
                },
                {
                    id: 1,
                    title: "Thành công"
                },
                {
                    id: -1,
                    title: "Thất bại"
                }
            ]
        }
    ];
}