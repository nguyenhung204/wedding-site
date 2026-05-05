/**
 * ===============================================================
 *  WEDDING INVITATION — CONFIG
 *  Sửa toàn bộ nội dung của thiệp tại đây.
 *  All wedding-card content is configured in this file.
 * ===============================================================
 *  Assets below are served locally from /public/assets.
 * ===============================================================
 */

export type WeddingConfig = typeof config;

export const config = {
  // --- Meta -----------------------------------------------------
  meta: {
    siteName: "Wedding Invitation",
    title: "Thiệp mời cưới | Văn Hoàng ❤ Anh Thư",
    description: "Thân mời quý vị đến chung vui cùng chúng tôi.",
    locale: "vi-VN",
    ogImage: "/assets/hero.jpg",
  },

  // --- Couple ---------------------------------------------------
  couple: {
    groom: {
      shortName: "Văn Hoàng",
      fullName: "Đoàn Văn Hoàng",
      birthDate: "03/09/1996",
      hometown: "Phú Yên",
      portrait: "/assets/groom-portrait.jpg",
      family: {
        title: "Nhà Trai",
        father: "Ông: Trần Phú Trưởng",
        mother: "Bà : Trần Thị Ngân",
        address: "Phú Yên",
      },
    },
    bride: {
      shortName: "Anh Thư",
      fullName: "Nguyễn Lê Anh Thư",
      birthDate: "13/07/1999",
      hometown: "Hà Nội",
      portrait: "/assets/bride-portrait.jpg",
      family: {
        title: "Nhà Gái",
        father: "Ông : Nguyễn Duy Hưng",
        mother: "Bà : Đinh Thị Hương",
        address: "An Giang",
      },
    },
  },

  // --- Dates ----------------------------------------------------
  // ISO 8601 — used for countdown
  weddingDate: "2026-02-07T11:30:00+07:00",
  display: {
    dayOfWeek: "Thứ Bảy",
    timeStr: "11:30",
    day: 7,
    month: 2,
    year: 2026,
    lunar: "Tức ngày 20 tháng 12 âm Ất Tỵ",
  },

  // --- Ceremony / Party -----------------------------------------
  ceremony: {
    label: "Lễ Thành Hôn",
    title: "Trân trọng kính mời",
    subtitle: "Đến dự lễ thành hôn của hai con chúng tôi",
  },
  party: {
    title: "Tiệc Mừng Lễ Thành Hôn",
    timeLine: "Vào lúc 11:30 thứ Bảy",
    venueName: "Trung tâm tiệc cưới Trống Đồng Cảnh Hồ",
    venueHall: "Hội trường King 1 - Tầng 2",
    address: "173B Trường Chinh, phường Phương Liệt, Tp Hà Nội",
    schedule: [
      { time: "11:00", label: "Đón khách" },
      { time: "11:30", label: "Nghi lễ" },
      { time: "11:45", label: "Khai tiệc" },
    ],
    mapEmbedSrc:
      "https://www.google.com/maps?q=Tr%E1%BB%91ng+%C4%90%E1%BB%93ng+Palace+C%E1%BA%A3nh+H%E1%BB%93+173B+Tr%C6%B0%E1%BB%9Dng+Chinh+H%C3%A0+N%E1%BB%99i&output=embed",
  },

  // --- Cover invitation message --------------------------------
  invitationMessage: [
    "Gửi đến anh chị em đồng nghiệp thân mến,",
    "Cảm ơn quý đồng nghiệp đã dành thời gian quý báu để cùng chúng tôi chung vui trong ngày đặc biệt này. Chúng tôi vô cùng biết ơn vì luôn có sự đồng hành và ủng hộ của quý đồng nghiệp, và thật vinh hạnh khi được chia sẻ niềm hạnh phúc của chúng tôi cùng quý vị.",
    "Trân trọng kính mời quý vị đến dự lễ cưới của chúng tôi.",
  ],

  // --- Photos for sections --------------------------------------
  photos: {
    hero: "/assets/hero.jpg",
    heroEnvelope: "/assets/countdown-bg.jpg",
    countdownBackground: "/assets/hero-alt.jpg",
    marryMeMain: "/assets/marry-me.jpg",
    saveTheDate: "/assets/save-date.jpg",
    gallery: [
      "/assets/gallery-1.jpg",
      "/assets/gallery-2.jpg",
      "/assets/gallery-3.jpg",
      "/assets/gallery-4.jpg",
      "/assets/gallery-5.jpg",
    ],
    illustrations: {
      happiness: "/assets/double-happiness.png",
      weddingCouple: "/assets/illustration-couple.png",
      dancingCouple: "/assets/dancing-couple.gif",
      giftBox: "/assets/gift-box.png",
      loveSign: "/assets/love-sign.png",
      weddingElement: "/assets/wedding-element.png",
      waxSeal: "/assets/wax-seal.webp",
      audioIcon: "/assets/audio-icon.png",
      audioDisc: "/assets/audio-disc.png",
      calendarHeart: "/assets/calendar-heart-fingerprint.png",
      timelineWelcome: "/assets/timeline-welcome.png",
      timelineCeremony: "/assets/timeline-ceremony.png",
      timelineParty: "/assets/timeline-party.png",
    },
  },

  // --- Music ----------------------------------------------------
  audio: {
    title: "Lễ Đường - Kai Đinh",
    src: "/assets/music.mp3",
    autoplay: true,
  },

  // --- Wedding gift accounts (mừng cưới) ------------------------
  gifts: {
    intro:
      "Chúng tôi rất muốn được chụp chung với anh chị em đồng nghiệp những tấm hình kỷ niệm vì vậy hãy đến sớm hơn một chút nhé! Đám cưới của chúng tôi sẽ trọn vẹn hơn khi có thêm lời chúc phúc và sự hiện diện của quý vị.",
    label: "Hộp quà cưới",
    accounts: [
      {
        side: "groom" as const,
        bankName: "Vietcombank",
        accountName: "DOAN VAN HOANG",
        accountNumber: "0123456789",
      },
      {
        side: "bride" as const,
        bankName: "Techcombank",
        accountName: "NGUYEN LE ANH THU",
        accountNumber: "9876543210",
      },
    ],
  },

  // --- Theme ----------------------------------------------------
  theme: {
    background: "#f9f1efff",
    primary: "#a95151",
    accent: "#e49696",
    text: "#3a2a2a",
  },

  // --- Effects --------------------------------------------------
  effects: {
    petals: true, // floating heart-petal background animation
    autoScroll: { enabled: true, speed: 0.06 }, // px per ms
    hideWatermark: true,
  },
};

export default config;
