export const formatNumber = (x: number, withoutFraction?: boolean): string => {
  if (withoutFraction) {
    return x.toLocaleString('en-US');
  }

  return x.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 6 });
};

export const formatNumbertoTwo = (x: number): string => {

  return x.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};
