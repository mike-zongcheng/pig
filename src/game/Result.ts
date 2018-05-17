class Result extends egret.DisplayObjectContainer {
    visible: boolean = false
    popMask: egret.Shape = new egret.Shape()// 遮罩层
    container: egret.DisplayObjectContainer// 弹框容器
    fraction: egret.TextField
    constructor(public game){
        super();
        this.init();
    }
    init() :void{
        this.maskSet();
        this.resultView();
    }
    maskSet(): void{// 遮罩
        this.popMask.graphics.beginFill( 0x000000, 0.8);
        this.popMask.graphics.drawRect( 0, 0, config.width, config.height );
        this.popMask.graphics.endFill();
        this.popMask.visible = false;
        this.addChild(this.popMask);
    }
    show(): void{// 显示结算
        this.fraction.text = `获得${this.game.head.schedule}分`;
        this.popMask.visible = this.visible = true;
    }
    hide(): void{// 隐藏结算
        this.popMask.visible = this.visible = false;
    }
    resultView(): void{// 主入口
        this.container = new egret.DisplayObjectContainer()// 主内容容器
        this.container.width = 840;
        this.container.height = 1026;
        this.container.x = 120;
        this.container.y = (config.height-1026)/2;

        let bg: egret.Bitmap = new egret.Bitmap(RES.getRes("resultBg"));
        bg.width = 840;
        bg.height = 1026;
        bg.x = bg.y = 0;
        this.container.addChild(bg);

        this.avatarView(this.container);
        this.setName(this.container);
        this.setFraction(this.container);
        this.renewGame(this.container);
        this.moreGame(this.container);

        this.addChild(this.container);
    }
    avatarView(container: egret.DisplayObjectContainer) :void{// 头像
        let avatarBox: egret.DisplayObjectContainer = new egret.DisplayObjectContainer()// 头像容器
        avatarBox.width = avatarBox.height = 232;
        avatarBox.x = 304;
        avatarBox.y = 64;

        let avatar: egret.Bitmap = new egret.Bitmap(config.HeadImage);
        avatar.x = avatar.y = 0;
        avatar.width = avatar.height = 232;

        let circle:egret.Shape = new egret.Shape();// 遮罩层
        circle.graphics.beginFill(0x0000ff);
        circle.graphics.drawCircle(116, 116, 116);
        circle.graphics.endFill();
        avatar.mask = circle;

        avatarBox.addChild(circle);
        avatarBox.addChild(avatar);
        container.addChild(avatarBox);
    }
    setName(container: egret.DisplayObjectContainer): void{// 姓名
        let name: egret.TextField = new egret.TextField();
        name.text = config.nickName;
        name.textColor = 0xffffff;
        name.size = 48;
        name.x = 0;
        name.y = 330;
        name.width = 840;
        name.textAlign = "center";
        container.addChild(name);
    }
    setFraction(container: egret.DisplayObjectContainer): void{// 分数
        let fraction: egret.TextField = new egret.TextField();
        fraction.text = `获得0分`;
        fraction.width = 632;
        fraction.size = 60;
        fraction.textColor = 0xfffd70;
        fraction.textAlign = "center";
        fraction.x = 104;
        fraction.y = 496;
        this.fraction = fraction;
        container.addChild(fraction);
    }
    renewGame(container: egret.DisplayObjectContainer): void{// 再玩一次
        let button: egret.Bitmap = new egret.Bitmap(RES.getRes('clearingBtn2'));
        button.x = 137;
        button.y = 675;
        button.touchEnabled = true;
        button.addEventListener(egret.TouchEvent.TOUCH_TAP, this.game.reset, this.game);
        container.addChild(button);
    }
    moreGame(container: egret.DisplayObjectContainer){// 更多游戏
        let button: egret.Bitmap = new egret.Bitmap(RES.getRes('clearingBtn3'));
        button.x = 137;
        button.y = 844;
        button.touchEnabled = true;
        button.addEventListener(egret.TouchEvent.TOUCH_TAP, ()=>{
            window.top.location.href = config.moreGame;
        }, this);
        container.addChild(button);
    }
}
