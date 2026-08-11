// =====================================================
// ⚡ CUPONES.JS
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
    copiarYabrirMercadoLibre
} from "./mercado-libre.js";

import {
    registrarCopiaCupon
} from "./estadisticas.js";


const contenedores = {

    relampago:
        document.getElementById(
            "cuponesRelampago"
        ),

    exclusivos:
        document.getElementById(
            "cuponesExclusivos"
        ),

    bancarios:
        document.getElementById(
            "cuponesBancarios"
        )

};


function estadoClase(estado){

    const texto =
        String(estado || "")
            .toLowerCase();

    if(
        texto.includes("agot")
    ){

        return "danger";

    }

    if(
        texto.includes("por")
    ){

        return "warning";

    }

    if(
        texto.includes("próx") ||
        texto.includes("proxim")
    ){

        return "soon";

    }

    return "";

}


function crearTarjeta(cupon){

    const article =
        document.createElement(
            "article"
        );

    article.className =
        "cuponCard";


    const codigo =
        String(
            cupon.codigo || ""
        )
        .trim()
        .toUpperCase();


    const links =
        Array.isArray(cupon.links)
            ? cupon.links
            : cupon.link
                ? [cupon.link]
                : [];


    const enlacesHTML =
        links
            .filter(Boolean)
            .map(
                (
                    link,
                    index
                ) => `
                    <a
                        href="${link}"
                        target="_blank"
                        rel="noopener"
                    >
                        🔗 Enlace ${index + 1}
                    </a>
                `
            )
            .join("");


    article.innerHTML = `

        <div class="cuponEstado ${estadoClase(
            cupon.estado
        )}">
            ${cupon.estado || "🟢 ACTIVO"}
        </div>

        <div class="cuponIcon">
            🎟️
        </div>

        <h3>
            ${cupon.nombre || "Cupón"}
        </h3>

        <div class="cuponDescuento">
            ${cupon.descuento || ""}
        </div>

        ${
            cupon.minimo
                ? `
                    <div class="cuponMinimo">
                        🛒 Compra mínima:
                        <strong>
                            ${cupon.minimo}
                        </strong>
                    </div>
                `
                : ""
        }

        ${
            cupon.tope
                ? `
                    <div class="cuponTope">
                        🔝 Tope:
                        <strong>
                            ${cupon.tope}
                        </strong>
                    </div>
                `
                : ""
        }

        <div class="cuponCodigo">
            ${codigo || "CUPÓN"}
        </div>

        <button
            class="copiarCupon"
            type="button"
        >
            📋 COPIAR CUPÓN
        </button>

        ${
            enlacesHTML
                ? `
                    <div class="cuponLinks">
                        ${enlacesHTML}
                    </div>
                `
                : ""
        }

    `;


    const boton =
        article.querySelector(
            ".copiarCupon"
        );


    boton.addEventListener(
        "click",
        async () => {

            const copiado =
                await copiarYabrirMercadoLibre(
                    codigo,
                    links[0]
                );


            if(copiado){

                await registrarCopiaCupon(
                    cupon.id || "",
                    codigo
                );


                setTimeout(
                    () => {

                        if(links[0]){

                            window.location.href =
                                links[0];

                        }

                    },
                    450
                );

            }

        }
    );


    return article;

}


function renderizar(
    tipo,
    datos
){

    const contenedor =
        contenedores[tipo];

    if(!contenedor) return;


    contenedor.innerHTML = "";


    if(!datos.length){

        contenedor.innerHTML = `
            <div class="loadingCard">
                😴 No hay cupones disponibles.
            </div>
        `;

        return;

    }


    datos.forEach(
        cupon => {

            contenedor.appendChild(
                crearTarjeta(cupon)
            );

        }
    );

}


export function iniciarCupones(){

    onSnapshot(
        collection(
            db,
            "cupones"
        ),
        snapshot => {

            const grupos = {

                relampago:[],
                exclusivos:[],
                bancarios:[]

            };


            snapshot.forEach(
                item => {

                    const data =
                        item.data();

                    const cupon = {

                        id:
                            item.id,

                        ...data,

                        codigo:
                            String(
                                data.codigo || ""
                            )
                            .toUpperCase()

                    };


                    if(
                        grupos[cupon.tipo]
                    ){

                        grupos[
                            cupon.tipo
                        ].push(
                            cupon
                        );

                    }

                }
            );


            renderizar(
                "relampago",
                grupos.relampago
            );

            renderizar(
                "exclusivos",
                grupos.exclusivos
            );

            renderizar(
                "bancarios",
                grupos.bancarios
            );

        },
        error => {

            console.error(
                "Error cargando cupones",
                error
            );

            Object.values(
                contenedores
            ).forEach(
                contenedor => {

                    if(contenedor){

                        contenedor.innerHTML = `
                            <div class="loadingCard">
                                ❌ No se pudieron cargar los cupones.
                            </div>
                        `;

                    }

                }
            );

        }
    );

}