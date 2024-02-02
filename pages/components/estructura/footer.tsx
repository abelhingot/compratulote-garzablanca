import {Image} from "react-bootstrap"
export default function CFooter(props: any) {
   let ruta = props.rutatmp || './'
   return (
      <>
            <footer className="bg-dark text-light text-center py-3">
               <div className="container">
                  <p>Copyright &copy; 2024 Villa Sipan | Desarrollado por Compratulote.pe</p>
               </div>
            </footer>
            <div>
               <a target="_blank" href="https://api.whatsapp.com/send?phone=51954498176" className="icon-footer-whatssap">
                  <Image className="" src={ruta + 'images/icon-whatsapp.png'} alt=""/></a>
            </div>
         
      </>
   )
}