<h1>Designing off-grid power systems</h1>

The goal of this workshop is to provide a solid foundation for your own research,
to give you the tools you need to be able to assess different ways of building
yourself an off-grid mini power grid, and to be able to make the calculations
nessesary to estimate things like how much power you actually need.

This was written in 2020, and while the fundamentals should be useful for a long
time, some specific recomendations on things like batteries, might need to be
updated.

{{toc}}

## Basic metaphors for understanding electrical systems

Electricity can seem very complicated, it can be hard to get an intuitive sense
of how these systems work. I like to imagine electrical systems as if they were
networks of water-powered devices.

 * **Amperage** means how fast the water if flowing through your pipe.
     * The faster your water flows the more of its energy is lost to friction,
         transforming into heat.
 * **Voltage** is how much water you're moving, how big your pipe is.
 * **Watts** are a combination of how much water you're moving and how fast it's
     moving, we use that to determine how much energy something produces or
     consumes.
 * **Watt-hours** are a measure of how many watts something will use over the course
     of an hour. Generally if someone says "that battery stores 800 watts" what
     they actually mean is "that battery stores 800 watt-hours". People often
     use watts and watt-hours interchangebly. For example if you have a 1 watt
     lightbulb and a 10 "watt" (actually watt-hour) battery, you can run your 
     lightbulb for 10 hours.

There are other things like resistance, capacitance, and inductance. We
typically don't need to worry about those for off-grid power, so we're going to
ignore them.

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
only provide 10 volts, trying to pull power out past that point could damage the
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
     producing any light. This wastes power and would very likely damage the battery.

Generally whatever devices you hook up will take as much amperage as they want,
and no more. You don't need to worry about amperage aside from making sure you
have enough available for your devices to "pull" from.

It's always easier to drop a voltage down than it is to increase the voltage.
This not only means that dropping voltages is cheaper but also that it's more
energy efficient. We call the devices that just drop a voltage down a "voltage
regulator". If it can also increase the voltage we call it a "boost-buck
regulator".

## Components of an off-grid power system

In general this section is going to be less useful, as there are a *lot* of
different products on the market. This is a rough introduction to what options
exist, but a lof of it is going to come down to personal preference and just
what's available where you are. You may find that there are some massive
tarriffs on lithium batteries, or some massive recycling fees on lead-acid
batteries. It's pretty difficult to figure out exactly what's going to work for
you.

### Batteries

Batteries are ~~one of~~ the most expensive parts of any off-grid system. If you
don't *need* to be off grid, if you're just interested in alternative energy, I
highly recomend you look into systems that let you sell extra power back to the
power company.

#### Lead Acid

Lead acid batteries are the "default" type of battery for any kind of off-grid
deployment. The biggest advantage of lead-acid batteries is that they're
durable, repairable, and simple.

It's important that you get batteries that are rated for "deep cycle". These
don't provide as much amperage as a normal car battery, but they're a lot more
durable and can withstand a lot more charge cycles. Generally golf cart or
marine batteries are good places to start.

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
measures all the power entering or leaving the battery.

### Inverters



### Power generation
#### Solar
#### Wind turbines
#### Gas Generators

