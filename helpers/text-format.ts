export const capitalizeFirstLetter = (word: string): string => {
  return word.charAt(0).toUpperCase() + word.slice(1);
};

export const replaceSpaceToPlusMark = async (text: string) => {
  return text.replace(/\s/g, "+");
};
