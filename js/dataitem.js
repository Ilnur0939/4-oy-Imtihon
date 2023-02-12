let headerList = document.querySelector(".about__list");
let foodList = document.querySelector(".about__wrapper");
let serviceList = document.querySelector(".service");
let orderList = document.querySelector(".service__list");
let priceResult = document.querySelector(".service__result");

async function menu() {
  let data = await fetch("http://localhost:5000/category");
  let parseData = await data.json();

  for (let i of parseData) {
    let li = document.createElement("li");
    let btn = document.createElement("button");
    li.id = i.id;
    btn.textContent = i.name;
    li.setAttribute("class", "about__item");
    btn.textContent = i.name;
    headerList.append(li);
    li.append(btn);
    let liItem = document.querySelectorAll(".about__item");
    liItem[0].classList.add("about__item--active");
    liItem.forEach((item) => {
      item.addEventListener("click", function () {
        getFood(i.id);
        count = item.id;
        liItem.forEach((clicked) =>
          clicked.classList.remove("about__item--active")
        );
        item.classList.toggle("about__item--active");
      });
    });
  }
}

menu();

let result = [];
console.log(result);
async function getFood(id = 1) {
  foodList.innerHTML = null;
  let data = await fetch("http://localhost:5000/food/" + id);
  let parseData = await data.json();
  console.log(parseData);
  for (let i of parseData) {
    let li = document.createElement("li");
    li.setAttribute("class", "about__inner about-item");

    li.innerHTML = `
            <img src="http://localhost:5000/${i.images}" alt="" class="about-item__img">
            <h4 class="about-item__title">${i.name}</h4>
            <u class="about-item__price">$ ${i.price}</u>
            <p class="about-item__text">${i.bowls} Bowls available</p>
        `;
    li.addEventListener("click", function () {
      serviceList.classList.add("wrapper-right-active");

      
      let find = result.findIndex((item) => item.id == i.id);
      
      if (find >= 0) {
          result[find].count += 1;
        } else {
            result.push({ ...i, count: 1 });
        }
        
        
        orderRender();
    });
    
    foodList.append(li);
}
}

getFood();

function orderRender() {
  orderList.innerHTML = null;
  for (let i of result) {
    let li = document.createElement("li");
    li.setAttribute("class", "service__item");
    let div = document.createElement("div")
    let input = document.createElement("input")
    let btn = document.createElement("button")
    let img = document.createElement("img")
    
    img.src = "./images/Vector.svg"
    div.setAttribute("class", "service__form")
    input.setAttribute("class" , "service__inp")
    input.placeholder = "Order Note..."
    btn.setAttribute("class", "service__btn")
    
    li.innerHTML = `
    <div class="service__inner">
    <img id="serviceImg" src="http://localhost:5000/${i.images}" alt="" class="service__img">
    <div class="service__middle">
    <p class="service__commit">${i.name.slice(10)}...</p>
    <u class="service__price">$${i.price}</u>
    </div>
    <span class="service__count">${i.count}</span>
    <u class="service__leftprice">$ ${(i.count * i.price).toFixed(1)}</u>
    </div>
    `;
    
    
    console.log(result);
    priceResult.textContent = "$ "+ result.reduce((a,b) => a + (+b.price * b.count), 0).toFixed(2)
    btn.addEventListener("click", function(){
        if(result.length == 0 ){
            serviceList.classList.remove("wrapper-right-active")
        }
        let findIndex = result.findIndex(item => item.id === i.id)
            if(result[findIndex].count == 1){
            li.remove()
                result = result.filter(item => item.id !== i.id)
            }
            else{
                result[findIndex].count -=1
            }
            orderRender()
        })
        div.append(input, btn)
        li.append(div)
        btn.append(img)
        orderList.append(li)

  }
}

