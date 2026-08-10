// =====================================================
// ⚡ EL PATRÓN DE LAS OFERTAS
// USUARIO.JS
// Registro + estadísticas personales
// Firestore: SOLO DATOS
// Sin Firebase Storage
// =====================================================
console.log("👤 USUARIO.JS CARGADO");
import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    updateDoc,
    increment,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
// =====================================================
// FIREBASE
// =====================================================
const firebaseConfig = {
    apiKey:
        "AIzaSyBo_wk-k8TrcSl0MQzQ0hoUCvAKre94hW0",
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
const app =
    initializeApp(firebaseConfig);
const db =
    getFirestore(app);
// =====================================================
// ELEMENTOS
// =====================================================
const userBtn =
    document.getElementById("userBtn");
const accountBtn =
    document.getElementById("accountBtn");
const registerRewardBtn =
    document.getElementById(
        "registerRewardBtn"
    );
// =====================================================
// USUARIO LOCAL
// =====================================================
function obtenerIDLocal() {
    let id =
        localStorage.getItem(
            "patronUsuarioID"
        );
    if (!id) {
        id =
            "usr_" +
            Date.now() +
            "_" +
            Math.random()
                .toString(36)
                .substring(2, 9);
        localStorage.setItem(
            "patronUsuarioID",
            id
        );
    }
    return id;
}
// =====================================================
// DATOS LOCALES
// =====================================================
function obtenerDatosLocales() {
    const datos =
        localStorage.getItem(
            "patronUsuarioDatos"
        );
    if (!datos) {
        return {
            visitas: 0,
            copias: 0,
            ahorro: 0,
            compras: 0
        };
    }
    try {
        return JSON.parse(datos);
    }
    catch {
        return {
            visitas: 0,
            copias: 0,
            ahorro: 0,
            compras: 0
        };
    }
}
// =====================================================
// GUARDAR DATOS LOCALES
// =====================================================
function guardarDatosLocales(
    datos
) {
    localStorage.setItem(
        "patronUsuarioDatos",
        JSON.stringify(datos)
    );
}
// =====================================================
// REGISTRAR VISITA
// =====================================================
async function registrarVisitaUsuario() {
    const id =
        obtenerIDLocal();
    const datos =
        obtenerDatosLocales();
    datos.visitas++;
    guardarDatosLocales(
        datos
    );
    try {
        await setDoc(
            doc(
                db,
                "usuarios",
                id
            ),
            {
                visitas:
                    increment(1),
                ultimaVisita:
                    serverTimestamp(),
                actualizado:
                    serverTimestamp()
            },
            {
                merge: true
            }
        );
    }
    catch (error) {
        console.error(
            "❌ Error registrando visita:",
            error
        );
    }
}
// =====================================================
// REGISTRAR COPIA
// =====================================================
async function registrarCopiaUsuario(
    ahorro = 0
) {
    const id =
        obtenerIDLocal();
    const datos =
        obtenerDatosLocales();
    datos.copias++;
    datos.ahorro +=
        Number(ahorro) || 0;
    guardarDatosLocales(
        datos
    );
    try {
        await setDoc(
            doc(
                db,
                "usuarios",
                id
            ),
            {
                copias:
                    increment(1),
                ahorro:
                    increment(
                        Number(ahorro) || 0
                    ),
                actualizado:
                    serverTimestamp()
            },
            {
                merge: true
            }
        );
    }
    catch (error) {
        console.error(
            "❌ Error registrando copia:",
            error
        );
    }
}
// =====================================================
// REGISTRAR COMPRA
// =====================================================
async function registrarCompra(
    monto
) {
    const id =
        obtenerIDLocal();
    const datos =
        obtenerDatosLocales();
    datos.compras++;
    guardarDatosLocales(
        datos
    );
    try {
        await setDoc(
            doc(
                db,
                "usuarios",
                id
            ),
            {
                compras:
                    increment(1),
                totalCompras:
                    increment(
                        Number(monto) || 0
                    ),
                actualizado:
                    serverTimestamp()
            },
            {
                merge: true
            }
        );
    }
    catch (error) {
        console.error(
            "❌ Error registrando compra:",
            error
        );
    }
}
// =====================================================
// ABRIR REGISTRO
// =====================================================
function abrirRegistro() {
    let modal =
        document.getElementById(
            "modalUsuario"
        );
    if (modal) {
        modal.classList.add(
            "activo"
        );
        return;
    }
    modal =
        document.createElement(
            "div"
        );
    modal.id =
        "modalUsuario";
    modal.className =
        "usuario-modal";
    modal.innerHTML = `
        <div class="usuario-box">
            <button
                class="usuario-cerrar"
                id="cerrarUsuario"
            >
                ✕
            </button>
            <div class="usuario-logo">
                👤
            </div>
            <h2>
                Crea tu cuenta
            </h2>
            <p>
                Participa opcionalmente en
                nuestro programa de premios.
            </p>
            <input
                id="nombreUsuario"
                type="text"
                placeholder="Tu nombre"
                maxlength="40"
            >
            <input
                id="correoUsuario"
                type="email"
                placeholder="Correo electrónico"
                maxlength="100"
            >
            <button
                id="guardarUsuario"
                class="btn btn-primary"
            >
                🚀 CREAR CUENTA
            </button>
            <button
                id="continuarInvitado"
                class="usuario-invitado"
            >
                Continuar sin registrarme
            </button>
            <p
                id="errorUsuario"
                class="usuario-error"
            ></p>
        </div>
    `;
    document.body.appendChild(
        modal
    );
    document
        .getElementById(
            "cerrarUsuario"
        )
        .onclick = () => {
            modal.classList.remove(
                "activo"
            );
        };
    document
        .getElementById(
            "continuarInvitado"
        )
        .onclick = () => {
            modal.classList.remove(
                "activo"
            );
        };
    document
        .getElementById(
            "guardarUsuario"
        )
        .onclick =
        guardarUsuario;
}
// =====================================================
// GUARDAR USUARIO
// =====================================================
async function guardarUsuario() {
    const nombre =
        document
            .getElementById(
                "nombreUsuario"
            )
            .value
            .trim();
    const correo =
        document
            .getElementById(
                "correoUsuario"
            )
            .value
            .trim();
    const error =
        document
            .getElementById(
                "errorUsuario"
            );
    if (!nombre) {
        error.textContent =
            "⚠️ Escribe tu nombre.";
        return;
    }
    if (
        !correo ||
        !correo.includes("@")
    ) {
        error.textContent =
            "⚠️ Escribe un correo válido.";
        return;
    }
    const id =
        obtenerIDLocal();
    const datos =
        obtenerDatosLocales();
    try {
        await setDoc(
            doc(
                db,
                "usuarios",
                id
            ),
            {
                nombre:
                    nombre,
                correo:
                    correo,
                visitas:
                    datos.visitas,
                copias:
                    datos.copias,
                ahorro:
                    datos.ahorro,
                compras:
                    datos.compras,
                registrado:
                    true,
                fechaRegistro:
                    serverTimestamp(),
                actualizado:
                    serverTimestamp()
            },
            {
                merge: true
            }
        );
        localStorage.setItem(
            "patronUsuarioRegistrado",
            "true"
        );
        localStorage.setItem(
            "patronUsuarioNombre",
            nombre
        );
        const modal =
            document.getElementById(
                "modalUsuario"
            );
        if (modal) {
            modal.classList.remove(
                "activo"
            );
        }
        mostrarToastUsuario(
            "🎉 ¡Cuenta creada correctamente!"
        );
    }
    catch (error) {
        console.error(
            error
        );
        document
            .getElementById(
                "errorUsuario"
            )
            .textContent =
            "❌ No se pudo crear la cuenta.";
    }
}
// =====================================================
// PERFIL
// =====================================================
async function abrirPerfil() {
    const id =
        obtenerIDLocal();
    let datos =
        obtenerDatosLocales();
    try {
        const resultado =
            await getDoc(
                doc(
                    db,
                    "usuarios",
                    id
                )
            );
        if (
            resultado.exists()
        ) {
            const firebaseDatos =
                resultado.data();
            datos = {
                visitas:
                    firebaseDatos.visitas || 0,
                copias:
                    firebaseDatos.copias || 0,
                ahorro:
                    firebaseDatos.ahorro || 0,
                compras:
                    firebaseDatos.compras || 0
            };
        }
    }
    catch (error) {
        console.warn(
            "⚠️ No se pudo cargar perfil:",
            error
        );
    }
    let modal =
        document.getElementById(
            "modalPerfil"
        );
    if (modal) {
        modal.classList.add(
            "activo"
        );
        return;
    }
    modal =
        document.createElement(
            "div"
        );
    modal.id =
        "modalPerfil";
    modal.className =
        "usuario-modal";
    const nombre =
        localStorage.getItem(
            "patronUsuarioNombre"
        ) ||
        "Usuario";
    modal.innerHTML = `
        <div class="usuario-box perfil-box">
            <button
                class="usuario-cerrar"
                id="cerrarPerfil"
            >
                ✕
            </button>
            <div class="usuario-logo">
                👤
            </div>
            <h2>
                Hola, ${nombre}
            </h2>
            <p>
                Tus estadísticas
            </p>
            <div class="perfil-stats">
                <div>
                    👀
                    <strong>
                        ${datos.visitas}
                    </strong>
                    <span>
                        Visitas
                    </span>
                </div>
                <div>
                    📋
                    <strong>
                        ${datos.copias}
                    </strong>
                    <span>
                        Cupones copiados
                    </span>
                </div>
                <div>
                    💰
                    <strong>
                        $${Number(
                            datos.ahorro || 0
                        ).toLocaleString(
                            "es-MX"
                        )}
                    </strong>
                    <span>
                        Ahorro
                    </span>
                </div>
                <div>
                    🛒
                    <strong>
                        ${datos.compras}
                    </strong>
                    <span>
                        Compras
                    </span>
                </div>
            </div>
            <div class="perfil-premio">
                🏆
                <strong>
                    Programa de premios
                </strong>
                <span>
                    Usa nuestros cupones,
                    registra tus compras y
                    participa por premios.
                </span>
            </div>
        </div>
    `;
    document.body.appendChild(
        modal
    );
    document
        .getElementById(
            "cerrarPerfil"
        )
        .onclick = () => {
            modal.classList.remove(
                "activo"
            );
        };
}
// =====================================================
// TOAST
// =====================================================
function mostrarToastUsuario(
    mensaje
) {
    if (
        window.mostrarToast
    ) {
        window.mostrarToast(
            mensaje
        );
        return;
    }
    let toast =
        document.getElementById(
            "toast"
        );
    if (!toast) return;
    toast.textContent =
        mensaje;
    toast.classList.add(
        "show"
    );
    setTimeout(() => {
        toast.classList.remove(
            "show"
        );
    }, 2500);
}
// =====================================================
// FUNCIONES GLOBALES
// =====================================================
window.registrarCopiaUsuario =
    registrarCopiaUsuario;
window.registrarCompra =
    registrarCompra;
window.abrirPerfilUsuario =
    abrirPerfil;
window.abrirRegistroUsuario =
    abrirRegistro;
// =====================================================
// BOTONES
// =====================================================
document.addEventListener(
    "DOMContentLoaded",
    () => {
        registrarVisitaUsuario();
        userBtn?.addEventListener(
            "click",
            () => {
                const registrado =
                    localStorage.getItem(
                        "patronUsuarioRegistrado"
                    );
                if (registrado === "true") {
                    abrirPerfil();
                }
                else {
                    abrirRegistro();
                }
            }
        );
        accountBtn?.addEventListener(
            "click",
            () => {
                abrirRegistro();
            }
        );
        registerRewardBtn?.addEventListener(
            "click",
            () => {
                abrirRegistro();
            }
        );
        console.log(
            "👤 Sistema de usuarios listo"
        );
    }
);