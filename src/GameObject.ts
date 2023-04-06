export class GameObject {
    width: number;
    height: number;
    positionX: number;
    positionY: number;

    // how to render it?
    // should probably return some config on end and then merge it with other configs
    // I should have here stable object or unstable objects information to check if I can somehow interact with object

    // dependecy loop idea:
    // 1. create information data about stable or unstable object and pass it to gameObjects that can move
    // (with Handlers or maybe just class Character withc will be loaded on other endpoint)
    // 2. create calculation on character and create some data information from it
    // 3. pass it to unstable object so we can interact with them (eg fire torch, little grass movement etc)
    // 4. render all things from gameObjects or/and character object

    getRenderConfig(): any {

    }
}
