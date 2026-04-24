/* ============================================================
   EPEP — DONNÉES & LOGIQUE
   ============================================================ */

window.NL_HIGHLIGHT = {
  title : 'Newsletter N°9 – 3 avril 2026',
  desc  : 'Résultat sondage cadre 2026-2027 · Sondage plateforme numérique · Projet Côté fenêtre · Café des Profs · Tournoi de foot',
  url   : 'https://newsletterepep.my.canva.site/'
};

window.NL_ITEMS = [
  // J'ai gardé vos données exactes ici
  { id:'i_sondage_cadre_9', cat:'institutional', num:'9', date:'3 avr. 2026',
    title:'Résultats du sondage cadre 2026-2027',
    body:`<span class="nl-newsletter-badge">Newsletter N°9 – 3 avril 2026</span>
<h3>Résultats du sondage cadre 2026-2027</h3>
<p>Sur 56 réponses recueillies :</p>
<ul>
  <li><strong>27 personnes (48%)</strong> – Scénario 3 : grille 32/34/36</li>
  <li><strong>26 personnes (46%)</strong> – Scénario 1 : maintien du cadre actuel à 36 périodes</li>
  <li><strong>2 personnes (4%)</strong> – Scénario 2 : grille 36/36/36 projet</li>
  <li><strong>1 personne (2%)</strong> – Autre proposition</li>
</ul>`},
  // ... (Toutes vos autres entrées NL_ITEMS vont ici)
  // [Pour l'exemple, j'en mets une par catégorie, mais mettez toute votre liste]
  { id:'p_cote_fenetre_9', cat:'projects', num:'9', date:'3 avr. 2026', title:'Projet "Côté fenêtre" – Classe P3E', body:`...` },
  { id:'e_jp', cat:'pedagogie', num:'7', date:'20 mars 2026', title:'Journées pédagogiques', body:`...` }
];

/* ── LOGIQUE DE L'APPLICATION ── */
(function(){
  const $ = id => document.getElementById(id);
  const RMAP = { institutional: 'ℹ️ Infos institutionnelles', projects: '🛠️ Projets en cours', pedagogie: '📚 Pratiques pédagogiques' };
  const CMAP = { institutional: 'var(--nl-teal)', projects: 'var(--nl-violet)', pedagogie: 'var(--nl-or)' };

  function render(items){
    const groups = { institutional:[], projects:[], pedagogie:[] };
    items.forEach(item => groups[item.cat].push(item));

    ['institutional','projects','pedagogie'].forEach(cat => {
      const col = $('nl-col-' + cat);
      const countEl = document.querySelector('.nl-count--' + cat);
      let html = '';
      let lastNum = null;
      groups[cat].forEach(item => {
        if (lastNum && item.num !== lastNum) html += '<hr class="nl-divider">';
        const searchData = (item.title + ' ' + (item.body||'').replace(/<[^>]*>/g,' ')).toLowerCase();
        html += `<article class="nl-entry" data-id="${item.id}" data-search="${searchData.replace(/"/g,'&quot;')}">
          <div class="nl-entry-top"><div class="nl-entry-title">${item.title}</div><div class="nl-entry-arrow">→</div></div>
          <div class="nl-entry-meta"><span class="nl-num">N°${item.num}</span><span>${item.date}</span></div>
        </article>`;
        lastNum = item.num;
      });
      if(col) col.innerHTML = html || '<p style="padding:12px;font-size:13px;color:#9ab0b3">Aucune entrée.</p>';
      if (countEl) countEl.textContent = groups[cat].length;
    });

    document.querySelectorAll('.nl-entry').forEach(el => {
      el.addEventListener('click', () => {
        const item = window.NL_ITEMS.find(i => i.id === el.dataset.id);
        if (item) openPopup(item);
      });
    });
  }

  $('nl-search-input').addEventListener('input', function(){
    const q = this.value.toLowerCase().trim();
    let total = 0;
    document.querySelectorAll('.nl-entry').forEach(e => {
      const match = !q || e.dataset.search.includes(q);
      e.style.display = match ? '' : 'none';
      if (match) total++;
    });
    $('nl-no-results').style.display = total === 0 ? 'block' : 'none';
  });

  function openPopup(item){
    $('nl-popup-rubrique').textContent = RMAP[item.cat];
    $('nl-popup-rubrique').style.color = CMAP[item.cat];
    $('nl-popup-title').textContent = item.title;
    $('nl-popup-body').innerHTML = item.body || '';
    $('nl-popup-overlay').classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closePopup(){
    $('nl-popup-overlay').classList.remove('open');
    document.body.style.overflow = '';
  }

  $('nl-popup-close').addEventListener('click', closePopup);
  $('nl-popup-overlay').addEventListener('click', e => { if (e.target.id === 'nl-popup-overlay') closePopup(); });

  // Initialisation
  if (window.NL_ITEMS) {
    render(window.NL_ITEMS);
    if(window.NL_HIGHLIGHT) {
      $('nl-hl-title').textContent = window.NL_HIGHLIGHT.title;
      $('nl-hl-desc').textContent = window.NL_HIGHLIGHT.desc;
      $('nl-hl-btn').href = window.NL_HIGHLIGHT.url;
      $('nl-highlight').style.display = 'flex';
    }
  }
})();