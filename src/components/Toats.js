const basicToast = {
  position: "top",
  visibilityTime: 4000,
  autoHide: true,
  topOffset: 55,
  bottomOffset: 40,
};

export const SuccessToast = {
  ...basicToast,
  type: "success",
};

export const ErrorToast = {
  ...basicToast,
  type: "error",
  text1: "Erreur",
};

