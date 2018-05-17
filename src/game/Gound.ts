interface Pos{
    width: number,
    height: number,
    x?: number,
    y?: number,
    deviation: number
}

class Ground extends egret.DisplayObjectContainer {
    groundPos: Array<Pos> = []

    constructor(public game){
        super();
        this.init();
    }
    init() :void{// 初始化
        let pos: Pos = {
            width: config.width + config.width/ 2,
            height: config.initHeight,
            x: 0,
            y: config.height - config.initHeight,
            deviation: config.jumpGroundDeviation + config.jumpMaxGroundDeviation* Math.random()
        }
        this.game.pig.walkY = this.game.pig.y = config.height - config.initHeight - this.game.pig.height;
        var random = config.jumpGroundDeviation + config.jumpMaxGroundDeviation* Math.random();
        this.randomPos();
        this.groundMain(pos, true);// 地面出现
    }
    randomPos() :Pos{// 返回随机宽高
        let width = config.groundXmin+ (config.groundXmax-config.groundXmin) * Math.random(),
            height = config.groundYmin+ (config.groundYmax-config.groundYmin) * Math.random(),
            a = {
                width,
                height,
                x: config.width,
                y: config.height - height,
                deviation: config.jumpGroundDeviation + config.jumpMaxGroundDeviation* Math.random()
            };
        this.groundPos.length == 2 && this.groundPos.splice(0, 1);
        this.groundPos.push(a);
        return this.groundPos[0];
    }
    setGound(pos: Pos) :egret.DisplayObjectContainer{// 生成地面
        let ground: egret.DisplayObjectContainer = new egret.DisplayObjectContainer();
        ground.width = pos.width;
        ground.height = pos.height;
        ground.x = pos.x;
        ground.y = config.height - pos.height;

        let bg:egret.Shape = new egret.Shape();
        bg.x = bg.y = 0
        bg.graphics.beginFill( 0xa54a38, 1);
        bg.graphics.drawRect( 0, 0, pos.width, pos.height );
        bg.graphics.endFill();

        let bgHead:egret.Bitmap = new egret.Bitmap(RES.getRes("groundHeadBg"));
        bgHead.width = pos.width;
        bgHead.height = 95;
        bgHead.x = bgHead.y = 0;
        bgHead.fillMode = egret.BitmapFillMode.REPEAT

        ground.addChild(bg);
        ground.addChild(bgHead);
        this.addChild(ground)
        return ground;
    }
    groundMain(pos: Pos, init? :boolean) :void{// 地面主程序
        let status: boolean = false,
            ground: egret.DisplayObjectContainer = this.setGound(pos),
            pig = this.game.pig;
        if( this.game.resetStatus ) return;
        let tw = egret.Tween.get(ground, {
            loop: false,
            onChange:()=>{// 碰撞检测 && 当最后一根柱子小于200的空间生成新的柱子
                let rearLine = ground.x + ground.width,
                    xJudgment = ground.x <= pig.rightLine && rearLine > pig.x,
                    pigY = pig.y + pig.height;
                    
                // ground['collisionStatus'] = false;
                if( xJudgment && pigY >= ground.y && pigY <= ground.y + 60 && !pig.overStatus){// 落在地上
                    pig.walkY = pig.y = ground.y - pig.height;
                    // ground['collisionStatus'] = pig.dropStop = true;
                    pig.jumpStatus = false;
                    pig.jumpCount = 0;
                }
                // else if( xJudgment && pigY - 20 > ground.y ){// 判定结束
                //     pig.overStatus = true;
                //     pig.dropStop = false;
                // }
                else if(pig.jumpstatus && pig.dropStop){
                    pig.dropStop = false;
                }
                
                if( status || this.game.resetStatus ) return;
                if(rearLine - config.width <= -pos.deviation ){// 添加新地面
                    this.groundMain(this.randomPos());
                    status = true;
                    return;
                }
            },
            onChangeObj: ground
        } ).to({ x: -pos.width }, 1.481 * (init? pos.width: pos.width + config.width) ).call(()=>{
            this.removeChild(ground);
        })	
        this.game.stopTween && egret.Tween.pauseTweens(ground);
    }
}