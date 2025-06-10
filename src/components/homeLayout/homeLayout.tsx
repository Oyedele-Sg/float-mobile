import React, { ReactNode, useMemo } from 'react'
import {useRouter} from "expo-router";
import { Screen } from '../screen'
import { CustomBox } from '../box'
import { CustomPressable } from '../button'
import { BackIcon } from '@assets/icons'
import { CustomText } from '../text'
import { FlatList } from 'react-native-gesture-handler';
import { SectionList } from 'react-native';

type Props = {
  header?: string
  title?: string
  backBt?: boolean
  backFn?: ()=> void
  description?: string
  backgroundColor?: string
  scroll?: boolean
  preset ?: 'fixed' | 'scroll' | 'auto'
  children: ReactNode
}

export const HomeLayoutWrapper = ({ backBt, backFn, children, header, description, backgroundColor, title, scroll = true, preset }: Props) => {
  const router = useRouter()

  // Detect if children include a VirtualizedList (FlatList or SectionList)
  const containsVirtualizedList = useMemo(() => {
    const check = (node: ReactNode): boolean => {
      if (!node) return false
      if (Array.isArray(node)) return node.some(check)
      if (typeof node === 'object' && 'type' in node) {
        const type = node.type
        if (type === FlatList || type === SectionList) return true
        if ((node as any).props?.children) return check((node as any).props.children)
      }
      return false
    }
    return check(children)
  }, [children])

  const screenPreset = scroll && !containsVirtualizedList ? 'auto' : 'fixed'

  return (
    <Screen preset={preset || screenPreset} safeAreaEdges={['top']} backgroundColor={backgroundColor}>
      <CustomBox flex={1} paddingHorizontal={20} >
        {(backBt || header) && (
          <CustomBox
            alignItems="center"
            flexDirection="row"
            gap={10}
            mb={16}
          >
            {backBt && !backFn && (
              <CustomPressable onPress={() => {
                router.back()
            }}>
                <BackIcon />
              </CustomPressable>
            )}
            {backBt && backFn && (
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

        {title && description && (
          <CustomBox mb={35}>
            <CustomText variant='T2434700' color='neutral_n800'>{title}</CustomText>
            <CustomText variant='T1422400' color='gray_950'>{description}</CustomText>
          </CustomBox>
        )}


        <CustomBox flex={1}>{children}</CustomBox>
      </CustomBox>
    </Screen>
  )
}
