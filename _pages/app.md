---
layout: model
permalink: /model/
title: app
description: Deep learning method to forecast and characterize transitions in complex natural systems.
nav: true

authors:
  - name: Smita Deb, Sahil Sidheekh
    affiliations:
      name: IIT Ropar

bibliography: ewsnet.bib
img: /assets/img/teaser/ewsnet.png
main_image: teaser/lstmfcn.png

placeholders: true
---


<!-- ---
layout: page
title: demo
permalink: /projects/
description: A growing collection of some cool projects I've dirtied my hands with :computer:.
nav: true
---

<div class="projects grid">

  {% assign sorted_projects = site.projects | sort: "importance" %}
  {% for project in sorted_projects %}
  <div class="grid-item">
    {% if project.redirect %}
    <a href="{{ project.redirect }}" target="_blank">
    {% else %}
    <a href="{{ project.url | relative_url }}">
    {% endif %}
      <div class="card hoverable">
        {% if project.img %}
        <img class="img-fluid rounded z-depth-1" src="{{ project.img | relative_url }}" alt="project thumbnail">
        {% endif %}
        <div class="card-body">
          <h2 class="card-title text-lowercase">{{ project.title }}</h2>
          <p class="card-text">{{ project.description }}</p>
          <div class="row ml-1 mr-1 p-0">
            {% if project.github %}
            <div class="github-icon">
              <div class="icon" data-toggle="tooltip" title="Code Repository">
                <a href="{{ project.github }}" target="_blank"><i class="fab fa-github gh-icon"></i></a>
              </div>
              {% if project.github_stars %}
              <span class="stars" data-toggle="tooltip" title="GitHub Stars">
                <i class="fas fa-star"></i>
                <span id="{{ project.github_stars }}-stars"></span>
              </span>
              {% endif %}
            </div>
            {% endif %}
          </div>
        </div>
      </div>
    </a>
  </div>
{% endfor %}

</div> -->
