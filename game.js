$(function () {
var canv = document.getElementById("myCanvas"),
    ctx = canv.getContext('2d'),
    gameLoop;
    var game = {
        canvWidth: $("#myCanvas").width(),
        canvHeight: $("#myCanvas").height(),
        canvColor: '#6BAA81',
        foodColor: '#C5EFD4',
        foodSize: 10,
        score: 0,
        framesps: 7,
            snake: {
                snake: [],
                x: null,
                y: null,
                size: 10,
                leng: 5,
                direction: 'right',
                color: '#6BAA81',
                stroke: '#C5EFD4'
            },
            food: {
                x: null,
                y: null
            }
    };


    class Changelog {
    constructor(array, version) {try{if(array instanceof Array){this.log = array;}else{throw 1;}if(version instanceof Number){this.version = version;}else{throw 2;}}catch(e){{}if(e==1){console.log("Error: TypeError Changelog(param1, param2) param1 is not of type Array.")}if(e==2){console.log("Error: TypeError Changelog(param1, param2) param2 is not of type Number.");}}}get vers(){return this.version;}set vers(val){this.version=val;return parseFloat(this.version.toFixed(1));}push(...val) {for(var i=0;i<val.length;i++){var num=this.log.length+1;this.version+=0.1;this.log.push("\nversion "+parseFloat(this.version.toFixed(1))+" :\n"+num+". "+val[i]+"\n");}}
    display() {var data=new String("Changelog :\n");for(var i=0;i<this.log.length;i++){data+=this.log[i];}return data;}}
var changelog = new Changelog(new Array(), new Number(1.6));
changelog.push("Added Arrowkey support!",
       "Removed on Screen buttons!",
       "Added my Changelog Class!");
alert(changelog.display());


$(document).on("keyup", function (e){
    switch(e.keyCode || e.which) {
        case 37:
            if(game.snake.direction != "right"){
                game.snake.direction="left";
            }
            break;
        case 38:
                if(game.snake.direction != "down"){
                      game.snake.direction="up";
                }
            break;
        case 39:
                if(game.snake.direction != "left"){
                    game.snake.direction="right";
                }
            break;
        case 40:
                if(game.snake.direction != "up"){
                    game.snake.direction="down";
                }
            break;
        default:
            return;
    }
});


(function drawModule() {
    var bodySnake=function(x, y) {
        ctx.fillStyle = game.snake.color;
        ctx.fillRect(x*game.snake.size, y*game.snake.size, game.snake.size, game.snake.size);
        ctx.strokeStyle = game.snake.stroke;
        ctx.strokeRect(x*game.snake.size, y*game.snake.size, game.snake.size, game.snake.size);
    }

var drawSnake = function() {
    for(var i=game.snake.leng;i>0;i--) {
        game.snake.snake.push({x:i, y:0});
    }
}

var createFood = function(){
  let create = (() => {
    game.food.x = Math.round(Math.random()*(game.canvWidth-game.snake.size)/game.snake.size);
    game.food.y = Math.round(Math.random()*(game.canvHeight-game.snake.size)/game.snake.size);
    for(let i=game.snake.leng;i>1;i--){
      if(game.food.x==game.snake.x&&game.food.y==game.snake.y) {
        this.create(); console.log("Changed!");
      }
    }
  })();
  }


var paint = function() {
   ctx.fillStyle = game.canvColor;
   ctx.fillRect(0, 0, game.canvWidth, game.canvHeight);

   game.snake.x=game.snake.snake[0].x;
   game.snake.y=game.snake.snake[0].y;
   switch(game.snake.direction) {
       case 'left':
           game.snake.x--;
           break;
       case 'right':
           game.snake.x++;
           break;
       case 'up':
           game.snake.y--;
           break;
       case 'down':
           game.snake.y++;
           break;
   }

   switch(game.snake.x){
       case -1:
           game.snake.x=game.canvWidth/game.snake.size;
           break;
       case game.canvWidth/game.snake.size:
           game.snake.x=0;
           break;
   } switch(game.snake.y){
       case -1:
           game.snake.y=game.canvHeight/game.snake.size;
           break;
       case game.canvHeight/game.snake.size:
           game.snake.y=0;
           break;
   }


    if(game.snake.x == game.food.x && game.snake.y == game.food.y) {
       var tail={x:game.snake.x, y:game.snake.y};
       game.score++;
       createFood();
   } else {

       var tail=game.snake.snake.pop();
       tail.x=game.snake.x;
       tail.y=game.snake.y;
   }


       game.snake.snake.unshift(tail);

   for(var i = 0; i < game.snake.snake.length; i++){
       bodySnake(game.snake.snake[i].x, game.snake.snake[i].y);
   }

   for(var i = 1; i < game.snake.snake.length; i++) {
       if(game.snake.x == game.snake.snake[i].x && game.snake.y == game.snake.snake[i].y) {
           endGame();
       }
   }

   switch(game.score){
       case 5:
          game.framesps = 8;
          adjustSpeed(game.framesps);
           break;
       case 15:
          game.framesps = 9;
          adjustSpeed(game.framesps);
           break;
       case 25:
          game.framesps = 10;
          adjustSpeed(game.framesps);
           break;
       case 40:
          game.framesps = 12;
          adjustSpeed(game.framesps);
           break;
   }

   ctx.fillStyle = game.foodColor;
   ctx.fillRect(game.food.x*game.foodSize, game.food.y*game.foodSize, game.foodSize, game.foodSize);

   ctx.font = "13px Comic Sans MS";
   ctx.fillStyle = 'white';
   ctx.fillText("Score : " + game.score, 5 , 15);

}


var init = function() {
    createFood(); drawSnake();
    gameLoop=setInterval(paint, 1000/game.framesps);
}

var adjustSpeed = function(fps) {
    clearInterval(gameLoop);
        gameLoop = setInterval(paint, 1000/fps)
}

var endGame = function() {
    clearInterval(gameLoop);
    alert("Game Over\nScore: "+game.score);
    game.framesps=7;
    game.score=0;
    game.snake.snake[0].x=0;
    game.snake.snake[0].y=0;
    game.snake.snake=[];
    game.snake.direction='right';
    init();
}



return { init: init() };
})();
});
