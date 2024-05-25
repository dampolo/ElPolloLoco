class World {
    character = new Character();
    level = level1;

    healthStatusBarsBlue = new HealthStatusbars();
    coinStatusbars = new CoinStatusbars();
    bottleStatusbars = new BottleStatusbars();
    bossStatusbars = new BossStatusbars();

    throwableObjects = [];
    canvas;
    ctx;
    keyboard;
    soundManager;
    camera_x = 0;
    splashedBottle = 0;
    botleIsSplashedOnce = true;

    constructor(canvas, keyboard, soundManager) {
        this.ctx = canvas.getContext("2d");
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.soundManager = soundManager;
        this.energy;
        this.run();
        this.draw();
        this.setWorld();
        this.boss = this.level.enemies[this.level.enemies.length - 1];
    }

    /**
     * Plays the main sound with a specified volume if sound is on.
     * If sound is off, pauses both the main sound and the sleep sound.
     */
    playMainSound() {
        if (soundOn) {
            soundManager.playSound("mainSound", 0.3);
        } else {
            soundManager.pauseSound("mainSound");
            soundManager.pauseSound("sleep");
        }
    }

    setWorld() {
        this.character.world = this;
    }

    run() {
        setInterval(() => {
            this.playMainSound();
            this.checkCollisions();
            this.endBossAction();
        }, 1000 / 25);

        setInterval(() => {
            this.checkThrowableObject();
            this.checkBottleInTheGame();
        }, 175);
    }

    checkBottleInTheGame() {
        this.throwableObjects = this.throwableObjects.filter((el) => {
            if (el.y > 480) {
                return false;
            } else {
                return true;
            }
        });
    }

    checkThrowableObject() {
        if (this.character.isDead()) {
            return;
        }

        if (this.keyboard.D) {
            if (this.character.counterBottle > 0) {
                let bottle = new ThrowableObject(
                    this.character.x + 40,
                    this.character.y + 120,
                );

                if (this.throwableObjects.length === 0) {
                    this.throwableObjectsPushToArray(bottle);
                    this.updateBottleStatusBar();
                } else {
                    this.throwableObjects.forEach((el) => {
                        if (el.energy === 0) {
                            this.throwableObjectsPushToArray(bottle);
                            this.updateBottleStatusBar();
                        }
                    });
                }
            }
        }
    }

    throwableObjectsPushToArray(bottle) {
        this.throwableObjects.push(bottle);
        this.splashedBottle++;
        this.character.counterBottle -= 1;
    }

    //Chicken, Chicken-baby
    checkCollisions() {
        if (this.character.isDead()) {
            return;
        }

        //Collision character with enemies.
        this.checkCollisionCharacterWithChicken();

        //Collision bottle with chicken or ground.
        this.checkCollisionBottleWithChickenOrGround();

        //Collision boss with bottle.
        this.checkCollisionBossWithBottle();

        //Assemble coin.
        this.checkCollisionWithCoin();

        //Assemble bottle.
        this.assemblageOfTheBottles();
    }

    /**
     * Check for collisions between the character and enemies (including the boss),
     * and handle the resulting interactions, including hitting enemies, playing sounds,
     * and updating the character's status.
     */

    checkCollisionCharacterWithChicken() {
        this.level.enemies.forEach((enemy) => {
            this.boss.isAttacking = false;
            if (this.character.isColliding(enemy)) {
                soundManager.playSound("chickenDead");
                if (
                    this.character.speedY < 0 &&
                    this.character.isAboveGround()
                ) {
                    if (enemy !== this.boss) {
                        enemy.hit();
                        // Delete chicken and show 1 second.
                        setTimeout(() => {
                            this.deleteChickenAfterCollision(enemy);
                        }, 1000);
                    }
                } else {
                    if (!enemy.isDead()) {
                        this.boss.isAttacking = true;
                        //hit Peppe.
                        this.character.hit();
                    }
                    this.updateCharacterStatusBar();
                }
            }
        });
    }

    /**
     * Check for collisions between throwable bottles and enemies (excluding the boss),
     * and handle the resulting interactions, including hitting enemies and deleting bottles.
     */
    checkCollisionBottleWithChickenOrGround() {
        this.throwableObjects.forEach((bottle) => {
            this.showSplashedBottleOnTheGorund(bottle);
            this.level.enemies.forEach((enemy) => {
                if (enemy !== this.boss) {
                    if (enemy.isColliding(bottle)) {
                        if (!bottle.isDead()) {
                            enemy.hit();
                            this.deleteChickenAfterCollision(enemy);
                            bottle.hit();
                            setTimeout(() => {
                                this.deleteBottleAfterCollision(bottle);
                            }, 200);
                        }
                    }
                }
            });
        });
    }

    /**
     * Checks for collision between the boss and throwable objects (bottles).
     * Reduces the boss's energy if a collision is detected and updates the boss status bar.
     * Deletes the bottle after collision with the boss and removes the boss if its energy reaches 0.
     */
    checkCollisionBossWithBottle() {
        this.throwableObjects.forEach((bottle) => {
            if (this.boss.isColliding(bottle)) {
                if (!bottle.isDead()) {
                    this.boss.hit();
                }
                this.bossStatusbars.setPercentage(this.boss.energy * 4);
                bottle.hit();
                //Delete bottle after collision with boss.
                setTimeout(() => {
                    this.deleteBottleAfterCollision(bottle);
                }, 300);

                if (this.boss.energy === 0) {
                    this.deleteEndbossAfterCollisionWithBottle(this.boss);
                }
            }
        });
    }

    /**
     * Checks for collision between the character and bottles in the level for assemblage.
     * Plays a sound effect and updates the bottle status bar if a collision is detected.
     */
    assemblageOfTheBottles() {
        this.level.bottleBottom.forEach((bottle) => {
            if (this.character !== 0) {
                if (this.character.isColliding(bottle)) {
                    soundManager.playSound("takeBottle");
                    // Delete bottle after assemblage.
                    if (
                        this.character.counterBottle <
                        this.character.maxCounterBottle
                    ) {
                        this.deleteBottleAfterAssemblage(bottle);
                        //Increase bottle counter.
                        this.character.counterBottle += 1;
                        this.updateBottleStatusBar();
                    }
                }
            }
        });
    }

    /**
     * Checks for collision between the character and coins in the level.
     * Plays a sound effect and updates the coin status bar if a collision is detected.
     */
    checkCollisionWithCoin() {
        this.level.coins.forEach((coin) => {
            if (this.character !== 0) {
                if (this.character.isColliding(coin)) {
                    soundManager.playSound("coin");
                    this.deleteCoinAfterCollision(coin);
                    //Increase coint counter.
                    this.character.counterCoint += 1;
                    this.updateCoinStatusBar();
                }
            }
        });
    }

    /**
     * Initiates the end boss action.
     * Calculates the distance between the end boss and the character.
     * Determines the end boss action start based on the character's position.
     * Determines the end boss action direction based on the distance between the end boss and the character.
     */
    endBossAction() {
        const distance = this.boss.x - this.character.x;
        const endPositionFromStart = 3000;
        this.endBossActionStart(endPositionFromStart);
        this.endBossActionDirection(distance);
    }

    /**
     * Initiates end boss action when the character reaches a specified position from the start.
     * Sets a flag indicating that the character has arrived at the specified position.
     * @param {*} endPositionFromStart - The position from the start where the character triggers the end boss action.
     */
    endBossActionStart(endPositionFromStart) {
        if (this.character.x >= endPositionFromStart) {
            this.boss.characterArrived = true;
        }
    }

    /**
     * Determines the direction of end boss action based on the distance from the character.
     * If the distance is greater than or equal to 0, sets the end boss direction to move towards the character.
     * If the distance is less than 0, sets the end boss direction to move away from the character.
     * @param {*} distance - The distance from the character to the end boss.
     */
    endBossActionDirection(distance) {
        if (distance >= 0) {
            this.boss.otherDirection = false;
        } else {
            this.boss.otherDirection = true;
        }
    }

    /**
     * Updates the bottle status bar based on the character's collected bottles.
     * Calculates the percentage of collected bottles relative to the character's maximum bottle capacity.
     * Updates the bottle status bar accordingly.
     */
    updateBottleStatusBar() {
        let allBottle =
            (this.character.counterBottle * 100) /
            this.character.maxCounterBottle;
        this.bottleStatusbars.setPercentage(allBottle);
    }

    /**
     * Updates the coin status bar based on the character's collected coins.
     * Calculates the percentage of collected coins relative to the total number of coins in the level.
     * If there are no coins remaining in the level, sets the percentage to 100.
     * Updates the coin status bar accordingly.
     */
    updateCoinStatusBar() {
        let allCoins =
            (this.character.counterCoint * 100) / this.level.coins.length;
        if (this.level.coins.length === 0) {
            allCoins = 100;
        }
        this.coinStatusbars.setPercentage(allCoins);
    }

    /**
     * Updates the character's status bar based on its energy level.
     * Calculates the percentage of energy remaining relative to the character's maximum energy.
     * Updates the health status bar accordingly.
     */
    updateCharacterStatusBar() {
        this.healthStatusBarsBlue.setPercentage(
            (this.character.energy * 100) / this.character.maxEnergy,
        );
    }

    /**
     * Displays a splashed bottle on the ground if it falls below a certain y-coordinate.
     * @param {*} bottle - The bottle to be displayed.
     */
    showSplashedBottleOnTheGorund(bottle) {
        if (bottle.y > 400) {
            bottle.hit();
            bottle.speedY = 0;
        }
    }

    /**
     * Deletes a chicken enemy from the list of enemies after collision with the character.
     * Show the dead chicken 1000 milliseconds.
     * @param {*} enemy - The chicken enemy to be deleted.
     */
    deleteChickenAfterCollision(enemy) {
        setTimeout(() => {
            this.level.enemies = this.level.enemies.filter((el) => {
                if (el === enemy) {
                    return false; //hier delete.
                } else {
                    return true;
                }
            });
        }, 1000);
    }

    /**
     * Deletes a bottle from the list of throwable objects after collision with the character.
     * @param {*} bottle - The bottle to be deleted.
     */
    deleteBottleAfterCollision(bottle) {
        //Delete bottle after collision with chicken.
        this.throwableObjects = this.throwableObjects.filter((el) => {
            if (el === bottle) {
                return false;
            } else {
                return true;
            }
        });
    }

    /**
     * Deletes a coin from the list of coins after collision with the character.
     * @param {*} coin - The coin to be deleted.
     */
    deleteCoinAfterCollision(coin) {
        this.level.coins = this.level.coins.filter((el) => {
            if (el === coin) {
                return false;
            } else {
                return true;
            }
        });
    }

    /**
     * Deletes the end boss from the list of enemies after collision with a bottle.
     * @param {*} boss - The end boss to be deleted.
     */
    deleteEndbossAfterCollisionWithBottle(boss) {
        setTimeout(() => {
            this.level.enemies = this.level.enemies.filter((el) => {
                if (el === this.boss) {
                    return false;
                } else {
                    return true;
                }
            });
        }, 500);
    }

    /**
     * Deletes a bottle from the list of bottles after it's been collected.
     * @param {*} bottle - The bottle to be deleted.
     */
    deleteBottleAfterAssemblage(bottle) {
        this.level.bottleBottom = this.level.bottleBottom.filter((el) => {
            if (el === bottle) {
                return false;
            } else {
                return true;
            }
        });
    }

    draw() {
        //all delate
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectToMap(this.level.backgroundObjects);
        this.addObjectToMap(this.level.clouds);
        this.addObjectToMap(this.level.enemies);
        this.addObjectToMap(this.level.coins);
        this.addObjectToMap(this.level.bottleBottom);
        this.addObjectToMap(this.throwableObjects);
        this.addToMap(this.character);
        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.healthStatusBarsBlue);
        this.addToMap(this.coinStatusbars);
        this.addToMap(this.bottleStatusbars);
        this.addToMap(this.bossStatusbars);

        //Draw() wird immer wieder aufgerufen.
        self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    addObjectToMap(objects) {
        objects.forEach((o) => {
            this.addToMap(o);
        });
    }

    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }

        mo.draw(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}
