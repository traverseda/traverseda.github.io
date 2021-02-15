# Designing for the glowforge

{{toc}}

## Tech Overview

Here are some tipes, assuming you're already a graphic designer, for how to get
the most out of a glowforge. The glowforge accepts SVG files.

**The glowforge does not understand fonts at all**, convert your text to shapes
before uploading. Embedded fonts don't work, built-in fonts don't work, fonts
don't work.

The glowforge has two main ways of drawing artwork, and it can also cut. It
decides what is what based on color, but you can always override in the
glowforge interface. Think of colors as like layers, and you can tell each color
to be a different type of operation.

 * Engrave

Generally this is how the glowforge treats shapes that have a fill color.

This is a raster mode where the glowforge will scan back and forth like an old
CRT television. At standard definition I find it takes about 2 hours to do a
drawing that covers the entire board.

The glowforge moves a lost faster left/right than it does up/down, so when
possible you want your engraves to be wide, not tall. For example if you're
engraving a long string of text try to keep it horizontal, or rotate the object
until it is horizontal. That can shave off entire minutes for each row of text.


 * Score

Generally this (or cut) is how the glowforge treates objects that have just a
stroke defined.

In this mode the laser follow your SVG path, laying down a line that's ~0.4mm.
This tends to be a fair bit faster than engraving most of the time. You need to
have a really complicated design before it's better to engrave than score.

---

The glowforge has an 19x11 inch area it can cut in, a bit smaller if you're
engraving as it needs time to decelerate the glowforge head.

## Tips and tricks

### Stroke fonts

For text I try to use stroke fonts, unless the client has a very specific font
in mind. A dead simple stroke font will cut incredibly thick, some of them
consist of essentially one line, like you'd write a letter with a pen. More
complex serif fonts are slower, but still much faster than engraving.

I use the "Hershey Text" extention built in to inkscape.

![Stroke font example](./inkscapeDemos/strokeFont.svg)

---

![list of stroke fonts](./inkscapeDemos/strokeFontIndex.svg)

If the client requires a more specific font I just use a normal font, convert it
to a path, and engrave it.
