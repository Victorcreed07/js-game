class Sprite {
constructor({ position,imageSrc,scale=1,frame = 1,offset ={x:0,y:0}}) {
this.position = position
this.width = 50
this.height = 150
this.image = new Image()
this.image.src = imageSrc
this.scale = scale
this.frame = frame
this.framecurrent = 0
this.frameElapsed = 0
this.frameHold = 6
this.offset = offset
}
draw() {
	c.drawImage(this.image,
		// crop single image code below
	this.framecurrent * (this.image.width/this.frame),
	0,
	this.image.width/this.frame,
	this.image.height,
	//crop code ends here
	this.position.x - this.offset.x ,
	this.position.y - this.offset.y,
	(this.image.width/this.frame) * this.scale,
	this.image.height * this.scale
	)
}

//animating assets
animate()
{
	this.frameElapsed += 1
if(this.frameElapsed % this.frameHold === 0)
	{


if(this.framecurrent<this.frame-1)
{
	this.framecurrent += 1
}
else
{
	this.framecurrent = 0
}
	}
}
update() {
this.draw()
this.animate()
}
}

class Character extends Sprite {

	constructor({position,
		velocity,
		color,
		attackBox={offset:{},width:undefined,height:undefined},
		imageSrc,
		scale=1,
		frame = 1,
		offset={x:0,y:0},
		sprites
	})
	{


		super({
			imageSrc,
			scale,
			frame,
			
		})
		this.offset = offset
		this.position = position
		this.velocity  = velocity
		this.health = 100
		this.height =150
		this.width = 50
		this.lastKey
		this.Attacking = false
		this.color = color
		this.framecurrent = 0
		this.frameElapsed = 0
		this.frameHold = 8
		this.death = false

		this.attackBox = {

			position:{
				x:this.position.x,
				y:this.position.y
			},
			width:attackBox.width,
			offset:attackBox.offset,
			height:attackBox.height
		}

		this.sprites = sprites
		for(let i in this.sprites)
			{
				this.sprites[i].image = new Image();
				this.sprites[i].image.src = this.sprites[i].imageSrc
			}
		console.log(this.sprites)

	}

// 	draw() {
// 		c.fillStyle=this.color
// 		c.fillRect(this.position.x,this.position.y,this.width,this.height)
// 		if(this.Attacking)
// 			{
// 		c.fillStyle='green'
// 		c.fillRect(this.attackBox.position.x,this.attackBox.position.y,this.attackBox.width,
// 			this.attackBox.height)
// 
// 			}
// 
// 	}

	update() {

		this.draw()
		this.attackBox.position.x = this.position.x + this.attackBox.offset.x
		this.attackBox.position.y = this.position.y + this.attackBox.offset.y

		// c.fillRect(this.attackBox.position.x,this.attackBox.position.y,this.attackBox.width,
		// 	this.attackBox.height)
		this.position.y += this.velocity.y
		
		this.position.x += this.velocity.x
		if(this.position.y +this.height + this.velocity.y >= canvas.height - 87)
			{
				this.velocity.y = 0
				this.position.y = 339
			}
		else {
			this.velocity.y+=gravity
		}
		if(!this.death)
			{
			
		this.animate()

			}
	}

	attack()
	{
		this.switchAction('attack1')
		this.Attacking = true
		
	}


	switchAction(action)
	{
		if(this.image === this.sprites.death.image ){

		if(this.framecurrent === this.sprites.death.frame-1)
			{

				this.death = true
				
			}
			return
			
			}
		
			
		if(this.image === this.sprites.attack1.image && this.framecurrent < this.sprites.attack1.frame-1)
			{
				return
			}

		if(this.image === this.sprites.takehit.image && this.framecurrent < this.sprites.takehit.frame-1)
			{
				return
			}
		switch(action)
		{
		case 'idle':
			if(this.image !== this.sprites.idle.image)
				{
					this.image = this.sprites.idle.image
					this.frame = this.sprites.idle.frame
					this.framecurrent = 0
				}
			break;

		case 'run':
			if(this.image !== this.sprites.run.image)
				{
					this.image = this.sprites.run.image
					this.frame = this.sprites.run.frame
					this.framecurrent = 0
				}
			break;

		case 'jump':
			if(this.image !== this.sprites.jump.image)
				{
					this.image = this.sprites.jump.image
					this.frame = this.sprites.jump.frame
					this.framecurrent = 0
				}
			break;

		case 'fall':
			if(this.image !== this.sprites.fall.image)
				{
					this.image = this.sprites.fall.image
					this.frame = this.sprites.fall.frame
					this.framecurrent = 0
				}
			break;

		case 'attack1':
			if(this.image !== this.sprites.attack1.image)
				{
					this.image = this.sprites.attack1.image
					this.frame = this.sprites.attack1.frame
					this.framecurrent = 0
				}
			break;

		case 'takehit':
			if(this.image !== this.sprites.takehit.image)
				{
					this.image = this.sprites.takehit.image
					this.frame = this.sprites.takehit.frame
					this.framecurrent = 0
				}
			break;


		case 'death':
			if(this.image !== this.sprites.death.image)
				{
					this.image = this.sprites.death.image
					this.frame = this.sprites.death.frame
					this.framecurrent = 0
				}
			break;
		}
	}
}
