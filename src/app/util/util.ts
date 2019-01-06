export const getArrayFromString = function(stringToSplit: string) {
  return stringToSplit.split(',').map(text => text.trim());
};
