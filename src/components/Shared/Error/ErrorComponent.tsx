import PrimaryButton from "@/components/Buttons/PrimaryButton";
import React from "react";

const ErrorComponent = ({
  error,
  setError,
}: {
  error: string;
  setError: any;
}) => {
  return (
    <div className="flex flex-col justify-center gap-10 items-center">
      <h2 className="text-center text-red-500">{error}</h2>

      <div className="w-full text-center ">
        <PrimaryButton
          action={() => setError(null)}
          title="Back Preious Page"
        ></PrimaryButton>
      </div>
    </div>
  );
};

export default ErrorComponent;
