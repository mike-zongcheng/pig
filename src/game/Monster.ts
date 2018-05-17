interface CountData{
    pig: egret.DisplayObjectContainer,
    rightLine: number,
    bottomLine: number,
    pigRightLine: number,
    pigBottomLine: number,
}

class Monster extends egret.DisplayObjectContainer {
    dragonTime: number
    collisionStatus: boolean = true
    constructor(public game){
        super();
    }
    init(){
        clearTimeout(this.dragonTime);
        this.dragonTime = setTimeout(()=>{
            this.removeChildren();
            this.setMonster();
        }, config.dragonStartTime)
    }
    setMonster() :void{// 添加龙
        if(this.game.resetStatus) return;
        let monster: egret.DisplayObjectContainer = new egret.DisplayObjectContainer();
        monster.width = 190;
        monster.height = 176;
        monster.x = config.width + 190;
        monster.y = config.height-config.monsterYmax;
        this.addChild(monster);

        let monsterMove:egret.MovieClipDataFactory = new egret.MovieClipDataFactory( RES.getRes("dragon"), RES.getRes("dragon_png") ),
            move:egret.MovieClip = new egret.MovieClip( monsterMove.generateMovieClipData( "run" ) );
        monster.addChild(move);
        move.gotoAndPlay(1, -1);
        this.collisionStatus = true;
        this.monsterTween(monster);
    }
    monsterTween(monster :egret.DisplayObjectContainer) :void{// 龙动画处理
        if(this.game.resetStatus) return;

        egret.Tween.get(monster, {
            loop: false,
            onChange:()=>{
                if(this.game.resetStatus) return;
                if( monster.x <= -monster.width ){// 飞出屏幕外，重新开一只
                    egret.Tween.removeTweens(monster);
                    this.removeChild(monster);
                    this.dragonTime = setTimeout(()=>{
                        this.setMonster();
                    }, config.dragonShowTime)
                    return;
                }
                if(this.collisionStatus && this.detectCollision(monster) ){// 佩奇触碰龙
                    this.collisionStatus = false;
                    if( this.detectStepOn(monster) ){
                        this.dragonOver(monster);
                        return;
                    }
                    this.game.pig.overStatus = true;
                }
            },
            onChangeObj: monster
        }).to({ 
            y: config.height - (config.height-monster.y == config.monsterYmax? config.monsterYmin: config.monsterYmax),
            x: monster.x - config.distance
        }, 700 ).call(()=>{
            this.monsterTween(monster);
        })
    }
    countData(monster: egret.DisplayObjectContainer) :CountData{// 返回佩奇与龙的一些基本数据
        let pig = this.game.pig;
        return {
            pig: pig,
            rightLine: monster.x + monster.width,
            bottomLine: monster.y + monster.height,
            pigRightLine: pig.x + pig.width,
            pigBottomLine: pig.y + pig.height
        }
    }
    detectCollision(monster: egret.DisplayObjectContainer) :boolean{// 判断龙与猪是否碰撞
        if(this.game.resetStatus) return;
        let countData: CountData = this.countData(monster), pig, rightLine, bottomLine, pigRightLine, pigBottomLine;
        ({pig, rightLine, bottomLine, pigRightLine, pigBottomLine} = countData)

        let xJudgment = (monster.x <= pigRightLine && rightLine >= pigRightLine) || (monster.x <= pig.x && rightLine >= pig.x),
            yJudgment = (monster.y <= pigBottomLine && bottomLine >= pigBottomLine) || (monster.y <= pig.y && bottomLine >= pig.y);
        
        if( xJudgment && yJudgment ){
            return true;
        }
        return false;
    }
    detectStepOn(monster: egret.DisplayObjectContainer) :boolean{// 判断是否踩龙头顶
        if(this.game.resetStatus) return;
        let countData: CountData = this.countData(monster), pig, rightLine, bottomLine, pigRightLine, pigBottomLine;
        ({pig, rightLine, bottomLine, pigRightLine, pigBottomLine} = countData);
        
        if( Math.abs(pigBottomLine - monster.y) < 30 ){
            return true;
        }
        return false;
    }
    dragonOver(monster: egret.DisplayObjectContainer) :void{// 龙死亡动画
        if(this.game.resetStatus) return;
        this.game.pig.jumpCount = config.jumpCount -1;
        egret.Tween.removeTweens(monster);
        this.dragonTime = setTimeout(()=>{
            egret.Tween.get(monster, {
                loop: false,
            }).to({ 
                y: config.height + monster.height,
                x: monster.x - 300
            }, 700 ).call(()=>{
                this.removeChild(monster);
                this.dragonTime = setTimeout(()=>{
                    this.setMonster();
                }, config.dragonShowTime)
            })  
        })
    }

}