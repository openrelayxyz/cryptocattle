#!/usr/bin/env python

from svgimgutils import SVGImgUtils

SVGImgUtils.adddata = lambda x: x

def updateStyle(elements, key, value):
    for element in elements:
        styles = dict(i.split(":") for i in element.attrib["style"].split(";"))
        styles[key] = value
        element.attrib["style"] = ";".join(":".join(i) for i in styles.items())

def combine(fnames, destination):
    base = SVGImgUtils.fromfile(fnames[0])
    for fname in fnames[1:]:
        layer = SVGImgUtils.fromfile(fname)
        base.append(layer.root)
    base.save(destination)


# updateStyle(base_template.root.xpath("//svg:path", namespaces={'svg': base_template.root.nsmap['svg']}), "fill", "#00FF00")

if __name__ == "__main__":
    import sys
    combine(sys.argv[1:-1], sys.argv[-1])
