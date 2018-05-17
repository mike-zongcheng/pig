var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Result = (function (_super) {
    __extends(Result, _super);
    function Result(game) {
        var _this = _super.call(this) || this;
        _this.game = game;
        _this.visible = false;
        _this.popMask = new egret.Shape(); // 遮罩层
        _this.init();
        return _this;
    }
    Result.prototype.init = function () {
        this.maskSet();
        this.resultView();
    };
    Result.prototype.maskSet = function () {
        this.popMask.graphics.beginFill(0x000000, 0.8);
        this.popMask.graphics.drawRect(0, 0, config.width, config.height);
        this.popMask.graphics.endFill();
        this.popMask.visible = false;
        this.addChild(this.popMask);
    };
    Result.prototype.show = function () {
        this.fraction.text = "\u83B7\u5F97" + this.game.head.schedule + "\u5206";
        this.popMask.visible = this.visible = true;
    };
    Result.prototype.hide = function () {
        this.popMask.visible = this.visible = false;
    };
    Result.prototype.resultView = function () {
        this.container = new egret.DisplayObjectContainer(); // 主内容容器
        this.container.width = 840;
        this.container.height = 1026;
        this.container.x = 120;
        this.container.y = (config.height - 1026) / 2;
        var bg = new egret.Bitmap(RES.getRes("resultBg"));
        bg.width = 840;
        bg.height = 1026;
        bg.x = bg.y = 0;
        this.container.addChild(bg);
        this.avatarView(this.container);
        this.setName(this.container);
        this.setFraction(this.container);
        this.renewGame(this.container);
        this.moreGame(this.container);
        this.addChild(this.container);
    };
    Result.prototype.avatarView = function (container) {
        var avatarBox = new egret.DisplayObjectContainer(); // 头像容器
        avatarBox.width = avatarBox.height = 232;
        avatarBox.x = 304;
        avatarBox.y = 64;
        var avatar = new egret.Bitmap(config.HeadImage);
        avatar.x = avatar.y = 0;
        avatar.width = avatar.height = 232;
        var circle = new egret.Shape(); // 遮罩层
        circle.graphics.beginFill(0x0000ff);
        circle.graphics.drawCircle(116, 116, 116);
        circle.graphics.endFill();
        avatar.mask = circle;
        avatarBox.addChild(circle);
        avatarBox.addChild(avatar);
        container.addChild(avatarBox);
    };
    Result.prototype.setName = function (container) {
        var name = new egret.TextField();
        name.text = config.nickName;
        name.textColor = 0xffffff;
        name.size = 48;
        name.x = 0;
        name.y = 330;
        name.width = 840;
        name.textAlign = "center";
        container.addChild(name);
    };
    Result.prototype.setFraction = function (container) {
        var fraction = new egret.TextField();
        fraction.text = "\u83B7\u5F970\u5206";
        fraction.width = 632;
        fraction.size = 60;
        fraction.textColor = 0xfffd70;
        fraction.textAlign = "center";
        fraction.x = 104;
        fraction.y = 496;
        this.fraction = fraction;
        container.addChild(fraction);
    };
    Result.prototype.renewGame = function (container) {
        var button = new egret.Bitmap(RES.getRes('clearingBtn2'));
        button.x = 137;
        button.y = 675;
        button.touchEnabled = true;
        button.addEventListener(egret.TouchEvent.TOUCH_TAP, this.game.reset, this.game);
        container.addChild(button);
    };
    Result.prototype.moreGame = function (container) {
        var button = new egret.Bitmap(RES.getRes('clearingBtn3'));
        button.x = 137;
        button.y = 844;
        button.touchEnabled = true;
        button.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            window.top.location.href = config.moreGame;
        }, this);
        container.addChild(button);
    };
    return Result;
}(egret.DisplayObjectContainer));
__reflect(Result.prototype, "Result");
