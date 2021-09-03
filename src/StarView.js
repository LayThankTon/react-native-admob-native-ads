import React, { useCallback, useState, useEffect, useMemo } from 'react';
import { View, Image, StyleSheet} from 'react-native';
import icons from "../assets";
/*
export interface StarViewProps {
  style?: StyleProp<ViewStyle>;
  stars: number;
  size?: number;
  fullIcon?: string;
  halfIcon?: string;
  emptyIcon?: string;
}
*/

export default function StarView({
  style = undefined,
  numStars,
  size = 15,
  fullIconColor = "#ffd27d",
  halfIconColor = "#ffd27d",
  emptyIconColor = "#f0f0f0",
  passRef,
  ...passThroughProps
}) {
  
  const viewStyle = useMemo(() => [styles.row, style], [style]);
  const renderIcons = useCallback(

    (_stars, _size, stars = [], emptyStars = 5) => {
      if (typeof stars !== 'number') return null;
      if (typeof _size !== 'number') return null;

      if (_stars > 5) _stars = 5;
      if (_stars >= 1) {
        // 1 - 5
        stars.push(<Image source={icons.star_full} style={{width:_size, height:_size, resizeMode:"contain", tintColor=fullIconColor}} key={`star-full${_stars}`} />);
        return renderIcons(_stars - 1, _size, stars, emptyStars - 1);
      } else if (_stars >= 0.5) {
        // 0 - 1
        stars.push(<Image source={icons.star_half} style={{width:_size, height:_size, resizeMode:"contain", tintColor=halfIconColor}}  key={`star-half${_stars}`} />);
        return renderIcons(_stars - 1, _size, stars, emptyStars - 1);
      }
      if (emptyStars > 0) {
        stars.push(<Image source={icons.star_line} style={{width:_size, height:_size, resizeMode:"contain", tintColor=emptyIconColor}} key={`star-empty${emptyStars}`} />);
        return renderIcons(_stars, _size, stars, emptyStars - 1);
      }
      // 0
      return stars;
    },
    [],
  );


  if (numStars == null || typeof numStars !== 'number') return null;

  const stars = renderIcons(numStars, size);
  return <View ref={passRef} style={viewStyle} {...passThroughProps}>{stars}</View>;
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginTop: 1,
  },
});
