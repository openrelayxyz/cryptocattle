from web3 import Web3, HTTPProvider
from flask import Flask, Response
import os
from cow_abi import abi as cow_abi
from straw_abi import abi as straw_abi
import json

app = Flask(__name__)

emotes = [
    "emotes_happy_md",
    "emotes_sad_md",
    "emotes_angry_md",
    "emotes_alarmed_md",
    "emotes_worried_md",
    "emotes_smirking_md",
    "emotes_surprised_md",
    "emotes_incredulous_md",
]

def bitsRange(dnaInt, start, end):
    return (dnaInt & (2**start - 2**end)) >> end

def getMoofactoryPeriod(dnaInt):
    return bitsRange(dnaInt, 17, 0) + 43200

def getEmotes(dnaInt):
    return emotes[bitsRange(dnaInt, 20, 17)]

def getBody(dnaInt):
    bodyType = bitsRange(dnaInt, 22, 20)
    if bodyType == 0:
        return "body_skinny_md"
    if bodyType == 3:
        return "body_fat_md"
    return "body_medium_md"

def getLegs(dnaInt):
    bodyType = bitsRange(dnaInt, 24, 22)
    if bodyType == 0:
        return "legs_skinny_md"
    return "legs_medium_md"

def getHorns(dnaInt):
    hornType = bitsRange(dnaInt, 30, 24)
    if hornType < 6:
        return "horns_none_md"
    if hornType < 12:
        return "horns_standard_md"
    if hornType < 18:
        return "horns_standard_sm"
    if hornType < 24:
        return "horns_curved_md"
    if hornType < 30:
        return "horns_curved_sm"
    if hornType < 35:
        return "horns_longhorn_md"
    if hornType < 40:
        return "horns_longhorn_sm"
    if hornType < 44:
        return "horns_antler_md"
    if hornType < 48:
        return "horns_antler_sm"
    if hornType < 50:
        return "horns_flower_md"
    if hornType < 52:
        return "horns_flower_sm"
    if hornType < 54:
        return "horns_branch_md"
    if hornType < 56:
        return "horns_branch_sm"
    if hornType < 58:
        return "horns_alien_md"
    if hornType < 60:
        return "horns_alien_sm"
    if hornType < 62:
        return "horns_horn_md"
    if hornType < 64:
        return "horns_horn_sm"

def getHair(dnaInt):
    hairType = bitsRange(dnaInt, 33, 30)
    if hairType < 3:
        return "hair_standard_md"
    if hairType < 6:
        return "hair_none_md"
    if hairType < 7:
        return "hair_long_md"
    if hairType < 8:
        return "hair_crazy_md"

def getTails(dnaInt):
    tailType = bitsRange(dnaInt, 36, 33)
    if tailType < 2:
        return "tails_poof_md"
    if tailType < 4:
        return "tails_none_md"
    if tailType < 6:
        return "tails_ratty_md"
    if tailType < 7:
        return "tails_star_md"
    if tailType < 8:
        return "tails_devil_md"

def getWings(dnaInt):
    wingType = bitsRange(dnaInt, 40, 36)
    if wingType < 12:
        return "wings_none_md"
    if wingType < 13:
        return "wings_angel_md"
    if wingType < 14:
        return "wings_devil_md"
    if wingType < 15:
        return "wings_bird_md"
    if wingType < 16:
        return "wings_butterfly_md"

def getAccessories(dnaInt):
    accType = bitsRange(dnaInt, 43, 40)
    if accType < 5:
        return "accessories_none_md"
    if accType < 6:
        return "accessories_bell_md"
    if accType < 7:
        return "accessories_medal_md"
    if accType < 8:
        return "accessories_ribbon_md"

def getPersonality(dnaInt):
    return ["Bashful",
    "Bashful",
    "Docile",
    "Hardy",
    "Quirky",
    "Serious",
    "Serious",
    "Adamant",
    "Brave",
    "Brave",
    "Lonely",
    "Naughty",
    "Bold",
    "Relaxed",
    "Relaxed",
    "Impish",
    "Lax",
    "Mild",
    "Modest",
    "Modest",
    "Quiet",
    "Rash",
    "Calm",
    "Gentle",
    "Sassy",
    "Sassy",
    "Careful",
    "Timid",
    "Timid",
    "Hasty",
    "Jolly",
    "Naive"][ bitsRange(dnaInt, 96, 91)]

def getStat(dnaInt, start):
    stat = bitsRange(dnaInt, start, start - 8)
    if stat < 13:
        return int((stat / 4) + 1)
    if stat < 51:
        return int(((stat - 13 ) / 12) + 4)
    if stat < 153:
        return int(((stat - 51) / 14) + 7)
    if stat < 242:
        return int(((stat - 153) / 29) + 15)
    return int((stat - 242)  / 5 + 18)

@app.route('/metadata/cow/<int:tokenId>')
def cow_metadata(tokenId):
    web3 = Web3(HTTPProvider(os.environ.get("ETH_NODE")))

    cow = web3.eth.contract(
        address=os.environ.get("COW_ADDRESS"),
        abi=cow_abi,
    )
    try:
        dnaInt = int.from_bytes(cow.functions.getDNA(tokenId).call(), byteorder='big')
    except Exception:
        return "Not found", 404
    personality = getPersonality(dnaInt)

    response = {
      "description": "A %s cow" % personality,
      "image": "%s/images/cow/%s.svg" % (os.environ.get("API_ENDPOINT"), tokenId),
      "attributes": []
    }
    response["attributes"].append({
        "trait_type": "moofactory_period",
        "value": getMoofactoryPeriod(dnaInt)
    })
    response["attributes"].append({
        "trait_type": "emotes",
        "value": getEmotes(dnaInt)
    })
    response["attributes"].append({
        "trait_type": "body",
        "value": getBody(dnaInt)
    })
    response["attributes"].append({
        "trait_type": "legs",
        "value": getLegs(dnaInt)
    })
    response["attributes"].append({
        "trait_type": "horns",
        "value": getHorns(dnaInt)
    })
    response["attributes"].append({
        "trait_type": "hair",
        "value": getHair(dnaInt)
    })
    response["attributes"].append({
        "trait_type": "tail",
        "value": getTails(dnaInt)
    })
    response["attributes"].append({
        "trait_type": "wings",
        "value": getWings(dnaInt)
    })
    response["attributes"].append({
        "trait_type": "accessories",
        "value": getAccessories(dnaInt)
    })
    response["attributes"].append({
        "trait_type": "personality",
        "value": personality
    })
    response["attributes"].append({
        "trait_type": "strength",
        "value": getStat(dnaInt, 51)
    })
    response["attributes"].append({
        "trait_type": "constitution",
        "value": getStat(dnaInt, 59)
    })
    response["attributes"].append({
        "trait_type": "dexterity",
        "value": getStat(dnaInt, 67)
    })
    response["attributes"].append({
        "trait_type": "intelligence",
        "value": getStat(dnaInt, 75)
    })
    response["attributes"].append({
        "trait_type": "wisdom",
        "value": getStat(dnaInt, 83)
    })
    response["attributes"].append({
        "trait_type": "charisma",
        "value": getStat(dnaInt, 91)
    })
    return Response(json.dumps(response), mimetype="application/json")


@app.route('/metadata/straw/<int:tokenId>')
def straw_metadata(tokenId):
    web3 = Web3(HTTPProvider(os.environ.get("ETH_NODE")))

    straw = web3.eth.contract(
        address=os.environ.get("STRAW_ADDRESS"),
        abi=straw_abi,
    )
    try:
        response = {
          "image": "%s/images/straw/%s.svg" % (os.environ.get("API_ENDPOINT"), tokenId),
          "attributes": [
            {"trait_type": "frozen", "value": straw.functions.frozen(tokenId).call()},
            {"trait_type": "parentId", "value": int(tokenId >> 128)},
          ]
        }
    except Exception:
        return "Not Found", 404
    return Response(json.dumps(response), mimetype="application/json")
