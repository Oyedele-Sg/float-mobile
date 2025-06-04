import { moderateScale } from 'react-native-size-matters';

function populateObjectWithNumbers() {
    const obj: Record<number, number> = {};
    for (let i = 1; i <= 1000; i++) {
        obj[i] = moderateScale(i);
    }
    return obj;
}

const spacingObj = populateObjectWithNumbers();

export const spacing = {
    ...spacingObj,
};
