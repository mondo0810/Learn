import axios from "@/services/axios";

export async function getInputArray(): Promise<IInputObj[]> {
  return [
    {
      comp: "TextInput",
      label: "Tên danh mục *",
      name: "title",
      type: "text",
      placeholder: "Nhập tên hợp lệ...",
      isRequired: true,
    },
    {
      comp: "FileInput",
      label: "Ảnh minh họa",
      name: "thumb_img",
      isMultiple: false,
      isRequired: false,
    },
    {
      comp: "TextInput",
      label: "Chú thích danh mục",
      name: "notice",
      type: "text",
      placeholder: "V.D: siêu rẻ 10.000 đ",
      isRequired: false,
    },
    {
      comp: "Textarea",
      label: "Mô tả danh mục",
      name: "description",
      placeholder: "Nhập mô tả hợp lệ...",
      isRequired: false,
    },
    {
      comp: "Select",
      label: "Danh sách lưu trữ",
      name: "archive_id",
      options: (await axios.get("/archive/public/title")).data.data,
      isRequired: false,
    },
    {
      comp: "Select",
      label: "Chế độ hiển thị *",
      helperText: "* Cho phép hiển thị ngẫu nhiên và đồng giá nick",
      name: "random",
      options: [
        {
          id: 0,
          title: "Thông thường",
        },
        {
          id: 1,
          title: "Ngẫu nhiên",
        },
      ],
      isRequired: true,
    },
    {
      comp: "TextInput",
      label: "Đồng giá",
      helperText: "* Đồng giá chỉ áp dụng cho chế độ hiển thị ngẫu nhiên",
      name: "price",
      type: "number",
      placeholder: "V.D: 10.000 đ",
      isRequired: false,
    },
    {
      comp: "Select",
      label: "Xuất hiện trang chủ *",
      helperText: "* Ẩn đi nếu lựa chọn danh sách nick này làm phần thưởng game",
      name: "display",
      options: [
        {
          id: 1,
          title: "Có",
        },
        {
          id: 0,
          title: "Ẩn",
        },
      ],
      isRequired: true,
    },
  ];
}
