/*
Name: Tatiana Lucero
Mod Name: Roocket Patroooool: The rookening
time: 4hrs

///////////////// 5-Point Tier
(5) Implement the speed increase that happens after 30 seconds in the original game 
(5) Background music to the Play scene (mind volume) 
(5) Allow player rocket control after it's fired 
///////////////// 10-Point Tier
(10) Create 4 new explosion sound effects and randomize which one plays on impact  
(10) Display the time remaining (in seconds) on screen 
(10) New title screen (new artwork, typography, layout) 
(10) Implement parallax scrolling for the background 
///////////////// 15-Point Tier
(15) Create a new enemy Spaceship type (w/ new artwork) that's smaller, moves faster, and is worth more points 
(15) Implement a new timing/scoring mechanism that adds time to the clock for successful hits
(15) Use Phaser's particle emitter to create a particle explosion when the rocket hits the spaceship
*/



let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [ Menu, Play ]
};
let game = new Phaser.Game(config);
// reserve keyboard vars
let keyF, keyR, keyLEFT, keyRIGHT;
// UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;



