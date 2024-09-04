import { View, FlatList, StyleSheet } from 'react-native';
import React, { useCallback, useState } from 'react';
import { colors } from '../../../utils/utils';
import PoapCard from '@components/poapCard';
import { WalletStackParamList } from '.';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import { EmptyState } from '@components/emptyPage';
import api from '@utils/api';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Poap } from '@utils/types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'redux/store';
import { setCollectedPoaps } from '../../../redux/slices/walletSlice';
import getUploadedFile from '@utils/storage/getUploadedFile';

const Poaps = (
  props: NativeStackScreenProps<WalletStackParamList, 'Poaps'>
) => {
  const dispatch = useDispatch();
  const navigation =
    useNavigation<NativeStackNavigationProp<WalletStackParamList>>();
  const { collectedPoaps } = useSelector((state: RootState) => state.wallet);

  const fetchMyPoaps = async () => {
    return await api.poap.get('/list/user').then(async (poaplist: Poap[]) => {
      const poapWithImages: Poap[] = await Promise.all(
        poaplist.map(async (poap: Poap) => ({
          ...poap,
          imageUrl: await getUploadedFile(`${poap.imageUrl}`),
        }))
      );
      dispatch(setCollectedPoaps(poapWithImages));
    });
  };

  useFocusEffect(
    useCallback(() => {
      fetchMyPoaps();
    }, [])
  );
  return (
    <View style={styles.mainContainer}>
      {!collectedPoaps || collectedPoaps?.length < 1 ? (
        <EmptyState type={'poaps'} />
      ) : (
        <FlatList
          data={collectedPoaps}
          contentContainerStyle={{ paddingVertical: 16 }}
          ItemSeparatorComponent={() => <View style={{ marginVertical: 20 }} />}
          renderItem={({ item }) => (
            <PoapCard
              {...item}
              key={item._id}
              redeemDateTime={item.redeemDateTime!}
              onPress={() => {
                navigation.getParent()?.navigate('Poap_Details', {
                  ...item,
                });
              }}
            />
          )}
        />
      )}
    </View>
  );
};

export default Poaps;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: colors.mainBg,
  },
});
