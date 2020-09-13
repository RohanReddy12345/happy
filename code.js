var p5Inst = new p5(null, 'sketch');

window.preload = function () {
  initMobileControls(p5Inst);

  p5Inst._predefinedSpriteAnimations = {};
  p5Inst._pauseSpriteAnimationsByDefault = false;
  var animationListJSON = {"orderedKeys":["a6870703-0124-47f7-acff-dbe905f5014c","5ce44e39-12ac-4a66-88cf-a87a0ed6a180","33841f90-7a53-4346-b956-e51d1961959b","4720dc1f-4083-40a2-b96f-cdb72adc7ffc"],"propsByKey":{"a6870703-0124-47f7-acff-dbe905f5014c":{"name":"monkey","sourceUrl":null,"frameSize":{"x":560,"y":614},"frameCount":10,"looping":true,"frameDelay":12,"version":"S7QDiYB_ANyp8xfSx0GjYbXq0.36_sw6","loadedFromSource":true,"saved":true,"sourceSize":{"x":1680,"y":1842},"rootRelativePath":"assets/a6870703-0124-47f7-acff-dbe905f5014c.png"},"5ce44e39-12ac-4a66-88cf-a87a0ed6a180":{"name":"Banana","sourceUrl":"assets/v3/animations/0Pmc2UypwJxUUUBBxMOOYmiSvh97BJLRo_BQZbjyEto/5ce44e39-12ac-4a66-88cf-a87a0ed6a180.png","frameSize":{"x":1080,"y":1080},"frameCount":1,"looping":true,"frameDelay":4,"version":"kVpKkXq53W3pSJumPZcHJWQHT_MioNLd","loadedFromSource":true,"saved":true,"sourceSize":{"x":1080,"y":1080},"rootRelativePath":"assets/v3/animations/0Pmc2UypwJxUUUBBxMOOYmiSvh97BJLRo_BQZbjyEto/5ce44e39-12ac-4a66-88cf-a87a0ed6a180.png"},"33841f90-7a53-4346-b956-e51d1961959b":{"name":"Stone","sourceUrl":"assets/v3/animations/0Pmc2UypwJxUUUBBxMOOYmiSvh97BJLRo_BQZbjyEto/33841f90-7a53-4346-b956-e51d1961959b.png","frameSize":{"x":512,"y":512},"frameCount":1,"looping":true,"frameDelay":4,"version":"d0VyOwnTOJ68Tjiz6dqsn2EiPSNyCCQK","loadedFromSource":true,"saved":true,"sourceSize":{"x":512,"y":512},"rootRelativePath":"assets/v3/animations/0Pmc2UypwJxUUUBBxMOOYmiSvh97BJLRo_BQZbjyEto/33841f90-7a53-4346-b956-e51d1961959b.png"},"4720dc1f-4083-40a2-b96f-cdb72adc7ffc":{"name":"pine_trees_1","sourceUrl":"assets/api/v1/animation-library/gamelab/z8Dgk.em0WaIbb.0CaPSgLIoJa8HoEZe/category_backgrounds/pine_trees.png","frameSize":{"x":400,"y":400},"frameCount":1,"looping":true,"frameDelay":2,"version":"z8Dgk.em0WaIbb.0CaPSgLIoJa8HoEZe","loadedFromSource":true,"saved":true,"sourceSize":{"x":400,"y":400},"rootRelativePath":"assets/api/v1/animation-library/gamelab/z8Dgk.em0WaIbb.0CaPSgLIoJa8HoEZe/category_backgrounds/pine_trees.png"}}};
  var orderedKeys = animationListJSON.orderedKeys;
  var allAnimationsSingleFrame = false;
  orderedKeys.forEach(function (key) {
    var props = animationListJSON.propsByKey[key];
    var frameCount = allAnimationsSingleFrame ? 1 : props.frameCount;
    var image = loadImage(props.rootRelativePath, function () {
      var spriteSheet = loadSpriteSheet(
          image,
          props.frameSize.x,
          props.frameSize.y,
          frameCount
      );
      p5Inst._predefinedSpriteAnimations[props.name] = loadAnimation(spriteSheet);
      p5Inst._predefinedSpriteAnimations[props.name].looping = props.looping;
      p5Inst._predefinedSpriteAnimations[props.name].frameDelay = props.frameDelay;
    });
  });

  function wrappedExportedCode(stage) {
    if (stage === 'preload') {
      if (setup !== window.setup) {
        window.setup = setup;
      } else {
        return;
      }
    }
// -----

var play = 1;
var end = 0;
var gameState = play;
var monkey = createSprite(35, 360);
monkey.setAnimation("monkey");
monkey.scale = .1;
monkey.setCollider("circle");
monkey.depth = 5;

var ground = createSprite(200, 393, 800, 10);
ground.visible = false;
var background = createSprite(200, 200);
background.setAnimation("pine_trees_1");
background.depth = 1;


var obstacles = createGroup();
var bananas = createGroup();


var count = 0;
function draw() {
  monkey.collide(ground);
  if (gameState===play) {
    ground.velocityX = -6;
    if (ground.x < 0){
      ground.x = ground.width/4;
    }
    if (keyDown("space")) {
      monkey.velocityY = -10;
    }
    monkey.velocityY = monkey.velocityY + .6;
  }
  if (obstacles.isTouching(monkey)) {
     monkey.scale = monkey.scale-.001;
     playSound("assets/category_alerts/cartoon_negative_bling.mp3", false);
  }
  if (bananas.isTouching(monkey)) {
    monkey.scale = monkey.scale+.001;
  }
  rocks();
  banana();
  
  drawSprites();
  
}
function rocks() {
  if (World.frameCount%60===0) {
    var rock = createSprite(410, 370);
    rock.setAnimation("Stone");
    rock.velocityX = -6;
    rock.lifetime = 100;
    rock.scale = .1;
    rock.setCollider("circle");
    obstacles.add(rock);
  }
}
function banana() {
  if (World.frameCount%50===0) {
    var banana = createSprite(200, 200);
    banana.setAnimation("Banana");
    banana.velocityX = -6;
    banana.lifetime = 100;
    banana.scale = .05;
    banana.setCollider("rectangle");
    banana.lifetime = 100;
    banana.y = randomNumber(350, 370);
    bananas.add(banana);
  }
}




  

// -----
    try { window.draw = draw; } catch (e) {}
    switch (stage) {
      case 'preload':
        if (preload !== window.preload) { preload(); }
        break;
      case 'setup':
        if (setup !== window.setup) { setup(); }
        break;
    }
  }
  window.wrappedExportedCode = wrappedExportedCode;
  wrappedExportedCode('preload');
};

window.setup = function () {
  window.wrappedExportedCode('setup');
};
