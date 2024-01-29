import styles from './page.module.css'
import type { Metadata } from 'next'
//import COMPFooter from './components/footer/footer2'
import COMProductoBuscar from './components/proyectos/buscador'
import COMTopInterno from './components/top/topInterno'
import CBreadcrumb from './components/informacion/pagebardump'
import CFormcontactanos from './components/informacion/contactanos'
import {Image} from "react-bootstrap"
export const metadata: Metadata = {
    title: 'Compratulote.pe : Servicios',
    description: 'Pagina incial de compra tu lote',
    icons: {
        icon: '../images/compratulote.ico', // /public path
    },
}
export default function Home() {
    return (
        <>
            <COMTopInterno menu="servicios" />
            <COMProductoBuscar />
            <CBreadcrumb page="servicios" />
            <div className='paginaservicios'>
                <div className="container">
                    <div className="row">
                        <div className="col">
                            ¡Descubre el futuro de los negocios inmobiliarios con CompraTuLote! Transforma tu experiencia en el mercado con nuestras soluciones tecnológicas de vanguardia. Desde herramientas de gestión de propiedades hasta plataformas de análisis de datos, CompraTuLote impulsa tu empresa hacia el éxito. Optimiza procesos, aumenta la eficiencia y potencia tus ventas. ¡CompraTuLote, la clave para llevar tu negocio inmobiliario al siguiente nivel!
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="row pasos">
                                <span className='number'>1</span>
                                <div className="col-md-9 text-start tituloComponentes ">
                                    Utiliza Nuestra <strong>estructura Web</strong>
                                </div>
                                <div className="col-md-3 text-end tituloComponentes">
                                    <i className="bi bi-file-earmark-richtext"></i>
                                    <a className="btn btn-red btn-danger" download="Brochure compratulote.pdf" href='./documentos/brochure.pdf' target='_blank'><i className="bi bi-cloud-download-fill"></i> Brochure</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div className="col-md-12 ">
                            Potencia tu presencia inmobiliaria con la estructura web de CompraTuLote, una plataforma que te permite destacar tus propiedades de manera impactante. Desde fotografías de alta calidad hasta descripciones cautivadoras, nuestra herramienta intuitiva te ayuda a informar de manera efectiva sobre tus desarrollos. Mantén a tus clientes actualizados con nuestras funciones de noticias y eventos, diferenciándote en el competitivo mercado. Únete a CompraTuLote y lleva la presentación de tus propiedades al siguiente nivel, informa, impresiona y destaca.
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-8">
                            <div className='row'>
                                <div className="col-md-4">
                                    <Image src="./images/servicios/estructura/estructura1.png" className="img-fluid" alt="imagen servicio" />
                                </div>
                                <div className="col-md-4">
                                    <Image src="./images/servicios/estructura/estructura2.png" className="img-fluid" alt="imagen servicio" />
                                </div>
                                <div className="col-md-4">
                                    <Image src="./images/servicios/estructura/estructura3.png" className="img-fluid" alt="imagen servicio" />
                                </div>
                                <div className="col-md-4">
                                    <Image src="./images/servicios/estructura/estructura4.png" className="img-fluid" alt="imagen servicio" />
                                </div>
                                <div className="col-md-4">
                                    <Image src="./images/servicios/estructura/estructura5.png" className="img-fluid" alt="imagen servicio" />
                                </div>
                                <div className="col-md-4">
                                    <Image src="./images/servicios/estructura/estructura6.png" className="img-fluid" alt="imagen servicio" />
                                </div>
                                <div className="col-md-4">
                                    <Image src="./images/servicios/estructura/estructura7.png" className="img-fluid" alt="imagen servicio" />
                                </div>
                                <div className="col-md-4">
                                    <Image src="./images/servicios/estructura/estructura8.png" className="img-fluid" alt="imagen servicio" />
                                </div>
                                <div className="col-md-4">
                                    <Image src="./images/servicios/estructura/estructura9.png" className="img-fluid" alt="imagen servicio" />
                                </div>
                            </div>

                        </div>
                        <div className="col-md-4 contenedorasesora">

                            <Image src="./images/servicios/estructura/asesora.png" className="img-fluid imgasesora" alt="imagen servicio" />
                            <div className='fondoasesora'>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
            <div className='container paginaservicios'>
                <div className="row">
                    <div className="col-md-12">
                        <div className="row pasos">
                            <span className='number'>2</span>
                            <div className="col-md-9 text-start tituloComponentes ">
                                <strong>Anuncie</strong> en nuestro portal
                            </div>
                            <div className="col-md-3 text-end tituloComponentes">
                                <i className="bi bi-file-earmark-richtext"></i>
                                <a className="btn btn-red btn-danger" download="Flyer-compratulote.jpg" href='./documentos/flyerinfo.jpg' target='_blank'><i className="bi bi-cloud-download-fill"></i> Flyer Info</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div className="col-md-5 col-sm-6 col-xs-12">
                        <div >
                            Promocione productos o servicios en nuestro portal para alcanzar a una amplia audiencia y aumentar su visibilidad en línea. </div>
                        <Image className='img-fluid' src="/images/servicios/anuncie/imagen.png" alt="Imagen"/>
                    </div>
                    <div className="col-md-7 col-sm-6 col-xs-12 listabeneficiosredes">
                        <div className="row">
                            <div className="col-md-6"><Image src="/images/servicios/anuncie/1.png" alt="texto-icono" /></div>
                            <div className="col-md-6"><Image src="/images/servicios/anuncie/2.png" alt="texto-icono" /></div>
                            <div className="col-md-6"><Image src="/images/servicios/anuncie/3.png" alt="texto-icono" /></div>
                            <div className="col-md-6"><Image src="/images/servicios/anuncie/4.png" alt="texto-icono" /></div>
                        </div>

                    </div>

                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="row pasos">
                            <span className='number'>3</span>
                            <div className="col-md-9 text-start tituloComponentes ">
                                Gestión de <strong>Redes Sociales</strong>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='row'>
                    <div className="col-md-8 col-sm-6 col-xs-12 listabeneficiosredes">
                        <div >
                            Gestionamos el contenido de tus principales redes sociales (Facebook e Instagram), implementando una parrilla de publicaciones acorde con las necesidades de comunicación.
                        </div>
                        <ul>
                            <li><div><i className='bi bi-check-circle'></i> Creamos tu perfil corporativo</div></li>
                            <li><div><i className='bi bi-check-circle'></i> Parrilla de publicaciones</div></li>
                            <li><div><i className='bi bi-check-circle'></i> Gestion de Mensajes y comentarios</div></li>
                            <li><div><i className='bi bi-check-circle'></i> 12 Post Mensuales</div></li>
                            <li><div><i className='bi bi-check-circle'></i> Medición de Resultados</div></li>
                        </ul>
                    </div>
                    <div className="col-md-4 col-sm-6 col-xs-12">
                        <Image className='img-fluid' src="/images/servicios/redes.png" alt=""/>
                    </div>
                </div>

            </div>
            <CFormcontactanos />
            
        </>
    )
}
