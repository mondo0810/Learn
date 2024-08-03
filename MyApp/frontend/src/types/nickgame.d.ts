interface INickgame {
  nid: string;
  category_id?: number;
  title: string;
  thumb_img?: string;
  ingame: string;
  password: string;
  price: number;
  champs_count: number;
  skins_count: number;
  rank?: string;
  status?: string;
  game: string;
  available?: boolean;
}

interface INickgameByUID {
  ingame: string;
  password: string;
  game: string;
  created_at: string;
}

interface ICreateNickgame {
  category_id: number;
  title: string;
  thumb_img: string;
  detail_imgs: string[];
  ingame: string;
  password: string;
  price: number;
  champs_count: number;
  skins_count: number;
  rank: string;
  status: string;
  game: string;
}
