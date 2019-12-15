# Thoughts on voxel engines

Minecraft cemented the popularity of voxel engines, but I think a lot can be
done with the concept still.

Of course when I say "voxel" what I'm actually refering to is minecraft style
"boxels", that is voxels arranged in a very strict grid.

## Octrees, obviously

Octrees subdivide each cube into 8 sub cubes recursivly. This has a lot of
desitable properties for a voxel engine, one of which is that it naturally
supports a level-of-detail system.


## 8 GB per meter

If you were to try and target a "planck length" of 1mm each minecraft-sized cube
would be 1000*1000*1000 units. Presuming that you had 256 base "elements", that
means a 1 meter cube would take 8GB to represent. That's pretty untenable. There
are a variety of ways you can make that better though.

A "layered" mapping is almost a must, so that you can store changes relative to
another object.
