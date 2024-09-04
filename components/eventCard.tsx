import { NavigationProp } from '@react-navigation/native';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { HomeStackParamList } from '../screens/tabs/home';
import { fontScale } from '../utils/utils';
import CardRow from './cardRow';
import { MMEventDetails } from '@utils/types';

const EventCard = (props: MMEventDetails) => {
  const { onPress, ...event } = props;

  return (
    <TouchableOpacity onPress={onPress} style={{ marginTop: 20 }}>
      <Image source={{ uri: event.imageUrl }} style={styles.cardImage} />
      <CardRow
        heading={props.title}
        subheading={{
          label: 'Attendees',
          data: `${props.attendeeCount}/${props.maxAttendee}`,
        }}
        highlightedText={`D-35`}
        additionalText={event.host ? event.host.username : undefined}
      />
    </TouchableOpacity>
  );
};

export default EventCard;

const styles = StyleSheet.create({
  cardImage: {
    width: '100%',
    height: fontScale * 328,
    borderRadius: 8,
    marginBottom: 12,
  },
});
