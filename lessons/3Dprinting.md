# Intro to 3D printing

3D printing is a fairly complicated procedure, today we're going to focus on
taking an existing 3D model and preparing it for the 3D printer. That process is
refered to as "slicing" a 3D model, and we use the free and open-source software
[cura](https://ultimaker.com/software/ultimaker-cura).

The process of slicing converts a "mesh" (mostly commonly an `.svg` file) into a 
"tool path" (most commonly a `.gcode` file). A tool path file tells the machine
exactly what motions to make, how much plastic to extrude, what temperature to
be at, etc.

We're mostly going to be focused on that "slicing" process today, as designing
files for 3D printer is a very broad topic.

### Safety

Gcode files have ultimate control over the machine, a malicious gcode file could
cause the machine to tear itself apart, as it tries to print outside of the
bounds of what is physically possible. Of course many printers implement
safeties to prevent the more common ways a machine could damage itself.

It's very important that you use the right machine profile in cura, otherwise
the printer won't work properly and, in the worst cases, could damage itself.
The "Dwmaker" printer we use in the crafty fox uses the profile of the 
`ultmaker 2 extended +`.

It's also important to remember that this is a physical machine, it can burn
you, it can catch on to clothing and flesh, or otherwise do damage to actual
humans. That being said it is safer than a drill or even a knife, just keep your
hands out of the work zone while it's running and don't touch any of the hot
surfaces unless you've verified that it's safe to do so.

### Filament

The material we use to 3D print is called "filament", there are a number of
different varieties with different material properties, but the one we use most
in the shop is "PLA", or "poly-lactic acid". It's a bioplastic most commonly
made from corn, although any plant starch will do.

Previously the primary plastic used for 3D printing was ABS, in addition to
being more enviromentally freindly PLA has mechanical properties that make it
better suited for 3D printing. Most notably minimal thermal-expansion, this
means that the prints don't warp very much when they cool down. Hopefully that
kind of warping, and how to work around it, is something you never need to worry
about.

PLA is available in a variety of colours, but of course the printer can only
deal with a single roll of filament at a time, meaning that you can't mix
different colours/filaments in one print.

Filament comes in two common variaties, 3mm and 1.75mm. We use 1.75mm in our
shop.

### Finding models

I use [yeggi](https://www.yeggi.com/) as a search engine specifically for 3D
models.

Not all 3D models are actually printable, but most of the ones on sites yeggi
links to are. The *first* thing you should check is if someone actually has
printed that model. If you don't see a picture of the finished product, well
it's possible that the model wasn't designed to be printable. Assessing how easy
it is to print a given model is an important skill.

There are two main ways a 3D file can fail to be printable.

 * The mesh data isn't physically complete

Sometimes people will try to print a 3D file from a game, or that we otherwise
designed to just be shown on a computer screen. Those types of files don't need
to be physically possible, the most obvious example is that things can be
zero-width, be literally infinitly thin. In order to explain fully explain the
ways a mesh can be broken I'd have to spend time explaining how computers
actually render 3D graphics, suffice to say that a 3D file designed to be pretty
on a screen are *completly* different from 3D models designed to by physically
real objects, even though they use the same file format.

We commonly say meshes like this "aren't water tight". If you're not sure, you
can look up a tutorial on "making sure a mesh is water tight".

 * The shape is just too hard to print.

You can't print things in mid-air, but how close can you get? It's generally
recomended that you don't make overhangs that are much more than a 45 degree
angle. Tall/thing spires can also be a problem, as often the layer beneath has
not had time to cool down before you start printing the next layer. It's also
important that your print has lots of contact with the 3D printer bed, too
little and you may find your print has become detached in the middle of a print.

The only real way to get a feel for this though is to try a bunch of prints and
see what gives you a hard time.