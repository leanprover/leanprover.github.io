---
layout: archive
image:
  feature: lean_logo_banner.svg
permalink: /
title: "Introduction"
---

<div class="tiles">
{% for post in site.posts %}
        {% include post-grid.html %}
{% endfor %}
</div><!-- /.tiles -->


The Lean project aims to bring the automated and interactive theorem
proving worlds together. One of the main goals is to provide a
powerful system for reasoning about complex systems and mathematics,
and verifying claims about both.