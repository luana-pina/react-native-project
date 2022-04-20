export const DUMMY_DATA = {
  types: [
    {
      id: 1,
      type: "Lotofácil",
      description:
        "Escolha 15 números para apostar na lotofácil. Você ganha acertando 11, 12, 13, 14 ou 15 números. São muitas chances de ganhar, e agora você joga de onde estiver!",
      range: 25,
      price: 2.5,
      max_number: 15,
      color: "#7F3992",
    },
    {
      id: 2,
      type: "Mega-Sena",
      description:
        "Escolha 6 números dos 60 disponíveis na mega-sena. Ganhe com 6, 5 ou 4 acertos. São realizados dois sorteios semanais para você apostar e torcer para ficar milionário.",
      range: 60,
      price: 4.5,
      max_number: 6,
      color: "#01AC66",
    },
    {
      id: 3,
      type: "Quina",
      description:
        "Escolha 5 números dos 80 disponíveis na quina. 5, 4, 3 ou 2 acertos. São seis sorteios semanais e seis chances de ganhar.",
      range: 80,
      price: 2,
      max_number: 5,
      color: "#F79C31",
    },
  ],
};

export const DUMMY_BETS = [
  {
    id: 1,
    user_id: 1,
    game_id: 1,
    choosen_numbers: "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15",
    price: 2.5,
    created_at: "2022-03-03T14:40:07.000-03:00",
    type: {
      id: 1,
      type: "Lotofácil",
    },
  },
  {
    id: 2,
    user_id: 1,
    game_id: 2,
    choosen_numbers: "1,2,3,4,5,6",
    price: 4.5,
    created_at: "2022-03-03T14:40:07.000-03:00",
    type: {
      id: 2,
      type: "Mega-Sena",
    },
  },
  {
    id: 3,
    user_id: 1,
    game_id: 2,
    choosen_numbers: "1,2,3,4,5,6",
    price: 4.5,
    created_at: "2022-03-03T14:40:07.000-03:00",
    type: {
      id: 2,
      type: "Mega-Sena",
    },
  },
  {
    id: 4,
    user_id: 1,
    game_id: 2,
    choosen_numbers: "1,2,3,4,5,6",
    price: 4.5,
    created_at: "2022-03-03T14:40:07.000-03:00",
    type: {
      id: 2,
      type: "Mega-Sena",
    },
  },
  {
    id: 5,
    user_id: 1,
    game_id: 2,
    choosen_numbers: "1,2,3,4,5,6",
    price: 4.5,
    created_at: "2022-03-03T14:40:07.000-03:00",
    type: {
      id: 2,
      type: "Mega-Sena",
    },
  },
  {
    id: 6,
    user_id: 1,
    game_id: 3,
    choosen_numbers: "1,2,3,4,5",
    price: 2,
    created_at: "2022-03-03T14:40:07.000-03:00",
    type: {
      id: 3,
      type: "Quina",
    },
  },
  {
    id: 7,
    user_id: 1,
    game_id: 2,
    choosen_numbers: "1,2,3,4,5,6",
    price: 4.5,
    created_at: "2022-03-03T14:40:07.000-03:00",
    type: {
      id: 2,
      type: "Mega-Sena",
    },
  },
  {
    id: 8,
    user_id: 1,
    game_id: 2,
    choosen_numbers: "1,2,3,4,5,6",
    price: 4.5,
    created_at: "2022-03-03T14:40:07.000-03:00",
    type: {
      id: 2,
      type: "Mega-Sena",
    },
  },
];
