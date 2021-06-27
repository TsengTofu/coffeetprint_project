<template>
   <div class="user_order_info_wrapper">
    <h4>填寫預訂資料</h4>
    <v-form @submit="onSubmit" class="container">
      <ul>
        <li class="name">
          <v-field name="email" type="email" :rules="validateEmail" />
          <label for="name">姓名</label>
          <input type="text" id="name" placeholder="請輸入姓名" />
          <span class="alert_msg"></span>
        </li>
        <li class="tel">
          <label for="tel">電話</label>
          <input type="text" id="tel" placeholder="請輸入電話" />
          <span class="alert_msg"></span>
        </li>
        <li class="email">
          <label for="email">Email</label>
          <input type="text" id="email" placeholder="請輸入Email" />
          <span class="alert_msg"></span>
        </li>
        <li class="address">
          <label for="address">寄送地址</label>
          <input type="text" id="address" placeholder="請輸入寄送地址" />
          <span class="alert_msg"></span>
        </li>
        <!--  TODO  這個先不要 -->
        <!-- <li>
          <label for="payment">交易方式</label>
          <select name="payment" id="payment">
            <option value="atm">ATM</option>
            <option value="credit_card">信用卡</option>
            <option value="convenience_store">超商付款</option>
          </select>
        </li> -->
      </ul>
      <button class="send_user_order_info" type="button">送出預訂資料</button>
    </v-form>
  </div>
</template>

<script>
export default {
  name: 'CustomerOrderFormComponent',
  data() {
    return {
      //
    };
  },
};
</script>
<style lang="sass" scoped>
.user_order_info_wrapper
  padding: 60px 80px
  .container
    max-width: 350px
    width: 100%
    margin: 0 auto
    ul
      display: flex
      flex-direction: column
      li
        display: flex
        flex-direction: column
        margin: 0 0 20px 0
        label
          font-size: 16px
          line-height: 22px
          color: #212529
          margin: 0 0 6px 0
        input
          border: 1px solid #CED4DA
          border-radius: 4px
          padding: 8px 12px
          font-size: 16px
          line-height: 22px
        select
          border: 1px solid #CED4DA
          border-radius: 4px
          padding: 8px 12px
          font-size: 16px
          line-height: 22px
          color: #212529
        .alert_msg
          color: #C72424
          padding: 8px 0px 0px
    .send_user_order_info
      background: #000
      color: #fff
      width: 255px
      border-radius: 4px
      border: none
      padding: 10px 65px
      font-size: 20px
      line-height: 25px
      display: block
      margin: 0 auto
      cursor: pointer
      &:hover
        background: #301E5F
</style>
