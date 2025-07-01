import { type Navigation } from '@toolpad/core/AppProvider';
import { Dashboard, BarChart, TableChart, AttachMoney, AccountCircle } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

export const isAuthenticated = () => {
  const navigate = useNavigate();
  if (!!localStorage.getItem("authUser")) {
    navigate("/login");
  };
  return true
};

export const getNavigation = (): Navigation => {
  const id = localStorage.getItem("authUser");

  return [
    {
      kind: 'header',
      title: 'Main items',
    },
    {
      segment: 'dashboard/' + id,
      title: 'Dashboard',
      icon: <Dashboard />,
    },
    {
      segment: 'table/' + id,
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
      segment: 'insertmoves/' + id,
      title: 'Movimentações',
      icon: <AttachMoney />,
    },
    {
      kind: 'divider',
    },
    {
      segment: 'profile/' + id,
      title: 'Perfil',
      icon: <AccountCircle />,
    }
  ];
};
