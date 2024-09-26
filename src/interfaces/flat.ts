// export type TFlat = {
//     _id: string;
//     ownerId: string;
//     totalBedrooms: number;
//     totalBathrooms: number;
//     title: string;
//     location: string;
//     description: string;
//     rent: number;
//     advanceAmount: number;
//     availability: boolean;
//     isDeleted?: boolean;
//     postStatus: 'approved' | 'rejected' | 'pending';
//     category: 'Flat' | 'Tin-Shade' | 'Tiner-ghor';
//     images?: string[] | null;
//   };
  

  export type TFlat = {
    _id?: string;
    title: string;
    totalBedrooms: number;
    location: string;
    description: string;
    rent: number;
    advanceAmount: number;
  };