import React from 'react';
import LoadingIndicator from '../LoadingIndicator';
import { Redirect } from 'react-router-dom';

export default class LoadingData extends React.Component {
  componentDidMount() {
    console.log('компонент создался');
    const { funcForRender = null } = this.props.configData;
    if (funcForRender) {
      funcForRender();
    }
  }

  render() {
    const { loading, error, routeForRedirect = '/Login' } = this.props.configData,
      contentForLoading = loading ? <LoadingIndicator /> : null,
      content = !loading && !error ? this.props.children : null,
      contentForError = error ? <Redirect to={routeForRedirect} /> : null;

    return (
      <>
        {contentForLoading}
        {contentForError}
        {content}
      </>
    );
  }
}
