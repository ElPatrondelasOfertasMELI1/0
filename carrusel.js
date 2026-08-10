// =====================================================
// EL PATRÓN DE LAS OFERTAS
// CARRUSEL.JS
// Carrusel de ofertas desde Firestore
// SIN FIREBASE STORAGE
// =====================================================

import {
    db
} from "../firebase/firebase.js";

import {
    collection,
    onSnapshot,
    doc,
    updateDoc,
    increment
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


// =====================================================
// CONFIGURACIÓN
// =====================================================

const contenedor =
    document.getElementById(
        "carruselOfertas"
    );

const anterior =
    document.getElementById(
        "carruselAnterior"
    );

const siguiente =
    document.getElementById(
        "carruselSiguiente"
    );


// =====================================================
// LINK MERCADO LIBRE
// =====================================================

const LINK_MERCADO_LIBRE =
    "https://meli.la/1mj3itE";


// =====================================================
// ABRIR MERCADO LIBRE
// =====================================================

function abrirMercadoLibre(link) {

    if (!link) {

        link =
            LINK_MERCADO_LIBRE;

    }

    const esAndroid =
        /Android/i.test(
            navigator.userAgent
        );


    if (esAndroid) {

        try {

            const url =
                new URL(link);

            const intent =
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
                intent;

            return;

        }

        catch (error) {

            console.log(
                "Error intentando abrir Mercado Libre:",
                error
            );

        }

    }


    window.location.href =
        link;

}


// =====================================================
// TOAST
// =====================================================

function mostrarToast(texto) {

    const toast =
        document.getElementById(
            "toast"
        );

    if (!toast) return;

    toast.textContent =
        texto;

    toast.classList.add(
        "mostrar"
    );

    setTimeout(() => {

        toast.classList.remove(
            "mostrar"
        );

    }, 2200);

}


// =====================================================
// CREAR OFERTA
// =====================================================

function crearOferta(
    item
) {

    const oferta =
        item.data();

    const tarjeta =
        document.createElement(
            "article"
        );

    tarjeta.className =
        "ofertaCarruselCard";


    tarjeta.innerHTML = `

        <div class="ofertaImagen">

            <img
                src="${oferta.imagen || ""}"
                alt="${oferta.titulo || "Oferta"}"
                loading="lazy"
            >

        </div>


        <div class="ofertaContenido">

            <h3>
                ${oferta.titulo || "Oferta"}
            </h3>


            <div class="ofertaAntes">

                ❌ Antes:

                <s>
                    $${oferta.precioAntes || 0}
                </s>

            </div>


            <div class="ofertaDescuento">

                🔥
                ${oferta.descuento || 0}% OFF

            </div>


            <div class="ofertaPrecio">

                💥
                $${oferta.precioFinal || 0}

            </div>


            <button class="btnVerOferta">

                🛒 VER OFERTA

            </button>

        </div>

    `;


    const boton =
        tarjeta.querySelector(
            ".btnVerOferta"
        );


    boton.addEventListener(
        "click",
        async () => {

            await updateDoc(

                doc(
                    db,
                    "ofertas",
                    item.id
                ),

                {

                    clics:
                        increment(1)

                }

            ).catch(
                () => {}
            );


            mostrarToast(
                "🔥 Abriendo Mercado Libre..."
            );


            abrirMercadoLibre(
                oferta.link
            );

        }
    );


    return tarjeta;

}


// =====================================================
// CARGAR OFERTAS
// =====================================================

export function cargarCarrusel() {

    if (!contenedor) {

        console.log(
            "⚠️ No existe #carruselOfertas"
        );

        return;

    }


    onSnapshot(

        collection(
            db,
            "ofertas"
        ),

        datos => {

            contenedor.innerHTML =
                "";


            datos.forEach(
                item => {

                    contenedor.appendChild(
                        crearOferta(item)
                    );

                }
            );


            actualizarBotones();

        },

        error => {

            console.error(
                "❌ Error cargando carrusel:",
                error
            );

        }

    );

}


// =====================================================
// CONTROLES
// =====================================================

function moverCarrusel(
    cantidad
) {

    if (!contenedor) return;

    contenedor.scrollBy({

        left:
            cantidad,

        behavior:
            "smooth"

    });

}


anterior?.addEventListener(
    "click",
    () => {

        moverCarrusel(
            -330
        );

    }
);


siguiente?.addEventListener(
    "click",
    () => {

        moverCarrusel(
            330
        );

    }
);


// =====================================================
// OCULTAR / MOSTRAR FLECHAS
// =====================================================

function actualizarBotones() {

    if (!contenedor) return;


    if (anterior) {

        anterior.style.display =
            contenedor.scrollLeft <= 5
                ? "none"
                : "flex";

    }


    if (siguiente) {

        siguiente.style.display =
            contenedor.scrollLeft +
            contenedor.clientWidth >=
            contenedor.scrollWidth - 5
                ? "none"
                : "flex";

    }

}


contenedor?.addEventListener(
    "scroll",
    actualizarBotones
);


// =====================================================
// INICIAR
// =====================================================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        cargarCarrusel();

    }
);


// =====================================================
// FIN CARRUSEL.JS
// =====================================================