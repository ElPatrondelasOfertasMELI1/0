// =====================================================
// EL PATRÓN DE LAS OFERTAS
// FIREBASE.JS
// Configuración central de Firebase
// =====================================================

import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
    getFirestore
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import {
    getAuth
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


// =====================================================
// CONFIGURACIÓN FIREBASE
// =====================================================

const firebaseConfig = {

    apiKey:
        "AIzaSyBo_wk-k8TrcSl0CMQz0hoUCvAKre94H0",

    authDomain:
        "patronofertasweb.firebaseapp.com",

    projectId:
        "patronofertasweb",

    storageBucket:
        "patronofertasweb.firebasestorage.app",

    messagingSenderId:
        "292338334268",

    appId:
        "1:292338334268:web:9dbbafe00dd23ebb72e139"

};


// =====================================================
// INICIALIZAR FIREBASE
// =====================================================

const app =
    initializeApp(firebaseConfig);


// =====================================================
// FIRESTORE
// =====================================================

const db =
    getFirestore(app);


// =====================================================
// AUTHENTICATION
// =====================================================

const auth =
    getAuth(app);


// =====================================================
// EXPORTAR
// =====================================================

export {
    app,
    db,
    auth
};


// =====================================================
// FIN FIREBASE.JS
// =====================================================