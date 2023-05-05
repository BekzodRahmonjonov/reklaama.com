export const state = () => ({
  list: null,
  nList: null,
});

export const getters = {
  list: (state) => state.list,
  nList: (state) => state.nList,
};

export const mutations = {
  setState(state, { key, value }) {
    state[key] = value;
  },
};

export const actions = {
  getStatistics({ commit }) {
    return new Promise(async (resolve, reject) => {
      try {
        const { status, data } = await this.$axios.get(`api/display/statistic`);
        if (status == 200) {
          commit("setState", { key: "list", value: data });
        } else {
          resolve({
            status: false,
            error: null,
          });
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
  getNotification({ commit }) {
    return new Promise(async (resolve, reject) => {
      try {
        const { status, data } = await this.$axios.get(`api/notification/all`);
        if (status == 200) {
          commit("setState", { key: "nList", value: data });
        } else {
          resolve({
            status: false,
            error: null,
          });
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
  updateConfirm({ commit }, form) {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await this.$axios.patch(
          `api/notification/change`,
          form
        );
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
  getUnSeenAdmin({ commit }) {
    return new Promise(async (resolve, reject) => {
      try {
        const {data} = await this.$axios.get("api/notification/unSeen");
        resolve({
          status:true,
          error:false,
          data:data,
        });
      } catch (e) {
        reject({
          status: false,
          error: true,
        });
      }
    });
  },
};
