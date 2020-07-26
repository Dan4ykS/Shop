import React from 'react';
import StringHelper from '../../utils/StringHelper';

const ListView = ({
  listForRender,
  ComponentForRender,
  AdditionalСomponentForRender = null,
  ComponentWithoutData = null,
  numberToAlternate = 4,
  ...extraParams
}) => {
  if (listForRender.length === 0) {
    const componentForRender = ComponentWithoutData ? <ComponentWithoutData /> : null;
    return <>{componentForRender}</>;
  }
  return (
    <>
      {listForRender.map((dataForComponent, elIndex) => {
        if (AdditionalСomponentForRender && (elIndex + 1) % numberToAlternate === 0) {
          return (
            <AdditionalСomponentForRender
              key={dataForComponent?.id || StringHelper.createId()}
              data={{ ...dataForComponent, elIndex }}
              {...extraParams}
            />
          );
        } else {
          return (
            <ComponentForRender
              key={dataForComponent?.id || StringHelper.createId()}
              data={{ ...dataForComponent, elIndex }}
              {...extraParams}
            />
          );
        }
      })}
    </>
  );
};

export default ListView;
