// =====================================================
// ⚡ EL PATRÓN DE LAS OFERTAS
// USUARIO.JS
// Sistema de usuario opcional
// Estadísticas locales
// =====================================================
console.log("👤 USUARIO.JS CARGADO");
// =====================================================
// CONFIGURACIÓN
// =====================================================
const CLAVE_USUARIO =
    "patronUsuario";
const CLAVE_ESTADISTICAS =
    "patronEstadisticas";
// =====================================================
// OBTENER USUARIO
// =====================================================
function obtenerUsuario() {
    let usuario =
        localStorage.getItem(
            CLAVE_USUARIO
        );
    if (!usuario) {
        usuario = {
            id:
                "USR-" +
                Date.now() +
                "-" +
                Math.floor(
                    Math.random() * 9999
                ),
            nombre:
                "",
            registrado:
                false,
            fechaRegistro:
                null
        };
        localStorage.setItem(
            CLAVE_USUARIO,
            JSON.stringify(
                usuario
            )
        );
    }
    else {
        try {
            usuario =
                JSON.parse(
                    usuario
                );
        }
        catch {
            usuario = {
                id:
                    "USR-" +
                    Date.now(),
                nombre:
                    "",
                registrado:
                    false,
                fechaRegistro:
                    null
            };
            localStorage.setItem(
                CLAVE_USUARIO,
                JSON.stringify(
                    usuario
                )
            );
        }
    }
    return usuario;
}
// =====================================================
// GUARDAR USUARIO
// =====================================================
function guardarUsuario(
    usuario
) {
    localStorage.setItem(
        CLAVE_USUARIO,
        JSON.stringify(
            usuario
        )
    );
}
// =====================================================
// ESTADÍSTICAS
// =====================================================
function obtenerEstadisticas() {
    let estadisticas =
        localStorage.getItem(
            CLAVE_ESTADISTICAS
        );
    if (!estadisticas) {
        estadisticas = {
            visitas:
                0,
            copias:
                0,
            ahorro:
                0,
            compras:
                0
        };
        localStorage.setItem(
            CLAVE_ESTADISTICAS,
            JSON.stringify(
                estadisticas
            )
        );
    }
    else {
        try {
            estadisticas =
                JSON.parse(
                    estadisticas
                );
        }
        catch {
            estadisticas = {
                visitas:
                    0,
                copias:
                    0,
                ahorro:
                    0,
                compras:
                    0
            };
        }
    }
    return estadisticas;
}
// =====================================================
// GUARDAR ESTADÍSTICAS
// =====================================================
function guardarEstadisticas(
    estadisticas
) {
    localStorage.setItem(
        CLAVE_ESTADISTICAS,
        JSON.stringify(
            estadisticas
        )
    );
}
// =====================================================
// REGISTRAR VISITA
// =====================================================
function registrarVisitaUsuario() {
    const estadisticas =
        obtenerEstadisticas();
    estadisticas.visitas++;
    guardarEstadisticas(
        estadisticas
    );
    console.log(
        "👀 Visitas:",
        estadisticas.visitas
    );
}
// =====================================================
// REGISTRAR COPIA
// =====================================================
function registrarCopiaUsuario(
    ahorro = 0
) {
    const estadisticas =
        obtenerEstadisticas();
    // Copia
    estadisticas.copias++;
    // Ahorro
    const cantidad =
        Number(
            ahorro
        ) || 0;
    estadisticas.ahorro +=
        cantidad;
    guardarEstadisticas(
        estadisticas
    );
    console.log(
        "📋 Copias:",
        estadisticas.copias
    );
    console.log(
        "💰 Ahorro:",
        estadisticas.ahorro
    );
    // Actualizar pantalla
    actualizarEstadisticasUsuario();
}
// =====================================================
// REGISTRAR COMPRA
// =====================================================
function registrarCompraUsuario() {
    const estadisticas =
        obtenerEstadisticas();
    estadisticas.compras++;
    guardarEstadisticas(
        estadisticas
    );
    actualizarEstadisticasUsuario();
    console.log(
        "🛒 Compras:",
        estadisticas.compras
    );
}
// =====================================================
// REGISTRO DE USUARIO
// =====================================================
function registrarUsuario() {
    const nombreInput =
        document.getElementById(
            "nombreUsuario"
        );
    const nombre =
        nombreInput
        ?
        nombreInput.value.trim()
        :
        "";
    if (!nombre) {
        mostrarMensajeUsuario(
            "⚠️ Escribe tu nombre"
        );
        return;
    }
    const usuario =
        obtenerUsuario();
    usuario.nombre =
        nombre;
    usuario.registrado =
        true;
    usuario.fechaRegistro =
        new Date()
            .toISOString();
    guardarUsuario(
        usuario
    );
    mostrarMensajeUsuario(
        "✅ Registro completado"
    );
    actualizarPerfil();
    cerrarModalUsuario();
}
// =====================================================
// ABRIR PERFIL
// =====================================================
function abrirPerfilUsuario() {
    const usuario =
        obtenerUsuario();
    const estadisticas =
        obtenerEstadisticas();
    const modal =
        document.getElementById(
            "usuarioModal"
        );
    if (!modal) {
        crearModalUsuario();
        return;
    }
    modal.classList.add(
        "active"
    );
    actualizarPerfil();
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
// CREAR MODAL
// =====================================================
function crearModalUsuario() {
    if (
        document.getElementById(
            "usuarioModal"
        )
    ) {
        abrirPerfilUsuario();
        return;
    }
    const modal =
        document.createElement(
            "div"
        );
    modal.id =
        "usuarioModal";
    modal.className =
        "usuario-modal";
    modal.innerHTML = `
        <div class="usuario-overlay"></div>
        <div class="usuario-card">
            <button
                type="button"
                class="usuario-cerrar"
                id="cerrarUsuario"
            >
                ✕
            </button>
            <div class="usuario-avatar">
                👤
            </div>
            <h2>
                Mi cuenta
            </h2>
            <p
                class="usuario-bienvenida"
                id="usuarioBienvenida"
            >
                Participa opcionalmente
                en nuestro programa.
            </p>
            <div
                id="usuarioRegistro"
                class="usuario-registro"
            >
                <input
                    type="text"
                    id="nombreUsuario"
                    placeholder="Tu nombre"
                    maxlength="40"
                >
                <button
                    type="button"
                    id="guardarUsuarioBtn"
                >
                    👤 REGISTRARME
                </button>
            </div>
            <div
                id="usuarioPerfil"
                class="usuario-perfil"
            >
                <div class="usuario-nombre">
                    👋
                    <strong
                        id="perfilNombre"
                    >
                    </strong>
                </div>
                <div class="usuario-stats">
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
                            Cupones
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
                <div class="usuario-premios">
                    🏆
                    <strong>
                        Programa de premios
                    </strong>
                    <p>
                        Próximamente podrás
                        subir tus comprobantes
                        de compra y participar
                        por premios.
                    </p>
                </div>
            </div>
            <div
                id="usuarioMensaje"
                class="usuario-mensaje"
            >
            </div>
        </div>
    `;
    document.body.appendChild(
        modal
    );
    document
        .getElementById(
            "cerrarUsuario"
        )
        ?.addEventListener(
            "click",
            cerrarModalUsuario
        );
    modal
        .querySelector(
            ".usuario-overlay"
        )
        ?.addEventListener(
            "click",
            cerrarModalUsuario
        );
    document
        .getElementById(
            "guardarUsuarioBtn"
        )
        ?.addEventListener(
            "click",
            registrarUsuario
        );
    actualizarPerfil();
    modal.classList.add(
        "active"
    );
}
// =====================================================
// ACTUALIZAR PERFIL
// =====================================================
function actualizarPerfil() {
    const usuario =
        obtenerUsuario();
    const estadisticas =
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
            estadisticas.visitas;
    }
    if (copias) {
        copias.textContent =
            estadisticas.copias;
    }
    if (ahorro) {
        ahorro.textContent =
            "$" +
            estadisticas.ahorro
                .toLocaleString(
                    "es-MX"
                );
    }
    if (compras) {
        compras.textContent =
            estadisticas.compras;
    }
}
// =====================================================
// ACTUALIZAR ESTADÍSTICAS
// =====================================================
function actualizarEstadisticasUsuario() {
    actualizarPerfil();
}
// =====================================================
// MENSAJE
// =====================================================
function mostrarMensajeUsuario(
    mensaje
) {
    const elemento =
        document.getElementById(
            "usuarioMensaje"
        );
    if (!elemento) return;
    elemento.textContent =
        mensaje;
    setTimeout(
        () => {
            elemento.textContent =
                "";
        },
        3000
    );
}
// =====================================================
// BOTONES EXISTENTES DE INDEX
// =====================================================
document.addEventListener(
    "DOMContentLoaded",
    () => {
        // Registrar una visita
        registrarVisitaUsuario();
        // Botón del header
        const userBtn =
            document.getElementById(
                "userBtn"
            );
        userBtn?.addEventListener(
            "click",
            () => {
                crearModalUsuario();
            }
        );
        // Botón de premios
        const registerRewardBtn =
            document.getElementById(
                "registerRewardBtn"
            );
        registerRewardBtn?.addEventListener(
            "click",
            () => {
                crearModalUsuario();
            }
        );
        // Botón de cuenta
        const accountBtn =
            document.getElementById(
                "accountBtn"
            );
        accountBtn?.addEventListener(
            "click",
            () => {
                crearModalUsuario();
            }
        );
        actualizarPerfil();
    }
);
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
window.abrirPerfilUsuario =
    abrirPerfilUsuario;
window.crearModalUsuario =
    crearModalUsuario;
// =====================================================
// FIN
// =====================================================
console.log(
    "👤 Sistema de usuario preparado"
);