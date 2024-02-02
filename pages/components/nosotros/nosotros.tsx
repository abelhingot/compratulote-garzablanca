import {Image} from "react-bootstrap"
export default function CNosotros(){
    return (
        <>
        <div className="container">
            <div className="row">
                <div className="col-md-12 col-sm-12 tituloComponentes">                 
                        Sobre <strong>Nosotros</strong>   
                </div>                 
            </div> 
            <div className="row">
                <div className="col-md-6 col-sm-12 infonosotros">
                    <div className="tituloComponentes">
                        ¿QUIENES  <strong>SOMOS </strong> ?
                    </div>
                    <div className="textonosotros">
                        Es una plataforma digital creada  para impulsar y promover los proyectos 
                        inmobiliarios de venta  de terrenos y lotes. Es una plataforma digital creada  
                        para impulsar y promover los proyectos inmobiliarios de venta  de terrenos y lotes.
                    </div>
                </div>
                <div className="col-md-6 col-sm-12">
                  <Image src="responsive.png" className="img-fluid" alt=""/>
                </div>
            </div>    
        </div>
        </>
    )
}