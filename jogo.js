console.log('[DevSoutinho] Flappy Bird');

const sprites = new Image();
sprites.src = './sprites.png';
const background = new Image();
background.src = './kanto_map_cities_resized.png'

const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');
// TALVEZ o fato do canvas ter um tamanho variável pode dar merda, qlqr coisa a gt deixa dimensões específicas


// [Plano de Fundo]
const planoDeFundo = {
  sX: 0,
  sY: 0,
  sWidth: 1770,
  sHeight: 996,

  dX: 0,
  dY: 0,
  dWidth: background.width,
  dHeight: background.height,

  desenha() {
    console.log(background.width,background.height,'aaa')
    contexto.drawImage(
      background,
      planoDeFundo.sX, planoDeFundo.sY,
      planoDeFundo.sWidth, planoDeFundo.sHeight, 
      
      // planoDeFundo.dX, planoDeFundo.dX, 
      // planoDeFundo.dWidth, planoDeFundo.dHeight,
    );
  },
};

// const flappyBird = {
//   spriteX: 0,
//   spriteY: 0,
//   largura: 33,
//   altura: 24,
//   x: 10,
//   y: 50,
//   desenha() {
//     contexto.drawImage(
//       sprites,
//       flappyBird.spriteX, flappyBird.spriteY, // Sprite X, Sprite Y
//       flappyBird.largura, flappyBird.altura, // Tamanho do recorte na sprite
//       flappyBird.x, flappyBird.y,
//       flappyBird.largura, flappyBird.altura,
//     );
//   }
// }


var testCircle = {
  posX: 186,
  posY: 296,
  tamanho: 10,

  desenha(){
    contexto.fillRect
  }

}

function loop() {
  planoDeFundo.desenha();
  // flappyBird.desenha();
  // setInterval(function() {
  //   flappyBird.y = flappyBird.y + 1;
  // },400)
  // requestAnimationFrame(loop);
  
}

background.onload = loop;


var cidades_grafos = {
  indigoPlateau: {
    vizinhos: [
      {
        cidade: 'viridian',
        distancia: 0,
      },
    ],
  },
  viridian: {
    vizinhos: [
      {
        cidade: 'indigoPlateau',
        distancia: 0,
      },
      {
        cidade: 'pewter',
        distancia: 0,
      },
      {
        cidade: 'pallet',
        distancia: 0,
      }
    ],
  },
  pewter: {
    vizinhos: [
      {
        cidade: 'cerulean',
        distancia: 0,
      },
      {
        cidade: 'viridian',
        distancia: 0,
      },
    ],
  },
}

var cidades_canvas = {
  indigoPlateau: {
    posicao_tamanho: (30,50,100), //(x,y,raio)
    rotas: [
      {viridian: [(0,50),(30,0)]} //(x,y)
    ]
  }
}

/*
(cidade1, cidade2, distancia)
(Pallet Town, Viridian City, 10)
(Viridian City, Indigo Plateau, 30)
(Viridian City, Pewter City, 15)
(Pewter City, Cerulean City, 20)
(Cerulean City, Lavender Town, 15)
(Cerulean City, Saffron City, 10)
(Lavender Town, Saffron City, 10)
(Saffron City, Celadon City, 10)
(Vermilion City, Saffron City, 10)
(Vermilion City, Lavender Town, 15)
(Vermilion City, Fuchsia City, 20)
(Lavender Town, Fuchsia City, 20)
(Fuchsia City, Celadon City,  25)
(Fuchsia City, Cinnabar Island, 20)
(Cinnabar Island, Pallet Town, 15)
*/