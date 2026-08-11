// =====================================================
// ⚡ EL PATRÓN DE LAS OFERTAS
// MERCADO-LIBRE.JS
// =====================================================

const ENLACE_AFILIADO =
    "https://meli.la/1mj3itE";

function esAndroid(){

    return /Android/i.test(
        navigator.userAgent
    );

}

function esIOS(){

    return /iPhone|iPad|iPod/i.test(
        navigator.userAgent
    );

}


// =====================================================
// ABRIR MERCADO LIBRE
// =====================================================

export function abrirMercadoLibre(
    link = ENLACE_AFILIADO
){

    if(
        !link ||
        link === "#"
    ){

        window.mostrarToast?.(
            "⚠️ Enlace no disponible"
        );

        return;

    }

    if(esAndroid()){

        try{

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

        }catch(error){

            console.warn(
                "No se pudo abrir intent",
                error
            );

        }

    }

    if(esIOS()){

        window.location.href =
            link;

        return;

    }

    window.location.href =
        link;

}


export async function copiarYabrirMercadoLibre(
    codigo,
    link
){

    if(!codigo){

        window.mostrarToast?.(
            "❌ Cupón no disponible"
        );

        return false;

    }

    const codigoFinal =
        String(codigo)
            .trim()
            .toUpperCase();

    try{

        await navigator.clipboard.writeText(
            codigoFinal
        );

        window.mostrarToast?.(
            `✅ ${codigoFinal} COPIADO`
        );

        return true;

    }catch(error){

        console.error(
            "Error copiando cupón",
            error
        );

        window.mostrarToast?.(
            "❌ No se pudo copiar el cupón"
        );

        return false;

    }

}


export {
    ENLACE_AFILIADO
};