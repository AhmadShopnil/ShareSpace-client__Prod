// "use client";

// import React, { useEffect, useState } from "react";
// import { TUserData, TTokenData } from "@/interfaces";
// import { uploadImageToCLoudinary } from "@/utils/uploadImage";
// import { useForm, SubmitHandler } from "react-hook-form";
// import { useCreateFlatMutation } from "@/redux/api/flatApi";

// import { TFlatPyload } from "@/interfaces/flat";
// import { useRouter } from "next/navigation";
// import SkeletonPostFlat from "../Loading/SkeletonPostFlat";

// export const HomeSpaceForm = () => {
//   const router = useRouter();
//   const [images, setImages] = useState<File[]>([]);
//   const [urls, setUrls] = useState<string[]>([]);
//   const [uploadingImage, setUpLoadingImage] = useState(false);
//   const [createFlat, { error: postError, isLoading }] = useCreateFlatMutation();
//   const [homeSpaceType, setHomeSpaceType] = useState<string>("");

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<TFlatPyload & TUserData>();

//   // set image to state form input
//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       const images = Array.from(e.target.files);
//       setImages(images);
//     }
//   };

//   // handle submit button
//   const onSubmit: SubmitHandler<TFlatPyload & TUserData> = async (data) => {
//     setUpLoadingImage(true);

//     try {
//       let uploadImageUrls = null;

//       if (images) {
//         uploadImageUrls = await uploadImageToCLoudinary({
//           images,
//           setUrls,
//         });
//       }

//       const flatData: TFlatPyload = {
//         title: data?.title,
//         totalBedrooms: data?.totalBedrooms,
//         location: data?.location,
//         description: data.description,
//         rent: data?.rent,
//         isLineGas: data?.isLineGas,
//         advanceAmount: data?.advanceAmount,
//         images: uploadImageUrls,
//         totalBathrooms: data?.totalBathrooms,
//         category: data?.category,
//         homeSpaceType: data?.homeSpaceType, // add the homeSpaceType here
//         subletGender: data?.subletGender, // add subletGender here if it's a sublet
//       };

//       const response = await createFlat({
//         flatData,
//       });

//       const addedSpace = response?.data?.addedSpace;
//       setUpLoadingImage(false);

//       if (addedSpace) {
//         router.push("/myList");
//       }
//     } catch (error: any) {
//       setUpLoadingImage(false);
//     }
//   };

//   if (isLoading) {
//     return <SkeletonPostFlat></SkeletonPostFlat>;
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-xl text-center font-semibold mb-4">
//         Home Space Details
//       </h1>
//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//         <div className="border p-4 rounded-lg">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div className="flex flex-col">
//               <label htmlFor="title" className="text-sm text-gray-600 mb-1">
//                 Title
//               </label>
//               <input
//                 type="text"
//                 id="title"
//                 {...register("title", { required: true })}
//                 placeholder="Title"
//                 className="w-full p-2 border rounded"
//               />
//               {errors.title && (
//                 <span className="text-red-600">This field is required</span>
//               )}
//             </div>

//             {/* Bedroom Input */}
//             <div className="flex flex-col">
//               <label
//                 htmlFor="totalBedrooms"
//                 className="text-sm text-gray-600 mb-1"
//               >
//                 Total Bedrooms
//               </label>
//               <input
//                 type="number"
//                 id="totalBedrooms"
//                 {...register("totalBedrooms", { required: true })}
//                 placeholder="Total Bedrooms"
//                 className="w-full p-2 border rounded"
//               />
//               {errors.totalBedrooms && (
//                 <span className="text-red-600">This field is required</span>
//               )}
//             </div>

//             {/* Bathroom Input */}
//             <div className="flex flex-col">
//               <label
//                 htmlFor="totalBathrooms"
//                 className="text-sm text-gray-600 mb-1"
//               >
//                 Total Bathrooms
//               </label>
//               <input
//                 type="number"
//                 id="totalBathrooms"
//                 {...register("totalBathrooms", { required: true })}
//                 placeholder="Total Bathrooms"
//                 className="w-full p-2 border rounded"
//               />
//               {errors.totalBathrooms && (
//                 <span className="text-red-600">This field is required</span>
//               )}
//             </div>

//             {/* Location Input */}
//             <div className="flex flex-col">
//               <label htmlFor="location" className="text-sm text-gray-600 mb-1">
//                 Location
//               </label>
//               <input
//                 type="text"
//                 id="location"
//                 {...register("location", { required: true })}
//                 placeholder="Location"
//                 className="w-full p-2 border rounded"
//               />
//               {errors.location && (
//                 <span className="text-red-600">This field is required</span>
//               )}
//             </div>

//             {/* Rent Input */}
//             <div className="flex flex-col">
//               <label htmlFor="rent" className="text-sm text-gray-600 mb-1">
//                 Rent
//               </label>
//               <input
//                 type="number"
//                 id="rent"
//                 {...register("rent", { required: true })}
//                 placeholder="Rent"
//                 className="w-full p-2 border rounded"
//               />
//               {errors.rent && (
//                 <span className="text-red-600">This field is required</span>
//               )}
//             </div>

//             {/* Advance Input */}
//             <div className="flex flex-col">
//               <label
//                 htmlFor="advanceAmount"
//                 className="text-sm text-gray-600 mb-1"
//               >
//                 Advance Amount
//               </label>
//               <input
//                 type="number"
//                 id="advanceAmount"
//                 {...register("advanceAmount")}
//                 placeholder="Advance Amount"
//                 className="w-full p-2 border rounded"
//               />
//             </div>

//             {/* Gas Line Input */}
//             <div className="flex flex-col">
//               <label htmlFor="isLineGas" className="text-sm text-gray-600 mb-1">
//                 Line Gas
//               </label>
//               <select
//                 id="isLineGas"
//                 {...register("isLineGas", { required: true })}
//                 className="w-full p-2 border rounded"
//               >
//                 <option value="Yes">Yes</option>
//                 <option value="No">No</option>
//               </select>
//               {errors.isLineGas && (
//                 <span className="text-red-600">This field is required</span>
//               )}
//             </div>

//             {/* Home Space Type */}
//             <div className="flex flex-col">
//               <label
//                 htmlFor="homeSpaceType"
//                 className="text-sm text-gray-600 mb-1"
//               >
//                 Category
//               </label>
//               <select
//                 id="homeSpaceType"
//                 {...register("homeSpaceType", { required: true })}
//                 value={homeSpaceType}
//                 onChange={(e) => setHomeSpaceType(e.target.value)}
//                 className="w-full p-2 border rounded"
//               >
//                 <option value="Family">Family</option>
//                 <option value="Sublet">Sublet / Bachelor</option>
//                 <option value="Any">Any</option>
//               </select>
//               {errors.homeSpaceType && (
//                 <span className="text-red-600">This field is required</span>
//               )}
//             </div>

//             {/* Sublet Gender Preference */}
//             {homeSpaceType === "Sublet" && (
//               <div className="flex flex-col">
//                 <label
//                   htmlFor="subletGender"
//                   className="text-sm text-gray-600 mb-1"
//                 >
//                   Sublet Gender Preference
//                 </label>
//                 <select
//                   id="subletGender"
//                   {...register("subletGender", { required: true })}
//                   className="w-full p-2 border rounded"
//                 >
//                   <option value="Female">Female</option>
//                   <option value="Male">Male</option>
//                   <option value="Any">Any</option>
//                 </select>
//                 {errors.subletGender && (
//                   <span className="text-red-600">This field is required</span>
//                 )}
//               </div>
//             )}
//           </div>

//           {/* Description Input */}
//           <div className="flex flex-col mt-4">
//             <label htmlFor="description" className="text-sm text-gray-600 mb-1">
//               Description
//             </label>
//             <textarea
//               id="description"
//               {...register("description", { required: true })}
//               placeholder="Description"
//               className="w-full p-2 border rounded"
//             />
//             {errors.description && (
//               <span className="text-red-600">This field is required</span>
//             )}
//           </div>

//           {/* Image Upload Input */}
//           <div className="flex flex-col mt-4">
//             <label htmlFor="images" className="text-sm text-gray-600 mb-1">
//               Images
//             </label>
//             <input
//               type="file"
//               id="images"
//               multiple
//               onChange={handleImageChange}
//               className="w-full p-2 border rounded"
//             />
//           </div>
//         </div>

//         <button
//           type="submit"
//           className="w-full bg-teal-500 text-white p-2 rounded hover:bg-teal-600"
//           disabled={uploadingImage}
//         >
//           {uploadingImage ? "Processing..." : "Post"}
//         </button>
//       </form>
//     </div>
//   );
// };
