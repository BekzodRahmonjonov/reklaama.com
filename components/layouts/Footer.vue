<template>
  <div class="footer">
    <div class="footer-top">
      <div class="container">
        <div class="footer-top-wrapper">
          <nuxt-link :to="localePath('/')">
            <svgicon class="logo" name="logo" />
          </nuxt-link>
          <ul>
            <li>
              <h3>{{ $t("ourEmail") }}</h3>
              <a
                href="mailto: info@reklaama.com?subject=Mail from reklaama.com"
                target="_blank"
                >info@reklaama.com</a
              >
            </li>
            <li>
              <h3>{{ $t("callToUs") }}</h3>
              <a href="tel: +998940080076">+998 (94) 008-007-6</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <div class="container">
        <div class="footer-bottom-wrapper">
          <small>{{ $t("copyright") }}</small>
          <div class="socials">
            <a href="https://t.me/reklaama_official" target="_blank">
              <svgicon name="telegram"></svgicon>
            </a>
            <a
              href=" https://instagram.com/reklaama_official?igshid=YmMyMTA2M2Y="
              target="_blank"
            >
              <svgicon name="instagram"></svgicon>
            </a>
            <svgicon name="youtube"></svgicon>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped></style>
