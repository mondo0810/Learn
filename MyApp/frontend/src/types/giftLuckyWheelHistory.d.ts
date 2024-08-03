interface IGiftLuckyWheelHistory {
  id: number;
  username: string;
  name: string;
  status: number;
  created_at: string;
}

interface IGiftLuckyWheelHistoryByUID {
  fullname?: string;
  username?: string;
  name: string;
  status: number;
  created_at: Date;
}
