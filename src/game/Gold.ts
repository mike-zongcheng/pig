class Gold extends egret.DisplayObjectContainer {
    goidTime: number
    goidTime2: number
    random:number
    constructor(public game){
        super();
        this.x = 0
        this.y = 0
    }
    init(status:boolean = false) :void{
        clearTimeout(this.goidTime);
        if(this.game.resetStatus) return;
        let logoStatus = status;
        this.goidTime = setInterval(()=>{
            this.random =  Math.random();
            if(this.random< config.probabilityLogo && !logoStatus){
                this.goldMain();
                this.goidTime2 = setTimeout(()=>{
                    this.init();
                }, 80)
                return;
            }
            this.goldMain();
        }, 160)
    }
    setGoid() :egret.Bitmap|boolean{// 生成金币
        let goid:egret.Bitmap = new egret.Bitmap(RES.getRes("coin")),
            tailChildren = this.game.ground.$children[this.game.ground.$children.length-1],
            distance = tailChildren.width + tailChildren.x - config.width;// 最后一根柱子离屏幕右边的距离
        if( distance < 0 ){
            return false;
        }
        goid.x = config.width;
        goid.y = tailChildren.y - goid.height - 30;
        return goid;
    }
    setLogoGoid() :egret.DisplayObjectContainer|boolean{// 生成logo金币
        let goid:egret.DisplayObjectContainer = new egret.DisplayObjectContainer(),
            tailChildren = this.game.ground.$children[this.game.ground.$children.length-1],
            distance = tailChildren.width + tailChildren.x - config.width;// 最后一根柱子离屏幕右边的距离
        if( distance < 0 ){
            return false;
        }
        
        goid.width = goid.height = 120;
        goid.x = config.width ;
        goid.y = tailChildren.y - goid.height - 30;

        let bg:egret.Bitmap = new egret.Bitmap(RES.getRes("goidLogo" ));
        bg.width = bg.height = 120;
        bg.x = bg.y = 0;

        let logo:egret.Bitmap = new egret.Bitmap(this.game.logo);
        logo.width = logo.height = 96;
        logo.x = logo.y = 12;
        goid.addChild(bg);
        goid.addChild(logo);

        return goid;
    }
    goldMain() :void{// 金币主体
        let goid:egret.DisplayObjectContainer  = (this.random<config.probabilityLogo? this.setLogoGoid(): this.setGoid()) as egret.DisplayObjectContainer;
        if(!goid){
            return;
        }
        let pig = this.game.pig,
            goidBottomLine = goid.y + goid.height;
        this.addChild(goid)
        let tw = egret.Tween.get(goid, {
            loop: false,
            onChange: ()=>{
                let goidRightLine = goid.x + goid.width,
                    pigBottomLine = pig.y + pig.height,
                    xComparing = (goid.x < this.game.pig.rightLine && goid.x > pig.x) || (goidRightLine < this.game.pig.rightLine && goidRightLine > pig.x),
                    yComparing = (goid.y < pigBottomLine && goid.y > pig.y) || (goidBottomLine < pigBottomLine && goidBottomLine > pig.y);
                if( xComparing && yComparing ){
                    this.pigGetGoid(goid)
                }
            }
        } ).to({ x: -goid.width }, goid.constructor ===  egret.Bitmap? 1700: 1780 ).call(()=>{
            this.removeChild(goid);
        })
    }
    pigGetGoid(goid :egret.Bitmap|egret.DisplayObjectContainer){// 吃到金币
        let status = goid.constructor ===  egret.Bitmap,
            bitmapText = new egret.BitmapText();
        
        this.game.home.music.goidMusic();
        bitmapText.font = RES.getRes("font");
        bitmapText.text = status? "10": "50";
        bitmapText.x = goid.x;
        bitmapText.y = goid.y - 80;
        this.addChild( bitmapText );
        this.game.head.setLine(status?10:50);
        egret.Tween.get(bitmapText, {// 金币数字消失
            loop: false
        } ).to({ y: bitmapText.y - 90, alpha: 0 }, 500 ).call(()=>{
            this.removeChild(bitmapText);
        })
        egret.Tween.removeTweens(goid);
        this.removeChild(goid);
    }
}