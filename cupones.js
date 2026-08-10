// =====================================================
// ⚡ EL PATRÓN DE LAS OFERTAS
// CUPONES.JS
// Sistema independiente de cupones
// =====================================================
console.log("🎟️ CUPONES.JS CARGADO");
// =====================================================
// CONFIGURACIÓN
// =====================================================
// IMPORTANTE:
// Aquí colocaremos después tus cupones reales.
//
// Por ahora usamos ejemplos para comprobar
// que todo el sistema funciona correctamente.
const CUPONES = {
    relampago: [
        {
            nombre: "Cupón Relámpago",
            codigo: "RELAMPAGO",
            descuento: "$88 OFF",
            minimo: "$700",
            estado: "🟢 DISPONIBLE",
            link: "#"
        },
        {
            nombre: "Cupón Relámpago",
            codigo: "RELAMPAGO",
            descuento: "$175 OFF",
            minimo: "$1,400",
            estado: "🟢 DISPONIBLE",
            link: "#"
        },
        {
            nombre: "Cupón Relámpago",
            codigo: "RELAMPAGO",
            descuento: "$313 OFF",
            minimo: "$2,500",
            estado: "⚡ POR AGOTARSE",
            link: "#"
        }
    ],
    exclusivos: [
        {
            nombre: "Cupón Exclusivo",
            codigo: "EXCLUSIVO",
            descuento: "$500 OFF",
            minimo: "$4,000",
            estado: "🟢 DISPONIBLE",
            link: "#"
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
            link: "#"
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
    const boton =
        tarjeta.querySelector(
            ".coupon-copy"
        );
    boton.addEventListener(
        "click",
        async () => {
            copiarCupon(
                cupon.codigo,
                cupon.link
            );
        }
    );
    return tarjeta;
}
// =====================================================
// COPIAR CUPÓN
// =====================================================
async function copiarCupon(
    codigo,
    link
) {
    try {
        await navigator.clipboard.writeText(
            codigo
        );
        // Guardar estadísticas locales
        registrarCopia();
        if (window.mostrarToast) {
            window.mostrarToast(
                "✅ Cupón copiado"
            );
        }
        // Esperamos un momento para que
        // el usuario vea la confirmación.
        setTimeout(() => {
            abrirMercadoLibre(
                link
            );
        }, 250);
    }
    catch (error) {
        console.error(
            "❌ Error copiando cupón:",
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
// ABRIR MERCADO LIBRE
// =====================================================
function abrirMercadoLibre(link) {
    if (!link || link === "#") {
        if (window.mostrarToast) {
            window.mostrarToast(
                "⚠️ Enlace de Mercado Libre pendiente"
            );
        }
        return;
    }
    /*
     * Más adelante aquí colocaremos el sistema
     * definitivo para intentar abrir directamente
     * la aplicación de Mercado Libre.
     *
     * También respetaremos tu enlace de afiliado.
     */
    window.location.href =
        link;
}
// =====================================================
// ESTADÍSTICAS LOCALES
// =====================================================
function registrarCopia() {
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
    console.log(
        "📋 Copias:",
        copias
    );
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