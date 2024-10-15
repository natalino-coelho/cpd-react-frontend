import Home from "./pages/Home/Home"; // Supondo que o componente Home está em src/pages
import Contact from "./pages/Contact/Contact";
import Profile from "./pages/Profile/Profile";
import Login from "./pages/Login/Login";
import DashboardLayout from "./components/DashboardLayout";
import GTI from "./pages/GTI/GTI";
import Suppliers from "./pages/GTI/Registers/Suppliers/Suppliers";
import Products from "./pages/GTI/Registers/Products/Products";
import Services from "./pages/GTI/Registers/Services/Services";
import Registers from "./pages/GTI/Registers/Registers";
import Persons from "./pages/GTI/Registers/Persons/Persons";
import Documents from "./pages/GTI/Registers/Documents/Documents";
import Calls from "./pages/GTI/Calls/Calls";

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
  {
    path: "/gti/registers",
    element: (
      <DashboardLayout>
        <Registers />
      </DashboardLayout>
    ),
    title: 'CPD - Cadastros'
  },
  {
    path: "/gti/registers/persons",
    element: (
      <DashboardLayout>
        <Persons />
      </DashboardLayout>
    ),
    title: 'CPD - Pessoas'
  },
  {
    path: "/gti/registers/suppliers",
    element: (
      <DashboardLayout>
        <Suppliers />
      </DashboardLayout>
    ),
    title: 'CPD - Fornecedores'
  },
  {
    path: "/gti/registers/products",
    element: (
      <DashboardLayout>
        <Products />
      </DashboardLayout>
    ),
    title: 'CPD - Produtos'
  },
  {
    path: "/gti/registers/services",
    element: (
      <DashboardLayout>
        <Services />
      </DashboardLayout>
    ),
    title: 'CPD - Serviços'
  },
  {
    path: "/gti/registers/documents",
    element: (
      <DashboardLayout>
        <Documents />
      </DashboardLayout>
    ),
    title: 'CPD - Documentos'
  },
  {
    path: "/gti/calls",
    element: (
      <DashboardLayout>
        <Calls />
      </DashboardLayout>
    ),
    title: 'CPD - Chamados'
  },
  // Você pode adicionar mais rotas aqui conforme necessário
];

export default appRoutes;
