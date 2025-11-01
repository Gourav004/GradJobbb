export const emailRegex = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const testEmail = emailRegex.test(email);
  return testEmail;
};

export const passRegex = (password) => {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const testPass = passwordRegex.test(password);
  return testPass;
};
