// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import State1 from "../ObjectScripts/State1";
import State2 from "../ObjectScripts/State2";
import AdsManager from "./AdsManager";
import { Constants } from "./Constants";
import SoundManager from "./SoundManager";
import UIManager from "./UIManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Game extends cc.Component {

    @property(SoundManager) soundManager: SoundManager = null;
    @property(UIManager) uiManager: UIManager = null;
    @property(AdsManager) adsManager: AdsManager = null;

    @property(State1) state1: State1 = null;
    @property(State2) state2: State2 = null;


    __preload() {
        Constants.game = this;
    }

    protected onLoad(): void {
    }

    protected start(): void {
    }

}
