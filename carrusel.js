// =====================================================
// ⚡ CARRUSEL.JS
// =====================================================

let intervaloCarrusel = null;

let pausaCarrusel = false;


export function iniciarCarrusel(
    contenedor
){

    if(!contenedor){

        return;

    }


    const avanzar = () => {

        if(pausaCarrusel){

            return;

        }


        const maxScroll =
            contenedor.scrollWidth -
            contenedor.clientWidth;


        if(
            contenedor.scrollLeft >=
            maxScroll - 10
        ){

            contenedor.scrollTo({
                left:0,
                behavior:"smooth"
            });

        }else{

            contenedor.scrollBy({
                left:280,
                behavior:"smooth"
            });

        }

    };


    intervaloCarrusel =
        setInterval(
            avanzar,
            3500
        );


    contenedor.addEventListener(
        "mouseenter",
        () => {
            pausaCarrusel = true;
        }
    );


    contenedor.addEventListener(
        "mouseleave",
        () => {
            pausaCarrusel = false;
        }
    );


    contenedor.addEventListener(
        "touchstart",
        () => {
            pausaCarrusel = true;
        },
        {
            passive:true
        }
    );


    contenedor.addEventListener(
        "touchend",
        () => {

            setTimeout(
                () => {
                    pausaCarrusel = false;
                },
                1800
            );

        },
        {
            passive:true
        }
    );

}


export function detenerCarrusel(){

    if(intervaloCarrusel){

        clearInterval(
            intervaloCarrusel
        );

        intervaloCarrusel =
            null;

    }

}