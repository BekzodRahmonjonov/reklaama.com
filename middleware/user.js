export default function ({ route, redirect }) {
  const role = typeof window !== "undefined" && localStorage.getItem("role");

  if (role != 2) {
    if (route.path.includes("admin")) {
      return redirect("/");
    }
  }
}
