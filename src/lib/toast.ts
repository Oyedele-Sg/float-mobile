
import { CustomNotification, CustomNotificationProps } from '@/components';
import { Notifier } from 'react-native-notifier';

interface NotificationProps {
  // title: string;
  description: string;
  duration?: number;
  animationDuration?: number;
  hideOnPress?: boolean;
  Component: React.ComponentType<CustomNotificationProps>;
  componentProps: CustomNotificationProps
}

const showCustomNotification = (props: NotificationProps) => {
  Notifier.showNotification({
    Component: props.Component,
    componentProps: props.componentProps,
    duration: props.duration || 3000,
    animationDuration: props.animationDuration || 400,
    hideOnPress: props.hideOnPress ?? true,
  });
};

export const displayErrorMessage = (
  // title: string,
  description: string,
  duration?: number,
) => {
  showCustomNotification({
    // title,
    description,
    duration,
    Component: CustomNotification,
    componentProps: {
      // title,
      description,
      alertType: 'error',
    },
  });
};

export const displaySuccessMessage = (
  // title: string,
  description: string,
  duration?: number,
) => {
  showCustomNotification({
    // title,
    description,
    duration,
    Component: CustomNotification,
    componentProps: {
      // title,
      description,
      alertType: 'success',
    },
  });
};

export const displayInfoMessage = (
  title: string,
  description: string,
  duration?: number,
) => {
  showCustomNotification({
    // title,
    description,
    duration,
    Component: CustomNotification,
    componentProps: {
      // title,
      description,
      alertType: 'info',
    },
  });
};
