# Soots Stock

Design services and locally (Nova Scotia) produced products. Wholesale pricing
available, design work is $100/hour. Programming/consulting work is $180/hour.

You can download the wholesale pricing sheet [here](Wholesale prices.pdf),
although you need a password to open it. There's also an etsy page
[here](https://www.etsy.com/ca/shop/SootsStock).

{% set email = '&#x74;&#x72;&#x61;&#x76;&#x65;&#x72;&#x73;&#x65;&period;&#x64;&#x61;&plus;&#x62;&#x6c;&#x6f;&#x67;&#x73;&#x70;&#x61;&#x6d;&commat;&#x67;&#x6d;&#x61;&#x69;&#x6c;&period;&#x63;&#x6f;&#x6d;' %}

You can contact me by email at {{email}}, do remove the +blogspam text though.

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
