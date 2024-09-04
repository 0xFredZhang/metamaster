import { FlatList, StyleSheet, View } from 'react-native';
import { colors } from '../utils/utils';
import CardRow, { CardRowProps } from './cardRow';

type listViewProps = {
  data: CardRowProps[];
};

const ListView = (props: listViewProps) => {
  return (
    <View style={styles.mainContainer}>
      <FlatList
        contentContainerStyle={{ paddingVertical: 16 }}
        ItemSeparatorComponent={() => <View style={{ marginVertical: 10 }} />}
        data={props.data}
        renderItem={({ item }) => (
          <CardRow
            heading={item.heading}
            subheading={{
              label: item.subheading.label,
              data: new Date(item.subheading.data).toLocaleDateString(),
            }}
            highlightedText={`${item.highlightedText}`}
            imageURI={item.imageURI}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    paddingHorizontal: 16,
    backgroundColor: colors.mainBg,
  },
});

export default ListView;
