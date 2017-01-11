'use strict';
var Immutable = require('immutable');
console.log(Immutable);
var map1 = Immutable.Map({
    a: 1,
    b: 2,
    c: 3
});
var map2 = map1.set('b', 50);
console.log(map1.get('b')); // 2
console.log(map2.get('b')); // 50
console.log(map1);
console.log(map1.equals(map2));
console.log(map1.equals(map1));
console.log('----------------------');
var deep = Immutable.Map({
    a: 1,
    b: 2,
    c: Immutable.List.of(3, 4, 5)
});
console.log(deep.toObject()); // { a: 1, b: 2, c: List [ 3, 4, 5 ] }
console.log(deep.toArray()); // [ 1, 2, List [ 3, 4, 5 ] ]
console.log(deep.toJS()); // { a: 1, b: 2, c: [ 3, 4, 5 ] }
console.log(JSON.stringify(deep)); // '{"a":1,"b":2,"c":[3,4,5]}'

//api 测试
//iterable是一个类型 在immutable中是可遍历的类型
var iterable = Immutable.Iterable([1,2,3]);
var iterable1 = Immutable.Iterable([1,2,3]);
console.log(iterable);
console.log(Immutable.Iterable.isIndexed(iterable));
console.log(iterable.hashCode());
console.log(iterable.hashCode());
console.log(Immutable.is(iterable,iterable1));

var list1 = Immutable.List(iterable1);
var list2 = list1.set(list1.size,'abc');
console.log(list1.equals(list2));
console.log(list1.toJS());
console.log(list2.toJS());
console.log(list1.insert(7,100));
console.log(list1.insert(7,100).toJS());
console.log(Immutable.fromJS({
    'name':'yjl',
    'fn': function(s,b){

    },
    'list':[{
        key:'a',
        val:'v'
    },{
        key:'b',
        val:'v'
    }]
}));
