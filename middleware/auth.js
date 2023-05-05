export default function ({ route, from, redirect, store, $axios }) {
  setTimeout(()=> {
    if (typeof window !== "undefined") {
      var access = localStorage.getItem("access");
      var role = localStorage.getItem("role");
      if (role && access) {
        if (role == 2) {
          if (route.path.includes("admin")) {
            return redirect("/");
          }
        } else if (role == 1) {
          if (route.path.includes("user")) {
            return redirect("/");
          }
        }
      } else {
        if (route.path.includes("cabinet")) {
          return redirect("/auth/login");
        }
      }
    }
  }, 2000);
}
