/**
 * Created by dsky on 2017/3/6.
 */
const vm = new Vue({
    el: '.checkout-addr',
    data: {
        addressList: [],
        limitLen: 3,
        currentIndex: 0,
        shipType: 0
    },
    mounted: function () {
        this.$nextTick(()=>{
            this.renderData();
        })
    },
    computed:{
        addressFliter: function () {
            return this.addressList.slice(0, this.limitLen);

        }
    },
    methods:{
        renderData: ()=>{
            axios.get('./data/address.json').then((res)=>{
                vm.addressList = res.data.result;
            });
        },
        setDefault: (addressId)=>{
            vm.addressList.forEach((address, index)=>{
                if(address.addressId===addressId){
                    address.isDefault = true;
                }else {
                    address.isDefault = false;
                }
            })
        }
    }
});