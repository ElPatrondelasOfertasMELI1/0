// =====================================================
// EL PATRÓN DE LAS OFERTAS
// NUEVA PLATAFORMA
// HOME.JS
// =====================================================


// =====================================================
// ELEMENTOS
// =====================================================

const btnMenu =
    document.getElementById("btnMenu");

const cerrarMenu =
    document.getElementById("cerrarMenu");

const menu =
    document.getElementById("menu");

const overlay =
    document.getElementById("overlay");

const menuCuenta =
    document.getElementById("menuCuenta");

const btnCuenta =
    document.getElementById("btnCuenta");

const btnParticipar =
    document.getElementById("btnParticipar");

const carrusel =
    document.getElementById("carrusel");

const btnAnterior =
    document.getElementById("btnAnterior");

const btnSiguiente =
    document.getElementById("btnSiguiente");


// =====================================================
// MENÚ
// =====================================================

function abrirMenu(){

    menu?.classList.add("active");

    overlay?.classList.add("active");

}

function cerrarMenuFuncion(){

    menu?.classList.remove("active");

    overlay?.classList.remove("active");

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


// =====================================================
// CUENTA
// =====================================================

function abrirCuenta(){

    cerrarMenuFuncion();

    // Próximamente conectaremos
    // Firebase Authentication.

    mostrarToast(
        "👤 Mi cuenta estará disponible próximamente"
    );

}

btnCuenta?.addEventListener(
    "click",
    abrirCuenta
);

menuCuenta?.addEventListener(
    "click",
    abrirCuenta
);

btnParticipar?.addEventListener(
    "click",
    abrirCuenta
);


// =====================================================
// TOAST
// =====================================================

function mostrarToast(texto){

    const toast =
        document.getElementById("toast");

    if(!toast) return;

    toast.textContent =
        texto;

    toast.classList.add("show");

    setTimeout(()=>{

        toast.classList.remove("show");

    },2500);

}


// =====================================================
// CARRUSEL
// =====================================================

btnAnterior?.addEventListener(
    "click",
    ()=>{

        carrusel?.scrollBy({

            left:-280,

            behavior:"smooth"

        });

    }
);


btnSiguiente?.addEventListener(
    "click",
    ()=>{

        carrusel?.scrollBy({

            left:280,

            behavior:"smooth"

        });

    }
);


// =====================================================
// DATOS DE PRUEBA
// TEMPORALES
// =====================================================

const ofertasDemo = [

    {
        titulo:
            "Oferta de ejemplo Mercado Libre",

        precioAntes:
            "1,999",

        precioFinal:
            "1,299",

        descuento:
            "35% OFF",

        imagen:
            "https://http2.mlstatic.com/D_NQ_NP_2X_000000-MLA00000000000_000000-F.webp"
    },

    {
        titulo:
            "Oferta especial del día",

        precioAntes:
            "3,499",

        precioFinal:
            "2,499",

        descuento:
            "29% OFF",

        imagen:
            "https://http2.mlstatic.com/D_NQ_NP_2X_000000-MLA00000000000_000000-F.webp"
    }

];


// =====================================================
// RENDER DEMO
// =====================================================

function cargarOfertasDemo(){

    if(!carrusel) return;

    carrusel.innerHTML="";

    ofertasDemo.forEach(
        oferta=>{

            const card =
                document.createElement(
                    "article"
                );

            card.className =
                "ofertaCard";

            card.innerHTML=`

                <img
                    src="${oferta.imagen}"
                    alt="${oferta.titulo}"
                >

                <div class="ofertaInfo">

                    <h3>
                        ${oferta.titulo}
                    </h3>

                    <div class="precioAntes">
                        Antes:
                        <s>
                            $${oferta.precioAntes}
                        </s>
                    </div>

                    <div class="precioFinal">
                        $${oferta.precioFinal}
                    </div>

                    <div class="descuento">
                        🔥 ${oferta.descuento}
                    </div>

                    <a
                        href="#"
                        class="btnOferta"
                        onclick="
                            event.preventDefault();
                            mostrarToast('🛒 Próximamente conectado a Mercado Libre');
                        "
                    >
                        🛒 VER OFERTA
                    </a>

                </div>

            `;

            carrusel.appendChild(card);

        }
    );

}


// =====================================================
// INICIO
// =====================================================

cargarOfertasDemo();

console.log(
    "✅ Nueva plataforma cargada correctamente"
);