---
date: '2020-01-24T22:44:00-04:00'
title: 'Tabletop Sim Bookbinder'
---

Back during covid when I was using tabletop simulator a lot I used this 
script to bundle a bunch of PDFs on the internet into books for tabletop simulator.

We had some tech illiterate players and the skeuomorphism of the interface
as well as being able to grab their pieces really helped them out.

Use it to bundle a bunch of characters sheets for you DnD games, or
any other PDFs you can find.

```python

"""Generate books from a list of urls in tabletop simulator
"""

import sys, json, os, copy

bookBag={"SaveName":"","GameMode":"","Date":"","Gravity":0.5,"PlayArea":0.5,"GameType":"","GameComplexity":"","Tags":[],"Table":"","Sky":"","Note":"","Rules":"","TabStates":{},"ObjectStates":[{"Name":"Bag","Transform":{"posX":57.0064,"posY":1.26014686,"posZ":-2.550843,"rotX":1.26331825e-05,"rotY":-2.48861652e-05,"rotZ":6.62508e-06,"scaleX":1,"scaleY":1,"scaleZ":1},"Nickname":"Book Bag","Description":"","GMNotes":"","ColorDiffuse":{"r":0.7058823,"g":0.366520882,"b":0},"Locked":False,"Grid":True,"Snap":True,"IgnoreFoW":False,"MeasureMovement":False,"DragSelectable":True,"Autoraise":True,"Sticky":True,"Tooltip":True,"GridProjection":False,"HideWhenFaceDown":False,"Hands":False,"MaterialIndex":-1,"MeshIndex":-1,"LuaScript":"","LuaScriptState":"","XmlUI":"","ContainedObjects":[]}],"LuaScript":"","LuaScriptState":"","XmlUI":"","VersionNumber":""}

books=bookBag["ObjectStates"][0]["ContainedObjects"]

bookBase = {
  "Name": "Custom_PDF",
  "Transform": {
    "scaleX": 1.0,
    "scaleY": 1.0,
    "scaleZ": 1.0
  },
  "Nickname": "",
  "Description": "",
  "GMNotes": "",
  "ColorDiffuse": {
    "r": 1.0,
    "g": 1.0,
    "b": 1.0
  },
  "Locked": False,
  "Grid": True,
  "Snap": True,
  "IgnoreFoW": False,
  "MeasureMovement": False,
  "DragSelectable": True,
  "Autoraise": True,
  "Sticky": True,
  "Tooltip": True,
  "GridProjection": False,
  "HideWhenFaceDown": False,
  "Hands": False,
  "CustomPDF": {
    "PDFUrl": "",
    "PDFPassword": "",
    "PDFPage": 0,
    "PDFPageOffset": 0
  },
}


from urllib.parse import unquote

def getName(s):
    import os
    base=os.path.basename(s)
    return os.path.splitext(base)[0]

bookBag["ObjectStates"][0]["Nickname"]=getName(sys.argv[1])

data = open(sys.argv[1],"r").readlines()

for line in data:
    line=line.strip()
    line = unquote(line)
    book=copy.deepcopy(bookBase)
    book["Nickname"]=getName(line)
    book["CustomPDF"]["PDFUrl"]=line
    books.append(book)

out = json.dumps(bookBag, indent=2)
open(sys.argv[1]+".json","w+").write(out)

```
