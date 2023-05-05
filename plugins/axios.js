import axios from "axios";
export default function (context, inject) {
  const instance = axios.create({
    // baseURL: "http://172.105.56.59:9095/",
    baseURL: "https://backend.reklaama.com/",
  });

  instance.interceptors.request.use((config) => {
    const access = localStorage.getItem("access") || "";
    
    config.headers["ContentType"] = "application/json";
    config.headers["Authorization"] = "Bearer " + access;
    config.headers["Accept"] = "*/*";
    config.headers["Accept-Language"] = context.i18n._vm.locale || "ru";

    return config;
  });
  inject("axios", instance);
}
