// =====================================================
// ⚡ USUARIO.JS
// =====================================================

import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
    doc,
    setDoc,
    getDoc,
    serverTimestamp
} from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import {
    auth,
    db
} from "./firebase.js";


const modal =
    document.getElementById(
        "cuentaModal"
    );

const nombre =
    document.getElementById(
        "usuarioNombre"
    );

const email =
    document.getElementById(
        "usuarioEmail"
    );

const password =
    document.getElementById(
        "usuarioPassword"
    );

const estado =
    document.getElementById(
        "usuarioEstado"
    );

const cuentaEstado =
    document.getElementById(
        "cuentaEstado"
    );

const registrar =
    document.getElementById(
        "btnRegistrar"
    );

const login =
    document.getElementById(
        "btnLogin"
    );

const logout =
    document.getElementById(
        "btnCerrarSesion"
    );


function mostrarEstado(
    mensaje
){

    if(cuentaEstado){

        cuentaEstado.textContent =
            mensaje;

    }

}


export function abrirCuenta(){

    modal?.classList.add(
        "active"
    );

}


export function cerrarCuenta(){

    modal?.classList.remove(
        "active"
    );

}


async function registrarUsuario(){

    const nombreFinal =
        nombre.value.trim();

    const emailFinal =
        email.value.trim();

    const passwordFinal =
        password.value;

    const estadoFinal =
        estado.value;


    if(
        !nombreFinal ||
        !emailFinal ||
        !passwordFinal ||
        !estadoFinal
    ){

        mostrarEstado(
            "⚠️ Completa todos los campos."
        );

        return;

    }


    if(passwordFinal.length < 6){

        mostrarEstado(
            "⚠️ La contraseña debe tener mínimo 6 caracteres."
        );

        return;

    }


    registrar.disabled =
        true;


    try{

        const credencial =
            await createUserWithEmailAndPassword(
                auth,
                emailFinal,
                passwordFinal
            );


        await setDoc(
            doc(
                db,
                "usuarios",
                credencial.user.uid
            ),
            {

                uid:
                    credencial.user.uid,

                nombre:
                    nombreFinal,

                email:
                    emailFinal,

                estado:
                    estadoFinal,

                visitas:1,

                cuponesCopiados:0,

                ahorro:0,

                creado:
                    serverTimestamp()

            }
        );


        mostrarEstado(
            "✅ Cuenta creada correctamente."
        );


        window.mostrarToast?.(
            "🎉 Bienvenido a El Patrón"
        );


        setTimeout(
            cerrarCuenta,
            1000
        );


    }catch(error){

        console.error(
            error
        );


        let mensaje =
            "❌ No se pudo crear la cuenta.";


        if(
            error.code ===
            "auth/email-already-in-use"
        ){

            mensaje =
                "⚠️ Ese correo ya está registrado.";

        }


        if(
            error.code ===
            "auth/invalid-email"
        ){

            mensaje =
                "⚠️ Correo electrónico inválido.";

        }


        mostrarEstado(
            mensaje
        );

    }


    registrar.disabled =
        false;

}


async function iniciarSesion(){

    const emailFinal =
        email.value.trim();

    const passwordFinal =
        password.value;


    if(
        !emailFinal ||
        !passwordFinal
    ){

        mostrarEstado(
            "⚠️ Escribe correo y contraseña."
        );

        return;

    }


    try{

        await signInWithEmailAndPassword(
            auth,
            emailFinal,
            passwordFinal
        );


        window.mostrarToast?.(
            "✅ Sesión iniciada"
        );


        cerrarCuenta();


    }catch(error){

        console.error(
            error
        );

        mostrarEstado(
            "❌ Correo o contraseña incorrectos."
        );

    }

}


async function cerrarSesion(){

    try{

        await signOut(
            auth
        );

        window.mostrarToast?.(
            "👋 Sesión cerrada"
        );

    }catch(error){

        console.error(
            error
        );

    }

}


onAuthStateChanged(
    auth,
    async user => {

        if(user){

            logout?.classList.remove(
                "hidden"
            );

            registrar?.classList.add(
                "hidden"
            );

            login?.classList.add(
                "hidden"
            );

        }else{

            logout?.classList.add(
                "hidden"
            );

            registrar?.classList.remove(
                "hidden"
            );

            login?.classList.remove(
                "hidden"
            );

        }

    }
);


registrar?.addEventListener(
    "click",
    registrarUsuario
);

login?.addEventListener(
    "click",
    iniciarSesion
);

logout?.addEventListener(
    "click",
    cerrarSesion
);


document
    .getElementById("cerrarCuenta")
    ?.addEventListener(
        "click",
        cerrarCuenta
    );


modal?.addEventListener(
    "click",
    event => {

        if(
            event.target ===
            modal
        ){

            cerrarCuenta();

        }

    }
);