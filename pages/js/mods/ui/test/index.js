'use strict';
require('./scss/test.scss');
var body = document.body;
//onchange事件不能监听 contenteditable 内容发生改变
// body.addEventListener('change',function(){
//     console.log('change...........');
// },false);

// 这个应该是ie上面的兼容才行
// body.addEventListener('selectionchange',function(e){
//     console.log(e);
// },false);

//测试webkitEditableContentChanged chrome下可以触发变化 chrome可行，
//firefox 不可行
// body.addEventListener('webkitEditableContentChanged',function(e){
//     console.log(e);
// },false);


// 新版本 的childList发生改变的时候 下面的方式是起作用的
// var observer = new MutationObserver(function(mutations) {
//     mutations.forEach(function(mutation){
//         console.log(mutation.type);
//         console.log(mutation);
//     });
// });
//
// var config = {
//     attributes: true,
//     childList: true,
//     characterData: true,
//     characterDataOldValue:true
// };
//
// observer.observe(body,config);

// body.addEventListener('DOMCharacterDataModified',function(e){
//     //该方法是一个过时的方法
//     console.log(e);
// },false);

// keydown是一个持续触发的函数，如果想要监听多个按键是同时按下的状态
// 可以和keyup进行组合，给每个按键一个状态，用keyup释放这个状态，循环
// 被选中的状态，就能知道当前 组合的按钮是什么了
body.addEventListener('keydown', function(e) {
    console.log(e);
    // e.ctrlKey能够判断 ctrl按键是否被按下了
    console.log(e.ctrlKey);
    //shiftKey ctrlKey altKey metaKey
    console.log(e.metaKey);
    //metaKey在win下是windows按键，目前ie不支持这个属性
});

//当菜单被触发的时候 产生如下事件
body.addEventListener('contextmenu', function(e) {
    console.log(e);
});
