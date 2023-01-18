let aboutWrap = document.querySelector(".about__wrapper")
let loading = document.querySelector(".about__loading")
let searchInp = document.querySelector(".hero__inp")
let sortSelect = document.querySelector(".about__select")
let categoryBtn = document.querySelector(".about__list")

const api = "http://localhost:5000"
let count = 1

async function categoryData(){
    const dataCategory = await fetch(api + "/category")
    const parseCategoryData = await dataCategory.json()
    parseCategoryData.forEach(item => {
        let li = document.createElement("li")
        let btn = document.createElement("button")
        li.id = item.id 
        btn.textContent = item.name
        li.setAttribute("class", "about__item")
        li.append(btn)
        categoryBtn.append(li)
    })
    let liItem = document.querySelectorAll(".about__item")
    liItem[0].classList.add("about__item--active")
    liItem.forEach(item => {
        item.addEventListener('click' , function(){
            count = item.id
            liItem.forEach(clicked => clicked.classList.remove("about__item--active"))
            item.classList.toggle("about__item--active")
            getData(count)
        })
    })
}
categoryData()


const getData = async function(DataId){
    aboutWrap.innerHTML = ""
    loader(true)
    let data = await fetch(api + `/food/${DataId}`)
    let parseData = await data.json()
    loader(false)
    renderData(parseData)
    return parseData
}

const renderData = function(dataGet){
    aboutWrap.innerHTML = ""
    dataGet.forEach(item => {
        aboutWrap.innerHTML += `
            <li class="about__inner about-item" onclick="serviceRender(${item.id})" onclick="serviceRender(${dataGet})">
                <img src="http://localhost:5000/${item.images}" alt="" class="about-item__img">
                <h4 class="about-item__title">${item.name}</h4>
                <u class="about-item__price">$ ${item.price}</u>
                <p class="about-item__text">${item.bowls} Bowls available</p>
            </li>
        `
    })
}

searchInp.addEventListener("input" , function(){
    getData(count).then(item => {
        let filter = item.filter(item => item.name.toLowerCase().includes(searchInp.value.toLowerCase()))
        renderData(filter)
    })
})
sortSelect.addEventListener("change" , function(){
        getData(count).then(item => {
            if(sortSelect.value == 1){
                renderData(item)
            }
            else if(sortSelect.value == 2){
                let filterSort = item.sort((a,b) => b.price - a.price)
                renderData(filterSort)
            }
            else if(sortSelect.value == 3){
                filterSort = item.sort((a,b) => a.price - b.price)
                renderData(filterSort)
            }
        })
})
function loader(state){
    if(state){
        loading.classList.remove('about__loading--none')
    }
    else{
        loading.classList.add('about__loading--none')
    }
}

let serviceList = document.querySelector('.service__list')

let arr = []
// let serviceCount = 0
let servcieCount = 0
async function serviceRender(idData){
    let idCount = []
    let serviceData = await getData(count).then(data => {
        data.filter(item => {
            if(item.id == idData){
                arr.push(item)
            }
            // else if(item.id == )
        })
        if(idCount.includes(idData)){
            servcieCount++
        }
        
    })
// console.log(arr);
    let serviceCommit = ""
    // function idServiceCount(countId){
        //     if(idCount.includes(idData)){
            
            //     }
            // }
            // serviceCount++
            console.log(idCount);
            servcieCount +=1
    if(!idCount.includes(idData)){
        serviceList.innerHTML = ""
        let arrCount = arr.filter(dataItem => {
            return dataItem.id ===idData
        })
        console.log(arrCount[0].id);
            idCount.push(arrCount.id)
            serviceCommit = arrCount[0].name
                serviceList.innerHTML += `
                    <li class="service__item">
                        <div class="service__inner">
                            <img id="serviceImg" src="http://localhost:5000/${arrCount[0].images}" alt="" class="service__img">
                            <div class="service__middle">
                                <p class="service__commit">${serviceCommit.split("").slice(0, 18).join("")}...</p>
                                <u class="service__price">$ ${arrCount[0].price}</u>
                            </div>
                            <span class="service__count">${servcieCount}</span>
                            <u class="service__leftprice">$ 4,58</u>
                        </div>  
                        <div class="service__form">
                            <input type="text" id="" class="service__inp" placeholder="Order Note...">
                            <button class="service__btn" onclick="serviceDel(${arrCount[0].id})"><img src="./images/Vector.svg" alt=""></button>
                        </div>
                    </li>
                `
    }
    else if(!idCount.includes(idData)){
        // serviceList.innerHTML = ""
        arrCount = arr.filter(dataItem => {
            return dataItem.id ===idData
        })
        console.log(arrCount[0].id);
            idCount.push(arrCount.id)
            serviceCommit = arrCount[0].name
                serviceList.innerHTML = `
                    <li class="service__item">
                        <div class="service__inner">
                            <img id="serviceImg" src="http://localhost:5000/${arrCount[0].images}" alt="" class="service__img">
                            <div class="service__middle">
                                <p class="service__commit">${serviceCommit.split("").slice(0, 18).join("")}...</p>
                                <u class="service__price">$ ${arrCount[0].price}</u>
                            </div>
                            <span class="service__count">${servcieCount}</span>
                            <u class="service__leftprice">$ 4,58</u>
                        </div>  
                        <div class="service__form">
                            <input type="text" id="" class="service__inp" placeholder="Order Note...">
                            <button class="service__btn" onclick="serviceDel(${arrCount[0].id})"><img src="./images/Vector.svg" alt=""></button>
                        </div>
                    </li>
                `
    }
       

}
// function serviceDel(delBtn){
//     console.log(delBtn);
// }
getData(count)