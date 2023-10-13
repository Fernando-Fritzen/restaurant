import { useEffect, useState } from 'react';
import { Container, ItemContainer, ItemTitle, ShoppingCartInfo } from './styles';
import { CartItem } from '../../types/CartItem';
import { Category } from '../../types/Category';
import { Product } from '../../types/Product';
import { api } from '../../utils/api';
import { toast } from 'react-toastify';
import { ShoppingCart } from '../ShoppingCart';

export function Menu() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    Promise.all([
      api.get('categories'),
      api.get('products')
    ]).then(([categoriesResponse, productsResponse]) => {
      setCategories(categoriesResponse.data);
      setProducts(productsResponse.data);
      setIsLoading(false);
    });
  }, []);

  function handleAddToCart(product: Product) {

    setCartItems((prevState) => {
      const itemIndex = prevState.findIndex(
        cartItem => cartItem.product._id === product._id
      );

      if (itemIndex < 0) {
        return prevState.concat({
          quantity: 1,
          product,
        });
      }

      const newCartItems = [...prevState];
      const item = newCartItems[itemIndex];

      newCartItems[itemIndex] = {
        ...item,
        quantity: item.quantity + 1,
      };

      return newCartItems;

    });

    toast.success(`O item ${product.name} foi adicionado à sacola!`);
  }

  async function handleConfirmOrder() {
    setIsLoading(true);

    await api.post('orders', {
      table: 1,
      products: cartItems.map(cartItem => ({
        product: cartItem.product._id,
        quantity: cartItem.quantity,
      }))
    });
    toast.success('Pedido efetuado com sucesso!');
    setIsLoading(false);
    setIsModalVisible(false);
  }

  const cartTotal = cartItems.reduce((total, { product, quantity }) => {
    return total + (product.price * quantity);
  }, 0);

  function handleOpenModal() {
    setIsModalVisible(false);
  }

  return (
    <>
      <Container>
        {
          isModalVisible &&
        <ShoppingCart visible={isModalVisible} cartItems={cartItems} onClose={handleOpenModal} selectAction={handleConfirmOrder} />

        }
        {
          products.map(product => (
            <ItemContainer key={product._id}>
              <ItemTitle>
                <strong>{product.name}</strong>
              </ItemTitle>
              <div>
                <p>{product.description}</p>
              </div>
              <div>
                <button onClick={() => handleAddToCart(product)}>Adicionar</button>
                <strong>R$ {product.price}</strong>
              </div>
            </ItemContainer>
          ))
        }

        {
          cartItems.length > 0 &&
          (<ShoppingCartInfo onClick={() => setIsModalVisible(true)}>
            <strong>R$ {cartTotal}</strong>
            <span>Ver pedido --{`${'>'}`}</span>
          </ShoppingCartInfo>)
        }

      </Container>
    </>
  );
}
