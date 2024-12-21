export const numberWithCommas = (x: number | string) => {
  if (!x) return x;
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
