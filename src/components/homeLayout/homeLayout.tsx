import React, { ReactNode } from 'react'
import { Screen } from '../screen'
import { CustomBox } from '../box'
import { CustomPressable } from '../button'
import { BackIcon } from '@assets/icons'
import { CustomText } from '../text'

type Props = {
  header?: string
  backFn?: () => void
  children: ReactNode
}

export const HomeLayoutWrapper = ({ backFn, children, header }: Props) => {
  return (
    <Screen preset="auto" safeAreaEdges={['top']}>
      <CustomBox paddingHorizontal={20}>
        {(backFn || header) && (
          <CustomBox
            alignItems="center"
            flexDirection="row"
            gap={10}
            // mb={header ? 0 : 16}
          >
            {backFn && (
              <CustomPressable onPress={backFn}>
                <BackIcon />
              </CustomPressable>
            )}

            {header && (
              <CustomText
                variant="T1824600"
                color="neutral_n800"
                textAlign='left'
                flex={1}
              >
                {header}
              </CustomText>
            )}
          </CustomBox>
        )}

        <CustomBox mt={23}>{children}</CustomBox>
      </CustomBox>
    </Screen>
  )
}