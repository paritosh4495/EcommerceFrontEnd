import React from "react";
import { useNavigate } from "react-router-dom";

const HomeSectionCard = ({ product }) => {

  const navigate = useNavigate();
  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div
    onClick={handleCardClick}
      className="cursor-pointer flex flex-col bg-white rounded-lg shadow-lg 
    overflow-hidden w-[15rem] mx-3 border"
    >
      <div className="h-[13rem] w-[10rem] mx-auto">
        <img
          className="object-cover object-top w-full h-full"
          src={product.imageUrl}
          alt=""
        />
      </div>

      <div className="p-4 w-full text-left">
        <h3 className="text-lg font-medium text-gray-900  text-left">{product.brand}</h3>
        <p className="mt-2 text-sm text-gray-500  text-left">
          {product.title}
        </p>
      </div>
    </div>
  );
};

export default HomeSectionCard;
