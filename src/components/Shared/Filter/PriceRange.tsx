import { faBangladeshiTakaSign } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect, useRef } from "react";

interface PriceRangeProps {
  min: number;
  max: number;
  step?: number;
  onChange: (minValue: number, maxValue: number) => void;
}

const PriceRange: React.FC<PriceRangeProps> = ({
  min,
  max,
  step = 1,
  onChange,
}) => {
  const [values, setValues] = useState({ min: min, max: max });
  const [activeHandle, setActiveHandle] = useState<"min" | "max" | null>(null);
  const rangeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!rangeRef.current) return;

      const rangeRect = rangeRef.current.getBoundingClientRect();
      const rangeWidth = rangeRect.width;
      const rangeLeft = rangeRect.left;

      let newValue = min + ((e.clientX - rangeLeft) / rangeWidth) * (max - min);
      newValue = Math.round(newValue / step) * step;

      if (newValue < min) newValue = min;
      if (newValue > max) newValue = max;

      if (activeHandle === "min") {
        if (newValue <= values.max) {
          setValues((prevValues) => ({
            ...prevValues,
            min: newValue,
          }));
          onChange(newValue, values.max);
        }
      } else if (activeHandle === "max") {
        if (newValue >= values.min) {
          setValues((prevValues) => ({
            ...prevValues,
            max: newValue,
          }));
          onChange(values.min, newValue);
        }
      }
    };

    const handleMouseUp = () => {
      setActiveHandle(null);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [min, max, step, values, activeHandle, onChange]);

  const handleMouseDown = (type: "min" | "max") => {
    setActiveHandle(type);
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!rangeRef.current) return;

    const rangeRect = rangeRef.current.getBoundingClientRect();
    const rangeWidth = rangeRect.width;
    const rangeLeft = rangeRect.left;

    let newValue = min + ((e.clientX - rangeLeft) / rangeWidth) * (max - min);
    newValue = Math.round(newValue / step) * step;

    if (newValue < min) newValue = min;
    if (newValue > max) newValue = max;

    if (Math.abs(newValue - values.min) < Math.abs(newValue - values.max)) {
      setValues((prevValues) => ({
        ...prevValues,
        min: newValue,
      }));
      onChange(newValue, values.max);
    } else {
      setValues((prevValues) => ({
        ...prevValues,
        max: newValue,
      }));
      onChange(values.min, newValue);
    }
  };

  return (
    <div className="my-2">
      <div
        className="relative h-4 w-full bg-gray-300 rounded-md cursor-pointer"
        ref={rangeRef}
        onClick={handleClick}
      >
        <div
          className="absolute top-0 bottom-0 bg-teal-500 rounded-md"
          style={{
            left: `${((values.min - min) / (max - min)) * 100}%`,
            width: `${((values.max - values.min) / (max - min)) * 100}%`,
          }}
        />
        <div
          className="absolute h-4 w-4 bg-white border-2 border-teal-500 rounded-full cursor-pointer"
          style={{ left: `${((values.min - min) / (max - min)) * 100}%` }}
          onMouseDown={() => handleMouseDown("min")}
        />
        <div
          className="absolute h-4 w-4 bg-white border-2 border-teal-500 rounded-full cursor-pointer"
          style={{
            left: `${((values.max - min) / (max - min)) * 99}%`,
            // marginRight: "20px", // Adjusted to keep 6px inside the range bar
          }}
          onMouseDown={() => handleMouseDown("max")}
        />
      </div>
      <div className="flex items-center justify-between mt-2">
        <span className="text-md   font-medium text-gray-700">
          Min Price:
          <FontAwesomeIcon icon={faBangladeshiTakaSign} color="teal" />
          <span className="ml-1">{values.min}</span>
        </span>
        <span className="text-md font-medium text-gray-700">
          Max Price:
          <FontAwesomeIcon icon={faBangladeshiTakaSign} color="teal" />
          <span className="ml-1">{values.max}</span>
        </span>
      </div>
    </div>
  );
};

export default PriceRange;
