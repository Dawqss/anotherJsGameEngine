export class DeltaTime {
    private lastTime: number = 0;
    private deltaTime: number = 0;
    private currentTime: number = 0;

    public getDeltaTime(): number {
        return this.deltaTime;
    }

    public update() {
        this.currentTime = performance.now();
        this.deltaTime = (this.currentTime - this.lastTime) / 1000;
        this.lastTime = this.currentTime;
    }
}