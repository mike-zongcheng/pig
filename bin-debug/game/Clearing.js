var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Clearing = (function (_super) {
    __extends(Clearing, _super);
    function Clearing(game) {
        var _this = _super.call(this) || this;
        _this.game = game;
        _this.clearingMask = new egret.Shape(); // 遮罩层
        _this.x = _this.y = 0;
        _this.width = config.width;
        _this.height = config.height;
        _this.init();
        return _this;
    }
    Clearing.prototype.init = function () {
        this.clearingMask.graphics.beginFill(0x000000, 0.8);
        this.clearingMask.graphics.drawRect(0, 0, config.width, config.height);
        this.clearingMask.graphics.endFill();
        this.clearingMask.visible = false;
        this.addChild(this.clearingMask);
        this.success = this.frame("clearingOkBg");
        this.failure = this.frame("clearingNoBg");
        this.lotteryWin = this.resultFrame({
            title: "lotteryResultWinTitle",
            pig: "winPig",
            text: "\u60A8\u771F\u5E78\u8FD0\uFF01\n\u606D\u559C\u83B7\u5F97#\u5143\u4F18\u60E0\u5238\n\u70B9\u51FB\u4EE5\u4E0B\u94FE\u63A5\u9886\u53D6\n************************"
        });
        this.lotteryLose = this.resultFrame({
            title: "lotteryResultLoseTitle",
            pig: "losePig",
            text: "\u6CA1\u4E2D\u5450\uFF0C\u518D\u63A5\u518D\u5389\u54E6\uFF01\n\u6362\u4E2A\u59FF\u52BF\u8BD5\u8BD5~"
        });
    };
    Clearing.prototype.frame = function (resName) {
        var box = new egret.DisplayObjectContainer();
        box.width = 840;
        box.height = 1186;
        box.x = 121;
        box.y = (config.height - box.height) / 2;
        box.visible = false;
        var bg = new egret.Bitmap(RES.getRes(resName));
        bg.x = bg.y = 0;
        bg.width = 840;
        bg.height = 1185;
        var close = new egret.Bitmap(RES.getRes("close"));
        close.x = 750;
        close.y = -120;
        close.visible = false;
        close.touchEnabled = true;
        close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closePopup, this);
        var stars = new egret.DisplayObjectContainer();
        stars.width = 840;
        stars.height = 220;
        stars.x = stars.y = 0;
        box["stars"] = stars;
        box.addChild(bg);
        resName == "clearingOkBg" && box.addChild(this.setButton("clearingBtn1", 135, 670, this.lottery));
        box.addChild(this.setButton("clearingBtn2", 135, resName == "clearingOkBg" ? 834 : 740, this.game.reset, this.game));
        box.addChild(this.setButton("clearingBtn3", 135, resName == "clearingOkBg" ? 1002 : 904, function () {
            window.top.location.href = config.moreGame;
        }));
        var text = this.setText(box);
        box["label"] = text.label;
        box["prompt"] = text.prompt;
        box.addChild(stars);
        box.addChild(close);
        this.addChild(box);
        return box;
    };
    Clearing.prototype.setButton = function (resName, x, y, callbac, scope) {
        if (scope === void 0) { scope = this; }
        var button = new egret.Bitmap(RES.getRes(resName));
        button.x = x;
        button.y = y;
        button.touchEnabled = true;
        button.addEventListener(egret.TouchEvent.TOUCH_TAP, callbac, scope);
        return button;
    };
    Clearing.prototype.setText = function (box) {
        var label = new egret.TextField(), prompt = new egret.TextField();
        label.text = "获得30分！";
        label.textColor = prompt.textColor = 0xfffd70;
        label.size = 60;
        label.width = prompt.width = 632;
        label.height = 85;
        label.x = prompt.x = 104;
        label.y = 446;
        label.textAlign = prompt.textAlign = "center";
        label.verticalAlign = prompt.verticalAlign = "center";
        prompt.text = "今天还有5次抽奖机会";
        prompt.size = 40;
        prompt.height = 64;
        prompt.y = 542;
        box.addChild(label);
        box.addChild(prompt);
        return {
            label: label,
            prompt: prompt
        };
    };
    Clearing.prototype.setStar = function (starNumber, box) {
        box["stars"].removeChildren();
        if (starNumber <= 0) {
            return;
        }
        if (starNumber > 3)
            starNumber = 3;
        for (var i = 0; i < starNumber; i++) {
            var star = new egret.Bitmap(RES.getRes("star"));
            star.x = 126 + (201 * i);
            star.y = 18;
            star.width = 181;
            star.height = 176;
            box["stars"].addChild(star);
        }
    };
    Clearing.prototype.lottery = function () {
        this.failure.visible = this.success.visible = false;
        var gift = new egret.Bitmap(RES.getRes("lotteryGift"));
        gift.anchorOffsetX = gift.width / 2;
        gift.anchorOffsetY = gift.height / 2;
        gift.x = config.width / 2;
        gift.y = config.height / 2;
        this.addChild(gift);
        this.lotteryTween(gift, config.lotteryTime, -config.lotteryAngle, true);
    };
    Clearing.prototype.lotteryTween = function (gift, time, angle, one) {
        var _this = this;
        if (one === void 0) { one = false; }
        egret.Tween.get(gift, {
            loop: false,
        }).to({
            rotation: angle
        }, one ? time / 2 : time).call(function () {
            if (time <= 100) {
                _this.removeChild(gift);
                _this.lotteryWin.visible = true;
                return;
            }
            _this.lotteryTween(gift, time - 30, angle < 0 ? config.lotteryAngle : -config.lotteryAngle);
        });
    };
    Clearing.prototype.resultFrame = function (resName) {
        var box = new egret.DisplayObjectContainer();
        box.width = 842;
        box.height = 1139;
        box.x = 121;
        box.y = (config.height - box.height) / 2;
        box.visible = false;
        var bg = new egret.Bitmap(RES.getRes("lotteryResultBg"));
        bg.width = 842;
        bg.height = 801;
        var close = new egret.Bitmap(RES.getRes("lotteryResultClose"));
        close.x = 750;
        close.y = -110;
        close.touchEnabled = true;
        close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closePopup, this);
        var title = new egret.Bitmap(RES.getRes(resName.title));
        title.x = (box.width - title.width) / 2;
        title.y = 76;
        var pig = new egret.Bitmap(RES.getRes(resName.pig));
        pig.x = (box.width - pig.width) / 2;
        pig.y = 775 - pig.height;
        var text = new egret.TextField();
        text.text = resName.text;
        text.lineSpacing = 16;
        text.textAlign = "center";
        text.textColor = 0x863500;
        text.size = 46;
        text.width = 842;
        text.x = 0;
        text.y = 270;
        box.addChild(bg);
        box.addChild(title);
        box.addChild(close);
        box.addChild(text);
        box.addChild(pig);
        box.addChild(this.setButton("clearingBtn2", 137, 840, this.game.reset, this.game));
        box.addChild(this.setButton("clearingBtn3", 137, 1009, function () {
            window.top.location.href = config.moreGame;
        }));
        this.addChild(box);
        return box;
    };
    Clearing.prototype.showSuccess = function () {
        this.clearingMask.visible = true;
        this.failure.visible = false;
        this.success.visible = true;
        this.success["label"].text = "\u83B7\u5F97" + this.game.head.schedule + "\u5206";
        this.success["prompt"].text = "\u4ECA\u5929\u8FD8\u6709" + config.lotteryCount + "\u6B21\u62BD\u5956\u673A\u4F1A";
        this.setStar(Math.floor(this.game.head.schedule / config.goidMax), this.success);
    };
    Clearing.prototype.showFailure = function () {
        this.clearingMask.visible = true;
        this.success.visible = false;
        this.failure.visible = true;
        this.failure["label"].text = "\u83B7\u5F97" + this.game.head.schedule + "\u5206";
        this.failure["prompt"].text = "\u9700\u8981\u8FBE\u5230" + config.goidMax + "\u5206\u624D\u80FD\u62BD\u5956\u54E6";
        this.setStar(0, this.failure);
    };
    Clearing.prototype.closePopup = function () {
        this.clearingMask.visible = this.lotteryWin.visible = this.lotteryLose.visible = this.success.visible = this.failure.visible = false;
    };
    return Clearing;
}(egret.DisplayObjectContainer));
__reflect(Clearing.prototype, "Clearing");
