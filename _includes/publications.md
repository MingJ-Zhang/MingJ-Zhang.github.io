<ol class="pub-list">
{% for link in site.data.publications.main %}
<li class="pub-entry">
  <div class="pub-card">
    {% if link.teaser %}<div class="pub-img"><img src="{{ link.teaser }}" alt="teaser" class="pub-teaser" loading="lazy"></div>{% endif %}
    <div class="pub-body">
      <div class="pub-title">
        <i class="fas fa-file-lines"></i>
        <a href="{{ link.pdf }}" target="_blank" rel="noopener">{{ link.title }}</a>{% if link.conference_short %}
        <span class="pub-venue-inline">{{ link.conference_short }}</span>{% endif %}
      </div>
      <div class="pub-authors"><i class="fas fa-users"></i> {{ link.authors }}</div>
      <div class="pub-conf"><i class="fas fa-bookmark"></i> {{ link.conference }}</div>
      <div class="pub-links">
        {% if link.pdf %}<a href="{{ link.pdf }}" class="pub-btn pdf" target="_blank" rel="noopener"><i class="fas fa-file-pdf"></i> PDF</a>{% endif %}
        {% if link.code %}<a href="{{ link.code }}" class="pub-btn code" target="_blank" rel="noopener"><i class="fas fa-code"></i> Code</a>{% endif %}
        {% if link.page %}<a href="{{ link.page }}" class="pub-btn web" target="_blank" rel="noopener"><i class="fas fa-globe"></i> Project</a>{% endif %}
        {% if link.bibtex %}<a href="{{ link.bibtex }}" class="pub-btn bib" target="_blank" rel="noopener"><i class="fas fa-quote-right"></i> BibTeX</a>{% endif %}
        {% if link.notes %}<span class="pub-note"><i class="fas fa-star"></i> {{ link.notes }}</span>{% endif %}
      </div>
    </div>
  </div>
</li>
{% endfor %}
</ol>
