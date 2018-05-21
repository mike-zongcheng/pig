var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Game = (function (_super) {
    __extends(Game, _super);
    function Game(home) {
        var _this = _super.call(this) || this;
        _this.home = home;
        _this.visible = false;
        _this.stopTween = true;
        _this.ajaxStatus = false;
        _this.pig = new Pig(_this); // 小猪佩奇
        _this.ground = new Ground(_this); // 地面
        _this.gold = new Gold(_this); // 金币
        _this.monster = new Monster(_this); // 怪物
        _this.head = new Head(_this); // 怪物
        // clearing: Clearing = new Clearing(this)// 结算界面
        _this.result = new Result(_this); // 结束弹框
        _this.resetStatus = false; // 是否重置中
        return _this;
    }
    Game.prototype.init = function () {
        var _this = this;
        this.backView("pigBg");
        this.addChild(this.ground);
        this.setBalloon();
        this.addChild(this.gold);
        this.addChild(this.pig);
        this.addChild(this.monster);
        this.jumpEvent();
        this.addChild(this.head);
        this.backView("grass");
        this.addChild(this.result);
        // this.addChild(this.clearing);
        this.tutorial();
        setTimeout(function () { _this.pig.drop(); }, 100);
        return true;
    };
    Game.prototype.backView = function (resName) {
        var bg = new egret.Bitmap(RES.getRes(resName));
        bg.x = 0;
        bg.y = config.height - bg.height;
        this.addChild(bg);
    };
    Game.prototype.tutorial = function () {
        var _this = this;
        if (document.cookie.indexOf("tutorial") != -1) {
            this.start();
            return;
        }
        var tutorial = new egret.Bitmap(RES.getRes("gamePrompt"));
        tutorial.width = config.width;
        tutorial.height = config.height;
        tutorial.x = tutorial.y = 0;
        tutorial.visible = true;
        tutorial.touchEnabled = true;
        this.addChild(tutorial);
        tutorial.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function () {
            var date = new Date();
            date.setDate(date.getDate() + 3000);
            document.cookie = 'tutorial=true;expires=' + date["toGMTString"]();
            _this.start();
            tutorial.visible = false;
        }, this);
    };
    Game.prototype.setBalloon = function () {
        var balloonBg = new egret.Bitmap(RES.getRes("balloon"));
        balloonBg.x = balloonBg.y = 0;
        var logo = new egret.Bitmap(this.logo);
        logo.width = logo.height = 96;
        logo.x = 10;
        logo.y = 208;
        var balloon = new egret.DisplayObjectContainer();
        balloon.width = balloonBg.width;
        balloon.height = balloonBg.height;
        balloon.x = config.balloonX;
        balloon.y = config.balloonMin;
        balloon.addChild(balloonBg);
        balloon.addChild(logo);
        this.addChild(balloon);
        // this.balloonTween(balloon);
        this.balloon = balloon;
    };
    Game.prototype.balloonTween = function (balloon) {
        var _this = this;
        egret.Tween.get(balloon, {
            loop: false
        }).to({ y: balloon.y == config.balloonMax ? config.balloonMin : config.balloonMax }, 1700).call(function () {
            _this.balloonTween(balloon);
        });
    };
    Game.prototype.jumpEvent = function () {
        var click = new egret.Shape();
        click.x = click.y = 0;
        click.graphics.beginFill(0x257602, 0);
        click.graphics.drawRect(0, 0, config.width, config.height);
        click.graphics.endFill();
        click.touchEnabled = true;
        this.addChild(click);
        click.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.pig.jump, this.pig);
    };
    Game.prototype.isDrop = function (shp) {
        var rearLine = shp.x + shp.width, xJudgment = shp.x <= this.pig.rightLine && rearLine > this.pig.x, pigY = this.pig.y + this.pig.height;
        if (xJudgment && pigY >= shp.y && pigY <= shp.y + 60) {
            return true;
        }
        return false;
    };
    Game.prototype.isDrops = function () {
        var grounds = this.ground.$children;
        for (var i = 0; i < grounds.length; i++) {
            if (this.isDrop(grounds[i])) {
                return true;
            }
        }
        return false;
    };
    Game.prototype.upData = function (count) {
        var _this = this;
        if (count === void 0) { count = 1; }
        if (count > config.upDataMaxNumber) {
            return;
        }
        window["jQuery"].ajax({
            type: "post",
            url: xmlConfig.over,
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify({
                Score: this.head.schedule
            }),
            xhrFields: {
                withCredentials: true
            },
            success: function (res) {
                _this.ajaxStatus = false;
            },
            error: function () {
                _this.upData(count + 1);
            }
        });
    };
    Game.prototype.gameOver = function () {
        var _this = this;
        this.head.startText.text = this.head.schedule + "";
        setTimeout(function () {
            _this.resetStatus = true;
            _this.result.show();
            // if(this.head.schedule >= config.goidMax){
            //     this.clearing.showSuccess();
            // }else{
            //     this.clearing.showFailure();
            // }
        }, 1000);
        if (this.ajaxStatus) {
            return;
        }
        this.ajaxStatus = true;
        this.upData();
    };
    Game.prototype.start = function () {
        clearInterval(this.stopTime);
        this.home.music.startMusic();
        this.visible = true;
        this.stopTween = false;
        egret.Tween.resumeTweens(this.ground.$children[0]);
        this.pig.move.gotoAndPlay(1, -1);
        this.pig.y = config.height - config.initHeight - this.pig.height;
        this.gold.init();
        this.monster.init();
        this.balloon.y = config.balloonMin;
        this.balloonTween(this.balloon);
        this.head.schedule = 0;
        this.head.removeChildren();
        this.head.init();
    };
    Game.prototype.stopTimeout = function () {
        clearTimeout(this.gold.goidTime);
        clearTimeout(this.gold.goidTime2);
        clearTimeout(this.monster.dragonTime);
        clearTimeout(this.head.barrageTime);
    };
    Game.prototype.reset = function () {
        var _this = this;
        this.home.music.resetMusic();
        this.stopTween = this.resetStatus = true;
        this.stopTime = setInterval(function () {
            _this.stopTimeout();
        }, 40);
        egret.Tween.removeAllTweens();
        this.ground.removeChildren();
        this.monster.removeChildren();
        this.gold.removeChildren();
        this.head.removeChildren();
        this.pig.overStatus = false;
        this.pig.isRepeat = true;
        this.pig.x = config.pigX;
        this.resetStatus = false;
        this.head.barrageStatus = true;
        this.ground.init();
        setTimeout(function () {
            _this.monster.init();
        }, config.dragonStartTime);
        this.gold.init();
        this.pig.drop();
        this.result.hide();
        // this.clearing.closePopup();
        this.home.cover.visible = true;
        this.home.cover.startTween();
        this.visible = false;
        this.head.schedule = 0;
    };
    return Game;
}(egret.DisplayObjectContainer));
__reflect(Game.prototype, "Game");
