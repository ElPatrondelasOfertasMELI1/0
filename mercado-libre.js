// =====================================================
// ⚡ EL PATRÓN DE LAS OFERTAS
// MERCADO-LIBRE.JS
// Copiar cupón + abrir Mercado Libre
// =====================================================
console.log("🛒 MERCADO-LIBRE.JS CARGADO");
// =====================================================
// CONFIGURACIÓN
// =====================================================
const ENLACE_AFILIADO =
    "https://meli.la/1mj3itE";
// =====================================================
// DETECTAR DISPOSITIVO
// =====================================================
function esAndroid() {
    return /Android/i.test(
        navigator.userAgent
    );
}
function esIOS() {
    return /iPhone|iPad|iPod/i.test(
        navigator.userAgent
    );
}
// =====================================================
// ABRIR MERCADO LIBRE
// =====================================================
function abrirMercadoLibre(
    link = ENLACE_AFILIADO
) {
    if (
        !link ||
        link === "#"
    ) {
        if (window.mostrarToast) {
            window.mostrarToast(
                "⚠️ Enlace de Mercado Libre pendiente"
            );
        }
        return;
    }
    console.log(
        "🛒 Abriendo Mercado Libre:",
        link
    );
    // =================================================
    // ANDROID
    // =================================================
    if (esAndroid()) {
        try {
            const url =
                new URL(link);
            const intentURL =
                "intent://" +
                url.host +
                url.pathname +
                url.search +
                "#Intent;" +
                "scheme=https;" +
                "package=com.mercadolibre;" +
                "S.browser_fallback_url=" +
                encodeURIComponent(link) +
                ";end";
            window.location.href =
                intentURL;
            return;
        }
        catch (error) {
            console.warn(
                "⚠️ No se pudo crear intent:",
                error
            );
        }
    }
    // =================================================
    // iPHONE / iPAD
    // =================================================
    if (esIOS()) {
        /*
         * iOS decide si el enlace puede abrir
         * directamente la aplicación.
         *
         * Conservamos el enlace de afiliado.
         */
        window.location.href =
            link;
        return;
    }
    // =================================================
    // COMPUTADORA
    // =================================================
    window.location.href =
        link;
}
// =====================================================
// COPIAR CUPÓN + REGISTRAR + ABRIR
// =====================================================
async function copiarYabrirMercadoLibre(
    codigo,
    link = ENLACE_AFILIADO
) {
    if (!codigo) {
        if (window.mostrarToast) {
            window.mostrarToast(
                "❌ Cupón no disponible"
            );
        }
        return;
    }
    try {
        // =================================================
        // COPIAR CUPÓN
        // =================================================
        await navigator.clipboard.writeText(
            codigo
        );
        console.log(
            "📋 Cupón copiado:",
            codigo
        );
        // =================================================
        // ESTADÍSTICA GENERAL LOCAL
        // =================================================
        let copias =
            parseInt(
                localStorage.getItem(
                    "copiasPatron"
                )
            ) || 0;
        copias++;
        localStorage.setItem(
            "copiasPatron",
            copias
        );
        // =================================================
        // ESTADÍSTICA DEL USUARIO
        // =================================================
        if (
            typeof window.registrarCopiaUsuario
            === "function"
        ) {
            window.registrarCopiaUsuario();
        }
        // =================================================
        // MENSAJE
        // =================================================
        if (window.mostrarToast) {
            window.mostrarToast(
                "✅ Cupón copiado"
            );
        }
        // =================================================
        // ABRIR MERCADO LIBRE
        // =================================================
        setTimeout(() => {
            abrirMercadoLibre(
                link
            );
        }, 250);
    }
    catch (error) {
        console.error(
            "❌ Error al copiar:",
            error
        );
        if (window.mostrarToast) {
            window.mostrarToast(
                "❌ No se pudo copiar el cupón"
            );
        }
    }
}
// =====================================================
// FUNCIONES GLOBALES
// =====================================================
window.abrirMercadoLibre =
    abrirMercadoLibre;
window.copiarYabrirMercadoLibre =
    copiarYabrirMercadoLibre;
// =====================================================
// FIN
// =====================================================
console.log(
    "🛒 Sistema Mercado Libre preparado"
);