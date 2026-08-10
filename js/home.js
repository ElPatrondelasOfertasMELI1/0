// =====================================================
// ⚡ EL PATRÓN DE LAS OFERTAS
// HOME.JS
// Página principal — NUEVO PROYECTO
// =====================================================
document.addEventListener("DOMContentLoaded", () => {
    console.log("⚡ HOME.JS CARGADO CORRECTAMENTE");
    // =================================================
    // ELEMENTOS
    // =================================================
    const toast = document.getElementById("toast");
    const registerRewardBtn =
        document.getElementById("registerRewardBtn");
    const accountBtn =
        document.getElementById("accountBtn");
    const userBtn =
        document.getElementById("userBtn");
    const promoBtn =
        document.querySelector(".promo-btn");
    // =================================================
    // TOAST
    // =================================================
    function mostrarToast(mensaje) {
        if (!toast) return;
        toast.textContent = mensaje;
        toast.classList.add("show");
        setTimeout(() => {
            toast.classList.remove("show");
        }, 2500);
    }
    // =================================================
    // NAVEGACIÓN DE USUARIO
    // =================================================
    function abrirCuenta() {
        const cuenta =
            document.getElementById("mi-cuenta");
        if (cuenta) {
            cuenta.scrollIntoView({
                behavior: "smooth"
            });
        }
        mostrarToast("👤 Próximamente podrás crear tu cuenta");
    }
    userBtn?.addEventListener(
        "click",
        abrirCuenta
    );
    accountBtn?.addEventListener(
        "click",
        abrirCuenta
    );
    registerRewardBtn?.addEventListener(
        "click",
        abrirCuenta
    );
    // =================================================
    // MERCADO PAGO
    // =================================================
    promoBtn?.addEventListener(
        "click",
        () => {
            mostrarToast(
                "💳 Beneficio Mercado Pago próximamente"
            );
        }
    );
    // =================================================
    // REGISTRO DE VISITAS LOCAL
    // =================================================
    registrarVisita();
    // =================================================
    // CARGAR CUPONES
    // =================================================
    cargarCuponesIniciales();
});
// =====================================================
// VISITAS
// =====================================================
function registrarVisita() {
    let visitas =
        parseInt(
            localStorage.getItem("visitasPatron")
        ) || 0;
    visitas++;
    localStorage.setItem(
        "visitasPatron",
        visitas
    );
    console.log(
        "👀 Visita:",
        visitas
    );
}
// =====================================================
// CUPONES INICIALES
// =====================================================
function cargarCuponesIniciales() {
    const relampago =
        document.getElementById(
            "relampagoCarousel"
        );
    const exclusivos =
        document.getElementById(
            "exclusivosGrid"
        );
    const bancarios =
        document.getElementById(
            "bancariosGrid"
        );
    // -----------------------------------------------
    // Por ahora no conectamos Firebase.
    // -----------------------------------------------
    console.log(
        "🎟️ Sistema de cupones preparado"
    );
    // Las secciones permanecen mostrando
    // "Cargando cupones..." hasta conectar
    // cupones.js.
    if (relampago) {
        relampago.dataset.cargado =
            "true";
    }
    if (exclusivos) {
        exclusivos.dataset.cargado =
            "true";
    }
    if (bancarios) {
        bancarios.dataset.cargado =
            "true";
    }
}
// =====================================================
// FUNCIÓN GLOBAL PARA CUPONES
// =====================================================
// La utilizaremos después desde cupones.js
window.mostrarToast =
function(mensaje) {
    const toast =
        document.getElementById("toast");
    if (!toast) return;
    toast.textContent =
        mensaje;
    toast.classList.add("show");
    setTimeout(() => {
        toast.classList.remove("show");
    }, 2500);
};
// =====================================================
// FUNCIÓN GLOBAL PARA ABRIR MERCADO LIBRE
// =====================================================
// La conexión definitiva con tu enlace de afiliado
// la pondremos en mercado-libre.js.
//
// Esta función queda preparada para no romper
// la página mientras desarrollamos el sistema.
//
window.abrirMercadoLibre =
function(link) {
    if (!link) {
        mostrarToast(
            "❌ Enlace no disponible"
        );
        return;
    }
    window.location.href =
        link;
};
// =====================================================
// FIN HOME.JS
// =====================================================
console.log(
    "⚡ El Patrón de las Ofertas — HOME.JS listo"
);