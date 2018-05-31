var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Home = (function (_super) {
    __extends(Home, _super);
    function Home(data) {
        var _this = _super.call(this) || this;
        _this.resetStart = false;
        _this.musicStatus = true;
        // RES.loadGroup("preload");
        config.logo = data.Logo;
        window.top.document.querySelector("title").innerHTML = data.Title;
        document.querySelector(".loding")["style"].display = "none";
        config.nickName = data.User.NickName;
        RES.getResByUrl(data.User.HeadImage, function (e) {
            config.HeadImage = e;
            _this.game = new Game(_this);
            _this.cover = new Cover(_this);
            _this.init();
        }, _this, RES.ResourceItem.TYPE_IMAGE);
        return _this;
    }
    Home.prototype.init = function () {
        var _this = this;
        this.addChild(this.game);
        this.addChild(this.cover);
        RES.getResByUrl(config.logo, function (e) {
            _this.game.logo = _this.cover.logo = e;
            _this.cover.init();
        }, this, RES.ResourceItem.TYPE_IMAGE);
    };
    Home.prototype.start = function () {
        window["_czc"].push(["_trackEvent", "小猪佩奇", "首页操作", "点击开始游戏"]);
        // this.removeChild(this.cover);
        this.cover.visible = false;
        this.game.visible = true;
        if (this.resetStart) {
            this.game.start();
            return;
        }
        this.resetStart = this.game.init();
    };
    return Home;
}(egret.DisplayObjectContainer));
__reflect(Home.prototype, "Home");
