// =====================================================
// EL PATRÓN DE LAS OFERTAS
// APP.JS — NUEVO SITIO
// Mercado Libre México
// =====================================================
// =====================================================
// CONFIGURACIÓN GENERAL
// =====================================================
// Enlace de afiliado de Mercado Libre.
// Se utilizará cuando el usuario pulse los botones.
const LINK_MERCADO_LIBRE =
    "https://meli.la/1mj3itE";
// =====================================================
// ELEMENTOS PRINCIPALES
// =====================================================
const carrusel =
    document.getElementById("carrusel");
const cuponesRelampago =
    document.getElementById("cuponesRelampago");
const cuponesBancarios =
    document.getElementById("cuponesBancarios");
const cuponesExclusivos =
    document.getElementById("cuponesExclusivos");
const toast =
    document.getElementById("toast");
// =====================================================
// VARIABLES
// =====================================================
let intervaloCarrusel = null;
let carruselActivo = true;
// =====================================================
// TOAST
// =====================================================
function mostrarToast(texto) {
    if (!toast) return;
    toast.textContent = texto;
    toast.classList.add("show");
    clearTimeout(
        mostrarToast.timer
    );
    mostrarToast.timer =
        setTimeout(() => {
            toast.classList.remove("show");
        }, 2200);
}
// =====================================================
// ABRIR MERCADO LIBRE
// =====================================================
//
// Intenta abrir la aplicación de Mercado Libre.
// Si el dispositivo no permite el intento,
// utiliza el enlace web.
//
// NO se utiliza window.open() para el botón
// de copiar cupón, para evitar el problema
// de los dos clics que teníamos anteriormente.
// =====================================================
function abrirMercadoLibre(url) {
    const destino =
        url ||
        LINK_MERCADO_LIBRE;
    const esAndroid =
        /Android/i.test(
            navigator.userAgent
        );
    if (esAndroid) {
        try {
            const limpio =
                destino.replace(
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
                "No se pudo abrir la app:",
                error
            );
        }
    }
    // iPhone / iPad / otros dispositivos
    window.location.href = destino;
}
// =====================================================
// COPIAR CUPÓN
// =====================================================
async function copiarCupon(codigo, link) {
    if (!codigo) {
        mostrarToast(
            "❌ Cupón no disponible"
        );
        return;
    }
    try {
        await navigator.clipboard.writeText(
            codigo
        );
        mostrarToast(
            "✅ Cupón copiado: " + codigo
        );
    }
    catch (error) {
        console.error(
            "Error copiando cupón:",
            error
        );
        // Método alternativo
        const textarea =
            document.createElement(
                "textarea"
            );
        textarea.value = codigo;
        textarea.style.position =
            "fixed";
        textarea.style.opacity =
            "0";
        document.body.appendChild(
            textarea
        );
        textarea.select();
        try {
            document.execCommand(
                "copy"
            );
            mostrarToast(
                "✅ Cupón copiado"
            );
        }
        catch (error2) {
            mostrarToast(
                "❌ No se pudo copiar"
            );
        }
        textarea.remove();
    }
    // Abrir Mercado Libre después de copiar
    setTimeout(() => {
        abrirMercadoLibre(
            link || LINK_MERCADO_LIBRE
        );
    }, 150);
}
// =====================================================
// CREAR TARJETA DE CUPÓN
// =====================================================
function crearTarjetaCupon(cupon) {
    const tarjeta =
        document.createElement(
            "div"
        );
    tarjeta.className =
        "cuponCard";
    // ---------------------------------------------
    // ESTADO
    // ---------------------------------------------
    let estadoTexto =
        "🟢 DISPONIBLE";
    if (
        cupon.estado ===
        "agotando"
    ) {
        estadoTexto =
            "⚡ ÚLTIMAS PIEZAS";
    }
    if (
        cupon.estado ===
        "agotado"
    ) {
        estadoTexto =
            "🔴 AGOTADO";
    }
    // ---------------------------------------------
    // DESCUENTO
    // ---------------------------------------------
    let descuentoTexto =
        "";
    if (
        cupon.tipoDescuento ===
        "porcentaje"
    ) {
        descuentoTexto =
            `${cupon.descuento || 0}% OFF`;
    }
    else {
        descuentoTexto =
            `$${cupon.descuento || 0} OFF`;
    }
    // ---------------------------------------------
    // TOPE
    // ---------------------------------------------
    let topeHTML =
        "";
    if (
        cupon.tipoDescuento ===
        "porcentaje" &&
        cupon.tope
    ) {
        topeHTML = `
            <p>
                🔝 Tope máximo:
                $${cupon.tope}
            </p>
        `;
    }
    // ---------------------------------------------
    // CUPÓN AGOTADO
    // ---------------------------------------------
    const deshabilitado =
        cupon.estado ===
        "agotado";
    tarjeta.innerHTML = `
        <div class="estado">
            ${estadoTexto}
        </div>
        <h3>
            🎟️ ${cupon.nombre || "CUPÓN"}
        </h3>
        <div class="cuponDescuento">
            ${descuentoTexto}
        </div>
        <p>
            🛒 Compra mínima:
            $${cupon.minimo || 0}
        </p>
        ${topeHTML}
        <button
            class="copiarCupon"
            ${deshabilitado ? "disabled" : ""}
        >
            📋 COPIAR CUPÓN
        </button>
    `;
    const boton =
        tarjeta.querySelector(
            ".copiarCupon"
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
// MOSTRAR CUPONES
// =====================================================
function mostrarCupones(lista) {
    if (cuponesRelampago) {
        cuponesRelampago.innerHTML =
            "";
    }
    if (cuponesBancarios) {
        cuponesBancarios.innerHTML =
            "";
    }
    if (cuponesExclusivos) {
        cuponesExclusivos.innerHTML =
            "";
    }
    lista.forEach(cupon => {
        const tarjeta =
            crearTarjetaCupon(
                cupon
            );
        if (
            cupon.tipo ===
            "relampago"
        ) {
            cuponesRelampago
                ?.appendChild(
                    tarjeta
                );
        }
        else if (
            cupon.tipo ===
            "bancario"
        ) {
            cuponesBancarios
                ?.appendChild(
                    tarjeta
                );
        }
        else {
            cuponesExclusivos
                ?.appendChild(
                    tarjeta
                );
        }
    });
}
// =====================================================
// DATOS DE PRUEBA
// =====================================================
//
// Después sustituiremos esto por Firestore.
// No necesitamos Storage.
//
// Las imágenes de ofertas podrán utilizar:
// data:image/...;base64,...
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
        codigo: "DEMOMELI",
        nombre: "Cupón Exclusivo",
        tipo: "exclusivo",
        tipoDescuento: "pesos",
        descuento: 300,
        minimo: 2500,
        estado: "agotando",
        link: LINK_MERCADO_LIBRE
    }
];
// =====================================================
// CARRUSEL DE OFERTAS
// =====================================================
function iniciarCarrusel() {
    if (!carrusel) return;
    clearInterval(
        intervaloCarrusel
    );
    intervaloCarrusel =
        setInterval(() => {
            if (!carruselActivo)
                return;
            carrusel.scrollBy({
                left: 300,
                behavior: "smooth"
            });
            if (
                carrusel.scrollLeft +
                carrusel.clientWidth >=
                carrusel.scrollWidth - 20
            ) {
                carrusel.scrollTo({
                    left: 0,
                    behavior: "smooth"
                });
            }
        }, 3500);
}
// =====================================================
// PAUSAR CARRUSEL AL TOCAR
// =====================================================
if (carrusel) {
    carrusel.addEventListener(
        "touchstart",
        () => {
            carruselActivo =
                false;
        }
    );
    carrusel.addEventListener(
        "touchend",
        () => {
            setTimeout(() => {
                carruselActivo =
                    true;
            }, 1500);
        }
    );
}
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
// REGISTRO OPCIONAL DE USUARIO
// =====================================================
//
// Por ahora solamente guardamos un identificador
// local. Más adelante conectaremos el registro
// con Firebase Authentication.
//
// NO requiere Storage.
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
                Math.random() * 99999
            );
        localStorage.setItem(
            "patron_usuario",
            usuario
        );
    }
    return usuario;
}
// Crear ID local desde la primera visita
obtenerUsuarioLocal();
// =====================================================
// INICIO
// =====================================================
mostrarCupones(
    cuponesDemo
);
iniciarCarrusel();
// =====================================================
// EXPORTAR FUNCIONES
// =====================================================
//
// Permite utilizarlas desde otros módulos.
// =====================================================
export {
    mostrarToast,
    abrirMercadoLibre,
    copiarCupon,
    crearTarjetaCupon,
    mostrarCupones,
    obtenerUsuarioLocal
};
// =====================================================
// FIN APP.JS
// =====================================================