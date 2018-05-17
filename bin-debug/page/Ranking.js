var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Ranking = (function (_super) {
    __extends(Ranking, _super);
    function Ranking(cover) {
        var _this = _super.call(this) || this;
        _this.cover = cover;
        _this.visible = false;
        _this.popMask = new egret.Shape(); // 遮罩层
        _this.containerList = new egret.DisplayObjectContainer(); // 排行列表容器
        _this.init();
        return _this;
    }
    Ranking.prototype.init = function () {
        this.maskSet();
        this.rankingView();
    };
    Ranking.prototype.show = function () {
        var _this = this;
        window["jQuery"].ajax({
            type: "get",
            url: xmlConfig.ranking,
            dataType: "json",
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            success: function (data) {
                _this.container.visible = _this.visible = true;
                _this.fraction.text = data.Self.Score;
                _this.rank.text = data.Self.Rank == 0 ? "未上榜" : data.Self.Rank;
                _this.setData(data.Top);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                if (XMLHttpRequest.status) {
                    XMLHttpRequest.responseText != "" && (window.location.href = JSON.parse(XMLHttpRequest.responseText).oauthUrl);
                }
                else {
                    window.location.href = window.location.href;
                }
            }
        });
    };
    Ranking.prototype.maskSet = function () {
        this.popMask.graphics.beginFill(0x000000, 0.8);
        this.popMask.graphics.drawRect(0, 0, config.width, config.height);
        this.popMask.graphics.endFill();
        this.popMask.visible = true;
        this.addChild(this.popMask);
    };
    Ranking.prototype.setData = function (data) {
        this.containerList.removeChildren();
        this.containerList.height = 0;
        for (var i = 0; i < data.length; i++) {
            var obj = this.setList({
                count: i + 1,
                avatarUrl: data[i].HeadImage,
                name: data[i].NickName,
                fraction: data[i].Score
            });
            obj.y = this.containerList.height;
            this.containerList.height += obj.height;
            this.containerList.addChild(obj);
        }
    };
    Ranking.prototype.rankingView = function () {
        this.container = new egret.DisplayObjectContainer(); // 主内容容器
        this.container.width = 860;
        this.container.height = 1260;
        this.container.x = 112;
        this.container.y = (config.height - 1260) / 2;
        var bg = new egret.Bitmap(RES.getRes("rankingBg"));
        bg.x = bg.y = 0;
        this.container.addChild(bg);
        this.avatarView({
            container: this.container,
            x: 34,
            y: 28,
            width: 112
        });
        this.scrollView(this.container);
        this.setName(this.container);
        this.setClose(this.container);
        this.setUserData(this.container);
        this.addChild(this.container);
    };
    Ranking.prototype.avatarView = function (data) {
        var avatarBox = new egret.DisplayObjectContainer(); // 头像容器
        avatarBox.width = avatarBox.height = data.width;
        avatarBox.x = data.x;
        avatarBox.y = data.y;
        var avatar = new egret.Bitmap(data.avatarUrl || config.HeadImage);
        avatar.x = avatar.y = 0;
        avatar.width = avatar.height = data.width;
        var circle = new egret.Shape(); // 遮罩层
        circle.graphics.beginFill(0x0000ff);
        circle.graphics.drawCircle(data.width / 2, data.width / 2, data.width / 2);
        circle.graphics.endFill();
        avatar.mask = circle;
        avatarBox.addChild(circle);
        avatarBox.addChild(avatar);
        data.container.addChild(avatarBox);
    };
    Ranking.prototype.setName = function (container) {
        var name = new egret.TextField();
        name.text = config.nickName;
        name.textColor = 0xffffff;
        name.size = 40;
        name.x = 180;
        name.y = 64;
        container.addChild(name);
    };
    Ranking.prototype.setClose = function (container) {
        var _this = this;
        var close = new egret.Bitmap(RES.getRes("rankingClose"));
        close.x = this.container.width - close.width;
        close.y = -122;
        close.touchEnabled = true;
        container.addChild(close);
        close.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.container.visible = _this.visible = false;
        }, this);
    };
    Ranking.prototype.setUserData = function (container) {
        var fraction = new egret.TextField(), // 分数
        rank = new egret.TextField(); // 排名
        fraction.text = "290000";
        rank.text = "未上榜";
        fraction.textColor = rank.textColor = 0xffe064;
        fraction.width = rank.width = 236;
        fraction.size = rank.size = 40;
        fraction.x = 158;
        fraction.y = rank.y = 190;
        rank.x = 570;
        fraction.textAlign = rank.textAlign = "right";
        this.fraction = fraction;
        this.rank = rank;
        container.addChild(fraction);
        container.addChild(rank);
    };
    Ranking.prototype.scrollView = function (container) {
        var scrollView = new egret.ScrollView();
        scrollView.x = 0;
        scrollView.y = 278;
        scrollView.width = 860;
        scrollView.height = 983;
        scrollView.verticalScrollPolicy = "auto";
        container.addChild(scrollView);
        this.containerList.width = 860;
        scrollView.setContent(this.containerList);
    };
    Ranking.prototype.setList = function (data) {
        var _this = this;
        var returnCountName = this.returnCountName(data.count);
        var container = new egret.DisplayObjectContainer();
        container.width = 860;
        container.height = 180;
        container.x = 0;
        var bg = new egret.Shape();
        bg.graphics.beginFill(data.count % 2 == 0 ? 0xf2f7ff : 0xffffff);
        bg.graphics.drawRect(0, 0, 860, 180);
        bg.graphics.endFill();
        container.addChild(bg);
        if (returnCountName) {
            var count = new egret.Bitmap(RES.getRes(returnCountName));
            count.x = 30;
            count.y = 47;
            container.addChild(count);
        }
        else {
            var circle = new egret.Shape();
            circle.graphics.lineStyle(2, 0x003c9a);
            // circle.graphics.beginFill(0x0000ff);
            circle.graphics.drawCircle(64, 90, 32);
            circle.graphics.endFill();
            var id = new egret.TextField();
            id.text = data.count + "";
            id.textColor = 0x003c9a;
            id.size = 46;
            id.x = 32;
            id.y = 69;
            id.width = 64;
            id.textAlign = "center";
            container.addChild(circle);
            container.addChild(id);
        }
        RES.getResByUrl(data.avatarUrl, function (e) {
            _this.avatarView({
                container: container,
                x: 128,
                y: 46,
                width: 90,
                avatarUrl: e
            });
        }, this, RES.ResourceItem.TYPE_IMAGE);
        var name = new egret.TextField();
        name.text = data.name;
        name.textColor = 0x333;
        name.size = 46;
        name.x = 237;
        name.y = 68;
        container.addChild(name);
        var fraction = new egret.TextField();
        fraction.text = data.fraction + "";
        fraction.textColor = 0x333;
        fraction.size = 46;
        fraction.x = 541;
        fraction.y = 73;
        fraction.width = 278;
        fraction.textAlign = "right";
        container.addChild(fraction);
        return container;
    };
    Ranking.prototype.returnCountName = function (count) {
        var a;
        switch (count) {
            case 1:
                a = "rankingOne";
                break;
            case 2:
                a = "rankingTwo";
                break;
            case 3:
                a = "rankingThree";
                break;
            default:
                a = false;
                break;
        }
        return a;
    };
    return Ranking;
}(egret.DisplayObjectContainer));
__reflect(Ranking.prototype, "Ranking");
