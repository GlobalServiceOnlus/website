(() => {
  const archive = document.querySelector('[data-bilanci-archive]');
  const filters = document.querySelector('[data-bilanci-filters]');
  if (!archive) return;

  let records = [];
  let activeFilter = 'tutti';

  const escapeHtml = (value) => String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');

  const render = () => {
    const groups = records
      .map((group) => ({
        ...group,
        documenti: group.documenti.filter((doc) => activeFilter === 'tutti' || doc.tipo === activeFilter)
      }))
      .filter((group) => group.documenti.length > 0);

    archive.innerHTML = groups.map((group) => `
      <section class="archive-year" aria-labelledby="anno-${group.anno}">
        <div class="archive-year__head">
          <span class="eyebrow">Esercizio</span>
          <h2 id="anno-${group.anno}">${group.anno}</h2>
        </div>
        <div class="document-list">
          ${group.documenti.map((doc) => `
            <article class="document-card">
              <div class="document-card__icon" aria-hidden="true">PDF</div>
              <div class="document-card__body">
                <span class="document-type">${doc.tipo === 'sociale' ? 'Bilancio sociale' : 'Bilancio d\'esercizio'}</span>
                <h3>${escapeHtml(doc.titolo)}</h3>
                <p>${escapeHtml(doc.descrizione)}</p>
              </div>
              <div class="document-card__actions">
                ${doc.disponibile ? `
                  <a class="button button--small" href="${encodeURI(doc.file)}" target="_blank" rel="noopener">Visualizza</a>
                  <a class="text-link" href="${encodeURI(doc.file)}" download>Scarica PDF</a>
                ` : `
                  <span class="status-pill">PDF da caricare</span>
                `}
              </div>
            </article>
          `).join('')}
        </div>
      </section>
    `).join('');
  };

  fetch('/data/bilanci.json', { cache: 'no-store' })
    .then((response) => {
      if (!response.ok) throw new Error('Archivio non disponibile');
      return response.json();
    })
    .then((data) => {
      records = Array.isArray(data) ? data : [];
      render();
    })
    .catch(() => {
      archive.innerHTML = '<p class="notice">L\'archivio dei documenti non è momentaneamente disponibile.</p>';
    });

  if (filters) {
    filters.addEventListener('click', (event) => {
      const button = event.target.closest('button[data-filter]');
      if (!button) return;
      activeFilter = button.dataset.filter;
      filters.querySelectorAll('button').forEach((item) => item.classList.remove('is-active'));
      button.classList.add('is-active');
      render();
    });
  }
})();
