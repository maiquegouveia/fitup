export default (str) => {
  const regex = /[!@#$%^&*()+\-=[\]{};':"\\|,.<>/?]+/;
  return regex.test(str);
};
