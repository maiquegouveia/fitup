const isValidEmail = function (email) {
  const regex =
    /^(?=.{1,254}$)[A-Za-z0-9._%+-]+@(?!.*\.{2})[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

  return regex.test(email);
};

export default isValidEmail;
