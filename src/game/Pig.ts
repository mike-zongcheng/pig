class Pig extends egret.DisplayObjectContainer {
    walkY: number = 0
    dropStop: boolean = true // 是否停止掉落
    jumpCount: number = 0// 当前跳跃次数
    overStatus: boolean = false // 当true时必输，无法逆转
    jumpStatus: boolean = false // 是否跳跃状态
    isRepeat: boolean  = true// 防止重复进死亡函数
    dropTime: number
    overRunStatus:  boolean = false // over函数是否运行了
    rightLine: number// 猪右线
    move:egret.MovieClip
    constructor(public game){
        super();
        this.init();
    }
    init() :void{// 生成佩奇
        this.x = config.pigX;
        this.y = config.height-config.groundInit;
        this.width = 51;
        this.rightLine= this.x + this.width + config.pigDeviation;

        let pig:egret.MovieClipDataFactory = new egret.MovieClipDataFactory( RES.getRes("pig"), RES.getRes("pig_png") );
        this.move = new egret.MovieClip( pig.generateMovieClipData( "run" ) );
        this.addChild(this.move);
        // move.gotoAndPlay(1, -1);
        
    }
    jump() :void{// 跳跃
        if(this.jumpCount >= config.jumpCount || this.overStatus){
            return;
        }
        this.game.home.music.jumpMusic();
        // if( Math.abs(this.walkY - this.y) > 40 && this.jumpCount == 0 ){// 当从两块柱子间掉落，不允许跳跃 && this.isOver() 
        //     return;
        // }
        this.jumpCount += 1;
        egret.Tween.removeTweens(this);
        this.jumpStatus = this.dropStop = true;

        egret.Tween.get(this, {
            loop: false
        }).to({ y: this.y - config.jumpHeight }, 400, egret.Ease.sineOut ).call(()=>{
            this.dropStop = false;
        })
    }
    drop() :void{// 时刻掉落
        this.overRunStatus = false;
        clearTimeout(this.dropTime);
        this.dropTime = setInterval(()=>{
            if( !this.overStatus && (this.game.isDrops() || this.dropStop|| this.game.stopTween) ){
                this.dropStop = false;
                return;
            }
            // this.isRepeat && this.overStatus && (this.isRepeat = false, this.over());
            if( this.overStatus && (  this.isRepeat || (Math.abs(this.walkY - this.y) > 6 && this.jumpCount == 0) ) ){// 从两根柱子之间掉落死亡
                this.over();
                this.overStatus = true;
                this.isRepeat = false;
            }
            let aims = this.y + config.height*(config.height>1920?0.01:0.008);
            if(aims >= config.height){// 掉落死亡
                this.overStatus = true;
                this.y = config.height;
                !this.overRunStatus && this.isRepeat && this.over();
                clearInterval(this.dropTime);
                return;
            }
            this.y = aims;
        }, 6)
    }
    isOver() :boolean{// 判断是否在两个柱子中间 暂停使用
        let gound: egret.DisplayObjectContainer = this.game.ground,
            status: boolean = true;
        gound.$children.map((todo: egret.Shape, i: number)=>{
            if(todo["collisionStatus"]) status = false;
        })
        return status;
    }
    over() :void{// 死亡动画
        console.log("进入死亡");
        this.game.resetStatus = true;
        this.overRunStatus = true;
        let end = config.height + this.height;

        clearTimeout(this.game.gold.goidTime);
        clearTimeout(this.game.monster.dragonTime);

        this.game.monster.$children.map((todo, i)=>{
            todo.$children[0].stop();
        })

        egret.Tween.removeAllTweens();
        this.game.gameOver();
        // egret.Tween.removeTweens(this);
        // setTimeout(()=>{
        //     egret.Tween.get(this, {
        //         loop: false
        //     }).to({ x: -this.width }, this.x * 1.2 ).call(()=>{
        //         
        //     }) 
        // })
    }
}