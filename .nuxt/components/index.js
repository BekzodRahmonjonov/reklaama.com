export { default as HomeMap } from '../../components/homeMap.vue'
export { default as Lang } from '../../components/lang.vue'
export { default as MarkerSwiper } from '../../components/markerSwiper.vue'
export { default as Sidebar } from '../../components/sidebar.vue'
export { default as Svgicon } from '../../components/svgicon.vue'
export { default as Timer } from '../../components/timer.vue'
export { default as CustomPagination } from '../../components/custom/pagination.vue'
export { default as CustomTable } from '../../components/custom/table.vue'
export { default as LayoutsFooter } from '../../components/layouts/Footer.vue'
export { default as LoaderHome } from '../../components/loader/home.vue'
export { default as Loader } from '../../components/loader/index.vue'
export { default as SwiperRecommondation } from '../../components/swiper/recommondation.vue'
export { default as FormUploadAvatar } from '../../components/form/upload/avatar.vue'
export { default as FormUploadBannerPhoto } from '../../components/form/upload/bannerPhoto.vue'
export { default as FormUploadFile } from '../../components/form/upload/file.vue'
export { default as LayoutsHeader } from '../../components/layouts/header/index.vue'
export { default as LayoutsHeaderMenu } from '../../components/layouts/header/menu/index.vue'
export { default as LayoutsHeaderMenuMobile } from '../../components/layouts/header/menu/mobile.vue'

// nuxt/nuxt.js#8607
function wrapFunctional(options) {
  if (!options || !options.functional) {
    return options
  }

  const propKeys = Array.isArray(options.props) ? options.props : Object.keys(options.props || {})

  return {
    render(h) {
      const attrs = {}
      const props = {}

      for (const key in this.$attrs) {
        if (propKeys.includes(key)) {
          props[key] = this.$attrs[key]
        } else {
          attrs[key] = this.$attrs[key]
        }
      }

      return h(options, {
        on: this.$listeners,
        attrs,
        props,
        scopedSlots: this.$scopedSlots,
      }, this.$slots.default)
    }
  }
}
