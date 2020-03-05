# Inkscape/glowforge

We use the glowforge laser cutter in our makerspace. This is the notes from a
lesson I gave on how to use the glowforge.

There are two different ways you can represent images, as an array of pixels (we
call these raster images) or as a set of shapes (we call this vector images).
The glowforge can engrave vector images, the laser will scan back and forth
across the substrate like an old television, but for things like cutting or
scoring you want to be using vector images.

[demonstration of vector vs raster]

We use the free and open-source software [inkscape](https://inkscape.org/)
for editing vector images.

In vector-image editing software like inkscape your drawing is composed of a
number of "objects", those objects can be things like sqaures, triangles,
circles, etc. Most of those higher-level objects are made out of a different
type of object, a path.

[demonstration of path, editing the curve of a path]

A path is composed of a number of nodes, you can curve them via "bezier curves".
These nodes and curves are what the glowforge actually understands. The
glowforge will use it's own internal software to reduce more complicated objects
like those squares and circles into a path, and we can do the same.

[top menu > path > object to path]

There are some types of objects the glowforge can't convert into a path though,
the most important one is text/fonts.

[demonstration of converting text to a path]

[demonstration that it is no longer editable with the text tool]

The glowforge presumes that each color is it's own type of path, and groups
things appropriatly. We use red for lines that we want to cut. One thing to be
aware of is **just because you can't see a line doesn't mean it doesn't exist**.
A line can be covered up, but it still exists and the glowforge will still cut
it.

One thing that you will probably find very usefull is the "CSG operations", the
ability to cut a shape out of another shape, or combine two shapes.

[demonstration of difference, union, intersection, etc]

[top menu > path > difference, union, etc]
