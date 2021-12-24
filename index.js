const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

var playerX
var playerY
class Player {
    constructor(x, y, radius, color, velocity) {
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
        this.velocity = velocity
    }

    draw() {
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        c.fillStyle = this.color
        c.fill()
    }

    update() {
        this.draw()
        movePlayer()
    }
}

class Projectile {
    constructor(x, y, radius, color, velocity) {
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
        this.velocity = velocity
    }

    draw() {
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        c.fillStyle = this.color
        c.fill()
    }

    update() {
        this.draw()
        this.x += this.velocity.x
        this.y += this.velocity.y
    }
}

class Enemy {
    constructor(x, y, radius, color, velocity) {
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
        this.velocity = velocity
    }

    draw() {
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        c.fillStyle = this.color
        c.fill()
    }

    update() {
        this.draw()
        this.x += this.velocity.x
        this.y += this.velocity.y
    }
}

window.addEventListener("keydown", function movePlayer(event) {
    if (event.defaultPrevented) {
        return;
    }

    switch (event.key) {
        case "Down":
        case "ArrowDown":
            playerY += 5
            console.log(down)
            break;

        case "Up":
        case "ArrowUp":
            playerY -= 5
            break;

        case "Left":
        case "ArrowLeft":
            playerX -= 5
            break;

        case "Right":
        case "ArrowRight":
            playerX += 5
            break;

        default:
            return;
    }

    event.preventDefault();
}, true);

var x = canvas.width / 2
var y = canvas.height / 2

const projectiles = []
const enemies = []

function spawnEnemies() {
    setInterval(() => {
        const radius = Math.random() * (30 - 4) + 4

        let x
        let y

        if (Math.random() < 0.5) {
            x = Math.random() < 0.5 ? 0 - radius : canvas.width + radius
            y = Math.random() * canvas.height
        } else {
            x = Math.random() * canvas.width
            y = Math.random() < 0.5 ? 0 - radius : canvas.height + radius
        }

        const color = 'green'
        const angle = Math.atan2(
            canvas.height / 2 - y,
            canvas.width / 2 - x
        )
        const velocity = {
            x: Math.cos(angle),
            y: Math.sin(angle)
        }

        enemies.push(
            new Enemy(
                x,
                y,
                radius,
                color,
                velocity))
    }, 1000)
}

const projectile = new Projectile(
    canvas.width / 2,
    canvas.height / 2,
    5,
    'red', {
        x: 7.5,
        y: 7.5
    }
)

const player = new Player(
    playerX,
    playerY,
    30,
    'blue',
    velocity
)

let animationId

function animate() {
    animationId = requestAnimationFrame(animate)
    c.fillStyle = 'rgba(0, 0, 0, 0.1'
    c.fillRect(0, 0, canvas.width, canvas.height)
    player.update()
    player.forEach((player, index) => {
        projectile.update()

        if (player.x + player.radius < 0 ||
            player.x - player.radius > canvas.width ||
            player.y + player.radius < 0 ||
            player.y - player.radius > canvas.height) {
            setTimeout(() => {
                player.splice(index, 1)
            }, 0)
        }
    })
    projectiles.forEach((projectile, index) => {
        projectile.update()

        if (projectile.x + projectile.radius < 0 ||
            projectile.x - projectile.radius > canvas.width ||
            projectile.y + projectile.radius < 0 ||
            projectile.y - projectile.radius > canvas.height) {
            setTimeout(() => {
                projectiles.splice(index, 1)
            }, 0)
        }
    })

    enemies.forEach((enemy, index) => {
        enemy.update()

        const dist = Math.hypot(
            player.x - enemy.x,
            player.y - enemy.y
        )
        if (dist - enemy.radius - player.radius < 1) {
            cancelAnimationFrame(animationId)
        }
        projectiles.forEach((projectile, projectileIndex) => {
            const dist = Math.hypot(
                projectile.x - enemy.x,
                projectile.y - enemy.y
            )
            if (dist - enemy.radius - projectile.radius < 1) {
                setTimeout(() => {
                    enemies.splice(index, 1)
                    projectiles.splice(projectileIndex, 1)
                }, 0)
            }
        });
    })
}

addEventListener('click', (event) => {
    const angle = Math.atan2(
        event.clientY - canvas.height / 2,
        event.clientX - canvas.width / 2
    )
    const velocity = {
        x: Math.cos(angle),
        y: Math.sin(angle)
    }
    projectiles.push(
        new Projectile(
            canvas.width / 2,
            canvas.height / 2,
            5,
            'red',
            velocity
        )
    )
})

animate()
spawnEnemies()