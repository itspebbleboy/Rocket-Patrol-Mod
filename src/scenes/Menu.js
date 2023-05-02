class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        // load audio
        this.load.audio('sfx_select', './assets/blip_select12.wav');
        this.load.audio('sfx_explosion0', './assets/8bitExplosion1.wav');
        this.load.audio('sfx_explosion1', './assets/8bitExplosion2.wav');
        this.load.audio('sfx_explosion2', './assets/8bitExplosion3.wav');
        this.load.audio('sfx_explosion3', './assets/8bitExplosion4.wav');
        this.load.audio('sfx_rocket', './assets/rocket_shot.wav');
        this.load.image('logo', './assets/rocketPatrolNewLogo.png');
        this.load.audio('song','./assets/rocketPatrolSong.mp3');
        this.load.image('starfield', './assets/starfield.png');
        this.load.image('starfield1', './assets/starfield1.png');
    }

    create() {
        // menu text configuration
        let menuConfig = {
            fontFamily: 'Arial',
            fontSize: '28px',
            backgroundColor: '#84A98C',
            color: '#CAD2C5',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0);
        this.starfield1 = this.add.tileSprite(40, 20, 640, 480, 'starfield1').setOrigin(0, 0);
        this.starfield2 = this.add.tileSprite(20, 20, 640, 480, 'starfield1').setOrigin(0, 0);
        // show menu text
        this.logo = this.add.tileSprite(game.config.width/2 -480/2, game.config.height/4 - borderUISize - borderPadding, 480, 60, 'logo').setOrigin(0, 0);
        this.add.text(game.config.width/2, game.config.height/2+game.config.height/4, 'Use ←→ arrows to move & (F) to fire', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#2F3E46';
        menuConfig.color = '#CAD2C5';
        this.add.text(game.config.width/2, game.config.height/2-game.config.height/10 + borderUISize + borderPadding, 'Press ← for Novice or → for Expert', menuConfig).setOrigin(0.5);

        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update() {
      if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
        // Novice mode
        game.settings = {
          spaceshipSpeed: 3,
          gameTimer: 60000
        }
        this.sound.play('sfx_select');
        this.scene.start("playScene");    
      }
      if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
        // Expert mode
        game.settings = {
          spaceshipSpeed: 4,
          gameTimer: 45000    
        }
        this.sound.play('sfx_select');
        this.scene.start("playScene");    
      }
      this.starfield.tilePositionX -= 4;  // update tile sprite
      this.starfield1.tilePositionX -= 2.5;
      this.starfield2.tilePositionX -=1.5;
    }
}