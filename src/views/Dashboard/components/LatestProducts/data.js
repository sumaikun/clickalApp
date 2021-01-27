import uuid from 'uuid/v1';
import moment from 'moment';

export default [
  {
    id: uuid(),
    name: '$150.000.oo',
    imageUrl: 'https://simpleicon.com/wp-content/uploads/coin-money-2.png',
    updatedAt: moment().subtract(2, 'hours')
  },
  {
    id: uuid(),
    name: '$250.000.oo',
    imageUrl: 'https://simpleicon.com/wp-content/uploads/coin-money-2.png',
    updatedAt: moment().subtract(2, 'hours')
  },
  {
    id: uuid(),
    name: '$150.000.oo',
    imageUrl: 'https://simpleicon.com/wp-content/uploads/coin-money-2.png',
    updatedAt: moment().subtract(3, 'hours')
  },
  {
    id: uuid(),
    name: '$300.000.oo',
    imageUrl: 'https://simpleicon.com/wp-content/uploads/coin-money-2.png',
    updatedAt: moment().subtract(5, 'hours')
  },
  {
    id: uuid(),
    name: '$85.000.oo',
    imageUrl: 'https://simpleicon.com/wp-content/uploads/coin-money-2.png',
    updatedAt: moment().subtract(9, 'hours')
  }
];
