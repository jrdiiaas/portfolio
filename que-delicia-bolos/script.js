/* ==========================================================================
   QUE DELÍCIA QUERO BOLOS CASEIROS - Interactive App & Conversion Script
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Store Data & Contacts
  const STORES = {
    'itaitinga': {
      name: 'Parque Dom Pedro (Itaitinga)',
      phone: '5585987805227',
      displayPhone: '(85) 98780-5227',
      address: 'Parque Dom Pedro, Itaitinga - CE',
      hours: 'Segunda a Sábado: 07:30 às 18:30',
      cardapioUrl: 'https://app.cardapioweb.com/que_delicia_bolos_caseiros'
    },
    'messejana': {
      name: 'Loja Messejana (Fortaleza)',
      phone: '5585989034109',
      displayPhone: '(85) 98903-4109',
      address: 'Messejana, Fortaleza - CE',
      hours: 'Segunda a Sábado: 07:30 às 18:30',
      cardapioUrl: 'https://app.cardapioweb.com/que_delicia_messejana'
    },
    'eusebio': {
      name: 'Loja Eusébio',
      phone: '5585982240688',
      displayPhone: '(85) 98224-0688',
      address: 'Centro, Eusébio - CE',
      hours: 'Segunda a Sábado: 08:00 às 19:00',
      cardapioUrl: 'https://linktr.ee/Quedeliciaboloscaseiros'
    }
  };

  // Products Data Array
  const PRODUCTS = [
    {
      id: 1,
      name: 'Bolo Vulcão Ninho com Nutella',
      category: 'vulcao',
      price: 42.90,
      badge: 'Mais Pedido 🔥',
      image: 'images/ninho-nutella.jpg',
      desc: 'Massa super fofinha com recheio vulcânico de creme de Leite Ninho cremoso e generosa cobertura de Nutella pura!'
    },
    {
      id: 2,
      name: 'Bolo de Cenoura com Brigadeiro',
      category: 'tradicional',
      price: 34.90,
      badge: 'Favorito da Casa 🥕',
      image: 'images/cenoura-choco.jpg',
      desc: 'O clássico inesquecível! Massa dourada de cenoura fresca com cobertura vulcão de brigadeiro artesanal espesso.'
    },
    {
      id: 3,
      name: 'Bolo de Fubá com Goiabada Vulcão',
      category: 'roca',
      price: 32.90,
      badge: 'Sabor da Roça 🌾',
      image: 'images/fuba-goiabada.jpg',
      desc: 'Massa perfumada de fubá mimoso com pedaços de goiabada derretida e calda caseira de goiaba por cima.'
    },
    {
      id: 4,
      name: 'Bolo Vulcão Brigadeiro Duplo',
      category: 'vulcao',
      price: 39.90,
      badge: 'Vulcão Supremo 🍫',
      image: 'images/hero-cake.jpg',
      desc: 'Massa 100% cacau recheada com brigadeiro gourmet ao leite e granulado crocante por toda a superfície.'
    },
    {
      id: 5,
      name: 'Bolo Caseiro de Milho Cremoso',
      category: 'roca',
      price: 29.90,
      badge: 'Tradição 🌽',
      image: 'images/fuba-goiabada.jpg',
      desc: 'Bolo quentinho de milho verde com textura ultra cremosa, ideal para acompanhar um café recém-passado.'
    },
    {
      id: 6,
      name: 'Kit Mini Vulcões Degustação (4 unid)',
      category: 'mini',
      price: 48.90,
      badge: 'Lançamento 🎁',
      image: 'images/ninho-nutella.jpg',
      desc: 'Quatro mini bolos vulcão nos sabores: Ninho c/ Nutella, Brigadeiro, Cenoura c/ Chocolate e Doce de Leite.'
    },
    {
      id: 7,
      name: 'Combo Lanche da Tarde Perfeito',
      category: 'combos',
      price: 54.90,
      badge: 'Super Oferta ⚡',
      image: 'images/hero-cake.jpg',
      desc: '1 Bolo Vulcão Grande (sabor à escolha) + 1 Garrafa de Café da Roça Passado + Embalagem Especial.'
    },
    {
      id: 8,
      name: 'Bolo Caseirinho de Macaxeira',
      category: 'tradicional',
      price: 28.90,
      badge: 'Receita da Vó 🍠',
      image: 'images/fuba-goiabada.jpg',
      desc: 'Feito com macaxeira fresca ralada, leite de coco e lascas de coco queimado por cima. Sabor autêntico!'
    }
  ];

  // Current Selected Store State
  let currentStoreKey = 'itaitinga';
  let selectedProductForOrder = null;

  // DOM Elements
  const headerStoreSelect = document.getElementById('headerStoreSelect');
  const storeFilterSelect = document.getElementById('storeFilterSelect');
  const productsGrid = document.getElementById('productsContainer');
  const searchInput = document.getElementById('searchInput');
  const tabButtons = document.querySelectorAll('.tab-btn');
  const orderModal = document.getElementById('orderModal');
  const modalCloseBtn = document.getElementById('modalClose');
  const modalProductTitle = document.getElementById('modalProductTitle');
  const modalStoreSelect = document.getElementById('modalStoreSelect');
  const whatsappOrderForm = document.getElementById('whatsappOrderForm');
  const toastNotification = document.getElementById('toastNotification');

  // Initialize Product Grid
  function renderProducts(items) {
    if (!productsGrid) return;
    productsGrid.innerHTML = '';

    if (items.length === 0) {
      productsGrid.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--text-muted);">
          <i class="fas fa-cookie-bite" style="font-size: 40px; margin-bottom: 12px; color: var(--primary);"></i>
          <h3>Nenhum bolo encontrado para a pesquisa!</h3>
          <p>Tente buscar por outro termo ou escolha outra categoria.</p>
        </div>
      `;
      return;
    }

    items.forEach(product => {
      const card = document.createElement('div');
      card.className = 'product-card';
      card.innerHTML = `
        <span class="product-badge">${product.badge}</span>
        <div class="product-img-holder">
          <img src="${product.image}" alt="${product.name}" loading="lazy">
        </div>
        <div class="product-info">
          <h3 class="product-title">${product.name}</h3>
          <p class="product-desc">${product.desc}</p>
          <div class="product-footer">
            <div class="price-tag">
              <span class="price-label">Preço Especial</span>
              <span class="price-value">R$ ${product.price.toFixed(2).replace('.', ',')}</span>
            </div>
            <button class="btn-order-item" data-id="${product.id}">
              <i class="fab fa-whatsapp"></i> Encomendar
            </button>
          </div>
        </div>
      `;

      card.querySelector('.btn-order-item').addEventListener('click', () => {
        openOrderModal(product);
      });

      productsGrid.appendChild(card);
    });
  }

  // Filter Logic
  let activeCategory = 'all';

  function filterProducts() {
    const searchTerm = searchInput ? searchInput.value.toLowerCase().trim() : '';
    const filtered = PRODUCTS.filter(product => {
      const matchesCategory = activeCategory === 'all' || product.category === activeCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchTerm) || 
                            product.desc.toLowerCase().includes(searchTerm);
      return matchesCategory && matchesSearch;
    });
    renderProducts(filtered);
  }

  // Category Tab Click Handler
  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeCategory = btn.dataset.category;
      filterProducts();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', filterProducts);
  }

  // Store Change Handler
  function updateSelectedStore(storeKey) {
    currentStoreKey = storeKey;
    if (headerStoreSelect) headerStoreSelect.value = storeKey;
    if (modalStoreSelect) modalStoreSelect.value = storeKey;

    // Update global links
    const storeInfo = STORES[storeKey];
    document.querySelectorAll('.dynamic-store-phone').forEach(el => {
      el.textContent = storeInfo.displayPhone;
    });
    document.querySelectorAll('.dynamic-store-name').forEach(el => {
      el.textContent = storeInfo.name;
    });

    showToast(`Unidade alterada para: ${storeInfo.name}`);
  }

  if (headerStoreSelect) {
    headerStoreSelect.addEventListener('change', (e) => {
      updateSelectedStore(e.target.value);
    });
  }

  // Modal Order Handler
  function openOrderModal(product) {
    selectedProductForOrder = product;
    if (modalProductTitle) {
      modalProductTitle.textContent = product ? product.name : 'Bolo Caseiro Que Delícia!';
    }
    if (modalStoreSelect) {
      modalStoreSelect.value = currentStoreKey;
    }
    if (orderModal) {
      orderModal.classList.add('open');
    }
  }

  function closeOrderModal() {
    if (orderModal) {
      orderModal.classList.remove('open');
    }
  }

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeOrderModal);
  }

  if (orderModal) {
    orderModal.addEventListener('click', (e) => {
      if (e.target === orderModal) closeOrderModal();
    });
  }

  // Open Direct WhatsApp with Formatted Message
  if (whatsappOrderForm) {
    whatsappOrderForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const customerName = document.getElementById('customerName').value.trim();
      const selectedStore = document.getElementById('modalStoreSelect').value;
      const obs = document.getElementById('customerObs').value.trim();

      const store = STORES[selectedStore] || STORES['itaitinga'];
      const cakeName = selectedProductForOrder ? selectedProductForOrder.name : 'um bolo delicioso';
      const cakePrice = selectedProductForOrder ? `(R$ ${selectedProductForOrder.price.toFixed(2).replace('.', ',')})` : '';

      let message = `*Olá, Que Delícia! Bolos Caseiros!* 🍰✨\n\n`;
      message += `Vim através do site oficial e gostaria de fazer um pedido para a *${store.name}*:\n`;
      message += `📌 *Item:* ${cakeName} ${cakePrice}\n`;
      if (customerName) message += `👤 *Cliente:* ${customerName}\n`;
      if (obs) message += `📝 *Observações:* ${obs}\n`;
      message += `\n*Pode confirmar a disponibilidade e o valor do frete/retirada?* 🚀`;

      const encodedMsg = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/${store.phone}?text=${encodedMsg}`;

      window.open(whatsappUrl, '_blank');
      closeOrderModal();
      showToast('Redirecionando para o WhatsApp da loja...');
    });
  }

  // Quick Action Buttons
  document.querySelectorAll('.open-custom-whatsapp').forEach(btn => {
    btn.addEventListener('click', () => {
      openOrderModal(null);
    });
  });

  // Toast Notification System
  function showToast(message) {
    if (!toastNotification) return;
    toastNotification.querySelector('.toast-text').textContent = message;
    toastNotification.classList.add('show');
    setTimeout(() => {
      toastNotification.classList.remove('show');
    }, 3500);
  }

  // FAQ Accordion Toggle
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      faqItems.forEach(i => i.classList.remove('active'));
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  // Countdown Timer for Special Combo
  function startCountdown() {
    const hoursEl = document.getElementById('timerHours');
    const minutesEl = document.getElementById('timerMinutes');
    const secondsEl = document.getElementById('timerSeconds');

    if (!hoursEl || !minutesEl || !secondsEl) return;

    let totalSeconds = 4 * 3600 + 45 * 60 + 30; // 04h 45m 30s

    setInterval(() => {
      if (totalSeconds <= 0) totalSeconds = 5 * 3600;
      totalSeconds--;

      const h = Math.floor(totalSeconds / 3600);
      const m = Math.floor((totalSeconds % 3600) / 60);
      const s = totalSeconds % 60;

      hoursEl.textContent = String(h).padStart(2, '0');
      minutesEl.textContent = String(m).padStart(2, '0');
      secondsEl.textContent = String(s).padStart(2, '0');
    }, 1000);
  }

  // Render initial catalog
  renderProducts(PRODUCTS);
  startCountdown();
});
