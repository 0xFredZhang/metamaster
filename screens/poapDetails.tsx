import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  Alert,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Divider from '@components/divider';
import {
  baseStyles,
  colors,
  fontScale,
  getDateString,
  typography,
} from '../utils/utils';
import { WalletStackParamList } from './tabs/wallet';
import { PrimaryButton } from '@components/button';
import api from '@utils/api';
import { useCallback, useState } from 'react';
import { RouteProp, useFocusEffect, useRoute } from '@react-navigation/native';
import Loader from '@components/loader';
import { Poap } from '@utils/types';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/store';
import getUploadedFile from '@utils/storage/getUploadedFile';

const PoapDetails = (
  props: NativeStackScreenProps<WalletStackParamList, 'Poap_Details'>
) => {
  const route = useRoute<RouteProp<WalletStackParamList, 'Poap_Details'>>();
  const [poap, setPoap] = useState<Poap>();
  const { collectedPoaps } = useSelector((state: RootState) => state.wallet);

  // Get Event Poap list
  const fetchPoaps = async (eventId: string) => {
    await api.poap.get(`/list/event/${eventId}`).then(async (res) => {
      const image = await getUploadedFile(res[0].imageUrl);
      setPoap({ ...res[0], imageUrl: image });
    });
  };

  const handlePoapCollection = async () => {
    return await api.poap
      .post('/send', { event: route.params.event })
      .catch((err) => {
        console.log('cant collect eventId: ', route.params.event);

        Alert.alert('Cannot Collect POAP', err.toString());
      });
  };

  const checkAttending = (eventId: string) => {
    return collectedPoaps?.some(({ event }: Poap) => event === eventId);
  };

  useFocusEffect(
    useCallback(() => {
      fetchPoaps(route.params.event);
    }, [])
  );

  if (!poap) return <Loader />;

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{ paddingTop: 32 }}
        showsVerticalScrollIndicator={false}>
        <Image source={{ uri: poap.imageUrl }} style={styles.cardImage}></Image>
        <View>
          <Text
            style={{ ...typography.heading3, marginBottom: 12, marginTop: 6 }}>
            {poap?.title}
          </Text>

          {/* <Text
            style={{
              ...typography.heading3,
              marginBottom: 12,
              marginTop: 6,
            }}>
            Collected: {getDateString(poap.redemptionDatetime!)}
          </Text> */}
          <PrimaryButton
            title={
              checkAttending(route.params.event)
                ? 'Already Collected'
                : 'Collect'
            }
            disabled={checkAttending(route.params.event)}
            onPress={() => {
              handlePoapCollection();
            }}
          />

          <Text style={{ marginTop: 20, fontWeight: 'bold' }}>
            POAP Description
          </Text>
          <Text style={{ marginTop: 20, textAlign: 'justify' }}>
            {poap.description}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default PoapDetails;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },

  header: {
    marginTop: 24,
    marginBottom: 32,
    ...baseStyles.flexRow,
    justifyContent: 'space-between',
  },

  cardImage: {
    width: '100%',
    height: fontScale * 400,
    borderRadius: 8,
    marginBottom: 12,
  },
});
