const game = {
    title: 'Bouncing balls app yay',
    author: 'Ger',
    license: undefined,
    version: '1.0.0',
    ctx: undefined,
    balls: [],
    keys: {
        SPACE: ' '
    },
    canvasSize: {
        w: undefined,
        h: undefined
    },
    init() {
        this.ctx = document.querySelector('#balls').getContext('2d')
        this.setDimensions()
        this.setEventHandlers()
        this.start()
    },
    setDimensions() {
        this.canvasSize.w = window.innerWidth
        this.canvasSize.h = window.innerHeight
        document.querySelector('#balls').setAttribute('width', this.canvasSize.w)
        document.querySelector('#balls').setAttribute('height', this.canvasSize.h)
    },
    setEventHandlers() {
        document.onkeydown = event => (event.key === this.keys.SPACE) && this.createBall()
    },
    createBall() {
        const ball = new Ball(this.ctx, this.canvasSize)
        this.balls.push(ball)
    },
    start() {
        setInterval(() => {
            this.clearAll()
            this.moveAll()
            this.drawAll()
        }, 20)
    },
    clearAll() {
        this.ctx.clearRect(0, 0, this.canvasSize.w, this.canvasSize.h)
        this.balls = this.balls.filter(elm => elm.ballPos.x >= 0)           // memory 
    },
    moveAll() {
        this.balls.forEach(elm => elm.move())
    },
    drawAll() {
        this.balls.forEach(elm => elm.draw())
    }
}