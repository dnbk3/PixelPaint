import { Constants } from "./Constants";

const { ccclass, property } = cc._decorator;

@ccclass
export default class AdsManager extends cc.Component {

  @property(cc.Node)
  private ads: cc.Node = null;

  protected onLoad(): void {

    // this.enablePhysics();

    this.ads.active = false;
  }

  public enablePhysics(): void {
    cc.director.getPhysicsManager().enabled = true;
    cc.director.getCollisionManager().enabled = true;
    cc.director.getPhysicsManager().debugDrawFlags = cc.PhysicsManager.DrawBits.e_aabbBit |
      cc.PhysicsManager.DrawBits.e_jointBit |
      cc.PhysicsManager.DrawBits.e_shapeBit;
    cc.director.getPhysicsManager().debugDrawFlags = 0;
  }

  public enableEventClickEndCard(): void {
    this.ads.active = true;
  }

  public isEnableAds(): boolean {
    return this.ads.active;
  }

  public playAds(): void {
    console.log("playAds");
    window.openStore();
  }
}