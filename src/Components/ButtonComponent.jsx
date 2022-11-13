import React from "react";

const ButtonComponent = ({
  text,
  icon,
  textColor = "text-black",
  textBg = "bg-white",
  onClick,
  disabled,
}) => {
  console.log(disabled);
  return (
    <div className={` flex justify-center flex-1`}>
      <button
        className={`${textColor} ${textBg} py-2 px-3 rounded-xl `}
        disabled={disabled}
        onClick={onClick}
      >
        {text ? text : icon}
      </button>
    </div>
  );
};

export default ButtonComponent;
