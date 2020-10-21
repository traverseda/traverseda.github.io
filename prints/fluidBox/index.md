# Fluidy resizable box using inkscape live path effect

This is a box designed for a laser cutter where you can click and drag to resize
the box. It's implemented using a little-used inkscape feature call live path
effects. It's designed for 3mm thick wood. As you resize the box it will
automatically resize to have the right tab depth and will also change the number
of tabs to something appropriate for that size.

<video controls autoplay loop>
    <source src="./ResizableBox.webm">
</video>

![](FluidLasercutBox.svg)

[Download](FluidLasercutBox.svg)

The primitives I used to build this are on the "primitives" layer. You can
modify those primitives to work with different depths of plywood.

You can't group the objects or else the live path effects will stop updating.
