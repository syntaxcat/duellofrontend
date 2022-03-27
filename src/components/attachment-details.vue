<template>
  <section class="attachment-details">
    <div class="header">
      <icon-base iconName="attachment"></icon-base>
      <h3>Attachments</h3>
    </div>
    <div class="attachment-content">
      <ul>
        <li v-for="attachment in attachments">
          <div class="imgAttachment" v-if="attachment.type === 'image'">
            <img :src="attachment.url" />
          </div>
          <div v-else>
            <div class="linkAttachment"></div>
          </div>
          <div class="details-container-display">
            <div class="attach-title">
              {{ attachment.title }}
            </div>
            <div class="attach-fileName">
              {{ attachment.fileName }}
            </div>
            <div class="attach-created">
              {{ attachment.created }}
            </div>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>
<script>
import iconBase from '../components/icon-base.vue';
export default {
  props: {
    attachments: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {};
  },
  methods: {},
  components: {
    iconBase,
  },
};
</script>

<!-- formatDate(dateString) {
      return new Date(dateString).toDateString();
    }, -->

<!-- new Date(dateString).toDateString() -->
