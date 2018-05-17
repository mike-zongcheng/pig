var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Ground = (function (_super) {
    __extends(Ground, _super);
    function Ground(game) {
        var _this = _super.call(this) || this;
        _this.game = game;
        _this.groundPos = [];
        _this.init();
        return _this;
    }
    Ground.prototype.init = function () {
        var pos = {
            width: config.width + config.width / 2,
            height: config.initHeight,
            x: 0,
            y: config.height - config.initHeight,
            deviation: config.jumpGroundDeviation + config.jumpMaxGroundDeviation * Math.random()
        };
        this.game.pig.walkY = this.game.pig.y = config.height - config.initHeight - this.game.pig.height;
        var random = config.jumpGroundDeviation + config.jumpMaxGroundDeviation * Math.random();
        this.randomPos();
        this.groundMain(pos, true); // 地面出现
    };
    Ground.prototype.randomPos = function () {
        var width = config.groundXmin + (config.groundXmax - config.groundXmin) * Math.random(), height = config.groundYmin + (config.groundYmax - config.groundYmin) * Math.random(), a = {
            width: width,
            height: height,
            x: config.width,
            y: config.height - height,
            deviation: config.jumpGroundDeviation + config.jumpMaxGroundDeviation * Math.random()
        };
        this.groundPos.length == 2 && this.groundPos.splice(0, 1);
        this.groundPos.push(a);
        return this.groundPos[0];
    };
    Ground.prototype.setGound = function (pos) {
        var ground = new egret.DisplayObjectContainer();
        ground.width = pos.width;
        ground.height = pos.height;
        ground.x = pos.x;
        ground.y = config.height - pos.height;
        var bg = new egret.Shape();
        bg.x = bg.y = 0;
        bg.graphics.beginFill(0xa54a38, 1);
        bg.graphics.drawRect(0, 0, pos.width, pos.height);
        bg.graphics.endFill();
        var bgHead = new egret.Bitmap(RES.getRes("groundHeadBg"));
        bgHead.width = pos.width;
        bgHead.height = 95;
        bgHead.x = bgHead.y = 0;
        bgHead.fillMode = egret.BitmapFillMode.REPEAT;
        ground.addChild(bg);
        ground.addChild(bgHead);
        this.addChild(ground);
        return ground;
    };
    Ground.prototype.groundMain = function (pos, init) {
        var _this = this;
        var status = false, ground = this.setGound(pos), pig = this.game.pig;
        if (this.game.resetStatus)
            return;
        var tw = egret.Tween.get(ground, {
            loop: false,
            onChange: function () {
                var rearLine = ground.x + ground.width, xJudgment = ground.x <= pig.rightLine && rearLine > pig.x, pigY = pig.y + pig.height;
                // ground['collisionStatus'] = false;
                if (xJudgment && pigY >= ground.y && pigY <= ground.y + 60 && !pig.overStatus) {
                    pig.walkY = pig.y = ground.y - pig.height;
                    // ground['collisionStatus'] = pig.dropStop = true;
                    pig.jumpStatus = false;
                    pig.jumpCount = 0;
                }
                else if (pig.jumpstatus && pig.dropStop) {
                    pig.dropStop = false;
                }
                if (status || _this.game.resetStatus)
                    return;
                if (rearLine - config.width <= -pos.deviation) {
                    _this.groundMain(_this.randomPos());
                    status = true;
                    return;
                }
            },
            onChangeObj: ground
        }).to({ x: -pos.width }, 1.481 * (init ? pos.width : pos.width + config.width)).call(function () {
            _this.removeChild(ground);
        });
        this.game.stopTween && egret.Tween.pauseTweens(ground);
    };
    return Ground;
}(egret.DisplayObjectContainer));
__reflect(Ground.prototype, "Ground");
