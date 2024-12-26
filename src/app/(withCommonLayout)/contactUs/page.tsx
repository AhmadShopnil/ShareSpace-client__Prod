import Link from "next/link";
import React from "react";

const ContactUs = () => {
  return (
    <div className="h-96 pt-20">
      <span className="text-center ">Contact us on </span>{" "}
      <Link
        href="https://www.facebook.com/profile.php?id=61571308793569&mibextid=ZbWKwL"
        className="text-blue-500 text-center"
      >
        facebook
      </Link>
    </div>
  );
};

export default ContactUs;
