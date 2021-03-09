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
  posX: 192,
  posY: 303,
  tamanho: 30,
  posIniX:192,
  posIniY:303,

  atualiza (newX, newY) { // TODO saltos de X em X, se o salto for passar do valor desejado, ele só chega nele e pronto :)
    const intervaloDeFrames = 1;
    const salto = 7;
    
    if(frames % intervaloDeFrames == 0) {
      if (newX == 0) {
        if (newY + this.posIniY > this.posY) {
          if ((this.posY + salto) > (newY + this.posIniY)) {
            this.posY = newY + this.posIniY;
            return true;
          }
          this.posY = this.posY + salto;
          return true;
        }
        else if (newY + this.posIniY < this.posY) {
          if ((this.posY - salto) < (newY + this.posIniY)) {
            this.posY = newY + this.posIniY;
            return true;
          }
          this.posY = this.posY - salto;
          return true;
        }
        else {
          this.posIniY = this.posY;
        }
      }
      if (newY == 0) {
        if (newX + this.posIniX > this.posX) {
          if ((this.posX + salto) > (newX + this.posIniX)) {
            this.posX = newX + this.posIniX;
            return true;
          }
          this.posX = this.posX + salto;
          return true;
        }
        else if (newX + this.posIniX < this.posX) {
          if ((this.posX - salto) < (newX + this.posIniX)) {
            this.posX = newX + this.posIniX;
            return true;
          }
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
    // contexto.fillStyle='red';
    // contexto.fillRect(this.posX,this.posY,this.tamanho,this.tamanho);
    contexto.drawImage(cabesa,0,0,517,481,this.posX,this.posY,50,46.51)
    //ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
  }
}

function segueRota (rota) {

  if (rota[visit] == null) {
    // console.log('Acabou');
    visit = 0;
    testCircle.posIniX = testCircle.posX = initialPosX - 20;
    testCircle.posIniY = testCircle.posY = initialPosY - 20;
    route = route + 1;

    contexto.beginPath();
    contexto.moveTo(0, 0);
    contexto.lineTo(600, 400);
    contexto.stroke(); //draw path

    // cancelAnimationFrame(animation);

    breakMeme();

    return;
  }

  if (testCircle.atualiza(rota[visit].x, rota[visit].y)) {
    // console.log('rota:', rota[visit].x, rota[visit].y);
    // console.log('mudança:', testCircle.posX, testCircle.posY);
    testCircle.desenha();
  }
  else {
    visit = visit + 1;
  }
}

var cidades_canvas = {
  indigoPlateau: {
    x:192,
    y:303,
    vizinhos: [{
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
    }]
  },
  viridian: {
    x: 303,
    y: 579,
    vizinhos: [{
      cidade: 'indigoPlateau',
      rota: [
      {
        x:-110,
        y:0,
      },
      {
        x:0,
        y:-280,
      }]
    },
    {
      cidade: 'pewter',
      rota: [{
        x: 0,
        y: -221,
      }]
    },
    {
      cidade: 'pallet',
      rota: [{
        x: 0,
        y: 170,
      }]
    }]
  },
  pewter: {
    x: 303,
    y: 359,
    vizinhos: [{
      cidade: 'viridian',
      rota: [{
        x: 0,
        y: 220,
      }]
    },
    {
      cidade: 'cerulean',
      rota: [
      {
        x: 222,
        y: 0,
      },
      {
        x:0,
        y:-56,
      },
      {
        x:336,
        y:0,
      }]
    }]
  },
  cerulean: {
    x: 855,
    y: 301,
    vizinhos: [{
      cidade: 'pewter',
      rota: [{
        x:-338,
        y:0,
      },
      {
        x:0,
        y:60,
      },
      {
        x:-222,
        y:0,
      }]
    },
    {
      cidade: 'lavender',
      rota: [{
        x: 218,
        y: 0,
      },
      {
        x: 0,
        y: 170,
      }]
    },
    {
      cidade: 'saffron',
      rota: [{
        x: 0,
        y: 168,
      }]
    }]
  },
  saffron: {
    x: 856,
    y: 470,
    vizinhos: [{
      cidade: 'cerulean',
      rota: [{
        x: 0,
        y: -168,
      }]
    },
    {
      cidade: 'lavender',
      rota: [{
        x: 222,
        y: 0,
      }]
    },
    {
      cidade: 'celadon',
      rota: [{
        x: -167,
        y: 0,
      }]
    },
    {
      cidade: 'vermilion',
      rota: [{
        x: 0,
        y: 166,
      }]
    }]
  },
  celadon: {
    x: 690,
    y: 470,
    vizinhos: [{
      cidade: 'saffron',
      rota: [{
        x: 167,
        y: 0,
      }]
    },
    {
      cidade: 'fuchsia',
      rota: [{
        x: -224,
        y: 0,
      },
      {
        x: 0,
        y: 331,
      },
      {
        x: 280,
        y: 0,
      }]
    }]
  },
  vermilion: {
    x: 857,
    y: 636,
    vizinhos: [{
      cidade: 'saffron',
      rota: [{
        x: 0,
        y: -166,
      }]
    },
    {
      cidade: 'lavender',
      rota: [{
        x: 221,
        y: 0,
      },
      {
        x: 0,
        y: -172,
      }]
    },
    {
      cidade: 'fuchsia',
      rota: [{
        x: 221,
        y: 0,
      },
      {
        x: 0,
        y: 106,
      },
      {
        x: -173,
        y: 0,
      },
      {
        x: 0,
        y: 60,
      },
      {
        x: -165,
        y: 0,
      }]
    }]
  },
  lavender: {
    x: 1075,
    y: 470,
    vizinhos: [{
      cidade: 'cerulean',
      rota: [{
        x: 0,
        y: -164,
      },
      {
        x: -225,
        y: 0,
      }]
    },
    {
      cidade: 'saffron',
      rota: [{
        x: -222,
        y: 0,
      }]
    },
    {
      cidade: 'vermilion',
      rota: [{
        x: 0,
        y: 172,
      },
      {
        x: -221,
        y: 0,
      }]
    },
    {
      cidade: 'fuchsia',
      rota: [{
        x: 0,
        y: 274,
      },
      {
        x: -166,
        y: 0,
      },
      {
        x: 0,
        y: 56,
      },
      {
        x: -162,
        y: 0,
      }]
    }]
  },
  fuchsia: {
    x: 745,
    y: 803,
    vizinhos: [{
      cidade: 'vermilion',
      rota: [{
        x: 165,
        y: 0,
      },
      {
        x: 0,
        y: -60,
      },
      {
        x: 173,
        y: 0,
      },
      {
        x: 0,
        y: -106,
      },
      {
        x: -221,
        y: 0,
      }]
    },
    {
      cidade: 'lavender',
      rota: [{
        x: 165,
        y: 0,
      },
      {
        x: 0,
        y: -60,
      },
      {
        x: 173,
        y: 0,
      },
      {
        x: 0,
        y: -272,
      }]
    },
    {
      cidade: 'celadon',
      rota: [
      {
        x: -280,
        y: 0,
      },
      {
        x: 0,
        y: -331,
      },
      {
        x: 224,
        y: 0,
      }]
    },
    {
      cidade: 'cinnabar',
      rota: [{
        x: 0,
        y: 112,
      },
      {
        x: -445,
        y: 0,
      }]
    }]
  },
  cinnabar: {
    x: 301,
    y: 913,
    vizinhos: [{
      cidade: 'fuchsia',
      rota: [{
        x: 445,
        y: 0,
      },
      {
        x: 0,
        y: -112,
      }]
    },
    {
      cidade: 'pallet',
      rota: [{
        x: 0,
        y: -177,
      }]
    }]
  },
  pallet: {
    x: 299,
    y: 747,
    vizinhos: [{
      cidade: 'cinnabar',
      rota: [{
        x: 0,
        y: 177,
      }]
    },
    {
      cidade: 'viridian',
      rota: [{
        x: 0,
        y: -170,
      }]
    }]
  },
}

// ----------------------------------------------- INICIO DO ALGORITMO ------------------------------------------ //

let grafo = {
  indigoPlateau: {viridian: 30},
  viridian: {indigoPlateau: 30, pewter: 15, pallet: 10},
  pewter: {viridian: 15, cerulean: 20},
  cerulean: {pewter: 20, lavender: 15, saffron: 10},
  saffron: {cerulean: 10, lavender: 10, celadon: 10, vermilion: 10},
  celadon: {saffron: 10, fuchsia: 45},
  vermilion: {saffron: 10, lavender: 15, fuchsia: 20},
  lavender: {cerulean: 15, saffron: 10, vermilion: 15, fuchsia: 20},
  fuchsia: {vermilion: 20, lavender: 20, celadon: 45, cinnabar: 50},
  cinnabar: {fuchsia: 50, pallet: 35},
  pallet: {cinnabar: 35, viridian: 10},
};

let nohMaisPerto = (distancias, visitados) => {

  let maisCurto = null;

  for (let noh in distancias) {

      let atualMaisCurto =
      maisCurto === null || distancias[noh] < distancias[maisCurto];


      if (atualMaisCurto && !visitados.includes(noh)) {

          maisCurto = noh;
      }
  }
  return maisCurto;
};

let encontraCaminhoMaisCurto = (grafo, nohInicio, nohFim) => {


  let distancias = {};
  distancias[nohFim] = "Infinity";
  distancias = Object.assign(distancias, grafo[nohInicio]);

  let pais = { nohFim: null };
  for (let filho in grafo[nohInicio]) {
      pais[filho] = nohInicio;
  }


  let visitados = [];

  let noh = nohMaisPerto(distancias, visitados);

  while (noh) {

      let distancia = distancias[noh];
      let filhos = grafo[noh]; 


      for (let filho in filhos) {


          if (String(filho) === String(nohInicio)) {
              continue;
          } else {

              let novaDistancia = distancia + filhos[filho];

              if (!distancias[filho] || distancias[filho] > novaDistancia) {

                  distancias[filho] = novaDistancia;

                  pais[filho] = noh;
                  let caminhoMaisCurtoAux = [noh];
                  let paiAux = pais[noh];
                  while (paiAux) {
                      caminhoMaisCurtoAux.push(paiAux);
                      paiAux = pais[paiAux];
                  }
                  console.log('Caminho Temporário:', caminhoMaisCurtoAux.reverse());
                  tmpRoutes.push(caminhoMaisCurtoAux);
              }
          }
      }

      visitados.push(noh);

      noh = nohMaisPerto(distancias, visitados);
  }


  let caminhoMaisCurto = [nohFim];
  let pai = pais[nohFim];
  while (pai) {
      caminhoMaisCurto.push(pai);
      pai = pais[pai];
  }
  caminhoMaisCurto.reverse();


  let resultados = {
      distancia: distancias[nohFim],
      caminho: caminhoMaisCurto,
  };

  return resultados;
};

// console.log(encontraCaminhoMaisCurto(grafo, "pallet", "fuchsia"));

// ----------------------------------------------- FIM DO ALGORITMO -------------------------------------------------- //

let frames = 0;
let visit = 0;
let route = 0;
let animation = null;
let tmpRoutes = [];

console.log('Iniciando App');
let arrayTemp = encontraCaminhoMaisCurto(grafo, "pallet", "fuchsia").caminho
console.log('Caminho mais curto', arrayTemp);
console.log('Temp:', tmpRoutes);
const tempSet = new Set(tmpRoutes)
tmpRoutes = [...tempSet]
//TODO verificar igualdade das rotas temporárias, infelizmente minha net caiu e eu não pude fazer mais nada realmente significante

//transformar arrayTemp em um conjunto de coordenadas
//pega as coordenadas do primeiro, depois os vizinhos de todos os outros
let actual_city = null
let arrayTeste2 = []
let initialPosX = 0
let initialPosY = 0
for (let index = 0; index < arrayTemp.length-1; index++) {
  if(index == 0){
    initialPosX = cidades_canvas[arrayTemp[index]].x
    initialPosY = cidades_canvas[arrayTemp[index]].y
  }
  if(index+1 != arrayTemp.length){ //roda código diferente se estiver pra acabar
    console.log('agora estou em',arrayTemp[index],'preciso achar a rota de',arrayTemp[index+1])
    // console.log(arrayTemp[index])

    //procura no array de vizinhos o que tem cidade igual a ele
    let cidade = cidades_canvas[arrayTemp[index]].vizinhos.find(elem2 => {
      return elem2.cidade === arrayTemp[index+1]
    })
    console.log('achei a cidade vizinha',cidade.rota)
    cidade.rota.forEach(element => {
      arrayTeste2.push(element)  
    });
     
  }
}
testCircle.posIniX = initialPosX - 20
testCircle.posIniY = initialPosY - 20
testCircle.posX = initialPosX - 20
testCircle.posY = initialPosY - 20

let arraySupremo = [
  // [
  //   {
  //     x:0,
  //     y:280,
  //   },
  //   {
  //     x:110,
  //     y:0,
  //   },
  //   {
  //     x: 0,
  //     y: -220,
  //   }
  // ],
  // [
  //   {
  //     x:0,
  //     y:280,
  //   },
  //   {
  //     x:110,
  //     y:0,
  //   },
  //   {
  //     x: 0,
  //     y: 170,
  //   }
  // ]
]
arraySupremo.push(arrayTeste2)

//TODO rodar com um botão
//TODO escolher o inicio e fim

function loop() {
  // console.log(route)
  if (route >= arraySupremo.length) {
    route = 0;
  }
  planoDeFundo.desenha();
  segueRota(arraySupremo[route]);
  frames = frames + 1;
  // console.log('Frame: ', frames);
  animation = requestAnimationFrame(loop);
}

// arrayTeste =[
// {
//   x:0,
//   y:280,
// },
// {
//   x:110,
//   y:0,
// },
// {
//   x: 0,
//   y: -220,
// }]

// function loop() {
//   planoDeFundo.desenha();
//   segueRota(arrayTeste);
//   frames = frames + 1;
//   // console.log('Frame: ', frames);
//   requestAnimationFrame(loop);
// }

background.onload = loop();