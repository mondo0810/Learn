export function formatDateTime(date: Date | undefined): string {
  const options: Intl.DateTimeFormatOptions = {
    hour12: false,
    timeZone: "Asia/Ho_Chi_Minh",
    dateStyle: "short",
    timeStyle: "short",
  };

  if (date instanceof Date && !isNaN(date.getTime())) {
    return new Intl.DateTimeFormat("vi-VN", options).format(date);
  } else {
    // If date is not provided or invalid, create a random date
    const randomDate = new Date(
      Date.now() + Math.floor(Math.random() * 100) * 24 * 60 * 60 * 1000 // Adding random number of days
    );
    return new Intl.DateTimeFormat("vi-VN", options).format(randomDate);
  }
}

export function formatCurrency(amount: number = 0, suffix: string = "đ"): string {
  let unit = "";

  if (amount >= 1000000000) {
    unit = "M";
    amount = Math.round(amount / 1000000);
  } else if (amount >= 1000000) {
    unit = "K";
    amount = Math.round(amount / 1000);
  }

  return new Intl.NumberFormat("vi-VN").format(Math.round(amount)) + unit + " " + suffix;
}

export function formatLink(str: string): string {
  str = str.toLowerCase();
  str = str.normalize("NFD").replace(/[\u0300-\u036f]/g, ""); // xóa các ký tự dấu sau khi tách tổ hợp
  str = str.replace(/[đĐ]/g, "d"); // Thay ký tự đĐ
  str = str.replace(/([^0-9a-z-\s])/g, ""); // Xóa ký tự đặc biệt
  str = str.replace(/(\s+)/g, "-"); // Xóa khoảng trắng thay bằng ký tự -
  str = str.replace(/-+/g, "-"); // Xóa ký tự - liên tiếp
  str = str.replace(/^-+|-+$/g, ""); // xóa phần dư - ở đầu & cuối

  return str;
}

export function formatTimeAgo(date: Date) {
  const seconds = Math.floor((new Date().valueOf() - date.valueOf()) / 1000);

  const days = Math.floor(seconds / 86400);
  if (days > 1) {
    return `${days} ngày trước`;
  }
  if (days === 1) {
    return "1 ngày trước";
  }

  const hours = Math.floor(seconds / 3600);
  if (hours > 1) {
    return `${hours} giờ trước`;
  }
  if (hours === 1) {
    return "1 giờ trước";
  }

  const minutes = Math.floor(seconds / 60);
  if (minutes > 1) {
    return `${minutes} phút trước`;
  }
  if (minutes === 1) {
    return "1 phút trước";
  }

  return "Vừa rồi";
}
