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
  const [banners, setBanners] = useState('');
  useEffect(() => {
    const verificador = window.location.pathname.split('/');
    const rptAPI = verificador[verificador.length - 1];

    fetch('/db.json')
      .then(response => response.json())
      .then(json => {
        const data: any[] = json.pgtimeline; 
        setDatos(data);
      })
      .catch(error => console.error("Aquí hay un error", error));
  }, []);

  return (

    <Row className='bg-white m-0'>
      <Card className='p-0'>
        <CTop  />
        <div className="x_content" >
          <CAdorno />
          <div className="container">
            <div className="row g-5">
              <div className="col-md-7 col-lg-8">
                <CAnuncio />

                <div className='container'>
                  <div className='row'>
                    {datos.map((fila, index) => (
                      <Accordion key={index}>
                        <Accordion.Item eventKey="0" style={{ border: 'none', marginBottom: '10px' }}>
                          <Accordion.Header style={{ border: '1px solid lightgray', borderRadius: '7px', paddingTop: '3px', paddingBottom: '3px' }}>
                            <strong> {fila.title}</strong>
                          </Accordion.Header>
                          <Accordion.Body>
                            <div className='row'>
                              {fila.content && (
                                <div dangerouslySetInnerHTML={{ __html: fila.content }} className='image-row'/>
                              )}
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
