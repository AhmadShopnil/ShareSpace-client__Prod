import Image from "next/image";
import {
  faBangladeshiTakaSign,
  faLocationDot,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PrimaryButton from "@/components/Buttons/PrimaryButton";
import ImageSlider from "@/components/Ui/FlatDetails/Slider/ImageSlider";

const SingleFlat = async ({ params }: { params: any }) => {
  const flatId = params.singleFlat;
  // const url = `http://localhost:5000/api/flats/${flatId}`;
  const url= `https://server-flate-share.vercel.app/api/flats/${flatId}`
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
    totalBathrooms,
    category,
  } = data;

  return (
    <div className="container mx-auto p-2 sm:p-6">
      {/* Image Section */}
      <section className="mb-8 w-full md:h-80  overflow-hidden">
        <div className="w-full h-64 gap-2 bg-gray-50 flex items-center justify-center rounded-lg overflow-hidden">
          {/* {images.map((image: string, index: number) => (
            <div key={index}>
              <Image
                src={image}
                alt="Flat Image"
                width={800}
                height={700}
                className="object-cover"
              />
            </div>
          ))} */}

          <ImageSlider images={images}></ImageSlider>
        </div>
      </section>

      {/* Flat Information Section */}
      <section className="mb-8">
        <h1 className="text-4xl font-bold mb-4 text-center">{title}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className=" p-4 sm:p-6 bg-white rounded-lg border border-gray-300">
            <h2 className="text-2xl font-semibold mb-4">Details</h2>
            <p className="text-gray-700 mb-2">
              <strong>Category:</strong> {category}
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Location:</strong> {location}
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
            <p className="text-gray-700 mb-4">{description}</p>
            {/* <PrimaryButton
              action={() => {}}
              title={"Apply For Rent"}
            ></PrimaryButton> */}
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
            {/* <PrimaryButton title={"Contact Owner"}></PrimaryButton> */}
          </div>
        </div>
      </section>

      {/* Static Content Section */}
      <section className=" p-6 bg-teal-50 rounded-lg border border-gray-300">
        <h2 className="text-2xl font-bold mb-4">Why Choose This Flat?</h2>
        <ul className="list-disc list-inside text-gray-700">
          <li>Modern amenities and spacious design.</li>
          <li>Located in the heart of Downtown City.</li>
          <li>Affordable rent with minimal advance payment.</li>
          <li>24/7 security and maintenance services.</li>
        </ul>
      </section>
    </div>
  );
};

export default SingleFlat;
