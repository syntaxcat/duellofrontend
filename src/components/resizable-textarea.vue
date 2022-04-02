<template>
  <textarea
    rows="1"
    ref="textarea"
    :value="value"
    @input="onInput"
    @blur="handleBlur"
    :placeholder="placeholder"
  ></textarea>
</template>
<script>
export default {
  props: {
    placeholder: {
      type: String,
      required: false,
    },
    value: {
      type: String,
      required: true,
    },
    autofocus: {
      type: Boolean,
      required: false,
    },
  },
  methods: {
    updateHeigh() {
      this.$refs.textarea.style.height = 'auto';
      this.$refs.textarea.style.height = this.$refs.textarea.scrollHeight + 'px';
    },
    onInput(e) {
      this.$emit('valueChange', e.target.value);
    },
    handleBlur() {
      this.$emit('focusOut');
    },
  },
  mounted() {
    if (this.autofocus) {
      this.$refs.textarea.focus();
    }
    this.updateHeigh();
  },
  watch: {
    value() {
      this.updateHeigh();
    },
  },
};
</script>
