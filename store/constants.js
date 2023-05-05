export const state = () => ({
  districts: {
    oz: [
      "Бектемир тумани",
      "Миробод тумани",
      "Мирзо Улуғбек тумани",
      "Сергели тумани",
      "Олмазор тумани",
      "Учтепа тумани",
      "Шайхонтоҳур тумани",
      "Яшнобод тумани",
      "Чилонзор тумани",
      "Юнусобод тумани",
      "Яккасарой тумани",
    ],
    uz: [
      "Bektemir tumani",
      "Mirobod tumani",
      "Mirzo Ulug‘bek tumani",
      "Sergeli tumani",
      "Olmazor tumani",
      "Uchtepa tumani",
      "Shayxontohur tumani",
      "Yashnobod tumani",
      "Chilonzor tumani",
      "Yunusobod tumani",
      "Yakkasaroy tumani",
    ],
    ru: [
      "Бектемирский район",
      "Миробадский район",
      "Мирзо Улугбекский район",
      "Сергелийский район",
      "Алмазарский район",
      "Учтепский район",
      "Шейхонтохурский район",
      "Яшнабадский район",
      "Чиланзарский район",
      "Юнусабадский район",
      "Яккасарайский район",
    ],
  },
  platformInfo: {
    oz: [
      {
        video: require("~/assets/gifs/photo-gallery.gif.mp4"),
        title: "Тузилмалар ва унинг атрофидаги жойларнинг фотосуратлари",
      },
      {
        video: require("~/assets/gifs/map.gif.mp4"),
        title: "Харитадаги аниқ жойлашув",
      },
      {
        video: require("~/assets/gifs/calendar.gif.mp4"),
        title: "Мавжудлик ҳолати",
      },
      {
        video: require("~/assets/gifs/search.gif.mp4"),
        title: "Калит сўзлар",
      },
      {
        video: require("~/assets/gifs/tag.gif.mp4"),
        title: "Жойлаштириш нархлари",
      },
      {
        video: require("~/assets/gifs/radar.gif.mp4"),
        title: "Қидирув майдонида тавсиялар",
      },
      {
        video: require("~/assets/gifs/phone.gif.mp4"),
        title: "Эгаларининг алоқа маълумотлари",
      },
    ],
    uz: [
      {
        video: require("~/assets/gifs/photo-gallery.gif.mp4"),
        title: "Tuzilmalar va uning atrofidagi joylarning fotosuratlari",
      },
      {
        video: require("~/assets/gifs/map.gif.mp4"),
        title: "Xaritadagi aniq joylashuv",
      },
      {
        video: require("~/assets/gifs/calendar.gif.mp4"),
        title: "Mavjudlik holati",
      },
      {
        video: require("~/assets/gifs/search.gif.mp4"),
        title: "Kalit so'zlar",
      },
      {
        video: require("~/assets/gifs/tag.gif.mp4"),
        title: "Joylashtirish narxlari",
      },
      {
        video: require("~/assets/gifs/radar.gif.mp4"),
        title: "Qidiruv maydonida tavsiyalar",
      },
      {
        video: require("~/assets/gifs/phone.gif.mp4"),
        title: "Egalarining aloqa ma'lumotlari",
      },
    ],
    ru: [
      {
        video: require("~/assets/gifs/photo-gallery.gif.mp4"),
        title: "Фотографии конструкций и прилегающей территории",
      },
      {
        video: require("~/assets/gifs/map.gif.mp4"),
        title: "Точное местоположение на карте",
      },
      {
        video: require("~/assets/gifs/calendar.gif.mp4"),
        title: "Статус доступности",
      },
      {
        video: require("~/assets/gifs/search.gif.mp4"),
        title: "Ключевые слова",
      },
      {
        video: require("~/assets/gifs/tag.gif.mp4"),
        title: "Цены размещений",
      },
      {
        video: require("~/assets/gifs/radar.gif.mp4"),
        title: "Рекомендации в зоне поиска",
      },
      {
        video: require("~/assets/gifs/phone.gif.mp4"),
        title: "Контактные данные владельцев",
      },
    ],
    en: [
      {
        video: require("~/assets/gifs/photo-gallery.gif.mp4"),
        title: "Photos of structures and the surrounding area",
      },
      {
        video: require("~/assets/gifs/map.gif.mp4"),
        title: "Precise location on the map",
      },
      {
        video: require("~/assets/gifs/calendar.gif.mp4"),
        title: "Availability status",
      },
      {
        video: require("~/assets/gifs/search.gif.mp4"),
        title: "Key words",
      },
      {
        video: require("~/assets/gifs/tag.gif.mp4"),
        title: "Placement fees",
      },
      {
        video: require("~/assets/gifs/radar.gif.mp4"),
        title: "Recommendations in the search area",
      },
      {
        video: require("~/assets/gifs/phone.gif.mp4"),
        title: "Owner contact information",
      },
    ],
  },
  billboards: [
    {
      title: {
        uz: "Bilbord",
        oz: "Билборд",
        ru: "Билборд",
        en: "Billboard",
      },
      url: require("~/assets/images/billboard1.png"),
      info: {
        uz: "Magistral yo'llar va ko'chalar bo'ylab o'rnatilgan katta qalqon.",
        oz: "Магистрал йўллар ва кўчалар бўйлаб ўрнатилган катта қалқон.",
        ru: "Щит большого размера, устанавливаемый вдоль трасс и улиц.",
        en: "Shield of large size, installed along highways and streets.",
      },
    },
    {
      title: {
        uz: "Shahar formati",
        oz: "Шаҳар формати",
        ru: "Сити-формат",
        en: "City format",
      },
      url: require("~/assets/images/billboard2.png"),
      info: {
        uz: "Bir tomonlama yoki ikki tomonlama bo'lishi mumkin bo'lgan yorug'lik qutisi (lightbox).",
        oz: "Бир томонлама ёки икки томонлама бўлиши мумкин бўлган ёруғлик қутиси (lightbox).",
        ru: "Световой короб (лайтбокс), который может быть как односторонним, так и двухсторонним.",
        en: "Light box, which can be one-sided or two-sided.",
      },
    },
    {
      title: {
        uz: "Tom qurilmasi",
        oz: "Том қурилмаси",
        ru: "Крышная конструкция",
        en: "Roof construction",
      },
      url: require("~/assets/images/billboard3.png"),
      info: {
        uz: "Binoning tepasida o'rnatiladigan harflar dizayni va kompaniya logotipi.",
        oz: "Бинонинг тепасида ўрнатиладиган ҳарфлар дизайни ва компания логотипи.",
        ru: "Конструкции из букв и логотипа компании, которые закреплены на верхушке здания.",
        en: "Structures of letters and the company logo, which are attached to the top of the building.",
      },
    },
    {
      title: {
        uz: "LED paneli",
        oz: "LED панел",
        ru: "LED панель",
        en: "LED board",
      },
      url: require("~/assets/images/billboard4.png"),
      info: {
        uz: "Video yoki slayd-shouni uzatuvchi LED monitor.",
        oz: "Видео ёки слайд-шоуни узатувчи ЛЕД монитор.",
        ru: "Монитор из светодиодов, который транслирует видео или слайдшоу.",
        en: "LED monitor that broadcasts a video or slideshow.",
      },
    },
    {
      title: {
        uz: "Prismatron",
        oz: "Присматрон",
        ru: "Призматрон",
        en: "Prismatron",
      },
      url: require("~/assets/images/billboard5.png"),
      info: {
        uz: "Sirti uchburchakli aylanuvchi prizmalardan tashkil topgan reklama vositalari.",
        oz: "Сирти учбурчакли айланувчи призмалардан ташкил топган реклама воситалари.",
        ru: "Рекламоноситель, поверхность которого состоит из трёхгранных поворачивающихся призм.",
        en: "Advertising carrier, the surface of which consists of three-sided rotating prisms.",
      },
    },
    {
      title: {
        uz: "Bayroq ustuni",
        oz: "Байроқ устуни",
        ru: "Флагшток",
        en: "Flagpole",
      },
      url: require("~/assets/images/billboard6.png"),
      info: {
        uz: "Bayroqni ko'tarish uchun mo'ljallangan stend.",
        oz: "Байроқни кўтариш учун мўлжалланган стенд.",
        ru: "Стойка, которая предназначена для поднятия флага.",
        en: "A stand that is designed to raise the flag.",
      },
    },
    {
      title: {
        uz: "Faervol",
        oz: "Фаервол",
        ru: "Брандмауэр",
        en: "Brand panel",
      },
      url: require("~/assets/images/billboard7.png"),
      info: {
        uz: "Devorning butun maydoniga yoki binoning jabhasiga joylashtirilgan katta formatli tuzilmalar.",
        oz: "Деворнинг бутун майдонига ёки бинонинг жабҳасига жойлаштирилган катта форматли тузилмалар.",
        ru: "Конструкции большого формата, размещаемые на всю площадь стены или фасада здания.",
        en: "Large format designs, placed on the entire area of the wall or facade of the building.",
      },
    },
    {
      title: {
        uz: "Superboard",
        oz: "Супербоард",
        ru: "Суперборд",
        en: "Superboard",
      },
      url: require("~/assets/images/billboard8.png"),
      info: {
        uz: "Yuqori stendga o'rnatilgan katta reklama ekrani.",
        oz: "Юқори стендга ўрнатилган катта реклама экрани.",
        ru: "Рекламный экран больших размеров, установленный на высокой стойке.",
        en: "A large-sized advertising screen mounted on a high pole.",
      },
    },
  ],
  searchKeys: [
    {
      title: {
        uz: "Samarqand Darvoza savdo markazi",
        oz: "Самарқанд Дарвоза савдо маркази",
        ru: "Samarqand Darvoza ТЦ",
        en: "Samarqand Darvoza shopping center",
      },
    },
    {
      title: {
        uz: "Tashkent city parki",
        oz: "Ташкент ситй парки",
        ru: "Ташкент Сити парк",
        en: "Tashkent City Park",
      },
    },
    {
      title: {
        uz: "Muzey",
        oz: "Музей",
        ru: "Mузей",
        en: "Museum",
      },
    },
    {
      title: {
        uz: "Humo Arena",
        oz: "Хумо Арена",
        ru: "Хумо Арена",
        en: "Humo Arena",
      },
    },
    {
      title: {
        uz: "Metro Xalqlar Do'stligi",
        oz: "Метро Халклар Дустлиги",
        ru: "Метро Дружба Народов",
        en: "Metro 'Xalqlar do'stligi'",
      },
    },
    {
      title: {
        uz: "Islom Ota Masjidi",
        oz: "Ислом Ота Масжиди",
        ru: "Мечеть Ислом Ота",
        en: "'Islom Ota' mosque",
      },
    },
    {
      title: {
        uz: "O'quv markazi",
        oz: "Ўқув маркази",
        ru: "Учебный центр",
        en: "Education center",
      },
    },
    {
      title: {
        uz: "Qo'yliq bozori",
        oz: "Қўйлиқ бозори",
        ru: "Куйлюкский Базар",
        en: "Bazaar 'Qo`yliq'",
      },
    },
    {
      title: {
        uz: "Akademik teatr",
        oz: "Академик театр",
        ru: "Академический театр",
        en: "Academic theater",
      },
    },
    {
      title: {
        uz: "Ko'p qavatli turar-joy binosi",
        oz: "Кўп қаватли турар-жой биноси",
        ru: "Жилой многоэтажный дом ",
        en: "Residential high-rise building",
      },
    },
    {
      title: {
        uz: "Kichik halqa yo'li",
        oz: "Кичик ҳалқа йўли",
        ru: "Малая кольцевая дорога",
        en: "Small Ring Road",
      },
    },
    {
      title: {
        uz: "Xalqaro universitet",
        oz: "Халқаро университет",
        ru: "Международный ВУЗ",
        en: "International university",
      },
    },
    {
      title: {
        uz: "Xususiy maktab",
        oz: "Хусусий мактаб",
        ru: "Частная школа",
        en: "Private school",
      },
    },
    {
      title: {
        uz: "Premium restoran",
        oz: "Премиум ресторан",
        ru: "Премиум Ресторан",
        en: "Premium Restaurant",
      },
    },
    {
      title: {
        uz: "Premium mehmonxona",
        oz: "Премиум меҳмонхона",
        ru: "Премиум Отель",
        en: "Premium Hotel",
      },
    },
    {
      title: {
        uz: "Premium biznes markazi",
        oz: "Премиум бизнес маркази",
        ru: "Премиум Бизнес-центр",
        en: "Premium Business Center",
      },
    },
    { title: { uz: "Kafe", oz: "Кафе", ru: "Кафе", en: "Cafe" } },
    {
      title: {
        uz: "Avtobus bekati",
        oz: "Автобус бекати",
        ru: "Автобусная остановка",
        en: "Bus stop",
      },
    },
    { title: { uz: "Dorixona", oz: "Дорихона", ru: "Аптека", en: "Pharmacy" } },
    { title: { uz: "Bank", oz: "Банк", ru: "Банк", en: "Bank" } },
    { title: { uz: "756890", oz: "756890", ru: "756890", en: "756890" } },
    { title: { uz: "546378", oz: "546378", ru: "546378", en: "546378" } },
    { title: { uz: "563802", oz: "563802", ru: "563802", en: "563802" } },
    { title: { uz: "957439", oz: "957439", ru: "957439", en: "957439" } },
    { title: { uz: "253740", oz: "253740", ru: "253740", en: "253740" } },
  ],
});

export const getters = {
  billboards: (state) => state.billboards,
  districts: (state) => state.districts,
  platformInfo: (state) => state.platformInfo,
  searchKeys: (state) => state.searchKeys,
};