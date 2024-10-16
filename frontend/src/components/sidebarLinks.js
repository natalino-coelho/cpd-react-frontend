import { Home, Mail, Devices, Person, Settings } from '@mui/icons-material';

export const sidebarLinks = [
  {
    text: 'Home',
    path: '/home',
    icon: <Home />,
  },
  {
    text: 'Administração',
    path: '/adm',
    icon: <Settings />,
  },
  {
    text: 'TI',
    path: '/gti',
    icon: <Devices />,
  },
  {
    text: 'Contato',
    path: '/contact',
    icon: <Mail />,
  }
];

// Link que aparecerá na parte inferior da sidebar
export const profileLink = {
  text: 'Usuário',
  path: '/profile',
  icon: <Person />,
};