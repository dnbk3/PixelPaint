// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class Item extends cc.Component {

    private animation: cc.Animation = null;
    @property(cc.Node) bg: cc.Node = null;
    @property(cc.Node) pixel: cc.Node = null;
    @property(cc.Node) posTarget: cc.Node = null;
    @property(cc.Node) body: cc.Node = null;
    @property(Number) targetScale1: number = 1;
    @property(Number) targetScale2: number = 1;
    @property(cc.Node) outLine: cc.Node = null;

    protected onLoad(): void {
        this.animation = this.getComponent(cc.Animation) as cc.Animation;
        this.pixel.active = false;
    }

    showAnimation() {
        this.animation.play("Item");
    }

    stopAnimation() {
        this.animation.stop("Item");
        this.outLine.active = false;
    }
}
