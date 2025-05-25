export interface FeaturedGame {
  id: string;
  coverImage: string;
  title: string;
  description: string;
  category: string;
}

export interface PopularGame {
  id: string;
  coverImage: string;
  title: string;
  description: string;
  rating: number;
}

export interface GameCategory {
  id: string;
  icon: string;
  name: string;
}

export const featuredGames: FeaturedGame[] = [
  {
    id: '1',
    coverImage: 'https://space.coze.cn/api/coze_space/gen_image?image_size=portrait_4_3&prompt=action%20game%20cover&sign=839401fd0ec036a78886493462263016',
    title: 'Adventure World',
    description: 'Explore mysterious dungeons and ancient ruins',
    category: 'Adventure'
  },
  {
    id: '2',
    coverImage: 'https://space.coze.cn/api/coze_space/gen_image?image_size=portrait_4_3&prompt=strategy%20game%20cover&sign=610ced9dbf4e5e963c3025b5a170e2ff',
    title: 'Empire Domination',
    description: 'Build your empire and conquer the world',
    category: 'Strategy'
  },
  {
    id: '3',
    coverImage: 'https://space.coze.cn/api/coze_space/gen_image?image_size=portrait_4_3&prompt=sports%20game%20cover&sign=892cce9c839f85662b541a993619482a',
    title: 'Extreme Sports',
    description: 'Experience various thrilling extreme sports',
    category: 'Sports'
  },
  {
    id: '4',
    coverImage: 'https://space.coze.cn/api/coze_space/gen_image?image_size=portrait_4_3&prompt=puzzle%20game%20cover&sign=ff3c55363dd214c350c0719527f2e7b3',
    title: 'Brain Challenge',
    description: 'Solve various complex puzzles',
    category: 'Puzzle'
  }
];

export const popularGames: PopularGame[] = [
  {
    id: '5',
    coverImage: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=rpg%20game%20cover&sign=31e4c64735636eae62d7cfbd30875496',
    title: 'Magic Legend',
    description: 'Play as a wizard to save the world',
    rating: 5
  },
  {
    id: '6',
    coverImage: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=racing%20game%20cover&sign=4867f74f6d83e93cc9c1c1d7fada059b',
    title: 'Speed Rush',
    description: 'Experience the most exciting racing',
    rating: 4
  },
  {
    id: '7',
    coverImage: 'https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=shooter%20game%20cover&sign=bd8d5afbb1eb2a23e1b029c5ce139de1',
    title: 'Star Warrior',
    description: 'Fight aliens in outer space',
    rating: 4
  }
];

export const gameCategories: GameCategory[] = [
  { id: '1', icon: 'fa-solid fa-swords', name: 'Action' },
  { id: '2', icon: 'fa-solid fa-chess', name: 'Strategy' },
  { id: '3', icon: 'fa-solid fa-futbol', name: 'Sports' },
  { id: '4', icon: 'fa-solid fa-puzzle-piece', name: 'Puzzle' },
  { id: '5', icon: 'fa-solid fa-car', name: 'Racing' },
  { id: '6', icon: 'fa-solid fa-hat-wizard', name: 'RPG' }
];
