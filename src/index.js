import 'normalize.css'
import './style.less'
import Slider from'./scripts/slider.js'

(function() {

    let options = {
        element:document.querySelector('#slider'),
        sliders:[
            {link:'#1', image:'./images/slider1.jpg'},
            {link:'#2', image:'./images/slider2.jpg'},
            {link:'#3', image:'./images/slider3.jpg'},
            {link:'#4', image:'./images/slider4.jpg'},
            {link:'#5', image:'./images/slider5.jpg'}
        ]
    }


    let slider = new Slider(options)
    window.slider = slider







}())
