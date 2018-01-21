class Tab {
    constructor(e) {

        document.addEventListener('click', function(e) {

            let target = e.target
            if ( target.dataset.role !== 'tab') return



            [].forEach.call(target.parentElement.children , child =>{
                child.classList.remove('active')
            })
            target.classList.add('active')


            let content = document.querySelector(target.dataset.view);
            if(content){
                // 隐藏其他tab
                [].forEach.call(content.parentElement.children , child =>{
                    child.classList.add('hide')
                })
                // 显示点击tab
                content.classList.remove('hide')
            }
        });
    }

}

export default Tab
