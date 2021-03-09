const sprites = new Image();
sprites.src = './sprites.png';
const background = new Image();
background.src = './kanto_map_cities_resized.png'
const cabesa = new Image()
cabesa.src = './headSprite-removebg.png'

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
    contexto.drawImage(
      background,
      planoDeFundo.sX, planoDeFundo.sY,
      planoDeFundo.sWidth, planoDeFundo.sHeight, 
    );
  },
};

const testCircle = {
  posX: 155,
  posY: 260,
  tamanho: 30,
  posIniX:155,
  posIniY:260,

  atualiza (newX, newY) {
    const intervaloDeFrames = 1;
    const salto = 1;

    if(frames % intervaloDeFrames === 0) {
      console.log('Hora de atualizar');
      if (newX === 0) {
        if (newY + this.posIniY > this.posY) {
          this.posY = this.posY + salto;
          return true;
        }
        else if (newY + this.posIniY < this.posY) {
          this.posY = this.posY - salto;
          return true;
        }
        else {
          this.posIniY = this.posY;
        }
      }
      if (newY === 0) {
        if (newX + this.posIniX > this.posX) {
          this.posX = this.posX + salto;
          return true;
        }
        else if (newX + this.posIniX < this.posX) {
          this.posX = this.posX - salto;
          return true;
        }
        else {
          this.posIniX = this.posX;
        }
      }
      return false;
    }
  },
  desenha() {
    contexto.fillStyle='red';
    contexto.fillRect(this.posX,this.posY,this.tamanho,this.tamanho);
  }
}

function segueRota (rota) {
  let i;

  if (rota[visit] == null) {
    console.log('Acabou');
    visit = 0;
    testCircle.posIniX = testCircle.posX = 155;
    testCircle.posIniY = testCircle.posY = 260;
    return;
  }

  if (testCircle.atualiza(rota[visit].x, rota[visit].y)) {
    console.log('rota:', rota[visit].x, rota[visit].y);
    console.log('mudança:', testCircle.posX, testCircle.posY);
    testCircle.desenha();
  }
  else {
    visit = visit + 1;
  }
}

let frames = 0;
let visit = 0;

function loop() {
  planoDeFundo.desenha();
  segueRota(cidades_canvas.indigoPlateau.vizinhos[0].rota);
  frames = frames + 1;
  console.log('Frame: ', frames);
  requestAnimationFrame(loop);
}

var x = 0
background.onload = loop


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
    posicao_tamanho: {
      x:30,
      y:50,
      radius:100
    }, //(x,y,raio)
    vizinhos: [
      {
        cidade: 'viridian',
        rota: [
        {
          x:0,
          y:280,
        },
        {
          x:110,
          y:0,
        }]
      } //(x,y)
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