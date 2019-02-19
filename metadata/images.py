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

def combine(layers):
    base = SVGImgUtils.fromfile(layers[0][0])
    for fname, transform in layers[1:]:
        try:
            layer = SVGImgUtils.fromfile(fname)
            if transform:
                layer = transform(layer)
            base.append(layer.root)
        except Exception as e:
            print("Exception:", e)
    return etree.tostring(base.root, xml_declaration=True,
                             standalone=True,
                             pretty_print=False)


def updateStyle(elements, key, value):
    for element in elements:
        styles = dict(i.split(":") for i in element.attrib["style"].split(";"))
        styles[key] = value
        element.attrib["style"] = ";".join(":".join(i) for i in styles.items())

def updateAttr(elements, key, value):
    for element in elements:
        element.attrib[key] = value

def attrTransform(transforms):
    def wrapper(node):
        for path, (key, value) in transforms.items():
            elements = node.root.xpath(path, namespaces={'svg': node.root.nsmap[None]})
            updateAttr(elements, key, value)
        return node
    return wrapper

def getColors(dnaInt, highest):
    colorPallete = [(0, 255, 198), (0, 255, 198), (255, 191, 0), (0, 191, 255)][bitsRange(dnaInt, highest - 10, highest - 12)]
    saturation = bitsRange(dnaInt, highest - 4, highest - 10)
    brightness = bitsRange(dnaInt, highest, highest - 4) + 16
    print(colorPallete, saturation, brightness)
    color1 = "".join(hex(((255 - (((255 - c) * saturation) // 64)) * brightness) // 36)[2:].zfill(2) for c in colorPallete)
    color2 = "".join(hex(((255 - (((255 - c) * saturation) // 64)) * brightness) // 32)[2:].zfill(2) for c in colorPallete)
    return color1, color2

def imageListFromDNA(dnaInt):
    images = []
    bodySize = getBody(dnaInt)
    color1, color2 = getColors(dnaInt, 103)
    spotColor, _ = getColors(dnaInt, 115)


    bodyColorTransform = attrTransform({
        "//svg:path[@fill=\"#d6e6ed\"]": ("fill", "#%s" % color1),
        "//svg:path[@fill=\"#f1ecef\"]": ("fill", "#%s" % color2),
    })
    spotColorTransform = attrTransform({
        "//svg:path[@fill=\"#000000\"]": ("fill", "#%s" % spotColor),
    })
    # bodyColorTransform = lambda x: x
    images.append(("images/wings/%s%s.svg" % (getWings(dnaInt)[:-2], suffix[bodySize]), None))
    images.append(("images/legs/%s.svg" % getLegs(dnaInt), bodyColorTransform))
    images.append(("images/bodies/%s.svg" % bodySize, bodyColorTransform))
    images.append(("images/ears/ears_standard_md.svg", bodyColorTransform))
    images.append(("images/horns/%s.svg" % getHorns(dnaInt), None))
    images.append(("images/head/heads_standard_md.svg", bodyColorTransform))
    images.append(("images/hair/%s.svg" % getHair(dnaInt), bodyColorTransform))
    images.append(("images/tails/%s%s.svg" % (getTails(dnaInt)[:-2], suffix[bodySize]), bodyColorTransform))
    images.append(("images/spots/spots_eth_%s.svg" % suffix[bodySize], spotColorTransform))
    images.append(("images/emotes/%s.svg" % getEmotes(dnaInt), None))
    images.append(("images/accessories/%s.svg" % getAccessories(dnaInt), None))
    return images
