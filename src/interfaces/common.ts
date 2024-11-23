import { USER_ROLE } from "@/contants/role";
import { TFlatDataInRes } from ".";

export type IMeta = {
  page: number;
  limit: number;
  total: number;
};

export type UserRole = keyof typeof USER_ROLE;

export type ResponseSuccessType = {
  data: any;
  meta?: IMeta;
};

export type IGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorMessages: IGenericErrorMessage[];
};

export type IGenericErrorMessage = {
  path: string | number;
  message: string;
};

// Type for the individual Flat object
type TFlat = {
  // Add the actual properties of the flat object here. For example:
  id: string;
  name: string;
  description: string;
  price: number;
  location: string;
  // other fields...
};

// Type for pagination metadata
type TMeta = {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
};

// Type for the generic response data structure
type TResponseData<T> = {
  meta: TMeta;
  items: T[]; // A generic array of items (could be flats, workspaces, etc.)
};

export type TResponseFlat = {
  meta: TMeta;
  flats: TFlatDataInRes[]; // A generic array of items (could be flats, workspaces, etc.)
};

export type TResponseWokSpace = {
  meta: TMeta;
  workSpaces: TFlatDataInRes[]; // A generic array of items (could be flats, workspaces, etc.)
};

// Type for the generic API response
export type TApiResponse<T> = {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
};
