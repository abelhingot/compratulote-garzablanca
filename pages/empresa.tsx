"use client"
import CFooter from './components/estructura/footer'
import CFormulario from './components/estructura/formulario'
import CTop from './components/estructura/top'
import CAdorno from './components/estructura/adorno'
import { useEffect, useState } from 'react'
import { Card, Row } from 'react-bootstrap'
export default function EstructuraInicio() {
  const [datos, setDatos] = useState([]);

  useEffect(() => {
    fetch('https://sheet.best/api/sheets/7ae0c5f0-997f-4c88-935e-f4a58678ff5e/tabs/empresa')
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
          setDatos(rows);
        }
      })
      .catch(error => console.error('Error:', error));
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
                  {datos.map((fila, index) => (
                    <div className="container mt-4 gx-5 ">
                      {fila.categoria === "infoup" &&
                        <p dangerouslySetInnerHTML={{ __html: fila.contenido }} />
                      }
                      {fila.categoria === "infodown" &&
                        <div className="row" key={fila.id}>
                          <div className="col-md-12 py-3 text-justify">
                            <h2 className="fw-bold cProyect">
                              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-caret-right-fill" viewBox="0 0 16 16">
                                <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"></path>
                              </svg> {fila.titulo}</h2>
                            {fila.contenido && (
                              <p dangerouslySetInnerHTML={{ __html: fila.contenido }} />
                            )}
                          </div>
                        </div>
                      }
                    </div>
                  ))}
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
