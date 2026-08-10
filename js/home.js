// =====================================================
// ⚡ EL PATRÓN DE LAS OFERTAS
// HOME.JS
// NUEVO REPOSITORIO
// =====================================================
// =====================================================
// CONFIGURACIÓN
// =====================================================
const LINK_MERCADO_LIBRE =
    "https://meli.la/1mj3itE";
// =====================================================
// ELEMENTOS
// =====================================================
const relampagoCarousel =
    document.getElementById(
        "relampagoCarousel"
    );
const exclusivosGrid =
    document.getElementById(
        "exclusivosGrid"
    );
const bancariosGrid =
    document.getElementById(
        "bancariosGrid"
    );
const toast =
    document.getElementById(
        "toast"
    );
// =====================================================
// TOAST
// =====================================================
function mostrarToast(mensaje) {
    if (!toast) return;
    toast.textContent =
        mensaje;
    toast.classList.add(
        "show"
    );
    clearTimeout(
        window.toastTimer
    );
    window.toastTimer =
        setTimeout(() => {
            toast.classList.remove(
                "show"
            );
        }, 2200);
}
// =====================================================
// MERCADO LIBRE
// =====================================================
function abrirMercadoLibre(
    enlace = LINK_MERCADO_LIBRE
) {
    if (!enlace) {
        enlace =
            LINK_MERCADO_LIBRE;
    }
    /*
     * Android:
     * Intentamos abrir directamente
     * la aplicación de Mercado Libre.
     */
    if (
        /Android/i.test(
            navigator.userAgent
        )
    ) {
        try {
            const limpio =
                enlace.replace(
                    /^https?:\/\//,
                    ""
                );
            window.location.href =
                "intent://" +
                limpio +
                "#Intent;" +
                "scheme=https;" +
                "package=com.mercadolibre;" +
                "end";
            return;
        }
        catch (error) {
            console.log(
                "Error abriendo Mercado Libre:",
                error
            );
        }
    }
    /*
     * iPhone / iPad / escritorio
     */
    window.location.href =
        enlace;
}
// =====================================================
// COPIAR CUPÓN
// =====================================================
async function copiarCupon(
    codigo,
    enlace
) {
    if (!codigo) {
        mostrarToast(
            "❌ Cupón no disponible"
        );
        return;
    }
    let copiado = false;
    // =================================================
    // MÉTODO PRINCIPAL
    // =================================================
    try {
        if (
            navigator.clipboard &&
            window.isSecureContext
        ) {
            await navigator.clipboard.writeText(
                codigo
            );
            copiado = true;
        }
    }
    catch (error) {
        console.log(
            "Clipboard API:",
            error
        );
    }
    // =================================================
    // MÉTODO ALTERNATIVO
    // =================================================
    if (!copiado) {
        try {
            const textarea =
                document.createElement(
                    "textarea"
                );
            textarea.value =
                codigo;
            textarea.style.position =
                "fixed";
            textarea.style.left =
                "-9999px";
            textarea.style.top =
                "0";
            document.body.appendChild(
                textarea
            );
            textarea.focus();
            textarea.select();
            copiado =
                document.execCommand(
                    "copy"
                );
            textarea.remove();
        }
        catch (error) {
            console.log(
                "Error método alternativo:",
                error
            );
        }
    }
    // =================================================
    // RESULTADO
    // =================================================
    if (copiado) {
        mostrarToast(
            "✅ Cupón copiado: " +
            codigo
        );
        /*
         * Esperamos un instante para que
         * el navegador termine la acción
         * de copiar.
         */
        setTimeout(() => {
            abrirMercadoLibre(
                enlace ||
                LINK_MERCADO_LIBRE
            );
        }, 180);
    }
    else {
        mostrarToast(
            "❌ No se pudo copiar el cupón"
        );
    }
}
// =====================================================
// CREAR CUPÓN
// =====================================================
function crearCuponCard(
    cupon
) {
    const tarjeta =
        document.createElement(
            "div"
        );
    tarjeta.className =
        "cupon-card";
    // =================================================
    // ESTADO
    // =================================================
    let estado =
        "🟢 DISPONIBLE";
    if (
        cupon.estado ===
        "agotando"
    ) {
        estado =
            "⚡ ÚLTIMAS PIEZAS";
    }
    if (
        cupon.estado ===
        "agotado"
    ) {
        estado =
            "🔴 AGOTADO";
    }
    // =================================================
    // DESCUENTO
    // =================================================
    let descuento =
        "";
    if (
        cupon.tipoDescuento ===
        "porcentaje"
    ) {
        descuento =
            `${cupon.descuento || 0}% OFF`;
    }
    else {
        descuento =
            `$${cupon.descuento || 0} OFF`;
    }
    // =================================================
    // TOPE
    // =================================================
    let tope = "";
    if (
        cupon.tipoDescuento ===
            "porcentaje" &&
        cupon.tope
    ) {
        tope = `
            <p>
                🔝 Tope máximo:
                $${cupon.tope}
            </p>
        `;
    }
    // =================================================
    // BOTÓN
    // =================================================
    const botonDeshabilitado =
        cupon.estado ===
        "agotado";
    tarjeta.innerHTML = `
        <div class="coupon-status">
            ${estado}
        </div>
        <h3>
            🎟️
            ${cupon.nombre || "CUPÓN"}
        </h3>
        <div class="coupon-discount">
            ${descuento}
        </div>
        <p>
            🛒 Compra mínima:
            $${cupon.minimo || 0}
        </p>
        ${tope}
        <button
            class="coupon-copy-btn"
            ${botonDeshabilitado ? "disabled" : ""}
        >
            📋 COPIAR CUPÓN
        </button>
    `;
    const boton =
        tarjeta.querySelector(
            ".coupon-copy-btn"
        );
    if (boton) {
        boton.addEventListener(
            "click",
            () => {
                copiarCupon(
                    cupon.codigo,
                    cupon.link ||
                    LINK_MERCADO_LIBRE
                );
            }
        );
    }
    return tarjeta;
}
// =====================================================
// CUPONES DE PRUEBA
// =====================================================
//
// Estos son temporales.
// Después serán reemplazados por Firestore.
// =====================================================
const cuponesDemo = [
    {
        codigo: "DEMO500",
        nombre: "Cupón Relámpago",
        tipo: "relampago",
        tipoDescuento: "pesos",
        descuento: 500,
        minimo: 4000,
        estado: "activo",
        link: LINK_MERCADO_LIBRE
    },
    {
        codigo: "DEMO800",
        nombre: "Cupón Relámpago $800",
        tipo: "relampago",
        tipoDescuento: "pesos",
        descuento: 800,
        minimo: 8000,
        estado: "activo",
        link: LINK_MERCADO_LIBRE
    },
    {
        codigo: "DEMO10",
        nombre: "Cupón Bancario",
        tipo: "bancario",
        tipoDescuento: "porcentaje",
        descuento: 10,
        tope: 1000,
        minimo: 2500,
        estado: "activo",
        link: LINK_MERCADO_LIBRE
    },
    {
        codigo: "DEMO25",
        nombre: "Cupón Bancario 25%",
        tipo: "bancario",
        tipoDescuento: "porcentaje",
        descuento: 25,
        tope: 2000,
        minimo: 7000,
        estado: "agotando",
        link: LINK_MERCADO_LIBRE
    },
    {
        codigo: "DEMOMELI",
        nombre: "Cupón Exclusivo",
        tipo: "exclusivo",
        tipoDescuento: "pesos",
        descuento: 300,
        minimo: 2500,
        estado: "activo",
        link: LINK_MERCADO_LIBRE
    }
];
// =====================================================
// MOSTRAR CUPONES
// =====================================================
function cargarCuponesDemo() {
    if (relampagoCarousel) {
        relampagoCarousel.innerHTML =
            "";
    }
    if (exclusivosGrid) {
        exclusivosGrid.innerHTML =
            "";
    }
    if (bancariosGrid) {
        bancariosGrid.innerHTML =
            "";
    }
    cuponesDemo.forEach(
        cupon => {
            const tarjeta =
                crearCuponCard(
                    cupon
                );
            // -----------------------------------------
            // RELÁMPAGO
            // -----------------------------------------
            if (
                cupon.tipo ===
                "relampago"
            ) {
                relampagoCarousel
                    ?.appendChild(
                        tarjeta
                    );
            }
            // -----------------------------------------
            // BANCARIOS
            // -----------------------------------------
            else if (
                cupon.tipo ===
                "bancario"
            ) {
                bancariosGrid
                    ?.appendChild(
                        tarjeta
                    );
            }
            // -----------------------------------------
            // EXCLUSIVOS
            // -----------------------------------------
            else {
                exclusivosGrid
                    ?.appendChild(
                        tarjeta
                    );
            }
        }
    );
}
// =====================================================
// CARRUSEL RELÁMPAGO
// =====================================================
let carruselIntervalo =
    null;
function iniciarCarrusel() {
    if (!relampagoCarousel)
        return;
    clearInterval(
        carruselIntervalo
    );
    carruselIntervalo =
        setInterval(() => {
            /*
             * Si el usuario está tocando
             * el carrusel no avanzamos.
             */
            if (
                window.carruselPausado
            ) {
                return;
            }
            const paso =
                290;
            const maxScroll =
                relampagoCarousel.scrollWidth -
                relampagoCarousel.clientWidth;
            if (
                relampagoCarousel.scrollLeft >=
                maxScroll - 10
            ) {
                relampagoCarousel.scrollTo({
                    left: 0,
                    behavior: "smooth"
                });
            }
            else {
                relampagoCarousel.scrollBy({
                    left: paso,
                    behavior: "smooth"
                });
            }
        }, 3500);
}
// =====================================================
// PAUSA DEL CARRUSEL
// =====================================================
if (relampagoCarousel) {
    relampagoCarousel.addEventListener(
        "touchstart",
        () => {
            window.carruselPausado =
                true;
        }
    );
    relampagoCarousel.addEventListener(
        "touchend",
        () => {
            setTimeout(
                () => {
                    window.carruselPausado =
                        false;
                },
                1500
            );
        }
    );
}
// =====================================================
// USUARIO LOCAL
// =====================================================
//
// De momento no requiere registro.
// Después lo conectaremos con Firebase
// Authentication.
// =====================================================
function obtenerUsuarioLocal() {
    let usuario =
        localStorage.getItem(
            "patron_usuario"
        );
    if (!usuario) {
        usuario =
            "usr_" +
            Date.now() +
            "_" +
            Math.floor(
                Math.random() *
                99999
            );
        localStorage.setItem(
            "patron_usuario",
            usuario
        );
    }
    return usuario;
}
obtenerUsuarioLocal();
// =====================================================
// BOTÓN VOLVER ARRIBA
// =====================================================
const btnArriba =
    document.getElementById(
        "btnArriba"
    );
if (btnArriba) {
    window.addEventListener(
        "scroll",
        () => {
            btnArriba.style.display =
                window.scrollY > 400
                    ? "block"
                    : "none";
        }
    );
    btnArriba.addEventListener(
        "click",
        () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        }
    );
}
// =====================================================
// BOTONES DE CUENTA
// =====================================================
const userBtn =
    document.getElementById(
        "userBtn"
    );
const accountBtn =
    document.getElementById(
        "accountBtn"
    );
const registerRewardBtn =
    document.getElementById(
        "registerRewardBtn"
    );
function abrirCuenta() {
    mostrarToast(
        "👤 Próximamente: registro de usuario"
    );
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
// =====================================================
// PROMOCIÓN MERCADO PAGO
// =====================================================
const promoBtn =
    document.querySelector(
        ".promo-btn"
    );
promoBtn?.addEventListener(
    "click",
    () => {
        abrirMercadoLibre(
            LINK_MERCADO_LIBRE
        );
    }
);
// =====================================================
// INICIO
// =====================================================
cargarCuponesDemo();
iniciarCarrusel();
// =====================================================
// FIN
// =====================================================