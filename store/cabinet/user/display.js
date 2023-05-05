export const state = () => ({
  file: "",
  myLocations: null,
  locationList: null,
  count: 0,
  fullAdress: null,
  special_keys: null,
});

export const getters = {
  file: (state) => state.file,
  myLocations: (state) => state.myLocations,
  locationList: (state) => state.locationList,
  count: (state) => state.count,
  fullAdress: (state) => state.fullAdress,
  special_keys: (state) => state.special_keys,
};

export const mutations = {
  setState(state, { key, value }) {
    state[key] = value;
  },
};

export const actions = {
  getFile({ commit }, form) {
    return new Promise(async (resolve, reject) => {
      try {
        const { data, status } = await this.$axios.post(
          `attachment/create`,
          form
        );
        if (status == 200) {
          commit("setState", { key: "file", value: data.id });
        }else{
          commit("setState", { key: "file", value:"" });
        }

        resolve({
          status: true,
          error: null,
        });
      } catch (e) {
        const {
          response: { status },
        } = e;
        if (status == 403) {
          this.$router.push("/auth/login");
        }
        reject({
          status: false,
          error: e,
        });
      }
    });
  },
  displayCreate({ commit }, form) {
    return new Promise(async (resolve, reject) => {
      try {
        const { status } = await this.$axios.post(`api/display/create`, form);
        resolve({
          status: status,
          error: null,
        });
      } catch (e) {
        const {
          response: { status },
        } = e;
        if (status == 403) {
          this.$router.push("/auth/login");
        }
        reject({
          status: false,
          error: e,
        });
      }
    });
  },
  displayDelete({ commit }, { params }) {
    return new Promise(async (resolve, reject) => {
      try {
        const { status } = await this.$axios.delete(`api/display/delete`, {
          params,
        });
        resolve({
          status: status,
          error: null,
        });
      } catch (e) {
        const {
          response: { status },
        } = e;
        if (status == 403) {
          this.$router.push("/auth/login");
        }
        reject({
          status: false,
          error: e,
        });
      }
    });
  },
  displayUpdate({ commit }, form) {
    return new Promise(async (resolve, reject) => {
      try {
        const { status } = await this.$axios.post(`api/display/create`, form);
        resolve({
          status: status,
          error: null,
        });
      } catch (e) {
        const {
          response: { status },
        } = e;
        if (status == 403) {
          this.$router.push("/auth/login");
        }
        reject({
          status: false,
          error: e,
        });
      }
    });
  },

  getMylocations({ commit }) {
    return new Promise(async (resolve, reject) => {
      try {
        const { status, data } = await this.$axios.get(`api/display/getOwn`);

        if (status === 200) {
          commit("setState", { key: "myLocations", value: data });
        }
        resolve({
          status: status,
          error: null,
        });
      } catch (e) {
        const {
          response: { status },
        } = e;
        if (status == 403) {
          this.$router.push("/auth/login");
        }
        reject({
          status: false,
          error: e,
        });
      }
    });
  },
  getDisplayPagination({ commit }, { params }) {
    return new Promise(async (resolve, reject) => {
      try {
        const { status, data } = await this.$axios.get(
          `api/display/pagination`,
          { params }
        );

        if (status === 200) {
          commit("setState", { key: "locationList", value: data && data.res });
          commit("setState", { key: "count", value: data && data.max });
        }
        resolve({
          status: status,
          error: null,
        });
      } catch (e) {
        const {
          response: { status },
        } = e;
        if (status == 403) {
          this.$router.push("/auth/login");
        }
        reject({
          status: false,
          error: e,
        });
      }
    });
  },

  getLocationInfo({ commit }, { params }) {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await this.$axios.get(`api/display/full-address`, {
          params,
        });
        commit("setState", {
          key: "fullAdress",
          value: data.resourceSets && data.resourceSets[0],
        });
        resolve({
          status: true,
          error: null,
        });
      } catch (e) {
        const {
          response: { status },
        } = e;
        if (status == 403) {
          this.$router.push("/auth/login");
        }
        reject({
          status: false,
          error: e,
        });
      }
    });
  },
  serachKeys({ commit }, key) {
    return new Promise(async (resolve, reject) => {
      try {
        const { data, status } = await this.$axios.get(
          `api/display/special-key/${key}`
        );
        if (status == 200) {
          commit("setState", { key: "special_keys", value: data });
        }

        resolve({
          status: true,
          error: null,
        });
      } catch (e) {
        const {
          response: { status },
        } = e;
        if (status == 403) {
          this.$router.push("/auth/login");
        }
        reject({
          status: false,
          error: e,
        });
      }
    });
  },
};
