import { images } from '@assets/images';
import { PrimaryButton } from '@components/button';
import {
  RouteProp,
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CardRow from '../components/cardRow';
import ItemBadge, { ItemBadgeProps } from '../components/itemBadge';
import { baseStyles, colors, typography } from '../utils/utils';
import { HomeStackParamList } from './tabs/home';
import { MMEvent, MMEventDetails, Master } from '@utils/types';
import { useCallback, useState } from 'react';
import api from '@utils/api';
import getUploadedFile from '@utils/storage/getUploadedFile';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const MasterDetails = () => {
  const route = useRoute<RouteProp<HomeStackParamList, 'Master_Details'>>();
  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParamList>>();
  const { _id, username, profilePic, createdAt } = route.params;
  const desc =
    'Lorem ipsum dolor sit amet consectetur. Turpis integer arcu at bibendum turpis ipsum.';
  const [eventlist, setEventlist] = useState<MMEventDetails[]>();
  const masterDetails: Master = route.params;

  const fetchMasterEvents = async () => {
    await api.event.get(`/${masterDetails._id}/list`).then(async (events) => {
      const myEventList: MMEventDetails[] = await Promise.all(
        events.map(async (event: MMEventDetails) => {
          const image = await getUploadedFile(event.imageUrl);
          return { ...event, imageUrl: image };
        })
      );
      setEventlist(myEventList);
    });
  };

  useFocusEffect(
    useCallback(() => {
      fetchMasterEvents();
    }, [])
  );
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View>
        <ItemBadge
          joined={'2021'}
          location={'Hong Kong'}
          name={username}
          imageURI={profilePic}
        />
        <Text style={styles.desc}>{desc}</Text>
      </View>
      <PrimaryButton title="Follow" />
      {/* events */}
      <View
        style={{
          paddingVertical: 20,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text style={{ ...typography.heading1 }}>Events</Text>
        <Text style={{ textDecorationLine: 'underline' }}>
          {eventlist ? eventlist.length : 0}
        </Text>
      </View>
      {eventlist ? (
        <FlatList
          contentContainerStyle={{ paddingBottom: 16 }}
          data={eventlist}
          renderItem={({ item }) => (
            <CardRow
              {...item}
              heading={item.title}
              subheading={{
                label: 'Attendees',
                data: `${item.attendeeCount}/${item.maxAttendee}`,
              }}
              highlightedText="D-35"
              imageURI={item.imageUrl}
              onPress={() => {
                navigation.navigate('Event_Details', { ...item });
              }}
            />
          )}
          keyExtractor={(item) => item._id}
          ItemSeparatorComponent={() => <View style={{ height: 16 }}></View>}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <Text style={{ textAlign: 'center' }}>
          This master still has no events
        </Text>
      )}
    </View>
  );
};

export default MasterDetails;

const styles = StyleSheet.create({
  container: {
    ...baseStyles.container,
    paddingHorizontal: 16,
    height: '100%',
  },
  desc: {
    ...typography.body,
    color: colors.body,
    textAlign: 'center',
    marginTop: 24,
    marginBottom: 32,
  },
});
