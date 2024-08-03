// Utils.js

export function getStatusText(status: number) {
  switch (status) {
    case 1:
      return "Thẻ đúng";
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

export function getStatusColorClass(status: number) {
  switch (status) {
    case 1:
      return "text-green-500"; // Set the text color for "Thẻ đúng"
    case 2:
      return "text-red-500"; // Set the text color for "Sai mệnh giá"
    case 3:
      return "text-yellow-500"; // Set the text color for "Thẻ không dùng được"
    case 99:
      return "text-blue-500"; // Set the text color for "Thẻ chờ xử lý"
    default:
      return "text-gray-500"; // Set a default text color for unknown status
  }
}
