// =====================================================
// EL PATRÓN DE LAS OFERTAS
// CUPONES.JS
// NUEVO PROYECTO
// =====================================================
//
// FUNCIONES:
// ✅ Cupones Relámpago
// ✅ Cupones Exclusivos
// ✅ Cupones Bancarios
// ✅ Carrusel
// ✅ Copiar código
// ✅ Redirección a Mercado Libre
// ✅ Preparado para Firebase
// =====================================================


// =====================================================
// CONFIGURACIÓN
// =====================================================

// ESTE SERÁ EL ENLACE DE AFILIADO GENERAL
// Lo cambiaremos por el enlace que quieras utilizar.

const LINK_MERCADO_LIBRE =
    "https://meli.la/1mj3itE";


// =====================================================
// DATOS TEMPORALES
// =====================================================
//
// Por ahora NO usamos Firestore.
// Estos datos sirven para comprobar que todo funciona.
//
// Después el ADMIN podrá crear/modificar estos cupones
// y los cargaremos automáticamente.
// =====================================================

const cupones = [

    // =================================================
    // RELÁMPAGO
    // =================================================

    {
        id: "relampago1",

        codigo: "PRUEBA500",

        nombre: "Cupón Relámpago",

        tipo: "relampago",

        tipoDescuento: "pesos",

        descuento: 500,

        minimo: 3000,

        tope: 500,

        estado: "activo"
    },


    {
        id: "relampago2",

        codigo: "PRUEBA800",

        nombre: "Cupón Relámpago",

        tipo: "relampago",

        tipoDescuento: "pesos",

        descuento: 800,

        minimo: 5000,

        tope: 800,

        estado: "activo"
    },


    // =================================================
    // EXCLUSIVO
    // =================================================

    {
        id: "exclusivo1",

        codigo: "MELIMAS",

        nombre: "Cupón Meli+ Exclusivo",

        tipo: "exclusivo",

        tipoDescuento: "pesos",

        descuento: 500,

        minimo: 4000,

        tope: 500,

        estado: "activo"
    },


    // =================================================
    // BANCARIO
    // =================================================

    {
        id: "bancario1",

        codigo: "BBVAGOL",

        nombre: "Cupón BBVA",

        tipo: "bancario",

        tipoDescuento: "porcentaje",

        descuento: 25,

        minimo: 7000,

        tope: 2000,

        estado: "activo"
    }

];


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


    setTimeout(() => {

        toast.classList.remove(
            "show"
        );

    }, 2200);

}


// =====================================================
// FORMATO DE DINERO
// =====================================================

function dinero(valor) {

    return Number(valor || 0)
        .toLocaleString(
            "es-MX"
        );

}


// =====================================================
// TEXTO DESCUENTO
// =====================================================

function obtenerDescuento(cupon) {

    if (
        cupon.tipoDescuento ===
        "porcentaje"
    ) {

        return `
            ${cupon.descuento}% OFF
        `;

    }


    return `
        $${dinero(cupon.descuento)} OFF
    `;

}


// =====================================================
// ESTADO
// =====================================================

function obtenerEstado(cupon) {

    if (
        cupon.estado ===
        "agotado"
    ) {

        return {

            texto: "🔴 AGOTADO",

            clase: "agotado"

        };

    }


    if (
        cupon.estado ===
        "agotando"
    ) {

        return {

            texto: "⚡ ÚLTIMAS PIEZAS",

            clase: "agotando"

        };

    }


    return {

        texto: "🟢 DISPONIBLE",

        clase: "activo"

    };

}


// =====================================================
// CREAR TARJETA
// =====================================================

function crearTarjetaCupon(
    cupon
) {

    const tarjeta =
        document.createElement(
            "article"
        );


    tarjeta.className =
        "coupon-card";


    const estado =
        obtenerEstado(
            cupon
        );


    let topeHTML = "";


    if (
        cupon.tipoDescuento ===
        "porcentaje"
    ) {

        topeHTML = `

            <div class="coupon-info">

                🔝 Tope máximo:
                $${dinero(cupon.tope)}

            </div>

        `;

    }


    tarjeta.innerHTML = `

        <div class="
            coupon-status
            ${estado.clase}
        ">

            ${estado.texto}

        </div>


        <h3>

            🎟️
            ${cupon.nombre}

        </h3>


        <div class="
            coupon-discount
        ">

            ${obtenerDescuento(
                cupon
            )}

        </div>


        <div class="coupon-info">

            🛒 Compra mínima:
            $${dinero(
                cupon.minimo
            )}

        </div>


        ${topeHTML}


        <button
            class="copy-coupon"
            data-id="${cupon.id}"
        >

            📋 COPIAR CUPÓN

        </button>

    `;


    const boton =
        tarjeta.querySelector(
            ".copy-coupon"
        );


    boton.addEventListener(
        "click",
        () => {

            copiarCupon(
                cupon,
                boton
            );

        }
    );


    return tarjeta;

}


// =====================================================
// COPIAR CUPÓN
// =====================================================

async function copiarCupon(
    cupon,
    boton
) {

    try {

        // =============================================
        // COPIAR CÓDIGO
        // =============================================

        await navigator.clipboard.writeText(
            cupon.codigo
        );


        // =============================================
        // CAMBIAR BOTÓN
        // =============================================

        const textoOriginal =
            boton.innerHTML;


        boton.innerHTML =
            "✅ ¡CUPÓN COPIADO!";


        boton.disabled =
            true;


        // =============================================
        // AVISO
        // =============================================

        mostrarToast(
            "✅ Cupón copiado. Abriendo Mercado Libre..."
        );


        // =============================================
        // ABRIR MERCADO LIBRE
        // =============================================
        //
        // IMPORTANTE:
        // No usamos target="_blank".
        //
        // La intención es que el enlace se abra
        // directamente en la app cuando el dispositivo
        // pueda reconocer el enlace.
        //
        // =============================================

        setTimeout(() => {

            abrirMercadoLibre(
                LINK_MERCADO_LIBRE
            );

        }, 250);


        // =============================================
        // RESTAURAR BOTÓN
        // =============================================

        setTimeout(() => {

            boton.innerHTML =
                textoOriginal;

            boton.disabled =
                false;

        }, 2500);


    }

    catch (error) {

        console.error(
            "Error copiando cupón:",
            error
        );


        // =============================================
        // MÉTODO ALTERNATIVO
        // =============================================

        try {

            const textarea =
                document.createElement(
                    "textarea"
                );


            textarea.value =
                cupon.codigo;


            textarea.style.position =
                "fixed";

            textarea.style.opacity =
                "0";


            document.body.appendChild(
                textarea
            );


            textarea.focus();

            textarea.select();


            document.execCommand(
                "copy"
            );


            textarea.remove();


            mostrarToast(
                "✅ Cupón copiado"
            );


            abrirMercadoLibre(
                LINK_MERCADO_LIBRE
            );

        }

        catch (error2) {

            console.error(
                "Error alternativo:",
                error2
            );


            mostrarToast(
                "❌ No se pudo copiar el cupón"
            );

        }

    }

}


// =====================================================
// ABRIR MERCADO LIBRE
// =====================================================

function abrirMercadoLibre(
    enlace
) {

    if (!enlace) return;


    // =============================================
    // ANDROID
    // =============================================

    const esAndroid =
        /Android/i.test(
            navigator.userAgent
        );


    if (esAndroid) {

        try {

            const url =
                new URL(
                    enlace
                );


            const intentURL =
                "intent://" +
                url.host +
                url.pathname +
                url.search +
                "#Intent;" +
                "scheme=https;" +
                "package=com.mercadolibre;" +
                "S.browser_fallback_url=" +
                encodeURIComponent(
                    enlace
                ) +
                ";end";


            window.location.href =
                intentURL;


            return;

        }

        catch (error) {

            console.log(
                "Intent Android:",
                error
            );

        }

    }


    // =============================================
    // iPHONE / iOS / RESTO
    // =============================================

    window.location.href =
        enlace;

}


// =====================================================
// CARGAR RELÁMPAGO
// =====================================================

function cargarRelampagos() {

    if (
        !relampagoCarousel
    ) return;


    relampagoCarousel.innerHTML =
        "";


    const lista =
        cupones.filter(
            cupon =>
                cupon.tipo ===
                "relampago"
        );


    if (!lista.length) {

        mostrarVacio(
            relampagoCarousel,
            "⚡",
            "No hay cupones relámpago activos"
        );

        return;

    }


    lista.forEach(
        cupon => {

            const tarjeta =
                crearTarjetaCupon(
                    cupon
                );


            relampagoCarousel.appendChild(
                tarjeta
            );

        }
    );


    iniciarCarrusel();

}


// =====================================================
// CARGAR EXCLUSIVOS
// =====================================================

function cargarExclusivos() {

    if (
        !exclusivosGrid
    ) return;


    exclusivosGrid.innerHTML =
        "";


    const lista =
        cupones.filter(
            cupon =>
                cupon.tipo ===
                "exclusivo"
        );


    if (!lista.length) {

        mostrarVacio(
            exclusivosGrid,
            "⭐",
            "No hay cupones exclusivos activos"
        );

        return;

    }


    lista.forEach(
        cupon => {

            exclusivosGrid.appendChild(
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

    if (
        !bancariosGrid
    ) return;


    bancariosGrid.innerHTML =
        "";


    const lista =
        cupones.filter(
            cupon =>
                cupon.tipo ===
                "bancario"
        );


    if (!lista.length) {

        mostrarVacio(
            bancariosGrid,
            "💳",
            "No hay cupones bancarios activos"
        );

        return;

    }


    lista.forEach(
        cupon => {

            bancariosGrid.appendChild(
                crearTarjetaCupon(
                    cupon
                )
            );

        }
    );

}


// =====================================================
// MENSAJE VACÍO
// =====================================================

function mostrarVacio(
    contenedor,
    icono,
    texto
) {

    contenedor.innerHTML = `

        <div class="empty-card">

            <div>
                ${icono}
            </div>

            <strong>
                ${texto}
            </strong>

        </div>

    `;

}


// =====================================================
// CARRUSEL RELÁMPAGO
// =====================================================

let intervaloCarrusel =
    null;


function iniciarCarrusel() {

    if (
        !relampagoCarousel
    ) return;


    clearInterval(
        intervaloCarrusel
    );


    intervaloCarrusel =
        setInterval(
            () => {

                const ancho =
                    295;


                const limite =
                    relampagoCarousel.scrollWidth -
                    relampagoCarousel.clientWidth;


                if (
                    relampagoCarousel.scrollLeft >=
                    limite - 10
                ) {

                    relampagoCarousel.scrollTo({

                        left: 0,

                        behavior: "smooth"

                    });

                }

                else {

                    relampagoCarousel.scrollBy({

                        left: ancho,

                        behavior: "smooth"

                    });

                }

            },

            3500

        );

}


// =====================================================
// DETENER CARRUSEL AL TOCAR
// =====================================================

if (
    relampagoCarousel
) {

    relampagoCarousel.addEventListener(
        "touchstart",
        () => {

            clearInterval(
                intervaloCarrusel
            );

        }
    );


    relampagoCarousel.addEventListener(
        "touchend",
        () => {

            setTimeout(
                iniciarCarrusel,
                1500
            );

        }
    );

}


// =====================================================
// INICIO
// =====================================================

cargarRelampagos();

cargarExclusivos();

cargarBancarios();


// =====================================================
// FIN
// =====================================================