function getData1() {
    let data;
    $.get('http://localhost:8080/product/1', function (response) {
        data = response;
    })
    return data;
}

console.log(getData1()) //  비동기 처리로 인한  undefined ..


// 해결1. 콜백 함수로 비동기 처리 방식의 문제점 해결
function getData2(callbackFunc) {
    $.get('http://localhost:8080/product/1', function (response) {
        callbackFunc(response);
    })
}

getData2(function (tableData) {
    console.log(tableData); // response의 값이 전달 됨
});

// 콜백 문제점 => 콜백지옥
$.get('http://localhost:8080/product/1', function (response) {
    parseValue(response, function (id) {
        auth(id, function (result) {
            dispaly(result, function (text) {
                console.log(text);
            })
        })
    });
})

// 콜백 지옥 해결 방법
function parseValueDone(id) {
    auth(id, authDone);
}

function authDone(result) {
    display(result, displayDone);
}

function displayDone(text) {
    console.log(text);
}

$.get('url', function (response) {
    parseValue(response, parseValueDone);
});


// Promise
function getData3(ballBack) {
    //new Primise() 추가
    return new Promise(function (resolve, reject) {
        $.get('url/product/1', function (response) {
            // 데이터를 받으면 resolve() 호출
            resolve(response);
        })
    });
}

// getDate()의 실행이 끝나면 호출되는 then()
getData3().then(function (tableData) {
    //resolve()의 결과 값이 여기로 전달됨
    console.log(tableData); //$.get()의 response 값이 tableData에 전달됨
})
// 프로미스 3가지 상태 ( state )
// - Pending ( 대기 ) : 비동기 처리 로직이 아직 완료 되지 않은 상태
// ==> new Promise();
// ==> new Promise(function ( resolve, reject) { });

// - Fulfiled ( 이행 ) : 비동기 처리가 완료되어 프로미스가 결과 값을 반환해준 상태
// ==> new Primise(function ( resolve, reject) { resolve });
// ==>
// function getData() {
//     return new Promise(function(resolve, reject) {
//         var data = 100;
//         resolve(data);
//     });
// }
//
// // resolve()의 결과 값 data를 resolvedData로 받음
// getData().then(function(resolvedData) {
//     console.log(resolvedData); // 100
// });

// - Rejected ( 실패 ) : 비동기 처리가 실패하거나 오류가 발생한 상태
// == > new Promise(function(resolve, reject) { reject();  });
// 실패 상태가 되면 catch()로 받을 수 있다.
// function getData() {
//     return new Promise(function(resolve, reject) {
//         reject(new Error("Request is failed"));
//     });
// }
//
// // reject()의 결과 값 Error를 err에 받음
// getData().then().catch(function(err) {
//     console.log(err); // Error: Request is failed
// });

// promise 예제

function getDate4() {
    return new Promise(function (resolve, reject) {
        $.get('url/product/1', function (response) {
            if (response) resolve(response);

        })
        reject(new Error('request is failed!'));
    })
}

getDate4(userInfo).then(function (data) {
    console.log(data);
}).catch(function (error) {
    console.error(error);
});


// 프로미스 연결
new Promise(function (resolve, reject) {
    setTimeout(function () {
        resolve(1);
    }, 2000);
}).then(function (result) {
        console.log(result); // 1
        return result + 10;
    })
    .then(function (result) {
        console.log(result); // 11
        return result + 20;
    })
    .then(function (result) {
        console.log(result); // 31
    });
let userInfo= {
    id:'test',
    pw:'123'
}
getDate4(userInfo).then(parseValue).then(auth).then(display);
function parseValue() {
    return new Promise({
        // ...
    });
}
function auth() {
    return new Promise({
        // ...
    });
}
function display() {
    return new Promise({
        // ...
    });
}

// async await
async function logName() {
    var user = await fetchUser('domain.com/users/1');
    if (user.id === 1) {
        console.log(user.name);
    }
}

//비동기 처리 메서드가 꼭 프로미스 객체를 반환해야 await가 의도한 대로 동작합니다.

function fetchItems() {
    return new Promise(function(resolve, reject) {
        var items = [1,2,3];
        resolve(items)
    });
}

async function logItems() {
    var resultItems = await fetchItems();
    console.log(resultItems); // [1,2,3]
}