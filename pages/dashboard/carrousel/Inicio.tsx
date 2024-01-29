import React, { useEffect, useState } from "react";
import Link from 'next/link';
import { Col, Card, Dropdown, Image, Row } from 'react-bootstrap';
import { MoreVertical } from 'react-feather';
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
const Paginas = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };
    const sliderRef = React.useRef(null);
    const [datos, setDatos] = useState([]);
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');

    const nextSlide = () => {
        sliderRef.current.slickNext();
    };

    const prevSlide = () => {
        sliderRef.current.slickPrev();
    };
   

    const [formData, setFormData] = useState({
        id: '',
        texto: '',
        categoria: '',
        imagen: '',
        href: '',
    });
    const handleInputChange = (fieldName, value) => {
        setFormData({
          ...formData,
          [fieldName]: value,
        });
        setCategoriaSeleccionada(value);
        sliderRef.current.slickGoTo(0);
      };
    useEffect(() => {
        fetch('http://localhost:3001/slider2')
            .then(response => response.json())
            .then(data => setDatos(data))
            .catch(error => console.error('Error al obtener datos:', error));
    }, []);
    const filteredData = datos.filter((item) => item.categoria === categoriaSeleccionada);
    return (
        <Row>
            <Col xl={8} lg={12} md={12} xs={12} className="mb-6">
                <Card>
                    <Card.Body>
                        <div className={`carousel-container ${filteredData.length > 0 ? 'active' : 'inactive'}`}>
                            <Slider ref={sliderRef} {...settings} >
                                {filteredData.map((item) => (
                                    <div key={item.id}>
                                        <Image src={item.imagen} alt={item.texto} className="d-block w-100" />
                                    </div>
                                ))}
                            </Slider>
                            <div>
                                <button className="carousel-control-prev" onClick={prevSlide}>
                                    <span className="carousel-control-prev-icon bg-dark" aria-hidden="true"></span>
                                    <span className="visually-hidden">Previous</span>
                                </button>
                                <button className="carousel-control-next" onClick={nextSlide}>
                                    <span className="carousel-control-next-icon bg-dark" aria-hidden="true"></span>
                                    <span className="visually-hidden">Next</span>
                                </button>
                            </div>
                        </div>
                    </Card.Body>
                </Card>
            </Col>
            <Col xl={4} lg={12} md={12} xs={12} className="mb-6">
                <Card>
                    <Card.Body>
                        <Card.Title as="h4">SELECCIONA UNA CATEGORIA</Card.Title>
                        <div >
                            <select className="form-select"
                                id="floatingSelect" aria-label="Floating label select example"
                                value={formData.categoria} onChange={(e) => handleInputChange('categoria', e.target.value)}>
                                <option value="" disabled>Seleccionar</option>

                                {datos.filter((value, index, self) => index === self.findIndex((v) => v.categoria === value.categoria))
                                    .map((fila, index) => (
                                        <option key={index} value={fila.categoria}>{fila.categoria}</option>
                                    ))}
                            </select>
                        </div>


                    </Card.Body>
                </Card>
            </Col>
        </Row>
    )
}


export default Paginas



