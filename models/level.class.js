class Level {
    level_end_x = 3360;

    constructor(
        enemies,
        clouds,
        coins,
        bottleBottom,
        backgroundObjects,
        soundManager,
    ) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.coins = coins;
        this.bottleBottom = bottleBottom;
        this.backgroundObjects = backgroundObjects;
        this.soundManager = soundManager;
    }
}
