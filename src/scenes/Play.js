class Play extends Phaser.Scene {
    constructor() {
      super("playScene");
    }
    preload() {
        // load images/tile sprites (params: key of name of graphic, & URL of asset)
        this.load.image('rocket', './assets/rocket.png');
        this.load.image('smallerSpaceship', './assets/smallerSpaceship.png')
        this.load.image('spaceship', './assets/spaceship.png');
        //this.load.image('starfield', './assets/starfield.png');
        //this.load.image('starfield1', './assets/starfield1.png');
        // load spritesheet
        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
    }
    create() {
        // place tile sprite, scroll a sprite's texture w/o moving the position of the sprite itself
        //(params: x-coord, y- coord, width, height, and a key string that tells us which image to use)
        
        let song= this.sound.add('song',{volume: 0.2, loop:true,});
        song.play();
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0);
        this.starfield1 = this.add.tileSprite(40, 20, 640, 480, 'starfield1').setOrigin(0, 0);
        this.starfield2 = this.add.tileSprite(20, 20, 640, 480, 'starfield1').setOrigin(0, 0);

        // green UI background (params: x-coord, y- coord, width, height, & color in hexidec format)
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00FF00).setOrigin(0, 0);
        // white borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        // add rocket (p1)
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5, 0);
        // define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        // add spaceships (x3)
        this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4, 'spaceship', 0, 30).setOrigin(0, 0);
        this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'spaceship', 0, 20).setOrigin(0,0);
        this.ship03 = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*4, 'spaceship', 0, 10).setOrigin(0,0);
        this.smallerShip = new Spaceship(this, game.config.width, borderUISize*10,'smallerSpaceship', 0, 50).setOrigin(0,0);
        this.smallerShip.moveSpeed*=2;
        this.smallerShip.points*=2;
        // animation config
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { 
                start: 0, 
                end: 9, 
                first: 0
            }),
            frameRate: 30
        });


        // initialize score
        this.p1Score = 0;

        // display score
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'left',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        let timerConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig);
        this.timeLeft = this.add.text(game.config.width-borderUISize-borderPadding-100, borderUISize + borderPadding*2, this.p1Score, timerConfig);

        // GAME OVER flag
        this.gameOver = false;

        // 60-second play clock
        scoreConfig.fixedWidth = 0;
        //ADD TIME TO GAME using game.settings.gameTimer when points increment
        this.GameOverCall(/*game.settings.gameTimer*/ 2000);
        this.speedIncrease = this.time.delayedCall (30000, () => {
            this.ship01.moveSpeed*=1.25; 
            this.ship02.moveSpeed*=1.25; 
            this.ship03.moveSpeed*=1.25; 
            this.smallerShip.moveSpeed*=1.15;
        }, null, this);

    }
    
    GameOverCall(time){
        this.clock = this.time.delayedCall(time, () => {
            this.sound.get('song').stop();
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', this.scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or ← to Menu', this.scoreConfig).setOrigin(0.5);
            this.gameOver = true;

            //stop music
        }, null, this);
    }
    
    update() {
        // if the game is over, check key input for restart
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }
        // if the game is over, checks key input for menu scene
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }
        this.timeLeft.text=this.clock.getOverallRemainingSeconds();
        //moves the starfield
        this.starfield.tilePositionX -= 4;  // update tile sprite
        this.starfield1.tilePositionX -= 2.5;
        this.starfield2.tilePositionX -=1.5;
        
        //updates all the rockets
        if(!this.gameOver){
            this.p1Rocket.update();             // update p1
            this.ship01.update();               // update spaceship (x3)
            this.ship02.update();
            this.ship03.update();
            this.smallerShip.update();
        }

        // check collisions
        if(this.checkCollision(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);
        }
        if (this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);
        }
        if (this.checkCollision(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);
        }
        if(this.checkCollision(this.p1Rocket, this.smallerShip)){
            this.p1Rocket.reset();
            this.shipExplode(this.smallerShip);
        }
    }

    checkCollision(rocket, ship) {
        // simple AABB checking
        if (rocket.x < ship.x + ship.width && 
            rocket.x + rocket.width > ship.x && 
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship. y) {
                return true;
        } else {
            return false;
        }
    }

    shipExplode(ship) {
        // temporarily hide ship
        ship.alpha = 0;                         
        // create explosion sprite at ship's position
        
        let boom = this.add.particles('explosion');
        let bom = boom.createEmitter({maxParticles: 100, minParticles: 50, lifespan: 300, x: ship.x, y: ship.y, speed: {random: [-100,200]}, frequency: 200,});
        this.stopParticles= this.time.delayedCall( 400,  () => {
            bom.on=false;
            ship.reset();  // reset ship position
            ship.alpha = 1; // make ship visible again
        }, null, this)
        //bom.on

        //boom.anims.play('explode');             // play explode animation
        /*boom.on(/*'animationcomplete'1, () => {    // callback after anim completes
            ship.reset();                         // reset ship position
            ship.alpha = 1;                       // make ship visible again
            bom.destroy();                       // remove explosion sprite
        }); */
        // score add and repaint
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;

        let timeChange = this.clock.getRemaining()+ship.points*100;
        //this.clock.remove;
        this.time.removeEvent(this.clock);
        console.log(timeChange);

        this.GameOverCall(timeChange);
        /*this.clock = this.time.delayedCall(timeChange, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or ← to Menu', this.scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);*/
        //this.game.settings.gameTimer
        let sfxExplosionIndex = Math.floor(Math.random() * 4);
        this.sound.play('sfx_explosion'+sfxExplosionIndex);
      }
}