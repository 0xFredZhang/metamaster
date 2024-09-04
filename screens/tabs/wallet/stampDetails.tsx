import { CardRowProps } from '@components/cardRow';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { WalletStackParamList } from '.';
import { baseStyles, colors, typography } from '../../../utils/utils';

export type metaProperties = {
  model: string;
  year: number;
  report: string;
  attributes: string;
};

interface detailProps extends CardRowProps {
  description: string;
  metaProperties: metaProperties;
}

const MetaCards = ({ model, year, report, attributes }: metaProperties) => {
  return (
    <View>
      <View style={styles.cardContainer}>
        <View style={styles.card}>
          <Text>Car Model</Text>
          <Text>{model}</Text>
        </View>
        <View style={styles.card}>
          <Text>Year</Text>
          <Text>{year}</Text>
        </View>
      </View>
      <View style={styles.cardContainer}>
        <View style={styles.card}>
          <Text>Inspection Report</Text>
          <Text>{report}</Text>
        </View>
        <View style={styles.card}>
          <Text>Meta Attributes 4</Text>
          <Text style={{ overflow: 'hidden' }}>{attributes}</Text>
        </View>
      </View>
    </View>
  );
};
const StampDetails = (
  props: NativeStackScreenProps<WalletStackParamList, 'Stamp_Details'>
) => {
  const { imageURI, heading, description, metaProperties, highlightedText } =
    props.route.params;

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.titleImage}
            source={
              imageURI
                ? { uri: imageURI }
                : require('../../../assets/bottle.png')
            }
          />
        </View>
        <Text style={typography.heading3}>{heading}</Text>
        <Text style={typography.heading1}>{highlightedText}</Text>
        <Text style={typography.subheading1}>Stamp Description</Text>
        <Text style={typography.body}>{description}</Text>
        <Text style={typography.subheading1}>Metaproperties</Text>
        <MetaCards {...metaProperties} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    ...baseStyles.container,
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
    width: '95%',
    flexDirection: 'column',
    gap: 10,
  },
  imageContainer: {
    flex: 1,
    alignItems: 'center',
  },
  titleImage: {
    justifyContent: 'center',
    alignContent: 'center',
    width: 350,
    height: 350,
    borderRadius: 10,
  },
  cardContainer: {
    marginHorizontal: 'auto',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  card: {
    flex: 1,
    padding: 10,
    marginVertical: 5,
    marginRight: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.inputBackground,
  },
});

export default StampDetails;
