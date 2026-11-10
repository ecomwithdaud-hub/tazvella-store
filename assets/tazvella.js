(function () {
  'use strict';

  const config = window.TazvellaConfig || {};

  function formatMoney(cents) {
    const symbol = config.currencySymbol || '$';
    const val = (Number(cents || 0) / 100).toFixed(2);
    return symbol + val;
  }

  /* 1. Promo Copy Button */
  document.addEventListener('click', function (e) {
    const btn = e.target.closest('[data-copy-promo]');
    if (!btn) return;
    const code = btn.getAttribute('data-copy-promo') || 'TAZVELLA30';
    if (navigator.clipboard) {
      navigator.clipboard.writeText(code);
    }
    const label = btn.querySelector('[data-promo-label]');
    if (label) {
      const orig = label.textContent;
      label.textContent = 'COPIED!';
      setTimeout(() => {
        label.textContent = orig;
      }, 2000);
    }
  });

  /* 2. Mobile Menu Drawer */
  const mobileDrawer = document.getElementById('tz-mobile-drawer');
  document.addEventListener('click', function (e) {
    if (e.target.closest('[data-mobile-open]')) {
      mobileDrawer && mobileDrawer.classList.add('is-open');
    }
    if (e.target.closest('[data-mobile-close]')) {
      mobileDrawer && mobileDrawer.classList.remove('is-open');
    }
  });

  /* 3. Cart Drawer & Shopify AJAX Cart API */
  const cartDrawer = document.getElementById('tz-cart-drawer');

  function openCartDrawer() {
    if (cartDrawer) {
      cartDrawer.classList.add('is-open');
      refreshCart();
    }
  }

  function closeCartDrawer() {
    if (cartDrawer) {
      cartDrawer.classList.remove('is-open');
    }
  }

  document.addEventListener('click', function (e) {
    if (e.target.closest('[data-cart-open]')) {
      e.preventDefault();
      openCartDrawer();
    }
    if (e.target.closest('[data-cart-close]')) {
      closeCartDrawer();
    }
  });

  async function refreshCart() {
    try {
      const res = await fetch('/cart.js');
      const cart = await res.json();
      renderCart(cart);
    } catch (err) {
      console.error('Cart refresh error:', err);
    }
  }

  function renderCart(cart) {
    const countBadges = document.querySelectorAll('[data-cart-count]');
    countBadges.forEach((el) => {
      el.textContent = cart.item_count;
    });

    const itemsContainer = document.getElementById('tz-cart-items');
    const subtotalEl = document.getElementById('tz-cart-subtotal');
    const footerEl = document.getElementById('tz-cart-footer');
    const bonusText = document.getElementById('tz-bonus-text');
    const bonusFill = document.getElementById('tz-bonus-fill');
    const bonusPct = document.getElementById('tz-bonus-pct');

    if (subtotalEl) {
      subtotalEl.textContent = formatMoney(cart.total_price);
    }

    if (config.bonusEnabled && bonusFill && bonusText) {
      const threshold = Number(config.bonusThreshold || 3500);
      const progress = Math.min(100, Math.round((cart.total_price / threshold) * 100));
      const remaining = Math.max(0, threshold - cart.total_price);
      bonusFill.style.width = progress + '%';
      if (bonusPct) bonusPct.textContent = progress + '%';
      if (remaining === 0) {
        bonusText.textContent = '🎉 Free Bonus Pack Unlocked! (' + (config.bonusGiftLabel || '') + ')';
      } else {
        bonusText.textContent = 'Add ' + formatMoney(remaining) + ' more for Free Asset Bundle';
      }
    }

    if (!itemsContainer) return;

    if (!cart.items || cart.items.length === 0) {
      itemsContainer.innerHTML =
        '<div style="text-align:center; padding: 3rem 1rem;">' +
        '<p style="font-family: var(--font-serif); font-size: 1.15rem; color: var(--tz-espresso-900); margin-bottom: 0.5rem;">Your bag is currently empty</p>' +
        '<p style="font-size: 0.78rem; color: var(--tz-espresso-600); margin-bottom: 1.25rem;">Explore our aesthetic life planners, budget sheets, and pet dashboards.</p>' +
        '<button type="button" data-cart-close class="tz-btn tz-btn-primary">Explore Digital Assets</button>' +
        '</div>';
      if (footerEl) footerEl.style.display = 'none';
      return;
    }

    if (footerEl) footerEl.style.display = 'block';

    itemsContainer.innerHTML = cart.items
      .map(function (item, idx) {
        const line = idx + 1;
        const imgUrl = item.featured_image && item.featured_image.url ? item.featured_image.url : '';
        return (
          '<div class="tz-cart-item">' +
          (imgUrl ? '<img src="' + imgUrl + '" alt="' + item.title + '">' : '') +
          '<div style="flex:1; min-width:0; display:flex; flex-direction:column; justify-content:space-between;">' +
          '<div>' +
          '<div style="display:flex; justify-content:space-between; gap:0.5rem;">' +
          '<a href="' + item.url + '" style="font-size:0.78rem; font-weight:600; color:var(--tz-espresso-900); text-decoration:none; line-height:1.25;">' +
          item.product_title +
          '</a>' +
          '<button type="button" data-cart-change="' + line + '" data-qty="0" style="border:none; background:none; color:var(--tz-espresso-400); cursor:pointer; font-size:0.8rem;" aria-label="Remove">✕</button>' +
          '</div>' +
          (item.variant_title ? '<div style="font-size:0.68rem; color:var(--tz-espresso-400);">' + item.variant_title + '</div>' : '') +
          '</div>' +
          '<div style="display:flex; align-items:center; justify-content:space-between; margin-top:0.5rem;">' +
          '<div class="tz-qty-box">' +
          '<button type="button" data-cart-change="' + line + '" data-qty="' + (item.quantity - 1) + '">−</button>' +
          '<span>' + item.quantity + '</span>' +
          '<button type="button" data-cart-change="' + line + '" data-qty="' + (item.quantity + 1) + '">+</button>' +
          '</div>' +
          '<span style="font-weight:700; font-size:0.85rem; font-family:monospace;">' + formatMoney(item.final_line_price) + '</span>' +
          '</div>' +
          '</div>' +
          '</div>'
        );
      })
      .join('');
  }

  document.addEventListener('click', async function (e) {
    const addBtn = e.target.closest('[data-ajax-add]');
    if (addBtn) {
      e.preventDefault();
      const variantId = addBtn.getAttribute('data-ajax-add');
      if (!variantId) return;
      const origHtml = addBtn.innerHTML;
      addBtn.disabled = true;
      try {
        const res = await fetch('/cart/add.js', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ items: [{ id: Number(variantId), quantity: 1 }] }),
        });
        if (res.ok) {
          addBtn.innerHTML = '✓';
          openCartDrawer();
          setTimeout(() => {
            addBtn.innerHTML = origHtml;
            addBtn.disabled = false;
          }, 1200);
        }
      } catch (err) {
        console.error(err);
        addBtn.disabled = false;
      }
    }

    const changeBtn = e.target.closest('[data-cart-change]');
    if (changeBtn) {
      const line = Number(changeBtn.getAttribute('data-cart-change'));
      const qty = Number(changeBtn.getAttribute('data-qty'));
      try {
        const res = await fetch('/cart/change.js', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ line: line, quantity: Math.max(0, qty) }),
        });
        const cart = await res.json();
        renderCart(cart);
      } catch (err) {
        console.error(err);
      }
    }
  });

  /* Intercept Shopify product forms for AJAX cart drawer */
  document.addEventListener('submit', async function (e) {
    const form = e.target.closest('form[data-ajax-form]');
    if (!form) return;
    e.preventDefault();
    const formData = new FormData(form);
    try {
      const res = await fetch('/cart/add.js', {
        method: 'POST',
        body: formData,
      });
      if (res.ok) {
        openCartDrawer();
      }
    } catch (err) {
      form.submit();
    }
  });

  /* 4. Catalog Filter Tabs, Search & Sort */
  function filterCatalog() {
    const grid = document.getElementById('tz-catalog-grid');
    if (!grid) return;
    const activeTab = document.querySelector('[data-filter-tab].is-active');
    const selectedCategory = activeTab ? activeTab.getAttribute('data-filter-tab') : 'all';
    const searchInput = document.getElementById('tz-catalog-search');
    const query = searchInput ? searchInput.value.trim().toLowerCase() : '';
    const cards = Array.from(grid.querySelectorAll('[data-product-card]'));

    let visibleCount = 0;
    cards.forEach((card) => {
      const cats = (card.getAttribute('data-categories') || '').toLowerCase();
      const title = (card.getAttribute('data-title') || '').toLowerCase();
      const matchesCat = selectedCategory === 'all' || cats.includes(selectedCategory);
      const matchesSearch = !query || title.includes(query) || cats.includes(query);
      if (matchesCat && matchesSearch) {
        card.style.display = 'flex';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    const emptyMsg = document.getElementById('tz-catalog-empty');
    if (emptyMsg) {
      emptyMsg.style.display = visibleCount === 0 ? 'block' : 'none';
    }
  }

  document.addEventListener('click', function (e) {
    const tab = e.target.closest('[data-filter-tab]');
    if (!tab) return;
    document.querySelectorAll('[data-filter-tab]').forEach((t) => t.classList.remove('is-active'));
    tab.classList.add('is-active');
    filterCatalog();
  });

  const searchBox = document.getElementById('tz-catalog-search');
  if (searchBox) {
    searchBox.addEventListener('input', filterCatalog);
  }

  const sortSelect = document.getElementById('tz-catalog-sort');
  if (sortSelect) {
    sortSelect.addEventListener('change', function () {
      const grid = document.getElementById('tz-catalog-grid');
      if (!grid) return;
      const cards = Array.from(grid.querySelectorAll('[data-product-card]'));
      const val = sortSelect.value;
      cards.sort(function (a, b) {
        const pa = Number(a.getAttribute('data-price') || 0);
        const pb = Number(b.getAttribute('data-price') || 0);
        if (val === 'price-asc') return pa - pb;
        if (val === 'price-desc') return pb - pa;
        return Number(a.getAttribute('data-index') || 0) - Number(b.getAttribute('data-index') || 0);
      });
      cards.forEach((c) => grid.appendChild(c));
    });
  }

  /* 5. Interactive Mockups & Flagship Tabs */
  document.addEventListener('click', function (e) {
    const tabBtn = e.target.closest('[data-mockup-tab]');
    if (!tabBtn) return;
    const container = tabBtn.closest('[data-mockup-scope]');
    if (!container) return;
    const targetId = tabBtn.getAttribute('data-mockup-tab');
    container.querySelectorAll('[data-mockup-tab]').forEach((b) => b.classList.remove('is-active'));
    tabBtn.classList.add('is-active');
    container.querySelectorAll('[data-mockup-panel]').forEach((p) => {
      p.style.display = p.getAttribute('data-mockup-panel') === targetId ? 'grid' : 'none';
    });
  });

  /* 6. FAQ Accordion */
  document.addEventListener('click', function (e) {
    const btn = e.target.closest('[data-faq-toggle]');
    if (!btn) return;
    const item = btn.closest('.tz-faq-item');
    if (!item) return;
    const wasOpen = item.classList.contains('is-open');
    document.querySelectorAll('.tz-faq-item').forEach((i) => i.classList.remove('is-open'));
    if (!wasOpen) item.classList.add('is-open');
  });

  /* 7. Quick View Modal */
  const qvModal = document.getElementById('tz-quickview-modal');
  document.addEventListener('click', function (e) {
    const trigger = e.target.closest('[data-quickview-trigger]');
    if (trigger && qvModal) {
      const title = trigger.getAttribute('data-qv-title') || '';
      const price = trigger.getAttribute('data-qv-price') || '';
      const img = trigger.getAttribute('data-qv-img') || '';
      const desc = trigger.getAttribute('data-qv-desc') || '';
      const url = trigger.getAttribute('data-qv-url') || '#';
      const variantId = trigger.getAttribute('data-qv-variant') || '';

      document.getElementById('tz-qv-title').textContent = title;
      document.getElementById('tz-qv-price').textContent = price;
      document.getElementById('tz-qv-img').src = img;
      document.getElementById('tz-qv-desc').textContent = desc;
      document.getElementById('tz-qv-link').href = url;
      const qvAddBtn = document.getElementById('tz-qv-add');
      if (qvAddBtn) {
        qvAddBtn.setAttribute('data-ajax-add', variantId);
        qvAddBtn.style.display = variantId ? 'inline-flex' : 'none';
      }
      qvModal.classList.add('is-open');
    }
    if (e.target.closest('[data-quickview-close]') && qvModal) {
      qvModal.classList.remove('is-open');
    }
  });

  /* 8. PDP Gallery Thumbnails */
  document.addEventListener('click', function (e) {
    const thumb = e.target.closest('[data-pdp-thumb]');
    if (!thumb) return;
    const src = thumb.getAttribute('data-pdp-thumb');
    const mainImg = document.getElementById('tz-pdp-main-img');
    if (mainImg && src) mainImg.src = src;
    document.querySelectorAll('[data-pdp-thumb]').forEach((t) => t.classList.remove('is-active'));
    thumb.classList.add('is-active');
  });
})();
