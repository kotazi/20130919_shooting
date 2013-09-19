define(['enchant', 'core', 'Bullet', 'playerdata', 'Explosion'], function(enchant, core, Bullet, player, Explosion) {


  var Enemy = enchant.Class.create(Bullet, {

    //初期化処理
    initialize: function(x, y, angle) {
      Bullet.call(this, x, y, angle);
      this.speed = 4;
      this.frame = 7;
      this.addEventListener('enterframe', function(e) {

        //自機との当たり判定
        if (core.playerdata.within(this, 8) && core.death === false) {
          var effect = new Explosion(player.data.x - player.data.width / 2, player.data.y - player.data.height / 2);
          core.rootScene.addChild(effect);
          core.death = true;
          player.visible = false;
          core.life--;
          if (core.life <= 0) {
            core.over = true;
          }
        }
      }, false);
    }
  });

  return Enemy;
});