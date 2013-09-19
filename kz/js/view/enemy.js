define(['enchant', 'core', 'enemiesdata', 'playerdata', 'EnemyBullet'], function(enchant, core, enemies, player, EnemyBullet) {

  var Enemy = enchant.Class.create(enchant.Sprite, {

    initialize: function(x, y, type) {
      enchant.Sprite.call(this, 32, 32);
      this.image = core.assets['img/spritesheet.png'];
      this.x = x;
      this.y = y;
      this.vx = 4;
      this.type = type;
      this.tick = 0;
      this.angle = 0;
      //イベントリスナ
      this.addEventListener('enterframe', function(e) {

        switch (this.type) {

          //パターン0
          case 0:
            this.frame = 15 + core.frame % 3;
            this.y += 3;
            break;

          //パターン1
          case 1:
            this.frame = 22 + core.frame % 3;
            this.y += 5;
            break;

          //パターン2
          case 2:
            this.frame = 25 + core.frame % 4;
            if (this.x < 32 - 64) {
              this.x += this.vx;
            } else if (this.x > 32 + 64) {
              this.x -= this.vx;
            } else {
              this.vx = 0;
              this.y += 8;
            }
            break;
        }

        //画面枠外に出た際の処理
        if (this.y > 280 || this.x > 320 ||this.x < -this.width || this.y < -this.height) {
          this.remove();
        }  else if (this.tick++ % 32 === 0) {
          //画面内にいるのなら[32]フレームごとに、次の弾を発射する
          if (rand(100) < 50) {
            //自機と敵位置からの発射角度を求める

            var sx = player.data.x + player.data.width / 2 - this.x;
            var sy = player.data.y + player.data.height / 2 - this.y;
            var angle = Math.atan(sx / sy);
            var s = new EnemyBullet(this.x + this.width / 2, this.y + this.height / 2, angle);
            core.rootScene.addChild(s);
          }
        }
      }, false);
    },

    //削除用メソッド
    remove: function() {
      core.rootScene.removeChild(this);
      delete enemies[this.id];
      delete this;
    }
  });

  return Enemy;
});