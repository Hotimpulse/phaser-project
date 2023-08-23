// export function init(targetDiv) {

//     var config = {
//         type: Phaser.AUTO,
//         width: 1920,
//         height: 1080,
//         parent: targetDiv,
//         audio: {
//             disableWebAudio: true
//         },
//         dom: {
//             createContainer: true
//         },
//         physics: {
//             default: 'arcade',
//             arcade: {
//                 gravity: { y: 300 },
//                 debug: false
//             }
//         },
//         scene: {
//             preload: preload,
//             create: create,
//             update: update
//         },
//         callbacks: {
//             postBoot: function (game) {
//                 game.canvas.style.width = `100%`;
//                 game.canvas.style.height = `100%`;
//             }
//         },
//     };

//     const game = new Phaser.Game(config);

//     var player;
//     var platforms;
//     var cursors;
//     var gameOver = false;
//     var text1, text2;

//     function preload() {
//         this.load.image('layer1', './assets/imgs/bg_layer1.png');
//         this.load.image('layer2', './assets/imgs/bg_layer2.png');


//         this.load.svg('sound_icon', './assets/SVG/sound_icon.svg');
//         this.load.svg('close_icon', './assets/SVG/close.svg');
//         this.load.svg('profile_icon', './assets/SVG/profile_icon.svg');

//         this.load.svg('rect_name', './assets/SVG/rect_name.svg');
//         this.load.svg('rect_points', './assets/SVG/rect_points.svg');
//         this.load.svg('rect_small', './assets/SVG/rect_small.svg');

//         this.load.image('main-rect', './assets/imgs/rectangle-main.png');

//         this.load.image('ground', './assets/imgs/platform.png');
//         this.load.spritesheet('pacman_left', './assets/imgs/pacman_left.png', { frameWidth: 107, frameHeight: 112 });

//         // this.load.audio('wrongChoice', './assets/sounds/wrong_choice.mp3');
//     }

//     function create() {

//         this.graphics.fillRoundedRect(32, 32, 300, 200, 32);
//         // Creating a name card element
//         // const profileIcon = document.createElement('img');
//         // profileIcon.src = `./assets/SVG/profile_icon.svg`;

//         // const nameCard = document.createElement('div');
//         // nameCard.setAttribute('id', 'name-card');
//         // const name = document.createElement('span');
//         // name.textContent = `Name`;
//         // nameCard.appendChild(profileIcon);
//         // nameCard.appendChild(name);
//         // const rectPoints = document.createElement('div');
//         // rectPoints.setAttribute('id', 'rect_points');
//         // const rectSmall = document.createElement('div');
//         // rectSmall.setAttribute('id', 'rect_small');
//         // const rectSmall2 = document.createElement('div');
//         // rectSmall2.setAttribute('id', 'rect_small2');



//         // const gameContainer = document.getElementById('game');
//         // gameContainer.appendChild(nameCard);
//         // gameContainer.appendChild(rectPoints);
//         // gameContainer.appendChild(rectSmall);
//         // gameContainer.appendChild(rectSmall2);



//         // const wrongChoiceSound = this.sound.add('wrongChoice');
//         this.add.image(1920 / 2, 1080 / 2, 'layer1');
//         this.add.image(1920 / 2, 1080 / 2, 'layer2');
//         this.add.image(1180, 540, 'main-rect');

//         const soundIcon = this.add.sprite(660, 145, 'sound_icon');
//         soundIcon.setInteractive();

//         soundIcon.on('pointerdown', async () => {
//             await playTask1();
//         });

//         const closeIcon = this.add.sprite(1820, 100, 'close_icon');
//         closeIcon.setInteractive();
//         closeIcon.on("pointerdown", () => {
//             window.close();
//         });


//         //  The platforms group contains the ground and the 2 ledges we can jump on
//         platforms = this.physics.add.staticGroup();

//         //  Scale it to fit the width of the game (the original sprite is 400x32 in size)

//         // platforms.create(600, 400, 'ground');
//         // platforms.create(50, 250, 'ground');
//         // platforms.create(750, 220, 'ground');

//         // The player and its settings
//         player = this.physics.add.sprite(100, 450, 'pacman_left');

//         //  Player physics properties. Give the little guy a slight bounce.
//         player.setBounce(0.2);
//         player.setCollideWorldBounds(true);

//         //  Our player animations, turning, walking left and walking right.
//         this.anims.create({
//             key: 'left',
//             frames: this.anims.generateFrameNumbers('pacman_left', { start: 0, end: 1 }),
//             frameRate: 10,
//             repeat: -1
//         });

//         this.anims.create({
//             key: 'turn',
//             frames: [{ key: 'pacman_left', frame: 1 }],
//             frameRate: 20
//         });

//         this.anims.create({
//             key: 'right',
//             frames: this.anims.generateFrameNumbers('pacman_left', { start: 0, end: 1 }),
//             frameRate: 10,
//             repeat: -1
//         });

//         //  Input Events
//         cursors = this.input.keyboard.createCursorKeys();

//         //  The text
//         text1 = this.add.text(480, 15, `
//         Угадай слова нажимая
//         `, { fontFamily: 'Arial', fontSize: '3.375rem', fill: '#B7C4DD' });
//         text2 = this.add.text(550, 135, `
//         Угадай слова нажимая на клеточки с нужными слогами
//         Инструкции: задание к игре
//         `, { fontFamily: 'Arial', fontSize: '1.5rem', fill: '#B7C4DD' });
//         //  Collide the player and the stars with the platforms
//         this.physics.add.collider(player, platforms);

//     }

//     function update() {
//         if (gameOver) {
//             return;
//         }

//         if (cursors.left.isDown) {
//             player.setVelocityX(-160);

//             player.anims.play('left', true);
//         }
//         else if (cursors.right.isDown) {
//             player.setVelocityX(160);

//             player.anims.play('right', true);
//         }
//         else {
//             player.setVelocityX(0);

//             player.anims.play('turn');
//         }

//         if (cursors.up.isDown && player.body.touching.down) {
//             player.setVelocityY(-330);
//         }
//     }

// }