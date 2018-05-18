var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Music = (function (_super) {
    __extends(Music, _super);
    function Music() {
        var _this = _super.call(this) || this;
        _this.bgm = new egret.Sound();
        _this.jump = new egret.Sound();
        _this.goid = new egret.Sound();
        return _this;
    }
    Music.prototype.init = function (callback) {
        this.jump.load("resource/assets/music/jump.mp3");
        this.goid.load("resource/assets/music/goid.mp3");
        this.bgm.load("resource/assets/music/bgm.mp3");
        this.bgm.addEventListener(egret.Event.COMPLETE, function loadOver(event) {
            callback();
        }, this);
    };
    Music.prototype.startMusic = function () {
        this.bgmSoundChannel && this.bgmSoundChannel.stop();
        this.playMusic(this.bgm, 'bgmSoundChannel');
    };
    Music.prototype.jumpMusic = function () {
        this.jumpSoundChannel && this.jumpSoundChannel.stop();
        this.playMusic(this.jump, 'jumpSoundChannel', 1);
    };
    Music.prototype.goidMusic = function () {
        var _this = this;
        setTimeout(function () {
            _this.goidSoundChannel && _this.goidSoundChannel.stop();
            _this.playMusic(_this.goid, 'goidSoundChannel', 1);
        });
    };
    Music.prototype.stopAll = function () {
    };
    Music.prototype.playMusic = function (sound, SoundChannel, loop) {
        var _this = this;
        if (loop === void 0) { loop = 0; }
        if (!this.home.musicStatus) {
            return;
        }
        if (window.top["WeixinJSBridge"]) {
            window.top["WeixinJSBridge"].invoke('getNetworkType', {}, function (e) {
                if (sound.play)
                    _this[SoundChannel] = sound.play(0, loop);
            });
        }
        else {
            if (sound.play)
                this[SoundChannel] = sound.play(0, loop);
        }
    };
    Music.prototype.resetMusic = function () {
        this.bgmSoundChannel && this.bgmSoundChannel.stop();
        this.goidSoundChannel && this.goidSoundChannel.stop();
        this.jumpSoundChannel && this.jumpSoundChannel.stop();
    };
    return Music;
}(egret.DisplayObjectContainer));
__reflect(Music.prototype, "Music");
