let modal = document.getElementById("myModal");
let btn = document.getElementsByClassName("glow-on-hover")[0];
let span = document.getElementsByClassName("close")[0];
let tableBody = document.getElementsByClassName("tbody")[0];
let tableNumbers = document.getElementsByClassName("table-numbers")[0];
let info = []
let arrhiveArr =[]
btn.onclick = function() {
    modal.style.display = "block";
  }
  
  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
    modal.style.display = "none";
  }

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
const table = document.querySelector("table");
const form = document.querySelector("form");
form.addEventListener("submit", handleSubmit);
function handleSubmit(event) {
  event.preventDefault();
  const {
    elements: { name, content, select, date }
  } = event.currentTarget;
  info.push({name:name.value, content:content.value, select:select.value, date:date.value, id: Math.floor(Math.random() * 100)})
  tableBody.insertAdjacentHTML('beforeEnd', makelist(info))
  let data = makelistNumbert(info)
  if (data!== undefined) {
  tableNumbers.insertAdjacentHTML('beforeEnd',makelistNumbert(info))
  }
  
}
function getCorrectFomatDate (inputDate) {
    let date, month, year;
    let mas = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  date = inputDate.getDate();
  month = inputDate.getMonth() 
  year = inputDate.getFullYear();
  let res = mas.find((value, index)=>{if(index === month) {
    return value
  } });

    date = date
    .toString()
    .padStart(2, '0');
   return `${res}${' '}${date},${' '}${year}`;
}
function deleteItem (id) {
  let el = document.getElementsByClassName(id)[0];
  tableBody.removeChild(el)
 
} 
function arhiveItem (num) {
  let el = document.getElementsByClassName(num)[0];
  tableBody.removeChild(el)
  let k = info.find(item => (item.id === num))
  arrhiveArr.push(k)
 
} 
function editeItem (num) {
  let el = document.getElementsByClassName(num)[0];
  el.setAttribute("contenteditable", "true")
  
} 
const makelist = info => {
 let cell = info.filter((item, index) => {
    if(index === (info.length-1)) {
     return item  
  }
})

 let arr = cell.map(item=> ( 
 `<tr class="${item.id}">
 <td>${item.name}</td>
 <td>${getCorrectFomatDate(new Date())}</td>
 <td>${item.select}</td>
 <td>${item.content}</td>
 <td>${item.date}</td>
 <td class="cell"><button class="edit" onclick="editeItem(${item.id})"></button></td>
 <td class="cell"><button class="archive" onclick="arhiveItem(${item.id})"></button></td>
 <td class="cell"><button class="delete" onclick="deleteItem(${item.id})"></button></td>
 </tr>`))
 return arr
  
}
const makelistNumbert = arr => {
  let result = []
  const myElements = document.getElementsByClassName('category')
  let mas = arr.map(item=> (item.select))
  let uniqArr = Array.from(new Set(mas.map(item=>item)));
  let f = uniqArr.length-1
  if (myElements.length ===0) {
    for (let i = 0; i < info.length; i++) {
      if(info[i].select === uniqArr[f]) {
        result.push(info[i])
        
    }
  }
  let str = uniqArr.map(item=> ( 
    `<tr><td class="category">${item}</td>
    <td class="">${result.length}</td></tr>`))
     return str
  }
  let fir = myElements.length-1
   if (myElements.length !==0) {
   if(uniqArr.length-1 === myElements.length-1) {
     let k = myElements[0].nextElementSibling
     for (let i = 0; i < info.length; i++) {
      if(info[i].select === uniqArr[f]) {
        result.push(info[i])
        
    }
  }
      k.innerHTML = result.length
      return
     }
     
    if(uniqArr.length-1 !== fir.textContent) {
       for (let i = 0; i < info.length; i++) {
        if(info[i].select === uniqArr[f]) {
          result.push(info[i])
          
          
      }
    }
     let str = 
      `<tr><td class="category">${uniqArr[f]}</td>
      <td class="num">${result.length}</td></tr>`
      return str
    }
  
 
  
}

}
  