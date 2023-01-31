var tower
var gameState = "play"
var score = 0
var count = 3



function preload(){
tower = loadImage("background.jpg")
wallsImg = loadImage("wall.png")
wall2Img = loadImage("wall2.png")
ninjaImg = loadImage("ninja.png")
obstacleImg = loadImage("star.png")
obstacleImg2 = loadImage("obstacle1.png")
}

function setup(){
createCanvas(850,700)
towerbkroung = createSprite(-250,400)
towerbkroung.addImage(tower)
towerbkroung.scale = 2
towerbkroung.velocityY = 1

//scoreSprite = createSprite(200,200,50,20)

wall = createSprite(25,250,50,900)
wall.shapeColor = "green"


wall2 = createSprite(690,300,50,800)
wall2.shapeColor = "green"

ninja = createSprite(625,350,50,50)
ninja.shapeColor = "green"
ninja.addImage(ninjaImg)
ninja.scale = 0.15 

stoolGroup = new Group()
obstacleGroup = new Group()



}

function steppingStool(){
  if(frameCount % 250 == 0){
    stool  = createSprite(random(70,650),20,70,10)
    stool.velocityY = 1
    stool.shapeColor = "red"
    stoolGroup.add(stool)
  }
}




function draw(){
  background(rgb(144,186,210))
  if(gameState === "play"){
  if(towerbkroung.y > 400){
    towerbkroung.y = 200
  }
   textSize(30)
   text("Score: "+ score, 730,50)
   text("Lives: "+ count,730,90)

  if(keyDown("space")){
    ninja.velocityY = -10
  }

  ninja.velocityY = ninja.velocityY + 0.7

  if(keyDown(LEFT_ARROW)&& ninja.x > 75){
    ninja.x = ninja.x -10
  }

  if(keyDown(RIGHT_ARROW)&& ninja.x <600){
    ninja.x = ninja.x +10
  }

  if(ninja.isTouching(obstacleGroup)){
   obstacleGroup.destroyEach()
   count = count - 1


  }
  console.log(count)


  //wall.velocityY = 1
  //wall2.velocityY = 1
  //ninja.velocityY =1

  if(ninja.isTouching(stoolGroup)){
      ninja.velocityY = 0
  }

  if(ninja.y > 600 || count <= 0){
    gameState = "end"
  }
  
spawnObstacles()
steppingStool()
 drawSprites()
}
else if(gameState === "end"){
  gameOver()
}
}

function gameOver() {
  tower.velocityY = 0 
  ninja.destroy()
  stoolGroup.setVelocityYEach(0)
  textSize(100)
  text("GAME OVER",200,350)
}

function spawnObstacles(){
  if(frameCount % 220 === 0){
    obstacle = createSprite(random(100,600),0,20,20)
    //obstacle.shapeColor = "black"
    obstacle.velocityY = 1
   /* var randomNumber = Math.round(random(1,2))
     
     console.log(randomNumber)
    if(randomNumber === 1){
      obstacle.addImage(obstacleImg)
    } else{
      obstacle.addImage(obstacleImg2)
    }*/
    obstacle.scale = 0.2
    obstacle.addImage(obstacleImg)

    obstacleGroup.add(obstacle);
  }
   
  
} 



