## Notes on a web framework

I've been using django with a system I call "query perms", to quickly build
powerful admin interfaces. On the whole this is going pretty well, but the more
I use django (and I've been using django for about 10 years) the more I start to
get frustrated with it's limitations. For all the stuff it got right there are
definitly some mistakes, and there are a lot of things that while they aren't
really bad I would do differently.

I didn't intend to make this a critique of django, more as a "how I'd make a new
web framework if I had the resources", but it's probably easiest if I just
explain what I'd do different than django and flask.

### QueryPerms

I haven't published QueryPerms anywhere yet, as I've been too busy. If you're
interested in sponsoring that work, or finding out how it works in more detail,
drop me a line. I don't think my current solutions would really work for anyone
else.

A code sample is worth 1000 words...

```python3
"""Simple queryperm example, not to be taken seriously
"""
from threadlocals.threadlocals import get_current_request

class Store(models.Model):
    owner = models.ForeignKey(User)
    #[...] other model fields

    #Adds a "permissions" filter to all querysets
    objects = QpermQueryset.as_manager()

    @classmethod
    def qperms_edit(self):
        #In reality this user filtering is handled by qperms_register
        user = get_current_request().user
        if user.is_superuser:
            return Q() #superusers can do anything
        return Q(owner=user)

qperms_register(Store)

class Product(models.Model)
    shop = models.ForeignKey(Shop,limit_choices_to=Store.objects.permissions("edit"))
    #[...]

    objects = QpermQueryset.as_manager()

    @classmethod
    def qperms_edit(self):
	#Define permission based on relationship to store
        user = get_current_request().user
        return Q(store__owner=user)

qperms_register(Product)

class ProductMedia(models.Model):
    """Pictures/video of product
    """
    product = models.ForeignKey(Product,limit_choices_to=Product.objects.permissions("edit"))

    objects = QpermQueryset.as_manager()

    @classmethod
    def qperms_edit(self):
        user = get_current_request().user
        return Q(product__store__owner=user)
```

This lets us chain togther more complicated permissions based on object
relationships. I think this is a really powerful way to handle it, although I'm
still working on getting the developer ergonomics working nicer. It also relies
on [django-threadlocal](https://github.com/benrobster/django-threadlocals),
which makes requests work more like how they do under flask.

These queryperms make it a *lot* easier to make complicated auth flows than
something like django-gaurdian. One thing I think is important for any
permission system is that there's a *single source of truth* about who's allowed
to access a row. That single source of truth is also relativly easy to reason
about. It also lets us easily filter based on what the user currently has
available to themselves.

If I was desinging a web framework these days I'd build a system like queryperms
in from the very begining. I'd probably make it so that queryperms were applied
automatically and if you wanted unfiltered database access you'd need to
explicitly bypass the queryperms.

Of course the performance implications are left as an excerize to the reader,
but realistically you'd be doing similar queries anyway. You can also use this
to do fun stuff like query for all the objects that a user can access.

### HTMX

I really like [htmx](https://htmx.org/). I'd use it for the admin interface. I
think an auto-generated admin interface is important and that the concept could
probably be extended even furthur to auto-generate more complex views.

## Complaining about django

### Django actually does repeat itself a lot

I think this is, in part, due to the "loose coupling and tight cohesion"
principle it tries to abide by. I consider this a bit of a failure, django has
probably the best ORM and I'd love to use it in non-django apps but it's too
tightly coupled in the framework...

One of my biggest annoyences with django is the "urls.py" file. I see it as
essentially naming the same function twice. I'm a big fan of fastApi style url
definition/registration. I'd much rather have something like flask's app
registration, and adding type-hints on to that is very pleasent.

### Django has no way to auto configure apps

Django has a weird directory layout, especially for simpler sites. For a variety
of reasons (complicated multi-app migrations break easily) you probably want to 
only have one main "app", django makes this pretty difficult though. Normally I
end up naming my site "Settings" and then having one main app named after what
the site actually is. Sometimes if two parts of the sight really aren't coupled
I'll have two apps, for example "market" and "forum", but most sites only really
make sense as a single django app.

Except of course when you start plugging in apps that other people have written,
which is where the apps system really starts to shine. The problem with
this however is that when apps start to depend on other apps things can start to
get weird and finicky.

In a perfect world you'd be able to use a wordpress-like "app/plugin store" for
your django app. Unfortunatly Apps can't depend on other apps, so you need to explicitly
add an app and all of it's dependencies to the configuration. You also need to 
get the order right, and add in any middleware or template context processors or
anything else the app depends on. 

I'd start under the presumption that any app installed in your virtualenv is one
that you're actually using, and auto-import them, and resolve their dependencies
in the correct order.

I'd also handle most config through enviroment variables/files. I think you'd
end up with a less flexible config that would require more work to do
complicated stuff (like dealing with multiple databases) but in the end I think
you'd be able to encourage a much healthier ecosystem, a CMS that could compete
with wordpress if nothing else.


