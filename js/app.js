/**
 * ============================================================================
 * NÓRDI — Tienda Virtual de Relojes
 * Archivo principal de JavaScript (Vanilla JavaScript)
 * Funcionalidad: Catálogo, Búsqueda, Filtros, Orden, Carrito, Favoritos,
 *                Modales y Toasts informativos con persistencia en localStorage.
 * ============================================================================
 */

(function () {
  'use strict';

  // --------------------------------------------------------------------------
  // 1. DATOS DE DEMOSTRACIÓN (8 PRODUCTOS DE EJEMPLO)
  // --------------------------------------------------------------------------
  const PRODUCTS = [
    {
      id: 1,
      name: "NÓRDI Chrono Diver 300",
      category: "Deportivos",
      price: 1450000,
      tag: "Más Vendido",
      tagClass: "badge-best",
      description: "Cronógrafo sumergible con bisel cerámico unidireccional, pulsadores estancos y luminiscencia de alta visibilidad.",
      image: "https://images.unsplash.com/photo-1547996160-71dfabb1a9b1?auto=format&fit=crop&w=800&q=80",
      specs: {
        diameter: "42 mm",
        case: "Acero 316L satinado",
        waterResistance: "30 ATM / 300 m",
        crystal: "Zafiro antirreflejo doble",
        movement: "Calibre Cuarzo Mecha-Chrono",
        strap: "Silicona FKM deportiva con hebilla de acero"
      }
    },
    {
      id: 2,
      name: "NÓRDI Stella Minimal Gold",
      category: "Minimalistas",
      price: 980000,
      tag: "Nuevo",
      tagClass: "",
      description: "Esfera depurada en oro cálido con manecillas tipo aguja y correa de cuero italiano suave al tacto.",
      image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=800&q=80",
      specs: {
        diameter: "38 mm",
        case: "Acero con PVD Dorado cálido",
        waterResistance: "5 ATM / 50 m",
        crystal: "Zafiro ultraplano",
        movement: "Miyota Precision Japanese Quartz",
        strap: "Cuero genuino curtido vegetal"
      }
    },
    {
      id: 3,
      name: "NÓRDI Heritage Automatic",
      category: "Clásicos",
      price: 1890000,
      tag: "Edición Limitada",
      tagClass: "badge-limited",
      description: "Elegancia atemporal con dial marfil texturizado, números arábigos en relieve y fechador a las 3.",
      image: "https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=800&q=80",
      specs: {
        diameter: "40 mm",
        case: "Acero inoxidable pulido a espejo",
        waterResistance: "5 ATM / 50 m",
        crystal: "Zafiro abombado estilo retro",
        movement: "Automático 24 rubíes (41h reserva)",
        strap: "Piel de becerro marrón con pespunte fino"
      }
    },
    {
      id: 4,
      name: "NÓRDI Midnight Obsidian",
      category: "Elegantes",
      price: 1320000,
      tag: "Exclusivo",
      tagClass: "",
      description: "Silueta monolítica monocromática en negro carbón con acabados cepillados a mano de inspiración nórdica.",
      image: "https://images.unsplash.com/photo-1508615039623-a25605d2b022?auto=format&fit=crop&w=800&q=80",
      specs: {
        diameter: "41 mm",
        case: "Acero con recubrimiento DLC carbón",
        waterResistance: "10 ATM / 100 m",
        crystal: "Zafiro ahumado antirrayaduras",
        movement: "Cuarzo suizo Ronda 515",
        strap: "Malla milanesa de acero negro mate"
      }
    },
    {
      id: 5,
      name: "NÓRDI Aero Racing GMT",
      category: "Deportivos",
      price: 1650000,
      tag: "Nuevo",
      tagClass: "",
      description: "Doble huso horario GMT para viajeros intrépidos con bisel bicolor, aguja roja de 24 horas y brazalete sólido.",
      image: "https://images.unsplash.com/photo-1526045431048-f857369baa09?auto=format&fit=crop&w=800&q=80",
      specs: {
        diameter: "42 mm",
        case: "Acero quirúrgico 316L",
        waterResistance: "20 ATM / 200 m",
        crystal: "Zafiro con lente sobre la fecha",
        movement: "Calibre GMT Independiente",
        strap: "Brazalete oyster con cierre desplegable"
      }
    },
    {
      id: 6,
      name: "NÓRDI Bauhaus Mono",
      category: "Minimalistas",
      price: 890000,
      tag: "Más Vendido",
      tagClass: "badge-best",
      description: "Inspiración del diseño funcionalista con índices milimétricos limpios y caja delgada de solo 7.2 mm.",
      image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80",
      specs: {
        diameter: "39 mm",
        case: "Acero 316L ultra delgado (7.2 mm)",
        waterResistance: "3 ATM / 30 m",
        crystal: "Zafiro con tratamiento antirreflejo",
        movement: "Calibre Slim Quartz de alta autonomía",
        strap: "Cuero negro mate de curtido orgánico"
      }
    },
    {
      id: 7,
      name: "NÓRDI Grand Classic Vintage",
      category: "Clásicos",
      price: 2100000,
      tag: "Edición Limitada",
      tagClass: "badge-limited",
      description: "Tributo a la relojería de mediados del siglo XX con detalles dorados cálidos y agujas dauphine facetadas.",
      image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=800&q=80",
      specs: {
        diameter: "39.5 mm",
        case: "Acero con baño de oro amarillo 18k",
        waterResistance: "5 ATM / 50 m",
        crystal: "Hesalite clásico con capa protectora",
        movement: "Mecánico de cuerda manual (48h)",
        strap: "Cuero marrón cognac envejecido"
      }
    },
    {
      id: 8,
      name: "NÓRDI Royale Skeleton Dial",
      category: "Elegantes",
      price: 2480000,
      tag: "Exclusivo",
      tagClass: "",
      description: "Esfera esqueletizada que expone el movimiento mecánico palpitante y el volante oscilante con acabados Côtes de Genève.",
      image: "https://images.unsplash.com/photo-1511370235399-1802cae1d32f?auto=format&fit=crop&w=800&q=80",
      specs: {
        diameter: "41.5 mm",
        case: "Acero bitono carbón y dorado",
        waterResistance: "10 ATM / 100 m",
        crystal: "Doble zafiro (frontal y trasera vista)",
        movement: "Automático Skeleton 28.800 alt/h",
        strap: "Piel grabada con cierre mariposa"
      }
    }
  ];

  // --------------------------------------------------------------------------
  // 2. ESTADO GLOBAL DE LA APLICACIÓN
  // --------------------------------------------------------------------------
  let cart = [];
  let favorites = [];
  let currentCategory = 'Todos';
  let searchQuery = '';
  let currentSort = 'default';

  // Formateador de moneda en pesos colombianos (COP) según especificación técnica
  const currencyFormatter = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0
  });

  // --------------------------------------------------------------------------
  // 3. ELEMENTOS DEL DOM
  // --------------------------------------------------------------------------
  const DOM = {
    productsGrid: document.getElementById('productsGrid'),
    catalogEmpty: document.getElementById('catalogEmpty'),
    resultsCount: document.getElementById('resultsCount'),
    searchInput: document.getElementById('searchInput'),
    clearSearchBtn: document.getElementById('clearSearchBtn'),
    sortSelect: document.getElementById('sortSelect'),
    categoryButtons: document.querySelectorAll('.filter-btn'),
    resetFiltersBtn: document.getElementById('resetFiltersBtn'),

    // Badges contadores del header
    cartCountBadge: document.getElementById('cartCountBadge'),
    favCountBadge: document.getElementById('favCountBadge'),

    // Botones de acción del header
    cartToggleBtn: document.getElementById('cartToggleBtn'),
    favToggleBtn: document.getElementById('favToggleBtn'),
    menuToggleBtn: document.getElementById('menuToggleBtn'),
    mainNav: document.getElementById('mainNav'),

    // Drawer del carrito
    cartDrawer: document.getElementById('cartDrawer'),
    cartCloseBtn: document.getElementById('cartCloseBtn'),
    cartItemsBody: document.getElementById('cartItemsBody'),
    cartEmptyState: document.getElementById('cartEmptyState'),
    cartSubtotal: document.getElementById('cartSubtotal'),
    cartTotal: document.getElementById('cartTotal'),
    drawerCartCount: document.getElementById('drawerCartCount'),
    checkoutBtn: document.getElementById('checkoutBtn'),

    // Drawer de favoritos
    favoritesDrawer: document.getElementById('favoritesDrawer'),
    favCloseBtn: document.getElementById('favCloseBtn'),
    favItemsBody: document.getElementById('favItemsBody'),
    favEmptyState: document.getElementById('favEmptyState'),
    drawerFavCount: document.getElementById('drawerFavCount'),

    // Fondo oscuro para drawers (Backdrop)
    drawerBackdrop: document.getElementById('drawerBackdrop'),

    // Ventanas modales generales y de vista rápida
    modalOverlay: document.getElementById('modalOverlay'),
    modalTitle: document.getElementById('modalTitle'),
    modalBody: document.getElementById('modalBody'),
    modalCloseBtn: document.getElementById('modalCloseBtn'),
    modalOkBtn: document.getElementById('modalOkBtn'),

    quickViewModal: document.getElementById('quickViewModal'),
    quickViewBody: document.getElementById('quickViewBody'),
    quickViewCloseBtn: document.getElementById('quickViewCloseBtn'),

    // Toasts
    toastContainer: document.getElementById('toastContainer'),

    // Newsletter
    newsletterForm: document.getElementById('newsletterForm'),
    newsletterEmail: document.getElementById('newsletterEmail')
  };

  // --------------------------------------------------------------------------
  // 4. PERSISTENCIA EN LOCALSTORAGE
  // --------------------------------------------------------------------------
  function initLocalStorage() {
    try {
      const storedCart = localStorage.getItem('nordi_cart');
      if (storedCart) {
        cart = JSON.parse(storedCart);
      }
    } catch (e) {
      console.warn('No se pudo acceder al carrito en localStorage:', e);
      cart = [];
    }

    try {
      const storedFavs = localStorage.getItem('nordi_favorites');
      if (storedFavs) {
        favorites = JSON.parse(storedFavs);
      }
    } catch (e) {
      console.warn('No se pudieron acceder a favoritos en localStorage:', e);
      favorites = [];
    }
  }

  /**
   * Guarda el estado del carrito en localStorage y vuelve a renderizarlo
   * (Cumple con la especificación técnica: saveCart())
   */
  function saveCart() {
    try {
      localStorage.setItem('nordi_cart', JSON.stringify(cart));
    } catch (e) {
      console.warn('Error al guardar carrito en localStorage:', e);
    }
    renderCart();
  }

  function saveFavorites() {
    try {
      localStorage.setItem('nordi_favorites', JSON.stringify(favorites));
    } catch (e) {
      console.warn('Error al guardar favoritos en localStorage:', e);
    }
    updateFavoritesBadges();
    renderFavorites();
  }

  // --------------------------------------------------------------------------
  // 5. RENDERIZADO DEL CATÁLOGO (renderProducts())
  // --------------------------------------------------------------------------
  /**
   * Filtra, ordena y dibuja los productos del catálogo
   * (Cumple con la especificación técnica: renderProducts())
   */
  function renderProducts() {
    if (!DOM.productsGrid) return;

    // 1. Filtrado por categoría
    let filtered = PRODUCTS.filter(product => {
      if (currentCategory === 'Todos') return true;
      return product.category.toLowerCase() === currentCategory.toLowerCase();
    });

    // 2. Filtrado por término de búsqueda (nombre, categoría o descripción)
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(product => {
        return (
          product.name.toLowerCase().includes(q) ||
          product.category.toLowerCase().includes(q) ||
          product.description.toLowerCase().includes(q)
        );
      });
    }

    // 3. Ordenamiento
    filtered.sort((a, b) => {
      switch (currentSort) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        case 'default':
        default:
          return a.id - b.id;
      }
    });

    // 4. Actualizar contador de resultados
    if (DOM.resultsCount) {
      DOM.resultsCount.innerHTML = `Mostrando <strong>${filtered.length}</strong> de <strong>${PRODUCTS.length}</strong> modelos`;
    }

    // 5. Manejo de estado vacío
    if (filtered.length === 0) {
      DOM.productsGrid.innerHTML = '';
      if (DOM.catalogEmpty) DOM.catalogEmpty.classList.add('is-visible');
      return;
    } else {
      if (DOM.catalogEmpty) DOM.catalogEmpty.classList.remove('is-visible');
    }

    // 6. Construcción HTML de tarjetas de productos
    const cardsHTML = filtered.map(product => {
      const isFav = favorites.includes(product.id);
      return `
        <article class="product-card" data-id="${product.id}">
          <div class="card-img-container">
            ${product.tag ? `<span class="card-badge ${product.tagClass}">${product.tag}</span>` : ''}
            
            <button 
              type="button" 
              class="fav-btn ${isFav ? 'is-favorite' : ''}" 
              data-action="toggle-fav" 
              data-id="${product.id}"
              aria-label="${isFav ? 'Quitar de favoritos' : 'Añadir a favoritos'}"
              title="${isFav ? 'Quitar de favoritos' : 'Añadir a favoritos'}"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${isFav ? 'currentColor' : 'none'}" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
              </svg>
            </button>

            <img 
              src="${product.image}" 
              alt="${product.name} — Reloj ${product.category}" 
              class="card-img" 
              loading="lazy"
              onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80';"
            />

            <button 
              type="button" 
              class="quick-view-btn" 
              data-action="quick-view" 
              data-id="${product.id}"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
              Vista Rápida
            </button>
          </div>

          <div class="card-body">
            <span class="card-category">${product.category}</span>
            <h3 class="card-title">${product.name}</h3>
            <p class="card-desc">${product.description}</p>

            <div class="card-footer">
              <div class="card-price-wrap">
                <span class="price-label">Precio</span>
                <span class="card-price">${currencyFormatter.format(product.price)}</span>
              </div>
              <button 
                type="button" 
                class="add-cart-btn" 
                data-action="add-cart" 
                data-id="${product.id}" 
                aria-label="Añadir ${product.name} al carrito"
                title="Añadir al carrito"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/>
                  <path d="M3 6h18"/>
                  <path d="M16 10a4 4 0 0 1-8 0"/>
                </svg>
              </button>
            </div>
          </div>
        </article>
      `;
    }).join('');

    DOM.productsGrid.innerHTML = cardsHTML;
  }

  // --------------------------------------------------------------------------
  // 6. GESTIÓN DEL CARRITO DE COMPRAS
  // --------------------------------------------------------------------------
  /**
   * Añade un producto al carrito o incrementa su cantidad
   * (Cumple con la especificación técnica: addToCart(id))
   */
  function addToCart(productId, qtyToAdd = 1) {
    const id = parseInt(productId, 10);
    const product = PRODUCTS.find(p => p.id === id);
    if (!product) return;

    const existingIndex = cart.findIndex(item => item.id === id);
    if (existingIndex > -1) {
      cart[existingIndex].quantity += qtyToAdd;
    } else {
      cart.push({
        id: id,
        quantity: qtyToAdd
      });
    }

    saveCart();
    animateCounterBadge(DOM.cartCountBadge);
    showToast(`"${product.name}" añadido al carrito`);
  }

  /**
   * Modifica la cantidad de un producto en el carrito
   */
  function updateCartQuantity(productId, delta) {
    const id = parseInt(productId, 10);
    const existingIndex = cart.findIndex(item => item.id === id);
    if (existingIndex === -1) return;

    cart[existingIndex].quantity += delta;
    if (cart[existingIndex].quantity <= 0) {
      removeFromCart(id);
      return;
    }

    saveCart();
  }

  /**
   * Elimina un producto del carrito
   */
  function removeFromCart(productId) {
    const id = parseInt(productId, 10);
    const product = PRODUCTS.find(p => p.id === id);
    cart = cart.filter(item => item.id !== id);
    saveCart();
    if (product) {
      showToast(`Se retiró "${product.name}" del carrito`);
    }
  }

  /**
   * Dibuja los elementos del carrito, actualiza subtotales y contadores
   * (Cumple con la especificación técnica: renderCart())
   */
  function renderCart() {
    const totalItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

    // Actualizar badge en header
    if (DOM.cartCountBadge) {
      DOM.cartCountBadge.textContent = totalItemsCount;
      if (totalItemsCount > 0) {
        DOM.cartCountBadge.classList.remove('hidden');
      } else {
        DOM.cartCountBadge.classList.add('hidden');
      }
    }

    // Actualizar contador en header del drawer
    if (DOM.drawerCartCount) {
      DOM.drawerCartCount.textContent = `${totalItemsCount} ${totalItemsCount === 1 ? 'artículo' : 'artículos'}`;
    }

    // Renderizar cuerpo del carrito
    if (!DOM.cartItemsBody) return;

    if (cart.length === 0) {
      DOM.cartItemsBody.innerHTML = '';
      if (DOM.cartEmptyState) DOM.cartEmptyState.classList.add('is-visible');
      if (DOM.cartSubtotal) DOM.cartSubtotal.textContent = currencyFormatter.format(0);
      if (DOM.cartTotal) DOM.cartTotal.textContent = currencyFormatter.format(0);
      if (DOM.checkoutBtn) DOM.checkoutBtn.disabled = true;
      return;
    }

    if (DOM.cartEmptyState) DOM.cartEmptyState.classList.remove('is-visible');
    if (DOM.checkoutBtn) DOM.checkoutBtn.disabled = false;

    let subtotal = 0;
    const itemsHTML = cart.map(item => {
      const product = PRODUCTS.find(p => p.id === item.id);
      if (!product) return '';

      const itemTotal = product.price * item.quantity;
      subtotal += itemTotal;

      return `
        <div class="cart-item" data-id="${product.id}">
          <img src="${product.image}" alt="${product.name}" class="cart-item-img" />
          
          <div class="cart-item-info">
            <span class="cart-item-category">${product.category}</span>
            <span class="cart-item-title">${product.name}</span>
            <span class="cart-item-price">${currencyFormatter.format(product.price)} c/u</span>

            <div class="qty-controls">
              <button type="button" class="qty-btn" data-action="cart-decrease" data-id="${product.id}" aria-label="Reducir cantidad">−</button>
              <span class="qty-value">${item.quantity}</span>
              <button type="button" class="qty-btn" data-action="cart-increase" data-id="${product.id}" aria-label="Aumentar cantidad">+</button>
            </div>
          </div>

          <div class="cart-item-actions">
            <span class="item-total-price">${currencyFormatter.format(itemTotal)}</span>
            <button type="button" class="delete-item-btn" data-action="cart-delete" data-id="${product.id}" aria-label="Eliminar producto">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M3 6h18"/>
                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
              </svg>
            </button>
          </div>
        </div>
      `;
    }).join('');

    DOM.cartItemsBody.innerHTML = itemsHTML;

    if (DOM.cartSubtotal) DOM.cartSubtotal.textContent = currencyFormatter.format(subtotal);
    if (DOM.cartTotal) DOM.cartTotal.textContent = currencyFormatter.format(subtotal);
  }

  /**
   * Abre el panel lateral del carrito
   * (Cumple con la especificación técnica: openCart())
   */
  function openCart() {
    closeFavorites();
    if (DOM.cartDrawer) DOM.cartDrawer.classList.add('is-open');
    if (DOM.drawerBackdrop) DOM.drawerBackdrop.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  /**
   * Cierra el panel lateral del carrito
   * (Cumple con la especificación técnica: closeCart())
   */
  function closeCart() {
    if (DOM.cartDrawer) DOM.cartDrawer.classList.remove('is-open');
    if (!DOM.favoritesDrawer || !DOM.favoritesDrawer.classList.contains('is-open')) {
      if (DOM.drawerBackdrop) DOM.drawerBackdrop.classList.remove('is-open');
      document.body.style.overflow = '';
    }
  }

  // --------------------------------------------------------------------------
  // 7. GESTIÓN DE FAVORITOS
  // --------------------------------------------------------------------------
  function toggleFavorite(productId) {
    const id = parseInt(productId, 10);
    const product = PRODUCTS.find(p => p.id === id);
    if (!product) return;

    const index = favorites.indexOf(id);
    if (index > -1) {
      favorites.splice(index, 1);
      showToast(`Se quitó "${product.name}" de tus favoritos`);
    } else {
      favorites.push(id);
      showToast(`"${product.name}" se guardó en tus favoritos`);
      animateCounterBadge(DOM.favCountBadge);
    }

    saveFavorites();
    renderProducts();
  }

  function updateFavoritesBadges() {
    const count = favorites.length;
    if (DOM.favCountBadge) {
      DOM.favCountBadge.textContent = count;
      if (count > 0) {
        DOM.favCountBadge.classList.remove('hidden');
      } else {
        DOM.favCountBadge.classList.add('hidden');
      }
    }
    if (DOM.drawerFavCount) {
      DOM.drawerFavCount.textContent = `${count} ${count === 1 ? 'pieza' : 'piezas'}`;
    }
  }

  function renderFavorites() {
    if (!DOM.favItemsBody) return;

    if (favorites.length === 0) {
      DOM.favItemsBody.innerHTML = '';
      if (DOM.favEmptyState) DOM.favEmptyState.classList.add('is-visible');
      return;
    }

    if (DOM.favEmptyState) DOM.favEmptyState.classList.remove('is-visible');

    const favsHTML = favorites.map(id => {
      const product = PRODUCTS.find(p => p.id === id);
      if (!product) return '';

      return `
        <div class="cart-item" data-id="${product.id}">
          <img src="${product.image}" alt="${product.name}" class="cart-item-img" />
          
          <div class="cart-item-info">
            <span class="cart-item-category">${product.category}</span>
            <span class="cart-item-title">${product.name}</span>
            <span class="cart-item-price">${currencyFormatter.format(product.price)}</span>
            
            <button 
              type="button" 
              class="btn btn-primary" 
              style="padding: 0.4rem 0.8rem; font-size: 0.75rem; margin-top: 0.5rem; width: fit-content;" 
              data-action="fav-to-cart" 
              data-id="${product.id}"
            >
              Mover al Carrito
            </button>
          </div>

          <div class="cart-item-actions">
            <button type="button" class="delete-item-btn" data-action="toggle-fav" data-id="${product.id}" aria-label="Quitar de favoritos" title="Quitar de favoritos">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M18 6 6 18M6 6l12 12"/>
              </svg>
            </button>
          </div>
        </div>
      `;
    }).join('');

    DOM.favItemsBody.innerHTML = favsHTML;
  }

  function openFavorites() {
    closeCart();
    renderFavorites();
    if (DOM.favoritesDrawer) DOM.favoritesDrawer.classList.add('is-open');
    if (DOM.drawerBackdrop) DOM.drawerBackdrop.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closeFavorites() {
    if (DOM.favoritesDrawer) DOM.favoritesDrawer.classList.remove('is-open');
    if (!DOM.cartDrawer || !DOM.cartDrawer.classList.contains('is-open')) {
      if (DOM.drawerBackdrop) DOM.drawerBackdrop.classList.remove('is-open');
      document.body.style.overflow = '';
    }
  }

  // --------------------------------------------------------------------------
  // 8. MODAL DE VISTA RÁPIDA (QUICK VIEW)
  // --------------------------------------------------------------------------
  function openQuickView(productId) {
    const id = parseInt(productId, 10);
    const product = PRODUCTS.find(p => p.id === id);
    if (!product || !DOM.quickViewBody || !DOM.quickViewModal) return;

    const isFav = favorites.includes(product.id);

    DOM.quickViewBody.innerHTML = `
      <div class="quick-view-grid">
        <div class="qv-image">
          <img src="${product.image}" alt="${product.name}" />
        </div>
        
        <div class="qv-details">
          <span class="card-category">${product.category}</span>
          <h2 style="font-family: var(--font-serif); font-size: 1.75rem; margin-bottom: 0.5rem; color: var(--color-carbon);">${product.name}</h2>
          <div style="font-size: 1.4rem; font-weight: 700; color: var(--color-dorado); margin-bottom: 1rem;">
            ${currencyFormatter.format(product.price)} COP
          </div>
          <p style="font-size: 0.9375rem; color: var(--color-carbon-muted); line-height: 1.6; margin-bottom: 1.25rem;">
            ${product.description}
          </p>

          <div class="qv-specs-list">
            <div class="qv-spec-item">
              <strong>Diámetro de caja</strong>
              <span>${product.specs.diameter}</span>
            </div>
            <div class="qv-spec-item">
              <strong>Material</strong>
              <span>${product.specs.case}</span>
            </div>
            <div class="qv-spec-item">
              <strong>Hermeticidad</strong>
              <span>${product.specs.waterResistance}</span>
            </div>
            <div class="qv-spec-item">
              <strong>Cristal</strong>
              <span>${product.specs.crystal}</span>
            </div>
            <div class="qv-spec-item">
              <strong>Mecanismo</strong>
              <span>${product.specs.movement}</span>
            </div>
            <div class="qv-spec-item">
              <strong>Correa</strong>
              <span>${product.specs.strap}</span>
            </div>
          </div>

          <div style="display: flex; gap: 0.75rem; margin-top: auto; padding-top: 1rem;">
            <button 
              type="button" 
              class="btn btn-primary" 
              style="flex: 1;"
              data-action="qv-add-to-cart" 
              data-id="${product.id}"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 18px; height: 18px;">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/>
                <path d="M3 6h18"/>
                <path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
              Añadir al Carrito
            </button>
            <button 
              type="button" 
              class="action-btn" 
              data-action="toggle-fav" 
              data-id="${product.id}" 
              style="border: 1px solid var(--color-borde); width: 48px; height: 48px;"
              title="Añadir a favoritos"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${isFav ? 'var(--color-error)' : 'none'}" stroke="${isFav ? 'var(--color-error)' : 'currentColor'}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    `;

    DOM.quickViewModal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closeQuickView() {
    if (DOM.quickViewModal) DOM.quickViewModal.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  // --------------------------------------------------------------------------
  // 9. MODALES GENERALES (showModal(title, text))
  // --------------------------------------------------------------------------
  /**
   * Presenta información en una ventana emergente
   * (Cumple con la especificación técnica: showModal(title, text))
   */
  function showModal(title, text) {
    if (!DOM.modalOverlay || !DOM.modalTitle || !DOM.modalBody) return;
    DOM.modalTitle.textContent = title;
    DOM.modalBody.innerHTML = typeof text === 'string' ? `<p>${text}</p>` : text;
    DOM.modalOverlay.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (DOM.modalOverlay) DOM.modalOverlay.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  // --------------------------------------------------------------------------
  // 10. NOTIFICACIONES FLOTANTES (showToast(message))
  // --------------------------------------------------------------------------
  /**
   * Muestra mensajes breves de confirmación
   * (Cumple con la especificación técnica: showToast(message))
   */
  function showToast(message) {
    if (!DOM.toastContainer) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.setAttribute('role', 'status');
    toast.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M20 6 9 17l-5-5"/>
      </svg>
      <span>${message}</span>
    `;

    DOM.toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.remove();
    }, 4000);
  }

  function animateCounterBadge(badgeEl) {
    if (!badgeEl) return;
    badgeEl.classList.add('bounce');
    setTimeout(() => {
      badgeEl.classList.remove('bounce');
    }, 300);
  }

  // --------------------------------------------------------------------------
  // 11. MANEJADORES DE EVENTOS
  // --------------------------------------------------------------------------
  function setupEventListeners() {
    // 1. Delegación de clics en el catálogo
    if (DOM.productsGrid) {
      DOM.productsGrid.addEventListener('click', (e) => {
        const btn = e.target.closest('button[data-action]');
        if (!btn) return;

        const action = btn.dataset.action;
        const productId = btn.dataset.id;

        if (action === 'add-cart') {
          addToCart(productId, 1);
        } else if (action === 'toggle-fav') {
          toggleFavorite(productId);
        } else if (action === 'quick-view') {
          openQuickView(productId);
        }
      });
    }

    // 2. Filtros por categoría
    DOM.categoryButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        DOM.categoryButtons.forEach(b => b.classList.remove('is-active'));
        btn.classList.add('is-active');
        currentCategory = btn.dataset.category || 'Todos';
        renderProducts();
      });
    });

    // 3. Búsqueda en tiempo real
    if (DOM.searchInput) {
      DOM.searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value;
        if (DOM.clearSearchBtn) {
          DOM.clearSearchBtn.style.display = searchQuery ? 'block' : 'none';
        }
        renderProducts();
      });
    }

    if (DOM.clearSearchBtn) {
      DOM.clearSearchBtn.addEventListener('click', () => {
        DOM.searchInput.value = '';
        searchQuery = '';
        DOM.clearSearchBtn.style.display = 'none';
        renderProducts();
        DOM.searchInput.focus();
      });
    }

    // 4. Ordenamiento
    if (DOM.sortSelect) {
      DOM.sortSelect.addEventListener('change', (e) => {
        currentSort = e.target.value;
        renderProducts();
      });
    }

    // 5. Botón para restablecer filtros cuando hay 0 resultados
    if (DOM.resetFiltersBtn) {
      DOM.resetFiltersBtn.addEventListener('click', () => {
        currentCategory = 'Todos';
        searchQuery = '';
        currentSort = 'default';

        if (DOM.searchInput) DOM.searchInput.value = '';
        if (DOM.clearSearchBtn) DOM.clearSearchBtn.style.display = 'none';
        if (DOM.sortSelect) DOM.sortSelect.value = 'default';

        DOM.categoryButtons.forEach(b => {
          b.classList.toggle('is-active', b.dataset.category === 'Todos');
        });

        renderProducts();
      });
    }

    // 6. Acciones del Carrito (Abrir, Cerrar, Backdrop)
    if (DOM.cartToggleBtn) DOM.cartToggleBtn.addEventListener('click', openCart);
    if (DOM.cartCloseBtn) DOM.cartCloseBtn.addEventListener('click', closeCart);

    if (DOM.favToggleBtn) DOM.favToggleBtn.addEventListener('click', openFavorites);
    if (DOM.favCloseBtn) DOM.favCloseBtn.addEventListener('click', closeFavorites);

    if (DOM.drawerBackdrop) {
      DOM.drawerBackdrop.addEventListener('click', () => {
        closeCart();
        closeFavorites();
      });
    }

    // 7. Delegación de eventos dentro del Carrito
    if (DOM.cartItemsBody) {
      DOM.cartItemsBody.addEventListener('click', (e) => {
        const btn = e.target.closest('button[data-action]');
        if (!btn) return;

        const action = btn.dataset.action;
        const productId = btn.dataset.id;

        if (action === 'cart-increase') {
          updateCartQuantity(productId, 1);
        } else if (action === 'cart-decrease') {
          updateCartQuantity(productId, -1);
        } else if (action === 'cart-delete') {
          removeFromCart(productId);
        }
      });
    }

    // 8. Delegación de eventos dentro de Favoritos
    if (DOM.favItemsBody) {
      DOM.favItemsBody.addEventListener('click', (e) => {
        const btn = e.target.closest('button[data-action]');
        if (!btn) return;

        const action = btn.dataset.action;
        const productId = btn.dataset.id;

        if (action === 'fav-to-cart') {
          addToCart(productId, 1);
          toggleFavorite(productId);
          openCart();
        } else if (action === 'toggle-fav') {
          toggleFavorite(productId);
        }
      });
    }

    // 9. Delegación en Quick View
    if (DOM.quickViewBody) {
      DOM.quickViewBody.addEventListener('click', (e) => {
        const btn = e.target.closest('button[data-action]');
        if (!btn) return;

        const action = btn.dataset.action;
        const productId = btn.dataset.id;

        if (action === 'qv-add-to-cart') {
          addToCart(productId, 1);
          closeQuickView();
        } else if (action === 'toggle-fav') {
          toggleFavorite(productId);
          openQuickView(productId); // re-render icons
        }
      });
    }

    if (DOM.quickViewCloseBtn) DOM.quickViewCloseBtn.addEventListener('click', closeQuickView);
    if (DOM.quickViewModal) {
      DOM.quickViewModal.addEventListener('click', (e) => {
        if (e.target === DOM.quickViewModal) closeQuickView();
      });
    }

    // 10. Modales generales
    if (DOM.modalCloseBtn) DOM.modalCloseBtn.addEventListener('click', closeModal);
    if (DOM.modalOkBtn) DOM.modalOkBtn.addEventListener('click', closeModal);
    if (DOM.modalOverlay) {
      DOM.modalOverlay.addEventListener('click', (e) => {
        if (e.target === DOM.modalOverlay) closeModal();
      });
    }

    // 11. Proceder al pago (Checkout demostrativo)
    if (DOM.checkoutBtn) {
      DOM.checkoutBtn.addEventListener('click', () => {
        closeCart();
        const subtotal = cart.reduce((acc, item) => {
          const p = PRODUCTS.find(prod => prod.id === item.id);
          return acc + (p ? p.price * item.quantity : 0);
        }, 0);

        showModal(
          "Proceso de compra demostrativo",
          `
            <p style="margin-bottom: 1rem;">
              Has iniciado el proceso de compra para un total de <strong>${currencyFormatter.format(subtotal)} COP</strong>.
            </p>
            <div style="background-color: var(--color-arena-soft); border-left: 4px solid var(--color-dorado); padding: 1rem; border-radius: var(--radius-sm); margin-bottom: 1rem; font-size: 0.875rem;">
              <strong>Aviso de prototipo:</strong> De acuerdo con la especificación técnica de NÓRDI, este proyecto es un frontend interactivo de demostración. No se procesan transacciones reales ni se recopilan datos bancarios.
            </div>
            <p style="font-size: 0.875rem;">
              En una siguiente fase de integración, este botón conectará de forma segura con la pasarela de pagos oficial (como Wompi, PayU o Stripe) y un sistema backend para procesar el pedido.
            </p>
          `
        );
      });
    }

    // 12. Formulario de Newsletter (Novedades)
    if (DOM.newsletterForm) {
      DOM.newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = DOM.newsletterEmail.value.trim();
        if (!email) return;

        DOM.newsletterEmail.value = '';
        showToast("¡Gracias por suscribirte al Círculo NÓRDI!");
        showModal(
          "Suscripción confirmada",
          `¡Bienvenido a la comunidad NÓRDI! El correo <strong>${email}</strong> ha sido registrado satisfactoriamente para recibir avances de nuevas colecciones e invitaciones exclusivas.`
        );
      });
    }

    // 13. Menú móvil hamburguesa
    if (DOM.menuToggleBtn && DOM.mainNav) {
      DOM.menuToggleBtn.addEventListener('click', () => {
        DOM.mainNav.classList.toggle('is-mobile-open');
      });

      // Cerrar menú al hacer clic en un enlace
      DOM.mainNav.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
          DOM.mainNav.classList.remove('is-mobile-open');
        });
      });
    }

    // 14. Cerrar con tecla Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeCart();
        closeFavorites();
        closeQuickView();
        closeModal();
      }
    });

    // 15. Header sombreado al hacer scroll
    window.addEventListener('scroll', () => {
      const header = document.querySelector('.site-header');
      if (!header) return;
      if (window.scrollY > 30) {
        header.classList.add('is-scrolled');
      } else {
        header.classList.remove('is-scrolled');
      }
    });
  }

  // --------------------------------------------------------------------------
  // 12. INICIALIZACIÓN DE LA APLICACIÓN
  // --------------------------------------------------------------------------
  function init() {
    initLocalStorage();
    renderProducts();
    renderCart();
    updateFavoritesBadges();
    setupEventListeners();
  }

  // Exponer funciones en el ámbito global window para cumplir fielmente la spec
  window.NORDI = {
    renderProducts,
    addToCart,
    renderCart,
    saveCart,
    openCart,
    closeCart,
    showToast,
    showModal,
    toggleFavorite,
    openFavorites,
    closeFavorites,
    openQuickView,
    closeQuickView
  };

  // Asignar funciones globales según se especifica en la sección 6
  window.renderProducts = renderProducts;
  window.addToCart = addToCart;
  window.renderCart = renderCart;
  window.saveCart = saveCart;
  window.openCart = openCart;
  window.closeCart = closeCart;
  window.showToast = showToast;
  window.showModal = showModal;

  // Arrancar cuando el DOM esté listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
