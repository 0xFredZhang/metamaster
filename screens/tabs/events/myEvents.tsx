import { View, StyleSheet, FlatList } from 'react-native';
import React, { useCallback } from 'react';
import { baseStyles, colors } from '../../../utils/utils';
import CardRow from '@components/cardRow';
import { EmptyState } from '@components/emptyPage';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { EventStackParamList } from '.';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'redux/store';
import Loader from '@components/loader';
import api from '@utils/api';
import { MMEvent, MMEventDetails } from '@utils/types';
import { setAttendingEvents } from '../../../redux/slices/walletSlice';
import getUploadedFile from '@utils/storage/getUploadedFile';

const MyEvents = () => {
  const { attendingEvents } = useSelector((state: RootState) => state.wallet);

  const navigation =
    useNavigation<NativeStackNavigationProp<EventStackParamList>>();

  const dispatch = useDispatch();

  const fetchEvents = async () => {
    await api.event.get('/attendance/list/user').then(async (events) => {
      const myEventList: MMEventDetails[] = await Promise.all(
        events.map(async (event: { _id: number; event: { _id: number } }) => {
          return await api.event
            .get(`/id/${event.event._id}`)
            .then(async ({ imageUrl, ...event }) => {
              const image = await getUploadedFile(imageUrl);
              return { ...event, imageUrl: image };
            })
            .catch((err) => {
              console.log(err);
            });
        })
      );
      dispatch(setAttendingEvents(myEventList));
    });
  };
  useFocusEffect(
    useCallback(() => {
      fetchEvents();
    }, [])
  );
  return (
    <View style={[baseStyles.container, styles.container]}>
      {!attendingEvents ? (
        <Loader />
      ) : attendingEvents.length < 1 ? (
        <EmptyState type={'events'} />
      ) : (
        <FlatList
          contentContainerStyle={{ paddingVertical: 16 }}
          ItemSeparatorComponent={() => <View style={{ marginVertical: 10 }} />}
          data={attendingEvents}
          renderItem={({ item }) => (
            <CardRow
              heading={item.title}
              subheading={{
                label: 'Attendees',
                data: `${item.attendeeCount}/${item.maxAttendee}`,
              }}
              highlightedText={`${new Date(
                item.startDate
              ).toLocaleDateString()}`}
              imageURI={item.imageUrl}
              onPress={() => {
                navigation.getParent()?.navigate('Event_Details', { ...item });
              }}
            />
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.mainBg,
  },
});
export default MyEvents;
