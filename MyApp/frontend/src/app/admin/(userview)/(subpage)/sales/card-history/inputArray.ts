export function getInputArray(): IInputObj[] {
  return [
    {
      comp: "Select",
      label: "Tình trạng *",
      name: "status",
      options: [
        {
          id: 99,
          title: "Đang chờ",
        },
        {
          id: 1,
          title: "Thành công",
        },
        {
          id: 2,
          title: "Sai Mệnh Giá",
        },
        {
          id: 3,
          title: "Thất bại",
        },
      ],
      isRequired: true,
    },
    {
      comp: "TextInput",
      label: "Username",
      name: "username",
      type: "text",
      placeholder: "Nhập tên hợp lệ...",
      isRequired: false,
    },
    {
      comp: "TextInput",
      label: "Seri Thẻ",
      name: "serial",
      type: "number",
      placeholder: "Nhập tên hợp lệ...",
      isRequired: false,
    },
    {
      comp: "TextInput",
      label: "Mệnh giá nhận được",
      name: "card_value",
      type: "number",
      placeholder: "Nhập tên hợp lệ...",
      isRequired: false,
    },
  ];
}
