import type { Metadata } from 'next'
import COMTopInterno from './components/top/topInterno'
//import COMPFooter from './components/footer/footer2'
import COMPAnuncio1 from './components/anuncios/anuncio1'
import COMPAuspiciadores from './components/slider/auspiciadores'
import COMPProyectos from './pages/proyectos/proyectos1'
import COMInfo from './components/informacion/info'
import COMNosotros from './components/nosotros/nosotros'
import COMProductoBuscar from './pages/proyectos/buscador'
import CBreadcrumb from './components/informacion/pagebardump'
import CListadoPublicidad from './components/publicidad/listado'
import {Image} from "react-bootstrap"
export const metadata: Metadata = {
  title: 'Compratulote.pe : Clientes',
  description: 'Pagina incial de compra tu lote',
  icons: {
    icon: '/images/compratulote.ico', // /public path
  },
}
export default function Clientes() {
  return (
    <>
     <COMTopInterno menu="clientes/auspiciadores" />
     <COMProductoBuscar />
     <CBreadcrumb page="clientes/auspiciadores"/>
     <div className='container pageclientes'> 
        <div className="div">
          <div className="col">
           

          </div>
        </div>     
        <div className='row'>
          <div className='col-xs-12 col-sm-8 col-md-8 '>
            <div className="row">
              <div className='col-md-4 cols-ms-4'>
                <Image src="auspiciadores1.jpg" className="img-fluid" alt=""/>
              </div>
              <div className='col-md-4 cols-ms-4'>
                <Image src="auspiciadores2.jpg" className="img-fluid" alt=""/>
              </div>
              <div className='col-md-4 cols-ms-4'>
                <Image src="auspiciadores3.jpg" className="img-fluid" alt=""/>
              </div>
              <div className='col-md-4 cols-ms-4'>
                <Image src="auspiciadores4.jpg" className="img-fluid" alt=""/>
              </div>
              <div className='col-md-4 cols-ms-4'>
                <Image src="auspiciadores1.jpg" className="img-fluid" alt=""/>
              </div>
              <div className='col-md-4 cols-ms-4'>
                <Image src="auspiciadores2.jpg" className="img-fluid" alt=""/>
              </div>
            </div>
          </div>
          <div className='col-xs-12 col-sm-4 col-md-4'>            
            <div>
             <CListadoPublicidad />
            </div>
          </div>
        </div>
      </div>
      <COMPAnuncio1 />
      
    </>
  )
}
