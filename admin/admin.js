// =====================================================
// ⚡ EL PATRÓN DE LAS OFERTAS
// ADMIN.JS
// Panel administrativo
// =====================================================
console.log("⚡ ADMIN.JS CARGADO");
// =====================================================
// ELEMENTOS
// =====================================================
const loginScreen =
    document.getElementById(
        "loginScreen"
    );
const adminPanel =
    document.getElementById(
        "adminPanel"
    );
const loginForm =
    document.getElementById(
        "loginForm"
    );
const loginMessage =
    document.getElementById(
        "loginMessage"
    );
const logoutBtn =
    document.getElementById(
        "logoutBtn"
    );
const nuevoCuponBtn =
    document.getElementById(
        "nuevoCuponBtn"
    );
const cuponModal =
    document.getElementById(
        "cuponModal"
    );
const cerrarCuponModal =
    document.getElementById(
        "cerrarCuponModal"
    );
const cancelarCupon =
    document.getElementById(
        "cancelarCupon"
    );
const cuponForm =
    document.getElementById(
        "cuponForm"
    );
// =====================================================
// LOGIN DE PRUEBA
// =====================================================
//
// IMPORTANTE:
// Este acceso es únicamente para probar
// el funcionamiento visual.
//
// Después lo conectaremos con Firebase Auth.
//
// =====================================================
const ADMIN_EMAIL =
    "admin@patron.com";
const ADMIN_PASSWORD =
    "12345678";
// =====================================================
// MOSTRAR PANEL
// =====================================================
function mostrarPanel() {
    loginScreen.classList.add(
        "hidden"
    );
    adminPanel.classList.remove(
        "hidden"
    );
}
// =====================================================
// MOSTRAR LOGIN
// =====================================================
function mostrarLogin() {
    loginScreen.classList.remove(
        "hidden"
    );
    adminPanel.classList.add(
        "hidden"
    );
}
// =====================================================
// MENSAJE LOGIN
// =====================================================
function mensajeLogin(
    texto,
    correcto = false
) {
    loginMessage.textContent =
        texto;
    loginMessage.style.color =
        correcto
        ? "#16803c"
        : "#d62828";
}
// =====================================================
// LOGIN
// =====================================================
loginForm?.addEventListener(
    "submit",
    event => {
        event.preventDefault();
        const email =
            document
                .getElementById(
                    "adminEmail"
                )
                .value
                .trim();
        const password =
            document
                .getElementById(
                    "adminPassword"
                )
                .value;
        if (
            email ===
                ADMIN_EMAIL &&
            password ===
                ADMIN_PASSWORD
        ) {
            sessionStorage.setItem(
                "adminSesion",
                "true"
            );
            mensajeLogin(
                "✅ Acceso correcto",
                true
            );
            setTimeout(
                () => {
                    mostrarPanel();
                },
                300
            );
        }
        else {
            mensajeLogin(
                "❌ Correo o contraseña incorrectos"
            );
        }
    }
);
// =====================================================
// CERRAR SESIÓN
// =====================================================
logoutBtn?.addEventListener(
    "click",
    () => {
        sessionStorage.removeItem(
            "adminSesion"
        );
        mostrarLogin();
    }
);
// =====================================================
// COMPROBAR SESIÓN
// =====================================================
function comprobarSesion() {
    const sesion =
        sessionStorage.getItem(
            "adminSesion"
        );
    if (
        sesion ===
        "true"
    ) {
        mostrarPanel();
    }
    else {
        mostrarLogin();
    }
}
// =====================================================
// ABRIR MODAL CUPÓN
// =====================================================
nuevoCuponBtn?.addEventListener(
    "click",
    () => {
        cuponModal.classList.remove(
            "hidden"
        );
    }
);
// =====================================================
// CERRAR MODAL
// =====================================================
function cerrarModalCupon() {
    cuponModal.classList.add(
        "hidden"
    );
}
cerrarCuponModal?.addEventListener(
    "click",
    cerrarModalCupon
);
cancelarCupon?.addEventListener(
    "click",
    cerrarModalCupon
);
cuponModal
    ?.querySelector(
        ".modal-overlay"
    )
    ?.addEventListener(
        "click",
        cerrarModalCupon
    );
// =====================================================
// GUARDAR CUPÓN DE PRUEBA
// =====================================================
cuponForm?.addEventListener(
    "submit",
    event => {
        event.preventDefault();
        const cupon = {
            id:
                Date.now(),
            tipo:
                document
                    .getElementById(
                        "cuponTipo"
                    )
                    .value,
            nombre:
                document
                    .getElementById(
                        "cuponNombre"
                    )
                    .value
                    .trim(),
            codigo:
                document
                    .getElementById(
                        "cuponCodigo"
                    )
                    .value
                    .trim(),
            descuento:
                document
                    .getElementById(
                        "cuponDescuento"
                    )
                    .value
                    .trim(),
            minimo:
                document
                    .getElementById(
                        "cuponMinimo"
                    )
                    .value
                    .trim(),
            tope:
                document
                    .getElementById(
                        "cuponTope"
                    )
                    .value
                    .trim(),
            estado:
                document
                    .getElementById(
                        "cuponEstado"
                    )
                    .value,
            link:
                document
                    .getElementById(
                        "cuponLink"
                    )
                    .value
                    .trim()
        };
        let cupones =
            JSON.parse(
                localStorage.getItem(
                    "adminCupones"
                )
            ) || [];
        cupones.push(
            cupon
        );
        localStorage.setItem(
            "adminCupones",
            JSON.stringify(
                cupones
            )
        );
        cuponForm.reset();
        cerrarModalCupon();
        cargarCupones();
        alert(
            "✅ Cupón guardado correctamente"
        );
    }
);
// =====================================================
// CARGAR CUPONES
// =====================================================
function cargarCupones() {
    const contenedor =
        document.getElementById(
            "listaCupones"
        );
    if (!contenedor) return;
    const cupones =
        JSON.parse(
            localStorage.getItem(
                "adminCupones"
            )
        ) || [];
    if (
        cupones.length ===
        0
    ) {
        contenedor.innerHTML = `
            <div class="empty-admin">
                🎟️
                <strong>
                    No hay cupones cargados
                </strong>
                <span>
                    Crea tu primer cupón.
                </span>
            </div>
        `;
        return;
    }
    contenedor.innerHTML =
        cupones
            .map(
                cupon => `
                    <div
                        class="stat-card"
                    >
                        <div
                            class="stat-icon"
                        >
                            🎟️
                        </div>
                        <div>
                            <strong>
                                ${cupon.nombre}
                            </strong>
                            <span>
                                ${cupon.codigo}
                                ·
                                ${cupon.descuento}
                            </span>
                        </div>
                    </div>
                `
            )
            .join("");
}
// =====================================================
// INICIO
// =====================================================
comprobarSesion();
cargarCupones();
console.log(
    "✅ PANEL ADMIN PREPARADO"
);