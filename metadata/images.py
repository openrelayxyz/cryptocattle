from svgimgutils import SVGImgUtils
from metadata import *

from lxml import etree


SVGImgUtils.adddata = lambda x: x

SKINNY = "body_skinny_md"
FAT = "body_fat_md"
MEDIUM = "body_medium_md"

suffix = {
    SKINNY: "sm",
    FAT: "lg",
    MEDIUM: "md",
}

def combine(fnames):
    base = SVGImgUtils.fromfile(fnames[0])
    for fname in fnames[1:]:
        try:
            layer = SVGImgUtils.fromfile(fname)
            base.append(layer.root)
        except Exception as e:
            print(e)
    return etree.tostring(base.root, xml_declaration=True,
                             standalone=True,
                             pretty_print=False)

def imageListFromDNA(dnaInt):
    images = []
    bodySize = getBody(dnaInt)
    images.append("images/wings/%s%s.svg" % (getWings(dnaInt)[:-2], suffix[bodySize]))
    images.append("images/legs/%s.svg" % getLegs(dnaInt))
    images.append("images/bodies/%s.svg" % bodySize)
    images.append("images/ears/ears_standard_md.svg")
    images.append("images/horns/%s.svg" % getHorns(dnaInt))
    images.append("images/head/heads_standard_md.svg")
    images.append("images/hair/%s.svg" % getHair(dnaInt))
    images.append("images/tails/%s%s.svg" % (getTails(dnaInt)[:-2], suffix[bodySize]))
    images.append("images/spots/spots_eth_%s.svg" % suffix[bodySize])
    images.append("images/emotes/%s.svg" % getEmotes(dnaInt))
    images.append("images/accessories/%s.svg" % getAccessories(dnaInt))
    return images
