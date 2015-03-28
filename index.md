---
layout: archive
image:
  feature: lean_logo2.svg
permalink: /
---

<div class="tiles">
{% for post in site.posts %}
        {% include post-grid.html %}
{% endfor %}
</div><!-- /.tiles -->

<center>
<a href="http://research.microsoft.com">
<image src="images/segoe_msr_logo.png"/>
</a>
</center>