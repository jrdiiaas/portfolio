/* ==========================================================================
   MEGA FRETE TRANSPORTES - JAVASCRIPT INTERACTION & CALCULATOR LOGIC
   Official WhatsApp: (85) 9 9987-0060
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Sticky Header Scroll Effect
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // 2. Interactive Quote Calculator
  const calcForm = document.getElementById('freight-calc-form');
  const priceRangeElem = document.getElementById('price-estimate-range');
  const btnSendWhatsapp = document.getElementById('btn-send-whatsapp');

  function calculateEstimate() {
    if (!calcForm) return;

    const serviceType = document.querySelector('input[name="service_type"]:checked')?.value || 'mudanca';
    const volumeSize = document.getElementById('calc-volume')?.value || 'medio';
    const helpersCount = parseInt(document.getElementById('calc-helpers')?.value || '2', 10);
    
    // Additional options
    const packing = document.getElementById('chk-packing')?.checked;
    const assembly = document.getElementById('chk-assembly')?.checked;
    const stairs = document.getElementById('chk-stairs')?.checked;

    let baseMin = 150;
    let baseMax = 300;

    // Service base factors
    if (serviceType === 'mudanca') {
      baseMin = 350; baseMax = 650;
    } else if (serviceType === 'frete') {
      baseMin = 180; baseMax = 350;
    } else if (serviceType === 'empresa') {
      baseMin = 500; baseMax = 1200;
    } else if (serviceType === 'icamento') {
      baseMin = 400; baseMax = 800;
    }

    // Volume multiplier
    if (volumeSize === 'pequeno') {
      baseMin *= 0.8; baseMax *= 0.85;
    } else if (volumeSize === 'grande') {
      baseMin *= 1.5; baseMax *= 1.6;
    } else if (volumeSize === 'completo') {
      baseMin *= 2.2; baseMax *= 2.4;
    }

    // Helpers factor
    baseMin += helpersCount * 60;
    baseMax += helpersCount * 90;

    // Extras
    if (packing) { baseMin += 100; baseMax += 180; }
    if (assembly) { baseMin += 80; baseMax += 140; }
    if (stairs) { baseMin += 70; baseMax += 120; }

    const formattedMin = Math.round(baseMin);
    const formattedMax = Math.round(baseMax);

    if (priceRangeElem) {
      priceRangeElem.textContent = `R$ ${formattedMin} - R$ ${formattedMax}`;
    }
  }

  // Bind change listeners to form inputs
  if (calcForm) {
    calcForm.addEventListener('input', calculateEstimate);
    calcForm.addEventListener('change', calculateEstimate);
    calculateEstimate(); // Run initial calculation
  }

  // 3. WhatsApp Submission Handler (Official Number: 5585999870060)
  if (btnSendWhatsapp) {
    btnSendWhatsapp.addEventListener('click', (e) => {
      e.preventDefault();

      const origin = document.getElementById('calc-origin')?.value || 'Não informado';
      const destination = document.getElementById('calc-destination')?.value || 'Não informado';
      const serviceTypeInput = document.querySelector('input[name="service_type"]:checked');
      const serviceText = serviceTypeInput ? serviceTypeInput.parentElement.innerText.trim() : 'Mudança / Frete';
      const volumeSize = document.getElementById('calc-volume')?.selectedOptions[0]?.text || 'Médio';
      const helpersCount = document.getElementById('calc-helpers')?.value || '2';
      
      const extras = [];
      if (document.getElementById('chk-packing')?.checked) extras.push('Embalagem de Proteção');
      if (document.getElementById('chk-assembly')?.checked) extras.push('Montagem/Desmontagem');
      if (document.getElementById('chk-stairs')?.checked) extras.push('Acesso por Escada');

      const extrasText = extras.length > 0 ? extras.join(', ') : 'Nenhum adicional';
      const estimatedPrice = priceRangeElem ? priceRangeElem.textContent : 'Consulte';

      const whatsappMessage = `🚚 *SOLICITAÇÃO DE ORÇAMENTO - MEGA FRETE* 🚚\n\n` +
        `• *Serviço:* ${serviceText}\n` +
        `• *Origem:* ${origin}\n` +
        `• *Destino:* ${destination}\n` +
        `• *Tamanho da Carga:* ${volumeSize}\n` +
        `• *Ajudantes:* ${helpersCount} pessoas\n` +
        `• *Adicionais:* ${extrasText}\n` +
        `• *Estimativa:* ${estimatedPrice}\n\n` +
        `Gostaria de confirmar a disponibilidade e fechar este orçamento!`;

      const encodedMessage = encodeURIComponent(whatsappMessage);
      const whatsappUrl = `https://api.whatsapp.com/send?phone=5585999870060&text=${encodedMessage}`;
      
      window.open(whatsappUrl, '_blank');
    });
  }

  // 4. FAQ Accordion Toggle
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-question');
    if (btn) {
      btn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        faqItems.forEach(i => i.classList.remove('active'));
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });
});
