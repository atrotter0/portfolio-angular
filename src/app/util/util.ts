export const arrayFromStringList = function(stringToSplit: string) {
  return stringToSplit.split(',').map(string => string.trim());
};
