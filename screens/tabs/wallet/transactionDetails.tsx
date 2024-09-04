import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import {
  baseStyles,
  colors,
  fontScale,
  typography,
} from '../../../utils/utils';
import { WalletStackParamList } from '.';
import Icon from 'react-native-vector-icons/Feather';

export const PageHeader = () => {
  return (
    <View style={styles.header}>
      <Icon name="chevron-left" size={fontScale * 24} />
      <Text style={typography.heading1}>Transaction Summary</Text>
    </View>
  );
};
const TransactionDetails = (
  props: NativeStackScreenProps<WalletStackParamList, 'Transaction_Details'>
) => {
  const { from_acc, to_acc, time, status, amount, fees, total, txid, desc } =
    props.route.params;

  const details = {
    From: from_acc,
    To: to_acc,
    Time: new Date(time).toTimeString(),
    Status: status,
    Amount: amount,
    Fees: fees,
    Total: total,
    Txid: txid,
    Description: '',
  };
  const getStatusColor = (status: string) => {
    if (status === 'COMPLETE') {
      return colors.greenSuccess;
    } else if (status === 'PENDING') {
      return colors.purple;
    } else if (status === 'FAILED') {
      return colors.redError;
    } else {
      return colors.lightGrey;
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{ paddingTop: 10 }}
        showsVerticalScrollIndicator={false}>
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
                    color: getStatusColor(label === 'Status' ? data : ''),
                    fontWeight: '400',
                  }}>
                  {data}
                </Text>
              </View>
            ))}
          </View>
          <Text
            style={{
              ...typography.body,
              color: colors.lightGrey,
              textAlign: 'justify',
            }}>
            {desc}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default TransactionDetails;

const styles = StyleSheet.create({
  header: {
    marginTop: 24,
    marginBottom: 32,
    ...baseStyles.flexRow,
    justifyContent: 'space-between',
  },
  container: {
    paddingHorizontal: 16,
    backgroundColor: colors.mainBg,
  },
  detailsContainer: {
    marginVertical: 10,
  },
  details: {
    display: 'flex',
    gap: 17 * fontScale,
    marginTop: 18,
    marginBottom: 12,
  },
});
