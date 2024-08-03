export function getInputArray(): IInputObj[] {
  return [
    {
      comp: "TextInput",
      label: "ingame",
      name: "ingame",
      type: "text",
      placeholder: "Nhập ingame...",
      isRequired: false,
    },
    {
      comp: "TextInput",
      label: "Tài khoản",
      name: "username",
      type: "text",
      placeholder: "Nhập tài khoản đăng nhập...",
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
          title: "Đang xử lý",
        },
        {
          id: 1,
          title: "Thành công",
        },
        {
          id: -1,
          title: "Thất bại",
        },
      ],
    },
  ];
}
