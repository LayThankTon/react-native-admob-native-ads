import React, { useCallback, useMemo } from 'react';
import { View, StyleSheet, Image} from 'react-native';
import a from "../assets";
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
  stars,
  size = 15,
  fullIconColor = "#ffd27d",
  halfIconColor = "#ffd27d",
  emptyIconColor = "#f0f0f0",
  passRef,
  ...passThroughProps
}) {
  const viewStyle = useMemo(() => [styles.row, style], [style]);
  const renderIcons = useCallback(

    (_stars, _size, icons = [], emptyStars = 5) => {
      if (typeof stars !== 'number') return null;
      if (typeof _size !== 'number') return null;

      if (_stars > 5) _stars = 5;
      if (_stars >= 1) {
        // 1 - 5
        icons.push(
        <Image
          key={`star-full${_stars}`}
          source={a.star_full}
          style={{
            width:_size,
            height:_size,
            resizeMode:"contain",
            tintColor:fullIconColor
            
          }}
        />)
        return renderIcons(_stars - 1, _size, icons, emptyStars - 1);
      } else if (_stars >= 0.5) {
        // 0 - 1
        icons.push(
        <Image
          key={`star-half${_stars}`}
          source={a.star_half}
          style={{
            width:_size,
            height:_size,
            resizeMode:"contain",
            tintColor:halfIconColor
            
          }}
        />)
        return renderIcons(_stars - 1, _size, icons, emptyStars - 1);
      }
      if (emptyStars > 0) {
        icons.push(
        <Image
          key={`star-empty${emptyStars}`}
          source={a.star_line}
          style={{
            width:_size,
            height:_size,
            resizeMode:"contain",
            tintColor:emptyIconColor
            
          }}
        />)
        return renderIcons(_stars, _size, icons, emptyStars - 1);
      }
      // 0
      return icons;
    },
    [],
  );


  if (stars == null || typeof stars !== 'number') return null;

  const icons = renderIcons(stars, size);
  return <View ref={passRef} style={viewStyle} {...passThroughProps}>{icons}</View>;
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginTop: 1,
  },
});
