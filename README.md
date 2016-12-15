# jilong-editor
a rich editor for pc
# 编辑器核心内容
* w3c Range对象与 IE 的TextRange对象
* document.execCommand方法
* 事件系统，keydown keyup contentmenu等等
* 需要强大的正则表达式，主要用于标签的匹配，以及非w3c浏览器标签的过滤

# 核心api相关内容
* document.execCommand作用的是选中的范围元素，range对象选中的应该也是可行的 待测试
* w3c浏览器的提供的window.getSelection()方法能够返回一个选中的对象，
通过window.getSelection().getRangeAt(0),可以获取选中的range对象，而range对象是可以插入节点的，也可以给选中的节点添加属性，比如你给选中的节点包裹一个span标签，之后给这个span标签一个style属性什么的。这些都是可以做到的。
* **注意：** 跨标签的选择的时候，eg:`这里面是测试环境哦！</div><div>test test`像这样的选中了两个不是连续的区域，有些 api调用会发生错误，主要是range对象的 api调用
