'use client'
import Slider from "react-slick";
import React, { useState, useEffect } from 'react'
import CProyectovista1 from "./vista1";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function CProductosSliders() {
  const [data, setData] = useState([]);
  useEffect(() => {
      fetch("./json/proyectos.json")
          .then(res => res.json())
          .then((data) => {
              let datatmp: any = [...new Set(data["data"].filter((item:any)=>{
                return item.destacado==true
              }).sort((firstItem:any, secondItem:any)=>(firstItem.numerovistas>secondItem.numerovistas)?1:(
              firstItem.numerovistas<secondItem.numerovistas)?-1:0))];
              setData(datatmp);         
          })
  }, [])
  var settings = {
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 3,
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
                Otros Proyectos <strong>Similares</strong>
            </div>
        </div>
        <Slider {...settings}>
        {
            data.map((itemp:any,key:any)=>{
                return(
                <div key={'sliderp'+key} className="productoSlider listadoproyectos">
                    <CProyectovista1 {...itemp} />                    
                </div>                
                )
            })
        }
        </Slider>
    </div>
  );
}