import { View, Text, Image } from 'react-native';
import React from 'react';
import { colors, typography } from '@utils/utils';

interface AttendeeCardProps {
  name: string;
  master?: boolean;
  profilePic: string;
  label?: string;
}

const AttendeeCard = ({
  name,
  master,
  profilePic,
  label,
}: AttendeeCardProps) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 20,
      }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20 }}>
        <Image
          source={{ uri: profilePic }}
          style={{ width: 40, height: 40, borderRadius: 50 }}
        />
        <Text>{name}</Text>
      </View>
      {label && (
        <Text style={{ color: colors.mainPink, fontWeight: '700' }}>
          {label}
        </Text>
      )}
    </View>
  );
};

export default AttendeeCard;
