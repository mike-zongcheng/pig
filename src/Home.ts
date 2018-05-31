class Home extends egret.DisplayObjectContainer {
    game: Game
    cover: Cover
    resetStart: boolean = false
    music :Music
    musicStatus: boolean = true
    constructor(data){
        super();
        // RES.loadGroup("preload");
        config.logo = data.Logo;
        window.top.document.querySelector("title").innerHTML = data.Title;
        document.querySelector(".loding")["style"].display = "none";
        config.nickName = data.User.NickName;
        RES.getResByUrl(data.User.HeadImage, (e)=>{
            config.HeadImage = e;
            this.game = new Game(this)
            this.cover = new Cover(this)
            this.init();
        }, this, RES.ResourceItem.TYPE_IMAGE );
    }
    init() :void{
        this.addChild(this.game)
        this.addChild(this.cover)

        RES.getResByUrl(config.logo, (e)=>{// 加载logo 初始化
            this.game.logo = this.cover.logo = e;
            this.cover.init();
        }, this, RES.ResourceItem.TYPE_IMAGE );  
    }
    start() :void{
        window["_czc"].push(["_trackEvent","小猪佩奇","首页操作","点击开始游戏"]);
        // this.removeChild(this.cover);
        this.cover.visible = false;
        this.game.visible = true;
        if(this.resetStart){
            this.game.start();
            return;
        }
        this.resetStart = this.game.init();
    }
}