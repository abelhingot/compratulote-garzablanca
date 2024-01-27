import { useEffect, useState } from 'react'
import CFormulario from './componentes/formulario'
import CTop from './componentes/top'
import CAdorno from './componentes/adorno'
import VSanuncio from './componentes/anuncio'
import CFooter from '../components/estructura/footer'
import type { Metadata } from 'next'
import { Card, Col, Row } from 'react-bootstrap'
import React from 'react'
import Videosinfo from './componentes/videosinfo'
export const metadata: Metadata = {
  title: 'Compratulote.pe : Plantilla',
  description: 'Plantilla inicicial',
}
export default function EstructuraInicio() {
  const [datos, setDatos] = useState([]);
  const [banners, setBanners] = useState('');

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
          <CTop selMenu="index" pagenav="./" />
          <CAdorno />
          <div className='m-0'>
            <div className="container" >
              <div className="row g-5 mb-3 py-4">
                <div className="col-md-7 col-lg-8">
                  <VSanuncio/>
                  <div className="container text-center">
                    <div className="row row-cols-2 row-cols-lg-5 g-2 g-lg-3">
                      {datos.map((fila, index) => (
                        <div className="col" key={index}>
                          <div className="p-3 rounded-4 custom-border-info" style={{ border: '2px solid #fdcd68' }}>
                            <img src={fila.imagen} alt='imagen' className="img-fluid custom-img-info" />
                          </div>
                          <p className="py-2 fw-bold" style={{ color: '#d8b66f' }}>{fila.titulo}</p>
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
