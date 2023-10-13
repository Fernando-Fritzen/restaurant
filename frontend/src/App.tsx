import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Header } from './components/Header';
import { Orders } from './components/Orders';
import { GlobalStyles } from './styles/GlobalStyles';
import { useState } from 'react';
import { Menu } from './components/Menu';

export function App() {
  const [showMenu, setShowMenu] = useState(false);

  function handleShowMenu() {
    setShowMenu(prevState => !prevState);
  }

  return (
    <>
      <GlobalStyles />
      <Header description={showMenu ? 'Mesa 1' : 'Acompanhe os pedidos dos clientes'} buttonText={`Mudar para ${showMenu ? 'pedidos' : 'menu'}`} onClickButton={handleShowMenu} />
      {showMenu ?
        <Menu /> :
        <Orders />
      }
      <ToastContainer position="top-right" />
    </>
  );
}
