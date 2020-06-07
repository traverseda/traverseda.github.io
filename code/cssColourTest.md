# Test css system colors

Css lets you access system colors, this can be used for fingerprinting. In a
perfect world is could have been used for making websites that better fit in
eith the users aesthetic preferences, but it's clear we're well past that and no
one cares about theming any more.

You can find the full list
[here](https://www.w3.org/wiki/CSS/Properties/color/keywords#System_Colors),
although as of 2020 I've got a copy of all the system colors reproduced bellow.
The "background" one is particularily interesting, because it seem to be trying
to get some kind of average of all the colours in a persons desktop background,
and there are ~16 million colours, this provides a whole lot of extra
information for services like [am I unique](https://amiunique.org/fp).

<ul>
{% for color in ("ActiveBorder","ActiveCaption","AppWorkspace","Background","ButtonFace",
"ButtonHighlight","ButtonShadow","ButtonText","CaptionText",
"GrayText","Highlight","HighlightText","InactiveBorder",
"InactiveCaption","InactiveCaptionText","InfoBackground",
"InfoText","Menu","MenuText","Scrollbar","ThreeDDarkShadow",
"ThreeDFace","ThreeDHighlight","ThreeDLightShadow","ThreeDShadow",
"Window","WindowFrame","WindowText") -%}
 <li><span style="background:{{color}};" id="{{color}}">___</span> {{color}}</li>
{% endfor -%}
</ul>
