import { faUserCircle, faCartPlus } from '@fortawesome/free-solid-svg-icons';

const updateMenuItems = (state, action) => {
  if (state === undefined) {
    return {
      mainItems: [
        { name: '/', value: 'Главная' },
        { name: '/Product/', value: 'Продукция' },
        { name: '/Customizing/', value: 'Фичи' },
      ],
      topItems: [
        { name: '/Login/', value: 'Вход' },
        { name: '/Cart/', value: 'Корзина' },
      ],
      iconsForItems: {
        headerIcons: [faUserCircle, faCartPlus],
      },
      updated: false,
    };
  }
  const updateItems = (menuItems, userName) => {
    const { topItems, mainItems } = menuItems;
    if (userName !== null) {
      const index = topItems.findIndex((el) => el.value === 'Вход');
      const newItem = { name: '/MyAccount/', value: userName };
      return {
        ...menuItems,
        updated: true,
        topItems: [...topItems.slice(0, index), newItem, ...topItems.slice(index + 1)],
      };
    } else if (userName === 'admin') {
      const adminItem = { name: '/admin/', value: 'Админ панель' };
      const index = topItems.findIndex((el) => el.value === 'Вход');
      const newItem = { name: '/MyAccount/', value: userName };
      return {
        ...menuItems,
        menuItems: [...mainItems, adminItem],
        topItems: [...topItems.slice(0, index), newItem, ...topItems.slice(index + 1)],
        updated: true,
      };
    } else {
      const index = topItems.findIndex((el) => el.name === '/MyAccount/');
      if (index === -1) {
        return {
          ...menuItems,
          updated: true,
        };
      }
      const newItem = { name: '/Login/', value: 'Вход' };
      return {
        ...menuItems,
        updated: true,
        topItems: [...topItems.slice(0, index), newItem, ...topItems.slice(index + 1)],
      };
    }
  };
  switch (action.type) {
    case 'UPDATE_ITEMS':
      return updateItems(state.menuItems, action.payload);
    case 'NOT_UPDATE':
      return {
        ...state.menuItems,
        updated: false,
      };
    default:
      return state.menuItems;
  }
};

export default updateMenuItems;
