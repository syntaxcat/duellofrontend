<template>
  <textarea
    rows="1"
    :disabled="disabled"
    ref="myInput"
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
      required: false,
    },
    autofocus: {
      type: Boolean,
      required: false,
    },
    disabled: {
      type: Boolean,
      required: false,
    },
  },
  methods: {
    updateHeigh() {
      this.$refs.myInput.style.height = 'auto';
      this.$refs.myInput.style.height = this.$refs.myInput.scrollHeight + 'px';
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
      this.$refs.myInput.focus();
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
