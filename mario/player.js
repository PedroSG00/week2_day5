class Player {

  constructor(ctx, gameW, gameH, keys) {

    this.ctx = ctx;

    this.gameWidth = gameW;
    this.gameHeight = gameH;

    this.width = 100;
    this.height = 100;

    this.image = new Image();
    this.image.src = "./img/player.png";
    this.image.frames = 3;
    this.image.framesIndex = 0;

    this.posX = 50;
    this.posY = this.gameHeight - this.height - 20;
    this.posY0 = this.posY;

    this.velY = 1;
    this.gravity = 0.4;

    this.keys = keys;

    this.bullets = [];

    this.setListeners();
  }

  draw(framesCounter) {

    this.ctx.drawImage(
      this.image,
      this.image.framesIndex * (this.image.width / this.image.frames),
      0,
      this.image.width / this.image.frames,
      this.image.height,
      this.posX,
      this.posY,
      this.width,
      this.height
    )

    this.animate(framesCounter)

    this.move()

    this.bullets.forEach(bullet => bullet.draw())
    this.clearBullets()
  }

  animate(framesCounter) {
    if (framesCounter % 5 == 0) {
      this.image.framesIndex++;
    }
    if (this.image.framesIndex >= this.image.frames) {
      this.image.framesIndex = 0;
    }
  }

  move() {
    if (this.posY < this.posY0) {   // Está saltando!
      this.posY += this.velY;
      this.velY += this.gravity;
    } else {
      this.posY = this.posY0;
      this.velY = 1;
    }
  }

  setListeners() {

    document.addEventListener("keydown", e => {

      switch (e.keyCode) {
        case this.keys.TOP:
          if (this.posY >= this.posY0) {
            this.jump()
          }
          break;
        case this.keys.SPACE:
          this.shoot();
          break;
      }
    });
  }

  jump() {
    this.posY -= 40;
    this.velY -= 8;
  }

  shoot() {
    this.bullets.push(new Bullets(this.ctx, this.posX, this.posY, this.posY0, this.width, this.height));
  }

  clearBullets() {
    this.bullets = this.bullets.filter(bull => bull.posX <= this.gameWidth)
  }
}
