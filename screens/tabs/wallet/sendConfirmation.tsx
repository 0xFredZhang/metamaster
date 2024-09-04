import { View, Text, ScrollView, Alert } from 'react-native';
import React, { useState } from 'react';
import { PrimaryButton } from '@components/button';
import { baseStyles, colors, typography } from '../../../utils/utils';
import api from '@utils/api';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/store';
import { RootStackParamList } from 'App';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Loader from '@components/loader';

const SendConfirmation = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'SendConfirmation'>>();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [loading, setLoading] = useState(false);
  const { recipient, amount } = route.params;
  const { walletAddress } = useSelector((state: RootState) => state.auth);

  const confirmationData = {
    sender: `${walletAddress?.slice(0, 3)}...${walletAddress?.slice(32, 35)}`,
    recipient: `${recipient.slice(0, 3)}...${recipient.slice(32, 35)}`,
    amount: `${amount} MMT`,
  };

  const handleSendToken = async () => {
    const body = {
      recipientAddress: recipient,
      amount: parseInt(amount),
    };

    setLoading(true);

    await api.user
      .post(`/sendToken`, body)
      .then((res) => {
        setLoading(false);
        Alert.alert('Transaction Successful', '', [
          {
            text: 'Close',
            onPress: () => {
              navigation.navigate('TabBar');
            },
            style: 'cancel',
          },
        ]);
      })
      .catch((err) => Alert.alert('Error Sending', err.toString()));
  };

  return (
    <View
      style={{
        ...baseStyles.container,
        paddingBottom: 30,
        justifyContent: 'space-between',
        backgroundColor: colors.line,
      }}>
      {loading ? (
        <Loader />
      ) : (
        <ScrollView>
          <View style={{ maxHeight: 400 }}>
            {/* Body */}
            <View style={{ gap: 10, paddingVertical: 20 }}>
              <Text style={{ ...typography.heading3 }}>Details</Text>
              {Object.entries(confirmationData).map(([key, value], idx) => (
                <View key={key}>
                  <View style={baseStyles.flexRowBetween}>
                    <Text
                      style={{ ...typography.subheading2, fontWeight: '700' }}>
                      {key.toUpperCase()}
                    </Text>
                    <Text style={{ ...typography.subheading2 }}>{value}</Text>
                  </View>
                  {(idx === 1 || idx === 4) && (
                    <View
                      style={{
                        paddingVertical: 5,
                        borderBottomWidth: 1,
                        borderBottomColor: colors.mainBg,
                      }}
                    />
                  )}
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      )}

      <PrimaryButton
        title="Confirm"
        onPress={() => {
          handleSendToken();
        }}
      />
    </View>
  );
};

export default SendConfirmation;
