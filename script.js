// Box com a classe 'color' para seleção de cores da paleta
let coresDaPaleta = document.getElementsByClassName('color');

// Primeiro box com a cor preta
coresDaPaleta[0].style.backgroundColor = 'black';

// Função que retorna uma cor aleatória com exceção da cor branca #FFFFFF
function corAleatoria(){
  const hex = '0123456789ABCDEF';
  let corAleatoria = '#';

  for (let i = 0; i < 6; i++){
    corAleatoria += hex[Math.floor(Math.random() * 16)];
  }
  while (corAleatoria === '#FFFFFF'){
    corAleatoria();
  }
  return corAleatoria;
}

// // Função que seleciona aleatoriamente as cores dos últimos 3 boxes
function selecionaCoresDaPaleta(){
  for (let i = 1; i < coresDaPaleta.length; i++) {
    coresDaPaleta[i].style.backgroundColor = corAleatoria();

    while (coresDaPaleta[i] === coresDaPaleta[i-1]){
      coresDaPaleta[i].style.backgroundColor = corAleatoria();
    }
  }
}
selecionaCoresDaPaleta();

// Botão de cores aleatórias
let botao = document.getElementById('button-random-color');
botao.addEventListener("click",selecionaCoresDaPaleta);
