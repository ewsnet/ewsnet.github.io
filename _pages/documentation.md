---
layout: page
permalink: /publications/
title: documentation
description: A list of my publications grouped by year, in reversed chronological order.
years: [2021, 2020]
nav: true
---

<div class="publications">

{% for y in page.years %}
  <h2 class="year">{{y}}</h2>
  {% bibliography -f papers -q @*[year={{y}}]* %}
{% endfor %}

</div>
