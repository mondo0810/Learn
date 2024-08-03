export function getStatus(status: number) {
  switch (status) {
    case 1:
      return "Thành công";
    case 2:
      return "Sai mệnh giá";
    case 3:
      return "Thẻ không dùng được";
    case 99:
      return "Thẻ chờ xử lý";
    default:
      return "Unknown Status";
  }
}
