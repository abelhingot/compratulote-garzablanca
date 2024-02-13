import { Link } from "react-bootstrap-icons";
import {Image} from "react-bootstrap";

export default function CFooter1() {
    return (
    <>
    <div className="footer1">
      <div className="container">
        <div className="row" >
          <div className="text-center col-sm-12 col-md-6">
              2024 Compratulote.pe - All right reserved
          </div>
          <div className="text-center col-sm-12 col-md-6">
            <Link href="/"><a >  <i className="bi bi-caret-right-fill"></i> Terminos y Condiciones  </a></Link>
          </div>
        </div>
      </div>
    </div>
    <div> 
      <a target="_blank" href="https://api.whatsapp.com/send?phone=51954498176" className="icon-footer-whatssap">
        <Image className="" src="./images/icon-whatsapp.png" alt="" /></a>
    </div>
    </>
    )
  }