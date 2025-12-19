
import { Photo } from './types';

export const INTRO_TEXT = "J'ai merdé... Il n'y a pas d'excuse. Je suis loin de toi mais mon cœur reste près de toi, malgré cela, j'ai oublié le plus important. Mais voici un petit quelque chose qui, je l'espère, te fera sourire.";

export const PHOTOS: Photo[] = [
  { id: 1, url: '/photo1.jpg', caption: 'tu es mon fantasme depuis toujours', rotation: -3 },
  { id: 2, url: '/photo2.jpg', caption: 'il me manque bcp, mais pas autant que tu me manque', rotation: 2 },
  { id: 3, url: '/photo3.jpg', caption: 'tu ma fait vivre la meilleurs anner de toute ma vie', rotation: -1 },
  { id: 4, url: '/photo4.jpg', caption: 'en vraie c\'est toi la plus importante pour moi', rotation: 4 },
];

export const REUNION_DATE = new Date();
REUNION_DATE.setDate(REUNION_DATE.getDate() + 8); // Simulating 8 days before reunion
