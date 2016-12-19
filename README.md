# jilong-editor
a rich editor for pc
# 编辑器核心内容
* w3c Range对象与 IE 的TextRange对象
* document.execCommand方法
* 事件系统，keydown keyup contentmenu等等
* virtualDom
* 需要强大的正则表达式，主要用于标签的匹配，以及非w3c浏览器标签的过滤

# 核心api相关内容
* document.execCommand作用的是选中的范围元素，range对象选中的应该也是可行的 待测试
* w3c浏览器的提供的window.getSelection()方法能够返回一个选中的对象，
通过window.getSelection().getRangeAt(0),可以获取选中的range对象，而range对象是可以插入节点的，也可以给选中的节点添加属性，比如你给选中的节点包裹一个span标签，之后给这个span标签一个style属性什么的。这些都是可以做到的。
* **注意：** 在IE浏览器下回车换行符是一个p标签，在标准浏览器下是可以调整为p标签，但是在moz下，是一个br
这样为了兼容成同样的格式，我们可以用range对象去处理这个问题，进行插入P标签操作


# virtualDOM
virtualDOM主要用于解决跨标签选择之后，的dom操作的问题，具体还需要研究一下。

# 不同浏览器对应常规的execCommand指令的不同结果
|属性/浏览器 |IE |CHROME |MOZ |解决方案|
|:-------------:|:-------------:|:-----:|:-----:|:----:|
|回车 |生成一个P标签 | 可以设置，默认是DIV标签 | 默认是br标签|采用range方法进行插入p标签的方案|
|插入图片|生成可以变换大小的img，同时默认选中|生一个不可以变换大小的img,同时不选中|生成一个可以改变大小的img，同时不选中|用range对象进行光标定为到img之后|
|插入定制的html回退的问题（不是粘贴与复制）|不支持undo命令|不支持undo命令|不支持undo命令|引入的虚拟dom概念是否是为了解决这里的问题|
