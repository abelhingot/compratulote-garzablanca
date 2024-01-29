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
<<<<<<< HEAD
		title: 'PAGINA EDITABLE',
=======
		title: 'PAGINAS EDITABLES',
>>>>>>> 314253c1b9d2658f547dd600c8f9e63171b22956
		grouptitle: true
	},
	{
		id: uuid(),
<<<<<<< HEAD
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
=======
		title: 'Garza Blanca',
		icon: 'code',
		children: [
			{ id: uuid(), link: '/dashboard/navBar', name: 'Navbar' },
			{ id: uuid(), link: '/dashboard/bannergb', name: 'Banner Central' },
			{ id: uuid(), link: '/dashboard/informacion', name: 'Informacion' },
			{ id: uuid(), link: '/dashboard/ubicacion', name: 'Ubicacion' },
			{ id: uuid(), link: '/dashboard/plano', name: 'Plano' },
			{ id: uuid(), link: '/dashboard/timeline', name: 'TimeLine' },
			{ id: uuid(), link: '/dashboard/empresa', name: 'Empresa' },
			{ id: uuid(), link: '/dashboard/contactame', name: 'Contactame' }
		]
	},
	{
		id: uuid(),
		title: 'Villa Sipan',
		icon: 'code',
		children: [
			{ id: uuid(), link: '/dashboard/navBarvs', name: 'Navbar' },
			{ id: uuid(), link: '/dashboard/bannervs', name: 'Banner Central' },
			{ id: uuid(), link: '/dashboard/informacionvs', name: 'Informacion' },
			{ id: uuid(), link: '/dashboard/ubicacionvs', name: 'Ubicacion' },
			{ id: uuid(), link: '/dashboard/planovs', name: 'Plano' },
			{ id: uuid(), link: '/dashboard/timeline', name: 'TimeLine' },
			{ id: uuid(), link: '/dashboard/empresavs', name: 'Empresa' },
			{ id: uuid(), link: '/dashboard/contactame', name: 'Contactame' }
		]
>>>>>>> 314253c1b9d2658f547dd600c8f9e63171b22956
	},
	{
		id: uuid(),
		title: 'SEGURIDAD',
		grouptitle: true
	},
	{
		id: uuid(),
		title: 'User',
		icon: 'user',
		link: '/dashboard/menus'
	},
	{
		id: uuid(),
		title: 'Autentificacion',
		icon: 'lock',
		children: [
			{ id: uuid(), link: '/authentication/sign-in', name: 'Iniciar Sesion' },
			{ id: uuid(), link: '/authentication/sign-up', name: 'Registrarse' },
			{ id: uuid(), link: '/authentication/forget-password', name: 'Forget Password' }
		]
	},
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
