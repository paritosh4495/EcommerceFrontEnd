import React from 'react'
import MainCarousel from '../../components/HomeCarousel/MainCarousel'
import HomeSectionCarousel from '../../components/HomeSectionCarousel/HomeSectionCarousel'
import { mens_kurta } from "../../../Data/mens_kurta";

const HomePage = () => {
  const sections = [
    "men_jeans",
    "mens_kurta",
    "shirt",
    "women_jeans",
    "women_dress",
    "top"
  ];
  // Create a mapping for human-readable section names
  const sectionNameMapping = {
    men_jeans: 'Men Jeans',
    mens_kurta: 'Men Kurta',
    shirt: 'Shirt',
    women_jeans: 'Women Jeans',
    women_dress: 'Women Dress',
    top: 'Top'
  };

  const formatSectionName = (name) => {
    return sectionNameMapping[name] || name; // Default to the original name if not found
  };

return (
  <div>
    <MainCarousel />
    <div className='space-y-10 py-20 flex flex-col justify-center px-5 lg:px-10'>
      {sections.map((section) => (
        <HomeSectionCarousel key={section} sectionName={section} displayName = {formatSectionName(section)}  />
      ))}
    </div>
  </div>
);
};


export default HomePage