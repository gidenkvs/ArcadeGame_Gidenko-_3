var notice  = "GAME OVER";
var notice1 = 'HORRAY, You Made it!!';
var notice2 = 'Good Luck!';
var notice3 = "Press Restart to Play Again";

/* 
* This is an Enemy Class that contains within itself reference to the image, 
* its location on the canvas, speed and dimension. parameters come from 
* initialized object
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
* current location to speed * 
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
* https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
* document. This algorithm accepts characters location and size(xwidth, yheight) 
* parameters and continuously check it. it checks if there is any space between 
* ememy and player. Once it identifies that there is no space between 2 characters,
* the game stops and 2 notices appear on the screen indicating that the game is over,
* and reset button may be pressed to replay the game
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
        player.reset();
    }
};


var Notification = function (notice) {
      var ctx = document.getElementById('canvas').getContext('2d');
           ctx.font = "48px serif";
           ctx.fillText('Hello World!', 150, 100);
};

//Notification();

var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.xLoc = 200;
    this.yLoc = 400;
    this.width = 0;
    this.height = 0;
};


Player.prototype.update = function(dt) {
    this.xLoc*dt;
    this.yLoc*dt;
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
* and verticaly on the while traversing. Function accepts key as parameter
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

/* 

 



*/
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
function randSpeed(min, max) {
    return Math.random() * (max - min) + min;
};

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

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});

