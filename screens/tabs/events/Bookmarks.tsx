import { FlatList, View } from 'react-native';
import React from 'react';
import CardRow, { CardRowProps } from '@components/cardRow';
import { baseStyles } from '../../../utils/utils';
import { useNavigation } from '@react-navigation/native';
import { EventDetailsProps } from '../../eventDetails';

const event: EventDetailsProps = {
  timestamp: '2023-03-06T08:50:53.821Z',
  title: 'Hong Kong Wine & Dine Festival',
  organizer: {
    image:
      'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80',
    name: 'MNTGE',
  },
  location: 'Hong Kong, Main Podium',
  interested: 236,
  attendees: {
    current: 21,
    capacity: 35,
  },
  cost: 12,
  desc: 'Lorem ipsum dolor sit amet consectetur. Turpis integer arcu at bibendum turpis ipsum. Lorem ipsum dolor sit amet consectetur. Turpis integer arcu at bibendum turpis ipsum.',
  host: {
    image:
      'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80',
    name: 'John_doe 1234',
    text: 'Super Host since 2021',
  },
};

const bookmarkEvents: EventDetailsProps[] = new Array(2).fill(event);
const bookmarkList = bookmarkEvents.map((bookmark, idx) => ({
  ...bookmark,
  key: `${idx}`,
}));

const Bookmarks = () => {
  const navigation = useNavigation();
  return (
    <View style={baseStyles.container}>
      <FlatList
        contentContainerStyle={{ paddingVertical: 16 }}
        ItemSeparatorComponent={() => <View style={{ marginVertical: 10 }} />}
        data={bookmarkList}
        renderItem={({ item }) => (
          <CardRow
            {...item}
            heading={item.title}
            subheading={{
              label: 'attendees',
              data: `${item.attendees.current}/${item.attendees.capacity}`,
            }}
            highlightedText={`D-35`}
            imageURI={item.host.image}
            onPress={() => {
              navigation.getParent()?.navigate('Event_Details', { ...item });
            }}
          />
        )}
      />
    </View>
  );
};

export default Bookmarks;
