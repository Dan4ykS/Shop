import React from 'react';
import { Redirect } from 'react-router-dom';
import { useEffect } from 'react';
import LoadingIndicator from '../components/LoadingIndicator';

// const LoadingDataLogic = ({ children, configData: { loading, error, funcForRender, routeForRedirect = '/Login/' } }) => {
//   useEffect(() => {
//     console.log(`Вызвался эффект из компонента логики!`, loading, error)
//     funcForRender();
//   }, [funcForRender]);
//   if (loading) {
//     return <LoadingIndicator />;
//   }
//   if (error) {
//     return <Redirect to={routeForRedirect} />;
//   }
//   return <>{children}</>;
// };

export default class LoadingDataLogic extends React.Component {
  componentDidMount() {
    // console.log('Вызвался эффект из LodingDataLogic');
    this.props.configData.funcForRender();
  }
  render() {
    const { loading, error, routeForRedirect = '/Login/' } = this.props.configData;
    const contentForLoading = loading ? <LoadingIndicator /> : null;
    const content = !loading && !error ? this.props.children : null;
    const contentForError = error ? <Redirect to={routeForRedirect} /> : null;
    return (
      <>
        {contentForLoading}
        {contentForError}
        {content}
      </>
    );
  }
}

// export default LoadingDataLogic;
