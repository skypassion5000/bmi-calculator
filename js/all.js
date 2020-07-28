// 指定 dom
var list = document.querySelector('.list');
var result = document.querySelector('.result');
var deleteData = document.querySelector('.deleteClass a');
var hIn = document.querySelector('.hInput');
var wIn = document.querySelector('.wInput');
var data = JSON.parse(localStorage.getItem('listData')) || [];

// 監聽與更新
result.addEventListener('click', addData);
list.addEventListener('click', toggleDone);
deleteData.addEventListener('click', deleteAllData);
updateList(data);

// 加入列表，並同步更新網頁與 localstorage
function addData(e) {
    e.preventDefault();
    // console.log(e.target);
    var judgeImg = e.target.nodeName;
    var hInput = hIn.value;
    var wInput = wIn.value;

    // 身高不為空和非數值 且 體重不為空和非數值
    if (hInput !== "" && wInput !== "" && isNaN(hInput) !== true && isNaN(wInput) !== true) {
        // console.log('有值');
        var bmiValue = getValue(wInput, hInput);
        var bmiStatus = getStatus(bmiValue);
        var dateTime = getTime();
        var todo = {
            status: bmiStatus[0],
            value: bmiValue,
            weight: wInput,
            height: hInput,
            date: dateTime,
            color: bmiStatus[1],
            colorCircle: bmiStatus[2],
            iconColor: bmiStatus[3],
            strColor: bmiStatus[4]
        }
        console.log(todo);

        // change the circle style
        changeCircle(judgeImg, todo);

        // console.log(todo);
        data.push(todo);

        // console.log(data);
        updateList(data);

        // write data localStorage
        localStorage.setItem('listData', JSON.stringify(data));

    } else {
        console.log('空');

        // 身高出錯判斷
        if (hInput == "") {
            alert("身高為空值，請重新輸入");
        } else if (isNaN(hInput) == true) {
            alert("身高資料格式有誤，請輸入數值");
        }

        // 體重出錯判斷
        if (wInput == "") {
            alert("體重為空值，請重新輸入");
        } else if (isNaN(wInput) == true) {
            alert("體重資料格式有誤，請輸入數值");
        }
    }

    // 換回看結果
    if (judgeImg == "IMG") {
        result.innerHTML = '<button class="btnInit">看結果</button>';
    }
}

function getTime() { //取得用戶當下時間 
    var dt = new Date(); //取得電腦用戶當下時間(年月日)
    var year = dt.getFullYear().toString();
    var month = (dt.getMonth() + 1).toString(); //月份一月開始算為零，所以數值+1轉字串
    var date = dt.getDate().toString();
    var time = month + "-" + date + "-" + year;
    return time; //傳出日期格式
}

function getValue(weight, height) {
    var num = weight / (height / 100 * height / 100); // w/h*2
    return Math.round(num * 100) / 100;
}

function getStatus(bmi) {
    // console.log("進入bmi");
    var status = [];
    // console.log(bmi);
    if (bmi < 18.5) {
        status[0] = "過輕";
        status[1] = "border--blue";
        status[2] = "blueCircle";
        status[3] = "icon__blue";
        status[4] = "blueStr";
    } else if (18.5 <= bmi && bmi < 25) {
        status[0] = "理想";
        status[1] = "border--green";
        status[2] = "greenCircle";
        status[3] = "icon__green";
        status[4] = "greenStr";
    } else if (25 <= bmi && bmi < 27) {
        status[0] = "過重";
        status[1] = "border--yellow";
        status[2] = "yellowCircle";
        status[3] = "icon__yellow";
        status[4] = "yellowStr";
    } else if (27 <= bmi && bmi < 30) {
        status[0] = "輕度肥胖";
        status[1] = "border--orange";
        status[2] = "orangeCircle";
        status[3] = "icon__orange";
        status[4] = "orangeStr";
    } else if (30 <= bmi && bmi < 35) {
        status[0] = "中度肥胖";
        status[1] = "border--orange";
        status[2] = "orangeCircle";
        status[3] = "icon__orange";
        status[4] = "orangeStr";
    } else if (35 <= bmi) {
        status[0] = "重度肥胖";
        status[1] = "border--red";
        status[2] = "redCircle";
        status[3] = "icon__red";
        status[4] = "redStr";
    }
    return status;
    // console.log(status);
}

function changeCircle(judgeImg, todo) {

    // 宣告變數
    var str = "";

    if (judgeImg == "IMG") {
        result.innerHTML = '<button class="btnInit">看結果</button>';
    } else {
        str = `<button class="send ${todo.colorCircle}">${todo.value}<br /><p class="bmiStr">BMI</p></button>
                <img src="" class="icon ${todo.iconColor}" alt="" / >
                <p class="${todo.strColor}">${todo.status}</p>`;
        result.innerHTML = str;
    }

}

// 更新網頁內容
function updateList(items) {
    var str = '';
    var len = items.length;
    for (var i = 0; i < len; i++) {
        str += `<li class="liList ${items[i].color} row">
              <span class="col-sm-2">${items[i].status}</span>
              <span class = "col-sm-2" > <p class = "smStr" > BMI </p> ${items[i].value}</span >
              <span class = "col-sm-2" > <p class = "smStr" > weight </p> ${items[i].weight}kg</span >
              <span class = "col-sm-2" > <p class = "smStr" > height </p> ${items[i].height}cm</span >
              <span class = "col-sm-2" > <p class = "smStr" > ${items[i].date} </p></span >
              <span class="col-sm-2"><a href="#" data-index="${i}">刪除</a></span>
            </li>`;
        // str += `<li class="liList ${items[i].color} row">
        //       <span class="col-sm-2">${items[i].status}</span>
        //       <span class="col-sm-2">BMI ${items[i].value}</span>
        //       <span class="col-sm-2">weight ${items[i].weight}kg</span>
        //       <span class="col-sm-2">height ${items[i].height}cm</span>
        //       <span class="col-sm-2">${items[i].date}</span>
        //       <span class="col-sm-2"><a href="#" data-index="${i}">刪除</a></span>
        //     </li>`;
        // str += `<li class="liList ${items[i].color} row"><a href="#" data-index="${i}">
        //       <span class="col-sm-3">${items[i].status}</span>
        //       <span class="col-sm-2">BMI ${items[i].value}</span>
        //       <span class="col-sm-2">weight ${items[i].weight}kg</span>
        //       <span class="col-sm-2">height ${items[i].height}cm</span>
        //       <span class="col-sm-3">${items[i].date}</span></a></li > `;
    }
    list.innerHTML = str;

    // 清空身高體重的數值
    hIn.value = "";
    wIn.value = "";
}

// 刪除代辦事項
function toggleDone(e) {
    e.preventDefault();
    if (e.target.nodeName !== 'A') {
        return
    };
    var index = e.target.dataset.index;
    data.splice(index, 1);
    localStorage.setItem('listData', JSON.stringify(data));
    updateList(data);
}

// 刪除全部紀錄
function deleteAllData() {
    // data.splice(0, data.length);
    data = [];
    localStorage.setItem('listData', JSON.stringify(data));
    updateList(data);
}