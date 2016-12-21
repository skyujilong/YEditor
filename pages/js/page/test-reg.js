'use strict';
/**
 * 测试HTML标签的正则表达式的情况
 */

var str = "asdfa<div style=\"color:red;\" background='../img/asdfadf.jpeg' >这里我可以写一些输入提示</div><p>br前面的内容<br/><span>后面的内容</span></p><style>P{font-size:40px;}</style><img src=\"asdfasdfasfa\"><div>asdfasfas<p>xxxxxx</p></div>";
document.getElementsByTagName('textarea')[0].value = str;
// var reg = /(<(?:[^>\/]+)>)|(<(?:[^>]+)\/>)/g;
// var reg = /<(?:([^>]+)\/)>/g;
//        /<(?:(?:\/([^>]+)>)|(?:!--([\S|\s]*?)-->)|(?:([^\s\/>]+)\s*((?:(?:"[^"]*")|(?:'[^']*')|[^"'<>])*)\/?>))/g
//    正则表达式测试 ?:后面的内容 匹配但是不捕获，()中的内容是被分组的内容。?:(asdfa)这种内容，是进行捕获括号里面的内容的
var reg = /<(?:\/([^>]+)>)|<(?:([^\s\/>]*)\s*((?:(?:"[^"]*")|(?:'[^']*')|[^"'<>\/])*)\/?>)/g;
var match;
var nextIndex = 0;
var currentIndex = 0;
while(match = reg.exec(str)){
    currentIndex = match.index;
    if(currentIndex > nextIndex){
        //中间有纯文本的存在
        console.log(str.substring(currentIndex,nextIndex));
    }
    console.log(match);


    nextIndex = reg.lastIndex;
}
