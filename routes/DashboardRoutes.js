import { v4 as uuid } from 'uuid';
export const DashboardMenu = [
	{
		id: uuid(),
		title: 'Inicio',
		icon: 'home',
		link: '/'
	},
	{
		id: uuid(),
		title: 'PAGINA EDITABLE',
		grouptitle: true
	},
	{
		id: uuid(),
		title: 'Navbar',
		icon: 'layers',
		link: '/dashboard/navBar'
	},
	{
		id: uuid(),
		title: 'Banner Central',
		icon: 'image',
		link: '/dashboard/bannergb'
	},
	{
		id: uuid(),
		title: 'Informacion',
		icon: 'list',
		link: '/dashboard/informacion'
	},
	{
		id: uuid(),
		title: 'Ubicacion',
		icon: 'map-pin',
		link: '/dashboard/ubicacion'
	},
	{
		id: uuid(),
		title: 'Plano',
		icon: 'map',
		link: '/dashboard/plano'
	},
	{
		id: uuid(),
		title: 'Time Line',
		icon: 'trending-up',
		link: '/dashboard/timeline'
	},
	{
		id: uuid(),
		title: 'Empresa',
		icon: 'life-buoy',
		link: '/dashboard/empresa'
	},
	{
		id: uuid(),
		title: 'Contactame',
		icon: 'mail',
		link: '/dashboard/contactame'
	},
/*	{
		id: uuid(),
		title: 'SEGURIDAD',
		grouptitle: true
	},*/
	/*{
		id: uuid(),
		title: 'User',
		icon: 'user',
		link: '/dashboard/menus'
	},*/
	/*{
		id: uuid(),
		title: 'Autentificacion',
		icon: 'lock',
		children: [
			{ id: uuid(), link: '/authentication/sign-in', name: 'Iniciar Sesion' },
			{ id: uuid(), link: '/authentication/sign-up', name: 'Registrarse' },
			{ id: uuid(), link: '/authentication/forget-password', name: 'Forget Password' }
		]
	},*/
	{
		id: uuid(),
		title: 'OTROS COMPONENTES',
		grouptitle: true
	},
	{
		id: uuid(),
		title: '404 Error',
		icon: 'server',
		link: '/404'
	},
];

export default DashboardMenu;
