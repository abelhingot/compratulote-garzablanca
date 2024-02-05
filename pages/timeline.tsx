"use client"
import CFooter from './components/estructura/footer'
import CTop from './components/estructura/top'
import CFormulario from './components/estructura/formulario'
import CAdorno from './components/estructura/adorno'
import { Accordion, Card, Row } from 'react-bootstrap'
import CAnuncio from './components/estructura/anuncio'
import { useEffect, useState } from 'react'

export default function EstructuraInicio() {
  const [datos, setDatos] = useState([]);
  const [datos2, setDatos2] = useState([]);
  useEffect(() => {
    fetch('https://sheet.best/api/sheets/7ae0c5f0-997f-4c88-935e-f4a58678ff5e/tabs/timeline')
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
          const filtro2 = rows.filter(fila => fila.categoria === "infodown");
          setDatos2(filtro2);
        }
      })
      .catch(error => console.error('Error:', error));
  }, []);

  return (

    <Row className='bg-white m-0'>
      <Card className='p-0'>
        <CTop />
        <div className="x_content" >
          <CAdorno />
          <div className="container">
            <div className="row g-5">
              <div className="col-md-7 col-lg-8">
                {datos.map((fila, index) => (
                  <Row className="mb-1" key={index}>
                    <p className="txt-jf" dangerouslySetInnerHTML={{ __html: fila.contenido }} />

                  </Row>
                ))}
                <div className='container'>
                  <div className='row'>
                    {datos2.map((fila, index) => (
                      <Accordion key={index}>
                        <Accordion.Item eventKey="0" style={{ border: 'none', marginBottom: '10px' }}>
                          <Accordion.Header style={{ border: '1px solid lightgray', borderRadius: '7px', paddingTop: '3px', paddingBottom: '3px' }}>
                            <strong> {fila.titulo}</strong>
                          </Accordion.Header>
                          <Accordion.Body>
                            <div className='row'>
                                <div dangerouslySetInnerHTML={{ __html: fila.contenido }} className='image-row' />
                            </div>
                          </Accordion.Body>
                        </Accordion.Item>
                      </Accordion>
                    ))}
                  </div>
                </div>
              </div>
              <CFormulario />
              <br />
            </div>
          </div>
          <br />
        </div>
        <CFooter rutatmp='./../../' />
      </Card>
    </Row>

  )
}
