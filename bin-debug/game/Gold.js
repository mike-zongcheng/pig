var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Gold = (function (_super) {
    __extends(Gold, _super);
    function Gold(game) {
        var _this = _super.call(this) || this;
        _this.game = game;
        _this.x = 0;
        _this.y = 0;
        return _this;
    }
    Gold.prototype.init = function (status) {
        var _this = this;
        if (status === void 0) { status = false; }
        clearTimeout(this.goidTime);
        if (this.game.resetStatus)
            return;
        var logoStatus = status;
        this.goidTime = setInterval(function () {
            _this.random = Math.random();
            if (_this.random < config.probabilityLogo && !logoStatus) {
                _this.goldMain();
                _this.goidTime2 = setTimeout(function () {
                    _this.init();
                }, 80);
                return;
            }
            _this.goldMain();
        }, 160);
    };
    Gold.prototype.setGoid = function () {
        var goid = new egret.Bitmap(RES.getRes("coin")), tailChildren = this.game.ground.$children[this.game.ground.$children.length - 1], distance = tailChildren.width + tailChildren.x - config.width; // 最后一根柱子离屏幕右边的距离
        if (distance < 0) {
            return false;
        }
        goid.x = config.width;
        goid.y = tailChildren.y - goid.height - 30;
        return goid;
    };
    Gold.prototype.setLogoGoid = function () {
        var goid = new egret.DisplayObjectContainer(), tailChildren = this.game.ground.$children[this.game.ground.$children.length - 1], distance = tailChildren.width + tailChildren.x - config.width; // 最后一根柱子离屏幕右边的距离
        if (distance < 0) {
            return false;
        }
        goid.width = goid.height = 120;
        goid.x = config.width;
        goid.y = tailChildren.y - goid.height - 30;
        var bg = new egret.Bitmap(RES.getRes("goidLogo"));
        bg.width = bg.height = 120;
        bg.x = bg.y = 0;
        var logo = new egret.Bitmap(this.game.logo);
        logo.width = logo.height = 96;
        logo.x = logo.y = 12;
        goid.addChild(bg);
        goid.addChild(logo);
        return goid;
    };
    Gold.prototype.goldMain = function () {
        var _this = this;
        var goid = (this.random < config.probabilityLogo ? this.setLogoGoid() : this.setGoid());
        if (!goid) {
            return;
        }
        var pig = this.game.pig, goidBottomLine = goid.y + goid.height;
        this.addChild(goid);
        var tw = egret.Tween.get(goid, {
            loop: false,
            onChange: function () {
                var goidRightLine = goid.x + goid.width, pigBottomLine = pig.y + pig.height, xComparing = (goid.x < _this.game.pig.rightLine && goid.x > pig.x) || (goidRightLine < _this.game.pig.rightLine && goidRightLine > pig.x), yComparing = (goid.y < pigBottomLine && goid.y > pig.y) || (goidBottomLine < pigBottomLine && goidBottomLine > pig.y);
                if (xComparing && yComparing) {
                    _this.pigGetGoid(goid);
                }
            }
        }).to({ x: -goid.width }, goid.constructor === egret.Bitmap ? 1700 : 1780).call(function () {
            _this.removeChild(goid);
        });
    };
    Gold.prototype.pigGetGoid = function (goid) {
        var _this = this;
        var status = goid.constructor === egret.Bitmap, bitmapText = new egret.BitmapText();
        this.game.home.music.goidMusic();
        bitmapText.font = RES.getRes("font");
        bitmapText.text = status ? "10" : "50";
        bitmapText.x = goid.x;
        bitmapText.y = goid.y - 80;
        this.addChild(bitmapText);
        this.game.head.setLine(status ? 10 : 50);
        egret.Tween.get(bitmapText, {
            loop: false
        }).to({ y: bitmapText.y - 90, alpha: 0 }, 500).call(function () {
            _this.removeChild(bitmapText);
        });
        egret.Tween.removeTweens(goid);
        this.removeChild(goid);
    };
    return Gold;
}(egret.DisplayObjectContainer));
__reflect(Gold.prototype, "Gold");
