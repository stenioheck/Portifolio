
//variáveis principais

var raquete;
var mosquito;
let pagInfo = "https://campomourao.atende.net/cidadao/noticia/secretario-alerta-focos-de-contaminacao-por-dengue-podem-estar-na-propria-casa-do-doente"

//função que roda o game
function startGame() {
    raquete = new component(500, 500, "images/raquete.png", 0, 0, "image");
    mosquito = new component(80, 80, "images/aedes.png", 400, 100, "image");
    myGameArea.start();
    
}

//cria o canvas do game e seta o reload dele

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 1200;
        this.canvas.height = 800;
        this.context = this.canvas.getContext("2d");
        document.body.appendChild(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 40);
        },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop : function() {
        clearInterval(this.interval);
    }
}

//cria as imagens do game com suas posições e características

function component(width, height, color, x, y, type) {
    this.type = type;
    if (type == "image") {
        this.image = new Image();
        this.image.src = color;
    }
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;    
    this.x = x;
    this.y = y;    
    this.update = function() {
        ctx = myGameArea.context;
        if (type == "image") {
            ctx.drawImage(this.image, 
                this.x, 
                this.y,
                this.width, this.height);
        } else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY;        
    }
}

//faz update das posições no game

function updateGameArea() {
    myGameArea.clear();
    raquete.newPos();
    raquete.update();
    mosquito.newPos();
    mosquito.update();
    moveMosquito ();
    verificaColisao ()
}

// funções para movimentar a raquete por botões

function moveup() {
    raquete.speedY = -2; 
}

function movedown() {
    raquete.speedY = 2; 
}

function moveleft() {
    raquete.speedX = -2; 
}

function moveright() {
    raquete.speedX = 2; 
}

function clearmove() {
    raquete.speedX = 0; 
    raquete.speedY = 0; 
}

//função para gerar numero inteiro aleatorio 

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

//função para movimentar mosquito. Usa numeros aleatórios gerados numa faixa escolhida

function moveMosquito() {
  rangeX = getRndInteger (-10, 10)
  rangeY = getRndInteger (-10, 10)
  mosquito.speedX = (rangeX)
  mosquito.speedY = (rangeY)

}

// função que determina o que fazer em caso de colisão raquete-mosquito
function verificaColisao () {
  colidiu = (collideRectRect(mosquito.x, mosquito.y, mosquito.width, mosquito.height, raquete.x, raquete.y, raquete.width, raquete.height))
   if (colidiu) {

    window.open(pagInfo, '_blank');
    window.location.reload();

    }
}

//função verifica colisão entre dois retângulos
collideRectRect = function (x, y, w, h, x2, y2, w2, h2) {
  
  if (x + 200 >= x2 &&    
      x <= x2 + 200 &&    
      y +200 >= y2 &&    
      y <= y2 + 200 ) {    
        return true;
  }
  return false;
};

