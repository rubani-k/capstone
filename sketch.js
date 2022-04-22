var PLAY = 1;
var END = 0;
var gameState = PLAY;

var runner, runnerImg;
var crab, crabImg, crabGroup;
var treasure, treasureImg, treasureGroup;
var seagul, seagulImg, seagulGroup;
var background1, background1Img;
var invisibleGround;

var score;
var restart, gameOverImg;
//var lives = 3;



function preload(){
runnerImg = loadImage("runner.png");
crabImg = loadImage("crab.png");
treasureImg = loadImage("treasure.png");
seagulImg = loadImage("seagul.png");
background1Img = loadImage("background.png")
gameOverImg = loadImage("gameover.png")
}

function setup() {
 createCanvas(1000, 600);
 background(120);
 fill("black");

 

 background1 = createSprite(50,50,1000,600);
 background1.addImage(background1Img);
 background1.scale = 3;
 
 background1.velocityX = -10;

 runner = createSprite(70,160,20,50);
 runner.addImage(runnerImg);
 runner.scale = 0.4;



 restart = createSprite(500,250);
 restart.addImage(gameOverImg);
 restart.scale = 0.5;

 seagulGroup = createGroup();
 treasureGroup = createGroup();
 crabGroup = createGroup();

 invisibleGround = createSprite(200,590,1500,20);
 invisibleGround.visible = false;

 score = 0;
 

 
}
function draw() {
   
    background("grey");
  
          runner.velocityY = runner.velocityY + 1;


    if(gameState === PLAY)
    {  
      restart.visible = false;
      
      if(background1.x < 100 )
          background1.x = background1.width/2;
      
      

      if(keyDown("space") && runner.y >= 100)
      {
          runner.velocityY = -10;
      }

       
       
       spawnTreasure();
       spawnSeaguls();
       spawnCrabs();

       if(treasureGroup.isTouching(runner))
       {
           score = score + 1;
           treasureGroup.destroyEach();
        
       }

       if(seagulGroup.isTouching(runner) || crabGroup.isTouching(runner))
       {
           console.log("Before"+ gameState);
           gameState = END;
           console.log("after"+gameState);

       }

       /*if(runner.isTouching(crabGroup))
       {
           gameState = END;
       }*/

       else if(gameState === END)
       {
           console.log(restart);
           
           restart.visible = true;

           if(mousePressedOver(restart))
           {
               reset();
           }
       
           

           background1.velocityX = 0;
           runner.velocityY= 0;

           treasureGroup.setLifetimeEach(-1);
           seagulGroup.setLifetimeEach(-1);
           crabGroup.setLifetimeEach(-1);

           treasureGroup.setVelocityXEach(0);
           seagulGroup.setVelocityXEach(0);
           crabGroup.setVelocityXEach(0);

           runner.destroy();
           //lives = lives - 1;

       }
       /*if(mousePressedOver(restart))
       {    gameState === PLAY;
            score = 0;
            restart.visible = false;
            treasureGroup.destroyEach();
            seagulGroup.destroyEach();
            crabGroup.destroyEach();
            background1.velocityX = -10;
            lives = lives - 1;*/
      

       
       

    

    }
    runner.collide(invisibleGround);
    

 drawSprites();
 
    textSize(20);
    text("Score: "+ score,775,50);
    //text("Lives:"+ lives, 900,50);
    

}
function replay()
{
    gameState === PLAY;
    score = 0;
    treasureGroup.destroyEach();
    seagulGroup.destroyEach();
    crabGroup.destroyEach();
    background1.velocityX = -10;
    lives = lives - 1;
}

/*function reset(){
    gameState = PLAY;
    restart.visible = false;
    crabGroup.destroyEach();
    seagulGroup.destroyEach();
    treasureGroup.destroyEach();
    score = 0;
  
  }*/

function spawnTreasure()
{
    if(frameCount % 225 === 0)
    {
        var treasure = createSprite(20,520,40,10);
        treasure.y = Math.round(random(300,450));
        treasure.x = Math.round(random(500,900))
        treasure.addImage(treasureImg);
        treasure.scale = 0.3;
        treasure.velocityX = -5;

        treasure.lifetime = 300;

        treasure.depth = runner.depth - 1;

        treasureGroup.add(treasure);


    }
}

function spawnSeaguls()
{
    if(frameCount % 110 === 0)
    {
        var seagul = createSprite(20,500,30,10);
        seagul.y = Math.round(random(50,200));
        seagul.x = Math.round(random(500,900));
        seagul.addImage(seagulImg);
        seagul.scale = 0.1;
        seagul.velocityX = -7;

        seagul.lifetime = 300;

        seagul.depth = runner.depth - 1 ;

        seagulGroup.add(seagul);
    }
}

function spawnCrabs()
{
    if(frameCount % 350 === 0)
    {
        var crab = createSprite(20,500,20,20);
        crab.y = Math.round(random(400,550));
        crab.x = Math.round(random(500,900));
        crab.addImage(crabImg);
        crab.scale = 0.2;
        crab.velocityX = -10;

        crab.lifetime = 300;

        crab.depth = runner.depth - 1;

        crabGroup.add(crab);
    }

}




