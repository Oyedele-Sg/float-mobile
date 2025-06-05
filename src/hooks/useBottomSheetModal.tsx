import React, { useCallback, useMemo, useRef } from 'react';
import {
  BottomSheetModal,
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
} from '@gorhom/bottom-sheet';
import { CustomBox } from 'src/components';

interface UseBottomSheetModalOptions {
  snapPoints: Array<string>;
  backdropPressBehavior: 'close' | 'none' | 'collapse'
}

interface UseBottomSheetModalReturn {
  modalRef: React.RefObject<BottomSheetModal | null>;
  presentModal: () => void;
  dismissModal: () => void;
  snapPoints: Array<string>;
  renderBackdrop: (props: BottomSheetBackdropProps) => React.JSX.Element;
  handle: () => React.JSX.Element;
}

const handle = () => <CustomBox height={0} />;

export const useBottomSheetModalHook = ({
  snapPoints: initialSnapPoints,
  backdropPressBehavior,
}: UseBottomSheetModalOptions): UseBottomSheetModalReturn => {
  const modalRef = useRef<BottomSheetModal>(null);

  const presentModal = useCallback(() => {
    if (modalRef.current) {
      modalRef.current.present();
    }
  }, [modalRef]);

  const dismissModal = useCallback(() => {
    if (modalRef.current) {
      modalRef.current.dismiss();
    }
  }, [modalRef]);

  const snapPoints = useMemo(() => initialSnapPoints, [initialSnapPoints]);

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        pressBehavior={backdropPressBehavior}
        disappearsOnIndex={-1}
      />
    ),
    [],
  );

  const renderHeaderHandle = useCallback(
    () => handle(),
    [],
  );

  return {
    modalRef,
    presentModal,
    dismissModal,
    snapPoints,
    renderBackdrop,
    handle: renderHeaderHandle,
  };
};