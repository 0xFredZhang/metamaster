import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Alert, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import Divider from '@components/divider';
import ItemBadge from '@components/itemBadge';
import UserButton from '@components/userButton';
import { baseStyles, colors, fontScale, typography } from '../utils/utils';
import {
  RouteProp,
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { PrimaryButton } from '@components/button';
import { HomeStackParamList } from './tabs/home';
import { useCallback, useState } from 'react';
import api from '../utils/api';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/store';
import Loader from '@components/loader';
import { images } from '@assets/images';
import { MMEventDetails } from '@utils/types';
import getUploadedFile from '@utils/storage/getUploadedFile';
import { current } from '@reduxjs/toolkit';

const getFormattedTimestamp = (dateString: string) => {
  const date = new Date(dateString);
  const formattedDate = date.toLocaleDateString('en-HK', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  return formattedDate + ', from ' + date.toLocaleTimeString();
};

const EventDetails = () => {
  const [currentEvent, setCurrentEvent] = useState<MMEventDetails>();
  const [isAttending, setIsAttending] = useState(false);
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParamList>>();
  const eventDetails =
    useRoute<RouteProp<HomeStackParamList, 'Event_Details'>>();
  const { attendingEvents } = useSelector((state: RootState) => state.wallet);
  const eventId = eventDetails.params._id;

  const fetchEvent = async () => {
    await api.event
      .get(`/id/${eventDetails.params._id}`)
      .then(async (res) => {
        const image = await getUploadedFile(`${res.imageUrl}`);
        const hostImage = await getUploadedFile(`${res.host.profilePic}`);

        setCurrentEvent({
          ...res,
          imageUrl: image,
          host: {
            ...res.host,
            profilePic: hostImage,
          },
        });
      })
      .catch((err) => Alert.alert(err, err.toString()));
  };

  useFocusEffect(
    useCallback(() => {
      //check if already attending
      const existingEvent = attendingEvents?.find(
        (event) => event._id === eventId
      );
      if (!existingEvent) {
        fetchEvent();
      } else {
        setCurrentEvent(existingEvent);
        setIsAttending(true);
      }
    }, [])
  );

  if (!currentEvent) return;

  const details = {
    Location: currentEvent?.location,
    Time: new Date(currentEvent.endDate).toDateString(),
    'Attendees/Max': `${currentEvent?.attendeeCount}/${currentEvent?.maxAttendee}`,
    'Entry Cost': `${currentEvent?.entryCost} MMT`,
  };

  return (
    <View style={styles.container}>
      {!currentEvent ? (
        <Loader />
      ) : (
        <ScrollView
          contentContainerStyle={{ paddingTop: 32 }}
          showsVerticalScrollIndicator={false}>
          <Image
            source={{ uri: currentEvent.imageUrl }}
            style={styles.cardImage}
          />

          {/* Timestamp, Title, Organizer */}
          <View>
            <Text
              style={{
                ...typography.heading3,
                marginBottom: 12,
                marginTop: 6,
              }}>
              {currentEvent?.title}
            </Text>
            <ItemBadge
              imageURI={images.user}
              // imageURI={currentEvent!.host.profilePic}
              name={currentEvent!.host.username}
              variant="horizontal"
              icon
            />
          </View>
          {!isAttending ? (
            <PrimaryButton
              title={'I want to attend'}
              onPress={() => {
                navigation.navigate('Event_Payment', currentEvent);
              }}
            />
          ) : (
            <PrimaryButton
              title={'View Attendence list'}
              onPress={() => {
                navigation.navigate('Attendence', {
                  event: {
                    _id: currentEvent._id,
                    title: currentEvent.title,
                    startDate: currentEvent.startDate,
                  },
                  maxAttendee: currentEvent.maxAttendee,
                  host: currentEvent.host,
                });
              }}
            />
          )}
          {/* Details */}
          <View style={styles.detailsContainer}>
            <Text style={typography.heading2}>Details</Text>
            <View style={styles.details}>
              {Object.entries(details).map(([label, data]) => (
                <View style={baseStyles.flexRowBetween} key={label}>
                  <Text
                    style={{
                      ...typography.subheading1,
                      color: colors.body,
                      fontWeight: '700',
                    }}>
                    {label.toUpperCase()}
                  </Text>
                  <Text
                    style={{
                      ...typography.body,
                      color: colors.lightGrey,
                      fontWeight: label === 'Location' ? '600' : '400',
                    }}>
                    {data}
                  </Text>
                </View>
              ))}
            </View>
            <Text style={{ ...typography.body, color: colors.lightGrey }}>
              {currentEvent?.description}
            </Text>
          </View>

          {/* Host */}
          <View>
            <Text style={typography.heading3}>Meet your Host</Text>
            <UserButton
              username={currentEvent!.host.username}
              imageURI={currentEvent.host.profilePic}
              // imageURI={currentEvent?.host.profilePic}
              text={currentEvent?.host._id}
              onPress={() =>
                navigation.navigate('Master_Details', { ...currentEvent.host })
              }
            />
          </View>

          <Divider />

          {/* Collectible Stamps */}
          {/* <View style={styles.stampsContainer}>
          <Text style={typography.heading3}>Collectible Stamps</Text>
          <View style={{ ...baseStyles.flexRow, gap: 10 }}>
            {stamps.map((stamp, idx) => (
              <ItemBadge key={idx} {...stamp} />
            ))}
          </View>
        </View> */}
        </ScrollView>
      )}
    </View>
  );
};

export default EventDetails;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    backgroundColor: colors.mainBg,
  },
  header: {
    marginTop: 24,
    marginBottom: 32,
    ...baseStyles.flexRow,
    justifyContent: 'space-between',
  },
  cardImage: {
    width: '100%',
    height: fontScale * 328,
    borderRadius: 8,
    marginBottom: 12,
  },
  detailsContainer: {
    marginVertical: 32,
  },
  details: {
    display: 'flex',
    gap: 17 * fontScale,
    marginTop: 18,
    marginBottom: 12,
  },
  stampsContainer: {
    marginTop: 32,
    marginBottom: 24,
    display: 'flex',
    gap: 18,
  },
});
