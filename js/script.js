let cartas = [1,1,2,2,3,3,4,4,5,5,6,6,7,7];
let numeroDeCartas = 10;

// verifica quantas cartas serao jogadas
while(numeroDeCartas < 4 || numeroDeCartas > 14 || numeroDeCartas % 2 != 0) {  
    numeroDeCartas = prompt(`Insira com quantas cartas quer jogar (deve ser entre 4 e 14)`);
}  

prepararJogo(cartas);

function sortearArray(arr) {
    let indexAleatoria;

    for(let index = arr.length - 1; index != 0; index--) {
        indexAleatoria = Math.floor(Math.random() * (arr.length));
        [arr[index],arr[indexAleatoria]] = [arr[indexAleatoria],arr[index]];
    }

    return arr;
}

function prepararJogo(arr) {
    arr = sortearArray(arr.splice(0, numeroDeCartas)); // ajusta o numero de cartas e sorteia a posicao delas
    let cartasElemento = document.querySelectorAll(`.carta-virada`);

    for(let i = 0; i < arr.length; i++) {
        cartasElemento[i].id = `carta${arr[i]}`;  
    }
}
