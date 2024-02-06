"use client"
import CFooter from './components/estructura/footer'
import CFormulario from './components/estructura/formulario'
import CTop from './components/estructura/top'
import CAdorno from './components/estructura/adorno'
import CAnuncio from './components/estructura/anuncio'
import { useEffect, useState } from 'react'
import { Card, Row } from 'react-bootstrap'
export default function EstructuraInicio() {
  const [datos, setDatos] = useState([]);
  const [banners, setBanners] = useState('');

  useEffect(() => {
    const verificador = window.location.pathname.split('/');
    const rptAPI = verificador[verificador.length - 1];

    fetch('/db.json')
      .then(response => response.json())
      .then(json => {
        const data: any[] = json.pgempresa;
        setDatos(data);
      })
      .catch(error => console.error('Tenemos un error', error));
  }, []);

  return (
    <>

      <Row className='bg-white m-0'>
        <Card className='p-0'>
          <CTop />
          <div className="x_content" >
            <CAdorno />
            <div className="container">
              <div className="row g-5 mb-3">
                <div className="col-md-7 col-lg-8">
                  <CAnuncio />
                  <div className="container mt-4 gx-5 ">
                    {datos.map((fila, index) => (
                      <div className="row" key={fila.id}>
                        <div className="col-md-12 py-3 text-justify">
                          <h2 className="fw-bold cProyect">
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-caret-right-fill" viewBox="0 0 16 16">
                              <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"></path>
                            </svg> {fila.title}</h2>
                          {fila.content && (
                            <p dangerouslySetInnerHTML={{ __html: fila.content }} />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <CFormulario />
              </div>
            </div>
          </div>
          <CFooter rutatmp='./../../' />
        </Card>
      </Row>
    </>
  )
}
