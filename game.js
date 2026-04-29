class Bedroom extends AdventureScene {
    constructor() {
        super("bedroom", "The Bedroom");
    }

    preload() {
        this.load.image('bedroom', 'assets/bedroom.png');
    }

    onEnter() {

        let background = this.add.image(this.w * 0.375, this.h * 0.5, 'bedroom')
            .setDisplaySize(this.w * 0.75, this.h);

        let clip = this.add.text(this.w * 0.5, this.w * 0.3, "📎 paperclip")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => this.showMessage("Metal, bent."))
            .on('pointerdown', () => {
                this.showMessage("No touching!");
                this.tweens.add({
                    targets: clip,
                    x: '+=' + this.s,
                    repeat: 2,
                    yoyo: true,
                    ease: 'Sine.inOut',
                    duration: 100
                });
            });

        let key = this.add.text(this.w * 0.5, this.w * 0.1, "🔑 key")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("It's a nice key.")
            })
            .on('pointerdown', () => {
                this.showMessage("You pick up the key.");
                this.gainItem('key');
                this.tweens.add({
                    targets: key,
                    y: `-=${2 * this.s}`,
                    alpha: { from: 1, to: 0 },
                    duration: 500,
                    onComplete: () => key.destroy()
                });
            })

        // let door = this.add.rectangle(this.w * 0.05, this.h * 0.5, this.w * 0.1, this.h * 0.5)
        //     .setInteractive( { cursor: 'pointer' } )
        //     .setAlpha(1) // invisible but interactive
        //     .on('pointerover', () => {
        //         if (this.hasItem("key")) {
        //             this.showMessage("You've got the key for this door.");
        //         } else {
        //             this.showMessage("It's locked. Can you find a key?");
        //         }
        //     })
        //     .on('pointerdown', () => {
        //         if (this.hasItem("key")) {
        //             this.loseItem("key");
        //             this.showMessage("*squeak*");
        //             //door.setText("🚪 unlocked door");
        //             this.gotoScene("kitchen");
        //         }
        //     })

        this.addInteractable(this.w * 0.05, this.h * 0.5, this.w * 0.1, this.h * 0.5, "Kitchen?", () => {this.gotoScene("kitchen")});

    }
}

class Kitchen extends AdventureScene {
    constructor() {
        super("kitchen", "The Kitchen");
    }

    preload() {
        this.load.image('kitchen', 'assets/kitchen.png');
    }

    onEnter() {

        let background = this.add.image(this.w * 0.375, this.h * 0.5, 'kitchen')
            .setDisplaySize(this.w * 0.75, this.h);

        this.add.text(this.w * 0.3, this.w * 0.4, "just go back")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("You've got no other choice, really.");
            })
            .on('pointerdown', () => {
                this.gotoScene('bedroom');
            });

        let finish = this.add.text(this.w * 0.6, this.w * 0.2, '(finish the game)')
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage('*giggles*');
                this.tweens.add({
                    targets: finish,
                    x: this.s + (this.h - 2 * this.s) * Math.random(),
                    y: this.s + (this.h - 2 * this.s) * Math.random(),
                    ease: 'Sine.inOut',
                    duration: 500
                });
            })
            .on('pointerdown', () => this.gotoScene('outro'));
    }
}

class LivingRoom extends AdventureScene {
    constructor() {
        super("living", "The Living Room");
    }

    preload() {
        this.load.image('living', 'assets/living.png');
    }

    onEnter() {
        let background = this.add.image(this.w * 0.375, this.h * 0.5, 'living')
            .setDisplaySize(this.w * 0.75, this.h);
    }
    
}

class Bathroom extends AdventureScene {
    constructor() {
        super("bathroom", "The Bathroom");
    }

    preload() {
        this.load.image('bathroom', 'assets/bathroom.png');
    }

    onEnter() {
        let background = this.add.image(this.w * 0.375, this.h * 0.5, 'bathroom')
            .setDisplaySize(this.w * 0.75, this.h);
    }
}

class Basement extends AdventureScene {
    constructor() {
        super("basement", "The Basement");
    }

    preload() {
        this.load.image('basement', 'assets/basement.png');
    }

    onEnter() {
        let background = this.add.image(this.w * 0.375, this.h * 0.5, 'basement')
            .setDisplaySize(this.w * 0.75, this.h);
    }
}

class Intro extends Phaser.Scene {
    constructor() {
        super('intro')
    }
    create() {
        this.add.text(50,50, "Adventure awaits!").setFontSize(50);
        this.add.text(50,100, "Click anywhere to begin.").setFontSize(20);
        this.input.on('pointerdown', () => {
            this.cameras.main.fade(1000, 0,0,0);
            this.time.delayedCall(1000, () => this.scene.start('bedroom'));
        });
    }
}

class Outro extends Phaser.Scene {
    constructor() {
        super('outro');
    }
    create() {
        this.add.text(50, 50, "That's all!").setFontSize(50);
        this.add.text(50, 100, "Click anywhere to restart.").setFontSize(20);
        this.input.on('pointerdown', () => this.scene.start('intro'));
    }
}


const game = new Phaser.Game({
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080
    },
    scene: [Intro, Bedroom, Kitchen, LivingRoom, Bathroom, Basement, Outro],
    title: "A Glorious Meal",
});

