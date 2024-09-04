import React from 'react';
import CardRow, { CardRowProps } from '@components/cardRow';
import ListView from '@components/listView';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { WalletStackParamList } from '.';
import { FlatList, View } from 'react-native';
import { baseStyles } from '../../../utils/utils';
import { useNavigation } from '@react-navigation/native';

const stamps: CardRowProps[] = new Array(12).fill({
  heading: 'Royal Salute 27 Year Old Single',
  subheading: { label: 'purchased', data: Date.now() },
  highlightedText: '0.096 MMT',
  // image: undefined,
  imageURI: 'https://picsum.photos/200',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis lobortis at felis ut fermentum. Duis odio eros, porttitor at pharetra ac, venenatis et neque. Proin tincidunt lectus eu ligula sagittis, sit amet tristique sapien elementum. Curabitur ut quam et turpis scelerisque faucibus a nec ligula. Sed non tincidunt nisl. Maecenas varius massa sit amet sem scelerisque tempor pulvinar ac justo. Integer iaculis lorem eu mollis lacinia. Nam metus ante, luctus in diam non, semper volutpat justo. Fusce lobortis mauris in hendrerit mollis. In dignissim in purus eget egestas. Duis tincidunt felis metus, in lacinia quam porttitor ac. Sed nec metus tempus, tempus purus eget, facilisis enim. Quisque sagittis nibh eu magna rhoncus fermentum.',
  metaProperties: {
    model: 'model',
    year: 10,
    report: 'report',
    attributes: 'attribute',
  },
});

const stamplist = stamps.map((stamp, id) => ({ ...stamp, id: id.toString() }));

const Stamps = (
  props: NativeStackScreenProps<WalletStackParamList, 'Stamps'>
) => {
  const navigation = useNavigation();
  return (
    // <ListView data={stamplist} />
    <View style={baseStyles.container}>
      <FlatList
        contentContainerStyle={{ paddingVertical: 16 }}
        ItemSeparatorComponent={() => <View style={{ marginVertical: 10 }} />}
        data={stamplist}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CardRow
            {...item}
            heading={item.heading}
            subheading={{
              label: item.subheading.label,
              data: new Date(item.subheading.data).toLocaleDateString(),
            }}
            highlightedText={`${item.highlightedText}`}
            imageURI={item.imageURI}
            onPress={() => {
              navigation.getParent()?.navigate('Stamp_Details', { ...item });
            }}
          />
        )}
      />
    </View>
  );
};

export default Stamps;
