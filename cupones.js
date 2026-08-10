// ======================================================
// EL PATRÓN DE LAS OFERTAS
// cupones.js
// ======================================================

import {
  getCoupons,
  registerCouponCopy,
  registerCouponClick
} from "./firebase.js";

import {
  uppercase,
  openLink,
  formatCurrency
} from "./app.js";

// ======================================================
// INIT
// ======================================================

document.addEventListener(
  "DOMContentLoaded",
  loadCoupons
);

// ======================================================
// CARGAR CUPONES
// ======================================================

async function loadCoupons() {

  try {

    const coupons =
      await getCoupons();

    if (!coupons.length) {

      loadDemoCoupons();

      return;

    }

    renderMainCarousel(
      coupons
    );

    renderSections(
      coupons
    );

  } catch (error) {

    console.error(
      "Error cargando cupones",
      error
    );

    loadDemoCoupons();

  }

}

// ======================================================
// DEMO
// ======================================================

function loadDemoCoupons() {

  const demo = [

    {
      id: "1",
      nombre: "Cupón Relámpago",
      codigo: "MELI800",
      descuento: 800,
      minimo: 8000,
      tope: 800,
      tipo: "RELAMPAGO",
      estado: "POR_AGOTARSE",
      link:
        "https://mercadolibre.com.mx"
    },

    {
      id: "2",
      nombre: "Meli+",
      codigo: "MELIPLUS",
      descuento: 500,
      minimo: 5000,
      tope: 500,
      tipo: "EXCLUSIVO",
      estado: "ACTIVO",
      link:
        "https://mercadolibre.com.mx"
    },

    {
      id: "3",
      nombre: "BBVA",
      codigo: "BBVAGOL",
      descuento: 1000,
      minimo: 10000,
      tope: 1000,
      tipo: "BANCARIO",
      estado: "ACTIVO",
      link:
        "https://mercadolibre.com.mx"
    }

  ];

  renderMainCarousel(
    demo
  );

  renderSections(
    demo
  );

}

// ======================================================
// CARRUSEL PRINCIPAL
// ======================================================

function renderMainCarousel(
  coupons
) {

  const container =
    document.getElementById(
      "mainCouponsCarousel"
    );

  if (!container) return;

  container.innerHTML = "";

  coupons.forEach(coupon => {

    const card =
      createCouponCard(
        coupon
      );

    container.appendChild(
      card
    );

  });

}

// ======================================================
// SECCIONES
// ======================================================

function renderSections(
  coupons
) {

  const relampago =
    document.getElementById(
      "relampagoContainer"
    );

  const exclusivos =
    document.getElementById(
      "exclusivosContainer"
    );

  const bancarios =
    document.getElementById(
      "bancariosContainer"
    );

  if (relampago)
    relampago.innerHTML = "";

  if (exclusivos)
    exclusivos.innerHTML = "";

  if (bancarios)
    bancarios.innerHTML = "";

  coupons.forEach(coupon => {

    const card =
      createCouponCard(
        coupon
      );

    switch (
      coupon.tipo
    ) {

      case "RELAMPAGO":

        relampago?.appendChild(
          card
        );

        break;

      case "EXCLUSIVO":

        exclusivos?.appendChild(
          card
        );

        break;

      case "BANCARIO":

        bancarios?.appendChild(
          card
        );

        break;

    }

  });

}

// ======================================================
// CARD
// ======================================================

function createCouponCard(
  coupon
) {

  const card =
    document.createElement(
      "div"
    );

  card.className =
    "coupon-card";

  const status =
    getStatusData(
      coupon.estado
    );

  card.innerHTML = `

    <div class="coupon-status ${status.class}">
      ${status.label}
    </div>

    <div class="coupon-icon">
      🎟️
    </div>

    <div class="coupon-discount">
      ${formatCurrency(
        coupon.descuento || 0
      )} OFF
    </div>

    <div class="coupon-min">
      Compra mínima:
      <strong>
        ${formatCurrency(
          coupon.minimo || 0
        )}
      </strong>
    </div>

    <div class="coupon-code-box">

      <div class="coupon-code-label">
        Código
      </div>

      <div class="coupon-code">
        ${uppercase(
          coupon.codigo
        )}
      </div>

    </div>

    <div class="coupon-details">

      <div>
        <span>Tope</span>
        <strong>
          ${formatCurrency(
            coupon.tope || 0
          )}
        </strong>
      </div>

      <div>
        <span>Copias</span>
        <strong>
          ${coupon.copias || 0}
        </strong>
      </div>

    </div>

    <button
      class="copy-btn"
    >
      📋 COPIAR CUPÓN
    </button>

  `;

  const button =
    card.querySelector(
      ".copy-btn"
    );

  button.addEventListener(
    "click",
    () =>
      copyCoupon(
        coupon
      )
  );

  return card;

}

// ======================================================
// COPIAR CUPÓN
// ======================================================

async function copyCoupon(
  coupon
) {

  try {

    const code =
      uppercase(
        coupon.codigo
      );

    await navigator.clipboard.writeText(
      code
    );

    if (
      window.showToast
    ) {

      window.showToast(
        "✅ CUPÓN COPIADO"
      );

    }

    await registerCouponCopy(
      coupon.id,
      code,
      coupon.descuento || 0
    );

    await registerCouponClick(
      coupon.id
    );

    setTimeout(
      () => {

        const url =
          getCouponLink(
            coupon
          );

        openLink(
          url
        );

      },
      500
    );

  } catch (error) {

    console.error(
      error
    );

    alert(
      "No fue posible copiar el cupón"
    );

  }

}

// ======================================================
// LINK
// ======================================================

function getCouponLink(
  coupon
) {

  if (
    Array.isArray(
      coupon.links
    ) &&
    coupon.links.length
  ) {

    const active =
      coupon.links.find(
        item =>
          item.activo
      );

    if (
      active?.url
    )
      return active.url;

  }

  return (
    coupon.link ||
    "https://mercadolibre.com.mx"
  );

}

// ======================================================
// ESTADOS
// ======================================================

function getStatusData(
  status
) {

  switch (
    status
  ) {

    case "ACTIVO":

      return {
        class:
          "status-active",
        label:
          "🟢 ACTIVO"
      };

    case "POR_AGOTARSE":

      return {
        class:
          "status-warning",
        label:
          "🔥 POR AGOTARSE"
      };

    case "AGOTADO":

      return {
        class:
          "status-danger",
        label:
          "🔴 AGOTADO"
      };

    case "PROXIMAMENTE":

      return {
        class:
          "status-soon",
        label:
          "⏰ PRÓXIMAMENTE"
      };

    default:

      return {
        class:
          "status-active",
        label:
          "🟢 ACTIVO"
      };

  }

}

// ======================================================
// EXPORTS
// ======================================================

export {
  loadCoupons,
  copyCoupon
};

console.log(
  "✅ cupones.js cargado"
);