---
date: '2020-10-21T20:15:00-04:00'
ShowToc: true
title: 'Designing off-grid power systems'
---

The goal of this workshop is to provide a foundation for your own research,
to give you the tools you need to be able to assess different ways of building
yourself an off-grid mini power grid, and to be able to make the calculations
nessesary to estimate things like how much power you actually need.

There are turn-key off grid solutions, and consulting companies that can help
you create your ideal off-grid installation. As I'm not in the affiliate
marketing business I'll leave it up to you to find those solutions, but
hopefully this can at least point you in the right direction for your own
research.

This was written in 2020, and while the fundamentals should be useful for a long
time, some specific recomendations on things like batteries, might need to be
updated.

## Basic metaphors for understanding electrical systems

Electricity can seem very complicated, it can be hard to get an intuitive sense
of how these systems work. I like to imagine electrical systems as if they were
networks of water-powered devices.

 * **Amperage** means how fast the water is flowing through your pipe.
     * The faster your water flows the more of its energy is lost to friction,
         transforming into heat.
 * **Voltage** is your water pressure.
 * **Watts** are a combination of your water pressure and how fast it's
     moving, we use that to determine how much energy something produces or
     consumes.
 * **Watt-hours** are a measure of how many watts something will use over the course
     of an hour. Generally if someone says "that battery stores 800 watts" what
     they actually mean is "that battery stores 800 watt-hours". People often
     use watts and watt-hours interchangebly. For example if you have a 1 watt
     lightbulb and a 10 "watt" (actually watt-hour) battery, you can run your 
     lightbulb for 10 hours.
 * Ineffeciency is like a leak in your pipes, only instead of water leaking out
     you get heat leaking out. It's impossible to do any *work* without some of
     the energy being wasted. Consider the [hydraulic ram
     pump](https://youtu.be/zFdyqTGx32A) as an example. It's a 
     water powered water pump, analogous to a device that increases voltage.

![](./ramPump.gif)

There are other things like resistance, capacitance, and inductance. We
typically don't need to worry about those for off-grid power, so we're going to
ignore them.

These basic metaphors provide a great underpinning for getting that intuitive
understanding of how electrical systems work. For example, can you guess what
happens when you start taking too much "water" from a source? If you guessed that
the "water pressure" (voltage) goes down you'd be correct. You can think of most
voltage sources as sort of like a pump that's trying to maintain a specific
water pressure.

Can you guess what happens if you try to supply too many *amps* to a device?
Well in our metaphors *amps* are how fast the water is flowing. You can't supply
too many amps without raising your "water pressure" (voltage). Just make sure
whatever device you have hooked in can actually handle that much pressure.

---

There are two main standards for delivering power, alternating current and
direct current. When you imagine a compressor-powered tool or a water wheel
you're imagining direct current, and that's the primary type of power we're
going to be dealing with in any sort of off-grid situation. You can imagine
alternating current as trying to power a device by rapidly switching the
direction the water was flowing. This has some advantages, but you can't really
store "oscilating water". You can put a bunch of water in a bucket, and that's
more or less what a battery is.

## Converting power

It's important to note that a 12v battery doesn't store *exactly* 12 volts. At
full charge they provide closer to ~14v, and they're considered empty when they
only provide 12 volts, trying to pull power out past that point could damage the
battery.

That's a pretty large range of voltages, but generally most electronics require
very precise voltages in order to work properly. A 12v led light strip is
designed to work at *exactly* 12 volts, if you hooked it up directly to a
battery a number of things will happen

 * When the battery is fully charged (~14v) the 12v LED strip will be brighter than it's
     supposed to be, causing it to heat up more than it was designed to and
     shortening it's lifespan.
 * As you use power the voltage in the battery will go down, causing the led
     strip to dim.
 * The led strip will keep draining power even when it looks like it's not
     producing any light, well under the rated voltage for both the battery and 
     the led strip. This wastes power and would very likely damage the battery.

Generally whatever devices you hook up will take as much amperage as they want,
and no more. You don't need to worry about amperage aside from making sure you
have enough available for your devices to "pull" from.

It's always easier to drop a voltage down than it is to increase the voltage.
This not only means that dropping voltages is cheaper but also that it's more
energy efficient. We call the devices that just drop a voltage down a "voltage
regulator". If it can also increase the voltage we call it a "boost-buck
regulator".

You can find those components just by searching wherever you buy hobbyist
electronics. I personally use aliexpress.

---

Let's say you had a power adapter like this one, and you wanted to make a new
power adapter that runs directly off your batteries.

![](./power_supply_label.jpg)

What we need to do is figure out the relevant specification and find a voltage
regulator that we can use to replace it. Then we wire the voltage regulator up
to whatever connectors we need. This will probably require soldering.

You can see that the *output* is **19.5v**. If we had a **12v** battery bank we'd need
a boost-buck converter. Since I have a **24v** battery bank I should be able to get
away with just a voltage regulator though. I also note that it's able to output
**4.62 amps**, which is pretty high for a voltage regulator. I probably want
something a bit beefier, probably something with a heatsink. I search aliexpress
for `voltage regulator 19.5v` and eventually I find
[this](https://archive.li/1djPm) voltage regulator. It accepts **24v** (a range of
20-36 volts) and can output up to **6.15 amps**, so it's a suitable replacement for
my laptops charging brick. It doesn't say what leads are what, but I know that
black is always the negative terminal in DC systems, so I try hooking the red
and a black wire up, and test it with my multimeter.

I have some [barrel connectors](https://archive.li/oJyKe) left over from a
previous project, so it's pretty easy to actually hook it up to my laptop.

Other devices will follow pretty simialr workflows, find out what voltage the
power supply output and find an appropriate voltage regulator online.

## Components of an off-grid power system

In general this section is going to be less useful, as there are a *lot* of
different products on the market. This is a rough introduction to what options
exist, but a lot of it is going to come down to personal preference and just
what's available where you are. You may find that there are some massive
tarriffs on lithium batteries, or some massive recycling fees on lead-acid
batteries. It's pretty difficult to figure out exactly what's going to work for
you.

### Things you probably shouldn't use electricity for

It takes a *lot* of power to make heat, heat is about the least efficient thing
you can use your electricity for. I'd *strongly* recomend not using electric
heat. There are a lot of great heating options out there. Personally I'd
recomend propane, with an optional wood stove. When you need electric heat the
most is when you will be getting the least from your solar panels, which means
in order to use electric heat you need to massivly over-provision your entire
installation, and end up wasting a lot of power in the summer.

Don't use an electric water heater, instead consider a tankless propane water
heater.

Don't use an electric stove, instead use a propane stove.

There are also natural gas clothes dryers if you *must* have clothes dryer. My
understanding is that they can be converted to run on propane with some effort.

### Batteries

Batteries are ~~one of~~ the most expensive parts of any off-grid system. If you
don't *need* to be off grid, if you're just interested in alternative energy, I
highly recomend you look into systems that let you sell extra power back to the
power company. This means none of the power you produce gets wasted, and that
you don't need to worry about when you're actually producing your power as long
as you have enough power "banked" with the power company. It's probably a lot
better for the enviroment to go that route, to do grid-tied solar. Still there
are a lot of legitimate reasons for going full or hybrid off-grid, especially in
places where the grid is unreliable or unavailable.

We can generally find out how mants "watts" (actually watt hours) a battery can
store by multiplying it's amp-hours by it's voltage. If you have a 9Ah 12v
battery you have a 108 watt-hour battery.

#### Lead Acid

Lead acid batteries are the "default" type of battery for any kind of off-grid
deployment. The biggest advantage of lead-acid batteries is that they're
durable, repairable, and simple.

It's important that you get batteries that are rated for "deep cycle". Unlike a
normal car battery they're not good for large bursts of current, but they're a lot more
durable and can withstand a lot more charge cycles. Generally golf cart or
marine batteries are good places to start. I've never tried a regular car
battery, but I'm told they die after just a few cycles, that you're unlikely to
get more than 6 months of reliable performance out of them.

#### Lithium

Lithium batteries have a higher up-front cost, but they should be lower over the
lifetime of the battery. The main disadvantage is that they can explode, where
as it's pretty difficult to get lead acid batteries to explode. We mostly use
LiPo4 batteries, they're quite a bit safer but they're not quite as compact and
lightweight as some other types of lithium-ion batteries.

In order to be successfull with lithium batteries you pretty much need a
battery-monitoring-system, or BMS. A BMS designed for lithium batteries will be
able to do things like make sure the individual cells are balanced and will
provide regular protections like low voltage cutoff. Despite the name they
generally don't actually tell you how much power you have stored in your
batteries.

### Battery Monitoring

A lot of "battery gauge" products are just measuring the voltage of your battery
bank. That's not a reliable way to tell how much power you're using because the
relationship of stored-power to voltage isn't linear. For example some batteries 
provide pretty much their maximum power until they're almost out, and then the 
voltage drops suddenly. You might be able to get away with a simple "battery
gauge" if you're using lead-acid, and are willing to accept some imprecision and
do things "by feel", but I'd recomend against it.

You're probably going to want to know how much power you have in your batteries,
how much power you're generating, and how much power you're using. A proper
battery gauge can do all that. There's only one model I know of that's
reasonable, and that's the "vat1300". The tend towards the cheaper side, and
should be well under $100cad. I think some of the higher-end
lithium BMS's can also do that sort of thing.

The big difference between
something like the vat1300 and just measuring the voltage is that the vat1300
measures all the power entering or leaving the battery. Since you can't reliable 
tell how much power a battery has stored just from measuring the voltage, that's
very useful.

### Inverters

Pretty much everything you buy can run off of 110v AC power, although as we
discussed earlier almost everything has some kind of power supply that turns
that power into lower voltage DC.

What we want to avoid is situation like `24v DC -> 110v AC -> 5v DC -> your cellphone`.
We'd much rather go `24v DC -> 5v DC -> your cellphone`. Still, there
are a handful of items that actually use AC power, mostly it's things with
bigger electric motors in them like blenders or refrigierators. For those we
need to use an inverter to step up to 110v.

For 12v systems you can generally
just buy an inverter, 24v inverters are a bit harder to find. 24v inverters
don't have to step the power up as much, so they lose a bit less during the
conversion process.

You definitly should have an inverter, even a small 500 watt one, don't
underestimate the convenience of just being able to plug something in without
having to put a bunch of thought in.

### Power generation

#### Solar

Solar power is the *default*, and with good reason. It generally produces at
least *some* power ever day.

#### Wind turbines

With solar power you can be pretty much guranteed to get *some* amount of sunlight
every day. There's no such gurantee with wind power, it's very dependent on
exactly where you've set up your turbine. If you've got a good spot though wind
turbines are often quite a bit cheaper per watt. They also work just as well in
the winter as the summer.

If you can use wind turbines they're a very good option though. Unlike solar
panels they can run 24 hours a day and small wind turbines can work with even
relativly light breezes. Generally when your solar panels are the weakest,
during periods of long rain or storm, a wind turbine will be producing at peak
output.

There are however some disadvantages.

 * Mechanical parts can fail and require maintence
 * Power output is unpridictable. You might get more power per dollar but you
     can't rely on that power showing up a little bit every day.
 * They're a lot louder
 * They can fail catestrophically in high winds

There's a reason why wind turbines are the de-facto choice for large scale
industrial deployments, why they're cropping up in more and more of the
countryside. When deployed in an area with good wind they produce more power for
less money. If it wasn't for the disadvantages I think we'd see a lot more small
wind turbines pop up. If you can deal with the disadvantages and have enough
wind a small wind turbine can really help during the winter months.

#### Gas Generators

Having a gas generator is a very good idea for emergencies. You're most likely
to need to use your generator during the winter, when you're getting a lot less
power from your solar panels. It's worth noting that gasoline generators are
~18-20 percent efficient. All that wasted energy? It gets turned into heat, so
it might be worth figuring out a way use that extra heat to heat your home. You
don't need a very big generator, as ideally you'll just be using it to charge
your batteries.

There are a lot of different sub-types of generator, the most common are
propane, gasoline, and diesel.

**Diesel** generators are the cheapest to run, generally if generation is part
of your actual power strategy, instead of an emergency backup, you'll want
diesel. They're also fairly flexible on what kind of fuel they can use. People
run them off of kerosene, heating oil, cooking oil, and a whole lot else. Diesel
fuel is also shelf-stable for a lot longer than gasoline is. If you need a
serious generator diesel is the way to go. They're also a lot cheaper and easier
to maintain. The downside is that diesel engines are big and powerfull, probably
more than you need for a single household.

**Gasoline** generators are the *default* generator option. They're all around a
good option, but be careful because gasoline has a limited shelf life. If you're
not using it often make sure to add a gasoline stabilizer.

**Propane** generators are probably the least efficient, and by extention the
most expensive to run. I'd say they're still not a bad option though, and they 
get better if you can use the waste heat to heat your home.
Propane has an indefinite shelf life which is a major advantage for intermittent
use. The pricing gets better if you have large propane tanks, as the fill-up cost 
can be a significant portion of the price.
