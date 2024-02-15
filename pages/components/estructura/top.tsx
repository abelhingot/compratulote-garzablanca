import CNavbar from "./navbar";
import CBanner from "./banner";
import FacebookShare from "../FacebookShare";
import WhatsappShare from "../WhatsappShare";
export default function CTop() {
   const shareUrl = 'https://tu-sitio.com';
   const quote = '¡Echa un vistazo a mi increíble sitio!';
   const title = 'Compra tu Lote';
   return (
      <>
         <ul className="nav bgProyect fw-bold space-between" >
            <div className="left-items">
               <li className="nav-item">
                  <a className="nav-link text-light fs-5" aria-current="page" href="#">
                     <svg xmlns="http://www.w3.org/2000/svg" width="21" height="22" fill="currentColor" className="bi bi-envelope" viewBox="0 0 16 16">
                        <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z" />
                     </svg> <span className="p">informes@procasanorte.com</span>
                  </a>
               </li>
            </div>
            <div className="right-items">
                              

               <li className="nav-item custom-redsocial" style={{ margin: '-2px' }}>
                  <a className="nav-link " aria-disabled="true"  href="https://www.facebook.com/garzablancacountryclub" target="_blank">
                  
                     <span className="rounded-circle align-items-center">
                     <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" viewBox="0 0 512 512">
                        <path fill="#f7f7f7" d="M512 256C512 114.6 397.4 0 256 0S0 114.6 0 256C0 376 82.7 476.8 194.2 504.5V334.2H141.4V256h52.8V222.3c0-87.1 39.4-127.5 125-127.5c16.2 0 44.2 3.2 55.7 6.4V172c-6-.6-16.5-1-29.6-1c-42 0-58.2 15.9-58.2 57.2V256h83.6l-14.4 78.2H287V510.1C413.8 494.8 512 386.9 512 256h0z"/></svg>
                     </span>
                  </a>
               </li>

               <li className="nav-item custom-redsocial" style={{ margin: '-2px' }}>
                  <a className="nav-link text-light " aria-disabled="true" href="//www.instagram.com/procasanorteinmobiliaria/" target="_blank">
                     <span className="rounded-circle text-center">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" viewBox="0 0 448 512">
                           <path fill="#f7f7f7" d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"></path>
                        </svg>
                     </span>
                  </a>
               </li>
               <li className="nav-item custom-redsocial" style={{ margin: '-2px' }}>
               <a className="nav-link text-light " aria-disabled="true" href="//www.youtube.com/@procasanortechiclayo6981" target="_blank"><span className="rounded-circle text-center"><svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg></span></a>
               </li>
               
               
               
               </div>
         </ul>

         <CNavbar />

         <CBanner />

      </>
   )
}