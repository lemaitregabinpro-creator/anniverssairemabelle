
export enum AppState {
  AUTH = 'AUTH',
  INTRO = 'INTRO',
  REVEAL = 'REVEAL',
  GIFT = 'GIFT'
}

export interface Photo {
  id: number;
  url: string;
  caption: string;
  rotation: number;
}
