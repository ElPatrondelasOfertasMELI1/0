// ======================================================
// EL PATRÓN DE LAS OFERTAS
// app.js
// ======================================================

import {
  watchAuth,
  createUserDocument,
  getBannerConfig,
  getUser
} from "./firebase.js";

// ======================================================
// ESTADO GLOBAL
// ======================================================

window.APP = {

  user: null,

  profile: null,

  initialized: false

};


// ======================================================
// INIT
// ======================================================

document.addEventListener(
  "DOMContentLoaded",
  initApp
);

async function initApp() {

  initMobileMenu();

  initToast();

  await loadBanner();

  setupAuth();

  registerVisit();

  window.APP.initialized = true;

  console.log(
    "⚡ El Patrón de las Ofertas iniciado"
  );

}


// ======================================================
// MENÚ MÓVIL
// ======================================================

function initMobileMenu() {

  const button =
    document.getElementById(
      "mobileMenuBtn"
    );

  const menu =
    document.getElementById(
      "mobileMenu"
    );

  if (!button || !menu) return;

  button.addEventListener(
    "click",
    () => {

      menu.classList.toggle(
        "active"
      );

    }
  );

}


// ======================================================
// AUTH
// ======================================================

function setupAuth() {

  watchAuth(
    async user => {

      if (!user) {

        window.APP.user = null;
        window.APP.profile = null;

        updateAccountLinks();

        return;

      }

      window.APP.user = user;

      await createUserDocument(user);

      const profile =
        await getUser(user.uid);

      window.APP.profile = profile;

      updateAccountLinks();

      updateRewards();

    }
  );

}


// ======================================================
// ACTUALIZAR LINKS
// ======================================================

function updateAccountLinks() {

  const links =
    document.querySelectorAll(
      ".btn-account"
    );

  links.forEach(link => {

    if (window.APP.user) {

      link.innerHTML =
        "👤 Mi Cuenta";

    } else {

      link.innerHTML =
        "🔑 Ingresar";

    }

  });

}


// ======================================================
// BANNER FIREBASE
// ======================================================

async function loadBanner() {

  const banner =
    await getBannerConfig();

  if (!banner) return;

  const section =
    document.getElementById(
      "mercadoPagoBanner"
    );

  if (!section) return;

  if (banner.activo === false) {

    section.style.display =
      "none";

    return;

  }

  const title =
    document.getElementById(
      "bannerTitle"
    );

  const description =
    document.getElementById(
      "bannerDescription"
    );

  const button =
    document.getElementById(
      "bannerButton"
    );

  if (title)
    title.textContent =
      banner.titulo || "";

  if (description)
    description.textContent =
      banner.descripcion || "";

  if (button) {

    button.textContent =
      banner.textoBoton ||
      "VER BENEFICIO";

    button.href =
      banner.link || "#";

  }

}


// ======================================================
// VISITA
// ======================================================

function registerVisit() {

  let visits = parseInt(
    localStorage.getItem(
      "epdo_visits"
    ) || "0"
  );

  visits++;

  localStorage.setItem(
    "epdo_visits",
    visits
  );

}


// ======================================================
// RECOMPENSAS
// ======================================================

function updateRewards() {

  const profile =
    window.APP.profile;

  if (!profile) return;

  const copies =
    profile.copias || 0;

  const savings =
    profile.ahorro || 0;

  const visits =
    profile.visitas || 0;

  const level =
    calculateLevel(
      copies
    );

  const totalVisits =
    document.getElementById(
      "totalVisits"
    );

  const totalCopies =
    document.getElementById(
      "totalCopies"
    );

  const totalSavings =
    document.getElementById(
      "totalSavings"
    );

  const userLevel =
    document.getElementById(
      "userLevel"
    );

  if (totalVisits)
    totalVisits.textContent =
      formatNumber(visits);

  if (totalCopies)
    totalCopies.textContent =
      formatNumber(copies);

  if (totalSavings)
    totalSavings.textContent =
      formatCurrency(
        savings
      );

  if (userLevel)
    userLevel.textContent =
      level;

}


// ======================================================
// NIVELES
// ======================================================

function calculateLevel(
  copies
) {

  if (copies >= 500)
    return "💎 VIP";

  if (copies >= 200)
    return "🥇 ORO";

  if (copies >= 50)
    return "🥈 PLATA";

  return "🥉 BÁSICO";

}


// ======================================================
// TOAST
// ======================================================

function initToast() {

  window.showToast =
    function (
      message =
        "Operación realizada"
    ) {

      const toast =
        document.getElementById(
          "toast"
        );

      if (!toast) return;

      toast.textContent =
        message;

      toast.classList.add(
        "show"
      );

      setTimeout(
        () => {

          toast.classList.remove(
            "show"
          );

        },
        2500
      );

    };

}


// ======================================================
// HELPERS
// ======================================================

export function formatCurrency(
  value
) {

  return new Intl.NumberFormat(
    "es-MX",
    {
      style: "currency",
      currency: "MXN",
      maximumFractionDigits: 0
    }
  ).format(
    Number(value || 0)
  );

}


export function formatNumber(
  value
) {

  return new Intl.NumberFormat(
    "es-MX"
  ).format(
    Number(value || 0)
  );

}


export function uppercase(
  text
) {

  return String(
    text || ""
  )
    .trim()
    .toUpperCase();

}


// ======================================================
// MERCADO LIBRE
// ======================================================

export function openLink(
  url
) {

  if (!url) return;

  try {

    window.open(
      url,
      "_blank"
    );

  } catch {

    location.href =
      url;

  }

}


// ======================================================
// EVENTOS GLOBALES
// ======================================================

window.addEventListener(
  "error",
  error => {

    console.error(
      "Error global:",
      error
    );

  }
);

window.addEventListener(
  "unhandledrejection",
  error => {

    console.error(
      "Promise Error:",
      error
    );

  }
);

console.log(
  "✅ app.js cargado"
);