import { Row, Image } from "react-bootstrap";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import React, { useEffect, useState } from "react";
export default function Videosinfo() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };
    const sliderRef = React.useRef(null);
    const [datos, setDatos] = useState([]);
    const [banners, setBanners] = useState('');
    const nextSlide = () => {
        sliderRef.current.slickNext();
    };

    const prevSlide = () => {
        sliderRef.current.slickPrev();
    };

    useEffect(() => {
        const verificador = window.location.pathname.split('/');
        const rptURL = verificador[verificador.length - 1];
        fetch('./api/db.json')
          .then(response => response.json())
          .then(json => {
            const data = json.pginformacionvs;
            setDatos(data);
            const filtrado = data.filter(fila => fila.categoria.toLowerCase() === "informacion");
            setDatos(filtrado);  
          })
          .catch(error => console.error("Se encontró un error"))
      }, []);
    return (
        <>
            {datos.map((item, index) => (<Row className='m-0 p-5' key={index}>
                <div className="col-md-7 col-lg-7 mb-1">
                    <div className='carousel slide p-2 h-100 w-100' style={{ border: '2px solid #212B36' }}>
                        <Slider ref={sliderRef} {...settings}>
                            {item.recurso1 && item.recurso1.split(',').map((path, i) => (
                                <div key={i}>
                                    <Image src={path.trim()} alt={item.texto} className="w-100 h-100" />
                                </div>
                            ))}
                        </Slider>
                        <div>
                            <button className="carousel-control-prev" onClick={prevSlide}>
                                <span className="carousel-control-prev-icon bg-secondary" aria-hidden="true"></span>
                                <span className="visually-hidden">Previous</span>
                            </button>
                            <button className="carousel-control-next" onClick={nextSlide}>
                                <span className="carousel-control-next-icon bg-secondary" aria-hidden="true" ></span>
                                <span className="visually-hidden">Next</span>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col-md-5 col-lg-5 mb-1">
                    <div className="p-2 position-relative h-100" style={{ height: '100%', width: '100%', border: '2px solid #212B36' }}>
                        <iframe src={item.recurso2} className="w-100 h-100" style={{ border: 'none', borderRadius: 'inherit' }} allowFullScreen></iframe>
                    </div>
                </div>
            </Row>))}
        </>
    )
}