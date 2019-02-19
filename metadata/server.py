from flask import Flask, Response
from web3 import Web3, HTTPProvider
import os
from cow_abi import abi as cow_abi
from straw_abi import abi as straw_abi
import json

from metadata import *
from images import *
app = Flask(__name__)


@app.route('/metadata/cow/<int:tokenId>')
def cow_metadata(tokenId):
    web3 = Web3(HTTPProvider(os.environ.get("ETH_NODE")))

    cow = web3.eth.contract(
        address=os.environ.get("COW_ADDRESS"),
        abi=cow_abi,
    )
    try:
        dnaInt = int.from_bytes(cow.functions.getDNA(tokenId).call(), byteorder='big')
    except Exception as e:
        print(e)
        return "Not found", 404
    personality = getPersonality(dnaInt)

    response = {
      "description": "A %s cow" % personality,
      "image": "%s/images/cow/%s.svg" % (os.environ.get("API_ENDPOINT").rstrip("/"), tokenId),
      "attributes": [],
      "id": str(tokenId),
    }
    try:
        generation = cow.functions.generation(tokenId).call(),
    except Exception:
        generation = bitsRange(dnaInt, 100, 98)
    response["attributes"].append({
        "trait_type": "generation",
        "value": generation
    })
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
    print(straw)
    try:
        frozen = straw.functions.frozen(tokenId).call()
    except Exception as e:
        print(e)
        return "Not Found: %s" % e
    try:
        response = {
          "image": "%s/images/straw/%s.svg" % (os.environ.get("API_ENDPOINT").rstrip("/"), tokenId),
          "id": str(tokenId),
          "attributes": [
            {"trait_type": "frozen", "value": frozen},
            {"trait_type": "parentId", "value": int(tokenId >> 128)},
          ]
        }
    except Exception as e:
        print(e)
        return "Not Found", 404
    return Response(json.dumps(response), mimetype="application/json")

@app.route('/images/cow/<int:tokenId>.svg')
def cow_image(tokenId):
    web3 = Web3(HTTPProvider(os.environ.get("ETH_NODE")))

    cow = web3.eth.contract(
        address=os.environ.get("COW_ADDRESS"),
        abi=cow_abi,
    )
    try:
        dnaInt = int.from_bytes(cow.functions.getDNA(tokenId).call(), byteorder='big')
    except Exception as e:
        return "Not Found", 404

    images = imageListFromDNA(dnaInt)
    return Response(combine(images), mimetype="image/svg+xml")
