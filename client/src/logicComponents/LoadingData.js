import React from 'react';
import LoadingIndicator from '../components/LoadingIndicator';
import { Redirect } from 'react-router-dom';

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
    const { funcForRender = null } = this.props.configData;
    if (funcForRender) {
      funcForRender();
    }
  }
  render() {
    const { loading, error, routeForRedirect = '/Login/' } = this.props.configData,
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

// export default LoadingDataLogic;
