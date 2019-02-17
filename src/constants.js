export const Theme = {
  primary: "#E60000",
  primaryLighter: "#FF2C2C",
  primaryLightest: "#FF5959",
  secondary: "#008A8A",
  secondaryLighter: "#1B9999",
  secondaryLightest: "#3BA9A9",
  neutral: "#CCCCCC",
  neutralLighter: "#DDDDDD",
  neutralLightest: "#EEEEEE"
};

export const personalityTypes = [
  "Friendly",
  "Standoffish",
  "Confident",
  "Snarky",
  "Reserved",
  "Shy",
  "Energetic"
];

export const aspectTypes = {
  tail: [
    {
      identifier: "poof",
      size: "sm"
    },
    {
      identifier: "star",
      size: "md"
    }
  ],
  leg: [
    {
      identifier: "fat",
      size: "md"
    },
    {
      identifier: "skinny",
      size: "md"
    }
  ],
  body: [
    {
      identifier: "fat",
      size: "md"
    },
    {
      identifier: "skinny",
      size: "md"
    }
  ],
  spot: [
    {
      identifier: "fat",
      size: "md"
    },
    {
      identifier: "skinny",
      size: "md"
    }
  ],
  horn: [
    {
      identifier: "flower",
      size: "sm"
    },
    {
      identifier: "horn",
      size: "md"
    }
  ],
  wing: [
    {
      identifier: "devil",
      size: "sm"
    },
    {
      identifier: "angel",
      size: "lg"
    }
  ],
  accessory: [
    {
      identifier: "bell",
      size: "md"
    },
    {
      identifier: "medal",
      size: "md"
    }
  ],
  emote: [
    {
      identifier: "smirk",
      size: "md"
    },
    {
      identifier: "alarmed",
      size: "md"
    }
  ],
  hair: [
    {
      identifier: "none",
      size: "md"
    },
    {
      identifier: "short",
      size: "md"
    }
  ]
};

export const attributeTypes = [
  "generation",
  "moofactoryPeriod",
  "strength",
  "dexterity",
  "constitution",
  "intelligence",
  "wisdom",
  "charisma"
];

export const faq = {
  "What is CryptoCattle?":
    "It's like CryptoKitties -- but beefier! In both games, you can buy, sell, trade and breed animals.",
  "Isn't this just a rip off of CryptoKitties?":
    "No, it's a <em>principled</em> ripoff of CryptoKitties! <a target='_blank' rel='noopener noreferrer' href='http://openrelay.xyz'>OpenRelay</a> has been working on their open source EtherCattle project to operationalize the management of Ethereum clients -- servers should be \"livestock\", not \"pets\"! When answering questions about EtherCattle, we've often joked that it wasn't the cow version of CryptoKitties, so for this ETHDenver 2019, we've decided to bring our joke to life!",
  "How do I get started with CryptoCattle?":
    'First, click the menu button in the navigation bar at the top of the screen. When the drawer slides in, select the "Sale Barn" option. On the "Sale Barn" screen, you can view a list of Cows for sale, and purchase one that strikes your fancy!',
  'What is a "generation"?':
    'A "generation" indicates how far down the family tree a Cow is. Think of Cows with a "generation" of 0 as "Adam and Eve."',
  "What can I do with Cows?":
    'Cows can be sold to others at the "Sale Barn." They also occasionally produce reproductive material called "Straws."',
  'What are "Straws"?':
    '"Straws" are reproductive material that can be combined with each other to create a new Cow in a process called "moofing."',
  'What can I do with "Straws"?':
    'In addition to combining them to "moof" new Cows into existence, "Straws" can be sold at the "Sale Barn" for a profit.',
  "How do I breed Cows?":
    'First, click the menu button in the navigation bar at the top of the screen. When the drawer slides in, select the "My Pasture" option. In the "My Straws" section, click or tap on a Straw. When the drawer slides in, select a Straw to combine it with from the section at the bottom. Finally, on the "Moof" sceeen, confirm your choice by clicking the "Moof" button. Voila!',
  'What is "moofing"?':
    "\"Moofing\" is the act of combining the genetic material from two Straws to create a new Cow. <a target='_blank' rel='noopener noreferrer' href='https://en.wikipedia.org/wiki/moof'>The term has history!</a>",
  "What kinds of Cows and Straws can I buy or own?":
    "Cows and Straws have a variety of physical and personality characteristics. Some are much more rare than others! You can get Cows with a variety of horn, body, legs, horn styles -- some Cows even have wings and other magical features!"
};

export const openRelayApiUrl = "https://api.openrelay.xyz";

export const cowAddress = "0x6FB42707A192549Ec650FA1490FCCEf98EccD4Fd";

export const strawAddress = "0x5D501e27CEEc1974403135a69d40D517aFe53A9C";
