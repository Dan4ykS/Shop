// import axios from 'axios';

export default class BookStoreService {
  _paiBase = '/api/';

  // requestToApi = async (url, data) => {
  //   cosnst
  //  };
  bookList = [
    {
      id: 1,
      title: 'Куриный бульон для души',
      price: 300,
      img: 'https://comiczera.ru/wa-data/public/shop/products/36/44/4436/images/8462/8462.750.jpg',
      description:
        'Иногда плохие вещи случаются с хорошими людьми. Это сложно принять. И еще сложнее согласиться с тем, что от перемен никуда не деться и к старой жизни нет возврата. Перед нами выбор: страдать и жалеть себя – или встать на ноги, вытереть слезы и начать решать проблемы по возможности смело и красиво.',
    },
    {
      id: 2,
      title: 'Шерлок Холмс (большой сборник)',
      price: 900,
      img: 'https://avidreaders.ru/pics/0/5/2005.jpg',
      description:
        'Шерлок Холмс — литературный персонаж, созданный Артуром Конаном Дойлом. Произведения Конана Дойла, посвящённые приключениям Шерлока Холмса, знаменитого лондонского «консультирующего» детектива, стали классикой детективного жанра.',
    },
    {
      id: 3,
      title: 'Ведьмак',
      price: 1300,
      img: 'https://cv6.litres.ru/pub/c/elektronnaya-kniga/cover_415/6375365-andzhey-sapkovskiy-vedmak.jpg',
      description: '«Сага о ведьмаке» — цикл книг польского писателя Анджея Сапковского в жанре фэнтези. Первый рассказ цикла увидел свет в 1986 году, а последняя книга — в 2013.',
    },
  ];
  cartItems = [
    {
      id: 1,
      title: 'Куриный бульон для души',
      img: 'https://comiczera.ru/wa-data/public/shop/products/36/44/4436/images/8462/8462.750.jpg',
      copies: 1,
      price: 300,
    },
    {
      id: 2,
      title: 'Шерлок Холмс (большой сборник)',
      img: 'https://avidreaders.ru/pics/0/5/2005.jpg',
      copies: 1,
      price: 900,
    },
    {
      id: 3,
      title: 'Ведьмак',
      img: 'https://cv6.litres.ru/pub/c/elektronnaya-kniga/cover_415/6375365-andzhey-sapkovskiy-vedmak.jpg',
      copies: 1,
      price: 1300,
    },
  ];

  getBooks() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 1) {
          reject(new Error('Что то пошло не так'));
        } else {
          resolve(this.bookList);
        }
      }, 700);
    });
  }

  getCartItems() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 1) {
          reject(new Error('Что то пошло не так'));
        } else {
          resolve(this.cartItems);
        }
      }, 700);
    });
  }
}
