export const limit = (amount, array) =>
  Array.from({ length: amount }, (_, index) => array[index]).filter(Boolean);

export const getLocalCows = () => {
  if (typeof window !== "undefined") {
    const storedCows = window.localStorage.getItem("localCows") || "[]";

    return JSON.parse(storedCows);
  }

  return [];
};

export const getLocalStraws = () => {
  if (typeof window !== "undefined") {
    const storedStraws = window.localStorage.getItem("localStraws") || "[]";

    return JSON.parse(storedStraws);
  }

  return [];
};
