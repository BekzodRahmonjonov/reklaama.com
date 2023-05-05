<template>
  <div class="order">
    <div class="mini-container">
      <div class="order-wrapper">
        <div class="order-wrapper-steps">
          <h2>{{ steps[current].title[$i18n.locale] }}</h2>
          <a-steps :current="current">
            <a-step
              v-for="item in steps"
              :key="item.title[$i18n.locale]"
              :title="item.title[$i18n.locale]"
            />
          </a-steps>
        </div>
        <div class="order-wrapper-content">
          <div v-if="current == 1">
            <a-form-model class="forms" ref="form" :model="form" :rules="rules">
              <a-row type="flex" :gutter="[0, 36]">
                <a-col span="24" :sm="{ span: 10 }">
                  <div class="order-wrapper-content-left">
                    <h5>{{ $t("address") }}</h5>
                    <span>{{ $t("addressText") }}</span>
                  </div>
                </a-col>
                <a-col span="24" :sm="{ span: 14 }">
                  <div class="order-wrapper-content-right">
                    <a-row type="flex" :gutter="[18, 0]">
                      <a-col span="12">
                        <a-form-model-item class="forms-group" prop="street">
                          <a-input
                            v-model="form.street"
                            class="forms-group__input"
                            :placeholder="$t('street')"
                          ></a-input>
                        </a-form-model-item>
                      </a-col>
                    </a-row>
                  </div>
                </a-col>
                <a-col span="24" :sm="{ span: 10 }">
                  <div class="order-wrapper-content-left">
                    <h5>{{ $t("constructor") }}</h5>
                    <span>{{ $t("addressText") }}</span>
                  </div>
                </a-col>
                <a-col span="24" :sm="{ span: 14 }">
                  <div class="order-wrapper-content-right">
                    <a-row type="flex" :gutter="[18, 0]">
                      <a-col span="12">
                        <a-form-model-item
                          class="forms-group"
                          prop="ty"
                          :class="{ active: form.ty || form.ty == 0 }"
                        >
                          <a-select
                            :class="{ 'forms-error': this.errors.type }"
                            class="forms-group__select"
                            :placeholder="$t('type')"
                            v-model="form.ty"
                          >
                            <template #suffixIcon>
                              <svgicon name="select-angle-down"> </svgicon>
                            </template>
                            <a-select-option
                              v-for="(item, index) in billboards"
                              :key="index"
                              :value="index"
                            >
                              {{ item.title[$i18n.locale] }}
                            </a-select-option>
                          </a-select>
                          <span class="my-placeholder">{{ $t("type") }}</span>
                        </a-form-model-item>
                      </a-col>
                      <a-col span="12">
                        <a-form-model-item class="forms-group" prop="size">
                          <a-input
                            v-model="form.size"
                            @change="sizeChange"
                            class="forms-group__input"
                            :placeholder="$t('size') + ' (2m x 3m)'"
                          ></a-input>
                        </a-form-model-item>
                      </a-col>
                      <a-col span="12" v-if="form.ty == 3">
                        <a-form-model-item class="forms-group" prop="bright">
                          <a-input
                            v-model="form.bright"
                            class="forms-group__input"
                            :placeholder="$t('contressB')"
                          ></a-input>
                        </a-form-model-item>
                      </a-col>
                      <a-col span="12" v-if="form.ty == 2">
                        <a-form-model-item class="forms-group" prop="height">
                          <a-input
                            v-model="form.height"
                            class="forms-group__input"
                            :placeholder="$t('contressH')"
                          ></a-input>
                        </a-form-model-item>
                      </a-col>
                      <a-col span="12"></a-col>
                      <span class="recomend">{{
                        form.ty == 3
                          ? $t("nitTextB")
                          : form.ty == 2
                          ? $t("nitTextH")
                          : ""
                      }}</span>
                      <a-col span="12">
                        <a-form-model-item
                          class="forms-group"
                          prop="status"
                          :class="{ active: form.status }"
                        >
                          <a-select
                            :class="{ 'forms-error': this.errors.status }"
                            v-model="form.status"
                            class="forms-group__select"
                            placeholder="Status"
                          >
                            <template #suffixIcon>
                              <svgicon name="select-angle-down"> </svgicon>
                            </template>
                            <a-select-option
                              v-for="(item, index) in status"
                              :key="index"
                              :value="item.title[$i18n.locale]"
                            >
                              {{ item.title[$i18n.locale] }}
                            </a-select-option>
                          </a-select>
                          <span class="my-placeholder">{{ $t("status") }}</span>
                        </a-form-model-item>
                      </a-col>
                      <a-col
                        span="12"
                        v-if="form.status != status[0].title[$i18n.locale]"
                      >
                        <a-form-model-item class="forms-group" prop="expire">
                          <a-date-picker
                            class="forms-group__input"
                            :placeholder="$t('date')"
                            @change="onChange"
                            :value="this.form.expire"
                          />
                        </a-form-model-item>
                      </a-col>
                      <a-col span="12">
                        <a-form-model-item
                          class="forms-group"
                          prop="companyName"
                        >
                          <a-input
                            v-model="form.companyName"
                            class="forms-group__input"
                            :placeholder="$t('company')"
                          ></a-input>
                        </a-form-model-item>
                      </a-col>
                      <a-col span="24">
                        <div class="special-display-keys">
                          <a-form-model-item class="forms-group">
                            <a-input
                              class="forms-group__input"
                              :placeholder="$t('specialKeys')"
                              @change="searchChange"
                            ></a-input>
                          </a-form-model-item>
                          <ul
                            class="display-keys"
                            v-if="show_special_key.length > 0"
                          >
                            <li
                              v-for="(item, index) in show_special_key"
                              :key="index"
                              @click="removeSpecialKeys(index)"
                            >
                              {{ item[1] }}
                              <svgicon name="exit" />
                            </li>
                          </ul>
                        </div>
                        <div class="option">
                          <perfect-scrollbar>
                            <ul class="display-keys display-option">
                              <li
                                v-for="(item, index) in specialOption"
                                :key="index"
                                @click="getSpecialKeys(item)"
                              >
                                {{ item[1] }}
                              </li>
                            </ul>
                          </perfect-scrollbar>
                        </div>
                      </a-col>
                      <span class="recomend">{{ $t("specialKeysText") }}</span>
                    </a-row>
                  </div>
                </a-col>
                <a-col span="24" :sm="{ span: 10 }">
                  <div class="order-wrapper-content-left">
                    <h5>{{ $t("pricing") }}</h5>
                  </div>
                </a-col>
                <a-col span="24" :sm="{ span: 14 }">
                  <div class="order-wrapper-content-right">
                    <a-row type="flex" :gutter="[18, 0]">
                      <a-col span="24" v-if="form.ty == 3">
                        <strong class="time__rolling">
                          <svgicon name="time-roll" />
                          {{ $t("roll_time") }}
                        </strong>
                        <a-form-model-item class="forms-group">
                          <a-slider
                            class="time-slider"
                            :marks="marks"
                            :max="30"
                            :min="5"
                            :tip-formatter="null"
                            :step="5"
                            @change="onAfterChange"
                          />
                        </a-form-model-item>
                      </a-col>
                      <a-col span="12">
                        <a-form-model-item class="forms-group" prop="price">
                          <a-input
                            v-model="form.price[active_mark]"
                            class="forms-group__input"
                            :placeholder="$t('cost')"
                            v-mask="'############'"
                          ></a-input>
                        </a-form-model-item>
                      </a-col>
                      <a-col span="12">
                        <a-form-model-item class="forms-group" prop="phone">
                          <a-input
                            v-model="form.phone"
                            class="forms-group__input"
                            :placeholder="$t('phoneNumber')"
                            v-mask="'+998 (##) ### ## ##'"
                          ></a-input>
                        </a-form-model-item>
                      </a-col>
                      <span v-if="form.ty == 3" class="recomend">{{
                        $t("roll_time_info")
                      }}</span>
                    </a-row>
                  </div>
                </a-col>
                <a-col span="24" :sm="{ span: 10 }">
                  <div class="order-wrapper-content-left">
                    <h5>{{ $t("passportConstructor") }}</h5>
                    <span>{{ $t("pricingText") }}</span>
                  </div>
                </a-col>
                <a-col span="24" :sm="{ span: 14 }">
                  <div class="order-wrapper-content-right">
                    <a-row type="flex" :gutter="[18, 0]">
                      <a-col span="24">
                        <div class="upload-document">
                          <div class="upload-document-image">
                            <FormUploadFile
                              :class="{ 'forms-error': this.errors.file }"
                              icon="document"
                              :title="$t('passport')"
                              @change="fileChange"
                            />
                            <p>
                              {{ $t("passwordText") }}
                            </p>
                          </div>
                        </div>
                      </a-col>
                    </a-row>
                  </div>
                </a-col>
              </a-row>
            </a-form-model>
          </div>
          <div v-else-if="current == 0" class="map">
            <client-only>
              <yandex-map
                :zoom="zoom"
                :settings="settings"
                :coords="coords"
                @click="yandexClick"
              >
                <ymap-marker
                  marker-type="placemark"
                  hint-content=""
                  :coords="[currentPositon.longitude, currentPositon.latitude]"
                  markerId="1current"
                  :icon="{
                    layout: 'default#imageWithContent',
                    imageHref: require('~/assets/icons/point.svg'),
                    imageSize: [22, 32],
                    imageOffset: [-11, -30],
                  }"
                >
                </ymap-marker>

                <ymap-marker
                  v-if="currentLocation"
                  key="my-location"
                  marker-type="placemark"
                  :coords="[
                    currentLocation.longitude,
                    currentLocation.latitude,
                  ]"
                  markerId="my-location"
                  cluster-name="my-location"
                  geoObjectOpenBalloonOnClick="false"
                  :icon="{
                    layout: 'default#imageWithContent',
                    imageHref: `https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Yandex_Maps_icon.svg/1200px-Yandex_Maps_icon.svg.png`,
                    imageSize: [40, 40],
                    imageOffset: [-20, -35],
                  }"
                >
                  <div slot="balloon">{{ $t("myLocation") }}</div>
                </ymap-marker>
              </yandex-map>
            </client-only>
            <div class="order-wrapper-content-left critery">
              <h5>{{ $t("critery") }}</h5>
              <span>1. {{ $t("critery1") }} </span>
              <span> 2. {{ $t("critery2") }}</span>
            </div>
            <div class="upload-document">
              <div class="upload-document-image">
                <FormUploadFile
                  :class="{ 'forms-error': this.errors.image }"
                  icon="photo"
                  :title="$t('photo')"
                  @change="imageChange"
                />
                <p>
                  {{ $t("photoText") }}
                </p>
              </div>
              <div class="upload-document-imagelist">
                <p v-for="(item, index) in myImages" :key="index">
                  {{ item }}
                  <svgicon
                    @click="deleteMyImages(index)"
                    class="delete"
                    name="delete"
                  />
                </p>
              </div>
            </div>
            <div class="order-wrapper-content-left">
              <span>{{ $t("photoTextInfo") }}</span>
            </div>
          </div>
        </div>
        <div class="order-wrapper-action">
          <a-button
            class="order-back"
            v-if="current > 0"
            style="margin-left: 8px"
            @click="prev"
          >
            <svgicon name="arrow-left"></svgicon>
            {{ $t("back") }}
          </a-button>
          <a-button
            v-if="current < steps.length - 1"
            type="primary"
            @click="next"
          >
            {{ $t("next") }}
          </a-button>
          <a-button
            v-if="current == steps.length - 1"
            type="primary"
            @click="sendDisplay"
            :loading="loading"
          >
            {{ $t("finish") }}
          </a-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { yandexMap, ymapMarker, loadYmap } from "vue-yandex-maps";

export default {
  layout: "cabinet",
  middleware: "user",
  data() {
    return {
      form: {
        size: "",
        street: "",
        bright: null,
        height: null,
        price: {
          5: "",
          10: "",
          15: "",
          20: "",
          25: "",
          30: "",
        },
        expire: null,
        ty: null,
        special_key: [],
        companyName: "",
        status: null,
        files: [],
        images: [],
        phone: "",
        locationDto: {
          latitude: "",
          longitude: "",
        },
        city: "Tashkent",
      },
      marks: {
        5: "5 s",
        10: "10 s",
        15: "15 s",
        20: "20 s",
        25: "25 s",
        30: "30 s",
      },
      active_mark: 5,
      show_special_key: [],
      myImages: [],
      current: 0,
      loading: false,
      steps: [
        {
          title: {
            en: "Location",
            ru: "Локация",
            uz: "Manzil",
            oz: "Манзил",
          },
        },
        {
          title: {
            en: "Details",
            ru: "Детали",
            uz: "Batafsil",
            oz: "Батафсил",
          },
        },
      ],
      area: ["Toshkent shahri"],
      status: [
        {
          title: {
            en: "Avilable",
            ru: "Доступно",
            uz: "Mavjud",
            oz: "Мавжуд",
          },
        },
        {
          title: {
            en: "Not avilable",
            ru: "Недоступно",
            uz: "Mavjud emas",
            oz: "Мавжуд эмас",
          },
        },
      ],
      specialOption: [],
      rules: {
        street: [
          { required: true, trigger: "blur", message: this.$t("requiredFill") },
        ],
        size: [
          { required: true, trigger: "blur", message: this.$t("requiredFill") },
        ],
        bright: [
          { required: true, trigger: "blur", message: this.$t("requiredFill") },
        ],
        height: [
          { required: true, trigger: "blur", message: this.$t("requiredFill") },
        ],
        ty: [
          { required: true, trigger: "blur", message: this.$t("requiredFill") },
        ],
        companyName: [
          { required: true, trigger: "blur", message: this.$t("requiredFill") },
        ],
        price: [
          { required: true, trigger: "blur", message: this.$t("requiredFill") },
        ],
        phone: [
          { required: true, trigger: "blur", message: this.$t("requiredFill") },
        ],
        expire: [
          {
            required: false,
            trigger: "blur",
            message: this.$t("requiredFill"),
          },
        ],
        status: [
          { required: true, trigger: "blur", message: this.$t("requiredFill") },
        ],
      },
      settings: {
        apiKey: "",
        lang: "ru_RU",
        coordorder: "latlong",
        enterprise: false,
        version: "2.1",
      },
      currentPositon: {
        longitude: "41.319765954337115", // ! x Koordinatasi
        latitude: "69.25457354018394", // ! y Koordinatasi
      },
      coords: [41.319765954337115, 69.25457354018394],
      currentLocation: null,
      zoom: 12,
      errors: {
        image: false,
        file: false,
        type: false,
        status: false,
      },
    };
  },
  components: { yandexMap, ymapMarker },
  computed: {
    ...mapGetters("cabinet/user/display", [
      "file",
      "fullAdress",
      "special_keys",
    ]),
    ...mapGetters("constants", ["billboards"]),
    specialKeys() {
      return Object.entries(this.special_keys);
    },
  },
  methods: {
    ...mapActions("cabinet/user/display", [
      "getFile",
      "displayCreate",
      "getLocationInfo",
      "serachKeys",
    ]),
    next() {
      this.current++;
      this.checkByEmpty();
    },
    prev() {
      this.current--;
    },
    sizeChange() {
      let size = this.form.size.trimLeft();
      let index = size.indexOf(" ");
      if (index != -1 && !size.includes("m x")) {
        size = size.slice(0, -1) + "m x ";
      }
      this.form.size = size;
    },
    async fileChange(doc) {
      const f = new FormData();
      f.append("file", doc.originFileObj);
      await this.getFile(f);
      this.errors.image = true;
      this.form.files.push(this.file);
    },
    async imageChange(doc) {
      this.myImages.push(doc.name);
      const f = new FormData();
      f.append("file", doc.originFileObj);
      await this.getFile(f);
      this.form.images.push(this.file);
      this.errors.image = false;
    },
    async sendDisplay() {
      this.loading = true;
      this.form.files = [...this.form.files, this.file];

      this.$refs.form.validate(async (valid) => {
        this.checkByEmpty();
        this.clearFile();
        if (valid) {
          try {
            this.form.height = Number(this.form.height);
            this.form.bright = Number(this.form.bright);
            this.form.ty = Number(this.form.ty);
            this.form.expire != null
              ? (this.form.expire += "T00:00:00.00")
              : "";

            const { status } = await this.displayCreate(this.form);
            if (status == 200) {
              this.$message.success(this.$t("addDisplaySuccess"));
              this.$router.push(this.localePath("/cabinet/user/my-locations"));
            }
          } catch (e) {
            this.$message.error(this.$t("seeError"));
          }
        }
      });

      this.loading = false;
    },
    getSpecialKeys(e) {
      var count = 0;
      if (
        this.form.special_key.length == 0 &&
        this.form.special_key.length < 4
      ) {
        this.form.special_key.push(e[0]);
        this.show_special_key.push(e);
      } else {
        this.form.special_key.map((item) => {
          if (item == e[0]) {
            count++;
          }
        });
        if (count == 0 && this.form.special_key.length < 4) {
          this.form.special_key.push(e[0]);
          this.show_special_key.push(e);
        }
      }
    },
    removeSpecialKeys(index) {
      this.show_special_key.splice(index, 1);
      this.form.special_key.splice(index, 1);
    },

    onAfterChange(value) {
      this.active_mark = value;
    },
    // yandex-map
    yandexClick(e) {
      this.currentPositon.longitude = e.get("coords")[0];
      this.currentPositon.latitude = e.get("coords")[1];

      this.form.locationDto.longitude = e.get("coords")[1];
      this.form.locationDto.latitude = e.get("coords")[0];
    },

    onChange(date, dateString) {
      this.form.expire = dateString;
    },
    async checkByEmpty() {
      if (this.current === 1) {
        if (this.form.locationDto.latitude == "") {
          this.$message.info(this.$t("requiredLocation"));
          this.current--;
        } else if (this.form.images.length == 0) {
          this.$message.info(this.$t("requiredPhoto"));
          this.current--;
          this.errors.image = true;
        } else {
          await this.getLocationInfo({ params: this.form.locationDto });

          const base = this.fullAdress.resources[0].address;
          this.form.street = base.addressLine + " " + base.adminDistrict;
          this.form.city = this.form.street;
        }
      }
    },
    async searchChange(e) {
      await this.serachKeys(e.target.value || "_+");
      this.specialOption = this.specialKeys;
    },
    deleteMyImages(index) {
      this.myImages.splice(index, 1);
      this.form.images.splice(index, 1);
    },
    clearFile() {
      if (this.form.files.length > 0) {
        let res = this.form.files.filter(
          (item, index) => this.form.files.indexOf(item) === index && item != ""
        );
        this.form.files = res;
      }

      if (this.form.images.length > 0) {
        let res = this.form.images.filter(
          (item, index) =>
            this.form.images.indexOf(item) === index && item != ""
        );
        this.form.images = res;
      }
    },
  },
  async mounted() {
    await this.serachKeys("_+");
    await loadYmap({ settings: this.settings, debug: false });
    this.specialOption = this.specialKeys;
    const success = (pos) => {
      const crd = pos.coords;
      this.currentLocation = {
        longitude: crd.latitude,
        latitude: crd.longitude,
        visible: false,
      };
    };

    const error = (err) => {
      console.warn(err);
    };
    navigator.geolocation.getCurrentPosition(success, error);
  },
};
</script>
<style lang="scss" scoped>
.ymap-container {
  height: 100%;
}
</style>
