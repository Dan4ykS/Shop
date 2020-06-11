import React from 'react';

const RenderList = ({ listForRender, ComponentForRender, ComponentWithoutData = null, ...extraParams }) => {
  if (listForRender.length === 0) {
    const componentForRender = ComponentWithoutData ? ComponentWithoutData : null;
    return <>{componentForRender}</>;
  }
  return (
    <div className='row'>
      {listForRender.map((dataForComponent) => (
        <ComponentForRender key={Math.random()} data={dataForComponent} {...extraParams} />
      ))}
    </div>
  );
};

export default RenderList;
