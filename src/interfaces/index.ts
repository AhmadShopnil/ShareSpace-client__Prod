// interfaces.ts
export interface TFlatData {
  title: string;
  totalBedrooms: number;
  location: string;
  description: string;
  rent: number;
  advanceAmount: number;
  images?: string[];
  totalBathrooms: number;
  category: string;
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

export type TMeta = {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
};
