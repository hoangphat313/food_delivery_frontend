import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import HeaderImage from "../../utils/Images/background.jpg";

const ImageSlider = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <Slider {...settings}>
            <div>
                <img src={HeaderImage} alt="Image 1" style={{ width: '100%' }} />
            </div>
            <div>
                <img src={HeaderImage} alt="Image 2" style={{ width: '100%' }} />
            </div>
            <div>
                <img src={HeaderImage} alt="Image 3" style={{ width: '100%' }} />
            </div>
        </Slider>
    );
};

export default ImageSlider;
