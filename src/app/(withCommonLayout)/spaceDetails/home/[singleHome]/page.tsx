import {
  faBangladeshiTakaSign,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import ImageSlider from "@/components/Ui/FlatDetails/Slider/ImageSlider";

const SingleHome = async ({ params }: { params: any }) => {
  const flatId = params.singleHome;
  // const url = `http://localhost:5000/api/flats/${flatId}`;
  const url = `https://server-flate-share.vercel.app/api/flats/${flatId}`;
  const res = await fetch(url);
  const { data } = await res.json();
  const {
    title,
    ownerId: { name, phone },
    location,
    totalBedrooms,
    description,
    rent,
    advanceAmount,
    images,
    isLineGas,
    totalBathrooms,
    homeSpaceType,
    subletGender,
  } = data;

  return (
    <div className="container mx-auto p-2 sm:p-6">
      {/* Image Section */}
      <section className="mb-8 w-full rounded-lg overflow-hidden">
        {images && images.length > 0 ? (
          <div className="w-full md:h-[400px] lg:h-[600px] ">
            <ImageSlider images={images}></ImageSlider>
          </div>
        ) : (
          <div
            className=" text-gray-500 h-[100px] md:h-64 gap-2
             bg-gray-50 flex items-center justify-center  "
          >
            <p className="text-md sm:text-md md:text-xl text-center">
              {" "}
              No Image Available
            </p>
          </div>
        )}
      </section>

      {/* Flat Information Section */}
      <section className="mb-8">
        <h1 className="text-4xl font-bold mb-4 text-center">{title}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className=" p-4 sm:p-6 bg-white rounded-lg border border-gray-300">
            <h2 className="text-2xl font-semibold mb-4">Info</h2>
            <p className="text-gray-700 mb-2">
              <strong>Category:</strong> {homeSpaceType}
            </p>
            {subletGender && (
              <p className="text-gray-700 mb-2">
                <strong>For:</strong> {subletGender}
              </p>
            )}
            <p className="text-gray-700 mb-2">
              <strong>Location:</strong> {location}
            </p>{" "}
            <p className="text-gray-700 mb-2">
              <strong>Line Gas:</strong> {isLineGas}
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Bedrooms:</strong> {totalBedrooms}
            </p>
            <p className="text-gray-700 mb-2">
              <strong>WashRooms:</strong> {totalBathrooms}
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Rent:</strong>
              <span className="text-gray-600 mx-1 ">
                {" "}
                <FontAwesomeIcon icon={faBangladeshiTakaSign} color="gray" />
              </span>
              {rent} / month
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Advance Amount:</strong>

              <span className="text-gray-600 mx-1 ">
                {" "}
                <FontAwesomeIcon icon={faBangladeshiTakaSign} color="gray" />
              </span>
              <span className="text-gray-600 ">{advanceAmount}</span>
            </p>
            {/* <p className="text-gray-700 mb-4">{description}</p> */}
          </div>

          {/* Owner Information Section */}
          <div className="p-6 bg-white rounded-lg border border-gray-300">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Owner Information</h2>
              <p className="text-gray-700 mb-2">
                <strong>Name:</strong> {name}
              </p>
              <p className="text-gray-700 mb-2">
                <strong>Phone:</strong> <FontAwesomeIcon icon={faPhone} />{" "}
                {phone}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* <div className=" p-4 sm:p-6 bg-white rounded-lg border border-gray-300 mb-6">
        <h2 className="text-2xl font-semibold mb-4">Description</h2>
       
        <pre className="whitespace-pre-wrap">
      {description}
       </pre>
  
        <p className="whitespace-pre-line">{description}</p>
      </div> */}

      {/* Static Content Section */}
      <section className=" p-6 bg-teal-50 rounded-lg border border-gray-300">
        <h2 className="text-2xl font-bold mb-4">Description</h2>
        <p className="whitespace-pre-line">{description}</p>
      </section>
    </div>
  );
};

export default SingleHome;
