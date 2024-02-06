'use client'
import React from "react";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {Image} from "react-bootstrap"
export default function CAuspiciadores() {
  var settings = {
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ]
  };
  return (
    <div className="container auspiciadores1">
        <div className="row">
            <div className="col tituloComponentes">
                Marcas <strong>Auspiciadoras</strong>
            </div>
        </div>
        <Slider {...settings}>
         
        <div>
            <Image src="auspiciadores1.jpg" className="img-fluid" alt="Verificar texto"/>
        </div>
        <div>
            <Image src="auspiciadores2.jpg" className="img-fluid" alt="Verificar texto"/>
        </div>
        <div>
            <Image src="auspiciadores3.jpg" className="img-fluid" alt="Verificar texto"/>
        </div>
        <div>
            <Image src="auspiciadores4.jpg" className="img-fluid" alt="Verificar texto"/>
        </div>
        <div>
            <Image src="auspiciadores1.jpg" className="img-fluid" alt="Verificar texto"/>
        </div>
        <div>
            <Image src="auspiciadores2.jpg" className="img-fluid" alt="Verificar texto"/>
        </div>      
        </Slider>
    </div>
  );
}