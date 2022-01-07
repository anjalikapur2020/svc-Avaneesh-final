var bg
var play,playbg
var gameState="wait"
var trex 
var obstacle
var trex_img
var logo
var zombieRunning
var zombie
var how,howbg
var personDie,personHurt,personJump,personRun
var rand,obstaclesGroup
var obs1_img , obs2_img , obs3_img , obs4_img , obs4_img 
var invisibleground
var score=0
var score1=0
var winbg
var coinscore=0
var chestOpenGif
var life=3

var coin
var coinsgroup
//https://www.freepik.com/free-vector/dinosaurs-cartoon-character-nature-scene_12365469.htm#position=5


function preload(){

//zombieRunning = loadAnimation("new-image/e1.png","new-image/e2.png","new-image/e3.png","new-image/e4.png","new-image/e5.png","new-image/e6.png","new-image/e7.png","new-image/e8.png");
bgimg = loadImage("bg.jpg");
logoimg=loadImage("logo.gif")
playbg=loadImage("playbg.gif")


winbgimg=loadImage("win.jpg")
//personRun =  loadAnimation("boy/r1.png","boy/r2.png","boy/r3.png","boy/r4.png","boy/r5.png","boy/r6.png","boy/r7.png","boy/r8.png","boy/r9.png","boy/r10.png")
personRun = loadAnimation("boy/h1.png","boy/h2.png","boy/h3.png","boy/h4.png","boy/h5.png","boy/h6.png")
personRunleft = loadAnimation("boy/h1l.png","boy/h2l.png","boy/h3l.png","boy/h4l.png","boy/h5l.png","boy/h6l.png")

coinimg=loadAnimation("coin/c1.png","coin/c2.png","coin/c3.png","coin/c4.png","coin/c5.png","coin/c6.png","coin/c7.png","coin/c8.png","coin/c9.png","coin/c10.png",)
butterflyimg=loadAnimation("coin1/c1.png","coin1/c2.png","coin1/c3.png","coin1/c4.png","coin1/c5.png","coin1/c6.png","coin1/c7.png","coin1/c8.png","coin1/c9.png")
//obs1_img = loadImage("obs1.png")
obs2_img = loadImage("firedragon.gif")
obs3_img = loadImage("dragon.gif")
//obs4_img = loadImage("obs4.png")
obs5_img = loadImage("dragon1.gif")

popupimg=loadImage("box2.png")
font=loadFont("fonts/type.ttf")
coinsound=loadSound("win.mp3")
gamesound=loadSound("gamemusic.mp3")
lostsound=loadSound("die.mp3")

}
function setup(){
    
createCanvas(windowWidth-20,windowHeight-20)
    
textFont(font)
logo=createSprite(windowWidth/2,windowHeight/4)
logo.addImage(logoimg)
logo.visible=false
logo.scale=2

  play=createImg("play.png")  
  play.position(logo.x-(logo.width/2),height/2+100)
  play.size(150,150)
  
  
home=createImg("home.png")
home.position(logo.x+(logo.width/2),height/2+100)
home.size(150,150)


  
how=createImg("about.png")
how.position((width/2),height/2+100)
how.size(150,150)

player=createSprite(100,windowHeight-150)
player.addAnimation("running",personRun)
player.addAnimation("runningleft",personRunleft)

player.visible=false
player.scale=1.75
  
/*sound=createImg("sound.png")
sound.position(windowWidth-200,windowHeight-200)
sound.size(100,100)*/

popup1=createSprite(windowWidth/2,windowHeight/2)
popup1.addImage(popupimg)
popup1.scale=1.5
popup1.visible=false





obstaclesGroup = new Group()
coinsgroup = new Group()

invisibleground= createSprite(windowWidth/2,windowHeight-10,windowWidth,20)
//invisibleground.debug=true
invisibleground.visible=false
//player.debug=true
player.setCollider("rectangle",0,0,player.width-35,player.height-25)
}
                            
function draw(){

  player.collide(invisibleground)
  if(gameState==="wait"){
background(bgimg)
popup1.visible=false
logo.visible=true
how.show()
player.visible=false


}

if(play.mousePressed(()=>{
  gameState = "play"
  gamesound.loop()
  
}))


if(how.mousePressed(()=>{
  gameState = "how"
  popup1.visible=true

how.hide()
gamesound.pause()

}))

if(home.mousePressed(()=>{
  gameState = "wait"
  gamesound.pause()

}))

if (gameState==="play"){
  background(playbg)
  popup1.visible=false
  logo.visible=false
  play.hide()
  home.hide()
  how.hide()
  player.visible=true

score1 = score1 + Math.round((getFrameRate()/60))
score= Math.round(score1/4)

if (coinscore >=10 && score >=150){
  background(winbgimg)
  gameState="win"
  
  coinsgroup.destroyEach()
  obstaclesGroup.destroyEach()
  player.visible=false
  gamesound.pause()


}
for(var i  = 0;i<coinsgroup.length;i++){
    if(coinsgroup.get(i).isTouching(player)){ 
        coinsgroup.get(i).destroy()
        coinscore = coinscore +1
        coinsound.play();
      } 
 }


 for(var i  = 0;i<obstaclesGroup.length;i++){
  if(obstaclesGroup.get(i).isTouching(player)){ 
    obstaclesGroup.get(i).destroy()
      life -= 1
lostsound.play();
    } 
}

 

spawnobstacles()
spawnCoins()

if(player.x<=0){
  player.x= windowWidth-100
  player.changeAnimation("runningleft",personRunleft)
}
   

if(player.x>=windowWidth){
  player.x= 10
  player.changeAnimation("running",personRun)
}
   
if(keyDown("space") && player.y>= windowHeight-150 ){
  player.velocityY= -25

}
player.velocityY +=0.8


if(keyDown(LEFT_ARROW)){
  player.x  -=5

player.changeAnimation("runningleft",personRunleft)
}

if(keyDown(RIGHT_ARROW)){
  player.x  +=5
  player.changeAnimation("running",personRun)

}




}



if (gameState==="how"){
 // background(howbg)
 player.visible=false

}

if(life<=0){
  gameState="end"
  gamesound.pause()

}

drawSprites();
if(gameState==="how"){
  fill("green")
  textSize(30)
  stroke("red")
  strokeWeight(4)
  text("Dragons Guard a Treasure",popup1.x-(popup1.width/2.5),50)
  textSize(25)
  fill("red")
  textSize(30)
  stroke("green")
  strokeWeight(4)
  text("\nYou are here to find it!! \n\nUse Arrow Keys to move .\n\n Use SpaceBar to jump.",popup1.x-(popup1.width/2.5),100)
  text("Avoid Dragons or you loose a life!!\n\nCollect as many coins as you can!!\n\n              Go Get RICH !!!!!",popup1.x-(popup1.width/1.8),250)


}
if(gameState==="win"){
  textSize(150)
 
  fill("yellow")
  text("Congratulations.....\n     You WIN!!",50,windowHeight/2)
}
if(gameState==="play"){
  fill("red")
  stroke("green")
  strokeWeight(4)
  textSize(40)
  text("SCORE : " +score,100,100)
  text("COINS : " +coinscore,windowWidth/2-50,100)
  text("LIFE : "+ life, windowWidth-200,100)
}

if(gameState==="end"){
  textSize(200)
  fill("green")
  stroke("blue")
  strokeWeight(5)
  text("GAME OVER !!",100,(windowHeight/2)-50)
  coinsgroup.destroyEach()
  obstaclesGroup.destroyEach()
  player.destroy()
}


if (gameState==="wait")
{
  fill("red")
  stroke("green")
  strokeWeight(4)
  textSize(120)
  text("Mighty Dragons", displayWidth/5.5,displayHeight/2.25)
}} 

/*function vidLoad() {
  if(gameState==="wait"){
  logo.loop();}
  logo.size(windowWidth, windowHeight)
  
}*/

function spawnobstacles(){
if(frameCount %450 === 0){
  obstacle = createSprite(windowWidth,windowHeight-150)
obstacle.velocityX=-2
  rand=Math.round(random(1,3))
  obstacle.setCollider("circle",0,0,60)
  //obstacle.debug=true

  switch(rand){
       
    case 1: obstacle.addImage(obs2_img)
    break;

    case 2: obstacle.addImage(obs3_img)
    obstacle.scale=2

    break;
    
    case 3: obstacle.addImage(obs5_img)
    break;

    default: break

  }
  obstaclesGroup.add(obstacle)

}

}

function spawnCoins(){
  if(frameCount %150 === 0){
    coin = createSprite(windowWidth,windowHeight-150)
    coin.y=Math.round(random(100,windowHeight-100))
  coin.velocityX=-2
    rand=Math.round(random(1,2))
    //coin.scale=0.5
    //coin.debug=true
    coin.setCollider("circle",0,0,40)
    
  
    switch(rand){
      case 1: coin.addAnimation("coin",coinimg)
      coin.scale=1
            break;
      
           
      case 2: coin.addAnimation("butterfly",butterflyimg)
      coin.scale=0.5
           break;
   
      default: break
  
    }
    coinsgroup.add(coin)
  
  }
  
  }