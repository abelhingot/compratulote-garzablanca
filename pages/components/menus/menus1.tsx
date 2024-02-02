"use client"
//import { promises as fs } from 'fs';
export default function CMenus({keystring='menu',showcaret=false}) {
  //  const file = await fs.readFile(process.cwd() + '/src/data/menus.json', 'utf8');
   // let menus: any = JSON.parse(file).menus;
    return (
        <ul className={keystring} key={'key_'+keystring}>
            {
         /*   menus.map((item:any)=>{
            return(<li key={keystring+'_'+item.id}>
                <a href={item.href} > 
                    {showcaret && <i className="bi bi-caret-right-fill"></i>}
                    {item.showicontop && <i className="bi bi-caret-right-fill"></i>}
                    {item.texto }
                </a>
            </li>)
            })*/
            } 
        </ul>
        )
  }