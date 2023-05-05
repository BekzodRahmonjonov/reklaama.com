export const state = () => ({
  list: [],
});

export const getters = {
  list: (state) => state.list,
};

export const mutations = {
  setState(state, { key, value }) {
    state[key] = value;
  },
};

export const actions = {
  getNotification({ commit }) {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await this.$axios.get(`api/notification/user/getAll`);
        commit("setState", { key: "list", value: data });

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
  unSeen({ commit }) {
    return new Promise(async (resolve, reject) => {
      try {
        const {data} = await this.$axios.get("api/notification/user/unSeen");
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
