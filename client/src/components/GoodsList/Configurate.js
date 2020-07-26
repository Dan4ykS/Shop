import React from 'react';
import ListView from '../ListView/ListView';
import CommodityPreviewCard from '../CommodityPreviewCard/';
import SmallCommodityPreviewCard from '../CommodityPreviewCard/Small';
import StringHelper from '../../utils/StringHelper';

const Configurate = ({ typePage, goods, ComponentWithoutData }) => {
  switch (typePage) {
    case 'Main':
      return (
        <>
          <ListView ComponentForRender={SmallCommodityPreviewCard} listForRender={goods.slice(0, 4)} />
          <ListView ComponentForRender={CommodityPreviewCard} listForRender={goods.slice(4, 5)} />
          <ListView ComponentForRender={SmallCommodityPreviewCard} listForRender={goods.slice(5, 7)} />
        </>
      );
    default:
      const listForRender = [];
      let iterCount = 0;

      if (!goods.length) {
        return <ListView ComponentWithoutData={ComponentWithoutData} listForRender={goods} />;
      }
      
      for (let i = 0; i < goods.length; i += 8) {
        const offset = iterCount * 8;
        listForRender.push(
          <ListView
            key={StringHelper.createId()}
            ComponentForRender={CommodityPreviewCard}
            listForRender={goods.slice(0 + offset, 2 + offset)}
            ComponentWithoutData={ComponentWithoutData}
          />,
          <ListView
            key={StringHelper.createId()}
            ComponentForRender={SmallCommodityPreviewCard}
            listForRender={goods.slice(2 + offset, 4 + offset)}
          />,
          <ListView
            key={StringHelper.createId()}
            ComponentForRender={CommodityPreviewCard}
            listForRender={goods.slice(4 + offset, 5 + offset)}
          />,
          <ListView
            key={StringHelper.createId()}
            ComponentForRender={CommodityPreviewCard}
            listForRender={goods.slice(5 + offset, 6 + offset)}
          />,
          <ListView
            key={StringHelper.createId()}
            ComponentForRender={SmallCommodityPreviewCard}
            listForRender={goods.slice(6 + offset, 8 + offset)}
          />
        );
        iterCount++;
      }
      return listForRender;
  }
};

export default Configurate;
