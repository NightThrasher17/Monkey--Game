// For defining the global variables

var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score

var PLAY = 1;
var END = 0;
var gameState = PLAY;
var fruits = 0;
var survivalTime;


// For Loading Images Animations and Sounds

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}


// For creating objects, groups, etc.

function setup() {
  createCanvas(400, 400);
  
  monkey = createSprite(50, 315, 20, 20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale=0.1;
  
  ground = createSprite(400, 350, 900, 10);
  ground.velocityX=-5;
  
  bananaGroup = createGroup();
  obstacleGroup = createGroup();

               
}


function draw() {
 background("black");
  
  ground.x = ground.width/2;
  monkey.collide(ground);
  
  textSize(17);
  fill('red');
  text('score: ' + fruits,5,20);
  text('Survival Time: ' + survivalTime,190,20);
  
  if (gameState === PLAY){
    
    
    if (keyDown("space") && monkey.y>310){
      monkey.velocityY=-20;
    }
    
    if (bananaGroup.isTouching(monkey)){
        bananaGroup.destroyEach();
        fruits = fruits+1;
      }
    
    
    monkey.velocityY = monkey.velocityY+1;  
    food();
    stone();
    
    
    if (obstacleGroup.isTouching(monkey)){
      obstacleGroup.destroyEach();
      gameState = END;
      
    }
    
    
    survivalTime=Math.round(frameCount/frameRate())
    
    
  }
  
  else if (gameState === END){
    monkey.visible=false;
    bananaGroup.destroyEach();
    
    fill('blue');
    textSize(60);
    text('GAME OVER',10,200);
  }
  
  
  drawSprites();


}

function food(){
  if(World.frameCount%80===0){
    banana = createSprite(400,200,20,20);
    banana.y = Math.round(random(120,200));
    banana.velocityX = -(5 + fruits/4);
    banana.addImage(bananaImage);
    banana.scale=0.08;
    banana.lifetime = 100;
    bananaGroup.add(banana);
  }

}


function stone(){
  if(World.frameCount%300===0){
    obstacle = createSprite(400,315);
    obstacle.velocityX = -(5 + fruits/6);
    obstacle.addImage(obstacleImage);
    obstacle.scale=0.2;
    obstacle.lifetime = 100;
    obstacle.setCollider('circle',-3,0,210);
    obstacleGroup.add(obstacle);
  }

}