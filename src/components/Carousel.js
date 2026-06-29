import { FlatList, StyleSheet, useWindowDimensions, View } from 'react-native';

import theme from '../constants/theme';

export default function Carousel({ data, renderItem, keyExtractor }) {
  const { width } = useWindowDimensions();
  const cardWidth = width - 32;

  return (
    <View style={styles.wrapper}>
      <FlatList
        data={data}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        decelerationRate="fast"
        snapToInterval={cardWidth + theme.spacing.sm}
        contentContainerStyle={styles.list}
        keyExtractor={keyExtractor}
        renderItem={({ item }) => (
          <View style={[styles.slide, { width: cardWidth }]}>{renderItem(item)}</View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: -16,
    marginBottom: theme.spacing.md,
  },
  list: {
    paddingHorizontal: 16,
  },
  slide: {
    marginRight: theme.spacing.sm,
  },
});
