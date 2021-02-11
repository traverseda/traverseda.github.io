
<style>
h2 {
    font-size:20px
}
p {
    margin-bottom:10px;
    margin-top:10px;
}
</style>

## Alex

Tristan! Do you c++? I think I'm just going to bite the bullet and c++

And use an IDE to do it

## Tristan

I am currently entering c++, but it's a big place.

Why IDE? I'd encourage IDEing so we can compare contrast. I use grep+vim+gdb

## Alex

I'm using vscode

It's not great

I will stop once I figure out why IDEs are good

And get better at vim

## Tristan

Neither is grep+vim+gdb

## Alex

Yeah

Alternatively I might write an IDE, Mahi-Gui is going pretty well

Everything else is not

But Mahi-Gui is

## Tristan

I like c++ though, mostly for defacto reasons. Like, the newcomers might be
better, but they are also newcomers.

## Alex

Mostly I've been using jump to source so that's a feature I want for vim

## Tristan

I would like to write 15 guis, I feel the 15th would be passable.

## Alex

Nah man, Mahi gui is great

## Tristan

Supposedly you can put it in with ctags, but I didn't have luck with my 20 min
of trying so gave up.

## Alex

It's a GUI toolkit esigned for making actual tools

## Tristan

s/gui/ide/

sorry

## Alex

Oh yeah, well obviously I'd just embed neovim in something

## Tristan

I've been using pyimgui and it annoys me in new and different ways.

## Alex

I know right?

Talk to me about annoyances

(also it doesn't seem to perform worse than pure cpp imgui, in my admittedly
limited experience)

## Tristan

Buttons and fields are indexed by their name. You can't have two ok buttons on
the same window.

or send or whatever

## Alex

You can, you just need to give them a unique name. Annoying it's true, I think
everying before or after a # is stripped from the display

## Tristan

Also I end up writing retaining systems myself because of the way I manage
data.

## Alex

You you'd do "send#send1" "send#send2"

writing retaining systems yourself is probably the cleanest way to couple it
to the code, most of the time?

## Tristan

Does #notshown not get shown?  
I have a habit of writing spagetti since I'm not forced to break out
functions, though that's more a complaint about my own code DX.

## Alex

It does not

get shown

## Tristan

That is good to know. I already invented a terrible work around that I'm not
taking out, but it is good to know.

## Alex

And yeah, imgui really is for rapid prototyping shitty code

Also I invented a terrible thing I call the "withif"

Don't remember where I put it, but basically it's a with statement that can be
conditional by modifying how python managees top-level exceptions to exit a
with statement early

## Tristan

Oh, and my biggest grievance is that retained and immode are both ways of
specifying a thing. It should be possible to write immode and have it retain
except when it actually needs to update.

## Alex

With no extra syntax

## Tristan

withif... what kind of context would you use that in?

## Alex

[ https://gist.github.com/traverseda/4bdc8d6446b6cc15d4ef66df229a5d6c
](https://gist.github.com/traverseda/4bdc8d6446b6cc15d4ef66df229a5d6c)

So you'd use it as

with imgui.Window("myWindow"):
Do a bunch of stuff, but only if window is visible

## Tristan

Ok... that's interesting. I think that makes sense.
As an aside, your description of the withif as a 'hack' has given me insight
into something I've long complained about.
In math many things are named "weird new unnatural thing x" and it annoys me
because those things are often normal old reasonable things. But it's because
when they are proposed, its "I don't know if this makes sense or not" and once
everyone says "yeah, this seems to make sense" the name has already stuck.

## Alex

I do not believe withif is one of those things

## Tristan

So my new complaint is not calling things new hacky, but rather the nature of
the lifecycle of naming things.

## Alex

I believe it to be generally bad, only useful in an incredibly narrow situatio

## Tristan

No, certainly not something that will stick around for hundreds of years as it
stands.

## Alex

I think python really needs better syntax for building trees though, and maybe
the solution is lists

is withs

not lists

LIke this!: [
https://gist.github.com/traverseda/da367acbf7fdabac41b923265536c3e9
](https://gist.github.com/traverseda/da367acbf7fdabac41b923265536c3e9)

I forgot I wrote that

## Tristan

Are you aware that dictionaries exist?

## Alex

Yes, but I like yaml?! Syntactically significant whitespace for defining more
complicated relationships

Admittedly I was thinking about imgui when I made this.

You can slap an if statement right in the middle of that

But yeah, I think this is likely also bad, but could be good for more
complicated xml-ey type situations

Anyway, take a look at this. I've gotten demo windows drawing in c++, with
support for cool imgui docking:  
  
[ http://0fb41a0e35b3.ngrok.io/catCad ](http://0fb41a0e35b3.ngrok.io/catCad)

(link is very ephemeral)

## Tristan

I'm more dubious on tree thing than withif, though I think it probably makes
good sense in context.

## Alex

They're both pretty dubious

## Tristan

alas

My code is a tower of mistakes. I don't think I have any insight within it
worth sharing.

## Alex

QueryPerms is pretty solid though, the president of the django software
foundation said so: [
https://gist.github.com/traverseda/dabe97d56f28d9a2d12aedf1eab7eff5
](https://gist.github.com/traverseda/dabe97d56f28d9a2d12aedf1eab7eff5)

## Tristan

I'm trying to move away from the style "be clever enough to work with your own
terrible code" and towards "be clever enough to write readable code" but it is
a struggle.

## Alex

Yeah

I worry about cpp

## Tristan

Yeah, query perms is a really good idea.

What's the worry?

## Alex

That it's going to encourage cleverness, and that no one ever really documents
their shit

## Tristan

I like pointers. Working with them makes sense.

Encapsulation paradigm is also good

python is worse for not having it.

## Alex

What's the difference between pointers and weakref?

## Tristan

I didn't know weakref existed. I'll have to read about it, but it looks like
it might be the same thing.

## Alex

Except if de-references when the object gets GC'd, instead of pointing to the
wrong object

I think, no habla C

## Tristan

Don't dereference the null pointer.

Yeah, most people use abstraction over pointers in cpp

## Alex

That's good

## Tristan

Depends on the context I guess. It's nice to have the option to go that low if
you need to, and understanding pointers and pass by ref vs pass by copy and
all that is needed. You just have to learn it in c, you can get by without in
python...

So, not really a benefit that applies to you.

And I'm sure there are ways to do encapsulation in python, but I and most
proggers haven't sought them out.
Maybe insideFun and dunders is enough.

## Alex

It's all pass by reference unless the object is immutable or I explicitly make
a copy

## Tristan

not for primitives

Have you forgotten what it's like to work with raw variables from your object
ivory tower?!

## Alex

Primitives are immutable!

but also yes

## Tristan

lol

That's probs a good thing.

I keep passing piles of variables through functions when it should instead be
a nicely designed object structure and it makes me want to puke.

## Alex

Not a fan of functional programming?

## Tristan

Cause I write my code in layers and don't refactor enough.

## Alex

"passing piles of variables thorough functions".jpeg

Any thoughts on how to make a good CAD program? In particular parametric cad
with minimal programming? I'd like to avoid my solution of "everything is a
python object" for reasons, but I'd like to be able to do things like
reference the diameter of a gear and maybe do some kind of geometric
constraint solving on top of that

Probably start with a mini programming language, then build gui tools on top
of that...

You've used solvespace?

## Tristan

I think it's not a problem with functional vs oop vs anything on the program
level, I think I actually don't like words... I'm going to have to think about
this before complaining about it again...  
Minimal programming in the interface? Yes.  
Minimal programming to build it? No.  
I will look at solvespace.  
Fusion 360 constraints look good.  
See also bret victor.

## Alex

Not minimal programming to build, god no

## Tristan

Sorry, first sentence was ref pile of vars.

I think a good one would be vertex based and create the finished model through
an operation tree, where each operation would be subject to constraints. Is
that too obvious?

Or I guess it would actually be an operation list, or an upside down tree. You
know, like an irl tree, lol.

## Alex

Nah, I've got that. It's more how to reference constrains on related objects
and stuff. Like I want it to be heavily parametric, I want you to give a
"gear" object a bunch of variables, and be able to read a bunch of variables
out from them

So like I hand the gear a "tooth_count" and can reference it's final diameter,
or it's center position

## Tristan

Each of those vars should have a graphical representation on the part you are
working with.

## Alex

Yeah, that's also really true

## Tristan

I guess there will need to be a good system to control what variables are
currently visible.

Movement into and out of objects, and up and down the tree.

## Alex

I was thinking force-directed graphs

## Tristan

What's a force

## Alex

And yeah, moving up and down the tree is part of the challenge

## Tristan

Don't forget into and out of abstraction on the tree!

## Alex

The labels all sort of try to get as close to the object as they can while
trying to stay away from other labels

## Tristan

Add gear is a node, but it's made up of a tree itself.

## Alex

Probably using dead simple physics.

Yeah

It's hard to actually implement, or to imagine what the language looks like in
practice

## Tristan

Eww, no. No force directed graph.

## Alex

Just for the labels

## Tristan

No. No... maybe... I don't think so, let me explain.

Like, if you need to edit them as individual ints or whatever, use a menu.

But this should be avoided most of the time, because the shape of the object
should describe the shape of the object.

Not numbers or whatever.

Likewise, if you want to see all of the operations, it should just be in a
menu list. Otherwise, you are thinking about the direction from the operation
you are currently working on, so you use hotkeys or menu buttons to move up
and down, in and out, and do your work.

What would be the advantage of glooby graphs of things?

(except as an operation that one might apply to their part)

## Alex

Documentation, you can see what the variables are doing, what they're attached
to

## Tristan

I tentatively think that should be done through interaction and highlighting,
not lines connecting nodes. More exploration needed, but for example, you have
this gear is locked so it meshes with that gear, so when you have this gear
selected, it also highlights the circle around the center of that gear
representing the mesh point. If you then select that circle you may be able to
see how it is made up of the mesh diameters of the two gears and set around
that gear.

## Alex

Sensible

## Tristan

And if you are ever just saying "oh, whatever make the gear this big" that
doesn't need to be shown, and if you ever want to see it it's just "0.5486..."
in a window.

"How to think through what needs to be related" and "How to come to understand
parts / operations you didn't write" are interesting to think on, and gooby
graphs might creep in there, but I think well defined expand/collaps-able
lists and well defined hotkey motion in operation space is the salve.

Oh, also really good flexibility for changing the operation directed graph,
it's a dir-graph sorry, I called it a tree wrongly earlier. Anyway it should
obviously attempt to be flexible enough that it's easy to go back in a
finished part and modify add and move operations to fix your mistakes in the
required relations.  
I mean, that's kinda obvious as well, that's kinda the whole point isn't it?
Combine the flexibility of direct modeling with the ease of modification of
parametric?

Ulg, this is a good subject.  
Good goal. Difficult though. Are you actually want to build one of these?

## Alex

I need better CAD, it's not happening on it's own

I imagine I'll build something shitty that does the job that inkscape does,
but with support for geometric constrains

Not unlike solvespace but less shitty

## Tristan

Mmm... each operation function thing should have a 'gRepr' function, saying
how it shows itself in the part/scene. And there needs to be the division of
view and model so its easy to make it look sleek like original autocat
oscilloscope stuff but also make it look normie tier new.

We can just write the shitty sleek view, but it needs to be easy for someone
else to write the shiny view.

imo

I haven't into solvespace much. Can you point at what it does wrong?

## Alex

A few things:  
  
Generally it handles layers poorly, since layers are the only tool you have to
segment your code into different parts that's a big problem  
  
No programmability, you couldn't make say a parametric gear except via
copy+paste I guess  
  
Generally intolerable UX, full modal windows that lock the app if you click
the wrong things when you create a constraint  
  
Waaaay too many constraints visible  
  
No support for variables, no way to make a constraint reference another
constraint except for things like the same length constraints

Basically there's no way to make a gear with a variable number of teeth
parametrically

## Tristan

Layers -> that is a big problem.  
no programm -> damn big problem  
modes are good, but locking interfaces are bad.  
Yeah, movement in operation space is a better way of thinking about it I think
than "look at all these constraints"  
no constraint ref other constraint -> unacceptable.

## Alex

It's not modes, it's a modal window. A popup you need to click to get it to go
away.

## Tristan

Yeah, ok, is it open source? The base may be salvageable, but I'm thinking
you're right it's not, operation-space-abstraction needs to be fundamental
from the start.

A punishment for clicking the wrong window window? Gross.

## Alex

I'm thinking the base probably isn't salvageable, and there are better
geometric constraint solvers available nowdays. It's got a custom one that is
apparently pretty hard to work with, I've talked to the ex-maintainer

If the constraint solving core wasn't purportedly a PITA I'd be into it

But proabbly better to build on something like [ https://www.gecode.org/doc-
latest/MPG.pdf ](https://www.gecode.org/doc-latest/MPG.pdf)

## Tristan

I think constraints might be the wrong way to think of things. Constraints are
like making an environment where you can play with a thing, but still have it
stay in certain bounds... That's interesting, but not how I was thinking about
it.  
I was thinking "I put a circle down! I put it's center on this other circle!"
and so it's not like it's constrained, that's just where you put it. You could
add a new operation where you move it base on something else you built, but
you don't really 'move it around with this constraint' you 'go back and change
where you originally put it'.

## Alex

Also cmake is hard

## Tristan

cmake can s#ck a d*ck

## Alex

Is there a flag for that?

## Tristan

Why is bash ok for managing builds? Answer: it's not. It's something you put
up with so you can work with C and gcc

I think there should be a flag for that.

## Alex

I think constraints are *probably* a decent way of having things be dependent
on other variables? What you're actually building is a big set od math that
depends on other math, one big equation

But doing that in openscad is unpleasant

Variables that depend on other variables

But yeah, you need to by default constrain objects to where you actually put
them

## Tristan

Yeah, I think "default constrain objects where you put them" says it. To move
an object is not to move an object but to change or add an operation done to
it, such as changing the operation of placing it in its original location.
Certain operations like move operations should want to just merge together so
adding a move is just changing a move (or put) unless you have a really good
reason for having different moves... the composition of those operations and
how they work with one another is the thing to care about. Constraints if they
can be called such a thing are just ways of getting vars to feed operations.
"Find me the point where these circles intersect, I place it on the most
clockwise one from this circle."  
  
An aside, cmake should not wander through directories looking for changes but
just go to where my git diff says the changes are, unless I'm misunderstanding
what it's doing wandering through all the dirs. Linking should not take that
long?

## Alex

I really enjoy the tup build system, for things where I know what I'm doing
well enough to actually write my build from scratch

I use it for my personal site

[ https://github.com/traverseda/traverseda.github.io/blob/master/Tupdefault
](https://github.com/traverseda/traverseda.github.io/blob/master/Tupdefault)

## Tristan

tup looks nice.  
@catcat, I think one of the problems we will see is that "most clockwise one"
thing, cause it's easy to see you want to put the thing 'here' it's harder to
see 'why' you want to put it there. First you get a set of space, and you need
to narrow it down to a single point somehow. That's the 'constraint solver'
but it does need to go down to an actual single point, (or set of points if
multiple objs) so there's a lot of ways to go with that. Once you select the
set of points on the edge of two intersecting circles, you really have two
points and have to choose only one of them in a way that will continue to make
sense when you fiddle with other operations. That's one of the reasons it
needs to of course be flexible. You start moving an operation and oh, the gear
popped over to the wrong place, I just set it to 'leftmost' but it needed to
be 'clockwise from gear a' just change that selection over eh?

Maybe that's a good way to think of it, you can't 'add a circle' you can only
select a point and a length and only then can you generate a circle with that
center point and given radius.

## Alex

People describe objects as fully constrained or partially constrained,
depending. Play with solvespace a bit, it's crappy but it deals with these
problems in a way that sort of almost works

At least the problems are problems are probably the right problems

## Tristan

No, I don't like it, partially constrained objects don't make any more sense
than partially placed objects.

## Alex

What they actually are is objects where one of the constraints is variable,
where it can be filled in with whatever to make the equation work

Solve for X, where X is axis that isn't fully constrained

If you could add dependant constraints it would be much better

This line must be at least 10 mm

Under constraint is just implicit dependent constraints

## Tristan

maybe... maybe...

## Tristan

Yes, ok, I agree. When defining a gear there is a relationship between the
tooth size, radius, and num teeth. So would modeling a gear involve specifying
that relationship and then filling it with specific values? That would be
difficult to make a good interface for doing naturally. Interesting, but
difficult.  
I think we want most modules to be built from primitives in the same way as
parts are built, but is that possible? Or would you instead need to write a
gear(selector(possibleGearSet(radius,toothsize)) module and if anyone wants to
make a gear with 11 2mm teeth they need to instead use the gear(radius,#teeth)
module...  
I guess having a natural way to specify constraint relationships is the more
worthy goal. I will brood on it.

## Alex

Yeah, I imagining you define the relationship between the parts all at once,
and the user gets a set of variables and they can edit whatever ones make
sense

![](https://lh3.googleusercontent.com/-bRVcrcPhb1I/YCFpvN_0LwI/AAAAAAAAFW4/A0GUh5QZ-
ZYX5sPFeC_zhcu1Ri6AGtJ6QCK8BGAsYHg/s512/image945.png)

I'm imagining it auto-generates Equations for every possible constraint

Then you fill in the ones that make sense

You name the constrains, and other people can use that as a module, and define
whatever constraints make sense.

Then you put all the parts together

## Tristan

I guess 'selector' above would actually be "max(below(" or some such... It
would be interesting to see and work with those 'selectors', like, 'below'
would look like a line or circle, and you would see it as a line or circle
with it's passing possibilities highlighted and the outer ones faded. Then
'max' you wouldn't see the too big possibilities from below, and would see
highlighted the biggest with the other possibilities faded.  
Interesting here is that the context of what's being selected should inform
how possibilities are visualized.  
'possibleGearSet' would also be a selector selecting from all real numbers
based on radius and toothsize.  
It would be possible to have selectors return empty or multiple and would have
to raise an exception in those cases. That feels ugly but is probably
something that has to be lived with.  
I do like the idea though that when modeling you go through selectors to get
the appropriate args before generating objects, rather than the other way
around.  
  
It's order of constraints. Auto generating functions that take values and
return sets of possibilities... and yeah, auto generating them from
constraints is the right way... but my thinking here is definitely still
fuzzy...

## Alex

I presume there's a way to define a set of constraints and get a pretty
equation from it

That's admittedly a big presumption

## Tristan

Oh! There's infinite variables that one may want to constrain... so you are
both breaking out variables, and constraining them. For the triangle, should
it by default break out volume and allow calculation of angle based on volume?
What about square root of volume? Obviously not, so the act of creating
modules is not just constraining, but breaking out variables that are useful
to constrain, as well as constraining variables already broken out.

## Alex

Yep, that just completed the line of thought I was having

And you can have an online thing with object inheritance, someone defines a
good base thread object, other people constrain it with common thread types

As I imagine good base objects like a generic "thread" is going to have a lot
of variables broken out

Where as an "ISO garden hose thread" will have much fewer variables broken
out, or at least defaults for most of the annoying bits like thread profiles

## Tristan

Online lib gets pointing in a direction that would be complicated but good...
If you grab a module, it should look to you like a part you're working on. You
can zoom inside it's operations and look around. Maybe there's an indication
that you've crossed the bound into external code. But then you can start
modifying it, and if you modify it it will become another module, either more
or less primative. This way you adapting it to your needs may be seen &
possibly used by others. Are many people adapting it in this way? Maybe it
should come up in the search before the more constrained version. Fuzzy
thoughts.  
Yeah... ISO... like, you'd have a tag 'ISO' tag that is only true so long as
this radius is xyz and nothing else in the module has been changed.

## Alex

I'm imagining modules live in a different panel than your main work-piece, not
just a zoom in. Since they're re-usable

You'd need to make an explicit copy to edit it

Source files basically

But with content-addressable hashes

## Tristan

So there are 'parts', 'relations' and 'selectors'. I prefer 'selector' to
'constraint'. Feels more of a general concept. Also more cheery for people who
aren't really into bondage. By applying relations, you can a ascertain values
that will become properties of higher level parts.

## Alex

I want to implement cubic bezier as a generic part, I think it would prove the
flexibility of the system really well., but be quite challenging to actually
do

Any system that you can implement your own cubic bezier in is powerfull enough

## Tristan

I think there should be one primitive part. Vertex. But making a bunch of
generics would be good.

## Alex

I have two primitive parts defined, points and lineSegments

## Tristan

cubic beizer would be more of a selecter you put vertexes on, right?

## Alex

But points don't really count

## Tristan

Points are the only thing that counts.

## Alex

Ehh, it outputs a bunch of line segments, so I'm not sure

I think it would be a part

## Tristan

Shouldn't it output an stl?

Oh, I guess for working in 2d.

## Alex

Yeah

Beziers output line segments in 2D, line segments are straight

## Tristan

You may have it figured out, but I need to be more clear on how 'parts',
'relations', and 'selectors' work. Are those the only object level things that
the UI must allow interaction with?

Is that in fact a good way of thinking of these things?

## Alex

I'm imagining each worksheet has, at the top, a list of named variables.  
  
I've been imagining it as relations are the variables that you broke out,
those are named variables. Variables that aren't broken out are anonymous
variables. Parts can also have names.  
  
So for example if you wanted to reference the tooth count on your main gears
sun-gear you'd do something like `myvar=Maingear.sun.tooth_count`

A part is an object that exposes some number of variables

If you wanted to reference an un-named variable I guess you'd go in and name
it? Tricky for parts that are auto-generated, we need some kind of loop
primitive...

Selectors are just binding a variable to a name, really

We probably need to allow for anonymous selectors as well though

So no, I don't have a super clear view of what's going on, except that parts
are a DAG of smaller parts

And you explicitly name what variables exist

## Tristan

I was thinking variables are relations you broke out... or they don't exist at
all. Can we call them properties. Properties have relations. A certain number
of properties must be specified to actually specify a part, rather than a set
of possible parts. Selectors are how you go from a set of possible parts to a
smaller set of possible parts to a single actual part.

s/./?/

## Alex

Constraint really is the right term, not selector. It's what all the other cad
programs call it, and what the geometric constraint solvers call it

Properties have relations, yeah

## Tristan

Also, relations are unknown, like actually not calculated at all in most
cases, unless they have been 'created' or 'named' or whatever we are calling
it.

I need to think more about 'constraint' vs 'selector'...

## Alex

Yeah, that follows I think

## Tristan

Obviously its just a name, but I had an inclination there is some reason what
we should be thinking of isn't really that thing they are using...

query might be better...

## Alex

Fair, selector like an html selector? Grabbing a node out of the DoM?

I imagine it more like database constraints

And relations like database queries, like `maingear.sun.tooth_count`

## Tristan

Yeah, no, 'query' works much better, 'query' and 'filter'...

'maingear.sun.tooth_count' would be a property, right, it would be fit into
the relation between the radiuses and number of other gears and stuff

## Alex

It's a property, but it's a property on a different part, yeah

## Tristan

Maybe I want to grab every gear tooth, filter to every second one, then find
it's middle and add an insignia there. That feels much more like a selection,
filter, property thing thing, not a constraint. Yeah, I 'constrain' the
insignias to what I get from that selection, but it's not like I'm
constraining theme there, I'm just creating them there. Constraining never
happened, except for the filter 'constraining to odd number tooth id's' or if
you want to say that it is a 'constraint' to a set of real points, but that's
baloney.

## Alex

Hmm, I suppose when you start getting into any kind of loop/map then selector
makes a lot more sense, yeah

I'm not sure a selector is the same as the constraint though, I imagine you
query (select?) based on something, and then you do your constraint as a
seperate step

## Tristan

And I feel like with most modeling that's the default, and constraint is the
exception, making it a more specific case of a query/filter thing.

yeah, a lot of stuff starts out with querying all real numbers, or doing a get
on a specific point, I imagine...

## Alex

for i in select("gears"):  
constrain(emblem.center=i.center)

Only you know, in a way that isn't turning complete

## Tristan

And ideally more like 'mouse hover over relevent already broken out property,
select, filter hotkey -> pop open menu for complex filter -> id %2==0, make
hotkey -> insignia'

## Alex

Yeah, that looks like a reasonable workflow

Frustrating for a certain kind of part, but it should be mathematically
solvable you know?

Like we should be able to make stuff like that part of the giant equation

And have gecode solve it

Also gecode was easy to add to cmake so I like it

## Tristan

It looks cool. I don't know enough about it yet.

## Alex

Seems like it's the best constraint solver for cpp

Constraint solvers are just computer algebra systems I think

[ https://www.minizinc.org/ ](https://www.minizinc.org/)  
  
Lots and lots of stuff

[ https://pypi.org/project/python-constraint/
](https://pypi.org/project/python-constraint/) looks good for playing around
with, of course it doesn't do any geometry you need to add the geometry
yourself

