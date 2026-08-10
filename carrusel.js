// =====================================================
// ⚡ EL PATRÓN DE LAS OFERTAS
// CARRUSEL.JS
// Carrusel profesional de cupones relámpago
// =====================================================
console.log("🎠 CARRUSEL.JS CARGADO");
document.addEventListener("DOMContentLoaded", () => {
    const carrusel =
        document.getElementById("relampagoCarousel");
    if (!carrusel) {
        console.warn("⚠️ No se encontró el carrusel");
        return;
    }
    // =================================================
    // CONFIGURACIÓN
    // =================================================
    let posicion = 0;
    let intervalo = null;
    let pausado = false;
    const velocidad = 3500;
    // =================================================
    // OBTENER TARJETAS
    // =================================================
    function obtenerTarjetas() {
        return Array.from(
            carrusel.querySelectorAll(".coupon-card")
        );
    }
    // =================================================
    // CALCULAR ANCHO
    // =================================================
    function obtenerPaso() {
        const tarjeta =
            carrusel.querySelector(".coupon-card");
        if (!tarjeta) return 0;
        const estilos =
            window.getComputedStyle(carrusel);
        const gap =
            parseInt(estilos.gap) || 16;
        return tarjeta.offsetWidth + gap;
    }
    // =================================================
    // MOVER CARRUSEL
    // =================================================
    function moverSiguiente() {
        if (pausado) return;
        const tarjetas =
            obtenerTarjetas();
        if (tarjetas.length <= 1) return;
        const paso =
            obtenerPaso();
        if (!paso) return;
        const maxScroll =
            carrusel.scrollWidth -
            carrusel.clientWidth;
        if (
            carrusel.scrollLeft >=
            maxScroll - 10
        ) {
            carrusel.scrollTo({
                left: 0,
                behavior: "smooth"
            });
            posicion = 0;
            return;
        }
        posicion++;
        carrusel.scrollTo({
            left:
                posicion * paso,
            behavior:
                "smooth"
        });
    }
    // =================================================
    // INICIAR AUTOMÁTICO
    // =================================================
    function iniciar() {
        detener();
        intervalo =
            setInterval(
                moverSiguiente,
                velocidad
            );
    }
    // =================================================
    // DETENER
    // =================================================
    function detener() {
        if (intervalo) {
            clearInterval(
                intervalo
            );
            intervalo = null;
        }
    }
    // =================================================
    // PAUSA AL TOCAR
    // =================================================
    carrusel.addEventListener(
        "touchstart",
        () => {
            pausado = true;
            detener();
        },
        {
            passive: true
        }
    );
    carrusel.addEventListener(
        "touchend",
        () => {
            setTimeout(() => {
                pausado = false;
                iniciar();
            }, 1500);
        },
        {
            passive: true
        }
    );
    // =================================================
    // PAUSA CON MOUSE
    // =================================================
    carrusel.addEventListener(
        "mouseenter",
        () => {
            pausado = true;
            detener();
        }
    );
    carrusel.addEventListener(
        "mouseleave",
        () => {
            pausado = false;
            iniciar();
        }
    );
    
    // =================================================
    // REINICIAR CUANDO CAMBIA EL TAMAÑO
    // =================================================
    window.addEventListener(
        "resize",
        () => {
            posicion = 0;
            carrusel.scrollTo({
                left: 0,
                behavior: "auto"
            });
        }
    );
    // =================================================
    // ESPERAR A QUE APAREZCAN LOS CUPONES
    // =================================================
    function esperarCupones() {
        const tarjetas =
            obtenerTarjetas();
        if (tarjetas.length > 0) {
            console.log(
                "🎠 Carrusel listo:",
                tarjetas.length,
                "cupones"
            );
            iniciar();
            return;
        }
        setTimeout(
            esperarCupones,
            500
        );
    }
    esperarCupones();
});