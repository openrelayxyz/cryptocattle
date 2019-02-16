export const limit = (amount, array) =>
  Array.from({ length: amount }, (_, index) => array[index]).filter(Boolean);
