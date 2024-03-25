// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import { Constants } from "../Managers/Constants";
import SoundManager from "../Managers/SoundManager";
import Item from "./Item";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Items extends cc.Component {

    @property([Item]) items: Item[] = [];
    @property(cc.Node) hand: cc.Node = null;
    @property(cc.Node) bg: cc.Node = null;
    @property(cc.Node) title: cc.Node = null;
    @property(cc.Node) colorPicker: cc.Node = null;


    private curIndex: number = -1;
    private timeLoop: number = 500;
    private tween: cc.Tween = null;
    private scaleHandDefault: number = 1;
    private itemSelected: Item = null;

    private isDoneState1: boolean = false;
    private posHand: cc.Vec3[] = [
        cc.v3(-90, -200, 0),
        cc.v3(400, -200, 0),
        cc.v3(-90, -750, 0),
        cc.v3(400, -750, 0)
    ];

    protected onLoad(): void {
        cc.view.setResizeCallback(() => {
            this.resize();
        });
    }

    protected start(): void {
        this.resize();

        this.scaleHandDefault = this.hand.scale;
        this.playItemAnimation()

        this.items.forEach((item, index) => {
            item.node.on(cc.Node.EventType.TOUCH_START, () => {
                this.onItemClick(item);
            });
        });

        this.colorPicker.active = false;
    }

    onItemClick(item: Item) {

        Constants.game.soundManager.PlayClip(0);
        this.hand.active = false;
        this.items.forEach((item) => {
            item.node.off(cc.Node.EventType.TOUCH_START);
            item.node.active = false;
        });

        this.itemSelected = item;
        this.itemSelected.node.active = true;

        this.stopItemAnimation();

        cc.tween(this.itemSelected.node)
            .to(0.3, { position: cc.v3(0, 0, 0) }, { easing: 'sineOut' })
            .start();

        this.bg.color = cc.color(255, 255, 255, 255);
        this.title.active = false;
        this.itemSelected.bg.active = false;

        cc.tween(this.itemSelected.body)
            .to(0.3, { scale: 1.5 })
            .call(() => {
                const vector = this.itemSelected.posTarget.position.sub(this.itemSelected.body.position);
                const anchorx = (vector.x / this.itemSelected.body.width) * 0.5 + 0.5;
                const anchory = (vector.y / this.itemSelected.body.height) * 0.5 + 0.5;
                cc.tween(this.itemSelected.body)
                    .to(0.8, {})
                    .call(() => {
                        cc.tween(this.itemSelected.body)
                            .to(0.3, {
                                scale: 3,
                                opacity: 0,
                                anchorX: anchorx,
                                anchorY: anchory,
                            })
                            .start();

                        this.itemSelected.pixel.active = true;
                        this.itemSelected.pixel.opacity = 0;
                        cc.tween(this.itemSelected.pixel)
                            .to(0.3, { opacity: 255 })
                            .call(() => {
                                this.colorPicker.active = true;
                                Constants.game.adsManager.enableEventClickEndCard();
                            })
                            .start();
                    })
                    .start();

            })
            .start();
    }

    playItemAnimation() {
        if (this.isDoneState1) return;
        this.curIndex = (this.curIndex + 1) % 4;
        this.tween = cc.tween(this.hand)
            .to(0.2, { position: this.posHand[this.curIndex] })
            .to(0.1, {})
            .call(() => {
                this.items[this.curIndex].showAnimation();
            })
            .to(0.2, { scale: this.scaleHandDefault - 0.1, position: this.posHand[this.curIndex].add(cc.v3(-10, 10, 0)) })
            .to(0.2, { scale: this.scaleHandDefault, position: this.posHand[this.curIndex] })
            .call(() => {
                setTimeout(() => {
                    this.playItemAnimation();
                }, this.timeLoop);
            })
            .start();
    }

    stopItemAnimation() {
        this.tween.stop();
        this.itemSelected.stopAnimation();
        this.hand.scale = this.scaleHandDefault;
        this.isDoneState1 = true;
    }

    resize() {
        const deviceResolution = cc.view.getFrameSize();
        if (deviceResolution.width < deviceResolution.height) {
            this.items.forEach((item) => {
                item.pixel.scale = item.targetScale1;
            });
        }
        else {
            this.items.forEach((item) => {
                item.pixel.scale = item.targetScale2;
            });
        }
    }
}
