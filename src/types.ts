export type Category =
  | 'Taco Tuesday'
  | 'Game Day'
  | 'Recovery Smoothies'
  | 'Breakfast'
  | 'Family Dinner';

export const CATEGORIES: Category[] = [
  'Taco Tuesday',
  'Game Day',
  'Recovery Smoothies',
  'Breakfast',
  'Family Dinner',
];

export interface Recipe {
  id: string;
  name: string;
  category: Category;
  description: string;
  image: string;
  prepMinutes: number;
  cookMinutes: number;
  servings: number;
  ingredients: string[];
  steps: string[];
  lebronNote?: string;
}

export type TrophyKind =
  | 'championship'
  | 'finals-mvp'
  | 'mvp'
  | 'roty'
  | 'milestone';

export interface Trophy {
  kind: TrophyKind;
  label: string;
  years: string[];
}

export interface EraAccent {
  primary: string;
  secondary: string;
  bg: string;
}

export interface Era {
  id: string;
  team: string;
  years: string;
  title: string;
  blurb: string;
  trophies: Trophy[];
  signatureRecipeId: string;
  accent: EraAccent;
}
