import axios from "@/services/axios";

export async function getInputArray(): Promise<IInputObj[]> {
  return [
    {
      comp: "TextInput",
      label: "Tên ingame",

      name: "ingame",
      type: "text",
      placeholder: "Nhập ingame...",
      isRequired: false,
    },
    {
      comp: "TextInput",
      label: "Mật khẩu",
      name: "password",
      type: "text",
      placeholder: "Nhập mật khẩu đăng nhập...",
      isRequired: false,
    },
    {
      comp: "FileInput",
      label: "File nick game",
      helperText: "* Lưu ý: Sử dụng file .txt có dạng taikhoan|matkhau và xuống dòng cho mỗi tài khoản",
      name: "file",
      isMultiple: false,
      isRequired: false,
    },
    {
      comp: "Select",
      label: "Game *",
      name: "game",
      isRequired: true,
      options: ["Liên Quân Mobile", "Tốc Chiến", "Free Fire", "Tài khoản ROBUX", "Liên Minh Huyền Thoại"],
    },
    {
      comp: "Select",
      label: "Danh mục tài khoản",
      name: "category_id",
      isRequired: true,
      options: (await axios.get("/nickgame-category/public/title?type=random")).data.data,
    },
  ];
}
