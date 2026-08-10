// =====================================================
// ⚡ EL PATRÓN DE LAS OFERTAS
// CUPONES.JS
// Sistema independiente de cupones
// =====================================================
console.log("🎟️ CUPONES.JS CARGADO");
// =====================================================
// CONFIGURACIÓN
// =====================================================
// Aquí colocaremos después tus cupones reales.
const CUPONES = {
    relampago: [
        {
            nombre: "Cupón Relámpago",
            codigo: "RELAMPAGO",
            descuento: "$88 OFF",
            minimo: "$700",
            estado: "🟢 DISPONIBLE",
            link: "https://meli.la/1mj3itE"
        },
        {
            nombre: "Cupón Relámpago",
            codigo: "RELAMPAGO",
            descuento: "$175 OFF",
            minimo: "$1,400",
            estado: "🟢 DISPONIBLE",
            link: "https://meli.la/1mj3itE"
        },
        {
            nombre: "Cupón Relámpago",
            codigo: "RELAMPAGO",
            descuento: "$313 OFF",
            minimo: "$2,500",
            estado: "⚡ POR AGOTARSE",
            link: "https://meli.la/1mj3itE"
        }
    ],
    exclusivos: [
        {
            nombre: "Cupón Exclusivo",
            codigo: "EXCLUSIVO",
            descuento: "$500 OFF",
            minimo: "$4,000",
            estado: "🟢 DISPONIBLE",
            link: "https://meli.la/1mj3itE"
        }
    ],
    bancarios: [
        {
            nombre: "Cupón Bancario",
            codigo: "BANCO",
            descuento: "10% OFF",
            minimo: "$2,500",
            tope: "$1,000",
            estado: "🟢 DISPONIBLE",
            link: "https://meli.la/1mj3itE"
        }
    ]
};
// =====================================================
// CREAR TARJETA
// =====================================================
function crearTarjetaCupon(cupon) {
    const tarjeta =
        document.createElement("article");
    tarjeta.className =
        "coupon-card";
    tarjeta.innerHTML = `
        <div class="coupon-status">
            ${cupon.estado}
        </div>
        <div class="coupon-icon">
            🎟️
        </div>
        <h3>
            ${cupon.nombre}
        </h3>
        <div class="coupon-discount">
            ${cupon.descuento}
        </div>
        <div class="coupon-info">
            🛒 Compra mínima:
            <strong>
                ${cupon.minimo}
            </strong>
        </div>
        ${
            cupon.tope
            ?
            `
            <div class="coupon-info">
                🔝 Tope:
                <strong>
                    ${cupon.tope}
                </strong>
            </div>
            `
            :
            ""
        }
        <button
            class="coupon-copy"
            type="button"
        >
            📋 COPIAR CUPÓN
        </button>
    `;
    // =================================================
    // BOTÓN CUPÓN
    // =================================================
    // =================================================
// BOTÓN CUPÓN
// =================================================
const boton =
    tarjeta.querySelector(
        ".coupon-copy"
    );
boton.addEventListener(
    "click",
    () => {
        // =================================================
        // SISTEMA DE MERCADO LIBRE
        // Copia + estadísticas + apertura
        // =================================================
        if (
            typeof window.copiarYabrirMercadoLibre
            === "function"
        ) {
            window.copiarYabrirMercadoLibre(
                cupon.codigo,
                cupon.link
            );
        }
        else {
            console.error(
                "❌ mercado-libre.js no está cargado"
            );
            if (
                window.mostrarToast
            ) {
                window.mostrarToast(
                    "❌ Sistema de Mercado Libre no disponible"
                );
            }
        }
    }
);
    return tarjeta;
}
// =====================================================
// CARGAR RELÁMPAGO
// =====================================================
function cargarRelampagos() {
    const contenedor =
        document.getElementById(
            "relampagoCarousel"
        );
    if (!contenedor) return;
    contenedor.innerHTML = "";
    CUPONES.relampago.forEach(
        cupon => {
            contenedor.appendChild(
                crearTarjetaCupon(
                    cupon
                )
            );
        }
    );
}
// =====================================================
// CARGAR EXCLUSIVOS
// =====================================================
function cargarExclusivos() {
    const contenedor =
        document.getElementById(
            "exclusivosGrid"
        );
    if (!contenedor) return;
    contenedor.innerHTML = "";
    CUPONES.exclusivos.forEach(
        cupon => {
            contenedor.appendChild(
                crearTarjetaCupon(
                    cupon
                )
            );
        }
    );
}
// =====================================================
// CARGAR BANCARIOS
// =====================================================
function cargarBancarios() {
    const contenedor =
        document.getElementById(
            "bancariosGrid"
        );
    if (!contenedor) return;
    contenedor.innerHTML = "";
    CUPONES.bancarios.forEach(
        cupon => {
            contenedor.appendChild(
                crearTarjetaCupon(
                    cupon
                )
            );
        }
    );
}
// =====================================================
// INICIO
// =====================================================
document.addEventListener(
    "DOMContentLoaded",
    () => {
        cargarRelampagos();
        cargarExclusivos();
        cargarBancarios();
        console.log(
            "⚡ Cupones cargados correctamente"
        );
    }
);
// =====================================================
// FIN CUPONES.JS
// =====================================================