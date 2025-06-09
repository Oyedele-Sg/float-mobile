import { RequestSuccessSVG, ErrorNotificationIcon } from '@assets/icons';
import React from 'react';
import {
  View, Text, StyleSheet, Platform,
} from 'react-native';

export interface CustomNotificationProps {
  // title: string;
  description: string;
  alertType: 'error' | 'success' | 'info';
}

export const CustomNotification: React.FC<CustomNotificationProps> = ({
  // title,
  description,
  alertType,
}) => {
  let backgroundColor: string;
  let IconComponent: React.ReactNode;
  switch (alertType) {
    case 'error':
      backgroundColor = '#FFFFFF'; // Red
      IconComponent = <ErrorNotificationIcon width={21} height={21} />;
      break;
    case 'success':
      backgroundColor = '#FFFFFF'; // Green
      IconComponent = <RequestSuccessSVG width={30} height={30} />;
      break;
    case 'info':
      backgroundColor = '#FFFFFF'; // Blue
      IconComponent = <RequestSuccessSVG width={21} height={21} />;
      break;
    default:
      backgroundColor = '#333'; // Default dark color
      IconComponent = null;
  }

  return (
    <View style={[styles.container, { backgroundColor }]}>
      {IconComponent && <View style={styles.icon}>{IconComponent}</View>}

      <View style={styles.body}>
        {/* <Text style={styles.title}>{title}</Text> */}
        <Text style={styles.description}>{description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#D0D5DD',
    margin: 10,
    marginTop: Platform.OS === 'ios' ? 40 : 10,
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FCFCFD',
    lineHeight: 17,
    fontFamily: 'Monzo Sans Text',
  },
  description: {
    fontSize: 14,
    color: '#344054',
    fontWeight: '400',
    lineHeight: 20,
    fontFamily: 'Monzo Sans Text',
  },
  icon: {
    marginBottom: 12,
  },
  body: {
    width: '85%',
  },
});

