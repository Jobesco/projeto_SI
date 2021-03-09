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
    // console.log(background.width,background.height,'aaa')
    contexto.drawImage(
      background,
      planoDeFundo.sX, planoDeFundo.sY,
      planoDeFundo.sWidth, planoDeFundo.sHeight, 
      
      // planoDeFundo.dX, planoDeFundo.dX, 
      // planoDeFundo.dWidth, planoDeFundo.dHeight,
    );
  },
};

// const cabesaObj = {
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
  posX: 155,
  posY: 260,
  tamanho: 75,
  posIniX:155,
  posIniY:260,

  desenha(){
    contexto.fillStyle='yellow'
    contexto.fillRect(this.posX,this.posY,this.tamanho,this.tamanho)
  },

}

function segueRota(rota){ //rota -> cidade vizinha para qual ele vai andar
  rota.forEach(element => {
    let done = false
    while(!done){
      let runX = (element.x != 0 ? true : false)

      if(runX){
        if(testCircle.posX < testCircle.posIniX + element.x){
          testCircle.posX += 1
        }
        else if(testCircle.posX > testCircle.posIniX + element.x){
          testCircle.posX -= 1
        }
        else{
          done = true
          testCircle.posIniX = testCircle.posX
        }
      }
      else if(!runX){
        if(testCircle.posY < testCircle.posIniY + element.y){
          testCircle.posY += 1
        }
        else if(testCircle.posY > testCircle.posIniY + element.y){
          testCircle.posY -= 1
        }
        else{
          done = true
          testCircle.posIniY = testCircle.posY

        }
      }

      testCircle.desenha()
    }
    
  });
  

  // console.log('testCircle.posY',testCircle.posY,'\ntestCircle.posIniY + rota[0].y',testCircle.posIniY + rota[0].y)

  // if((runX && testCircle.posX == testCircle.posX + rota[0].x) || (!runX && testCircle.posY == testCircle.posY + rota[0].y)) console.log('TEMRINOAUOAUAUAOUA')
  
}

function loop() {
  planoDeFundo.desenha();
  testCircle.desenha();
  // cabesaObj.desenha();
  // flappyBird.desenha();
  // setInterval(function() {
  //   flappyBird.y = flappyBird.y + 1;
  // },400)

  // console.log('seguindo o caminho para viridian')
  // console.log(testCircle.posY,cidades_canvas.indigoPlateau.vizinhos[0].rota[0].y)
  segueRota(cidades_canvas.indigoPlateau.vizinhos[0].rota)

  
  requestAnimationFrame(loop);
}

var x = 0
background.onload = loop


var cidades_canvas = {
  indigoPlateau: {
    posicao_tamanho: {x:30,y:50,radius:100}, //(x,y,raio)
    vizinhos: [
      {
        cidade: 'viridian',
        rota: [{x:0,y:280},{x:110,y:0}]
      } //(x,y)
    ]
  }
}

//-----------------------------------------------INICIO DO ALGORITMO------------------------------------------

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
                  console.log(caminhoMaisCurtoAux.reverse());
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

console.log(encontraCaminhoMaisCurto(grafo, "pallet", "fuchsia"));

//-----------------------------------------------FIM DO ALGORITMO--------------------------------------------------
