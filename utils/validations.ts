export const isValidEmail = (email: string): boolean => {
  const match = String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );

  return !!match;
};

export const isEmail = (email: string): string | undefined => {
  return isValidEmail(email)
    ? undefined
    : "The email does not seem to be valid";
};


export const isFilledInputsForm = (array: any, constant: any) => {
  for (let prop in array) {
    const id = prop.slice(-3);
    const parent= prop.slice(0,-3);
    if (array[prop] === constant[prop]) {
      throw new Error( id === "_id" ? `you must create or select a ${parent} first.`: `the field ${prop} is empty!` );
    }
  }
  return array;
}