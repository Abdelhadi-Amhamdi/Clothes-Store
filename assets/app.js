// selectors
const display_section = document.querySelector(".section-display-items");
const shopping_card = document.querySelector(".shopping-card");
const form_search = document.querySelectorAll("#search-form");
const crd_ul = document.querySelector(".list-of-items-card");
const order_section = document.querySelector(".sent-order");
const cards_section = document.querySelector(".all-prods");
const favs_list = document.querySelector(".list-of-favs");
const total_number = document.querySelector(".total-num");
const background = document.querySelector(".background");
const btn_search = document.querySelector(".search-btn");
const fv_ul = document.querySelector(".list-favourits");
const order_btn = document.querySelector(".btn-block");
const ul_list = document.querySelector(".orders_list");
const prods = document.querySelector(".list-of-prods");
const cd_dot = document.querySelector(".cd-num-items");
const fv_dot = document.querySelector(".fv-num-items");
const circles = document.querySelectorAll(".circle");
const alert = document.querySelector(".sweet-alert");
const close_btn = document.querySelector(".close");
const btnAll = document.querySelector(".see-all");
const square = document.querySelector(".square");
const cats = document.querySelectorAll(".cat");
const li = document.querySelectorAll("li");

// global variables
let list_of_items_in_shoppin_card;
let list_of_favourits;
let Add_to_favs_btns;
let list_prods = [];
let favs = [];
let card = [];
let cd_num = 0;
let fv_num = 0;
let index = 3;
let total = 0;
let orders_data;
let IconsArray;
let data_item;
let username;
let before;
let adress;
let after;

// setting the data
import("./data.js").then((res) => {
  // getting the data and desplay it
  list_prods = res.Prods;
  setData(list_prods);

  // searching for products
  form_search.forEach((form) => {
    form.addEventListener("submit", search);
  });

  // display detail products
  const see_items_btns = document.querySelectorAll(".see-item");
  see_items_btns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      see_details(e);
    });
  });

  Add_to_favs_btns = document.querySelectorAll(".add-fv");
  // add product to favourits list
  Add_to_favs_btns.forEach((btn) => {
    btn.addEventListener("click", add_to_favs);
  });

  const more_btn = document.querySelectorAll(".more-btn");
  more_btn.forEach(btn => {
    btn.addEventListener("click", (e) => {
      const button = e.target.parentElement.parentElement.querySelector('.add-fav')
      button.style.display = "block";
      button.addEventListener('click' , add_to_favs)
    });
  })
  
  // add products to shopping card
  const Add_to_card_btn = document.querySelector(".icon");
  Add_to_card_btn.addEventListener("click", add_to_card);
});

// search function
function search(e) {
  e.preventDefault();
  const data = e.target.querySelector("input").value;
  const new_list_prods = list_prods.filter((item) => item.title === data);
  removeAllProds();
  setData(new_list_prods);
  show_All_Products();
}

// desplay the deatails of products function
function see_details(e) {
  display_section.style.display = "block";
  prods.style.display = "none";
  shopping_card.style.display = "none";
  favs_list.style.display = "none";
  square.style.display = "none";
  order_section.style.display = "none";
  const item_index =
    e.target.parentElement.parentElement.getAttribute("data-id");
  data_item = list_prods[Number(item_index) - 1];
  display_section.querySelector("img").setAttribute("src", data_item.img);
  display_section.querySelector("h5.title").innerText = data_item.title;
  display_section.querySelector("h5.price").innerText = `${data_item.price} DH`;
}

// add products to favs list function
function add_to_favs(btn) {
  btn.target.style.display = "none"
  const crd = btn.target.parentElement.parentElement.parentElement;
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
  sweet_alert("لقد تمت اضافة المنتج الى قائمة المنتوجات المفضلة بنجاح");
}

// sweet alert function
function sweet_alert(data) {
  alert.style.display = "block";
  alert.querySelector(".progress-bar").style.width = "10%";
  alert.querySelector(".content").innerText = data;
  const interval = setInterval(() => {
    const bar = alert
      .querySelector(".progress-bar")
      .style.width.replace("%", "");
    alert.querySelector(".progress-bar").style.width = Number(bar) + 2.5 + "%";
  }, 125);
  setTimeout(() => {
    alert.style.display = "none";
    clearInterval(interval);
  }, 5000);
}

// add product to shopping card function
function add_to_card(e) {
  const crd = e.target.parentElement.parentElement.parentElement;
  const size = crd
    .querySelector(".sizes")
    .querySelector(".circle.active").innerText;
  const img = data_item.img;
  const title = data_item.title;
  const price = data_item.price;
  const obg = {
    img,
    title,
    price,
    size,
  };
  card.unshift(obg);

  localStorage.setItem("card", JSON.stringify(card));
  cd_num += 1;
  cd_dot.innerText = cd_num;
  sweet_alert("لقد تمت اضافة المنتج الى سلة التسوق بنجاح");
}

// remove all products before setting new data
function removeAllProds() {
  const latest = cards_section.querySelectorAll(".col-6");
  latest.forEach((item) => {
    item.remove();
  });
}

// set the products data
function setData(data) {
  removeAllProds();
  for (var i = 0; i < data.length; i++) {
    const card = document.createElement("div");
    card.setAttribute("class", "col-6 col-lg-6 col-md-6 col-sm-6 col-xl-6");
    card.innerHTML = `
          <div class="card" data-id="${data[i].id}">
            <div class="btns more-btn">
              <i class="fas fa-ellipsis-v"></i>
            </div>
            <div class="add-fav">
              save
            </div>
            <img
              class="card-img-top"
              src="${data[i].img}"
              loading="lazy"
            />
            <div class="card-body">
              <h4 class="card-title see-item">${data[i].title}</h4>
              <p class="card-text">
              ${data[i].cat}<span class="prod-price">${data[i].price}</span>DH
              </p>
            </div>
          </div>`;

    cards_section.append(card);
  }
  
}

// navigation bettwen sections

// go to order section
order_btn.addEventListener("click", go_to_order_page);

// go to order section function
function go_to_order_page() {
  // geting the shopping card items from local storage
  orders_data = JSON.parse(localStorage.getItem("card"));

  // if its null set this alert
  if (orders_data == [].includes()) {
    alert("لا توجد منتوجات في سلة تسوقك");
    // else set the data
  } else {
    // switch the section navegation to orders page
    deleteAllActive();
    switchNav(1, document.getElementById(1));
    prods.style.display = "none";
    shopping_card.style.display = "none";
    favs_list.style.display = "none";
    square.style.display = "none";
    order_section.style.display = "block";

    // seting the data
    for (let i = 0; i < orders_data.length; i++) {
      const li_item = document.createElement("li");
      li_item.innerHTML = `
          <span class="quantity">1</span>ps *
          <span class="price">${orders_data[i].price}</span> DH 
      `;
      ul_list.append(li_item);
      // calc the total
      total += Number(orders_data[i].price);
      total_number.innerText = total;
    }

    // sent order via whatsapp
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

// manage categories
cats.forEach((cat) => {
  cat.addEventListener("click", (e) => {
    // remove the claas active for all elements
    cats.forEach((item) => {
      item.classList.remove("active");
    });
    // get the id
    const name_cat = e.srcElement.id;

    // make btn active
    const div_item = document.getElementById(name_cat);
    div_item.classList.add("active");

    // filler the data and set it
    const new_arr = list_prods.filter(
      (prod) => prod.cat === name_cat || prod.sex === name_cat
    );
    setData(new_arr);

    // display detail products
    const see_items_btns = document.querySelectorAll(".see-item");
    see_items_btns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        see_details(e);
      });
    });

    const Add_to_favs_btns = document.querySelectorAll(".add-fv");
    // add product to favourits list
    Add_to_favs_btns.forEach((btn) => {
      btn.addEventListener("click", add_to_favs);
    });
  });
});

// mangae sizes
circles.forEach((size) => {
  size.addEventListener("click", (e) => {
    circles.forEach((item) => {
      item.classList.remove("active");
    });
    e.target.classList.add("active");
  });
});

// hide the details section
close_btn.addEventListener("click", () => {
  display_section.style.display = "none";
  prods.style.display = "block";
  shopping_card.style.display = "none";
  favs_list.style.display = "none";
  square.style.display = "none";
  order_section.style.display = "none";
});

// shoping card and list of favs state
if (localStorage.getItem("card") !== null) {
  cd_num += JSON.parse(localStorage.getItem("card")).length;
}
if (localStorage.getItem("favs") !== null) {
  fv_num += JSON.parse(localStorage.getItem("favs")).length;
}

cd_dot.innerText = cd_num;
fv_dot.innerText = fv_num;

// navigation listners
li.forEach((item) => {
  switchNav(index);

  item.addEventListener("click", (e) => {
    deleteAllActive();
    index = item.getAttribute("id");

    switchNav(index, item);
    if (item.getAttribute("id") === "3") {
      go_Back_Home();
    }
    if (item.getAttribute("id") === "2") {
      show_All_Products();
    }
    if (item.getAttribute("id") === "4") {
      show_My_Card();
    }
    if (item.getAttribute("id") === "5") {
      show_My_favs_List();
    }
  });
});

// all products
btnAll.addEventListener("click", show_All_Products);
function show_All_Products() {
  prods.style.display = "block";
  square.style.display = "none";
  shopping_card.style.display = "none";
  favs_list.style.display = "none";
  order_section.style.display = "none";
  display_section.style.display = "none";
  deleteAllActive();
  switchNav((index = 2), (item = document.getElementById(2)));
}

// home page
function go_Back_Home() {
  prods.style.display = "none";
  shopping_card.style.display = "none";
  favs_list.style.display = "none";
  square.style.display = "block";
  order_section.style.display = "none";
  display_section.style.display = "none";
  deleteAllActive();
  switchNav((index = 3), (item = document.getElementById(3)));
}

// delete all active items in nav
function deleteAllActive() {
  li.forEach((listItem) => {
    listItem.classList.remove("active");
    listItem.style.borderRadius = "0";
  });
}

// switch nav function
function switchNav(index, item = null) {
  before = document.getElementById(Number(index) - 1);
  after = document.getElementById(Number(index) + 1);
  if (before) {
    before.style.borderTopRightRadius = "30px";
  }
  if (after) {
    after.style.borderTopLeftRadius = "30px";
  }
  if (item) {
    item.classList.add("active");
  }
}

// show shopping card section
function show_My_Card() {
  // delete all last items in shopping card before seting new data
  const last = crd_ul.querySelectorAll("li");
  last.forEach((item) => {
    item.remove();
  });

  square.style.display = "none";
  shopping_card.style.display = "block";
  favs_list.style.display = "none";
  prods.style.display = "none";
  order_section.style.display = "none";
  display_section.style.display = "none";

  list_of_items_in_shoppin_card = JSON.parse(localStorage.getItem("card"));

  // seting the data
  for (let i = 0; i < list_of_items_in_shoppin_card.length; i++) {
    const li = document.createElement("li");
    li.setAttribute("class", "card-item");
    li.innerHTML = `
    <img src="${list_of_items_in_shoppin_card[i].img}" loading="lazy" />
    <h4>${list_of_items_in_shoppin_card[i].title}</h4>
    <h4>${list_of_items_in_shoppin_card[i].size}</h4>
    <h5>${list_of_items_in_shoppin_card[i].price} DH</h5>

    <div class="rmv-btn-crd">X</div>
    `;
    crd_ul.append(li);
  }
  if (list_of_items_in_shoppin_card.length > 0) {
    const vide = document.querySelector(".crd-vide");
    if (vide) {
      vide.style.display = "none";
    }
  }

  // remove item from shopping card
  const rmv_btns = document.querySelectorAll(".rmv-btn-crd");
  rmv_btns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const div = btn.parentElement;
      const name = div.querySelector("h4").textContent;
      div.remove();
      const newarr = list_of_items_in_shoppin_card.filter(
        (item) => item.title === name
      );
      const item_index = list_of_items_in_shoppin_card.indexOf(newarr[0]);
      list_of_items_in_shoppin_card.splice(item_index, 1);

      localStorage.setItem(
        "card",
        JSON.stringify(list_of_items_in_shoppin_card)
      );
      cd_num -= 1;
      cd_dot.innerText = cd_num;
    });
  });
}

// display favourite items section
function show_My_favs_List() {
  // delete all latest item before seting new data
  const last = fv_ul.querySelectorAll("li");
  last.forEach((item) => {
    item.remove();
  });

  square.style.display = "none";
  favs_list.style.display = "block";
  shopping_card.style.display = "none";
  prods.style.display = "none";
  order_section.style.display = "none";
  display_section.style.display = "none";

  // seting the data
  list_of_favourits = JSON.parse(localStorage.getItem("favs"));
  if (list_of_favourits !== null) {
    for (let i = 0; i < list_of_favourits.length; i++) {
      const li = document.createElement("li");
      li.setAttribute("class", "fav-item");
      li.innerHTML = `
      <img src="${list_of_favourits[i].img}" loading="lazy" />
      <h4>${list_of_favourits[i].title}</h4>
      <div class="rmv-btn">X</div>
      `;
      fv_ul.append(li);
    }
    if (list_of_favourits.length > 0) {
      const vide = document.querySelector(".fv-vide");
      if (vide) {
        vide.style.display = "none";
      }
    }
  }

  // remove item from list of favourites
  const rmv_btns = document.querySelectorAll(".rmv-btn");
  rmv_btns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const div = btn.parentElement;
      const name = div.querySelector("h4").textContent;
      div.remove();
      const newarr = list_of_favourits.filter((item) => item.title === name);
      const item_index = list_of_favourits.indexOf(newarr[0]);
      list_of_favourits.splice(item_index, 1);

      localStorage.setItem("favs", JSON.stringify(list_of_favourits));
      fv_num -= 1;
      fv_dot.innerText = fv_num;
    });
  });
}

// set svg icons
import("./icons.js").then((res) => {
  IconsArray = res.Icons;

  // heart icon
  const nav_heart = document.getElementById(5);
  const Hearticon = document.createElement("div");
  Hearticon.innerHTML = IconsArray[2].icon;
  nav_heart.appendChild(Hearticon);

  // bage icon
  const nav_bage = document.getElementById(4);
  const bageicon = document.createElement("div");
  bageicon.innerHTML = IconsArray[1].icon;
  nav_bage.appendChild(bageicon);

  // home icon
  const nav_home = document.getElementById(3);
  const homeicon = document.createElement("div");
  homeicon.innerHTML = IconsArray[3].icon;
  nav_home.appendChild(homeicon);

  // shop icon
  const nav_shop = document.getElementById(2);
  const shopicon = document.createElement("div");
  shopicon.innerHTML = IconsArray[4].icon;
  nav_shop.appendChild(shopicon);

  // whatsapp icon
  const nav_whatsapp = document.getElementById(1);
  const whatsappicon = document.createElement("div");
  whatsappicon.innerHTML = IconsArray[5].icon;
  nav_whatsapp.appendChild(whatsappicon);

  // search icon
  const search_form_icon = document.querySelector(".home-search");
  const searchicon = document.createElement("div");
  searchicon.innerHTML = IconsArray[0].icon;
  searchicon.classList.add("search-btn");
  search_form_icon.appendChild(searchicon);

  // all search icon
  const all_search_form_icon = document.querySelector(".all-home-search");
  const all_search_icon = document.createElement("div");
  all_search_icon.innerHTML = IconsArray[0].icon;
  all_search_icon.classList.add("search-btn");
  all_search_form_icon.appendChild(all_search_icon);

  // card part icon
  const card_part_icon = document.querySelector(".card-part-icon");
  card_part_icon.innerHTML = IconsArray[1].icon;

  // favs part icon
  const favs_part_icon = document.querySelector(".fav-part-icon");
  favs_part_icon.innerHTML = IconsArray[2].icon;
});
