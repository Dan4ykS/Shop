import { faUserCircle, faCartPlus, faTools } from '@fortawesome/free-solid-svg-icons';
import { changeArrayElement } from '../utils/workWithRedux';
import { UPDATE_ITEMS, NOT_UPDATE } from '../actions/types';

const updateMenuItems = (state, action) => {
  if (state === undefined) {
    return {
      mainItems: [
        { name: '/', value: 'Главная' },
        { name: '/Goods', value: 'Продукция' },
      ],
      topItems: [
        { name: '/Login', value: 'Вход' },
        { name: '/Cart', value: 'Корзина' },
      ],
      iconsForItems: {
        headerIcons: [faUserCircle, faCartPlus],
      },
      updated: false,
    };
  }

  const createNewItem = (name, value) => {
    return {
      name,
      value,
    };
  };

  const updateMainItems = (mainItems, userName) => {
    switch (userName) {
      default:
        return [createNewItem('/', 'Главная'), createNewItem('/Goods', 'Продукция')];
    }
  };

  const updateTopItems = (topItems, userName) => {
    switch (userName) {
      case 'admin':
        return [createNewItem('/MyAccount', userName), createNewItem('/admin', 'Панель администратора')];

      case null:
        return [createNewItem('/Login', 'Вход'), createNewItem('/Cart', 'Корзина')];

      default:
        const index = topItems.findIndex((el) => el.value === 'Вход');
        const newItem = createNewItem('/MyAccount', userName);
        return changeArrayElement(topItems, index, newItem);
    }
  };

  const updateIconForItems = (iconsForItems, userName) => {
    switch (userName) {
      case 'admin':
        const index = iconsForItems.headerIcons.findIndex((el) => el.iconName === 'cart-plus');
        return { headerIcons: changeArrayElement(iconsForItems.headerIcons, index, faTools) };

      default:
        return {
          headerIcons: [faUserCircle, faCartPlus],
        };
    }
  };

  const updateItems = (menuItems, userName) => {
    const { topItems, mainItems, iconsForItems } = menuItems;
    return {
      updated: true,
      mainItems: updateMainItems(mainItems, userName),
      topItems: updateTopItems(topItems, userName),
      iconsForItems: updateIconForItems(iconsForItems, userName),
    };
  };

  switch (action.type) {
    case UPDATE_ITEMS:
      return updateItems(state.menuItems, action.payload);

    case NOT_UPDATE:
      return {
        ...state.menuItems,
        updated: false,
      };

    default:
      return state.menuItems;
  }
};

export default updateMenuItems;
