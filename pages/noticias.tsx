import type { Metadata } from 'next'
import COMTopInterno from './components/top/topInterno'
//import COMPFooter from './components/footer/footer2'
import COMPAnuncio1 from './components/anuncios/anuncio1'
import COMPAuspiciadores from './components/slider/auspiciadores'
import COMProductoBuscar from './components/proyectos/buscador'
import CVernoticias from './components/noticias/ver'
import CCategoriasnoticias from './components/noticias/categorias'
import CRecientesnoticias from './components/noticias/recientes'
import CBreadcrumb from './components/informacion/pagebardump'
import CSharesocial from './components/redes-sociales/share'

export const metadata: Metadata = {
  title: 'Compratulote.pe : Noticias',
  description: 'Pagina incial de compra tu lote',
  icons: {
    icon: '/images/compratulote.ico', // /public path
  },
}
export default function Noticias() {
  return (
    <>
     <COMTopInterno menu="noticias" />
     <COMProductoBuscar />
     <CBreadcrumb page="noticias"/>
      <div className='container pagenoticia' id="sharenoticia">      
        <div className='row'>
          <div className='col-xs-12 col-sm-8 col-md-8 '>
          <CVernoticias idnoticia="1" />
            <CSharesocial url="/noticias" idshare="sharenoticia" />
          </div>
          <div className='col-xs-12 col-sm-4 col-md-4'>            
            <div>
              <CCategoriasnoticias />
              <CRecientesnoticias />
            </div>
          </div>
        </div>
      </div>     
     <COMPAuspiciadores />
     <COMPAnuncio1 />
 
    </>
  )
}
