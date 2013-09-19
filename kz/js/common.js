define(['enchant', 'nineleap', 'ui'], function(enchant, nineleap, ui) {

  enchant();

  var core = new Core(320, 320);
  core.fps = 24;
  core.score = 0;
  core.life = 3;
  core.wait = 0;
  core.death = false;
  core.over = false;
  core.preload('img/spritesheet.png', 'img/bg.png', 'img/exp.png');
  return core;
});