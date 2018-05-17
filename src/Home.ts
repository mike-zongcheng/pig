class Home extends egret.DisplayObjectContainer {
    game: Game
    cover: Cover
    resetStart: boolean = false
    music = new Music(this)
    musicStatus: boolean = true
    constructor(){
        super();
        // RES.loadGroup("preload");
        window["jQuery"].ajax({ // 请求基础数据
            type: "get",
            url: xmlConfig.init,
            dataType: "json",
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            success: (data)=>{
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
            },
            error: (XMLHttpRequest, textStatus, errorThrown)=>{
                XMLHttpRequest.responseText != "" && (window.location.href = JSON.parse(XMLHttpRequest.responseText).oauthUrl);
            }
        });
        
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