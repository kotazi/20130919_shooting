define(['enchant', 'core'], function(enchant, core) {

  var Explosion = enchant.Class.create(enchant.Sprite, {

    //初期化処理
    initialize: function(x, y) {
      enchant.Sprite.call(this, 64, 64);
      this.x = x;
      this.y = y;
      this.frame = 0;
      this.image = core.assets['img/exp.png'];
      this.addEventListener('enterframe', function(e) {
        //爆発エフェクトのアニメーションを表示する
        this.frame = this.tick++;
        if (this.frame = 16) {
          this.remove();
        }
      }, false);
    },

    remove: function() {
      core.rootScene.removeChild(this);
      delete this;
    }
  });

  return Explosion;
});