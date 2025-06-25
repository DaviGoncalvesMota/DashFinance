import { type Navigation } from '@toolpad/core/AppProvider';
import { Dashboard, BarChart, TableChart, AttachMoney, AccountCircle } from '@mui/icons-material';


export const NAVIGATION: Navigation = [
  {
    kind: 'header',
    title: 'Main items',
  },
  {
    segment: 'dashboard',
    title: 'Dashboard',
    icon: <Dashboard />,
  },
  {
    segment: 'table',
    title: 'Tabela',
    icon: <TableChart />,
  },
  {
    kind: 'divider',
  },
  {
    segment: 'about',
    title: 'Sobre',
    icon: <BarChart />,
  },
  {
    segment: 'insertmoves',
    title: 'Movimentações',
    icon: <AttachMoney />,
  },
  {
    kind: 'divider',
  },
  {
    segment: 'profile',
    title: 'Perfil',
    icon: <AccountCircle />,
  }
];