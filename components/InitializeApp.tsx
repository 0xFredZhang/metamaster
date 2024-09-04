import { useDispatch, useSelector } from 'react-redux';
import { getAuthUser } from '../utils/auth';
import {
  setProfilePicture,
  setUsername,
  setWalletAddress,
} from '../redux/slices/authSlice';
import api from '../utils/api';
import { MMEventDetails } from '../utils/types';
import { setAttendingEvents, setBalance } from '../redux/slices/walletSlice';
import { RootState } from 'redux/store';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { MMT_TOKEN_ID } from '../utils/const';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from 'App';

export const initialize = async () => {
  const dispatch = useDispatch();
  const { jwt, walletAddress } = useSelector((state: RootState) => state.auth);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  // get username from aws
  await getAuthUser()
    .then((user) => {
      dispatch(setUsername(user.attributes['custom:username']));
    })
    .catch((err) => console.log(err));

  //get wallet address and profile picture
  await api.user
    .get('/info')
    .then((res) => {
      console.log('userInfo', JSON.stringify(res, null, 2));
      dispatch(setWalletAddress(res.walletAddr));
      dispatch(setProfilePicture(res.profilePic));
    })
    .catch((err) => {
      console.log("couldn't get walletaddress");
    });

  // get token balance in wallet
  await fetch(
    `https://veldidina-vsys.herokuapp.com/contract/balance/${walletAddress}/${MMT_TOKEN_ID}`
  )
    .then(async (res) => {
      await res
        .json()
        .then((walletRes) => {
          console.log('wallet balance: ', walletRes.balance);
          dispatch(setBalance(walletRes.balance));
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log('veldidina error: ', err));

  // get Wallet State (attending events)
  await api.event.get('/attendance/list/user').then(async (events) => {
    const myEventList: MMEventDetails[] = await Promise.all(
      events.map(async (event: { _id: number; event: { _id: number } }) => {
        return await api.event
          .get(`/id/${event.event._id}`)
          .then(({ ...event }) => {
            const MMEventFormat: MMEventDetails = {
              ...event,
            };
            return MMEventFormat;
          })
          .catch((err) => {
            console.log(err);
          });
      })
    );
    dispatch(setAttendingEvents(myEventList));
  });

  // get Wallet State (Poaps)

  if (jwt) {
    navigation.navigate('TabBar');
  }
};
export const InitializeApp = () => {
  initialize();
  return <></>;
};
