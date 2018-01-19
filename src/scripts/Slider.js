class Slider {
    constructor(options = {}) {
        this.element = options.element
        this.sliders = options.sliders
        this.interval = options.interval || 3000
        this.index = 0
        this.render()
        this.start()
    }


    start(){
        setInterval(this.next.bind(this), this.interval);
    }

    next(){

        this.index += 1
        if (this.index === this.sliders.length ) {
            this.wrap.style.transform = `translateX(0)`
            this.index = 0
            return
        }
        let offset = `-${this.index * 100 / this.sliders.length}%`
        this.wrap.style.transform = `translateX(${offset})`
    }


    render(){
        this.element.innerHTML = `<div class="ui-slider-wrap"></div>`
        this.wrap = this.element.firstElementChild
        this.wrap.style.width = `${this.sliders.length * 100}%`

        let template = this.sliders.map((slide)=>
            `<div class="ui-slider-item">
                <a href="${slide.link}"><img src="${slide.image}" alt=""></a>
            </div>`
        ).join('')


        this.wrap.innerHTML = template

    }
}

export default Slider
