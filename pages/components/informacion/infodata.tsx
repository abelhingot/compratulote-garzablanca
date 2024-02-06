import {Image} from "react-bootstrap"
export const infodata=[
    {
        id:1, title:'Gestiona tu información',
        descripcion:'Gestiona la información de tu proyecto inmobiliario a través de la implementación de nuestra estructura web responsive.',
        active:true,
        icon:'informacion/imagen1.png'
    },
    {
        id:2, title:'Anuncia tu Proyecto',
        descripcion:'Promociona tu proyecto inmobiliario a través de nuestros canales publicitarios (redes sociales y portal web)',
        active:false,
        icon:'informacion/imagen2.png'
    },
    {
        id:3, title:'Gestiona tu contenido',
        descripcion:'Utiliza nuestros sistemas de información para administrar tu proyecto inmobiliario.',
        active:false,
        icon:'informacion/imagen3.png'
    }
]
export default function CInfoData({idkey="1"}) {
    var _datainfo=infodata.filter((item)=>item.id.toString()==idkey.toString());
    var classactive=idkey=="1"?'active':'';
    return (  
        <div className={'infodata text-justify '+classactive} key={'infodata'+idkey}>  
            {      
            _datainfo.map((item)=>{               
                return (<div key={'infodata'+idkey+'_'+item.id} className="infodataitem">
                    <Image src={item.icon} className="iconinfodata" alt=""/>
                    <strong>{item.title}</strong>
                    <p>{item.descripcion}</p>
                </div>)
            })
            } 
        </div>
        )
}