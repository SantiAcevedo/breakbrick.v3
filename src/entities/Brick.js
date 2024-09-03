export class Brick extends Phaser.GameObjects.Rectangle {
  constructor(scene, x, y, width, height, color, alpha, isBallCreator, isBombCreator) {
    super(scene, x, y, width, height, color, alpha);

    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.body.immovable = true;
    this.body.setCollideWorldBounds(true);
    this.isBallCreator = isBallCreator;
    this.isBombCreator = isBombCreator; 

    this.toches = 0;
    this.maxToches = Phaser.Math.Between(1, 4);
  }

  hit() {
    this.toches++;
    if (this.toches === 1) {
      this.setFillStyle(0xff0000);
    }
    if (this.toches === 2) {
      this.setFillStyle(0x00ff00);
    }
    if (this.toches === 3) {
      this.setFillStyle(0x0000ff);
    }

    if (this.toches === this.maxToches) {
      this.destroy();

      if (this.isBallCreator) {
        if (this.scene && typeof this.scene.createNewBall === 'function') {
          console.log('Ladrillo generador de pelotas activado en', this.x, this.y);
          this.scene.createNewBall(this.x, this.y);
        } else {
          console.error('createNewBall no está definido en la escena');
        }
      }

      if (this.isBombCreator) {
        if (this.scene && typeof this.scene.createNewBomb === 'function') {
          console.log('Ladrillo generador de bombas activado en', this.x, this.y);
          this.scene.createNewBomb(this.x, this.y);
        } else {
          console.error('createNewBomb no está definido en la escena');
        }
      }
    }
  }
}
 
 
  
  
  
  
  
  



 
 
  
  
  
  
  
  