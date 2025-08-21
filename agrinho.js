let player;
let items = [];
let score = 0;
let gameOver = false;

function setup() {
  createCanvas(500, 400);
  player = new Player();
  textSize(20);
}

function draw() {
  background(200, 255, 200);


  if (!gameOver) {
    player.show();
    player.move();

    if (frameCount % 60 === 0) {
      items.push(new Item());
    }

    for (let  = items.length - 1; i >= 0; i--) {
      items[i].fall();
      items[i].show();

      if (items[i].hits(player)) {
        if (items[i].type === "recyclable") {
          score += 10;
        } else {
          score -= 15;
        }
        items.splice(i, 1);
      } else if (items[i].y > height) {
        items.splice(i, 1);
      

    fill(0);
    text("Pontuação: " + score, 10, 30);

    if (score < -50) {
      gameOver = true;
    }

  } else {
    background(255, 100, 100);
    fill(0);
    textAlign(CENTER);
    text("Fim de Jogo! Pontuação: " + score, width / 2, height / 2);
    text("Recarregue a página para jogar de novo.", width / 2, height / 2 + 30);
  }

class Player {
  constructor() {
    this.x = width / 2;
    this.y = height - 40;
    this.size = 40;
  }

  show() {
    fill(50, 200, 50);
    rect(this.x, this.y, this.size, this.size);
  }

  move() {
    if (keyIsDown(LEFT_ARROW) && this.x > 0) {
      this.x -= 5;
    } else if (keyIsDown(RIGHT_ARROW) && this.x < width - this.size) {
      this.x += 5;
    }
  }
}

class Item {
  constructor() {
    this.x = random(0, width - 20);
    this.y = 0;
    this.size = 20;
    this.type = random() < 0.7 ? "recyclable" : "toxic";
  }

  fall() {
    this.y += 4;
  }

  show() {
    if (this.type === "recyclable") {
      fill(0, 100, 255);
    } else {
      fill(255, 0, 0);
    }
    ellipse(this.x, this.y, this.size);
  }

  hits(player) {
    return (
      this.x < player.x + player.size &&
      this.x + this.size > player.x &&
      this.y < player.y + player.size &&
      this.y + this.size > player.y);  
  }
}
