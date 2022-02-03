let cartas = document.querySelectorAll(`.carta`);
let primeiraCarta = true;
let carta1,carta2, numeroDeCartas;

// prepara o numero de cartas em jogo
function preparaCartas() {
    let valorInvalido = true;
    while(valorInvalido) {
        numeroDeCartas = prompt(`Com quantas cartas quer jogar (Apenas valores pares de 4 a 14)`);
        if(numeroDeCartas >= 4 && numeroDeCartas <= 14 && numeroDeCartas % 2 == 0) {
            valorInvalido = false;
        }
    }

    for(let i = 0; i < 14 - numeroDeCartas; i++) { // remove do jogo as cartas excedentes
        cartas[i].classList.add(`fora-do-jogo`);
        cartas[i].classList.remove(`carta`);
    }
}

// embaralhar cartas 
function embaralharCartas() {
    for(let i = 0; i < cartas.length; i++) {
        let posicaoAleatoria = Math.floor(Math.random() * (cartas.length));
        cartas[i].style.order = posicaoAleatoria;
    }
}

// checar por Match
function checarMatch() {
    if(carta1.id === carta2.id) {
        desabilitarCartas();
    } else {
        let cartaAux1 = carta1;
        let cartaAux2 = carta2;
        setTimeout(() => {desvirarCartas(cartaAux1, cartaAux2)}, 1000); 
        // Por algum motivo, quando uso setTimeout ele atualiza as variaveis fora da funcao para o valor original, em especial carta1 e carta2 para null e acaba quebrando o jogo. Nao consegui descobrir o porque e a maneira mais facil que encontrei de "burlar" esse efeito foi com o uso de variaveis auxiliares
    } 
    // reset pro padrao
    carta1 = carta2 = null;
    primeiraCarta = true;
}

// desabilita as cartas iguais
function desabilitarCartas() {
    
    carta2.setAttribute("onclick", "");
    carta1.setAttribute("onclick", "");
}

// desvirar carta
function desvirarCartas(carta1, carta2) {
    carta1.querySelector(".verso").classList.remove("verso-animacao");
    carta2.querySelector(".verso").classList.remove("verso-animacao");
    
    carta1.querySelector(".frente").classList.remove("frente-animacao");
    carta2.querySelector(".frente").classList.remove("frente-animacao");
    
}

// virar carta
function virarCarta(carta) {
    console.log(carta);
    if(carta === carta1) {return};  // se selecionar carta ja virada

    carta.querySelector(".frente").classList.add("frente-animacao");
    carta.querySelector(".verso").classList.add("verso-animacao");

    if(primeiraCarta) {
        primeiraCarta = false;
        carta1 = carta;
        return;
    }

    carta2 = carta;
    checarMatch();
}

embaralharCartas();
preparaCartas();
console.log(numeroDeCartas)