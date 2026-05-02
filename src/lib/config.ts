/**
 * ===============================================================
 *  WEDDING INVITATION — CONFIG
 *  Sửa toàn bộ nội dung của thiệp tại đây.
 *  All wedding-card content is configured in this file.
 * ===============================================================
 *  ⚠️  Ảnh / nhạc dưới đây hiện đang trỏ tới CDN của một bên
 *      thứ ba (cinelove.me). Đó chỉ là PLACEHOLDER tạm để bạn
 *      xem layout. Vui lòng THAY bằng ảnh / nhạc của bạn trước
 *      khi đem deploy thật — các tài sản đó thuộc về cặp đôi
 *      gốc trong template, dùng đi dùng lại là không được phép.
 *  Replace all asset URLs with your own before going live.
 * ===============================================================
 */

export type WeddingConfig = typeof config;

export const config = {
  // --- Meta -----------------------------------------------------
  meta: {
    siteName: "Wedding Invitation",
    title: "Thiệp mời cưới | Phú Danh ❤ Lệ Giang",
    description: "Thân mời quý vị đến chung vui cùng chúng tôi.",
    locale: "vi-VN",
    ogImage:
      "https://img.cinelove.me/uploads/3dfcd63e-f350-493e-92dc-caa14f27d121/30284874-f066-4d90-8d17-99a90fe8169b.jpg?crop=0,0,0,0&resize=1000x&format=webp",
  },

  // --- Couple ---------------------------------------------------
  couple: {
    groom: {
      shortName: "Phú Danh",
      fullName: "Trần Phú Danh",
      birthDate: "03/09/1996",
      hometown: "Nam Định",
      portrait:
        "https://img.cinelove.me/uploads/3dfcd63e-f350-493e-92dc-caa14f27d121/0d3d0e15-0b70-465e-be88-af43795261d9.jpg?crop=63,323,973,1459&resize=600x",
      family: {
        title: "Nhà Trai",
        father: "Ông : Trần Phú Trường",
        mother: "Bà : Trần Thị Ngân",
        address: "TP. Hà Nội",
      },
    },
    bride: {
      shortName: "Lệ Giang",
      fullName: "Ngô Lệ Giang",
      birthDate: "13/09/1999",
      hometown: "Hà Nội",
      portrait:
        "https://img.cinelove.me/uploads/3dfcd63e-f350-493e-92dc-caa14f27d121/dcbc108e-32b5-428d-af03-bda8968fc9a7.jpg?crop=121,182,973,1642&resize=600x",
      family: {
        title: "Nhà Gái",
        father: "Ông : Ngô Duy Hà",
        mother: "Bà : Đinh Thị Ngọc",
        address: "TP. Hà Nội",
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
    hero:
      "https://img.cinelove.me/uploads/3dfcd63e-f350-493e-92dc-caa14f27d121/30284874-f066-4d90-8d17-99a90fe8169b.jpg?crop=0,0,0,0&resize=900x&format=webp",
    countdownBackground:
      "https://img.cinelove.me/uploads/3dfcd63e-f350-493e-92dc-caa14f27d121/5f7cef5d-4bba-43bb-b504-219c569381d9.jpg?crop=0,249,1215,810&resize=900x",
    marryMeMain:
      "https://img.cinelove.me/uploads/3dfcd63e-f350-493e-92dc-caa14f27d121/997db8c7-d135-4d88-950d-088d598636cf.jpg?crop=0,373,1215,810&resize=900x&format=webp",
    saveTheDate:
      "https://img.cinelove.me/uploads/3dfcd63e-f350-493e-92dc-caa14f27d121/a5104da4-2344-4897-b8f8-4b892f90d13d.jpg?crop=0,738,1066,1066&resize=800x",
    gallery: [
      "https://img.cinelove.me/uploads/3dfcd63e-f350-493e-92dc-caa14f27d121/ae9574c-98ff-4f0a-9fcc-146171ff57ed.jpg?crop=81,477,1050,700&resize=800x",
      "https://img.cinelove.me/uploads/3dfcd63e-f350-493e-92dc-caa14f27d121/755c83a9-99d2-45c0-ac8a-fc3caaa3b02a.jpg?crop=43,220,959,640&resize=800x",
      "https://img.cinelove.me/uploads/3dfcd63e-f350-493e-92dc-caa14f27d121/8af5ad30-b143-4114-8488-e85700dd8d27.jpg?crop=42,392,897,598&resize=800x",
      "https://img.cinelove.me/uploads/3dfcd63e-f350-493e-92dc-caa14f27d121/1b4e5afd-697e-47d8-887c-7e35575c94bf.jpg?crop=123,744,973,648&resize=800x",
    ],
  },

  // --- Music ----------------------------------------------------
  audio: {
    title: "Lễ Đường - Kai Đinh",
    src: "https://assets.cinelove.me/mp3/0e470330-e4d4-4fdc-8d99-830aab66916c.mp3",
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
        accountName: "TRAN PHU DANH",
        accountNumber: "0123456789",
      },
      {
        side: "bride" as const,
        bankName: "Techcombank",
        accountName: "NGO LE GIANG",
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
