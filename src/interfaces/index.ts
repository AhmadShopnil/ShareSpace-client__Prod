// interfaces.ts
export interface TFlatData {
  title: string;
  totalBedrooms: number;
  location: string;
  description: string;
  rent: number;
  advanceAmount: number;
  images?: string[];
}

export interface TUserData {
  name: string;
  phone: string;
  password: string;
}
export interface TTokenData {
  name: string;
  phone: string;
}
