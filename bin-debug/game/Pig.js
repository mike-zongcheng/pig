var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Pig = (function (_super) {
    __extends(Pig, _super);
    function Pig(game) {
        var _this = _super.call(this) || this;
        _this.game = game;
        _this.walkY = 0;
        _this.dropStop = true; // 是否停止掉落
        _this.jumpCount = 0; // 当前跳跃次数
        _this.overStatus = false; // 当true时必输，无法逆转
        _this.jumpStatus = false; // 是否跳跃状态
        _this.isRepeat = true; // 防止重复进死亡函数
        _this.overRunStatus = false; // over函数是否运行了
        _this.init();
        return _this;
    }
    Pig.prototype.init = function () {
        this.x = config.pigX;
        this.y = config.height - config.groundInit;
        this.width = 51;
        this.rightLine = this.x + this.width + config.pigDeviation;
        var pig = new egret.MovieClipDataFactory(RES.getRes("pig"), RES.getRes("pig_png"));
        this.move = new egret.MovieClip(pig.generateMovieClipData("run"));
        this.addChild(this.move);
        // move.gotoAndPlay(1, -1);
    };
    Pig.prototype.jump = function () {
        var _this = this;
        if (this.jumpCount >= config.jumpCount || this.overStatus) {
            return;
        }
        this.game.home.music.jumpMusic();
        // if( Math.abs(this.walkY - this.y) > 40 && this.jumpCount == 0 ){// 当从两块柱子间掉落，不允许跳跃 && this.isOver() 
        //     return;
        // }
        this.jumpCount += 1;
        egret.Tween.removeTweens(this);
        this.jumpStatus = this.dropStop = true;
        egret.Tween.get(this, {
            loop: false
        }).to({ y: this.y - config.jumpHeight }, 400, egret.Ease.sineOut).call(function () {
            _this.dropStop = false;
        });
    };
    Pig.prototype.drop = function () {
        var _this = this;
        this.overRunStatus = false;
        clearTimeout(this.dropTime);
        this.dropTime = setInterval(function () {
            if (!_this.overStatus && (_this.game.isDrops() || _this.dropStop || _this.game.stopTween)) {
                _this.dropStop = false;
                return;
            }
            // this.isRepeat && this.overStatus && (this.isRepeat = false, this.over());
            if (_this.overStatus && (_this.isRepeat || (Math.abs(_this.walkY - _this.y) > 6 && _this.jumpCount == 0))) {
                _this.over();
                _this.overStatus = true;
                _this.isRepeat = false;
            }
            var aims = _this.y + config.height * (config.height > 1920 ? 0.01 : 0.008);
            if (aims >= config.height) {
                _this.overStatus = true;
                _this.y = config.height;
                !_this.overRunStatus && _this.isRepeat && _this.over();
                clearInterval(_this.dropTime);
                return;
            }
            _this.y = aims;
        }, 6);
    };
    Pig.prototype.isOver = function () {
        var gound = this.game.ground, status = true;
        gound.$children.map(function (todo, i) {
            if (todo["collisionStatus"])
                status = false;
        });
        return status;
    };
    Pig.prototype.over = function () {
        console.log("进入死亡");
        this.game.resetStatus = true;
        this.overRunStatus = true;
        var end = config.height + this.height;
        clearTimeout(this.game.gold.goidTime);
        clearTimeout(this.game.monster.dragonTime);
        this.game.monster.$children.map(function (todo, i) {
            todo.$children[0].stop();
        });
        egret.Tween.removeAllTweens();
        this.game.gameOver();
        // egret.Tween.removeTweens(this);
        // setTimeout(()=>{
        //     egret.Tween.get(this, {
        //         loop: false
        //     }).to({ x: -this.width }, this.x * 1.2 ).call(()=>{
        //         
        //     }) 
        // })
    };
    return Pig;
}(egret.DisplayObjectContainer));
__reflect(Pig.prototype, "Pig");
