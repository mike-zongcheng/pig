interface ListData{
    count: number,// 排名
    avatarUrl: string,// 头像
    name: string,// 姓名
    fraction: number // 分数
}
interface AvatarData{
    container: egret.DisplayObjectContainer,
    x: number,
    y: number,
    width: number,
    avatarUrl?: egret.Texture,// 头像
}
interface ListXmlData{
    HeadImage: string,
    id: number,
    NickName: string,
    Score: number
}


class Ranking extends egret.DisplayObjectContainer {
    visible:boolean = false
    popMask: egret.Shape = new egret.Shape()// 遮罩层
    container: egret.DisplayObjectContainer// 弹框容器
    containerList: egret.DisplayObjectContainer = new egret.DisplayObjectContainer();// 排行列表容器

    fraction: egret.TextField
    rank: egret.TextField
    constructor(public cover){
        super();
        this.init();   
    }
    init() :void{
        this.maskSet();
        this.rankingView();
    }
    show(){// 显示容器 && 接口
        window["jQuery"].ajax({
			type: "get",
			url: xmlConfig.ranking,
			dataType: "json",
			xhrFields: {
				withCredentials: true
			},
			crossDomain: true,
            success: (data)=>{
                this.container.visible = this.visible = true;
                this.fraction.text = data.Self.Score;
                this.rank.text = data.Self.Rank==0?"未上榜":data.Self.Rank;
                this.setData(data.Top)
			},
			error: (XMLHttpRequest, textStatus, errorThrown)=>{
                if(XMLHttpRequest.status){
                    XMLHttpRequest.responseText != "" && (window.location.href = JSON.parse(XMLHttpRequest.responseText).oauthUrl);
                }else{
                    window.location.href = window.location.href;
                }
			}
		});
      
    }
    maskSet(){// 遮罩设置
        this.popMask.graphics.beginFill( 0x000000, 0.8);
        this.popMask.graphics.drawRect( 0, 0, config.width, config.height );
        this.popMask.graphics.endFill();
        this.popMask.visible = true;
        this.addChild(this.popMask);
    }
    setData(data: Array<ListXmlData>){// 写入滚动容器
        this.containerList.removeChildren();
        this.containerList.height = 0;
        for(let i =0; i< data.length; i++){
            let obj = this.setList({
                count: i+1,
                avatarUrl: data[i].HeadImage,
                name: data[i].NickName,
                fraction: data[i].Score
            })
            obj.y = this.containerList.height;
            this.containerList.height += obj.height;
            this.containerList.addChild(obj);
        }
    }
    rankingView(){// 主入口
        this.container = new egret.DisplayObjectContainer()// 主内容容器
        this.container.width = 860;
        this.container.height = 1260;
        this.container.x = 112;
        this.container.y = (config.height-1260)/2;

        let bg: egret.Bitmap = new egret.Bitmap(RES.getRes("rankingBg"));
        bg.x = bg.y = 0;

        this.container.addChild(bg);
        this.avatarView({
            container: this.container,
            x: 34,
            y: 28,
            width: 112
        });

        this.scrollView(this.container)
        this.setName(this.container);
        this.setClose(this.container);
        this.setUserData(this.container);
        this.addChild(this.container);
    }
    avatarView(data: AvatarData) :void{// 头像
        let avatarBox: egret.DisplayObjectContainer = new egret.DisplayObjectContainer()// 头像容器
        avatarBox.width = avatarBox.height = data.width;
        avatarBox.x = data.x;
        avatarBox.y = data.y;
        let avatar: egret.Bitmap = new egret.Bitmap(data.avatarUrl || config.HeadImage);
        avatar.x = avatar.y = 0;
        avatar.width = avatar.height = data.width;

        let circle:egret.Shape = new egret.Shape();// 遮罩层
        circle.graphics.beginFill(0x0000ff);
        circle.graphics.drawCircle(data.width/2, data.width/2, data.width/2);
        circle.graphics.endFill();
        avatar.mask = circle;

        avatarBox.addChild(circle);
        avatarBox.addChild(avatar);
        data.container.addChild(avatarBox);
    }
    setName(container: egret.DisplayObjectContainer): void{// 姓名
        let name:egret.TextField = new egret.TextField();
        name.text = config.nickName;
        name.textColor = 0xffffff;
        name.size = 40;
        name.x = 180;
        name.y = 64;
        container.addChild(name);
    }
    setClose(container: egret.DisplayObjectContainer): void{// 关闭
        let close: egret.Bitmap = new egret.Bitmap(RES.getRes("rankingClose"));
        close.x = this.container.width - close.width;
        close.y = -122;
        close.touchEnabled = true;
        container.addChild(close);
        close.addEventListener(egret.TouchEvent.TOUCH_TAP, ()=>{
            this.container.visible = this.visible = false;
        }, this);
    }
    setUserData(container: egret.DisplayObjectContainer): void{// 个人数据
        let fraction:egret.TextField = new egret.TextField(),// 分数
            rank:egret.TextField = new egret.TextField();// 排名
        fraction.text = "290000";
        rank.text = "未上榜";
        fraction.textColor = rank.textColor = 0xffe064;
        fraction.width = rank.width  = 236;
        fraction.size = rank.size  = 40;
        fraction.x = 158;
        fraction.y = rank.y  = 190;
        rank.x = 570;
        fraction.textAlign = rank.textAlign = "right";
        
        this.fraction = fraction;
        this.rank = rank;
        container.addChild(fraction);
        container.addChild(rank);
    }
    scrollView(container: egret.DisplayObjectContainer) :void{// 滚动容器
        let scrollView:egret.ScrollView = new egret.ScrollView();
        scrollView.x = 0;
        scrollView.y = 278;
        scrollView.width = 860;
        scrollView.height = 983;
        scrollView.verticalScrollPolicy = "auto";
        container.addChild(scrollView);

        this.containerList.width = 860;
        scrollView.setContent(this.containerList);
    }
    setList(data: ListData){// 列表单项
        let returnCountName: string|false = this.returnCountName(data.count);

        let container: egret.DisplayObjectContainer = new egret.DisplayObjectContainer()
        container.width = 860;
        container.height = 180;
        container.x = 0;

        var bg:egret.Shape = new egret.Shape();
        bg.graphics.beginFill( data.count%2==0? 0xf2f7ff: 0xffffff );
        bg.graphics.drawRect(0, 0, 860, 180);
        bg.graphics.endFill();
        container.addChild(bg);
        if(returnCountName){
            let count: egret.Bitmap = new egret.Bitmap(RES.getRes(returnCountName));
            count.x = 30;
            count.y = 47;
            container.addChild(count);
        }else{
            let circle:egret.Shape = new egret.Shape();
            circle.graphics.lineStyle( 2, 0x003c9a );
            // circle.graphics.beginFill(0x0000ff);
            circle.graphics.drawCircle(64, 90, 32);
            circle.graphics.endFill();

            let id:egret.TextField = new egret.TextField();
            id.text = data.count + "";
            id.textColor = 0x003c9a;
            id.size = 46;
            id.x = 32;
            id.y = 69;
            id.width = 64;
            id.textAlign = "center";
            
            container.addChild(circle);
            container.addChild(id);
        }

        
        RES.getResByUrl(data.avatarUrl, (e)=>{
            this.avatarView({
                container: container,
                x: 128,
                y: 46,
                width: 90,
                avatarUrl: e
            });
        }, this, RES.ResourceItem.TYPE_IMAGE );

        let name:egret.TextField = new egret.TextField();
            name.text = data.name;
            name.textColor = 0x333;
            name.size = 46;
            name.x = 237;
            name.y = 68;
        container.addChild(name);

        let fraction:egret.TextField = new egret.TextField();
            fraction.text = data.fraction+"";
            fraction.textColor = 0x333;
            fraction.size = 46;
            fraction.x = 541;
            fraction.y = 73;
            fraction.width = 278;
            fraction.textAlign = "right";
        container.addChild(fraction);

        return container;
    }
    returnCountName(count: number): string|false{// 返回排名所需资源
        let a: string|false;
        switch(count){
            case 1:
                a = "rankingOne";
                break;
            case 2:
                a = "rankingTwo";
                break;
            case 3:
                a = "rankingThree";
                break;
            default :
                a = false;
                break;
        }

        return a;
    }
}
