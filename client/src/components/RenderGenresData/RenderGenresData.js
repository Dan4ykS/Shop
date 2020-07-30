import React from 'react';
import StringHelper from '../../utils/StringHelper';

const RenderGenresData = ({ genres }) => {
  return (
    <>
      {genres.map((genre, index) => {
        if (index > 0) {
          return <React.Fragment key={StringHelper.createId()}>, {genre.toLowerCase()}</React.Fragment>;
        } else {
          return <React.Fragment key={StringHelper.createId()}>{genre.toLowerCase()}</React.Fragment>;
        }
      })}
    </>
  );
};

export default RenderGenresData;
