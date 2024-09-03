import { Scene } from "phaser";

// import class entities
import { Paddle } from "../entities/Paddle";
import { Ball } from "../entities/Ball";
import { Brick } from "../entities/Brick";
import { WallBrick } from "../entities/WallBrick";

export class Game extends Scene {
  constructor() {
    super("Game");
  }

  init() {
    this.score = 0;
  }

  create() {
    this.balls = this.add.group();
    this.balls.add(new Ball(this, 400, 300, 10, 0xffffff, 1));

    this.paddle = new Paddle(this, 200, 650, 1000, 20, 0xffffff, 1);
    this.wall = new WallBrick(this);

    this.physics.add.collider(this.paddle, this.balls);

    this.physics.add.collider(
      this.balls,
      this.wall,
      (ball, brick) => {
        brick.hit();
        this.puntaje();

        if (brick.isBallCreator) {
          this.createNewBall(ball.x, ball.y);
        }

        if (this.wall.getChildren().every(brick => brick.destroyed)) {
          ball.increaseSpeed(1.1);
          this.velocidadX = ball.newVelocityX;
          this.velocidadY = ball.newVelocityY;
          this.scene.restart({ newVelocityX: this.velocidadX, newVelocityY: this.velocidadY });
        }
      },
      null,
      this
    );

    // Colocar el puntaje en la esquina superior izquierda y hacer el texto más grande
    this.scoreTextgame = this.add.text(20, 20, `0`, {
      fontSize: '32px', // Tamaño del texto más grande
      fill: '#fff' // Color del texto blanco
    });

    this.physics.world.on("worldbounds", (body, up, down, left, right) => {
      if (down) {
        this.balls.clear(true, true);
        this.scene.start("GameOver");
      }
    });
  }

  puntaje() {
    this.score++;
    this.scoreTextgame.setText(`${this.score}`);
  }

  createNewBall(x, y) {
    console.log('Creando nueva pelota en', x, y); // Añadir log para depuración
    const newBall = new Ball(this, x, y, 10, 0xffffff, 1);
    this.balls.add(newBall);
    newBall.increaseSpeed(1.05); // Ajusta la velocidad si es necesario
  }

  update() {
    this.paddle.update();
  }
}






  

  



