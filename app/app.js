// =====================================================
// EL PATRÓN DE LAS OFERTAS
// APP.JS
// Núcleo principal de la nueva página
// =====================================================

import {
    db,
    auth
} from "../firebase/firebase.js";


// =====================================================
// FIRESTORE
// =====================================================

import {
    collection,
    onSnapshot,
    doc,
    updateDoc,
    increment
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


// =====================================================
// ELEMENTOS PRINCIPALES
// =====================================================

const menuBtn =
    document.getElementById("menuBtn");

const menu =
    document.getElementById("menu");

const cerrarMenu =
    document.getElementById("cerrarMenu");

const toast =
    document.getElementById("toast");


// =====================================================
// MENÚ DE TRES LÍNEAS
// =====================================================

function abrirMenu() {

    if (!menu) return;

    menu.classList.add("activo");

}


function cerrarMenuFuncion() {

    if (!menu) return;

    menu.classList.remove("activo");

}


menuBtn?.addEventListener(
    "click",
    abrirMenu
);


cerrarMenu?.addEventListener(
    "click",
    cerrarMenuFuncion
);


// =====================================================
// CERRAR MENÚ AL TOCAR FUERA
// =====================================================

document.addEventListener(
    "click",
    event => {

        if (!menu) return;

        if (
            menu.classList.contains("activo") &&
            !menu.contains(event.target) &&
            !menuBtn?.contains(event.target)
        ) {

            cerrarMenuFuncion();

        }

    }
);


// =====================================================
// TOAST
// =====================================================

export function mostrarToast(texto) {

    if (!toast) return;

    toast.textContent = texto;

    toast.classList.add("mostrar");

    setTimeout(() => {

        toast.classList.remove("mostrar");

    }, 2500);

}


// =====================================================
// USUARIO ANÓNIMO LOCAL
// =====================================================

export function obtenerUsuarioLocal() {

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
                Math.random() * 999999
            );

        localStorage.setItem(
            "patron_usuario",
            usuario
        );

    }

    return usuario;

}


// =====================================================
// COPIAR CUPÓN
// =====================================================

export async function copiarCupon(
    id,
    codigo,
    linkAfiliado
) {

    try {

        await navigator.clipboard.writeText(
            codigo
        );


        // =============================================
        // CONTADOR DEL CUPÓN
        // =============================================

        await updateDoc(

            doc(
                db,
                "cupones",
                id
            ),

            {

                copias:
                    increment(1)

            }

        ).catch(() => {});


        // =============================================
        // MENSAJE
        // =============================================

        mostrarToast(
            "✅ Cupón copiado"
        );


        // =============================================
        // ABRIR MERCADO LIBRE
        // =============================================

        abrirMercadoLibre(
            linkAfiliado
        );

    }

    catch (error) {

        console.error(
            "Error copiando cupón:",
            error
        );

        mostrarToast(
            "⚠️ No se pudo copiar"
        );

    }

}


// =====================================================
// ABRIR MERCADO LIBRE
// =====================================================

export function abrirMercadoLibre(
    link
) {

    if (!link) return;


    // =============================================
    // INTENTAR APP EN ANDROID
    // =============================================

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
                "Intent no disponible",
                error
            );

        }

    }


    // =============================================
    // iPhone / PC / FALLBACK
    // =============================================

    window.location.href =
        link;

}


// =====================================================
// CARGAR OFERTAS
// =====================================================

export function cargarOfertas() {

    const contenedor =
        document.getElementById(
            "carruselOfertas"
        );

    if (!contenedor) return;


    onSnapshot(

        collection(
            db,
            "ofertas"
        ),

        datos => {

            contenedor.innerHTML = "";


            datos.forEach(
                item => {

                    const oferta =
                        item.data();


                    const tarjeta =
                        document.createElement(
                            "div"
                        );


                    tarjeta.className =
                        "ofertaCard";


                    tarjeta.innerHTML = `

                        <img
                            src="${oferta.imagen || ""}"
                            alt="${oferta.titulo || "Oferta"}"
                        >

                        <h3>
                            ${oferta.titulo || "Oferta"}
                        </h3>

                        <div class="precioAntes">
                            ❌ Antes:
                            <s>
                                $${oferta.precioAntes || 0}
                            </s>
                        </div>

                        <div class="descuento">
                            🔥
                            ${oferta.descuento || 0}% OFF
                        </div>

                        <div class="precioFinal">
                            💥
                            $${oferta.precioFinal || 0}
                        </div>

                        <button class="btnOferta">
                            🛒 VER OFERTA
                        </button>

                    `;


                    const boton =
                        tarjeta.querySelector(
                            ".btnOferta"
                        );


                    boton?.addEventListener(
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

                            ).catch(() => {});


                            abrirMercadoLibre(
                                oferta.link
                            );

                        }
                    );


                    contenedor.appendChild(
                        tarjeta
                    );

                }
            );

        },

        error => {

            console.error(
                "Error cargando ofertas:",
                error
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

        cargarOfertas();

    }
);


// =====================================================
// FIN APP.JS
// =====================================================