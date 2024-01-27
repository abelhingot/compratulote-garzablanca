import type { Metadata } from 'next'
import COMPTop from './components/top/top2'
import COMPFooter from './components/footer/footer2'
import COMPAnuncio1 from './components/anuncios/anuncio1'
import COMPAuspiciadores from './components/slider/auspiciadores'
import COMPProyectos from './components/proyectos/proyectos1'
import COMInfo from './components/informacion/info'
import COMNosotros from './components/nosotros/nosotros'
import COMProductoBuscar from './components/proyectos/buscador'
export const metadata: Metadata = {
  title: 'Compratulote.pe : Inicio',
  description: 'Pagina incial de compra tu lote',
  icons: {
    icon: '/images/compratulote.ico', // /public path
  },
//<COMPFooter />
}
export default function Home2() {
  return (
    <>
     <COMPTop />
     <COMProductoBuscar />    
     <COMPProyectos />
     <COMPAuspiciadores />
     <COMNosotros />
     <COMInfo />
     <COMPAnuncio1 />
     <COMPFooter/>
    </>
  )
}