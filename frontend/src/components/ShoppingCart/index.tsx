import { Actions, ModalBody, OrderDetails, Overlay } from './styles';
import closeIcon from '../../assets/images/close-icon.svg';
import { formatCurrency } from '../../utils/formatCurrency';
import { CartItem } from '../../types/CartItem';

interface ShoppingCartProps {
  visible: boolean;
  cartItems: CartItem[];
  onClose: () => void;
  selectAction: () => void;
}

export function ShoppingCart({ visible, cartItems, onClose, selectAction }: ShoppingCartProps) {
  if (!visible || !cartItems) {
    return null;
  }

  const total = cartItems.reduce((total, { product, quantity }) => {
    return total + (product.price * quantity);
  }, 0);

  return (
    <Overlay>
      <ModalBody>
        <header>
          <strong>Mesa 1</strong>

          <button type='button' onClick={onClose}>
            <img src={closeIcon} alt="Ìcone de fechar" />
          </button>
        </header>

        <OrderDetails>
          <strong>Itens</strong>

          <div className="order-items">
            {cartItems.map(({product, quantity }) => (
              <div className="item" key={`${product}-${quantity}`}>
                <img
                  src={`http://localhost:3001/uploads/${product.imagePath ?? 'not-found'}`}
                  alt={product.name}
                  width="56"
                  height="28.51"
                />

                <span className="quantity">{quantity}x</span>
                <div className="product-details">
                  <strong>{product.name}</strong>
                  <span>{formatCurrency(product.price)}</span>
                </div>
              </div>
            ))}
          </div>


          <div className="total">
            <span>Total</span>
            <strong>{formatCurrency(total)}</strong>
          </div>

        </OrderDetails>

        <Actions>
          <button
            type='button'
            className='primary'
            onClick={selectAction}
          >
            <strong>
                Fazer Pedido
            </strong>
          </button>
        </Actions>

      </ModalBody>
    </Overlay>
  );
}
