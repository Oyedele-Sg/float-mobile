import React, { ReactNode } from 'react'
import {useRouter} from "expo-router";
import { Screen } from '../screen'
import { CustomBox } from '../box'
import { CustomPressable } from '../button'
import { BackIcon } from '@assets/icons'
import { CustomText } from '../text'

type Props = {
  header?: string
  title?: string
  backBt?: boolean
  description?: string
  children: ReactNode
}

export const HomeLayoutWrapper = ({ backBt, children, header, description, title }: Props) => {
  const router = useRouter()
  return (
    <Screen preset="auto" safeAreaEdges={['top']}>
      <CustomBox paddingHorizontal={20}>
        {(backBt || header) && (
          <CustomBox
            alignItems="center"
            flexDirection="row"
            gap={10}
            mb={16}
          >
            {backBt && (
              <CustomPressable onPress={() => {
                router.back()
            }}>
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

        {title && description && (
          <CustomBox mb={35}>
            <CustomText variant='T2434700' color='neutral_n800'>{title}</CustomText>
            <CustomText variant='T1422400' color='gray_950'>{description}</CustomText>
          </CustomBox>
        )}
        

        <CustomBox>{children}</CustomBox>
      </CustomBox>
    </Screen>
  )
}