const recursos = {
    minimos: { camas: 60, personal_medico: 267, otro_personal: 257, medicamentos: 5000, instrumental_medico: 10000 },
    iniciales: { camas: 0, personal_medico: 0, otro_personal: 0, medicamentos: 0, instrumental_medico: 0 },
    actuales: { camas: 0, personal_medico: 0, otro_personal: 0, medicamentos: 0, instrumental_medico: 0 }
};
// div rec iniciales
function toggleRecursosIniciales() {
    const recursosDiv = document.getElementById("recursosIniciales");
    const button = document.getElementById("mostrarRecursosIniciales");

    if (recursosDiv.style.display === "none") {
        recursosDiv.style.display = "block";
        mostrarRecursosIniciales();
        button.innerText = "Ocultar Recursos Iniciales";
        button.classList.add("boton-activo");
    } else {
        recursosDiv.style.display = "none";
        button.innerText = "Mostrar Recursos Iniciales";
        button.classList.remove("boton-activo");
    }
}


// Mostrar recurdos iniciales
function mostrarRecursosIniciales() {
    const recursosDiv = document.getElementById("recursosIniciales");
    recursosDiv.innerHTML = "<h3>Recursos Iniciales</h3>";
    for (const [key, value] of Object.entries(recursos.iniciales)) {
        const valorFormateado = value.toLocaleString();
        recursosDiv.innerHTML += `<p>${key}: ${valorFormateado}</p>`;
    }
}

//div fijo actualizable
function actualizarEstado() {
    const estadoDiv = document.getElementById("estado");

    estadoDiv.innerHTML = "<h3>Estado Actual de los Recursos</h3>";
    for (const [key, value] of Object.entries(recursos.actuales)) {
        const valorFormateado = value.toLocaleString();
        estadoDiv.innerHTML += `<p>${key} : ${valorFormateado}</p>`;
    }
}

//formulario rec iniciales
function registrarRecursos() {
    const inputDiv = document.getElementById("input");
    inputDiv.innerHTML = "<h3>Registrar Recursos Iniciales</h3>";
    for (const key in recursos.iniciales) {
        inputDiv.innerHTML += `<label>${key}:</label><input type="number" id="${key}" /><br>`;
    }
    inputDiv.innerHTML += '<button onclick="guardarRecursos()">Guardar</button>';
}

//guardar iniciales y acualizar actuales
function guardarRecursos() {
    for (const key in recursos.iniciales) {
        const value = parseFloat(document.getElementById(key).value) || 0;
        recursos.iniciales[key] = value;
        recursos.actuales[key] = value;
    }
    document.getElementById("output").innerText = "Recursos iniciales registrados correctamente.";
    actualizarEstado();
}

// diferencias entrerecursos actuales y mínimos
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
            mensaje = `Suficiencia de ${key}:<br>Disponible: ${actualFormateado}<br>Requerido: ${minimoFormateado}<br>Excedente: ${sobranFormateado}.`;
            outputDiv.innerHTML += `<p style="border-left: 5px solid green; padding-left: 5px">${mensaje}</p><br>`;
        }
    }
}

// Formulario consumo
function registrarConsumo() {
    const inputDiv = document.getElementById("input");
    inputDiv.innerHTML = "<h3>Registrar Consumo Diario</h3>";
    for (const key in recursos.actuales) {
        inputDiv.innerHTML += `<label>${key}:</label><input type="number" id="${key}" /><br>`;
    }
    inputDiv.innerHTML += '<button onclick="guardarConsumo()">Guardar</button>';
}
function guardarConsumo() {
    for (const key in recursos.actuales) {
        const consumo = parseFloat(document.getElementById(key).value) || 0;
        recursos.actuales[key] -= consumo;
        if (recursos.actuales[key] < 0) recursos.actuales[key] = 0;
    }
    document.getElementById("output").innerText = "Consumo registrado correctamente.";
    actualizarEstado();
}

// Formulario suma
function sumarInventario() {
    const inputDiv = document.getElementById("input");
    inputDiv.innerHTML = "<h3>Sumar Inventario Entrante</h3>";
    for (const key in recursos.actuales) {
        inputDiv.innerHTML += `<label>${key}:</label><input type="number" id="${key}" /><br>`;
    }
    inputDiv.innerHTML += '<button onclick="guardarInventario()">Guardar</button>';
}
function guardarInventario() {
    for (const key in recursos.actuales) {
        const suma = parseFloat(document.getElementById(key).value) || 0;
        recursos.actuales[key] += suma;
    }
    document.getElementById("output").innerText = "Inventario sumado correctamente.";
    actualizarEstado();
}

document.getElementById("registrarRecursos").onclick = registrarRecursos;
document.getElementById("evaluarDiferencia").onclick = evaluarDiferencia;
document.getElementById("registrarConsumo").onclick = registrarConsumo;
document.getElementById("sumarInventario").onclick = sumarInventario;

actualizarEstado();
