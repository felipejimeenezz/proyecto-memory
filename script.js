"use strict"

const generar = document.getElementById("generar");
const reiniciar = document.getElementById("reiniciar");
const contador = document.getElementById("contador");
const movimientos = document.getElementById("movimientos");

//Array de parejas de cartas
const parejas = [];
const imagenesFrutas = ["./src/cereza.PNG", "./src/kiwi.PNG", "./src/limon.PNG", "./src/manzana.PNG", "./src/naranja.PNG", "./src/pina.PNG", "./src/uva.PNG", "./src/platano.PNG"];

//Bucle que genera parejas de cartas con un numero y una imagen
for (let i = 0; i < imagenesFrutas.length; i++) {
    parejas.push({ num: i + 1, img: imagenesFrutas[i]});
    parejas.push({ num: i + 1, img: imagenesFrutas[i]});
}

//Se mezclan las parejas
function mezclarCartas() {
    parejas.sort(() => Math.random() - 0.5);
}

//Temporizador
let segundos = 0;
let minutos = 0;

function temporizador() {
    segundos++;
    if(segundos == 60) {
        minutos++;
        segundos = 0;
    }

    contador.textContent = minutos + ":" + segundos;
    
    setTimeout(temporizador, 1000);
}


//Movimientos
let mov = 0;
function contadorMovimientos() {
    mov++;
    movimientos.textContent = mov;
}

let cartasVolteadas = [];
let volteadas = 0;

//Funcion que genera las cartas
function generarCartas() {
    const div = document.getElementById("juego");
    let indiceCarta = 0;

    div.innerHTML = "";
    
    const table = document.createElement("table");
    table.style.width = "65%";
    table.style.height = "85%";
    table.style.marginLeft = "18%";
    table.style.marginTop = "6.5%";

    div.appendChild(table);

    for (let i = 1; i <= 4; i++) {
        const tr = document.createElement("tr");
        table.appendChild(tr);
        for (let j = 1; j <= 4; j++) {
            const td = document.createElement("td");

            const carta = document.createElement("button");
            carta.style.position = "relative"; // Asegura que los hijos se posicionen respecto a este contenedor
            carta.style.border = "0px";
            carta.style.backgroundColor = "white";
            carta.style.margin = "0";
            carta.style.padding = "0";
            carta.style.height = "100%";
            carta.style.width = "100%";
            carta.style.overflow = "hidden"; // Evita problemas visuales

            const fruta = document.createElement("img");
            fruta.style.height = "100%";
            fruta.style.width = "100%";
            fruta.style.cursor = "pointer";
            fruta.src = parejas[indiceCarta].img;
            fruta.style.position = "absolute";
            fruta.style.top = "0";
            fruta.style.left = "0";

            const trasera = document.createElement("img");
            trasera.style.height = "100%";
            trasera.style.width = "100%";
            trasera.style.cursor = "pointer";
            trasera.src = "./src/trasera carta.png";
            trasera.style.position = "absolute";
            trasera.style.top = "0";
            trasera.style.left = "0";
            trasera.style.transition = "opacity 0.3s"; // Para animación suave al destapar
            trasera.style.opacity = "1"; // Visible por defecto
            
            carta.appendChild(fruta);
            carta.appendChild(trasera);
            
            td.appendChild(carta);

            carta.setAttribute("class", parejas[indiceCarta].num);

            //Evento que muestra la carta oculta
            carta.addEventListener("click", function() {
                contadorMovimientos();
                if (cartasVolteadas.length < 2 && trasera.style.opacity == "1") {
                    trasera.style.opacity = "0";
                    cartasVolteadas.push(carta);

                    if (cartasVolteadas.length == 2) {
                        if (cartasVolteadas[0].getAttribute("class") == cartasVolteadas[1].getAttribute("class")) {
                            cartasVolteadas = [];
                            volteadas = volteadas + 2;

                            if(volteadas == 16) {
                                const ganar = document.createElement("p");
                                ganar.textContent = "Has ganado!";
                                ganar.style.textAlign = "center";
                                ganar.style.color = "green";
                                div.appendChild(ganar);
                            }
                        } else {
                            setTimeout(function () {
                                cartasVolteadas[0].querySelector('img:nth-child(2)').style.opacity = "1";
                                cartasVolteadas[1].querySelector('img:nth-child(2)').style.opacity = "1";
                                cartasVolteadas = [];
                            }, 1000);
                        }
                    }
                }
            });

            tr.appendChild(td);

            indiceCarta++;
        }
    }
}

function juego() {
    mezclarCartas();
    generarCartas();
    segundos = 0;
    minutos = 0;
}
generar.addEventListener("click", function(){
    juego();
    temporizador();
    generar.style.display = "none";
    reiniciar.style.display = "inline";
    contador.style.display = "inline";
    movimientos.style.display = "inline";
});

reiniciar.addEventListener("click", function() {
    juego();
    mov = 0;
    movimientos.textContent = mov;
});