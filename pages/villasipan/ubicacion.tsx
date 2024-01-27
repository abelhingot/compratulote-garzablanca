"use client"
import CFooter from '../components/estructura/footer'
import CFormulario from './componentes/formulario'
import CTop from './componentes/top'
import CAdorno from './componentes/adorno'
import { Card, Row } from 'react-bootstrap'
import CUbicacion from './componentes/ubicacion'
import { useEffect, useState } from 'react'
export default function EstructuraInicio() {
  const [datos, setDatos] = useState([]);
  useEffect(() => {
    fetch('http://localhost:3001/pgubicaciongb')
      .then(response => response.json())
      .then(data => setDatos(data))
      .catch(error => console.error('Error al obtener datos:', error));
  }, []);

  return (
    <>
      <Row className='bg-white m-0'>
        <Card className='p-0'>
          <CTop selMenu="ubicacion" pagenav="./../" />
          <div className="x_content" >
            <CAdorno />
            <div className="container">
              <div className="row g-5">
                {datos.map((fila, index) => (
                  <div className="col-md-7 col-lg-8">
                    <h2 className="fw-bold cProyect2">{fila.titulo}</h2>
                    <div className="container mt-4">
                      <div className="row">
                        <div className="d-grid gap-2 d-md-block pb-3">
                          <a href={fila.ruta1} target='_blank'> <button className="btn bgProyect2 text-light fw-bold" type="button">{fila.boton1}</button></a>&nbsp;
                          <a href={fila.ruta2} target='_blank'><button className="btn btn-secondary fw-bold" type="button">{fila.boton2}</button></a>
                        </div>
                        <iframe src={fila.iframe} width="600" height="450" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                      </div>
                    </div>
                  </div>
                ))}
                <CFormulario />
                <hr className="my-4 cProyect2 border-3" />
                <CUbicacion />
              </div>
            </div>
          </div>
          <CFooter rutatmp='./../../' />
        </Card>
      </Row>
    </>
  )
}
