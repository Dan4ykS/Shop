import React from 'react';
import StringHelper from '../utils/StringHelper';

const RenderList = ({ listForRender, ComponentForRender, ComponentWithoutData = null, ...extraParams }) => {
  if (listForRender.length === 0) {
    const componentForRender = ComponentWithoutData ? ComponentWithoutData : null;
    return <>{componentForRender}</>;
  }
  return (
    <div className='row'>
      {listForRender.map((dataForComponent) => (
        <ComponentForRender key={dataForComponent?.id || StringHelper.createId()} data={dataForComponent} {...extraParams} />
      ))}
    </div>
  );
};

export default RenderList;
