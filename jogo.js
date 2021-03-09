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
      // console.log('Hora de atualizar');
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
    // console.log('Acabou');
    visit = 0;
    testCircle.posIniX = testCircle.posX = 155;
    testCircle.posIniY = testCircle.posY = 260;
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

function loop() {
  planoDeFundo.desenha();
  segueRota(cidades_canvas.indigoPlateau.vizinhos[0].rota);
  frames = frames + 1;
  // console.log('Frame: ', frames);
  requestAnimationFrame(loop);
}

var cidades_canvas = {
  indigoPlateau: {
    posicao_tamanho: {
      x:30,
      y:50,
      radius:100
    },
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

console.log('Iniciando App');
console.log('Caminho mais curto', encontraCaminhoMaisCurto(grafo, "pallet", "fuchsia"));

background.onload = loop();