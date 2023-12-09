import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Autor',
    icon: 'person-outline',
    link: '/pages/autor/listar',
    home: true,
  },
  {
    title: 'Publicacion',
    icon: 'book-outline', 
    link: '/pages/publicacion/listar',
  },
  {
    title: 'Tipo Publicacion',
    icon: 'file-text-outline',
    link: '/pages/tipopublicacion/listar',
  },
  {
    title: 'Autor Publicacion',
    icon: 'people-outline', 
    link: '/pages/autorpublicacion/listar',
  },
  {
    title: 'Login',
    icon: 'lock-outline',
    children: [
      {
        title: 'Login',
        link: '/pages/seguridad/login',
      },
    ],
  },
];
