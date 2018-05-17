var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Activity = (function (_super) {
    __extends(Activity, _super);
    function Activity(cover) {
        var _this = _super.call(this) || this;
        _this.cover = cover;
        _this.visible = false;
        _this.popMask = new egret.Shape(); // 遮罩层
        _this.container = new egret.DisplayObjectContainer(); // 滚动容器
        _this.activityBtn = new egret.Shape(); // 活动说明单击遮罩
        _this.prizeBtn = new egret.Shape(); // 我的奖品单击遮罩
        _this.init();
        return _this;
    }
    Activity.prototype.init = function () {
        this.popMask.graphics.beginFill(0x000000, 0.8);
        this.popMask.graphics.drawRect(0, 0, config.width, config.height);
        this.popMask.graphics.endFill();
        this.popMask.visible = true;
        this.addChild(this.popMask);
        this.activity = this.popUpView("activityBg");
        this.prize = this.popUpView("prizeBg");
        this.activity.visible = true;
        this.closeView();
        this.activityScroll();
        this.prizeScroll();
        this.button();
    };
    Activity.prototype.button = function () {
        var _this = this;
        this.activityBtn.graphics.beginFill(0x000000, 0);
        this.activityBtn.graphics.drawRect(this.activity.x + 110, this.activity.y + 18, 288, 120);
        this.activityBtn.graphics.endFill();
        this.prizeBtn.graphics.beginFill(0x000000, 0);
        this.prizeBtn.graphics.drawRect(this.activity.x + 433, this.activity.y + 18, 288, 120);
        this.prizeBtn.graphics.endFill();
        this.activityBtn.touchEnabled = this.prizeBtn.touchEnabled = true;
        this.activityBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.prize.visible = false;
            _this.activity.visible = true;
        }, this);
        this.prizeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.activity.visible = false;
            _this.prize.visible = true;
        }, this);
        this.addChild(this.activityBtn);
        this.addChild(this.prizeBtn);
    };
    Activity.prototype.popUpView = function (resName) {
        var container = new egret.DisplayObjectContainer(); // 主内容容器
        container.width = 840;
        container.height = 1185;
        container.x = 119;
        container.visible = false;
        container.y = (config.height - 1185) / 2;
        var bg = new egret.Bitmap(RES.getRes(resName));
        bg.x = bg.y = 0;
        bg.width = container.width;
        bg.height = container.height;
        bg.touchEnabled = true;
        this.addChild(container);
        container.addChild(bg);
        return container;
    };
    Activity.prototype.scrollView = function () {
        var scrollView = new egret.ScrollView();
        scrollView.x = 20;
        scrollView.y = 157;
        scrollView.width = 760;
        scrollView.height = 1008;
        scrollView.verticalScrollPolicy = "auto";
        return scrollView;
    };
    Activity.prototype.activityScroll = function () {
        var scrollView = this.scrollView(), explanation = new egret.TextField();
        explanation.text = "不可描述的事情即将发生........嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿嘿";
        explanation.x = 30;
        explanation.y = 30;
        explanation.lineSpacing = 12;
        explanation.size = 42;
        explanation.textColor = 0xaf272b;
        explanation.width = 745;
        explanation.height += 80;
        scrollView.setContent(explanation);
        this.activity.addChild(scrollView);
    };
    Activity.prototype.prizeScroll = function () {
        var scrollView = this.scrollView();
        this.container.x = 31;
        this.container.width = 745;
        scrollView.setContent(this.container);
        for (var i = 0; i < 15; i++) {
            this.getlist();
        }
        this.prize.addChild(scrollView);
    };
    Activity.prototype.getlist = function () {
        var container = new egret.DisplayObjectContainer(); // 主内容容器
        container.x = 0;
        container.width = 745;
        container.height = 162;
        container.touchEnabled = true;
        var id = new egret.TextField(), name = new egret.TextField();
        id.text = "1、";
        id.textAlign = name.textAlign = "left";
        id.textColor = name.textColor = 0xaf272b;
        id.size = name.size = 42;
        id.width = 100;
        id.x = 0;
        id.y = name.y = 64;
        name.text = "50元优惠券";
        name.width = 386;
        name.x = 80;
        var receive = new egret.Bitmap(RES.getRes("receive"));
        receive.x = 470;
        receive.y = 35;
        receive.touchEnabled = true;
        receive.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            console.log(id);
        }, this);
        var border = new egret.Shape(); // 遮罩层
        border.graphics.beginFill(0xbf655b, 1);
        border.graphics.drawRect(0, 160, container.width, 1);
        border.graphics.endFill();
        container.addChild(id);
        container.addChild(name);
        container.addChild(receive);
        container.addChild(border);
        container.y = this.container.height;
        this.container.height += container.height;
        this.container.addChild(container);
    };
    Activity.prototype.closeView = function () {
        var close = new egret.Bitmap(RES.getRes("close"));
        close.x = 870;
        close.y = this.activity.y - 120;
        close.touchEnabled = true;
        close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.close, this);
        this.addChild(close);
    };
    Activity.prototype.close = function () {
        this.popMask.visible = this.activity.visible = this.prize.visible = this.visible = false;
    };
    return Activity;
}(egret.DisplayObjectContainer));
__reflect(Activity.prototype, "Activity");
