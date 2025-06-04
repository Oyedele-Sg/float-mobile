import {
    createBox, createRestyleComponent, createVariant, type VariantProps,
} from '@shopify/restyle';
import { type Theme } from '@styles/theme';
import type React from 'react';

type Props = VariantProps<Theme, 'boxVariants'> & React.ComponentProps<typeof Box>;

const Box = createBox<Theme>();

const boxVariant = createVariant<Theme, 'boxVariants'>({
    themeKey: 'boxVariants',
});

export const CustomBox = createRestyleComponent<Props, Theme>([boxVariant], Box);
