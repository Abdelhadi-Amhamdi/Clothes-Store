const li = document.querySelectorAll("li");
const fv_ul = document.querySelector(".list-favourits");
const crd_ul = document.querySelector(".list-of-items-card");
const btnAll = document.querySelector(".see-all");
const prods = document.querySelector(".list-of-prods");
const square = document.querySelector(".square");
const shopping_card = document.querySelector(".shopping-card");
const favs_list = document.querySelector(".list-of-favs");
const background = document.querySelector(".background");
const cd_dot = document.querySelector(".cd-num-items");
const fv_dot = document.querySelector(".fv-num-items");

let index = 3;
let before;
let after;
let favs = [];
let card = [];
let list_of_favourits;
let list_of_items_in_shoppin_card;
let cd_num = 0;
let fv_num = 0;
let IconsArray;

if (localStorage.getItem("card") !== null) {
  cd_num += JSON.parse(localStorage.getItem("card")).length;
}
if (localStorage.getItem("favs") !== null) {
  fv_num += JSON.parse(localStorage.getItem("favs")).length;
}

cd_dot.innerText = cd_num;
fv_dot.innerText = fv_num;

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

btnAll.addEventListener("click", show_All_Products);

function show_All_Products() {
  prods.style.display = "block";
  square.style.display = "none";
  shopping_card.style.display = "none";
  favs_list.style.display = "none";
  order_section.style.display = "none";
  deleteAllActive();
  switchNav((index = 2), (item = document.getElementById(2)));
}

function go_Back_Home() {
  prods.style.display = "none";
  shopping_card.style.display = "none";
  favs_list.style.display = "none";
  square.style.display = "block";
  order_section.style.display = "none";
  deleteAllActive();
  switchNav((index = 3), (item = document.getElementById(3)));
}

function deleteAllActive() {
  li.forEach((listItem) => {
    listItem.classList.remove("active");
    listItem.style.borderRadius = "0";
  });
}

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

function show_My_Card() {
  const last = crd_ul.querySelectorAll("li");
  last.forEach((item) => {
    item.remove();
  });

  square.style.display = "none";
  shopping_card.style.display = "block";
  favs_list.style.display = "none";
  prods.style.display = "none";
  order_section.style.display = "none";

  list_of_items_in_shoppin_card = JSON.parse(localStorage.getItem("card"));

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

function show_My_favs_List() {
  const last = fv_ul.querySelectorAll("li");
  last.forEach((item) => {
    item.remove();
  });

  square.style.display = "none";
  favs_list.style.display = "block";
  shopping_card.style.display = "none";
  prods.style.display = "none";
  order_section.style.display = "none";

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
