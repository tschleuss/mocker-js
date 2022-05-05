export const getPositiveQuantity = (quantity: number) => {
  return quantity <= 0 ? 1 : quantity;
};
