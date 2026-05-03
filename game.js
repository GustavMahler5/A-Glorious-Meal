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

        this.addInteractable(this.w * 0.05, this.h * 0.5, this.w * 0.1, this.h * 0.5, "Leave bedroom", 
            () => {
                this.showMessage("Would you like to go to the kitchen or the living room?");
                this.addInteractableText(this.w * 0.75 + this.s, this.h * 0.2, "- Kitchen", "Go to the kitchen?",
                    () => { this.gotoScene("kitchen"); });
                this.addInteractableText(this.w * 0.75 + this.s, this.h * 0.25, "- Living Room", "Go to the living room?",
                    () => { this.gotoScene("living"); });
            });

        this.addInteractable(this.w * 0.2, this.h * 0.51, this.w * 0.1, this.h * 0.45, "Your closet", 
            () => {this.showMessage("You wonder what you're gonna wear in the morning...");});

        this.addInteractable(this.w * 0.7, this.h * 0.46, this.w * 0.08, this.h * 0.23, "The window", 
            () => {this.showMessage("The moon shines.")});

        this.addInteractable(this.w * 0.37, this.h * 0.68, this.w * 0.18, this.h * 0.40, "Your bed", 
            () => {this.showMessage("It's comfy and still warm, but you should get going.")});

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
        this.load.image('patheticbackground', 'assets/patheticbackground.png');
        this.load.image('patheticburger', 'assets/patheticburger-removebg-preview.png');
        this.load.image('betterbackground', 'assets/betterbackground.png');
        this.load.image('betterburger', 'assets/betterburger-removebg-preview.png');
        this.load.image('gloriousbackground', 'assets/gloriousbackground.png');
        this.load.image('gloriousburger', 'assets/gloriousburger-removebg-preview.png');
    }

    onEnter() {

        let background = this.add.image(this.w * 0.375, this.h * 0.5, 'kitchen')
            .setDisplaySize(this.w * 0.75, this.h);

        this.addInteractable(this.w * 0.05, this.h * 0.5, this.w * 0.1, this.h * 0.5, "Door to the bedroom", 
            () => {this.gotoScene("bedroom")});
        
        this.addInteractable(this.w * 0.7, this.h * 0.5, this.w * 0.1, this.h * 0.55, "Door to the bathroom", 
            () => {this.gotoScene("bathroom")});
 
        this.addInteractable(this.w * 0.18, this.h * 0.55, this.w * 0.12, this.h * 0.47, "The fridge", 
            () => { 
                if (this.hasItem("Bacon")) { this.showMessage("Nothing more to see in here."); }

                else if (!this.openedFridge && this.hasItem("Fridge Key")) {
                    this.showMessage(
                        "You open the fridge and find patties. You also use the fridge key to find bacon, lettuce and cheese!"
                    );
                    this.loseItem("Fridge Key");
                    this.gainItem("Patties");
                    this.gainItem("Lettuce");
                    this.gainItem("Cheese");
                    this.gainItem("Bacon");
                    this.openedFridge = true;
                }

                else if (!this.openedFridge && !this.hasItem("Fridge Key")) {
                    this.showMessage("You open the fridge and find patties. It looks like some more delicious ingedients are locked in the bottom drawer.");
                    this.gainItem("Patties");
                    this.openedFridge = true;
                } 

                else if (this.hasItem("Fridge Key")) {
                    this.showMessage("You use the key to open the compartment and find bacon, cheese, and lettuce.");
                    this.loseItem("Fridge Key");
                    this.gainItem("Bacon");
                    this.gainItem("Lettuce");
                    this.gainItem("Cheese");
                    if (!this.hasItem("Fridge Key")) { this.gainItem("Patties"); }
                }

                else { this.showMessage("It looks like some more delicious ingedients are locked in the bottom drawer."); }
            });

        this.addInteractable(this.w * 0.39, this.h * 0.73, this.w * 0.29, this.h * 0.15, "The table", 
            () => {
                if (!this.hasItem("Buns") || !this.hasItem("Patties")) {
                    this.showMessage("You could probably whip something up here if you had sufficient ingredients");
                }
                else if (this.hasItem("Buns") && this.hasItem("Patties")) {
                    this.showMessage("Looks like you have enough ingredients to make a decent burger. Do you want to start preparing your glorious meal?");
                    this.addInteractableText(this.w * 0.75 + this.s, this.h * 0.2, "- Yes", "Yes, I want to prepare my glorious meal",
                        () => { 
                            this.cameras.main.fade(this.transitionDuration, 0, 0, 0);
                            this.time.delayedCall(this.transitionDuration * 3, () => {
                                if (this.hasItem("Bacon") && this.hasItem("Avocadoes") && this.hasItem("Godot's Spicy Mayonnaise")) {
                                    this.scene.start('bestending');
                                }
                                else if (this.hasItem("Bacon") || this.hasItem("Avocadoes") || this.hasItem("Godot's Spicy Mayonnaise")) {
                                    this.scene.start('goodending');
                                }
                                else { this.scene.start('badending'); }
                            }); 
                        });
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
                    this.loseItem("Pantry Key")
                }
                else {
                    this.showMessage("Its a pantry cabinet. There might be more ingredients in here but its locked.");
                }
            });
    }
}



class LivingRoom extends AdventureScene {
    constructor() {
        super("living", "The Living Room");
    }

    preload() {
        this.load.image('living', 'assets/livingroom.png');
        this.load.image('key', 'assets/key-removebg-preview.png');
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

        let key = null;
        if (!this.hasItem("Fridge Key") && !this.hasItem("Bacon")) { 
            key = this.add.image(this.w * 0.375, this.h * 0.9, 'key');
        }

        this.addInteractable(this.w * 0.37, this.h * 0.84, this.w * 0.33, this.h * 0.15, "A coffee table",
        () => {
            if (!this.hasItem("Fridge Key") && !this.hasItem("Bacon")) {
                this.showMessage("Aquired a fridge compartment key");
                this.gainItem("Fridge Key");
                this.tweenAway(key);
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

        this.addInteractable(this.w * 0.24, this.h * 0.58, this.w * 0.14, this.h * 0.07, "Faucet", 
            () => { this.showMessage("You washed your hands in preparation for your glorious meal")});
        
        this.addInteractable(this.w * 0.63, this.h * 0.48, this.w * 0.2, this.h * 0.77, "Shower", 
            () => { this.showMessage("You took a shower in preparation for your meal")});

        this.addInteractable(this.w * 0.43, this.h * 0.69, this.w * 0.1, this.h * 0.3, "Toilet", 
            () => { this.showMessage("No urge to use this just yet")});
            
    }
}



class Basement extends AdventureScene {
    constructor() {
        super("basement", "The Basement");
    }

    preload() {
        this.load.image('basement', 'assets/basement.png');
        this.load.image('stepladder', 'assets/stepladder-removebg-preview.png');
        this.load.image('key', 'assets/key-removebg-preview.png');
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

        let key = null;

        if (!this.hasItem("Pantry Key") && !this.hasItem("Avocadoes")) { 
            key = this.add.image(this.w * 0.006, this.h * 0.58, 'key').setAngle(90);
        }

        this.addInteractable(this.w * 0.053, this.h * 0.45, this.w * 0.065, this.h * 0.22, "The breaker box", 
            () => {
                if (!this.hasItem("Pantry Key") && !this.hasItem("Avocadoes")) {
                    this.showMessage("You found a key with the label \"Pantry\"");
                    this.gainItem("Pantry Key");
                    this.tweenAway(key);
                }
                else {
                    this.showMessage("There isnt anything else here except some switches");
                }
            });

        let stepladder = null;

        if (!this.hasItem("Stepladder") && !this.hasItem("Buns")) {
            stepladder = this.add.image(this.w * 0.375, this.h * 0.68, 'stepladder').setDisplaySize(this.w * 0.75, this.h * 0.7);

            let stepladderInteraction = this.addInteractable(this.w * 0.2, this.h * 0.58, this.w * 0.1, this.h * 0.35, "A stepladder", 
                () => {
                    if (!this.hasItem("Stepladder")) {
                        this.showMessage("Picked up the stepladder");
                        this.gainItem("Stepladder");
                        this.tweenAway(stepladder);
                        this.tweenAway(stepladderInteraction);
                    }
                });
        }

        
    }


}



class Intro extends Phaser.Scene {
    constructor() {
        super('intro')
    }
    preload() {
        this.load.audio('bgm', 'assets/bgm.mp3');
    }

    create() {
        this.audio = new AudioManager(this);
        this.audio.playMusic();
        this.add.text(50,150, "Wakey Wakey!").setFontSize(40);
        this.add.text(50,225, "It is the middle of the night.").setFontSize(55);
        this.add.text(50,300, "And you are starving for a glorious meal!").setFontSize(75);
        this.add.text(50,500, "*Click to get up*").setFontSize(40);
        this.input.on('pointerdown', () => {
            this.cameras.main.fade(1000, 0,0,0);
            this.time.delayedCall(1000, () => this.scene.start('bedroom'));
        });
    }
}



class BestEnding extends Phaser.Scene {
    constructor() {
        super('bestending');
    }
    preload() {
        this.load.image('gloriousbackground', 'assets/gloriousbackground.png');
        this.load.image('gloriousburger', 'assets/gloriousburger-removebg-preview.png');
    }
    create() {
        this.cameras.main.setBackgroundColor('#444');
        this.cameras.main.fadeIn(this.transitionDuration, 0, 0, 0);
        this.w = this.game.config.width;
        this.h = this.game.config.height;
        this.add.image(this.w * 0.5, this.h * 0.5, 'gloriousbackground').setDisplaySize(this.w, this.h);
        this.add.image(this.w * 0.55, this.h * 0.7, 'gloriousburger').setDisplaySize(this.w * 0.5, this.h * 0.5);
        this.add.text(this.w * 0.25, this.h * 0.85, "What a glorious meal!").setFontSize(80);
    }
}



class GoodEnding extends Phaser.Scene {
    constructor() {
        super('goodending');
    }
    preload() {
        this.load.image('betterbackground', 'assets/betterbackground.png');
        this.load.image('betterburger', 'assets/betterburger-removebg-preview.png');
    }
    create() {
        this.cameras.main.setBackgroundColor('#444');
        this.cameras.main.fadeIn(this.transitionDuration, 0, 0, 0);
        this.w = this.game.config.width;
        this.h = this.game.config.height;
        this.add.image(this.w * 0.5, this.h * 0.5, 'betterbackground').setDisplaySize(this.w, this.h);
        this.add.image(this.w * 0.55, this.h * 0.7, 'betterburger').setDisplaySize(this.w * 0.5, this.h * 0.5);
        this.add.text(this.w * 0.155, this.h * 0.85, "That was a fine meal indeed!", { color: '#000000' }).setFontSize(80);
    }
}



class BadEnding extends Phaser.Scene {
    constructor() {
        super('badending');
    }
    preload() {
        this.load.image('patheticbackground', 'assets/patheticbackground.png');
        this.load.image('patheticburger', 'assets/patheticburger-removebg-preview.png');
    }
    create() {
        this.cameras.main.setBackgroundColor('#444');
        this.cameras.main.fadeIn(this.transitionDuration, 0, 0, 0);
        this.w = this.game.config.width;
        this.h = this.game.config.height;
        this.add.image(this.w * 0.5, this.h * 0.5, 'patheticbackground').setDisplaySize(this.w, this.h);
        this.add.image(this.w * 0.55, this.h * 0.7, 'patheticburger').setDisplaySize(this.w * 0.5, this.h * 0.5);
        this.add.text(this.w * 0.05, this.h * 0.85, "Servicable. Could use more ingredients!", { color: '#72bf6a' }).setFontSize(70);
    }
}



class AudioManager {
    constructor(scene) {
        this.scene = scene;
        this.backgroundMusic = this.scene.sound.add('bgm');
    }

    playMusic() {
        if (!this.backgroundMusic.isPlaying) {
            this.backgroundMusic.play({ loop: true, volume: 0.2 });
        }
    }
}



const game = new Phaser.Game({
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080
    },
    // loader: {
    //     baseURL: '/A-Glorious-Meal/'
    // },
    scene: [Intro, Bedroom, Bathroom, Kitchen, LivingRoom, Basement, BestEnding, GoodEnding, BadEnding],
    title: "A Glorious Meal",
});

