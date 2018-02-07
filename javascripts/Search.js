class Search {
  constructor(el) {
    this.$el = el
    this.keyword = ''
    this.page = 1
    this.perpage = 20
    this.nomore = false
    this.fetching = false
    this.$songs = this.$el.querySelector('.song-list')
    this.$input = this.$el.querySelector('#search')
    this.$input.addEventListener('keyup', this.onKeyUp.bind(this))



    this.onscroll = this.onScroll.bind(this)
    window.addEventListener('scroll', this.onscroll)
  }



  // 监听

  onKeyUp(event) {
    let keyword = event.target.value.trim()
    if(!keyword) return this.reset()
    if (event.key !== 'Enter') return
    this.search(keyword)


  }

  // 滚动

  onScroll(event){
    if(this.nomore) return window.removeEventListener('scroll',this.onscroll)
    if(scrollY + document.documentElement.clientHeight > document.body.scrollHeight - 50){
      this.search(this.keyword,this.page + 1)
    }
  }




  // 搜索

  search(keyword,page) {
    if(this.fetching) return 
    this.keyword = keyword
    this.fetching = true
    fetch(`http://localhost:4000/search?keyword=${this.keyword}&page=${ page || this.page}`)
      .then(res => res.json())
      .then(json => {
        this.page = json.data.song.curpage
        this.nomore = (json.message === 'no results')
        return json.data.song.list
      })
      .then(songs => this.append(songs))
      .then( () => this.fetching = false)
      .catch( () => this.fetching = false)
  }

  // DOM插入

  append(songs) {
    let html = songs.map(song => {
      let artist = song.singer.map(s => s.name).join(' ')
      return `
        <a class="song-item"
           href="#player?artist=${artist}&songid=${song.songid}&songname=${song.songname}&albummid=${song.albummid}&duration=${song.interval}">
          <i class="icon icon-music"></i>
          <div class="song-name ellipsis">${song.songname}</div>
          <div class="song-artist ellipsis">${artist}</div>
        </a>`}).join('')

    this.$songs.insertAdjacentHTML('beforeend',html)
  }

  // 清空重置

  reset(){
    this.page = 1
    this.keyword = ''
    this.songs = {}
    this.nomore = false
    this.$songs.innerHTML = ''
  }







}