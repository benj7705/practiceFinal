// 1. Función declarativa
function cuadrado(x) {
    return x * x;
}

function mostrarCuadrado() {
    const numero = document.getElementById('numeroCuadrado').value;
    const resultado = cuadrado(numero);
    document.getElementById('resultadoCuadrado').innerHTML = 
        `El cuadrado de ${numero} es ${resultado}`;
}

// 2. Función expresiva
const potencia = function(base, exponente) {
    let resultado = 1;
    for (let i = 0; i < exponente; i++) {
        resultado *= base;
    }
    return resultado;
};

function mostrarPotencia() {
    const base = document.getElementById('base').value;
    const exponente = document.getElementById('exponente').value;
    const resultado = potencia(base, exponente);
    document.getElementById('resultadoPotencia').innerHTML = 
        `${base} elevado a ${exponente} = ${resultado}`;
}

// 3. Arrow function
const dividir = (a, b) => a / b;

function mostrarDivision() {
    const dividendo = document.getElementById('dividendo').value;
    const divisor = document.getElementById('divisor').value;
    const resultado = dividir(dividendo, divisor);
    document.getElementById('resultadoDivision').innerHTML = 
        `${dividendo} ÷ ${divisor} = ${resultado.toFixed(2)}`;
}

// 4. Función anidada
function humus(factor) {
    const ingrediente = (cantidad, unidad, nombre) => {
        const mensaje = `${cantidad * factor} ${unidad} de ${nombre}<br>`;
        document.getElementById('resultadoHummus').innerHTML += mensaje;
    };
    
    document.getElementById('resultadoHummus').innerHTML = '';
    ingrediente(1, "lata", "garbanzos");
    ingrediente(0.5, "taza", "tahini");
    ingrediente(2, "cucharadas", "limón");
}

function prepararHummus() {
    humus(2);
}

// 5. Scope
function probarScope() {
    let x = "global";
    let resultado = '';

    function prueba() {
        let x = "local";
        resultado += `Dentro: ${x}<br>`;
    }

    prueba();
    resultado += `Fuera: ${x}`;
    document.getElementById('resultadoScope').innerHTML = resultado;
}

// 6. Factorial (recursividad)
function factorial(n) {
    return n <= 1 ? 1 : n * factorial(n - 1);
}

function calcularFactorial() {
    const numero = document.getElementById('numeroFactorial').value;
    const resultado = factorial(numero);
    document.getElementById('resultadoFactorial').innerHTML = 
        `${numero}! = ${resultado}`;
}

//7. Indice de Masa Corporal (IMC)
function calcularIMC(){
    const peso = document.getElementById('peso').value;
    const altura = document.getElementById('altura').value;
    if((peso != "") && (altura !="") && (peso, altura > 0)){
        const resultado = peso/potencia(altura, 2); //reutilizando el codigo de potencia del apartado 2. Funcion expresiva
        document.getElementById('resultadoIMC').innerHTML = 
        `${resultado.toFixed(2)} kg/m2`;
        document.getElementById('errorDivIMC').innerHTML = "";
    } else {
        document.getElementById('errorDivIMC').innerHTML = 
        `<p class="error">Ingrese datos validos en los campos peso y altura!!</p>`;
        document.getElementById('resultadoIMC').innerHTML = "";
    }
}


// Función para cambiar secciones
function cambiarSeccion(seccionId) {
    document.querySelectorAll('.seccion').forEach(sec => sec.classList.remove('active'));
    document.querySelectorAll('.boton-menu').forEach(btn => btn.classList.remove('active'));
    
    document.getElementById(seccionId).classList.add('active');
    event.target.classList.add('active');
}

// Ejemplo 1: Obtener Pokémon básico (Promesas), f. Manejo avanzado de errores
function obtenerPokemon() {
    const id = document.getElementById('pokemonId').value;
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then(response => {
            if (!response.ok) throw new Error('Pokémon no encontrado');
            return response.json();
        })
        .then(data => {
            const html = `
                <h3>${data.name.toUpperCase()}</h3>
                <img src="${data.sprites.front_default}" class="img-pokemon">
                <p>Altura: ${data.height / 10}m | Peso: ${data.weight / 10}kg</p>
                <p>Tipos: ${data.types.map(t => t.type.name).join(', ')}</p>
            `;
            document.getElementById('pokemonResult').innerHTML = html;
            document.getElementById('errorDivObt').innerHTML = "";
        })
        .catch(error => {
            document.getElementById('errorDivObt').innerHTML = `<div class="error">Error: ${error.message} </div>`;
            document.getElementById('pokemonResult').innerHTML = "";
        });
}

// Ejemplo 2: Cadena de evoluciones (Async/Await) f. Manejo avanzado de errores:
async function obtenerEvoluciones() {
    try {
        const response = await fetch('https://pokeapi.co/api/v2/evolution-chain/1025');
        const data = await response.json();
        
        let html = '<h3>Cadena de Evolución de Bulbasaur:</h3>';
        let chain = data.chain;
        
        while(chain) {
            html += `<p>${chain.species.name} → `;
            chain = chain.evolves_to[0];
        }
        
        html = html.replace(/→ $/, ''); // Eliminar última flecha
        document.getElementById('evolucionesResult').innerHTML = html;
        
    } catch (error) {
        document.getElementById('errorDivMost').innerHTML = `<div class="error">Error: ${error.message} </div>`;
    }
}

// Ejemplo 3: Pokémon aleatorio (Fetch + Then)
function pokemonAleatorio() {
    const randomId = Math.floor(Math.random() * 898) + 1;
    
    fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`)
        .then(response => response.json())
        .then(pokemon => {
            const abilities = pokemon.abilities.map(a => a.ability.name).join(', ');
            document.getElementById('randomPokemon').innerHTML = `
                <h3>${pokemon.name} (#${pokemon.id})</h3>
                <img src="${pokemon.sprites.front_default}" class="img-pokemon">
                <p>Habilidades: ${abilities}</p>
            `;
        });
}

// Ejemplo 4: Pokémon por nombre (Fetch + Async/Await), f. Manejo avanzado de errores:
async function pokemonPorNombre() {
    const nombre = document.getElementById('pokemonNombre').value.toLowerCase();
    console.log(nombre);
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombre}`);
        if (!response.ok) throw new Error('Pokémon no encontrado');
        
        const pokemon = await response.json();
        const abilities = pokemon.abilities.map(a => a.ability.name).join(', ');
        document.getElementById('pokemonNameResult').innerHTML = `
            <h3>${pokemon.name} (#${pokemon.id})</h3>
            <img src="${pokemon.sprites.front_default}" class="img-pokemon">
            <p>Habilidades: ${abilities}</p>
        `;
        document.getElementById('errorDivAsy').innerHTML = "";
    } catch (error) {
        document.getElementById('errorDivAsy').innerHTML = `<div class="error">Error: ${error.message} </div>`;
        document.getElementById('pokemonNameResult').innerHTML = "";
    }
}

// Ejemplo 1: Obtener razas de perros, e.Nuevo consumo de API f.Manejo avanzado de errores:
function obtenerPerro() {
      fetch(`https://dog.ceo/api/breeds/image/random`)
        .then(response => {
            if (!response.ok) throw new Error('Perro no encontrado');
            return response.json();
        })
        .then(data => {
                    const html = `<div><img src="${data.message}" class="img-perro">`;
                    
                    document.getElementById('perroResult').innerHTML = html;                    
            
        })
        .catch(error => {
            document.getElementById('errorDivRam').innerHTML = `<div class="error">Error: ${error.message} </div>`;
        });
    
}