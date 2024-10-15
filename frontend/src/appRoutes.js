import Home from "./pages/Home/Home"; // Supondo que o componente Home está em src/pages
import Contact from "./pages/Contact/Contact";
import Profile from "./pages/Profile/Profile";
import Login from "./pages/Login/Login";
import DashboardLayout from "./components/DashboardLayout";
import GTI from "./pages/GTI/GTI";

const appRoutes = [
  {
    path: "/",
    element: <Login />,
    title: 'CPD - Login'
  },
  {
    path: "/home",
    element: (
      <DashboardLayout>
        <Home />
      </DashboardLayout>
    ),
    title: 'CPD - Home'
  },
  {
    path: "/contact",
    element: (
      <DashboardLayout>
        <Contact />
      </DashboardLayout>
    ),
    title: 'CPD - Contato'
  },
  {
    path: "/profile",
    element: (
      <DashboardLayout>
        <Profile />
      </DashboardLayout>
    ),
    title: 'CPD - Usuário'
  },
  {
    path: "/gti",
    element: (
      <DashboardLayout>
        <GTI />
      </DashboardLayout>
    ),
    title: 'CPD - TI'
  },
  // Você pode adicionar mais rotas aqui conforme necessário
];

export default appRoutes;
