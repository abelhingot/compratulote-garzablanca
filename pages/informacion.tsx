import { useEffect, useState } from 'react'
import CFooter from './components/estructura/footer'
import CFormulario from './components/estructura/formulario'
import CTop from './components/estructura/top'
import CAnuncio from './components/estructura/anuncio'
import CAdorno from './components/estructura/adorno'
import type { Metadata } from 'next'
import { Card, Col, Row } from 'react-bootstrap'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
<<<<<<< HEAD
import Image from 'next/image';
=======
>>>>>>> 314253c1b9d2658f547dd600c8f9e63171b22956
import React from 'react'
import { Border } from 'react-bootstrap-icons'
import Videosinfo from './components/estructura/videosinfo'
export const metadata: Metadata = {
  title: 'Compratulote.pe : Plantilla',
  description: 'Plantilla inicicial',
}
export default function EstructuraInicio() {
  const [datos, setDatos] = useState([]);
  const [banners, setBanners] = useState('');
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const sliderRef = React.useRef(null);
  const nextSlide = () => {
    sliderRef.current.slickNext();
  };

  const prevSlide = () => {
    sliderRef.current.slickPrev();
  };
  useEffect(() => {
    const verificador = window.location.pathname.split('/');
    const rptAPI = verificador[verificador.length - 1];
    fetch('http://localhost:3001/serviciosES')
      .then(response => response.json())
      .then(data => {
        const filtrado = data.filter(fila => fila.categoria === rptAPI);
        setDatos(filtrado);
        setBanners(rptAPI);
      })
      .catch(error => console.error("Se encontró un error"))
  }, []);
  return (
    <>
      <Row className='bg-white m-0'>
       <Card className='p-0'>
<<<<<<< HEAD
              <CTop />
=======
              <CTop selMenu="index" pagenav="./" />
>>>>>>> 314253c1b9d2658f547dd600c8f9e63171b22956
              <CAdorno />
              <div className='m-0'>
                <div className="container" >
                  <div className="row g-5 mb-3 py-4">
                    <div className="col-md-7 col-lg-8">
                      <CAnuncio />
                      <div className="container text-center">
                        <div className="row row-cols-2 row-cols-lg-5 g-2 g-lg-3">
                          {datos.map((fila, index) => (
                            <div className="col" key={index}>
                              <div className="p-3 rounded-4 custom-border-info" style={{border:'2px solid #637391'}}>
                                <img src={fila.imagen} alt='imagen' className="img-fluid custom-img-info" />
                              </div>
                              <p className="py-2 fw-bold" style={{color:'#637391'}}>{fila.titulo}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <CFormulario />
                  </div>
                </div>
              </div>
              <Videosinfo />
              <CFooter rutatmp='./../../' />
           </Card>
      </Row>
    </>
  )
}
