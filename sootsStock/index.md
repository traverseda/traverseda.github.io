# Soots Stock

Design services and locally (Nova Scotia) produced products. Wholesale pricing
available, design work $100/hour.

You can download the wholesale pricing sheet [here](Wholesale prices.pdf),
although you need a password to open it.

{{toc}}

## Gallery

<div class="gallery">
{% for f in (files/"gallery").iterdir() if f.is_file() %}
<a href="/{{(f.resolve().relative_to(STATIC_ROOT.resolve()))}}">
<img
src="/{{(f.resolve().relative_to(STATIC_ROOT.resolve())).parent}}/.thumbs/square/{{f.name}}">
</a>
{% endfor %}
</div>
