# Air Pruning Self Watering Planter

This planter is designed along similar principles as the "Air-pot" product,
although it uses a different mechanism. The standard version has an outer
diameter of 108mm, intended to fit inside cut-down 2l coke bottles. With the
addition of some cotton ribbon hanging to a resevoir it can keep your soil
moist, something I found quite challenging with normal Air-pots as they'd dry
the soil out quickly.

It's written in openscad so you can customize the sizes for your exact
situation.

{{ utils.stl("planter.stl") }}

<div class="gallery">
{% for f in (files/"gallery").iterdir() if f.is_file() %}
<a href="/{{(f.resolve().relative_to(STATIC_ROOT.resolve()))}}">
<img
src="/{{(f.resolve().relative_to(STATIC_ROOT.resolve())).parent}}/.thumbs/square/{{f.name}}">
</a>
{% endfor %}
</div>

---

{{utils.index(files)}}
