const URL = "https://jsonplaceholder.typicode.com";

const getUsers = async () => {
  const response = await fetch(`${URL}/users`);
  const data = await response.json();
  renderUsers(data);
  tabListener();
  usersListener();
};

const renderUsers = (man) => {
  const sect = document.querySelector("#users");
  man.forEach((element) => {
    sect.innerHTML += `<div id="user_${element.id}" class="user">
      <div class="inner">
      <h3>${element.name}</h3>
      </div>
      </div>`;
  });
};

const usersListener = () => {
  const list = document.querySelectorAll("#users .user");
  for (let item of list) {
    item.addEventListener("click", (event) => {
      const id = event.currentTarget.id.split("_")[1];
      const tabs = document.querySelector("#tabs");
      tabs.classList.remove("hidden");
      tabs.setAttribute("data-id", id);
      localStorage.setItem("user-id", id);
      list.forEach((element) => {
        element.classList.remove("chosen");
      });
      item.classList.add("chosen");
      document.querySelector("#tab1").click();
    });
  }

  const storedId = localStorage.getItem("user-id");
  const storedTab = localStorage.getItem("tab-id");
  if (storedId && storedTab) {
    document.querySelector(`#user_${storedId}`).click();
    document.querySelector(`#tab${storedTab}`).click();
  }
};

const tabListener = () => {
  const list = document.querySelectorAll("#tabs .tab");
  for (const [index, item] of list.entries()) {
    item.addEventListener("click", (event) => {
      const elm = event.currentTarget;
      list.forEach((elm) => elm.classList.remove("active"));
      elm.classList.add("active");
      const url = elm.getAttribute("data-url");
      localStorage.setItem("tab-id", index + 1);
      getData(url);
    });
  }
};

const getData = async (url) => {
  const id = document.querySelector("#tabs").getAttribute("data-id");
  const response = await fetch(`${url}/${id}`);
  const info = await response.json();
  renderData(info);
};

const renderData = (object) => {
  let html = "";
  const parseObject = (data) => {
    for (const [key, value] of Object.entries(data)) {
      if (typeof value === "object") {
        parseObject(value);
      } else {
        html += `<div class="row">
        <div class="key">${key}:</div> 
        <div class="value">${value}</div>
        </div>`;
      }
    }
  };

  parseObject(object);
  const content = document.querySelector("#content");
  content.innerHTML = html;
};

getUsers();
