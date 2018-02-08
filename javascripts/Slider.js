export class Slider {
  constructor(options = {}) {
    this.$el = options.el
    this.$el.innerHTML = ""
    this.slides = options.slides
    this.interval = options.interval || 3000
    this.index = 0 

    this.render()
    this.start()
  }

  render() {
    this.$el.innerHTML = `<div class="qq-slider-wrap"></div>`
    this.$wrap = this.$el.firstElementChild

  

    this.$wrap.style.width = `${(this.slides.length+1) * 100}%`

    this.$wrap.innerHTML = this.slides.map( slide =>
        `<div class="qq-slider-item">
          <a href="${slide.link}">
            <img src="${slide.image}" alt="img">
          </a>
        </div>
    `).join('')
    
    let firstImg = document.querySelector('.qq-slider-wrap').firstChild
    this.$wrap.appendChild(firstImg.cloneNode(true))
  }

  start(){
    setInterval(this.next.bind(this),this.interval)
  }

  next(){
    if (this.$wrap.style.transition === "none") {
      this.$wrap.style.transition = '1s'
    }
    this.index += 1
    if(this.index === (this.slides.length + 1)){
      this.$wrap.style.transition = "none"
      this.$wrap.style.transform = `translate(0)`
      this.index = 0
      return
    }
    let x = `-${ this.index * 100 / (this.slides.length +1)}%`
    this.$wrap.style.transform = `translate(${x})`
  }



}
