 <script src="https://unpkg.com/htmx.org@1.1.0"></script>
{% for f in files.glob("*.html") if f.name not in ("index.md.html", "index.html")%}
<a href={{f.name}}">{{f.name}}</a>
<div
    hx-get="{{f.name}}"
    hx-trigger="revealed"
    hx-select=".bodyContent"
    hx-swap="outerHTML"
></div>
<hr><br>
{% endfor %}
