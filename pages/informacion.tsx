import { useEffect, useState } from 'react'
import CFooter from './components/estructura/footer'
import CFormulario from './components/estructura/formulario'
import CTop from './components/estructura/top'
import CAnuncio from './components/estructura/anuncio'
import CAdorno from './components/estructura/adorno'
import type { Metadata } from 'next'
import { Card, Col, Row, Image } from 'react-bootstrap'
import React from 'react'
import Videosinfo from './components/estructura/videosinfo'
export const metadata: Metadata = {
  title: 'Compratulote.pe : Plantilla',
  description: 'Plantilla inicicial',
}
export default function Pinformacion() {
  const [datos, setDatos] = useState([]);
  const [datos2, setDatos2] = useState([]);
  useEffect(() => {
    fetch('https://sheet.best/api/sheets/7ae0c5f0-997f-4c88-935e-f4a58678ff5e/tabs/informacion')
      .then(response => response.json())
      .then(data => {
        if (data.length > 1) {
          const headers = Object.keys(data[0]).map(key => data[0][key]);
          const rows = data.slice(1).map(row => {
            let obj = {};
            Object.keys(row).forEach((key, index) => {
              obj[headers[index]] = row[key];
            });
            return obj;
          });
          const filtro1 = rows.filter(fila => fila.categoria === "infoup");
          setDatos(filtro1);
          const filtro2 = rows.filter(fila => fila.categoria === "infomiddle");
          setDatos2(filtro2);
        }
      })
      .catch(error => console.error('Error:', error));
  }, []);
  return (
    <>
      <Row className='bg-white m-0'>
        <Card className='p-0'>
          <CTop />
          <CAdorno />
          <div className='m-0'>
            <div className="container" >

              <div className="row g-5 mb-3 py-4">

                <div className="col-md-7 col-lg-8" >
                  {datos.map((fila, index) => (
                    <Row className="mb-1" key={index}>

                      <p className="txt-jf" dangerouslySetInnerHTML={{ __html: fila.contenido }} />

                    </Row>
                  ))}
                  <div className="container text-center">

                    <div className="row row-cols-2 row-cols-lg-5 g-2 g-lg-3">
                      {datos2.map((fila, index) => (
                        <div className="col" key={index}>

                          <div className="p-3 rounded-4 custom-border-info" style={{ border: '2px solid #637391' }}>

                            <Image src={'./imagenes/' + fila.contenido} alt='imagen' className="img-fluid custom-img-info" />
                          </div>
                          <p className="py-2 fw-bold" style={{ color: '#637391' }}>{fila.titulo}</p>

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
