class Game extends egret.DisplayObjectContainer {
    visible:boolean = false
    stopTween: boolean = true
    stopTime: number
    ajaxStatus :boolean = false
    logo: egret.Texture// Logo图片
    pig: Pig = new Pig(this)// 小猪佩奇
    ground: Ground = new Ground(this)// 地面
    gold: Gold = new Gold(this)// 金币
    monster: Monster = new Monster(this)// 怪物
    head: Head = new Head(this)// 怪物
    // clearing: Clearing = new Clearing(this)// 结算界面
    result: Result = new Result(this)// 结束弹框
    balloon: egret.DisplayObjectContainer// 气球
    resetStatus:boolean = false// 是否重置中

    constructor(public home){
        super();
    }
    init() :boolean{// 初始化
        this.backView("pigBg");
        this.addChild(this.ground);
        this.setBalloon();
        this.addChild(this.gold);
        this.addChild(this.pig);
        this.addChild(this.monster);
        this.jumpEvent();
        this.addChild(this.head);
        this.backView("grass");
        this.addChild(this.result);
        // this.addChild(this.clearing);
        
        this.tutorial();
        setTimeout(()=>{this.pig.drop();}, 100)
        return true;
    }
    backView(resName: string): void{// 生成背景图
        let bg:egret.Bitmap = new egret.Bitmap(RES.getRes(resName));
        bg.x = 0;
        bg.y = config.height - bg.height;
        this.addChild(bg);
    }
    tutorial(){// 教程弹框
        if(document.cookie.indexOf("tutorial") != -1){
            this.start();
            return;
        }
        let tutorial:egret.Bitmap = new egret.Bitmap(RES.getRes("gamePrompt"));
        tutorial.width = config.width
        tutorial.height = config.height;
        tutorial.x = tutorial.y = 0;
        tutorial.visible = true;
        tutorial.touchEnabled = true;
        this.addChild(tutorial)
        tutorial.addEventListener(egret.TouchEvent.TOUCH_BEGIN, ()=>{
            let date: Date = new Date();
            date.setDate(date.getDate()+3000);
            document.cookie  = 'tutorial=true;expires=' + date["toGMTString"]();
            this.start();
            tutorial.visible = false;
        }, this);
    }
    setBalloon() :void{// 生成气球
        let balloonBg:egret.Bitmap = new egret.Bitmap(RES.getRes("balloon"));
        balloonBg.x = balloonBg.y = 0;

        let logo:egret.Bitmap = new egret.Bitmap(this.logo);
        logo.width = logo.height = 96;
        logo.x = 10;
        logo.y = 208;

        let balloon: egret.DisplayObjectContainer = new egret.DisplayObjectContainer();
        balloon.width = balloonBg.width;
        balloon.height = balloonBg.height;
        balloon.x = config.balloonX;
        balloon.y = config.balloonMin;

        balloon.addChild(balloonBg);
        balloon.addChild(logo);
        this.addChild(balloon);
        // this.balloonTween(balloon);
        this.balloon = balloon;
    }
    balloonTween(balloon: egret.DisplayObjectContainer) :void{// 气球动画
        egret.Tween.get(balloon, {
            loop: false
        }).to({ y: balloon.y == config.balloonMax?config.balloonMin: config.balloonMax  }, 1700 ).call(()=>{
            this.balloonTween(balloon);
        })
    }
    jumpEvent() :void{// 生成单击遮罩层
        let click:egret.Shape = new egret.Shape();
        click.x = click.y = 0;
        click.graphics.beginFill( 0x257602, 0);
        click.graphics.drawRect( 0, 0, config.width, config.height );
        click.graphics.endFill();
        click.touchEnabled = true;
        this.addChild(click);

        click.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.pig.jump, this.pig);
    }
    isDrop(shp: egret.Shape) :boolean{// 判断单个地面和佩奇是否碰撞
        let rearLine = shp.x + shp.width,
            xJudgment = shp.x <= this.pig.rightLine && rearLine > this.pig.x,
            pigY = this.pig.y + this.pig.height;
            
        if( xJudgment && pigY >= shp.y && pigY <= shp.y + 60 ){// 落在地上
            return true;
        }
        return false;
    }
    isDrops() :boolean{// 循环判断地面
        let grounds = this.ground.$children;
        for(let i = 0; i< grounds.length; i++){
            if( this.isDrop( grounds[i] as egret.Shape ) ){
                return true;
            }
        }
        return false;
    }
    upData(count:number=1){// 上传结束数据
        if(count > config.upDataMaxNumber){
            return;
        }
        window["jQuery"].ajax({ // 请求基础数据
            type: "post",
            url: xmlConfig.over,
            contentType: "application/json",
            dataType: "json",
            data:JSON.stringify({
                Score: this.head.schedule
            }),
            xhrFields: {
                withCredentials: true
            },
            success: (res)=>{
                this.ajaxStatus = false;
            },
            error:()=>{
                this.upData(count+1);
            }
        });
    }
    gameOver() :void{// 游戏结束处理函数
        this.head.startText.text = this.head.schedule + "";
        setTimeout(()=>{
            this.resetStatus = true;
            this.result.show();
            // if(this.head.schedule >= config.goidMax){
            //     this.clearing.showSuccess();
            // }else{
            //     this.clearing.showFailure();
            // }
        }, 1000)
        if(this.ajaxStatus){
            return;
        }
        this.ajaxStatus = true;
        this.upData();
    }
    start() :void{// 游戏开始
        clearInterval(this.stopTime);
        this.home.music.startMusic();
        this.visible = true;
        this.stopTween = false;
        egret.Tween.resumeTweens(this.ground.$children[0]);
        this.pig.move.gotoAndPlay(1, -1);
        this.pig.y = config.height - config.initHeight - this.pig.height;
        this.gold.init();
        this.monster.init();
        this.balloon.y = config.balloonMin;
        this.balloonTween(this.balloon);
        this.head.schedule = 0;
        this.head.removeChildren();
        this.head.init();
    }
    stopTimeout() :void{
        clearTimeout(this.gold.goidTime);
        clearTimeout(this.gold.goidTime2);
        clearTimeout(this.monster.dragonTime);
        clearTimeout(this.head.barrageTime);
    }
    reset() :void{// 重置
        this.home.music.resetMusic();
        this.stopTween = this.resetStatus = true;
        this.stopTime = setInterval(()=>{
            this.stopTimeout();
        }, 40)
        
        egret.Tween.removeAllTweens();
        this.ground.removeChildren();
        this.monster.removeChildren();
        this.gold.removeChildren();
        this.head.removeChildren();

        this.pig.overStatus = false;
        this.pig.isRepeat = true;
        this.pig.x = config.pigX;
        this.resetStatus = false;
        this.head.barrageStatus = true;

        this.ground.init();
        setTimeout(()=>{
            this.monster.init();
        }, config.dragonStartTime)
        this.gold.init();

        this.pig.drop();
        
        this.result.hide();
        // this.clearing.closePopup();

        this.home.cover.visible = true;
        this.home.cover.startTween();
        this.visible = false;
        this.head.schedule = 0;
        
    }
}