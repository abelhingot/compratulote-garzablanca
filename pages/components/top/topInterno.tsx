import CMenusTop from "../menus/menutop";
import CAnimacion from "../slider/animacion";
import {Image} from "react-bootstrap"
import CTop1 from "./top1";
import { Link } from "react-bootstrap-icons";

export default function CTopInterno(props:any) {
    const menu=props.menu||'inicio';
  return (
    <>
    <CTop1 />
    <div className="bg-blanco">
      <div className="container topbarlogo">
        <div className="row">
          <div className="text-center text-md-start col-sm-12 col-md-4">
             <Link href="/"><a  title="logo"><Image src="/logo1.png" alt=""/></a></Link>
          </div>
          <div className="text-center text-md-end col-sm-12 col-md-8 ">     
              <div className="row infocontact">
                <div className="col-sm-12 col-md-6">
                  <i className="fe fe-phone icontop"></i> 074-307092
                </div>
                <div className="col-sm-12 col-md-6">
                  <i className="fe fe-mail icontop "></i> info@imnovate.pe
                </div>
              </div>
          </div>
        </div>        
      </div>
      <CMenusTop  menu={menu}/>
      <CAnimacion menu={menu==='clientes/auspiciadores'?'clientes':menu} />
    </div>
    </>
   )
 }