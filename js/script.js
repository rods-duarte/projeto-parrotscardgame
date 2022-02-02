let cartas = [1,1,2,2,3,3,4,4,5,5,6,6,7,7];
let numeroDeCartas;
let contador = 0; // conta quantas cartas foram acertadas
let jogadas = 0;

function main() {
    // verifica quantas cartas serao jogadas
    while(numeroDeCartas < 4 || numeroDeCartas > 14 || numeroDeCartas % 2 != 0) {  
        numeroDeCartas = prompt(`Insira com quantas cartas quer jogar (deve ser entre 4 e 14)`);
    }  
    prepararJogo(cartas);
}

// ajusta o numero de cartas e sorteia a posicao delas
function sortearArray(arr) {  
    let indexAleatoria;

    for(let index = arr.length - 1; index != 0; index--) {
        indexAleatoria = Math.floor(Math.random() * (arr.length));
        [arr[index],arr[indexAleatoria]] = [arr[indexAleatoria],arr[index]];
    }

    return arr;
}

// posiciona as cartas no html
function prepararJogo(arr) {  
    arr = sortearArray(arr.splice(0, numeroDeCartas)); 
    let cartasElemento = document.querySelectorAll(`.carta`);

    // Atribui para cada carta um gif no verso
    for(let i = 0; i < arr.length; i++) {
        cartasElemento[i].id = `carta${arr[i]}`;  
        cartasElemento[i].querySelector(`.verso`).innerHTML = `
        <img src='img/carta${arr[i]}.gif'> `
    }
    console.log(arr);
}

function clicarCarta(carta) {
    // Animacao carta virando
    frente = carta.querySelector(`.frente`);
    verso = carta.querySelector(`.verso`);
    frente.classList.add(`frente-animacao`);
    verso.classList.add(`verso-animacao`);

    // Evitar possiveis bugs
    carta.setAttribute("onclick", "");

    // Verifica se ja ha outra carta selecionada
    outraCarta = document.querySelector(`.selecionado`);
    if( outraCarta !== null) {  // Se a carta selecionada for a segunda
        setTimeout(function () {compararCartas(carta, outraCarta)}, 1000);
    } else {  // Se a carta selecionada for a primeira
        carta.classList.add(`selecionado`);
    }

    jogadas++;
}

// Compara se duas cartas sao iguais 
function compararCartas(carta, cartaSelecionado) {  
    if(carta.id === cartaSelecionado.id) {  // Condicao quando as cartas sao iguais
        cartaSelecionado.classList.remove("selecionado");
        contador += 2;
        console.log(contador);
        console.log(numeroDeCartas);
        if(contador == numeroDeCartas) {alert(`Voce ganhou em ${jogadas} jogadas !`)};  // Condicao quando jogo termina
    } else {  // Condicao quando cartas sao diferentes
        let frenteCarta1, versoCarta1, frenteCarta2, versoCarta2;
        [frenteCarta1, versoCarta1] = [carta.querySelector(`.frente`), carta.querySelector(`.verso`)];
        [frenteCarta2, versoCarta2] = [cartaSelecionado.querySelector(`.frente`), cartaSelecionado.querySelector(`.verso`)];

        // Animacao carta virando 
        frenteCarta1.classList.remove(`frente-animacao`);
        versoCarta1.classList.remove(`verso-animacao`);
        frenteCarta2.classList.remove(`frente-animacao`);
        versoCarta2.classList.remove(`verso-animacao`);
        
        // Ajuste propriedades
        cartaSelecionado.classList.remove("selecionado");
        carta.setAttribute("onclick", "clicarCarta(this)");
        cartaSelecionado.setAttribute("onclick", "clicarCarta(this)");
    }
}

main();
