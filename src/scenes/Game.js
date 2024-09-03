import { Scene } from "phaser";
import { Paddle } from "../entities/Paddle";
import { Ball } from "../entities/Ball";
import { Brick } from "../entities/Brick";
import { WallBrick } from "../entities/WallBrick";
import { Bomb } from "../entities/Bomb";

export class Game extends Scene {
  constructor() {
    super("Game");
    this.touchedBottomBalls = []; 
  }

  init() {
    this.score = 0;
  }

  create() {
    this.balls = this.add.group();
    this.balls.add(new Ball(this, 400, 300, 10, 0xffffff, 1));

    this.paddle = new Paddle(this, 200, 650, 200, 20, 0xffffff, 1);
    this.wall = new WallBrick(this);
    this.bombs = this.add.group();

    this.scoreTextgame = this.add.text(20, 20, '0', {
      fontSize: '32px',
      fill: '#fff'
    });

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

        if (brick.isBombCreator) {
          this.createNewBomb(ball.x, ball.y);
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

    this.physics.add.collider(this.paddle, this.bombs, (paddle, bomb) => {
      this.handleGameOver();
    });

    this.physics.world.on("worldbounds", (body, up, down, left, right) => {
      if (down && body.gameObject instanceof Ball) {
        this.handleBallTouchBottom(body.gameObject);
      }
    });
  }

  puntaje() {
    this.score++;
    this.scoreTextgame.setText(`${this.score}`);
  }

  createNewBall(x, y) {
    console.log('Creando nueva pelota en', x, y);
    const newBall = new Ball(this, x, y, 10, 0xffffff, 1);
    this.balls.add(newBall);
    newBall.increaseSpeed(1.05);
  }

  createNewBomb(x, y) {
    console.log('Creando nueva bomba en', x, y); // Verificar que se imprima en la consola
    const newBomb = new Bomb(this, x, y, 20, 20, 0xff0000, 1);
    this.bombs.add(newBomb);
  }

  handleBallTouchBottom(ball) {
    ball.destroy(); 
    this.touchedBottomBalls.push(ball);
  
    // Eliminar la pelota del grupo de pelotas
    this.balls.remove(ball, true, true);
  
    // Verificar si todas las pelotas han tocado el suelo
    if (this.touchedBottomBalls.length === this.balls.getLength() + this.touchedBottomBalls.length) {
      console.log("Todas las pelotas han tocado el suelo");
      this.scene.start("GameOver", { score: this.score }); // Pasar la puntuación
    }
  }
  

  handleGameOver() {
    console.log('¡Juego terminado! La bomba tocó la paleta.');
    this.bombs.clear(true, true);
    this.scene.start('GameOver', { score: this.score });
  }
  

  update() {
    this.paddle.update();
    this.bombs.getChildren().forEach(bomb => {
      console.log('Bomb position:', bomb.x, bomb.y);
    });
  }
}

















  

  



