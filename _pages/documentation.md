---
layout: page
permalink: /documentation/
pdf_file: "/assets/pdf/EWSNET_DOCUMENTATION.pdf"
title: documentation
description: Documentation and User Guide For EWSNet
nav: true
---

{% if page._styles %}
<style type="text/css">
  {{ page._styles }}
</style>
{% endif %}

<div class="post">
  Use the links below to access the official code and documentation for EWSNet.
  <div class="row" style="padding:5%">
    <div class="col-3"></div> 
    <div class="col-6">
      <div class="list-group list-group-horizontal">
        <a href="https://github.com/sahilsid/ewsnet"> <button class="btn btn-primary  z-depth-1" style="text-align:center">
          Github Code Repository
        </button></a>
        <a href="https://ewsnet.readthedocs.io/"><button class="btn btn-primary  z-depth-1" style="text-align:center"> Official Code Documentation </button></a>
      </div>    
    </div>
  </div>
  
  <p>
      We also include below pdf versions of a technical Users Guide for both the methodology and the code.
  </p>
  <div class="row">
    <div class="col-6">
      
      <h6><b>Methodology</b></h6>
      <article class="post-content" style="margin:2%">
        {{ content }}
        {% pdf "/assets/pdf/EWSNET_DOCUMENTATION.pdf" %}
      </article>
    </div>
    <div class="col-6">
      <h6> <b> Code </b> </h6>
      <article class="post-content" style="margin:2%">
        {{ content }}
        {% pdf "/assets/pdf/code_documentation.pdf" %}
      </article>
    </div>
  </div>
  {% if site.disqus_shortname and page.comments %}
    <div id="disqus_thread"></div>
    <script type="text/javascript">
      var disqus_shortname  = '{{ site.disqus_shortname }}';
      var disqus_identifier = '{{ page.id }}';
      var disqus_title      = {{ page.title | jsonify }};
      (function() {
        var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
        dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';
        (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
      })();
    </script>
    <noscript>Please enable JavaScript to view the <a href="http://disqus.com/?ref_noscript">comments powered by Disqus.</a></noscript>
  {% endif %}

</div>
<!-- 
<div class="documentation">

{% for y in page.years %}
  <h2 class="year">{{y}}</h2>
  {% bibliography -f papers -q @*[year={{y}}]* %}
{% endfor %}

</div> -->

