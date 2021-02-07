# Define multiple parts in openscad

This script lets you define multiple parts in openscad, and have it export each
of them individually.

We need to communicate a list of what parts exist, so we first evaluate the
`.scad` file, looking for part definitions in the echo output.

It's a hack, and would be much more useful as part of openscad core, but it does
get the job done.


## usage

```openscad
{{(files/"demo.scad").read_text()|escape}}
```

Download here: [partsScad.scad](partsScad.scad) | [multipart.py](multipart.py)
