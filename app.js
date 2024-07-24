function encriptar() {
    const contieneMayusculas = /[A-Z]/;
    const caracteresEspeciales = /[!@#%^&*()_+={}\[\]:;'<>,.?]/;
    const palabraUsuario = document.getElementById('palabraUsuario').value;
    const textoEncriptado = document.getElementById('textoEncriptado');

    if (caracteresEspeciales.test(palabraUsuario) || contieneMayusculas.test(palabraUsuario)) {
        alert("No use caracteres especiales y no debe tener mayúsculas!!");
    } else {
        const textoEncriptadoResultado = encriptarTexto(palabraUsuario);
        textoEncriptado.value = textoEncriptadoResultado;
        limpiarInput('palabraUsuario');
        mostrarOcultarBotonCopiar(); 
    }
}

function encriptarTexto(texto) {
    const reglasEncriptacion = {
        'e': 'enter',
        'i': 'imes',
        'a': 'ai',
        'o': 'ober',
        'u': 'ufat'
    };

    let textoEncriptado = '';

    for (let i = 0; i < texto.length; i++) {
        const caracterOriginal = texto[i];
        const caracterEncriptado = reglasEncriptacion[caracterOriginal] || caracterOriginal; 
        textoEncriptado += caracterEncriptado;
    }

    return textoEncriptado;
}

function copiar() {
    const textoEncriptado = document.getElementById('textoEncriptado');

    if (textoEncriptado.value !== "") {
        navigator.clipboard.writeText(textoEncriptado.value)
            .then(() => {
                alert('Texto copiado, puede desencriptar.');
                habilitarDesencriptar();
            });
    } else {
        alert('No hay texto para copiar.');
    }
}

function desencriptar() {
    const textoEncriptado = document.getElementById('textoEncriptado').value;
    const palabraDesencriptada = desencriptarTexto(textoEncriptado);
    document.getElementById('palabraUsuario').value = palabraDesencriptada;
    limpiarInput('textoEncriptado'); 
}

function desencriptarTexto(texto) {
    const reglasDesencriptacion = {
        'enter': 'e',
        'imes': 'i',
        'ai': 'a',
        'ober': 'o',
        'ufat': 'u'
    };

    let textoDesencriptado = texto;

    for (let clave in reglasDesencriptacion) {
        const valor = reglasDesencriptacion[clave];
        const regex = new RegExp(clave, 'g');
        textoDesencriptado = textoDesencriptado.replace(regex, valor);
    }

    return textoDesencriptado;
}

function limpiarInput(idInput) {
    const input = document.getElementById(idInput);
    if (input) {
        input.value = "";
    }
}

function mostrarOcultarBotonCopiar() {
    const textoEncriptado = document.getElementById('textoEncriptado').value;
    const botonCopiar = document.getElementById('boton-de-copiar');

    if (textoEncriptado.trim() !== "") {
        botonCopiar.style.visibility = 'visible'; 
    } else {
        botonCopiar.style.visibility = 'hidden'; 
    }
}

function habilitarDesencriptar() {
    const botonDesencriptar = document.getElementById('boton-de-desencriptar');
    
    botonDesencriptar.disabled = false; 
    botonDesencriptar.classList.add('activado'); 
}