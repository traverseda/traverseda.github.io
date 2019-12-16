# Savonius style vertical wind turbine

## Initial concept

A [Savonius rotor](https://en.wikipedia.org/wiki/Savonius_wind_turbine)
type vertical wind turbine, intended to make use of laser cut parts.

I like vertical wind turbines. They're much less efficient then normal wind
turbines, but they're a lot simpler mechanically which makes construction and
maintence much easier.

It has a twist in an attempt to give it a more uniform torque profile, with the
hope that it ends up quieter and lets it start at a lower wind speed. The blade
profile is an SVG, so it should be pretty simple to fine tune. I'm thinking that
making it out of light weight corrogated plastic might be the way to go,
although I worry that it will be relying too much on the blades to provide
rigidity, it might make sense to go with a spar first approach and use a very
thin blade material.

I'd probably want to make them in 6 foot lengths, for easy shipping. Common hex
strut can provide the axle, transfering force to the generator. For the
generator itself I'm very tempted to just use one or more stepper motors, locked
together. They're a cheap commodity, the have a good torque/volt profile, and
you can get them in arbitrary bulk. Using a few of them in paralel is probably
cheaper than using a specialized generator, for small to medium deployments.

{% from 'templates/utils.html.j2' import image,stl with context %}

{{image("turbine.png")}}
{{stl("turbine.stl")}}

Some kind of strut channel can provide the actual mounting structure.

## Prototyping

I might try doing a small scale prototyping at some point. I've got access to a
laser cutter, so maybe I'll do a cardboard demo unit.

{#<meta property="og:title" content="Laser cut vertical wind turbine">
<meta property="og:image" content="your_image_url">#}
