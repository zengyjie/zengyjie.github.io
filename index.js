const canvas = document.querySelector('element')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

class Player {
    constructor(x, y, radius, color) {
        this.x
        this.y
        this.radius
        this.color
    }

    draw() {
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        c.fillstyle = this.color
        c.fill()
    }
}

const player = new Player(100, 100, 30, 'green')
player.draw()