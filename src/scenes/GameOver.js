import { Scene } from 'phaser';

export class GameOver extends Scene {
  constructor() {
    super('GameOver');
  }

  init(data) {
    this.score = data.score; // Recibe la puntuación desde la escena anterior
  }

  create() {
    this.cameras.main.setBackgroundColor(0xff0000);

    this.add.image(512, 384, 'background').setAlpha(0.5);

    this.add.text(512, 284, `Puntuación: ${this.score}`, {
      fontFamily: 'Arial Black', fontSize: 48, color: '#ffffff',
      stroke: '#000000', strokeThickness: 8,
      align: 'center'
    }).setOrigin(0.5);

    this.add.text(512, 384, 'Game Over', {
      fontFamily: 'Arial Black', fontSize: 64, color: '#ffffff',
      stroke: '#000000', strokeThickness: 8,
      align: 'center'
    }).setOrigin(0.5);

    this.input.once('pointerdown', () => {
      this.scene.start('MainMenu');
    });
  }
}

