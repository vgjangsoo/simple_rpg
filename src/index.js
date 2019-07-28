import Phaser from "phaser";
import logoImg from "./assets/logo.png";
import mapTileset from "./assets/map-tileset.png";
import oratio from "./assets/Oratio-the-Mercenary.png";
import attack from "./assets/attack.png";

const config = {
  type: Phaser.AUTO,
  width: 1100,
  height: 800,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: 0,
      debug: false
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

let cursors;
let player;
let punch;
let spaceBar;

const game = new Phaser.Game(config);

function preload() {
  this.load.image("map-tiles", mapTileset);
  this.load.spritesheet("oratio", oratio, { frameWidth: 73, frameHeight: 73 });
  this.load.spritesheet("attack", attack, { frameWidth: 192, frameHeight: 192 });
}

function create() {
  const level = [
    [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0 ],
    [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0 ],
    [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0 ],
    [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0 ],
    [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0 ],
    [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0 ],
    [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0 ],
    [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0 ],
    [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0 ],
    [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0 ],
    [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0 ],
    [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0 ],
    [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0 ],
    [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0 ],
    [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0 ],
    [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0 ],
    [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0 ],
    [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0 ],
    [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0 ],
    [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0 ],
    [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0 ],
    [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0 ],
    [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0 ],
    [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0 ],
    [  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0 ],

  ];

  const map = this.make.tilemap({data: level, tileWidth: 50, tilesHeight: 50});
  const tiles = map.addTilesetImage('map-tiles');
  const layer = map.createStaticLayer(0, tiles, 0, 0);


  player = this.physics.add.sprite(config.width / 2, config.height / 2, 'oratio');
  player.setScale(1.3);
  player.setCollideWorldBounds(true);

  this.anims.create({
    key: 'standBy',
    frames: this.anims.generateFrameNumbers('oratio', { start: 1, end: 1 }),
    frameRate: 20
  })

  this.anims.create({
    key: 'down',
    frames: this.anims.generateFrameNumbers('oratio', { frames: [ 0, 1, 2, 1] }),
    frameRate: 10,
    repeat: 0
  });

  this.anims.create({
    key: 'left',
    frames: this.anims.generateFrameNumbers('oratio', { frames: [ 11, 12, 13, 12] }),
    frameRate: 10,
    repeat: 0
  });

  this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('oratio', { frames: [ 22, 23, 24, 23] }),
      frameRate: 10,
      repeat: 0
  });

  this.anims.create({
    key: 'up',
    frames: this.anims.generateFrameNumbers('oratio', { frames: [ 33, 34, 35, 34] }),
    frameRate: 10,
    repeat: 0
  });

  punch = this.physics.add.sprite(player.x + 10, player.y + 50, 'attack');
  punch.setScale(0.7);
  
  this.anims.create({
    key: 'punch',
    frames : this.anims.generateFrameNumbers('attack', { start: 0, end: 11 }),
    frameRate: 20,
    repeat:0
  });

  cursors = this.input.keyboard.createCursorKeys();
  spaceBar = this.input.keyboard.addKey('SPACE');
}

function update() {
  if (cursors.up.isDown) {
    player.y += -4;
    punch.y += -4;
    player.anims.play('up', true);
  }

  else if (cursors.down.isDown) {
    player.y += 4;
    punch.y += 4;
    player.anims.play('down', true);
  }

  if (cursors.left.isDown) {
    player.x += -4;
    player.anims.play('left', true);
  }

  else if (cursors.right.isDown) {
    player.x += 4;
    player.anims.play('right', true);
  }

  else {
    player.setVelocity(0);
    player.anims.pause();
  }

  if (spaceBar.isDown) {
    punch.anims.play('punch', true);
  }
}
