import { View, Text, Image, FlatList } from 'react-native';
import React, { useCallback, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { baseStyles, colors, typography } from '../../../utils/utils';
import { images } from '@assets/images';
import Icon from 'react-native-vector-icons/Feather';
import api from '@utils/api';
import { RouteProp, useFocusEffect, useRoute } from '@react-navigation/native';
import { HomeStackParamList } from '.';
import getUploadedFile from '@utils/storage/getUploadedFile';
import AttendeeCard from '@components/AttendeeCard';

const Attendance = () => {
  interface AttendanceProps {
    _id: string;
    user: {
      _id: string;
      username: string;
      profilePic: string;
    };
  }

  const route = useRoute<RouteProp<HomeStackParamList, 'Attendence'>>();
  const { event, maxAttendee, host } = route.params;
  const [attendanceList, setAttendanceList] = useState<AttendanceProps[]>();

  const fetchAttendance = async () => {
    await api.event
      .get(`/attendance/list/event/${event._id}`)
      .then(async (attendees) => {
        const attendeeList = await Promise.all(
          attendees.map(async (person: AttendanceProps) => {
            const image = await getUploadedFile(person.user.profilePic);
            return { ...person, user: { ...person.user, profilePic: image } };
          })
        );

        setAttendanceList(attendeeList);
      });
  };

  useFocusEffect(
    useCallback(() => {
      fetchAttendance();
    }, [])
  );

  return (
    <View style={[baseStyles.container, { paddingTop: 20 }]}>
      <Text style={typography.heading2}>{event.title}</Text>
      <AttendeeCard
        name={host.username}
        profilePic={host.profilePic}
        label={new Date(event.startDate).toLocaleString()}
      />
      <View
        style={{
          borderBottomColor: colors.body,
          padding: 10,
          borderBottomWidth: 1,
        }}
      />

      {/* Attendees */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingVertical: 10,
        }}>
        <Text style={typography.heading2}>Attendees</Text>
        <Text
          style={{
            textDecorationLine: 'underline',
          }}>{`${
          attendanceList ? attendanceList.length : 0
        } / ${maxAttendee}`}</Text>
      </View>

      <FlatList
        data={attendanceList}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <AttendeeCard
            name={item.user.username}
            profilePic={item.user.profilePic}
          />
        )}
      />
    </View>
  );
};

export default Attendance;
