class Ball {
    constructor(context, gameSize) {
        this.ctx = context
        this.gameSize = gameSize

        this.ballPos = { x: 0, y: 50 }
        this.ballVel = { x: 10, y: 2 }
        this.ballSize = { w: 50, h: 50 }
        this.ballPhysics = { gravity: .4 }
        this.ballImage = 'img/basketball.png'

        this.ballInstance = undefined

        this.init()
    }

    init() {
        this.ballInstance = new Image()
        this.ballInstance.src = this.ballImage
    }

    draw() {
        this.ctx.drawImage(
            this.ballInstance,
            this.ballPos.x,
            this.ballPos.y,
            this.ballSize.w,
            this.ballSize.h
        )
    }

    move() {

        if (this.ballPos.y >= this.gameSize.h - this.ballSize.h) {
            this.ballVel.y *= -1
        }

        if (this.ballPos.x >= this.gameSize.w - this.ballSize.w) {
            this.ballVel.x *= -1
        }

        this.ballPos.x += this.ballVel.x
        this.ballVel.y += this.ballPhysics.gravity
        this.ballPos.y += this.ballVel.y
    }
}