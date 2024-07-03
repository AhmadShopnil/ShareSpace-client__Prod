import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import PrimaryButton from "@/components/Buttons/PrimaryButton";

const SingleFlat = async ({ params }: { params: any }) => {
  const flatId = params.singleFlat;
  const res = await fetch(`http://localhost:5000/api/flats/${flatId}`);
  const { data } = await res.json();
  const {
    title,
    ownerId: { name, phone },
    location,
    totalBedrooms,
    description,
    rent,
    advanceAmount,
  } = data;

  return (
    <div className="container mx-auto p-6">
      {/* Image Section */}
      <section className="mb-8">
        <div className="w-full h-64 bg-gray-300 flex items-center justify-center rounded-lg overflow-hidden">
          <Image
            src="/default-flat.jpg"
            alt="Flat Image"
            width={800}
            height={400}
            className="object-cover"
          />
        </div>
      </section>

      {/* Flat Information Section */}
      <section className="mb-8">
        <h1 className="text-4xl font-bold mb-4 text-center">{title}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-6 bg-white rounded-lg border border-gray-300">
            <h2 className="text-2xl font-semibold mb-4">Details</h2>
            <p className="text-gray-700 mb-2">
              <strong>Location:</strong> {location}
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Bedrooms:</strong> {totalBedrooms}
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Rent:</strong> ${rent} / month
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Advance Amount:</strong> ${advanceAmount}
            </p>
            <p className="text-gray-700 mb-4">{description}</p>
            <PrimaryButton title={"Apply For Rent"}></PrimaryButton>
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
      <section className="mb-8 p-6 bg-teal-50 rounded-lg border border-gray-300">
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
