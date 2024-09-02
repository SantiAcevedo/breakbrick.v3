import { Scene } from "phaser";

// import class entitities
import { Paddle } from "../entities/Paddle";
import { Ball } from "../entities/Ball";
import { Brick } from "../entities/Brick";
import { WallBrick } from "../entities/WallBrick";

export class Game extends Scene {
  constructor() {
    super("Game");
  }

  create() {
    // instanciar una nueva paleta.
    // crea un nuevo objeto
    // el this, aca, hace referencia a la escena
    this.ball = new Ball(this, 400, 300, 10, 0xffffff, 1);
    this.paddle = new Paddle(this, 400, 550, 300, 20, 0xffffff, 1);
    this.wall = new WallBrick(this);

    // colisiones
    this.physics.add.collider(this.paddle, this.ball);

    this.physics.add.collider(
      this.ball,
      this.wall,
      (ball, brick) => {
        brick.hit();
      },
      null,
      this
    );

    //colision de la pelota con el limite inferior
    this.physics.world.on("worldbounds", (body, up, down, left, right) => {
      console.log("worldbounds");
      if (down) {
        console.log("hit bottom");
        this.scene.start("GameOver");
      }
    });
  }

  update() {
    this.paddle.update();
  }
}
