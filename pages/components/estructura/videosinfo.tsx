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
    const nextSlide = () => {
        sliderRef.current.slickNext();
    };

    const prevSlide = () => {
        sliderRef.current.slickPrev();
    };

    useEffect(() => {
        fetch('https://sheet.best/api/sheets/7ae0c5f0-997f-4c88-935e-f4a58678ff5e/tabs/informacion')
            .then(response => response.json())
            .then(data => {
                if (data.length > 1) {
                    const headers = Object.values(data[0]);
                    const rows = data.slice(1).map(row => {
                        let obj = {};
                        Object.entries(row).forEach(([key, value]) => {
                            const columnName = headers[key];
                            if (columnName) {
                                obj[columnName] = value;
                            }
                        });
                        return obj;
                    });
                    const inf = rows.filter(item => item.categoria === "infodown");
                    setDatos(inf);
                }
            })
            .catch(error => console.error('Error:', error));
    }, []);
    return (
        <>
            {datos.map((item, index) => (
                <Row className='m-0 p-5' >
                    <div className="col-md-7 col-lg-7 mb-1" key={index}>
                        <div className='carousel slide p-2 h-100 w-100' style={{ border: '2px solid #212B36' }}>
                            <Slider ref={sliderRef} {...settings}>
                                {item.titulo && item.titulo.split(',').map((path, i) => (
                                    <div key={i}>
                                        <Image src={'./imagenes/' + path.trim()} alt={item.texto} className="w-100 h-100" />
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
                    <div className="col-md-5 col-lg-5 mb-1" key={index}>
                        <div className="p-2 position-relative h-100" style={{ height: '100%', width: '100%', border: '2px solid #212B36' }}>
                            <iframe src={item.contenido} className="w-100 h-100" style={{ border: 'none', borderRadius: 'inherit' }} allowFullScreen></iframe>
                        </div>
                    </div>
                </Row>))}
        </>
    )
}