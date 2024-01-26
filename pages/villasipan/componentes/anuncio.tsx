import { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
export default function VSanuncio() {
  const [datos, setDatos] = useState([]);
  const [banners, setBanners] = useState('');
  useEffect(() => {
    const verificador = window.location.pathname.split('/');
    const rptAPI = verificador[verificador.length - 1];
    fetch('http://localhost:3001/pginformacionvs')
      .then(response => response.json())
      .then(data => {
        const filtrado = data.filter(fila => fila.categoria === rptAPI);
        setDatos(filtrado);
        setBanners(rptAPI);
      })
      .catch(error => console.error('Tenemos un error', error));
  }, []);
  return (
    <>

      {datos.map((fila, index) => (
        <div key={index}>
          {fila.categoria === 'empresa' ? (
            <>
              <p className="txt-jf" dangerouslySetInnerHTML={{ __html: fila.content }} /> 
              <Row className="mb-1">
                <div className="col-md-6 col-6">
                  <img src={fila.recurso1} className='img-thumbnail rounded-4' alt='Text' />
                </div>

                <div className="col-md-6 col-6">
                  <img src={fila.recurso2} className='img-thumbnail rounded-4' alt='Text2' />
                </div>
              </Row>
            </>
          ) : (
            <Row className="mb-1"> 
            <p className="txt-jf" dangerouslySetInnerHTML={{ __html: fila.content }} />
           
          </Row>
          )}

        </div>
      ))}
    </>
  )
}