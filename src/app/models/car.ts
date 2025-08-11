import { Brand } from './brand';

export interface Car {
  carId: number; // Optional çünkü ekleme sırasında olmayabilir
  brandName: string;
  brand: Brand;
  model: string;
  carSpecification: string;
  engineVolume: number;
  isNew: boolean;
  price: number;
  releaseDatetime: Date;
}
