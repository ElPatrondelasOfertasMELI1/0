// =====================================================
// ⚡ EL PATRÓN DE LAS OFERTAS
// USUARIO.JS
// Sistema de usuario opcional
// SIN FIRESTORE
// =====================================================
console.log("👤 USUARIO.JS CARGADO");
// =====================================================
// CLAVES LOCALSTORAGE
// =====================================================
const USUARIO_KEY = "patron_usuario";
const ESTADISTICAS_KEY = "patron_estadisticas";
// =====================================================
// OBTENER USUARIO
// =====================================================
function obtenerUsuario() {
    try {
        const guardado =
            localStorage.getItem(
                USUARIO_KEY
            );
        if (guardado) {
            return JSON.parse(
                guardado
            );
        }
    }
    catch (error) {
        console.error(
            "Error leyendo usuario:",
            error
        );
    }
    return {
        id:
            "USR-" +
            Date.now() +
            "-" +
            Math.floor(
                Math.random() * 99999
            ),
        nombre:
            "",
        registrado:
            false,
        fechaRegistro:
            null
    };
}
// =====================================================
// GUARDAR USUARIO
// =====================================================
function guardarUsuario(
    usuario
) {
    localStorage.setItem(
        USUARIO_KEY,
        JSON.stringify(
            usuario
        )
    );
}
// =====================================================
// OBTENER ESTADÍSTICAS
// =====================================================
function obtenerEstadisticas() {
    try {
        const guardado =
            localStorage.getItem(
                ESTADISTICAS_KEY
            );
        if (guardado) {
            return {
                visitas: 0,
                copias: 0,
                ahorro: 0,
                compras: 0,
                ...JSON.parse(
                    guardado
                )
            };
        }
    }
    catch (error) {
        console.error(
            "Error leyendo estadísticas:",
            error
        );
    }
    return {
        visitas: 0,
        copias: 0,
        ahorro: 0,
        compras: 0
    };
}
// =====================================================
// GUARDAR ESTADÍSTICAS
// =====================================================
function guardarEstadisticas(
    datos
) {
    localStorage.setItem(
        ESTADISTICAS_KEY,
        JSON.stringify(
            datos
        )
    );
}
// =====================================================
// REGISTRAR VISITA
// =====================================================
function registrarVisitaUsuario() {
    const datos =
        obtenerEstadisticas();
    datos.visitas =
        Number(
            datos.visitas
        ) + 1;
    guardarEstadisticas(
        datos
    );
    console.log(
        "👀 Visitas:",
        datos.visitas
    );
}
// =====================================================
// REGISTRAR COPIA + AHORRO
// =====================================================
function registrarCopiaUsuario(
    ahorro = 0
) {
    const datos =
        obtenerEstadisticas();
    datos.copias =
        Number(
            datos.copias
        ) + 1;
    const cantidad =
        Number(
            ahorro
        ) || 0;
    datos.ahorro =
        Number(
            datos.ahorro
        ) + cantidad;
    guardarEstadisticas(
        datos
    );
    console.log(
        "📋 Copias:",
        datos.copias
    );
    console.log(
        "💰 Ahorro:",
        datos.ahorro
    );
    actualizarPerfil();
}
// =====================================================
// REGISTRAR COMPRA
// =====================================================
function registrarCompraUsuario() {
    const datos =
        obtenerEstadisticas();
    datos.compras =
        Number(
            datos.compras
        ) + 1;
    guardarEstadisticas(
        datos
    );
    actualizarPerfil();
}
// =====================================================
// CREAR MODAL
// =====================================================
function crearModalUsuario() {
    // Si ya existe simplemente abrirlo
    const existente =
        document.getElementById(
            "usuarioModal"
        );
    if (existente) {
        existente.classList.add(
            "active"
        );
        actualizarPerfil();
        return;
    }
    // =================================================
    // MODAL
    // =================================================
    const modal =
        document.createElement(
            "div"
        );
    modal.id =
        "usuarioModal";
    modal.innerHTML = `
        <div
            id="usuarioOverlay"
            class="usuario-overlay"
        ></div>
        <div class="usuario-modal-card">
            <button
                type="button"
                id="cerrarUsuario"
                class="usuario-cerrar"
                aria-label="Cerrar"
            >
                ✕
            </button>
            <div class="usuario-avatar">
                👤
            </div>
            <h2>
                Mi cuenta
            </h2>
            <p class="usuario-subtitulo">
                Regístrate opcionalmente y
                participa en nuestros premios.
            </p>
            <!-- REGISTRO -->
            <div
                id="usuarioRegistro"
                class="usuario-registro"
            >
                <label>
                    ¿Cómo te llamas?
                </label>
                <input
                    id="nombreUsuario"
                    type="text"
                    maxlength="40"
                    autocomplete="name"
                    placeholder="Escribe tu nombre"
                >
                <button
                    type="button"
                    id="guardarUsuarioBtn"
                    class="usuario-boton"
                >
                    👤 CREAR MI CUENTA
                </button>
            </div>
            <!-- PERFIL -->
            <div
                id="usuarioPerfil"
                class="usuario-perfil"
                style="display:none;"
            >
                <div class="usuario-saludo">
                    👋 Hola,
                    <strong
                        id="perfilNombre"
                    >
                    </strong>
                </div>
                <div class="usuario-estadisticas">
                    <div class="usuario-stat">
                        <span>
                            👀
                        </span>
                        <strong
                            id="perfilVisitas"
                        >
                            0
                        </strong>
                        <small>
                            Visitas
                        </small>
                    </div>
                    <div class="usuario-stat">
                        <span>
                            📋
                        </span>
                        <strong
                            id="perfilCopias"
                        >
                            0
                        </strong>
                        <small>
                            Cupones usados
                        </small>
                    </div>
                    <div class="usuario-stat">
                        <span>
                            💰
                        </span>
                        <strong
                            id="perfilAhorro"
                        >
                            $0
                        </strong>
                        <small>
                            Ahorrado
                        </small>
                    </div>
                    <div class="usuario-stat">
                        <span>
                            🛒
                        </span>
                        <strong
                            id="perfilCompras"
                        >
                            0
                        </strong>
                        <small>
                            Compras
                        </small>
                    </div>
                </div>
                <div class="usuario-premio">
                    🏆
                    <strong>
                        Programa de premios
                    </strong>
                    <p>
                        Próximamente podrás
                        registrar tus compras
                        y participar para ganar
                        premios.
                    </p>
                </div>
                <button
                    type="button"
                    id="cerrarPerfilBtn"
                    class="usuario-boton-secundario"
                >
                    CERRAR
                </button>
            </div>
            <div
                id="usuarioMensaje"
                class="usuario-mensaje"
            ></div>
        </div>
    `;
    document.body.appendChild(
        modal
    );
    // =================================================
    // CERRAR
    // =================================================
    document
        .getElementById(
            "cerrarUsuario"
        )
        ?.addEventListener(
            "click",
            cerrarModalUsuario
        );
    document
        .getElementById(
            "usuarioOverlay"
        )
        ?.addEventListener(
            "click",
            cerrarModalUsuario
        );
    document
        .getElementById(
            "cerrarPerfilBtn"
        )
        ?.addEventListener(
            "click",
            cerrarModalUsuario
        );
    // =================================================
    // REGISTRAR
    // =================================================
    document
        .getElementById(
            "guardarUsuarioBtn"
        )
        ?.addEventListener(
            "click",
            registrarUsuario
        );
    // Enter en nombre
    document
        .getElementById(
            "nombreUsuario"
        )
        ?.addEventListener(
            "keydown",
            event => {
                if (
                    event.key ===
                    "Enter"
                ) {
                    registrarUsuario();
                }
            }
        );
    // =================================================
    // MOSTRAR
    // =================================================
    actualizarPerfil();
    modal.classList.add(
        "active"
    );
}
// =====================================================
// REGISTRAR USUARIO
// =====================================================
function registrarUsuario() {
    const input =
        document.getElementById(
            "nombreUsuario"
        );
    if (!input) return;
    const nombre =
        input.value.trim();
    if (!nombre) {
        mostrarMensaje(
            "⚠️ Escribe tu nombre"
        );
        input.focus();
        return;
    }
    const usuario =
        obtenerUsuario();
    usuario.nombre =
        nombre;
    usuario.registrado =
        true;
    if (
        !usuario.fechaRegistro
    ) {
        usuario.fechaRegistro =
            new Date().toISOString();
    }
    guardarUsuario(
        usuario
    );
    mostrarMensaje(
        "🎉 ¡Cuenta creada correctamente!"
    );
    actualizarPerfil();
    console.log(
        "👤 Usuario registrado:",
        usuario
    );
}
// =====================================================
// ACTUALIZAR PERFIL
// =====================================================
function actualizarPerfil() {
    const usuario =
        obtenerUsuario();
    const datos =
        obtenerEstadisticas();
    const registro =
        document.getElementById(
            "usuarioRegistro"
        );
    const perfil =
        document.getElementById(
            "usuarioPerfil"
        );
    if (
        registro &&
        perfil
    ) {
        if (
            usuario.registrado
        ) {
            registro.style.display =
                "none";
            perfil.style.display =
                "block";
        }
        else {
            registro.style.display =
                "block";
            perfil.style.display =
                "none";
        }
    }
    const nombre =
        document.getElementById(
            "perfilNombre"
        );
    const visitas =
        document.getElementById(
            "perfilVisitas"
        );
    const copias =
        document.getElementById(
            "perfilCopias"
        );
    const ahorro =
        document.getElementById(
            "perfilAhorro"
        );
    const compras =
        document.getElementById(
            "perfilCompras"
        );
    if (nombre) {
        nombre.textContent =
            usuario.nombre ||
            "Usuario";
    }
    if (visitas) {
        visitas.textContent =
            datos.visitas;
    }
    if (copias) {
        copias.textContent =
            datos.copias;
    }
    if (ahorro) {
        ahorro.textContent =
            "$" +
            Number(
                datos.ahorro
            ).toLocaleString(
                "es-MX"
            );
    }
    if (compras) {
        compras.textContent =
            datos.compras;
    }
}
// =====================================================
// CERRAR MODAL
// =====================================================
function cerrarModalUsuario() {
    const modal =
        document.getElementById(
            "usuarioModal"
        );
    if (modal) {
        modal.classList.remove(
            "active"
        );
    }
}
// =====================================================
// MENSAJE
// =====================================================
function mostrarMensaje(
    texto
) {
    const elemento =
        document.getElementById(
            "usuarioMensaje"
        );
    if (!elemento) return;
    elemento.textContent =
        texto;
    setTimeout(
        () => {
            if (
                elemento
            ) {
                elemento.textContent =
                    "";
            }
        },
        3000
    );
}
// =====================================================
// CONECTAR BOTONES DE INDEX
// =====================================================
function conectarBotonesUsuario() {
    const userBtn =
        document.getElementById(
            "userBtn"
        );
    const registerRewardBtn =
        document.getElementById(
            "registerRewardBtn"
        );
    const accountBtn =
        document.getElementById(
            "accountBtn"
        );
    userBtn?.addEventListener(
        "click",
        () => {
            crearModalUsuario();
        }
    );
    registerRewardBtn?.addEventListener(
        "click",
        () => {
            crearModalUsuario();
        }
    );
    accountBtn?.addEventListener(
        "click",
        () => {
            crearModalUsuario();
        }
    );
}
// =====================================================
// INICIO
// =====================================================
function iniciarUsuario() {
    console.log(
        "👤 Iniciando sistema de usuario..."
    );
    registrarVisitaUsuario();
    conectarBotonesUsuario();
    console.log(
        "✅ Sistema de usuario listo"
    );
}
if (
    document.readyState ===
    "loading"
) {
    document.addEventListener(
        "DOMContentLoaded",
        iniciarUsuario
    );
}
else {
    iniciarUsuario();
}
// =====================================================
// FUNCIONES GLOBALES
// =====================================================
window.obtenerUsuario =
    obtenerUsuario;
window.obtenerEstadisticas =
    obtenerEstadisticas;
window.registrarVisitaUsuario =
    registrarVisitaUsuario;
window.registrarCopiaUsuario =
    registrarCopiaUsuario;
window.registrarCompraUsuario =
    registrarCompraUsuario;
window.crearModalUsuario =
    crearModalUsuario;
window.abrirPerfilUsuario =
    crearModalUsuario;
window.cerrarModalUsuario =
    cerrarModalUsuario;
// =====================================================
// FIN
// =====================================================
console.log(
    "👤 USUARIO.JS PREPARADO"
);