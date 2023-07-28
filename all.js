const input = document.querySelector(".card input");
const addBtn = document.querySelector(".btn_add");

const list = document.querySelector(".list");
const tab = document.querySelector(".tab");
const footer = document.querySelector(".list_footer");

let viewData = [];
let allList = [];
let todoList = [];
let doneList = [];

let nowTab = "0";

init();

//新增待辦功能
addBtn.addEventListener("click", function (e) {
  if (input.value.trim() === "") {
    alert("請輸入待辦事項");
    return;
  }

  let obj = {
    item: input.value,
    checked: false
  };

  document.querySelector(".card_list").style.visibility = "visible";

  allList.push(obj);
  filter();
  renderData();
})

list.addEventListener("click", function (e) {
  if (e.target.nodeName === "INPUT") {
    viewData.forEach(function (item, index) {
      if (e.target.getAttribute("data-index") == index) {
        if (viewData[index].checked) {
          viewData[index].checked = false;
        } else {
          viewData[index].checked = true;
        }
      }
    })
  }
  if (e.target.nodeName === "A") {
    allList.forEach(function (item, index) {
      if (e.target.getAttribute("data-index") == index) {
        deleteItem(index);
      }
    })

  }
  renderData();
})

function renderData() {
  filter();
  let str = "";

  if (nowTab === "1") {
    viewData = todoList;
  } else if (nowTab === "2") {
    viewData = doneList;
  } else {
    viewData = allList;
  }

  viewData.forEach(function (item, index) {
    str += ` <li>
          <label class="checkbox" for="">
            <input type="checkbox"  data-index=${index}
            ${item.checked ? "checked" : ""} />
            <span>${item.item}</span>
          </label>
          <a href="#" class="delete" data-index=${index}></a>
        </li>`
  })

  list.innerHTML = str;
  input.value = "";
  btnDisable();

  footer.innerHTML = `<p>${todoList.length} 個待完成項目</p>
  <button type="button">清除已完成項目</button>`;
}

//tab切換
tab.addEventListener("click", function (e) {
  filter();

  let str = "";
  nowTab = e.target.getAttribute("data-tab");
  switch (nowTab) {
    case "0":
      str = `<li class="active" data-tab=0>全部</li>
      <li data-tab=1>待完成</li>
      <li data-tab=2>已完成</li>`;
      viewData = allList;
      break;
    case "1":
      str = `<li data-tab=0>全部</li>
      <li class="active" data-tab=1>待完成</li>
      <li data-tab=2>已完成</li>`;
      viewData = todoList;
      break;
    case "2":
      str = `<li data-tab=0>全部</li>
      <li data-tab=1>待完成</li>
      <li class="active" data-tab=2>已完成</li>`;
      viewData = doneList;
      break;
  }

  renderData();
  tab.innerHTML = str;
})

footer.addEventListener("click", function (e) {
  filter();
  if (e.target.nodeName === "BUTTON") {
    allList = todoList;
    viewData = allList;
  }
  renderData();
})

function deleteItem(index) {
  allList.splice(index, 1);

  viewData = allList;
  filter();
}

function filter() {
  todoList = allList.filter(item => item.checked === false);
  doneList = allList.filter(item => item.checked === true);
}

function btnDisable() {
  if (viewData.length === 0) {
    footer.innerHTML = ` <p>0 個待完成項目</p><button type="button" disabled>清除已完成項目</button>`;
  } else {
    footer.innerHTML = ` <p>0 個待完成項目</p><button type="button">清除已完成項目</button>`;
  }
}

function init() {
  document.querySelector(".card_list").style.visibility = "hidden";

  btnDisable();
}