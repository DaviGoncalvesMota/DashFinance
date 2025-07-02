import { type Navigation } from '@toolpad/core/AppProvider';
import { Dashboard, BarChart, TableChart, AttachMoney, AccountCircle } from '@mui/icons-material';

export const getNavigation = (): Navigation => {
  const idStr = localStorage.getItem("authUser");
  const id = idStr && !isNaN(Number(idStr)) ? Number(idStr) : undefined;

  return [
    {
      kind: 'header',
      title: 'Main items',
    },
    {
      segment: 'dashboard/' + (id ?? ''),
      title: 'Dashboard',
      icon: <Dashboard />,
    },
    {
      segment: 'table/' + (id ?? ''),
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
      segment: 'insertmoves/' + (id ?? ''),
      title: 'Movimentações',
      icon: <AttachMoney />,
    },
    {
      kind: 'divider',
    },
    {
      segment: 'profile/' + (id ?? ''),
      title: 'Perfil',
      icon: <AccountCircle />,
    }
  ];
};