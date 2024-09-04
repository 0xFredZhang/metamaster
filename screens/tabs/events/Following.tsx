import { View, Text, FlatList } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { baseStyles } from '../../../utils/utils';
import { images } from '@assets/images';
import UserButton, { UserBtnProps } from '@components/userButton';
import Loader from '@components/loader';
import { EmptyState } from '@components/emptyPage';

// const users: UserBtnProps[] = new Array(10).fill({
//   imageURI: images.user,
//   username: 'MNTGE',
//   details: { joined: '2022', location: 'Hong Kong' },
//   desc: 'Lorem ipsum dolor sit amet consectetur. Turpis integer arcu at bibendum turpis ipsum.',
//   name: 'MNTGE',
// });

// const userList = users.map((user, idx) => ({ ...user, key: idx }));
const userList = undefined;

const Followings = () => {
  const navigation = useNavigation();
  return (
    <View style={baseStyles.container}>
      {!userList ? (
        <EmptyState type={'favorites'} />
      ) : (
        <View>
          {userList?.length < 1 ? (
            <Loader />
          ) : (
            <FlatList
              contentContainerStyle={{ paddingVertical: 16 }}
              ItemSeparatorComponent={() => (
                <View style={{ marginVertical: 10 }} />
              )}
              data={userList}
              renderItem={({ item }) => (
                <UserButton
                  username={''}
                  {...item}
                  text="Master"
                  onPress={() => {
                    navigation
                      .getParent()
                      ?.navigate('Master_Details', { ...item });
                  }}
                />
              )}
            />
          )}
        </View>
      )}
    </View>
  );
};

export default Followings;
