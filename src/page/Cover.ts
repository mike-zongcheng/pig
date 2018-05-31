class Cover extends egret.DisplayObjectContainer {
    logo: egret.Texture// Logo图片
    startBtn: egret.Bitmap// 开始按钮
    activity: Activity//  = new Activity(this)
    ranking: Ranking = new Ranking(this);

    constructor(public home){
        super();
    }
    init() :void{
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

        RES.getResByUrl(config.logo, this.printLogo, this, RES.ResourceItem.TYPE_IMAGE );  

    }
    backView(): void{// 背景图
        let bg:egret.Bitmap = new egret.Bitmap(RES.getRes("startCover"));
        bg.width = config.width
        bg.height = config.height;
        bg.x = bg.y = 0;
        this.addChild(bg);
    }
    complaints() :void{// 投诉按钮
        let complaints:egret.Bitmap = new egret.Bitmap(RES.getRes("complaints"));
        complaints.x = 30;
        complaints.y = config.height * 0.015;
        complaints.touchEnabled = true;
        complaints.addEventListener(egret.TouchEvent.TOUCH_TAP, ()=>{
            window.top.location.href = config.complaintsAddress;
        }, this);
        this.addChild(complaints);

    }
    activityView() :void{// 活动说明
       let activity:egret.Bitmap = new egret.Bitmap(RES.getRes("activity"));
        activity.x = 702;
        activity.y = config.height * 0.018;
        activity.touchEnabled = true;
        activity.addEventListener(egret.TouchEvent.TOUCH_TAP, ()=>{
            this.activity.visible = this.activity.activity.visible = this.activity.popMask.visible = true;
        }, this);
        this.addChild(activity); 
    }
    rankingView() :void{// 排行榜
       let activity:egret.Bitmap = new egret.Bitmap(RES.getRes("leaderboard"));
        activity.x = 730;
        activity.y = config.height * 0.018;
        activity.touchEnabled = true;
        activity.addEventListener(egret.TouchEvent.TOUCH_TAP, ()=>{
            window["_czc"].push(["_trackEvent","小猪佩奇","首页操作","点击排行榜"]);
            this.ranking.show();
        }, this);
        this.addChild(activity); 
    }
    more() :void{// 更多游戏
        let more:egret.Bitmap = new egret.Bitmap(RES.getRes("more"));
        more.x = 910;
        more.y = config.height * 0.018;
        more.touchEnabled = true;
        this.addChild(more); 

        more.addEventListener(egret.TouchEvent.TOUCH_TAP, ()=>{
            window["_czc"].push(["_trackEvent","小猪佩奇","首页操作","点击更多游戏"]);
            window.top.location.href = config.moreGame;
        }, this);
    }
    gameNumber() :void{// 游戏人数
        let number:egret.TextField = new egret.TextField();
        number.text = "已有5000人参加了挑战";
        number.lineSpacing = 70;
        number.textAlign = "center";
        number.textColor = 0xfefefe;
        number.size = 40;
        number.width = 600;
        number.height = 70;
        number.x = 243; 
        number.y = config.height *0.522;
        this.addChild(number);
    }
    startView() :void{// 开始按钮
        this.startBtn = new egret.Bitmap(RES.getRes("startBtn"));
        this.startBtn.anchorOffsetX = this.startBtn.width/2;
        this.startBtn.anchorOffsetY = this.startBtn.height/2;
        this.startBtn.x = 241 + this.startBtn.width/2;
        this.startBtn.y = config.height *0.598;
        this.startBtn.touchEnabled = true;
        
        this.startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.home.start, this.home);
        this.addChild(this.startBtn);
        this.startTween();
    }
    startTween() :void{// 开始按钮动画
        let aims = this.startBtn.scaleX == 1? 1.1: 1;
        egret.Tween.get(this.startBtn, {
            loop: false
        }).to({ scaleX: aims, scaleY: aims }, 600 ).call(()=>{
            this.startTween();
        })
    }
    printLogo(e:egret.Texture) :void{// logo
        let logo:egret.Bitmap = new egret.Bitmap(e);
        logo.x = (config.width - logo.width) /2;
        logo.y = config.height * 0.682;
        this.addChildAt(logo, 2);
    }
    musicBut(){// 音乐按钮
        let musicBtn = new egret.Bitmap(RES.getRes("musicOn")),
            musicBtn2 = new egret.Bitmap(RES.getRes("musicOff"));
        musicBtn.x = musicBtn2.x = config.width * 0.85;
        musicBtn.y = musicBtn2.y = config.height * 0.1;
        musicBtn.touchEnabled = musicBtn2.touchEnabled = true;
        musicBtn2.visible = false;
        musicBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, ()=>{// 不播放
            window["_czc"].push(["_trackEvent","小猪佩奇","首页操作","关闭音乐"]);
            this.home.musicStatus = false;
            musicBtn2.visible = true;
            musicBtn.visible = false;
        }, this);
        musicBtn2.addEventListener(egret.TouchEvent.TOUCH_TAP, ()=>{// 播放
            window["_czc"].push(["_trackEvent","小猪佩奇","首页操作","打开音乐"]);
            this.home.musicStatus = true;
            musicBtn2.visible = false;
            musicBtn.visible = true;
        }, this);
        this.addChild(musicBtn);
        this.addChild(musicBtn2);
    }
}