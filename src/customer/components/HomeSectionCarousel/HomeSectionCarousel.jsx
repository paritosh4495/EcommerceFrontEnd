import React, { useState, useRef, useEffect } from "react";
import AliceCarousel from "react-alice-carousel";
import HomeSectionCard from "../HomeSectionCard/HomeSectionCard";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { Button, CircularProgress, Typography } from "@mui/material";
import { fetchProductsByCategory } from "../../Pages/HomePage/productService";
import { useNavigate } from "react-router-dom";

const HomeSectionCarousel = ({sectionName, displayName}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef(null);

  const navigate = useNavigate();

  const responsive = {
    0: { items: 1 },
    720: { items: 3 },
    1024: { items: 5.5 },
  };

  const slidePrev = () => {
    if (carouselRef.current) {
      carouselRef.current.slidePrev();
    }
  };

  const slideNext = () => {
    if (carouselRef.current) {
      carouselRef.current.slideNext();
    }
  };

  const syncActiveIndex = ({ item }) => setActiveIndex(item);

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      try {
        const data = await fetchProductsByCategory(sectionName);
        setProducts(data);
      } catch (err) {
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, [sectionName]);

  if (loading) {
    return (
      <div className="flex justify-center py-10">
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  if (products?.length === 0) {
    return <Typography>No products found for {sectionName}</Typography>;
  }

  const handleCardClick = (productId) => {
    // Navigate to the product detail page when a card is clicked
    navigate(`/product/${productId}`);
  };


  const items = products?.slice(0, 10).map((item) => (
    <div key={item.id} onClick={()=> handleCardClick(item.id) } style={{cursor: 'pointer'}}>
    <HomeSectionCard key={item.id} product={item} />
    </div>
  ));


  return (
    <div className="border">
      <h2 className="text-2xl font-extrabold text-gray-900 py-5 text-left">{displayName}</h2>
      <div className="relative p-5 ">
        <AliceCarousel
          ref={carouselRef}
          items={items}
          disableButtonsControls
          responsive={responsive}
          disableDotsControls
          onSlideChanged={syncActiveIndex}
          activeIndex={activeIndex}
        />

        {activeIndex !== items.length - 5 && (
          <Button
            onClick={slideNext}
            variant="contained"
            className="z-50 bg-white"
            sx={{
              position: "absolute",
              top: "8rem",
              right: "0rem",
              transform: "translateX(50%) rotate(90deg)",
              bgcolor: "white",
            }}
            aria-label="next"
          >
            <KeyboardArrowLeftIcon
              sx={{ transform: "rotate(90deg)", color: "black" }}
            />
          </Button>
        )}
        { activeIndex !== 0 &&
          <Button
            onClick={slidePrev}
            variant="contained"
            className="z-50 bg-white"
            sx={{
              position: "absolute",
              top: "8rem",
              left: "0rem",
              transform: "translateX(-50%) rotate(-90deg)",
              bgcolor: "white",
            }}
            aria-label="next"
          >
            <KeyboardArrowLeftIcon
              sx={{ transform: "rotate(90deg)", color: "black" }}
            />
          </Button>
        }
      </div>
    </div>
  );
};

export default HomeSectionCarousel;
