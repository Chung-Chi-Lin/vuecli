<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <Form @submit="onSubmit" v-slot="{ errors, values, validate }">
      {{errors}} {{values}}

      <div class="mb-3">
        <Field id="email" name="email" type="email" class="form-control"
        v-model="user.email"
        rules="email|required"
        placeholder="請輸入 Email"
        :class="{'is-invalid':errors['email']}"></Field>
        <error-message name="email" class="invalid-feedback"></error-message>
      </div>
      <button class="btn me-2 btn-outline-primary" type="button" @click="validate">驗證</button>
      <button class="btn btn-primary" type="submit">Submit</button>
    </Form>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';

export default {
  name: 'HomeView',
  components: {
    HelloWorld,
  },
  data() {
    return {
      user: {},
    };
  },
  methods: {
    onSubmit() {
      console.log(this.user);
    },
  },
  created() {
    console.log(this);
  },
};
</script>
