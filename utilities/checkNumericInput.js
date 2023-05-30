export default text => {
  const ascii = text.charCodeAt(text.length - 1);
  if (ascii >= 48 && ascii <= 57) {
    return true;
  }
  return false;
};
