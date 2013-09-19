define(['enchant', 'core', 'PlayerBullet'], function(enchant, core, PlayerBullet) {

  //自機のスプライトを作成するクラス
  var Player = enchant.Class.create(enchant.Sprite, {
    //初期化処理
    initialize: function(x, y) {
      enchant.Sprite.call(this, 32, 32);
      //サーフィスを作成
      var image = new Surface(128, 32);
      image.draw(core.assets['img/spritesheet.png'], 0, 0, 128, 32, 0, 0, 128, 32);
      this.image = image;
      this.frame = 0;
      this.x = x;
      this.y = y;
      this.addEventListener('enterframe', function(e) {

        /**
         * 自機移動処理
         */

        //左へ進む処理
        if (core.input.left && this.x >= 0) {
          this.x -= 8;
          this.frame = 0;
        }

        //右へ進む処理
        if (core.input.right && this.x <= core.width - 32) {
          this.x += 8;
          this.frame = 0;
        }

        //上へ進む処理
        if (core.input.up && this.y >= 0) {
          this.y -= 8;
          this.frame = 1;
        }

        //右へ進む処理
        if (core.input.down && this.y <= core.height - 32) {
          this.y += 8;
          this.frame = 2;
        }

//        if (core.apad.vy < 0) {this.frame = 1;}
//        if (core.apad.vy > 0) {this.frame = 2;}
//        if (core.apad.vy === 0) {this.frame = 0;}
//        this.x = core.apad.vx * 160 + x;
//        this.y = core.apad.vy * 160 + y;

        //8フレームごとに弾を発射する
        if (core.frame % 8 == 0) {
          var s = new PlayerBullet(this.x + 12, this.y - 8);
          core.rootScene.addChild(s);
        }

      }, false);
    }
  });

  return Player;
});