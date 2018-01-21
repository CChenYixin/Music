import 'normalize.css'
import './style.less'
import Slider from './scripts/slider.js'
import Tab from './scripts/Tab.js'
import lazyload from './scripts/Lazyload.js'

(function() {


    fetch('./json/res.json')
        .then(res => res.json())
        .then(render)

    function render(json){
        renderSlider(json.data.slider)
        renderRadio(json.data.radioList)
        renderSong(json.data.songList)
        lazyload(document.querySelectorAll('.lazyload'))
    }

    function renderSlider(sliders){
        sliders = sliders.map(slide =>{
             return {link:slide.linkUrl,image:slide.picUrl}
        })
        new Slider({
            element : document.querySelector('#slider'),
            sliders : sliders
        })
    }
 
    function renderRadio(radios){
        let radioList = document.querySelector('.radio-list');


       radioList.innerHTML =  radios.map(radio => `
            <li class="radio-item">
                <a href="">
                    <div class="item-image">
                        <img class="lazyload" data-src="${radio.picUrl}" alt="radio">
                        <span class="icon"></span>
                    </div>
                    <div class="item-info">
                        <h3>${radio.Ftitle}</h3>
                    </div>
                </a>
            </li>
        `).join('')
    }

    function renderSong(songs){
        let hotList = document.querySelector('.hot-list');

        hotList.innerHTML = songs.map(song => `
            <li class="hot-item">
            <a href="">
                <div class="item-image">
                    <img class="lazyload" data-src="${song.picUrl}" alt="song">
                    <span class="icon"></span>
                </div>
                <div class="item-info">
                    <h3>${song.Ftitle}</h3>
                </div>
            </a>
        </li>
        `).join('')
    }

    let tab = new Tab()

}())
