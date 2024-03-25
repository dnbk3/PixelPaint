// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import Game from "./Game";

enum GAME_STATE { }

enum GAME_EVENT { }

export class Constants {
    static game: Game;

    static GAME_STATE = GAME_STATE;
    static GAME_EVENT = GAME_EVENT;
}

