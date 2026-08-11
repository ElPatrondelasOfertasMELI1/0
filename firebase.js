// =====================================================
// ⚡ EL PATRÓN DE LAS OFERTAS
// FIREBASE.JS
// =====================================================

import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
    getAuth
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
    getFirestore
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


// =====================================================
// CONFIGURACIÓN FIREBASE
// =====================================================

const firebaseConfig = {

    apiKey: "TU_API_KEY",

    authDomain:
        "TU_PROYECTO.firebaseapp.com",

    projectId:
        "TU_PROJECT_ID",

    storageBucket:
        "TU_PROJECT_ID.appspot.com",

    messagingSenderId:
        "TU_SENDER_ID",

    appId:
        "TU_APP_ID"

};


// =====================================================
// INICIALIZAR
// =====================================================

const app =
    initializeApp(firebaseConfig);

const auth =
    getAuth(app);

const db =
    getFirestore(app);


// =====================================================
// EXPORTAR
// =====================================================

export {
    app,
    auth,
    db
};

console.log(
    "🔥 Firebase conectado"
);