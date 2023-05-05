export const pluralize = (text: string, length: number) => {
  return length > 1 ? `${text}s` : text;
};

export const capitalize = (words: string) => {
  return words.replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
    letter.toUpperCase()
  );
};

export const formatPhone = (numbers: string) =>{
  return "("+numbers.substring(0,3)+") "+numbers.substring(3,6)+"-"+numbers.substring(6,10)
}
