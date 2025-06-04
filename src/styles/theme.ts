import { createTheme } from '@shopify/restyle';
import { box } from "./box";
import { spacing } from "./spacing";
import { button } from "./button";
import { text } from "./text";
import { colors } from "./colors";
import { input } from "@styles/input";

const theme = createTheme({
    spacing: { ...spacing },
    textVariants: { ...text },
    buttonVariants: { ...button },
    boxVariants: { ...box },
    inputVariants: { ...input },
    colors: { ...colors }
});

export type Theme = typeof theme;
export default theme;
