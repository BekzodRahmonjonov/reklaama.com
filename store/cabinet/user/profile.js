export const state = () => ({
  userInfo: "",
});

export const getters = {
  userInfo: (state) => state.userInfo,
};

export const mutations = {
  setState(state, { key, value }) {
    state[key] = value;
  },
  setLocal(state, { key, value }) {
    value && localStorage.setItem(key, value);
    !value && localStorage.removeItem(key);
  },
};

export const actions = {
  getUser({ commit }) {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await this.$axios.get(`auth/getUser`);
        commit("setState", { key: "userInfo", value: data });

        resolve({
          status: true,
          error: null,
        });
      } catch (e) {
        const {
          response: { status },
        } = e;
        if (status == 403) {
          this.$router.push("/");

          localStorage.removeItem("access");
          localStorage.removeItem("refresh");
          localStorage.removeItem("role");
          localStorage.removeItem("email");
        }
        reject({
          status: status,
          error: e,
        });
      }
    });
  },
  updateUserDetail({ commit }, form) {
    return new Promise(async (resolve, reject) => {
      try {
        const { status, data } = await this.$axios.put(`auth/update`, form);
        if (status == 200 && data.jwt) {
          commit("setLocal", { key: "access", value: data.jwt.accessToken });
          commit("setLocal", { key: "refresh", value: data.jwt.refreshToken });
          const { accessToken } = data.jwt;

          const token_split = accessToken && accessToken.split(".");
          const fields_str =
            token_split &&
            token_split.length > 1 &&
            JSON.parse(window.atob(token_split[1]));
          let { sub, role } = fields_str;
          commit("setLocal", { key: "role", value: role || 2 });
          commit("setLocal", { key: "email", value: sub });
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
