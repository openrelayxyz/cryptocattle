export default class BrandService {
  static brand(id, name) {
    const storedCowNames = window.localStorage.getItem("cowNames") || "{}";
    const cowNames = JSON.parse(storedCowNames);

    cowNames[id] = name;

    window.localStorage.setItem("cowNames", JSON.stringify(cowNames));
  }

  static getName(id) {
    const storedCowNames = window.localStorage.getItem("cowNames") || "{}";
    const cowNames = JSON.parse(storedCowNames);

    return cowNames[id] || "(unbranded)";
  }
}
