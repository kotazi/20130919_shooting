define(['enchant', 'core'], function(enchant, core) {
  var Bullet = enchant.Class.create(enchant.Sprite, {

    //初期化処理
    initialize: function(x, y, angle) {

      enchant.Sprite.call(this, 8, 8);
      var image = new Surface(32, 32);
      image.draw(core.assets['img/spritesheet.png'], 32, 64, 32, 32, 0, 0, 32, 32);
      this.image = image;
      this.x = x;
      this.y = y;
      this.angle = angle;
      this.speed = 10;
      this.addEventListener('enterframe', function(e) {

        //弾の移動処理
        this.x += this.speed * Math.sin(this.angle);
        this.y += this.speed * Math.cos(this.angle);

        //画面外に出たら消去する
        if (this.y > 320 || this.x > 320 || this.x < -this.width || this.y < -this.height) {
          this.remove();
        }

      }, false);
    },

    //弾を削除するメソッド
    remove: function() {
      core.rootScene.removeChild(this);
      delete this;
    }
  });

  return Bullet;
});