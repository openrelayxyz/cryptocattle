export default class TransformerService {
  static transformCow(serverCow) {
    const { id, image, attributes } = serverCow;
    const traits = ["generation", "moofactory_period", "personality"];
    const traitToProperty = {
      generation: "generation",
      moofactory_period: "moofactoryPeriod",
      personality: "personalityType"
    };
    const aspects = [
      "emotes",
      "body",
      "legs",
      "horns",
      "hair",
      "tail",
      "wings",
      "accessories",
      "spots"
    ];
    const aspectToProperty = {
      emotes: "emote",
      body: "body",
      legs: "leg",
      horns: "horn",
      wings: "wing",
      tail: "tail",
      accessories: "accessory",
      hair: "hair"
    };
    const attributeTypes = [
      "strength",
      "dexterity",
      "constitution",
      "wisdom",
      "intelligence",
      "charisma"
    ];
    const cow = attributes.reduce(
      (prev, next) => {
        const { trait_type, value } = next;

        if (traits.includes(trait_type)) {
          prev.attributes[traitToProperty[trait_type]] = value;
        }

        if (aspects.includes(trait_type)) {
          const [aspect, identifier, size] = value.split("_");

          prev.aspects[aspectToProperty[trait_type]] = {
            identifier,
            size
          };
        }

        if (attributeTypes.includes(trait_type)) {
          prev.attributes[trait_type] = value;
        }

        return prev;
      },
      {
        id,
        image,
        aspects: {},
        attributes: {}
      }
    );

    return cow;
  }
}
