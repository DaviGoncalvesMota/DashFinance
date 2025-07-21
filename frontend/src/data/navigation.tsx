import { AccountCircle, AttachMoney, BarChart, Dashboard, TableChart } from "@mui/icons-material";
import type { JSX } from "react";

// Define the Navigation type if not already defined or import it from its module
type NavigationItem = {
  kind?: 'header' | 'divider';
  segment?: string;
  title?: string;
  icon?: JSX.Element;
};

type Navigation = NavigationItem[];

export const getNavigation = (): Navigation => {
  const id = localStorage.getItem("authUser");

  if (!id) {
    return [
      {
        kind: 'header',
        title: 'Carregando...',
      }
    ];
  }

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
      segment: 'about/' + id,
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
