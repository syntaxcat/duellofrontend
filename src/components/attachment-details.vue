<template>
  <section class="attachment-details">
    <div class="header">
      <!-- <img src="../assets/icons/align-left.svg" /> -->
      <icon-base class="description-icon" iconName="attachment"></icon-base>
      <h2>Attachments</h2>
      <ul>
        <!-- <li v-for="attachment in task.attachments">
            <div>{{img}}</div>
            
        </li> -->
      </ul>
    </div>
  </section>
</template>
<script>
import iconBase from '../components/icon-base.vue';
import attachmentCmp from './dynamic-components/attachment-cmp.vue';
export default {
  props: {},
  data() {
    return {};
  },
  methods: {},
  components: {
    attachmentCmp,
    iconBase,
  },
};
</script>
