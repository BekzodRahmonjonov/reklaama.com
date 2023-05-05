export const state = () => ({
  access: "",
  refresh: "",
  role: 0,
});

export const getters = {
  role(state) {
    return state.role;
  },
  access(state) {
    return state.access;
  },
};

export const mutations = {
  setState(state, { key, value }) {
    value && localStorage.setItem(key, value);
    !value && localStorage.removeItem(key);
    state[key] = value;
  },
};

const baseUrl = "auth";
export const actions = {
  login({ commit }, form) {
    return new Promise(async (resolve, reject) => {
      try {
        const { status, data } = await this.$axios.post(
          `${baseUrl}/login`,
          form
        );
        if (status == 200) {
          commit("setState", { key: "access", value: data.accessToken });
          commit("setState", { key: "refresh", value: data.refreshToken });
          const { accessToken } = data;

          const token_split = accessToken && accessToken.split(".");
          const fields_str =
            token_split &&
            token_split.length > 1 &&
            JSON.parse(window.atob(token_split[1]));
          let { sub, role } = fields_str;
          commit("setState", { key: "role", value: role || 2 });
          commit("setState", { key: "email", value: sub });
          resolve({
            status,
            error: null,
          });
        } else {
          reject({
            status,
            error: message,
          });
        }
      } catch ({ response }) {
        if (response.status == 409) {
          reject({
            status: response.data.friendlyMessage,
            error: true,
          });
        }else{
          reject({
            status: false,
            error: true,
          });
        }
      }
    });
  },

  logout({ commit }) {
    const list = [
      {
        value: "",
        key: "access",
      },
      {
        value: 0,
        key: "role",
      },
      {
        value: 0,
        key: "user_id",
      },
      {
        value: 0,
        key: "refresh",
      },
      {
        value: 0,
        key: "email",
      },
      {
        value: 0,
        key: "path",
      },
    ];

    list.forEach((el) => {
      commit("setState", { ...el });
    });
  },
};
