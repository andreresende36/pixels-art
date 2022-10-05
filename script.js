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
  localStorage.setItem('boardSize', JSON.stringify(linha));
}

// Definir a cor preta como cor inicial da paleta de cores
function setBlack() {
  coresDaPaleta[0].className += ' selected';
}

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
  for (let i = 0; i < pixels.length; i++) {
    pixels[i].addEventListener('click', function () {
      let corSelecionada = document.getElementsByClassName('selected')[0].style.backgroundColor;
      event.target.style.backgroundColor = corSelecionada;
      salvaPixels();
    }
    )
  }
}

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
  let tamanho = Math.sqrt(pixelsSalvos.length);
  criaQuadroDePixels(tamanho, tamanho);
  for (let i = 0; i < pixels.length; i++) {
    pixels[i].style.backgroundColor = pixelsSalvos[i];
  }
}

let boardSize = JSON.parse(localStorage.getItem('boardSize'));
function inicializar() {
  setBlack();
  if (localStorage.getItem('pixelBoard') !== null) {
    recuperaPixels();
  }
  else if (boardSize !== null) {
    criaQuadroDePixels(boardSize, boardSize);
    preencheCor();
  }
  else {
    criaQuadroDePixels(5, 5);
    preencheCor();
  }
}

// Criar um input que permita à pessoa usuária preencher um novo tamanho para o quadro de pixels
let botaoVQV = document.getElementById('generate-board');
let inputTamanho = document.getElementById('board-size');

function apagarBoard() {
  while (pixelBoard.children.length > 0) {
    // while (pixelBoard.firstChild) {  
    pixelBoard.removeChild(pixelBoard.firstChild);
  }
}
botaoVQV.addEventListener('click', function () {
  let tamanho = document.getElementById('board-size').value;
  if (tamanho === '' || parseInt(tamanho) < 1) {
    alert('Board inválido!');
  }
  else if (tamanho < 5) {
    tamanho = 5;
    apagarBoard();
    criaQuadroDePixels(tamanho, tamanho);
    localStorage.removeItem('pixelBoard');
    arrayPixels = [];
    preencheCor();
  }
  else if (tamanho > 50) {
    tamanho = 50;
    apagarBoard();
    criaQuadroDePixels(tamanho, tamanho);
    localStorage.removeItem('pixelBoard');
    arrayPixels = [];
    preencheCor();
  }
  else {
    apagarBoard();
    criaQuadroDePixels(tamanho, tamanho);
    localStorage.removeItem('pixelBoard');
    arrayPixels = [];
    preencheCor();
  }
})

inputTamanho.addEventListener('keydown', function () {
  let tamanho = document.getElementById('board-size').value;
  if (event.key === "Enter") {
    if (tamanho === '' || tamanho === '0') {
      alert('Board inválido!');
    }
    else if (tamanho < 5) {
      tamanho = 5;
      apagarBoard();
      criaQuadroDePixels(tamanho, tamanho);
      localStorage.removeItem('pixelBoard');
      arrayPixels = [];
      preencheCor();
    }
    else if (tamanho > 50) {
      tamanho = 50;
      apagarBoard();
      criaQuadroDePixels(tamanho, tamanho);
      localStorage.removeItem('pixelBoard');
      arrayPixels = [];
      preencheCor();
    }
    else {
      apagarBoard();
      criaQuadroDePixels(tamanho, tamanho);
      localStorage.removeItem('pixelBoard');
      arrayPixels = [];
      preencheCor();
    }
  }
});

window.onload = inicializar();