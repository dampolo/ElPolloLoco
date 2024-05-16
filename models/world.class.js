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
    // this.playMainSound();
  }
  

  playMainSound(){
    if(soundOn){
      soundManager.playSound("mainSound");
    }else {
      soundManager.pauseSound("mainSound");
      soundManager.pauseSound("sleep");
    }
  }

  setWorld() {
    this.character.world = this;
  }

  run() {
    setInterval(() => {
      this.playMainSound()
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
    //Tu rzucam flaszki

    if (this.character.isDead()) {
      return;
    }

    if (this.keyboard.D) {
      if (this.character.counterBottle > 0) {
        let bottle = new ThrowableObject(
          this.character.x + 40,
          this.character.y + 120
        );

        if (this.throwableObjects.length === 0) {
          this.throwableObjects.push(bottle);
          this.splashedBottle++;
          this.character.counterBottle -= 1;
          this.updateBottleStatusBar();
        } else {
          this.throwableObjects.forEach((el) => {
            if (el.energy === 0) {
              this.throwableObjects.push(bottle);
              this.splashedBottle++;
              this.character.counterBottle -= 1;
              this.updateBottleStatusBar();
            }
          });
        }
      } else {
      }
    }
  }

  //Chicken, Chicken-baby
  checkCollisions() {
    if (this.character.isDead()) {
      return;
    }

    this.checkCollisionCharacterWithChicken();

    this.checkCollisionBottleWithChickenOrGround();
    
    //Endboss
    this.checkCollisionBossWithBottle();
    //zbieranie coins
    this.checkCollisionWithCoin();
    //zbieranie butelek
    this.assemblageOfTheBottles();
  }

  checkCollisionCharacterWithChicken() {
    this.level.enemies.forEach((enemy) => {
      //tak to zostawic
      this.boss.isAttacking = false;
      if (this.character.isColliding(enemy)) {
          soundManager.playSound("chickenDead")
        if (this.character.speedY < 0 && this.character.isAboveGround()) {
          if (enemy !== this.boss) {
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
          }
        } else {
          if (!enemy.isDead()) {
            this.boss.isAttacking = true;
            //uderza Peppe.
            this.character.hit();
          }
          this.healthStatusBarsBlue.setPercentage(this.character.energy);
        }
      }
    });
  }

  checkCollisionBottleWithChickenOrGround() {
      
    this.throwableObjects.forEach((bottle) => {

      if (bottle.y > 400) {
        bottle.hit();
        bottle.speedY = 0;
        // if(this.botleIsSplashedOnce) {
          // this.playSound("bottleCrash")
        // }
      }
      
      this.level.enemies.forEach((enemy) => {
        if (enemy !== this.boss) {
          if (enemy.isColliding(bottle)) {
            if(!bottle.isDead()) {
              // this.playSound("bottleCrash")
              enemy.hit();
              setTimeout(() => {
                this.level.enemies = this.level.enemies.filter((el) => {
                  if (el === enemy) {
                    return false; //tu usuwa
                  } else {
                    return true;
                  }
                });
  
              }, 1000)
  
              bottle.hit();
              setTimeout(() => {
                // Wypierdala flaszki z planszy po rzuceniu na kury.
                this.throwableObjects = this.throwableObjects.filter((el) => {
                  if (el === bottle) {
                    return false;
                  } else {
                    return true;
                  }
                });
              }, 200);
            }
          }

          if (!bottle.y >= 400) {
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
        }
      });
    });
  }

  checkCollisionBossWithBottle() {
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
        }, 300);

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
  }

  assemblageOfTheBottles() {
    this.level.bottleBottom.forEach((bottle) => {
      if (this.character !== 0) {
        if (this.character.isColliding(bottle)) {
            soundManager.playSound("takeBottle")
          // Wypierdala flaszki z planszy po zebraniu
          if (this.character.counterBottle < this.character.maxCounterBottle) {
            this.level.bottleBottom = this.level.bottleBottom.filter((el) => {
              if (el === bottle) {
                return false;
              } else {
                return true;
              }
            });
            //Zwiekszamy ilosc zebranych butelek
            this.character.counterBottle += 1;
            this.updateBottleStatusBar();
          }
        }
      }
    });
  }

  checkCollisionWithCoin() {
    this.level.coins.forEach((coin) => {
      if (this.character !== 0) {
        if (this.character.isColliding(coin)) {
            soundManager.playSound("coin")
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
  }

  endBossAction() {
    const distance = this.boss.x - this.character.x
    console.log(distance);
    const endPositionFromStart = 3000;
    if (this.character.x >= endPositionFromStart) {
      this.boss.characterArrived = true;
    }

    if(distance >= 0) {
      this.boss.otherDirection = false
    } else {
      this.boss.otherDirection = true
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
    // mo.drawFrame(this.ctx);

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
