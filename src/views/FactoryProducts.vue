<template>
  <div class="text-end">
    <button class="btn btn-primary" type="button"
    @click="openModal(true)">
      增加一個產品
    </button>
  </div>
  <table class="table mt-4">
  <thead>
    <tr>
      <th width="120">分類</th>
      <th>產品名稱</th>
      <th width="120">原價</th>
      <th width="120">售價</th>
      <th width="100">是否啟用</th>
      <th width="200">編輯</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="item in products" :key="item.id">
      <td>{{ item.category }}</td>
      <td>{{ item.title }}</td>
      <td class="text-right">
        {{ item.origin_price }}
      </td>
      <td class="text-right">
        {{ item.price }}
      </td>
      <td>
        <span class="text-success" v-if="item.is_enabled">啟用</span>
        <span class="text-muted" v-else>未啟用</span>
      </td>
      <td>
        <div class="btn-group">
          <button class="btn btn-outline-primary btn-sm"
          @click="openModal(false, item)">編輯</button>
          <button class="btn btn-outline-danger btn-sm">刪除</button>
        </div>
      </td>
    </tr>
  </tbody>
</table>
<!-- 先內後外 props 接收新建的資料 ， $emit 內層傳遞觸發上傳到遠端方法-->
<ProductModal ref="productModal" :product="tempProduct"
@update-product="updateProduct"></ProductModal>
</template>

<script>
import ProductModal from '@/components/ProductModal.vue';

export default {
  data() {
    return {
      products: [],
      pagination: {},
      temProduct: {},
      isNew: false,
    };
  },
  components: {
    ProductModal,
  },
  methods: {
    getProducts() {
      const api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/products`;
      this.$http.get(api)
        .then((res) => {
          if (res.data.success) {
            console.log(res.data);
            this.products = res.data.products;
            this.pagination = res.data.pagination;
          }
        });
    },
    // 使用方法
    openModal(isNew, item) {
      // 假設新的執行
      if (isNew) {
        this.tempProduct = {};
      } else {
        this.temProduct = { ...item }; // false 執行
      }
      this.isNew = isNew;
      const productComponent = this.$refs.productModal;
      productComponent.showModal();
    },
    // 外層API 接收 再發到遠端儲存商品
    updateProduct(item) {
      this.tempProduct = item;
      // 新增執行
      let api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product`;
      let httpMethod = 'post';
      // 編輯執行 API路徑不同，如果不是新增狀態下會執行修改方法
      if (!this.isNew) {
        console.log(item);
        api = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${item.id}`;
        httpMethod = 'put';
      }
      const productComponent = this.$refs.productModal;
      this.$http[httpMethod](api, { data: this.tempProduct }).then(
        (res) => {
          console.log(res);
          productComponent.hideModal();
          this.getProducts();
        },
      );
    },
  },
  created() {
    this.getProducts();
  },
};
</script>
