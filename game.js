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

        // let clip = this.add.text(this.w * 0.5, this.w * 0.3, "📎 paperclip")
        //     .setFontSize(this.s * 2)
        //     .setInteractive()
        //     .on('pointerover', () => this.showMessage("Metal, bent."))
        //     .on('pointerdown', () => {
        //         this.showMessage("No touching!");
        //         this.tweens.add({
        //             targets: clip,
        //             x: '+=' + this.s,
        //             repeat: 2,
        //             yoyo: true,
        //             ease: 'Sine.inOut',
        //             duration: 100
        //         });
        //     });

        // let key = this.add.text(this.w * 0.5, this.w * 0.1, "🔑 key")
        //     .setFontSize(this.s * 2)
        //     .setInteractive()
        //     .on('pointerover', () => {
        //         this.showMessage("It's a nice key.")
        //     })
        //     .on('pointerdown', () => {
        //         this.showMessage("You pick up the key.");
        //         this.gainItem('key');
        //         this.tweens.add({
        //             targets: key,
        //             y: `-=${2 * this.s}`,
        //             alpha: { from: 1, to: 0 },
        //             duration: 500,
        //             onComplete: () => key.destroy()
        //         });
        //     })

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

        this.addInteractable(this.w * 0.05, this.h * 0.5, this.w * 0.1, this.h * 0.5, "Leave bedroom", 
            () => {
                this.showMessage("Would you like to go to the kitchen or the living room?");
                this.addInteractableText(this.w * 0.75 + this.s, this.h * 0.2, "- Kitchen", "Go to the kitchen?",
                    () => { this.gotoScene("kitchen"); });
                this.addInteractableText(this.w * 0.75 + this.s, this.h * 0.25, "- Living Room", "Go to the living room?",
                    () => { this.gotoScene("living"); });
            });

        this.addInteractable(this.w * 0.2, this.h * 0.51, this.w * 0.1, this.h * 0.45, "Your closet", 
            () => {this.showMessage("Wonder what I'm gonna wear today...");});

        this.addInteractable(this.w * 0.7, this.h * 0.46, this.w * 0.08, this.h * 0.23, "The window", 
            () => {this.showMessage("The view is nice, but you can't go out there.")});

        this.addInteractable(this.w * 0.37, this.h * 0.68, this.w * 0.18, this.h * 0.40, "Your bed", 
            () => {this.showMessage("It's comfy, but you should get going.")});

        this.addInteractable(this.w * 0.5, this.h * 0.7, this.w * 0.07, this.h * 0.15, "Your nightstand", 
            () => {this.showMessage("You open your nightstand to find a strange series of numbers.\n17, 5, 31\nWhat could it mean?")});
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

        this.addInteractable(this.w * 0.05, this.h * 0.5, this.w * 0.1, this.h * 0.5, "Door to the bedroom", 
            () => {this.gotoScene("bedroom")});
        
        this.addInteractable(this.w * 0.7, this.h * 0.5, this.w * 0.1, this.h * 0.55, "Door to the bathroom", 
            () => {this.gotoScene("bathroom")});

        let openedFridge = false;
        this.addInteractable(this.w * 0.18, this.h * 0.55, this.w * 0.12, this.h * 0.47, "The fridge", 
            () => { 
                if (this.hasItem("Bacon")) {
                    this.showMessage("Nothing more to see in here.");
                }
                else if (!openedFridge && this.hasItem("Fridge Key")) {
                    this.showMessage(
                        "You open the fridge and find patties. You also use the fridge key to find bacon, lettuce and cheese!"
                    );
                    this.loseItem("Fridge Key");
                    this.gainItem("Patties");
                    this.gainItem("Lettuce");
                    this.gainItem("Cheese");
                    this.gainItem("Bacon");
                    openedFridge = true;
                }
                else if (!openedFridge && !this.hasItem("Fridge Key")) {
                    this.showMessage(
                        "You open the fridge and find patties. It looks like some more delicious ingedients are locked in the bottom drawer."
                    );
                    this.gainItem("Patties");
                    openedFridge = true;
                } 
                else if (this.hasItem("Fridge Key")) {
                    this.showMessage("You use the key to open the compartment and find bacon, cheese, and lettuce.");
                    this.loseItem("Fridge Key");
                    if (!this.hasItem("Fridge Key")) {
                        this.gainItem("Patties");
                    }
                    this.gainItem("Bacon");
                    this.gainItem("Lettuce");
                    this.gainItem("Cheese");
                }
                else
                    this.showMessage("It looks like some more delicious ingedients are locked in the bottom drawer.");
                
            });

        this.addInteractable(this.w * 0.39, this.h * 0.73, this.w * 0.29, this.h * 0.15, "The table", 
            () => {
                if (!this.hasItem("Buns") || !this.hasItem("Patties")) {
                    this.showMessage("You could probably whip something up here if you had sufficient ingredients");
                }
                else if (this.hasItem("Buns") && this.hasItem("Patties")) {
                    this.showMessage("Looks like you have enough ingredients to make a decent burger. Do you want to start preparing your glorious meal?")
                }
            });

        this.addInteractable(this.w * 0.44, this.h * 0.34, this.w * 0.26, this.h * 0.19, "The high cabinets", 
            () => {
                if (this.hasItem("Buns")) {
                    this.showMessage("Nothing more up there.");
                }
                else if (this.hasItem("Stepladder")) {
                    this.showMessage("You use the stepladder to reach the top shelf and find some buns!");
                    this.gainItem("Buns");
                    this.loseItem("Stepladder");
                }
                else {
                    this.showMessage("You spot some buns up there, but the cabinets are too high to reach. Maybe you can find something to help you reach them?");
                }
            });

        this.addInteractable(this.w * 0.43, this.h * 0.6, this.w * 0.26, this.h * 0.1, "The pantry cabinets",
            () => {
                if (this.hasItem("Avocadoes")) {
                    this.showMessage("Nothing more here");
                }
                else if (this.hasItem("Pantry Key")) {
                    this.showMessage("You unlocked the pantry cabinets. Acquired avocados and tomatoes");
                    this.gainItem("Avocadoes");
                    this.gainItem("Tomatoes");
                }
                else {
                    this.showMessage("Its a pantry cabinet. There might be more ingredients in here but its locked.");
                }
            });

        // this.add.text(this.w * 0.3, this.w * 0.4, "just go back")
        //     .setFontSize(this.s * 2)
        //     .setInteractive()
        //     .on('pointerover', () => {
        //         this.showMessage("You've got no other choice, really.");
        //     })
        //     .on('pointerdown', () => {
        //         this.gotoScene('bedroom');
        //     });

        // let finish = this.add.text(this.w * 0.6, this.w * 0.2, '(finish the game)')
        //     .setInteractive()
        //     .on('pointerover', () => {
        //         this.showMessage('*giggles*');
        //         this.tweens.add({
        //             targets: finish,
        //             x: this.s + (this.h - 2 * this.s) * Math.random(),
        //             y: this.s + (this.h - 2 * this.s) * Math.random(),
        //             ease: 'Sine.inOut',
        //             duration: 500
        //         });
        //     })
        //     .on('pointerdown', () => this.gotoScene('outro'));
    }
}

class LivingRoom extends AdventureScene {
    constructor() {
        super("living", "The Living Room");
    }

    preload() {
        this.load.image('living', 'assets/LivingRoom.png');
    }

    onEnter() {
        let background = this.add.image(this.w * 0.375, this.h * 0.5, 'living')
            .setDisplaySize(this.w * 0.75, this.h);

        this.addInteractable(this.w * 0.05, this.h * 0.5, this.w * 0.1, this.h * 0.5, "Door to the bedroom", 
        () => {this.gotoScene("bedroom")});

        this.addInteractable(this.w * 0.7, this.h * 0.5, this.w * 0.1, this.h * 0.55, "Door to the basement", 
        () => {this.gotoScene("basement")});

        this.addInteractable(this.w * 0.37, this.h * 0.34, this.w * 0.2, this.h * 0.22, "A painting", 
        () => {
            this.showMessage("You admire the beauty of the Alps");
        });

        this.addInteractable(this.w * 0.37, this.h * 0.62, this.w * 0.4, this.h * 0.27, "Your couch", 
        () => {
            this.showMessage("Relaxing on this fluffy couch would be so much better with a glorious meal!");
        });

        this.addInteractable(this.w * 0.37, this.h * 0.84, this.w * 0.33, this.h * 0.15, "A coffee table",
        () => {
            if (!this.hasItem("Fridge Key")) {
                this.showMessage("Aquired a fridge compartment key");
                this.gainItem("Fridge Key");
            }
            else {
                this.showMessage("The years of spilled coffee has given this table a fragrant smell");
            }
        });
        
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

        this.addInteractable(this.w * 0.05, this.h * 0.5, this.w * 0.1, this.h * 0.5, "Door to the kitchen", 
        () => {this.gotoScene("kitchen")});

        this.addInteractable(this.w * 0.25, this.h * 0.36, this.w * 0.14, this.h * 0.27, "Mirror", 
            () => { this.showMessage("Despite everything, it's still you.")});

        this.addInteractable(this.w * 0.24, this.h * 0.72, this.w * 0.14, this.h * 0.2, "Sink cabinet", 
            () => { this.showMessage("Just some cleaning products")});

        this.addInteractable(this.w * 0.24, this.h * 0.58, this.w * 0.14, this.h * 0.07, "Sink cabinet", 
            () => { this.showMessage("You washed your hands in preparation for your meal")});
        
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

        this.addInteractable(this.w * 0.55, this.h * 0.25, this.w * 0.2, this.h * 0.2, "Stairs to the living room", 
        () => {this.gotoScene("living")});

        this.addInteractable(this.w * 0.6, this.h * 0.69, this.w * 0.13, this.h * 0.22, "A combination safe", 
            () => {
                if (!this.hasItem("Godot's Spicy Mayonnaise")) {
                    let first = prompt("Turn the dial to the first number:");
                    // if (first == null) return;

                    let second = prompt("Turn the dial to the second number:");
                    // if (second == null) return;

                    let third = prompt("Turn the dial to the third number:");
                    // if (third == null) return;

                    if (first == "17" && second == "5" && third == "31") {
                        this.showMessage("Click... The safe opens. Acquired: Godot's Spicy Mayonnaise");
                        this.gainItem("Godot's Spicy Mayonnaise");
                    } else {
                        this.showMessage("The lock refuses to open.");
                    }
                }
                else {
                    this.showMessage("There isnt anything else left in the safe");
                }
            });

        this.addInteractable(this.w * 0.053, this.h * 0.45, this.w * 0.065, this.h * 0.22, "The breaker box", 
            () => {
                if (!this.hasItem("Pantry Key")) {
                    this.showMessage("You found a key with the label \"Pantry\"");
                    this.gainItem("Pantry Key");
                }
                else {
                    this.showMessage("There isnt anything else here except some switches");
                }
            });
        
        this.addInteractable(this.w * 0.2, this.h * 0.6, this.w * 0.1, this.h * 0.3, "A stepladder", 
            () => {
                if (!this.hasItem("Stepladder")) {
                    this.showMessage("Picked up the stepladder");
                    this.gainItem("Stepladder");
                }
            });

        
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
    scene: [Bathroom, Basement, Intro, Bedroom, Kitchen, LivingRoom, Outro],
    title: "A Glorious Meal",
});

