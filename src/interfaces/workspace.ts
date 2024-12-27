// Assuming the types for data fields like title, location, rent, etc.
export type TWorkSpacePayload = {
  title: string; // Assuming title is a string
  location: string; // Assuming location is a string
  description: string; // Assuming description is a string
  rent: number | null; // Rent could be a number or null if not provided
  advanceAmount: number | null; // Advance amount could also be a number or null
  images?: string[] | null;
  category: string | null;
  isLineGas?: boolean;
};
