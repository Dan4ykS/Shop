import { faUserCircle, faCartPlus } from '@fortawesome/free-solid-svg-icons'

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
  const updateTopItems = (topItems, userName) => {
    if (userName !== null) {
      const index = topItems.findIndex((el) => el.value === 'Вход');
      const newItem = { name: '/MyAccount/', value: userName };
      return [...topItems.slice(0, index), newItem, ...topItems.slice(index + 1)];
    } else {
      const index = topItems.findIndex((el) => el.name === '/MyAccount/');
      if (index === -1) {
        return topItems;
      }
      const newItem = { name: '/Login/', value: 'Вход' };
      return [...topItems.slice(0, index), newItem, ...topItems.slice(index + 1)];
    }
  };
  switch (action.type) {
    case 'UPDATE_TOPITEMS':
      return {
        ...state.menuItems,
        topItems: updateTopItems(state.menuItems.topItems, action.payload),
        updated: true,
      };
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
