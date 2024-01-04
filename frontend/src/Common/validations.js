export const emailPattern = {
  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,63}$/i,
  message: "Invalid email address.",
};

export const phonePattern = {
  value: /^.{8,10}$/,
  message: "Invalid phone number.",
};

export const passwordPattern = {
  value: /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])/,
  message:
    "Password must include lowercase, uppercase, number and special character.",
};

export const namePattern = {
  value:
    /^(?!\d+$)(?:[a-zA-Z0-9][a-zA-Z0-9 !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]*)?$/gu,
  message: "Invalid name.",
};

export const mustBe9to10 = {
  value: /^.{9,10}$/,
  message: "Must Be Between 9 to 10 characters.",
};

export const mustBe10 = {
  value: /^.{10}$/,
  message: "Must Be 10 characters.",
};

export const mustBe6to16 = {
  value: /^.{6,16}$/,
  message: "Must Be Between 6 to 16 characters.",
};

export const mustBeNumbers = {
  value: /^[0-9]+$/,
  message: "Must Be Numbers.",
};

export const numberWithoutPrecedingZero = {
  value: /^[1-9][0-9]?$/i,
  message: "wrong input field",
};
