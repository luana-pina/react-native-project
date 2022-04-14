import { ICardGame, IGame, ICardGameCart } from ".";
import { ICardRecentsGames } from "./Games";

interface card {
  clear: boolean;
  card: {
    id: number;
    choosen_numbers: number[];
    price: number;
    type: { type: string; id: number };
  };
}
interface cart {
  min_cart_value: number;
  cardGames: Array<ICardGameCart>;
  totalAmound: 0;
}
interface games {
  gamesType: Array<IGame>;
  recentGames: Array<ICardRecentsGames>;
  gameSelected: {
    id: number;
    type: string;
    description: string;
    range: number;
    price: number;
    max_number: number;
    color: string;
  };
}
interface login {
  isLogin: boolean;
  token: string | undefined;
}
interface ui {
  isMobileHome: boolean;
  isMobileBase: boolean;
  isMobileGames: boolean;
  isMobileHeader: boolean;
}
export interface IRootState {
  cart: cart;
  games: games;
  cardGame: card;
  login: login;
  ui: ui;
}
