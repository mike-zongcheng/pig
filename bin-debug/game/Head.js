var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Head = (function (_super) {
    __extends(Head, _super);
    function Head(game) {
        var _this = _super.call(this) || this;
        _this.game = game;
        _this.schedule = 0; // 当前金币数
        _this.barrageStatus = true;
        _this.x = 0;
        _this.y = 0;
        return _this;
    }
    Head.prototype.init = function () {
        this.avatar();
        this.line();
    };
    Head.prototype.avatar = function () {
        var avatar = new egret.DisplayObjectContainer();
        avatar.width = avatar.height = 150;
        avatar.x = 20;
        avatar.y = 36;
        var bg = new egret.Shape();
        bg.x = bg.y = 0;
        bg.graphics.beginFill(0x003ea1);
        bg.graphics.drawCircle(75, 75, 80);
        bg.graphics.endFill();
        var avatarImg = new egret.Bitmap(config.HeadImage); // 头像图片
        avatarImg.x = avatarImg.y = 4;
        avatarImg.width = avatarImg.height = 142;
        var circle = new egret.Shape(); // 遮罩层
        circle.graphics.beginFill(0x0000ff);
        circle.graphics.drawCircle(75, 75, 71);
        circle.graphics.endFill();
        avatarImg.mask = circle;
        avatar.addChild(bg);
        avatar.addChild(avatarImg);
        avatar.addChild(circle);
        this.addChild(avatar);
    };
    Head.prototype.line = function () {
        var line = new egret.DisplayObjectContainer();
        line.width = 690;
        line.height = 178;
        line.x = 218;
        line.y = 10;
        var bg = new egret.Shape();
        bg.graphics.lineStyle(2, 0x003ea1);
        bg.graphics.beginFill(0xccefff);
        bg.graphics.drawRoundRect(0, 73, 660, 60, 60);
        bg.graphics.endFill();
        var lineBg = new egret.Shape();
        lineBg.graphics.beginFill(0xa2d3ea);
        lineBg.graphics.drawRoundRect(10, 83, 640, 40, 40);
        lineBg.graphics.endFill();
        var lineImg = new egret.Bitmap(RES.getRes("line")); // 线条图片
        lineImg.x = 10;
        lineImg.y = 83;
        lineImg.width = 640;
        lineImg.height = 40;
        this.scheduleMask = new egret.Shape();
        this.scheduleMask.graphics.beginFill(0xa54a38, 1);
        this.scheduleMask.graphics.drawRect(10, 83, 0, 40);
        this.scheduleMask.graphics.endFill();
        lineImg.mask = this.scheduleMask;
        var gift = new egret.Bitmap(RES.getRes("gift")); // 礼品图
        gift.x = 599;
        gift.y = 0;
        gift.width = 80;
        gift.height = 100;
        this.startText = new egret.BitmapText();
        this.startText.font = RES.getRes("font");
        this.startText.text = "0";
        this.startText.x = 0;
        this.startText.y = 141;
        var endText = new egret.BitmapText();
        endText.font = RES.getRes("font");
        endText.text = config.goidMax.toString();
        endText.x = 690 - endText.width - 28;
        endText.y = 141;
        line.addChild(bg);
        line.addChild(this.startText);
        line.addChild(endText);
        line.addChild(lineBg);
        line.addChild(lineImg);
        line.addChild(this.scheduleMask);
        line.addChild(gift);
        this.addChild(line);
    };
    Head.prototype.barrage = function (resName) {
        var _this = this;
        var barrage = new egret.Bitmap(RES.getRes(resName)); // 弹幕相片
        barrage.x = config.width;
        barrage.y = resName == "barrage1" ? 400 : 800;
        this.addChild(barrage);
        egret.Tween.get(barrage, {
            loop: false
        }).to({ x: -barrage.width }, resName == "barrage1" ? 8000 : 4600).call(function () {
            if (resName == "barrage1") {
                _this.barrageTime = setTimeout(function () {
                    _this.barrage("barrage2");
                }, 3000);
            }
            ;
        });
    };
    Head.prototype.setLine = function (goid) {
        this.startText.text = this.schedule.toString();
        if (this.schedule > config.goidMax) {
            this.schedule += goid;
            this.barrageStatus && (this.barrageStatus = false, this.barrage("barrage1"));
            return;
        }
        this.schedule += goid;
        this.scheduleMask.graphics.clear();
        this.scheduleMask.graphics.beginFill(0xa54a38, 1);
        this.scheduleMask.graphics.drawRect(10, 83, 640 * (this.schedule / config.goidMax), 40);
        this.scheduleMask.graphics.endFill();
    };
    return Head;
}(egret.DisplayObjectContainer));
__reflect(Head.prototype, "Head");
