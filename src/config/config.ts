
var config = {
    logo: "", // logo地址
    moreGame: "http://wx.xiaomaichang.net",// 更多游戏
    complaintsAddress: "http://www.xiaomaichang.net/other/complain",// 投诉网址
    HeadImage: new egret.Texture(),
    nickName: "",
    width: 1080,
    height: 1920,
    pigX: 300,// 小猪佩奇的x轴位置
    pigDeviation: 10, // 佩奇与地面偏差
    initHeight: 288,// 初始地面高度

    jumpHeight: 400,// 跳跃高度
    jumpCount: 2,// 几连跳
    jumpMaxGroundDeviation: 100,// 跳跃高度与地面最大偏差
    jumpGroundDeviation: 250, // 跳跃高度与地面基础偏差

    groundInit: 520, // 地面初始高度
    groundXmax:1006,// 地面最大宽度
    groundXmin:450,// 地面最小宽度
    groundYmax:600,// 地面最大高度
    groundYmin:312,// 地面最小高度

    monsterYmax: 950,// 龙飞行最高点
    monsterYmin: 700,// 龙飞行最低点
    distance: 500,// 龙X轴飞行距离
    dragonShowTime: 2500,// 龙出现间隔时间
    dragonStartTime: 5000,// 龙出现时间

    balloonMax: 254, // 气球飞行高度
    balloonMin: 520, // 气球飞行高度
    balloonX: 200, // 气球飞行X轴

    goidMax: 500, // 最大金币数
    lotteryCount: 5, // 抽奖机会
    lotteryTime: 300, // 抽奖时间
    lotteryAngle: 30, // 礼品旋转角度
    probabilityLogo: 0.1,// logo金币出现几率

    goidUpTurn: 0.7,// 上金币转折点
    goidDownTurn: 0.3,// 下金币转折点
    goidTopPos: 100// 金币抛物线额外高度
} 


