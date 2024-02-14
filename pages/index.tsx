  import type { Metadata } from 'next'
  import Pinformacion from './informacion'
  
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
        
        <Pinformacion />
      </>
    )
  }





 