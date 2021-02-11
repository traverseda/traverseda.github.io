#! /bin/env xonsh
from pathlib import Path

for i in Path.cwd().glob("**/*.jpg"):
    if "/.thumbs/" in str(i):
        continue
    print(i)
#    exiftool -geotag= @(str(i))
#for i in *.jpg; do echo "Processing $i"; exiftool -geotag= "$i"; done
