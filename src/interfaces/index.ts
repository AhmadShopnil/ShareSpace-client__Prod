// interfaces.ts
export type TFlatDataInRes = {
  _id: string;
  ownerId: string;
  totalBedrooms: number;
  totalBathrooms: number;
  title: string;
  location: string;
  description: string;
  rent: number;
  advanceAmount: number;
  availability: boolean;
  isDeleted?: boolean;
  postStatus: "approved" | "rejected" | "pending";
  category: "Flat" | "Tin-Shade" | "Tiner-ghor";
  images?: string[] | null;
};

export type TWorkSpaceInRes = {
  _id?: string;
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
  password?: string;
  role?: string;
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

export interface TSidebarItem {
  name: string;
  path: string;
  icon: any;
}
