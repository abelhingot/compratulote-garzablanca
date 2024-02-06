import { ReactElement } from "react";
import {Image} from "react-bootstrap"
import CMenus from "../menus/menus1";
import CRedes from "../redes-sociales/redes1";
import CFooter1 from "./footer1";
import {Image} from "react-bootstrap"
import { Link } from "react-bootstrap-icons";
export default function CFooter2() {
    return (
        <div className="bg-blanco">
            <div className="container footer">
                <div className="row" >
                    <div className="col-sm-12 col-md-4 text-center">
                       <Link href="/"> <a  title="logo"><Image src="/logo1.png" alt=""/></a></Link>
                        <br />
                        <div className="slogan text-center">
                            ¡El lote perfecto a un solo clic!
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-4 menu">
                        <div className="footerTitulo">
                            Enlaces
                        </div>
                        <CMenus keystring="menufooter" showcaret={true} />
                    </div>
                    <div className="col-sm-12 col-md-4 footer-redes">
                        <div className="footerTitulo">
                            Redes Sociales
                        </div>
                        <CRedes keystring="footer-redes" />
                    </div>
                </div>
            </div>

            <CFooter1 />
        </div>
    )
}