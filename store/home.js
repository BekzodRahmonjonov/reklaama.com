export const state = () => ({
  list: null,
  recommondation: null,
  detail: null,
  filterDetail: null,
  companyCounter: null,
  baseUrlImg: "https://backend.reklaama.com/api/display/image?id=",
});

export const getters = {
  list: (state) => state.list,
  recommondation: (state) => state.recommondation,
  detail: (state) => state.detail,
  baseUrlImg: (state) => state.baseUrlImg,
  filterDetail: (state) => state.filterDetail,
  companyCounter: (state) => state.companyCounter,
};

export const mutations = {
  setState(state, { key, value }) {
    state[key] = value;
  },
};

export const actions = {
  getDisplays({ commit }, { params }) {
    return new Promise(async (resolve, reject) => {
      try {
        const { status, data } = await this.$axios.get(`api/display/byFilter`, {
          params,
        });
        if (status == 200) {
          commit("setState", { key: "list", value: data });
        }
        resolve({
          status: true,
          error: false,
        });
      } catch (e) {
        reject({
          status: false,
          error: e,
        });
      }
    });
  },
  getDetail({ commit }, { params }) {
    return new Promise(async (resolve, reject) => {
      try {
        const { status, data } = await this.$axios.get(`api/display/getById`, {
          params,
        });
        if (status == 200) {
          commit("setState", { key: "detail", value: data });
        }
        resolve({
          status: true,
          error: false,
        });
      } catch (e) {
        reject({
          status: false,
          error: e,
        });
      }
    });
  },
  getDetailByFilter({ commit }, id) {
    return new Promise(async (resolve, reject) => {
      try {
        const { status, data } = await this.$axios.get(
          `api/display/getDetails/${id}`
        );
        if (status == 200) {
          commit("setState", { key: "filterDetail", value: data });
        }
        resolve({
          status: true,
          error: false,
        });
      } catch (e) {
        reject({
          status: false,
          error: e,
        });
      }
    });
  },
  getCompanyByFilter({ commit }) {
    return new Promise(async (resolve, reject) => {
      try {
        const { status, data } = await this.$axios.get(
          `api/display/getAllByCompanyCounter`
        );
      
        if (status == 200) {
          commit("setState", { key: "companyCounter", value: data.objectsshDev });
        }
        resolve({
          status: true,
          error: false,
        });
      } catch (e) {
        reject({
          status: false,
          error: e,
        });
      }
    });
  },
  markerCreate(_, form) {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await this.$axios.post(`api/order/create`, form);
        resolve({
          data: data,
          status: true,
        });
      } catch (e) {
        reject({
          status: false,
          data: null,
        });
      }
    });
  },
  bookingDisplay(_, id) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await this.$axios.post(`api/display/booking/${id}`);
        resolve({
          status: true,
          error: false,
        });
      } catch (e) {
        reject({
          status: false,
          error: e,
        });
      }
    });
  },
  saved(_, { params }) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await this.$axios.get(`api/order/isSave`, {
          params,
        });

        resolve({
          status: res,
          error: null,
        });
      } catch (e) {
        reject({
          status: false,
          error: e,
        });
      }
    });
  },
  getTopSeen({ commit }) {
    return new Promise(async (resolve, reject) => {
      try {
        const { status, data } = await this.$axios.get(
          `api/display/getRecommendations`
        );
        if (status == 200) {
          commit("setState", { key: "recommondation", value: data });
        }
        resolve({
          status: true,
          error: false,
        });
      } catch (e) {
        reject({
          status: false,
          error: e,
        });
      }
    });
  },
};
