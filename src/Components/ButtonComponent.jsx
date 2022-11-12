import React from "react";

const ButtonComponent = ({
  text,
  icon,
  textColor = "text-black",
  textBg = "bg-white",
  onClick,
}) => {
  return (
    <div className={` flex justify-center flex-1`} onClick={onClick}>
      <p className={`${textColor} ${textBg} py-2 px-3 rounded-xl `}>
        {text ? text : icon}
      </p>
    </div>
  );
};

export default ButtonComponent;
