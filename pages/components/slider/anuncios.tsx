'use client'
import React from "react";
import Slider from "react-slick";

export default function CAnuncios() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,   
  };
  return (
    <div className="container">       
        <Slider {...settings}>
        <div>
            <img src="/images/anuncios/anuncio01.png" className="img-fluid" />
        </div>
        <div>
            <img src="/images/anuncios/anuncio02.png" className="img-fluid" />
        </div>
        <div>
            <img src="/images/anuncios/anuncio03.png" className="img-fluid" />
        </div>          
        </Slider>
    </div>
  );
}