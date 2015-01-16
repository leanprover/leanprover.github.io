---
layout: archive
image:
  feature: lean_logo.svg
permalink: /
---

<div class="tiles">
{% for post in site.posts %}
        {% include post-grid.html %}
{% endfor %}
</div><!-- /.tiles -->
