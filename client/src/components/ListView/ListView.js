import React from 'react';
import StringHelper from '../../utils/StringHelper';

const ListView = ({
  listForRender,
  ComponentForRender,
  ComponentWithoutData = null,
  ...extraParams
}) => {
  if (listForRender.length === 0) {
    const componentForRender = ComponentWithoutData ? <ComponentWithoutData /> : null;
    return <>{componentForRender}</>;
  }
  return (
    <>
      {listForRender.map((dataForComponent, elIndex) => (
        <ComponentForRender
          key={dataForComponent?.id || StringHelper.createId()}
          data={{ ...dataForComponent, elIndex }}
          {...extraParams}
        />
      ))}
    </>
  );
};

export default ListView;
