var dog,dogImg,dog2,dog3;
var database,value;
var Food = 20;

function preload(){
dogImg = loadImage("Dog.png");
dog2 = loadImage("happydog.png");
dog3 = loadImage("cry.png");
}
	

function setup() {
  database = firebase.database();
  console.log(database);
  createCanvas(500,500);

  dog=createSprite(250,250,20,20);
  dog.scale = 0.2;
  dog.addImage(dogImg);

  var Food = database.ref('food/value');
   Food.on("value",readStock);
}


function draw() {  
background(46,139,87);

fill("white");
text("remaining Stock : "+Food,220,170);
text("Note : press UP_ARROW to feed the dog ; ",150,50);

if(keyDown(UP_ARROW) && Food>0){
  writeStock(food);
  dog.addImage(dog2);
  dog.scale = 0.2;
  
}

if(frameCount%5000===0 && Food>0){
  fill("black");
  dog.scale=0.5;
  text("bow!! bow!! ..",100,100);
  dog.addImage(dog3);
}

  drawSprites();
  
}


//Function to read values from DB
 function readStock(data){
    food=data.val();
   }
    //Function to write values in DB
 function writeStock(x){
    if(x<=0){ 
      x=0;
     }
     else{
        x=x-1;
       } 
       database.ref('/').update({
          food:x 
        }) }