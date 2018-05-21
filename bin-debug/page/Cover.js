var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Cover = (function (_super) {
    __extends(Cover, _super);
    function Cover(home) {
        var _this = _super.call(this) || this;
        _this.home = home;
        _this.ranking = new Ranking(_this);
        return _this;
    }
    Cover.prototype.init = function () {
        this.backView();
        this.complaints();
        // this.activityView();
        this.rankingView();
        this.more();
        // this.gameNumber();
        this.startView();
        this.musicBut();
        // this.addChild(this.activity);
        this.addChild(this.ranking);
        RES.getResByUrl(config.logo, this.printLogo, this, RES.ResourceItem.TYPE_IMAGE);
    };
    Cover.prototype.backView = function () {
        var bg = new egret.Bitmap(RES.getRes("startCover"));
        bg.width = config.width;
        bg.height = config.height;
        bg.x = bg.y = 0;
        this.addChild(bg);
    };
    Cover.prototype.complaints = function () {
        var complaints = new egret.Bitmap(RES.getRes("complaints"));
        complaints.x = 30;
        complaints.y = config.height * 0.015;
        complaints.touchEnabled = true;
        complaints.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            window.top.location.href = config.complaintsAddress;
        }, this);
        this.addChild(complaints);
    };
    Cover.prototype.activityView = function () {
        var _this = this;
        var activity = new egret.Bitmap(RES.getRes("activity"));
        activity.x = 702;
        activity.y = config.height * 0.018;
        activity.touchEnabled = true;
        activity.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.activity.visible = _this.activity.activity.visible = _this.activity.popMask.visible = true;
        }, this);
        this.addChild(activity);
    };
    Cover.prototype.rankingView = function () {
        var _this = this;
        var activity = new egret.Bitmap(RES.getRes("leaderboard"));
        activity.x = 730;
        activity.y = config.height * 0.018;
        activity.touchEnabled = true;
        activity.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.ranking.show();
        }, this);
        this.addChild(activity);
    };
    Cover.prototype.more = function () {
        var more = new egret.Bitmap(RES.getRes("more"));
        more.x = 910;
        more.y = config.height * 0.018;
        more.touchEnabled = true;
        this.addChild(more);
        more.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            window.top.location.href = config.moreGame;
        }, this);
    };
    Cover.prototype.gameNumber = function () {
        var number = new egret.TextField();
        number.text = "已有5000人参加了挑战";
        number.lineSpacing = 70;
        number.textAlign = "center";
        number.textColor = 0xfefefe;
        number.size = 40;
        number.width = 600;
        number.height = 70;
        number.x = 243;
        number.y = config.height * 0.522;
        this.addChild(number);
    };
    Cover.prototype.startView = function () {
        this.startBtn = new egret.Bitmap(RES.getRes("startBtn"));
        this.startBtn.anchorOffsetX = this.startBtn.width / 2;
        this.startBtn.anchorOffsetY = this.startBtn.height / 2;
        this.startBtn.x = 241 + this.startBtn.width / 2;
        this.startBtn.y = config.height * 0.598;
        this.startBtn.touchEnabled = true;
        this.startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.home.start, this.home);
        this.addChild(this.startBtn);
        this.startTween();
    };
    Cover.prototype.startTween = function () {
        var _this = this;
        var aims = this.startBtn.scaleX == 1 ? 1.1 : 1;
        egret.Tween.get(this.startBtn, {
            loop: false
        }).to({ scaleX: aims, scaleY: aims }, 600).call(function () {
            _this.startTween();
        });
    };
    Cover.prototype.printLogo = function (e) {
        var logo = new egret.Bitmap(e);
        logo.x = (config.width - logo.width) / 2;
        logo.y = config.height * 0.682;
        this.addChildAt(logo, 2);
    };
    Cover.prototype.musicBut = function () {
        var _this = this;
        var musicBtn = new egret.Bitmap(RES.getRes("musicOn")), musicBtn2 = new egret.Bitmap(RES.getRes("musicOff"));
        musicBtn.x = musicBtn2.x = config.width * 0.85;
        musicBtn.y = musicBtn2.y = config.height * 0.1;
        musicBtn.touchEnabled = musicBtn2.touchEnabled = true;
        musicBtn2.visible = false;
        musicBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.home.musicStatus = false;
            musicBtn2.visible = true;
            musicBtn.visible = false;
        }, this);
        musicBtn2.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.home.musicStatus = true;
            musicBtn2.visible = false;
            musicBtn.visible = true;
        }, this);
        this.addChild(musicBtn);
        this.addChild(musicBtn2);
    };
    return Cover;
}(egret.DisplayObjectContainer));
__reflect(Cover.prototype, "Cover");
