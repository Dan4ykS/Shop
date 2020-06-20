import React, { useState } from 'react';
import StringHelper from '../utils/StringHelper';

const RenderList = ({ listForRender, ComponentForRender, ComponentWithoutData = null, ...extraParams }) => {
  const [id] = useState(StringHelper.createId())
  if (listForRender.length === 0) {
    const componentForRender = ComponentWithoutData ? ComponentWithoutData : null;
    return <>{componentForRender}</>;
  }
  return (
    <div className='row'>
      {listForRender.map((dataForComponent) => (
        <ComponentForRender key={id} data={dataForComponent} {...extraParams} />
      ))}
    </div>
  );
};

export default RenderList;
