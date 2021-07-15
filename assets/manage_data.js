const cards_section = document.querySelector(".all-prods");
const form_search = document.querySelectorAll(".home-search");
const btn_search = document.querySelector(".search-btn");
const display_section = document.querySelector('.section-display-items')

let list_prods = [];
let orders_data;
let total = 0;
let username;
let adress;

import("./data.js").then((res) => {
  list_prods = res.Prods;
  setData(list_prods);
  form_search.forEach((form) => {
    form.addEventListener("submit", search);
  });
  // btn_search.addEventListener('click' , search)

  // search
  function search(e) {
    e.preventDefault();
    const data = e.target.querySelector("input").value;
    const new_list_prods = list_prods.filter((item) => item.title === data);
    removeAllProds();
    setData(new_list_prods);
    show_All_Products();
  }

  const Add_to_favs_btns = document.querySelectorAll(".add-fv");
  const Add_to_card_btns = document.querySelectorAll(".add-cd");
  const see_items_btns = document.querySelectorAll(".see-item");


  see_items_btns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      display_section.style.display = "block"
      const item_index = e.target.parentElement.parentElement.parentElement.getAttribute('data-id')
      const data_item = list_prods[Number(item_index)-1]
      display_section.querySelector('img').setAttribute('src' , data_item.img)
      display_section.querySelector('h5.title').innerText = data_item.title
      display_section.querySelector('h5.price').innerHTML =  `${data_item.price} <span>DH</span>`

    });
  });

  Add_to_favs_btns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const crd = btn.parentElement.parentElement;
      const img = crd.querySelector("img.card-img-top").src;
      const title = crd.querySelector(".card-title").textContent;
      const obg = {
        img,
        title,
      };
      favs.unshift(obg);

      localStorage.setItem("favs", JSON.stringify(favs));
      fv_num += 1;
      fv_dot.innerText = fv_num;
    });
  });
  Add_to_card_btns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const crd = btn.parentElement.parentElement;
      const img = crd.querySelector("img.card-img-top").src;
      const title = crd.querySelector(".card-title").textContent;
      const price = crd.querySelector(".prod-price").textContent;
      const obg = {
        img,
        title,
        price,
      };
      card.unshift(obg);

      localStorage.setItem("card", JSON.stringify(card));
      cd_num += 1;
      cd_dot.innerText = cd_num;
    });
  });
});

function removeAllProds() {
  const latest = cards_section.querySelectorAll(".col-6");
  latest.forEach((item) => {
    item.remove();
  });
}

function setData(data) {
  const last_prods = cards_section.querySelectorAll(".col-6");
  last_prods.forEach((prod) => {
    prod.remove();
  });
  for (var i = 0; i < data.length; i++) {
    const card = document.createElement("div");
    card.setAttribute("class", "col-6 col-lg-6 col-md-6 col-sm-6 col-xl-6");
    card.innerHTML = `
          <div class="card" data-id="${data[i].id}">
            <div class="btns">
              <div class="btn add-fv">
                ${IconsArray[2].icon}
              </div>
              <div class="btn add-cd">
                ${IconsArray[1].icon}
              </div>
              <div class="btn see-item">
                ${IconsArray[1].icon}
              </div>
            </div>
            <img
              class="card-img-top"
              src="${data[i].img}"
              loading="lazy"
            />
            <div class="card-body">
              <h4 class="card-title">${data[i].title}</h4>
              <p class="card-text">
              natural<span class="prod-price">${data[i].price}</span>DH
              </p>
            </div>
          </div>
          `;
    cards_section.append(card);
  }
  
}

const order_section = document.querySelector(".sent-order");
const order_btn = document.querySelector(".btn-block");

order_btn.addEventListener("click", go_to_order_page);
const ul_list = document.querySelector(".orders_list");
const total_number = document.querySelector(".total-num");

function go_to_order_page() {
  orders_data = JSON.parse(localStorage.getItem("card"));

  if (orders_data == [].includes()) {
    alert("لا توجد منتوجات في سلة تسوقك");
  } else {
    deleteAllActive();
    switchNav(1, document.getElementById(1));
    prods.style.display = "none";
    shopping_card.style.display = "none";
    favs_list.style.display = "none";
    square.style.display = "none";
    order_section.style.display = "block";
    for (let i = 0; i < orders_data.length; i++) {
      const li_item = document.createElement("li");
      li_item.innerHTML = `
          <span class="quantity">1</span>ps *
          <span class="price">${orders_data[i].price}</span> DH 
      `;
      ul_list.append(li_item);
      total += Number(orders_data[i].price);
      total_number.innerText = total;
    }
    console.log(orders_data);
    const btn_make_order = document.querySelector(".btn-make-order");

    btn_make_order.addEventListener("click", () => {
      adress = document.getElementById("user-adresse").value;
      username = document.querySelector(".username").value;
      const data = document
        .querySelector(".data")
        .textContent.toString()
        .trim();
      const number_phone = "+212621420623";
      const message = `الطلب = ${data} \n
      الاسم : ${username} \n
      العنوان : ${adress}
      `;
      getLinkWhastapp(number_phone, message);
      // console.log(data)
    });
    function getLinkWhastapp(number, message) {
      var url =
        "https://api.whatsapp.com/send?phone=" +
        number +
        "&text=" +
        encodeURIComponent(message);

      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("target", "_blanck");
      link.innerText = "اضغط مجددا";
      btn_make_order.innerText = " ";
      btn_make_order.append(link);
      return url;
    }
  }
}
