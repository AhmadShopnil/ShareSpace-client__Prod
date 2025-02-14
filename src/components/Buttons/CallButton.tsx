import React from "react";
import { Phone } from "lucide-react";

interface CallButtonProps {
  phoneNumber: string;
  buttonText: string;
  className?: string;
}

const CallButton: React.FC<CallButtonProps> = ({
  phoneNumber,
  buttonText,
  className,
}) => {
  return (
    <a
      href={`tel:${phoneNumber}`}
      className={`inline-flex items-center gap-2 px-3 py-2 bg-teal-500 text-white text-sm  rounded-lg hover:bg-teal-600 transition ${className}`}
    >
      <Phone size={18} />
      {buttonText}
    </a>
  );
};

export default CallButton;
