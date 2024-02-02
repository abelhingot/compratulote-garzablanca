"use client"
import React, {useState, useEffect} from 'react'
import {Image} from "react-bootstrap"
export default function CAnimacion(props:any) {
   //let imagenesslider:any=[];
   const [imgslider, setImgslider] = useState([]);
   const menutmp=props.categoria||'inicio';
  /* useEffect(() => {
      fetch("./json/sliders.json")
           .then(res => res.json())
           .then(data => setImgslider(data[menutmp]))
    }, [])
*/
useEffect(() => {
   const urlParts = window.location.pathname.split('/');
   let categoriaFromUrl = urlParts[urlParts.length - 1];
   if (categoriaFromUrl === '') {
      categoriaFromUrl = 'inicio';
  }
   fetch('http://localhost:3001/slider2')
       .then(response => response.json())
       .then(data => {
           const sliderDataForCategoria = data.filter(item => item.categoria === categoriaFromUrl);
           setImgslider(sliderDataForCategoria);
       })
       .catch(error => console.error('Error al obtener datos:', error));
}, []);

   if(imgslider!=undefined)
      return (
         <div id="carouselExample" className="carousel slide" key={"menu-1"}>
            <div className="carousel-inner">
               {               
                  imgslider.map((itemp:any,key:any)=>{
                     return(                       
                        <div className="carousel-item active" key={'imageslider_'+key}>
                           <Image src={itemp.imagen} className="d-block w-100" alt="Proyecto 01" />
                           <h2 className='textoslider'>{itemp.texto}</h2>
                        </div>                       
                     )
                  })
               }
            
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
               <span className="carousel-control-prev-icon" aria-hidden="true"></span>
               <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
               <span className="carousel-control-next-icon" aria-hidden="true"></span>
               <span className="visually-hidden">Next</span>
            </button>
         </div>
      );
   else{
      return (<div key={"espacio-1"}>
        <br /> <br /> <br />
         </div>)
   }
}