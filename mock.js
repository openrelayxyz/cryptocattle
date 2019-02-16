const Chance = require("chance");

const chance = new Chance();
const random = (min, max) => chance.integer({ min, max });
const PersonalityType = {
  Friendly: 0,
  Standoffish: 1,
  Confident: 2,
  Snarky: 3,
  Reserved: 4,
  Shy: 5,
  Energetic: 6
};

exports.Mock = class Mock {
  generateCow() {
    const wordCount = random(3, 7);
    const cow = {
      description: chance.sentence({ words: wordCount }),
      image: "https://placehold.it/64x64",
      attributes: {
        generation: random(0, 6),
        moofactoryPeriod: random(43200, 172800),
        personalityType: random(0, Object.keys(PersonalityType).length - 1),
        strength: random(1, 20),
        dexterity: random(1, 20),
        consitution: random(1, 20),
        intelligence: random(1, 20),
        wisdom: random(1, 20),
        charisma: random(1, 20)
      }
    };

    return cow;
  }

  generateStraw() {
    const straw = {
      image: "https://placehold.it/64x64",
      attributes: {
        frozen: chance.bool(),
        parentId: random(1, 100000)
      }
    };

    return straw;
  }

  generateLocalSet() {
    const cowCount = random(5, 50);
    const strawCount = random(5, 50);
    const cows = Array.from({ length: cowCount }, this.generateCow);
    const straws = Array.from({ length: strawCount }, this.generateStraw);

    window.localStorage.setItem("cows", JSON.stringify(cows));
    window.localStorage.setItem("straws", JSON.stringify(straws));

    console.info("Local set created. Moo!");
  }
};
