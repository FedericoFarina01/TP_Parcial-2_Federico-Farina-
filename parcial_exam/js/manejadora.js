// Conexión a la API
const BASE_URL = "https://utnfra-api-usuarios.onrender.com/usuarios";

document.addEventListener("DOMContentLoaded", () => {
    
    let usuarioEditandoId = null; 

    // Referencias DOM
    const enlaceMostrar = document.getElementById("mostrar");
    const formulario = document.getElementById("formulario");
    const panelDerecha = document.getElementById("panel-derecha");
    const inputNombre = document.getElementById("nombre");
    const inputEmail = document.getElementById("email");
    const inputClave = document.getElementById("clave");
    const inputPais = document.getElementById("pais");
    const inputTerminos = document.getElementById("terminos");

    // Cargar usuarios    
    async function cargarUsuarios() {
        try {
            panelDerecha.innerHTML = crearSpinner();

            const res = await fetch(BASE_URL);
            if (!res.ok) throw new Error(`Error ${res.status} al obtener usuarios`);
        
            const data = await res.json();
            const usuarios = Array.isArray(data) ? data : [];

            cargarTabla(usuarios);

        } catch (err) {
            console.error("Error al obtener cargar los usuarios\n" + err);
            alert("No se puede obtener el listado de usuarios");
            
        }
    }

    // Tabla
    function cargarTabla(usuarios) {
        panelDerecha.innerHTML = "";

        const tabla = document.createElement("table");
        tabla.className = "table table-striped table-hover table-bordered";

        // Header tabla
        const thead = document.createElement("thead");
        thead.innerHTML = `
            <tr>
                <th>ID</th>
                <th>NOMBRE</th>
                <th>CORREO</th>
                <th>PAÍS</th>
                <th>X</th>
            </tr>
        `;
        tabla.appendChild(thead);

        // Cuerpo 
        const tbody = document.createElement("tbody");

        usuarios.forEach(u => {
            const tr = document.createElement("tr");

            // Id
            const tdId = document.createElement("td");
            const enlaceId = document.createElement("a");
            enlaceId.href = "#";
            enlaceId.textContent = u.id ?? "";
            enlaceId.className = "link-primary text-decoration-underline";
            enlaceId.style.cursor = "pointer";
            enlaceId.addEventListener("click", (e) => {
                e.preventDefault();
                usuarioEditandoId = u.id;
                cargarUsuarioPorId(u.id);
            });
            tdId.appendChild(enlaceId);
            tr.appendChild(tdId);

            // Nombre
            const tdNombre = document.createElement("td");
            tdNombre.textContent = u.nombre ?? "";
            tr.appendChild(tdNombre);

            // Correo
            const tdEmail = document.createElement("td");
            tdEmail.textContent = u.email ?? "";
            tr.appendChild(tdEmail);

            // Pais
            const tdPais = document.createElement("td");
            tdPais.textContent = u.pais ?? "";
            tr.appendChild(tdPais);

            // X (Eliminar)
            const tdAcciones = document.createElement("td");
            const btnEliminar = document.createElement("button");
            btnEliminar.className = "btn btn-danger btn-sm";
            btnEliminar.innerHTML = "🗑️";
            btnEliminar.addEventListener("click", () => confirmarEliminar(u));
            tdAcciones.appendChild(btnEliminar);
            tr.appendChild(tdAcciones);

            tbody.appendChild(tr);
        });

        tabla.appendChild(tbody);
        panelDerecha.appendChild(tabla);
    }

    // SPINNER
    function crearSpinner() {
        return `
            <div class="d-flex justify-content-center align-items-center py-5">
                <div class="spinner-border" role="status">
                    <span class="visually-hidden">Cargando...</span>
                </div>
            </div>
        `;
    }

    // Agregar usuario  
    async function agregarUsuario(e) {
        e.preventDefault();

        panelDerecha.innerHTML = crearSpinner();

        // Payload
        const payload = {
            nombre: inputNombre.value.trim(),
            email: inputEmail.value.trim(),
            clave: inputClave.value.trim(),
            pais: inputPais.value
        };

        try {
            const res = await fetch(BASE_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });

            if (!res.ok) {
                const errorText = await res.text();
                throw new Error(`Error ${res.status}: ${errorText}`);
            }

            await cargarUsuarios();
            formulario.reset();
            formulario.classList.remove('was-validated');

            usuarioEditandoId = null;
            const submitBtn = formulario.querySelector('button[type="submit"]');
            submitBtn.textContent = 'Enviar';

            alert("Usuario agregado correctamente");

        } catch (err) {
            console.error("Error al agregar usuario:", err);
            alert("Error al agregar usuario");
            await cargarUsuarios();
        }
    }

    // Cargar por id
    async function cargarUsuarioPorId(id) {
        try {
            const res = await fetch(`${BASE_URL}/${id}`);
            
            if (!res.ok) throw new Error(`Error ${res.status}`);

            const usuario = await res.json();

            inputNombre.value = usuario.nombre || '';
            inputEmail.value = usuario.email || '';
            inputClave.value = usuario.clave || '';
            inputPais.value = usuario.pais || '';
            inputTerminos.checked = true;

            formulario.classList.remove('was-validated');

            // Cambiar texto del botón ENVIAR a MODIFICAR
            const submitBtn = formulario.querySelector('button[type="submit"]');
            submitBtn.textContent = 'Modificar';

            formulario.scrollIntoView({ behavior: 'smooth' });

        } catch (err) {
            console.error("Error al cargar usuario:", err);
            alert("Error al cargar los datos del usuario");
        }
    }

    // Actualizar usuario
    async function actualizarUsuario(id, datos) {
        try {
            const res = await fetch(`${BASE_URL}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(datos)
            });

            if (!res.ok) {
                const errorText = await res.text();
                throw new Error(`Error ${res.status}: ${errorText}`);
            }

            await cargarUsuarios();

            formulario.reset();
            formulario.classList.remove('was-validated');

            usuarioEditandoId = null;

            const submitBtn = formulario.querySelector('button[type="submit"]');
            submitBtn.textContent = 'Enviar';

            alert("Usuario actualizado correctamente");

        } catch (err) {
            console.error("Error al modificar usuario:", err);
            alert("Error al modificar usuario");
        }
    }

    // Validaciones
    async function handleSubmit(event) {
        event.preventDefault();

        // Limpiar validaciones previas
        formulario.querySelectorAll('.invalid-feedback').forEach(div => {
            div.textContent = '';
        });

        // Validar clave (Debe ser de entre 3-8 caracteres alfanuméricos)
        const clave = inputClave.value;
        const regexClave = /^[a-zA-Z0-9]{3,8}$/;
        if (!regexClave.test(clave)) {
            const errorDiv = document.getElementById('error-clave');
            if (errorDiv) {
                errorDiv.textContent = "La clave debe tener entre 3 y 8 caracteres alfanuméricos";
            }
            inputClave.setCustomValidity("Clave inválida");
        } else {
            inputClave.setCustomValidity("");
        }

        // Validar terminos y condiciones
        if (!inputTerminos.checked) {
            const errorDiv = document.getElementById('error-terminos');
            if (errorDiv) {
                errorDiv.textContent = "Debe aceptar los términos y condiciones";
            }
        }

        formulario.classList.add('was-validated');

        // Si faltan datos o se completa incorrectamente
        if (!formulario.checkValidity()) {
            alert("Faltan completar datos o hay datos incorrectos");
            return;
        }

        const usuarioData = {
            nombre: inputNombre.value.trim(),
            email: inputEmail.value.trim(),
            clave: inputClave.value.trim(),
            pais: inputPais.value
        };

        try {
            if (usuarioEditandoId) {
                // Actualizar si se esta editando 
                await actualizarUsuario(usuarioEditandoId, usuarioData);
            } else {
                // Agregar si no existe
                await agregarUsuario(event);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    // Eliminar usuario
    async function confirmarEliminar(usuario) {
        const mensaje = `¿Está seguro que desea eliminar el siguiente usuario?\n\nID: ${usuario.id}\nNombre: ${usuario.nombre}\nCorreo: ${usuario.email}`;

        if (confirm(mensaje)) {
            try {
                const res = await fetch(`${BASE_URL}/${usuario.id}`, {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' }
                });

                if (!res.ok) {
                    const errorText = await res.text();
                    throw new Error(`Error ${res.status}: ${errorText}`);
                }

                // Vaciar los campos si se estaba editando ese usuario
                if (usuarioEditandoId === usuario.id) {
                    formulario.reset();
                    usuarioEditandoId = null;
                    const submitBtn = formulario.querySelector('button[type="submit"]');
                    submitBtn.textContent = 'Enviar';
                    formulario.classList.remove('was-validated');
                }

                await cargarUsuarios();
                alert('Usuario eliminado correctamente');

            } catch (err) {
                console.error("Error al eliminar usuario:", err);
                alert("Error al eliminar usuario");
            }
        }
    }

    // Filtrar argentinos
    async function mostrarArgentinos() {
        try {
            panelDerecha.innerHTML = crearSpinner();

            const res = await fetch(BASE_URL);
            if (!res.ok) throw new Error(`Error ${res.status}`);

            const data = await res.json();
            const usuarios = Array.isArray(data) ? data : [];
            
            // Filtrar solo argentinos
            const argentinos = usuarios.filter(u => u.pais === "Argentina");

            cargarTabla(argentinos);

        } catch (err) {
            console.error("Error al cargar argentinos:", err);
            alert("Error al cargar usuarios argentinos");
        }
    }

    // Filtrar homonimos    
    async function mostrarHomonimos() {
        try {
            panelDerecha.innerHTML = crearSpinner();

            const res = await fetch(BASE_URL);
            if (!res.ok) throw new Error(`Error ${res.status}`);

            const data = await res.json();
            const usuarios = Array.isArray(data) ? data : [];
            
            const homonimos = usuarios.filter(u => u.nombre === "Federico");

            cargarTabla(homonimos);

        } catch (err) {
            console.error("Error al cargar homónimos:", err);
            alert("Error al cargar homónimos");
        }
    }
    
    // Mostrar listado
    enlaceMostrar.addEventListener("click", (e) => {
        e.preventDefault();
        cargarUsuarios();
    });

    // Mostrar argentinos
    const enlaceArgentinos = document.getElementById("mostrar-argentinos");
    enlaceArgentinos.addEventListener("click", (e) => {
        e.preventDefault();
        mostrarArgentinos();
    });

    // Mostrar homonimos
    const enlaceHomonimos = document.getElementById("mostrar-homonimos");
    enlaceHomonimos.addEventListener("click", (e) => {
        e.preventDefault();
        mostrarHomonimos();
    });

    formulario.addEventListener('submit', handleSubmit);
    cargarUsuarios();

});