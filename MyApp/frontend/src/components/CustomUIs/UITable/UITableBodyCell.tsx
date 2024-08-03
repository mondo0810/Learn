import React from "react";

interface IProps {
  responsive?: boolean;
  children: string | number | React.ReactNode;
  status?: number; // Thêm prop trạng thái
}

export default function UITableBodyCell({ responsive = false, children, status }: IProps) {
  let statusColor = ""; // Màu mặc định

  switch (status) {
    case 1:
      statusColor = "green"; // Thẻ đúng
      break;
    case 2:
      statusColor = "purple"; // Sai mệnh giá
      break;
    case 3:
      statusColor = "red"; // Thẻ sai or không dùng được
      break;
    case 4:
      statusColor = "brown"; // Bảo trì
      break;
    case 99:
      statusColor = "orange"; // Thẻ chờ xử lý
      break;
    default:
      break;
  }

  return (
    <td className={`px-2 py-2 ${responsive && "hidden md:block"}`} style={{ color: statusColor }}>
      {children}
    </td>
  );
}
