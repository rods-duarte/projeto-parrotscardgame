var cartas = document.querySelectorAll(`.carta`);
var primeiraCarta = true;
var carta1,carta2, numeroDeCartas;
var bloquear = false; 
var jogadas = 0;
var tempo = 1;

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

// virar carta
function virarCarta(carta) {
    if(jogadas === 0) {setInterval(contarTempo, 1000);}  // Inicia o cronometro na primeira jogada
    if(bloquear) {return};  // impede que uma terceira carta seja selecionada enquanto outras duas sao processadas
    console.log(carta);
    if(carta === carta1) {return};  // se selecionar carta ja virada

    carta.querySelector(".frente").classList.add("frente-animacao");
    carta.querySelector(".verso").classList.add("verso-animacao");
    jogadas ++; // Atualiza pontuacao

    if(primeiraCarta) {
        primeiraCarta = false;
        carta1 = carta;
        return;
    }

    carta2 = carta;
    checarMatch();

}

// desvirar cartas
function desvirarCartas() {
    carta1.querySelector(".verso").classList.remove("verso-animacao");
    carta2.querySelector(".verso").classList.remove("verso-animacao");
    
    carta1.querySelector(".frente").classList.remove("frente-animacao");
    carta2.querySelector(".frente").classList.remove("frente-animacao");
    // reset pro padrao
    carta1 = carta2 = null;
    primeiraCarta = true;
    bloquear = false; 
}

// checar por Match
function checarMatch() {
    if(carta1.id === carta2.id) {
        desabilitarCartas();
        numeroDeCartas -= 2;
        
        // checa se o jogo terminou
        if (numeroDeCartas === 0) {
            setTimeout(() => {alert(`Voce ganhou em ${jogadas} jogadas! (${tempo-1} segundos)`)}, 500);
            // implementar reiniciar partida aqui 
        } 
        
    } else {
        bloquear = true;
        setTimeout(desvirarCartas, 1000);
        // consegui resolver utilizando var no lugar de let 
    } 
}

// desabilita as cartas iguais
function desabilitarCartas() {
    
    carta2.setAttribute("onclick", "");
    carta1.setAttribute("onclick", "");
    // reset pro padrao
    carta1 = carta2 = null;
    primeiraCarta = true;
    bloquear = false;
}

// cronometro
function contarTempo() {
    if(numeroDeCartas === 0) {return};
    document.querySelector(`.timer`).innerHTML = tempo;
    tempo++;
}

embaralharCartas();
preparaCartas();

