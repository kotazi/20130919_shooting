//設定
requirejs.config({

  shim: {

    enchant: {
      exports: 'enchant'
    },

    nineleap: {
      deps: ['enchant']
    },

    ui: {
      deps: ['enchant']
    }

  },

  paths: {
    enchant: './../lib/enchantjs/enchant',
    nineleap: './../lib/enchantjs/nineleap.enchant',
    ui: './../lib/enchantjs/ui.enchant',
    core: './common',
    Player: './view/player',
    Enemy: './view/enemy',
    BackGround: './view/background',
    Bullet: './view/bullet',
    PlayerBullet: './view/playerbullet',
    EnemyBullet: './view/enemybullet',
    enemiesdata: './model/enemiesdata',
    playerdata: './model/playerdata',
    Explosion: './view/explosion'
  }

});


//実行関数
require([
  'core',
  'Player',
  'Enemy',
  'BackGround',
  'enemiesdata',
  'playerdata',
  'Explosion'
], function(core, Player, Enemy, BackGround, enemies, playerdata) {

  core.addEventListener('load', function(e) {

    //背景を生成する
    var backGround = new BackGround();
    core.rootScene.addChild(backGround);

    //自機を生成する
    var player = new Player(144, 138);
    core.playerdata = player;
    core.rootScene.addChild(player);

    //スコアラベルの生成
    var scoreLabel = new ScoreLabel(5, 0);
    scoreLabel.score = 0;
    scoreLabel.easing = 0;
    core.rootScene.addChild(scoreLabel);

    //ライフラベルの生成
    var lifeLabel = new LifeLabel(180, 0, 3);
    core.rootScene.addChild(lifeLabel);

    //キーパッド生成
//    var apad = new APad();
//    apad.x = 220;
//    apad.y = 220;
//    core.rootScene.addChild(apad);
//    core.apad = apad;

    core.rootScene.addEventListener('enterframe', function(e) {

      //敵の生成
      if (rand(100) < 5) {
        var enemy = new Enemy(rand(320), 0, rand(3));
        enemy.id = core.frame;
        enemies[enemy.id] = enemy;
        core.rootScene.addChild(enemy);
      }

      playerdata.data = player;
      scoreLabel.score = core.score;
      lifeLabel.life = core.life;

      //ゲームオーバの処理
      if (core.over) {
        core.end();
      }

      //自機が死んだ時の処理
      if (core.death) {
        core.wait++;
        player.visible = player.visible ? false : true;

        //5秒点滅
        if (core.wait == core.fps * 5) {
          core.death = false;
          player.visible = true;
          core.wait = 0;
        }
      }


    }, false);


  }, false);

  core.start();
});
