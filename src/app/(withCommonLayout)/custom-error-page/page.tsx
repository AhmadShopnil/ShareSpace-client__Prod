import Link from "next/link";

const Page = () => {
  return (
    <div className="flex flex-col justify-center items-center md:min-h-96 pt-10">
      <h3>You are not authorised!</h3>
      <h2>Your are tryinng to access admin route!</h2>
      <Link href="/" className="text-blue-500">
        Back to home
      </Link>
    </div>
  );
};

export default Page;
