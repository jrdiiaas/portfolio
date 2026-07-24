/*
  Branding Book & Media Kit - Gaby Vital (@gabylimav_) ✨
  Interactive Logic, Mobile Drawer, Counter Animations, Calculator & WhatsApp Integration
*/

document.addEventListener('DOMContentLoaded', () => {
  initNavbarScroll();
});

// 1. Navbar Scroll Class Toggle & Mobile Menu
function initNavbarScroll() {
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

function toggleMobileNav() {
  const drawer = document.getElementById('mobileMenuDrawer');
  const toggleBtn = document.getElementById('mobileToggle');
  const isExpanded = drawer.classList.contains('active');

  if (isExpanded) {
    closeMobileNav();
  } else {
    drawer.classList.add('active');
    toggleBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    document.body.style.overflow = 'hidden';
  }
}

function closeMobileNav() {
  const drawer = document.getElementById('mobileMenuDrawer');
  const toggleBtn = document.getElementById('mobileToggle');
  drawer.classList.remove('active');
  toggleBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
  document.body.style.overflow = 'auto';
}

// 2. Pillars Tab Switcher Data & Logic
const pillarsData = {
  reels: {
    title: '📹 Reels & TikTok Criativo',
    desc: 'Vídeo dinâmico de 30s a 60s com edição ágil, efeitos sonoros imersivos e roteiro focado em engajamento e retenção máxima da audiência.',
    img: 'assets/lifestyle.png',
    bullets: [
      'Roteiro autoral alinhado previamente com a marca',
      'Edição dinâmica com legendas e estética moderna',
      'Direitos de tráfego pago e impulsionamento (opcional)'
    ],
    btnText: 'Solicitar Orçamento de Reels',
    formatName: 'Reels Criativo'
  },
  stories: {
    title: '📸 Sequência de Stories Digest',
    desc: 'Combo de 3 a 6 telas sequenciais com storytelling fluido, teste/uso do produto no dia a dia, sticker de link direto e cupom exclusivo.',
    img: 'assets/hero.png',
    bullets: [
      'Provador real e demonstração prática do produto',
      'Link direto rastreável para mensurar conversão',
      'Interação com enquetes e caixas de perguntas'
    ],
    btnText: 'Solicitar Sequência de Stories',
    formatName: 'Sequência de Stories'
  },
  vip: {
    title: '🥂 Presença VIP & Cobertura de Eventos',
    desc: 'Gaby Vital presente em inaugurações, lançamentos de coleções ou feiras regionais, atração de público e registro de bastidores.',
    img: 'assets/western.png',
    bullets: [
      'Entrevistas e interação presencial com convidados',
      'Cobertura ao vivo nos Stories durante o evento',
      'Sessão de fotos e gravação de Reels com a marca'
    ],
    btnText: 'Contratar Presença VIP',
    formatName: 'Presença VIP em Evento'
  },
  ambassador: {
    title: '👑 Embaixadoria de Marca 360°',
    desc: 'Parceria continuada de 3 a 12 meses. A marca ganha um rosto autêntico, exclusivo no segmento e com presença constante no canal.',
    img: 'assets/gala.png',
    bullets: [
      'Exclusividade de segmento regional',
      'Direito de uso de imagem para mídia online e offline',
      'Publicações mensais estratégicas com alinhamento de KPIs'
    ],
    btnText: 'Solicitar Proposta de Embaixadoria',
    formatName: 'Embaixadoria 360°'
  }
};

function switchPillar(key, element) {
  const display = document.getElementById('pillar-content-display');
  const data = pillarsData[key];
  if (!data) return;

  // Update active button UI
  const buttons = document.querySelectorAll('.pillars-tabs .tab-btn');
  buttons.forEach(btn => btn.classList.remove('active'));
  if (element) {
    element.classList.add('active');
  }

  // Render HTML
  display.innerHTML = `
    <div class="pillar-content-card">
      <img src="${data.img}" alt="${data.title}" class="pillar-img">
      <div class="pillar-info">
        <h3>${data.title}</h3>
        <p class="pillar-desc">${data.desc}</p>
        <ul class="pillar-bullets">
          ${data.bullets.map(b => `<li><i class="fa-solid fa-check"></i> ${b}</li>`).join('')}
        </ul>
        <button class="btn btn-primary" style="width: 100%;" onclick="openBriefingModal('${data.formatName}')">${data.btnText}</button>
      </div>
    </div>
  `;
}

// 3. Calculator State & Logic
let currentTotal = 1650; // Initial default sum of selected options
const selectedItems = new Set(['Reels Exclusivo', 'Sequencia 3 Stories']);

function toggleCalcOption(element, price) {
  const itemName = element.getAttribute('data-item');
  const icon = element.querySelector('i');

  if (element.classList.contains('selected')) {
    element.classList.remove('selected');
    icon.className = 'fa-regular fa-circle';
    currentTotal -= price;
    selectedItems.delete(itemName);
  } else {
    element.classList.add('selected');
    icon.className = 'fa-solid fa-circle-check text-gradient';
    currentTotal += price;
    selectedItems.add(itemName);
  }

  // Format currency
  document.getElementById('calc-total-price').innerText = `R$ ${currentTotal.toLocaleString('pt-BR')}`;
}

// 4. Modal Briefing Form Logic
function openBriefingModal(packageName = '') {
  const modal = document.getElementById('briefingModal');
  const select = document.getElementById('packageSelect');
  
  if (packageName && select) {
    for (let i = 0; i < select.options.length; i++) {
      if (select.options[i].value.toLowerCase().includes(packageName.toLowerCase())) {
        select.selectedIndex = i;
        break;
      }
    }
  }

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeBriefingModal() {
  const modal = document.getElementById('briefingModal');
  modal.classList.remove('active');
  document.body.style.overflow = 'auto';
}

function handleOverlayClick(event) {
  if (event.target.id === 'briefingModal') {
    closeBriefingModal();
  }
}

function handleBriefingSubmit(event) {
  event.preventDefault();

  const brandName = document.getElementById('brandName').value.trim();
  const contactName = document.getElementById('contactName').value.trim();
  const contactPhone = document.getElementById('contactPhone').value.trim();
  const packageSelect = document.getElementById('packageSelect').value;
  const briefingMessage = document.getElementById('briefingMessage').value.trim();

  const text = `✨ *NOVO BRIEFING DE PARCERIA - MEDIA KIT GABY VITAL* ✨%0A%0A` +
               `🏢 *Empresa / Marca:* ${encodeURIComponent(brandName)}%0A` +
               `👤 *Responsável:* ${encodeURIComponent(contactName)}%0A` +
               `📱 *Contato:* ${encodeURIComponent(contactPhone)}%0A` +
               `🎯 *Formato Desejado:* ${encodeURIComponent(packageSelect)}%0A` +
               `💬 *Mensagem / Briefing:* ${encodeURIComponent(briefingMessage || 'Gostaria de receber uma proposta comercial oficial.')}%0A%0A` +
               `_Enviado através da Landing Page Oficial Gaby Vital ✨_`;

  window.open(`https://wa.me/5585999999999?text=${text}`, '_blank');
  closeBriefingModal();
}

function sendCalculatedBriefing() {
  const itemsArray = Array.from(selectedItems).join(', ');
  const text = `✨ *ORÇAMENTO PERSONALIZADO - SIMULADOR GABY VITAL* ✨%0A%0A` +
               `📦 *Entregáveis Selecionados:* ${encodeURIComponent(itemsArray || 'Combo Customizado')}%0A` +
               `💰 *Estimativa Total:* R$ ${currentTotal.toLocaleString('pt-BR')}%0A%0A` +
               `Olá Gaby! Montei essa proposta no seu site e gostaria de verificar disponibilidade de agenda!`;

  window.open(`https://wa.me/5585999999999?text=${text}`, '_blank');
}

// 5. Lightbox Zoom
function openLightbox(imgSrc) {
  const modal = document.getElementById('lightboxModal');
  const img = document.getElementById('lightboxImg');
  img.src = imgSrc;
  modal.classList.add('active');
}

function closeLightbox() {
  const modal = document.getElementById('lightboxModal');
  modal.classList.remove('active');
}

// 6. Media Kit PDF Trigger
function generateMediaKitPDF() {
  alert("Gerando o arquivo PDF completo do Media Kit de Gaby Vital para impressão e download...");
  window.print();
}
