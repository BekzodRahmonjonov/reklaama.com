<template>
  <client-only>
    <div class="table">
      <perfect-scrollbar>
        <table>
          <thead>
            <tr>
              <slot name="header"> </slot>
            </tr>
          </thead>
          <tbody>
            <slot name="body"></slot>
          </tbody>
        </table>
        <slot name="empty"></slot>
        <slot name="popup"></slot>
      </perfect-scrollbar>
    </div>
  </client-only>
</template>
<script>
export default {
  data() {
    return {};
  },
};
</script>

<style></style>
