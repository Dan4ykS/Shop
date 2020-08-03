import React, { useState } from 'react';
import StringHelper from '../../utils/StringHelper';
import { trimText } from './utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleDown, faAngleDoubleUp } from '@fortawesome/free-solid-svg-icons';

const TextWithBr = ({ text, maxlength = null, needReadMore = false }) => {
  const [textLendth, changeTextLenght] = useState(maxlength);

  const str = trimText(text, textLendth),
    paragraphs = str.split('\n');

  return paragraphs.map((el, index) => {
    if (index === paragraphs.length - 1 && maxlength < str.length && needReadMore) {
      return (
        <p key={StringHelper.createId()}>
          {el}
          <span className='readMore' onClick={() => changeTextLenght(maxlength)}>
            <FontAwesomeIcon icon={faAngleDoubleUp}/>
          </span>
        </p>
      );
    }
    if (el === '') {
      return <br key={StringHelper.createId()} />;
    } else if (el.endsWith('...') && needReadMore) {
      return (
        <p key={StringHelper.createId()}>
          {el}
          <span className='readMore' onClick={() => changeTextLenght(null)}>
             <FontAwesomeIcon icon={faAngleDoubleDown} />
          </span>
        </p>
      );
    } else {
      return <p key={StringHelper.createId()}>{el}</p>;
    }
  });
};

export default TextWithBr;
