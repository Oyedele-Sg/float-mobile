/* eslint-disable react/destructuring-assignment */
/* eslint-disable max-len */
/* eslint-disable react/display-name */
import React from 'react';
import { CustomButtonProps } from './button'

export const withInterceptOnPress = <P extends CustomButtonProps>(WrappedComponent: React.ComponentType<P>) => (props: P) => {
  const handleOnPress = (...args: any[]) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    props.onPress(...args);
  };

  return (
    <WrappedComponent
      {...props}
      onPress={handleOnPress}
    />
  );
};
