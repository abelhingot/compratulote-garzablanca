'use client'
import React from "react";
import Slider from "react-slick";
import {Image} from "react-bootstrap"

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
            <Image src="/images/anuncios/anuncio01.png" className="img-fluid" alt=""/>
        </div>
        <div>
            <Image src="/images/anuncios/anuncio02.png" className="img-fluid" alt=""/>
        </div>
        <div>
            <Image src="/images/anuncios/anuncio03.png" className="img-fluid" alt=""/>
        </div>          
        </Slider>
    </div>
  );
}