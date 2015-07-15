// here are some information regarding status of the game 
var notice  = "GAME OVER";
var notice1 = 'HORRAY, You Made it!!';
var notice2 = 'Good Luck!';
var notice3 = "Press Restart to Play Again";

/* 
* This is an Enemy Class that contains within itself reference to the image, 
* its location on the canvas, speed and dimension hit box. parameters come from 
* instantiated objects
*/
var Enemy = function(xLoc, yLoc, speed) {
    this.sprite = 'images/enemy-bug.png';
    this.xLoc = xLoc;
    this.yLoc = yLoc;
    this.speed = speed;
    this.width = 60;
    this.height = 40;
};
/* Here we check location of the enemy in order to assist in rendering in on 
* canvas. DT is the parameter that this function accepts. DT is described in  
* the engine.js file. Here, we check the location of Enemy and see where was 
* the last position of was. if Enemy posision was less than 600px then add 
* current location to speed * delta time otherwise, if the enemy position is
* 600 and greater, then take the image and begin incrementing if forward from 
* -110 xLoc of canvas
*/
Enemy.prototype.update = function(dt){
    if(this.xLoc < 600){
        this.xLoc = this.xLoc + (this.speed * dt)
    } else {
        this.xLoc = -110
    }
};



/* Draw the enemy on the screen. This prototype renders image from its class
* and the location is rendered from the updated xLoc. yLoc. coordinates all this is
* sent to engine.js file which renders it all in canvas on the page.
*/
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.xLoc, this.yLoc);
};


/* In order to understand how the collision detection works, i reffered to the 
* https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection,
* http://blog.sklambert.com/html5-canvas-game-2d-collision-detection/
* document. This algorithm accepts characters location and size(xwidth, yheight) 
* parameters and continuously check it. it checks if there is any space between 
* ememy and player. Once it identifies that there is no space between 2 characters,
* the game ends, player disappears and 2 notices appear on the screen 
* indicating that the game is over, and reset button may be pressed to play the game
*/
Enemy.prototype.checkCollisions = function() {
    if (this.yLoc < player.height + player.yLoc &&
        this.height + this.yLoc > player.yLoc &&
        this.xLoc < player.width + player.xLoc  &&
        this.width + this.xLoc > player.xLoc) {
            var el = document.getElementById('game');
                el.innerHTML = notice;
            var elb = document.getElementById('game1');
                elb.innerHTML = notice3;
        // this.reset();
/* i wanted to use reset(); to stop the game but it kept throwing me error
* Uncaught TypeError: this.reset is not a function.
* but after spending several days over the issue, i desided to move player
* off canvas as far as possible;
*/
            player.xLoc = 10000;
            player.yLoc = 10000;
    }
};

/* this function checks against each enemy in array to see if collision occured */

function checkCollisions() {
        allEnemies.forEach(function(enemyinarray) {
            enemyinarray.checkCollisions();
    });
}

/* 
* This is Player Class that contains within itself reference to the image, 
* its location on the canvas, and dimension of the hit box. parameters come from 
* initialized object
*/
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.xLoc = 200;
    this.yLoc = 400;
    this.width = 60;
    this.height = 45;
};

/* Here we check location of the player in order to assist in rendering in on 
* canvas. as long as yLoc is greater then 10px on the canvas, the player is at
* liberty to move about the canvas with a <h2> 'Good Luck!' </h2> above the canvas.
* Once player crosess the 10px on yLoc he has reached the water tiles and is sent
* back to the starting point of (xLoc = 200; yLoc = 400;) and a 
* <h2> 'HORRAY, You Made it!!' </h2> above canvas. setTimeout function displays
* <h2> 'Good Luck!' </h2> after one second.
*
*/
Player.prototype.update = function() {
    this.xLoc;
    this.yLoc;
    if(this.yLoc < 10){   
        var el1 = document.getElementById('game');
        el1.innerHTML = notice1;
        this.xLoc = 200;
        this.yLoc = 400;
        setTimeout(function(){
            var el2 = document.getElementById('game');
                el2.innerHTML = notice2;
        }, 1000);
    }
};

/* Draw the enemy on the screen. This prototype renders image from its class
* and the location is rendered from the updated xLoc. yLoc. coordinates all this is
* sent to engine.js file which renders it all in canvas on the page.
*/
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.xLoc, this.yLoc);    
};

/* additions and subtraction values on xLoc and yLoc are set in such a way so
* that player would stay inside the canvas and somewhat consistent horisonaly 
* and verticaly on the tiles while traversing. Function accepts 'key' as parameter
* if statement checks to see where the image is located on the canvas and based on
* the (xLog and yLog) returned value and key pressed, the character moves up down 
* left right on the canvas. the key value is assigned in document addeventlistner below  
*/
Player.prototype.handleInput = function(key){
    if (this.xLoc > 0 && key === 'left') { 
        this.xLoc -= 102;                
    } else if (this.xLoc < 395 && key === 'right') {
        this.xLoc += 102;
    } else if (this.yLoc > 0 && key === 'up') {
        this.yLoc -= 82; 
    } else if (this.yLoc < 400 && key === 'down') {
        this.yLoc += 82;
    }
};

/* This function generates random speed for enemies at browser refresh or restart
* It accecepts min and maximum speed range.
*/

function randSpeed(min, max) {
    return Math.random() * (max - min) + min;
};

/* Here all the objects get insantiated and assigned  to a variable. enemies get 
* starting x.y coordinates and speed assigned to them. Enemies have random speed range that  
* they can travel with. Those that have more than one enemy on the path, have same speed range
* assigned to avoid overlaping. All ememies variables are placed in array out of which they
* are rendered to canvas. Player is also assigned a variable and instantiated as new object
*/
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var player     = new Player();
var enemy0     = new Enemy(-400, 60, randSpeed(300, 500));
var enemy1     = new Enemy(0, 60, enemy0.speed);
var enemy2     = new Enemy(100, 227, randSpeed(100, 400));
var enemy3     = new Enemy(200, 310, randSpeed(250, 400));
var enemy4     = new Enemy(-200, 310, enemy3.speed);
var allEnemies = [
    enemy0,
    enemy1,
    enemy2,
    enemy3,
    enemy4
];

// This listens for key presses and sends the keys to layer.prototype.handleInput()
// You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});

