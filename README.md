# vue-cart
一个用vue做的购物车案例，参考的是[使用vue2.0实现购物车和地址选配功能](http://www.imooc.com/learn/796)，修改部分代码使用es6

# 问题总结
- vue-text问题 

因为用 `{{ message }}`会造成初始的时候模板没渲染时，模板存在，所以`v-text`来渲染，但是在使用`filter`的时候会有问题，因为`Vue 2.x 中，过滤器只能在 mustache 绑定和 v-bind 表达式`, 所以这时候有一个办法解决：
```html
// 这样是没用的
<div class="item-price" v-text="item.productPrice | formatMoney"></div>
// 这样就行了
<div class="item-price" v-text="$options.filters.formatMoney(item.productPrice)"></div>
```

- 作用域问题

在函数运行时，this指向的是上下文作用域，在vux中，默认指向的是new的vue对象
```js
// 这个时候this就指的vm
const vm = new Vue({
    el: el,
    data:{
        test1: 'test1'
    }
    methods:{
        fun1: function(){
            this.test1 = 'test2';
        }
    }
});

// 但是如果用es6的箭头函数就不一样了
const vm = new Vue({
    el: el,
    data:{
        test1: 'test1'
    }
    methods:{
        fun1: ()=>{
            this.test1 = 'test2'; // this指向的window对象
        }
    }
});

// 修改成这样就行
const vm = new Vue({
    el: el,
    data:{
        test1: 'test1'
    }
    methods:{
        fun1: ()=>{
            vm.test1 = 'test2'; // this指向的window对象
        }
    }
});
```