export const state = () => ({
  menu: {
    1: [
      {
        title: {
          en:"Statistics",
          ru:"Statistics",
          uz:"Statistics",
          oz:"Statistics",
        },
        lightIcon: "menuLightProfile",
        darkIcon: "menuDarkProfile",
        path: "/cabinet/admin/statistics",
      },
      {
        title: {
          en:"Notifications",
          ru:"Уведомления",
          uz:"Bildirishnomalar",
          oz:"Билдиришномалар",
        },
        lightIcon: "menuLightLocation",
        darkIcon: "menuDarkLocation",
        path: "/cabinet/admin/notification",
        type: "notification",
      },
    ],
    2: [
      {
        title: {
          en:"Profile",
          ru:"Профиль",
          uz:"Profil",
          oz:"Профил",
        },
        lightIcon: "menuLightProfile",
        darkIcon: "menuDarkProfile",
        path: "/cabinet/user/profile",
      },
      {
        title: {
          en:"My locations",
          ru:"Мои локации",
          uz:"Mening qurilmalarim",
          oz:"Менинг қурилмаларим",
        },
        lightIcon: "menuLightLocation",
        darkIcon: "menuDarkLocation",
        path: "/cabinet/user/my-locations",
      },
      {
        title: {
          en:"Notifications",
          ru:"Уведомления",
          uz:"Bildirishnomalar",
          oz:"Билдиришномалар",
        },
        lightIcon: "menuLightNotification",
        darkIcon: "menuDarkNotification",
        path: "/cabinet/user/notification",
        type: "notification",
      },
    ],
  },
});

export const getters = {
  menu: (state) => state.menu,
};
