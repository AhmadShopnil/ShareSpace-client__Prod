// interfaces.ts
export interface TFlatData {
  _id?: string;
  title: string;
  totalBedrooms: number;
  location: string;
  description: string;
  rent: number;
  advanceAmount: number;
  images?: string[] | null;
  totalBathrooms: number;
  category: string;
}

export type TWorkSpace = {
  title: string;
  location: string;
  description: string;
  rent: number;
  advanceAmount: number;
  isDeleted?: boolean;
  postStatus?: "approved" | "rejected" | "pending";
  category: string;
  images?: string[] | null;
};

export interface TUserData {
  name: string;
  phone: string;
  password: string;
}
export interface TTokenData {
  _id: string;
  role: string;
  phone: string;
  name: string;
}

export type TMeta = {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
};
