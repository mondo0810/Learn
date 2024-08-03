export const inputArr: IInputObj[] = [
    {
        comp: "TextInput",
        label: "Tên người dùng *",
        name: "username",
        type: "text",
        placeholder: "Nhập tên hợp lệ...",
        isRequired: true,
    },
    {
        comp: "TextInput",
        label: "Mật khẩu mới",
        name: "password",
        type: "text",
        placeholder: "Nhập mật khẩu hợp lệ...",
        isRequired: false,
    },
    {
        comp: "TextInput",
        label: "Tên đầy đủ",
        name: "fullname",
        type: "text",
        placeholder: "Nhập tên hợp lệ...",
        isRequired: false,
    },
    {
        comp: "TextInput",
        label: "Email",
        name: "email",
        type: "email",
        placeholder: "V.D: vi_du@chilavidu.com",
        isRequired: false,
    },
    {
        comp: "TextInput",
        label: "Số điện thoại",
        name: "phone",
        type: "number",
        placeholder: "V.D: vi_du@chilavidu.com",
        isRequired: false,
    },
    {
        comp: "TextInput",
        label: "Số dư",
        name: "balance",
        type: "number",
        isRequired: false,
    },
    {
        comp: "TextInput",
        label: "Số xu",
        name: "coin",
        type: "number",
        isRequired: false,
    },
    {
        comp: "Select",
        label: "Vai trò *",
        name: "role",
        options: [
            {
                id: 0,
                title: "Thành viên"
            },
            {
                id: 1,
                title: "Cộng tác viên"
            },
            {
                id: 2,
                title: "Quản trị viên"
            }
        ],
        isRequired: true
    },
    {
        comp: "Select",
        label: "Tình trạng *",
        name: "active",
        options: [
            {
                id: 0,
                title: "Ngừng hoạt động"
            },
            {
                id: 1,
                title: "Đang hoạt động"
            }
        ],
        isRequired: true
    },
];