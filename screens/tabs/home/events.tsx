import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';
import { HomeStackParamList } from '.';
import EventCard from '@components/eventCard';

import ItemBadge from '@components/itemBadge';
import UserButton from '@components/userButton';
import { baseStyles, colors, typography } from '../../../utils/utils';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import Loader from '@components/loader';
import api from '../../../utils/api';
import { MMEventDetails, Master } from '@utils/types';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/store';
import getUploadedFile from '@utils/storage/getUploadedFile';

const Events = (
  props: NativeStackScreenProps<HomeStackParamList, 'Events'>
) => {
  const [events, setEvents] = useState<MMEventDetails[]>();
  const [masters, setMasters] = useState<Master[]>();
  const { profilePicture } = useSelector((state: RootState) => state.auth);

  const fetchEvents = async () => {
    await api.event.get('/list').then(async (eventlist) => {
      const eventsWithImages: MMEventDetails[] = await Promise.all(
        eventlist.map(async (event: MMEventDetails) => ({
          ...event,
          imageUrl: await getUploadedFile(`${event.imageUrl}`),
          host: {
            profilePicture: await getUploadedFile(`${event.host.profilePic}`),
          },
        }))
      );

      setEvents(eventsWithImages);
    });
  };

  const fetchMasters = async () => {
    await api.user.get('/master/list').then(async (masters: Master[]) => {
      const mastersWithImages: Master[] = await Promise.all(
        masters.map(async (master) => ({
          ...master,
          profilePic: await getUploadedFile(master.profilePic),
        }))
      );
      setMasters(mastersWithImages);
    });
  };

  useFocusEffect(
    useCallback(() => {
      fetchEvents();
      fetchMasters();
    }, [])
  );

  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParamList>>();
  const username = useSelector((state: RootState) => state.auth.username);

  return (
    <View style={styles.pageContainer}>
      <UserButton
        username={`${username}`}
        imageURI={profilePicture}
        // onPress={() => {
        //   navigation.getParent()?.navigate('Master_Details', {});
        // }}
      />
      <ScrollView
        contentContainerStyle={{ paddingBottom: 16 }}
        showsVerticalScrollIndicator={false}>
        <View style={[styles.sectionHeading, { marginBottom: 24 }]}>
          <Text style={typography.heading1}>Trending Masters</Text>
        </View>

        <FlatList
          data={masters}
          horizontal
          ListEmptyComponent={masters ? undefined : Loader}
          renderItem={({ item }) => (
            <ItemBadge
              {...item}
              name={item.username}
              onPress={() => {
                navigation.getParent()?.navigate('Master_Details', {
                  ...item,
                  username: item.username,
                });
              }}
              imageURI={item.profilePic}
            />
          )}
          keyExtractor={(item) => item._id}
        />

        <View style={styles.sectionHeading}>
          <Text style={typography.heading1}>Trending Events</Text>
        </View>
        {events ? (
          events.map((event) => (
            <EventCard
              key={event._id}
              {...event}
              onPress={() =>
                navigation.getParent()?.navigate('Event_Details', { ...event })
              }
            />
          ))
        ) : (
          <View>
            <Loader />
          </View>
        )}

        {/* Trending Events */}
        {/* <View style={styles.sectionHeading}>
          <Text style={typography.heading1}>Trending Events</Text>
        </View>
        <View style={styles.listContainer}>
          {events!.map((event) => (
            <EventCard
              key={event.id}
              {...event}
              navigate={props.navigation.getParent()?.navigate}
            />
          ))}
        </View> */}

        {/* Recommended for you */}
        {/* <View style={styles.sectionHeading}>
          <Text style={typography.heading1}>Recommended for you</Text>
        </View>
        <View style={styles.listContainer}>
          {trendingEvents.map((event) => (
            <CardRow
              key={event.id}
              heading={event.title}
              subheading={{
                label: 'Attendees',
                data: `${event.attendees.current}/${event.attendees.capacity}`,
              }}
              imageURI="imageURL"
              highlightedText={`D-${event.daysLeft}`}
            />
          ))}
        </View> */}
      </ScrollView>
    </View>
  );
};

export default Events;

const styles = StyleSheet.create({
  pageContainer: {
    paddingHorizontal: 16,
    backgroundColor: colors.mainBg,
    flex: 1,
  },
  sectionHeading: {
    ...baseStyles.flexRowBetween,
    marginTop: 25,
  },
  listContainer: {
    display: 'flex',
    gap: 16,
  },
});
function onRefresh(arg0: boolean) {
  throw new Error('Function not implemented.');
}
