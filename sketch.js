var oceanImg, ocean;
var coinImg, coin, coinGroup;
var climberImg, climber, climbersGroup;
var frog, frogImg;
var gameState = "play"
var score = 0;
var play = 1;
var end = 0;

function preload(){
  oceanImg = loadImage("water.jpg");
  coinImg = loadImage("coin.png");
  climberImg = loadImage("seaweed.png");
  frogImg = loadImage("frog.png");
  
}

function setup(){
  createCanvas(580,450);
  
  ocean = createSprite(300,300);
  ocean.addImage("ocean",oceanImg);
  
  frog = createSprite(200,250,60,60);
  frog.scale = 0.1;
  frog.addImage("frog", frogImg);  
  
  //create coin group and climber group

  coinGroup = new Group();

  climbersGroup = new Group();

  score=0;

  
}

function draw(){
  background(0);
  drawSprites();
  fill ("green");
  textSize(15);
  text("Game Over " + score, 250,30);
 
  
  if (gameState === "play") {

   ocean.setVelocity(0,1);
    

   if (keyDown("space")) {
     
    frog.velocityY =-2;
     
   } else{
     frog.velocityY=2;
   }

   if(keyDown('left')){
     frog.x -=5;

   }

   if(keyDown('right') ){

    frog.x +=5;
    

   }
    

   spawnCoin();

   if(frog.isTouching(climbersGroup)){
     frog.velocityX=0;
     frog.velocityY=0;
   }

   if(frog.isTouching(coinGroup)){
     score = score + 1;
     coinGroup.destroyEach();
   }
   if(frog.y> 400){
    gameState = 'end';
  } 

  }

 


   if(gameState === 'end'){
     ocean.setVelocity(0,0);

     fill("red");
     textSize(38);
     text("Game Over " ,200,200);
     
     climbersGroup.destroyEach();
     coinGroup.destroyEach();
     frog.setVelocity(0,0);
   }
    if(ocean.y>300){
      ocean.y=150;
     
   }
   
    
  }  

// create the coin and climber in the same function
function spawnCoin() {
  
  if (frameCount % 280 === 0) {
    coin = createSprite(Math.round(random(50,400)),50,70,80);
    //make the x position of the coin and climber the same
    coin.addImage("coin",coinImg);
    coin.setVelocity(0,2);
    coin.scale = 0.1;
    coin.lifetime =250;
    
    coinGroup.add(coin);

    climber = createSprite(coin.x,80,70,80);
    climber.addImage("climber",climberImg);
    climber.setVelocity(0,2);
    climber.scale = 0.5;
    climber.lifetime=250;

    climbersGroup.add(climber);
  }
}

