import { images } from '@assets/images';
import { Image, Text, View } from 'react-native';
import { typography } from '../utils/utils';

type emptyStateProps = {
  type: 'events' | 'favorites' | 'stamps' | 'poaps' | 'results';
};

export const EmptyState = ({ type }: emptyStateProps) => {
  const pages = {
    ['events']: {
      title: 'No Events',
      description: 'You will see here events you decided to attend',
      image: require('../assets/emptyEvents.png'),
    },
    ['favorites']: {
      title: 'No favorites',
      description: 'You can add an favourites when you start following Masters',
      image: require('../assets/emptyFavorites.png'),
    },
    ['stamps']: {
      title: 'No stamps',
      description:
        'You will see here Stamps you collected after you attended events',
      image: require('../assets/emptyPoaps.png'),
    },
    ['poaps']: {
      title: 'No poaps',
      description: 'You will see here events you decided to attend',
      image: require('../assets/emptyPoaps.png'),
    },
    results: {
      title: 'No results',
      description: 'Whoops ... this information is not available for a moment',
      image: require('../assets/emptyResults.png'),
    },
  };
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View
        style={{
          width: 250,
          justifyContent: 'center',
          alignItems: 'center',
          gap: 15,
        }}>
        <Image source={pages[type].image} />
        <Text style={typography.heading3}>{pages[type].title}</Text>
        <Text style={[typography.body, { textAlign: 'center' }]}>
          {pages[type].description}
        </Text>
      </View>
    </View>
  );
};
