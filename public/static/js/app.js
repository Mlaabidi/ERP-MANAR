/* Al-Manar ERP — client interactions
   Progressive enhancement only: every screen works without this file. */
(() => {
  'use strict';

  /* ---------------------------------------------------------- toast ---- */
  const wrap = document.getElementById('toast-wrap');
  function toast(msg) {
    if (!wrap) return;
    const el = document.createElement('div');
    el.className = 'toast';
    el.innerHTML =
      '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12 5 5L20 7"/></svg>';
    const span = document.createElement('span');
    span.textContent = msg;
    el.appendChild(span);
    wrap.appendChild(el);
    setTimeout(() => {
      el.style.transition = 'opacity .25s, transform .25s';
      el.style.opacity = '0';
      el.style.transform = 'translateY(6px)';
      setTimeout(() => el.remove(), 260);
    }, 2600);
  }

  document.addEventListener('click', (e) => {
    const t = e.target.closest('[data-toast]');
    if (t) toast(t.getAttribute('data-toast'));
  });

  /* ----------------------------------------------------- mobile nav ---- */
  const sidebar = document.getElementById('sidebar');
  const scrim = document.getElementById('scrim');
  const navToggle = document.getElementById('nav-toggle');

  function closeNav() {
    if (sidebar) sidebar.classList.remove('open');
    if (scrim) scrim.classList.remove('show');
  }
  if (navToggle) {
    navToggle.addEventListener('click', () => {
      sidebar.classList.toggle('open');
      scrim.classList.toggle('show');
    });
  }
  if (scrim) scrim.addEventListener('click', closeNav);

  /* ----------------------------------------------- module switcher ----- */
  const switchBtn = document.getElementById('module-switch');
  const switcher = document.getElementById('module-switcher');
  if (switchBtn && switcher) {
    switchBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const open = switcher.hidden;
      switcher.hidden = !open;
      switchBtn.setAttribute('aria-expanded', String(open));
    });
    document.addEventListener('click', (e) => {
      if (!switcher.hidden && !switcher.contains(e.target) && !switchBtn.contains(e.target)) {
        switcher.hidden = true;
        switchBtn.setAttribute('aria-expanded', 'false');
      }
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !switcher.hidden) {
        switcher.hidden = true;
        switchBtn.setAttribute('aria-expanded', 'false');
        switchBtn.focus();
      }
    });
  }

  /* ------------------------------------------------- submenu toggles --- */
  document.querySelectorAll('[data-submenu]').forEach((link) => {
    const sub = document.getElementById('sub-' + link.getAttribute('data-submenu'));
    if (!sub) return;
    const chev = link.querySelector('.chev');
    // Auto-open the submenu when one of its children matches the hash.
    const hash = decodeURIComponent(location.hash.replace('#', ''));
    const hasActive = hash && Array.from(sub.querySelectorAll('a')).some((a) => a.textContent === hash);
    if (hasActive) {
      sub.hidden = false;
      link.setAttribute('aria-expanded', 'true');
      if (chev) chev.classList.add('open');
    }
    link.addEventListener('click', (e) => {
      // First click opens the group; a second click navigates.
      if (sub.hidden) {
        e.preventDefault();
        sub.hidden = false;
        link.setAttribute('aria-expanded', 'true');
        if (chev) chev.classList.add('open');
      } else {
        sub.hidden = true;
        link.setAttribute('aria-expanded', 'false');
        if (chev) chev.classList.remove('open');
        e.preventDefault();
        location.href = link.getAttribute('href');
      }
    });
  });

  /* ---------------------------------------------------- segmented ------ */
  document.querySelectorAll('[data-seg]').forEach((seg) => {
    seg.addEventListener('click', (e) => {
      const btn = e.target.closest('button');
      if (!btn || !seg.contains(btn)) return;
      seg.querySelectorAll('button').forEach((b) => b.classList.remove('on'));
      btn.classList.add('on');
      const name = seg.getAttribute('data-name');
      // Segmented control acts as a filter when it drives a table.
      if (name === 'serviceStatus') filterByStatus(btn.textContent.trim());
    });
  });

  /* -------------------------------------------- table filtering -------- */
  function filterByStatus(status) {
    const table = document.querySelector('table[data-filterable]');
    if (!table) return;
    table.querySelectorAll('tbody tr[data-row]').forEach((tr) => {
      const v = tr.getAttribute('data-status') || '';
      const show = status === 'الكل' || v === status;
      tr.style.display = show ? '' : 'none';
    });
  }

  function applyFilters() {
    const table = document.querySelector('table[data-filterable]');
    if (!table) return;
    const q = (document.querySelector('[data-filter-table]')?.value || '').trim().toLowerCase();
    const pkg = document.querySelector('[data-filter-package]')?.value || '';
    const status = document.querySelector('[data-filter-status]')?.value || '';

    let shown = 0;
    table.querySelectorAll('tbody tr[data-row]').forEach((tr) => {
      const text = tr.textContent.toLowerCase();
      let ok = !q || text.includes(q);
      if (ok && pkg) ok = tr.getAttribute('data-package') === pkg;
      if (ok && status) ok = tr.getAttribute('data-status') === status;
      tr.style.display = ok ? '' : 'none';
      if (ok) shown++;
    });

    // Empty state when everything is filtered out.
    let emptyRow = table.querySelector('[data-empty-row]');
    if (!shown) {
      if (!emptyRow) {
        emptyRow = document.createElement('tr');
        emptyRow.setAttribute('data-empty-row', '');
        emptyRow.innerHTML =
          '<td colspan="9"><div class="empty-state">' +
          '<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M4 13h4l2 3h4l2-3h4"/><path d="M4 13 6 5h12l2 8v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z"/></svg>' +
          'لا توجد نتائج مطابقة للتصفية الحالية</div></td>';
        table.querySelector('tbody').appendChild(emptyRow);
      }
      emptyRow.style.display = '';
    } else if (emptyRow) {
      emptyRow.style.display = 'none';
    }
  }

  document.querySelectorAll('[data-filter-table]').forEach((inp) => {
    inp.addEventListener('input', applyFilters);
  });
  document.querySelectorAll('[data-filter-package],[data-filter-status]').forEach((sel) => {
    sel.addEventListener('change', applyFilters);
  });

  /* global top-bar search → filters the current table if there is one */
  const globalSearch = document.querySelector('[data-global-search]');
  if (globalSearch) {
    globalSearch.addEventListener('input', () => {
      const local = document.querySelector('[data-filter-table]');
      if (local) {
        local.value = globalSearch.value;
        applyFilters();
      }
    });
  }

  /* ------------------------------------------- checkbox selection ------ */
  function syncSelection() {
    const boxes = Array.from(document.querySelectorAll('[data-row-check]'));
    const checked = boxes.filter((b) => b.checked).length;
    const all = document.querySelector('[data-check-all]');
    if (all) {
      all.checked = boxes.length > 0 && checked === boxes.length;
      all.indeterminate = checked > 0 && checked < boxes.length;
    }
    const counter = document.querySelector('[data-selected-count]');
    if (counter) counter.textContent = String(checked);
    const printCount = document.querySelector('[data-print-count]');
    if (printCount) printCount.textContent = String(checked);
  }

  document.addEventListener('change', (e) => {
    if (e.target.matches('[data-check-all]')) {
      document.querySelectorAll('[data-row-check]').forEach((b) => {
        if (b.closest('tr').style.display !== 'none') b.checked = e.target.checked;
      });
      syncSelection();
    } else if (e.target.matches('[data-row-check]')) {
      syncSelection();
    }
  });
  syncSelection();

  /* -------------------------------------------------- haircut counter -- */
  const counter = document.querySelector('[data-counter]');
  if (counter) {
    const valueEl = counter.querySelector('[data-counter-value]');
    const stepInput = counter.querySelector('[data-counter-step-input]');
    const total = Number(valueEl.getAttribute('data-total') || 1520);
    let value = Number(valueEl.textContent.replace(/[^\d]/g, '')) || 0;

    const fmt = (n) => n.toLocaleString('en-US');

    function paint() {
      valueEl.textContent = fmt(value);
      const remaining = Math.max(0, total - value);
      const kpi = document.querySelector('.kpi .v');
      // "المتبقي" is the first KPI in the side stack.
      const remEl = document.querySelectorAll('.kpi .v')[0];
      if (remEl) remEl.textContent = fmt(remaining);
      const pct = document.querySelector('[data-counter-progress]');
      if (pct) pct.style.width = Math.min(100, (value / total) * 100) + '%';
    }

    counter.querySelectorAll('[data-counter-step]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const sign = Number(btn.getAttribute('data-counter-step')) > 0 ? 1 : -1;
        const step = Math.max(1, Number(stepInput.value) || 1);
        value = Math.max(0, value + sign * step);
        paint();
        toast(sign > 0 ? `تمت إضافة ${step} حاجاً` : `تم خصم ${step} حاجاً`);
      });
    });

    stepInput?.addEventListener('change', () => {
      stepInput.value = String(Math.max(1, Number(stepInput.value) || 1));
    });
  }

  /* ---------------------------------------------- message composer ----- */
  const msgText = document.querySelector('[data-msg-text]');
  if (msgText) {
    const preview = document.querySelector('[data-msg-preview]');
    const meta = document.querySelector('[data-msg-meta]');
    const SAMPLES = { '{الاسم}': 'محمد', '{المخيم}': '12', '{الحافلة}': '07', '{رقم الحجز}': 'H48-1387' };

    function renderMessage() {
      const raw = msgText.value;
      if (meta) {
        const parts = Math.max(1, Math.ceil(raw.length / 70));
        meta.textContent = `${raw.length} حرف · ${parts} رسالة`;
      }
      if (preview) {
        let out = raw;
        Object.keys(SAMPLES).forEach((k) => {
          out = out.split(k).join(SAMPLES[k]);
        });
        preview.textContent = out || '—';
      }
    }

    msgText.addEventListener('input', renderMessage);
    document.querySelectorAll('[data-insert-var]').forEach((chip) => {
      chip.addEventListener('click', () => {
        const token = chip.getAttribute('data-insert-var');
        const start = msgText.selectionStart ?? msgText.value.length;
        const end = msgText.selectionEnd ?? msgText.value.length;
        msgText.value = msgText.value.slice(0, start) + token + msgText.value.slice(end);
        msgText.focus();
        msgText.selectionStart = msgText.selectionEnd = start + token.length;
        renderMessage();
      });
    });

    const templates = {
      move:
        'عزيزي الحاج {الاسم}، نذكّركم بموعد التحرك إلى عرفات الساعة 6:00 صباحاً من بوابة المخيم {المخيم}. تقبّل الله منا ومنكم.',
      welcome:
        'مرحباً {الاسم}، سعداء بوجودكم مع المنار. رقم حجزكم {رقم الحجز} وحافلتكم {الحافلة}. نتمنى لكم رحلة مباركة.',
      eid:
        'عيدكم مبارك {الاسم}. كل عام وأنتم بخير، وتقبّل الله حجكم. مع تحيات المنار للحج والعمرة.',
    };
    document.querySelector('[data-template-select]')?.addEventListener('change', (e) => {
      msgText.value = templates[e.target.value] || msgText.value;
      renderMessage();
      toast('تم تحميل القالب');
    });

    renderMessage();
  }

  /* ------------------------------------------------- form validation --- */
  const reportForm = document.getElementById('report-form');
  if (reportForm) {
    reportForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let bad = null;
      [document.getElementById('pil-id'), document.getElementById('desc')].forEach((el) => {
        if (!el) return;
        const invalid = !el.value.trim();
        el.classList.toggle('invalid', invalid);
        if (invalid && !bad) bad = el;
      });
      if (bad) {
        bad.focus();
        toast('يرجى تعبئة الحقول المطلوبة');
        return;
      }
      toast('تم حفظ البلاغ وإحالته إلى اللجنة');
      setTimeout(() => (location.href = '/reports/dash'), 700);
    });
  }

  const messageForm = document.getElementById('message-form');
  if (messageForm) {
    messageForm.addEventListener('submit', (e) => {
      e.preventDefault();
      toast('جارٍ إرسال الرسالة إلى 1,387 حاجاً…');
    });
  }

  /* --------------------------------------------------- login checks ---- */
  document.querySelectorAll('input[type="file"]').forEach((input) => {
    input.addEventListener('change', () => {
      const n = input.files ? input.files.length : 0;
      if (n) toast(`تم إرفاق ${n} ملف`);
    });
  });

  /* --------------------------------------------------- copy links ------ */
  document.querySelectorAll('[data-copy]').forEach((btn) => {
    btn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(btn.getAttribute('data-copy'));
        toast('تم النسخ إلى الحافظة');
      } catch {
        toast('تعذّر النسخ من المتصفح');
      }
    });
  });
})();
