export default function ({ route, redirect }) {
  const role = typeof window !== "undefined" && localStorage.getItem("role");
  if (role != 1) {
    if (route.path.includes("user")) {
      return redirect("/");
    }
  }
}
