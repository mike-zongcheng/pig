class Music extends egret.DisplayObjectContainer {
    bgm :egret.Sound = new egret.Sound()
    bgmSoundChannel: egret.SoundChannel

    jump :egret.Sound = new egret.Sound()
    jumpSoundChannel: egret.SoundChannel

    goid :egret.Sound = new egret.Sound()
    goidSoundChannel: egret.SoundChannel

    constructor(public home){
        super();
        this.init();
    }
    init() :void{
        this.bgm.load("resource/assets/music/bgm.mp3");
        this.jump.load("resource/assets/music/jump.mp3");
        this.goid.load("resource/assets/music/goid.mp3");
    }
    startMusic(): void{// BGM音效
        this.bgmSoundChannel && this.bgmSoundChannel.stop();
        this.playMusic(this.bgm, 'bgmSoundChannel');
    }
    jumpMusic(): void{// 跳跃音效
        this.jumpSoundChannel && this.jumpSoundChannel.stop();
        this.playMusic(this.jump, 'jumpSoundChannel', 1);
    }
    goidMusic(): void{// 金币音效
        setTimeout(()=>{
            this.goidSoundChannel && this.goidSoundChannel.stop();
            this.playMusic(this.goid, 'goidSoundChannel', 1);
        })
    }
    stopAll(): void{// 关闭所有音乐
    }
    playMusic(sound: egret.Sound, SoundChannel: string, loop:number = 0): void{// 播放音频
        if(!this.home.musicStatus){
            return;
        }
        if(window.top["WeixinJSBridge"]){
            window.top["WeixinJSBridge"].invoke('getNetworkType', {}, (e)=>{
                if(sound.play) this[SoundChannel] = sound.play(0, loop);
            })
        }else{
            if(sound.play) this[SoundChannel] = sound.play(0, loop);
        }
    }
    resetMusic(): void{// 音频重置
        this.bgmSoundChannel && this.bgmSoundChannel.stop();
        this.goidSoundChannel && this.goidSoundChannel.stop();
        this.jumpSoundChannel && this.jumpSoundChannel.stop();
    }
}