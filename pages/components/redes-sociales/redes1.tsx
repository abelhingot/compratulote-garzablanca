export default function CRedes({keystring='icon-redes'}) {
    const redes = [
        {id:1, href:'https://www.facebook.com/profile.php?id=61552130754679', icon:'facebook'},
        {id:2, href:'https://instagram.com/compratulote.pe?igshid=MzRlODBiNWFlZA==', icon:'instagram'},
       // {id:2, href:'https://instagram.com/compratulote.pe?igshid=MzRlODBiNWFlZA==', icon:'tik-tok'},
        {id:3, href:'https://www.youtube.com/channel/UCLACV-QsT8icA3h7b-sIRQw', icon:'youtube'},
        {id:4, href:'https://www.linkedin.com/company/99488034/admin/feed/posts/', icon:'linkedin'}
    ];
    return (  
        <ul className={keystring} >  
            {
            redes.map((item)=>{
                return (
                <li key={keystring+'_'+item.id}>
                    
                    <a href={item.href} target="_blank" className="bg-dark text-light text-center" style={{padding:'5.4px', borderRadius:'11px', fontSize:'19px'}}>
                        <i className={`fe fe-${item.icon}`} ></i>
                    </a>
                </li>)
            })
            }
        </ul>
    )
  }