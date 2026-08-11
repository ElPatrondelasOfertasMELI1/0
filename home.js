// =====================================================
// ⚡ EL PATRÓN DE LAS OFERTAS
// HOME.JS
// =====================================================

import {
    iniciarOfertas
} from "./ofertas.js";

import {
    iniciarCarrusel
} from "./carrusel.js";

import {
    iniciarCupones
} from "./cupones.js";

import {
    abrirCuenta
} from "./usuario.js";


// =====================================================
// ELEMENTOS
// =====================================================

const btnMenu =
    document.getElementById(
        "btnMenu"
    );

const cerrarMenu =
    document.getElementById(
        "cerrarMenu"
    );

const menu =
    document.getElementById(
        "menu"
    );

const overlay =
    document.getElementById(
        "overlay"
    );

const btnCuenta =
    document.getElementById(
        "btnCuenta"
    );

const menuCuenta =
    document.getElementById(
        "menuCuenta"
    );

const btnParticipar =
    document.getElementById(
        "btnParticipar"
    );

const btnAnterior =
    document.getElementById(
        "btnAnterior"
    );

const btnSiguiente =
    document.getElementById(
        "btnSiguiente"
    );

const carrusel =
    document.getElementById(
        "carrusel"
    );


// =====================================================
// MENÚ
// =====================================================

function abrirMenu(){

    menu?.classList.add(
        "active"
    );

    overlay?.classList.add(
        "active"
    );

}


function cerrarMenuFuncion(){

    menu?.classList.remove(
        "active"
    );

    overlay?.classList.remove(
        "active"
    );

}


btnMenu?.addEventListener(
    "click",
    abrirMenu
);

cerrarMenu?.addEventListener(
    "click",
    cerrarMenuFuncion
);

overlay?.addEventListener(
    "click",
    cerrarMenuFuncion
);


document
    .querySelectorAll(
        ".menu a"
    )
    .forEach(
        enlace => {

            enlace.addEventListener(
                "click",
                cerrarMenuFuncion
            );

        }
    );


// =====================================================
// CUENTA
// =====================================================

btnCuenta?.addEventListener(
    "click",
    abrirCuenta
);

menuCuenta?.addEventListener(
    "click",
    () => {

        cerrarMenuFuncion();

        abrirCuenta();

    }
);

btnParticipar?.addEventListener(
    "click",
    abrirCuenta
);


// =====================================================
// TOAST GLOBAL
// =====================================================

let toastTimer;


function mostrarToast(
    texto
){

    const toast =
        document.getElementById(
            "toast"
        );

    if(!toast){

        return;

    }


    clearTimeout(
        toastTimer
    );


    toast.textContent =
        texto;


    toast.classList.add(
        "show"
    );


    toastTimer =
        setTimeout(
            () => {

                toast.classList.remove(
                    "show"
                );

            },
            2500
        );

}


window.mostrarToast =
    mostrarToast;


// =====================================================
// BOTONES CARRUSEL
// =====================================================

btnAnterior?.addEventListener(
    "click",
    () => {

        carrusel?.scrollBy({

            left:-280,

            behavior:"smooth"

        });

    }
);


btnSiguiente?.addEventListener(
    "click",
    () => {

        carrusel?.scrollBy({

            left:280,

            behavior:"smooth"

        });

    }
);


// =====================================================
// OFERTAS
// =====================================================

iniciarOfertas(
    ofertas => {

        if(!carrusel){

            return;

        }


        carrusel.innerHTML =
            "";


        if(!ofertas.length){

            carrusel.innerHTML = `
                <div class="loadingCard">
                    😴 No hay ofertas disponibles.
                </div>
            `;

            return;

        }


        ofertas.forEach(
            oferta => {

                import(
                    "./ofertas.js"
                ).then(
                    modulo => {

                        carrusel.appendChild(
                            modulo.crearOfertaCard(
                                oferta
                            )
                        );

                    }
                );

            }
        );


        iniciarCarrusel(
            carrusel
        );

    }
);


// =====================================================
// CUPONES
// =====================================================

iniciarCupones();


// =====================================================
// BANNER MERCADO PAGO
// =====================================================

async function cargarBanner(){

    try{

        const {
            db
        } =
            await import(
                "./firebase.js"
            );


        const {
            doc,
            getDoc
        } =
            await import(
                "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js"
            );


        const ref =
            doc(
                db,
                "configuracion",
                "mercado_pago"
            );


        const snap =
            await getDoc(
                ref
            );


        if(
            !snap.exists()
        ){

            return;

        }


        const data =
            snap.data();


        const banner =
            document.getElementById(
                "bannerMercadoPago"
            );

        const boton =
            document.getElementById(
                "bannerMPButton"
            );


        if(
            data.activo === false
        ){

            banner?.classList.add(
                "hidden"
            );

            return;

        }


        if(
            data.titulo
        ){

            const titulo =
                banner.querySelector(
                    "h2"
                );

            if(titulo){

                titulo.textContent =
                    data.titulo;

            }

        }


        if(
            data.descripcion
        ){

            const descripcion =
                banner.querySelector(
                    "p"
                );

            if(descripcion){

                descripcion.textContent =
                    data.descripcion;

            }

        }


        if(
            data.link &&
            boton
        ){

            boton.href =
                data.link;

        }

    }catch(error){

        console.warn(
            "Banner usando valores predeterminados",
            error
        );

    }

}


cargarBanner();


console.log(
    "⚡ EL PATRÓN DE LAS OFERTAS INICIADO"
);