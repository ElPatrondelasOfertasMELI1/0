// =====================================================
// ⚡ ESTADÍSTICAS
// =====================================================

import {
    doc,
    getDoc,
    setDoc,
    updateDoc,
    increment,
    collection,
    addDoc,
    serverTimestamp
} from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import {
    db,
    auth
} from "./firebase.js";


// =====================================================
// COPIA DE CUPÓN
// =====================================================

export async function registrarCopiaCupon(
    cuponId,
    codigo
){

    const codigoFinal =
        String(codigo || "")
            .trim()
            .toUpperCase();

    const hoy =
        new Date()
            .toISOString()
            .slice(0,10);


    try{

        const ref =
            doc(
                db,
                "estadisticas",
                "global"
            );

        await setDoc(
            ref,
            {
                copias:
                    increment(1)
            },
            {
                merge:true
            }
        );


        if(cuponId){

            const cuponRef =
                doc(
                    db,
                    "cupones",
                    cuponId
                );

            await setDoc(
                cuponRef,
                {
                    copias:
                        increment(1),

                    codigo:
                        codigoFinal
                },
                {
                    merge:true
                }
            );

        }


        const diaRef =
            doc(
                db,
                "estadisticas_diarias",
                hoy
            );

        await setDoc(
            diaRef,
            {
                copias:
                    increment(1),

                fecha:
                    hoy
            },
            {
                merge:true
            }
        );


        if(auth.currentUser){

            const usuarioRef =
                doc(
                    db,
                    "usuarios",
                    auth.currentUser.uid
                );

            await setDoc(
                usuarioRef,
                {
                    cuponesCopiados:
                        increment(1)
                },
                {
                    merge:true
                }
            );

        }

    }catch(error){

        console.error(
            "Error registrando copia",
            error
        );

    }

}


// =====================================================
// CLIC EN OFERTA
// =====================================================

export async function registrarClicOferta(
    ofertaId
){

    try{

        const hoy =
            new Date()
                .toISOString()
                .slice(0,10);


        await setDoc(
            doc(
                db,
                "estadisticas",
                "global"
            ),
            {
                clics:
                    increment(1)
            },
            {
                merge:true
            }
        );


        await setDoc(
            doc(
                db,
                "estadisticas_diarias",
                hoy
            ),
            {
                clics:
                    increment(1),

                fecha:
                    hoy
            },
            {
                merge:true
            }
        );


        if(ofertaId){

            await setDoc(
                doc(
                    db,
                    "ofertas",
                    ofertaId
                ),
                {
                    clics:
                        increment(1)
                },
                {
                    merge:true
                }
            );

        }

    }catch(error){

        console.error(
            "Error registrando clic",
            error
        );

    }

}