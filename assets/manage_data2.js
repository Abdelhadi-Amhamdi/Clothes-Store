const cats = document.querySelectorAll('.cat')
const circles = document.querySelectorAll('.circle')
const close_btn = document.querySelector('.close')

cats.forEach(cat => {
    
    cat.addEventListener('click' , (e)=> {

        // remove the claas active for all elements
        cats.forEach(item => {
            item.classList.remove('active')
        })
        // get the id
        const name_cat = e.srcElement.id

        // make btn active
        const div_item = document.getElementById(name_cat)
        div_item.classList.add('active')

        // filler the data and set it 
        const new_arr = list_prods.filter(prod => prod.cat === name_cat || prod.sex === name_cat)
        setData(new_arr)
    })
})

circles.forEach(size => {
    size.addEventListener('click' , (e)=> {
        circles.forEach(item => {
            item.classList.remove('active')
        })
        e.target.classList.add('active')
    })
})

close_btn.addEventListener('click' , ()=> {
    display_section.style.display = "none"
})

