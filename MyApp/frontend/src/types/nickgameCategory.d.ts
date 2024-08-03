interface INickgameCategory {
  id: number;
  archive?: string;
  thumb_img?: string;
  title: string;
  notice?: string;
  description?: string;
  random: boolean;
  price: number;
  display: boolean;
  sold_out?: number;
  total_available?: number;
}
