import { Image } from "react-bootstrap"
export default function CFormcontactanos(props:any) {
    return(
        <>
            <div className='row fondocontacto'>
                <div className="col-md-12">
                    <div className='container '>
                        <div className='row'>
                            <div className='col-xs-12 col-sm-4 col-md-3'>
                                <Image src="/images/servicios/contactanos/personaje.png" className="img-fluid" alt=""/>
                            </div>
                            <div className="col-xs-12 col-sm-8 col-md-9 formulariocontacto">
                           <div className="row">
                            <div className="col-md-12 text-start tituloComponentes">
                          
                            Quiero que me  <strong>contacten</strong>
                          
                            </div>
                           </div>
                            <form className="row">
                                <div className="col-md-6 col-sm-6 col-xs-12">
                                    <label  className="form-label">Nombres :</label>
                                    <input type="text" className="form-control" id="exampleInputEmail1"  placeholder="Ingresa tu nombre"/>
                                </div>
                                <div className="col-md-6 col-sm-6 col-xs-12">
                                    <label  className="form-label">Celular :</label>
                                    <input type="text" className="form-control" id="exampleInputEmail1"  placeholder="N° Celular"/>
                                </div>
                                <div className="col-md-6 col-sm-6 col-xs-12">
                                    <label  className="form-label">Apellidos :</label>
                                    <input type="text" className="form-control" id="exampleInputEmail1"  placeholder="Ingresa tus Apellidos"/>
                                </div>
                                <div className="col-md-6 col-sm-6 col-xs-12">
                                    <label className="form-label">Correo: </label>
                                    <input type="email" className="form-control" id="exampleInputEmail1"  placeholder="Correo Electronico"/>
                                </div>
                                <div className="col-md-6 col-sm-6 col-xs-12">
                                    <label  className="form-label">DNI :</label>
                                    <input type="text" className="form-control" id="exampleInputEmail1"  placeholder="N° DNI"/>
                                </div>

                                <div className="col-md-6 col-sm-6 col-xs-12">
                                    
                                    <button type="submit" className="btn btnenviar">Enviar</button>                                    
                                </div>                              
                                
                            </form>


                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}