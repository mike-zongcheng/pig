class Head extends egret.DisplayObjectContainer {
    schedule :number = 0 // 当前金币数
    scheduleMask :egret.Shape // 进度遮罩
    startText: egret.BitmapText // 当前金币记录
    barrageStatus: boolean = true;
    barrageTime: number
    constructor(public game){
        super();
        this.x = 0;
        this.y = 0;
    }
    init() :void{
        this.avatar();
        this.line();
    }
    avatar() :void{// 头像
        let avatar: egret.DisplayObjectContainer = new egret.DisplayObjectContainer();
        avatar.width = avatar.height = 150;
        avatar.x = 20;
        avatar.y = 36;

        let bg:egret.Shape = new egret.Shape();
        bg.x = bg.y = 0;
        bg.graphics.beginFill( 0x003ea1 );
        bg.graphics.drawCircle( 75, 75, 80);
        bg.graphics.endFill();

        let avatarImg: egret.Bitmap = new egret.Bitmap(config.HeadImage);// 头像图片
        avatarImg.x = avatarImg.y = 4;
        avatarImg.width = avatarImg.height = 142;

        let circle:egret.Shape = new egret.Shape();// 遮罩层
        circle.graphics.beginFill(0x0000ff);
        circle.graphics.drawCircle(75, 75, 71);
        circle.graphics.endFill();
        avatarImg.mask = circle;

        avatar.addChild(bg);
        avatar.addChild(avatarImg);
        avatar.addChild(circle);
        this.addChild(avatar);
    }
    line() :void{// 进度条
        let line: egret.DisplayObjectContainer = new egret.DisplayObjectContainer();
        line.width = 690;
        line.height = 178;
        line.x = 218;
        line.y = 10;
        
        let bg:egret.Shape = new egret.Shape();
        bg.graphics.lineStyle( 2, 0x003ea1 );
        bg.graphics.beginFill( 0xccefff );
        bg.graphics.drawRoundRect( 0, 73, 660, 60, 60);
        bg.graphics.endFill();

        let lineBg:egret.Shape = new egret.Shape();
        lineBg.graphics.beginFill( 0xa2d3ea );
        lineBg.graphics.drawRoundRect( 10, 83, 640, 40, 40);
        lineBg.graphics.endFill();

        let lineImg: egret.Bitmap = new egret.Bitmap(RES.getRes("line"));// 线条图片
        lineImg.x = 10;
        lineImg.y = 83;
        lineImg.width = 640;
        lineImg.height = 40;

        this.scheduleMask = new egret.Shape();
        this.scheduleMask.graphics.beginFill( 0xa54a38, 1);
        this.scheduleMask.graphics.drawRect( 10, 83, 0, 40 );
        this.scheduleMask.graphics.endFill();        
        lineImg.mask = this.scheduleMask;

        let gift: egret.Bitmap = new egret.Bitmap(RES.getRes("gift"));// 礼品图
        gift.x = 599;
        gift.y = 0;
        gift.width = 80;
        gift.height = 100;

        this.startText = new egret.BitmapText();
        this.startText.font = RES.getRes("font");
        this.startText.text = "0";
        this.startText.x = 0;
        this.startText.y = 141;

        let endText = new egret.BitmapText();
        endText.font = RES.getRes("font");
        endText.text = config.goidMax.toString();
        endText.x = 690 - endText.width -28;
        endText.y = 141;

        line.addChild(bg);
        line.addChild(this.startText);
        line.addChild(endText);
        
        line.addChild(lineBg);
        line.addChild(lineImg);
        line.addChild(this.scheduleMask);
        line.addChild(gift);
        this.addChild(line);
    }
    barrage(resName: string) :void{// 弹幕
        let barrage: egret.Bitmap = new egret.Bitmap(RES.getRes(resName));// 弹幕相片
        barrage.x = config.width;
        barrage.y = resName == "barrage1"?400: 800;
        this.addChild(barrage);
        egret.Tween.get(barrage, {
            loop: false
        }).to({ x: -barrage.width }, resName == "barrage1"?8000: 4600).call(()=>{
            if(resName == "barrage1"){
                this.barrageTime = setTimeout(()=>{
                    this.barrage("barrage2");
                }, 3000)
            };
        })
    }
    setLine(goid: number) :void{// 更改进度条
        this.startText.text = this.schedule.toString();
        if( this.schedule > config.goidMax){
            this.schedule += goid;
            this.barrageStatus && (this.barrageStatus = false,this.barrage("barrage1"));
            return;
        }
        this.schedule += goid;
        this.scheduleMask.graphics.clear();
        this.scheduleMask.graphics.beginFill( 0xa54a38, 1);
        this.scheduleMask.graphics.drawRect( 10, 83, 640 * ( this.schedule/ config.goidMax ), 40 );
        this.scheduleMask.graphics.endFill();
    }
}
