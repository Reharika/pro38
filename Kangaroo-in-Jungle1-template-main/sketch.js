/*--------------------------------------------------------*/
var PLAY = 1;
var END = 0;
var WIN = 2;
var gameState = PLAY;

var trex, trex_running, trex_collided;
var jungle, invisiblejungle;

var obstaclesGroup, obstacle1;

var score=0;

var gameOver, restart;

function preload(){
  kangaroo_running =   loadAnimation("assets/kangaroo1.png","assets/kangaroo2.png","assets/kangaroo3.png");
  kangaroo_collided = loadAnimation("assets/kangaroo1.png");
  jungleImage = loadImage("assets/bg.png");
  shrub1 = loadImage("assets/shrub1.png");
  shrub2 = loadImage("assets/shrub2.png");
  shrub3 = loadImage("assets/shrub3.png");
  obstacle1 = loadImage("assets/stone.png");
  gameOverImg = loadImage("assets/gameOver.png");
  restartImg = loadImage("assets/restart.png");
  jumpSound = loadSound("assets/jump.wav");
  collidedSound = loadSound("assets/collided.wav");
}

function setup() {
  createCanvas(800, 400);

  jungle = createSprite(400,100,400,20);
  jungle.addImage("jungle",jungleImage);
  jungle.scale=0.3
  jungle.x = width /2;

  shrubsGroup = new Group();
  obstaclesGroup = new Group();

  kangaroo= createSprite(400,250,400,20);
  kangaroo.addAnimation("running",kangaroo_running)
  kangaroo.addAnimation("collided",kangaroo_collided)
  kangaroo.scale = 0.15;
  kangaroo.debug= true;
  kangaroo.setCollider("circle",0,0,300);
  

  invisibleGround = createSprite(200,340,400,10);
 invisibleGround.visible = false;


 

  score = 0;

}

function draw() {
  background(255);

  kangaroo.x=camera.position.x-270;
 if(gameState=== PLAY){
  if(keyDown("space") && kangaroo.y >= 270) {
    kangaroo.velocityY = -20;

  }

  kangaroo.velocityY = kangaroo.velocityY + 0.8
if(obstaclesGroup.isTouching(kangaroo)){
  gameState=END;
console.log("stone");
}
if(shrubsGroup.isTouching(kangaroo)){
  score=score+1;
 shrubsGroup.destroyEach();

}

  spawnShrubs();
  spawnStones();
 }
 
 kangaroo.collide(invisibleGround);

 

  drawSprites();
  if(gameState===END){
    textSize(60);
    text("GAME OVER",400,200)
  }
  text("Score: "+ score, 500,50);
}
function spawnShrubs() {
  if(frameCount % 120 === 0) {
    var obstacle = createSprite(camera.position.x+500,330,40,10);
    //obstacle.debug = true;
    obstacle.velocityX = -6;
    
    //generate random obstacles
    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: obstacle.addImage(shrub1);
              break;
      case 2: obstacle.addImage(shrub2);
              break;
      case 3: obstacle.addImage(shrub3);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.08;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    shrubsGroup.add(obstacle);
  }
  
  
}
function spawnStones() {
  //write code here to spawn the clouds

  if (frameCount % 200 === 0) {
    var stone = createSprite(camera.position.x+500,330,40,10);
    stone.addImage(obstacle1);
    stone.scale = 0.10;
    stone.velocityX = -2;
    
     //assign lifetime to the variable
    stone.lifetime = 400;

    //add each cloud to the group
    obstaclesGroup.add(stone);
  }
  
}