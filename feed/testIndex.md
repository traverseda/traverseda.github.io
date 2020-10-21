{% for item in files.glob("*.md") %}
{% if item.name != "index.md" %}
{{item}}
{#{% include item.as_posix() %}#}
{% endif %}
{% endfor %}
