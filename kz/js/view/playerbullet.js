define(['enchant', 'core', 'Bullet', 'enemiesdata', 'Explosion'], function(enchant, core, Bullet, enemies, Explosion) {

  var PlayerBullet = enchant.Class.create(Bullet, {

    //初期化処理
    initialize: function(x, y) {

      Bullet.call(this, x, y, Math.PI);
      this.frame = 10;
      this.addEventListener('enterframe', function(e) {

        //敵との当たり判定
        for (var i in enemies) {

          if (enemies[i].intersect(this)) {
            var effect = new Explosion(enemies[i].x - enemies[i].width / 2, enemies[i].y - enemies[i].height / 2);
            core.rootScene.addChild(effect);
            enemies[i].remove();
            core.score += 100;
          }

        }
      }, false);
    }
  });

  return PlayerBullet;

});