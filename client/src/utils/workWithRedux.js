import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

export const changeArrayElement = (array, indexElForChange, newElement) => [
  ...array.slice(0, indexElForChange),
  newElement,
  ...array.slice(indexElForChange + 1),
];

export const removeArrayElement = (array, indexElForRemove) => [
  ...array.slice(0, indexElForRemove),
  ...array.slice(indexElForRemove + 1),
];

export const addArrayElement = (array, newElement) => [newElement, ...array];

export const createAction = (action, payload = null) => ({
  type: action,
  payload,
});

export const connectToStore = (stateElements, actions) => (Component, withRoute = false) => {
  function mapStateToProps(state) {
    const stateForComponent = {};
    if (stateElements) {
      stateElements.forEach((el) => {
        if (el.includes('.')) {
          const pathToElement = el.split('.');
          stateForComponent[pathToElement[0]] = { [pathToElement[1]]: state[pathToElement[0]][pathToElement[1]] };
        }
        stateForComponent[el] = state[el];
      });
    }
    return { ...stateForComponent };
  }
  function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators({ ...actions }, dispatch) };
  }
  return connect(mapStateToProps, mapDispatchToProps)(withRoute ? withRouter(Component) : Component);
};
