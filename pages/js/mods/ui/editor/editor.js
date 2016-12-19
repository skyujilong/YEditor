// editor 测试
'use strict';
function Editor(id){
    this.id = id;
    this.init();
}

Editor.prototype = Object.assign(Editor.prototype, {
    init: function(){
        this.editorEl = document.getElementById(this.id);
        this.initBold();
    },
    initBold: function(){
        document.getElementsByClassName('bold')[0].addEventListener('click',function(){
            //获取用户选中的区域
            var selection = window.getSelection();
            var rg = selection.getRangeAt(0);
            // var dft = document.createDocumentFragment();
            // surroundContents 如有更有这种跨标签的
            // adsfa</div><div>adsfafa
            // 这种的选择会报错误。
            // rg.surroundContents(document.createElement('strong'));
            // console.log(rg.startOffset);
            // // console.log(rg.endContainer);
            // rg.setEndAfter(rg.endContainer);
            // console.log(selection.toString());
            //更换文字
            var fragment = rg.createContextualFragment('<div>测试</div>');
            var oLastNode = fragment.lastChild;
            // console.log(oLastNode);
            rg.insertNode(fragment);
            rg.setStartAfter(oLastNode);
            rg.collapse(false);
            // selection.removeAllRanges();
            // selection.addRange(rg);
            //也可以直接用document.execCommand('bold')的方式 直接进行操作选中的区域
            // document.execCommand('bold');
            // execCommand方式 在跨越边界的时候没有问题，
            // 但是多次给其他嵌套标签用的时候就会产生，重复嵌套的问题
        },false);
    }
});
module.exports = Editor;
