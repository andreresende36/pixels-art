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

// Salva cores em localStorage
let arrayPaleta = [];
function salvaCores() {
  for (let i = 0; i < 4; i++) {
    arrayPaleta[i] = coresDaPaleta[i].style.backgroundColor;
  }
  localStorage.setItem('colorPalette', JSON.stringify(arrayPaleta));
}

// Função que seleciona aleatoriamente as cores dos últimos 3 boxes
function selecionaCoresDaPaleta() {
  for (let i = 1; i < coresDaPaleta.length; i++) {
    coresDaPaleta[i].style.backgroundColor = corAleatoria();

    while (coresDaPaleta[i] === coresDaPaleta[i - 1]) {
      coresDaPaleta[i].style.backgroundColor = corAleatoria();
    }
  }
  salvaCores();
}

// Botão de cores aleatórias
let botao = document.getElementById('button-random-color');
botao.addEventListener("click", selecionaCoresDaPaleta);
botao.addEventListener("click", salvaCores);

// Recupera cores
function recuperaCores() {
  let paletaSalva = JSON.parse(localStorage.getItem('colorPalette'));
  for (let i = 0; i < 4; i++) {
    coresDaPaleta[i].style.backgroundColor = paletaSalva[i];
  }
}

// Se tiver algo no localStorage ele carrega, se não, seleciona cores automaticamente
if (localStorage.getItem('colorPalette') === null) {
  selecionaCoresDaPaleta();
}
else {
  recuperaCores();
}

// Cria quadro de pixels
let pixelBoard = document.getElementById('pixel-board');
function criaQuadroDePixels(linha, coluna) {
  for (let i = 1; i <= linha; i++) {
    for (let i = 1; i <= coluna; i++) {
      pixel = document.createElement('div');
      pixel.className = 'pixel';
      pixelBoard.appendChild(pixel);
    }
    let br = document.createElement('br');
    pixelBoard.appendChild(br);
  }
}
criaQuadroDePixels(5, 5);

// Definir a cor preta como cor inicial da paleta de cores
function setBlack() {
  coresDaPaleta[0].className += ' selected';
}
window.onload = setBlack();

// Função para selecionar uma cor na paleta de cores e preencher os pixels no quadro
function selecionaCor() {
  for (i = 0; i < coresDaPaleta.length; i++) {
    coresDaPaleta[i].addEventListener('click', function () {
      if (event.target.className === 'color') {
        event.target.className += ' selected';
      }
      for (i = 0; i < coresDaPaleta.length; i++) {
        if (coresDaPaleta[i] === event.target) {
        }
        else {
          coresDaPaleta[i].className = 'color';
        }
      }
    })
  }
}
selecionaCor();

// Função que permite preencher um pixel do quadro com a cor selecionada na paleta de cores
let pixels = document.getElementsByClassName('pixel');

function preencheCor() {
  for (i = 0; i < pixels.length; i++) {
    pixels[i].addEventListener('click', function () {
      let corSelecionada = document.getElementsByClassName('selected')[0].style.backgroundColor;
      event.target.style.backgroundColor = corSelecionada;
      salvaPixels();
    }
    )
  }
}
preencheCor();

// Cria um botão que retorna a cor do quadro para a cor inicial
let botaoLimpar = document.getElementById('clear-board');
function limpar() {
  botaoLimpar.addEventListener('click', function () {
    for (i = 0; i < pixels.length; i++) {
      pixels[i].style.backgroundColor = 'white';
      salvaPixels();
    }
  })
}
limpar();

// Criar uma função para salvar e recuperar o seu desenho atual no localStorage
let arrayPixels = [];
function salvaPixels() {
  for (let i = 0; i < pixels.length; i++) {
    arrayPixels[i] = pixels[i].style.backgroundColor;
  }
  localStorage.setItem('pixelBoard', JSON.stringify(arrayPixels));
}
function recuperaPixels() {
  let pixelsSalvos = JSON.parse(localStorage.getItem('pixelBoard'));
  for (let i = 0; i < pixels.length; i++) {
    pixels[i].style.backgroundColor = pixelsSalvos[i];
  }
}

if (localStorage.getItem('pixelBoard') === null){
  limpar()
}
else{
  recuperaPixels();
}