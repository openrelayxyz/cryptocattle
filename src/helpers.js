export const limit = (amount, array) =>
  Array.from({ length: amount }, (_, index) => array[index]).filter(Boolean);

export const getLocalCows = () => {
  const storedCows = window.localStorage.getItem("localCows") || "[]";

  return JSON.parse(storedCows);
};

export const getLocalStraws = () => {
  const storedStraws = window.localStorage.getItem("localStraws") || "[]";

  return JSON.parse(storedStraws);
};
