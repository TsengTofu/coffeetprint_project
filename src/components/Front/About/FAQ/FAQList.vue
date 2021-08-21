<template>
  <div class="faq_wrapper">
    <FAQItemComponent
      v-for="(faq, key) in FAQ_list_data"
      :key="'faq_' + key"
      :faq_data="faq"
      :order="key"
    />
  </div>
</template>
<script>
import FAQItemComponent from './FAQItem.vue';

export default {
  name: 'FAQListComponent',
  props: {},
  components: {
    FAQItemComponent,
  },
  data() {
    return {
      // 製作假的 Data
      FAQ_list_data: [
        {
          question: '如何聯絡客服中心？',
          answer:
            '請撥打客服電話：02-123-5523#888，會由總部客服人員為您服務。服務時間為：平日早上 9：00 - 晚上 6：00，請盡量於此時段撥打客服電話，其他時間為下班時間，無法即時回覆，敬請見諒。或者，您也可以透過下方的聯絡我們表單，說明您的問題，後續將有專業客服人員為您服務。',
        },
        {
          question: '如何修改訂單？',
          answer:
            '不好意思，訂單成立後就無法修改訂購內容囉！麻煩請您於下訂前，確認訂購的：品項、價格、收件人資訊。如有疑問歡迎直接致電客服中心，或是填寫表單與我們聯絡。',
        },
        {
          question:
            '如果店家於優惠券兌換期限內倒閉或因故障無法提供商品或服務，消費者有什麼保障呢？',
          answer: '消費者原支付之金額，將由 CoffeetPrint 販售平台全額退款。',
        },
        {
          question: '如果購買店家優惠券之後，因故反悔，請問可以退貨嗎？',
          answer:
            '不好意思，是無法退貨的。店家優惠券視同等價值的票券，且每家票券商作業規範不同，故票券退回方式，請依照產品頁面的權益說明為主。',
        },
        {
          question: '如果購買的店家優惠券已超過使用期限，私人因素忘記使用，是否能申請退款？',
          answer:
            '不好意思，恕無法申請退款。由於是私人因素忘記使用，而非店家相關因素（例如：倒閉或是因故暫停營業）。因此，是無法申請退款的，在購買店家優惠券的時候，請確認使用的期限，這部分還請見諒。',
        },
        {
          question: '請問有哪些退款方式呢？',
          answer:
            '退款的主要方式為：透過銀行轉帳匯款到消費者的帳戶。如果有其他退款方式的需求，歡迎填寫下方的聯絡我們表單，以利客服聯絡並解決您的問題。',
        },
        {
          question: '請問退款會在幾天內收到呢？',
          answer:
            '如果您原先付款的方式為信用卡，刷退作業需要時間，仍須以銀行作業時間為主。如果付款方式為 ATM 轉帳匯款，將會轉帳退款款項到您提供的銀行帳戶，處理天數大約 3 - 5 天，再麻煩請您協助查核是否有收到退款。如果有任何問題，請洽客服中心',
        },
      ],
    };
  },
  methods: {},
  mounted() {},
};
</script>

<style lang="sass" scoped>
.faq_wrapper
  font-size: 1rem
</style>
