var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Monster = (function (_super) {
    __extends(Monster, _super);
    function Monster(game) {
        var _this = _super.call(this) || this;
        _this.game = game;
        _this.collisionStatus = true;
        return _this;
    }
    Monster.prototype.init = function () {
        var _this = this;
        clearTimeout(this.dragonTime);
        this.dragonTime = setTimeout(function () {
            _this.removeChildren();
            _this.setMonster();
        }, config.dragonStartTime);
    };
    Monster.prototype.setMonster = function () {
        if (this.game.resetStatus)
            return;
        var monster = new egret.DisplayObjectContainer();
        monster.width = 190;
        monster.height = 176;
        monster.x = config.width + 190;
        monster.y = config.height - config.monsterYmax;
        this.addChild(monster);
        var monsterMove = new egret.MovieClipDataFactory(RES.getRes("dragon"), RES.getRes("dragon_png")), move = new egret.MovieClip(monsterMove.generateMovieClipData("run"));
        monster.addChild(move);
        move.gotoAndPlay(1, -1);
        this.collisionStatus = true;
        this.monsterTween(monster);
    };
    Monster.prototype.monsterTween = function (monster) {
        var _this = this;
        if (this.game.resetStatus)
            return;
        egret.Tween.get(monster, {
            loop: false,
            onChange: function () {
                if (_this.game.resetStatus)
                    return;
                if (monster.x <= -monster.width) {
                    egret.Tween.removeTweens(monster);
                    _this.removeChild(monster);
                    _this.dragonTime = setTimeout(function () {
                        _this.setMonster();
                    }, config.dragonShowTime);
                    return;
                }
                if (_this.collisionStatus && _this.detectCollision(monster)) {
                    _this.collisionStatus = false;
                    if (_this.detectStepOn(monster)) {
                        _this.dragonOver(monster);
                        return;
                    }
                    _this.game.pig.overStatus = true;
                }
            },
            onChangeObj: monster
        }).to({
            y: config.height - (config.height - monster.y == config.monsterYmax ? config.monsterYmin : config.monsterYmax),
            x: monster.x - config.distance
        }, 700).call(function () {
            _this.monsterTween(monster);
        });
    };
    Monster.prototype.countData = function (monster) {
        var pig = this.game.pig;
        return {
            pig: pig,
            rightLine: monster.x + monster.width,
            bottomLine: monster.y + monster.height,
            pigRightLine: pig.x + pig.width,
            pigBottomLine: pig.y + pig.height
        };
    };
    Monster.prototype.detectCollision = function (monster) {
        if (this.game.resetStatus)
            return;
        var countData = this.countData(monster), pig, rightLine, bottomLine, pigRightLine, pigBottomLine;
        (pig = countData.pig, rightLine = countData.rightLine, bottomLine = countData.bottomLine, pigRightLine = countData.pigRightLine, pigBottomLine = countData.pigBottomLine);
        var xJudgment = (monster.x <= pigRightLine && rightLine >= pigRightLine) || (monster.x <= pig.x && rightLine >= pig.x), yJudgment = (monster.y <= pigBottomLine && bottomLine >= pigBottomLine) || (monster.y <= pig.y && bottomLine >= pig.y);
        if (xJudgment && yJudgment) {
            return true;
        }
        return false;
    };
    Monster.prototype.detectStepOn = function (monster) {
        if (this.game.resetStatus)
            return;
        var countData = this.countData(monster), pig, rightLine, bottomLine, pigRightLine, pigBottomLine;
        (pig = countData.pig, rightLine = countData.rightLine, bottomLine = countData.bottomLine, pigRightLine = countData.pigRightLine, pigBottomLine = countData.pigBottomLine);
        if (Math.abs(pigBottomLine - monster.y) < 30) {
            return true;
        }
        return false;
    };
    Monster.prototype.dragonOver = function (monster) {
        var _this = this;
        if (this.game.resetStatus)
            return;
        this.game.pig.jumpCount = config.jumpCount - 1;
        egret.Tween.removeTweens(monster);
        this.dragonTime = setTimeout(function () {
            egret.Tween.get(monster, {
                loop: false,
            }).to({
                y: config.height + monster.height,
                x: monster.x - 300
            }, 700).call(function () {
                _this.removeChild(monster);
                _this.dragonTime = setTimeout(function () {
                    _this.setMonster();
                }, config.dragonShowTime);
            });
        });
    };
    return Monster;
}(egret.DisplayObjectContainer));
__reflect(Monster.prototype, "Monster");
