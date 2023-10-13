import logo from '../../assets/images/logo.svg';

import { Button, Container, Content } from './styles';

interface HeaderProps {
  description: string
  buttonText: string
  onClickButton: () => void
}

export function Header({description, buttonText, onClickButton}: HeaderProps) {
  return (
    <Container>
      <Content>
        <div className="page-details">
          <h1>Pedidos</h1>
          <h2>{description}</h2>
          <Button onClick={onClickButton}>{buttonText}</Button>
        </div>

        <img src={logo} alt="WAITERAPP" />
      </Content>
    </Container>
  );
}
