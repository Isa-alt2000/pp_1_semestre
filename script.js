const recursos = {
    minimos: { presupuesto: 500000, personal: 200, insumos_primer_grado: 5000, insumos_segundo_grado: 10000 },
    iniciales: { presupuesto: 0, personal: 0, insumos_primer_grado: 0, insumos_segundo_grado: 0 },
    actuales: { presupuesto: 0, personal: 0, insumos_primer_grado: 0, insumos_segundo_grado: 0 }
};
// Función para alternar la visibilidad del div de recursos iniciales
function toggleRecursosIniciales() {
    const recursosDiv = document.getElementById("recursosIniciales");
    const button = document.getElementById("mostrarRecursosIniciales");

    if (recursosDiv.style.display === "none") {
        recursosDiv.style.display = "block"; // Mostrar el contenedor
        mostrarRecursosIniciales(); // Llamar a la función para mostrar los recursos
        button.innerText = "Ocultar Recursos Iniciales"; // Cambiar el texto del botón
    } else {
        recursosDiv.style.display = "none"; // Ocultar el contenedor
        button.innerText = "Mostrar Recursos Iniciales"; // Restaurar el texto del botón
    }
}

// Función para mostrar los recursos iniciales introducidos
function mostrarRecursosIniciales() {
    const recursosDiv = document.getElementById("recursosIniciales");
    recursosDiv.innerHTML = "<h3>Recursos Iniciales</h3>";  // Título
    for (const [key, value] of Object.entries(recursos.iniciales)) {
        const valorFormateado = value.toLocaleString();  // Formatear el número con comas
        recursosDiv.innerHTML += `<p>${key}: ${valorFormateado}</p>`; // Mostrar el recurso
    }
}

//contenedor fijo
function actualizarEstado() {
    const estadoDiv = document.getElementById("estado");

    estadoDiv.innerHTML = "<h3>Estado Actual de los Recursos</h3>";
    for (const [key, value] of Object.entries(recursos.actuales)) {
        const valorFormateado = value.toLocaleString();  // Formatear el número con comas
        estadoDiv.innerHTML += `<p>${key} : ${valorFormateado}</p>`;
    }
}

//formulario de registro de recursos
function registrarRecursos() {
    const inputDiv = document.getElementById("input");
    inputDiv.innerHTML = "<h3>Registrar Recursos Iniciales</h3>";
    for (const key in recursos.iniciales) {
        inputDiv.innerHTML += `<label>${key}:</label><input type="number" id="${key}" /><br>`;
    }
    inputDiv.innerHTML += '<button onclick="guardarRecursos()">Guardar</button>';
}

//guarda los iniciales y actualiza los actuales
function guardarRecursos() {
    for (const key in recursos.iniciales) {
        const value = parseFloat(document.getElementById(key).value) || 0;
        recursos.iniciales[key] = value;
        recursos.actuales[key] = value;
    }
    document.getElementById("output").innerText = "Recursos iniciales registrados correctamente.";
    actualizarEstado();
}

// Evalúa las diferencias entre los recursos actuales y los mínimos
function evaluarDiferencia() {
    const outputDiv = document.getElementById("output");
    outputDiv.innerHTML = "<h3> Evaluación de Diferencias </h3>";
    for (const key in recursos.minimos) {
        const minimo = recursos.minimos[key];
        const actual = recursos.actuales[key];
        let mensaje = "";
        const actualFormateado = actual.toLocaleString();
        const minimoFormateado = minimo.toLocaleString();
        const faltanFormateado = (minimo - actual).toLocaleString();
        const sobranFormateado = (actual - minimo).toLocaleString();

        if (actual < minimo) {
            mensaje = `Escasez de ${key}:<br>Disponible: ${actualFormateado}<br>Requerido: ${minimoFormateado}<br>Faltante: ${faltanFormateado}.`;
            outputDiv.innerHTML += `<p style="border-left: 5px solid red; padding-left: 5px">${mensaje}</p><br>`;
        } else {
            mensaje = `Suficiencia de ${key}:<br>Disponible: ${actualFormateado}<br>Requerido: ${minimoFormateado}<br>Sobre: ${sobranFormateado}.`;
            outputDiv.innerHTML += `<p style="border-left: 5px solid green; padding-left: 5px">${mensaje}</p><br>`;
        }
    }
}

// Muestra un formulario para registrar consumo
function registrarConsumo() {
    const inputDiv = document.getElementById("input");
    inputDiv.innerHTML = "<h3>Registrar Consumo Diario</h3>";
    for (const key in recursos.actuales) {
        inputDiv.innerHTML += `<label>${key}:</label><input type="number" id="${key}" /><br>`;
    }
    inputDiv.innerHTML += '<button onclick="guardarConsumo()">Guardar</button>';
}

// Guarda el consumo diario y actualiza los recursos
function guardarConsumo() {
    for (const key in recursos.actuales) {
        const consumo = parseFloat(document.getElementById(key).value) || 0;
        recursos.actuales[key] -= consumo;
        if (recursos.actuales[key] < 0) recursos.actuales[key] = 0;
    }
    document.getElementById("output").innerText = "Consumo registrado correctamente.";
    actualizarEstado();
}

// Muestra un formulario para sumar inventario
function sumarInventario() {
    const inputDiv = document.getElementById("input");
    inputDiv.innerHTML = "<h3>Sumar Inventario Entrante</h3>";
    for (const key in recursos.actuales) {
        inputDiv.innerHTML += `<label>${key}:</label><input type="number" id="${key}" /><br>`;
    }
    inputDiv.innerHTML += '<button onclick="guardarInventario()">Guardar</button>';
}

// Guarda el inventario sumado y actualiza los recursos
function guardarInventario() {
    for (const key in recursos.actuales) {
        const suma = parseFloat(document.getElementById(key).value) || 0;
        recursos.actuales[key] += suma;
    }
    document.getElementById("output").innerText = "Inventario sumado correctamente.";
    actualizarEstado();
}

// Asigna las funciones a los botones
document.getElementById("registrarRecursos").onclick = registrarRecursos;
document.getElementById("evaluarDiferencia").onclick = evaluarDiferencia;
document.getElementById("registrarConsumo").onclick = registrarConsumo;
document.getElementById("sumarInventario").onclick = sumarInventario;

// Muestra el estado inicial al cargar la página
actualizarEstado();