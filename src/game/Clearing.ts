class Clearing extends egret.DisplayObjectContainer {
    clearingMask :egret.Shape = new egret.Shape()// 遮罩层
    success: egret.DisplayObjectContainer// 成功弹框
    failure: egret.DisplayObjectContainer// 失败弹框

    lotteryWin: egret.DisplayObjectContainer// 抽奖成功
    lotteryLose: egret.DisplayObjectContainer// 抽奖失败

    constructor(public game){
        super();
        this.x = this.y = 0;
        this.width = config.width;
        this.height = config.height;
        this.init();
    }
    init() :void{
        this.clearingMask.graphics.beginFill( 0x000000, 0.8);
        this.clearingMask.graphics.drawRect( 0, 0, config.width, config.height );
        this.clearingMask.graphics.endFill();
        this.clearingMask.visible = false;
        this.addChild(this.clearingMask);

        this.success = this.frame("clearingOkBg");
        this.failure = this.frame("clearingNoBg");

        this.lotteryWin = this.resultFrame({
            title: "lotteryResultWinTitle",
            pig: "winPig",
            text: `您真幸运！\n恭喜获得#元优惠券\n点击以下链接领取\n************************`
        })
        this.lotteryLose = this.resultFrame({
            title: "lotteryResultLoseTitle",
            pig: "losePig",
            text: `没中呐，再接再厉哦！\n换个姿势试试~`
        })
    }
    frame(resName: string) :egret.DisplayObjectContainer{// 基本框架
        let box: egret.DisplayObjectContainer = new egret.DisplayObjectContainer();
        box.width = 840;
        box.height = 1186;
        box.x = 121;
        box.y = (config.height - box.height)/2;
        box.visible = false;

        let bg: egret.Bitmap = new egret.Bitmap(RES.getRes(resName));
        bg.x = bg.y = 0;
        bg.width = 840;
        bg.height = 1185;

        let close: egret.Bitmap = new egret.Bitmap(RES.getRes("close"));
        close.x = 750;
        close.y = -120;
        close.visible = false;
        close.touchEnabled = true;
        close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closePopup, this);

        let stars: egret.DisplayObjectContainer = new egret.DisplayObjectContainer();
        stars.width = 840;
        stars.height = 220;
        stars.x = stars.y = 0;
        box["stars"] = stars;

        box.addChild(bg)
        resName == "clearingOkBg" && box.addChild( this.setButton("clearingBtn1", 135, 670, this.lottery) )
        box.addChild( this.setButton("clearingBtn2", 135, resName == "clearingOkBg"?834: 740, this.game.reset, this.game ) )
        box.addChild( this.setButton("clearingBtn3", 135, resName == "clearingOkBg"?1002: 904, ()=>{
            window.top.location.href = config.moreGame;
        }) )
        let text:{label: egret.TextField, prompt: egret.TextField}  = this.setText(box);
        box["label"] = text.label;
        box["prompt"] = text.prompt;
        box.addChild(stars);
        box.addChild(close);
        this.addChild(box);
        return box;
    }
    setButton(resName: string, x:number, y: number, callbac: Function, scope: any = this) :egret.Bitmap{// 返回按钮
        let button: egret.Bitmap = new egret.Bitmap(RES.getRes(resName));
        button.x = x;
        button.y = y;
        button.touchEnabled = true;
        button.addEventListener(egret.TouchEvent.TOUCH_TAP, callbac, scope);
        return button;
    }
    setText(box: egret.DisplayObjectContainer) :{label: egret.TextField, prompt: egret.TextField}{// 文字
        let label:egret.TextField = new egret.TextField(),
            prompt:egret.TextField = new egret.TextField();

        label.text = "获得30分！";
        label.textColor = prompt.textColor = 0xfffd70;
        label.size = 60;
        label.width = prompt.width = 632;
        label.height = 85;
        label.x = prompt.x = 104;
        label.y = 446;
        label.textAlign = prompt.textAlign = "center";
        label.verticalAlign = prompt.verticalAlign = "center";
 
        prompt.text = "今天还有5次抽奖机会";
        prompt.size = 40;
        prompt.height = 64;
        prompt.y = 542; 

        box.addChild( label );
        box.addChild( prompt );
        return {
            label,
            prompt
        }
    }
    setStar(starNumber: number, box: egret.DisplayObjectContainer) :void{// 添加星星
        box["stars"].removeChildren();
        if(starNumber <= 0){
            return;
        }
        if(starNumber > 3) starNumber = 3;
        for(let i=0; i< starNumber; i++){
            let star: egret.Bitmap = new egret.Bitmap(RES.getRes("star"));
            star.x = 126 + (201*i);
            star.y = 18;
            star.width = 181;
            star.height = 176;
            box["stars"].addChild(star);
        }
    }
    lottery() :void{// 抽奖
        this.failure.visible = this.success.visible = false;
        let gift: egret.Bitmap = new egret.Bitmap(RES.getRes("lotteryGift"));
        gift.anchorOffsetX = gift.width/2;
        gift.anchorOffsetY = gift.height/2;
        gift.x = config.width/2;
        gift.y = config.height/2;

        this.addChild(gift);
        this.lotteryTween(gift, config.lotteryTime, -config.lotteryAngle, true);
            
    }
    lotteryTween(gift: egret.Bitmap, time:number, angle: number, one:boolean = false): void{// 抽奖动画
        egret.Tween.get(gift, {
            loop: false,
        }).to({ 
            rotation: angle
        }, one? time/2: time ).call(()=>{
            if(time <= 100){
                this.removeChild(gift);
                this.lotteryWin.visible = true;
                return;
            }
            this.lotteryTween(gift, time-30, angle<0? config.lotteryAngle: -config.lotteryAngle)
        })
    }
    resultFrame(resName:{title: string, pig: string, text: string}): egret.DisplayObjectContainer{// 抽奖结束框
        let box: egret.DisplayObjectContainer = new egret.DisplayObjectContainer();
        box.width = 842;
        box.height = 1139;
        box.x = 121;
        box.y = (config.height - box.height)/2;
        box.visible = false;

        let bg: egret.Bitmap = new egret.Bitmap(RES.getRes("lotteryResultBg"));
        bg.width = 842;
        bg.height = 801;

        let close: egret.Bitmap = new egret.Bitmap(RES.getRes("lotteryResultClose"));
        close.x = 750;
        close.y = -110;
        close.touchEnabled = true;
        close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closePopup, this);

        let title: egret.Bitmap = new egret.Bitmap(RES.getRes(resName.title));
        title.x = (box.width - title.width)/2;
        title.y = 76;

        let pig: egret.Bitmap = new egret.Bitmap(RES.getRes(resName.pig));
        pig.x = (box.width - pig.width)/2;
        pig.y = 775 - pig.height;

        let text:egret.TextField = new egret.TextField();
        text.text = resName.text;
        text.lineSpacing = 16;
        text.textAlign = "center";
        text.textColor = 0x863500;
        text.size = 46;
        text.width = 842;
        text.x = 0; 
        text.y = 270; 

        box.addChild(bg);
        box.addChild(title);
        box.addChild(close);
        box.addChild(text);
        box.addChild(pig);
        box.addChild( this.setButton("clearingBtn2", 137, 840, this.game.reset, this.game) )
        box.addChild( this.setButton("clearingBtn3", 137, 1009, ()=>{
            window.top.location.href = config.moreGame;
        }) )

        this.addChild(box);
        return box;
    }
    showSuccess(){// 成功弹框
        this.clearingMask.visible = true;
        this.failure.visible = false;
        this.success.visible = true;
        this.success["label"].text = `获得${this.game.head.schedule}分`;
        this.success["prompt"].text = `今天还有${config.lotteryCount}次抽奖机会`;
        this.setStar(Math.floor(this.game.head.schedule/ config.goidMax), this.success)
    }
    showFailure(){// 失败弹框
        this.clearingMask.visible = true;
        this.success.visible = false;
        this.failure.visible = true;
        this.failure["label"].text =  `获得${this.game.head.schedule}分`;
        this.failure["prompt"].text = `需要达到${config.goidMax}分才能抽奖哦`;
        this.setStar(0, this.failure)
    }
    closePopup(){// 关闭弹框
        this.clearingMask.visible = this.lotteryWin.visible = this.lotteryLose.visible = this.success.visible = this.failure.visible = false;
    }
}
