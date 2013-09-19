define(['enchant', 'core'], function(enchant, core) {

  //背景のスプライト作成するクラス
  var BackGround = enchant.Class.create(enchant.Sprite, {

    //初期化処理
    initialize: function() {
      enchant.Sprite.call(this, 320, 640);
      this.x = 0;
      this.y = -320;
      this.frame = 0;
      this.image = core.assets['img/bg.png'];
      this.addEventListener('enterframe', function(e) {

        //背景をy軸方向へスクロール
        this.y++;
        if (this.y >= 0) {
          this.y = -320;
        }
      }, false);
    }
  });
  return BackGround;
});
