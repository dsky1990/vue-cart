/**
 * Created by dsky on 2017/3/5.
 */
const vm = new Vue({
    el: '#app',
    data: {
        productList: [],
        checkAllFlag: false,
        totalMoney: 0,
        delFlag: false,
        currentIndex:''
    },
    filters: {
        formatMoney: (value)=>{
            return '¥'+ value;
        }
    },
    mounted: function() {
        this.$nextTick(()=>{
            this.renderList();
        })
    },
    methods: {
        renderList: ()=>{
            axios.get('./data/cart.json').then((res)=>{
                vm.productList = res.data.result.productList;
            })
        },
        changeMoney: (product, key)=>{
            if(key){
                product.productQuentity+=1;
            }else{
                product.productQuentity-=1;
                if(!product.productQuentity){
                    product.productQuentity = 1;
                }
            }
            vm.countPrice();
        },
        productCheck: (product)=>{
            if(typeof product.checked === 'undefined'){
                vm.$set(product, 'checked', true);
            }else {
                product.checked = !product.checked;
            }
            vm.countPrice();
        },
        checkAll: (flag)=>{
            vm.checkAllFlag = flag;
            vm.productList.forEach((product, index)=>{
                if(typeof product.checked === 'undefined'){
                    vm.$set(product, 'checked', vm.checkAllFlag);
                }else {
                    product.checked = vm.checkAllFlag;
                }
            });
            vm.countPrice();
        },
        countPrice: ()=>{
            vm.totalMoney = 0;
            vm.productList.forEach((product, index)=>{
                if(product.checked){
                    vm.totalMoney += product.productPrice*product.productQuentity;
                }
            });
        },
        delConfirm: (index)=>{
            vm.delFlag = true;
            vm.currentIndex = index;
        },
        delProduct: ()=>{
            vm.productList.splice(vm.currentIndex, 1);
            vm.delFlag = false;
        }
    }
});