// =====================================================
// ⚡ OFERTAS.JS
// =====================================================

import {
    collection,
    onSnapshot
} from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import {
    db
} from "./firebase.js";

import {
    registrarClicOferta
} from "./estadisticas.js";


export let ofertasActuales = [];


function calcularDescuento(
    antes,
    actual
){

    const pAntes =
        Number(antes) || 0;

    const pActual =
        Number(actual) || 0;


    if(
        pAntes <= 0 ||
        pActual <= 0
    ){

        return 0;

    }


    return Math.round(
        (
            1 -
            pActual / pAntes
        ) * 100
    );

}


function moneda(valor){

    return new Intl.NumberFormat(
        "es-MX",
        {
            style:"currency",
            currency:"MXN"
        }
    ).format(
        Number(valor) || 0
    );

}


export function crearOfertaCard(
    oferta
){

    const card =
        document.createElement(
            "article"
        );

    card.className =
        "ofertaCard";


    const descuento =
        oferta.descuento ??
        calcularDescuento(
            oferta.precioAntes,
            oferta.precioActual ??
            oferta.precioFinal
        );


    const precioActual =
        oferta.precioActual ??
        oferta.precioFinal;


    card.innerHTML = `

        <div class="ofertaImage">

            ${
                oferta.imagen
                    ? `
                        <img
                            src="${oferta.imagen}"
                            alt="${oferta.titulo || "Oferta"}"
                            loading="lazy"
                        >
                    `
                    : `
                        <div class="loadingCard">
                            🛒
                        </div>
                    `
            }

            ${
                descuento > 0
                    ? `
                        <span class="ofertaBadge">
                            🔥 ${descuento}% OFF
                        </span>
                    `
                    : ""
            }

        </div>


        <div class="ofertaInfo">

            <h3>
                ${oferta.titulo || "Oferta"}
            </h3>

            ${
                oferta.precioAntes
                    ? `
                        <div class="precioAntes">
                            Antes:
                            <s>
                                ${moneda(
                                    oferta.precioAntes
                                )}
                            </s>
                        </div>
                    `
                    : ""
            }


            <div class="precioFinal">
                ${moneda(
                    precioActual
                )}
            </div>


            ${
                descuento > 0
                    ? `
                        <div class="descuento">
                            🔥 ${descuento}% OFF
                        </div>
                    `
                    : ""
            }


            <a
                href="${oferta.link || "#"}"
                class="btnOferta"
                target="_blank"
                rel="noopener"
            >
                🛒 VER OFERTA
            </a>

        </div>

    `;


    const boton =
        card.querySelector(
            ".btnOferta"
        );


    boton?.addEventListener(
        "click",
        () => {

            registrarClicOferta(
                oferta.id
            );

        }
    );


    return card;

}


export function iniciarOfertas(
    callback
){

    onSnapshot(
        collection(
            db,
            "ofertas"
        ),
        snapshot => {

            ofertasActuales =
                snapshot.docs.map(
                    item => ({

                        id:
                            item.id,

                        ...item.data()

                    })
                );


            callback(
                ofertasActuales
            );

        },
        error => {

            console.error(
                "Error cargando ofertas",
                error
            );

            callback([]);

        }
    );

}