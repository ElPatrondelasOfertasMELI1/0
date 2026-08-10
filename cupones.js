// =====================================================
// EL PATRÓN DE LAS OFERTAS
// CUPONES.JS
// Relámpago + Exclusivos + Bancarios
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

// AQUÍ PONDREMOS TU LINK DE AFILIADO PRINCIPAL
// cuando terminemos la estructura.

const LINK_MERCADO_LIBRE =
    "https://meli.la/1mj3itE";


// =====================================================
// ELEMENTOS
// =====================================================

const relampago =
    document.getElementById(
        "cuponesRelampago"
    );

const bancarios =
    document.getElementById(
        "cuponesBancarios"
    );

const exclusivos =
    document.getElementById(
        "cuponesExclusivos"
    );


// =====================================================
// TOAST
// =====================================================

function toast(texto) {

    const elemento =
        document.getElementById(
            "toast"
        );

    if (!elemento) return;

    elemento.textContent =
        texto;

    elemento.classList.add(
        "mostrar"
    );

    setTimeout(() => {

        elemento.classList.remove(
            "mostrar"
        );

    }, 2500);

}


// =====================================================
// ABRIR MERCADO LIBRE
// =====================================================

function abrirMercadoLibre(
    link
) {

    if (!link) {

        link =
            LINK_MERCADO_LIBRE;

    }


    const esAndroid =
        /Android/i.test(
            navigator.userAgent
        );


    // =============================================
    // ANDROID
    // =============================================

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
                encodeURIComponent(
                    link
                ) +
                ";end";


            window.location.href =
                intent;

            return;

        }

        catch (error) {

            console.log(
                "Intent Mercado Libre:",
                error
            );

        }

    }


    // =============================================
    // IPHONE / PC
    // =============================================

    window.location.href =
        link;

}


// =====================================================
// COPIAR CUPÓN
// =====================================================

async function copiarCupon(
    id,
    codigo,
    link
) {

    try {

        // =============================================
        // COPIAR
        // =============================================

        await navigator.clipboard.writeText(
            codigo
        );


        // =============================================
        // SUMAR COPIA
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

        ).catch(
            error => {

                console.log(
                    "No se pudo actualizar copia:",
                    error
                );

            }
        );


        // =============================================
        // MENSAJE
        // =============================================

        toast(
            "✅ CUPÓN COPIADO"
        );


        // =============================================
        // ABRIR MERCADO LIBRE
        // =============================================

        abrirMercadoLibre(
            link ||
            LINK_MERCADO_LIBRE
        );

    }

    catch (error) {

        console.error(
            "Error al copiar:",
            error
        );

        toast(
            "⚠️ No se pudo copiar el cupón"
        );

    }

}


// =====================================================
// FORMATO DEL DESCUENTO
// =====================================================

function obtenerDescuento(
    cupon
) {

    if (
        cupon.tipoDescuento ===
        "porcentaje"
    ) {

        return `
            📊
            <strong>
                ${cupon.descuento || 0}%
            </strong>
            OFF
        `;

    }


    return `
        💰
        <strong>
            $${cupon.descuento || 0}
        </strong>
        OFF
    `;

}


// =====================================================
// CREAR TARJETA
// =====================================================

function crearTarjeta(
    item
) {

    const c =
        item.data();


    const tarjeta =
        document.createElement(
            "article"
        );


    tarjeta.className =
        "cuponCard";


    // =============================================
    // ESTADO
    // =============================================

    let estadoTexto =
        "🟢 DISPONIBLE";


    if (
        c.estado ===
        "agotando"
    ) {

        estadoTexto =
            "⚡ ÚLTIMAS PIEZAS";

    }


    if (
        c.estado ===
        "agotado"
    ) {

        estadoTexto =
            "🔴 AGOTADO";

    }


    // =============================================
    // TOPE
    // =============================================

    let topeHTML = "";


    if (
        c.tipoDescuento ===
        "porcentaje" &&
        c.tope
    ) {

        topeHTML = `

            <p class="cuponTope">

                🔝 Tope:
                $${c.tope}

            </p>

        `;

    }


    // =============================================
    // BOTÓN
    // =============================================

    const botonDeshabilitado =
        c.estado === "agotado";


    tarjeta.innerHTML = `

        <div class="cuponEstado">

            ${estadoTexto}

        </div>


        <h3 class="cuponNombre">

            🎟️
            ${c.nombre || "CUPÓN"}

        </h3>


        <div class="cuponDescuento">

            ${obtenerDescuento(c)}

        </div>


        <p class="cuponMinimo">

            🛒 Compra mínima:
            <strong>
                $${c.minimo || 0}
            </strong>

        </p>


        ${topeHTML}


        <div class="cuponCodigo">

            🔐
            <span>
                CUPÓN OCULTO
            </span>

        </div>


        <button
            class="btnCopiarCupon"
            ${botonDeshabilitado ? "disabled" : ""}
        >

            ${
                botonDeshabilitado
                ?
                "🔴 AGOTADO"
                :
                "📋 COPIAR CUPÓN"
            }

        </button>

    `;


    // =============================================
    // BOTÓN COPIAR
    // =============================================

    const boton =
        tarjeta.querySelector(
            ".btnCopiarCupon"
        );


    boton?.addEventListener(
        "click",
        event => {

            event.preventDefault();

            if (
                c.estado ===
                "agotado"
            ) {

                return;

            }


            copiarCupon(

                item.id,

                c.codigo,

                c.link ||
                LINK_MERCADO_LIBRE

            );

        }
    );


    return tarjeta;

}


// =====================================================
// LIMPIAR SECCIONES
// =====================================================

function limpiar() {

    if (relampago)
        relampago.innerHTML = "";

    if (bancarios)
        bancarios.innerHTML = "";

    if (exclusivos)
        exclusivos.innerHTML = "";

}


// =====================================================
// ORDENAR CUPONES
// =====================================================

function ordenarCupones(
    lista,
    tipo
) {

    return lista
        .filter(
            item =>
                item.data().tipo === tipo
        )
        .sort(
            (a, b) => {

                const descuentoA =
                    Number(
                        a.data().descuento || 0
                    );

                const descuentoB =
                    Number(
                        b.data().descuento || 0
                    );


                // Relámpagos:
                // menor → mayor

                if (
                    tipo ===
                    "relampago"
                ) {

                    return (
                        descuentoA -
                        descuentoB
                    );

                }


                // Bancarios:
                // mayor → menor

                return (
                    descuentoB -
                    descuentoA
                );

            }
        );

}


// =====================================================
// CARGAR CUPONES
// =====================================================

export function cargarCupones() {

    if (
        !relampago &&
        !bancarios &&
        !exclusivos
    ) {

        return;

    }


    onSnapshot(

        collection(
            db,
            "cupones"
        ),

        datos => {

            limpiar();


            // =========================================
            // SEPARAR
            // =========================================

            const todos =
                datos.docs;


            const listaRelampago =
                ordenarCupones(
                    todos,
                    "relampago"
                );


            const listaBancarios =
                ordenarCupones(
                    todos,
                    "bancario"
                );


            const listaExclusivos =
                todos.filter(
                    item =>
                        item.data().tipo ===
                        "exclusivo"
                );


            // =========================================
            // RELÁMPAGO
            // =========================================

            listaRelampago.forEach(
                item => {

                    relampago?.appendChild(
                        crearTarjeta(item)
                    );

                }
            );


            // =========================================
            // BANCARIOS
            // =========================================

            listaBancarios.forEach(
                item => {

                    bancarios?.appendChild(
                        crearTarjeta(item)
                    );

                }
            );


            // =========================================
            // EXCLUSIVOS
            // =========================================

            listaExclusivos.forEach(
                item => {

                    exclusivos?.appendChild(
                        crearTarjeta(item)
                    );

                }
            );


            // =========================================
            // MENSAJES VACÍOS
            // =========================================

            if (
                relampago &&
                !relampago.children.length
            ) {

                relampago.innerHTML =
                    `
                    <div class="sinCupones">
                        ⚡ No hay cupones relámpago
                    </div>
                    `;

            }


            if (
                bancarios &&
                !bancarios.children.length
            ) {

                bancarios.innerHTML =
                    `
                    <div class="sinCupones">
                        💳 No hay cupones bancarios
                    </div>
                    `;

            }


            if (
                exclusivos &&
                !exclusivos.children.length
            ) {

                exclusivos.innerHTML =
                    `
                    <div class="sinCupones">
                        ⭐ No hay cupones exclusivos
                    </div>
                    `;

            }

        },

        error => {

            console.error(
                "Error cargando cupones:",
                error
            );

        }

    );

}


// =====================================================
// INICIAR
// =====================================================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        cargarCupones();

    }
);


// =====================================================
// FIN CUPONES.JS
// =====================================================