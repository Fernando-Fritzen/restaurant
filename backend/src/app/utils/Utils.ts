import { Category } from '../models/Category';
import { Product } from '../models/Product';

const categories = [
  {
    id: '',
    icon: '🍕',
    name: 'Pizza'
  },
  {
    id: '',
    icon: '🍔',
    name: 'Hamburgueres'
  },
  {
    id: '',
    icon: '🥃',
    name: 'Bebidas'
  },
  {
    id: '',
    icon: '🏷',
    name: 'Promoções'
  },
];

const products = [
  {
    name: 'Pizza quatro queijos',
    description: 'Deliciosa pizza de quatro queijos',
    imagePath: null,
    price: 70,
    category: 'Pizza',
    ingredients: [
      {name: 'Mussarela', icon: '🧀'},
      {name: 'Parmesão', icon: '🧀'},
      {name: 'Gouda', icon: '🧀'},
      {name: 'Brie', icon: '🧀'},
    ]
  },
  {
    name: 'Pizza de Bacon',
    description: 'Deliciosa pizza de bacon',
    imagePath: null,
    price: 65.90,
    category: 'Pizza',
    ingredients: [
      {name: 'Mussarela', icon: '🧀'},
      {name: 'Bacon', icon: '🥓'},
      {name: 'Orégano', icon: '🌿'},
    ]
  },
  {
    name: 'Pizza de Peperone',
    description: 'Deliciosa pizza de Peperone',
    imagePath: null,
    price: 65.90,
    category: 'Pizza',
    ingredients: []
  },
  {
    name: 'X-tudo',
    description: 'Delicioso X-Tudo',
    imagePath: null,
    price: 32.89,
    category: 'Hamburgueres',
    ingredients: [
      {name: 'Hamburguer', icon: '🍔'},
      {name: 'Alface', icon: '🥬'},
      {name: 'Tomate', icon: '🍅'},
      {name: 'Queijo Cheddar', icon: '🧀'},
      {name: 'Ovo', icon: '🥚'},
      {name: 'Frango', icon: '🐔'},

    ]
  },
  {
    name: 'Batata Frita',
    description: 'Deliciosas batatas fritas crocantes',
    imagePath: null,
    price: 15,
    category: 'Hamburgueres',
    ingredients: [
      {name: 'Batata', icon: '🍟'},
    ]
  },
  {
    name: 'X-Salada',
    description: 'Delicioso X-salada',
    imagePath: null,
    price: 23.50,
    category: 'Hamburgueres',
    ingredients: [
      {name: 'Hamburguer', icon: '🍔'},
      {name: 'Alface', icon: '🥬'},
      {name: 'Tomate', icon: '🍅'},
      {name: 'Queijo Cheddar', icon: '🧀'},
    ]
  },
  {
    name: 'Cerveja',
    description: 'Cerveja artesanal',
    imagePath: null,
    price: 5,
    category: 'Bebidas',
    ingredients: []
  },
  {
    name: 'Coca Cola',
    description: 'Coca Cola 2 litros',
    imagePath: null,
    price: 12,
    category: 'Bebidas',
    ingredients: []
  }
];

async function createCategories() {
  categories.forEach((category) => {
    Category.create({ icon: category.icon, name: category.name });
  });
}

async function createProducts() {
  products.forEach(product => {
    Product.create({
      name: product.name,
      description: product.description,
      imagePath: product.imagePath,
      price: product.price ? Number(product.price) : 0,
      ingredients: product.ingredients ?? []
    });
  });

}

export async function initializeDatabase() {
  const categories = await Category.find();

  if(categories?.length === 0) {
    await createCategories();
    await createProducts();
  }
}
