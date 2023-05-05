export const state = () => ({
  access: "",
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
    state[key] = value;
  },
};

const baseUrl = "auth";
export const actions = {
  checkStatus({ commit }, { params = "" }) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await this.$axios.patch(
          `${baseUrl}/changeStatus?code=${params.code}`
        );
        resolve({
          status: res,
          error: null,
        });
      } catch ({ response }) {
        if (response.status == 409) {
          reject({
            status: response.data.friendlyMessage,
            error: true,
          });
        }
      }
    });
  },
  checkOtp({ commit }, form) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await this.$axios.post(`${baseUrl}/checkOtp`, form);
        resolve({
          status: res.data,
          error: null,
        });
      } catch ({ response }) {
        if (response.status == 409) {
          reject({
            status: response.data.friendlyMessage,
            error: true,
          });
        }
      }
    });
  },
  forgetPassword({ commit }, form) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await this.$axios.post(
          `${baseUrl}/forgetPasswordOtp`,
          form
        );
        resolve({
          status: true,
          error: null,
        });
      } catch ({ response }) {
        if (response.status == 409) {
          reject({
            status: response.data.friendlyMessage,
            error: true,
          });
        }
      }
    });
  },
  updatePassword({ commit }, form) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await this.$axios.put(
          `${baseUrl}/changePasswordWithOtp`,
          form
        );
        resolve({
          status: true,
          error: null,
        });
      } catch ({ response }) {
        if (response.status == 409) {
          reject({
            status: response.data.friendlyMessage,
            error: true,
          });
        }
      }
    });
  },
};
