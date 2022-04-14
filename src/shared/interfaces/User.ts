export interface IAccountResponse {
  id: number;
  email: string;
  is_admin: number;
  name: string;
  token: string;
  token_created_at: Date;
  created_at: Date;
  updated_at: Date;
  bets: IAccountGamesRequest[];
  picture: null;
}

export interface IAccountGamesRequest {
  id: number;
  choosen_numbers: string;
  user_id: number;
  game_id: number;
  price: number;
  created_at: Date;
  updated_at: Date;
}
