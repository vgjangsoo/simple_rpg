import Phaser from "phaser";
import logoImg from "./assets/logo.png";
import mapTileset from "./assets/map-tileset.png";
import character from "./assets/light.png";
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
  this.load.spritesheet("character", character, { frameWidth: 64, frameHeight: 64 });
  this.load.spritesheet("attack", attack, { frameWidth: 192, frameHeight: 192 });
}

function create() {
  // Map tiles.
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

  // Map and layer
  const map = this.make.tilemap({data: level, tileWidth: 50, tilesHeight: 50});
  const tiles = map.addTilesetImage('map-tiles');
  const layer = map.createStaticLayer(0, tiles, 0, 0);

  // player
  player = this.physics.add.sprite(config.width / 2, config.height / 2, 'character').setFrame(134);
  player.setScale(1.7);
  player.setCollideWorldBounds(true);

  this.anims.create({
    key: 'up',
    frames: this.anims.generateFrameNumbers('character', { frames: [104, 105, 106, 107, 108, 109, 110, 111, 112, 104] }),
    frameRate: 30,
    repeat: 0
  });

  this.anims.create({
    key: 'down',
    frames: this.anims.generateFrameNumbers('character', { frames: [130, 131, 132, 133, 134, 135, 136, 137, 138, 130] }),
    frameRate: 30,
    repeat: 0
  });

  this.anims.create({
    key: 'left',
    frames: this.anims.generateFrameNumbers('character', { frames: [117, 118, 119, 120, 121, 122, 123, 124, 125, 117] }),
    frameRate: 30,
    repeat: 0
  });

  this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('character', { frames: [143, 144, 145, 146, 147, 148, 149, 150, 151, 143] }),
      frameRate: 30,
      repeat: 0
  });

  this.anims.create({
    key: "attack-up",
    frames: this.anims.generateFrameNumbers('character', { frames: [156, 157, 158, 159, 160, 161, 156] }),
    frameRate: 30,
    repeat: 0
  })

  this.anims.create({
    key: "attack-down",
    frames: this.anims.generateFrameNumbers('character', { frames: [182, 183, 184, 185, 186, 187, 182] }),
    frameRate: 30,
    repeat: 0
  })

  this.anims.create({
    key: "attack-left",
    frames: this.anims.generateFrameNumbers('character', { frames: [169, 170, 171, 172, 173, 174, 169] }),
    frameRate: 30,
    repeat: 0
  })

  this.anims.create({
    key: "attack-right",
    frames: this.anims.generateFrameNumbers('character', { frames: [195, 196, 197, 198, 199, 200, 195] }),
    frameRate: 30,
    repeat: 0
  })

  // punch attack
  punch = this.physics.add.sprite(player.x + 10, player.y + 50, 'attack');
  punch.setScale(0.7);
  punch.visible = false;
  
  this.anims.create({
    key: 'punch',
    frames : this.anims.generateFrameNumbers('attack', { start: 0, end: 11 }),
    frameRate: 40,
    repeat:0
  });

  // Key input
  cursors = this.input.keyboard.createCursorKeys();
  spaceBar = this.input.keyboard.addKey('SPACE');
}

function update() {
  if (cursors.up.isDown) {
    player.y += -4;
    punch.x = player.x;
    punch.y = player.y - 60;
    player.anims.play('up', true);
  }

  else if (cursors.down.isDown) {
    player.y += 4;
    punch.x = player.x;
    punch.y = player.y + 60;
    player.anims.play('down', true);
  }

  else if (cursors.left.isDown) {
    player.x += -4;
    punch.y = player.y;
    punch.x = player.x - 60;
    player.anims.play('left', true);
  }

  else if (cursors.right.isDown) {
    player.x += 4;
    punch.y = player.y;
    punch.x = player.x + 60;
    player.anims.play('right', true);
  }

  else {
    player.setVelocity(0);
    player.anims.pause();
  }

  if (spaceBar.isDown) {
    punch.anims.play('punch', true);
    punch.visible = true;
  }

  punch.once('animationcomplete', ()=>{
    punch.anims.pause();
    punch.visible = false;
  });
}
