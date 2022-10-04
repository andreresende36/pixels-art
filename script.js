// Box com a classe 'color' para seleção de cores da paleta
let coresDaPaleta = document.getElementsByClassName('color');

// Primeiro box com a cor preta
coresDaPaleta[0].style.backgroundColor = 'black';

// Função que retorna uma cor aleatória com exceção da cor branca #FFFFFF
function corAleatoria() {
  const hex = '0123456789ABCDEF';
  let corAleatoria = '#';

  for (let i = 0; i < 6; i++) {
    corAleatoria += hex[Math.floor(Math.random() * 16)];
  }
  while (corAleatoria === '#FFFFFF') {
    corAleatoria();
  }
  return corAleatoria;
}

// Função que seleciona aleatoriamente as cores dos últimos 3 boxes
function selecionaCoresDaPaleta() {
  for (let i = 1; i < coresDaPaleta.length; i++) {
    coresDaPaleta[i].style.backgroundColor = corAleatoria();

    while (coresDaPaleta[i] === coresDaPaleta[i - 1]) {
      coresDaPaleta[i].style.backgroundColor = corAleatoria();
    }
  }
}

// Botão de cores aleatórias
let botao = document.getElementById('button-random-color');
botao.addEventListener("click", selecionaCoresDaPaleta);
let arrayRecover = [];
botao.addEventListener("click", function () {
  for (let i = 0; i < 4; i++) {
    arrayRecover[i] = coresDaPaleta[i].style.backgroundColor;
  }
  localStorage.setItem('paleta', JSON.stringify(arrayRecover));
})

// Recupera cores
function recuperaCores() {
  let paletaSalva = JSON.parse(localStorage.getItem('paleta'));
  for (let i = 0; i < 4; i++) {
    coresDaPaleta[i].style.backgroundColor = paletaSalva[i];
  }
}

recuperaCores();
// let coresRecover = [];
// for (let i=0; i < coresDaPaleta.length; i++){
//   coresRecover[i] = coresDaPaleta[i].style.backgroundColor;
// }
// localStorage.setItem('paleta-de-cores',JSON.stringify(coresRecover));

// botao.addEventListener("click",function(){
//   let recovery = JSON.parse(localStorage.getItem('paleta-de-cores'));
//     coresDaPaleta = recovery;
//   }
// );