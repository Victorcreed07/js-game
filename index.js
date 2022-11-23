const canvas = document.querySelector('canvas');

const c = canvas.getContext('2d')

canvas.height = 576
canvas.width = 1026

c.fillRect(0,0,canvas.width ,canvas.height)

const gravity = 0.7


const background = new Sprite({

	position:{
		x:0,
		y:0
	},
	imageSrc :'image/image/background.png'
})

const shop = new Sprite({

	position:{
		x:600,
		y:120
	},
	imageSrc :'image/image/shop.png',
	scale:2.80,
	frame:6
})


const lamp = new Sprite({

	position:{
		x:100,
		y:336
	},
	imageSrc:'image/image/lamp.png',
	scale:2.5
}) 

const player = new Character({
	position:{
		x:0,
		y:0
	},
	velocity:{
		x:0,
		y:0
	},
	color:'red',
	offset:
	{
		x:215,
		y:165
	},
	imageSrc:'image/image/samuraiMack/Idle.png',
	frame:8,
	scale:2.5,
	sprites:{

		idle:{

			imageSrc:'image/image/samuraiMack/Idle.png',
			frame:8
		},
		run:{
			imageSrc:'image/image/samuraiMack/Run.png',
			frame:8
		},
		jump:{
			imageSrc:'image/image/samuraiMack/Jump.png',
			frame:2
		},
		fall:{
			imageSrc:'image/image/samuraiMack/Fall.png',
			frame:2
		},
		attack1:{
			imageSrc:'image/image/samuraiMack/Attack1.png',
			frame:6
		},
		takehit:{
			imageSrc:'image/image/samuraiMack/Take hit - white silhouette.png',
			frame:4
		},
		death:{
			imageSrc:'image/image/samuraiMack/Death.png',
			frame:6
		}
	},
	attackBox:{

		offset:{
			x:100,
			y:50
		},
		width:150,
		height:50
	},


})

const enemy = new Character({

	position:{
		x:750,
		y: 100
	},
	velocity:{
		x:0,
		y:0
	},
	color:'blue',
	offset:
	{
		x:215,
		y:177
	},
	imageSrc:'image/image/kenji/Idle.png',
	frame:4,
	scale:2.5,
	sprites:{

		idle:{

			imageSrc:'image/image/kenji/Idle.png',
			frame:4
		},
		run:{
			imageSrc:'image/image/kenji/Run.png',
			frame:8
		},
		jump:{
			imageSrc:'image/image/kenji/Jump.png',
			frame:2
		},
		fall:{
			imageSrc:'image/image/kenji/Fall.png',
			frame:2
		},
		attack1:{
			imageSrc:'image/image/kenji/Attack1.png',
			frame:4
		},
		takehit:{
			imageSrc:'image/image/kenji/Take hit.png',
			frame:3
		},
		death:{
			imageSrc:'image/image/kenji/Death.png',
			frame:7
		}
	},
	attackBox:{

		offset:{
			x:-165,
			y:50
		},
		width:165,
		height:50
	}
})

const keys = {

	a:{
		pressed:false
	},
	d:{
		pressed:false
	},
	w:{
		pressed:false
	},
	ArrowLeft:{
		pressed:false

	},
	ArrowRight:{
		pressed:false
	},
	ArrowUp:{
		pressed:false
	}

}
let lastKey
let elastKey



counter()
function animate() {
	// body...

	window.requestAnimationFrame(animate)

	c.fillStyle='black'
	c.fillRect(0,0,canvas.width ,canvas.height)
	background.update()
	shop.update()
	lamp.update()
	player.update()
	enemy.update()
	player.velocity.x = 0 //default valuess
	enemy.velocity.x = 0

	//player movement
	
	if(keys.a.pressed && player.lastKey == 'a')
		{
			player.switchAction('run')
			player.velocity.x = -5
		}
	else if(keys.d.pressed && player.lastKey == 'd')
		{
			player.switchAction('run')
			player.velocity.x = 5
		}
	else{
		player.switchAction('idle')
	}


		//jump
		if(player.velocity.y < 0)
			{
				player.switchAction('jump')
			}
		else if(player.velocity.y > 0)
			{
				player.switchAction('fall')
			}


	//enemy movement
	if(keys.ArrowLeft.pressed && enemy.lastKey == 'ArrowLeft')
		{
			enemy.switchAction('run')
			enemy.velocity.x = -5
		}
	else if(keys.ArrowRight.pressed && enemy.lastKey == 'ArrowRight')
		{
			enemy.switchAction('run')
			enemy.velocity.x = 5
		}
		else{
		enemy.switchAction('idle')
	}


	if(enemy.velocity.y < 0)
			{
				enemy.switchAction('jump')
			}
		else if(enemy.velocity.y > 0)
			{
				enemy.switchAction('fall')
			}


		// collision detection x axis and y axis
	if(Collision({rec1:player,rec2:enemy})&&

		player.Attacking &&(player.framecurrent === 4)
		)
		{
			
			enemy.health -= 20
			if(enemy.health <= 0)
				{
					enemy.switchAction('death')
				}
			else
				{
					enemy.switchAction('takehit')
				}

			if(enemy.health <= 30)
				{
					document.querySelector('#enemybar').style.backgroundColor = '#db0000'
				}
			
			gsap.to('#enemybar',{
				width:`${enemy.health}%`
			})
			player.Attacking = false
			console.log('player Hit')
		}

		//player misses
	if(player.Attacking &&(player.framecurrent === 4))
		{
			player.Attacking = false
		}


		//collison enemy attacks player
		if(Collision({rec1:enemy,rec2:player})&&

		enemy.Attacking && (enemy.framecurrent === 2)
		)
		{
			
			player.health -= 15
			if(player.health < 0)
				{
					console.log('Die')
					player.health = 0
					player.switchAction('death')
				}
				else
					{
						player.switchAction('takehit')
					}
			if(player.health <= 30)
				{
					document.querySelector('#playerbar').style.backgroundColor = '#db0000'
				}
				
			gsap.to('#playerbar',{
				width:`${player.health}%`
			})
			enemy.Attacking = false
			console.log('enemy Hit')
		}

		if(enemy.Attacking &&(enemy.framecurrent === 2))
		{
			enemy.Attacking = false
		}

		if(player.health <=0 || enemy.health <=0)
			{
				Winner({player,enemy,timerId})
			}



}

animate()

window.addEventListener('keydown',(event) => {

if(!player.death)
	{


switch(event.key)
{
case 'd':
	keys.d.pressed = true
	player.lastKey = 'd'
	break;

case 'a':
	keys.a.pressed = true
	player.lastKey = 'a'
	break;
case 'w':
	player.velocity.y = -20
	break;


case ' ':
	
	player.attack()
	break;

}
	}

if(!enemy.death)
	{

switch(event.key)
{
case 'ArrowRight':
	keys.ArrowRight.pressed = true
	enemy.lastKey = 'ArrowRight'
	break;

case 'ArrowDown':
	enemy.attack() 
	break;
case 'ArrowLeft':
	keys.ArrowLeft.pressed = true
	enemy.lastKey = 'ArrowLeft'
	break;
case 'ArrowUp':
	enemy.velocity.y = -20
	break;

}
	}

})

window.addEventListener('keyup',(event) => {

switch(event.key)
{
case 'd':
	keys.d.pressed = false
	
	break;
case 'a':
	keys.a.pressed = false
	
	break;

case 'ArrowRight':
	keys.ArrowRight.pressed = false
	
	break;
case 'ArrowLeft':
	keys.ArrowLeft.pressed = false
	
	break;



}

})