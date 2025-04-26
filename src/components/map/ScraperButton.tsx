import React from "react";

interface ScraperButton {
  text?: string;
  icon?: React.ReactNode;
  arrowIcon?: React.ReactNode;
  textStyle?: string;
  className?: string;
  onClick?: () => void;
}

const ScraperButton: React.FC<ScraperButton> = ({
  text,
  icon,
  textStyle,
  className,
  onClick,
  arrowIcon,
}) => {
  const baseStyle =
    "flex justify-between items-center  w-full   gap-2 mt-3 mb-3 py-3 px-1 rounded-lg transition w-full transition hover:bg-gray-50 ";

  return (
    <button
      className={`${baseStyle} ${className || ""} ${textStyle || ""}`}
      onClick={onClick}
    >
      <div className="flex gap-2">
        <div className="text-2xl  mt-[1px] text-yellow-400">{icon}</div>

        <div className="mt-[0.5] pl-2 text-xl ">{text}</div>
      </div>

      <div className="ml-[80px] mr-3 mt-[1] text-lg">{arrowIcon}</div>
    </button>
  );
};

export default ScraperButton;
