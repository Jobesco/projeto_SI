const background = new Image();
const icone = new Image()
background.src = './kanto_map_cities_resized.png'
icone.src = './headSprite-removebg.png'

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

const iconeCursor = {
  posX: 192,
  posY: 303,
  tamanho: 30,
  posIniX:192,
  posIniY:303,

  atualiza (newX, newY) {
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
    contexto.drawImage(icone,0,0,517,481,this.posX,this.posY,50,46.51)
    //ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
  }
}

// ! 2 objetivos principais restantes para a linha
// TODO otimizar o processo de desenho da linha, para que ela não passe do cursor
// TODO manter tanto a posição final do cursor quanto os caminhos tracejados
const pathLine = { 
  posIniX: 0,
  posIniY: 0,
  posX: 0,
  posY: 0,
  lastX: 0,
  lastY: 0,

  desenha(rotas, last) {
    // ? marcar cada movimento que o cursor já correu, e só permitir a linha ir até ele

    let deslocamento = 20;
    if (rotas == null) {
      console.log('Rotas está nulo');
      return;
    }
    contexto.lineWidth = 20;
    if (last) { // ? se for a última, é a correta, e pinta de verde :)
      contexto.strokeStyle = 'green';
    }
    else {
      contexto.strokeStyle = 'red';
    }
    contexto.beginPath();
    contexto.moveTo(pathLine.posIniX + deslocamento, pathLine.posIniY + deslocamento);
    pathLine.lastX = pathLine.posIniX + deslocamento;
    pathLine.lastY = pathLine.posIniY + deslocamento;
    for (movimento_linha = 0; movimento_linha < visit; movimento_linha++) {
      contexto.lineTo(pathLine.lastX + rotas[movimento_linha].x, pathLine.lastY + rotas[movimento_linha].y);
      pathLine.lastX = pathLine.lastX + rotas[movimento_linha].x;
      pathLine.lastY = pathLine.lastY + rotas[movimento_linha].y;

    }
    contexto.stroke();
  }

}

function segueRota (rota) { // ? rota -> array de coordenadas a seguir do ponto inicial

  if(visit == 0){
    pathLine.posIniX = iconeCursor.posIniX
    pathLine.posIniY = iconeCursor.posIniY
  }

  if (rota[visit] == null) { // ? se ele tiver chegado no fim do loop
    // console.log('Acabou');
    visit = 0;
    iconeCursor.posIniX = iconeCursor.posX = pathLine.posIniX = initialPosX - 20;
    iconeCursor.posIniY = iconeCursor.posY = pathLine.posIniY = initialPosY - 20;
    route = route + 1;
    
    return;
  }

  if (iconeCursor.atualiza(rota[visit].x, rota[visit].y)) {
    iconeCursor.desenha();
  }
  else {
    visit = visit + 1;
  }
}

// * Ativa quando pressiona o botão
function buttonPress() {
  console.log('apertei o botão!')
  
  let origin = document.getElementById("origin_city").value
  let destination = document.getElementById("destination_city").value
  let algorithm = document.getElementById("algorithm").value

  if(origin == 'cidOrigem' || destination == 'cidDestino') alert('Escolha uma cidade')
  else if(origin != destination && !rodar_rotas && algorithm != 'ignore'){ // ? impede de jogar uma nova rota do nada
    rodar_rotas = true

    if(algorithm == 'dijkstra'){
      
      //encontraCaminhoMaisCurto zera tmpArray automaticamente :)
      arrayTemp = encontraCaminhoMaisCurto(grafo, origin, destination).caminho
    }
    else if(algorithm == 'astar'){
      arrayTemp = encontraCaminhoMaisCurtoA(grafo, origin, destination).caminho
    }

    tmpRoutes.push(arrayTemp)
    todasRotas = route_to_moves([...tmpRoutes]);

    console.log('rotas:',todasRotas)
  }
  else if(rodar_rotas) alert("Espere o loop acabar!")
  else if(algorithm != 'ignore') alert("Selecione cidades diferentes!")
  else alert('Escolha um algoritmo!')

}

// Array de cidades para o percurso no canvas
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

//-----------------------------------------------INICIO DO ALGORITMO DIJKSTRA------------------------------------------

let grafo = {
  indigoPlateau: {viridian: 30},
  viridian: {indigoPlateau: 30, pewter: 15, pallet: 10},
  pewter: {viridian: 15, cerulean: 20},
  cerulean: {pewter: 20, lavender: 15, saffron: 10},
  saffron: {cerulean: 10, lavender: 10, celadon: 10, vermilion: 10},
  celadon: {saffron: 10, fuchsia: 45},
  vermilion: {saffron: 10, lavender: 15, fuchsia: 20},
  lavender: {cerulean: 15, saffron: 10, vermilion: 15, fuchsia: 20},
  fuchsia: {vermilion: 20, lavender: 20, celadon: 45, cinnabar: 80},
  cinnabar: {fuchsia: 80, pallet: 35},
  pallet: {cinnabar: 35, viridian: 10},
};


let nohMaisPerto = (distancias, visitados) => {

  let maisCurto = null;

  let aux = 0;

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
    
  tmpRoutes = [];

  let distancias = {};
  distancias[nohFim] = "Infinity";
  distancias = Object.assign(distancias, grafo[nohInicio]);

  let pais = { nohFim: null };
  for (let filho in grafo[nohInicio]) {
    pais[filho] = nohInicio;
  }


  let visitados = [];

  let noh = nohMaisPerto(distancias, visitados);

  while (noh && !visitados.includes(nohFim)) {

    let distancia = distancias[noh];
    let filhos = grafo[noh]; 

    if(!(noh === nohFim)) {                  
      let caminhoMaisCurtoAux = [noh];
      let paiAux = pais[noh];
      while (paiAux) {
        caminhoMaisCurtoAux.push(paiAux);
        paiAux = pais[paiAux];
      }

      tmpRoutes.push(caminhoMaisCurtoAux.reverse()); //Caminho mais curto até o momento

      let resultadoAux = {
        distancia: distancias[noh],
        caminho: caminhoMaisCurtoAux,
      };
      // console.log(resultadoAux);
    }

    for (let filho in filhos) {


      if (String(filho) === String(nohInicio)) {
        continue;
      } else {

        let novaDistancia = distancia + filhos[filho];

        if (!distancias[filho] || distancias[filho] > novaDistancia) {
          
          distancias[filho] = novaDistancia;

          pais[filho] = noh;
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
  caminhoMaisCurto.reverse(); //Caminho final mais curto


  let resultados = {
    distancia: distancias[nohFim],
    caminho: caminhoMaisCurto,
  };

  return resultados;
};

//console.log(encontraCaminhoMaisCurto(grafo, "pallet", "fuchsia"));

//-----------------------------------------------FIM DO ALGORITMO DIJKSTRA--------------------------------------------------

//-----------------------------------------------INICIO DO ALGORITMO A*--------------------------------------------

let heuristicaA = {
  indigoPlateau: -1,
  viridian: -1,
  pewter: -1,
  cerulean: -1,
  saffron: -1,
  celadon: -1,
  vermilion: -1,
  lavender: -1,
  fuchsia: -1,
  cinnabar: -1,
  pallet: -1,
}

let atualizarDistancias = (cidadeDestino) =>{
  for (let cidade in heuristicaA){
      if (cidade == cidadeDestino){
          heuristicaA[cidade] = 0;
      }else{
          heuristicaA[cidade] = distanciaEntreDoisPontos(cidade, cidadeDestino);
      }
  }
}

let distanciaEntreDoisPontos = (cidadeAtual, cidadeDestino)  => {
  var res = Math.sqrt(Math.pow((cidades_canvas[cidadeDestino].x - cidades_canvas[cidadeAtual].x), 2) + Math.pow((cidades_canvas[cidadeDestino].y - cidades_canvas[cidadeAtual].y), 2));
  return res/10;
};


let nohMaisPertoA = (distanciasA, visitados) => {

  let maisCurto = null;

  for (let noh in distanciasA) {
      let atualMaisCurto =
      (maisCurto === null || distanciasA[noh] < distanciasA[maisCurto]) ;

      if (atualMaisCurto && !visitados.includes(noh)) {

          maisCurto = noh;
      }
  }
  return maisCurto;
};

let encontraCaminhoMaisCurtoA = (grafo, nohInicio, nohFim) => {
  tmpRoutes = [];
  atualizarDistancias(nohFim);

  let somaDistanciaHeuristica = {};

  for(let node in somaDistanciaHeuristica) {
      delete somaDistanciaHeuristica[node];
  }
  for(let node in grafo[nohInicio]) {
      
      if(node != nohInicio) {

          somaDistanciaHeuristica[node] = heuristicaA[node];
      }
  }


  let pais = {};
  for(let node in pais) {
      delete pais[node];
  }
  pais = { nohFim: null };
  for (let filho in grafo[nohInicio]) {
      pais[filho] = nohInicio;
  }

  let visitados = [];

  let filhosT = grafo[nohInicio];
  for (let cur in filhosT) {
      let tempDist = heuristicaA[cur] + filhosT[cur];

      somaDistanciaHeuristica[cur] = tempDist;
  }

  visitados.push(nohInicio);

  let noh = nohMaisPertoA(somaDistanciaHeuristica, visitados);

  while (noh && noh != nohFim) {

      let filhos = grafo[noh]; 

      if(!(noh === nohFim)) {                  
          let caminhoMaisCurtoAux = [noh];
          let paiAux = pais[noh];
          while (paiAux) {
              caminhoMaisCurtoAux.push(paiAux);
              paiAux = pais[paiAux];
          }
          tmpRoutes.push(caminhoMaisCurtoAux.reverse()); //Caminho mais curto até o momento
          // caminhoMaisCurtoAux.reverse();
          // console.log(resultadoAux);
      }


      for (let filho in filhos) {
          if (String(filho) === String(nohInicio)) {
              continue
          } else {

             let novaDistancia = heuristicaA[filho] + filhos[filho];
             

              if(filho == nohFim) {
                  somaDistanciaHeuristica[filho] = novaDistancia;

                  pais[filho] = noh;
              } else if ((!somaDistanciaHeuristica[filho] || somaDistanciaHeuristica[filho] > novaDistancia) && !visitados.includes(filho)) {
              
                  somaDistanciaHeuristica[filho] = novaDistancia;

                  pais[filho] = noh;
              }
          }
      }

      visitados.push(noh);

      noh = nohMaisPertoA(somaDistanciaHeuristica, visitados);
  }
  
  let caminhoMaisCurto = [nohFim];

  let pai = pais[nohFim];

  while (pai) {
      caminhoMaisCurto.push(pai);
      pai = pais[pai];
  }

  caminhoMaisCurto.reverse(); //Caminho final mais curto
  
  let resultados = {
      caminho: caminhoMaisCurto,
  };
  
  return resultados;
  
};

//-----------------------------------------------FIM DO ALGORITMO A*--------------------------------------------------


// ? recebe um array de rotas (array com nomes de cidades)
// ? e transforma em um array em que cada índice é um array de movimentos,
// ? um array de movimentos pra cada rota
function route_to_moves(array_cidades) {
  let arrayRotas = []; //array com a rota atual
  let returnArray = []

  for (let i = 0; i < array_cidades.length; i++) {
    arrayRotas = []
    let arrTemp = array_cidades[i]; //arrTemp = rota atual p converter
    // console.log('arrTemp:',arrTemp)

    for (let index = 0; index < arrTemp.length-1; index++) {
      if(index == 0){
        initialPosX = cidades_canvas[arrTemp[index]].x
        initialPosY = cidades_canvas[arrTemp[index]].y
      }
      if(index+1 != arrTemp.length){
        // console.log('agora estou em',arrTemp[index],'preciso achar a rota de',arrTemp[index+1])
        // console.log(arrTemp[index])
    
        // * procura no array de vizinhos o que tem cidade igual a ele
        let cidade = cidades_canvas[arrTemp[index]].vizinhos.find(elem2 => {
          return elem2.cidade === arrTemp[index+1]
        })
        // console.log('achei a cidade vizinha',cidade.rota)
        cidade.rota.forEach(element => {
          arrayRotas.push(element)  
        });
      }
    }
    // console.log('arrayRotas:',arrayRotas)
    returnArray.push(arrayRotas)
  }
  iconeCursor.posIniX = initialPosX - 20
  iconeCursor.posIniY = initialPosY - 20
  iconeCursor.posX = initialPosX - 20
  iconeCursor.posY = initialPosY - 20

  // console.log('returnArray:',returnArray)
  return returnArray
}


// Variáveis globais App

let frames = 0, visit = 0, route = 0, rodar_rotas = false;
let tmpRoutes = [];
let initialPosX = 0;
let initialPosY = 0;
let arrayTemp = [];
let todasRotas = [];
let movimento_linha = 0;

console.log('Iniciando App');


function loop() {
  // console.log(route)
  if (route >= todasRotas.length) {
    // console.log('Todas as rotas já foram demonstradas');
    route = 0;
    rodar_rotas = false;
  }
  planoDeFundo.desenha();

  if(rodar_rotas){ // ? se ele apertou o botão de rodar as rotas
    // ? roda continuamente, usando o loop como iterator
    pathLine.desenha(todasRotas[route], (route + 1 == todasRotas.length) ? true : false);
    segueRota(todasRotas[route]);
  }
  frames = frames + 1;
  requestAnimationFrame(loop);
}

background.onload = loop();

// TODO estilizar melhor o botão