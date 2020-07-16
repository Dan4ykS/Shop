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

export const addArrayElement = (array, newElement) => [...array, newElement];

export const createAction = (action, payload = null) => ({
  type: action,
  payload,
});

export const connectToStore = (stateElements, actions) => (Component, withRoute = false) => {
  function mapStateToProps(state) {
    const stateForComponent = {};
    if (stateElements) {
      stateElements.forEach((el) => (stateForComponent[el] = state[el]));
    }
    return { ...stateForComponent };
  }
  function mapDispatchToProps(dispatch) {
    const actionsForComponent = {};
    if (actions) {
      actions.forEach((action) => (actionsForComponent[action.name] = action));
    }
    return { actions: bindActionCreators({ ...actionsForComponent }, dispatch) };
  }
  return connect(mapStateToProps, mapDispatchToProps)(withRoute ? withRouter(Component) : Component);
};
