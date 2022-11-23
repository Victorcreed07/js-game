//collision logic
function Collision({rec1,rec2})
{
 return (
 	rec1.attackBox.position.x + rec1.attackBox.width >= rec2.position.x && 

		rec1.attackBox.position.x <= rec2.position.x + rec2.width && 

		rec1.attackBox.position.y + rec1.attackBox.height >= rec2.position.y &&

		rec1.attackBox.position.y <= rec2.position.y + rec2.height
 	)

}

function Winner({player,enemy,timerId}) {

	clearTimeout(timerId)

	if(player.health === enemy.health)
		{
			document.querySelector('#displayText').innerHTML = 'Tie'
			document.querySelector('#displayText').style.display = 'flex'
			document.querySelector('#Image').style.display = 'flex'

		}

	else if(player.health > enemy.health)
		{
			document.querySelector('#displayText').innerHTML = 'Player 1 wins'
			document.querySelector('#displayText').style.display = 'flex'
			document.querySelector('#Image').style.display = 'flex'
		}

	else if(player.health < enemy.health)
		{
			document.querySelector('#displayText').innerHTML = 'Player 2 wins'
			document.querySelector('#displayText').style.display = 'flex'
			document.querySelector('#Image').style.display = 'flex'
		}
}
let timer = 60
let timerId
function counter() {
if(timer>0){
	timer -= 1
	
	timerId = setTimeout(counter,1000)
	document.querySelector('#timer').innerHTML  =  timer
}


if(timer === 0)
{
	Winner({player,enemy,timerId})
}



}
