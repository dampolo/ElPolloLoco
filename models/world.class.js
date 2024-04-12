class World {
  character = new Character();
  healthStatusBarsBlue = new HealthStatusbars();
  coinStatusbars = new CoinStatusbars();
  bottleStatusbars = new BottleStatusbars();
  bossStatusbars = new BossStatusbars();

  throwableObjects = [];
  level = level1;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.energy;
    this.draw();
    this.setWorld();
    this.run();
    //Czemu to jes tu.
    this.boss = this.level.enemies[this.level.enemies.length - 1];
  }

  setWorld() {
    this.character.world = this;
  }

  run() {
    setInterval(() => {
      this.checkCollisions();
      this.endBossAction();
      // this.ThrowableObject();
    }, 1000 / 25);

    setInterval(() => {
      // this.checkCollisions();
      this.checkThrowableObject();
      this.checkBottleInTheGame();
    }, 20);
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
    //Tu rzucam flaszki

    if (this.character.isDead()) {
      return;
    }
    if (this.keyboard.D) {
      if (this.throwableObjects.length === 0) {
        if (this.character.counterBottle > 0) {
          let bottle = new ThrowableObject(
            this.character.x + 40,
            this.character.y + 120
          );
          this.throwableObjects.push(bottle);
          this.character.counterBottle -= 1;
          this.updateBottleStatusBar();
        }
      }
    }
  }

  //Chicken, Chicken-baby
  checkCollisions() {
    if (this.character.isDead()) {
      return;
    }
    this.level.enemies.forEach((enemy) => {
      if (this.character !== 0) {
        if (this.character.isColliding(enemy)) {
          if (this.character.speedY < 0 && this.character.isAboveGround()) {
            enemy.hit();
            // wypierdala kurczaki z planszy i pokazuje trupa przez sekunde.
            setTimeout(() => {
              this.level.enemies = this.level.enemies.filter((el) => {
                if (el === enemy) {
                  return false;
                } else {
                  return true;
                }
              });
            }, 1000);
          } else {
            if (!enemy.isDead()) {
              this.character.hit();
            }
            this.healthStatusBarsBlue.setPercentage(this.character.energy);
          }
        }
      }
    });

    this.throwableObjects.forEach((bottle) => {
      this.level.enemies.forEach((enemy) => {
        if (enemy.isColliding(bottle)) {
          //tu usuwam trafione kury
          this.level.enemies = this.level.enemies.filter((el) => {
            if (el === enemy) {
              return false; //tu usuwa
            } else {
              return true;
            }
          });

          bottle.hit();

          //Wypierdala flaszki z planszy po rzuceniu na bossa.
          setTimeout(() => {
            this.throwableObjects = this.throwableObjects.filter((el) => {
              if (el === bottle) {
                return false;
              } else {
                return true;
              }
            });
          }, 1000);
        }
      });
    });

    //Endboss
    this.throwableObjects.forEach((bottle) => {
      if (this.boss.isColliding(bottle)) {
        if (!bottle.isDead()) {
          this.boss.hit();
        }

        this.bossStatusbars.setPercentage(this.boss.energy * 4);

        bottle.hit();

        //Wypierdala flaszki z planszy po rzuceniu na bossa.
        setTimeout(() => {
          this.throwableObjects = this.throwableObjects.filter((el) => {
            if (el === bottle) {
              return false;
            } else {
              return true;
            }
          });
        }, 1000);

        if (this.boss.energy === 0) {
          setTimeout(() => {
            //Wypierdala bossa z planszy
            this.level.enemies = this.level.enemies.filter((el) => {
              if (el === this.boss) {
                return false;
              } else {
                return true;
              }
            });
          }, 500);
        }
      }
    });

    //Coins
    this.level.coins.forEach((coin) => {
      if (this.character !== 0) {
        if (this.character.isColliding(coin)) {
          // wypierdala monety z planszy
          this.level.coins = this.level.coins.filter((el) => {
            if (el === coin) {
              return false;
            } else {
              return true;
            }
          });
          //zwiekszamy lisc zebranych montet
          this.character.counterCoint += 1;
          let allCoins =
            (this.character.counterCoint * 100) / this.level.coins.length;
          if (this.level.coins.length === 0) {
            allCoins = 100;
          }
          this.coinStatusbars.setPercentage(allCoins);
        }
      }
    });

    this.level.bottleBottom.forEach((bottle) => {
      if (this.character !== 0) {
        if (this.character.isColliding(bottle)) {
          // Wypierdala flaszki z planszy po zebraniu
          if (this.character.counterBottle < this.character.maxCounterBottle) {
            this.level.bottleBottom = this.level.bottleBottom.filter((el) => {
              if (el === bottle) {
                return false;
              } else {
                return true;
              }
            });

            //Zwiekszamy lisc zebranych butelek
            this.character.counterBottle += 1;
            this.updateBottleStatusBar();
          }
        }
      }
    });
  }

  endBossAction() {
    const endPositionFromStart = 3300;
    if(this.character.x >= endPositionFromStart) {
        this.boss.isAttacking = true
    }
  }

  updateBottleStatusBar() {
    let allBottle =
      (this.character.counterBottle * 100) / this.character.maxCounterBottle;
    this.bottleStatusbars.setPercentage(allBottle);
  }
  //  filter zwraca nowy array.

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
    mo.drawFrame(this.ctx);

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
