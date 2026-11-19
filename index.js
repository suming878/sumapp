(function () {
const topWin = window.parent || window, topDoc = topWin.document;

/* 👑 Sumoul App 作者专属配置区（改完贴回 GitHub 全网生效） */
const AUTH_CONFIG = {
    ADMIN_PIN: "0520",                     // 1. 管理员后台密码
    SECRET_SALT: "SUMOUL_APP_GRAY_2025",   // 2. 一Q一码加密盐值
    PASSWORDS: ["SUMOUL2025", "GRAY0520"], // 3. 免私信群发口令（填任意口令+QQ号即可通过）
    WHITELIST: ["10001"],                  // 4. 免密白名单QQ号
    BLACKLIST: ["999999"],                 // 5. 永久拉黑封杀QQ号
    CLOUD_SYNC_URL: ""                     // 6. 选填：云端 JSON 同步链接
};

function bootSumoulApp() {
if (!topDoc || !topDoc.body) { setTimeout(bootSumoulApp, 250); return; }
["seoul-mini-theater-btn", "seoul-mini-theater-modal", "seoul-mini-theater-style", "seoul-wx-custom-style", "seoul-ext-settings-panel", "seoul-wand-menu-item"].forEach((id) => topDoc.getElementById(id)?.remove());

const K_API = "sumoul_v16_api", K_WX_CSS = "sumoul_v16_wx_css", K_MUSIC = "sumoul_v16_music", K_HTML = "sumoul_v16_html", K_SYNC = "sumoul_v16_sync", K_STICKERS = "sumoul_v16_stickers", K_AUTH = "sumoul_v16_auth_user", K_ADMIN_DB = "sumoul_v16_admin_db";

const svgUri = (d, s = "%23484852", v = "0 0 24 24", w = "1.5") => `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='${v}' fill='none' stroke='${s}' stroke-width='${w}' stroke-linecap='round' stroke-linejoin='round'%3E${d}%3C/svg%3E")`;
const inlineSvg = (d, c = "#484852", sz = 12) => `<svg viewBox="0 0 24 24" width="${sz}" height="${sz}" fill="none" stroke="${c}" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block!important;visibility:visible!important;width:${sz}px!important;height:${sz}px!important;flex-shrink:0!important;vertical-align:middle!important;pointer-events:none!important;">${d}</svg>`;
const svgImg = (d, sz = 22, c = "%233A3A40", w = "1.5") => `<img src="data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='${c}' stroke-width='${w}' stroke-linecap='round' stroke-linejoin='round'%3E${d}%3C/svg%3E" style="width:${sz}px!important;height:${sz}px!important;display:block!important;object-fit:contain!important;border:none!important;background:transparent!important;pointer-events:none!important;" />`;

const ICO = {
    back: svgUri("%3Cpath d='M15 18l-6-6 6-6'/%3E", "%233A3A40", "0 0 24 24", "1.9"),
    chat: svgUri("%3Cpath d='M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z'/%3E", "%237A7A85"),
    chatAct: svgUri("%3Cpath d='M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z'/%3E", "%232C2C32", "0 0 24 24", "2"),
    heart: svgUri("%3Cpath d='M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z'/%3E", "%237A7A85"),
    heartAct: svgUri("%3Cpath d='M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z'/%3E", "%232C2C32", "0 0 24 24", "2"),
    user: svgUri("%3Cpath d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2'/%3E%3Ccircle cx='12' cy='7' r='4'/%3E", "%237A7A85"),
    userAct: svgUri("%3Cpath d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2'/%3E%3Ccircle cx='12' cy='7' r='4'/%3E", "%232C2C32", "0 0 24 24", "2"),
    archive: svgUri("%3Cpath d='M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z'/%3E", "%237A7A85"),
    archiveAct: svgUri("%3Cpath d='M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z'/%3E", "%232C2C32", "0 0 24 24", "2"),
    settings: svgUri("%3Ccircle cx='12' cy='12' r='3'/%3E%3Cpath d='M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z'/%3E", "%237A7A85"),
    settingsAct: svgUri("%3Ccircle cx='12' cy='12' r='3'/%3E%3Cpath d='M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z'/%3E", "%232C2C32", "0 0 24 24", "2"),
    plus: svgUri("%3Cpath d='M12 5v14M5 12h14'/%3E", "%23484852", "0 0 24 24", "1.8"),
    arrowUpRight: svgUri("%3Cpath d='M7 17L17 7M17 7H8M17 7v9'/%3E", "%23FFFFFF", "0 0 24 24", "1.9"),
    transfer: svgUri("%3Crect x='2' y='5' width='20' height='14' rx='3'/%3E%3Cline x1='2' y1='10' x2='22' y2='10'/%3E%3Cpath d='M7 15h4'/%3E", "%233A3A40", "0 0 24 24", "1.5")
};

const AB_ICO = {
    pet: svgImg("%3Cpath d='M5 9.5L3.5 4l5 2.2c2.2-.6 4.8-.6 7 0L20.5 4 19 9.5c1.2 1.7 1.6 4 .8 6.2-1.1 3-4.3 4.8-7.8 4.8s-6.7-1.8-7.8-4.8c-.8-2.2-.4-4.5.8-6.2z'/%3E%3Ccircle cx='9' cy='12.5' r='1' fill='%233A3A40'/%3E%3Ccircle cx='15' cy='12.5' r='1' fill='%233A3A40'/%3E%3Cpath d='M11 14.8l1 .8 1-.8'/%3E", 22),
    petLg: svgImg("%3Cpath d='M5 9.5L3.5 4l5 2.2c2.2-.6 4.8-.6 7 0L20.5 4 19 9.5c1.2 1.7 1.6 4 .8 6.2-1.1 3-4.3 4.8-7.8 4.8s-6.7-1.8-7.8-4.8c-.8-2.2-.4-4.5.8-6.2z'/%3E%3Ccircle cx='9' cy='12.5' r='1' fill='%233A3A40'/%3E%3Ccircle cx='15' cy='12.5' r='1' fill='%233A3A40'/%3E%3Cpath d='M11 14.8l1 .8 1-.8'/%3E", 38),
    cam4: svgImg("%3Crect x='4' y='2' width='16' height='20' rx='3'/%3E%3Cline x1='4' y1='8' x2='20' y2='8'/%3E%3Cline x1='4' y1='14' x2='20' y2='14'/%3E%3Ccircle cx='8.5' cy='5' r='1'/%3E%3Ccircle cx='8.5' cy='11' r='1'/%3E%3Ccircle cx='8.5' cy='17' r='1'/%3E", 22),
    qa: svgImg("%3Cpath d='M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z'/%3E%3Cpath d='M9.5 9.5a2.5 2.5 0 0 1 5 0c0 1.5-2.5 2-2.5 3.5'/%3E", 22),
    wave: svgImg("%3Cpath d='M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z'/%3E%3Cpolyline points='6 12 9.5 12 11 9 13 15 14.5 12 18 12'/%3E", 22),
    ticket: svgImg("%3Cpath d='M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z'/%3E%3Cline x1='14' y1='5' x2='14' y2='19' stroke-dasharray='2 2.5'/%3E", 22),
    guest: svgImg("%3Cpath d='M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z'/%3E%3Cpolyline points='14 2 14 8 20 8'/%3E%3Cpath d='M8 13h8M8 17h5'/%3E", 22),
    phone: svgImg("%3Crect x='5' y='2' width='14' height='20' rx='2' ry='2'/%3E%3Cline x1='12' y1='18' x2='12.01' y2='18'/%3E", 22),
    music: svgImg("%3Cpath d='M9 18V5l12-2v13'/%3E%3Ccircle cx='6' cy='18' r='3'/%3E%3Ccircle cx='18' cy='16' r='3'/%3E", 22),
    book: svgImg("%3Cpath d='M4 19.5A2.5 2.5 0 0 1 6.5 17H20'/%3E%3Cpath d='M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z'/%3E", 22),
    grid: svgImg("%3Crect x='3' y='3' width='7' height='7' rx='1'/%3E%3Crect x='14' y='3' width='7' height='7' rx='1'/%3E%3Crect x='14' y='14' width='7' height='7' rx='1'/%3E%3Crect x='3' y='14' width='7' height='7' rx='1'/%3E", 13, "%23484852", "1.7"),
    camSm: svgImg("%3Cpath d='M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z'/%3E%3Ccircle cx='12' cy='13' r='4'/%3E", 12, "%23484852", "1.7"),
    heartSm: svgImg("%3Cpath d='M12 20s-7-4.4-7-9.5A4 4 0 0 1 12 7.5a4 4 0 0 1 7 3c0 5.1-7 9.5-7 9.5z'/%3E", 12, "%236E6E77", "1.7")
};

const WX_ICO = {
    userSet: inlineSvg(`<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>`),
    sum: inlineSvg(`<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="8" y1="13" x2="16" y2="13"/><line x1="8" y1="17" x2="13" y2="17"/>`),
    skin: inlineSvg(`<path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>`),
    del: inlineSvg(`<polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>`, "#9A6868"),
    quote: inlineSvg(`<path d="M9 14L4 9l5-5"/><path d="M20 20v-7a4 4 0 0 0-4-4H4"/>`),
    edit: inlineSvg(`<path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/>`),
    reroll: inlineSvg(`<path d="M21 2v6h-6"/><path d="M3 12a9 9 0 0 1 15-6.7L21 8"/><path d="M3 22v-6h6"/><path d="M21 12a9 9 0 0 1-15 6.7L3 16"/>`),
    copy: inlineSvg(`<rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>`),
    poke: inlineSvg(`<path d="M18 11V6a2 2 0 0 0-4 0v4"/><path d="M14 10V4a2 2 0 0 0-4 0v6"/><path d="M10 10.5V6a2 2 0 0 0-4 0v8"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/>`),
    card: inlineSvg(`<rect x="2" y="5" width="20" height="14" rx="2.5"/><line x1="2" y1="10" x2="22" y2="10"/><line x1="6" y1="15" x2="10" y2="15"/>`),
    cam: inlineSvg(`<path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/>`),
    mic: inlineSvg(`<rect x="9" y="2" width="6" height="11" rx="3"/><path d="M19 10v1a7 7 0 0 1-14 0v-1"/><line x1="12" y1="18" x2="12" y2="22"/>`),
    smile: inlineSvg(`<circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/>`),
    folder: inlineSvg(`<path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>`),
    sync: inlineSvg(`<polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>`),
    backLeft: inlineSvg(`<path d="M15 18l-6-6 6-6"/>`, "#3A3A40", 14),
    lock: inlineSvg(`<rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>`, "#484852", 12),
    sunMorning: inlineSvg(`<path d="M17 18a5 5 0 0 0-10 0"/><line x1="12" y1="2" x2="12" y2="9"/>`, "#55555E", 13),
    sunDay: inlineSvg(`<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>`, "#55555E", 13),
    sunDusk: inlineSvg(`<path d="M17 18a5 5 0 0 0-10 0"/><line x1="1" y1="18" x2="23" y2="18"/>`, "#55555E", 13),
    moonNight: inlineSvg(`<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>`, "#55555E", 13)
};

function nowTimeStr() { const d = new Date(); return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`; }

function getRealTimeInfo() {
    const now = new Date(), hh = String(now.getHours()).padStart(2, "0"), mm = String(now.getMinutes()).padStart(2, "0");
    const daysKr = ["일요일(周日)", "월요일(周一)", "화요일(周二)", "수요일(周三)", "목요일(周四)", "금요일(周五)", "토요일(周六)"];
    const dayStr = daysKr[now.getDay()], h = now.getHours();
    let periodKr = "심야 · 深夜", periodCn = "深夜", icon = WX_ICO.moonNight;
    if (h >= 5 && h < 11) { periodKr = "새벽 · 黎明"; periodCn = "清晨"; icon = WX_ICO.sunMorning; }
    else if (h >= 11 && h < 17) { periodKr = "낮 · 白昼"; periodCn = "白天"; icon = WX_ICO.sunDay; }
    else if (h >= 17 && h < 20) { periodKr = "황혼 · 暮色"; periodCn = "傍晚"; icon = WX_ICO.sunDusk; }
    else if (h >= 20 && h <= 23) { periodKr = "밤 · 寂夜"; periodCn = "夜晚"; icon = WX_ICO.moonNight; }
    return {
        timeStr: `${hh}:${mm}`,
        fullDateStr: `${now.getFullYear()}.${String(now.getMonth() + 1).padStart(2, "0")}.${String(now.getDate()).padStart(2, "0")} ${dayStr}`,
        periodKr, periodCn, icon,
        promptContext: `【真实时间感知：当前现实时间是 ${now.getMonth() + 1}月${now.getDate()}日 ${dayStr} ${periodCn} ${hh}:${mm}。请自然贴合这个时间点聊天】`
    };
}

function getSTContext(maxMes = 8) {
    let userName = "ME", charName = "", charScopeId = "";
    let userAvatar = "https://i.postimg.cc/rydS6NvG/IMG-3866.jpg", charAvatar = "https://i.postimg.cc/QC3CQ218/IMG-4147.jpg";
    let charDesc = "", recentChat = "";
    try {
        const st = topWin.SillyTavern?.getContext?.();
        if (st) {
            userName = st.name1 || userName;
            if (st.characterId !== undefined && st.characters && st.characters[st.characterId]) {
                const c = st.characters[st.characterId];
                charName = c.name || st.name2 || "";
                charScopeId = c.avatar || c.name || String(st.characterId);
                if (c.avatar) charAvatar = `/characters/${encodeURIComponent(c.avatar)}`;
                charDesc = [c.description, c.personality, c.scenario].filter(Boolean).join("\n");
            } else if (st.groupId) { charScopeId = "group_" + String(st.groupId); charName = st.name2 || "GROUP"; }
            else if (st.name2) { charName = st.name2; charScopeId = st.name2; }
            if (Array.isArray(st.chat) && st.chat.length > 0) {
                recentChat = st.chat.slice(-maxMes).map((m) => `${m.is_user ? userName : (charName || "TA")}: ${m.mes}`).join("\n\n");
            }
        }
    } catch (e) {}
    const selCh = topDoc.querySelector("#rm_button_selected_ch h2, #character_name_pole");
    if (!charName && selCh?.textContent?.trim()) charName = selCh.textContent.trim();
    const aiMes = topDoc.querySelectorAll('#chat .mes:not([is_user="true"]):not(.is_user)');
    if (aiMes.length > 0) {
        const lastAi = aiMes[aiMes.length - 1], n = lastAi.querySelector(".name_text")?.textContent?.trim(), a = lastAi.querySelector(".avatar img")?.src;
        if (n) charName = n; if (a) charAvatar = a;
    }
    const uMes = topDoc.querySelectorAll('#chat .mes[is_user="true"], #chat .mes.is_user');
    if (uMes.length > 0) {
        const lastU = uMes[uMes.length - 1];
        userName = lastU.querySelector(".name_text")?.textContent?.trim() || userName;
        userAvatar = lastU.querySelector(".avatar img")?.src || userAvatar;
    }
    if (!charName) charName = "PARTNER";
    if (!charScopeId) charScopeId = charName;
    const safeScope = String(charScopeId).replace(/[^a-zA-Z0-9_\u4e00-\u9fa5\uac00-\ud7af-]/g, "_");
    return { userName, charName, charScopeId: safeScope, userAvatar, charAvatar, charDesc, recentChat };
}

function getSafeScopedKey(baseKey) { return `${baseKey}__${getSTContext(1).charScopeId}`; }

const NEW_DEFAULT_WX_CSS = `/* 🎨 Sumoul App 微信专属 CSS 美化工作台 */
#seoul-mini-theater-modal #smt-page-talk {
    --我的气泡底色: #F8F8F8; --我的气泡字色: #3A3A40; --我的气泡边框: #EAEAF0;
    --对方气泡底色: #FFFFFF; --对方气泡字色: #333338; --对方气泡边框: #EAEAF0;
    --气泡长圆角: 999px;
    --我的气泡尾巴-url: none; --对方的气泡尾巴-url: none;
    --我的尾巴宽: 13px; --我的尾巴高: 13px; --我的尾巴右侧偏移: -6px; --我的尾巴底部偏移: 2px;
    --对方尾巴宽: 13px; --对方尾巴高: 13px; --对方尾巴左侧偏移: -6px; --对方尾巴底部偏移: 2px;
}
#smt-wx-stream { background-color: #FFFFFF!important; background-size: cover!important; background-position: center!important; }
#seoul-mini-theater-modal #smt-wx-stream .smt-wx-row.me .smt-wx-bubble { background-color: var(--我的气泡底色, #F8F8F8)!important; color: var(--我的气泡字色, #3A3A40)!important; -webkit-text-fill-color: var(--我的气泡字色, #3A3A40)!important; border: 1px solid var(--我的气泡边框, #EAEAF0)!important; border-radius: var(--气泡长圆角, 999px)!important; }
#seoul-mini-theater-modal #smt-wx-stream .smt-wx-row.ai .smt-wx-bubble { background-color: var(--对方气泡底色, #FFFFFF)!important; color: var(--对方气泡字色, #333338)!important; -webkit-text-fill-color: var(--对方气泡字色, #333338)!important; border: 1px solid var(--对方气泡边框, #EAEAF0)!important; border-radius: var(--气泡长圆角, 999px)!important; }
#seoul-mini-theater-modal #smt-wx-stream .smt-wx-bubble.multiline { border-radius: 20px!important; }
#seoul-mini-theater-modal #smt-wx-stream .smt-wx-row.me .smt-wx-bubble::after { content: ""!important; display: block!important; position: absolute!important; right: var(--我的尾巴右侧偏移, -6px)!important; bottom: var(--我的尾巴底部偏移, 2px)!important; width: var(--我的尾巴宽, 13px)!important; height: var(--我的尾巴高, 13px)!important; background-image: var(--我的气泡尾巴-url, none)!important; background-size: contain!important; background-repeat: no-repeat!important; pointer-events: none!important; z-index: 3!important; }
#seoul-mini-theater-modal #smt-wx-stream .smt-wx-row.ai .smt-wx-bubble::before { content: ""!important; display: block!important; position: absolute!important; left: var(--对方尾巴左侧偏移, -6px)!important; bottom: var(--对方尾巴底部偏移, 2px)!important; width: var(--对方尾巴宽, 13px)!important; height: var(--对方尾巴高, 13px)!important; background-image: var(--对方的气泡尾巴-url, none)!important; background-size: contain!important; background-repeat: no-repeat!important; pointer-events: none!important; z-index: 3!important; }`;

function getApiCfg() { try { return Object.assign({ url: "https://api.openai.com/v1", key: "", model: "gpt-4o-mini", ctxCount: 8 }, JSON.parse(localStorage.getItem(K_API) || "{}")); } catch (e) { return { url: "https://api.openai.com/v1", key: "", model: "gpt-4o-mini", ctxCount: 8 }; } }
function saveApiCfg(c) { localStorage.setItem(K_API, JSON.stringify(c)); }
function getChatList() { try { return JSON.parse(localStorage.getItem(getSafeScopedKey("sumoul_v16_wx")) || "[]"); } catch (e) { return []; } }
function saveChatList(list) { localStorage.setItem(getSafeScopedKey("sumoul_v16_wx"), JSON.stringify(list.slice(-150))); }
function getWxCfg() {
    try { return Object.assign({ myNick: "", myBio: "連線中 · Personal Inbox", myAva: "", remark: "", charBio: "随时在线 · 置顶联系人", charAva: "", avaSize: 33, timeAware: true, customBgNote: "" }, JSON.parse(localStorage.getItem(getSafeScopedKey("sumoul_v16_wxcfg")) || "{}")); }
    catch (e) { return { myNick: "", myBio: "連線中 · Personal Inbox", myAva: "", remark: "", charBio: "随时在线 · 置顶联系人", charAva: "", avaSize: 33, timeAware: true, customBgNote: "" }; }
}
function saveWxCfg(cfg) { try { localStorage.setItem(getSafeScopedKey("sumoul_v16_wxcfg"), JSON.stringify(cfg)); } catch (e) {} }
function getWxCss() { return localStorage.getItem(K_WX_CSS) || NEW_DEFAULT_WX_CSS; }
function saveWxCss(css) { localStorage.setItem(K_WX_CSS, css); }
function getSyncMode() { return localStorage.getItem(K_SYNC) === "true"; }
function setSyncMode(val) { localStorage.setItem(K_SYNC, val ? "true" : "false"); }
function getStickerList() {
    try { return JSON.parse(localStorage.getItem(K_STICKERS) || JSON.stringify([{ name: "猫猫探头", url: "https://i.postimg.cc/rydS6NvG/IMG-3866.jpg" }, { name: "委屈巴巴", url: "https://i.postimg.cc/vmsDSqmk/IMG-3926.jpg" }])); }
    catch (e) { return []; }
}
function saveStickerList(l) { localStorage.setItem(K_STICKERS, JSON.stringify(l.slice(0, 150))); }
function getArchive() { try { return JSON.parse(localStorage.getItem(getSafeScopedKey("sumoul_v16_arch")) || "[]"); } catch (e) { return []; } }
function saveArchive(l) { localStorage.setItem(getSafeScopedKey("sumoul_v16_arch"), JSON.stringify(l.slice(0, 150))); }
function pushArchive(title, content, isHtml = false) { const l = getArchive(); l.unshift({ id: Date.now(), title, content, isHtml, time: nowTimeStr() }); saveArchive(l); }

async function requestStandaloneAI(systemText, userText) {
    const cfg = getApiCfg();
    if (!cfg.url || !cfg.key) {
        navigateToPage("api", "API CONFIG · 환경설정", "请先配置独立 API");
        throw new Error("请先在【05. API设置】填写独立 API 地址与 Key 并保存！");
    }
    let url = cfg.url.trim().replace(/\/+$/, "");
    if (!url.endsWith("/chat/completions")) { if (!url.endsWith("/v1")) url += "/v1"; url += "/chat/completions"; }
    const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${cfg.key.trim()}` },
        body: JSON.stringify({ model: cfg.model || "gpt-4o-mini", temperature: 0.85, messages: [{ role: "system", content: systemText }, { role: "user", content: userText }] })
    });
    if (!res.ok) throw new Error(`API HTTP ${res.status}`);
    const data = await res.json();
    return data?.choices?.[0]?.message?.content?.trim() || "";
}

function getAdminDB() {
    const def = { passwords: [...AUTH_CONFIG.PASSWORDS], whitelist: [...AUTH_CONFIG.WHITELIST], blacklist: [...AUTH_CONFIG.BLACKLIST], pending: [] };
    try {
        const saved = JSON.parse(localStorage.getItem(K_ADMIN_DB) || "{}");
        return {
            passwords: Array.from(new Set([...def.passwords, ...(saved.passwords || [])])),
            whitelist: Array.from(new Set([...def.whitelist, ...(saved.whitelist || [])])),
            blacklist: Array.from(new Set([...def.blacklist, ...(saved.blacklist || [])])),
            pending: saved.pending || []
        };
    } catch (e) { return def; }
}
function saveAdminDB(db) { localStorage.setItem(K_ADMIN_DB, JSON.stringify(db)); }

function computeQQCode(qq) {
    const raw = `${String(qq).trim()}::${AUTH_CONFIG.SECRET_SALT}::SUMOUL_MELANCHOLY`;
    let h1 = 0x811c9dc5, h2 = 0x1b873593;
    for (let i = 0; i < raw.length; i++) {
        const ch = raw.charCodeAt(i);
        h1 = Math.imul(h1 ^ ch, 0x01000193);
        h2 = Math.imul(h2 ^ (ch * (i + 1)), 0x5bd1e995);
    }
    return `SM-${(h1 >>> 0).toString(36).toUpperCase().slice(-3)}${(h2 >>> 0).toString(36).toUpperCase().slice(-3)}`;
}

async function checkQQPermission(qq, passOrCode) {
    const cleanQQ = String(qq || "").trim(), cleanPass = String(passOrCode || "").trim();
    if (!/^[1-9][0-9]{4,11}$/.test(cleanQQ)) return { status: "error", msg: "请输入正确的 5~12 位数字 QQ 号" };
    let db = getAdminDB();
    if (AUTH_CONFIG.CLOUD_SYNC_URL) {
        try {
            const r = await fetch(`${AUTH_CONFIG.CLOUD_SYNC_URL}?t=${Date.now()}`);
            if (r.ok) {
                const remote = await r.json();
                if (remote) {
                    db.whitelist = Array.from(new Set([...db.whitelist, ...(remote.whitelist || [])]));
                    db.blacklist = Array.from(new Set([...db.blacklist, ...(remote.blacklist || [])]));
                    db.passwords = Array.from(new Set([...db.passwords, ...(remote.passwords || [])]));
                    saveAdminDB(db);
                }
            }
        } catch (e) {}
    }
    if (db.blacklist.includes(cleanQQ)) return { status: "banned", msg: "🚫 ACCESS DENIED · 该 QQ 号已被永久拉黑封禁，禁止进入 Sumoul App！" };
    if (db.whitelist.includes(cleanQQ)) return { status: "ok", role: "白名单免密通行" };
    if (cleanPass && db.passwords.includes(cleanPass)) return { status: "ok", role: "群发口令核验通过" };
    if (cleanPass && cleanPass.toUpperCase() === computeQQCode(cleanQQ)) return { status: "ok", role: "专属激活码通过" };
    return { status: "denied", msg: "该 QQ 尚未通过审核，请输入群发口令/通行码，或点击下方「提交申请」等待作者通过！" };
}

const styleEl = topDoc.createElement("style");
styleEl.id = "seoul-mini-theater-style";
styleEl.innerHTML = `
#seoul-mini-theater-btn{position:fixed!important;right:14px!important;bottom:92px!important;z-index:2147483645!important;display:inline-flex!important;align-items:center!important;gap:6px!important;height:34px!important;padding:0 13px!important;background:#FFF!important;border:1.5px solid #3A3A40!important;border-radius:999px!important;cursor:pointer!important;user-select:none!important;pointer-events:auto!important;font-family:-apple-system,BlinkMacSystemFont,"Apple SD Gothic Neo","PingFang SC",sans-serif!important}
#seoul-mini-theater-btn *{pointer-events:none!important}
#seoul-mini-theater-btn .smt-ico-entry{width:14px!important;height:14px!important;display:inline-block!important;background-image:${ICO.chatAct}!important;background-size:contain!important;background-repeat:no-repeat!important}
#seoul-mini-theater-btn .smt-btn-kr{font-size:10px!important;font-weight:700!important;color:#2C2C32!important;-webkit-text-fill-color:#2C2C32!important}
#seoul-mini-theater-modal{position:fixed!important;inset:0!important;width:100vw!important;height:100dvh!important;z-index:2147483647!important;background:#FFF!important;display:none;flex-direction:column!important;box-sizing:border-box!important;pointer-events:auto!important;font-family:-apple-system,BlinkMacSystemFont,"Apple SD Gothic Neo","PingFang SC",sans-serif!important;color:#3A3A40!important;overflow:hidden!important}
#seoul-mini-theater-modal.smt-open{display:flex!important}
#seoul-mini-theater-modal .smt-fs-header{position:relative!important;display:flex!important;align-items:center!important;justify-content:space-between!important;height:48px!important;min-height:48px!important;margin-top:env(safe-area-inset-top,0px)!important;padding:0 14px!important;background:#FFF!important;border-bottom:1px solid #F2F2F6!important;flex-shrink:0!important}
#seoul-mini-theater-modal .smt-exit-btn{display:inline-flex!important;align-items:center!important;gap:3px!important;height:28px!important;padding:0 10px 0 6px!important;background:#F8F8F8!important;border:1px solid #ECECF2!important;border-radius:999px!important;font-size:9.8px!important;font-weight:700!important;color:#3A3A40!important;cursor:pointer!important;z-index:2!important}
#seoul-mini-theater-modal .smt-ico-back{width:13px!important;height:13px!important;display:inline-block!important;background-image:${ICO.back}!important;background-size:contain!important;background-repeat:no-repeat!important}
#seoul-mini-theater-modal .smt-header-center{position:absolute!important;left:50%!important;top:50%!important;transform:translate(-50%,-50%)!important;text-align:center!important;pointer-events:none!important;width:max-content!important;max-width:190px!important}
#seoul-mini-theater-modal .smt-header-title{font-size:11.2px!important;font-weight:700!important;color:#3A3A40!important;letter-spacing:.4px!important;white-space:nowrap!important}
#seoul-mini-theater-modal .smt-header-sub{font-size:8.2px!important;font-weight:500!important;color:#9A9AA5!important;margin-top:1px!important;white-space:nowrap!important}
#seoul-mini-theater-modal .smt-header-right{display:inline-flex!important;align-items:center!important;gap:4px!important;height:24px!important;padding:0 9px!important;background:#F8F8F8!important;border:1px solid #ECECF2!important;border-radius:999px!important;font-size:8.5px!important;font-weight:700!important;color:#55555E!important;z-index:2!important;cursor:pointer!important}
#seoul-mini-theater-modal .smt-fs-body{flex:1!important;min-height:0!important;width:100%!important;max-width:440px!important;margin:0 auto!important;padding:10px 14px!important;box-sizing:border-box!important;display:flex!important;flex-direction:column!important;overflow:hidden!important;background:#FFF!important}
#seoul-mini-theater-modal .smt-page{display:none!important;flex-direction:column!important;flex:1!important;min-height:0!important;overflow-y:auto!important}
#seoul-mini-theater-modal .smt-page.active{display:flex!important}
#seoul-mini-theater-modal .smt-bottom-dock{display:grid!important;grid-template-columns:repeat(5,1fr)!important;background:#FFF!important;border-top:1px solid #F2F2F6!important;padding:6px 10px max(10px,env(safe-area-inset-bottom,10px)) 10px!important;flex-shrink:0!important;max-width:440px!important;width:100%!important;margin:0 auto!important;box-sizing:border-box!important}
#seoul-mini-theater-modal .smt-tab-item{display:flex!important;flex-direction:column!important;align-items:center!important;justify-content:center!important;gap:3px!important;padding:5px 2px!important;border-radius:10px!important;cursor:pointer!important}
#seoul-mini-theater-modal .smt-tab-item.active{background:#F8F8F8!important}
#seoul-mini-theater-modal .smt-tab-ico{width:18px!important;height:18px!important;display:block!important;background-size:18px 18px!important;background-repeat:no-repeat!important;background-position:center!important}
#seoul-mini-theater-modal .smt-tab-item[data-page="talk"] .smt-tab-ico{background-image:${ICO.chat}!important}
#seoul-mini-theater-modal .smt-tab-item[data-page="talk"].active .smt-tab-ico{background-image:${ICO.chatAct}!important}
#seoul-mini-theater-modal .smt-tab-item[data-page="space"] .smt-tab-ico{background-image:${ICO.heart}!important}
#seoul-mini-theater-modal .smt-tab-item[data-page="space"].active .smt-tab-ico{background-image:${ICO.heartAct}!important}
#seoul-mini-theater-modal .smt-tab-item[data-page="home"] .smt-tab-ico{background-image:${ICO.user}!important}
#seoul-mini-theater-modal .smt-tab-item[data-page="home"].active .smt-tab-ico{background-image:${ICO.userAct}!important}
#seoul-mini-theater-modal .smt-tab-item[data-page="archive"] .smt-tab-ico{background-image:${ICO.archive}!important}
#seoul-mini-theater-modal .smt-tab-item[data-page="archive"].active .smt-tab-ico{background-image:${ICO.archiveAct}!important}
#seoul-mini-theater-modal .smt-tab-item[data-page="api"] .smt-tab-ico{background-image:${ICO.settings}!important}
#seoul-mini-theater-modal .smt-tab-item[data-page="api"].active .smt-tab-ico{background-image:${ICO.settingsAct}!important}
#seoul-mini-theater-modal .smt-tab-txt{font-size:8.8px!important;font-weight:600!important;color:#8E8E98!important}
#seoul-mini-theater-modal .smt-tab-item.active .smt-tab-txt{font-weight:700!important;color:#2C2C32!important}
#seoul-mini-theater-modal .smt-pill-btn{height:24px!important;padding:0 8px!important;margin:0!important;border-radius:999px!important;font-size:9px!important;font-weight:600!important;line-height:1!important;background:#FFF!important;border:1px solid #E6E6EC!important;color:#55555E!important;cursor:pointer!important;display:inline-flex!important;align-items:center!important;justify-content:center!important;gap:3.5px!important;text-indent:0!important;white-space:nowrap!important;box-sizing:border-box!important}
#seoul-mini-theater-modal .smt-pill-btn span{margin:0!important;padding:0!important;text-indent:0!important;line-height:1!important}
#seoul-mini-theater-modal .smt-pill-btn.dark{background:#484852!important;border-color:#484852!important;color:#FFF!important;-webkit-text-fill-color:#FFF!important}
#seoul-mini-theater-modal .smt-section-box{background:#F8F8F8!important;border:1px solid #ECECF2!important;border-radius:16px!important;padding:13px!important;margin-bottom:10px!important}
#seoul-mini-theater-modal .smt-sec-title{display:flex!important;justify-content:space-between!important;align-items:center!important;font-size:10.2px!important;font-weight:700!important;color:#3A3A40!important;margin-bottom:10px!important;padding-bottom:7px!important;border-bottom:1px solid #EAEAF0!important}
#seoul-mini-theater-modal .smt-bar-bg{width:100%!important;height:6px!important;background:#EAEAF0!important;border-radius:99px!important;overflow:hidden!important;margin-top:4px!important}
#seoul-mini-theater-modal .smt-bar-fill{height:100%!important;background:#484852!important;border-radius:99px!important}
#seoul-mini-theater-modal .smt-wx-top-bar{display:flex!important;align-items:center!important;justify-content:space-between!important;background:#F8F8F8!important;border:1px solid #ECECF2!important;border-radius:11px!important;padding:5px 8px!important;margin-bottom:8px!important;flex-shrink:0!important}
#seoul-mini-theater-modal #smt-wx-stream{flex:1!important;min-height:0!important;overflow-y:auto!important;background:#FFF!important;border:1px solid #ECECF2!important;border-radius:16px!important;padding:12px!important;display:flex!important;flex-direction:column!important;gap:11px!important;margin-bottom:8px!important}
#seoul-mini-theater-modal #smt-wx-stream .smt-wx-row{display:flex!important;align-items:flex-start!important;gap:8px!important;max-width:82%!important;position:relative!important}
#seoul-mini-theater-modal #smt-wx-stream .smt-wx-row.me{align-self:flex-end!important;flex-direction:row-reverse!important}
#seoul-mini-theater-modal #smt-wx-stream .smt-wx-ava{margin-top:1px!important;border-radius:50%!important;object-fit:cover!important;border:1.5px solid #FFF!important;flex-shrink:0!important}
#seoul-mini-theater-modal #smt-wx-stream .smt-wx-bubble{padding:7px 15px!important;font-size:12px!important;line-height:1.48!important;position:relative!important;overflow:visible!important;word-break:break-word!important;cursor:pointer!important;box-sizing:border-box!important}
#seoul-mini-theater-modal .smt-wx-quote-box{margin-bottom:4px!important;padding:3px 8px!important;border-left:2px solid #9A9AA5!important;border-radius:6px!important;background:rgba(0,0,0,.035)!important;font-size:9.5px!important;color:#6E6E77!important}
#seoul-mini-theater-modal .smt-wx-pay-card{width:204px!important;background:#FFF!important;border:1.2px solid #E4E4EC!important;border-radius:14px!important;overflow:hidden!important;cursor:pointer!important}
#seoul-mini-theater-modal .smt-wx-pay-top{display:flex!important;align-items:center!important;gap:10px!important;padding:11px 12px!important;background:#F8F8F8!important;border-bottom:1px solid #ECECF2!important}
#seoul-mini-theater-modal .smt-wx-pay-ico{width:32px!important;height:32px!important;border-radius:9px!important;background:#FFF!important;border:1px solid #E6E6EC!important;flex-shrink:0!important;background-image:${ICO.transfer}!important;background-size:17px 17px!important;background-repeat:no-repeat!important;background-position:center!important}
#seoul-mini-theater-modal .smt-wx-pay-amt{font-size:13px!important;font-weight:700!important;color:#2C2C32!important}
#seoul-mini-theater-modal .smt-wx-pay-note{font-size:9px!important;color:#7A7A85!important;margin-top:2px!important}
#seoul-mini-theater-modal .smt-wx-pay-foot{display:flex!important;justify-content:space-between!important;padding:5px 12px!important;font-size:8px!important;font-weight:700!important;color:#9A9AA5!important;background:#FFF!important}
#seoul-mini-theater-modal .smt-wx-sticker-msg{display:inline-block!important;cursor:pointer!important;border-radius:12px!important;overflow:hidden!important;border:1px solid #EFEFF4!important}
#seoul-mini-theater-modal .smt-wx-sticker-msg img{max-width:104px!important;max-height:104px!important;display:block!important;object-fit:contain!important;border-radius:11px!important}
#seoul-mini-theater-modal .smt-wx-act-pop{display:inline-flex!important;align-items:center!important;flex-wrap:wrap!important;gap:2px!important;margin-top:4px!important;padding:2px 5px!important;background:#FFF!important;border:1px solid #E4E4EC!important;border-radius:999px!important;z-index:20!important}
#seoul-mini-theater-modal .smt-wx-act-item{display:inline-flex!important;align-items:center!important;justify-content:center!important;gap:3px!important;padding:3px 6px!important;border-radius:999px!important;font-size:8.5px!important;font-weight:600!important;color:#484852!important;cursor:pointer!important;white-space:nowrap!important;line-height:1!important}
#seoul-mini-theater-modal .smt-wx-idx-tag{font-size:7.5px!important;font-weight:700!important;color:#A0A0AA!important;background:#F8F8F8!important;border:1px solid #ECECF2!important;border-radius:99px!important;padding:0 5px!important}
#seoul-mini-theater-modal .smt-wx-edit-box{width:220px!important;max-width:100%!important;margin-top:4px!important;background:#FFF!important;border:1px solid #D0D0DA!important;border-radius:12px!important;padding:7px!important;box-sizing:border-box!important}
#seoul-mini-theater-modal .smt-wx-edit-area{width:100%!important;min-height:48px!important;background:#F8F8F8!important;border:1px solid #E6E6EC!important;border-radius:8px!important;padding:5px 7px!important;font-size:10.5px!important;color:#3A3A40!important;box-sizing:border-box!important;margin-bottom:5px!important;outline:none!important}
#seoul-mini-theater-modal #smt-wx-reply-preview{display:none;align-items:center!important;justify-content:space-between!important;background:#F8F8F8!important;border:1px solid #ECECF2!important;border-left:3px solid #484852!important;border-radius:8px!important;padding:5px 10px!important;margin-bottom:6px!important;font-size:9.5px!important;color:#55555E!important;flex-shrink:0!important}
#seoul-mini-theater-modal .smt-wx-meta{font-size:8px!important;color:#9A9AA5!important;margin-top:3px!important;display:flex!important;gap:4px!important;align-items:center!important}
#seoul-mini-theater-modal .smt-wx-row.me .smt-wx-meta{justify-content:flex-end!important}
#seoul-mini-theater-modal .smt-wx-sys{align-self:center!important;background:#F8F8F8!important;border:1px solid #ECECF2!important;border-radius:99px!important;padding:2.5px 10px!important;font-size:8.5px!important;color:#8E8E98!important}
#seoul-mini-theater-modal .smt-wx-quick{display:flex!important;gap:5px!important;overflow-x:auto!important;padding-bottom:6px!important;flex-shrink:0!important}
#seoul-mini-theater-modal .smt-wx-bar{display:flex!important;gap:6px!important;align-items:center!important;background:#F8F8F8!important;border:1px solid #ECECF2!important;border-radius:16px!important;padding:5px 6px!important;flex-shrink:0!important}
#seoul-mini-theater-modal .smt-wx-input{flex:1!important;height:30px!important;min-width:0!important;background:#FFF!important;border:1px solid #E6E6EC!important;border-radius:99px!important;padding:0 11px!important;font-size:11px!important;color:#3A3A40!important;outline:none!important}
#seoul-mini-theater-modal .smt-wx-btn-add{width:28px!important;height:28px!important;border-radius:50%!important;background:#FFF!important;border:1px solid #E4E4EC!important;flex-shrink:0!important;cursor:pointer!important;background-image:${ICO.plus}!important;background-size:13px 13px!important;background-repeat:no-repeat!important;background-position:center!important}
#seoul-mini-theater-modal .smt-wx-btn-reply{height:28px!important;padding:0 10px!important;border-radius:999px!important;background:#484852!important;color:#FFF!important;-webkit-text-fill-color:#FFF!important;font-size:9px!important;font-weight:700!important;display:inline-flex!important;align-items:center!important;justify-content:center!important;gap:3px!important;flex-shrink:0!important;cursor:pointer!important}
#seoul-mini-theater-modal .smt-wx-btn-reply i{width:10px!important;height:10px!important;display:inline-block!important;background-image:${ICO.arrowUpRight}!important;background-size:contain!important;background-repeat:no-repeat!important}
#seoul-mini-theater-modal #smt-wx-emoji-drawer{display:none;background:#F8F8F8!important;border:1px solid #ECECF2!important;border-radius:14px!important;padding:9px 10px!important;margin-bottom:6px!important;flex-shrink:0!important}
#seoul-mini-theater-modal .smt-kaomoji-grid{display:grid!important;grid-template-columns:repeat(4,1fr)!important;gap:5px!important;max-height:115px!important;overflow-y:auto!important}
#seoul-mini-theater-modal .smt-kaomoji-item{background:#FFF!important;border:1px solid #EAEAF0!important;border-radius:8px!important;padding:6px 2px!important;font-size:10px!important;text-align:center!important;cursor:pointer!important;white-space:nowrap!important;overflow:hidden!important;text-overflow:ellipsis!important}
#seoul-mini-theater-modal .smt-sticker-grid{display:grid!important;grid-template-columns:repeat(4,1fr)!important;gap:7px!important;max-height:115px!important;overflow-y:auto!important;margin-bottom:7px!important}
#seoul-mini-theater-modal .smt-sticker-card{position:relative!important;background:#FFF!important;border:1px solid #EAEAF0!important;border-radius:10px!important;padding:4px!important;text-align:center!important;cursor:pointer!important}
#seoul-mini-theater-modal .smt-sticker-card img{width:100%!important;height:48px!important;object-fit:contain!important;border-radius:6px!important;display:block!important}
#seoul-mini-theater-modal .smt-sticker-card .smt-st-name{font-size:8px!important;color:#7A7A85!important;margin-top:2px!important;white-space:nowrap!important;overflow:hidden!important;text-overflow:ellipsis!important}
#seoul-mini-theater-modal .smt-sticker-card .smt-st-del{position:absolute!important;top:2px!important;right:2px!important;width:14px!important;height:14px!important;border-radius:50%!important;background:rgba(255,255,255,.92)!important;border:1px solid #E4E4EC!important;font-size:8px!important;line-height:13px!important;color:#9A6868!important}
#seoul-mini-theater-modal .smt-prof-card{background:#F8F8F8!important;border:1px solid #ECECF2!important;border-radius:16px!important;padding:13px!important;margin-bottom:10px!important}
#seoul-mini-theater-modal .smt-prof-row{display:flex!important;align-items:center!important;gap:12px!important;background:#FFF!important;border:1px solid #EFEFF4!important;border-radius:13px!important;padding:11px 12px!important;margin-bottom:8px!important}
#seoul-mini-theater-modal #smt-page-space{padding:4px 2px 20px 2px!important;gap:14px!important}
#seoul-mini-theater-modal .ab-profile-shell{background:#F8F8F8!important;border:1px solid #ECECF2!important;border-radius:22px!important;overflow:hidden!important;flex-shrink:0!important}
#seoul-mini-theater-modal .ab-room-banner{height:88px!important;background-color:#EFEFF4!important;background-image:linear-gradient(135deg,#F5F5F8 0%,#EAEAF0 100%);background-size:cover!important;background-position:center!important;position:relative!important;padding:10px 12px!important;box-sizing:border-box!important;display:flex!important;justify-content:space-between!important;align-items:flex-start!important}
#seoul-mini-theater-modal .ab-glass-pill{background:rgba(255,255,255,.88)!important;border:1px solid rgba(230,230,236,.9)!important;border-radius:999px!important;padding:3px 9px!important;font-size:8.5px!important;font-weight:700!important;color:#3A3A40!important;display:inline-flex!important;align-items:center!important;gap:4px!important;cursor:pointer!important}
#seoul-mini-theater-modal .ab-ins-body{background:#FFF!important;margin:-18px 10px 10px 10px!important;border-radius:18px!important;border:1px solid #EFEFF4!important;padding:13px 14px!important;position:relative!important;z-index:2!important}
#seoul-mini-theater-modal .ab-ins-top{display:flex!important;align-items:center!important;justify-content:space-between!important;gap:12px!important;margin-bottom:10px!important}
#seoul-mini-theater-modal .ab-couple-avas{display:flex!important;align-items:center!important;flex-shrink:0!important}
#seoul-mini-theater-modal .ab-couple-avas img{width:48px!important;height:48px!important;border-radius:50%!important;object-fit:cover!important;border:2.5px solid #FFF!important;background:#F8F8F8!important}
#seoul-mini-theater-modal .ab-couple-avas img:last-child{margin-left:-14px!important}
#seoul-mini-theater-modal .ab-ins-stats{flex:1!important;display:grid!important;grid-template-columns:repeat(3,1fr)!important;text-align:center!important;background:#F8F8F8!important;border:1px solid #ECECF2!important;border-radius:12px!important;padding:7px 4px!important}
#seoul-mini-theater-modal .ab-stat-num{font-size:11.5px!important;font-weight:700!important;color:#2C2C32!important}
#seoul-mini-theater-modal .ab-stat-lbl{font-size:7.8px!important;color:#8E8E98!important;margin-top:1px!important}
#seoul-mini-theater-modal .ab-ins-bio{display:flex!important;justify-content:space-between!important;align-items:center!important;padding-top:8px!important;border-top:1px solid #F4F4F8!important;font-size:9.5px!important;color:#484852!important}
#seoul-mini-theater-modal .ab-dock-section{background:#F8F8F8!important;border:1px solid #ECECF2!important;border-radius:22px!important;padding:15px 12px!important;flex-shrink:0!important}
#seoul-mini-theater-modal .ab-dock-grid{display:grid!important;grid-template-columns:repeat(3,1fr)!important;row-gap:14px!important;column-gap:8px!important}
#seoul-mini-theater-modal .ab-app-item{display:flex!important;flex-direction:column!important;align-items:center!important;text-align:center!important;cursor:pointer!important;position:relative!important}
#seoul-mini-theater-modal .ab-app-squircle{width:52px!important;height:52px!important;border-radius:16px!important;background:#FFF!important;border:1px solid #E6E6EC!important;display:flex!important;align-items:center!important;justify-content:center!important;margin-bottom:6px!important;position:relative!important}
#seoul-mini-theater-modal .ab-app-floating-badge{position:absolute!important;top:-5px!important;right:-8px!important;background:#484852!important;color:#FFF!important;-webkit-text-fill-color:#FFF!important;font-size:7.5px!important;font-weight:700!important;padding:1.5px 5px!important;border-radius:99px!important;border:1.5px solid #FFF!important;line-height:1!important}
#seoul-mini-theater-modal .ab-app-title{font-size:10.5px!important;font-weight:700!important;color:#2C2C32!important;line-height:1.2!important}
#seoul-mini-theater-modal .ab-app-kr{font-size:7.8px!important;color:#9A9AA5!important;margin-top:1px!important}
#seoul-mini-theater-modal .ab-ins-feed-box{background:#F8F8F8!important;border:1px solid #ECECF2!important;border-radius:22px!important;padding:14px 12px!important;flex-shrink:0!important}
#seoul-mini-theater-modal .ab-ins-grid{display:grid!important;grid-template-columns:repeat(3,1fr)!important;gap:6px!important}
#seoul-mini-theater-modal .ab-ins-square{aspect-ratio:1/1!important;background:#FFF!important;border:1px solid #EAEAF0!important;border-radius:12px!important;padding:8px!important;box-sizing:border-box!important;display:flex!important;flex-direction:column!important;justify-content:space-between!important;cursor:pointer!important;overflow:hidden!important;position:relative!important}
@keyframes smtSpin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
#seoul-mini-theater-modal .smt-disc-spin{animation:smtSpin 12s linear infinite!important}
#seoul-mini-theater-modal #seoul-boot-lock-layer{position:absolute!important;inset:0!important;width:100%!important;height:100%!important;z-index:2147483647!important;background:linear-gradient(180deg,#FFF 0%,#F4F4F7 55%,#ECECEF 100%)!important;display:flex!important;flex-direction:column!important;align-items:center!important;justify-content:space-between!important;padding:max(20px,env(safe-area-inset-top,20px)) 18px max(24px,env(safe-area-inset-bottom,24px)) 18px!important;box-sizing:border-box!important;transition:transform .7s cubic-bezier(.22,1,.36,1),opacity .55s ease!important;overflow-y:auto!important}
#seoul-mini-theater-modal #seoul-boot-lock-layer.smt-unlocked-hide{transform:translateY(-102%)!important;opacity:0!important;pointer-events:none!important}
#seoul-mini-theater-modal #smt-boot-splash{position:absolute!important;inset:0!important;background:linear-gradient(180deg,#FFF 0%,#F2F2F5 100%)!important;z-index:10!important;display:flex!important;flex-direction:column!important;align-items:center!important;justify-content:center!important;transition:opacity .65s ease!important;padding:24px!important;text-align:center!important;cursor:pointer!important}
#seoul-mini-theater-modal #smt-boot-splash.fade-out{opacity:0!important;pointer-events:none!important}
@keyframes smtRainDrop{0%{transform:translateY(-15px);opacity:0}50%{opacity:.45}100%{transform:translateY(15px);opacity:0}}
#seoul-mini-theater-modal .smt-melancholy-frame{border:1px solid #DCDCE4!important;border-radius:16px!important;padding:30px 22px 24px 22px!important;background:linear-gradient(180deg,#FFF 0%,#F6F6F9 100%)!important;max-width:292px!important;width:100%!important;position:relative!important}
#seoul-mini-theater-modal .smt-rain-line{width:1px!important;height:32px!important;background:#9A9AA5!important;margin:0 auto!important;animation:smtRainDrop 2.4s ease-in-out infinite!important}
#seoul-mini-theater-modal .smt-auth-card{width:100%!important;max-width:350px!important;background:rgba(255,255,255,.92)!important;border:1px solid #E6E6EC!important;border-radius:20px!important;padding:20px 18px!important;box-sizing:border-box!important;text-align:center!important}
#seoul-mini-theater-modal .smt-qq-ava-ring{width:62px!important;height:62px!important;border-radius:50%!important;background:#F8F8F8!important;border:1.5px solid #E2E2EA!important;padding:3px!important;margin:0 auto 10px auto!important;box-sizing:border-box!important;filter:grayscale(25%) contrast(98%)!important}
#seoul-mini-theater-modal .smt-qq-ava-ring img{width:100%!important;height:100%!important;border-radius:50%!important;object-fit:cover!important;display:block!important}
#seoul-mini-theater-modal .smt-auth-inp{width:100%!important;height:35px!important;background:#F8F8F8!important;border:1px solid #E4E4EC!important;border-radius:10px!important;padding:0 12px!important;font-size:11px!important;color:#3A3A40!important;box-sizing:border-box!important;outline:none!important;margin-bottom:8px!important;text-align:center!important}
#seoul-mini-theater-modal .smt-auth-btn{width:100%!important;height:36px!important;background:#484852!important;color:#FFF!important;-webkit-text-fill-color:#FFF!important;border-radius:10px!important;font-size:10.5px!important;font-weight:700!important;letter-spacing:.6px!important;display:flex!important;align-items:center!important;justify-content:center!important;cursor:pointer!important;margin-top:4px!important}
#seoul-mini-theater-modal .smt-auth-btn.ghost{background:#F8F8F8!important;color:#55555E!important;-webkit-text-fill-color:#55555E!important;border:1px solid #E2E2EA!important;margin-top:7px!important}
`;
topDoc.head.appendChild(styleEl);

const wxCustomStyleEl = topDoc.createElement("style");
wxCustomStyleEl.id = "seoul-wx-custom-style";
topDoc.head.appendChild(wxCustomStyleEl);
if (!localStorage.getItem(K_WX_CSS) || !localStorage.getItem(K_WX_CSS).includes("--我的气泡尾巴-url")) {
    saveWxCss(NEW_DEFAULT_WX_CSS);
}
function applyWxCustomCss() { wxCustomStyleEl.innerHTML = getWxCss(); }
applyWxCustomCss();

const btn = topDoc.createElement("div");
btn.id = "seoul-mini-theater-btn";
btn.innerHTML = `<span class="smt-ico-entry"></span><span class="smt-btn-kr">Sumoul App</span>`;

const modal = topDoc.createElement("div");
modal.id = "seoul-mini-theater-modal";
modal.innerHTML = `
<!-- 🌧️ Sumoul App · 忧郁白灰 35mm 胶片开屏（手动点击才唤醒进入） -->
<div id="seoul-boot-lock-layer">
    <div id="smt-boot-splash" title="点击唤醒 Sumoul App">
        <div style="position:absolute;inset:0;pointer-events:none;overflow:hidden;opacity:.55;">
            <div class="smt-rain-line" style="position:absolute;left:18%;top:12%;height:42px;animation-duration:2.6s;"></div>
            <div class="smt-rain-line" style="position:absolute;left:38%;top:28%;height:32px;animation-duration:3.1s;animation-delay:.5s;"></div>
            <div class="smt-rain-line" style="position:absolute;left:64%;top:16%;height:48px;animation-duration:2.4s;animation-delay:1.1s;"></div>
            <div class="smt-rain-line" style="position:absolute;left:82%;top:34%;height:36px;animation-duration:2.9s;animation-delay:.3s;"></div>
        </div>
        <div class="smt-melancholy-frame">
            <div style="display:flex;justify-content:space-between;align-items:center;font-size:7.5px;color:#9A9AA5;letter-spacing:1.6px;border-bottom:1px solid #ECECF2;padding-bottom:8px;margin-bottom:20px;font-family:monospace;">
                <span>FILM · 35MM</span><span>SUMOUL ARCHIVE</span><span>#04:12 AM</span>
            </div>
            <div style="width:74px;height:74px;margin:0 auto 18px auto;border-radius:50%;background:#F4F4F8;border:1px solid #E4E4EC;display:flex;align-items:center;justify-content:center;">
                <svg viewBox="0 0 64 64" width="44" height="44" fill="none" stroke="#55555E" stroke-width="1.1" stroke-linecap="round">
                    <circle cx="32" cy="32" r="22" stroke-dasharray="2 3" stroke="#9A9AA5"/>
                    <path d="M36 16a16 16 0 1 0 0 32 14 14 0 0 1 0-32z" stroke="#3A3A40" stroke-width="1.3"/>
                    <line x1="20" y1="44" x2="20" y2="54" stroke="#8E8E98"/>
                    <line x1="32" y1="46" x2="32" y2="58" stroke="#8E8E98"/>
                    <line x1="44" y1="44" x2="44" y2="52" stroke="#8E8E98"/>
                </svg>
            </div>
            <div style="font-size:15px;font-weight:700;letter-spacing:3px;color:#2C2C32;margin-bottom:4px;">Sumoul App</div>
            <div style="font-size:8px;color:#A0A0AA;letter-spacing:2px;margin-bottom:16px;">회색빛 새벽 · MELANCHOLY MONOCHROME</div>
            <div id="smt-splash-poem" style="font-size:9.8px;color:#6E6E77;line-height:1.9;letter-spacing:.5px;background:#FFF;border:1px solid #EFEFF4;border-radius:10px;padding:12px;margin-bottom:20px;font-style:italic;">
                “ 우울한 회색빛 새벽,<br>네가 없는 시간은 조용히 멈춰있다. ”<br>
                <span style="font-size:8.5px;color:#9A9AA5;font-style:normal;display:block;margin-top:4px;">在忧郁的灰白黎明，没有你的时间悄然静止。</span>
            </div>
            <div id="smt-splash-enter-btn" style="display:inline-flex;align-items:center;justify-content:center;width:100%;height:36px;background:#3A3A40;color:#FFF;-webkit-text-fill-color:#FFF;border-radius:999px;font-size:9.5px;font-weight:600;letter-spacing:1.6px;cursor:pointer;">
                <span>TOUCH TO WAKE · 触碰唤醒</span>
            </div>
        </div>
        <div style="font-size:7.5px;color:#A0A0AA;letter-spacing:1.8px;margin-top:18px;">CLICK TO ENTER SUMOUL APP · 点击屏幕继续</div>
    </div>

    <div style="width:100%;max-width:420px;display:flex;justify-content:space-between;align-items:center;">
        <span class="smt-pill-btn" id="smt-lock-exit-btn">‹ 나가기 · 退出</span>
        <span class="smt-pill-btn" id="smt-open-admin-btn" style="cursor:pointer;">${WX_ICO.lock}<span>ADMIN · 管理员审核后台</span></span>
    </div>
    <div style="text-align:center;margin:6px 0;">
        <div style="font-size:8.5px;color:#9A9AA5;letter-spacing:2px;margin-bottom:2px;">SUMOUL APP · SILENT DAWN</div>
        <div style="font-size:38px;font-weight:300;color:#3A3A40;letter-spacing:1px;line-height:1.05;" id="smt-lock-big-time">18:04</div>
        <div style="font-size:9.5px;color:#8E8E98;letter-spacing:.5px;margin-top:4px;" id="smt-lock-big-date">“ 빗소리가 머무는 회색의 방 · 雨声停驻的灰白房间 ”</div>
    </div>
    <div class="smt-auth-card" id="smt-user-auth-box">
        <div class="smt-qq-ava-ring"><img id="smt-lock-qq-ava" src="https://i.postimg.cc/rydS6NvG/IMG-3866.jpg" /></div>
        <div style="font-size:11.5px;font-weight:700;color:#3A3A40;letter-spacing:.6px;margin-bottom:2px;" id="smt-lock-welcome-title">Sumoul App · ACCESS</div>
        <div style="font-size:8.5px;color:#8E8E98;margin-bottom:12px;" id="smt-lock-sub-tip">请输入 QQ 号与群发口令 / 专属通行码进入</div>
        <input type="text" class="smt-auth-inp" id="smt-auth-qq-inp" placeholder="输入你的 QQ 号码 (必填)..." inputmode="numeric" />
        <input type="text" class="smt-auth-inp" id="smt-auth-code-inp" placeholder="输入群发口令密码 或 专属通行码 (白名单免填)" />
        <div id="smt-auth-err-msg" style="font-size:9px;color:#8A5A5A;font-weight:600;min-height:15px;margin-bottom:4px;line-height:1.4;"></div>
        <div class="smt-auth-btn" id="smt-auth-submit-btn">ENTER SUMOUL APP · 验证进入</div>
        <div class="smt-auth-btn ghost" id="smt-auth-apply-btn">📩 还没有权限？提交 QQ 号申请审核</div>
    </div>
    <div style="text-align:center;font-size:8px;color:#9A9AA5;letter-spacing:.5px;">SUMOUL APP PRIVATE EDITION · 防二传保护已开启</div>
</div>

<div class="smt-fs-header">
    <div class="smt-exit-btn" id="smt-header-back-btn"><span class="smt-ico-back"></span><span id="smt-back-text">나가기</span></div>
    <div class="smt-header-center">
        <div class="smt-header-title" id="smt-top-title">Sumoul App · 서울톡</div>
        <div class="smt-header-sub" id="smt-top-sub">Personal Messenger · KST</div>
    </div>
    <div class="smt-header-right" id="smt-top-badge" title="点击打开管理员审核与拉黑后台">${WX_ICO.lock}<span>管理/锁屏</span></div>
</div>

<div class="smt-fs-body">
    <div class="smt-page" id="smt-page-admin">
        <div class="smt-section-box" style="background:#FFF!important;border:1.5px solid #484852!important;">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;">
                <b style="font-size:10.5px;">👑 Sumoul App · 管理员审核与拉黑中心</b>
                <span class="smt-pill-btn" id="smt-admin-relock-btn">退回开屏锁</span>
            </div>
            <div style="font-size:8.5px;color:#7A7A85;line-height:1.5;">💡 <b>多人免私信最爽用法</b>：在【1.群发口令】设一个口令发在群里，大家填自己的QQ号+该口令直接进！发现有人二传泄密，把他的QQ号加进【2.永久拉黑库】即可永久封死！</div>
        </div>
        <div class="smt-section-box">
            <div class="smt-sec-title"><span>1. 🔑 通用群发口令密码 (填任意口令+QQ号即可通过)</span><span class="smt-pill-btn dark" id="smt-adm-add-pwd">＋ 新增口令</span></div>
            <div id="smt-adm-pwd-list" style="display:flex;gap:5px;flex-wrap:wrap;"></div>
        </div>
        <div class="smt-section-box">
            <div class="smt-sec-title"><span style="color:#8A5A5A;">2. 🚫 永久拉黑 QQ 封杀名单 (黑名单QQ永远无法进入)</span><span class="smt-pill-btn dark" id="smt-adm-add-black" style="background:#7A5252!important;">＋ 拉黑 QQ 号</span></div>
            <div id="smt-adm-black-list" style="display:flex;gap:5px;flex-wrap:wrap;"></div>
        </div>
        <div class="smt-section-box">
            <div class="smt-sec-title"><span>3. 🤍 免密白名单 QQ 列表 (无需口令直接进)</span><span class="smt-pill-btn dark" id="smt-adm-add-white">＋ 添加白名单QQ</span></div>
            <div id="smt-adm-white-list" style="display:flex;gap:5px;flex-wrap:wrap;"></div>
        </div>
        <div class="smt-section-box">
            <div class="smt-sec-title"><span>4. 📩 待审核 QQ 申请列表 &amp; 专属一Q一码发卡器</span><span class="smt-pill-btn" id="smt-adm-keygen-btn">算专属激活码</span></div>
            <div id="smt-adm-pending-list"></div>
        </div>
        <div class="smt-section-box" style="margin-bottom:0!important;">
            <div style="display:flex;justify-content:space-between;align-items:center;">
                <span style="font-size:9px;color:#6E6E77;">修改完口令或拉黑名单后，一键复制配置代码贴回 GitHub 永久全网生效：</span>
                <span class="smt-pill-btn dark" id="smt-adm-export-cfg">📋 复制 GitHub 配置代码</span>
            </div>
        </div>
    </div>

    <div class="smt-page active" id="smt-page-talk">
        <div class="smt-wx-top-bar">
            <div style="display:flex;align-items:center;gap:4px;flex-wrap:wrap;">
                <span class="smt-pill-btn" id="smt-sync-toggle"></span>
                <span class="smt-pill-btn" id="smt-wx-cfg-btn">${WX_ICO.userSet}<span>个人/聊天设置</span></span>
                <span class="smt-pill-btn" id="smt-wx-sum-btn">${WX_ICO.sum}<span>总结</span></span>
                <span class="smt-pill-btn" id="smt-wx-css-btn">${WX_ICO.skin}<span>CSS美化</span></span>
            </div>
            <span class="smt-pill-btn" id="smt-wx-clear">${WX_ICO.del}<span>清空</span></span>
        </div>
        <div id="smt-wx-css-drawer" class="smt-section-box" style="display:none;flex-shrink:0;">
            <div style="display:flex;justify-content:space-between;align-items:center;font-size:9px;margin-bottom:5px;">
                <b>CUSTOM WECHAT CSS · 气泡与双尾巴URL美化</b>
                <label style="cursor:pointer;font-weight:700;">导入.css<input type="file" id="smt-wx-css-upload" accept=".css,.txt" style="display:none;"/></label>
            </div>
            <textarea id="smt-wx-css-textarea" style="width:100%;height:96px;background:#FFF;border:1px solid #E4E4EC;border-radius:8px;padding:7px;font-size:9.5px;font-family:monospace;box-sizing:border-box;"></textarea>
            <div style="display:flex;justify-content:space-between;margin-top:6px;">
                <span class="smt-pill-btn" id="smt-wx-css-reset">恢复默认</span>
                <span class="smt-pill-btn dark" id="smt-wx-css-save">立即应用</span>
            </div>
        </div>
        <div id="smt-wx-sum-drawer" class="smt-section-box" style="display:none;flex-shrink:0;padding:10px!important;">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
                <span style="font-size:9.5px;font-weight:700;">${WX_ICO.sum} MEMORY SUMMARY · 微信区间总结</span>
                <span id="smt-wx-sum-close" style="cursor:pointer;font-size:10px;color:#8E8E98;">✕</span>
            </div>
            <div style="display:flex;align-items:center;gap:5px;margin-bottom:7px;font-size:9px;">
                <span>#</span><input type="number" id="smt-sum-from" class="smt-wx-input" style="width:46px!important;height:22px!important;text-align:center;" value="1" />
                <span>至 #</span><input type="number" id="smt-sum-to" class="smt-wx-input" style="width:46px!important;height:22px!important;text-align:center;" value="10" />
                <span class="smt-pill-btn dark" id="smt-sum-run-btn" style="margin-left:auto;">生成总结</span>
            </div>
            <textarea id="smt-sum-result" style="width:100%;height:62px;background:#FFF;border:1px solid #E4E4EC;border-radius:8px;padding:6px 8px;font-size:9.8px;box-sizing:border-box;resize:none;margin-bottom:5px;" placeholder="提炼所选楼层区间的核心记忆..."></textarea>
            <div style="display:flex;justify-content:flex-end;gap:4px;">
                <span class="smt-pill-btn" id="smt-sum-to-arch">存历史</span>
                <span class="smt-pill-btn dark" id="smt-sum-to-main">注入主线记忆</span>
            </div>
        </div>
        <div id="smt-wx-stream"></div>
        <div id="smt-wx-reply-preview">
            <span id="smt-wx-quote-txt" style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:85%;"></span>
            <span id="smt-wx-quote-cancel" style="cursor:pointer;font-weight:700;padding:0 4px;">✕</span>
        </div>
        <div class="smt-wx-quick">
            <span class="smt-pill-btn" data-wxact="poke">${WX_ICO.poke}<span>拍一拍</span></span>
            <span class="smt-pill-btn" data-wxact="transfer">${WX_ICO.card}<span>转账</span></span>
            <span class="smt-pill-btn" data-wxact="photo">${WX_ICO.cam}<span>照片</span></span>
            <span class="smt-pill-btn" data-wxact="voice">${WX_ICO.mic}<span>语音</span></span>
            <span class="smt-pill-btn" id="smt-wx-emoji-btn">${WX_ICO.smile}<span>表情</span></span>
        </div>
        <div id="smt-wx-emoji-drawer">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:7px;">
                <div style="display:flex;gap:4px;">
                    <span class="smt-pill-btn dark" data-emtab="kaomoji">颜文字 &amp; Emoji</span>
                    <span class="smt-pill-btn" data-emtab="sticker">图片表情包</span>
                    <span class="smt-pill-btn" data-emtab="batch">${WX_ICO.folder}<span>批量导入</span></span>
                </div>
                <span id="smt-wx-emoji-close" style="cursor:pointer;font-size:10px;color:#8E8E98;">✕</span>
            </div>
            <div id="smt-em-pane-kaomoji" class="smt-kaomoji-grid"></div>
            <div id="smt-em-pane-sticker" style="display:none;">
                <div id="smt-sticker-grid" class="smt-sticker-grid"></div>
                <div style="display:flex;gap:4px;align-items:center;">
                    <input type="text" id="smt-st-name-inp" class="smt-wx-input" style="width:68px!important;flex:none!important;height:25px!important;font-size:9.5px!important;" placeholder="名称" />
                    <input type="text" id="smt-st-url-inp" class="smt-wx-input" style="flex:1!important;height:25px!important;font-size:9.5px!important;" placeholder="粘贴单张表情图片 URL..." />
                    <label class="smt-pill-btn" style="cursor:pointer;height:25px!important;">${WX_ICO.cam}<input type="file" id="smt-st-file-inp" accept="image/*" style="display:none;" /></label>
                    <span class="smt-pill-btn dark" id="smt-st-add-btn" style="height:25px!important;">＋添加</span>
                </div>
            </div>
            <div id="smt-em-pane-batch" style="display:none;">
                <textarea id="smt-st-batch-inp" style="width:100%;height:70px;background:#FFF;border:1px solid #E4E4EC;border-radius:8px;padding:6px 8px;font-size:9.5px;box-sizing:border-box;resize:none;margin-bottom:6px;" placeholder="一行一个批量粘贴！格式：名字 | 图片URL（或纯图片URL一行一个）"></textarea>
                <div style="display:flex;justify-content:space-between;align-items:center;">
                    <label class="smt-pill-btn" style="cursor:pointer;">${WX_ICO.cam}<span>相册多选批量导入</span><input type="file" id="smt-st-multi-files" accept="image/*" multiple style="display:none;" /></label>
                    <span class="smt-pill-btn dark" id="smt-st-batch-run">✓ 立即批量导入</span>
                </div>
            </div>
        </div>
        <div class="smt-wx-bar">
            <input type="text" class="smt-wx-input" id="smt-wx-input" placeholder="메시지를 입력하세요... (点 + 连发多条，点 발송 让TA回)" />
            <span class="smt-wx-btn-add" id="smt-wx-add-btn"></span>
            <span class="smt-wx-btn-reply" id="smt-wx-reply-btn"><span>발송</span><i></i></span>
        </div>
    </div>

    <div class="smt-page" id="smt-page-wx_settings">
        <div style="display:flex;align-items:center;justify-content:space-between;background:#F8F8F8;border:1px solid #ECECF2;border-radius:13px;padding:8px 11px;margin-bottom:10px;flex-shrink:0;">
            <span class="smt-pill-btn" id="smt-wxset-back-chat" style="height:26px!important;font-weight:700!important;">${WX_ICO.backLeft}<span>대화방으로 · 返回聊天界面</span></span>
            <div class="smt-pill-btn" id="smt-wxset-time-pill" style="pointer-events:none;"></div>
        </div>
        <div style="flex:1;min-height:0;overflow-y:auto;padding-bottom:12px;">
            <div class="smt-prof-card">
                <div class="smt-sec-title" style="margin-bottom:8px!important;">
                    <span id="smt-wxset-time-title" style="display:inline-flex;align-items:center;gap:5px;"></span>
                    <span class="smt-pill-btn dark" id="smt-wxset-time-toggle"></span>
                </div>
                <div style="background:#FFF;border:1px solid #EFEFF4;border-radius:11px;padding:9px 12px;font-size:10px;">
                    <div style="font-weight:700;color:#2C2C32;" id="smt-wxset-clock-big"></div>
                    <div style="font-size:8.5px;color:#8E8E98;margin-top:2px;">开启后，TA在微信中会实时感知你手机当前的真实时间与昼夜时段</div>
                </div>
            </div>
            <div class="smt-prof-card">
                <div class="smt-sec-title"><span>${WX_ICO.userSet} MY PROFILE · 我的个人信息</span><label class="smt-pill-btn" style="cursor:pointer;">${WX_ICO.cam}<span>本地导入头像</span><input type="file" id="smt-cfg-myava-file" accept="image/*" style="display:none;" /></label></div>
                <div class="smt-prof-row">
                    <img id="smt-cfg-myava-preview" src="" style="width:52px;height:52px;border-radius:50%;object-fit:cover;border:1.5px solid #EAEAF0;" />
                    <div style="flex:1;min-width:0;">
                        <input type="text" id="smt-cfg-mynick" class="smt-wx-input" style="width:100%;height:26px!important;font-size:10px!important;box-sizing:border-box;margin-bottom:5px;" placeholder="我的微信昵称 (留空用原名)" />
                        <input type="text" id="smt-cfg-mybio" class="smt-wx-input" style="width:100%;height:26px!important;font-size:10px!important;box-sizing:border-box;" placeholder="我的状态签名" />
                    </div>
                </div>
                <input type="text" id="smt-cfg-myava" class="smt-wx-input" style="width:100%;height:26px!important;font-size:10px!important;box-sizing:border-box;" placeholder="或粘贴我的头像图片 URL..." />
            </div>
            <div class="smt-prof-card">
                <div class="smt-sec-title"><span>${WX_ICO.userSet} PARTNER PROFILE · 对方聊天设置</span><label class="smt-pill-btn" style="cursor:pointer;">${WX_ICO.cam}<span>本地导入TA头像</span><input type="file" id="smt-cfg-charava-file" accept="image/*" style="display:none;" /></label></div>
                <div class="smt-prof-row">
                    <img id="smt-cfg-charava-preview" src="" style="width:52px;height:52px;border-radius:50%;object-fit:cover;border:1.5px solid #EAEAF0;" />
                    <div style="flex:1;min-width:0;">
                        <input type="text" id="smt-cfg-remark" class="smt-wx-input" style="width:100%;height:26px!important;font-size:10px!important;box-sizing:border-box;margin-bottom:5px;" placeholder="TA的专属备注名 (留空显示原名)" />
                        <input type="text" id="smt-cfg-charbio" class="smt-wx-input" style="width:100%;height:26px!important;font-size:10px!important;box-sizing:border-box;" placeholder="TA的顶栏状态签名" />
                    </div>
                </div>
                <div style="display:grid;grid-template-columns:1fr 82px;gap:6px;">
                    <input type="text" id="smt-cfg-charava" class="smt-wx-input" style="width:100%;height:26px!important;font-size:10px!important;box-sizing:border-box;" placeholder="TA的头像图片 URL..." />
                    <input type="number" id="smt-cfg-avasize" class="smt-wx-input" style="width:100%;height:26px!important;font-size:10px!important;text-align:center;box-sizing:border-box;" value="33" />
                </div>
            </div>
            <div class="smt-prof-card" style="margin-bottom:0!important;">
                <textarea id="smt-cfg-bgnote" style="width:100%;height:48px;background:#FFF;border:1px solid #E4E4EC;border-radius:9px;padding:6px 8px;font-size:10px;box-sizing:border-box;resize:none;margin-bottom:8px;" placeholder="补充当前微信私聊专属背景设定 (选填)..."></textarea>
                <div style="display:flex;justify-content:space-between;">
                    <span class="smt-pill-btn" id="smt-cfg-reset-btn">恢复默认</span>
                    <span class="smt-pill-btn dark" id="smt-cfg-save-btn" style="height:28px!important;padding:0 16px!important;">✓ 保存并返回微信</span>
                </div>
            </div>
        </div>
    </div>

    <div class="smt-page" id="smt-page-space">
        <div class="ab-profile-shell">
            <div class="ab-room-banner" id="smt-sp-hero-card">
                <span class="ab-glass-pill" id="smt-sp-char-scope-tag">${AB_ICO.heartSm}<span>COUPLE HOME</span></span>
                <div style="display:flex;gap:5px;">
                    <span class="ab-glass-pill" id="smt-sp-bg-btn">${AB_ICO.camSm}<span>换同居背景</span></span>
                    <span class="ab-glass-pill" id="smt-sp-mood">36.7°C</span>
                    <span class="ab-glass-pill" id="smt-sp-reset-char">重置</span>
                </div>
            </div>
            <div class="ab-ins-body">
                <div class="ab-ins-top">
                    <div class="ab-couple-avas"><img id="smt-sp-uava" src="" /><img id="smt-sp-cava" src="" /></div>
                    <div class="ab-ins-stats">
                        <div id="smt-sp-edit-date" style="cursor:pointer;"><div class="ab-stat-num" id="smt-sp-days">D+100</div><div class="ab-stat-lbl">相伴天数 ✎</div></div>
                        <div data-openapp="sp_pet" style="cursor:pointer;"><div class="ab-stat-num" id="smt-stat-pet">LV.2</div><div class="ab-stat-lbl" id="smt-stat-petname">萌宠 모찌</div></div>
                        <div data-openapp="sp_coupon" style="cursor:pointer;"><div class="ab-stat-num" id="smt-stat-fund">3张</div><div class="ab-stat-lbl">特权兑换券</div></div>
                    </div>
                </div>
                <div style="font-size:11px;font-weight:700;color:#2C2C32;margin-bottom:3px;" id="smt-sp-couple-names">ME &amp; PARTNER</div>
                <div class="ab-ins-bio">
                    <span id="smt-sp-live-bio" style="flex:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;"></span>
                    <span class="smt-pill-btn" id="smt-sp-refresh-live" style="height:21px!important;font-size:8px!important;margin-left:6px!important;">↻ 刷新TA状态</span>
                </div>
            </div>
        </div>
        <div class="ab-dock-section">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;padding:0 2px;">
                <span style="font-size:9px;font-weight:700;color:#8E8E98;letter-spacing:.6px;">OUR SWEET HOME APPS · 双人同居空间应用</span>
                <span style="font-size:8px;color:#9A9AA5;">点击图标进入全屏 ▸</span>
            </div>
            <div class="ab-dock-grid">
                <div class="ab-app-item" data-openapp="sp_pet"><div class="ab-app-squircle">${AB_ICO.pet}<span class="ab-app-floating-badge" id="smt-badge-pet">LV.2</span></div><div class="ab-app-title">云养萌宠</div><div class="ab-app-kr">반려동물 · PET</div></div>
                <div class="ab-app-item" data-openapp="sp_4cut"><div class="ab-app-squircle">${AB_ICO.cam4}<span class="ab-app-floating-badge">BOOTH</span></div><div class="ab-app-title">人生四格</div><div class="ab-app-kr">인생네컷 · PHOTO</div></div>
                <div class="ab-app-item" data-openapp="sp_qa"><div class="ab-app-squircle">${AB_ICO.qa}<span class="ab-app-floating-badge">Q&amp;A</span></div><div class="ab-app-title">灵魂百问</div><div class="ab-app-kr">질문캡슐 · ASK</div></div>
                <div class="ab-app-item" data-openapp="sp_mood"><div class="ab-app-squircle">${AB_ICO.wave}<span class="ab-app-floating-badge" id="smt-badge-bpm">96</span></div><div class="ab-app-title">同居波频</div><div class="ab-app-kr">심박동기 · SYNC</div></div>
                <div class="ab-app-item" data-openapp="sp_coupon"><div class="ab-app-squircle">${AB_ICO.ticket}<span class="ab-app-floating-badge" id="smt-badge-coupon">3张</span></div><div class="ab-app-title">恋爱兑换券</div><div class="ab-app-kr">러브쿠폰 · TICKET</div></div>
                <div class="ab-app-item" data-openapp="sp_guest"><div class="ab-app-squircle">${AB_ICO.guest}<span class="ab-app-floating-badge" id="smt-badge-todo">留言</span></div><div class="ab-app-title">留言与心愿</div><div class="ab-app-kr">방명록 · NOTES</div></div>
            </div>
        </div>
        <div class="ab-ins-feed-box">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">
                <div style="display:flex;align-items:center;gap:5px;font-size:9.5px;font-weight:700;color:#2C2C32;">${AB_ICO.grid}<span>COUPLE INS FEED · 双人九宫格手账墙</span></div>
                <div style="display:flex;gap:4px;"><span class="smt-pill-btn" id="smt-ins-user-add">＋ 我发格</span><span class="smt-pill-btn dark" id="smt-ins-ai-add">✦ 让TA发情侣格</span></div>
            </div>
            <div id="smt-ins-detail-pop" style="display:none;background:#FFF;border:1px solid #EAEAF0;border-radius:14px;padding:11px 12px;margin-bottom:9px;font-size:10.5px;line-height:1.6;"></div>
            <div class="ab-ins-grid" id="smt-ab-ins-grid"></div>
        </div>
    </div>

    <div class="smt-page" id="smt-page-sp_pet">
        <div class="smt-section-box" style="text-align:center;padding:18px 14px!important;">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;"><span style="font-size:9px;font-weight:700;color:#8E8E98;">COUPLE PET HOUSE · 반려동물 하우스</span><span class="smt-pill-btn" id="smt-pet-rename">✎ 改宠物名</span></div>
            <div style="width:72px;height:72px;border-radius:20px;background:#FFF;border:1.5px solid #EAEAF0;margin:0 auto 8px auto;display:flex;align-items:center;justify-content:center;">${AB_ICO.petLg}</div>
            <div style="font-size:14px;font-weight:700;" id="smt-pet-name">모찌 (糯米团)</div>
            <div style="font-size:9px;color:#7A7A85;margin:2px 0 12px 0;" id="smt-pet-lv">LV.2</div>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;background:#FFF;border:1px solid #EFEFF4;border-radius:12px;padding:11px;text-align:left;margin-bottom:12px;">
                <div><div style="display:flex;justify-content:space-between;font-size:9.5px;"><span>饱食度</span><b id="smt-pet-hunger-txt">85%</b></div><div class="smt-bar-bg"><div class="smt-bar-fill" id="smt-pet-hunger-bar" style="width:85%;"></div></div></div>
                <div><div style="display:flex;justify-content:space-between;font-size:9.5px;"><span>亲密心情</span><b id="smt-pet-mood-txt">92%</b></div><div class="smt-bar-bg"><div class="smt-bar-fill" id="smt-pet-mood-bar" style="width:92%;"></div></div></div>
            </div>
            <div id="smt-pet-log" style="font-size:11px;line-height:1.68;background:#FFF;border:1px solid #EAEAF0;border-radius:12px;padding:12px;text-align:left;min-height:64px;margin-bottom:12px;"></div>
            <div style="display:flex;gap:6px;">
                <span class="smt-pill-btn" id="smt-pet-feed" style="flex:1;height:30px!important;">喂冻干零食</span>
                <span class="smt-pill-btn" id="smt-pet-pat" style="flex:1;height:30px!important;">揉揉小脑袋</span>
                <span class="smt-pill-btn dark" id="smt-pet-ai-play" style="flex:1.3;height:30px!important;">✦ 让TA陪宠物玩</span>
            </div>
        </div>
    </div>

    <div class="smt-page" id="smt-page-sp_4cut">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;"><span style="font-size:10.5px;font-weight:700;">인생네컷 · 首尔街头人生四格自拍亭</span><span class="smt-pill-btn dark" id="smt-4cut-gen-btn">✦ 和TA拍一组新四格</span></div>
        <div id="smt-4cut-stage" style="background:#F8F8F8;border:1.5px solid #E6E6EC;border-radius:18px;padding:16px 14px;text-align:center;"></div>
    </div>

    <div class="smt-page" id="smt-page-sp_qa">
        <div class="smt-section-box">
            <div class="smt-sec-title"><span>LOVE Q&amp;A · 情侣灵魂提问箱</span><div style="display:flex;gap:5px;"><span class="smt-pill-btn" id="smt-qa-next">换一题</span><span class="smt-pill-btn dark" id="smt-qa-ai-ans">✦ 让TA作答</span></div></div>
            <div style="background:#FFF;border:1px solid #EAEAF0;border-radius:12px;padding:13px;margin-bottom:10px;"><div style="font-size:8.5px;color:#8E8E98;font-weight:700;margin-bottom:3px;">TODAY'S QUESTION</div><div style="font-size:12px;font-weight:700;line-height:1.55;" id="smt-qa-q"></div></div>
            <div style="background:#FFF;border:1px solid #EAEAF0;border-radius:12px;padding:12px;margin-bottom:9px;cursor:pointer;" id="smt-qa-edit-my"><div style="font-size:8.5px;color:#8E8E98;font-weight:700;margin-bottom:3px;">MY ANSWER · 点击填写</div><div style="font-size:11px;line-height:1.6;" id="smt-qa-my-txt"></div></div>
            <div style="background:#FFF;border:1px solid #EAEAF0;border-radius:12px;padding:12px;"><div style="font-size:8.5px;color:#8E8E98;font-weight:700;margin-bottom:3px;" id="smt-qa-char-label">PARTNER'S ANSWER</div><div style="font-size:11px;line-height:1.6;" id="smt-qa-char-txt"></div></div>
        </div>
    </div>

    <div class="smt-page" id="smt-page-sp_mood">
        <div class="smt-section-box"><div class="smt-sec-title"><span>HEARTBEAT &amp; STATUS · 实时同居波频监测</span><span class="smt-pill-btn dark" id="smt-mood-sync-btn">↻ 实时感应TA此刻状态</span></div><div id="smt-mood-stage"></div></div>
    </div>

    <div class="smt-page" id="smt-page-sp_coupon">
        <div class="smt-section-box"><div class="smt-sec-title"><span>LOVE COUPON · 情侣特权兑换券包</span><span class="smt-pill-btn" id="smt-coupon-add">＋ 自定义新券</span></div><div id="smt-coupon-list"></div><div id="smt-coupon-log" style="background:#FFF;border:1px dashed #D5D5DE;border-radius:12px;padding:12px;font-size:11px;line-height:1.65;margin-top:10px;"></div></div>
    </div>

    <div class="smt-page" id="smt-page-sp_guest">
        <div class="smt-section-box">
            <div class="smt-sec-title"><span>GUESTBOOK · 双人悄悄话留言板</span><span class="smt-pill-btn" id="smt-sp-ai-note">让TA主动留言</span></div>
            <div id="smt-sp-notes-list" style="max-height:180px;overflow-y:auto;margin-bottom:8px;"></div>
            <div style="display:flex;gap:5px;"><input type="text" id="smt-sp-note-input" class="smt-wx-input" placeholder="방명록 남기기... 写下悄悄话让TA回复" /><span class="smt-pill-btn dark" id="smt-sp-note-send" style="height:30px!important;padding:0 12px!important;">留言</span></div>
        </div>
        <div class="smt-section-box"><div class="smt-sec-title"><span>BUCKET LIST · 恋爱百事心愿单</span><span class="smt-pill-btn" id="smt-sp-add-todo">＋ 新增心愿</span></div><div id="smt-sp-todo-list"></div></div>
    </div>

    <div class="smt-page" id="smt-page-home">
        <div id="smt-user-html-stage" style="margin-bottom:8px;"></div>
        <div style="display:flex;justify-content:space-between;align-items:center;gap:4px;flex-wrap:wrap;margin-bottom:12px;">
            <div style="display:flex;gap:4px;"><span class="smt-pill-btn" data-tpl="coupleId">模板1: 情侣卡</span><span class="smt-pill-btn" data-tpl="polaroid">模板2: 拍立得</span><span class="smt-pill-btn" data-tpl="receipt">模板3: 票根</span></div>
            <span class="smt-pill-btn dark" id="smt-open-html-edit">导入/编辑主页HTML</span>
        </div>
        <div id="smt-html-editor" style="display:none;" class="smt-section-box">
            <div style="display:flex;justify-content:space-between;font-size:8.5px;margin-bottom:5px;"><span>变量: {{user}} {{char}} {{avatar}} {{charAvatar}} {{days}} {{count}}</span><label style="cursor:pointer;font-weight:700;">上传.html<input type="file" id="smt-upload-html" accept=".html,.txt" style="display:none;"/></label></div>
            <textarea id="smt-html-textarea" style="width:100%;height:96px;background:#FFF;border:1px solid #E4E4EC;border-radius:8px;padding:7px;font-size:9.5px;font-family:monospace;box-sizing:border-box;"></textarea>
            <div style="display:flex;justify-content:flex-end;gap:5px;margin-top:6px;"><span class="smt-pill-btn dark" id="smt-save-html">保存主页</span></div>
        </div>
        <div class="ab-dock-section">
            <div class="ab-dock-grid">
                <div class="ab-app-item" data-openapp="phone"><div class="ab-app-squircle">${AB_ICO.phone}</div><div class="ab-app-title">突击查手机</div><div class="ab-app-kr">PHONE CHECK</div></div>
                <div class="ab-app-item" data-openapp="music"><div class="ab-app-squircle">${AB_ICO.music}</div><div class="ab-app-title">网易云同听</div><div class="ab-app-kr">MUSIC BOOTH</div></div>
                <div class="ab-app-item" data-openapp="diary"><div class="ab-app-squircle">${AB_ICO.book}</div><div class="ab-app-title">交换日记本</div><div class="ab-app-kr">SHARED DIARY</div></div>
            </div>
        </div>
    </div>

    <div class="smt-page" id="smt-page-phone">
        <div style="background:#F8F8F8;border:1px solid #ECECF2;border-radius:16px;padding:10px 13px;margin-bottom:10px;display:flex;align-items:center;justify-content:space-between;flex-shrink:0;">
            <div style="display:flex;align-items:center;gap:10px;"><img id="smt-ph-ava" src="" style="width:36px;height:36px;border-radius:50%;object-fit:cover;border:2px solid #FFF;" /><div><div style="font-size:11px;font-weight:700;" id="smt-ph-owner">TA's iPhone</div><div style="font-size:8px;color:#8E8E98;">FACE ID UNLOCKED</div></div></div>
            <span class="smt-pill-btn dark" id="smt-ph-refresh-btn">↻ 重新生成此页</span>
        </div>
        <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:5px;margin-bottom:10px;flex-shrink:0;">
            <span class="smt-pill-btn dark" data-phtab="ins">📸 INS小号</span><span class="smt-pill-btn" data-phtab="memo">🔒 备忘录</span><span class="smt-pill-btn" data-phtab="bill">💳 Pay账单</span><span class="smt-pill-btn" data-phtab="forum">💬 匿名论坛</span>
        </div>
        <div id="smt-ph-stage" style="flex:1;min-height:0;overflow-y:auto;padding-bottom:12px;"></div>
    </div>

    <div class="smt-page" id="smt-page-music">
        <div class="smt-section-box" style="text-align:center;flex-shrink:0;">
            <div style="display:flex;align-items:center;justify-content:center;gap:14px;margin-bottom:8px;">
                <img id="smt-mus-uava" src="" style="width:40px;height:40px;border-radius:50%;object-fit:cover;border:2px solid #FFF;" />
                <div class="smt-disc-spin" style="width:58px;height:58px;border-radius:50%;background:radial-gradient(circle,#FFF 22%,#3A3A40 24%,#484852 68%,#EAEAF0 70%);border:2px solid #ECECF2;display:flex;align-items:center;justify-content:center;overflow:hidden;"><img id="smt-mus-cover" src="https://i.postimg.cc/rydS6NvG/IMG-3866.jpg" style="width:26px;height:26px;border-radius:50%;object-fit:cover;" /></div>
                <img id="smt-mus-cava" src="" style="width:40px;height:40px;border-radius:50%;object-fit:cover;border:2px solid #FFF;" />
            </div>
            <div style="font-size:12px;font-weight:700;" id="smt-mus-title">Love Lee - AKMU</div>
            <div style="font-size:8.5px;color:#8E8E98;margin:2px 0 6px 0;" id="smt-mus-sub">蓝牙耳机共享同听中</div>
            <audio id="smt-audio-player" controls style="width:100%;height:30px;outline:none;"></audio>
            <div id="smt-ncm-iframe-wrap" style="display:none;margin-top:4px;"></div>
            <div style="display:flex;justify-content:center;gap:5px;margin-top:7px;">
                <span class="smt-pill-btn" id="smt-mus-like-cur">♡ 加入我喜欢</span>
                <span class="smt-pill-btn" id="smt-mus-toggle-iframe">切换官方播放器</span>
                <span class="smt-pill-btn dark" id="smt-ncm-ai-listen">✦ 让TA点评这首歌</span>
            </div>
            <div id="smt-mus-ai-comment" style="margin-top:7px;font-size:10px;background:#FFF;border:1px solid #ECECF2;border-radius:9px;padding:7px 10px;display:none;text-align:left;line-height:1.6;"></div>
        </div>
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:5px;margin-bottom:8px;flex-shrink:0;">
            <span class="smt-pill-btn dark" data-mustab="liked" id="smt-tab-liked-btn">♥ 我喜欢</span>
            <span class="smt-pill-btn" data-mustab="search">🔍 搜网易云曲库</span>
            <span class="smt-pill-btn" data-mustab="import">📥 导网易云歌单</span>
        </div>
        <div id="smt-mus-pane-liked" style="flex:1;min-height:0;overflow-y:auto;"></div>
        <div id="smt-mus-pane-search" style="display:none;flex:1;min-height:0;flex-direction:column;">
            <div style="display:flex;gap:5px;margin-bottom:8px;flex-shrink:0;"><input type="text" id="smt-mus-search-input" class="smt-wx-input" placeholder="输入歌名或歌手搜索..." /><span class="smt-pill-btn dark" id="smt-mus-search-btn" style="height:30px!important;padding:0 14px!important;">搜索</span></div>
            <div id="smt-mus-search-results" style="flex:1;min-height:0;overflow-y:auto;"></div>
        </div>
        <div id="smt-mus-pane-import" style="display:none;flex:1;min-height:0;overflow-y:auto;">
            <div class="smt-section-box">
                <div style="display:flex;gap:5px;margin-bottom:5px;"><input type="text" id="smt-ncm-pl-link" class="smt-wx-input" placeholder="粘贴网易云公开歌单链接或ID..." /><span class="smt-pill-btn dark" id="smt-ncm-pl-sync-btn" style="height:30px!important;padding:0 12px!important;">整单导入</span></div>
                <div id="smt-ncm-pl-status" style="font-size:9px;color:#55555E;font-weight:600;"></div>
            </div>
            <div class="smt-section-box">
                <textarea id="smt-mus-import-text" style="width:100%;height:70px;background:#FFF;border:1px solid #E4E4EC;border-radius:8px;padding:7px;font-size:9.5px;box-sizing:border-box;margin-bottom:6px;" placeholder="支持一行一首歌名或网易云单曲分享链接..."></textarea>
                <div style="display:flex;justify-content:space-between;"><span class="smt-pill-btn" id="smt-mus-clear-liked">清空我喜欢</span><span class="smt-pill-btn dark" id="smt-mus-import-run">＋ 批量导入到我喜欢</span></div>
            </div>
        </div>
    </div>

    <div class="smt-page" id="smt-page-diary">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;flex-shrink:0;"><span style="font-size:10.5px;font-weight:700;">EXCHANGE DIARY · 双人交换日记本</span><span class="smt-pill-btn dark" id="smt-diary-ai-write">✦ 让TA写今日日记</span></div>
        <div id="smt-diary-list" style="flex:1;min-height:0;overflow-y:auto;margin-bottom:8px;"></div>
        <div class="smt-section-box" style="margin-bottom:0!important;flex-shrink:0;">
            <textarea id="smt-diary-input" style="width:100%;height:52px;background:#FFF;border:1px solid #E6E6EC;border-radius:8px;padding:7px;font-size:11px;box-sizing:border-box;resize:none;margin-bottom:6px;" placeholder="오늘의 일기... 写下你今天的日记"></textarea>
            <div style="text-align:right;"><span class="smt-pill-btn dark" id="smt-diary-user-save">存入交换日记本</span></div>
        </div>
    </div>

    <div class="smt-page" id="smt-page-archive">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;"><span style="font-size:10px;font-weight:700;">SAVED ARCHIVES · 当前角色历史馆</span><span class="smt-pill-btn" id="smt-export-arch">导出 JSON</span></div>
        <div id="smt-archive-list" style="flex:1;overflow-y:auto;"></div>
    </div>

    <div class="smt-page" id="smt-page-api">
        <div class="smt-section-box" style="background:#FFF!important;border:1.5px solid #484852!important;">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:3px;">
                <b style="font-size:10.5px;">⚡ Sumoul App 独立 API 引擎</b>
                <span class="smt-pill-btn dark" id="smt-api-open-admin">👑 管理员审核后台</span>
            </div>
            <div style="font-size:8.8px;color:#7A7A85;" id="smt-api-status-tip">请确认下方已填写你的反代地址与 API Key</div>
        </div>
        <div class="smt-section-box"><div style="font-size:9.5px;font-weight:700;margin-bottom:4px;">1. 独立 API 地址 (Base URL)</div><input type="text" id="smt-api-url" class="smt-wx-input" style="width:100%;box-sizing:border-box;border-radius:8px!important;" placeholder="https://api.openai.com/v1" /></div>
        <div class="smt-section-box"><div style="font-size:9.5px;font-weight:700;margin-bottom:4px;">2. 独立 API Key</div><input type="password" id="smt-api-key" class="smt-wx-input" style="width:100%;box-sizing:border-box;border-radius:8px!important;" placeholder="sk-..." /></div>
        <div class="smt-section-box">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;"><span style="font-size:9.5px;font-weight:700;">3. 模型名称</span><span class="smt-pill-btn" id="smt-fetch-models">🔄 拉取模型</span></div>
            <input type="text" id="smt-api-model" class="smt-wx-input" style="width:100%;box-sizing:border-box;border-radius:8px!important;" placeholder="gpt-4o-mini / deepseek-chat / claude..." />
            <select id="smt-model-select" class="smt-wx-input" style="width:100%;margin-top:5px;display:none;border-radius:8px!important;"></select>
        </div>
        <div class="smt-section-box"><div style="font-size:9.5px;font-weight:700;margin-bottom:4px;">4. 自动读取主线最近几层聊天作为上下文参考</div><input type="number" id="smt-api-ctx" class="smt-wx-input" style="width:100%;box-sizing:border-box;border-radius:8px!important;" value="8" /></div>
        <div style="display:flex;justify-content:flex-end;gap:6px;">
            <span class="smt-pill-btn" id="smt-test-api" style="height:30px!important;padding:0 12px!important;">⚡ 测试连接</span>
            <span class="smt-pill-btn dark" id="smt-save-api" style="height:30px!important;padding:0 16px!important;">✓ 保存独立 API 设置</span>
        </div>
    </div>
</div>

<div class="smt-bottom-dock">
    <div class="smt-tab-item active" data-page="talk" data-title="Sumoul App · 서울톡" data-sub="Personal Messenger · KST"><span class="smt-tab-ico"></span><span class="smt-tab-txt">微信</span></div>
    <div class="smt-tab-item" data-page="space" data-title="COUPLE SPACE · 커플공간" data-sub="6 Exclusive Couple Apps"><span class="smt-tab-ico"></span><span class="smt-tab-txt">情侣空间</span></div>
    <div class="smt-tab-item" data-page="home" data-title="MY HOME · 마이페이지" data-sub="Custom HTML &amp; Utility Apps"><span class="smt-tab-ico"></span><span class="smt-tab-txt">主页/应用</span></div>
    <div class="smt-tab-item" data-page="archive" data-title="ARCHIVE · 보관함" data-sub="Saved Records &amp; Cards"><span class="smt-tab-ico"></span><span class="smt-tab-txt">历史</span></div>
    <div class="smt-tab-item" data-page="api" data-title="API CONFIG · 환경설정" data-sub="Standalone Connection"><span class="smt-tab-ico"></span><span class="smt-tab-txt">API设置</span></div>
</div>
`;

topDoc.body.appendChild(btn);
topDoc.body.appendChild(modal);

let currentPage = "talk", lastMainPage = "space";
const SUB_APPS = ["admin", "wx_settings", "sp_pet", "sp_4cut", "sp_qa", "sp_mood", "sp_coupon", "sp_guest", "phone", "music", "diary"];

function navigateToPage(pageId, customTitle, customSub) {
    const isSub = SUB_APPS.includes(pageId);
    if (!isSub) {
        lastMainPage = pageId;
        topDoc.querySelectorAll(".smt-tab-item").forEach((t) => t.classList.toggle("active", t.getAttribute("data-page") === pageId));
    }
    currentPage = pageId;
    ["talk", "space", "home", "archive", "api", ...SUB_APPS].forEach((k) => {
        const el = topDoc.getElementById(`smt-page-${k}`);
        if (el) el.classList.toggle("active", k === pageId);
    });
    topDoc.getElementById("smt-back-text").textContent = isSub ? "이전 · 返回" : "나가기";
    if (customTitle) topDoc.getElementById("smt-top-title").textContent = customTitle;
    if (customSub) topDoc.getElementById("smt-top-sub").textContent = customSub;

    if (pageId === "admin") renderAdminConsole();
    if (pageId === "talk") renderWeChat();
    if (pageId === "space" || pageId.startsWith("sp_")) renderCoupleSpaceAll();
    if (pageId === "home") renderHomeHtml();
    if (pageId === "archive") renderArchive();
    if (pageId === "phone") renderFullPhoneApp();
    if (pageId === "music") renderMusicApp();
    if (pageId === "diary") renderDiaryApp();
}

function closeSumoulModal() {
    modal.classList.remove("smt-open");
    modal.style.setProperty("display", "none", "important");
}

topDoc.getElementById("smt-header-back-btn").onclick = () => {
    if (SUB_APPS.includes(currentPage)) {
        const target = currentPage === "wx_settings" ? "talk" : lastMainPage;
        const targetTab = topDoc.querySelector(`.smt-tab-item[data-page="${target}"]`);
        navigateToPage(target, targetTab?.getAttribute("data-title"), targetTab?.getAttribute("data-sub"));
    } else {
        closeSumoulModal();
    }
};
topDoc.querySelectorAll(".smt-tab-item").forEach((tab) => tab.onclick = () => navigateToPage(tab.getAttribute("data-page"), tab.getAttribute("data-title"), tab.getAttribute("data-sub")));
topDoc.querySelectorAll("[data-openapp]").forEach((card) => card.onclick = () => navigateToPage(card.getAttribute("data-openapp"), "Sumoul App", "Full-Screen Interactive View"));

const lockLayer = topDoc.getElementById("seoul-boot-lock-layer");

function requestAdminEntry() {
    const pin = prompt("👑 请输入 Sumoul App 管理员后台密码：");
    if (pin === AUTH_CONFIG.ADMIN_PIN) {
        lockLayer.classList.add("smt-unlocked-hide");
        navigateToPage("admin", "ADMIN CONSOLE · 管理员后台", "Access & Blacklist Control");
    } else if (pin !== null) {
        alert("管理员密码错误！");
    }
}

topDoc.getElementById("smt-open-admin-btn").onclick = () => requestAdminEntry();
topDoc.getElementById("smt-top-badge").onclick = () => requestAdminEntry();
topDoc.getElementById("smt-api-open-admin").onclick = () => requestAdminEntry();
topDoc.getElementById("smt-admin-relock-btn").onclick = () => {
    lockLayer.classList.remove("smt-unlocked-hide");
    topDoc.getElementById("smt-boot-splash").classList.add("fade-out");
};

function renderAdminConsole() {
    const db = getAdminDB();
    const pwdEl = topDoc.getElementById("smt-adm-pwd-list");
    pwdEl.innerHTML = db.passwords.map((p, i) => `<span class="smt-pill-btn">${p} <b data-delpwd="${i}" style="cursor:pointer;margin-left:4px;color:#8A5A5A;">✕</b></span>`).join("");
    pwdEl.querySelectorAll("[data-delpwd]").forEach((x) => x.onclick = () => { db.passwords.splice(Number(x.getAttribute("data-delpwd")), 1); saveAdminDB(db); renderAdminConsole(); });

    const blkEl = topDoc.getElementById("smt-adm-black-list");
    blkEl.innerHTML = db.blacklist.length ? db.blacklist.map((q, i) => `<span class="smt-pill-btn" style="border-color:#C8A0A0;color:#8A5A5A;">🚫 ${q} <b data-delblk="${i}" style="cursor:pointer;margin-left:4px;">移除</b></span>`).join("") : `<span style="font-size:9px;color:#9A9AA5;">暂无拉黑的 QQ 号</span>`;
    blkEl.querySelectorAll("[data-delblk]").forEach((x) => x.onclick = () => { db.blacklist.splice(Number(x.getAttribute("data-delblk")), 1); saveAdminDB(db); renderAdminConsole(); });

    const whtEl = topDoc.getElementById("smt-adm-white-list");
    whtEl.innerHTML = db.whitelist.map((q, i) => `<span class="smt-pill-btn">✓ ${q} <b data-delwht="${i}" style="cursor:pointer;margin-left:4px;color:#8A5A5A;">✕</b></span>`).join("");
    whtEl.querySelectorAll("[data-delwht]").forEach((x) => x.onclick = () => { db.whitelist.splice(Number(x.getAttribute("data-delwht")), 1); saveAdminDB(db); renderAdminConsole(); });

    const pendEl = topDoc.getElementById("smt-adm-pending-list");
    if (!db.pending.length) {
        pendEl.innerHTML = `<div style="text-align:center;padding:12px;font-size:9px;color:#9A9AA5;">暂无待审核的申请记录</div>`;
    } else {
        pendEl.innerHTML = db.pending.map((item, i) => `
            <div style="display:flex;justify-content:space-between;align-items:center;background:#FFF;border:1px solid #EAEAF0;border-radius:10px;padding:7px 10px;margin-bottom:5px;font-size:9.5px;">
                <div style="display:flex;align-items:center;gap:8px;">
                    <img src="https://q1.qlogo.cn/g?b=qq&nk=${item.qq}&s=100" style="width:26px;height:26px;border-radius:50%;" />
                    <div><b>QQ: ${item.qq}</b><div style="font-size:8px;color:#8E8E98;">${item.note || "申请使用"} · 专属码: ${computeQQCode(item.qq)}</div></div>
                </div>
                <div style="display:flex;gap:4px;">
                    <span class="smt-pill-btn dark" data-apppass="${i}">✓ 通过</span>
                    <span class="smt-pill-btn" data-appban="${i}" style="color:#8A5A5A;">🚫 拉黑</span>
                </div>
            </div>`).join("");
        pendEl.querySelectorAll("[data-apppass]").forEach((b) => b.onclick = () => {
            const idx = Number(b.getAttribute("data-apppass")), target = db.pending[idx];
            if (target) {
                db.whitelist = Array.from(new Set([...db.whitelist, target.qq]));
                db.pending.splice(idx, 1); saveAdminDB(db); renderAdminConsole();
                alert(`✓ 已通过 QQ: ${target.qq}！专属激活码为：${computeQQCode(target.qq)}`);
            }
        });
        pendEl.querySelectorAll("[data-appban]").forEach((b) => b.onclick = () => {
            const idx = Number(b.getAttribute("data-appban")), target = db.pending[idx];
            if (target) {
                db.blacklist = Array.from(new Set([...db.blacklist, target.qq]));
                db.pending.splice(idx, 1); saveAdminDB(db); renderAdminConsole();
                alert(`🚫 已将 QQ: ${target.qq} 永久拉黑！`);
            }
        });
    }
}

topDoc.getElementById("smt-adm-add-pwd").onclick = () => {
    const v = prompt("输入新增的群发口令密码（如 SUMOUL888）：");
    if (v && v.trim()) { const db = getAdminDB(); db.passwords.push(v.trim()); saveAdminDB(db); renderAdminConsole(); }
};
topDoc.getElementById("smt-adm-add-black").onclick = () => {
    const v = prompt("输入要永久拉黑封杀的 QQ 号：");
    if (v && v.trim()) {
        const q = v.trim(), db = getAdminDB();
        db.blacklist = Array.from(new Set([...db.blacklist, q]));
        db.whitelist = db.whitelist.filter((x) => x !== q);
        saveAdminDB(db); renderAdminConsole();
        alert(`🚫 QQ: ${q} 已加入永久黑名单！`);
    }
};
topDoc.getElementById("smt-adm-add-white").onclick = () => {
    const v = prompt("输入允许免密直接进入的白名单 QQ 号：");
    if (v && v.trim()) { const db = getAdminDB(); db.whitelist.push(v.trim()); saveAdminDB(db); renderAdminConsole(); }
};
topDoc.getElementById("smt-adm-keygen-btn").onclick = () => {
    const q = prompt("输入申请人的 QQ 号，生成唯一绑定激活码：");
    if (q && q.trim()) {
        const code = computeQQCode(q.trim());
        navigator.clipboard?.writeText(code);
        alert(`QQ: ${q.trim()} 的唯一通行码为：\n\n${code}\n\n（已自动复制到剪贴板）`);
    }
};
topDoc.getElementById("smt-adm-export-cfg").onclick = () => {
    const db = getAdminDB();
    const codeSnippet = `const AUTH_CONFIG = {\n    ADMIN_PIN: "${AUTH_CONFIG.ADMIN_PIN}",\n    SECRET_SALT: "${AUTH_CONFIG.SECRET_SALT}",\n    PASSWORDS: ${JSON.stringify(db.passwords)},\n    WHITELIST: ${JSON.stringify(db.whitelist)},\n    BLACKLIST: ${JSON.stringify(db.blacklist)},\n    CLOUD_SYNC_URL: "${AUTH_CONFIG.CLOUD_SYNC_URL}"\n};`;
    navigator.clipboard?.writeText(codeSnippet);
    alert("✓ 已复制最新 AUTH_CONFIG 配置代码！直接粘贴替换 GitHub index.js 开头的同名区块即可全网永久生效！");
};

/* 🌧️ 忧郁白灰胶片开屏：绝对不自动闪过，只有当你手动点击时才唤醒进入！ */
const MELANCHOLY_POEMS = [
    { kr: "우울한 회색빛 새벽,<br>네가 없는 시간은 조용히 멈춰있다.", cn: "在忧郁的灰白黎明，没有你的时间悄然静止。" },
    { kr: "창밖에 내리는 차가운 빗소리,<br>전하지 못한 말들이 안개처럼 흩어진다.", cn: "窗外落下的冰冷雨声，未曾传达的话语如雾般散去。" },
    { kr: "무채색의 계절 속에서,<br>오직 너만이 나의 유일한 온도였다.", cn: "在无彩色的季节里，唯有你是我的唯一温度。" },
    { kr: "기억의 조각들이 회색 도시 위로 가라앉는 밤.", cn: "记忆的碎片沉入这座灰白城市的夜晚。" }
];

const qqInp = topDoc.getElementById("smt-auth-qq-inp"), codeInp = topDoc.getElementById("smt-auth-code-inp"), avaImg = topDoc.getElementById("smt-lock-qq-ava"), errEl = topDoc.getElementById("smt-auth-err-msg");

function updateLockTime() {
    const d = new Date(), el = topDoc.getElementById("smt-lock-big-time");
    if (el) el.textContent = `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
}
updateLockTime();

qqInp.oninput = () => {
    const val = qqInp.value.trim();
    if (/^[1-9][0-9]{4,11}$/.test(val)) {
        avaImg.src = `https://q1.qlogo.cn/g?b=qq&nk=${val}&s=640`;
        topDoc.getElementById("smt-lock-welcome-title").textContent = `Sumoul App · ${val}`;
    }
};

try {
    const saved = JSON.parse(localStorage.getItem(K_AUTH) || "null");
    if (saved && saved.qq) {
        qqInp.value = saved.qq;
        codeInp.value = saved.pass || "";
        avaImg.src = `https://q1.qlogo.cn/g?b=qq&nk=${saved.qq}&s=640`;
        topDoc.getElementById("smt-lock-welcome-title").textContent = `Sumoul App · ${saved.qq}`;
    }
} catch (e) {}

topDoc.getElementById("smt-lock-exit-btn").onclick = () => closeSumoulModal();

topDoc.getElementById("smt-auth-submit-btn").onclick = async (e) => {
    const qq = qqInp.value.trim(), pass = codeInp.value.trim();
    e.target.textContent = "⏳ VERIFYING...";
    errEl.textContent = "";
    const res = await checkQQPermission(qq, pass);
    if (res.status === "ok") {
        localStorage.setItem(K_AUTH, JSON.stringify({ qq, pass }));
        e.target.textContent = `✓ ${res.role} · ENTERING...`;
        setTimeout(() => {
            lockLayer.classList.add("smt-unlocked-hide");
            e.target.textContent = "ENTER SUMOUL APP · 验证进入";
        }, 240);
    } else {
        errEl.textContent = res.msg;
        e.target.textContent = res.status === "banned" ? "🚫 已被永久封禁" : "ENTER SUMOUL APP · 验证进入";
    }
};

topDoc.getElementById("smt-auth-apply-btn").onclick = () => {
    const qq = qqInp.value.trim();
    if (!/^[1-9][0-9]{4,11}$/.test(qq)) return alert("请先在上方输入框填写你正确的纯数字 QQ 号！");
    const note = prompt(`提交【QQ: ${qq}】的审核申请，请输入你的昵称或备注：`, "申请使用 Sumoul App");
    if (note === null) return;
    const db = getAdminDB();
    if (db.blacklist.includes(qq)) return alert("🚫 你的 QQ 号已被作者拉黑，禁止提交申请！");
    if (!db.pending.some((x) => x.qq === qq)) {
        db.pending.unshift({ qq, note: note.trim(), time: nowTimeStr() });
        saveAdminDB(db);
    }
    const reqTicket = `【Sumoul App 申请】QQ: ${qq} | 备注: ${note.trim()}`;
    navigator.clipboard?.writeText(reqTicket);
    errEl.style.color = "#484852";
    errEl.textContent = `✓ 已登记申请并复制申请口令！请发送给作者审核通过或索取群口令。`;
};

function playMelancholyBoot() {
    updateLockTime();
    const splash = topDoc.getElementById("smt-boot-splash");
    const poemEl = topDoc.getElementById("smt-splash-poem");
    if (poemEl) {
        const p = MELANCHOLY_POEMS[Math.floor(Math.random() * MELANCHOLY_POEMS.length)];
        poemEl.innerHTML = `“ ${p.kr} ”<br><span style="font-size:8.5px;color:#9A9AA5;font-style:normal;display:block;margin-top:4px;">${p.cn}</span>`;
    }
    lockLayer.classList.remove("smt-unlocked-hide");
    splash.classList.remove("fade-out");
    splash.onclick = () => {
        splash.classList.add("fade-out");
    };
}

/* 微信模块 */
const KAOMOJI_LIST = ["૮꒰ ˶• ༝ •˶꒱ა", "(｡•́︿•̀｡)", "♡(˃͈ દ ˂͈ ༶ )", "( ´͈ ᵕ `͈ )◞♡", "(⁎⁍̴̛ᴗ⁍̴̛⁎)", "(¬_¬ )", "( ˘•ω•˘ )", "✧(≖ ◡ ≖✿)", "(っ´ω`c)", "૮ • ﻌ - ა", "(⁄ ⁄•⁄ω⁄•⁄ ⁄)", "(╬▔皿▔)╯", "🥺", "🤍", "😭", "💢"];
let activeQuoteText = "", activeMenuMsgIdx = -1, activeEditMsgIdx = -1, lastObservedCharScope = "";

function refreshSyncedMemoryPool() {
    const list = getChatList().filter((m) => m.role !== "sys").slice(-12), ctxInfo = getSTContext(1);
    const memoryBlock = (getSyncMode() && list.length > 0) ? `[近期手机微信私聊记忆 (${ctxInfo.userName} 与 ${ctxInfo.charName} 在线上聊过的内容)：${list.map((m) => `${m.role === "user" ? ctxInfo.userName : ctxInfo.charName}: ${m.text}`).join(" | ")}]` : "";
    try { topWin.SillyTavern?.getContext?.()?.setExtensionPrompt?.("SEOUL_WECHAT_MEMORY", memoryBlock, 1, 2); } catch (e) {}
}

function setQuotePreview(txt) {
    activeQuoteText = txt || "";
    const bar = topDoc.getElementById("smt-wx-reply-preview");
    bar.style.display = activeQuoteText ? "flex" : "none";
    if (activeQuoteText) topDoc.getElementById("smt-wx-quote-txt").textContent = `引用：「${activeQuoteText}」`;
}
topDoc.getElementById("smt-wx-quote-cancel").onclick = () => setQuotePreview("");

function renderWeChat() {
    const ctx = getSTContext(1), wCfg = getWxCfg(), rt = getRealTimeInfo();
    lastObservedCharScope = ctx.charScopeId;
    const displayMyName = wCfg.myNick || ctx.userName, displayCharName = wCfg.remark || ctx.charName;
    const displayMyAva = wCfg.myAva || ctx.userAvatar, displayCharAva = wCfg.charAva || ctx.charAvatar;
    const avaPx = `${wCfg.avaSize || 33}px`;

    topDoc.getElementById("smt-sync-toggle").innerHTML = `${WX_ICO.sync}<span>记忆:${getSyncMode() ? "ON" : "OFF"}</span>`;
    if (currentPage === "talk") {
        topDoc.getElementById("smt-top-title").textContent = `${displayCharName} · Sumoul App`;
        topDoc.getElementById("smt-top-sub").textContent = `${wCfg.charBio || "Personal Messenger"} · ${rt.timeStr} ${rt.periodCn}`;
    }

    const stream = topDoc.getElementById("smt-wx-stream"), list = getChatList();
    stream.innerHTML = list.length ? "" : `<div class="smt-wx-sys">${rt.fullDateStr} ${rt.timeStr} · 与 ${displayCharName} 的独立对话</div>`;

    list.forEach((m, idx) => {
        const floorNum = idx + 1;
        if (m.role === "sys") {
            const s = topDoc.createElement("div"); s.className = "smt-wx-sys"; s.style.cursor = "pointer"; s.textContent = `#${floorNum} · ${m.text}`;
            s.onclick = () => { const arr = getChatList(); arr.splice(idx, 1); saveChatList(arr); refreshSyncedMemoryPool(); renderWeChat(); };
            stream.appendChild(s); return;
        }
        const isMe = m.role === "user", row = topDoc.createElement("div");
        row.className = `smt-wx-row ${isMe ? "me" : "ai"}`;

        let innerHtml = "";
        if (m.type === "sticker" && m.stickerUrl) {
            innerHtml = `<div class="smt-wx-sticker-msg" data-msgidx="${idx}"><img src="${m.stickerUrl}" /></div>`;
        } else if (m.type === "transfer" || /^\[(微信)?转账/.test(m.text)) {
            const amt = m.amount || m.text.match(/¥?(\d+(\.\d+)?)/)?.[1] || "520.00";
            const note = m.note || m.text.split("备注:")[1]?.replace("]", "")?.trim() || "给你的零花钱";
            innerHtml = `<div class="smt-wx-pay-card" data-msgidx="${idx}"><div class="smt-wx-pay-top"><div class="smt-wx-pay-ico"></div><div><div class="smt-wx-pay-amt">₩ / ¥ ${amt}</div><div class="smt-wx-pay-note">${m.accepted ? "✓ 已收款 · " + note : note}</div></div></div><div class="smt-wx-pay-foot"><span>SUMOUL PAY</span><span>${m.accepted ? "COMPLETED" : "TRANSFER"}</span></div></div>`;
        } else {
            const qHtml = m.quote ? `<div class="smt-wx-quote-box">「${m.quote.replace(/</g, "&lt;")}」</div>` : "";
            const isMulti = m.quote || (m.text && m.text.length > 22);
            innerHtml = `<div class="smt-wx-bubble ${isMulti ? "multiline" : ""}" data-msgidx="${idx}">${qHtml}${m.text.replace(/</g, "&lt;")}</div>`;
        }

        const menuHtml = activeMenuMsgIdx === idx ? `
            <div class="smt-wx-act-pop">
                <span class="smt-wx-act-item" data-wxop="quote" data-idx="${idx}">${WX_ICO.quote}<span>引用</span></span>
                <span class="smt-wx-act-item" data-wxop="edit" data-idx="${idx}">${WX_ICO.edit}<span>编辑</span></span>
                <span class="smt-wx-act-item" data-wxop="reroll" data-idx="${idx}">${WX_ICO.reroll}<span>重回</span></span>
                <span class="smt-wx-act-item" data-wxop="sum" data-idx="${idx}">${WX_ICO.sum}<span>总结</span></span>
                <span class="smt-wx-act-item" data-wxop="copy" data-idx="${idx}">${WX_ICO.copy}<span>复制</span></span>
                <span class="smt-wx-act-item" data-wxop="del" data-idx="${idx}" style="color:#9A6868;">${WX_ICO.del}<span>删除</span></span>
            </div>` : "";

        const editHtml = activeEditMsgIdx === idx ? `
            <div class="smt-wx-edit-box">
                <textarea class="smt-wx-edit-area" id="smt-wx-edit-input-${idx}">${m.text.replace(/</g, "&lt;")}</textarea>
                <div style="display:flex;justify-content:flex-end;gap:4px;"><span class="smt-pill-btn" data-editcancel="${idx}">取消</span><span class="smt-pill-btn dark" data-editsave="${idx}">保存</span></div>
            </div>` : "";

        row.innerHTML = `
            <img class="smt-wx-ava" src="${isMe ? displayMyAva : displayCharAva}" style="width:${avaPx}!important;height:${avaPx}!important;min-width:${avaPx}!important;min-height:${avaPx}!important;"/>
            <div style="display:flex;flex-direction:column;align-items:${isMe ? "flex-end" : "flex-start"};max-width:100%;">
                ${innerHtml}${menuHtml}${editHtml}
                <div class="smt-wx-meta"><span class="smt-wx-idx-tag">#${floorNum}</span><span>${isMe ? `${displayMyName} · 읽음 1` : displayCharName}</span><span>·</span><span>${m.time || ""}</span></div>
            </div>`;
        stream.appendChild(row);
    });

    stream.querySelectorAll("[data-msgidx]").forEach((el) => el.onclick = (e) => {
        e.stopPropagation(); const i = Number(el.getAttribute("data-msgidx"));
        activeMenuMsgIdx = activeMenuMsgIdx === i ? -1 : i; activeEditMsgIdx = -1; renderWeChat();
    });

    stream.querySelectorAll("[data-wxop]").forEach((btnOp) => btnOp.onclick = (e) => {
        e.stopPropagation(); const op = btnOp.getAttribute("data-wxop"), i = Number(btnOp.getAttribute("data-idx")), arr = getChatList(), target = arr[i];
        activeMenuMsgIdx = -1; if (!target) return;
        if (op === "quote") { setQuotePreview(target.text.slice(0, 38)); renderWeChat(); topDoc.getElementById("smt-wx-input").focus(); }
        else if (op === "edit") { activeEditMsgIdx = i; renderWeChat(); }
        else if (op === "reroll") {
            let cutIdx = i;
            if (target.role === "ai") { while (cutIdx > 0 && arr[cutIdx - 1].role === "ai") cutIdx--; saveChatList(arr.slice(0, cutIdx)); }
            else { saveChatList(arr.slice(0, i + 1)); }
            refreshSyncedMemoryPool(); renderWeChat(); topDoc.getElementById("smt-wx-reply-btn").click();
        } else if (op === "sum") {
            renderWeChat(); topDoc.getElementById("smt-wx-sum-drawer").style.display = "block";
            topDoc.getElementById("smt-sum-from").value = i + 1; topDoc.getElementById("smt-sum-to").value = arr.length;
        } else if (op === "copy") { navigator.clipboard?.writeText(target.text); renderWeChat(); }
        else if (op === "del") { arr.splice(i, 1); saveChatList(arr); refreshSyncedMemoryPool(); renderWeChat(); }
    });

    stream.querySelectorAll("[data-editcancel]").forEach((b) => b.onclick = (e) => { e.stopPropagation(); activeEditMsgIdx = -1; renderWeChat(); });
    stream.querySelectorAll("[data-editsave]").forEach((b) => b.onclick = (e) => {
        e.stopPropagation(); const i = Number(b.getAttribute("data-editsave")), inp = topDoc.getElementById(`smt-wx-edit-input-${i}`);
        if (inp && inp.value.trim()) { const arr = getChatList(); if (arr[i]) { arr[i].text = inp.value.trim(); saveChatList(arr); refreshSyncedMemoryPool(); } }
        activeEditMsgIdx = -1; renderWeChat();
    });
    stream.scrollTop = stream.scrollHeight;
}

function appendWx(txt, sys = "", extra = {}) {
    const l = getChatList();
    if (sys) l.push({ role: "sys", text: sys, time: nowTimeStr() });
    if (txt) { l.push(Object.assign({ role: "user", text: txt, quote: activeQuoteText || "", time: nowTimeStr() }, extra)); setQuotePreview(""); }
    saveChatList(l); refreshSyncedMemoryPool(); renderWeChat();
}

topDoc.getElementById("smt-wx-add-btn").onclick = () => { const i = topDoc.getElementById("smt-wx-input"); if (i.value.trim()) { appendWx(i.value.trim()); i.value = ""; } };
topDoc.getElementById("smt-wx-input").onkeydown = (e) => { if (e.key === "Enter") { e.preventDefault(); topDoc.getElementById("smt-wx-add-btn").click(); } };

topDoc.getElementById("smt-wx-reply-btn").onclick = async () => {
    const i = topDoc.getElementById("smt-wx-input"); if (i.value.trim()) { appendWx(i.value.trim()); i.value = ""; }
    topDoc.getElementById("smt-top-sub").textContent = "입력 중... 对方正在输入";
    try {
        const ctx = getSTContext(Number(getApiCfg().ctxCount) || 8), wCfg = getWxCfg(), rt = getRealTimeInfo(), myName = wCfg.myNick || ctx.userName, allChat = getChatList();
        const rec = allChat.slice(-16).map((m) => m.role === "sys" ? `[${m.text}]` : `${m.role === "user" ? myName : ctx.charName}: ${m.quote ? `(引用「${m.quote}」) ` : ""}${m.text}`).join("\n");
        const timeBlock = wCfg.timeAware !== false ? `\n${rt.promptContext}` : "";
        const bgBlock = wCfg.customBgNote ? `\n【补充背景】：${wCfg.customBgNote}` : "";
        const raw = await requestStandaloneAI(`你是${ctx.charName}，在微信与${myName}私聊。${timeBlock}${bgBlock}\n人设：${ctx.charDesc.slice(0, 1200)}\n近期剧情：${ctx.recentChat.slice(-1200)}\n请用日常短句一次连回1~4条气泡，换行分隔。`, `【记录】：\n${rec}\n请回复：`);
        if (raw.includes("收") || raw.includes("谢") || raw.includes("转账")) { allChat.forEach((m) => { if (m.type === "transfer") m.accepted = true; }); saveChatList(allChat); }
        for (const b of raw.split(/\n+/).map((s) => s.replace(/^[^:：]{1,8}[:：]\s*/, "").trim()).filter(Boolean).slice(0, 4)) {
            await new Promise((r) => setTimeout(r, 260)); const c = getChatList();
            c.push({ role: "ai", text: b, time: nowTimeStr() }); saveChatList(c); refreshSyncedMemoryPool(); renderWeChat();
        }
    } catch (err) { appendWx("", err.message); } finally { renderWeChat(); }
};

topDoc.querySelectorAll("[data-wxact]").forEach((b) => b.onclick = () => {
    const a = b.getAttribute("data-wxact"), ctx = getSTContext(1), wCfg = getWxCfg(), myName = wCfg.myNick || ctx.userName, cName = wCfg.remark || ctx.charName;
    if (a === "poke") appendWx("", `"${myName}" 拍了拍 "${cName}"`);
    if (a === "transfer") { const amt = prompt("转账金额：", "520.00"); if (!amt) return; const note = prompt("转账备注：", "给你的零花钱") || "转账"; appendWx(`[微信转账 ¥${amt} · 备注:${note}]`, "", { type: "transfer", amount: amt, note, accepted: false }); }
    if (a === "photo") { const d = prompt("描述照片画面：", "随手拍"); if (d) appendWx(`[照片: ${d}]`); }
    if (a === "voice") { const v = prompt("语音内容："); if (v) appendWx(`(( 6" · "${v}" ))`); }
});

const emojiDrawer = topDoc.getElementById("smt-wx-emoji-drawer");
function renderEmojiDrawer() {
    const kGrid = topDoc.getElementById("smt-em-pane-kaomoji");
    kGrid.innerHTML = KAOMOJI_LIST.map((k) => `<div class="smt-kaomoji-item" data-kao="${k}">${k}</div>`).join("");
    kGrid.querySelectorAll("[data-kao]").forEach((el) => el.onclick = () => { const inp = topDoc.getElementById("smt-wx-input"); inp.value += el.getAttribute("data-kao"); inp.focus(); });

    const sGrid = topDoc.getElementById("smt-sticker-grid"), stickers = getStickerList();
    sGrid.innerHTML = stickers.map((st, idx) => `<div class="smt-sticker-card" data-sendst="${idx}"><img src="${st.url}" /><div class="smt-st-name">${st.name || "表情"}</div><span class="smt-st-del" data-delst="${idx}">✕</span></div>`).join("");
    sGrid.querySelectorAll("[data-sendst]").forEach((card) => card.onclick = (e) => {
        if (e.target.hasAttribute("data-delst")) return;
        const st = getStickerList()[Number(card.getAttribute("data-sendst"))];
        if (st) { appendWx(`[表情包: ${st.name}]`, "", { type: "sticker", stickerUrl: st.url, stickerName: st.name }); emojiDrawer.style.display = "none"; }
    });
    sGrid.querySelectorAll("[data-delst]").forEach((delBtn) => delBtn.onclick = (e) => {
        e.stopPropagation(); const list = getStickerList(); list.splice(Number(delBtn.getAttribute("data-delst")), 1); saveStickerList(list); renderEmojiDrawer();
    });
}
topDoc.getElementById("smt-wx-emoji-btn").onclick = () => { const s = emojiDrawer.style.display === "block"; emojiDrawer.style.display = s ? "none" : "block"; if (!s) renderEmojiDrawer(); };
topDoc.getElementById("smt-wx-emoji-close").onclick = () => { emojiDrawer.style.display = "none"; };
emojiDrawer.querySelectorAll("[data-emtab]").forEach((tb) => tb.onclick = () => {
    emojiDrawer.querySelectorAll("[data-emtab]").forEach((b) => b.classList.remove("dark")); tb.classList.add("dark");
    const t = tb.getAttribute("data-emtab");
    topDoc.getElementById("smt-em-pane-kaomoji").style.display = t === "kaomoji" ? "grid" : "none";
    topDoc.getElementById("smt-em-pane-sticker").style.display = t === "sticker" ? "block" : "none";
    topDoc.getElementById("smt-em-pane-batch").style.display = t === "batch" ? "block" : "none";
});
topDoc.getElementById("smt-st-add-btn").onclick = () => {
    const u = topDoc.getElementById("smt-st-url-inp").value.trim(); if (!u) return;
    const n = topDoc.getElementById("smt-st-name-inp").value.trim() || "表情", list = getStickerList();
    list.unshift({ name: n, url: u }); saveStickerList(list); topDoc.getElementById("smt-st-url-inp").value = ""; renderEmojiDrawer();
};
topDoc.getElementById("smt-st-batch-run").onclick = () => {
    const raw = topDoc.getElementById("smt-st-batch-inp").value.trim(); if (!raw) return;
    const list = getStickerList(); let added = 0;
    raw.split(/\n+/).forEach((line, idx) => {
        const m = line.match(/(https?:\/\/[^\s"'<>]+|data:image\/[^\s"'<>]+)/i);
        if (m) { const u = m[1], n = line.replace(u, "").replace(/[|｜:：,\-—]/g, "").trim() || `表情#${idx + 1}`; list.unshift({ name: n, url: u }); added++; }
    });
    saveStickerList(list); topDoc.getElementById("smt-st-batch-inp").value = ""; renderEmojiDrawer();
    emojiDrawer.querySelector('[data-emtab="sticker"]').click(); alert(`✓ 批量导入 ${added} 张表情！`);
};

function compressFileToDataUrl(file, maxDim = 200) {
    return new Promise((res) => {
        const r = new FileReader();
        r.onload = (ev) => {
            const img = new Image();
            img.onload = () => {
                const c = topDoc.createElement("canvas"); let w = img.width, h = img.height;
                if (w > h) { if (w > maxDim) { h = Math.round(h * maxDim / w); w = maxDim; } } else { if (h > maxDim) { w = Math.round(w * maxDim / h); h = maxDim; } }
                c.width = w; c.height = h; c.getContext("2d").drawImage(img, 0, 0, w, h); res(c.toDataURL("image/jpeg", 0.85));
            };
            img.src = String(ev.target?.result || "");
        };
        r.readAsDataURL(file);
    });
}
topDoc.getElementById("smt-st-file-inp").onchange = async (e) => { const f = e.target.files?.[0]; if (!f) return; const d = await compressFileToDataUrl(f, 180); const l = getStickerList(); l.unshift({ name: f.name.replace(/\.[^.]+$/, ""), url: d }); saveStickerList(l); renderEmojiDrawer(); };
topDoc.getElementById("smt-st-multi-files").onchange = async (e) => {
    const files = Array.from(e.target.files || []), l = getStickerList();
    for (const f of files) { const d = await compressFileToDataUrl(f, 180); if (d) l.unshift({ name: f.name.replace(/\.[^.]+$/, "").slice(0, 8), url: d }); }
    saveStickerList(l); renderEmojiDrawer(); emojiDrawer.querySelector('[data-emtab="sticker"]').click();
};

function openFullWxSettingsPage() {
    const ctx = getSTContext(1), c = getWxCfg(), rt = getRealTimeInfo();
    navigateToPage("wx_settings", "CHAT & PROFILE · 聊天设置", `${rt.fullDateStr} · ${rt.timeStr}`);
    topDoc.getElementById("smt-wxset-time-pill").innerHTML = `${rt.icon}<span>${rt.timeStr} · ${rt.periodKr}</span>`;
    topDoc.getElementById("smt-wxset-time-title").innerHTML = `${rt.icon}<span>REAL-TIME PERCEPTION · 真实时间感知</span>`;
    topDoc.getElementById("smt-wxset-clock-big").textContent = `${rt.fullDateStr} · ${rt.timeStr} (${rt.periodKr})`;
    const tBtn = topDoc.getElementById("smt-wxset-time-toggle");
    tBtn.className = `smt-pill-btn ${c.timeAware !== false ? "dark" : ""}`;
    tBtn.textContent = c.timeAware !== false ? "已开启真实时间感知" : "已关闭时间感知";
    topDoc.getElementById("smt-cfg-myava-preview").src = c.myAva || ctx.userAvatar;
    topDoc.getElementById("smt-cfg-charava-preview").src = c.charAva || ctx.charAvatar;
    topDoc.getElementById("smt-cfg-mynick").value = c.myNick || "";
    topDoc.getElementById("smt-cfg-mybio").value = c.myBio || "連線中 · Personal Inbox";
    topDoc.getElementById("smt-cfg-myava").value = c.myAva || "";
    topDoc.getElementById("smt-cfg-remark").value = c.remark || "";
    topDoc.getElementById("smt-cfg-charbio").value = c.charBio || "随时在线 · 置顶联系人";
    topDoc.getElementById("smt-cfg-charava").value = c.charAva || "";
    topDoc.getElementById("smt-cfg-avasize").value = c.avaSize || 33;
    topDoc.getElementById("smt-cfg-bgnote").value = c.customBgNote || "";
}
topDoc.getElementById("smt-wx-cfg-btn").onclick = () => openFullWxSettingsPage();
topDoc.getElementById("smt-wxset-back-chat").onclick = () => navigateToPage("talk", "Sumoul App · 서울톡", "Personal Messenger · KST");
topDoc.getElementById("smt-wxset-time-toggle").onclick = () => { const c = getWxCfg(); c.timeAware = !(c.timeAware !== false); saveWxCfg(c); openFullWxSettingsPage(); };
topDoc.getElementById("smt-cfg-myava-file").onchange = async (e) => { const f = e.target.files?.[0]; if (f) { const d = await compressFileToDataUrl(f, 200); topDoc.getElementById("smt-cfg-myava").value = d; topDoc.getElementById("smt-cfg-myava-preview").src = d; } };
topDoc.getElementById("smt-cfg-charava-file").onchange = async (e) => { const f = e.target.files?.[0]; if (f) { const d = await compressFileToDataUrl(f, 200); topDoc.getElementById("smt-cfg-charava").value = d; topDoc.getElementById("smt-cfg-charava-preview").src = d; } };
topDoc.getElementById("smt-cfg-save-btn").onclick = () => {
    const prev = getWxCfg();
    saveWxCfg({
        myNick: topDoc.getElementById("smt-cfg-mynick").value.trim(),
        myBio: topDoc.getElementById("smt-cfg-mybio").value.trim(),
        myAva: topDoc.getElementById("smt-cfg-myava").value.trim(),
        remark: topDoc.getElementById("smt-cfg-remark").value.trim(),
        charBio: topDoc.getElementById("smt-cfg-charbio").value.trim(),
        charAva: topDoc.getElementById("smt-cfg-charava").value.trim(),
        avaSize: Math.min(58, Math.max(22, Number(topDoc.getElementById("smt-cfg-avasize").value) || 33)),
        timeAware: prev.timeAware !== false,
        customBgNote: topDoc.getElementById("smt-cfg-bgnote").value.trim()
    });
    navigateToPage("talk", "Sumoul App · 서울톡", "Personal Messenger · KST");
};
topDoc.getElementById("smt-cfg-reset-btn").onclick = () => { saveWxCfg({ myNick: "", myBio: "連線中 · Personal Inbox", myAva: "", remark: "", charBio: "随时在线 · 置顶联系人", charAva: "", avaSize: 33, timeAware: true, customBgNote: "" }); openFullWxSettingsPage(); };

topDoc.getElementById("smt-wx-sum-btn").onclick = () => { const d = topDoc.getElementById("smt-wx-sum-drawer"); d.style.display = d.style.display === "block" ? "none" : "block"; topDoc.getElementById("smt-sum-to").value = getChatList().length || 1; };
topDoc.getElementById("smt-wx-sum-close").onclick = () => { topDoc.getElementById("smt-wx-sum-drawer").style.display = "none"; };
topDoc.getElementById("smt-sum-run-btn").onclick = async (e) => {
    const list = getChatList(); if (!list.length) return;
    const fromIdx = Math.max(1, Number(topDoc.getElementById("smt-sum-from").value) || 1), toIdx = Math.min(list.length, Number(topDoc.getElementById("smt-sum-to").value) || list.length);
    const ctx = getSTContext(4), lines = list.slice(fromIdx - 1, toIdx).map((m, k) => `#${fromIdx + k} ${m.role === "user" ? ctx.userName : ctx.charName}: ${m.text}`).join("\n");
    e.target.textContent = "提炼中...";
    try { topDoc.getElementById("smt-sum-result").value = await requestStandaloneAI(`将 ${ctx.userName} 与 ${ctx.charName} 的微信对话浓缩为阶段记忆摘要（120字左右）。`, lines); } catch (err) { alert(err.message); } finally { e.target.textContent = "生成总结"; }
};
topDoc.getElementById("smt-sum-to-arch").onclick = () => { const v = topDoc.getElementById("smt-sum-result").value.trim(); if (v) { pushArchive(`[微信总结] ${getSTContext(1).charName}`, v, false); alert("✓ 已存入历史！"); } };
topDoc.getElementById("smt-sum-to-main").onclick = () => { const v = topDoc.getElementById("smt-sum-result").value.trim(); if (v) { try { topWin.SillyTavern?.getContext?.()?.setExtensionPrompt?.("SEOUL_WECHAT_MEMORY", `[微信重要记忆摘要：${v}]`, 1, 2); alert("✓ 已注入主线记忆！"); } catch (e) {} } };
topDoc.getElementById("smt-sync-toggle").onclick = () => { setSyncMode(!getSyncMode()); refreshSyncedMemoryPool(); renderWeChat(); };
topDoc.getElementById("smt-wx-clear").onclick = () => { saveChatList([]); refreshSyncedMemoryPool(); renderWeChat(); };
topDoc.getElementById("smt-wx-css-btn").onclick = () => { const d = topDoc.getElementById("smt-wx-css-drawer"); d.style.display = d.style.display === "none" ? "block" : "none"; topDoc.getElementById("smt-wx-css-textarea").value = getWxCss(); };
topDoc.getElementById("smt-wx-css-save").onclick = () => { saveWxCss(topDoc.getElementById("smt-wx-css-textarea").value); applyWxCustomCss(); topDoc.getElementById("smt-wx-css-drawer").style.display = "none"; };
topDoc.getElementById("smt-wx-css-reset").onclick = () => { saveWxCss(NEW_DEFAULT_WX_CSS); topDoc.getElementById("smt-wx-css-textarea").value = NEW_DEFAULT_WX_CSS; applyWxCustomCss(); };

/* A+B 融合版情侣空间事件 */
const QA_QUESTIONS = [
    "第一次悄悄对彼此产生超越普通关系的占有欲，是在哪个瞬间？",
    "如果今晚首尔突然停电，只有我们两个人被困在家里，最想一起做什么？",
    "对方身上有一个连TA自己都没察觉到、但你却觉得很可爱的小习惯是什么？",
    "手机相册里最舍不得删掉的一张和对方有关的照片（或截图）是什么？",
    "吵架或冷战的时候，对方做什么动作会让你瞬间心软投降？"
];

function getSpaceData() {
    const ctx = getSTContext(1), key = getSafeScopedKey("sumoul_v16_space");
    const def = {
        startDate: "2024-05-20", mood: "36.7°C · SWEET HOME", bgUrl: "", charNow: "正在小厨房给你热牛奶",
        pet: { name: "모찌 (糯米团)", lv: 2, hunger: 85, mood: 92, lastLog: `与 ${ctx.charName} 共同领养的小宠物正蜷在地毯上打呼噜。` },
        life4cut: { date: "SUMOUL STUDIO", frames: [`点击右上角生成你与 ${ctx.charName} 的专属四连拍`, "第二格画面", "第三格画面", "第四格定格"], sign: `${ctx.charName} & ME` },
        qaIndex: 0, qaUserAns: "点击此处写下你的回答...", qaCharAns: "点击右上角「让TA作答」揭晓...",
        moodSync: { action: "正看着手机等你的消息", temp: "36.8°C", bpm: "96 BPM", miss: "99%", os: "“怎么还不找我聊天……”" },
        coupons: [
            { title: "무조건 화해권 · 无条件和好券", desc: "无论谁生闷气，出示此券必须立刻拥抱和好" },
            { title: "심야 호출권 · 深夜随叫随到券", desc: "凌晨任何时候想见TA，TA都会立刻出现在你面前" },
            { title: "소원 들어주기 · 任性要求实现券", desc: "向TA提一个平时不好意思说的小要求，绝对服从" }
        ],
        couponLog: `点击任意特权券的「向TA使用」，即可触发 ${ctx.charName} 的专属履约反应！`,
        notes: [], todos: [{ text: "在首尔街头拍一次人生四格", done: true }, { text: "一起戴同一副耳机听歌", done: false }],
        insGrid: [
            { tag: "DAY 01", scene: "两人并肩走过的首尔街角路灯与被拉长的影子", caption: "우리의 시작 · 我们的开始", likes: 52 },
            { tag: "HOME", scene: "茶几上并排放着的两只马克杯，热气氤氲", caption: "나른한 오후 · 慵懒午后", likes: 64 },
            { tag: "PET", scene: "蜷在沙发角落熟睡的小宠物，身上盖着TA的外套", caption: "새 가족 · 家里的小成员", likes: 88 }
        ]
    };
    try { return Object.assign(def, JSON.parse(localStorage.getItem(key) || "{}")); } catch (e) { return def; }
}
function saveSpaceData(d) { localStorage.setItem(getSafeScopedKey("sumoul_v16_space"), JSON.stringify(d)); }
function calcTogetherDays() { const diff = Math.max(1, Math.floor((Date.now() - new Date(getSpaceData().startDate || "2024-05-20").getTime()) / 86400000)); return isNaN(diff) ? 100 : diff; }

function renderCoupleSpaceAll() {
    const ctx = getSTContext(1), wCfg = getWxCfg(), sp = getSpaceData();
    const myName = wCfg.myNick || ctx.userName, charName = wCfg.remark || ctx.charName;
    const myAva = wCfg.myAva || ctx.userAvatar, charAva = wCfg.charAva || ctx.charAvatar;

    const heroCard = topDoc.getElementById("smt-sp-hero-card");
    if (heroCard) heroCard.style.backgroundImage = sp.bgUrl ? `linear-gradient(to bottom,rgba(0,0,0,.08),rgba(0,0,0,.22)),url('${sp.bgUrl}')` : "linear-gradient(135deg,#F5F5F8 0%,#EAEAF0 100%)";
    topDoc.getElementById("smt-sp-char-scope-tag").innerHTML = `${AB_ICO.heartSm}<span>${charName} · HOME</span>`;
    topDoc.getElementById("smt-sp-uava").src = myAva; topDoc.getElementById("smt-sp-cava").src = charAva;
    topDoc.getElementById("smt-sp-days").textContent = `D+${calcTogetherDays()}`;
    topDoc.getElementById("smt-sp-mood").textContent = `${sp.mood} ✎`;
    topDoc.getElementById("smt-sp-couple-names").textContent = `${myName} & ${charName} · 서울 동거 일기`;
    topDoc.getElementById("smt-sp-live-bio").textContent = `🏠 ${charName}此刻：${sp.charNow || sp.moodSync?.action || "陪在你身边"}`;

    const pet = sp.pet || { name: "모찌", lv: 1, hunger: 80, mood: 90, lastLog: "" };
    const ms = sp.moodSync || { action: "正在想你", temp: "36.7°C", bpm: "96 BPM", miss: "99%", os: "" };

    topDoc.getElementById("smt-stat-pet").textContent = `LV.${pet.lv || 1}`;
    topDoc.getElementById("smt-stat-petname").textContent = `萌宠 ${pet.name.split(" ")[0]}`;
    topDoc.getElementById("smt-stat-fund").textContent = `${(sp.coupons || []).length}张`;
    topDoc.getElementById("smt-badge-pet").textContent = `LV.${pet.lv || 1}`;
    topDoc.getElementById("smt-badge-bpm").textContent = (ms.bpm || "96").replace(/\s*BPM/i, "");
    topDoc.getElementById("smt-badge-coupon").textContent = `${(sp.coupons || []).length}张`;
    topDoc.getElementById("smt-badge-todo").textContent = `${(sp.notes || []).length}条`;

    const gridEl = topDoc.getElementById("smt-ab-ins-grid"), feed = sp.insGrid || [];
    gridEl.innerHTML = feed.slice(0, 9).map((post, idx) => `<div class="ab-ins-square" data-insidx="${idx}"><div style="display:flex;justify-content:space-between;font-size:7.5px;font-weight:700;color:#8E8E98;"><span>${post.tag || `0${idx + 1}`}</span><span>♥ ${post.likes || 52}</span></div><div style="font-size:9px;color:#3A3A40;line-height:1.35;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden;font-weight:500;margin:auto 0;">${post.scene || ""}</div><div style="font-size:8px;font-weight:700;color:#2C2C32;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;border-top:1px solid #F0F0F5;padding-top:3px;">${post.caption || ""}</div></div>`).join("");
    gridEl.querySelectorAll("[data-insidx]").forEach((sq) => sq.onclick = () => {
        const idx = Number(sq.getAttribute("data-insidx")), p = feed[idx]; if (!p) return;
        const pop = topDoc.getElementById("smt-ins-detail-pop"); pop.style.display = "block";
        pop.innerHTML = `<div style="display:flex;justify-content:space-between;margin-bottom:4px;"><b>📸 [${p.tag}] ${p.caption}</b><div><span data-delins="${idx}" style="font-size:9px;color:#9A6868;cursor:pointer;margin-right:8px;">删除</span><span id="smt-ins-pop-close" style="cursor:pointer;">✕</span></div></div><div>${p.scene}</div>`;
        pop.querySelector("#smt-ins-pop-close").onclick = () => (pop.style.display = "none");
        pop.querySelector("[data-delins]").onclick = () => { const d = getSpaceData(); d.insGrid.splice(idx, 1); saveSpaceData(d); pop.style.display = "none"; renderCoupleSpaceAll(); };
    });

    topDoc.getElementById("smt-pet-name").textContent = pet.name;
    topDoc.getElementById("smt-pet-lv").textContent = `LV.${pet.lv || 1} · 与 ${charName} 共同抚养`;
    topDoc.getElementById("smt-pet-hunger-txt").textContent = `${pet.hunger}%`; topDoc.getElementById("smt-pet-hunger-bar").style.width = `${pet.hunger}%`;
    topDoc.getElementById("smt-pet-mood-txt").textContent = `${pet.mood}%`; topDoc.getElementById("smt-pet-mood-bar").style.width = `${pet.mood}%`;
    topDoc.getElementById("smt-pet-log").textContent = `🐾 ${pet.lastLog}`;

    const cut = sp.life4cut || { date: "SUMOUL", frames: [], sign: "" };
    topDoc.getElementById("smt-4cut-stage").innerHTML = `<div style="background:#FFF;border:1px solid #EAEAF0;border-radius:14px;padding:14px;max-width:290px;margin:0 auto;"><div style="font-size:8.5px;font-weight:700;letter-spacing:1.2px;color:#8E8E98;margin-bottom:10px;">LIFE4CUT · 인생네컷 STUDIO</div>${(cut.frames || []).slice(0, 4).map((f, i) => `<div style="background:#F8F8F8;border:1px solid #ECECF2;border-radius:10px;padding:12px;margin-bottom:8px;text-align:left;"><span style="font-size:8px;font-weight:700;color:#9A9AA5;display:block;margin-bottom:3px;">CUT 0${i + 1}</span><div style="font-size:11px;line-height:1.6;">${f}</div></div>`).join("")}<div style="display:flex;justify-content:space-between;font-size:9px;color:#6E6E77;font-weight:700;"><span>${cut.sign}</span><span>${cut.date}</span></div></div>`;

    const qIdx = (sp.qaIndex || 0) % QA_QUESTIONS.length;
    topDoc.getElementById("smt-qa-q").textContent = `Q${qIdx + 1}. ${QA_QUESTIONS[qIdx]}`;
    topDoc.getElementById("smt-qa-my-txt").textContent = sp.qaUserAns;
    topDoc.getElementById("smt-qa-char-label").textContent = `${charName}'S ANSWER`;
    topDoc.getElementById("smt-qa-char-txt").textContent = sp.qaCharAns;

    topDoc.getElementById("smt-mood-stage").innerHTML = `<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-bottom:10px;"><div style="background:#FFF;border:1px solid #EFEFF4;border-radius:12px;padding:10px;text-align:center;"><div style="font-size:8px;color:#8E8E98;">HEART RATE</div><div style="font-size:13px;font-weight:700;margin-top:3px;">${ms.bpm}</div></div><div style="background:#FFF;border:1px solid #EFEFF4;border-radius:12px;padding:10px;text-align:center;"><div style="font-size:8px;color:#8E8E98;">BODY TEMP</div><div style="font-size:13px;font-weight:700;margin-top:3px;">${ms.temp}</div></div><div style="background:#FFF;border:1px solid #EFEFF4;border-radius:12px;padding:10px;text-align:center;"><div style="font-size:8px;color:#8E8E98;">MISS YOU</div><div style="font-size:13px;font-weight:700;margin-top:3px;">${ms.miss}</div></div></div><div style="background:#FFF;border:1px solid #EFEFF4;border-radius:12px;padding:12px;margin-bottom:8px;"><div style="font-size:8.5px;color:#8E8E98;font-weight:700;margin-bottom:4px;">CURRENT ACTION · 此刻动态</div><div style="font-size:11.5px;line-height:1.6;">${ms.action}</div></div><div style="background:#FFF;border:1px solid #EFEFF4;border-radius:12px;padding:12px;"><div style="font-size:8.5px;color:#8E8E98;font-weight:700;margin-bottom:4px;">INNER VOICE · 内心心声</div><div style="font-size:11.5px;line-height:1.6;">${ms.os}</div></div>`;

    const cpList = topDoc.getElementById("smt-coupon-list");
    cpList.innerHTML = (sp.coupons || []).map((c, idx) => `<div style="display:flex;justify-content:space-between;align-items:center;background:#FFF;border:1px solid #EAEAF0;border-radius:12px;padding:11px 12px;margin-bottom:8px;"><div style="padding-right:10px;"><div style="font-size:11px;font-weight:700;">🎟️ ${c.title}</div><div style="font-size:9px;color:#7A7A85;margin-top:2px;">${c.desc}</div></div><span class="smt-pill-btn dark" data-usecp="${idx}">向TA使用</span></div>`).join("");
    topDoc.getElementById("smt-coupon-log").textContent = sp.couponLog || "";
    cpList.querySelectorAll("[data-usecp]").forEach((b) => b.onclick = async () => {
        const idx = Number(b.getAttribute("data-usecp")), cp = sp.coupons[idx], logEl = topDoc.getElementById("smt-coupon-log");
        logEl.textContent = `⏳ 正在向 ${charName} 核销【${cp.title}】...`;
        try { const r = await requestStandaloneAI(`你是${ctx.charName}。人设：${ctx.charDesc.slice(0, 1000)}`, `${myName}向你出示了特权券：【${cp.title}（${cp.desc}）】。请描写你看到后的反应与立刻宠溺履约的行动(90字左右)：`); sp.couponLog = `✓ 已核销【${cp.title}】：\n${r}`; saveSpaceData(sp); renderCoupleSpaceAll(); } catch (err) { logEl.textContent = err.message; }
    });

    topDoc.getElementById("smt-sp-notes-list").innerHTML = (sp.notes || []).map((n) => `<div style="background:#FFF;border:1px solid #EFEFF4;border-radius:10px;padding:8px 10px;margin-bottom:6px;font-size:10.5px;"><div style="display:flex;justify-content:space-between;font-size:8.5px;color:#8E8E98;"><b>${n.author}</b><span>${n.time}</span></div><div>${n.text.replace(/</g, "&lt;")}</div></div>`).join("");
    const todoEl = topDoc.getElementById("smt-sp-todo-list"); todoEl.innerHTML = "";
    (sp.todos || []).forEach((td, idx) => {
        const row = topDoc.createElement("div");
        row.style.cssText = "display:flex;align-items:center;justify-content:space-between;background:#FFF;border:1px solid #EFEFF4;border-radius:9px;padding:7px 10px;margin-bottom:5px;font-size:10.5px;";
        row.innerHTML = `<label style="display:flex;align-items:center;gap:7px;cursor:pointer;flex:1;"><input type="checkbox" ${td.done ? "checked" : ""}/><span style="${td.done ? "text-decoration:line-through;color:#9A9AA5;" : ""}">${td.text}</span></label><span style="cursor:pointer;" data-deltodo="${idx}">✕</span>`;
        row.querySelector("input").onchange = (e) => { const d = getSpaceData(); d.todos[idx].done = e.target.checked; saveSpaceData(d); renderCoupleSpaceAll(); };
        row.querySelector("[data-deltodo]").onclick = () => { const d = getSpaceData(); d.todos.splice(idx, 1); saveSpaceData(d); renderCoupleSpaceAll(); };
        todoEl.appendChild(row);
    });
}

topDoc.getElementById("smt-sp-bg-btn").onclick = () => { const sp = getSpaceData(), u = prompt("粘贴同居背景横幅图片 URL（留空恢复极简柔灰）：", sp.bgUrl || ""); if (u !== null) { sp.bgUrl = u.trim(); saveSpaceData(sp); renderCoupleSpaceAll(); } };
topDoc.getElementById("smt-sp-edit-date").onclick = () => { const sp = getSpaceData(), v = prompt("相恋日期(YYYY-MM-DD)：", sp.startDate); if (v) { sp.startDate = v.trim(); saveSpaceData(sp); renderCoupleSpaceAll(); } };
topDoc.getElementById("smt-sp-mood").onclick = () => { const sp = getSpaceData(), v = prompt("修改今日心情温度：", sp.mood); if (v) { sp.mood = v.trim(); saveSpaceData(sp); renderCoupleSpaceAll(); } };
topDoc.getElementById("smt-sp-reset-char").onclick = () => { const c = getSTContext(1); if (confirm(`确定重置与【${c.charName}】的情侣空间数据吗？`)) { localStorage.removeItem(getSafeScopedKey("sumoul_v16_space")); renderCoupleSpaceAll(); } };

topDoc.getElementById("smt-sp-refresh-live").onclick = async (e) => {
    const ctx = getSTContext(6), sp = getSpaceData(); e.target.textContent = "⏳ 感应中...";
    try {
        const raw = await requestStandaloneAI(`你是${ctx.charName}。人设：${ctx.charDesc.slice(0, 900)}`, `请生成你此刻在同居小屋里的实时状态。严格只输出JSON：{"charNow":"12字以内描述你此刻正在屋里做什么","bpm":"98 BPM"}`);
        const m = raw.match(/\{[\s\S]*\}/);
        if (m) { const obj = JSON.parse(m[0]); sp.charNow = obj.charNow || "陪在你身边"; sp.moodSync = sp.moodSync || {}; sp.moodSync.action = sp.charNow; sp.moodSync.bpm = obj.bpm || "98 BPM"; saveSpaceData(sp); renderCoupleSpaceAll(); }
    } catch (err) { alert(err.message); } finally { e.target.textContent = "↻ 刷新TA状态"; }
};
topDoc.getElementById("smt-ins-user-add").onclick = () => {
    const scene = prompt("描述你想贴进九宫格的画面内容："); if (!scene) return;
    const caption = prompt("写一句简短配文：", "우리의 순간 · 我们的瞬间") || "我们的瞬间";
    const sp = getSpaceData(); sp.insGrid = sp.insGrid || []; sp.insGrid.unshift({ tag: "MY POST", scene: scene.trim(), caption: caption.trim(), likes: 99 });
    saveSpaceData(sp); renderCoupleSpaceAll();
};
topDoc.getElementById("smt-ins-ai-add").onclick = async (e) => {
    const ctx = getSTContext(6), sp = getSpaceData(); e.target.textContent = "⏳ 拍摄中...";
    try {
        const raw = await requestStandaloneAI(`你是${ctx.charName}。人设：${ctx.charDesc.slice(0, 1000)}`, `请在你们的情侣空间九宫格照片墙新发一格动态，记录你和${ctx.userName}的甜蜜日常。严格只输出JSON：{"tag":"英文短词","scene":"40字以内的照片画面描写","caption":"12字以内的韩文+中文心情短句"}`);
        const m = raw.match(/\{[\s\S]*\}/);
        if (m) { const obj = JSON.parse(m[0]); sp.insGrid = sp.insGrid || []; sp.insGrid.unshift({ tag: obj.tag || "COUPLE", scene: obj.scene || "", caption: obj.caption || "", likes: Math.floor(Math.random() * 50) + 50 }); saveSpaceData(sp); renderCoupleSpaceAll(); }
    } catch (err) { alert(err.message); } finally { e.target.textContent = "✦ 让TA发情侣格"; }
};
topDoc.getElementById("smt-pet-rename").onclick = () => { const sp = getSpaceData(), v = prompt("给宠物起名：", sp.pet.name); if (v) { sp.pet.name = v.trim(); saveSpaceData(sp); renderCoupleSpaceAll(); } };
topDoc.getElementById("smt-pet-feed").onclick = () => { const sp = getSpaceData(); sp.pet.hunger = Math.min(100, sp.pet.hunger + 15); sp.pet.lastLog = `你喂了 ${sp.pet.name} 冻干零食，它开心地蹭了蹭你的手心！`; saveSpaceData(sp); renderCoupleSpaceAll(); };
topDoc.getElementById("smt-pet-pat").onclick = () => { const sp = getSpaceData(); sp.pet.mood = Math.min(100, sp.pet.mood + 15); sp.pet.lastLog = `你揉了揉 ${sp.pet.name} 的脑袋，它舒服地露出肚皮打滚~`; saveSpaceData(sp); renderCoupleSpaceAll(); };
topDoc.getElementById("smt-pet-ai-play").onclick = async (e) => { const ctx = getSTContext(6), sp = getSpaceData(); e.target.textContent = "互动中..."; try { sp.pet.lastLog = await requestStandaloneAI(`你是${ctx.charName}。人设：${ctx.charDesc.slice(0, 900)}`, `描写你逗弄宠物「${sp.pet.name}」并和身旁的${ctx.userName}亲昵互动的画面(80字左右)：`); saveSpaceData(sp); renderCoupleSpaceAll(); } catch (err) { alert(err.message); } finally { e.target.textContent = "✦ 让TA陪宠物玩"; } };
topDoc.getElementById("smt-4cut-gen-btn").onclick = async (e) => { const ctx = getSTContext(8); e.target.textContent = "⏳ 连拍中..."; try { const raw = await requestStandaloneAI(`你是摄影师。角色：${ctx.charName}与${ctx.userName}。人设：${ctx.charDesc.slice(0, 1000)}`, `生成两人在自拍亭连拍4张人生四格的画面。严格只输出JSON：{"frames":["第1格","第2格","第3格","第4格亲密定格"],"sign":"手写短句"}`); const m = raw.match(/\{[\s\S]*\}/); if (m) { const obj = JSON.parse(m[0]), sp = getSpaceData(); sp.life4cut = { date: "SUMOUL · " + nowTimeStr(), frames: obj.frames || [], sign: obj.sign || "우리의 계절" }; saveSpaceData(sp); renderCoupleSpaceAll(); } } catch (err) { alert(err.message); } finally { e.target.textContent = "✦ 和TA拍一组新四格"; } };
topDoc.getElementById("smt-qa-next").onclick = () => { const sp = getSpaceData(); sp.qaIndex = ((sp.qaIndex || 0) + 1) % QA_QUESTIONS.length; sp.qaUserAns = "点击填写..."; sp.qaCharAns = "点击让TA作答..."; saveSpaceData(sp); renderCoupleSpaceAll(); };
topDoc.getElementById("smt-qa-edit-my").onclick = () => { const sp = getSpaceData(), v = prompt("写下你的回答："); if (v) { sp.qaUserAns = v.trim(); saveSpaceData(sp); renderCoupleSpaceAll(); } };
topDoc.getElementById("smt-qa-ai-ans").onclick = async (e) => { const ctx = getSTContext(6), sp = getSpaceData(), q = QA_QUESTIONS[(sp.qaIndex || 0) % QA_QUESTIONS.length]; e.target.textContent = "思考中..."; try { sp.qaCharAns = await requestStandaloneAI(`你是${ctx.charName}。人设：${ctx.charDesc.slice(0, 1000)}`, `问题：“${q}”(${ctx.userName}答：“${sp.qaUserAns}”)。请用第一人称写下你的回答(70字左右)：`); saveSpaceData(sp); renderCoupleSpaceAll(); } catch (err) { alert(err.message); } finally { e.target.textContent = "✦ 让TA作答"; } };
topDoc.getElementById("smt-mood-sync-btn").onclick = async (e) => { const ctx = getSTContext(8); e.target.textContent = "⏳ 感应中..."; try { const raw = await requestStandaloneAI(`你是${ctx.charName}。人设：${ctx.charDesc.slice(0, 1000)}`, `感应你此刻的状态。严格只输出JSON：{"bpm":"98 BPM","temp":"36.8°C","miss":"99%","action":"此刻正在做什么","os":"脑海里关于${ctx.userName}的一句心声"}`); const m = raw.match(/\{[\s\S]*\}/); if (m) { const sp = getSpaceData(); sp.moodSync = JSON.parse(m[0]); saveSpaceData(sp); renderCoupleSpaceAll(); } } catch (err) { alert(err.message); } finally { e.target.textContent = "↻ 实时感应TA此刻状态"; } };
topDoc.getElementById("smt-coupon-add").onclick = () => { const t = prompt("新特权券名称："); if (!t) return; const d = prompt("效果描述：", "出示此券，对方必须无条件照做"); const sp = getSpaceData(); sp.coupons.unshift({ title: t.trim(), desc: (d || "").trim() }); saveSpaceData(sp); renderCoupleSpaceAll(); };
topDoc.getElementById("smt-sp-note-send").onclick = async () => { const inp = topDoc.getElementById("smt-sp-note-input"), v = inp.value.trim(); if (!v) return; inp.value = ""; const ctx = getSTContext(6), sp = getSpaceData(); sp.notes.unshift({ author: ctx.userName, text: v, time: nowTimeStr() }); saveSpaceData(sp); renderCoupleSpaceAll(); try { const r = await requestStandaloneAI(`你是${ctx.charName}。人设：${ctx.charDesc.slice(0, 800)}`, `${ctx.userName}留言：“${v}”，请简短回复(45字内)：`); const d = getSpaceData(); d.notes.unshift({ author: ctx.charName, text: r, time: nowTimeStr() }); saveSpaceData(d); renderCoupleSpaceAll(); } catch (err) { alert(err.message); } };
topDoc.getElementById("smt-sp-ai-note").onclick = async () => { const ctx = getSTContext(6); try { const r = await requestStandaloneAI(`你是${ctx.charName}。人设：${ctx.charDesc.slice(0, 800)}`, `主动在情侣空间留言板给${ctx.userName}留一句悄悄话(45字内)：`); const d = getSpaceData(); d.notes.unshift({ author: ctx.charName, text: r, time: nowTimeStr() }); saveSpaceData(d); renderCoupleSpaceAll(); } catch (err) { alert(err.message); } };
topDoc.getElementById("smt-sp-add-todo").onclick = () => { const v = prompt("新增心愿："); if (v) { const d = getSpaceData(); d.todos.push({ text: v.trim(), done: false }); saveSpaceData(d); renderCoupleSpaceAll(); } };

/* 网易云、查手机、交换日记、HTML主页与独立 API 设置 */
function getMusicData() {
    try { return Object.assign({ liked: [{ id: "2076931657", name: "Love Lee", artist: "AKMU", cover: "https://i.postimg.cc/rydS6NvG/IMG-3866.jpg", url: "https://music.163.com/song/media/outer/url?id=2076931657.mp3" }, { id: "2007335243", name: "Ditto", artist: "NewJeans", cover: "https://i.postimg.cc/vmsDSqmk/IMG-3926.jpg", url: "https://music.163.com/song/media/outer/url?id=2007335243.mp3" }], currentTrack: null }, JSON.parse(localStorage.getItem(K_MUSIC) || "{}")); }
    catch (e) { return { liked: [], currentTrack: null }; }
}
function saveMusicData(m) { localStorage.setItem(K_MUSIC, JSON.stringify(m)); }
let useNcmIframe = false;
function playTrackObj(track) {
    if (!track) return;
    const md = getMusicData(); md.currentTrack = track; saveMusicData(md);
    topDoc.getElementById("smt-mus-title").textContent = `${track.name} - ${track.artist}`;
    if (track.cover) topDoc.getElementById("smt-mus-cover").src = track.cover;
    const audio = topDoc.getElementById("smt-audio-player"), iframeWrap = topDoc.getElementById("smt-ncm-iframe-wrap"), sid = track.id || track.url?.match(/id=(\d+)/)?.[1] || "";
    if (useNcmIframe && sid) { audio.pause(); audio.style.display = "none"; iframeWrap.style.display = "block"; iframeWrap.innerHTML = `<iframe frameborder="no" border="0" width="100%" height="66" src="https://music.163.com/outchain/player?type=2&id=${sid}&auto=1&height=66"></iframe>`; }
    else { iframeWrap.style.display = "none"; iframeWrap.innerHTML = ""; audio.style.display = "block"; if (audio.src !== track.url) audio.src = track.url; audio.play().catch(() => {}); }
    renderMusicApp();
}
topDoc.getElementById("smt-mus-toggle-iframe").onclick = (e) => { useNcmIframe = !useNcmIframe; e.target.textContent = useNcmIframe ? "切换标准播放器" : "切换官方播放器"; const cur = getMusicData().currentTrack || getMusicData().liked[0]; if (cur) playTrackObj(cur); };
function renderMusicApp() {
    const ctx = getSTContext(1), md = getMusicData(), cur = md.currentTrack || md.liked[0];
    topDoc.getElementById("smt-mus-uava").src = ctx.userAvatar; topDoc.getElementById("smt-mus-cava").src = ctx.charAvatar;
    topDoc.getElementById("smt-tab-liked-btn").textContent = `♥ 我喜欢 (${md.liked.length})`;
    const pane = topDoc.getElementById("smt-mus-pane-liked");
    pane.innerHTML = md.liked.map((t, idx) => `<div style="display:flex;align-items:center;justify-content:space-between;background:${cur && cur.name === t.name ? "#484852" : "#F8F8F8"};color:${cur && cur.name === t.name ? "#FFF" : "#3A3A40"};border:1px solid #ECECF2;border-radius:11px;padding:8px 11px;margin-bottom:6px;"><div data-playliked="${idx}" style="display:flex;align-items:center;gap:9px;flex:1;cursor:pointer;"><img src="${t.cover || "https://i.postimg.cc/rydS6NvG/IMG-3866.jpg"}" style="width:32px;height:32px;border-radius:7px;object-fit:cover;"/><div><div style="font-size:11px;font-weight:700;">${t.name}</div><div style="font-size:8.5px;opacity:.75;">${t.artist}</div></div></div><span data-delliked="${idx}" style="cursor:pointer;padding:4px;">✕</span></div>`).join("");
    pane.querySelectorAll("[data-playliked]").forEach((el) => el.onclick = () => playTrackObj(getMusicData().liked[Number(el.getAttribute("data-playliked"))]));
    pane.querySelectorAll("[data-delliked]").forEach((el) => el.onclick = () => { const m = getMusicData(); m.liked.splice(Number(el.getAttribute("data-delliked")), 1); saveMusicData(m); renderMusicApp(); });
}
topDoc.querySelectorAll("[data-mustab]").forEach((b) => b.onclick = () => {
    topDoc.querySelectorAll("[data-mustab]").forEach((x) => x.classList.remove("dark")); b.classList.add("dark");
    const tab = b.getAttribute("data-mustab");
    topDoc.getElementById("smt-mus-pane-liked").style.display = tab === "liked" ? "block" : "none";
    topDoc.getElementById("smt-mus-pane-search").style.display = tab === "search" ? "flex" : "none";
    topDoc.getElementById("smt-mus-pane-import").style.display = tab === "import" ? "block" : "none";
});
topDoc.getElementById("smt-mus-like-cur").onclick = () => { const md = getMusicData(); if (md.currentTrack) { md.liked.unshift(md.currentTrack); saveMusicData(md); renderMusicApp(); alert("♥ 已加入我喜欢！"); } };

async function multiSourceSearch(keyword) {
    const q = encodeURIComponent(keyword);
    const urls = [`https://api.injahow.cn/meting/?server=netease&type=search&id=${q}`, `https://api.i-meto.com/meting/api?server=netease&type=search&id=${q}`];
    for (const u of urls) {
        try {
            const r = await fetch(u); if (!r.ok) continue;
            const d = await r.json();
            if (Array.isArray(d) && d.length) return d.slice(0, 18).map((x) => ({ id: String(x.id || ""), name: x.name, artist: x.artist, cover: x.pic, url: x.url }));
        } catch (e) {}
    }
    throw new Error("搜索超时");
}
topDoc.getElementById("smt-mus-search-btn").onclick = async () => {
    const q = topDoc.getElementById("smt-mus-search-input").value.trim(); if (!q) return;
    const box = topDoc.getElementById("smt-mus-search-results"); box.innerHTML = `<div style="padding:18px;text-align:center;font-size:10px;">⏳ 搜索中...</div>`;
    try {
        const arr = await multiSourceSearch(q);
        box.innerHTML = arr.map((t, i) => `<div style="display:flex;justify-content:space-between;align-items:center;background:#F8F8F8;border:1px solid #ECECF2;border-radius:10px;padding:7px 10px;margin-bottom:5px;font-size:10px;"><div><b>${t.name}</b> - ${t.artist}</div><div style="display:flex;gap:4px;"><span class="smt-pill-btn" data-sl="${i}">♡喜欢</span><span class="smt-pill-btn dark" data-sp="${i}">▶播放</span></div></div>`).join("");
        box.querySelectorAll("[data-sp]").forEach((el) => el.onclick = () => playTrackObj(arr[Number(el.getAttribute("data-sp"))]));
        box.querySelectorAll("[data-sl]").forEach((el) => el.onclick = (e) => { const m = getMusicData(); m.liked.unshift(arr[Number(el.getAttribute("data-sl"))]); saveMusicData(m); renderMusicApp(); e.target.textContent = "♥已加"; });
    } catch (err) { box.innerHTML = `<div style="padding:16px;font-size:10px;">${err.message}</div>`; }
};
topDoc.getElementById("smt-ncm-pl-sync-btn").onclick = async () => {
    const raw = topDoc.getElementById("smt-ncm-pl-link").value.trim(), m = raw.match(/id=(\d+)/) || raw.match(/(\d{6,15})/), st = topDoc.getElementById("smt-ncm-pl-status");
    if (!m) { st.textContent = "✕ 请粘贴正确的歌单链接或ID"; return; }
    st.textContent = "⏳ 正在拉取歌单...";
    try {
        const r = await fetch(`https://api.injahow.cn/meting/?server=netease&type=playlist&id=${m[1]}`);
        const d = await r.json();
        if (Array.isArray(d) && d.length) {
            const tracks = d.slice(0, 60).map((x) => ({ id: String(x.id || ""), name: x.name, artist: x.artist, cover: x.pic, url: x.url }));
            const md = getMusicData(); md.liked = [...tracks, ...md.liked].slice(0, 120); saveMusicData(md); renderMusicApp();
            st.textContent = `✓ 成功导入 ${tracks.length} 首歌！`; topDoc.getElementById("smt-tab-liked-btn").click();
        }
    } catch (e) { st.textContent = "✕ 歌单读取失败（请确认歌单公开）"; }
};
topDoc.getElementById("smt-mus-import-run").onclick = async () => {
    const raw = topDoc.getElementById("smt-mus-import-text").value.trim(); if (!raw) return;
    const lines = raw.split(/\n+/).map((l) => l.trim()).filter(Boolean), md = getMusicData();
    for (const line of lines) {
        const ncmId = line.match(/id=(\d+)/) || line.match(/^(\d{5,15})$/);
        if (ncmId) { const sid = ncmId[1]; md.liked.unshift({ id: sid, name: line.split("|")[0].replace(/https?.*/, "").trim() || `单曲 #${sid}`, artist: "NetEase", cover: "https://i.postimg.cc/rydS6NvG/IMG-3866.jpg", url: `https://music.163.com/song/media/outer/url?id=${sid}.mp3` }); }
        else { try { const hits = await multiSourceSearch(line); if (hits[0]) md.liked.unshift(hits[0]); } catch (e) {} }
    }
    saveMusicData(md); topDoc.getElementById("smt-mus-import-text").value = ""; renderMusicApp(); topDoc.getElementById("smt-tab-liked-btn").click();
};
topDoc.getElementById("smt-mus-clear-liked").onclick = () => { const m = getMusicData(); m.liked = []; saveMusicData(m); renderMusicApp(); };
topDoc.getElementById("smt-ncm-ai-listen").onclick = async () => {
    const cur = getMusicData().currentTrack || getMusicData().liked[0]; if (!cur) return;
    const c = getSTContext(6), cBox = topDoc.getElementById("smt-mus-ai-comment"); cBox.style.display = "block"; cBox.textContent = "⏳ 正在听歌...";
    try { cBox.textContent = `${c.charName}：` + await requestStandaloneAI(`你是${c.charName}，正和${c.userName}听《${cur.name}》。`, "说一句关于这首歌或此刻氛围的话(50字内)："); } catch (e) { cBox.textContent = e.message; }
};

let currentPhoneTab = "ins";
function getPhoneCache() { try { return JSON.parse(localStorage.getItem(getSafeScopedKey("sumoul_v16_phone")) || "{}"); } catch (e) { return {}; } }
function savePhoneCache(p) { localStorage.setItem(getSafeScopedKey("sumoul_v16_phone"), JSON.stringify(p)); }
function renderFullPhoneApp() {
    const c = getSTContext(1), cache = getPhoneCache(), stage = topDoc.getElementById("smt-ph-stage");
    topDoc.getElementById("smt-ph-ava").src = c.charAvatar; topDoc.getElementById("smt-ph-owner").textContent = `${c.charName} 的 iPhone`;
    stage.innerHTML = cache[currentPhoneTab] || `<div style="background:#F8F8F8;border:1px dashed #DCDCE4;border-radius:16px;padding:40px 16px;text-align:center;"><span class="smt-pill-btn dark" id="smt-ph-gen-empty">✦ 立即生成 ${currentPhoneTab.toUpperCase()} 界面</span></div>`;
    topDoc.getElementById("smt-ph-gen-empty")?.addEventListener("click", () => generateFullPhoneContent(currentPhoneTab));
}
async function generateFullPhoneContent(type) {
    const stage = topDoc.getElementById("smt-ph-stage"), c = getSTContext(8);
    stage.innerHTML = `<div style="padding:40px;text-align:center;font-size:10.5px;">⏳ 正在调用独立 API 生成...</div>`;
    try {
        const res = await requestStandaloneAI(`你是${c.charName}。人设：${c.charDesc.slice(0, 1200)}`, `请为【${type}】生成3条与${c.userName}有关的私密手机内容（韩系排版，不要代码块）：`);
        const html = `<div style="background:#FFF;border:1px solid #ECECF2;border-radius:14px;padding:14px;font-size:11.5px;line-height:1.75;white-space:pre-wrap;">${res.replace(/</g, "&lt;")}</div>`;
        const cache = getPhoneCache(); cache[type] = html; savePhoneCache(cache); stage.innerHTML = html;
    } catch (err) { stage.innerHTML = `<div style="padding:20px;">${err.message}</div>`; }
}
topDoc.querySelectorAll("[data-phtab]").forEach((b) => b.onclick = () => { topDoc.querySelectorAll("[data-phtab]").forEach((x) => x.classList.remove("dark")); b.classList.add("dark"); currentPhoneTab = b.getAttribute("data-phtab"); renderFullPhoneApp(); });
topDoc.getElementById("smt-ph-refresh-btn").onclick = () => generateFullPhoneContent(currentPhoneTab);

function getDiaryList() { try { return JSON.parse(localStorage.getItem(getSafeScopedKey("sumoul_v16_diary")) || "[]"); } catch (e) { return []; } }
function saveDiaryList(l) { localStorage.setItem(getSafeScopedKey("sumoul_v16_diary"), JSON.stringify(l)); }
function renderDiaryApp() {
    topDoc.getElementById("smt-diary-list").innerHTML = getDiaryList().map((d) => `<div style="background:#F8F8F8;border:1px solid #ECECF2;border-radius:14px;padding:12px;margin-bottom:8px;"><div style="display:flex;justify-content:space-between;font-size:9px;color:#7A7A85;margin-bottom:5px;"><b>[${d.author}] ${d.title}</b><span>${d.time}</span></div><div style="font-size:11px;line-height:1.68;white-space:pre-wrap;">${d.content.replace(/</g, "&lt;")}</div></div>`).join("");
}
topDoc.getElementById("smt-diary-user-save").onclick = () => { const i = topDoc.getElementById("smt-diary-input"); if (!i.value.trim()) return; const l = getDiaryList(), c = getSTContext(1); l.unshift({ author: c.userName, title: "今日手记", content: i.value.trim(), time: nowTimeStr() }); saveDiaryList(l); i.value = ""; renderDiaryApp(); };
topDoc.getElementById("smt-diary-ai-write").onclick = async (e) => { const c = getSTContext(6); e.target.textContent = "书写中..."; try { const r = await requestStandaloneAI(`你是${c.charName}。人设：${c.charDesc.slice(0, 1200)}`, `请写一篇和${c.userName}的交换日记(150字左右)：`); const l = getDiaryList(); l.unshift({ author: c.charName, title: `${c.charName}的日记`, content: r, time: nowTimeStr() }); saveDiaryList(l); renderDiaryApp(); } catch (err) { alert(err.message); } finally { e.target.textContent = "✦ 让TA写今日日记"; } };

const HTML_TPLS = {
    coupleId: `<div style="background:#F8F8F8;border:1px solid #ECECF2;border-radius:18px;padding:16px;"><div style="display:flex;justify-content:space-around;align-items:center;background:#FFF;border-radius:14px;padding:15px;"><div style="text-align:center;"><img src="{{avatar}}" style="width:50px;height:50px;border-radius:50%;object-fit:cover;"/><div style="font-size:10px;font-weight:700;margin-top:5px;">{{user}}</div></div><div style="font-size:14px;font-weight:700;">D+{{days}}</div><div style="text-align:center;"><img src="{{charAvatar}}" style="width:50px;height:50px;border-radius:50%;object-fit:cover;"/><div style="font-size:10px;font-weight:700;margin-top:5px;">{{char}}</div></div></div></div>`,
    polaroid: `<div style="background:#F8F8F8;border:1px solid #ECECF2;border-radius:18px;padding:12px;display:grid;grid-template-columns:1fr 1fr;gap:8px;"><div style="background:#FFF;padding:7px;border-radius:11px;text-align:center;"><img src="{{avatar}}" style="width:100%;height:86px;object-fit:cover;border-radius:7px;"/><div style="font-size:10px;font-weight:700;margin-top:4px;">{{user}}</div></div><div style="background:#FFF;padding:7px;border-radius:11px;text-align:center;"><img src="{{charAvatar}}" style="width:100%;height:86px;object-fit:cover;border-radius:7px;"/><div style="font-size:10px;font-weight:700;margin-top:4px;">{{char}}</div></div></div>`,
    receipt: `<div style="background:#F8F8F8;border:1px dashed #D5D5DE;border-radius:14px;padding:14px;font-family:monospace;text-align:center;"><b>SUMOUL RECEIPT · {{user}} &amp; {{char}} (D+{{days}})</b></div>`
};
function getUserHtml() { return localStorage.getItem(K_HTML) || HTML_TPLS.coupleId; }
function saveUserHtml(h) { localStorage.setItem(K_HTML, h); }
function renderHomeHtml() {
    const c = getSTContext(1), raw = getUserHtml();
    topDoc.getElementById("smt-user-html-stage").innerHTML = raw.replace(/\{\{user\}\}|\{\{name\}\}/g, c.userName).replace(/\{\{char\}\}/g, c.charName).replace(/\{\{avatar\}\}/g, c.userAvatar).replace(/\{\{charAvatar\}\}/g, c.charAvatar).replace(/\{\{days\}\}/g, String(calcTogetherDays())).replace(/\{\{count\}\}/g, String(getArchive().length));
    topDoc.getElementById("smt-html-textarea").value = raw;
}
topDoc.querySelectorAll("[data-tpl]").forEach((b) => b.onclick = () => { const k = b.getAttribute("data-tpl"); if (HTML_TPLS[k]) { saveUserHtml(HTML_TPLS[k]); renderHomeHtml(); } });
topDoc.getElementById("smt-open-html-edit").onclick = () => { const ed = topDoc.getElementById("smt-html-editor"); ed.style.display = ed.style.display === "none" ? "block" : "none"; };
topDoc.getElementById("smt-save-html").onclick = () => { saveUserHtml(topDoc.getElementById("smt-html-textarea").value); renderHomeHtml(); topDoc.getElementById("smt-html-editor").style.display = "none"; };

function renderArchive() {
    const box = topDoc.getElementById("smt-archive-list"), list = getArchive();
    box.innerHTML = list.length ? "" : `<div style="text-align:center;padding:36px;font-size:10px;color:#9A9AA5;">暂无历史存档</div>`;
    list.forEach((item) => {
        const card = topDoc.createElement("div"); card.className = "smt-section-box";
        card.innerHTML = `<div style="display:flex;justify-content:space-between;font-size:10px;margin-bottom:5px;"><b>${item.title}</b><span>${item.time}</span></div><div class="smt-arch-txt" style="background:#FFF;border-radius:9px;padding:8px;font-size:10.5px;"></div>`;
        const t = card.querySelector(".smt-arch-txt"); if (item.isHtml) t.innerHTML = item.content; else t.textContent = item.content;
        box.appendChild(card);
    });
}

const cfg = getApiCfg();
topDoc.getElementById("smt-api-url").value = cfg.url; topDoc.getElementById("smt-api-key").value = cfg.key; topDoc.getElementById("smt-api-model").value = cfg.model; topDoc.getElementById("smt-api-ctx").value = cfg.ctxCount;
topDoc.getElementById("smt-save-api").onclick = (e) => {
    saveApiCfg({ url: topDoc.getElementById("smt-api-url").value.trim(), key: topDoc.getElementById("smt-api-key").value.trim(), model: topDoc.getElementById("smt-api-model").value.trim(), ctxCount: Number(topDoc.getElementById("smt-api-ctx").value) || 8 });
    topDoc.getElementById("smt-api-status-tip").textContent = "✓ 独立 API 配置已保存生效！";
    e.target.textContent = "✓ 已保存"; setTimeout(() => (e.target.textContent = "✓ 保存独立 API 设置"), 1200);
};
topDoc.getElementById("smt-test-api").onclick = async (e) => {
    topDoc.getElementById("smt-save-api").click(); e.target.textContent = "测试中...";
    try { const r = await requestStandaloneAI("Test", "Reply OK"); topDoc.getElementById("smt-api-status-tip").textContent = `✓ 连接成功！返回: ${r.slice(0, 15)}`; }
    catch (err) { topDoc.getElementById("smt-api-status-tip").textContent = `✕ ${err.message}`; }
    finally { e.target.textContent = "⚡ 测试连接"; }
};
topDoc.getElementById("smt-fetch-models").onclick = async (e) => {
    const u = topDoc.getElementById("smt-api-url").value.trim().replace(/\/+$/, ""), k = topDoc.getElementById("smt-api-key").value.trim();
    if (!u || !k) return alert("请先填写 API 地址与 Key");
    e.target.textContent = "拉取中...";
    try {
        const res = await fetch(u.endsWith("/v1") ? `${u}/models` : `${u}/v1/models`, { headers: { "Authorization": `Bearer ${k}` } });
        const list = (await res.json())?.data || [], sel = topDoc.getElementById("smt-model-select");
        if (list.length) { sel.innerHTML = list.map((m) => `<option value="${m.id}">${m.id}</option>`).join(""); sel.style.display = "block"; topDoc.getElementById("smt-api-model").value = list[0].id; sel.onchange = () => (topDoc.getElementById("smt-api-model").value = sel.value); e.target.textContent = `✓ 已拉取(${list.length})`; }
    } catch (err) { e.target.textContent = "拉取失败"; }
};

/* 🔥 强制破壁唤醒函数（同时设置 class 与 inline display:flex !important，手机/电脑 100% 必弹出！） */
function openSumoulModal() {
    renderWeChat();
    renderCoupleSpaceAll();
    renderHomeHtml();
    modal.classList.add("smt-open");
    modal.style.setProperty("display", "flex", "important");
    playMelancholyBoot();
}

btn.onclick = (e) => { e.preventDefault(); e.stopPropagation(); openSumoulModal(); };
btn.addEventListener("touchend", (e) => { e.preventDefault(); e.stopPropagation(); openSumoulModal(); }, { passive: false });

/* 全局捕获级点击监听（确保点悬浮球、扩展面板按钮、魔法棒菜单 100% 响应！） */
topDoc.addEventListener("click", (e) => {
    const t = e.target;
    if (!t || !t.closest) return;
    if (t.closest("#seoul-mini-theater-btn") || t.closest("#seoul-ext-open-btn") || t.closest("#seoul-wand-menu-item")) {
        e.preventDefault();
        e.stopPropagation();
        openSumoulModal();
    }
}, true);

function ensureTavernExtensionButtons() {
    if (!topDoc.getElementById("seoul-mini-theater-btn")) topDoc.body.appendChild(btn);
    if (!topDoc.getElementById("seoul-mini-theater-modal")) topDoc.body.appendChild(modal);

    const extSettings = topDoc.getElementById("extensions_settings") || topDoc.getElementById("extensions_settings2");
    if (extSettings && !topDoc.getElementById("seoul-ext-settings-panel")) {
        const panel = topDoc.createElement("div");
        panel.id = "seoul-ext-settings-panel";
        panel.className = "inline-drawer";
        panel.innerHTML = `
            <div class="inline-drawer-toggle inline-drawer-header">
                <b>🤍 Sumoul App</b>
                <div class="inline-drawer-icon fa-solid fa-circle-chevron-down down"></div>
            </div>
            <div class="inline-drawer-content" style="display:block;padding:10px;">
                <div style="font-size:12px;margin-bottom:8px;opacity:.85;">独立微信 · A+B情侣空间 · 网易云同听 · 防二传审核</div>
                <div id="seoul-ext-open-btn" class="menu_button" style="width:100%;text-align:center;padding:8px 0;font-weight:700;cursor:pointer;">
                    📱 立即打开 Sumoul App
                </div>
            </div>`;
        extSettings.prepend(panel);
    }

    const wandMenu = topDoc.getElementById("extensionsMenu");
    if (wandMenu && !topDoc.getElementById("seoul-wand-menu-item")) {
        const item = topDoc.createElement("div");
        item.id = "seoul-wand-menu-item";
        item.className = "list-group-item flex-container flexGap5 interactable";
        item.style.cursor = "pointer";
        item.innerHTML = `<span>🤍</span><span>打开 Sumoul App</span>`;
        wandMenu.prepend(item);
    }
}

ensureTavernExtensionButtons();

setInterval(() => {
    ensureTavernExtensionButtons();
    if (!modal.classList.contains("smt-open")) return;
    const curScope = getSTContext(1).charScopeId;
    if (curScope && curScope !== lastObservedCharScope) {
        lastObservedCharScope = curScope;
        activeMenuMsgIdx = -1; activeEditMsgIdx = -1;
        renderWeChat(); renderCoupleSpaceAll(); renderHomeHtml();
    }
}, 1500);

renderWeChat();
}

bootSumoulApp();
})();
// ==========================================================================
// 🤍 【Sumoul App 开屏还原优化补丁：直接粘在 index.js 最末尾即可自动替换开屏！】
// 还原为：极简几何细框 + 单根垂落冷灰雨丝 + 1px 细线 + 忧郁独白 + 点击才进入（无月亮元素）
// ==========================================================================
(function () {
    const topDoc = (window.parent || window).document;
    function patchCleanMelancholySplash() {
        const splash = topDoc.getElementById("smt-boot-splash");
        if (!splash) { setTimeout(patchCleanMelancholySplash, 200); return; }

        splash.style.cssText = "position:absolute!important;inset:0!important;background:linear-gradient(180deg,#FFFFFF 0%,#F4F4F7 60%,#ECECEF 100%)!important;z-index:10!important;display:flex!important;flex-direction:column!important;align-items:center!important;justify-content:center!important;transition:opacity 0.6s ease!important;padding:24px!important;text-align:center!important;cursor:pointer!important;";
        splash.innerHTML = `
            <div style="border:1px solid #E0E0E8!important;border-radius:3px!important;padding:40px 28px 32px 28px!important;background:rgba(255,255,255,0.78)!important;max-width:280px!important;width:100%!important;box-sizing:border-box!important;position:relative!important;">
                <div style="font-size:8px;color:#9A9AA5!important;letter-spacing:2.4px;margin-bottom:20px;font-family:monospace;">SUMOUL APP · 37°33'N 126°58'E</div>
                <div class="smt-rain-line" style="width:1px!important;height:30px!important;background:#9A9AA5!important;margin:0 auto 20px auto!important;"></div>
                <div style="font-size:15px;font-weight:600;letter-spacing:3.2px;color:#3A3A40!important;margin-bottom:9px;">회색빛 서울의 새벽</div>
                <div style="font-size:9.5px;color:#7A7A85!important;line-height:1.85;letter-spacing:0.6px;">
                    “ 灰白首尔的黎明，你记忆停驻之处 ”<br>
                    <span style="font-size:7.5px;color:#A0A0AA!important;letter-spacing:1.4px;display:block;margin-top:5px;">MONOCHROME MEMORY ARCHIVE</span>
                </div>
                <div style="width:100%;height:1px;background:#EBEBF0!important;margin:24px 0 18px 0;overflow:hidden;">
                    <div style="height:100%;width:100%;background:#55555E!important;animation:smtThinLine 1.6s ease forwards;"></div>
                </div>
                <div style="display:inline-block;padding:6px 18px;background:#F6F6F9!important;border:1px solid #E4E4EC!important;border-radius:999px;font-size:8px;color:#55555E!important;letter-spacing:2px;font-weight:600;">
                    TOUCH TO ENTER · 触碰进入
                </div>
            </div>
            <div style="font-size:7.5px;color:#A5A5B0!important;letter-spacing:1.8px;margin-top:18px;">SUMOUL PRIVATE TERMINAL</div>
        `;

        // 覆盖并锁定点击才淡出，绝不重置回月亮图
        const poemNode = topDoc.getElementById("smt-splash-poem");
        if (poemNode) poemNode.removeAttribute("id");
        splash.onclick = () => splash.classList.add("fade-out");
    }
    patchCleanMelancholySplash();
})();
// ==========================================================================
// 🤍 【Sumoul App 终极防串页修复版补丁：100%根治情侣空间出现在其他页面的Bug！】
// 包含：1. 路由切换自动清场锁（绝不串页） 2. 纯白无边框泡泡韩系动态流(按最近聊天排序) 3. 满配独立情侣空间App
// ==========================================================================
(function () {
    const topWin = window.parent || window;
    const topDoc = topWin.document;

    function mountMomentsAndFullCoupleApp() {
        const modal = topDoc.getElementById("seoul-mini-theater-modal");
        const spacePage = topDoc.getElementById("smt-page-space");
        const homePage = topDoc.getElementById("smt-page-home");
        const fsBody = modal?.querySelector(".smt-fs-body");
        if (!modal || !spacePage || !homePage || !fsBody) {
            setTimeout(mountMomentsAndFullCoupleApp, 200);
            return;
        }

        // 🛡️ 1. 挂载旧ID防崩隐形护盾（防止主代码报错）
        if (!topDoc.getElementById("smt-legacy-shield")) {
            const shield = topDoc.createElement("div");
            shield.id = "smt-legacy-shield";
            shield.style.cssText = "display:none!important;";
            const legacyIds = [
                "smt-sp-hero-card", "smt-sp-char-scope-tag", "smt-sp-uava", "smt-sp-cava", "smt-sp-uname", "smt-sp-cname",
                "smt-sp-days", "smt-sp-mood", "smt-sp-couple-names", "smt-sp-live-bio", "smt-stat-pet", "smt-stat-petname",
                "smt-stat-fund", "smt-badge-pet", "smt-badge-bpm", "smt-badge-coupon", "smt-badge-todo", "smt-ab-ins-grid",
                "smt-ins-detail-pop", "smt-pet-name", "smt-pet-lv", "smt-pet-hunger-txt", "smt-pet-hunger-bar",
                "smt-pet-mood-txt", "smt-pet-mood-bar", "smt-pet-log", "smt-4cut-stage", "smt-qa-q", "smt-qa-my-txt",
                "smt-qa-char-label", "smt-qa-char-txt", "smt-mood-stage", "smt-coupon-list", "smt-coupon-log",
                "smt-sp-notes-list", "smt-sp-todo-list"
            ];
            shield.innerHTML = legacyIds.map((id) => `<div id="${id}"></div>`).join("");
            modal.appendChild(shield);
        }

        const K_RECENT_CHARS = "sumoul_v21_recent_chars";
        function recordRecentChar(name, ava) {
            if (!name || name === "PARTNER" || name === "GROUP") return;
            try {
                let list = JSON.parse(localStorage.getItem(K_RECENT_CHARS) || "[]");
                list = list.filter((x) => x.name !== name);
                list.unshift({ name, ava, time: Date.now() });
                localStorage.setItem(K_RECENT_CHARS, JSON.stringify(list.slice(0, 30)));
            } catch (e) {}
        }
        function getRecentCharMap() {
            try {
                const list = JSON.parse(localStorage.getItem(K_RECENT_CHARS) || "[]");
                const map = {};
                list.forEach((x) => { map[x.name] = x.time; });
                return map;
            } catch (e) { return {}; }
        }

        const mkIco = (d, sz = 17, stroke = "%232C2C32", fill = "none", sw = "1.8") => `<img src="data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='${fill}' stroke='${stroke}' stroke-width='${sw}' stroke-linecap='round' stroke-linejoin='round'%3E${d}%3C/svg%3E" style="width:${sz}px!important;height:${sz}px!important;display:inline-block!important;vertical-align:middle!important;pointer-events:none!important;" />`;

        const KR_ICO = {
            heart: mkIco("%3Cpath d='M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z'/%3E", 16, "%232C2C32", "none"),
            heartFill: mkIco("%3Cpath d='M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z'/%3E", 16, "%232C2C32", "%232C2C32"),
            cmt: mkIco("%3Cpath d='M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z'/%3E", 15, "%232C2C32", "none"),
            more: mkIco("%3Ccircle cx='12' cy='12' r='1.2'/%3E%3Ccircle cx='19' cy='12' r='1.2'/%3E%3Ccircle cx='5' cy='12' r='1.2'/%3E", 15, "%237A7A85", "none", "2.2"),
            dots: mkIco("%3Ccircle cx='12' cy='12' r='1.5' fill='%2355555E'/%3E%3Ccircle cx='18' cy='12' r='1.5' fill='%2355555E'/%3E%3Ccircle cx='6' cy='12' r='1.5' fill='%2355555E'/%3E", 20, "%2355555E", "none", "2"),
            plus: mkIco("%3Cline x1='12' y1='5' x2='12' y2='19'/%3E%3Cline x1='5' y1='12' x2='19' y2='12'/%3E", 10, "%23FFFFFF", "none", "2.5"),
            pin: mkIco("%3Cpath d='M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z'/%3E%3Ccircle cx='12' cy='10' r='3'/%3E", 11, "%238E8E98", "none", "1.8"),
            cam: mkIco("%3Crect width='18' height='18' x='3' y='3' rx='2'/%3E%3Ccircle cx='9' cy='9' r='2'/%3E%3Cpath d='m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21'/%3E", 20),
            pet: mkIco("%3Cpath d='M12 5c.67 0 1.35.09 2 .26 1.78-2 5.03-2.84 6.42-2.26 1.4.58-.42 7-.42 7 .57 1.07 1 2.24 1 3.44C21 17.9 16.97 12 21s-9-3.1-9-7.56c0-1.25.5-2.4 1-3.44 0 0-1.89-6.42-.5-7 1.39-.58 4.72.23 6.5 2.23A9.04 9.04 0 0 1 12 5Z'/%3E%3Cpath d='M8 14v.5M16 14v.5M11.25 16.25h1.5L12 17l-.75-.75Z'/%3E", 20),
            petBig: mkIco("%3Cpath d='M12 5c.67 0 1.35.09 2 .26 1.78-2 5.03-2.84 6.42-2.26 1.4.58-.42 7-.42 7 .57 1.07 1 2.24 1 3.44C21 17.9 16.97 12 21s-9-3.1-9-7.56c0-1.25.5-2.4 1-3.44 0 0-1.89-6.42-.5-7 1.39-.58 4.72.23 6.5 2.23A9.04 9.04 0 0 1 12 5Z'/%3E%3Cpath d='M8 14v.5M16 14v.5M11.25 16.25h1.5L12 17l-.75-.75Z'/%3E", 34),
            qa: mkIco("%3Cpath d='M7.9 20A9 9 0 1 0 4 16.1L2 22Z'/%3E%3Cpath d='M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3'/%3E", 20),
            wave: mkIco("%3Cpath d='M22 12h-4l-3 9L9 3l-3 9H2'/%3E", 20),
            ticket: mkIco("%3Cpath d='M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z'/%3E%3Cpath d='M13 5v2M13 17v2M13 11v2'/%3E", 20),
            note: mkIco("%3Cpath d='M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z'/%3E", 20),
            coin: mkIco("%3Ccircle cx='12' cy='12' r='9'/%3E%3Cpath d='M12 7v10M9 10h6M9 14h6'/%3E", 14, "%2355555E")
        };

        topDoc.getElementById("sumoul-ins-feed-css")?.remove();
        const st = topDoc.createElement("style");
        st.id = "sumoul-ins-feed-css";
        st.innerHTML = `
            #seoul-mini-theater-modal .smt-tab-item[data-page="space"] .smt-tab-ico {
                background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%237A7A85' stroke-width='1.7' stroke-linecap='round' stroke-linejoin='round'%3E%3Crect x='3' y='3' width='18' height='18' rx='5'/%3E%3Ccircle cx='12' cy='12' r='4'/%3E%3Ccircle cx='17.5' cy='6.5' r='1' fill='%237A7A85'/%3E%3C/svg%3E") !important;
            }
            #seoul-mini-theater-modal .smt-tab-item[data-page="space"].active .smt-tab-ico {
                background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%232C2C32' stroke-width='2.1' stroke-linecap='round' stroke-linejoin='round'%3E%3Crect x='3' y='3' width='18' height='18' rx='5'/%3E%3Ccircle cx='12' cy='12' r='4'/%3E%3Ccircle cx='17.5' cy='6.5' r='1' fill='%232C2C32'/%3E%3C/svg%3E") !important;
            }

            #seoul-mini-theater-modal #smt-page-space { padding: 0 2px 18px 2px !important; gap: 0 !important; background: #FFFFFF !important; }
            #seoul-mini-theater-modal .kr-notes-tray { display: flex !important; align-items: flex-end !important; gap: 15px !important; overflow-x: auto !important; padding: 24px 6px 12px 6px !important; background: transparent !important; border: none !important; border-bottom: 1px solid #F2F2F6 !important; margin-bottom: 8px !important; flex-shrink: 0 !important; scrollbar-width: none !important; }
            #seoul-mini-theater-modal .kr-notes-tray::-webkit-scrollbar { display: none !important; }
            #seoul-mini-theater-modal .kr-note-unit { display: flex !important; flex-direction: column !important; align-items: center !important; position: relative !important; cursor: pointer !important; flex-shrink: 0 !important; width: 64px !important; }

            #seoul-mini-theater-modal .ig-note-cloud {
                position: absolute !important; top: -14px !important; left: 50% !important; transform: translateX(-50%) !important;
                background: #FFFFFF !important; background-color: #FFFFFF !important; border: none !important; border-radius: 20px !important;
                padding: 5px 11px !important; z-index: 6 !important;
                box-shadow: 0 4px 14px rgba(20, 20, 30, 0.10), 0 1px 4px rgba(20, 20, 30, 0.05) !important;
                display: inline-flex !important; align-items: center !important; justify-content: center !important; min-width: 40px !important;
            }
            #seoul-mini-theater-modal .ig-note-cloud span { display: block !important; font-size: 9.2px !important; font-weight: 700 !important; color: #2C2C32 !important; white-space: nowrap !important; max-width: 68px !important; overflow: hidden !important; text-overflow: ellipsis !important; line-height: 1.2 !important; }
            #seoul-mini-theater-modal .ig-note-cloud::before { content: "" !important; position: absolute !important; bottom: -4px !important; left: 13px !important; width: 7.5px !important; height: 7.5px !important; border-radius: 50% !important; background: #FFFFFF !important; border: none !important; box-shadow: 0 3px 5px rgba(20, 20, 30, 0.07) !important; z-index: -1 !important; }
            #seoul-mini-theater-modal .ig-note-cloud::after { content: "" !important; position: absolute !important; bottom: -8px !important; left: 17px !important; width: 4.2px !important; height: 4.2px !important; border-radius: 50% !important; background: #FFFFFF !important; border: none !important; box-shadow: 0 2px 3px rgba(20, 20, 30, 0.08) !important; z-index: -2 !important; }
            #seoul-mini-theater-modal .ig-note-cloud.empty-hint span { color: #8E8E98 !important; font-size: 8.8px !important; font-weight: 700 !important; }

            #seoul-mini-theater-modal .kr-ava-ring { width: 56px !important; height: 56px !important; border-radius: 50% !important; padding: 2.5px !important; background: #FFFFFF !important; border: 1.5px solid rgba(58, 58, 64, 0.24) !important; display: flex !important; align-items: center !important; justify-content: center !important; box-sizing: border-box !important; position: relative !important; }
            #seoul-mini-theater-modal .kr-ava-ring.unread { border: 1.6px solid rgba(58, 58, 64, 0.52) !important; }
            #seoul-mini-theater-modal .kr-ava-inner { width: 100% !important; height: 100% !important; border-radius: 50% !important; overflow: hidden !important; background: #F4F4F8 !important; display: flex !important; align-items: center !important; justify-content: center !important; }
            #seoul-mini-theater-modal .kr-ava-inner img { width: 100% !important; height: 100% !important; object-fit: cover !important; display: block !important; }
            #seoul-mini-theater-modal .kr-ava-badge { position: absolute !important; right: -1px !important; bottom: -1px !important; width: 18px !important; height: 18px !important; border-radius: 50% !important; background: #484852 !important; border: 2px solid #FFFFFF !important; display: flex !important; align-items: center !important; justify-content: center !important; z-index: 4 !important; }
            #seoul-mini-theater-modal .kr-unit-name { font-size: 9px !important; font-weight: 700 !important; color: #2C2C32 !important; margin-top: 6px !important; white-space: nowrap !important; overflow: hidden !important; text-overflow: ellipsis !important; max-width: 62px !important; }

            #seoul-mini-theater-modal .kr-sub-nav { display: flex !important; align-items: center !important; justify-content: space-between !important; padding: 2px 2px 10px 2px !important; flex-shrink: 0 !important; }
            #seoul-mini-theater-modal .kr-clean-post { background: #F8F8FA !important; border: 1px solid #EAEAF0 !important; border-radius: 20px !important; padding: 14px !important; margin-bottom: 12px !important; }
            #seoul-mini-theater-modal .kr-post-head { display: flex !important; align-items: center !important; justify-content: space-between !important; margin-bottom: 10px !important; }
            #seoul-mini-theater-modal .kr-post-user { display: flex !important; align-items: center !important; gap: 9px !important; }
            #seoul-mini-theater-modal .kr-post-user img.post-ava { width: 36px !important; height: 36px !important; border-radius: 50% !important; object-fit: cover !important; border: 2px solid #FFFFFF !important; background: #FFFFFF !important; }
            #seoul-mini-theater-modal .kr-film-frame { background: #FFFFFF !important; border: 1px solid #EAEAF0 !important; border-radius: 15px !important; padding: 16px 15px !important; margin-bottom: 10px !important; position: relative !important; }
            #seoul-mini-theater-modal .kr-film-frame img.real-photo { width: 100% !important; max-height: 230px !important; object-fit: cover !important; border-radius: 10px !important; display: block !important; margin-bottom: 10px !important; }
            #seoul-mini-theater-modal .kr-film-meta { display: flex !important; justify-content: space-between !important; align-items: center !important; margin-bottom: 10px !important; padding-bottom: 7px !important; border-bottom: 1px solid #F2F2F6 !important; }
            #seoul-mini-theater-modal .kr-film-tag { font-size: 8px !important; font-weight: 700 !important; color: #484852 !important; background: #F4F4F8 !important; border: 1px solid #E6E6EC !important; border-radius: 99px !important; padding: 2px 8px !important; }
            #seoul-mini-theater-modal .kr-film-scene { font-size: 11px !important; font-weight: 600 !important; line-height: 1.68 !important; color: #3A3A40 !important; padding-left: 10px !important; border-left: 2.5px solid #484852 !important; }
            #seoul-mini-theater-modal .kr-post-caption { font-size: 11.5px !important; font-weight: 600 !important; line-height: 1.6 !important; color: #2C2C32 !important; margin-bottom: 10px !important; padding: 0 2px !important; }
            #seoul-mini-theater-modal .kr-post-bar { display: flex !important; align-items: center !important; justify-content: space-between !important; margin-bottom: 8px !important; }
            #seoul-mini-theater-modal .kr-act-pill { display: inline-flex !important; align-items: center !important; gap: 5px !important; height: 26px !important; padding: 0 10px !important; background: #FFFFFF !important; border: 1px solid #E6E6EC !important; border-radius: 999px !important; font-size: 9.5px !important; font-weight: 700 !important; color: #2C2C32 !important; cursor: pointer !important; }
            #seoul-mini-theater-modal .kr-cmt-list { background: #FFFFFF !important; border: 1px solid #EFEFF4 !important; border-radius: 12px !important; padding: 9px 11px !important; font-size: 10.2px !important; font-weight: 600 !important; line-height: 1.6 !important; }

            /* 🔥 核心修复：严格控制 #smt-page-couple_app 默认隐藏，只有带 .active 时才显示！ */
            #seoul-mini-theater-modal #smt-page-couple_app {
                display: none !important;
                flex-direction: column !important;
                flex: 1 !important;
                min-height: 0 !important;
                overflow-y: auto !important;
                padding: 2px 2px 20px 2px !important;
                gap: 11px !important;
            }
            #seoul-mini-theater-modal #smt-page-couple_app.active {
                display: flex !important;
            }

            #seoul-mini-theater-modal .cp-hero-box { background: #F8F8FA !important; border: 1px solid #EAEAF0 !important; border-radius: 22px !important; padding: 15px !important; background-size: cover !important; background-position: center !important; flex-shrink: 0 !important; }
            #seoul-mini-theater-modal .cp-hero-glass { background: rgba(255, 255, 255, 0.94) !important; border: 1px solid #EFEFF4 !important; border-radius: 17px !important; padding: 16px 12px 13px 12px !important; }
            #seoul-mini-theater-modal .cp-live-row { display: grid !important; grid-template-columns: 1.15fr 0.85fr !important; gap: 9px !important; flex-shrink: 0 !important; }
            #seoul-mini-theater-modal .cp-live-card { background: #F8F8FA !important; border: 1px solid #EAEAF0 !important; border-radius: 17px !important; padding: 12px 13px !important; cursor: pointer !important; display: flex !important; flex-direction: column !important; justify-content: space-between !important; }
            #seoul-mini-theater-modal .cp-bento-grid { display: grid !important; grid-template-columns: 1fr 1fr !important; gap: 9px !important; flex-shrink: 0 !important; }
            #seoul-mini-theater-modal .cp-bento-card { background: #F8F8FA !important; border: 1px solid #EAEAF0 !important; border-radius: 18px !important; padding: 13px 14px !important; cursor: pointer !important; display: flex !important; flex-direction: column !important; justify-content: space-between !important; min-height: 88px !important; transition: transform 0.14s ease !important; }
            #seoul-mini-theater-modal .cp-bento-card:active { transform: scale(0.97) !important; }
            #seoul-mini-theater-modal .cp-bento-top { display: flex !important; align-items: center !important; justify-content: space-between !important; margin-bottom: 9px !important; }
            #seoul-mini-theater-modal .cp-bento-ico { width: 38px !important; height: 38px !important; border-radius: 12px !important; background: #FFFFFF !important; border: 1px solid #E6E6EC !important; display: flex !important; align-items: center !important; justify-content: center !important; }
            #seoul-mini-theater-modal .cp-bento-badge { font-size: 8px !important; font-weight: 700 !important; color: #484852 !important; background: #FFFFFF !important; border: 1px solid #EAEAF0 !important; border-radius: 99px !important; padding: 2.5px 8px !important; }
            #seoul-mini-theater-modal .smt-ticket-card { display: flex !important; align-items: stretch !important; background: #FFFFFF !important; border: 1px solid #E6E6EC !important; border-radius: 13px !important; margin-bottom: 8px !important; overflow: hidden !important; }
            #seoul-mini-theater-modal .smt-ticket-left { flex: 1 !important; padding: 10px 12px !important; border-right: 1.5px dashed #E4E4EC !important; }
            #seoul-mini-theater-modal .smt-ticket-right { width: 72px !important; background: #F8F8FA !important; display: flex !important; flex-direction: column !important; align-items: center !important; justify-content: center !important; padding: 6px !important; cursor: pointer !important; }
        `;
        topDoc.head.appendChild(st);

        const tab2 = modal.querySelector('.smt-tab-item[data-page="space"]');
        if (tab2) {
            tab2.setAttribute("data-title", "SUMOUL FEED · 피드");
            tab2.setAttribute("data-sub", "Moments & Stories · 动态");
            const txtEl = tab2.querySelector(".smt-tab-txt");
            if (txtEl) txtEl.textContent = "动态";
        }

        // 构建主页独立的【情侣空间 App (#smt-page-couple_app)】
        topDoc.getElementById("smt-page-couple_app")?.remove();
        const coupleAppPage = topDoc.createElement("div");
        coupleAppPage.id = "smt-page-couple_app";
        coupleAppPage.className = "smt-page";
        coupleAppPage.innerHTML = `
            <div class="cp-hero-box" id="cp-app-hero-bg">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">
                    <span style="font-size:8px;font-weight:800;color:#484852;background:rgba(255,255,255,0.9);border:1px solid #EAEAF0;border-radius:99px;padding:3px 9px;letter-spacing:.6px;" id="cp-app-scope-tag">COUPLE ARCHIVE</span>
                    <div style="display:flex;gap:5px;">
                        <span class="smt-pill-btn" id="cp-app-bg-btn" style="height:21px!important;font-size:8px!important;">换背景</span>
                        <span class="smt-pill-btn" id="cp-app-mood-btn" style="height:21px!important;font-size:8px!important;">36.7°C</span>
                        <span class="smt-pill-btn" id="cp-app-reset-btn" style="height:21px!important;font-size:8px!important;">重置</span>
                    </div>
                </div>
                <div class="cp-hero-glass">
                    <div style="display:grid;grid-template-columns:1fr 1.15fr 1fr;align-items:center;text-align:center;padding-bottom:12px;border-bottom:1px dashed #EAEAF0;">
                        <div>
                            <img id="cp-app-uava" src="" style="width:52px;height:52px;border-radius:50%;object-fit:cover;border:2px solid #F4F4F8;padding:2px;background:#FFF;" />
                            <div style="font-size:10px;font-weight:800;color:#2C2C32;margin-top:4px;" id="cp-app-uname">ME</div>
                        </div>
                        <div id="cp-app-date-btn" style="cursor:pointer;" title="点击修改相恋纪念日">
                            <div style="font-size:8px;font-weight:700;color:#9A9AA5;letter-spacing:1.2px;">IN LOVE FOR</div>
                            <div style="font-size:21px;font-weight:800;color:#2C2C32;margin:2px 0;" id="cp-app-days">D+100</div>
                            <div style="margin:2px auto;width:64px;height:12px;"><svg viewBox="0 0 80 16" width="64" height="12" fill="none" stroke="#6E6E77" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M2 8h20l5-6 6 12 5-9 4 3h36"/></svg></div>
                            <div style="font-size:7.8px;font-weight:700;color:#8E8E98;">기념일 · 改日期 ✎</div>
                        </div>
                        <div>
                            <img id="cp-app-cava" src="" style="width:52px;height:52px;border-radius:50%;object-fit:cover;border:2px solid #F4F4F8;padding:2px;background:#FFF;" />
                            <div style="font-size:10px;font-weight:800;color:#2C2C32;margin-top:4px;" id="cp-app-cname">PARTNER</div>
                        </div>
                    </div>
                    <div style="display:flex;justify-content:space-between;align-items:center;padding-top:10px;font-size:9.5px;font-weight:600;color:#484852;">
                        <span id="cp-app-live-txt" style="flex:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">🏠 同居实况：正在安静地陪在你身边</span>
                        <span class="smt-pill-btn dark" id="cp-app-live-btn" style="height:21px!important;font-size:8px!important;margin-left:6px!important;">↻ 刷新TA状态</span>
                    </div>
                </div>
            </div>

            <div class="cp-live-row">
                <div class="cp-live-card" data-cpopen="sp_mood">
                    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:5px;">
                        <span style="font-size:8px;font-weight:800;color:#8E8E98;">HEART TELEPATHY · 波频</span>
                        <span style="font-size:8px;font-weight:800;color:#2C2C32;background:#FFF;padding:1.5px 6px;border-radius:99px;border:1px solid #EAEAF0;" id="cp-w-bpm">96 BPM</span>
                    </div>
                    <div style="font-size:10.2px;font-weight:700;color:#2C2C32;line-height:1.45;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;" id="cp-w-os">“怎么还不找我聊天……”</div>
                </div>
                <div class="cp-live-card" data-cpopen="sp_coupon">
                    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;">
                        <span style="font-size:8px;font-weight:800;color:#8E8E98;">LOVE BANK · 金库</span>
                        ${KR_ICO.coin}
                    </div>
                    <div style="font-size:13.5px;font-weight:800;color:#2C2C32;" id="cp-w-fund">₩520,000</div>
                    <div style="font-size:8px;font-weight:700;color:#7A7A85;margin-top:2px;" id="cp-w-pet">萌宠: 모찌 LV.2</div>
                </div>
            </div>

            <div class="cp-bento-grid">
                <div class="cp-bento-card" data-cpopen="sp_pet">
                    <div class="cp-bento-top"><div class="cp-bento-ico">${KR_ICO.pet}</div><span class="cp-bento-badge" id="cp-b-pet">LV.2</span></div>
                    <div><div style="font-size:11px;font-weight:800;color:#2C2C32;">云养萌宠屋</div><div style="font-size:8.5px;font-weight:600;color:#8E8E98;margin-top:2px;">投喂/洗香香/散步/养宠日志</div></div>
                </div>
                <div class="cp-bento-card" data-cpopen="sp_4cut">
                    <div class="cp-bento-top"><div class="cp-bento-ico">${KR_ICO.cam}</div><span class="cp-bento-badge" id="cp-b-4cut">3款相纸</span></div>
                    <div><div style="font-size:11px;font-weight:800;color:#2C2C32;">人生四格馆</div><div style="font-size:8.5px;font-weight:600;color:#8E8E98;margin-top:2px;">3色相纸切换与历史相册墙</div></div>
                </div>
                <div class="cp-bento-card" data-cpopen="sp_qa">
                    <div class="cp-bento-top"><div class="cp-bento-ico">${KR_ICO.qa}</div><span class="cp-bento-badge" id="cp-b-qa">Q&amp;A手账</span></div>
                    <div><div style="font-size:11px;font-weight:800;color:#2C2C32;">灵魂百问箱</div><div style="font-size:8.5px;font-weight:600;color:#8E8E98;margin-top:2px;">自主出题/真心话/问答归档册</div></div>
                </div>
                <div class="cp-bento-card" data-cpopen="sp_mood">
                    <div class="cp-bento-top"><div class="cp-bento-ico">${KR_ICO.wave}</div><span class="cp-bento-badge" id="cp-b-mood">查衣兜</span></div>
                    <div><div style="font-size:11px;font-weight:800;color:#2C2C32;">同居波频室</div><div style="font-size:8.5px;font-weight:600;color:#8E8E98;margin-top:2px;">心率/醋意值/翻口袋/背后抱</div></div>
                </div>
                <div class="cp-bento-card" data-cpopen="sp_coupon">
                    <div class="cp-bento-top"><div class="cp-bento-ico">${KR_ICO.ticket}</div><span class="cp-bento-badge" id="cp-b-coupon">特权券</span></div>
                    <div><div style="font-size:11px;font-weight:800;color:#2C2C32;">金库与兑换券</div><div style="font-size:8.5px;font-weight:600;color:#8E8E98;margin-top:2px;">双人存钱罐与特权券核销</div></div>
                </div>
                <div class="cp-bento-card" data-cpopen="sp_guest">
                    <div class="cp-bento-top"><div class="cp-bento-ico">${KR_ICO.note}</div><span class="cp-bento-badge" id="cp-b-guest">留言板</span></div>
                    <div><div style="font-size:11px;font-weight:800;color:#2C2C32;">纪念日与留言</div><div style="font-size:8.5px;font-weight:600;color:#8E8E98;margin-top:2px;">纪念日倒数/悄悄话/百事单</div></div>
                </div>
            </div>

            <div class="smt-section-box" style="margin-bottom:0!important;padding:10px 13px!important;cursor:pointer;" data-cpopen="sp_guest">
                <div style="display:flex;justify-content:space-between;font-size:8.5px;font-weight:800;color:#8E8E98;margin-bottom:3px;">
                    <span>💌 LATEST WHISPER · 双人留言板最新悄悄话</span><span>查看全部 ▸</span>
                </div>
                <div id="cp-app-latest-note" style="font-size:10.5px;font-weight:600;color:#2C2C32;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">点击进入写下第一句悄悄话...</div>
            </div>
        `;
        fsBody.appendChild(coupleAppPage);

        // 升级 6 大子页面内部结构
        topDoc.getElementById("smt-page-sp_pet").innerHTML = `
            <div class="smt-section-box" style="text-align:center;">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">
                    <span style="font-size:9px;font-weight:800;color:#8E8E98;">COUPLE PET ROOM · 双人萌宠屋</span>
                    <div style="display:flex;gap:5px;"><span class="smt-pill-btn" id="cp-pet-room-btn">换小窝家具</span><span class="smt-pill-btn" id="cp-pet-rename-btn">改名字</span></div>
                </div>
                <div style="background:#FFF;border:1px solid #EAEAF0;border-radius:16px;padding:16px 12px;margin-bottom:10px;">
                    <div style="font-size:8.5px;font-weight:700;color:#8E8E98;margin-bottom:8px;" id="cp-pet-room-tag">当前布置：暖阳羊毛地毯</div>
                    <div style="width:66px;height:66px;border-radius:20px;background:#F8F8FA;border:1.5px solid #EAEAF0;margin:0 auto 8px auto;display:flex;align-items:center;justify-content:center;">${KR_ICO.petBig}</div>
                    <div style="font-size:14px;font-weight:800;color:#2C2C32;" id="cp-pet-name">모찌 (糯米团)</div>
                    <div style="font-size:9px;font-weight:600;color:#7A7A85;margin:3px 0 12px 0;" id="cp-pet-lv">LV.2</div>
                    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;text-align:left;background:#F8F8FA;padding:10px;border-radius:12px;">
                        <div><div style="display:flex;justify-content:space-between;font-size:8.5px;font-weight:700;"><span>饱食</span><b id="cp-pet-h-txt">85%</b></div><div class="smt-bar-bg"><div class="smt-bar-fill" id="cp-pet-h-bar" style="width:85%;"></div></div></div>
                        <div><div style="display:flex;justify-content:space-between;font-size:8.5px;font-weight:700;"><span>心情</span><b id="cp-pet-m-txt">92%</b></div><div class="smt-bar-bg"><div class="smt-bar-fill" id="cp-pet-m-bar" style="width:92%;"></div></div></div>
                        <div><div style="display:flex;justify-content:space-between;font-size:8.5px;font-weight:700;"><span>清洁</span><b id="cp-pet-c-txt">95%</b></div><div class="smt-bar-bg"><div class="smt-bar-fill" id="cp-pet-c-bar" style="width:95%;"></div></div></div>
                    </div>
                </div>
                <div id="cp-pet-log" style="background:#FFF;border:1px solid #EAEAF0;border-radius:12px;padding:11px 12px;font-size:11px;font-weight:600;line-height:1.65;text-align:left;margin-bottom:10px;"></div>
                <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:5px;margin-bottom:7px;">
                    <span class="smt-pill-btn" id="cp-pet-feed">喂冻干</span>
                    <span class="smt-pill-btn" id="cp-pet-pat">揉肚皮</span>
                    <span class="smt-pill-btn" id="cp-pet-bath">洗香香</span>
                    <span class="smt-pill-btn dark" id="cp-pet-play">✦ 让TA陪玩</span>
                </div>
                <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;">
                    <span class="smt-pill-btn" id="cp-pet-walk">✦ 和TA带宠物出门散步</span>
                    <span class="smt-pill-btn" id="cp-pet-diary">✦ 看TA写的观察宠物手记</span>
                </div>
            </div>
            <div class="smt-section-box"><div class="smt-sec-title"><span>PET DIARY · 养宠成长日志</span></div><div id="cp-pet-hist"></div></div>
        `;

        topDoc.getElementById("smt-page-sp_4cut").innerHTML = `
            <div class="smt-section-box">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;flex-wrap:wrap;gap:5px;">
                    <div style="display:flex;gap:4px;">
                        <span class="smt-pill-btn dark" data-cutstyle="light">纯白相纸</span>
                        <span class="smt-pill-btn" data-cutstyle="gray">柔雾灰框</span>
                        <span class="smt-pill-btn" data-cutstyle="dark">深灰暗房</span>
                    </div>
                    <div style="display:flex;gap:4px;">
                        <span class="smt-pill-btn" id="cp-4cut-topic-btn">指定主题拍</span>
                        <span class="smt-pill-btn dark" id="cp-4cut-gen-btn">✦ 立即连拍四格</span>
                    </div>
                </div>
                <div id="cp-4cut-stage" style="text-align:center;"></div>
            </div>
            <div class="smt-section-box"><div class="smt-sec-title"><span>PHOTO ALBUM · 往期人生四格相册墙</span></div><div id="cp-4cut-album"></div></div>
        `;

        topDoc.getElementById("smt-page-sp_qa").innerHTML = `
            <div class="smt-section-box">
                <div class="smt-sec-title">
                    <span>LOVE Q&amp;A · 情侣灵魂提问箱</span>
                    <div style="display:flex;gap:4px;"><span class="smt-pill-btn" id="cp-qa-custom">自己出题</span><span class="smt-pill-btn" id="cp-qa-next">换一题</span><span class="smt-pill-btn dark" id="cp-qa-ai">✦ 让TA作答</span></div>
                </div>
                <div style="background:#FFF;border:1px solid #EAEAF0;border-radius:12px;padding:12px;margin-bottom:9px;">
                    <div style="font-size:8px;font-weight:800;color:#8E8E98;margin-bottom:3px;">TODAY'S QUESTION</div>
                    <div style="font-size:12px;font-weight:800;line-height:1.55;color:#2C2C32;" id="cp-qa-q"></div>
                </div>
                <div style="background:#FFF;border:1px solid #EAEAF0;border-radius:12px;padding:11px;margin-bottom:8px;cursor:pointer;" id="cp-qa-my-box">
                    <div style="font-size:8px;font-weight:800;color:#8E8E98;margin-bottom:3px;">MY ANSWER · 点击填写我的回答</div>
                    <div style="font-size:11px;font-weight:600;line-height:1.6;" id="cp-qa-my"></div>
                </div>
                <div style="background:#FFF;border:1px solid #EAEAF0;border-radius:12px;padding:11px;margin-bottom:9px;">
                    <div style="font-size:8px;font-weight:800;color:#8E8E98;margin-bottom:3px;" id="cp-qa-char-lbl">PARTNER'S ANSWER</div>
                    <div style="font-size:11px;font-weight:600;line-height:1.6;" id="cp-qa-char"></div>
                </div>
                <div style="text-align:right;"><span class="smt-pill-btn dark" id="cp-qa-save">✓ 封存进双人问答手账本</span></div>
            </div>
            <div class="smt-section-box"><div class="smt-sec-title"><span>Q&amp;A ARCHIVE · 往期灵魂问答手账</span></div><div id="cp-qa-hist"></div></div>
        `;

        topDoc.getElementById("smt-page-sp_mood").innerHTML = `
            <div class="smt-section-box">
                <div class="smt-sec-title"><span>HEARTBEAT &amp; POCKET · 实时同居波频监测</span><span class="smt-pill-btn dark" id="cp-mood-sync">↻ 实时感应TA状态</span></div>
                <div id="cp-mood-stage"></div>
                <div style="display:grid;grid-template-columns:1fr 1fr;gap:7px;margin-top:10px;">
                    <span class="smt-pill-btn" id="cp-mood-hug" style="height:30px!important;">✦ 悄悄从背后抱住TA</span>
                    <span class="smt-pill-btn dark" id="cp-mood-pocket" style="height:30px!important;">✦ 突击翻看TA的衣兜</span>
                </div>
            </div>
        `;

        topDoc.getElementById("smt-page-sp_coupon").innerHTML = `
            <div class="smt-section-box">
                <div class="smt-sec-title"><span>COUPLE BANK · 双人共同恋爱小金库</span><div style="display:flex;gap:4px;"><span class="smt-pill-btn" id="cp-fund-me">＋ 我存一笔</span><span class="smt-pill-btn dark" id="cp-fund-ai">✦ 让TA存一笔</span></div></div>
                <div style="background:#FFF;border:1px solid #EAEAF0;border-radius:12px;padding:12px;display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
                    <div><div style="font-size:8px;font-weight:800;color:#8E8E98;">TOTAL LOVE FUND · 共同储蓄</div><div style="font-size:19px;font-weight:800;color:#2C2C32;margin-top:2px;" id="cp-fund-total">₩520,000</div></div>
                    <span style="font-size:8px;font-weight:800;background:#F8F8FA;border:1px solid #ECECF2;padding:3px 9px;border-radius:99px;">JOINT ACCOUNT</span>
                </div>
                <div id="cp-fund-logs" style="max-height:90px;overflow-y:auto;"></div>
            </div>
            <div class="smt-section-box">
                <div class="smt-sec-title"><span>LOVE COUPON · 情侣特权兑换券</span><span class="smt-pill-btn" id="cp-coupon-add">＋ 自定义新券</span></div>
                <div id="cp-coupon-list"></div>
                <div id="cp-coupon-log" style="background:#FFF;border:1px dashed #D5D5DE;border-radius:12px;padding:11px;font-size:11px;font-weight:600;line-height:1.65;margin-top:8px;"></div>
            </div>
        `;

        topDoc.getElementById("smt-page-sp_guest").innerHTML = `
            <div class="smt-section-box">
                <div class="smt-sec-title"><span>ANNIVERSARY · 重要纪念日倒数</span><span class="smt-pill-btn" id="cp-anni-add">＋ 添加纪念日</span></div>
                <div id="cp-anni-list" style="display:grid;grid-template-columns:repeat(2,1fr);gap:7px;"></div>
            </div>
            <div class="smt-section-box">
                <div class="smt-sec-title"><span>GUESTBOOK · 双人悄悄话留言板</span><span class="smt-pill-btn dark" id="cp-note-ai">✦ 让TA主动留言</span></div>
                <div id="cp-notes-list" style="max-height:160px;overflow-y:auto;margin-bottom:8px;"></div>
                <div style="display:flex;gap:5px;"><input type="text" id="cp-note-inp" class="smt-wx-input" placeholder="방명록 남기기... 写下悄悄话让TA回复" /><span class="smt-pill-btn dark" id="cp-note-send" style="height:30px!important;padding:0 12px!important;">留言</span></div>
            </div>
            <div class="smt-section-box">
                <div class="smt-sec-title"><span id="cp-todo-stat">WISH LIST · 恋爱百事清单</span><span class="smt-pill-btn" id="cp-todo-add">＋ 新增心愿</span></div>
                <div class="smt-bar-bg" style="margin-bottom:9px!important;"><div class="smt-bar-fill" id="cp-todo-bar" style="width:50%;"></div></div>
                <div id="cp-todo-list"></div>
            </div>
        `;

        const homeDockGrid = homePage.querySelector(".ab-dock-grid");
        if (homeDockGrid && !topDoc.getElementById("smt-home-open-couple-app")) {
            homeDockGrid.style.setProperty("grid-template-columns", "repeat(4, 1fr)", "important");
            const cpAppBtn = topDoc.createElement("div");
            cpAppBtn.className = "ab-app-item";
            cpAppBtn.id = "smt-home-open-couple-app";
            cpAppBtn.innerHTML = `<div class="ab-app-squircle">${KR_ICO.heart}</div><div class="ab-app-title">情侣空间</div><div class="ab-app-kr">COUPLE APP</div>`;
            homeDockGrid.prepend(cpAppBtn);
        }

        // 构建第 2 栏「动态流」骨架
        spacePage.innerHTML = `
            <div class="kr-notes-tray" id="smt-ins-stories-bar"></div>
            <div id="smt-story-viewer" style="display:none;background:#F8F8FA!important;border:1px solid #E6E6EC!important;border-radius:16px!important;padding:12px 14px!important;margin-bottom:10px!important;flex-shrink:0!important;"></div>
            <div class="kr-sub-nav">
                <div style="display:flex;gap:5px;">
                    <span class="smt-pill-btn dark" data-feedfilter="all">全部动态</span>
                    <span class="smt-pill-btn" data-feedfilter="char" id="smt-filter-char-btn">只看TA</span>
                </div>
                <div style="display:flex;gap:5px;">
                    <span class="smt-pill-btn" id="smt-mom-user-post">＋ 我发日常</span>
                    <span class="smt-pill-btn dark" id="smt-mom-ai-post">✦ 让TA发新帖</span>
                </div>
            </div>
            <div id="smt-mom-post-drawer" class="smt-section-box" style="display:none;margin-bottom:10px!important;flex-shrink:0;">
                <div style="font-size:9.5px;font-weight:700;color:#2C2C32;margin-bottom:6px;">새 게시물 · 发布我的新动态 (发布后TA与好友会自动回复)</div>
                <textarea id="smt-mom-post-txt" style="width:100%;height:52px;background:#FFF;border:1px solid #E4E4EC;border-radius:9px;padding:7px;font-size:10.5px;font-weight:600;box-sizing:border-box;resize:none;margin-bottom:6px;outline:none;" placeholder="写下一句心情..."></textarea>
                <input type="text" id="smt-mom-post-img" class="smt-wx-input" style="width:100%;height:26px!important;font-size:9.5px!important;box-sizing:border-box;margin-bottom:7px;" placeholder="照片画面描述 或 粘贴图片URL (选填)..." />
                <div style="display:flex;justify-content:flex-end;gap:5px;">
                    <span class="smt-pill-btn" id="smt-mom-post-cancel">取消</span>
                    <span class="smt-pill-btn dark" id="smt-mom-post-submit">发布</span>
                </div>
            </div>
            <div id="smt-mom-stream" style="flex:1;min-height:0;overflow-y:auto;padding-bottom:16px;"></div>
        `;

        function getCtx() {
            let userName = "ME", charName = "", charScopeId = "";
            let userAvatar = "https://i.postimg.cc/rydS6NvG/IMG-3866.jpg", charAvatar = "https://i.postimg.cc/QC3CQ218/IMG-4147.jpg";
            let charDesc = "", recentChat = "";
            let otherChars = [], totalOtherCount = 0;

            try {
                const st = topWin.SillyTavern?.getContext?.();
                if (st) {
                    userName = st.name1 || userName;
                    if (st.characterId !== undefined && st.characters?.[st.characterId]) {
                        const c = st.characters[st.characterId];
                        charName = c.name || st.name2 || "";
                        charScopeId = c.avatar || c.name || String(st.characterId);
                        if (c.avatar) charAvatar = `/characters/${encodeURIComponent(c.avatar)}`;
                        charDesc = [c.description, c.personality, c.scenario].filter(Boolean).join("\n");
                    } else if (st.groupId) {
                        charScopeId = "group_" + String(st.groupId); charName = st.name2 || "GROUP";
                    } else if (st.name2) {
                        charName = st.name2; charScopeId = st.name2;
                    }
                    if (Array.isArray(st.chat) && st.chat.length) {
                        recentChat = st.chat.slice(-8).map((m) => `${m.is_user ? userName : (charName || "TA")}: ${m.mes}`).join("\n");
                    }
                    if (charName) recordRecentChar(charName, charAvatar);
                    const recentMap = getRecentCharMap();

                    if (Array.isArray(st.characters) && st.characters.length > 0) {
                        const allOthers = st.characters
                            .filter((ch, idx) => ch && ch.name && String(idx) !== String(st.characterId) && ch.name !== charName)
                            .map((ch) => {
                                const stLastTime = Number(ch.date_last_chat) || Date.parse(ch.date_last_chat || "") || Number(ch.create_date) || 0;
                                const localTime = recentMap[ch.name] || 0;
                                return {
                                    name: ch.name,
                                    ava: ch.avatar ? `/characters/${encodeURIComponent(ch.avatar)}` : "https://i.postimg.cc/vmsDSqmk/IMG-3926.jpg",
                                    sortScore: Math.max(localTime, stLastTime),
                                    story: `【${ch.name} 的限时快拍】最近与你聊过天，更新了一条日常随手拍动态。`
                                };
                            })
                            .sort((a, b) => b.sortScore - a.sortScore);
                        totalOtherCount = allOthers.length;
                        otherChars = allOthers.slice(0, 3);
                    }
                }
            } catch (e) {}

            const selCh = topDoc.querySelector("#rm_button_selected_ch h2, #character_name_pole");
            if (!charName && selCh?.textContent?.trim()) charName = selCh.textContent.trim();

            const aiMes = topDoc.querySelectorAll('#chat .mes:not([is_user="true"]):not(.is_user)');
            if (aiMes.length > 0) {
                const lastAi = aiMes[aiMes.length - 1];
                charName = lastAi.querySelector(".name_text")?.textContent?.trim() || charName;
                charAvatar = lastAi.querySelector(".avatar img")?.src || charAvatar;
            }
            const uMes = topDoc.querySelectorAll('#chat .mes[is_user="true"], #chat .mes.is_user');
            if (uMes.length > 0) {
                const lastU = uMes[uMes.length - 1];
                userName = lastU.querySelector(".name_text")?.textContent?.trim() || userName;
                userAvatar = lastU.querySelector(".avatar img")?.src || userAvatar;
            }
            if (!charName) charName = "PARTNER";
            if (!charScopeId) charScopeId = charName;
            recordRecentChar(charName, charAvatar);

            if (otherChars.length === 0) {
                try {
                    const cachedList = JSON.parse(localStorage.getItem(K_RECENT_CHARS) || "[]").filter((x) => x.name !== charName);
                    totalOtherCount = cachedList.length;
                    otherChars = cachedList.slice(0, 3).map((x) => ({
                        name: x.name, ava: x.ava || "https://i.postimg.cc/vmsDSqmk/IMG-3926.jpg",
                        story: `【${x.name} 的限时快拍】最近与你聊过天，更新了一条日常状态。`
                    }));
                } catch (e) {}
            }

            const safeScope = String(charScopeId).replace(/[^a-zA-Z0-9_\u4e00-\u9fa5\uac00-\ud7af-]/g, "_");
            try {
                const wRaw = localStorage.getItem(`sumoul_v16_wxcfg__${safeScope}`) || localStorage.getItem(`seoul_v15_wxcfg__${safeScope}`);
                if (wRaw) {
                    const wc = JSON.parse(wRaw);
                    if (wc.myNick) userName = wc.myNick;
                    if (wc.remark) charName = wc.remark;
                    if (wc.myAva) userAvatar = wc.myAva;
                    if (wc.charAva) charAvatar = wc.charAva;
                }
            } catch (e) {}
            return { userName, charName, safeScope, userAvatar, charAvatar, charDesc, recentChat, otherChars, totalOtherCount };
        }

        async function askAI(sys, usr) {
            const u = topDoc.getElementById("smt-api-url")?.value?.trim().replace(/\/+$/, "");
            const k = topDoc.getElementById("smt-api-key")?.value?.trim();
            const m = topDoc.getElementById("smt-api-model")?.value?.trim() || "gpt-4o-mini";
            if (!u || !k) {
                topDoc.querySelector('.smt-tab-item[data-page="api"]')?.click();
                throw new Error("请先在【05.API设置】填写独立 API 地址与 Key！");
            }
            const endpoint = u.endsWith("/chat/completions") ? u : (u.endsWith("/v1") ? `${u}/chat/completions` : `${u}/v1/chat/completions`);
            const r = await fetch(endpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json", "Authorization": `Bearer ${k}` },
                body: JSON.stringify({ model: m, temperature: 0.85, messages: [{ role: "system", content: sys }, { role: "user", content: usr }] })
            });
            if (!r.ok) throw new Error(`API HTTP ${r.status}`);
            const d = await r.json();
            return d?.choices?.[0]?.message?.content?.trim() || "";
        }

        function nowTime() { const d = new Date(); return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`; }

        const CP_QUESTIONS = [
            "第一次悄悄对彼此产生超越普通关系的占有欲，是在哪个瞬间？",
            "如果今晚首尔突然停电，只有我们两个人被困在家里，最想一起做什么？",
            "对方身上有一个连TA自己都没察觉到、但你却觉得很可爱的小习惯是什么？",
            "手机相册里最舍不得删掉的一张和对方有关的照片（或截图）是什么？",
            "吵架或冷战的时候，对方做什么动作会让你瞬间心软投降？",
            "如果此刻可以向对方提一个绝对不会被拒绝的任性要求，你会提什么？"
        ];

        function getCpKey() { return `sumoul_v21_cpspace__${getCtx().safeScope}`; }
        function getDefaultCp(charName) {
            return {
                startDate: "2024-05-20", mood: "36.7°C · SWEET HOME", bgUrl: "",
                charNow: "正在小厨房给你热牛奶",
                fund: 520000,
                fundLogs: [{ who: "SYSTEM", text: "共同恋爱小金库已开启", amt: "+₩520,000" }],
                anniversaries: [{ name: "相恋纪念日", date: "2024-05-20" }, { name: "下一次旅行", date: "2025-12-25" }],
                pet: { name: "모찌 (糯米团)", lv: 2, hunger: 85, mood: 92, clean: 95, roomItem: "暖阳羊毛地毯", lastLog: `与 ${charName} 共同领养的小宠物正蜷在地毯上打呼噜。`, history: [] },
                life4cut: { style: "light", date: "SUMOUL STUDIO", frames: [`点击右上角「立即连拍四格」，生成你与 ${charName} 的专属四连拍。`, "第二格画面捕捉眼神交汇", "第三格画面定格亲昵动作", "第四格画面专属甜蜜瞬间"], sign: `${charName} & ME`, album: [] },
                qaIndex: 0, customQ: "", qaUserAns: "点击此处写下你的回答...", qaCharAns: `点击右上角「让TA作答」揭晓...`, qaHistory: [],
                moodSync: { room: "卧室落地窗", action: "刚洗完澡擦着头发，正看着手机等你的消息", temp: "36.8°C", bpm: "96 BPM", miss: "99%", jealousy: "75%", pocket: "手机（锁屏是合照）、薄荷糖、给你的备用发圈", os: "“怎么还不找我聊天……”" },
                coupons: [
                    { title: "무조건 화해권 · 无条件和好券", desc: "无论谁生闷气，出示此券必须立刻拥抱和好", used: 0 },
                    { title: "심야 호출권 · 深夜随叫随到券", desc: "凌晨任何时候想见TA，TA都会立刻出现在你面前", used: 0 },
                    { title: "소원 들어주기 · 任性要求实现券", desc: "向TA提一个平时不好意思说的小要求，绝对服从", used: 0 }
                ],
                couponLog: `点击上方任意特权券右侧的「核销」，即可触发 ${charName} 的专属履约反应！`,
                notes: [{ author: charName, text: "以后想说什么悄悄话，都可以留在这里给我。", time: "置顶" }],
                todos: [{ text: "在首尔街头拍一次人生四格", done: true }, { text: "一起戴同一副耳机听完整张歌单", done: false }, { text: "下雨天共撑一把伞去便利店买关东煮", done: false }]
            };
        }
        function loadCp() {
            const c = getCtx(), k = getCpKey();
            try {
                const raw = localStorage.getItem(k);
                if (!raw) { const d = getDefaultCp(c.charName); localStorage.setItem(k, JSON.stringify(d)); return d; }
                return Object.assign(getDefaultCp(c.charName), JSON.parse(raw));
            } catch (e) { return getDefaultCp(c.charName); }
        }
        function saveCp(d) { localStorage.setItem(getCpKey(), JSON.stringify(d)); }

        function renderStandaloneCoupleSpace() {
            try {
                const c = getCtx(), sp = loadCp();
                const diffDays = Math.max(1, Math.floor((Date.now() - new Date(sp.startDate || "2024-05-20").getTime()) / 86400000));
                const daysNum = isNaN(diffDays) ? 100 : diffDays;

                const heroBg = topDoc.getElementById("cp-app-hero-bg");
                if (heroBg) heroBg.style.backgroundImage = sp.bgUrl ? `url('${sp.bgUrl}')` : "none";
                topDoc.getElementById("cp-app-scope-tag").textContent = `${c.charName} · COUPLE SPACE`;
                topDoc.getElementById("cp-app-uava").src = c.userAvatar;
                topDoc.getElementById("cp-app-cava").src = c.charAvatar;
                topDoc.getElementById("cp-app-uname").textContent = c.userName;
                topDoc.getElementById("cp-app-cname").textContent = c.charName;
                topDoc.getElementById("cp-app-days").textContent = `D+${daysNum}`;
                topDoc.getElementById("cp-app-mood-btn").textContent = sp.mood || "36.7°C";
                topDoc.getElementById("cp-app-live-txt").textContent = `🏠 ${c.charName}此刻：${sp.charNow || sp.moodSync?.action || "陪在你身边"}`;

                const pet = sp.pet || getDefaultCp(c.charName).pet;
                const ms = sp.moodSync || getDefaultCp(c.charName).moodSync;
                const doneTodos = (sp.todos || []).filter((x) => x.done).length;
                const totalTodos = Math.max(1, (sp.todos || []).length);

                topDoc.getElementById("cp-w-bpm").textContent = ms.bpm || "96 BPM";
                topDoc.getElementById("cp-w-os").textContent = ms.os || `“${sp.charNow}”`;
                topDoc.getElementById("cp-w-fund").textContent = `₩${Number(sp.fund || 0).toLocaleString()}`;
                topDoc.getElementById("cp-w-pet").textContent = `萌宠: ${pet.name.split(" ")[0]} · LV.${pet.lv || 1}`;

                topDoc.getElementById("cp-b-pet").textContent = `LV.${pet.lv || 1}`;
                topDoc.getElementById("cp-b-4cut").textContent = `${(sp.life4cut?.album?.length || 0) + 1}组相纸`;
                topDoc.getElementById("cp-b-qa").textContent = `${sp.qaHistory?.length || 0}篇手账`;
                topDoc.getElementById("cp-b-mood").textContent = ms.bpm || "96 BPM";
                topDoc.getElementById("cp-b-coupon").textContent = `${(sp.coupons || []).length}张券`;
                topDoc.getElementById("cp-b-guest").textContent = `${(sp.notes || []).length}条留言`;

                const latestNote = (sp.notes || [])[0];
                topDoc.getElementById("cp-app-latest-note").textContent = latestNote ? `${latestNote.author}：“${latestNote.text}”` : "点击进入写下第一句悄悄话...";

                topDoc.getElementById("cp-pet-name").textContent = pet.name;
                topDoc.getElementById("cp-pet-room-tag").textContent = `当前布置：${pet.roomItem || "暖阳羊毛地毯"}`;
                topDoc.getElementById("cp-pet-lv").textContent = `LV.${pet.lv || 1} · ${c.userName} & ${c.charName} 共同领养`;
                topDoc.getElementById("cp-pet-h-txt").textContent = `${pet.hunger}%`; topDoc.getElementById("cp-pet-h-bar").style.width = `${pet.hunger}%`;
                topDoc.getElementById("cp-pet-m-txt").textContent = `${pet.mood}%`; topDoc.getElementById("cp-pet-m-bar").style.width = `${pet.mood}%`;
                topDoc.getElementById("cp-pet-c-txt").textContent = `${pet.clean || 95}%`; topDoc.getElementById("cp-pet-c-bar").style.width = `${pet.clean || 95}%`;
                topDoc.getElementById("cp-pet-log").textContent = `🐾 ${pet.lastLog}`;
                topDoc.getElementById("cp-pet-hist").innerHTML = (pet.history || []).length
                    ? (pet.history || []).map((h) => `<div style="background:#FFF;border:1px solid #EFEFF4;border-radius:9px;padding:7px 10px;margin-bottom:5px;font-size:10px;font-weight:600;display:flex;justify-content:space-between;gap:8px;"><span>${h.text}</span><span style="color:#9A9AA5;white-space:nowrap;">${h.time}</span></div>`).join("")
                    : `<div style="text-align:center;padding:14px;font-size:9.5px;color:#9A9AA5;">暂无养宠日志，点击上方按钮互动吧</div>`;

                const cut = sp.life4cut || getDefaultCp(c.charName).life4cut;
                const stMap = {
                    light: { bg: "#FFFFFF", cell: "#F8F8FA", txt: "#2C2C32", bd: "#EAEAF0" },
                    gray: { bg: "#F0F0F5", cell: "#FFFFFF", txt: "#2C2C32", bd: "#DCDCE6" },
                    dark: { bg: "#2C2C32", cell: "#3A3A40", txt: "#FFFFFF", bd: "#484852" }
                };
                const th = stMap[cut.style || "light"] || stMap.light;
                topDoc.getElementById("cp-4cut-stage").innerHTML = `
                    <div style="background:${th.bg}!important;color:${th.txt}!important;border:1.5px solid ${th.bd}!important;border-radius:16px;padding:15px;max-width:290px;margin:0 auto;">
                        <div style="font-size:8.5px;font-weight:800;letter-spacing:1.2px;opacity:.75;margin-bottom:10px;">LIFE 4 CUT · 인생네컷 STUDIO</div>
                        ${(cut.frames || []).slice(0, 4).map((f, i) => `<div style="background:${th.cell}!important;color:${th.txt}!important;border:1px solid ${th.bd}!important;border-radius:10px;padding:11px 12px;margin-bottom:7px;text-align:left;"><span style="font-size:7.8px;font-weight:800;opacity:.65;display:block;margin-bottom:3px;">CUT 0${i + 1}</span><div style="font-size:10.8px;font-weight:600;line-height:1.58;">${f}</div></div>`).join("")}
                        <div style="display:flex;justify-content:space-between;font-size:9px;font-weight:800;padding-top:4px;"><span>${cut.sign}</span><span>${cut.date}</span></div>
                    </div>`;
                topDoc.getElementById("cp-4cut-album").innerHTML = (cut.album || []).length
                    ? (cut.album || []).map((al) => `<div style="background:#FFF;border:1px solid #EFEFF4;border-radius:10px;padding:9px 11px;margin-bottom:6px;font-size:10px;font-weight:600;"><div style="display:flex;justify-content:space-between;font-weight:800;margin-bottom:4px;"><span>📸 ${al.sign}</span><span style="color:#9A9AA5;">${al.date}</span></div><div style="color:#55555E;line-height:1.5;">${(al.frames || []).map((x, k) => `[0${k + 1}] ${x}`).join("<br>")}</div></div>`).join("")
                    : `<div style="text-align:center;padding:14px;font-size:9.5px;color:#9A9AA5;">每次拍摄的四格都会自动保存在此相册墙中</div>`;

                const qIdx = (sp.qaIndex || 0) % CP_QUESTIONS.length;
                topDoc.getElementById("cp-qa-q").textContent = sp.customQ || `Q${qIdx + 1}. ${CP_QUESTIONS[qIdx]}`;
                topDoc.getElementById("cp-qa-my").textContent = sp.qaUserAns;
                topDoc.getElementById("cp-qa-char-lbl").textContent = `${c.charName}'S ANSWER · 对方回答`;
                topDoc.getElementById("cp-qa-char").textContent = sp.qaCharAns;
                topDoc.getElementById("cp-qa-hist").innerHTML = (sp.qaHistory || []).length
                    ? (sp.qaHistory || []).map((item) => `<div style="background:#FFF;border:1px solid #EFEFF4;border-radius:11px;padding:10px 12px;margin-bottom:6px;font-size:10.2px;font-weight:600;line-height:1.55;"><div style="font-weight:800;color:#2C2C32;margin-bottom:4px;">Q: ${item.q}</div><div style="color:#55555E;margin-bottom:2px;"><b>${c.userName}：</b>${item.my}</div><div style="color:#2C2C32;"><b>${c.charName}：</b>${item.char}</div></div>`).join("")
                    : `<div style="text-align:center;padding:14px;font-size:9.5px;color:#9A9AA5;">暂无封存的问答手账</div>`;

                topDoc.getElementById("cp-mood-stage").innerHTML = `
                    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin-bottom:9px;">
                        <div style="background:#FFF;border:1px solid #EFEFF4;border-radius:11px;padding:9px 4px;text-align:center;"><div style="font-size:7.5px;font-weight:800;color:#8E8E98;">HEART</div><div style="font-size:11.5px;font-weight:800;margin-top:2px;">${ms.bpm}</div></div>
                        <div style="background:#FFF;border:1px solid #EFEFF4;border-radius:11px;padding:9px 4px;text-align:center;"><div style="font-size:7.5px;font-weight:800;color:#8E8E98;">TEMP</div><div style="font-size:11.5px;font-weight:800;margin-top:2px;">${ms.temp}</div></div>
                        <div style="background:#FFF;border:1px solid #EFEFF4;border-radius:11px;padding:9px 4px;text-align:center;"><div style="font-size:7.5px;font-weight:800;color:#8E8E98;">MISS</div><div style="font-size:11.5px;font-weight:800;margin-top:2px;">${ms.miss}</div></div>
                        <div style="background:#FFF;border:1px solid #EFEFF4;border-radius:11px;padding:9px 4px;text-align:center;"><div style="font-size:7.5px;font-weight:800;color:#8E8E98;">醋意值</div><div style="font-size:11.5px;font-weight:800;margin-top:2px;">${ms.jealousy || "75%"}</div></div>
                    </div>
                    <div style="background:#FFF;border:1px solid #EFEFF4;border-radius:12px;padding:11px 12px;margin-bottom:8px;">
                        <div style="display:flex;justify-content:space-between;font-size:8.5px;font-weight:800;color:#8E8E98;margin-bottom:4px;"><span>CURRENT ACTION · 实时同居动态</span><span>位置：${ms.room || "家中"}</span></div>
                        <div style="font-size:11px;font-weight:600;line-height:1.6;">${ms.action}</div>
                    </div>
                    <div style="background:#FFF;border:1px solid #EFEFF4;border-radius:12px;padding:11px 12px;margin-bottom:8px;">
                        <div style="font-size:8.5px;font-weight:800;color:#8E8E98;margin-bottom:4px;">POCKET CHECK · 随身衣兜/桌面物品</div>
                        <div style="font-size:10.5px;font-weight:600;line-height:1.55;color:#55555E;">${ms.pocket || "手机、钥匙、为你备着的糖"}</div>
                    </div>
                    <div style="background:#FFF;border:1px solid #EFEFF4;border-radius:12px;padding:11px 12px;">
                        <div style="font-size:8.5px;font-weight:800;color:#8E8E98;margin-bottom:4px;">INNER VOICE · 此刻脑海里关于你的心声</div>
                        <div style="font-size:11px;font-weight:700;line-height:1.6;color:#2C2C32;">${ms.os}</div>
                    </div>`;

                topDoc.getElementById("cp-fund-total").textContent = `₩${Number(sp.fund || 0).toLocaleString()}`;
                topDoc.getElementById("cp-fund-logs").innerHTML = (sp.fundLogs || []).map((fl) => `<div style="display:flex;justify-content:space-between;background:#FFF;border:1px solid #EFEFF4;border-radius:8px;padding:6px 10px;margin-bottom:4px;font-size:9.8px;font-weight:600;"><div><b>${fl.who}</b> <span style="color:#6E6E77;">${fl.text}</span></div><b>${fl.amt}</b></div>`).join("");
                const cpList = topDoc.getElementById("cp-coupon-list");
                cpList.innerHTML = (sp.coupons || []).map((cp, idx) => `
                    <div class="smt-ticket-card">
                        <div class="smt-ticket-left"><div style="font-size:11px;font-weight:800;color:#2C2C32;">🎟️ ${cp.title}</div><div style="font-size:9px;font-weight:600;color:#7A7A85;margin-top:3px;">${cp.desc}</div></div>
                        <div class="smt-ticket-right" data-cpuse="${idx}"><span style="font-size:9px;font-weight:800;color:#2C2C32;">核销</span><span style="font-size:7.5px;font-weight:700;color:#9A9AA5;margin-top:2px;">已用 ${cp.used || 0}</span></div>
                    </div>`).join("");
                topDoc.getElementById("cp-coupon-log").textContent = sp.couponLog;
                cpList.querySelectorAll("[data-cpuse]").forEach((b) => b.onclick = async () => {
                    const idx = Number(b.getAttribute("data-cpuse")), d = loadCp(), cp = d.coupons[idx], logEl = topDoc.getElementById("cp-coupon-log");
                    logEl.textContent = `⏳ 正在向 ${c.charName} 出示并核销【${cp.title}】...`;
                    try {
                        const r = await askAI(`你是${c.charName}。人设：${c.charDesc.slice(0, 1000)}`, `${c.userName}向你出示并核销了情侣特权券：【${cp.title}（${cp.desc}）】。请描写你看到后的反应与立刻宠溺履约的行动(90字左右)：`);
                        cp.used = (cp.used || 0) + 1; d.couponLog = `✓ 已对 ${c.charName} 核销【${cp.title}】：\n${r}`;
                        saveCp(d); renderStandaloneCoupleSpace();
                    } catch (err) { logEl.textContent = err.message; }
                });

                topDoc.getElementById("cp-anni-list").innerHTML = (sp.anniversaries || []).map((an, idx) => {
                    const diff = Math.ceil((new Date(an.date).getTime() - Date.now()) / 86400000);
                    const tag = isNaN(diff) ? an.date : (diff > 0 ? `还有 ${diff} 天` : `D+${Math.abs(diff)}`);
                    return `<div data-delanni="${idx}" style="background:#FFF;border:1px solid #EFEFF4;border-radius:10px;padding:9px 8px;text-align:center;cursor:pointer;" title="点击可删除"><div style="font-size:9.5px;font-weight:800;color:#2C2C32;">${an.name}</div><div style="font-size:12px;font-weight:800;color:#484852;margin:3px 0;">${tag}</div><div style="font-size:7.8px;font-weight:600;color:#9A9AA5;">${an.date}</div></div>`;
                }).join("");
                topDoc.querySelectorAll("[data-delanni]").forEach((el) => el.onclick = () => { const d = loadCp(); d.anniversaries.splice(Number(el.getAttribute("data-delanni")), 1); saveCp(d); renderStandaloneCoupleSpace(); });

                topDoc.getElementById("cp-notes-list").innerHTML = (sp.notes || []).map((n) => `<div style="background:#FFF;border:1px solid #EFEFF4;border-radius:10px;padding:8px 10px;margin-bottom:6px;font-size:10.5px;font-weight:600;"><div style="display:flex;justify-content:space-between;font-size:8.5px;font-weight:800;color:#8E8E98;margin-bottom:2px;"><b>${n.author}</b><span>${n.time}</span></div><div>${n.text.replace(/</g, "&lt;")}</div></div>`).join("");
                const pct = Math.round((doneTodos / totalTodos) * 100);
                topDoc.getElementById("cp-todo-stat").textContent = `WISH LIST · 恋爱百事清单 (完成度 ${pct}%)`;
                topDoc.getElementById("cp-todo-bar").style.width = `${pct}%`;
                const todoEl = topDoc.getElementById("cp-todo-list"); todoEl.innerHTML = "";
                (sp.todos || []).forEach((td, idx) => {
                    const row = topDoc.createElement("div");
                    row.style.cssText = "display:flex;align-items:center;justify-content:space-between;background:#FFF;border:1px solid #EFEFF4;border-radius:9px;padding:7px 10px;margin-bottom:5px;font-size:10.5px;font-weight:600;";
                    row.innerHTML = `<label style="display:flex;align-items:center;gap:7px;cursor:pointer;flex:1;"><input type="checkbox" ${td.done ? "checked" : ""}/><span style="${td.done ? "text-decoration:line-through;color:#9A9AA5;" : ""}">${td.text}</span></label><span style="cursor:pointer;" data-deltodo="${idx}">✕</span>`;
                    row.querySelector("input").onchange = (e) => { const d = loadCp(); d.todos[idx].done = e.target.checked; saveCp(d); renderStandaloneCoupleSpace(); };
                    row.querySelector("[data-deltodo]").onclick = () => { const d = loadCp(); d.todos.splice(idx, 1); saveCp(d); renderStandaloneCoupleSpace(); };
                    todoEl.appendChild(row);
                });
            } catch (err) {}
        }

        // 绑定独立情侣空间按钮事件
        topDoc.getElementById("cp-app-bg-btn").onclick = () => { const d = loadCp(), u = prompt("粘贴情侣空间背景图 URL（留空恢复默认）：", d.bgUrl || ""); if (u !== null) { d.bgUrl = u.trim(); saveCp(d); renderStandaloneCoupleSpace(); } };
        topDoc.getElementById("cp-app-date-btn").onclick = () => { const d = loadCp(), v = prompt("修改相恋起始日 (YYYY-MM-DD)：", d.startDate); if (v) { d.startDate = v.trim(); saveCp(d); renderStandaloneCoupleSpace(); } };
        topDoc.getElementById("cp-app-mood-btn").onclick = () => { const d = loadCp(), v = prompt("修改今日状态温度：", d.mood); if (v) { d.mood = v.trim(); saveCp(d); renderStandaloneCoupleSpace(); } };
        topDoc.getElementById("cp-app-reset-btn").onclick = () => { const c = getCtx(); if (confirm(`确定重置与【${c.charName}】的情侣空间数据吗？`)) { saveCp(getDefaultCp(c.charName)); renderStandaloneCoupleSpace(); } };
        topDoc.getElementById("cp-app-live-btn").onclick = async (e) => {
            const c = getCtx(), d = loadCp(); e.target.textContent = "⏳ 感应中...";
            try {
                const raw = await askAI(`你是${c.charName}。人设：${c.charDesc.slice(0, 900)}`, `请生成你此刻在同居小屋里的实时状态。严格只输出JSON：{"charNow":"12字以内描述你此刻正在屋里做什么","bpm":"98 BPM","os":"一句此刻脑海里关于${c.userName}的心声"}`);
                const m = raw.match(/\{[\s\S]*\}/);
                if (m) { const obj = JSON.parse(m[0]); d.charNow = obj.charNow || "陪在你身边"; d.moodSync = d.moodSync || {}; d.moodSync.action = d.charNow; d.moodSync.bpm = obj.bpm || "98 BPM"; if (obj.os) d.moodSync.os = obj.os; saveCp(d); renderStandaloneCoupleSpace(); }
            } catch (err) { alert(err.message); } finally { e.target.textContent = "↻ 刷新TA状态"; }
        };

        function pushPetHist(d, txt) { d.pet.lastLog = txt; d.pet.history = d.pet.history || []; d.pet.history.unshift({ text: txt, time: nowTime() }); }
        topDoc.getElementById("cp-pet-rename-btn").onclick = () => { const d = loadCp(), v = prompt("给宠物起名：", d.pet.name); if (v) { d.pet.name = v.trim(); saveCp(d); renderStandaloneCoupleSpace(); } };
        topDoc.getElementById("cp-pet-room-btn").onclick = () => { const d = loadCp(), v = prompt("更换小窝家具布置：", d.pet.roomItem); if (v) { d.pet.roomItem = v.trim(); pushPetHist(d, `换上了全新的「${v.trim()}」！`); saveCp(d); renderStandaloneCoupleSpace(); } };
        topDoc.getElementById("cp-pet-feed").onclick = () => { const d = loadCp(); d.pet.hunger = Math.min(100, d.pet.hunger + 15); pushPetHist(d, `喂了 ${d.pet.name} 冻干零食，它开心地蹭了蹭你的手心！`); saveCp(d); renderStandaloneCoupleSpace(); };
        topDoc.getElementById("cp-pet-pat").onclick = () => { const d = loadCp(); d.pet.mood = Math.min(100, d.pet.mood + 15); pushPetHist(d, `揉了揉 ${d.pet.name} 软乎乎的肚皮~`); saveCp(d); renderStandaloneCoupleSpace(); };
        topDoc.getElementById("cp-pet-bath").onclick = () => { const d = loadCp(); d.pet.clean = 100; d.pet.lv = (d.pet.lv || 1) + 1; pushPetHist(d, `给 ${d.pet.name} 洗完香香吹干毛发，升到了 LV.${d.pet.lv}！`); saveCp(d); renderStandaloneCoupleSpace(); };
        topDoc.getElementById("cp-pet-play").onclick = async (e) => { const c = getCtx(), d = loadCp(); e.target.textContent = "互动中..."; try { pushPetHist(d, await askAI(`你是${c.charName}。人设：${c.charDesc.slice(0, 900)}`, `描写你逗弄宠物「${d.pet.name}」并顺势和身旁的${c.userName}亲昵互动的画面(80字左右)：`)); saveCp(d); renderStandaloneCoupleSpace(); } catch (err) { alert(err.message); } finally { e.target.textContent = "✦ 让TA陪玩"; } };
        topDoc.getElementById("cp-pet-walk").onclick = async (e) => { const c = getCtx(), d = loadCp(); e.target.textContent = "散步中..."; try { pushPetHist(d, await askAI(`你是${c.charName}。人设：${c.charDesc.slice(0, 900)}`, `描写傍晚你牵着${c.userName}的手，带着宠物「${d.pet.name}」在首尔街角散步的浪漫日常(85字左右)：`)); saveCp(d); renderStandaloneCoupleSpace(); } catch (err) { alert(err.message); } finally { e.target.textContent = "✦ 和TA带宠物出门散步"; } };
        topDoc.getElementById("cp-pet-diary").onclick = async (e) => { const c = getCtx(), d = loadCp(); e.target.textContent = "生成中..."; try { pushPetHist(d, `【${c.charName}手记】` + await askAI(`你是${c.charName}。`, `以第一人称写一段观察「${d.pet.name}」和「${c.userName}」在家互动的私密手记(80字左右)：`)); saveCp(d); renderStandaloneCoupleSpace(); } catch (err) { alert(err.message); } finally { e.target.textContent = "✦ 看TA写的观察宠物手记"; } };

        topDoc.querySelectorAll("[data-cutstyle]").forEach((b) => b.onclick = () => { topDoc.querySelectorAll("[data-cutstyle]").forEach((x) => x.classList.remove("dark")); b.classList.add("dark"); const d = loadCp(); d.life4cut.style = b.getAttribute("data-cutstyle"); saveCp(d); renderStandaloneCoupleSpace(); });
        async function shoot4Cut(topic = "") {
            const c = getCtx(), btn = topDoc.getElementById("cp-4cut-gen-btn"); btn.textContent = "⏳ 拍摄中...";
            try {
                const raw = await askAI(`你是摄影师。拍摄对象：${c.charName}与${c.userName}。人设：${c.charDesc.slice(0, 1000)}`, `${topic ? "拍摄主题：" + topic + "。" : ""}生成两人在自拍亭连拍4张人生四格的画面。严格只输出JSON：{"frames":["第1格","第2格","第3格","第4格亲密定格"],"sign":"手写短句"}`);
                const m = raw.match(/\{[\s\S]*\}/);
                if (m) { const obj = JSON.parse(m[0]), d = loadCp(), nc = { date: "SUMOUL · " + nowTime(), frames: obj.frames || [], sign: obj.sign || `${c.charName} & ${c.userName}` }; d.life4cut.frames = nc.frames; d.life4cut.sign = nc.sign; d.life4cut.date = nc.date; d.life4cut.album = d.life4cut.album || []; d.life4cut.album.unshift(nc); saveCp(d); renderStandaloneCoupleSpace(); }
            } catch (err) { alert(err.message); } finally { btn.textContent = "✦ 立即连拍四格"; }
        }
        topDoc.getElementById("cp-4cut-gen-btn").onclick = () => shoot4Cut("");
        topDoc.getElementById("cp-4cut-topic-btn").onclick = () => { const t = prompt("输入你想和TA拍的四格主题或头饰道具："); if (t && t.trim()) shoot4Cut(t.trim()); };

        topDoc.getElementById("cp-qa-next").onclick = () => { const d = loadCp(); d.customQ = ""; d.qaIndex = ((d.qaIndex || 0) + 1) % CP_QUESTIONS.length; d.qaUserAns = "点击填写..."; d.qaCharAns = "点击让TA作答..."; saveCp(d); renderStandaloneCoupleSpace(); };
        topDoc.getElementById("cp-qa-custom").onclick = () => { const v = prompt("输入你想问TA的专属问题："); if (v) { const d = loadCp(); d.customQ = v.trim(); d.qaUserAns = "点击填写..."; d.qaCharAns = "点击让TA作答..."; saveCp(d); renderStandaloneCoupleSpace(); } };
        topDoc.getElementById("cp-qa-my-box").onclick = () => { const d = loadCp(), v = prompt("写下你的回答："); if (v) { d.qaUserAns = v.trim(); saveCp(d); renderStandaloneCoupleSpace(); } };
        topDoc.getElementById("cp-qa-ai").onclick = async (e) => { const c = getCtx(), d = loadCp(), q = d.customQ || CP_QUESTIONS[(d.qaIndex || 0) % CP_QUESTIONS.length]; e.target.textContent = "思考中..."; try { d.qaCharAns = await askAI(`你是${c.charName}。人设：${c.charDesc.slice(0, 1000)}`, `问题：“${q}”(${c.userName}答：“${d.qaUserAns}”)。请用第一人称写下你的真实回答(70字左右)：`); saveCp(d); renderStandaloneCoupleSpace(); } catch (err) { alert(err.message); } finally { e.target.textContent = "✦ 让TA作答"; } };
        topDoc.getElementById("cp-qa-save").onclick = () => { const d = loadCp(), q = d.customQ || CP_QUESTIONS[(d.qaIndex || 0) % CP_QUESTIONS.length]; d.qaHistory = d.qaHistory || []; d.qaHistory.unshift({ q, my: d.qaUserAns, char: d.qaCharAns }); saveCp(d); renderStandaloneCoupleSpace(); alert("✓ 已封存进灵魂问答手账本！"); };

        topDoc.getElementById("cp-mood-sync").onclick = async (e) => { const c = getCtx(); e.target.textContent = "⏳ 感应中..."; try { const raw = await askAI(`你是${c.charName}。人设：${c.charDesc.slice(0, 1000)}`, `感应你此刻的状态。严格只输出JSON：{"room":"所在房间","bpm":"98 BPM","temp":"36.8°C","miss":"99%","jealousy":"78%","action":"此刻正在做什么","pocket":"随身衣兜里与${c.userName}有关的3样物品","os":"脑海里关于${c.userName}的一句心声"}`); const m = raw.match(/\{[\s\S]*\}/); if (m) { const d = loadCp(); d.moodSync = JSON.parse(m[0]); d.charNow = d.moodSync.action; saveCp(d); renderStandaloneCoupleSpace(); } } catch (err) { alert(err.message); } finally { e.target.textContent = "↻ 实时感应TA状态"; } };
        topDoc.getElementById("cp-mood-hug").onclick = async (e) => { const c = getCtx(), d = loadCp(); e.target.textContent = "靠近中..."; try { d.moodSync.bpm = "118 BPM"; d.moodSync.os = await askAI(`你是${c.charName}。`, `${c.userName}突然悄悄从背后抱住了你。描写你瞬间的身体反应、心跳飙升与转身回应(80字左右)：`); saveCp(d); renderStandaloneCoupleSpace(); } catch (err) { alert(err.message); } finally { e.target.textContent = "✦ 悄悄从背后抱住TA"; } };
        topDoc.getElementById("cp-mood-pocket").onclick = () => topDoc.getElementById("cp-mood-sync").click();

        topDoc.getElementById("cp-fund-me").onclick = () => { const amt = Number(prompt("输入存入恋爱小金库的金额 (₩)：", "52000")); if (!amt) return; const note = prompt("存款备注：", "约会储蓄") || "储蓄", d = loadCp(), c = getCtx(); d.fund = (d.fund || 0) + amt; d.fundLogs = d.fundLogs || []; d.fundLogs.unshift({ who: c.userName, text: note, amt: `+₩${amt.toLocaleString()}` }); saveCp(d); renderStandaloneCoupleSpace(); };
        topDoc.getElementById("cp-fund-ai").onclick = async (e) => { const c = getCtx(), d = loadCp(); e.target.textContent = "转入中..."; try { const raw = await askAI(`你是${c.charName}。`, `请往你和${c.userName}的共同恋爱金库里存一笔钱。严格只输出JSON：{"amount":100000,"note":"存钱备注(20字内)"}`); const m = raw.match(/\{[\s\S]*\}/); if (m) { const obj = JSON.parse(m[0]), amt = Number(obj.amount) || 88000; d.fund = (d.fund || 0) + amt; d.fundLogs.unshift({ who: c.charName, text: obj.note || "恋爱基金", amt: `+₩${amt.toLocaleString()}` }); saveCp(d); renderStandaloneCoupleSpace(); } } catch (err) { alert(err.message); } finally { e.target.textContent = "✦ 让TA存一笔"; } };
        topDoc.getElementById("cp-coupon-add").onclick = () => { const t = prompt("新特权券名称："); if (!t) return; const desc = prompt("效果描述：", "出示此券，对方必须无条件照做"), d = loadCp(); d.coupons.unshift({ title: t.trim(), desc: (desc || "").trim(), used: 0 }); saveCp(d); renderStandaloneCoupleSpace(); };

        topDoc.getElementById("cp-anni-add").onclick = () => { const n = prompt("纪念日名称："), dt = prompt("日期 (YYYY-MM-DD)：", "2025-12-25"); if (n && dt) { const d = loadCp(); d.anniversaries.push({ name: n.trim(), date: dt.trim() }); saveCp(d); renderStandaloneCoupleSpace(); } };
        topDoc.getElementById("cp-note-send").onclick = async () => { const inp = topDoc.getElementById("cp-note-inp"), v = inp.value.trim(); if (!v) return; inp.value = ""; const c = getCtx(), d = loadCp(); d.notes.unshift({ author: c.userName, text: v, time: nowTime() }); saveCp(d); renderStandaloneCoupleSpace(); try { const r = await askAI(`你是${c.charName}。`, `${c.userName}在情侣空间留言：“${v}”，请简短回复(45字内)：`); const latest = loadCp(); latest.notes.unshift({ author: c.charName, text: r, time: nowTime() }); saveCp(latest); renderStandaloneCoupleSpace(); } catch (err) {} };
        topDoc.getElementById("cp-note-ai").onclick = async () => { const c = getCtx(); try { const r = await askAI(`你是${c.charName}。`, `主动在情侣空间留言板给${c.userName}留一句悄悄话(45字内)：`); const d = loadCp(); d.notes.unshift({ author: c.charName, text: r, time: nowTime() }); saveCp(d); renderStandaloneCoupleSpace(); } catch (err) { alert(err.message); } };
        topDoc.getElementById("cp-todo-add").onclick = () => { const v = prompt("新增恋爱心愿："); if (v) { const d = loadCp(); d.todos.push({ text: v.trim(), done: false }); saveCp(d); renderStandaloneCoupleSpace(); } };

        /* 第 2 栏韩系动态流引擎 */
        function getFeedKey() { return `sumoul_v19_boldfeed__${getCtx().safeScope}`; }
        function createDefaultFeed(charName) {
            return {
                owner: charName, myNote: "", charNote: "想你了",
                charStory: `凌晨 · ${charName} 随手拍下窗外灰白色的街景，玻璃上映出半张侧脸，配文：“又到了会想起你的时间。”`,
                posts: [{
                    id: 1, isMe: false, author: charName, loc: "SEOUL · 한남동", time: "18分钟前", filmNo: "35MM FILM · 01",
                    photoDesc: `灰白色的雨夜车窗外，街角便利店的冷白灯光映在后视镜里，${charName} 的指尖搭在方向盘上，副驾驶座放着给你带的热饮。`,
                    imgUrl: "", text: "비가 오니까 또 네 생각이 나네. 데리러 갈까?\n下雨了，又想起你。要去接你吗？",
                    liked: true, likesCount: 52, comments: [{ who: "共同好友", text: "这副驾驶的位置永远是专属预留啊😏" }, { who: charName, text: "嗯，不载别人。" }]
                }]
            };
        }
        function getFeedData() {
            const c = getCtx(), key = getFeedKey();
            try {
                const raw = localStorage.getItem(key);
                if (!raw) { const init = createDefaultFeed(c.charName); localStorage.setItem(key, JSON.stringify(init)); return init; }
                return Object.assign(createDefaultFeed(c.charName), JSON.parse(raw));
            } catch (e) { return createDefaultFeed(c.charName); }
        }
        function saveFeedData(data) { localStorage.setItem(getFeedKey(), JSON.stringify(data)); }

        let currentFilter = "all", observedCharScope = "";

        function renderKrMoments() {
            try {
                const c = getCtx(), data = getFeedData();
                observedCharScope = c.safeScope;
                const filterCharBtn = topDoc.getElementById("smt-filter-char-btn");
                if (filterCharBtn) filterCharBtn.textContent = `只看 ${c.charName}`;

                const extraList = c.otherChars.length > 0 ? c.otherChars : [
                    { name: "서윤", ava: "https://i.postimg.cc/vmsDSqmk/IMG-3926.jpg", story: `刚冲洗出来的黑白胶卷。` },
                    { name: "한남동", ava: "https://i.postimg.cc/MZg2F7Fm/IMG-4150.jpg", story: `玻璃窗上的雨痕与浓缩咖啡。` }
                ];
                const remainCount = Math.max(0, c.totalOtherCount - extraList.length);
                const storiesBar = topDoc.getElementById("smt-ins-stories-bar");
                const myBubbleHtml = data.myNote ? `<div class="ig-note-cloud"><span>${data.myNote}</span></div>` : `<div class="ig-note-cloud empty-hint"><span>想法...</span></div>`;
                const charBubbleHtml = `<div class="ig-note-cloud"><span>${data.charNote || "想你了"}</span></div>`;

                storiesBar.innerHTML = `
                    <div class="kr-note-unit" id="smt-story-me" title="点击修改我的状态泡泡">${myBubbleHtml}<div class="kr-ava-ring"><div class="kr-ava-inner"><img src="${c.userAvatar}" /></div><span class="kr-ava-badge">${KR_ICO.plus}</span></div><div class="kr-unit-name">${c.userName}</div></div>
                    <div class="kr-note-unit" id="smt-story-char">${charBubbleHtml}<div class="kr-ava-ring unread"><div class="kr-ava-inner"><img src="${c.charAvatar}" /></div></div><div class="kr-unit-name">${c.charName}</div></div>
                    ${extraList.map((ch, idx) => `<div class="kr-note-unit" data-otheridx="${idx}"><div class="kr-ava-ring"><div class="kr-ava-inner"><img src="${ch.ava}" /></div></div><div class="kr-unit-name">${ch.name}</div></div>`).join("")}
                    <div class="kr-note-unit" id="smt-story-more-dots"><div class="kr-ava-ring"><div class="kr-ava-inner" style="background:#F6F6FA!important;">${KR_ICO.dots}</div></div><div class="kr-unit-name" style="color:#8E8E98!important;">${remainCount > 0 ? `+${remainCount} 更多` : "···"}</div></div>
                `;

                topDoc.getElementById("smt-story-me").onclick = () => {
                    const d = getFeedData(), v = prompt("写下你头像上方的纯白想法泡泡（留空则恢复默认提示）：", d.myNote || "");
                    if (v !== null) { d.myNote = v.trim().slice(0, 8); saveFeedData(d); renderKrMoments(); }
                };

                const viewer = topDoc.getElementById("smt-story-viewer");
                topDoc.getElementById("smt-story-char").onclick = () => {
                    const d = getFeedData(); viewer.style.display = "block";
                    viewer.innerHTML = `<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;"><div style="display:flex;align-items:center;gap:8px;"><img src="${c.charAvatar}" style="width:24px;height:24px;border-radius:50%;object-fit:cover;border:1.5px solid #FFF;" /><b style="font-size:10px;color:#2C2C32;">${c.charName} · 24H 限时快拍</b></div><div style="display:flex;gap:5px;align-items:center;"><span class="smt-pill-btn dark" id="smt-story-ai-gen" style="height:21px!important;font-size:8px!important;">↻ 刷新快拍</span><span id="smt-story-close" style="cursor:pointer;font-size:11px;font-weight:700;color:#8E8E98;padding:0 4px;">✕</span></div></div><div style="font-size:10.5px;font-weight:600;line-height:1.68;color:#3A3A40;background:#FFFFFF;border:1px solid #EAEAF0;border-radius:12px;padding:11px 13px;">${d.charStory}</div>`;
                    viewer.querySelector("#smt-story-close").onclick = () => (viewer.style.display = "none");
                    viewer.querySelector("#smt-story-ai-gen").onclick = async (ev) => {
                        ev.target.textContent = "⏳ 刷新中...";
                        try {
                            const raw = await askAI(`你是${c.charName}。人设：${c.charDesc.slice(0, 900)}`, `请生成一条你在社交软件顶部 24 小时限时快拍(Story)里随手发的画面，以及你头顶的5字以内云朵泡泡状态词。严格只输出JSON：{"note":"5字以内状态词(如:想见你/刚下班)","story":"55字以内描述你拍下的快拍画面与配文"}`);
                            const m = raw.match(/\{[\s\S]*\}/);
                            if (m) { const obj = JSON.parse(m[0]), latest = getFeedData(); latest.charNote = obj.note || "想你了"; latest.charStory = obj.story || latest.charStory; saveFeedData(latest); renderKrMoments(); topDoc.getElementById("smt-story-char").click(); }
                        } catch (err) { alert(err.message); }
                    };
                };

                storiesBar.querySelectorAll("[data-otheridx]").forEach((el) => el.onclick = () => {
                    const ch = extraList[Number(el.getAttribute("data-otheridx"))]; if (!ch) return;
                    viewer.style.display = "block";
                    viewer.innerHTML = `<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;"><div style="display:flex;align-items:center;gap:7px;"><img src="${ch.ava}" style="width:22px;height:22px;border-radius:50%;object-fit:cover;" /><b style="font-size:10px;color:#2C2C32;">${ch.name} · 最近聊天角色快拍</b></div><span id="smt-fr-st-close" style="cursor:pointer;font-weight:700;color:#8E8E98;">✕</span></div><div style="font-size:10.5px;font-weight:600;line-height:1.65;color:#484852;background:#FFF;border:1px solid #EAEAF0;border-radius:11px;padding:11px 12px;">${ch.story}</div>`;
                    viewer.querySelector("#smt-fr-st-close").onclick = () => (viewer.style.display = "none");
                });

                topDoc.getElementById("smt-story-more-dots").onclick = () => {
                    viewer.style.display = "block";
                    viewer.innerHTML = `<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;"><b style="font-size:10px;color:#2C2C32;">RECENT CHARACTERS · 最近聊天角色排序</b><span id="smt-dots-close" style="cursor:pointer;font-weight:700;color:#8E8E98;">✕</span></div><div style="font-size:10px;font-weight:600;line-height:1.6;color:#55555E;background:#FFF;border:1px solid #EAEAF0;border-radius:11px;padding:10px 12px;">顶部头像已按你<b>最近聊天的先后顺序</b>自动排列（共检测到酒馆内还有 ${c.totalOtherCount} 位其他角色）。</div>`;
                    viewer.querySelector("#smt-dots-close").onclick = () => (viewer.style.display = "none");
                };

                const stream = topDoc.getElementById("smt-mom-stream"), posts = (data.posts || []).filter((p) => currentFilter === "all" || !p.isMe);
                if (!posts.length) { stream.innerHTML = `<div style="text-align:center;padding:44px 16px;font-size:10.5px;font-weight:700;color:#9A9AA5;">暂无动态 · 点击右上角「让TA发新帖」吧</div>`; return; }

                stream.innerHTML = posts.map((p, idx) => {
                    const ava = p.isMe ? c.userAvatar : c.charAvatar, name = p.isMe ? c.userName : c.charName;
                    const cmtsHtml = (p.comments && p.comments.length) ? `<div class="kr-cmt-list">${p.comments.map((cm) => `<div style="margin-bottom:4px;"><b style="color:#2C2C32;margin-right:5px;">${cm.who}：</b><span style="color:#484852;">${cm.text.replace(/</g, "&lt;")}</span></div>`).join("")}</div>` : "";
                    return `<div class="kr-clean-post"><div class="kr-post-head"><div class="kr-post-user"><img class="post-ava" src="${ava}" /><div><div style="font-size:11.5px;font-weight:800;color:#2C2C32;">${name}</div><div style="display:flex;align-items:center;gap:3px;font-size:8.5px;font-weight:600;color:#8E8E98;margin-top:2px;">${KR_ICO.pin}<span>${p.loc || "SEOUL"} · ${p.time || "刚刚"}</span></div></div></div><span data-insdel="${p.id}" style="cursor:pointer;padding:4px;">${KR_ICO.more}</span></div><div class="kr-film-frame"><div class="kr-film-meta"><span class="kr-film-tag">${p.filmNo || `FILM · 0${idx + 1}`}</span><span style="font-size:8px;font-weight:700;color:#9A9AA5;">1 / 1</span></div>${p.imgUrl && /^https?:|^data:/.test(p.imgUrl) ? `<img class="real-photo" src="${p.imgUrl}" />` : ""}${p.photoDesc ? `<div class="kr-film-scene">${p.photoDesc.replace(/</g, "&lt;")}</div>` : ""}</div><div class="kr-post-caption"><div style="white-space:pre-wrap;">${(p.text || "").replace(/</g, "&lt;")}</div></div><div class="kr-post-bar"><div style="display:flex;align-items:center;gap:8px;"><span class="kr-act-pill" data-inslike="${p.id}">${p.liked ? KR_ICO.heartFill : KR_ICO.heart}<span>${p.likesCount || 36}</span></span><span class="kr-act-pill" data-inscmt="${p.id}">${KR_ICO.cmt}<span>评论 (${(p.comments || []).length})</span></span></div><span class="kr-act-pill" data-inscmt="${p.id}">＋ 写评论</span></div>${cmtsHtml}</div>`;
                }).join("");

                stream.querySelectorAll("[data-inslike]").forEach((btn) => btn.onclick = () => { const pid = Number(btn.getAttribute("data-inslike")), d = getFeedData(), t = d.posts.find((x) => x.id === pid); if (t) { t.liked = !t.liked; t.likesCount = Math.max(1, (t.likesCount || 10) + (t.liked ? 1 : -1)); saveFeedData(d); renderKrMoments(); } });
                stream.querySelectorAll("[data-insdel]").forEach((btn) => btn.onclick = () => { if (!confirm("删除这条动态吗？")) return; const pid = Number(btn.getAttribute("data-insdel")), d = getFeedData(); d.posts = d.posts.filter((x) => x.id !== pid); saveFeedData(d); renderKrMoments(); });
                stream.querySelectorAll("[data-inscmt]").forEach((btn) => btn.onclick = async () => {
                    const pid = Number(btn.getAttribute("data-inscmt")), d = getFeedData(), target = d.posts.find((x) => x.id === pid); if (!target) return;
                    const txt = prompt(`评论 ${target.author}：`); if (!txt || !txt.trim()) return;
                    const ctx = getCtx(); target.comments = target.comments || []; target.comments.push({ who: ctx.userName, text: txt.trim() }); saveFeedData(d); renderKrMoments();
                    try {
                        const aiReply = await askAI(`你是${ctx.charName}。人设：${ctx.charDesc.slice(0, 1000)}\n近期剧情：${ctx.recentChat}`, `在动态「${target.text}」下方，${ctx.userName}评论了：“${txt.trim()}”。请以${ctx.charName}的口吻直接回复一条简短评论(35字以内)：`);
                        const latest = getFeedData(), t2 = latest.posts.find((x) => x.id === pid); if (t2) { t2.comments.push({ who: `${ctx.charName} ▸ ${ctx.userName}`, text: aiReply }); saveFeedData(latest); renderKrMoments(); }
                    } catch (e) {}
                });
            } catch (err) {}
        }

        spacePage.querySelectorAll("[data-feedfilter]").forEach((b) => b.onclick = () => { spacePage.querySelectorAll("[data-feedfilter]").forEach((x) => x.classList.remove("dark")); b.classList.add("dark"); currentFilter = b.getAttribute("data-feedfilter"); renderKrMoments(); });
        const postDrawer = topDoc.getElementById("smt-mom-post-drawer");
        topDoc.getElementById("smt-mom-user-post").onclick = () => { postDrawer.style.display = postDrawer.style.display === "none" ? "block" : "none"; };
        topDoc.getElementById("smt-mom-post-cancel").onclick = () => (postDrawer.style.display = "none");
        topDoc.getElementById("smt-mom-post-submit").onclick = async () => {
            const txt = topDoc.getElementById("smt-mom-post-txt").value.trim(), imgInput = topDoc.getElementById("smt-mom-post-img").value.trim();
            if (!txt && !imgInput) return alert("请填写动态文案或配图画面！");
            const c = getCtx(), d = getFeedData(), isUrl = /^https?:|^data:/.test(imgInput);
            const newPost = { id: Date.now(), isMe: true, author: c.userName, loc: "SEOUL", time: "刚刚", filmNo: "MY MOMENT", text: txt, imgUrl: isUrl ? imgInput : "", photoDesc: isUrl ? "" : (imgInput || "随手定格的日常瞬间"), liked: true, likesCount: 18, comments: [] };
            d.posts.unshift(newPost); saveFeedData(d); topDoc.getElementById("smt-mom-post-txt").value = ""; topDoc.getElementById("smt-mom-post-img").value = ""; postDrawer.style.display = "none"; renderKrMoments();
            try {
                const aiReply = await askAI(`你是${c.charName}。人设：${c.charDesc.slice(0, 1000)}\n近期剧情：${c.recentChat}`, `${c.userName}刚发了一条动态：“${txt}”。请以${c.charName}的身份在底下留一条评论(35字以内)：`);
                const latest = getFeedData(), target = latest.posts.find((x) => x.id === newPost.id); if (target) { target.comments.push({ who: c.charName, text: aiReply }); saveFeedData(latest); renderKrMoments(); }
            } catch (e) {}
        };
        topDoc.getElementById("smt-mom-ai-post").onclick = async (e) => {
            const c = getCtx(); e.target.textContent = "⏳ 生成中...";
            try {
                const raw = await askAI(`你是${c.charName}。人设：${c.charDesc.slice(0, 1100)}\n近期剧情：${c.recentChat}`, `请在你的个人社交主页发一条新动态（韩国清冷白灰文艺风，与${c.userName}有关）。严格只输出JSON：{"loc":"首尔地点","note":"你头顶的5字以内云朵泡泡状态词","photoDesc":"45字以内的照片画面细腻描写","text":"动态正文(含1句韩文+中文翻译)","friendName":"1位共同好友的名字","friendComment":"该好友在底下的评论"}`);
                const m = raw.match(/\{[\s\S]*\}/);
                if (m) { const obj = JSON.parse(m[0]), d = getFeedData(); if (obj.note) d.charNote = obj.note; d.posts.unshift({ id: Date.now(), isMe: false, author: c.charName, loc: obj.loc || "SEOUL", time: "刚刚", filmNo: "35MM FILM", photoDesc: obj.photoDesc || "", imgUrl: "", text: obj.text || "", liked: false, likesCount: Math.floor(Math.random() * 50) + 20, comments: obj.friendComment ? [{ who: obj.friendName || "好友", text: obj.friendComment }] : [] }); saveFeedData(d); renderKrMoments(); }
            } catch (err) { alert(err.message); } finally { e.target.textContent = "✦ 让TA发新帖"; }
        };

        /* 🛡️ 【核心修复2：防串页全局清场锁】当点击底部任何 Tab 或其他应用时，立刻隐藏 #smt-page-couple_app！ */
        function hideCoupleAppPage() {
            coupleAppPage.classList.remove("active");
            ["sp_pet", "sp_4cut", "sp_qa", "sp_mood", "sp_coupon", "sp_guest"].forEach((k) => {
                topDoc.getElementById(`smt-page-${k}`)?.classList.remove("active");
            });
        }

        // 监听底部 5 个导航栏点击，切换任何主栏时自动关掉情侣空间 App！
        modal.querySelectorAll(".smt-tab-item").forEach((tab) => {
            tab.addEventListener("click", () => {
                hideCoupleAppPage();
                if (tab.getAttribute("data-page") === "space") {
                    setTimeout(renderKrMoments, 20);
                }
            }, true);
        });

        // 监听微信设置、管理员后台、查手机、网易云、日记的打开按钮，自动关掉情侣空间 App！
        ["smt-wx-cfg-btn", "smt-top-badge", "smt-api-open-admin", "smt-open-admin-btn"].forEach((id) => {
            topDoc.getElementById(id)?.addEventListener("click", () => hideCoupleAppPage(), true);
        });
        homePage.querySelectorAll("[data-openapp]").forEach((el) => {
            el.addEventListener("click", () => hideCoupleAppPage(), true);
        });

        function openStandaloneCoupleApp() {
            renderStandaloneCoupleSpace();
            topDoc.querySelectorAll("#seoul-mini-theater-modal .smt-page").forEach((p) => p.classList.remove("active"));
            coupleAppPage.classList.add("active");
            topDoc.getElementById("smt-back-text").textContent = "이전 · 返回主页";
            topDoc.getElementById("smt-top-title").textContent = "COUPLE SPACE · 情侣空间";
            topDoc.getElementById("smt-top-sub").textContent = "Standalone Couple App";
        }

        topDoc.getElementById("smt-home-open-couple-app")?.addEventListener("click", (e) => {
            e.stopPropagation();
            openStandaloneCoupleApp();
        });

        coupleAppPage.querySelectorAll("[data-cpopen]").forEach((item) => {
            item.onclick = () => {
                const subId = item.getAttribute("data-cpopen");
                renderStandaloneCoupleSpace();
                topDoc.querySelectorAll("#seoul-mini-theater-modal .smt-page").forEach((p) => p.classList.remove("active"));
                topDoc.getElementById(`smt-page-${subId}`)?.classList.add("active");
                topDoc.getElementById("smt-back-text").textContent = "이전 · 返回情侣空间";
            };
        });

        topDoc.getElementById("smt-header-back-btn").addEventListener("click", (e) => {
            const subIds = ["sp_pet", "sp_4cut", "sp_qa", "sp_mood", "sp_coupon", "sp_guest"];
            const isSubActive = subIds.some((k) => topDoc.getElementById(`smt-page-${k}`)?.classList.contains("active"));
            if (isSubActive) {
                e.stopImmediatePropagation(); e.preventDefault();
                openStandaloneCoupleApp();
            } else if (coupleAppPage.classList.contains("active")) {
                e.stopImmediatePropagation(); e.preventDefault();
                hideCoupleAppPage();
                topDoc.querySelector('.smt-tab-item[data-page="home"]')?.click();
            }
        }, true);

        function safeForceOpenModal() {
            modal.classList.add("smt-open");
            modal.style.setProperty("display", "flex", "important");
            const splash = topDoc.getElementById("smt-boot-splash");
            const lockLayer = topDoc.getElementById("seoul-boot-lock-layer");
            if (lockLayer && splash) {
                lockLayer.classList.remove("smt-unlocked-hide");
                splash.classList.remove("fade-out");
                splash.onclick = () => splash.classList.add("fade-out");
            }
            renderKrMoments();
            renderStandaloneCoupleSpace();
        }

        topDoc.addEventListener("click", (e) => {
            const t = e.target;
            if (!t || !t.closest) return;
            if (t.closest("#seoul-mini-theater-btn") || t.closest("#seoul-ext-open-btn") || t.closest("#seoul-wand-menu-item")) {
                safeForceOpenModal();
            }
        }, true);

        setInterval(() => {
            if (!modal.classList.contains("smt-open")) return;
            const cur = getCtx().safeScope;
            if (cur && cur !== observedCharScope) {
                renderKrMoments();
                renderStandaloneCoupleSpace();
            }
        }, 1200);

        renderKrMoments();
        renderStandaloneCoupleSpace();
    }

    mountMomentsAndFullCoupleApp();
})();
// ==========================================================================
// ❄️ 【Sumoul App 清冷银白 · 四幕式电影级开屏补丁（第1、2、3幕100%未动，第4幕终幕升级为「冰雾渐隐折线 + 霜银清冷文字」）】
// ==========================================================================
(function () {
    const topDoc = (window.parent || window).document;

    function mountFourActColdSilverSplash() {
        const modal = topDoc.getElementById("seoul-mini-theater-modal");
        const splash = topDoc.getElementById("smt-boot-splash");
        if (!modal || !splash) {
            setTimeout(mountFourActColdSilverSplash, 150);
            return;
        }

        // 清理旧开屏 CSS
        [
            "sumoul-liquid-tear-css",
            "sumoul-tear-splash-css",
            "sumoul-cinema-splash-css",
            "sumoul-gallery-splash-css",
            "sumoul-borderless-splash-css",
            "sumoul-master-one-splash-css",
            "sumoul-melancholy-v28-css",
            "sumoul-whitemist-v29-css",
            "sumoul-blink-rain-v31-css",
            "sumoul-destiny-v32-css",
            "sumoul-rainsnow-v33-css",
            "sumoul-coldsilver-v34-css",
            "sumoul-fouract-v35-css"
        ].forEach((id) => topDoc.getElementById(id)?.remove());

        const st = topDoc.createElement("style");
        st.id = "sumoul-fouract-v35-css";
        st.innerHTML = `
            /* ══════════════════════════════════════════════════════
               【动画 ①：0.0s ~ 2.5s 轻柔眨眼 + 3滴清透银白雨丝涟漪（100%原封不动）】
               ══════════════════════════════════════════════════════ */
            @keyframes faLidTop {
                0%   { transform: translateY(0%); }
                24%  { transform: translateY(-78%); }
                38%  { transform: translateY(-18%); }
                65%  { transform: translateY(-100%); }
                100% { transform: translateY(-100%); }
            }
            @keyframes faLidBot {
                0%   { transform: translateY(0%); }
                24%  { transform: translateY(78%); }
                38%  { transform: translateY(18%); }
                65%  { transform: translateY(100%); }
                100% { transform: translateY(100%); }
            }
            @keyframes faSilverDrop {
                0%   { transform: translateY(-55px) scaleY(1.25); opacity: 0; }
                40%  { opacity: 0.9; }
                80%  { transform: translateY(0px) scaleY(0.3); opacity: 0.95; }
                100% { transform: translateY(2px) scaleY(0.1); opacity: 0; }
            }
            @keyframes faSilverDot {
                0%   { transform: scale(0); opacity: 0; }
                35%  { transform: scale(1.25); opacity: 0.95; }
                100% { transform: scale(0.3); opacity: 0; }
            }
            @keyframes faSilverRingA {
                0%   { transform: scale(0.1); opacity: 0; }
                20%  { opacity: 0.9; }
                100% { transform: scale(2.15); opacity: 0; }
            }
            @keyframes faSilverRingB {
                0%   { transform: scale(0.1); opacity: 0; }
                25%  { opacity: 0.6; }
                100% { transform: scale(2.95); opacity: 0; }
            }

            #seoul-mini-theater-modal #smt-boot-splash .fa-lid-top {
                position: absolute !important; top: 0 !important; left: 0 !important; right: 0 !important; height: 52% !important;
                background: linear-gradient(180deg, #E8E8E8 0%, #F4F4F4 78%, rgba(244,244,244,0) 100%) !important;
                z-index: 25 !important; pointer-events: none !important;
                animation: faLidTop 1.8s cubic-bezier(0.4, 0, 0.2, 1) forwards !important;
            }
            #seoul-mini-theater-modal #smt-boot-splash .fa-lid-bot {
                position: absolute !important; bottom: 0 !important; left: 0 !important; right: 0 !important; height: 52% !important;
                background: linear-gradient(0deg, #E8E8E8 0%, #F4F4F4 78%, rgba(244,244,244,0) 100%) !important;
                z-index: 25 !important; pointer-events: none !important;
                animation: faLidBot 1.8s cubic-bezier(0.4, 0, 0.2, 1) forwards !important;
            }

            #seoul-mini-theater-modal #smt-boot-splash .fa-rain-spot {
                position: absolute !important; width: 90px !important; height: 90px !important;
                margin-left: -45px !important; margin-top: -45px !important;
                pointer-events: none !important; z-index: 8 !important;
                display: flex !important; align-items: center !important; justify-content: center !important;
            }
            #seoul-mini-theater-modal #smt-boot-splash .fa-drop {
                position: absolute !important; bottom: 45px !important; left: 50% !important;
                width: 1.15px !important; height: 38px !important; margin-left: -0.55px !important;
                border-radius: 99px !important;
                background: linear-gradient(180deg, rgba(255,255,255,0) 0%, #B2B2B2 55%, #FFFFFF 100%) !important;
                box-shadow: 0 0 6px #FFFFFF !important;
                opacity: 0 !important; transform-origin: bottom center !important;
            }
            #seoul-mini-theater-modal #smt-boot-splash .fa-dot {
                position: absolute !important; width: 4px !important; height: 4px !important;
                border-radius: 50% !important; background: #FFFFFF !important;
                border: 0.8px solid #A2A2A2 !important;
                box-shadow: 0 0 8px #FFFFFF !important; opacity: 0 !important;
            }
            #seoul-mini-theater-modal #smt-boot-splash .fa-ring-1,
            #seoul-mini-theater-modal #smt-boot-splash .fa-ring-2 {
                position: absolute !important; width: 48px !important; height: 20px !important;
                border-radius: 50% !important; border: 1px solid #A8A8A8 !important;
                box-shadow: 0 0 8px #FFFFFF, inset 0 0 6px #FFFFFF !important; opacity: 0 !important;
            }
            #seoul-mini-theater-modal #smt-boot-splash .fa-ring-2 { border: 0.7px solid #C4C4C4 !important; }

            /* 第1滴：左上 (0.5s) */
            #seoul-mini-theater-modal #smt-boot-splash .f-spot-1 .fa-drop   { animation: faSilverDrop 0.46s cubic-bezier(0.4,0,1,1) 0.50s forwards !important; }
            #seoul-mini-theater-modal #smt-boot-splash .f-spot-1 .fa-dot    { animation: faSilverDot 0.55s ease-out 0.88s forwards !important; }
            #seoul-mini-theater-modal #smt-boot-splash .f-spot-1 .fa-ring-1 { animation: faSilverRingA 1.5s cubic-bezier(0.16,1,0.3,1) 0.90s forwards !important; }
            #seoul-mini-theater-modal #smt-boot-splash .f-spot-1 .fa-ring-2 { animation: faSilverRingB 1.8s cubic-bezier(0.16,1,0.3,1) 1.05s forwards !important; }

            /* 第2滴：右下 (1.2s) */
            #seoul-mini-theater-modal #smt-boot-splash .f-spot-2 .fa-drop   { animation: faSilverDrop 0.46s cubic-bezier(0.4,0,1,1) 1.20s forwards !important; }
            #seoul-mini-theater-modal #smt-boot-splash .f-spot-2 .fa-dot    { animation: faSilverDot 0.55s ease-out 1.58s forwards !important; }
            #seoul-mini-theater-modal #smt-boot-splash .f-spot-2 .fa-ring-1 { animation: faSilverRingA 1.5s cubic-bezier(0.16,1,0.3,1) 1.60s forwards !important; }
            #seoul-mini-theater-modal #smt-boot-splash .f-spot-2 .fa-ring-2 { animation: faSilverRingB 1.8s cubic-bezier(0.16,1,0.3,1) 1.75s forwards !important; }

            /* 第3滴：正中 (1.88s) */
            #seoul-mini-theater-modal #smt-boot-splash .f-spot-3 .fa-drop   { height: 44px !important; animation: faSilverDrop 0.48s cubic-bezier(0.4,0,1,1) 1.88s forwards !important; }
            #seoul-mini-theater-modal #smt-boot-splash .f-spot-3 .fa-dot    { animation: faSilverDot 0.6s ease-out 2.28s forwards !important; }
            #seoul-mini-theater-modal #smt-boot-splash .f-spot-3 .fa-ring-1 { width: 58px !important; height: 24px !important; animation: faSilverRingA 1.7s cubic-bezier(0.16,1,0.3,1) 2.30s forwards !important; }
            #seoul-mini-theater-modal #smt-boot-splash .f-spot-3 .fa-ring-2 { width: 58px !important; height: 24px !important; animation: faSilverRingB 2.0s cubic-bezier(0.16,1,0.3,1) 2.45s forwards !important; }

            /* ══════════════════════════════════════════════════════
               【动画 ②：2.45s ~ 4.25s 孤雪飘旋 · 凝结化雨（100%原封不动）】
               ══════════════════════════════════════════════════════ */
            @keyframes faSnowCrystalSpin {
                0%   { opacity: 0; transform: translateY(-22px) scale(0.4) rotate(-60deg); filter: blur(6px); }
                28%  { opacity: 1; transform: translateY(0px) scale(1) rotate(0deg); filter: blur(0px); }
                72%  { opacity: 0.95; transform: translateY(4px) scale(1.06) rotate(45deg); filter: blur(0px); }
                100% { opacity: 0; transform: translateY(10px) scale(0.2) rotate(90deg); filter: blur(6px); }
            }
            @keyframes faSnowHalo {
                0%   { opacity: 0; transform: scale(0.3); }
                40%  { opacity: 0.85; transform: scale(1.1); }
                100% { opacity: 0; transform: scale(1.7); }
            }
            @keyframes faSnowWhisper {
                0%   { opacity: 0; filter: blur(8px); letter-spacing: 10px; }
                30%  { opacity: 0.85; filter: blur(0px); letter-spacing: 5px; }
                75%  { opacity: 0.85; filter: blur(0px); letter-spacing: 5px; }
                100% { opacity: 0; filter: blur(8px); letter-spacing: 8px; }
            }

            #seoul-mini-theater-modal #smt-boot-splash .fa-act2-snow {
                position: absolute !important; inset: 0 !important;
                display: flex !important; flex-direction: column !important; align-items: center !important; justify-content: center !important;
                pointer-events: none !important; z-index: 12 !important;
            }
            #seoul-mini-theater-modal #smt-boot-splash .fa-snowflake-svg {
                width: 84px !important; height: 84px !important;
                opacity: 0 !important;
                animation: faSnowCrystalSpin 1.85s cubic-bezier(0.22, 1, 0.36, 1) 2.42s forwards !important;
            }
            #seoul-mini-theater-modal #smt-boot-splash .fa-snow-halo {
                position: absolute !important; width: 110px !important; height: 110px !important;
                border-radius: 50% !important; border: 0.8px solid #FFFFFF !important;
                box-shadow: 0 0 20px #FFFFFF, inset 0 0 14px #FFFFFF !important;
                opacity: 0 !important;
                animation: faSnowHalo 1.8s ease-out 2.48s forwards !important;
            }
            #seoul-mini-theater-modal #smt-boot-splash .fa-snow-sub {
                margin-top: 14px !important;
                font-size: 9px !important; font-weight: 700 !important; color: #8A8A8A !important;
                text-shadow: 0 0 10px #FFFFFF !important;
                opacity: 0 !important;
                animation: faSnowWhisper 1.75s ease 2.48s forwards !important;
            }

            /* ══════════════════════════════════════════════════════
               【动画 ③：4.08s ~ 6.58s 精致六角雪花飘过 ➔ 修长圣十字(†) + 底部滴水涟漪 + 精致小字宿命制作（100%原封不动）】
               ══════════════════════════════════════════════════════ */
            @keyframes faElegantSnowPass {
                0%   { transform: translate(-64px, -68px) rotate(-110deg) scale(0.35); opacity: 0; filter: blur(4px); }
                32%  { opacity: 0.95; filter: blur(0px); }
                74%  { transform: translate(0px, -24px) rotate(15deg) scale(0.82); opacity: 1; filter: blur(0px); }
                100% { transform: translate(8px, -18px) rotate(55deg) scale(0.1); opacity: 0; filter: blur(4px); }
            }
            @keyframes faLatinCrossV {
                0%   { height: 0px; opacity: 0; }
                22%  { height: 186px; opacity: 0.95; }
                78%  { height: 192px; opacity: 0.9; }
                100% { height: 0px; opacity: 0; }
            }
            @keyframes faLatinCrossH {
                0%   { width: 0px; opacity: 0; }
                22%  { width: 128px; opacity: 0.95; }
                78%  { width: 134px; opacity: 0.9; }
                100% { width: 0px; opacity: 0; }
            }
            @keyframes faCrossDiamondCore {
                0%   { transform: scale(0.2); opacity: 0; }
                24%  { transform: scale(1); opacity: 1; }
                76%  { transform: scale(1.04); opacity: 0.92; }
                100% { transform: scale(0.2); opacity: 0; }
            }
            @keyframes faCrossBottomDrip {
                0%   { transform: translateY(-28px) scale(0.4); opacity: 0; }
                25%  { transform: translateY(0px) scale(1); opacity: 1; }
                45%  { transform: translateY(3px) scale(1.08); opacity: 1; }
                88%  { transform: translateY(34px) scale(0.65); opacity: 0.95; }
                100% { transform: translateY(38px) scale(0.2); opacity: 0; }
            }
            @keyframes faCrossDripRippleA {
                0%   { transform: scale(0.1); opacity: 0; }
                20%  { opacity: 0.9; }
                100% { transform: scale(2.0); opacity: 0; }
            }
            @keyframes faCrossDripRippleB {
                0%   { transform: scale(0.1); opacity: 0; }
                25%  { opacity: 0.6; }
                100% { transform: scale(2.8); opacity: 0; }
            }
            @keyframes faRefinedDestinyText {
                0%   { opacity: 0; filter: blur(8px); transform: translateY(5px); }
                26%  { opacity: 1; filter: blur(0px); transform: translateY(0px); }
                76%  { opacity: 1; filter: blur(0px); transform: translateY(0px); }
                100% { opacity: 0; filter: blur(8px); transform: translateY(-4px); }
            }

            #seoul-mini-theater-modal #smt-boot-splash .fa-act3-cross {
                position: absolute !important; inset: 0 !important;
                display: flex !important; align-items: center !important; justify-content: center !important;
                pointer-events: none !important; z-index: 14 !important;
            }
            #seoul-mini-theater-modal #smt-boot-splash .fa-passing-snow {
                position: absolute !important; width: 58px !important; height: 58px !important;
                opacity: 0 !important;
                animation: faElegantSnowPass 0.68s cubic-bezier(0.25, 0.1, 0.25, 1) 4.06s forwards !important;
            }
            #seoul-mini-theater-modal #smt-boot-splash .fa-cross-v {
                position: absolute !important; width: 1.2px !important; height: 0px;
                margin-top: -10px !important;
                background: linear-gradient(180deg, transparent 0%, #B8B8B8 16%, #787878 42%, #9A9A9A 88%, #FFFFFF 100%) !important;
                box-shadow: 0 0 12px #FFFFFF, 0 0 4px #FFFFFF !important;
                opacity: 0 !important;
                animation: faLatinCrossV 2.02s cubic-bezier(0.16, 1, 0.3, 1) 4.54s forwards !important;
            }
            #seoul-mini-theater-modal #smt-boot-splash .fa-cross-h {
                position: absolute !important; height: 1.2px !important; width: 0px;
                margin-top: -48px !important;
                background: linear-gradient(90deg, transparent 0%, #C2C2C2 20%, #787878 50%, #C2C2C2 80%, transparent 100%) !important;
                box-shadow: 0 0 12px #FFFFFF, 0 0 4px #FFFFFF !important;
                opacity: 0 !important;
                animation: faLatinCrossH 2.02s cubic-bezier(0.16, 1, 0.3, 1) 4.54s forwards !important;
            }
            #seoul-mini-theater-modal #smt-boot-splash .fa-cross-jewel {
                position: absolute !important; width: 140px !important; height: 200px !important;
                margin-top: -10px !important;
                opacity: 0 !important;
                animation: faCrossDiamondCore 2.0s cubic-bezier(0.16, 1, 0.3, 1) 4.56s forwards !important;
            }
            #seoul-mini-theater-modal #smt-boot-splash .fa-cross-drip-bead {
                position: absolute !important; width: 6px !important; height: 9px !important;
                margin-top: 82px !important;
                opacity: 0 !important;
                animation: faCrossBottomDrip 0.72s cubic-bezier(0.4, 0, 0.85, 1) 4.82s forwards !important;
            }
            #seoul-mini-theater-modal #smt-boot-splash .fa-cross-drip-ring1,
            #seoul-mini-theater-modal #smt-boot-splash .fa-cross-drip-ring2 {
                position: absolute !important; width: 42px !important; height: 14px !important;
                margin-top: 120px !important;
                border-radius: 50% !important; border: 1px solid #9E9E9E !important;
                box-shadow: 0 0 8px #FFFFFF, inset 0 0 5px #FFFFFF !important;
                opacity: 0 !important;
            }
            #seoul-mini-theater-modal #smt-boot-splash .fa-cross-drip-ring2 {
                border: 0.7px solid #C2C2C2 !important;
            }
            #seoul-mini-theater-modal #smt-boot-splash .fa-cross-drip-ring1 {
                animation: faCrossDripRippleA 1.35s cubic-bezier(0.16, 1, 0.3, 1) 5.42s forwards !important;
            }
            #seoul-mini-theater-modal #smt-boot-splash .fa-cross-drip-ring2 {
                animation: faCrossDripRippleB 1.55s cubic-bezier(0.16, 1, 0.3, 1) 5.54s forwards !important;
            }
            #seoul-mini-theater-modal #smt-boot-splash .fa-destiny-pure {
                position: absolute !important; z-index: 16 !important;
                margin-top: 168px !important;
                text-shadow: 0 0 14px #FFFFFF, 0 0 6px #FFFFFF !important;
                opacity: 0 !important;
                animation: faRefinedDestinyText 1.95s cubic-bezier(0.16, 1, 0.3, 1) 4.66s forwards !important;
            }

            /* ══════════════════════════════════════════════════════
               ❄️【清冷冰雾升级版 · 动画 ④：6.55s 起 渐隐冰丝折线 + 四芒冰晶渐线 + 霜银雾感文字】
               ══════════════════════════════════════════════════════ */
            @keyframes faAct4In {
                0%   { opacity: 0; filter: blur(12px); transform: translateY(6px); }
                100% { opacity: 1; filter: blur(0px); transform: translateY(0px); }
            }
            @keyframes faTraceDraw {
                0%   { stroke-dashoffset: 280; opacity: 0; }
                15%  { opacity: 0.92; }
                100% { stroke-dashoffset: 0; opacity: 0.92; }
            }
            @keyframes faGlintFlow {
                0%   { stroke-dashoffset: 280; opacity: 0; }
                25%  { opacity: 1; }
                80%  { opacity: 1; }
                100% { stroke-dashoffset: -50; opacity: 0; }
            }
            @keyframes faSilverGradLine {
                0%   { width: 0%; opacity: 0; }
                30%  { opacity: 0.9; }
                100% { width: 82%; opacity: 0.9; }
            }
            @keyframes faRainSnowFall {
                0%   { transform: translateY(-30px); opacity: 0; }
                35%  { opacity: 0.68; }
                75%  { opacity: 0.68; }
                100% { transform: translateY(145px); opacity: 0; }
            }
            @keyframes faEndRipple {
                0%   { transform: scale(0.2); opacity: 0.85; }
                100% { transform: scale(2.4); opacity: 0; }
            }
            /* 微雪冰尘在折线旁轻轻呼吸浮动 */
            @keyframes faIceMoteFloat {
                0%, 100% { transform: translateY(0px) scale(0.9); opacity: 0.35; }
                50%      { transform: translateY(-7px) scale(1.25); opacity: 0.95; }
            }
            @keyframes faSoftBreathe {
                0%, 100% { opacity: 0.28; }
                50%      { opacity: 0.78; }
            }

            #seoul-mini-theater-modal #smt-boot-splash .fa-bg-rain {
                position: absolute !important; width: 1px !important;
                background: linear-gradient(180deg, transparent 0%, #BDBDBD 55%, #FFFFFF 100%) !important;
                pointer-events: none !important; opacity: 0; z-index: 2 !important;
                animation: faRainSnowFall 3.6s linear infinite !important;
            }
            #seoul-mini-theater-modal #smt-boot-splash .fa-bg-snow {
                position: absolute !important; border-radius: 50% !important;
                background: #FFFFFF !important; border: 0.8px solid #CCCCCC !important;
                box-shadow: 0 0 6px #FFFFFF !important;
                pointer-events: none !important; opacity: 0; z-index: 2 !important;
                animation: faRainSnowFall 5.0s ease-in-out infinite !important;
            }

            #seoul-mini-theater-modal #smt-boot-splash .fa-a4-head  { opacity: 0; animation: faAct4In 1.8s ease 6.50s forwards !important; }
            #seoul-mini-theater-modal #smt-boot-splash .fa-a4-stage { opacity: 0; animation: faAct4In 1.8s ease 6.55s forwards !important; }
            #seoul-mini-theater-modal #smt-boot-splash .fa-main-path {
                stroke-dasharray: 280 !important; stroke-dashoffset: 280 !important;
                animation: faTraceDraw 2.7s cubic-bezier(0.22, 0.61, 0.36, 1) 6.60s forwards !important;
            }
            #seoul-mini-theater-modal #smt-boot-splash .fa-main-glint {
                stroke-dasharray: 28 252 !important; stroke-dashoffset: 280 !important;
                animation: faGlintFlow 3.6s ease-in-out 7.1s infinite !important;
            }
            #seoul-mini-theater-modal #smt-boot-splash .fa-end-rip {
                transform-box: fill-box !important; transform-origin: center !important;
                opacity: 0; animation: faEndRipple 3.6s ease-out 7.4s infinite !important;
            }
            #seoul-mini-theater-modal #smt-boot-splash .fa-end-rip-2 {
                transform-box: fill-box !important; transform-origin: center !important;
                opacity: 0; animation: faEndRipple 3.6s ease-out 8.6s infinite !important;
            }
            #seoul-mini-theater-modal #smt-boot-splash .fa-ice-mote {
                transform-box: fill-box !important; transform-origin: center !important;
                animation: faIceMoteFloat 3.8s ease-in-out infinite !important;
            }

            /* 清冷极细冰丝渐线（带纯白光晕，中央嵌一颗微缩菱形冰晶） */
            #seoul-mini-theater-modal #smt-boot-splash .fa-grad-line {
                position: relative !important; height: 0.9px !important; width: 0%;
                margin: 16px auto 18px auto !important;
                background: linear-gradient(90deg, transparent 0%, #D8D8D8 25%, #9E9E9E 50%, #D8D8D8 75%, transparent 100%) !important;
                box-shadow: 0 0 8px #FFFFFF !important;
                opacity: 0;
                animation: faSilverGradLine 2.2s cubic-bezier(0.16, 1, 0.3, 1) 6.80s forwards !important;
            }
            #seoul-mini-theater-modal #smt-boot-splash .fa-grad-line::after {
                content: "" !important; position: absolute !important; left: 50% !important; top: -2.2px !important;
                margin-left: -2.5px !important; width: 5px !important; height: 5px !important;
                background: #FFFFFF !important; border: 0.8px solid #9A9A9A !important;
                transform: rotate(45deg) !important;
                box-shadow: 0 0 8px #FFFFFF !important;
            }
            #seoul-mini-theater-modal #smt-boot-splash .fa-grad-sub {
                height: 0.7px !important; width: 0%; margin: 16px auto 0 auto !important;
                background: linear-gradient(90deg, transparent 0%, #E2E2E2 32%, #B5B5B5 50%, #E2E2E2 68%, transparent 100%) !important;
                opacity: 0;
                animation: faSilverGradLine 2.4s cubic-bezier(0.16, 1, 0.3, 1) 7.45s forwards !important;
            }

            #seoul-mini-theater-modal #smt-boot-splash .fa-t-title { opacity: 0; animation: faAct4In 2.0s cubic-bezier(0.16,1,0.3,1) 6.70s forwards !important; }
            #seoul-mini-theater-modal #smt-boot-splash .fa-t-kr    { opacity: 0; animation: faAct4In 2.1s cubic-bezier(0.16,1,0.3,1) 7.10s forwards !important; }
            #seoul-mini-theater-modal #smt-boot-splash .fa-t-cn    { opacity: 0; animation: faAct4In 2.1s cubic-bezier(0.16,1,0.3,1) 7.45s forwards !important; }
            #seoul-mini-theater-modal #smt-boot-splash .fa-t-foot  { opacity: 0; animation: faAct4In 2.0s cubic-bezier(0.16,1,0.3,1) 7.80s forwards !important; }
            #seoul-mini-theater-modal #smt-boot-splash .fa-breathe { animation: faSoftBreathe 3.6s ease-in-out infinite !important; }
        `;
        topDoc.head.appendChild(st);

        function playFourActSplash() {
            // 通透清冷的纯白雾至浅银灰背景 (#FFFFFF -> #F6F6F6 -> #ECECEC)
            splash.style.cssText = "position:absolute!important;inset:0!important;background:radial-gradient(circle at 50% 42%, #FFFFFF 0%, #F6F6F6 56%, #ECECEC 100%)!important;z-index:10!important;display:flex!important;flex-direction:column!important;align-items:center!important;justify-content:space-between!important;transition:opacity 0.75s ease!important;padding:max(32px,env(safe-area-inset-top,32px)) 24px max(36px,env(safe-area-inset-bottom,36px)) 24px!important;text-align:center!important;cursor:pointer!important;box-sizing:border-box!important;overflow:hidden!important;font-family:-apple-system,BlinkMacSystemFont,'Apple SD Gothic Neo','PingFang SC','Microsoft YaHei',sans-serif!important;";

            splash.innerHTML = `
                <!-- ❄️ 全场背景无声飘落的半透明银白雨丝与雪点 -->
                <div class="fa-bg-rain" style="left:16%;top:10%;height:46px;animation-delay:0.3s;"></div>
                <div class="fa-bg-rain" style="left:83%;top:16%;height:52px;animation-delay:1.5s;"></div>
                <div class="fa-bg-rain" style="left:26%;top:46%;height:42px;animation-delay:2.6s;"></div>
                <div class="fa-bg-rain" style="left:74%;top:50%;height:48px;animation-delay:0.8s;"></div>
                <div class="fa-bg-snow" style="left:21%;top:22%;width:4px;height:4px;animation-delay:0.2s;"></div>
                <div class="fa-bg-snow" style="left:79%;top:30%;width:3.5px;height:3.5px;animation-delay:1.7s;"></div>
                <div class="fa-bg-snow" style="left:34%;top:62%;width:4px;height:4px;animation-delay:2.9s;"></div>
                <div class="fa-bg-snow" style="left:67%;top:25%;width:3.5px;height:3.5px;animation-delay:2.1s;"></div>

                <!-- ══════════════════════════════════════════════════
                     【动画 ①：眨眼苏醒 + 3滴清透银白雨丝涟漪（100%未动）】
                     ══════════════════════════════════════════════════ -->
                <div class="fa-lid-top"></div>
                <div class="fa-lid-bot"></div>

                <div class="fa-rain-spot f-spot-1" style="left:26%;top:30%;">
                    <div class="fa-drop"></div><div class="fa-dot"></div><div class="fa-ring-1"></div><div class="fa-ring-2"></div>
                </div>
                <div class="fa-rain-spot f-spot-2" style="left:74%;top:58%;">
                    <div class="fa-drop"></div><div class="fa-dot"></div><div class="fa-ring-1"></div><div class="fa-ring-2"></div>
                </div>
                <div class="fa-rain-spot f-spot-3" style="left:50%;top:42%;">
                    <div class="fa-drop"></div><div class="fa-dot"></div><div class="fa-ring-1"></div><div class="fa-ring-2"></div>
                </div>

                <!-- ══════════════════════════════════════════════════
                     【动画 ②：六角孤雪旋转飘落 · 凝结化雨（100%未动）】
                     ══════════════════════════════════════════════════ -->
                <div class="fa-act2-snow">
                    <div class="fa-snow-halo"></div>
                    <svg class="fa-snowflake-svg" viewBox="0 0 100 100" fill="none">
                        <g stroke="#8E8E8E" stroke-width="1.1" stroke-linecap="round">
                            <line x1="50" y1="12" x2="50" y2="88" />
                            <line x1="17" y1="31" x2="83" y2="69" />
                            <line x1="83" y1="31" x2="17" y2="69" />
                            <path d="M44 22 L50 28 L56 22 M44 78 L50 72 L56 78" />
                            <path d="M23 41 L31 39 L29 31 M77 59 L69 61 L71 69" />
                            <path d="M71 31 L69 39 L77 41 M29 69 L31 61 L23 59" />
                        </g>
                        <polygon points="50,36 62,43 62,57 50,64 38,57 38,43" fill="rgba(255,255,255,0.75)" stroke="#FFFFFF" stroke-width="1.2" />
                        <circle cx="50" cy="50" r="3" fill="#FFFFFF" stroke="#888888" stroke-width="0.9" />
                    </svg>
                    <div class="fa-snow-sub">FIRST SNOW · 初雪化雨</div>
                </div>

                <!-- ══════════════════════════════════════════════════
                     【动画 ③：同款精致六角雪花飘过 ➔ 化作修长圣十字(†) + 底部凝结滴水涟漪 + 精致小字宿命制作（100%未动）】
                     ══════════════════════════════════════════════════ -->
                <div class="fa-act3-cross">
                    <svg class="fa-passing-snow" viewBox="0 0 100 100" fill="none">
                        <g stroke="#8E8E8E" stroke-width="1.15" stroke-linecap="round">
                            <line x1="50" y1="12" x2="50" y2="88" />
                            <line x1="17" y1="31" x2="83" y2="69" />
                            <line x1="83" y1="31" x2="17" y2="69" />
                            <path d="M44 22 L50 28 L56 22 M44 78 L50 72 L56 78" />
                            <path d="M23 41 L31 39 L29 31 M77 59 L69 61 L71 69" />
                            <path d="M71 31 L69 39 L77 41 M29 69 L31 61 L23 59" />
                        </g>
                        <polygon points="50,36 62,43 62,57 50,64 38,57 38,43" fill="rgba(255,255,255,0.85)" stroke="#FFFFFF" stroke-width="1.2" />
                        <circle cx="50" cy="50" r="3" fill="#FFFFFF" stroke="#888888" stroke-width="0.9" />
                    </svg>

                    <div class="fa-cross-v"></div>
                    <div class="fa-cross-h"></div>

                    <svg class="fa-cross-jewel" viewBox="0 0 140 200" fill="none">
                        <polygon points="70,60 82,76 70,92 58,76" fill="rgba(255,255,255,0.65)" stroke="#FFFFFF" stroke-width="1.2" />
                        <path d="M 70 54 Q 70 76 92 76 Q 70 76 70 98 Q 70 76 48 76 Q 70 76 70 54 Z" fill="#FFFFFF" stroke="#8A8A8A" stroke-width="0.85" stroke-linejoin="round" />
                        <circle cx="70" cy="76" r="2.0" fill="#7A7A7A" />
                        <circle cx="70" cy="36" r="1.5" fill="#FFFFFF" stroke="#9A9A9A" stroke-width="0.8" />
                        <circle cx="38" cy="76" r="1.5" fill="#FFFFFF" stroke="#9A9A9A" stroke-width="0.8" />
                        <circle cx="102" cy="76" r="1.5" fill="#FFFFFF" stroke="#9A9A9A" stroke-width="0.8" />
                        <circle cx="70" cy="126" r="1.7" fill="#FFFFFF" stroke="#8E8E8E" stroke-width="0.85" />
                        <circle cx="70" cy="186" r="1.8" fill="#FFFFFF" stroke="#888888" stroke-width="0.9" />
                    </svg>

                    <svg class="fa-cross-drip-bead" viewBox="0 0 12 18" fill="none">
                        <path d="M 6 1 C 6 1 1.5 8.5 1.5 12 C 1.5 14.8 3.5 16.8 6 16.8 C 8.5 16.8 10.5 14.8 10.5 12 C 10.5 8.5 6 1 6 1 Z" fill="#FFFFFF" stroke="#828282" stroke-width="1.1" />
                    </svg>

                    <div class="fa-cross-drip-ring1"></div>
                    <div class="fa-cross-drip-ring2"></div>

                    <div class="fa-destiny-pure">
                        <div style="font-size:11.5px;font-weight:700;color:#555555!important;letter-spacing:11px;text-indent:11px;">
                            宿命制作
                        </div>
                        <div style="font-size:6.2px;font-weight:600;color:#A0A0A0!important;letter-spacing:3.8px;margin-top:4px;">
                            DESTINY PRODUCTION
                        </div>
                    </div>
                </div>

                <!-- ══════════════════════════════════════════════════
                     ❄️【清冷冰雾升级版 · 动画 ④：渐隐冰丝微折雨线 + 四芒冰晶渐线 + 霜银雾感文字】
                     ══════════════════════════════════════════════════ -->
                <div class="fa-a4-head" style="width:100%;max-width:300px;display:flex;justify-content:space-between;align-items:center;font-size:7.2px;font-weight:600;color:#A8A8A8!important;letter-spacing:3.5px;font-family:monospace;z-index:5;">
                    <span>SUMOUL · 宿命制作</span>
                    <span>04:00 AM</span>
                </div>

                <div style="width:100%;max-width:316px;display:flex;flex-direction:column;align-items:center;justify-content:center;my:auto;z-index:5;">
                    
                    <!-- 主视觉：清冷冰雾柔光折线 + 圣十字残影 + 悬浮微雪冰尘 + 双层呼吸水纹 -->
                    <div class="fa-a4-stage" style="width:100%;height:158px;display:flex;align-items:center;justify-content:center;margin-bottom:8px;">
                        <svg viewBox="0 0 220 158" width="220" height="158" fill="none" style="overflow:visible!important;">
                            <defs>
                                <!-- 折线上下两端自然融于白雾的清冷银白渐变 -->
                                <linearGradient id="faColdTraceGrad" x1="110" y1="6" x2="110" y2="140" gradientUnits="userSpaceOnUse">
                                    <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.1" />
                                    <stop offset="22%" stop-color="#B8B8B8" stop-opacity="0.75" />
                                    <stop offset="65%" stop-color="#8A8A8A" stop-opacity="0.9" />
                                    <stop offset="100%" stop-color="#B0B0B0" stop-opacity="0.85" />
                                </linearGradient>
                                <!-- 冰雾高斯柔焦滤镜 -->
                                <filter id="faIceMistBlur" x="-30%" y="-30%" width="160%" height="160%">
                                    <feGaussianBlur stdDeviation="3.2" result="blur" />
                                </filter>
                            </defs>

                            <!-- 刚刚第3幕圣十字留下的极淡微光残影 -->
                            <line x1="68" y1="46" x2="152" y2="46" stroke="#EAEAEA" stroke-width="0.7" />
                            <line x1="110" y1="6" x2="110" y2="142" stroke="#ECECEC" stroke-width="0.7" stroke-dasharray="1.5 3.5" />

                            <!-- 折线两侧静静呼吸浮动的微雪冰尘与细雨丝 -->
                            <g class="fa-ice-mote">
                                <line x1="58" y1="20" x2="58" y2="46" stroke="#DCDCDC" stroke-width="0.8" stroke-linecap="round" />
                                <circle cx="58" cy="50" r="1.4" fill="#FFFFFF" stroke="#B8B8B8" stroke-width="0.7" />
                            </g>
                            <g class="fa-ice-mote" style="animation-delay:1.6s;">
                                <line x1="162" y1="32" x2="162" y2="60" stroke="#DCDCDC" stroke-width="0.8" stroke-linecap="round" />
                                <circle cx="162" cy="64" r="1.4" fill="#FFFFFF" stroke="#B8B8B8" stroke-width="0.7" />
                            </g>
                            <circle class="fa-ice-mote" cx="76" cy="96" r="1.2" fill="#FFFFFF" stroke="#CCCCCC" stroke-width="0.6" style="animation-delay:0.8s;" />
                            <circle class="fa-ice-mote" cx="146" cy="18" r="1.3" fill="#FFFFFF" stroke="#CCCCCC" stroke-width="0.6" style="animation-delay:2.3s;" />

                            <!-- 1. 折线底层：宽 7px 的纯白冰雾柔焦光晕（让折线像浸在冷雾里一样通透！） -->
                            <path class="fa-main-path" d="M 110 8 L 110 38 L 99 62 L 119 90 L 103 116 L 110 138" stroke="#FFFFFF" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" filter="url(#faIceMistBlur)" />

                            <!-- 2. 主冰丝折线：0.95px 纤长清冷浅银灰（收窄折角，更加修长孤寂） -->
                            <path class="fa-main-path" d="M 110 8 L 110 38 L 99 62 L 119 90 L 103 116 L 110 138" stroke="url(#faColdTraceGrad)" stroke-width="0.95" stroke-linecap="round" stroke-linejoin="round" />

                            <!-- 3. 顺着折线缓缓往下淌的纯白冰晶流光 -->
                            <path class="fa-main-glint" d="M 110 8 L 110 38 L 99 62 L 119 90 L 103 116 L 110 138" stroke="#FFFFFF" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />

                            <!-- 4. 折角处凝结的微小纯白冰露与纤细四芒冰星 -->
                            <circle cx="110" cy="38" r="1.5" fill="#FFFFFF" stroke="#A6A6A6" stroke-width="0.8" />
                            <!-- 第一个折角的小四芒冰星 -->
                            <path d="M 99 57 L 100.2 60.8 L 104 62 L 100.2 63.2 L 99 67 L 97.8 63.2 L 94 62 L 97.8 60.8 Z" fill="#FFFFFF" stroke="#9E9E9E" stroke-width="0.6" />
                            <circle cx="119" cy="90" r="1.7" fill="#FFFFFF" stroke="#969696" stroke-width="0.85" />
                            <circle cx="103" cy="116" r="1.5" fill="#FFFFFF" stroke="#A6A6A6" stroke-width="0.8" />

                            <!-- 5. 折线尽头垂落的晶莹纯白小冰滴与双层呼吸涟漪 -->
                            <path d="M 110 135 C 110 135 107.8 139 107.8 140.8 C 107.8 142.1 108.8 143.2 110 143.2 C 111.2 143.2 112.2 142.1 112.2 140.8 C 112.2 139 110 135 110 135 Z" fill="#FFFFFF" stroke="#909090" stroke-width="0.85" />
                            <ellipse class="fa-end-rip" cx="110" cy="145" rx="16" ry="3.8" fill="none" stroke="#B0B0B0" stroke-width="0.75" />
                            <ellipse class="fa-end-rip-2" cx="110" cy="145" rx="16" ry="3.8" fill="none" stroke="#FFFFFF" stroke-width="1.3" />
                            <ellipse cx="110" cy="145" rx="8" ry="1.8" fill="none" stroke="#FFFFFF" stroke-width="1.0" />
                        </svg>
                    </div>

                    <!-- 清冷霜银灰标题（提亮色号为 #5E5E5E + 纯白冰雾发光背影，去掉沉闷感！） -->
                    <div class="fa-t-title" style="font-size:18.5px;font-weight:700;letter-spacing:6.5px;text-indent:6.5px;color:#5E5E5E!important;text-shadow:0 0 16px #FFFFFF, 0 0 8px #FFFFFF!important;">
                        Sumoul App
                    </div>
                    <div class="fa-t-title" style="font-size:7px;font-weight:600;letter-spacing:4.2px;text-indent:4.2px;color:#A6A6A6!important;margin-top:5px;">
                        RAIN &amp; SNOW · 宿命制作
                    </div>

                    <!-- 第一道冰晶渐线（中央嵌一颗微缩菱形纯白冰晶） -->
                    <div class="fa-grad-line"></div>

                    <!-- 清冷疏离的霜银双语独白（色号 #6E6E6E / #969696 + 纯白雾光衬底） -->
                    <div class="fa-t-kr" style="font-size:10.2px;font-weight:600;color:#6E6E6E!important;line-height:2.1;letter-spacing:1.2px;text-shadow:0 0 12px #FFFFFF!important;">
                        “ 두 방울의 눈비가 마주쳐 십자로 교차하던 밤,<br>하얀 안개 속에 우리의 계절이 내린다. ”
                    </div>
                    <div class="fa-t-cn" style="font-size:8.8px;font-weight:500;color:#969696!important;line-height:1.95;letter-spacing:1.6px;margin-top:6px;text-shadow:0 0 10px #FFFFFF!important;">
                        两滴雨雪相遇、交错成十字的夜里，<br>白雾深处，正落下属于我们的季节。
                    </div>

                    <!-- 第二道浅银雾丝副渐线 -->
                    <div class="fa-grad-sub"></div>
                </div>

                <!-- 底部：清冷极简呼吸唤醒提示 -->
                <div class="fa-t-foot" style="padding-bottom:4px;z-index:5;">
                    <div class="fa-breathe" style="font-size:7.5px;font-weight:600;color:#888888!important;letter-spacing:4.2px;font-family:monospace;">
                        · &nbsp; TOUCH TO WAKE &nbsp; ·
                    </div>
                </div>
            `;

            splash.onclick = () => {
                splash.classList.add("fade-out");
            };
        }

        playFourActSplash();

        topDoc.addEventListener("click", (e) => {
            const t = e.target;
            if (!t || !t.closest) return;
            if (t.closest("#seoul-mini-theater-btn") || t.closest("#seoul-ext-open-btn") || t.closest("#seoul-wand-menu-item")) {
                splash.classList.remove("fade-out");
                playFourActSplash();
            }
        }, true);
    }

    mountFourActColdSilverSplash();
})();


// ==========================================================================
// 🤍 【Sumoul App 悬浮球高定重塑补丁：白雾磨砂星芒圆球 + 自由拖拽移动 + 贴边隐身/彻底隐藏】
// 用法：直接粘贴在 index.js 最末尾最后一行后面！
// ==========================================================================
(function () {
    const topWin = window.parent || window;
    const topDoc = topWin.document;
    const K_FAB_POS = "sumoul_v30_fab_pos";

    function mountDraggableMistFab() {
        const btn = topDoc.getElementById("seoul-mini-theater-btn");
        const modal = topDoc.getElementById("seoul-mini-theater-modal");
        if (!btn || !modal) {
            setTimeout(mountDraggableMistFab, 200);
            return;
        }

        // 防止重复初始化
        if (btn.getAttribute("data-v30-fab") === "1") return;
        btn.setAttribute("data-v30-fab", "1");

        // 1. 注入高定白雾磨砂悬浮球与贴边隐身条 CSS
        topDoc.getElementById("sumoul-v30-fab-css")?.remove();
        const st = topDoc.createElement("style");
        st.id = "sumoul-v30-fab-css";
        st.innerHTML = `
            @keyframes smFabStarBreathe {
                0%, 100% { transform: scale(0.92) rotate(0deg); opacity: 0.75; }
                50% { transform: scale(1.08) rotate(8deg); opacity: 1; }
            }

            /* 正常状态：38x38px 韩系纯白磨砂玻璃灵动圆球 */
            #seoul-mini-theater-btn {
                position: fixed !important;
                width: 38px !important;
                height: 38px !important;
                min-width: 38px !important;
                padding: 0 !important;
                border-radius: 50% !important;
                background: rgba(255, 255, 255, 0.84) !important;
                backdrop-filter: blur(14px) !important;
                -webkit-backdrop-filter: blur(14px) !important;
                border: 1px solid rgba(220, 220, 228, 0.9) !important;
                box-shadow: 0 6px 20px rgba(30, 30, 40, 0.10), inset 0 1px 2px #FFFFFF !important;
                display: flex !important;
                align-items: center !important;
                justify-content: center !important;
                cursor: grab !important;
                user-select: none !important;
                -webkit-user-select: none !important;
                touch-action: none !important;
                z-index: 2147483645 !important;
                opacity: 0.82 !important;
                transition: width 0.28s cubic-bezier(0.22,1,0.36,1), height 0.28s cubic-bezier(0.22,1,0.36,1), border-radius 0.28s ease, opacity 0.25s ease, box-shadow 0.25s ease !important;
            }
            #seoul-mini-theater-btn:hover,
            #seoul-mini-theater-btn.dragging {
                opacity: 1 !important;
                box-shadow: 0 8px 26px rgba(30, 30, 40, 0.16), inset 0 1px 2px #FFFFFF !important;
            }
            #seoul-mini-theater-btn .sm-fab-core {
                width: 20px !important;
                height: 20px !important;
                display: flex !important;
                align-items: center !important;
                justify-content: center !important;
                pointer-events: none !important;
                animation: smFabStarBreathe 4s ease-in-out infinite !important;
            }

            /* 悬浮球左上角极小巧的「贴边隐身」微触点（悬停或长按可见） */
            #seoul-mini-theater-btn .sm-fab-hide-dot {
                position: absolute !important;
                top: -3px !important;
                right: -3px !important;
                width: 14px !important;
                height: 14px !important;
                border-radius: 50% !important;
                background: #FFFFFF !important;
                border: 1px solid #DCDCE4 !important;
                color: #777777 !important;
                font-size: 8px !important;
                font-weight: 700 !important;
                line-height: 12px !important;
                text-align: center !important;
                cursor: pointer !important;
                pointer-events: auto !important;
                box-shadow: 0 2px 6px rgba(0,0,0,0.08) !important;
                opacity: 0.85 !important;
            }

            /* ── 贴边隐身状态（变成紧贴屏幕边缘的一根 6x36px 半透明白雾细条，完全不挡视线！） ── */
            #seoul-mini-theater-btn.sm-docked-edge {
                width: 8px !important;
                min-width: 8px !important;
                height: 40px !important;
                border-radius: 99px !important;
                background: rgba(255, 255, 255, 0.65) !important;
                border: 1px solid rgba(200, 200, 210, 0.8) !important;
                opacity: 0.55 !important;
                box-shadow: 0 2px 8px rgba(0,0,0,0.06) !important;
            }
            #seoul-mini-theater-btn.sm-docked-edge .sm-fab-core,
            #seoul-mini-theater-btn.sm-docked-edge .sm-fab-hide-dot {
                display: none !important;
            }

            /* 彻底隐藏状态 */
            #seoul-mini-theater-btn.sm-fully-hidden {
                display: none !important;
            }
        `;
        topDoc.head.appendChild(st);

        // 2. 替换悬浮球内部 HTML 为极简星芒微光图标 + 右上角「-」贴边隐身小圆点
        btn.innerHTML = `
            <div class="sm-fab-core">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#3A3A40" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M12 2.5 L14.4 9.6 L21.5 12 L14.4 14.4 L12 21.5 L9.6 14.4 L2.5 12 L9.6 9.6 Z" fill="rgba(255,255,255,0.7)" />
                    <circle cx="12" cy="12" r="1.3" fill="#3A3A40" />
                </svg>
            </div>
            <span class="sm-fab-hide-dot" title="点击贴边隐身（长按可彻底隐藏）">−</span>
        `;

        // 3. 读取保存的坐标与状态
        function loadFabState() {
            const def = { left: window.innerWidth - 52, top: window.innerHeight - 130, docked: false, side: "right", hidden: false };
            try {
                return Object.assign(def, JSON.parse(localStorage.getItem(K_FAB_POS) || "{}"));
            } catch (e) { return def; }
        }
        function saveFabState(s) {
            localStorage.setItem(K_FAB_POS, JSON.stringify(s));
        }

        let state = loadFabState();

        function applyFabPosition() {
            const vw = topWin.innerWidth || 390;
            const vh = topWin.innerHeight || 800;
            state.top = Math.max(16, Math.min(vh - 54, state.top));

            btn.style.setProperty("bottom", "auto", "important");
            btn.style.setProperty("right", "auto", "important");
            btn.style.setProperty("top", `${state.top}px`, "important");

            if (state.hidden) {
                btn.classList.add("sm-fully-hidden");
                return;
            } else {
                btn.classList.remove("sm-fully-hidden");
            }

            if (state.docked) {
                btn.classList.add("sm-docked-edge");
                const edgeX = state.side === "left" ? 2 : (vw - 10);
                btn.style.setProperty("left", `${edgeX}px`, "important");
            } else {
                btn.classList.remove("sm-docked-edge");
                state.left = Math.max(8, Math.min(vw - 46, state.left));
                btn.style.setProperty("left", `${state.left}px`, "important");
            }
        }

        applyFabPosition();
        topWin.addEventListener("resize", applyFabPosition);

        // 4. 阻断主代码在 btn 上绑定的旧死板 onclick，改由智能拖拽判别器接管！
        btn.onclick = null;

        let isDown = false;
        let hasMoved = false;
        let startX = 0, startY = 0;
        let origLeft = 0, origTop = 0;

        function onPointerDown(clientX, clientY, target) {
            if (target && target.classList?.contains("sm-fab-hide-dot")) return;
            isDown = true;
            hasMoved = false;
            startX = clientX;
            startY = clientY;
            const rect = btn.getBoundingClientRect();
            origLeft = rect.left;
            origTop = rect.top;
            btn.classList.add("dragging");
        }

        function onPointerMove(clientX, clientY) {
            if (!isDown) return;
            const dx = clientX - startX;
            const dy = clientY - startY;
            if (Math.hypot(dx, dy) > 6) {
                hasMoved = true;
                if (state.docked) {
                    state.docked = false;
                    btn.classList.remove("sm-docked-edge");
                }
                const vw = topWin.innerWidth || 390;
                const vh = topWin.innerHeight || 800;
                state.left = Math.max(4, Math.min(vw - 42, origLeft + dx));
                state.top = Math.max(12, Math.min(vh - 50, origTop + dy));
                btn.style.setProperty("left", `${state.left}px`, "important");
                btn.style.setProperty("top", `${state.top}px`, "important");
            }
        }

        function onPointerUp() {
            if (!isDown) return;
            isDown = false;
            btn.classList.remove("dragging");

            if (hasMoved) {
                const vw = topWin.innerWidth || 390;
                // 如果直接拖到了最左边或最右边边缘 (<12px)，自动进入贴边隐身细条状态！
                if (state.left <= 10) {
                    state.side = "left";
                    state.docked = true;
                } else if (state.left >= vw - 48) {
                    state.side = "right";
                    state.docked = true;
                } else {
                    state.side = state.left < vw / 2 ? "left" : "right";
                }
                saveFabState(state);
                applyFabPosition();
            }
        }

        // 鼠标拖拽支持
        btn.addEventListener("mousedown", (e) => {
            if (e.button !== 0) return;
            onPointerDown(e.clientX, e.clientY, e.target);
        });
        topDoc.addEventListener("mousemove", (e) => onPointerMove(e.clientX, e.clientY));
        topDoc.addEventListener("mouseup", () => onPointerUp());

        // 手机触摸丝滑拖拽支持
        btn.addEventListener("touchstart", (e) => {
            const t = e.touches[0];
            if (t) onPointerDown(t.clientX, t.clientY, e.target);
        }, { passive: true });
        topDoc.addEventListener("touchmove", (e) => {
            if (!isDown) return;
            const t = e.touches[0];
            if (t) onPointerMove(t.clientX, t.clientY);
        }, { passive: true });
        topDoc.addEventListener("touchend", () => onPointerUp());

        // 5. 点击右上角「−」微触点：一键缩成贴边隐身细条！
        btn.querySelector(".sm-fab-hide-dot")?.addEventListener("click", (e) => {
            e.stopPropagation();
            e.preventDefault();
            const vw = topWin.innerWidth || 390;
            state.side = state.left < vw / 2 ? "left" : "right";
            state.docked = true;
            saveFabState(state);
            applyFabPosition();
        }, true);

        // 6. 拦截捕获级 click：如果是拖拽松手或点隐身细条展开，绝不误触打开弹窗！
        topDoc.addEventListener("click", (e) => {
            const t = e.target;
            if (!t || !t.closest) return;
            if (t.closest(".sm-fab-hide-dot")) {
                e.stopImmediatePropagation();
                e.preventDefault();
                return;
            }
            if (t.closest("#seoul-mini-theater-btn")) {
                // 如果刚刚是在拖动位置，阻止打开弹窗！
                if (hasMoved) {
                    e.stopImmediatePropagation();
                    e.preventDefault();
                    hasMoved = false;
                    return;
                }
                // 如果当前处于「贴边隐身细条」状态，点第一下先弹出恢复成圆球！
                if (state.docked) {
                    e.stopImmediatePropagation();
                    e.preventDefault();
                    state.docked = false;
                    const vw = topWin.innerWidth || 390;
                    state.left = state.side === "left" ? 14 : (vw - 52);
                    saveFabState(state);
                    applyFabPosition();
                    return;
                }
            }
        }, true);

        // 7. 在酒馆「扩展面板」里增加【👁️ 隐藏/显示悬浮球 & 重置位置】快捷按钮
        setTimeout(() => {
            const extContent = topDoc.querySelector("#seoul-ext-settings-panel .inline-drawer-content");
            if (extContent && !topDoc.getElementById("sm-fab-toggle-hide-btn")) {
                const ctrlRow = topDoc.createElement("div");
                ctrlRow.style.cssText = "display:flex;gap:6px;margin-top:6px;";
                ctrlRow.innerHTML = `
                    <div id="sm-fab-toggle-hide-btn" class="menu_button" style="flex:1;text-align:center;padding:6px 0;font-size:11px;cursor:pointer;">
                        ${state.hidden ? "👁️ 恢复显示悬浮球" : "🙈 彻底隐藏悬浮球"}
                    </div>
                    <div id="sm-fab-reset-pos-btn" class="menu_button" style="flex:1;text-align:center;padding:6px 0;font-size:11px;cursor:pointer;">
                        🔄 重置悬浮球位置
                    </div>
                `;
                extContent.appendChild(ctrlRow);

                topDoc.getElementById("sm-fab-toggle-hide-btn").onclick = (ev) => {
                    state.hidden = !state.hidden;
                    state.docked = false;
                    saveFabState(state);
                    applyFabPosition();
                    ev.target.textContent = state.hidden ? "👁️ 恢复显示悬浮球" : "🙈 彻底隐藏悬浮球";
                };
                topDoc.getElementById("sm-fab-reset-pos-btn").onclick = () => {
                    state = { left: (topWin.innerWidth || 390) - 52, top: (topWin.innerHeight || 800) - 130, docked: false, side: "right", hidden: false };
                    saveFabState(state);
                    applyFabPosition();
                    const hBtn = topDoc.getElementById("sm-fab-toggle-hide-btn");
                    if (hBtn) hBtn.textContent = "🙈 彻底隐藏悬浮球";
                };
            }
        }, 600);
    }

    mountDraggableMistFab();
})();
// ==========================================================================
// ☁️ 【Sumoul App 宿命私人服务器终极正式版（已绑死：https://bold-paper-f444.3425740873.workers.dev/）】
// 功能：1.跨手机实时收集所有人的QQ申请 2.管理员后台一键批准/一键全部批准 3.自带一Q一码加密算号保底
// ==========================================================================
(function () {
    const topWin = window.parent || window;
    const topDoc = topWin.document;

    // 🔥 已直接绑死你的专属 Cloudflare 私人服务器网址 + 你的专属 npoint 双通道备份
    const MY_WORKER_SERVER_URL = "https://bold-paper-f444.3425740873.workers.dev/";
    const FALLBACK_NPOINT_URL = "https://api.npoint.io/7590dee5e1fa18abf191";

    // 🔐 一Q一码加密算法（每个QQ号算出的激活码全网唯一，别人拿去用无效！）
    function calcExclusiveCode(qq) {
        const clean = String(qq || "").replace(/\D/g, "");
        if (!clean || clean.length < 5) return "";
        let h1 = 0x5f3759df, h2 = 20260818;
        const str = clean + "_SUMOUL_DESTINY_2026_" + clean.split("").reverse().join("");
        for (let i = 0; i < str.length; i++) {
            const ch = str.charCodeAt(i);
            h1 = Math.imul(h1 ^ ch, 2654435761);
            h2 = Math.imul(h2 + ch * (i + 1), 1597334677);
        }
        const num = String(Math.abs(h1 ^ h2) % 900000 + 100000);
        const letter = String.fromCharCode(65 + (Math.abs(h1) % 24));
        return `SM${letter}${num}`;
    }

    // 规范化数据结构
    function normalizeCloudObj(d) {
        const rawPending = Array.isArray(d?.pending) ? d.pending : [];
        const normPending = rawPending.map((item) => {
            if (typeof item === "string" || typeof item === "number") {
                return { qq: String(item).replace(/\D/g, ""), time: "云端同步" };
            }
            return { qq: String(item?.qq || "").replace(/\D/g, ""), time: item?.time || "刚刚" };
        }).filter((x) => x.qq && x.qq.length >= 5);

        const normApproved = (Array.isArray(d?.approved) ? d.approved : [])
            .map((x) => String(x).replace(/\D/g, ""))
            .filter((q) => q.length >= 5);

        return { pending: normPending, approved: normApproved };
    }

    // ☁️ 从你的私人服务器读取所有设备提交的 QQ 申请（双通道自动容灾）
    async function fetchServerData() {
        let localBak = { pending: [], approved: [] };
        try {
            localBak = normalizeCloudObj(JSON.parse(localStorage.getItem("sumoul_v46_bak") || "{}"));
        } catch (e) {}

        // 1. 优先请求你的 Cloudflare 私人服务器 bold-paper-f444
        try {
            const r = await fetch(MY_WORKER_SERVER_URL);
            if (r.ok) {
                const d = await r.json();
                const norm = normalizeCloudObj(d);
                localStorage.setItem("sumoul_v46_bak", JSON.stringify(norm));
                return { data: norm, ok: true, msg: "私人服务器已连通", activeUrl: MY_WORKER_SERVER_URL };
            }
        } catch (err) {}

        // 2. 备用通道：万一 Worker 没绑 KV 报错 500，自动无缝切换至你的 npoint 云库！
        try {
            const r2 = await fetch(FALLBACK_NPOINT_URL);
            if (r2.ok) {
                const d2 = await r2.json();
                const norm2 = normalizeCloudObj(d2);
                localStorage.setItem("sumoul_v46_bak", JSON.stringify(norm2));
                return { data: norm2, ok: true, msg: "备用云库已连通", activeUrl: FALLBACK_NPOINT_URL };
            }
        } catch (err) {}

        return { data: localBak, ok: false, msg: "请检查Worker的KV绑定(DB)", activeUrl: "" };
    }

    // ☁️ 将最新申请或批准结果同步写入你的服务器
    async function pushServerData(newData) {
        const cleanData = normalizeCloudObj(newData);
        localStorage.setItem("sumoul_v46_bak", JSON.stringify(cleanData));
        let success = false;

        // 同步写入你的 Cloudflare 私人服务器
        try {
            const r = await fetch(MY_WORKER_SERVER_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(cleanData)
            });
            if (r.ok) success = true;
        } catch (err) {}

        // 同时镜像备份写入你的 npoint 云库（双倍保险，永不丢数据！）
        try {
            const r2 = await fetch(FALLBACK_NPOINT_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(cleanData)
            });
            if (r2.ok) success = true;
        } catch (err) {}

        return success;
    }

    function copyStr(txt) {
        try {
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(txt);
                return;
            }
        } catch (e) {}
        try {
            const ta = topDoc.createElement("textarea");
            ta.value = txt;
            ta.style.cssText = "position:fixed;top:-9999px;";
            topDoc.body.appendChild(ta);
            ta.select();
            topDoc.execCommand("copy");
            ta.remove();
        } catch (e) {}
    }

    function mountPrivateServerV46() {
        const modal = topDoc.getElementById("seoul-mini-theater-modal");
        const lockLayer = topDoc.getElementById("seoul-boot-lock-layer");
        const adminPage = topDoc.getElementById("smt-page-admin");
        if (!modal) {
            setTimeout(mountPrivateServerV46, 200);
            return;
        }

        const qqInput = topDoc.getElementById("smt-lock-qq-input");
        const codeInput = topDoc.getElementById("smt-lock-code-input");
        const applyBtn = topDoc.getElementById("smt-lock-apply-btn");
        const unlockBtn = topDoc.getElementById("smt-lock-unlock-btn");
        const statusMsg = topDoc.getElementById("smt-lock-status-msg");

        const savedQQ = localStorage.getItem("sumoul_my_apply_qq") || "";
        if (qqInput && savedQQ && !qqInput.value) qqInput.value = savedQQ;

        // 1. 锁屏【提交申请】：直接把别人手机上的 QQ 号发到你的私人服务器！
        if (applyBtn && !applyBtn.getAttribute("data-v46-bound")) {
            applyBtn.setAttribute("data-v46-bound", "1");
            applyBtn.addEventListener("click", async (e) => {
                e.stopImmediatePropagation();
                e.preventDefault();
                const qq = (qqInput?.value || "").trim().replace(/\D/g, "");
                if (!qq || qq.length < 5 || qq.length > 12) {
                    if (statusMsg) statusMsg.textContent = "⚠️ 请输入正确的 5~12 位 QQ 号码！";
                    return;
                }
                localStorage.setItem("sumoul_my_apply_qq", qq);
                applyBtn.textContent = "⏳ 正在上传服务器...";

                const { data: cloud } = await fetchServerData();

                // 如果你已经在后台批准过他了，直接解锁进入！
                if (cloud.approved.includes(qq)) {
                    localStorage.setItem("seoul_v15_unlocked_qq", qq);
                    applyBtn.textContent = "✓ 已获批";
                    if (statusMsg) statusMsg.textContent = "🎉 管理员已批准你的 QQ！正在自动解锁进入...";
                    setTimeout(() => lockLayer?.classList.add("smt-unlocked-hide"), 450);
                    return;
                }

                // 把他的 QQ 加入你的服务器待审批列表
                if (!cloud.pending.some((x) => x.qq === qq)) {
                    const d = new Date();
                    const tStr = `${d.getMonth() + 1}-${d.getDate()} ${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
                    cloud.pending.unshift({ qq, time: tStr });
                }
                const pushed = await pushServerData(cloud);

                if (pushed) {
                    applyBtn.textContent = "✓ 已送达管理员后台";
                    if (statusMsg) {
                        statusMsg.innerHTML = `✅ QQ【<b>${qq}</b>】已实时送达管理员服务器后台！<br><span style="font-size:8.5px;color:#777;">管理员点击「批准」后，你直接点下方「验证进入」即可免密秒进！</span>`;
                    }
                } else {
                    copyStr(`【Sumoul申请】QQ:${qq}`);
                    applyBtn.textContent = "✓ 已复制申请凭条";
                    if (statusMsg) statusMsg.innerHTML = `✅ 已复制申请凭条【QQ:${qq}】，也可发给管理员领取专属码解锁！`;
                }
            }, true);
        }

        // 2. 锁屏【验证进入】：支持服务器批准直接免密进 + 支持一Q一码专属码
        if (unlockBtn && !unlockBtn.getAttribute("data-v46-bound")) {
            unlockBtn.setAttribute("data-v46-bound", "1");
            unlockBtn.addEventListener("click", async (e) => {
                const qq = (qqInput?.value || localStorage.getItem("sumoul_my_apply_qq") || "").trim().replace(/\D/g, "");
                const code = (codeInput?.value || "").trim().toUpperCase();

                if (qq && code && code === calcExclusiveCode(qq)) {
                    e.stopImmediatePropagation();
                    e.preventDefault();
                    localStorage.setItem("seoul_v15_unlocked_qq", qq);
                    if (statusMsg) statusMsg.textContent = "🎉 专属激活码验证通过！";
                    lockLayer?.classList.add("smt-unlocked-hide");
                    return;
                }

                if (qq) {
                    unlockBtn.textContent = "⏳ 正在核验服务器授权...";
                    const { data: cloud } = await fetchServerData();
                    unlockBtn.textContent = "验证进入";
                    if (cloud.approved.includes(qq)) {
                        e.stopImmediatePropagation();
                        e.preventDefault();
                        localStorage.setItem("seoul_v15_unlocked_qq", qq);
                        if (statusMsg) statusMsg.textContent = "🎉 服务器授权已通过！欢迎进入 Sumoul App！";
                        lockLayer?.classList.add("smt-unlocked-hide");
                        return;
                    }
                }
            }, true);
        }

        // 3. 管理员后台（实时显示所有设备的申请 + 单点批准 + 一键全部批准）
        if (adminPage) {
            [
                "smt-cloud-admin-box", "smt-zero-server-admin", "smt-v40-admin-panel",
                "smt-v41-admin-panel", "smt-v42-admin-panel", "smt-v43-admin-panel",
                "smt-v44-admin-panel", "smt-v45-admin-panel", "smt-v46-admin-panel"
            ].forEach((id) => topDoc.getElementById(id)?.remove());

            const panel = topDoc.createElement("div");
            panel.id = "smt-v46-admin-panel";
            panel.className = "smt-section-box";
            panel.style.cssText = "border:1.5px solid #2C2C32!important;background:#F8F8FA!important;margin-bottom:12px!important;";
            panel.innerHTML = `
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
                    <div>
                        <span style="font-size:10.5px;font-weight:800;color:#2C2C32;">☁️ 宿命私人服务器 · 实时审批后台</span>
                        <span id="v46-status-tag" style="font-size:8px;font-weight:700;padding:1.5px 6px;border-radius:99px;margin-left:4px;background:#EAEAF0;color:#555;">连接中...</span>
                    </div>
                    <div style="display:flex;gap:4px;">
                        <span class="smt-pill-btn" id="v46-approve-all-btn" style="height:22px!important;font-size:8px!important;">✨ 一键全部批准</span>
                        <span class="smt-pill-btn dark" id="v46-refresh-btn" style="height:22px!important;font-size:8.5px!important;">↻ 刷新申请</span>
                    </div>
                </div>

                <!-- 待审批列表 -->
                <div style="font-size:9px;font-weight:800;color:#2C2C32;margin-bottom:5px;">📥 其他设备提交的待审 QQ (<span id="v46-pend-cnt">0</span>)</div>
                <div id="v46-pend-list" style="max-height:175px;overflow-y:auto;margin-bottom:10px;"></div>

                <!-- 手动秒批/算码 -->
                <div style="background:#FFFFFF;border:1px solid #E2E2EC;border-radius:10px;padding:8px 10px;margin-bottom:10px;">
                    <div style="font-size:8.5px;font-weight:800;color:#484852;margin-bottom:5px;">⚡ 直接输入 QQ 添加白名单 / 复制专属码</div>
                    <div style="display:flex;gap:5px;">
                        <input type="text" id="v46-manual-qq" class="smt-wx-input" style="height:26px!important;font-size:9.5px!important;" placeholder="输入对方的QQ号..." />
                        <span class="smt-pill-btn dark" id="v46-manual-btn" style="height:26px!important;white-space:nowrap;">直接批准+复制专属码</span>
                    </div>
                    <div id="v46-manual-res" style="display:none;font-size:9px;font-weight:700;color:#2C2C32;margin-top:6px;"></div>
                </div>

                <!-- 已批准白名单 -->
                <div style="font-size:9px;font-weight:800;color:#2C2C32;margin-bottom:5px;">✅ 服务器已批准白名单 (<span id="v46-app-cnt">0</span>)</div>
                <div id="v46-app-list" style="max-height:120px;overflow-y:auto;"></div>
            `;
            adminPage.prepend(panel);

            async function renderV46Admin() {
                const tag = topDoc.getElementById("v46-status-tag");
                const rBtn = topDoc.getElementById("v46-refresh-btn");
                if (rBtn) rBtn.textContent = "⏳ 同步中...";

                const { data: cloud, ok, msg } = await fetchServerData();
                if (rBtn) rBtn.textContent = "↻ 刷新申请";

                if (tag) {
                    tag.textContent = ok ? `🟢 ${msg}` : `🔴 ${msg}`;
                    tag.style.background = ok ? "#E6F4EA" : "#FCE8E6";
                    tag.style.color = ok ? "#1E7E34" : "#C5221F";
                }

                // 自动把本机旧缓存里还未上传的 pending 合并进服务器
                try {
                    const localOld = JSON.parse(localStorage.getItem("seoul_v15_pending_qqs") || "[]");
                    let changed = false;
                    localOld.forEach((item) => {
                        const q = String(item?.qq || "").replace(/\D/g, "");
                        if (q.length >= 5 && item.status === "pending" && !cloud.pending.some((p) => p.qq === q) && !cloud.approved.includes(q)) {
                            cloud.pending.push({ qq: q, time: item.time || "同步" });
                            changed = true;
                        }
                    });
                    if (changed && ok) await pushServerData(cloud);
                } catch (e) {}

                topDoc.getElementById("v46-pend-cnt").textContent = cloud.pending.length;
                topDoc.getElementById("v46-app-cnt").textContent = cloud.approved.length;

                const pEl = topDoc.getElementById("v46-pend-list");
                if (!cloud.pending.length) {
                    pEl.innerHTML = `<div style="text-align:center;padding:12px;background:#FFF;border:1px solid #EFEFF4;border-radius:9px;font-size:9px;color:#9A9AA5;">暂无待审申请 · 别人更新插件后点提交，你点右上角「刷新申请」即可看到</div>`;
                } else {
                    pEl.innerHTML = cloud.pending.map((item) => `
                        <div style="display:flex;justify-content:space-between;align-items:center;background:#FFF;border:1px solid #EAEAF0;border-radius:9px;padding:7px 10px;margin-bottom:5px;">
                            <div>
                                <div style="font-size:10px;font-weight:800;color:#2C2C32;">申请 QQ：${item.qq}</div>
                                <div style="font-size:8px;color:#8E8E98;">时间：${item.time} · 专属码：<b style="color:#2C2C32;user-select:all;">${calcExclusiveCode(item.qq)}</b></div>
                            </div>
                            <div style="display:flex;gap:4px;">
                                <span class="smt-pill-btn dark" data-v46ok="${item.qq}" style="height:22px!important;font-size:8.5px!important;">✓ 批准</span>
                                <span class="smt-pill-btn" data-v46no="${item.qq}" style="height:22px!important;font-size:8.5px!important;">拒绝</span>
                            </div>
                        </div>
                    `).join("");
                }

                const aEl = topDoc.getElementById("v46-app-list");
                aEl.innerHTML = cloud.approved.length
                    ? cloud.approved.map((q) => `
                        <div style="display:flex;justify-content:space-between;align-items:center;background:#FFF;border:1px solid #EFEFF4;border-radius:8px;padding:5px 10px;margin-bottom:4px;font-size:9px;font-weight:700;">
                            <span>✓ QQ: ${q} <span style="color:#8E8E98;">(码:${calcExclusiveCode(q)})</span></span>
                            <span data-v46rev="${q}" style="color:#8E8E98;cursor:pointer;font-size:8px;">移除</span>
                        </div>
                    `).join("")
                    : `<div style="text-align:center;padding:8px;font-size:8.5px;color:#9A9AA5;">暂无已批准的 QQ</div>`;

                pEl.querySelectorAll("[data-v46ok]").forEach((b) => b.onclick = async () => {
                    const qNum = b.getAttribute("data-v46ok");
                    b.textContent = "批准中...";
                    const { data: latest } = await fetchServerData();
                    latest.pending = latest.pending.filter((x) => x.qq !== qNum);
                    if (!latest.approved.includes(qNum)) latest.approved.unshift(qNum);
                    await pushServerData(latest);
                    renderV46Admin();
                });

                pEl.querySelectorAll("[data-v46no]").forEach((b) => b.onclick = async () => {
                    const qNum = b.getAttribute("data-v46no");
                    const { data: latest } = await fetchServerData();
                    latest.pending = latest.pending.filter((x) => x.qq !== qNum);
                    await pushServerData(latest);
                    renderV46Admin();
                });

                aEl.querySelectorAll("[data-v46rev]").forEach((b) => b.onclick = async () => {
                    const qNum = b.getAttribute("data-v46rev");
                    const { data: latest } = await fetchServerData();
                    latest.approved = latest.approved.filter((x) => x !== qNum);
                    await pushServerData(latest);
                    renderV46Admin();
                });
            }

            topDoc.getElementById("v46-refresh-btn").onclick = () => renderV46Admin();

            // ✨ 一键全部批准所有待审 QQ！
            topDoc.getElementById("v46-approve-all-btn").onclick = async (e) => {
                const { data: latest } = await fetchServerData();
                if (!latest.pending.length) return alert("当前没有待审批的申请哦！");
                e.target.textContent = "⏳ 批量批准中...";
                latest.pending.forEach((item) => {
                    if (item.qq && !latest.approved.includes(item.qq)) {
                        latest.approved.unshift(item.qq);
                    }
                });
                latest.pending = [];
                await pushServerData(latest);
                e.target.textContent = "✨ 一键全部批准";
                renderV46Admin();
            };

            topDoc.getElementById("v46-manual-btn").onclick = async () => {
                const qVal = (topDoc.getElementById("v46-manual-qq").value || "").trim().replace(/\D/g, "");
                if (!qVal || qVal.length < 5) return alert("请输入有效的 QQ 号！");
                const code = calcExclusiveCode(qVal);
                copyStr(code);
                const resEl = topDoc.getElementById("v46-manual-res");
                resEl.style.display = "block";
                resEl.innerHTML = `✅ 已批准并复制 QQ【<b>${qVal}</b>】的唯一专属码：<span style="background:#2C2C32;color:#FFF;padding:2px 7px;border-radius:5px;user-select:all;">${code}</span>`;
                topDoc.getElementById("v46-manual-qq").value = "";

                const { data: latest } = await fetchServerData();
                latest.pending = latest.pending.filter((x) => x.qq !== qVal);
                if (!latest.approved.includes(qVal)) latest.approved.unshift(qVal);
                await pushServerData(latest);
                renderV46Admin();
            };

            ["smt-top-badge", "smt-api-open-admin", "smt-open-admin-btn"].forEach((id) => {
                topDoc.getElementById(id)?.addEventListener("click", () => setTimeout(renderV46Admin, 80));
            });

            renderV46Admin();
        }
    }

    mountPrivateServerV46();
})();
// ==========================================================================
// 🤍 【Sumoul App 微信全屏 + 100%零Emoji纯白高定设置中心 + 高定清冷雾白语音通话舱 + 4通道酒馆世界书必成读取】
// ==========================================================================
(function () {
    const topWin = window.parent || window, topDoc = topWin.document;

    // ── 1. 全套高定 1.4px 极细冷灰 SVG 线性矢量图标库（彻底 0 Emoji！） ──
    const svgLine = (p, sz = 14, c = "#3A3A40", sw = "1.5") =>
        `<svg viewBox="0 0 24 24" width="${sz}" height="${sz}" fill="none" stroke="${c}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;flex-shrink:0;pointer-events:none;">${p}</svg>`;

    const ICO = {
        sliders: svgLine(`<line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="17" y1="16" x2="23" y2="16"/>`, 14, "#3A3A40", "1.7"),
        user: svgLine(`<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>`),
        camera: svgLine(`<path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/>`, 11, "#3A3A40"),
        phoneCall: svgLine(`<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>`, 13, "currentColor", "1.6"),
        phoneOff: svgLine(`<path d="M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.42 19.42 0 0 1-3.33-2.67m-2.67-3.34a19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91"/><line x1="23" y1="1" x2="1" y2="23"/>`, 18, "#FFFFFF", "1.6"),
        mic: svgLine(`<rect x="9" y="2" width="6" height="11" rx="3"/><path d="M19 10v1a7 7 0 0 1-14 0v-1"/><line x1="12" y1="18" x2="12" y2="22"/>`, 17, "currentColor", "1.5"),
        speaker: svgLine(`<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>`, 17, "currentColor", "1.5"),
        snow: svgLine(`<line x1="12" y1="2" x2="12" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/><line x1="19.07" y1="4.93" x2="4.93" y2="19.07"/>`, 11, "currentColor", "1.6"),
        rain: svgLine(`<path d="M20 16.2A4.5 4.5 0 0 0 17.5 8h-1.8A7 7 0 1 0 4 14.9"/><line x1="16" y1="14" x2="14" y2="20"/><line x1="12" y1="16" x2="10" y2="22"/><line x1="8" y1="14" x2="6" y2="20"/>`, 11, "currentColor", "1.6"),
        sun: svgLine(`<circle cx="12" cy="12" r="4"/><line x1="12" y1="2" x2="12" y2="4"/><line x1="12" y1="20" x2="12" y2="22"/><line x1="4.93" y1="4.93" x2="6.34" y2="6.34"/><line x1="17.66" y1="17.66" x2="19.07" y2="19.07"/><line x1="2" y1="12" x2="4" y2="12"/><line x1="20" y1="12" x2="22" y2="12"/>`, 11, "currentColor", "1.6"),
        cloudSnow: svgLine(`<path d="M20 17.58A5 5 0 0 0 18 8h-1.26A8 8 0 1 0 4 16.25"/><line x1="8" y1="16" x2="8.01" y2="16"/><line x1="12" y1="18" x2="12.01" y2="18"/><line x1="16" y1="16" x2="16.01" y2="16"/>`, 14),
        mask: svgLine(`<path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z"/>`, 14),
        sync: svgLine(`<path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 16h5v5"/>`, 13, "currentColor", "1.6"),
        clock: svgLine(`<circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 15 15"/>`, 14),
        summary: svgLine(`<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="8" y1="13" x2="16" y2="13"/>`, 14),
        palette: svgLine(`<path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>`, 14),
        image: svgLine(`<rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>`, 14),
        book: svgLine(`<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>`, 14),
        upload: svgLine(`<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>`, 12, "currentColor", "1.7"),
        download: svgLine(`<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>`, 12, "currentColor", "1.7"),
        plus: svgLine(`<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>`, 12, "currentColor", "1.8"),
        trash: svgLine(`<polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>`, 12, "#9A6868"),
        shield: svgLine(`<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>`, 12),
        check: svgLine(`<polyline points="20 6 9 17 4 12"/>`, 12, "currentColor", "2"),
        heart: svgLine(`<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>`, 13, "#9A9AA5"),
        pin: svgLine(`<line x1="12" y1="17" x2="12" y2="22"/><path d="M5 17h14v-1.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V6h1a2 2 0 0 0 0-4H8a2 2 0 0 0 0 4h1v4.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24Z"/>`, 12, "#55555E"),
        spark: svgLine(`<path d="M12 2L14 10L22 12L14 14L12 22L10 14L2 12L10 10Z"/>`, 10, "currentColor", "1.6"),
        send: svgLine(`<line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>`, 13, "#FFFFFF", "1.7"),
        close: svgLine(`<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>`, 11, "currentColor", "1.8")
    };

    function getCharContext() {
        let userName = "ME", charName = "PARTNER", scope = "PARTNER";
        let userAvatar = "https://i.postimg.cc/rydS6NvG/IMG-3866.jpg", charAvatar = "https://i.postimg.cc/QC3CQ218/IMG-4147.jpg", charDesc = "", charObj = null;
        try {
            const st = topWin.SillyTavern?.getContext?.();
            if (st) {
                userName = st.name1 || userName;
                if (st.characterId !== undefined && st.characters?.[st.characterId]) {
                    const c = st.characters[st.characterId];
                    charObj = c;
                    charName = c.name || st.name2 || charName;
                    scope = c.avatar || c.name || String(st.characterId);
                    if (c.avatar) charAvatar = `/characters/${encodeURIComponent(c.avatar)}`;
                    charDesc = [c.description, c.personality, c.scenario].filter(Boolean).join("\n");
                } else if (st.name2) { charName = st.name2; scope = st.name2; }
            }
        } catch (e) {}
        const safeScope = String(scope).replace(/[^a-zA-Z0-9_\u4e00-\u9fa5\uac00-\ud7af-]/g, "_");
        return { userName, charName, safeScope, userAvatar, charAvatar, charDesc, charObj };
    }

    function getCharScope() { return getCharContext().safeScope; }
    function getExtraKey() { return `sumoul_v16_wxextra__${getCharScope()}`; }
    function loadExtra() {
        const def = {
            petNameForMe: "", pokeSuffix: "的小脑袋", pinNotice: "",
            personaMode: "sync", charOnlinePersona: "", myOnlinePersona: "",
            weatherEnabled: true, weatherCity: "Seoul · 首尔", weatherDesc: "初雪微雾 · -1°C",
            relationStage: "热恋同居期", jealousyLv: "偏执强占有欲", replyCount: "2~4",
            styleTags: ["日常自然短句"], fontSize: "12px", wallpaperUrl: "", wallpaperMask: "light"
        };
        try { return Object.assign(def, JSON.parse(localStorage.getItem(getExtraKey()) || "{}")); } catch (e) { return def; }
    }
    function saveExtra(d) { try { localStorage.setItem(getExtraKey(), JSON.stringify(d)); } catch (e) {} }

    function getWiKey() { return `sumoul_v16_worldinfo__${getCharScope()}`; }
    function loadWi() {
        const def = { enabled: true, mode: "smart", entries: [] };
        try { return Object.assign(def, JSON.parse(localStorage.getItem(getWiKey()) || "{}")); } catch (e) { return def; }
    }
    function saveWi(d) { try { localStorage.setItem(getWiKey(), JSON.stringify(d)); } catch (e) {} }

    function compressImg(file, maxDim = 720) {
        return new Promise((res) => {
            const r = new FileReader();
            r.onload = (ev) => {
                const img = new Image();
                img.onload = () => {
                    const c = topDoc.createElement("canvas");
                    let w = img.width, h = img.height;
                    if (w > h) { if (w > maxDim) { h = Math.round(h * maxDim / w); w = maxDim; } }
                    else { if (h > maxDim) { w = Math.round(w * maxDim / h); h = maxDim; } }
                    c.width = w; c.height = h; c.getContext("2d").drawImage(img, 0, 0, w, h);
                    res(c.toDataURL("image/jpeg", 0.82));
                };
                img.src = String(ev.target?.result || "");
            };
            r.readAsDataURL(file);
        });
    }

    async function fetchRealLiveWeather(cityQuery = "") {
        try {
            const q = cityQuery ? encodeURIComponent(cityQuery.split("·")[0].trim()) : "";
            const r = await fetch(`https://wttr.in/${q}?format=j1&lang=zh`);
            if (r.ok) {
                const d = await r.json(), cur = d?.current_condition?.[0];
                const area = d?.nearest_area?.[0]?.areaName?.[0]?.value || cityQuery || "当前城市";
                if (cur) return { city: area, weather: `${cur.lang_zh?.[0]?.value || cur.weatherDesc?.[0]?.value || "微雾"} · ${cur.temp_C || "15"}°C` };
            }
        } catch (e) {}
        return null;
    }

    function applyVisualsAndPin() {
        const ex = loadExtra(), stream = topDoc.getElementById("smt-wx-stream"), talkPage = topDoc.getElementById("smt-page-talk");
        if (!stream || !talkPage) return;

        if (ex.wallpaperUrl) {
            let ov = ex.wallpaperMask === "light" ? "linear-gradient(rgba(255,255,255,0.58),rgba(255,255,255,0.58))," : (ex.wallpaperMask === "mist" ? "linear-gradient(rgba(255,255,255,0.82),rgba(255,255,255,0.82))," : "");
            stream.style.setProperty("background-image", `${ov}url('${ex.wallpaperUrl}')`, "important");
            stream.style.setProperty("background-size", "cover", "important");
            stream.style.setProperty("background-position", "center", "important");
        } else {
            stream.style.removeProperty("background-image");
        }

        let fontCss = topDoc.getElementById("sumoul-wx-fontsize-dyn");
        if (!fontCss) { fontCss = topDoc.createElement("style"); fontCss.id = "sumoul-wx-fontsize-dyn"; topDoc.head.appendChild(fontCss); }
        fontCss.innerHTML = `#seoul-mini-theater-modal #smt-wx-stream .smt-wx-bubble { font-size: ${ex.fontSize || "12px"} !important; }`;

        let pinBar = topDoc.getElementById("smt-wx-pin-banner");
        if (!ex.pinNotice?.trim()) {
            if (pinBar) pinBar.style.display = "none";
        } else {
            if (!pinBar) {
                pinBar = topDoc.createElement("div"); pinBar.id = "smt-wx-pin-banner";
                pinBar.style.cssText = "display:flex;align-items:center;justify-content:space-between;background:#FFFFFF;border-bottom:1px solid #F0F0F5;padding:6px 14px;font-size:9.5px;font-weight:600;color:#484852;flex-shrink:0;z-index:4;";
                talkPage.insertBefore(pinBar, stream);
            }
            pinBar.style.display = "flex";
            pinBar.innerHTML = `<div style="display:flex;align-items:center;gap:6px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${ICO.pin}<span style="color:#2C2C32;">${ex.pinNotice.replace(/</g, "&lt;")}</span></div><span style="font-size:8px;color:#9A9AA5;flex-shrink:0;margin-left:8px;">PINNED</span>`;
        }
    }

    function parseWorldBookJson(rawText, fileName = "WorldBook") {
        const out = [];
        try {
            const obj = JSON.parse(rawText);
            let list = obj?.entries ? (Array.isArray(obj.entries) ? obj.entries : Object.values(obj.entries)) : (obj?.data?.entries ? Object.values(obj.data.entries) : (obj?.character_book?.entries ? Object.values(obj.character_book.entries) : (Array.isArray(obj) ? obj : [])));
            list.forEach((it, idx) => {
                if (!it || typeof it !== "object") return;
                const content = String(it.content || it.entry || it.mes || it.description || "").trim();
                if (!content) return;
                let keys = Array.isArray(it.key) ? it.key : (Array.isArray(it.keys) ? it.keys : (typeof it.key === "string" ? it.key.split(/[,，]/) : []));
                keys = keys.map((k) => String(k).trim()).filter(Boolean);
                const title = String(it.comment || it.name || it.title || keys[0] || `${fileName} #${idx + 1}`).trim();
                out.push({ id: Date.now() + idx + Math.floor(Math.random() * 1000), title, keys, content, enabled: !(it.disable === true || it.enabled === false), constant: Boolean(it.constant) || keys.length === 0 });
            });
        } catch (e) {
            if (rawText?.trim()) out.push({ id: Date.now(), title: fileName.replace(/\.[^.]+$/, ""), keys: [], content: rawText.trim(), enabled: true, constant: true });
        }
        return out;
    }

    // 🔥 4 通道深度抓取酒馆世界书与当前角色设定（100% 必有反应、必出条目！）
    async function extractTavernLore() {
        const found = [];
        try {
            const st = topWin.SillyTavern?.getContext?.();
            const ctx = getCharContext();
            const charObj = ctx.charObj || st?.characters?.[st?.characterId];

            // 通道 1：读取角色卡 V2 内嵌的 character_book
            const cBook = charObj?.data?.character_book || charObj?.character_book;
            if (cBook?.entries) {
                Object.values(cBook.entries).forEach((it, i) => {
                    const content = String(it?.content || it?.entry || "").trim();
                    if (!content) return;
                    const keys = (Array.isArray(it.keys) ? it.keys : (Array.isArray(it.key) ? it.key : [])).map(String).filter(Boolean);
                    found.push({ id: Date.now() + i, title: String(it.comment || it.name || keys[0] || `角色世界书 #${i + 1}`), keys, content, enabled: it.enabled !== false && it.disable !== true, constant: Boolean(it.constant) || keys.length === 0 });
                });
            }

            // 通道 2：尝试通过酒馆后端 API 读取当前角色绑定的外部世界书名称 (data.extensions.world) 及全局激活的世界书
            const worldNames = new Set();
            const charWorld = charObj?.data?.extensions?.world || charObj?.extensions?.world;
            if (charWorld) worldNames.add(charWorld);

            const wiSelect = topDoc.querySelector("#world_info");
            if (wiSelect) {
                Array.from(wiSelect.selectedOptions || []).forEach((opt) => {
                    if (opt.text && opt.value) worldNames.add(opt.text.trim());
                });
            }

            for (const wName of worldNames) {
                try {
                    const headers = { "Content-Type": "application/json" };
                    if (typeof topWin.getRequestHeaders === "function") Object.assign(headers, topWin.getRequestHeaders());
                    const r = await fetch("/api/worldinfo/get", { method: "POST", headers, body: JSON.stringify({ name: wName }) });
                    if (r.ok) {
                        const wData = await r.json();
                        if (wData?.entries) {
                            Object.values(wData.entries).forEach((it, idx) => {
                                const content = String(it?.content || "").trim();
                                if (!content) return;
                                const keys = (Array.isArray(it.key) ? it.key : []).map(String).filter(Boolean);
                                found.push({ id: Date.now() + 200 + idx, title: String(it.comment || keys[0] || `${wName} #${idx + 1}`), keys, content, enabled: !it.disable, constant: Boolean(it.constant) || keys.length === 0 });
                            });
                        }
                    }
                } catch (e) {}
            }

            // 通道 3：扫描全局 window.world_info 对象
            if (topWin.world_info?.entries) {
                Object.values(topWin.world_info.entries).forEach((it, i) => {
                    const content = String(it?.content || "").trim();
                    if (!content) return;
                    const keys = (Array.isArray(it.key) ? it.key : []).map(String).filter(Boolean);
                    found.push({ id: Date.now() + 500 + i, title: String(it.comment || keys[0] || `全局世界书 #${i + 1}`), keys, content, enabled: !it.disable, constant: Boolean(it.constant) || keys.length === 0 });
                });
            }

            // 通道 4（100% 保底提炼）：提取当前角色卡的核心设定、性格、世界背景与开场白作为常驻世界书条目！
            if (charObj) {
                if (charObj.description?.trim()) {
                    found.push({ id: Date.now() + 801, title: `${ctx.charName} · 核心人设与背景`, keys: [ctx.charName], content: charObj.description.trim(), enabled: true, constant: true });
                }
                if (charObj.personality?.trim()) {
                    found.push({ id: Date.now() + 802, title: `${ctx.charName} · 性格特征设定`, keys: [], content: charObj.personality.trim(), enabled: true, constant: true });
                }
                if (charObj.scenario?.trim()) {
                    found.push({ id: Date.now() + 803, title: `${ctx.charName} · 剧情场景设定`, keys: [], content: charObj.scenario.trim(), enabled: true, constant: true });
                }
            } else if (ctx.charDesc?.trim()) {
                found.push({ id: Date.now() + 804, title: `${ctx.charName} · 酒馆角色卡设定`, keys: [], content: ctx.charDesc.trim(), enabled: true, constant: true });
            }
        } catch (e) {}
        return found;
    }

    function buildPromptInjection(contextText = "") {
        let block = "";
        const ex = loadExtra();
        if (ex.weatherEnabled && ex.weatherDesc) {
            block += `\n【真实天气与城市环境：当前在「${ex.weatherCity || "首尔"}」，天气为「${ex.weatherDesc}」，请在聊天或关怀中自然贴合此刻天气】`;
        }
        if (ex.personaMode === "custom" && ex.charOnlinePersona?.trim()) {
            block += `\n【角色线上专属人设/反差表现】：${ex.charOnlinePersona.trim()}`;
        }
        if (ex.myOnlinePersona?.trim()) {
            block += `\n【用户的线上人设与背景】：${ex.myOnlinePersona.trim()}`;
        }
        const rules = [];
        if (ex.petNameForMe) rules.push(`你在微信里对用户的专属称呼是「${ex.petNameForMe}」`);
        if (ex.relationStage) rules.push(`你们当前处于「${ex.relationStage}」`);
        if (ex.jealousyLv) rules.push(`你的占有欲与吃醋表现为「${ex.jealousyLv}」`);
        if (ex.replyCount) rules.push(`每次请分 ${ex.replyCount} 条短句气泡回复（换行分隔）`);
        if (ex.styleTags?.length) rules.push(`打字语感偏好：${ex.styleTags.join("、")}`);
        if (rules.length) block += `\n【微信私聊语感与关系要求】：${rules.join("；")}。`;

        const wi = loadWi();
        if (wi.enabled && wi.entries?.length) {
            const matched = [], pool = String(contextText || "").toLowerCase();
            wi.entries.filter((e) => e && e.enabled && e.content).forEach((e) => {
                if (wi.mode === "all" || e.constant || !e.keys?.length || e.keys.some((k) => k && pool.includes(k.toLowerCase()))) {
                    matched.push(`【${e.title}】：${e.content}`);
                }
            });
            if (matched.length) block += `\n\n【角色必须遵守的世界书(World Info)核心设定】：\n${matched.join("\n")}`;
        }
        return block;
    }

    function hookFetch() {
        if (window.__sumoul_wi_hook_v6) return;
        window.__sumoul_wi_hook_v6 = true;
        const orig = window.fetch.bind(window);
        window.fetch = async function (input, init) {
            try {
                const u = typeof input === "string" ? input : (input?.url || "");
                if (u.includes("/chat/completions") && init?.method === "POST" && typeof init.body === "string") {
                    const body = JSON.parse(init.body);
                    if (Array.isArray(body?.messages) && body.messages.length) {
                        const allTxt = body.messages.map((m) => m.content || "").join("\n");
                        const extra = buildPromptInjection(allTxt);
                        if (extra && !allTxt.includes("【微信私聊语感与关系要求】") && !allTxt.includes("【角色必须遵守的世界书")) {
                            const sys = body.messages.find((m) => m.role === "system") || body.messages[0];
                            if (sys) { sys.content += extra; init.body = JSON.stringify(body); }
                        }
                    }
                }
            } catch (e) {}
            return orig(input, init);
        };
    }

    // ── 2. 高定重做：iOS 18 × Kakao 清冷雾白毛玻璃全屏语音通话舱 ──
    let callTimerInt = null, callSeconds = 0;
    const fmtCallTime = (s) => `${String(Math.floor(s / 60)).padStart(2, "0")} : ${String(s % 60).padStart(2, "0")}`;

    async function callVoiceAI(userSpoke = "") {
        const u = topDoc.getElementById("smt-api-url")?.value?.trim().replace(/\/+$/, "");
        const k = topDoc.getElementById("smt-api-key")?.value?.trim();
        const m = topDoc.getElementById("smt-api-model")?.value?.trim() || "gpt-4o-mini";
        if (!u || !k) throw new Error("请先在【API设置】填写独立 API 地址与 Key");
        const ctx = getCharContext();
        const endpoint = u.endsWith("/chat/completions") ? u : (u.endsWith("/v1") ? `${u}/chat/completions` : `${u}/v1/chat/completions`);
        const sysPrompt = `你是${ctx.charName}，正与${ctx.userName}进行深夜实时语音通话（贴在耳边讲电话）。\n人设：${ctx.charDesc.slice(0, 1000)}${buildPromptInjection(userSpoke)}\n请严格只输出JSON格式：{"env":"电话那头的细微环境音或呼吸声(14字内，如:窗外微雨声与贴近麦克风的呼吸)","voice":"你在电话里贴着TA耳边说的话(45字以内，富有苏感、呼吸停顿与口语亲昵感)"}`;
        const usrPrompt = userSpoke ? `${ctx.userName}在电话里对你说：“${userSpoke}”。请回应：` : `电话刚接通，请主动开口对${ctx.userName}说第一句话：`;
        const r = await fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json", "Authorization": `Bearer ${k}` }, body: JSON.stringify({ model: m, temperature: 0.85, messages: [{ role: "system", content: sysPrompt }, { role: "user", content: usrPrompt }] }) });
        const d = await r.json(), raw = d?.choices?.[0]?.message?.content?.trim() || "";
        const match = raw.match(/\{[\s\S]*\}/);
        if (match) { try { return JSON.parse(match[0]); } catch (e) {} }
        return { env: "安静的房间 · 浅浅的呼吸声", voice: raw.replace(/```json|```/g, "").trim() || "“喂？听得到我说话吗……”" };
    }

    function openVoiceCallModal() {
        const modal = topDoc.getElementById("seoul-mini-theater-modal");
        if (!modal) return;
        const ctx = getCharContext(), ex = loadExtra();
        let wCfg = {};
        try { wCfg = JSON.parse(localStorage.getItem(`sumoul_v16_wxcfg__${ctx.safeScope}`) || "{}"); } catch (e) {}
        const charName = wCfg.remark || ctx.charName, charAva = wCfg.charAva || ctx.charAvatar;

        topDoc.getElementById("smt-voice-call-overlay")?.remove();
        const callLayer = topDoc.createElement("div");
        callLayer.id = "smt-voice-call-overlay";
        callLayer.style.cssText = "position:absolute!important;inset:0!important;z-index:2147483646!important;background:radial-gradient(circle at 50% 28%, #FFFFFF 0%, #F7F7FA 58%, #EFEFF4 100%)!important;display:flex!important;flex-direction:column!important;align-items:center!important;justify-content:space-between!important;padding:max(28px,env(safe-area-inset-top,28px)) 22px max(30px,env(safe-area-inset-bottom,30px)) 22px!important;box-sizing:border-box!important;text-align:center!important;overflow:hidden!important;";

        callLayer.innerHTML = `
            <!-- 顶部清冷胶囊状态栏 -->
            <div style="width:100%;max-width:340px;display:flex;justify-content:space-between;align-items:center;z-index:4;">
                <div style="display:inline-flex;align-items:center;gap:6px;background:rgba(255,255,255,0.85);border:1px solid #EAEAF0;border-radius:999px;padding:4px 11px;font-size:8px;font-weight:700;color:#55555E;letter-spacing:1.2px;">
                    <span style="width:5px;height:5px;border-radius:50%;background:#3A3A42;display:inline-block;animation:vcDotBlink 2s infinite;"></span>
                    <span>VOICE CONNECTED</span>
                </div>
                <div style="font-size:8px;font-weight:700;color:#9A9AA5;letter-spacing:1px;">
                    ${ex.weatherCity || "SEOUL"} · ${ex.weatherDesc || "微雾"}
                </div>
            </div>

            <!-- 中央高定双环声波头像与无框感字幕舱 -->
            <div style="width:100%;max-width:320px;display:flex;flex-direction:column;align-items:center;my:auto;z-index:4;">
                
                <!-- 极细同心银丝光环头像 -->
                <div style="position:relative;width:136px;height:136px;display:flex;align-items:center;justify-content:center;margin-bottom:14px;">
                    <svg viewBox="0 0 140 140" width="136" height="136" fill="none" style="position:absolute;inset:0;pointer-events:none;">
                        <circle class="vc-svg-ring1" cx="70" cy="70" r="52" stroke="#DCDCE6" stroke-width="0.9" />
                        <circle class="vc-svg-ring2" cx="70" cy="70" r="62" stroke="#E4E4EE" stroke-width="0.7" stroke-dasharray="3 4" />
                    </svg>
                    <div style="width:88px;height:88px;border-radius:50%;padding:3px;background:#FFFFFF;border:1px solid #EAEAF2;box-shadow:0 12px 32px rgba(30,30,45,0.08);position:relative;z-index:3;">
                        <img src="${charAva}" style="width:100%;height:100%;border-radius:50%;object-fit:cover;display:block;" />
                    </div>
                </div>

                <!-- 角色名与纤细计时器 -->
                <div style="font-size:18px;font-weight:800;color:#2C2C32;letter-spacing:1.5px;">${charName}</div>
                <div id="vc-timer-txt" style="font-size:11px;font-weight:600;color:#8E8E98;font-family:monospace;letter-spacing:3px;margin:5px 0 16px 0;">00 : 00</div>

                <!-- 清冷冰雾悬浮字幕舱 -->
                <div style="width:100%;background:rgba(255,255,255,0.78);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid #EAEAF2;border-radius:22px;padding:18px 18px 16px 18px;box-shadow:0 10px 30px rgba(20,20,35,0.035);position:relative;">
                    <!-- 顶部微距环境音标签 -->
                    <div style="display:inline-flex;align-items:center;gap:5px;background:#FFFFFF;border:1px solid #EFEFF5;border-radius:99px;padding:2.5px 10px;font-size:8px;font-weight:700;color:#8E8E98;letter-spacing:0.5px;margin-bottom:12px;">
                        <span id="vc-env-txt">正在接通听筒信号...</span>
                    </div>

                    <!-- 角色贴耳语音正文 -->
                    <div id="vc-voice-txt" style="font-size:12.5px;font-weight:700;color:#2C2C32;line-height:1.75;letter-spacing:0.4px;min-height:44px;display:flex;align-items:center;justify-content:center;">
                        “ 喂……听得到吗？ ”
                    </div>

                    <!-- 底部极细流线声波纹 -->
                    <div style="margin-top:12px;padding-top:10px;border-top:1px solid #F4F4F8;display:flex;align-items:center;justify-content:center;gap:3px;height:12px;">
                        <span class="vc-thin-wave" style="animation-delay:0.0s;"></span>
                        <span class="vc-thin-wave" style="animation-delay:0.15s;"></span>
                        <span class="vc-thin-wave" style="animation-delay:0.3s;"></span>
                        <span class="vc-thin-wave" style="animation-delay:0.45s;"></span>
                        <span class="vc-thin-wave" style="animation-delay:0.2s;"></span>
                        <span class="vc-thin-wave" style="animation-delay:0.35s;"></span>
                        <span class="vc-thin-wave" style="animation-delay:0.1s;"></span>
                        <span class="vc-thin-wave" style="animation-delay:0.25s;"></span>
                        <span class="vc-thin-wave" style="animation-delay:0.4s;"></span>
                    </div>
                </div>
            </div>

            <!-- 底部：无框感对话输入条 + 高定三枚圆形通话控制键 -->
            <div style="width:100%;max-width:320px;display:flex;flex-direction:column;gap:18px;z-index:4;">
                <div style="display:flex;align-items:center;background:#FFFFFF;border:1px solid #E6E6EE;border-radius:999px;padding:3px 4px 3px 14px;box-shadow:0 4px 14px rgba(0,0,0,0.025);">
                    <input type="text" id="vc-speak-inp" placeholder="对着麦克风跟 TA 说句话..." style="flex:1;height:30px!important;border:0!important;outline:0!important;background:transparent!important;font-size:10.5px!important;font-weight:600!important;color:#2C2C32!important;" />
                    <span id="vc-speak-btn" style="width:30px;height:30px;border-radius:50%;background:#2C2C34;display:inline-flex;align-items:center;justify-content:center;cursor:pointer;flex-shrink:0;" title="发送语音回应">${ICO.send}</span>
                </div>

                <div style="display:flex;align-items:center;justify-content:space-around;padding:0 12px;">
                    <div id="vc-btn-mute" style="display:flex;flex-direction:column;align-items:center;gap:6px;cursor:pointer;">
                        <div class="vc-ctrl-circle">${ICO.mic}</div>
                        <span style="font-size:8px;font-weight:700;color:#7A7A85;letter-spacing:0.5px;">静音</span>
                    </div>

                    <div id="vc-btn-hangup" style="display:flex;flex-direction:column;align-items:center;gap:6px;cursor:pointer;">
                        <div style="width:56px;height:56px;border-radius:50%;background:#2C2C34;border:1px solid #2C2C34;display:flex;align-items:center;justify-content:center;box-shadow:0 8px 22px rgba(44,44,52,0.22);transition:transform 0.15s ease;">${ICO.phoneOff}</div>
                        <span style="font-size:8px;font-weight:800;color:#2C2C32;letter-spacing:0.5px;">挂断</span>
                    </div>

                    <div id="vc-btn-speaker" style="display:flex;flex-direction:column;align-items:center;gap:6px;cursor:pointer;">
                        <div class="vc-ctrl-circle active-ctrl">${ICO.speaker}</div>
                        <span style="font-size:8px;font-weight:700;color:#7A7A85;letter-spacing:0.5px;">免提</span>
                    </div>
                </div>
            </div>`;
        modal.appendChild(callLayer);

        callSeconds = 0;
        if (callTimerInt) clearInterval(callTimerInt);
        callTimerInt = setInterval(() => {
            callSeconds++;
            const tEl = topDoc.getElementById("vc-timer-txt");
            if (tEl) tEl.textContent = fmtCallTime(callSeconds);
        }, 1000);

        // 静音/免提按钮点选反馈
        topDoc.getElementById("vc-btn-mute").onclick = (e) => e.currentTarget.querySelector(".vc-ctrl-circle")?.classList.toggle("active-ctrl");
        topDoc.getElementById("vc-btn-speaker").onclick = (e) => e.currentTarget.querySelector(".vc-ctrl-circle")?.classList.toggle("active-ctrl");

        (async () => {
            try {
                const res = await callVoiceAI("");
                if (topDoc.getElementById("vc-env-txt")) topDoc.getElementById("vc-env-txt").textContent = res.env;
                if (topDoc.getElementById("vc-voice-txt")) topDoc.getElementById("vc-voice-txt").textContent = `“ ${res.voice.replace(/^[“"]|[”"]$/g, "")} ”`;
            } catch (err) {
                if (topDoc.getElementById("vc-voice-txt")) topDoc.getElementById("vc-voice-txt").textContent = `（${err.message}）`;
            }
        })();

        const speakInp = topDoc.getElementById("vc-speak-inp"), speakBtn = topDoc.getElementById("vc-speak-btn");
        const handleSpeak = async () => {
            const txt = speakInp.value.trim(); if (!txt) return;
            speakInp.value = "";
            if (topDoc.getElementById("vc-env-txt")) topDoc.getElementById("vc-env-txt").textContent = `正在倾听你说：“${txt.slice(0, 14)}”...`;
            try {
                const res = await callVoiceAI(txt);
                if (topDoc.getElementById("vc-env-txt")) topDoc.getElementById("vc-env-txt").textContent = res.env;
                if (topDoc.getElementById("vc-voice-txt")) topDoc.getElementById("vc-voice-txt").textContent = `“ ${res.voice.replace(/^[“"]|[”"]$/g, "")} ”`;
            } catch (err) {
                if (topDoc.getElementById("vc-voice-txt")) topDoc.getElementById("vc-voice-txt").textContent = err.message;
            }
        };
        speakBtn.onclick = handleSpeak;
        speakInp.onkeydown = (e) => { if (e.key === "Enter") { e.preventDefault(); handleSpeak(); } };

        topDoc.getElementById("vc-btn-hangup").onclick = () => {
            if (callTimerInt) clearInterval(callTimerInt);
            const durStr = fmtCallTime(callSeconds || 1).replace(/\s+/g, "");
            const lastVoice = topDoc.getElementById("vc-voice-txt")?.textContent || "";
            callLayer.remove();
            const chatKey = `sumoul_v16_wx__${ctx.safeScope}`;
            try {
                const list = JSON.parse(localStorage.getItem(chatKey) || "[]"), d = new Date(), tStr = `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
                list.push({ role: "sys", text: `语音通话已结束 · 时长 ${durStr}`, time: tStr });
                if (lastVoice && !lastVoice.includes("API")) list.push({ role: "ai", text: `[语音通话] ${lastVoice}`, time: tStr });
                localStorage.setItem(chatKey, JSON.stringify(list));
            } catch (e) {}
            if (topDoc.getElementById("smt-page-wx_settings")?.classList.contains("active")) topDoc.getElementById("smt-wxset-back-chat")?.click();
            else topDoc.querySelector('.smt-tab-item[data-page="talk"]')?.click();
        };
    }

    function mountUltimateSettingsV6() {
        const modal = topDoc.getElementById("seoul-mini-theater-modal"), talkPage = topDoc.getElementById("smt-page-talk"), wxSetPage = topDoc.getElementById("smt-page-wx_settings"), topBadge = topDoc.getElementById("smt-top-badge");
        if (!modal || !talkPage || !wxSetPage || !topBadge) { setTimeout(mountUltimateSettingsV6, 200); return; }

        hookFetch();
        applyVisualsAndPin();

        const quickBar = talkPage.querySelector(".smt-wx-quick");
        if (quickBar && !topDoc.getElementById("smt-wx-quick-call-btn")) {
            const callQuick = topDoc.createElement("span");
            callQuick.className = "smt-pill-btn"; callQuick.id = "smt-wx-quick-call-btn";
            callQuick.innerHTML = `${ICO.phoneCall}<span>语音通话</span>`;
            callQuick.onclick = () => openVoiceCallModal();
            quickBar.appendChild(callQuick);
        }

        topDoc.getElementById("sumoul-wx-fullscreen-css")?.remove();
        const st = topDoc.createElement("style");
        st.id = "sumoul-wx-fullscreen-css";
        st.innerHTML = `
            @keyframes vcRingBreathe { 0%, 100% { transform: scale(0.95); opacity: 0.45; } 50% { transform: scale(1.08); opacity: 0.95; } }
            @keyframes vcRingSpin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
            @keyframes vcThinWave { 0%, 100% { height: 3px; opacity: 0.3; } 50% { height: 11px; opacity: 0.85; } }
            @keyframes vcDotBlink { 0%, 100% { opacity: 0.3; } 50% { opacity: 1; } }

            #seoul-mini-theater-modal .vc-svg-ring1 { transform-origin: center; animation: vcRingBreathe 3.2s ease-in-out infinite !important; }
            #seoul-mini-theater-modal .vc-svg-ring2 { transform-origin: center; animation: vcRingSpin 24s linear infinite !important; }
            #seoul-mini-theater-modal .vc-thin-wave { width: 1.5px !important; height: 4px !important; border-radius: 99px !important; background: #55555E !important; display: inline-block !important; animation: vcThinWave 1.2s ease-in-out infinite !important; }
            #seoul-mini-theater-modal .vc-ctrl-circle { width: 46px !important; height: 46px !important; border-radius: 50% !important; background: #FFFFFF !important; border: 1px solid #E4E4EE !important; color: #3A3A42 !important; display: flex !important; align-items: center !important; justify-content: center !important; box-shadow: 0 4px 12px rgba(0,0,0,0.03) !important; transition: all 0.2s ease !important; }
            #seoul-mini-theater-modal .vc-ctrl-circle.active-ctrl { background: #F0F0F5 !important; border-color: #3A3A42 !important; }

            #seoul-mini-theater-modal #smt-page-talk .smt-wx-top-bar { display: none !important; }
            #seoul-mini-theater-modal .smt-fs-body:has(#smt-page-talk.active) { padding: 0 !important; max-width: 100% !important; }
            #seoul-mini-theater-modal #smt-page-talk { padding: 0 !important; background: #FFFFFF !important; }
            #seoul-mini-theater-modal #smt-wx-stream { border: none !important; border-radius: 0 !important; margin-bottom: 0 !important; padding: 14px 14px 10px 14px !important; flex: 1 !important; }
            #seoul-mini-theater-modal #smt-page-talk .smt-wx-quick { padding: 6px 12px !important; background: #FFFFFF !important; border-top: 1px solid #F2F2F6 !important; margin: 0 !important; }
            #seoul-mini-theater-modal #smt-page-talk .smt-wx-bar { margin: 0 10px 8px 10px !important; border-radius: 999px !important; background: #FFFFFF !important; border: 1px solid #EAEAF0 !important; }
            #seoul-mini-theater-modal #smt-wx-reply-preview, #seoul-mini-theater-modal #smt-wx-emoji-drawer { margin: 0 10px 6px 10px !important; background: #FFFFFF !important; }

            #seoul-mini-theater-modal #smt-page-wx_settings { background: #FFFFFF !important; margin: 0 !important; padding: 2px 2px 28px 2px !important; }
            #seoul-mini-theater-modal .ios-sec-header { display: flex !important; align-items: center !important; justify-content: space-between !important; padding: 9px 6px 5px 6px !important; font-size: 9px !important; font-weight: 800 !important; color: #8E8E98 !important; letter-spacing: 0.8px !important; }
            #seoul-mini-theater-modal .ios-group-card { background: #FFFFFF !important; border: 1px solid #E8E8F0 !important; border-radius: 16px !important; padding: 0 14px !important; margin-bottom: 8px !important; box-shadow: 0 2px 8px rgba(0,0,0,0.012) !important; flex-shrink: 0 !important; }
            #seoul-mini-theater-modal .ios-row { display: flex !important; align-items: center !important; justify-content: space-between !important; min-height: 40px !important; padding: 4px 0 !important; border: none !important; border-bottom: 1px solid #F2F2F7 !important; gap: 10px !important; box-sizing: border-box !important; background: transparent !important; }
            #seoul-mini-theater-modal .ios-row.last { border-bottom: none !important; }
            #seoul-mini-theater-modal .ios-lbl { font-size: 10.2px !important; font-weight: 700 !important; color: #2C2C32 !important; flex-shrink: 0 !important; display: flex !important; align-items: center !important; gap: 7px !important; }

            /* 最高权重剥离所有 input 边框，100% 根除双边框 */
            #seoul-mini-theater-modal #smt-page-wx_settings input,
            #seoul-mini-theater-modal #smt-page-wx_settings input[type="text"],
            #seoul-mini-theater-modal #smt-page-wx_settings input[type="number"],
            #seoul-mini-theater-modal #smt-page-wx_settings .ios-clean-inp {
                -webkit-appearance: none !important; appearance: none !important;
                flex: 1 !important; border: 0 !important; border-width: 0 !important; border-style: none !important;
                border-color: transparent !important; outline: 0 !important; box-shadow: none !important;
                background: transparent !important; background-color: transparent !important;
                border-radius: 0 !important; padding: 0 !important; margin: 0 !important;
                height: 30px !important; font-size: 10.5px !important; font-weight: 600 !important;
                color: #3A3A42 !important; text-align: right !important; min-width: 0 !important;
            }
            #seoul-mini-theater-modal #smt-page-wx_settings input::placeholder { color: #B8B8C4 !important; font-weight: 500 !important; }

            #seoul-mini-theater-modal .ios-switch { position: relative !important; width: 36px !important; height: 20px !important; border-radius: 999px !important; background: #FFFFFF !important; border: 1.2px solid #D5D5E0 !important; cursor: pointer !important; transition: all 0.22s ease !important; flex-shrink: 0 !important; box-sizing: border-box !important; }
            #seoul-mini-theater-modal .ios-switch::after { content: "" !important; position: absolute !important; top: 2px !important; left: 2px !important; width: 13.5px !important; height: 13.5px !important; border-radius: 50% !important; background: #9A9AA5 !important; transition: all 0.22s cubic-bezier(0.22,1,0.36,1) !important; }
            #seoul-mini-theater-modal .ios-switch.on { background: #2C2C34 !important; border-color: #2C2C34 !important; }
            #seoul-mini-theater-modal .ios-switch.on::after { background: #FFFFFF !important; transform: translateX(16px) !important; }

            #seoul-mini-theater-modal .ios-chip { display: inline-flex !important; align-items: center !important; justify-content: center !important; gap: 4px !important; height: 24px !important; padding: 0 10px !important; border-radius: 999px !important; background: #FFFFFF !important; border: 1px solid #E4E4EE !important; font-size: 8.8px !important; font-weight: 600 !important; color: #55555E !important; cursor: pointer !important; white-space: nowrap !important; }
            #seoul-mini-theater-modal .ios-chip.selected { background: #2C2C34 !important; border-color: #2C2C34 !important; color: #FFFFFF !important; -webkit-text-fill-color: #FFFFFF !important; font-weight: 700 !important; }
        `;
        topDoc.head.appendChild(st);

        topBadge.innerHTML = `${ICO.sliders}<span style="margin-left:3px;font-weight:700;">设置</span>`;
        topBadge.style.cssText = "display:inline-flex!important;align-items:center!important;gap:3px!important;height:26px!important;padding:0 10px!important;background:#FFFFFF!important;border:1px solid #E6E6EE!important;border-radius:999px!important;font-size:9px!important;color:#3A3A40!important;cursor:pointer!important;z-index:2!important;";
        topBadge.onclick = (e) => {
            e.preventDefault(); e.stopPropagation();
            if (wxSetPage.classList.contains("active")) topDoc.getElementById("smt-wxset-back-chat")?.click();
            else topDoc.getElementById("smt-wx-cfg-btn")?.click();
        };

        const cssDrawer = topDoc.getElementById("smt-wx-css-drawer"), sumDrawer = topDoc.getElementById("smt-wx-sum-drawer");
        const elBackChat = topDoc.getElementById("smt-wxset-back-chat"), elTimePill = topDoc.getElementById("smt-wxset-time-pill");
        const elTimeTitle = topDoc.getElementById("smt-wxset-time-title"), elTimeToggle = topDoc.getElementById("smt-wxset-time-toggle"), elClockBig = topDoc.getElementById("smt-wxset-clock-big");
        const elMyAvaFile = topDoc.getElementById("smt-cfg-myava-file"), elMyAvaPrev = topDoc.getElementById("smt-cfg-myava-preview");
        const elMyNick = topDoc.getElementById("smt-cfg-mynick"), elMyBio = topDoc.getElementById("smt-cfg-mybio"), elMyAvaUrl = topDoc.getElementById("smt-cfg-myava");
        const elCharAvaFile = topDoc.getElementById("smt-cfg-charava-file"), elCharAvaPrev = topDoc.getElementById("smt-cfg-charava-preview");
        const elRemark = topDoc.getElementById("smt-cfg-remark"), elCharBio = topDoc.getElementById("smt-cfg-charbio"), elCharAvaUrl = topDoc.getElementById("smt-cfg-charava"), elAvaSize = topDoc.getElementById("smt-cfg-avasize");
        const elBgNote = topDoc.getElementById("smt-cfg-bgnote"), elResetBtn = topDoc.getElementById("smt-cfg-reset-btn"), elSaveBtn = topDoc.getElementById("smt-cfg-save-btn");

        if (!elMyNick || topDoc.getElementById("ios-wxset-root")) return;

        [elMyNick, elMyBio, elMyAvaUrl, elRemark, elCharBio, elCharAvaUrl, elAvaSize].forEach((inp) => {
            if (inp) { inp.className = "ios-clean-inp"; inp.style.cssText = "border:0!important;box-shadow:none!important;background:transparent!important;text-align:right!important;"; }
        });

        const hiddenBox = topDoc.createElement("div");
        hiddenBox.style.cssText = "display:none!important;";
        [elTimeTitle, elTimeToggle, elClockBig].forEach((el) => el && hiddenBox.appendChild(el));

        // 构建 100% 零 Emoji 的 10 大纯白模块设置页
        wxSetPage.innerHTML = `
            <div id="ios-wxset-root" style="display:flex;flex-direction:column;height:100%;background:#FFFFFF!important;overflow:hidden;">
                <div style="display:flex;align-items:center;justify-content:space-between;padding:2px 2px 10px 2px;background:#FFFFFF!important;border-bottom:1px solid #F4F4F8;flex-shrink:0;">
                    <div id="ios-back-slot"></div><div id="ios-time-slot"></div>
                </div>

                <div style="flex:1;min-height:0;overflow-y:auto;background:#FFFFFF!important;padding:4px 2px 24px 2px;">

                    <div class="ios-sec-header"><span>01 · COUPLE PROFILE · 双人头像与微信名片</span><span>点击圆形头像换图</span></div>
                    <div class="ios-group-card" style="padding:14px!important;">
                        <div style="display:grid;grid-template-columns:1fr 44px 1fr;align-items:center;text-align:center;padding-bottom:12px;border-bottom:1px solid #F2F2F7;margin-bottom:4px;">
                            <div style="display:flex;flex-direction:column;align-items:center;">
                                <label style="position:relative;cursor:pointer;display:inline-block;"><div id="ios-myava-img-slot"></div><span style="position:absolute;right:-2px;bottom:-2px;width:20px;height:20px;border-radius:50%;background:#FFFFFF;border:1px solid #E2E2EA;display:flex;align-items:center;justify-content:center;">${ICO.camera}</span><div id="ios-myava-file-slot" style="display:none;"></div></label>
                                <span style="font-size:8.5px;font-weight:800;color:#3A3A42;margin-top:6px;">ME · 我的头像</span>
                            </div>
                            <div style="display:flex;flex-direction:column;align-items:center;">${ICO.heart}<div style="width:22px;height:1px;background:#EAEAF0;margin-top:4px;"></div></div>
                            <div style="display:flex;flex-direction:column;align-items:center;">
                                <label style="position:relative;cursor:pointer;display:inline-block;"><div id="ios-charava-img-slot"></div><span style="position:absolute;right:-2px;bottom:-2px;width:20px;height:20px;border-radius:50%;background:#FFFFFF;border:1px solid #E2E2EA;display:flex;align-items:center;justify-content:center;">${ICO.camera}</span><div id="ios-charava-file-slot" style="display:none;"></div></label>
                                <span style="font-size:8.5px;font-weight:800;color:#3A3A42;margin-top:6px;">PARTNER · 对方</span>
                            </div>
                        </div>
                        <div class="ios-row"><span class="ios-lbl">我的微信昵称</span><div id="ios-mynick-slot" style="flex:1;display:flex;"></div></div>
                        <div class="ios-row"><span class="ios-lbl">我的状态签名</span><div id="ios-mybio-slot" style="flex:1;display:flex;"></div></div>
                        <div class="ios-row"><span class="ios-lbl">我的头像链接</span><div id="ios-myavaurl-slot" style="flex:1;display:flex;"></div></div>
                        <div class="ios-row"><span class="ios-lbl">TA 的专属备注</span><div id="ios-remark-slot" style="flex:1;display:flex;"></div></div>
                        <div class="ios-row"><span class="ios-lbl">TA 的顶栏状态</span><div id="ios-charbio-slot" style="flex:1;display:flex;"></div></div>
                        <div class="ios-row"><span class="ios-lbl">TA 的头像链接</span><div id="ios-charavaurl-slot" style="flex:1;display:flex;"></div></div>
                        <div class="ios-row last"><span class="ios-lbl">气泡头像尺寸 (px)</span><div id="ios-avasize-slot" style="width:70px;display:flex;"></div></div>
                    </div>

                    <div class="ios-sec-header"><span>02 · VOICE CALL &amp; PROACTIVE · 实时语音通话与主动消息</span></div>
                    <div class="ios-group-card" style="padding:12px 14px!important;">
                        <div style="display:flex;align-items:center;justify-content:space-between;padding-bottom:10px;border-bottom:1px solid #F2F2F7;margin-bottom:10px;">
                            <div><div class="ios-lbl">${ICO.phoneCall}<span>向 TA 发起实时微信语音通话</span></div><div style="font-size:8px;color:#9A9AA5;margin-left:20px;">进入高定清冷雾白通话界面，听 TA 贴耳低语与环境音</div></div>
                            <span class="smt-pill-btn dark" id="ios-start-voice-call" style="height:28px!important;padding:0 12px!important;gap:5px!important;">${ICO.phoneCall}<span>立即拨打语音</span></span>
                        </div>
                        <div style="font-size:8.8px;font-weight:700;color:#55555E;margin-bottom:7px;">或者点击下方情境，让 TA 现在主动发微信消息找你：</div>
                        <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px;">
                            <span class="ios-chip" data-proact="突然想你了，主动发微信问你在干嘛">${ICO.spark}<span>日常想你</span></span>
                            <span class="ios-chip" data-proact="深夜睡不着，主动发微信查岗撒娇">${ICO.spark}<span>深夜查岗</span></span>
                            <span class="ios-chip" data-proact="看到你没回消息有点吃醋，主动发消息试探">${ICO.spark}<span>吃醋试探</span></span>
                            <span class="ios-chip" data-proact="在首尔街头看到好吃的，主动拍给你看并给你发微信转账买零食">${ICO.spark}<span>报备转账</span></span>
                        </div>
                    </div>

                    <div class="ios-sec-header"><span>03 · WEATHER &amp; CITY · 真实天气与城市环境同步</span></div>
                    <div class="ios-group-card">
                        <div class="ios-row" id="ios-row-weather-sw" style="cursor:pointer;">
                            <div><div class="ios-lbl">${ICO.cloudSnow}<span>开启真实天气与温度感知</span></div><div style="font-size:8px;color:#9A9AA5;margin-left:21px;">TA 会在微信聊天和电话里自然提及此刻的天气冷暖</div></div>
                            <div class="ios-switch on" id="ios-sw-weather"></div>
                        </div>
                        <div class="ios-row"><span class="ios-lbl">当前所在城市</span><input type="text" id="ios-inp-wcity" class="ios-clean-inp" placeholder="如：Seoul · 首尔 / 上海" /></div>
                        <div class="ios-row">
                            <span class="ios-lbl">当前实时天气状态</span>
                            <div style="display:flex;align-items:center;gap:6px;flex:1;justify-content:flex-end;">
                                <input type="text" id="ios-inp-wdesc" class="ios-clean-inp" placeholder="如：初雪微雾 · -1°C" />
                                <span class="ios-chip selected" id="ios-btn-fetch-weather" style="padding:0 8px!important;">${ICO.sync}<span>联网实况</span></span>
                            </div>
                        </div>
                        <div class="ios-row last" style="padding:8px 0!important;">
                            <span style="font-size:8.5px;color:#8E8E98;font-weight:700;">一键切换氛围天气：</span>
                            <div style="display:flex;gap:5px;flex-wrap:wrap;justify-content:flex-end;">
                                <span class="ios-chip" data-wpreset="初雪飘落 · -2°C">${ICO.snow}<span>初雪 -2°C</span></span>
                                <span class="ios-chip" data-wpreset="冷雨夜幕 · 11°C">${ICO.rain}<span>雨夜 11°C</span></span>
                                <span class="ios-chip" data-wpreset="晴朗微风 · 21°C">${ICO.sun}<span>晴朗 21°C</span></span>
                            </div>
                        </div>
                    </div>

                    <div class="ios-sec-header"><span>04 · ONLINE PERSONA · 角色线上人设与反差设定</span></div>
                    <div class="ios-group-card" style="padding:10px 14px!important;">
                        <div class="ios-row" style="padding:4px 0 10px 0!important;">
                            <span class="ios-lbl">${ICO.mask}<span>TA 的微信人设模式</span></span>
                            <div style="display:flex;gap:5px;" id="ios-pmode-group">
                                <span class="ios-chip selected" data-pmode="sync">与酒馆人设一致</span>
                                <span class="ios-chip" data-pmode="custom">叠加线上反差人设</span>
                            </div>
                        </div>
                        <div id="ios-custom-persona-box" style="display:none;padding-top:6px;border-top:1px dashed #EAEAF0;">
                            <div style="font-size:8.5px;font-weight:800;color:#55555E;margin-bottom:4px;">TA 在微信上的专属反差/补充人设：</div>
                            <textarea id="ios-inp-char-persona" style="width:100%;height:48px;background:#FFFFFF;border:1px solid #EAEAF0;border-radius:10px;padding:6px 8px;font-size:9.8px;color:#2C2C32;box-sizing:border-box;resize:none;outline:none;margin-bottom:8px;" placeholder="如：现实高冷禁欲，但在微信上却极度粘人爱吃醋..."></textarea>
                        </div>
                        <div style="padding-top:6px;">
                            <div style="font-size:8.5px;font-weight:800;color:#55555E;margin-bottom:4px;">我的线上人设与背景设定：</div>
                            <textarea id="ios-inp-my-persona" style="width:100%;height:42px;background:#FFFFFF;border:1px solid #EAEAF0;border-radius:10px;padding:6px 8px;font-size:9.8px;color:#2C2C32;box-sizing:border-box;resize:none;outline:none;" placeholder="写下你的线上人设、外貌或当前身份（留空默认用酒馆主控设定）..."></textarea>
                        </div>
                    </div>

                    <div class="ios-sec-header"><span>05 · INTIMACY &amp; POKE · 专属亲密称呼与拍一拍</span></div>
                    <div class="ios-group-card">
                        <div class="ios-row"><span class="ios-lbl">TA 对我的专属称呼</span><input type="text" id="ios-inp-petname" class="ios-clean-inp" placeholder="如：姐姐 / 宝宝 / 小笨蛋" /></div>
                        <div class="ios-row"><span class="ios-lbl">拍一拍自定义后缀</span><input type="text" id="ios-inp-poke" class="ios-clean-inp" placeholder="如：的小脑袋说今天也很想你" /></div>
                        <div class="ios-row last"><span class="ios-lbl">聊天框顶部置顶公告</span><input type="text" id="ios-inp-pin" class="ios-clean-inp" placeholder="输入纪念日或置顶句子 (留空隐藏)" /></div>
                    </div>

                    <div class="ios-sec-header"><span>06 · RHYTHM &amp; TONE · 关系羁绊与打字语感矩阵</span></div>
                    <div class="ios-group-card" style="padding:10px 14px!important;">
                        <div class="ios-row" style="flex-direction:column;align-items:flex-start!important;padding:6px 0 10px 0!important;">
                            <span class="ios-lbl" style="margin-bottom:6px;">我们当前的关系阶段</span>
                            <div style="display:flex;flex-wrap:wrap;gap:5px;" id="ios-rel-group">
                                <span class="ios-chip" data-rel="暧昧拉扯期">暧昧拉扯期</span>
                                <span class="ios-chip selected" data-rel="热恋同居期">热恋同居期</span>
                                <span class="ios-chip" data-rel="新婚蜜月期">新婚蜜月期</span>
                                <span class="ios-chip" data-rel="冷战破冰期">冷战破冰期</span>
                                <span class="ios-chip" data-rel="宿命羁绊伴侣">宿命羁绊伴侣</span>
                            </div>
                        </div>
                        <div class="ios-row" style="flex-direction:column;align-items:flex-start!important;padding:8px 0 10px 0!important;">
                            <span class="ios-lbl" style="margin-bottom:6px;">TA 的占有欲与吃醋浓度</span>
                            <div style="display:flex;flex-wrap:wrap;gap:5px;" id="ios-jeal-group">
                                <span class="ios-chip" data-jeal="克制隐忍">克制隐忍</span>
                                <span class="ios-chip" data-jeal="傲娇口是心非">傲娇口是心非</span>
                                <span class="ios-chip selected" data-jeal="偏执强占有欲">偏执强占有欲</span>
                                <span class="ios-chip" data-jeal="温柔宠溺包容">温柔宠溺包容</span>
                            </div>
                        </div>
                        <div class="ios-row" style="padding:8px 0!important;">
                            <span class="ios-lbl">TA 单次连发气泡数</span>
                            <div style="display:flex;gap:5px;" id="ios-rcnt-group">
                                <span class="ios-chip" data-rcnt="1~2">1~2条</span>
                                <span class="ios-chip selected" data-rcnt="2~4">2~4条</span>
                                <span class="ios-chip" data-rcnt="4~6">4~6条</span>
                            </div>
                        </div>
                        <div class="ios-row last" style="flex-direction:column;align-items:flex-start!important;padding:8px 0 4px 0!important;">
                            <span class="ios-lbl" style="margin-bottom:6px;">TA 的线上打字语感偏好（可多选）</span>
                            <div style="display:flex;flex-wrap:wrap;gap:5px;" id="ios-stag-group">
                                <span class="ios-chip" data-stag="日常自然短句">日常自然短句</span>
                                <span class="ios-chip" data-stag="清冷克制少话">清冷克制少话</span>
                                <span class="ios-chip" data-stag="高粘人秒回撒娇">高粘人秒回撒娇</span>
                                <span class="ios-chip" data-stag="句末爱带语气词">句末爱带语气词</span>
                                <span class="ios-chip" data-stag="偶尔夹杂韩文短句">偶尔夹杂韩文</span>
                                <span class="ios-chip" data-stag="带括号描写神态动作">带括号神态动作</span>
                            </div>
                        </div>
                    </div>

                    <div class="ios-sec-header"><span>07 · APPEARANCE · 聊天壁纸、字号与气泡美化</span></div>
                    <div class="ios-group-card">
                        <div class="ios-row">
                            <span class="ios-lbl">${ICO.image}<span>聊天背景壁纸</span></span>
                            <div style="display:flex;align-items:center;gap:5px;flex:1;justify-content:flex-end;">
                                <input type="text" id="ios-wp-url" class="ios-clean-inp" placeholder="粘贴URL 或右侧选图..." />
                                <label class="ios-chip selected" style="cursor:pointer;padding:0 8px!important;"><span>相册选图</span><input type="file" id="ios-wp-file" accept="image/*" style="display:none;" /></label>
                                <span class="ios-chip" id="ios-wp-clear" style="padding:0 7px!important;">清除</span>
                            </div>
                        </div>
                        <div class="ios-row">
                            <span class="ios-lbl">壁纸白雾柔焦浓度</span>
                            <div style="display:flex;gap:5px;" id="ios-wpmask-group">
                                <span class="ios-chip" data-wpmask="none">原图</span>
                                <span class="ios-chip selected" data-wpmask="light">58% 柔雾</span>
                                <span class="ios-chip" data-wpmask="mist">82% 纯白雾</span>
                            </div>
                        </div>
                        <div class="ios-row">
                            <span class="ios-lbl">聊天气泡字体大小</span>
                            <div style="display:flex;gap:5px;" id="ios-fsize-group">
                                <span class="ios-chip" data-fsize="11px">11px 精致</span>
                                <span class="ios-chip selected" data-fsize="12px">12px 标准</span>
                                <span class="ios-chip" data-fsize="13px">13px 清晰</span>
                            </div>
                        </div>
                        <div class="ios-row last" id="ios-open-css-row" style="cursor:pointer;">
                            <span class="ios-lbl">${ICO.palette}<span>自定义气泡与双尾巴 CSS 美化工作台</span></span>
                            <span style="font-size:10px;color:#8E8E98;font-weight:700;">展开代码 ▾</span>
                        </div>
                        <div id="ios-css-slot"></div>
                    </div>

                    <div class="ios-sec-header"><span>08 · MEMORY &amp; TIME · 记忆同步与区间总结</span></div>
                    <div class="ios-group-card">
                        <div class="ios-row" id="ios-row-sync" style="cursor:pointer;">
                            <div><div class="ios-lbl">${ICO.sync}<span>微信记忆实时同步至酒馆主线</span></div><div style="font-size:8px;color:#9A9AA5;margin-left:20px;" id="ios-sync-sub">开启后主线剧情将自动感知微信聊天内容</div></div>
                            <div class="ios-switch" id="ios-sw-sync"></div>
                        </div>
                        <div class="ios-row" id="ios-row-time" style="cursor:pointer;">
                            <div><div class="ios-lbl">${ICO.clock}<span>真实现实时间与昼夜感知</span></div><div style="font-size:8px;color:#9A9AA5;margin-left:21px;" id="ios-time-sub">开启后 TA 会感知你手机当前的真实时间</div></div>
                            <div class="ios-switch on" id="ios-sw-time"></div>
                        </div>
                        <div class="ios-row last" id="ios-open-sum-row" style="cursor:pointer;">
                            <span class="ios-lbl">${ICO.summary}<span>生成微信区间记忆摘要 / 注入主线</span></span>
                            <span style="font-size:10px;color:#8E8E98;font-weight:700;">展开工具 ▾</span>
                        </div>
                        <div id="ios-sum-slot"></div>
                    </div>

                    <div class="ios-sec-header"><span>09 · WORLD INFO · 世界书导入与角色自动读取</span></div>
                    <div class="ios-group-card" style="padding:12px 14px!important;">
                        <div style="display:flex;justify-content:space-between;align-items:center;padding-bottom:10px;border-bottom:1px solid #F2F2F7;margin-bottom:10px;">
                            <div><div class="ios-lbl">${ICO.book}<span>启用角色世界书自动读取</span></div><div style="font-size:8px;color:#9A9AA5;margin-left:21px;">在微信聊天与全应用中自动注入世界观设定</div></div>
                            <div class="ios-switch on" id="ios-sw-wi"></div>
                                                    </div>
                        <div style="display:flex;gap:6px;margin-bottom:7px;">
                            <label class="smt-pill-btn dark" style="flex:1.15;height:28px!important;cursor:pointer;border-radius:10px!important;gap:4px!important;">${ICO.upload}<span>导入世界书 (.json/.txt)</span><input type="file" id="smt-wi-file-inp" accept=".json,.txt,.world" multiple style="display:none;" /></label>
                            <span class="smt-pill-btn" id="smt-wi-sync-st-btn" style="flex:1;height:28px!important;border-radius:10px!important;gap:4px!important;">${ICO.sync}<span>读取酒馆世界书</span></span>
                            <span class="smt-pill-btn" id="smt-wi-open-add-drawer" style="height:28px!important;padding:0 10px!important;border-radius:10px!important;gap:3px!important;">${ICO.plus}<span>新增</span></span>
                        </div>
                        <div id="smt-wi-sync-status" style="display:none;font-size:8.5px;font-weight:700;color:#484852;background:#F8F8FA;border:1px solid #EAEAF0;border-radius:8px;padding:5px 9px;margin-bottom:8px;"></div>

                        <div id="smt-wi-add-drawer" style="display:none;background:#FFFFFF;border:1px solid #EAEAF0;border-radius:12px;padding:8px 12px;margin-bottom:9px;">
                            <div class="ios-row"><span class="ios-lbl">设定标题</span><input type="text" id="smt-wi-new-title" class="ios-clean-inp" placeholder="如：两人的初遇设定" /></div>
                            <div class="ios-row"><span class="ios-lbl">触发关键词</span><input type="text" id="smt-wi-new-keys" class="ios-clean-inp" placeholder="逗号隔开 (留空则常驻生效)" /></div>
                            <textarea id="smt-wi-new-content" style="width:100%;height:48px;background:#FFFFFF;border:1px solid #EAEAF0;border-radius:9px;padding:6px 8px;font-size:9.8px;color:#2C2C32;box-sizing:border-box;resize:none;outline:none;margin:6px 0;" placeholder="写下该条世界书的具体设定内容..."></textarea>
                            <div style="display:flex;justify-content:flex-end;gap:5px;"><span class="smt-pill-btn" id="smt-wi-cancel-add" style="height:24px!important;">收起</span><span class="smt-pill-btn dark" id="smt-wi-add-btn" style="height:24px!important;gap:3px!important;">${ICO.check}<span>存入世界书</span></span></div>
                        </div>

                        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
                            <span style="font-size:8.5px;font-weight:800;color:#7A7A85;" id="smt-wi-count-txt">已挂载设定 (0)</span>
                            <div style="display:flex;gap:10px;align-items:center;"><span id="smt-wi-mode-btn" style="font-size:8px;font-weight:700;color:#55555E;cursor:pointer;border:1px solid #EAEAF0;padding:2px 7px;border-radius:99px;">模式: 常驻+词触发</span><span id="smt-wi-clear-btn" style="font-size:8px;font-weight:700;color:#9A6868;cursor:pointer;">清空</span></div>
                        </div>
                        <div id="smt-wi-entries-list" style="max-height:145px;overflow-y:auto;display:flex;flex-direction:column;gap:5px;"></div>
                        <div style="margin-top:10px;padding-top:8px;border-top:1px solid #F4F4F8;"><div style="font-size:8.5px;font-weight:800;color:#8E8E98;margin-bottom:4px;">当前私聊补充背景便签</div><div id="ios-bgnote-slot"></div></div>
                    </div>

                    <div class="ios-sec-header"><span>10 · DATA &amp; SYSTEM · 聊天记录备份与管理</span></div>
                    <div class="ios-group-card" style="padding:12px 14px!important;">
                        <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-bottom:8px;">
                            <span class="smt-pill-btn" id="ios-export-chat-btn" style="height:28px!important;border-radius:10px!important;gap:4px!important;">${ICO.download}<span>导出聊天备份 (.json)</span></span>
                            <label class="smt-pill-btn" style="height:28px!important;border-radius:10px!important;cursor:pointer;gap:4px!important;">${ICO.sync}<span>导入恢复聊天记录</span><input type="file" id="ios-import-chat-inp" accept=".json" style="display:none;" /></label>
                        </div>
                        <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-bottom:10px;">
                            <span class="smt-pill-btn" id="ios-clear-wx-btn" style="height:28px!important;border-radius:10px!important;color:#9A6868!important;gap:4px!important;">${ICO.trash}<span>清空当前聊天记录</span></span>
                            <span class="smt-pill-btn" id="ios-open-admin-btn" style="height:28px!important;border-radius:10px!important;gap:4px!important;">${ICO.shield}<span>管理员 / 锁屏后台</span></span>
                        </div>
                        <div style="display:flex;gap:8px;"><div id="ios-reset-slot" style="flex:0.8;display:flex;"></div><div id="ios-save-slot" style="flex:1.4;display:flex;"></div></div>
                    </div>

                </div>
            </div>`;
        wxSetPage.appendChild(hiddenBox);

        // 挂载原节点
        if (elBackChat) { elBackChat.style.cssText = "height:28px!important;padding:0 12px!important;background:#FFFFFF!important;border:1px solid #E6E6EE!important;border-radius:999px!important;font-size:9.5px!important;font-weight:800!important;color:#2C2C32!important;"; topDoc.getElementById("ios-back-slot").appendChild(elBackChat); }
        if (elTimePill) { elTimePill.style.cssText = "height:26px!important;padding:0 10px!important;background:#FFFFFF!important;border:1px solid #ECECF2!important;border-radius:999px!important;font-size:8.5px!important;font-weight:700!important;color:#6E6E77!important;"; topDoc.getElementById("ios-time-slot").appendChild(elTimePill); }
        if (elMyAvaPrev) { elMyAvaPrev.style.cssText = "width:56px!important;height:56px!important;border-radius:50%!important;object-fit:cover!important;border:1.5px solid #EAEAF0!important;display:block!important;"; topDoc.getElementById("ios-myava-img-slot").appendChild(elMyAvaPrev); }
        if (elMyAvaFile) topDoc.getElementById("ios-myava-file-slot").appendChild(elMyAvaFile);
        if (elCharAvaPrev) { elCharAvaPrev.style.cssText = "width:56px!important;height:56px!important;border-radius:50%!important;object-fit:cover!important;border:1.5px solid #EAEAF0!important;display:block!important;"; topDoc.getElementById("ios-charava-img-slot").appendChild(elCharAvaPrev); }
        if (elCharAvaFile) topDoc.getElementById("ios-charava-file-slot").appendChild(elCharAvaFile);

        if (elMyNick) topDoc.getElementById("ios-mynick-slot").appendChild(elMyNick);
        if (elMyBio) topDoc.getElementById("ios-mybio-slot").appendChild(elMyBio);
        if (elMyAvaUrl) topDoc.getElementById("ios-myavaurl-slot").appendChild(elMyAvaUrl);
        if (elRemark) topDoc.getElementById("ios-remark-slot").appendChild(elRemark);
        if (elCharBio) topDoc.getElementById("ios-charbio-slot").appendChild(elCharBio);
        if (elCharAvaUrl) topDoc.getElementById("ios-charavaurl-slot").appendChild(elCharAvaUrl);
        if (elAvaSize) topDoc.getElementById("ios-avasize-slot").appendChild(elAvaSize);

        if (elBgNote) { elBgNote.style.cssText = "width:100%!important;height:44px!important;background:#FFFFFF!important;border:1px solid #EAEAF0!important;border-radius:10px!important;padding:6px 8px!important;font-size:9.8px!important;color:#2C2C32!important;box-sizing:border-box!important;resize:none!important;outline:none!important;"; topDoc.getElementById("ios-bgnote-slot").appendChild(elBgNote); }
        if (elResetBtn) { elResetBtn.style.cssText = "width:100%!important;height:32px!important;border-radius:11px!important;font-size:9.5px!important;font-weight:700!important;background:#FFFFFF!important;"; topDoc.getElementById("ios-reset-slot").appendChild(elResetBtn); }
        if (elSaveBtn) { elSaveBtn.style.cssText = "width:100%!important;height:32px!important;border-radius:11px!important;font-size:10px!important;font-weight:800!important;background:#2C2C34!important;border-color:#2C2C34!important;gap:4px!important;"; elSaveBtn.innerHTML = `${ICO.check}<span>保存全部设置并返回</span>`; topDoc.getElementById("ios-save-slot").appendChild(elSaveBtn); }

        if (sumDrawer) { sumDrawer.style.cssText = "display:none;background:#FFFFFF!important;border:1px solid #EAEAF0!important;border-radius:12px!important;padding:10px!important;margin:4px 0 10px 0!important;"; topDoc.getElementById("ios-sum-slot").appendChild(sumDrawer); }
        if (cssDrawer) { cssDrawer.style.cssText = "display:none;background:#FFFFFF!important;border:1px solid #EAEAF0!important;border-radius:12px!important;padding:10px!important;margin:4px 0 10px 0!important;"; topDoc.getElementById("ios-css-slot").appendChild(cssDrawer); }

        function showWiStatus(msg) {
            const box = topDoc.getElementById("smt-wi-sync-status");
            if (!box) return;
            box.textContent = msg;
            box.style.display = "block";
        }

        function syncAllUI() {
            const ex = loadExtra();
            topDoc.getElementById("ios-inp-petname").value = ex.petNameForMe || "";
            topDoc.getElementById("ios-inp-poke").value = ex.pokeSuffix || "";
            topDoc.getElementById("ios-inp-pin").value = ex.pinNotice || "";
            topDoc.getElementById("ios-inp-wcity").value = ex.weatherCity || "Seoul · 首尔";
            topDoc.getElementById("ios-inp-wdesc").value = ex.weatherDesc || "初雪微雾 · -1°C";
            topDoc.getElementById("ios-sw-weather")?.classList.toggle("on", ex.weatherEnabled !== false);

            topDoc.getElementById("ios-inp-char-persona").value = ex.charOnlinePersona || "";
            topDoc.getElementById("ios-inp-my-persona").value = ex.myOnlinePersona || "";
            topDoc.querySelectorAll("#ios-pmode-group .ios-chip").forEach((c) => c.classList.toggle("selected", c.getAttribute("data-pmode") === (ex.personaMode || "sync")));
            topDoc.getElementById("ios-custom-persona-box").style.display = ex.personaMode === "custom" ? "block" : "none";
            topDoc.getElementById("ios-wp-url").value = ex.wallpaperUrl?.startsWith("data:") ? "[已设置本地壁纸]" : (ex.wallpaperUrl || "");

            topDoc.querySelectorAll("#ios-rel-group .ios-chip").forEach((c) => c.classList.toggle("selected", c.getAttribute("data-rel") === (ex.relationStage || "热恋同居期")));
            topDoc.querySelectorAll("#ios-jeal-group .ios-chip").forEach((c) => c.classList.toggle("selected", c.getAttribute("data-jeal") === (ex.jealousyLv || "偏执强占有欲")));
            topDoc.querySelectorAll("#ios-rcnt-group .ios-chip").forEach((c) => c.classList.toggle("selected", c.getAttribute("data-rcnt") === (ex.replyCount || "2~4")));
            topDoc.querySelectorAll("#ios-stag-group .ios-chip").forEach((c) => c.classList.toggle("selected", (ex.styleTags || []).includes(c.getAttribute("data-stag"))));
            topDoc.querySelectorAll("#ios-wpmask-group .ios-chip").forEach((c) => c.classList.toggle("selected", c.getAttribute("data-wpmask") === (ex.wallpaperMask || "light")));
            topDoc.querySelectorAll("#ios-fsize-group .ios-chip").forEach((c) => c.classList.toggle("selected", c.getAttribute("data-fsize") === (ex.fontSize || "12px")));

            const isSync = localStorage.getItem("sumoul_v16_sync") === "true";
            topDoc.getElementById("ios-sw-sync")?.classList.toggle("on", isSync);
            topDoc.getElementById("ios-sync-sub").textContent = isSync ? "已开启 · 微信对话实时同步至酒馆上下文" : "已关闭 · 纯独立私密微信聊天";

            const isTime = elTimeToggle ? elTimeToggle.classList.contains("dark") : true;
            topDoc.getElementById("ios-sw-time")?.classList.toggle("on", isTime);
            topDoc.getElementById("ios-time-sub").textContent = isTime ? "已开启 · TA 会实时感知你当前的真实时间" : "已关闭真实时间感知";
        }

        function saveFromInputs() {
            const ex = loadExtra();
            ex.petNameForMe = topDoc.getElementById("ios-inp-petname").value.trim();
            ex.pokeSuffix = topDoc.getElementById("ios-inp-poke").value.trim();
            ex.pinNotice = topDoc.getElementById("ios-inp-pin").value.trim();
            ex.weatherCity = topDoc.getElementById("ios-inp-wcity").value.trim();
            ex.weatherDesc = topDoc.getElementById("ios-inp-wdesc").value.trim();
            ex.charOnlinePersona = topDoc.getElementById("ios-inp-char-persona").value.trim();
            ex.myOnlinePersona = topDoc.getElementById("ios-inp-my-persona").value.trim();
            const rawWp = topDoc.getElementById("ios-wp-url").value.trim();
            if (rawWp && rawWp !== "[已设置本地壁纸]") ex.wallpaperUrl = rawWp;
            else if (!rawWp) ex.wallpaperUrl = "";
            saveExtra(ex);
            applyVisualsAndPin();
        }

        ["ios-inp-petname", "ios-inp-poke", "ios-inp-pin", "ios-inp-wcity", "ios-inp-wdesc", "ios-inp-char-persona", "ios-inp-my-persona", "ios-wp-url"].forEach((id) => {
            topDoc.getElementById(id)?.addEventListener("change", saveFromInputs);
        });
        elSaveBtn?.addEventListener("click", saveFromInputs, true);

        topDoc.getElementById("ios-start-voice-call").onclick = () => { saveFromInputs(); openVoiceCallModal(); };
        topDoc.getElementById("ios-row-weather-sw").onclick = () => { const ex = loadExtra(); ex.weatherEnabled = !(ex.weatherEnabled !== false); saveExtra(ex); syncAllUI(); };
        topDoc.getElementById("ios-btn-fetch-weather").onclick = async (e) => {
            const btn = e.currentTarget, orig = btn.innerHTML;
            btn.textContent = "获取中...";
            const res = await fetchRealLiveWeather(topDoc.getElementById("ios-inp-wcity").value.trim());
            btn.innerHTML = orig;
            if (res) { const ex = loadExtra(); ex.weatherCity = res.city; ex.weatherDesc = res.weather; saveExtra(ex); syncAllUI(); }
            else alert("实时天气拉取超时，可直接点击下方快捷天气标签或手动输入！");
        };
        topDoc.querySelectorAll("[data-wpreset]").forEach((chip) => chip.onclick = () => { const ex = loadExtra(); ex.weatherDesc = chip.getAttribute("data-wpreset"); saveExtra(ex); syncAllUI(); });
        topDoc.querySelectorAll("#ios-pmode-group .ios-chip").forEach((chip) => chip.onclick = () => { const ex = loadExtra(); ex.personaMode = chip.getAttribute("data-pmode"); saveExtra(ex); syncAllUI(); });

        const bindSingle = (sel, attr, key, fn) => {
            topDoc.querySelectorAll(`${sel} .ios-chip`).forEach((c) => c.onclick = () => { const ex = loadExtra(); ex[key] = c.getAttribute(attr); saveExtra(ex); syncAllUI(); if (fn) fn(); });
        };
        bindSingle("#ios-rel-group", "data-rel", "relationStage");
        bindSingle("#ios-jeal-group", "data-jeal", "jealousyLv");
        bindSingle("#ios-rcnt-group", "data-rcnt", "replyCount");
        bindSingle("#ios-wpmask-group", "data-wpmask", "wallpaperMask", applyVisualsAndPin);
        bindSingle("#ios-fsize-group", "data-fsize", "fontSize", applyVisualsAndPin);

        topDoc.querySelectorAll("#ios-stag-group .ios-chip").forEach((chip) => chip.onclick = () => {
            const ex = loadExtra(), tag = chip.getAttribute("data-stag");
            ex.styleTags = ex.styleTags || [];
            ex.styleTags = ex.styleTags.includes(tag) ? ex.styleTags.filter((t) => t !== tag) : [...ex.styleTags, tag];
            saveExtra(ex); syncAllUI();
        });

        topDoc.querySelectorAll("[data-proact]").forEach((btn) => btn.onclick = () => {
            const scene = btn.getAttribute("data-proact");
            saveFromInputs(); elBackChat?.click();
            setTimeout(() => {
                const chatKey = `sumoul_v16_wx__${getCharScope()}`;
                let list = [];
                try { list = JSON.parse(localStorage.getItem(chatKey) || "[]"); } catch (e) {}
                const d = new Date(), tStr = `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
                list.push({ role: "sys", text: `触发情境：TA ${scene}`, time: tStr });
                localStorage.setItem(chatKey, JSON.stringify(list));
                topDoc.getElementById("smt-wx-reply-btn")?.click();
            }, 120);
        });

        topDoc.getElementById("ios-wp-file").onchange = async (e) => {
            const f = e.target.files?.[0]; if (!f) return;
            const ex = loadExtra(); ex.wallpaperUrl = await compressImg(f, 720); saveExtra(ex); syncAllUI(); applyVisualsAndPin();
        };
        topDoc.getElementById("ios-wp-clear").onclick = () => { const ex = loadExtra(); ex.wallpaperUrl = ""; saveExtra(ex); topDoc.getElementById("ios-wp-url").value = ""; applyVisualsAndPin(); };

        const pokeBtn = talkPage.querySelector('[data-wxact="poke"]');
        if (pokeBtn) {
            pokeBtn.addEventListener("click", () => {
                const ex = loadExtra();
                if (ex.pokeSuffix?.trim()) {
                    setTimeout(() => {
                        const sysNodes = talkPage.querySelectorAll(".smt-wx-sys"), lastSys = sysNodes[sysNodes.length - 1];
                        if (lastSys && lastSys.textContent.includes("拍了拍") && !lastSys.textContent.includes(ex.pokeSuffix)) lastSys.textContent += ` ${ex.pokeSuffix.trim()}`;
                    }, 30);
                }
            });
        }

        topDoc.getElementById("ios-row-sync").onclick = () => { topDoc.getElementById("smt-sync-toggle")?.click(); syncAllUI(); };
        topDoc.getElementById("ios-row-time").onclick = () => { elTimeToggle?.click(); setTimeout(syncAllUI, 20); };
        topDoc.getElementById("ios-open-sum-row").onclick = () => { if (sumDrawer) sumDrawer.style.display = sumDrawer.style.display === "block" ? "none" : "block"; };
        topDoc.getElementById("ios-open-css-row").onclick = () => {
            if (cssDrawer) {
                cssDrawer.style.display = cssDrawer.style.display !== "block" ? "block" : "none";
                const ta = topDoc.getElementById("smt-wx-css-textarea");
                if (ta && !ta.value) topDoc.getElementById("smt-wx-css-btn")?.click();
            }
        };

        const cssUpload = topDoc.getElementById("smt-wx-css-upload");
        if (cssUpload) {
            cssUpload.onchange = async (ev) => {
                const f = ev.target.files?.[0]; if (!f) return;
                const ta = topDoc.getElementById("smt-wx-css-textarea");
                if (ta) ta.value = await f.text();
            };
        }

        topDoc.getElementById("ios-export-chat-btn").onclick = () => {
            const raw = localStorage.getItem(`sumoul_v16_wx__${getCharScope()}`) || "[]";
            const a = topDoc.createElement("a");
            a.href = URL.createObjectURL(new Blob([raw], { type: "application/json" }));
            a.download = `Sumoul_WeChat_${getCharScope()}.json`;
            a.click();
        };
        topDoc.getElementById("ios-import-chat-inp").onchange = async (e) => {
            const f = e.target.files?.[0]; if (!f) return;
            try {
                const arr = JSON.parse(await f.text());
                if (Array.isArray(arr)) { localStorage.setItem(`sumoul_v16_wx__${getCharScope()}`, JSON.stringify(arr)); alert(`已恢复 ${arr.length} 条记录`); elBackChat?.click(); }
            } catch (err) { alert("备份文件格式有误"); }
        };

        topDoc.getElementById("ios-clear-wx-btn").onclick = () => { if (confirm("确定清空与当前角色的微信聊天记录吗？")) { topDoc.getElementById("smt-wx-clear")?.click(); elBackChat?.click(); } };
        topDoc.getElementById("ios-open-admin-btn").onclick = () => topDoc.getElementById("smt-api-open-admin")?.click();

        // 世界书列表渲染（零 Emoji）
        function renderWiList() {
            const wi = loadWi();
            topDoc.getElementById("ios-sw-wi")?.classList.toggle("on", wi.enabled);
            topDoc.getElementById("smt-wi-mode-btn").textContent = wi.mode === "all" ? "模式: 全部强注" : "模式: 常驻+词触发";
            const enCnt = (wi.entries || []).filter((x) => x.enabled).length;
            topDoc.getElementById("smt-wi-count-txt").textContent = `已启用 ${enCnt} / 共 ${wi.entries.length} 条设定`;

            const listEl = topDoc.getElementById("smt-wi-entries-list");
            if (!wi.entries?.length) {
                listEl.innerHTML = `<div style="text-align:center;padding:12px;background:#FFFFFF;border:1px dashed #E2E2EA;border-radius:11px;font-size:9px;color:#9A9AA5;">尚未挂载世界书 · 点击上方导入 .json 或读取酒馆设定</div>`;
                return;
            }
            listEl.innerHTML = wi.entries.map((it, idx) => {
                const isConst = wi.mode === "all" || it.constant || !it.keys?.length;
                const badge = isConst ? `<span style="background:#2C2C34;color:#FFF;padding:1px 6px;border-radius:99px;font-size:7.5px;">常驻</span>` : `<span style="border:1px solid #E2E2EA;color:#55555E;padding:1px 6px;border-radius:99px;font-size:7.5px;">词:${it.keys.slice(0, 3).join(",")}</span>`;
                return `<div style="background:#FFFFFF;border:1px solid ${it.enabled ? "#E2E2EC" : "#F2F2F6"};border-radius:11px;padding:7px 10px;opacity:${it.enabled ? "1" : "0.5"};"><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:3px;"><label style="display:flex;align-items:center;gap:6px;font-size:9.5px;font-weight:800;color:#2C2C32;cursor:pointer;"><input type="checkbox" data-witog="${idx}" ${it.enabled ? "checked" : ""} style="accent-color:#2C2C34;flex:none!important;width:13px!important;height:13px!important;" /><span>${it.title.replace(/</g, "&lt;")}</span>${badge}</label><div style="display:flex;gap:8px;align-items:center;"><span data-wicon="${idx}" style="font-size:8px;color:#7A7A85;cursor:pointer;">${it.constant ? "改词触发" : "设为常驻"}</span><span data-widel="${idx}" style="color:#9A6868;cursor:pointer;display:inline-flex;align-items:center;">${ICO.close}</span></div></div><div style="font-size:8.8px;color:#6E6E77;line-height:1.45;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;padding-left:18px;">${it.content.replace(/</g, "&lt;")}</div></div>`;
            }).join("");

            listEl.querySelectorAll("[data-witog]").forEach((cb) => cb.onchange = (e) => { const d = loadWi(); d.entries[Number(cb.getAttribute("data-witog"))].enabled = e.target.checked; saveWi(d); renderWiList(); });
            listEl.querySelectorAll("[data-wicon]").forEach((b) => b.onclick = () => { const d = loadWi(), i = Number(b.getAttribute("data-wicon")); d.entries[i].constant = !d.entries[i].constant; saveWi(d); renderWiList(); });
            listEl.querySelectorAll("[data-widel]").forEach((b) => b.onclick = () => { const d = loadWi(); d.entries.splice(Number(b.getAttribute("data-widel")), 1); saveWi(d); renderWiList(); });
        }

        topDoc.getElementById("ios-sw-wi").onclick = () => { const d = loadWi(); d.enabled = !d.enabled; saveWi(d); renderWiList(); };
        topDoc.getElementById("smt-wi-mode-btn").onclick = () => { const d = loadWi(); d.mode = d.mode === "all" ? "smart" : "all"; saveWi(d); renderWiList(); };
        topDoc.getElementById("smt-wi-open-add-drawer").onclick = () => { const dr = topDoc.getElementById("smt-wi-add-drawer"); dr.style.display = dr.style.display === "none" ? "block" : "none"; };
        topDoc.getElementById("smt-wi-cancel-add").onclick = () => { topDoc.getElementById("smt-wi-add-drawer").style.display = "none"; };

        topDoc.getElementById("smt-wi-file-inp").onchange = async (e) => {
            const files = Array.from(e.target.files || []); if (!files.length) return;
            const d = loadWi(); let cnt = 0;
            for (const f of files) { const t = await f.text(); parseWorldBookJson(t, f.name).forEach((it) => { d.entries.unshift(it); cnt++; }); }
            saveWi(d); e.target.value = ""; renderWiList();
            showWiStatus(`已成功导入 ${cnt} 条世界书设定，角色聊天时将自动读取。`);
        };

        // 4通道读取酒馆世界书（带实时状态栏反馈）
        topDoc.getElementById("smt-wi-sync-st-btn").onclick = async (e) => {
            const btn = e.currentTarget, orig = btn.innerHTML;
            btn.textContent = "读取中...";
            showWiStatus("正在扫描酒馆角色卡内嵌世界书、绑定世界书与核心人设...");
            const found = await extractTavernLore();
            btn.innerHTML = orig;
            if (!found.length) {
                showWiStatus("未检测到当前角色卡或酒馆激活的世界书，请点击左侧「导入世界书 (.json/.txt)」手动上传。");
                return;
            }
            const d = loadWi(); let cnt = 0;
            found.forEach((it) => {
                if (!d.entries.some((x) => x.title === it.title && x.content === it.content)) {
                    d.entries.unshift(it); cnt++;
                }
            });
            saveWi(d); renderWiList();
            showWiStatus(cnt > 0 ? `已从酒馆成功同步导入 ${cnt} 条世界书与角色核心设定！` : `酒馆中的 ${found.length} 条设定已在列表中，无需重复导入。`);
        };

        topDoc.getElementById("smt-wi-add-btn").onclick = () => {
            const tInp = topDoc.getElementById("smt-wi-new-title"), kInp = topDoc.getElementById("smt-wi-new-keys"), cInp = topDoc.getElementById("smt-wi-new-content");
            const content = cInp.value.trim(); if (!content) return showWiStatus("请先填写设定内容再存入。");
            const keys = kInp.value.split(/[,，]/).map((s) => s.trim()).filter(Boolean);
            const title = tInp.value.trim() || keys[0] || `自定义设定 #${loadWi().entries.length + 1}`;
            const d = loadWi(); d.entries.unshift({ id: Date.now(), title, keys, content, enabled: true, constant: keys.length === 0 });
            saveWi(d); tInp.value = ""; kInp.value = ""; cInp.value = "";
            topDoc.getElementById("smt-wi-add-drawer").style.display = "none";
            renderWiList();
            showWiStatus(`已添加自定义设定「${title}」。`);
        };

        topDoc.getElementById("smt-wi-clear-btn").onclick = () => {
            if (confirm("确定清空世界书条目吗？")) { const d = loadWi(); d.entries = []; saveWi(d); renderWiList(); showWiStatus("已清空当前角色的世界书条目。"); }
        };

        topDoc.getElementById("smt-wx-cfg-btn")?.addEventListener("click", () => {
            setTimeout(() => { syncAllUI(); renderWiList(); }, 30);
        });

        syncAllUI();
        renderWiList();
    }

    mountUltimateSettingsV6();
})();
// ==========================================================================
// 🍎 【Sumoul App 苹果 iOS 18 × 韩系清冷柔焦「原生级语音通话 UI」美学重塑补丁】
// 特点：TA头像全屏高斯柔焦雾化背景 + 苹果顶部大字排版 + 歌词式悬浮贴耳低语 + iOS经典 3x2 磨砂圆钮矩阵！
// 用法：直接粘贴在 index.js 最末尾最后一行后面，自动覆盖旧通话界面！
// ==========================================================================
(function () {
    const topWin = window.parent || window;
    const topDoc = topWin.document;

    // 苹果 iOS 原生级线性矢量图标 (零 Emoji)
    const iosSvg = (p, sz = 22, sw = "1.6") =>
        `<svg viewBox="0 0 24 24" width="${sz}" height="${sz}" fill="none" stroke="currentColor" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round" style="display:block;pointer-events:none;">${p}</svg>`;

    const IOS_CALL_ICO = {
        micOff: iosSvg(`<line x1="1" y1="1" x2="23" y2="23"/><path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6"/><path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/>`, 21),
        keypad: iosSvg(`<circle cx="6" cy="6" r="1.2" fill="currentColor"/><circle cx="12" cy="6" r="1.2" fill="currentColor"/><circle cx="18" cy="6" r="1.2" fill="currentColor"/><circle cx="6" cy="12" r="1.2" fill="currentColor"/><circle cx="12" cy="12" r="1.2" fill="currentColor"/><circle cx="18" cy="12" r="1.2" fill="currentColor"/><circle cx="6" cy="18" r="1.2" fill="currentColor"/><circle cx="12" cy="18" r="1.2" fill="currentColor"/><circle cx="18" cy="18" r="1.2" fill="currentColor"/>`, 21),
        speaker: iosSvg(`<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>`, 21),
        chatBubble: iosSvg(`<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>`, 20),
        wave: iosSvg(`<path d="M2 10v3"/><path d="M6 6v11"/><path d="M10 3v18"/><path d="M14 8v7"/><path d="M18 5v13"/><path d="M22 10v3"/>`, 20),
        user: iosSvg(`<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>`, 20),
        hangup: `<svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="transform:rotate(135deg);display:block;pointer-events:none;"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`,
        sendUp: `<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="#FFFFFF" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></svg>`
    };

    // 注入苹果 iOS 18 × 韩系清冷磨砂通话专属 CSS
    topDoc.getElementById("sumoul-apple-call-css")?.remove();
    const st = topDoc.createElement("style");
    st.id = "sumoul-apple-call-css";
    st.innerHTML = `
        @keyframes iosCallFadeIn {
            from { opacity: 0; transform: scale(1.03); }
            to   { opacity: 1; transform: scale(1); }
        }
        @keyframes iosSubBreath {
            0%, 100% { opacity: 0.55; }
            50%      { opacity: 0.95; }
        }
        @keyframes iosVoiceTextIn {
            from { opacity: 0; filter: blur(6px); transform: translateY(6px); }
            to   { opacity: 1; filter: blur(0px); transform: translateY(0px); }
        }

        #seoul-mini-theater-modal #smt-voice-call-overlay {
            position: absolute !important;
            inset: 0 !important;
            z-index: 2147483646 !important;
            background: #F4F4F7 !important;
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            justify-content: space-between !important;
            padding: max(42px, env(safe-area-inset-top, 42px)) 28px max(34px, env(safe-area-inset-bottom, 34px)) 28px !important;
            box-sizing: border-box !important;
            overflow: hidden !important;
            animation: iosCallFadeIn 0.35s cubic-bezier(0.22, 1, 0.36, 1) forwards !important;
            font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "Apple SD Gothic Neo", "PingFang SC", sans-serif !important;
        }

        /* 底层：TA 的头像化作全屏深度高斯柔焦海报 + 韩系冷白雾化蒙版 */
        #seoul-mini-theater-modal .ios-call-bg-poster {
            position: absolute !important;
            inset: -40px !important;
            background-size: cover !important;
            background-position: center !important;
            filter: blur(54px) saturate(75%) brightness(1.08) !important;
            -webkit-filter: blur(54px) saturate(75%) brightness(1.08) !important;
            opacity: 0.42 !important;
            z-index: 1 !important;
            pointer-events: none !important;
        }
        #seoul-mini-theater-modal .ios-call-bg-frost {
            position: absolute !important;
            inset: 0 !important;
            background: linear-gradient(180deg, rgba(255,255,255,0.55) 0%, rgba(246,246,250,0.78) 55%, rgba(238,238,244,0.92) 100%) !important;
            backdrop-filter: blur(24px) !important;
            -webkit-backdrop-filter: blur(24px) !important;
            z-index: 2 !important;
            pointer-events: none !important;
        }

        /* 苹果 iOS 经典 3x2 磨砂毛玻璃圆形功能键 */
        #seoul-mini-theater-modal .ios-keypad-grid {
            display: grid !important;
            grid-template-columns: repeat(3, 1fr) !important;
            column-gap: 24px !important;
            row-gap: 18px !important;
            width: 100% !important;
            max-width: 286px !important;
            margin: 0 auto !important;
            z-index: 5 !important;
        }
        #seoul-mini-theater-modal .ios-key-unit {
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            gap: 7px !important;
            cursor: pointer !important;
            user-select: none !important;
        }
        #seoul-mini-theater-modal .ios-key-circle {
            width: 62px !important;
            height: 62px !important;
            border-radius: 50% !important;
            background: rgba(255, 255, 255, 0.62) !important;
            backdrop-filter: blur(18px) !important;
            -webkit-backdrop-filter: blur(18px) !important;
            border: 1px solid rgba(255, 255, 255, 0.85) !important;
            box-shadow: 0 6px 20px rgba(25, 25, 35, 0.05) !important;
            color: #2C2C34 !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            transition: all 0.2s cubic-bezier(0.22, 1, 0.36, 1) !important;
        }
        #seoul-mini-theater-modal .ios-key-unit:active .ios-key-circle {
            transform: scale(0.92) !important;
        }
        /* 按下激活态：反转为苹果经典深色实心圆钮 */
        #seoul-mini-theater-modal .ios-key-circle.ios-active {
            background: #2C2C34 !important;
            border-color: #2C2C34 !important;
            color: #FFFFFF !important;
            box-shadow: 0 8px 22px rgba(44, 44, 52, 0.18) !important;
        }
        #seoul-mini-theater-modal .ios-key-label {
            font-size: 10px !important;
            font-weight: 600 !important;
            color: #484854 !important;
            letter-spacing: 0.3px !important;
        }

        /* 底部正中央挂断圆钮（韩系高级低饱和绯红 / 深炭灰可选，这里用极具质感的苹果柔雾绯红） */
        #seoul-mini-theater-modal .ios-end-btn {
            width: 64px !important;
            height: 64px !important;
            border-radius: 50% !important;
            background: #D9534F !important;
            border: none !important;
            box-shadow: 0 10px 26px rgba(217, 83, 79, 0.28) !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            cursor: pointer !important;
            margin: 18px auto 0 auto !important;
            transition: transform 0.18s ease !important;
            z-index: 5 !important;
        }
        #seoul-mini-theater-modal .ios-end-btn:active {
            transform: scale(0.92) !important;
        }
    `;
    topDoc.head.appendChild(st);

    function getCharContext() {
        let userName = "ME", charName = "PARTNER", scope = "PARTNER";
        let userAvatar = "https://i.postimg.cc/rydS6NvG/IMG-3866.jpg", charAvatar = "https://i.postimg.cc/QC3CQ218/IMG-4147.jpg", charDesc = "";
        try {
            const st = topWin.SillyTavern?.getContext?.();
            if (st) {
                userName = st.name1 || userName;
                if (st.characterId !== undefined && st.characters?.[st.characterId]) {
                    const c = st.characters[st.characterId];
                    charName = c.name || st.name2 || charName;
                    scope = c.avatar || c.name || String(st.characterId);
                    if (c.avatar) charAvatar = `/characters/${encodeURIComponent(c.avatar)}`;
                    charDesc = [c.description, c.personality, c.scenario].filter(Boolean).join("\n");
                } else if (st.name2) { charName = st.name2; scope = st.name2; }
            }
        } catch (e) {}
        const safeScope = String(scope).replace(/[^a-zA-Z0-9_\u4e00-\u9fa5\uac00-\ud7af-]/g, "_");
        return { userName, charName, safeScope, userAvatar, charAvatar, charDesc };
    }

    let callTimer = null, secs = 0;
    const fmtTime = (s) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

    async function askVoiceAI(userSpoke = "") {
        const u = topDoc.getElementById("smt-api-url")?.value?.trim().replace(/\/+$/, "");
        const k = topDoc.getElementById("smt-api-key")?.value?.trim();
        const m = topDoc.getElementById("smt-api-model")?.value?.trim() || "gpt-4o-mini";
        if (!u || !k) throw new Error("请先在【API设置】填写独立 API 地址与 Key");
        const ctx = getCharContext();
        const endpoint = u.endsWith("/chat/completions") ? u : (u.endsWith("/v1") ? `${u}/chat/completions` : `${u}/v1/chat/completions`);
        const sysPrompt = `你是${ctx.charName}，正与${ctx.userName}通电话（iOS语音通话）。\n人设：${ctx.charDesc.slice(0, 1000)}\n请严格只输出JSON格式：{"env":"电话那头的细微环境声或动作声(12字内，如:衣料摩擦声与低沉呼吸)","voice":"你在电话里贴着TA耳边说的话(42字以内，自然口语、带一点停顿与亲昵感)"}`;
        const usrPrompt = userSpoke ? `${ctx.userName}在电话那头对你说：“${userSpoke}”。请回应：` : `电话刚接通，请主动开口对${ctx.userName}说第一句话：`;
        const r = await fetch(endpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json", "Authorization": `Bearer ${k}` },
            body: JSON.stringify({ model: m, temperature: 0.85, messages: [{ role: "system", content: sysPrompt }, { role: "user", content: usrPrompt }] })
        });
        const d = await r.json(), raw = d?.choices?.[0]?.message?.content?.trim() || "";
        const match = raw.match(/\{[\s\S]*\}/);
        if (match) { try { return JSON.parse(match[0]); } catch (e) {} }
        return { env: "听筒里传来浅浅的呼吸声", voice: raw.replace(/```json|```/g, "").trim() || "喂？这么晚还没睡吗……" };
    }

    // 🍎 启动苹果 iOS 18 × 韩系清冷柔焦全屏通话界面
    function launchAppleKoreanVoiceCall() {
        const modal = topDoc.getElementById("seoul-mini-theater-modal");
        if (!modal) return;

        const ctx = getCharContext();
        let wCfg = {}, exCfg = {};
        try { wCfg = JSON.parse(localStorage.getItem(`sumoul_v16_wxcfg__${ctx.safeScope}`) || "{}"); } catch (e) {}
        try { exCfg = JSON.parse(localStorage.getItem(`sumoul_v16_wxextra__${ctx.safeScope}`) || "{}"); } catch (e) {}
        const charName = wCfg.remark || ctx.charName;
        const charAva = wCfg.charAva || ctx.charAvatar;
        const weatherStr = exCfg.weatherDesc ? `${exCfg.weatherCity || "SEOUL"} · ${exCfg.weatherDesc}` : "SUMOUL AUDIO · HD";

        topDoc.getElementById("smt-voice-call-overlay")?.remove();
        const layer = topDoc.createElement("div");
        layer.id = "smt-voice-call-overlay";

        layer.innerHTML = `
            <!-- 1. 底层：TA 头像的全屏高斯模糊柔焦海报 + 清冷雾白磨砂层 -->
            <div class="ios-call-bg-poster" style="background-image:url('${charAva}');"></div>
            <div class="ios-call-bg-frost"></div>

            <!-- 2. 顶部：苹果 iOS Contact Poster 原生大字排版（极简无框！） -->
            <div style="position:relative;z-index:5;text-align:center;width:100%;margin-top:4px;">
                <div style="display:inline-flex;align-items:center;gap:6px;font-size:9.5px;font-weight:600;color:#7A7A88;letter-spacing:1.2px;margin-bottom:8px;">
                    <span>${weatherStr}</span>
                </div>
                <div style="font-size:28px;font-weight:700;color:#1C1C22;letter-spacing:1px;line-height:1.15;">
                    ${charName}
                </div>
                <div id="ios-call-timer" style="font-size:13.5px;font-weight:500;color:#6E6E7A;letter-spacing:1.5px;margin-top:6px;font-variant-numeric:tabular-nums;">
                    正在呼叫...
                </div>
            </div>

            <!-- 3. 中央：清冷小头像徽章 + 苹果歌词式无框悬浮听筒字幕 -->
            <div style="position:relative;z-index:5;width:100%;max-width:310px;display:flex;flex-direction:column;align-items:center;justify-content:center;my:auto;padding:10px 0;">
                <div style="width:68px;height:68px;border-radius:50%;overflow:hidden;border:2px solid rgba(255,255,255,0.9);box-shadow:0 10px 28px rgba(20,20,30,0.08);margin-bottom:18px;">
                    <img src="${charAva}" style="width:100%;height:100%;object-fit:cover;display:block;" />
                </div>

                <!-- 听筒微弱环境音提示 -->
                <div id="ios-call-env" style="font-size:10px;font-weight:600;color:#8A8A96;letter-spacing:0.6px;margin-bottom:10px;animation:iosSubBreath 3s ease-in-out infinite;">
                    * 正在建立加密语音连接... *
                </div>

                <!-- Apple Music 歌词级悬浮语音大字（无笨重边框！） -->
                <div id="ios-call-voice" style="font-size:15px;font-weight:700;color:#1E1E26;line-height:1.75;letter-spacing:0.5px;text-align:center;min-height:52px;padding:0 8px;text-shadow:0 2px 12px rgba(255,255,255,0.9);">
                    “ 喂……？ ”
                </div>

                <!-- 默认收起的极简胶囊回应输入条（点下方「回应TA」或直接点击即可输入） -->
                <div id="ios-call-talk-bar" style="width:100%;display:flex;align-items:center;background:rgba(255,255,255,0.72);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.95);border-radius:999px;padding:4px 5px 4px 16px;margin-top:18px;box-shadow:0 6px 20px rgba(20,20,30,0.04);">
                    <input type="text" id="ios-call-inp" placeholder="在电话里跟 TA 说句话..." style="flex:1;height:28px!important;border:0!important;outline:0!important;background:transparent!important;font-size:11px!important;font-weight:600!important;color:#22222A!important;text-align:left!important;" />
                    <span id="ios-call-send" style="width:28px;height:28px;border-radius:50%;background:#2C2C34;display:inline-flex;align-items:center;justify-content:center;cursor:pointer;flex-shrink:0;">
                        ${IOS_CALL_ICO.sendUp}
                    </span>
                </div>
            </div>

            <!-- 4. 底部：苹果 iOS 18 原生 3x2 磨砂毛玻璃圆钮矩阵 + 底部挂断圆钮 -->
            <div style="position:relative;z-index:5;width:100%;">
                <div class="ios-keypad-grid">
                    <div class="ios-key-unit" id="ios-k-mute">
                        <div class="ios-key-circle">${IOS_CALL_ICO.micOff}</div>
                        <span class="ios-key-label">静音</span>
                    </div>
                    <div class="ios-key-unit" id="ios-k-pad">
                        <div class="ios-key-circle">${IOS_CALL_ICO.keypad}</div>
                        <span class="ios-key-label">拨号键盘</span>
                    </div>
                    <div class="ios-key-unit" id="ios-k-speaker">
                        <div class="ios-key-circle ios-active">${IOS_CALL_ICO.speaker}</div>
                        <span class="ios-key-label">免提</span>
                    </div>
                    <div class="ios-key-unit" id="ios-k-focus">
                        <div class="ios-key-circle">${IOS_CALL_ICO.chatBubble}</div>
                        <span class="ios-key-label">对TA说话</span>
                    </div>
                    <div class="ios-key-unit" id="ios-k-next">
                        <div class="ios-key-circle">${IOS_CALL_ICO.wave}</div>
                        <span class="ios-key-label">继续听TA说</span>
                    </div>
                    <div class="ios-key-unit" id="ios-k-prof">
                        <div class="ios-key-circle">${IOS_CALL_ICO.user}</div>
                        <span class="ios-key-label">人设名片</span>
                    </div>
                </div>

                <!-- 苹果原生挂断圆钮 -->
                <div class="ios-end-btn" id="ios-call-hangup" title="结束通话">
                    ${IOS_CALL_ICO.hangup}
                </div>
            </div>
        `;
        modal.appendChild(layer);

        secs = 0;
        if (callTimer) clearInterval(callTimer);
        callTimer = setInterval(() => {
            secs++;
            const tEl = topDoc.getElementById("ios-call-timer");
            if (tEl) tEl.textContent = fmtTime(secs);
        }, 1000);

        function updateVoiceDisplay(envTxt, voiceTxt) {
            const eEl = topDoc.getElementById("ios-call-env");
            const vEl = topDoc.getElementById("ios-call-voice");
            if (eEl && envTxt) eEl.textContent = `* ${envTxt.replace(/^\*|\*$/g, "").trim()} *`;
            if (vEl && voiceTxt) {
                vEl.style.animation = "none";
                void vEl.offsetWidth;
                vEl.style.animation = "iosVoiceTextIn 0.4s ease forwards";
                vEl.textContent = `“ ${voiceTxt.replace(/^[“"]|[”"]$/g, "").trim()} ”`;
            }
        }

        // 接通瞬间触发第一句贴耳低语
        (async () => {
            try {
                const res = await askVoiceAI("");
                updateVoiceDisplay(res.env, res.voice);
            } catch (err) {
                updateVoiceDisplay("信号提示", err.message);
            }
        })();

        // 发送语音回应
        const inp = topDoc.getElementById("ios-call-inp");
        const sendBtn = topDoc.getElementById("ios-call-send");
        const doSpeak = async () => {
            const val = inp.value.trim();
            if (!val) return;
            inp.value = "";
            updateVoiceDisplay(`正在倾听你说：“${val.slice(0, 15)}”...`, "……");
            try {
                const res = await askVoiceAI(val);
                updateVoiceDisplay(res.env, res.voice);
            } catch (err) {
                updateVoiceDisplay("网络波动", err.message);
            }
        };
        sendBtn.onclick = doSpeak;
        inp.onkeydown = (e) => { if (e.key === "Enter") { e.preventDefault(); doSpeak(); } };

        // 6个圆形功能键交互
        topDoc.getElementById("ios-k-mute").onclick = (e) => e.currentTarget.querySelector(".ios-key-circle")?.classList.toggle("ios-active");
        topDoc.getElementById("ios-k-speaker").onclick = (e) => e.currentTarget.querySelector(".ios-key-circle")?.classList.toggle("ios-active");
        topDoc.getElementById("ios-k-pad").onclick = (e) => e.currentTarget.querySelector(".ios-key-circle")?.classList.toggle("ios-active");
        topDoc.getElementById("ios-k-focus").onclick = () => inp.focus();
        topDoc.getElementById("ios-k-next").onclick = async () => {
            updateVoiceDisplay("听筒那头传来动静...", "……");
            try {
                const res = await askVoiceAI("（电话那头安静了几秒，请继续对TA说下一句贴耳悄悄话）");
                updateVoiceDisplay(res.env, res.voice);
            } catch (err) {}
        };
        topDoc.getElementById("ios-k-prof").onclick = () => {
            updateVoiceDisplay(`当前通话对象：${charName}`, `关系状态：${exCfg.relationStage || "亲密连线中"}`);
        };

        // 挂断电话并记入微信聊天记录
        topDoc.getElementById("ios-call-hangup").onclick = () => {
            if (callTimer) clearInterval(callTimer);
            const dur = fmtTime(secs || 1);
            const lastV = topDoc.getElementById("ios-call-voice")?.textContent || "";
            layer.remove();

            const chatKey = `sumoul_v16_wx__${ctx.safeScope}`;
            try {
                const list = JSON.parse(localStorage.getItem(chatKey) || "[]");
                const d = new Date(), tStr = `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
                list.push({ role: "sys", text: `语音通话已结束 · 通话时长 ${dur}`, time: tStr });
                if (lastV && !lastV.includes("API") && lastV !== "“ …… ”") {
                    list.push({ role: "ai", text: `[语音通话] ${lastV}`, time: tStr });
                }
                localStorage.setItem(chatKey, JSON.stringify(list));
            } catch (e) {}

            if (topDoc.getElementById("smt-page-wx_settings")?.classList.contains("active")) {
                topDoc.getElementById("smt-wxset-back-chat")?.click();
            } else {
                topDoc.querySelector('.smt-tab-item[data-page="talk"]')?.click();
            }
        };
    }

    // 捕获接管「立即拨打语音」和微信底栏「语音通话」按钮，全部指向全新苹果韩系通话界面！
    topDoc.addEventListener("click", (e) => {
        const t = e.target;
        if (!t || !t.closest) return;
        if (t.closest("#ios-start-voice-call") || t.closest("#smt-wx-quick-call-btn")) {
            e.stopImmediatePropagation();
            e.preventDefault();
            launchAppleKoreanVoiceCall();
        }
    }, true);
})();
// ==========================================================================
// ❄️ 【Sumoul App 有情树 · 基于用户原版定向精修：唯一独木粗壮真树干 + 浓密雾凇繁叶 + 移除年月日与遮挡文字终极版】
// ==========================================================================
(function () {
    const topWin = window.parent || window, topDoc = topWin.document;

    const svgIco = (p, sz = 14, c = "currentColor", sw = "1.5") =>
        `<svg viewBox="0 0 24 24" width="${sz}" height="${sz}" fill="none" stroke="${c}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;flex-shrink:0;pointer-events:none;">${p}</svg>`;

    const MT_ICO = {
        appIcon: svgIco(`<path d="M12 22v-7l-2-2"/><path d="M17 8v.8A6 6 0 0 1 13.8 20v0H10v0A6.5 6.5 0 0 1 7 8h0a5 5 0 0 1 10 0Z"/><path d="m14 14-2 2"/>`, 22, "#3A3A40"),
        back: svgIco(`<path d="M15 18l-6-6 6-6"/>`, 15, "#3A3A42", "1.8"),
        plus: svgIco(`<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>`, 13),
        spark: svgIco(`<path d="M12 3l1.9 5.8a2 2 0 0 0 1.3 1.3L21 12l-5.8 1.9a2 2 0 0 0-1.3 1.3L12 21l-1.9-5.8a2 2 0 0 0-1.3-1.3L3 12l5.8-1.9a2 2 0 0 0 1.3-1.3L12 3z"/>`, 13),
        leaf: svgIco(`<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>`, 13),
        list: svgIco(`<line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>`, 13),
        trash: svgIco(`<polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>`, 12, "#9A6868"),
        close: svgIco(`<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>`, 13)
    };

    function getCtx() {
        let userName = "ME", charName = "PARTNER", scope = "PARTNER", charDesc = "", recentChat = "";
        try {
            const st = topWin.SillyTavern?.getContext?.();
            if (st) {
                userName = st.name1 || userName;
                if (st.characterId !== undefined && st.characters?.[st.characterId]) {
                    const c = st.characters[st.characterId];
                    charName = c.name || st.name2 || charName;
                    scope = c.avatar || c.name || String(st.characterId);
                    charDesc = [c.description, c.personality, c.scenario].filter(Boolean).join("\n");
                } else if (st.name2) { charName = st.name2; scope = st.name2; }
                if (Array.isArray(st.chat) && st.chat.length) {
                    recentChat = st.chat.slice(-8).map((m) => `${m.is_user ? userName : charName}: ${m.mes}`).join("\n");
                }
            }
        } catch (e) {}
        const safeScope = String(scope).replace(/[^a-zA-Z0-9_\u4e00-\u9fa5\uac00-\ud7af-]/g, "_");
        try {
            const wCfg = JSON.parse(localStorage.getItem(`sumoul_v16_wxcfg__${safeScope}`) || "{}");
            if (wCfg.myNick) userName = wCfg.myNick;
            if (wCfg.remark) charName = wCfg.remark;
        } catch (e) {}
        return { userName, charName, safeScope, charDesc, recentChat };
    }

    function getTreeKey() { return `sumoul_v16_millennium_tree__${getCtx().safeScope}`; }

    function createDefaultTree(charName, userName) {
        return {
            activeId: 101,
            leaves: [
                { id: 101, title: "初雪揣进口袋的指尖", author: charName, joy: 96, xPct: 26, yPct: 20, content: `把 ${userName} 冻得微凉的指尖揣进我大衣口袋里的瞬间，想让这条飘雪的首尔长街永远走不到尽头。`, whisper: `“ 下一个冬天，下下个冬天，口袋的位置也只留给你。”` },
                { id: 102, title: "凌晨三点的秒回", author: userName, joy: 90, xPct: 48, yPct: 16, content: `半夜醒来随手发了一句睡不着，不到三秒钟就收到了 ${charName} 带着困意却无比温柔的回复。`, whisper: `“ 手机永远为你调成特别提醒放在枕边，怕你在夜里找不到我。”` },
                { id: 103, title: "耳机分你一半的午后", author: charName, joy: 82, xPct: 18, yPct: 33, content: `靠在窗边和 ${userName} 戴着同一副耳机，连窗外吹进来的风都带着令人安心的节奏。`, whisper: `“ 其实那天我根本没在听歌，一直在听你浅浅的呼吸声。”` },
                { id: 104, title: "微雨夜屋檐下的对视", author: charName, joy: 66, xPct: 38, yPct: 29, content: `躲雨时谁都没有先开口，只有雨水顺着伞骨滴落的声音，和彼此越来越近的鼻息。`, whisper: `“ 那天忍得很辛苦，才没有当场把你按进怀里吻下去。”` },
                { id: 105, title: "吃醋时别扭的沉默", author: userName, joy: 45, xPct: 58, yPct: 24, content: `看到 ${charName} 故意冷着脸不说话，直到我主动拉住衣角才肯低头叹气。`, whisper: `“ 明明气得要命，可你一碰我，所有的原则就全碎了。”` },
                { id: 106, title: "短暂分别时的酸涩", author: charName, joy: 18, xPct: 30, yPct: 40, content: `看着 ${userName} 转身走进车站背影的那一刻，胸口像被潮湿的冷雾堵住一样闷痛。`, whisper: `“ 刚分开一分钟就已经开始讨厌距离了，只想把你锁在身边。”` }
            ]
        };
    }

    function loadTree() {
        const c = getCtx(), k = getTreeKey();
        try {
            const raw = localStorage.getItem(k);
            if (!raw) { const init = createDefaultTree(c.charName, c.userName); localStorage.setItem(k, JSON.stringify(init)); return init; }
            return Object.assign(createDefaultTree(c.charName, c.userName), JSON.parse(raw));
        } catch (e) { return createDefaultTree(c.charName, c.userName); }
    }
    function saveTree(d) { try { localStorage.setItem(getTreeKey(), JSON.stringify(d)); } catch (e) {} }

    // ❄️ 清冷霜雪色阶：开心度决定叶片从「冰透纯白」到「清冷雾银」再到「深邃冷炭」
    function getLeafStyleByJoy(joy = 85) {
        const j = Math.max(0, Math.min(100, Number(joy) || 85));
        if (j >= 85) {
            return { grad1: "#FFFFFF", grad2: "#F4F6FA", stroke: "#949AA8", vein: "#BDC3D2", glow: "drop-shadow(0 0 12px #FFFFFF) drop-shadow(0 3px 8px rgba(80,86,102,0.16))", label: `极开心 ${j}% · 冰魄霜白叶` };
        } else if (j >= 65) {
            return { grad1: "#EEF0F6", grad2: "#D8DDE8", stroke: "#7C8292", vein: "#A2A8B8", glow: "drop-shadow(0 0 8px rgba(255,255,255,0.85)) drop-shadow(0 3px 8px rgba(80,86,102,0.16))", label: `愉悦 ${j}% · 雾凇浅银叶` };
        } else if (j >= 40) {
            return { grad1: "#B8BECB", grad2: "#9298A8", stroke: "#585E6E", vein: "#787E8E", glow: "drop-shadow(0 4px 10px rgba(80,85,100,0.28))", label: `微涩 ${j}% · 冷月烟灰叶` };
        } else {
            return { grad1: "#545866", grad2: "#343742", stroke: "#22242C", vein: "#7E8494", glow: "drop-shadow(0 6px 14px rgba(25,27,35,0.42))", label: `思念 ${j}% · 寒夜深炭叶` };
        }
    }

    // 绘制高定清冷银杏扇叶 / 滴水菩提叶标本 SVG
    function renderRealisticLeafSvg(id, joy, isSel, idx) {
        const st = getLeafStyleByJoy(joy);
        const isGinkgo = idx % 2 === 0;
        const w = isSel ? 44 : 34, h = isSel ? 52 : 40, gid = `lg_${id}`;
        if (isGinkgo) {
            return `<svg viewBox="0 0 60 70" width="${w}" height="${h}" fill="none" style="display:block;filter:${st.glow};overflow:visible;">
                <defs><linearGradient id="${gid}" x1="10" y1="10" x2="50" y2="60" gradientUnits="userSpaceOnUse"><stop offset="0%" stop-color="${st.grad1}"/><stop offset="100%" stop-color="${st.grad2}"/></linearGradient></defs>
                <line x1="30" y1="-10" x2="30" y2="6" stroke="${st.stroke}" stroke-width="0.75" stroke-dasharray="1.5 1.5" opacity="0.65"/>
                <circle cx="30" cy="-10" r="1.6" fill="#FFFFFF" stroke="${st.stroke}" stroke-width="0.75"/>
                <path d="M30 6 C29 14, 30 20, 30 24" stroke="${st.stroke}" stroke-width="1.2" stroke-linecap="round"/>
                <path d="M30 23 C20 26, 7 36, 6 47 C5 53, 12 57, 19 56 C24 55, 28 50, 30 46 C32 50, 36 55, 41 56 C48 57, 55 53, 54 47 C53 36, 40 26, 30 23 Z" fill="url(#${gid})" stroke="${isSel ? "#2C2E38" : st.stroke}" stroke-width="${isSel ? "1.8" : "1.0"}" stroke-linejoin="round"/>
                <g stroke="${st.vein}" stroke-width="0.6" stroke-linecap="round" opacity="0.85"><path d="M30 25 C24 34, 16 42, 11 49"/><path d="M30 25 C26 35, 21 44, 18 52"/><path d="M30 25 C28 34, 26 42, 25 49"/><path d="M30 25 C32 34, 34 42, 35 49"/><path d="M30 25 C34 35, 39 44, 42 52"/><path d="M30 25 C36 34, 44 42, 49 49"/></g>
            </svg>`;
        }
        return `<svg viewBox="0 0 56 72" width="${w}" height="${h}" fill="none" style="display:block;filter:${st.glow};overflow:visible;">
            <defs><linearGradient id="${gid}" x1="12" y1="8" x2="44" y2="64" gradientUnits="userSpaceOnUse"><stop offset="0%" stop-color="${st.grad1}"/><stop offset="100%" stop-color="${st.grad2}"/></linearGradient></defs>
            <line x1="28" y1="-10" x2="28" y2="5" stroke="${st.stroke}" stroke-width="0.75" stroke-dasharray="1.5 1.5" opacity="0.65"/>
            <circle cx="28" cy="-10" r="1.6" fill="#FFFFFF" stroke="${st.stroke}" stroke-width="0.75"/>
            <path d="M28 5 L28 14" stroke="${st.stroke}" stroke-width="1.2" stroke-linecap="round"/>
            <path d="M28 13 C14 18, 9 34, 15 47 C19 55, 27 60, 29 66 C29 59, 37 54, 41 47 C47 34, 42 18, 28 13 Z" fill="url(#${gid})" stroke="${isSel ? "#2C2E38" : st.stroke}" stroke-width="${isSel ? "1.8" : "1.0"}" stroke-linejoin="round"/>
            <g stroke="${st.vein}" stroke-width="0.65" stroke-linecap="round" opacity="0.85"><path d="M28 14 C28 32, 28 48, 29 63" stroke-width="0.85"/><path d="M28 24 C23 27, 19 31, 16 35"/><path d="M28 28 C33 31, 37 35, 39 39"/><path d="M28 35 C23 38, 19 42, 18 46"/><path d="M28 39 C33 42, 36 46, 37 49"/></g>
            <circle cx="29" cy="68" r="${isSel ? "2.2" : "1.5"}" fill="#FFFFFF" stroke="${st.stroke}" stroke-width="0.8"/>
        </svg>`;
    }

    async function askTreeAI(sys, usr) {
        const u = topDoc.getElementById("smt-api-url")?.value?.trim().replace(/\/+$/, "");
        const k = topDoc.getElementById("smt-api-key")?.value?.trim();
        const m = topDoc.getElementById("smt-api-model")?.value?.trim() || "gpt-4o-mini";
        if (!u || !k) { topDoc.querySelector('.smt-tab-item[data-page="api"]')?.click(); throw new Error("请先在【API设置】填写独立 API 地址与 Key"); }
        const endpoint = u.endsWith("/chat/completions") ? u : (u.endsWith("/v1") ? `${u}/chat/completions` : `${u}/v1/chat/completions`);
        const r = await fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json", "Authorization": `Bearer ${k}` }, body: JSON.stringify({ model: m, temperature: 0.85, messages: [{ role: "system", content: sys }, { role: "user", content: usr }] }) });
        if (!r.ok) throw new Error(`API HTTP ${r.status}`);
        const d = await r.json();
        return d?.choices?.[0]?.message?.content?.trim() || "";
    }

    function mulberry32(seed) {
        return function () {
            let t = (seed += 0x6d2b79f5);
            t = Math.imul(t ^ (t >>> 15), t | 1);
            t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
            return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
        };
    }

    function mountColdSilverSacredTree() {
        const modal = topDoc.getElementById("seoul-mini-theater-modal");
        const homePage = topDoc.getElementById("smt-page-home");
        if (!modal || !homePage) { setTimeout(mountColdSilverSacredTree, 200); return; }

        topDoc.getElementById("smt-page-memory_tree")?.remove();
        topDoc.getElementById("smt-real-tree-overlay")?.remove();
        topDoc.getElementById("sumoul-memory-tree-css")?.remove();

        const st = topDoc.createElement("style");
        st.id = "sumoul-memory-tree-css";
        st.innerHTML = `
            @keyframes mtLeafGentleSway { 0%, 100% { transform: translate(-50%, 0) rotate(-2.5deg); } 50% { transform: translate(-50%, 0) rotate(3deg); } }
            #seoul-mini-theater-modal #smt-real-tree-overlay {
                position: absolute !important; inset: 0 !important; z-index: 2147483644 !important;
                background: linear-gradient(170deg, #E8ECF5 0%, #F3F5FA 52%, #FFFFFF 100%) !important;
                display: none; flex-direction: column !important; overflow: hidden !important; user-select: none !important;
                font-family: -apple-system, BlinkMacSystemFont, "Apple SD Gothic Neo", "PingFang SC", sans-serif !important;
            }
            #seoul-mini-theater-modal #smt-real-tree-overlay.open { display: flex !important; }
            #seoul-mini-theater-modal #mt-ancient-canvas { position: absolute !important; inset: 0 !important; width: 100% !important; height: 100% !important; display: block !important; pointer-events: none !important; z-index: 1 !important; }
            #seoul-mini-theater-modal #mt-leaves-stage { position: absolute !important; inset: 0 !important; z-index: 6 !important; overflow: hidden !important; pointer-events: none !important; }
            #seoul-mini-theater-modal .mt-hanging-leaf { position: absolute !important; transform-origin: top center !important; display: flex !important; flex-direction: column !important; align-items: center !important; cursor: grab !important; touch-action: none !important; pointer-events: auto !important; z-index: 12 !important; animation: mtLeafGentleSway 4.8s ease-in-out infinite !important; }
            #seoul-mini-theater-modal .mt-hanging-leaf.dragging { cursor: grabbing !important; animation: none !important; transform: translate(-50%, 0) scale(1.18) !important; z-index: 60 !important; }
            #seoul-mini-theater-modal .mt-hanging-leaf.selected-leaf { z-index: 45 !important; }
            #seoul-mini-theater-modal .mt-glass-pill { display: inline-flex !important; align-items: center !important; justify-content: center !important; gap: 5px !important; height: 28px !important; padding: 0 11px !important; border-radius: 999px !important; background: rgba(255, 255, 255, 0.90) !important; backdrop-filter: blur(14px) !important; -webkit-backdrop-filter: blur(14px) !important; border: 1px solid rgba(226, 228, 236, 0.95) !important; font-size: 9.2px !important; font-weight: 700 !important; color: #3A3D46 !important; cursor: pointer !important; box-shadow: 0 4px 14px rgba(20, 20, 30, 0.04) !important; }
            #seoul-mini-theater-modal .mt-glass-pill.dark { background: #3A3D46 !important; border-color: #3A3D46 !important; color: #FFFFFF !important; -webkit-text-fill-color: #FFFFFF !important; }
            #seoul-mini-theater-modal .mt-float-card { background: rgba(255, 255, 255, 0.94) !important; backdrop-filter: blur(20px) !important; -webkit-backdrop-filter: blur(20px) !important; border: 1px solid #E6E8F0 !important; border-radius: 18px !important; padding: 13px 15px !important; box-shadow: 0 12px 36px rgba(20, 20, 35, 0.08) !important; }
        `;
        topDoc.head.appendChild(st);

        const homeDockGrid = homePage.querySelector(".ab-dock-grid");
        if (homeDockGrid) {
            topDoc.getElementById("smt-home-open-memtree")?.remove();
            const treeBtn = topDoc.createElement("div");
            treeBtn.className = "ab-app-item"; treeBtn.id = "smt-home-open-memtree";
            treeBtn.innerHTML = `<div class="ab-app-squircle">${MT_ICO.appIcon}<span class="ab-app-floating-badge" id="mt-home-badge">${loadTree().leaves.length}叶</span></div><div class="ab-app-title">有情树</div><div class="ab-app-kr">기억의 나무</div>`;
            homeDockGrid.appendChild(treeBtn);
        }

        const overlay = topDoc.createElement("div");
        overlay.id = "smt-real-tree-overlay";
        overlay.innerHTML = `
            <canvas id="mt-ancient-canvas"></canvas>
            <div id="mt-leaves-stage"></div>

            <!-- 顶部极简导航条（已彻底去掉右侧会被挡住的说明文字与年月日！） -->
            <div style="position:relative;z-index:30;display:flex;justify-content:space-between;align-items:center;padding:max(16px,env(safe-area-inset-top,16px)) 16px 0 16px;pointer-events:none;">
                <span class="mt-glass-pill" id="mt-close-btn" style="pointer-events:auto;">${MT_ICO.back}<span>返回主页</span></span>
                <div style="display:flex;align-items:center;gap:6px;pointer-events:auto;">
                    <span class="mt-glass-pill" style="pointer-events:none;">${MT_ICO.leaf}<span id="mt-count-txt">6 片记忆叶</span></span>
                    <span class="mt-glass-pill" id="mt-list-btn">${MT_ICO.list}<span>叶册名录</span></span>
                </div>
            </div>

            <div style="position:relative;z-index:35;margin-top:auto;padding:0 16px max(20px,env(safe-area-inset-bottom,20px)) 16px;display:flex;flex-direction:column;gap:9px;pointer-events:none;">
                <div id="mt-leaf-card-wrap" style="pointer-events:auto;"></div>

                <div id="mt-add-modal" class="mt-float-card" style="display:none;pointer-events:auto;">
                    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
                        <span style="font-size:10px;font-weight:800;color:#3A3D46;">亲手挂上一片新记忆叶（无上限 · 挂后可自由拖拽）</span>
                        <span id="mt-add-close" style="cursor:pointer;color:#8E8E98;">${MT_ICO.close}</span>
                    </div>
                    <input type="text" id="mt-new-title" placeholder="回忆标题 (如：初雪揣进口袋的手)..." style="width:100%;height:30px;background:#FFFFFF;border:1px solid #E6E8F0;border-radius:9px;padding:0 10px;font-size:10.5px;font-weight:700;color:#3A3D46;box-sizing:border-box;outline:none;margin-bottom:6px;" />
                    <textarea id="mt-new-content" placeholder="写下你想封存在树叶里的真实回忆..." style="width:100%;height:50px;background:#FFFFFF;border:1px solid #E6E8F0;border-radius:9px;padding:7px 10px;font-size:10px;color:#3A3D46;box-sizing:border-box;resize:none;outline:none;margin-bottom:8px;"></textarea>
                    <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:10px;">
                        <span style="font-size:9px;font-weight:700;color:#585C6A;">开心程度(决定叶色深浅)：</span>
                        <input type="range" id="mt-new-joy" min="5" max="100" value="92" style="flex:1;accent-color:#484C58;" />
                        <span id="mt-new-joy-lbl" style="font-size:8.5px;font-weight:800;color:#3A3D46;min-width:105px;text-align:right;">极开心 92% · 冰魄霜白叶</span>
                    </div>
                    <div style="display:flex;justify-content:flex-end;">
                        <span class="mt-glass-pill dark" id="mt-add-submit" style="height:28px!important;">挂上霜枝并让TA批注</span>
                    </div>
                </div>

                <div id="mt-all-list-modal" class="mt-float-card" style="display:none;max-height:240px;overflow-y:auto;pointer-events:auto;">
                    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;padding-bottom:6px;border-bottom:1px solid #EFEFF5;">
                        <span style="font-size:10px;font-weight:800;color:#3A3D46;">全部记忆叶名录（点击定位查看）</span>
                        <span id="mt-list-close" style="cursor:pointer;color:#8E8E98;">${MT_ICO.close}</span>
                    </div>
                    <div id="mt-all-list-body" style="display:flex;flex-direction:column;gap:5px;"></div>
                </div>

                <div style="display:flex;justify-content:flex-end;gap:6px;pointer-events:auto;">
                    <span class="mt-glass-pill" id="mt-btn-add">${MT_ICO.plus}<span>挂记忆叶</span></span>
                    <span class="mt-glass-pill" id="mt-btn-ai-leaf">${MT_ICO.leaf}<span>让TA挂叶</span></span>
                    <span class="mt-glass-pill dark" id="mt-btn-absorb">${MT_ICO.spark}<span>汲取聊天结叶</span></span>
                </div>
            </div>
        `;
        modal.appendChild(overlay);

        // ══════════════════════════════════════════════════════════════════════════
        // ❄️ 精准修正你发来的渲染器：
        // 1. 严格只保留「唯一一根」独木粗壮主干（底宽 96px ~ 115px，加盘根底座），删掉多余的第二根副干！
        // 2. 在主干和各级霜枝上加上写实的纵向树皮明暗裂纹，让粗树干极具真实古木质感！
        // 3. 把原本稀疏的小叶子升级为 2800 片大号饱满雾凇叶片（尺寸 9~16px），树冠浓密丰满！
        // ══════════════════════════════════════════════════════════════════════════
        const canvas = topDoc.getElementById("mt-ancient-canvas");
        const ctx2d = canvas.getContext("2d");
        let animId = null, W = 390, H = 780, treeDataCache = null;

        function buildColdSilverTree(w, h) {
            const rng = mulberry32(20260401);
            const branches = [];
            const frostMist = [];
            const backLeaves = [];
            const frontLeaves = [];
            const iceThreads = [];

            function growSlenderBranch(x1, y1, len, ang, w1, depth) {
                // 保持主干向主枝平滑过渡，粗壮有力不突兀
                const w2 = Math.max(1.2, w1 * (depth === 7 ? 0.68 : (depth >= 5 ? 0.66 : 0.64)));
                const curve = (rng() - 0.46) * 0.16;
                const cx = x1 + Math.cos(ang + curve) * (len * 0.52);
                const cy = y1 + Math.sin(ang + curve) * (len * 0.52);
                const x2 = x1 + Math.cos(ang) * len;
                const y2 = y1 + Math.sin(ang) * len;

                branches.push({ x1, y1, cx, cy, x2, y2, w1, w2, depth });

                // 从第 5 层开始沿着树枝密集簇生丰满的雾凇叶片（不再只有末端几片！）
                if (depth <= 5) {
                    if (depth <= 3) {
                        frostMist.push({ x: x2, y: y2, r: 44 + rng() * 42 });
                    }
                    const leafCnt = depth === 1 ? 32 : (depth === 2 ? 26 : 16);
                    const spreadRad = 18 + depth * 12;
                    for (let i = 0; i < leafCnt; i++) {
                        const a = rng() * Math.PI * 2;
                        const d = Math.pow(rng(), 0.65) * spreadRad;
                        const lx = x2 + Math.cos(a) * d;
                        const ly = y2 + Math.sin(a) * (d * 0.75);
                        const sz = 8.5 + rng() * 6.5;
                        const rot = (rng() - 0.5) * 2.4;
                        const s = rng();
                        if (s < 0.35) {
                            backLeaves.push({ x: lx, y: ly, sz, rot, fill: "rgba(150, 158, 176, 0.68)", phase: rng() * 6.28 });
                        } else if (s < 0.68) {
                            frontLeaves.push({ x: lx, y: ly, sz, rot, fill: "rgba(224, 229, 240, 0.88)", phase: rng() * 6.28 });
                        } else {
                            frontLeaves.push({ x: lx, y: ly, sz, rot, fill: "rgba(255, 255, 255, 0.96)", phase: rng() * 6.28 });
                        }
                    }
                    if (depth === 2 && rng() > 0.4) {
                        iceThreads.push({ x: x2, y: y2, len: 45 + rng() * 70, phase: rng() * 6.28 });
                    }
                }

                if (depth <= 1) return;

                const subCnt = (depth === 7 || depth === 5 || depth === 3) ? 3 : 2;
                for (let i = 0; i < subCnt; i++) {
                    const spread = subCnt === 2 ? (i === 0 ? -0.36 : 0.32) : (i - 1) * 0.36;
                    const pullRight = x2 < w * 0.48 ? 0.09 : -0.02;
                    const nextAng = ang + spread + pullRight + (rng() - 0.5) * 0.13;
                    const nextLen = len * (0.76 + rng() * 0.11);
                    growSlenderBranch(x2, y2, nextLen, nextAng, w2, depth - 1);
                }
            }

            // 🔥 核心修复：严格只画「唯一一根」粗壮的独木主干！（底宽直接拉到 92px~110px，彻底删掉之前多余的第二根副干！）
            const singleTrunkW = Math.max(88, w * 0.24);
            growSlenderBranch(w * 0.16, h * 0.95, h * 0.25, -Math.PI * 0.45, singleTrunkW, 7);

            const snowMotes = Array.from({ length: 22 }, (_, i) => ({
                x: w * (0.1 + rng() * 0.85), y: h * rng(), r: 1.0 + rng() * 1.6, spY: 8 + rng() * 10, phase: i
            }));

            return { branches, frostMist, backLeaves, frontLeaves, iceThreads, snowMotes };
        }

        function resizeCanvas() {
            const rect = overlay.getBoundingClientRect();
            W = rect.width || topWin.innerWidth || 390;
            H = rect.height || topWin.innerHeight || 780;
            const dpr = Math.min(topWin.devicePixelRatio || 1, 2);
            canvas.width = W * dpr;
            canvas.height = H * dpr;
            ctx2d.setTransform(dpr, 0, 0, dpr, 0, 0);
            treeDataCache = buildColdSilverTree(W, H);
        }

        // 绘制真实感粗壮冷银树干与分枝（含圆滑分叉关节 + 写实纵向树皮裂纹沟壑）
        function drawFrostSilverBranch(b, wind) {
            const dx = b.x2 - b.x1, dy = b.y2 - b.y1, len = Math.hypot(dx, dy) || 1;
            const nx = -dy / len, ny = dx / len;
            // 底部唯一主干稳如泰山不乱晃，上方细枝随风轻摆
            const sw1 = b.depth === 7 ? 0 : wind * (7 - b.depth) * 0.22;
            const sw2 = wind * (8 - b.depth) * 0.35;
            const swc = (sw1 + sw2) * 0.5;

            const x1 = b.x1 + sw1, y1 = b.y1, x2 = b.x2 + sw2, y2 = b.y2, cx = b.cx + swc, cy = b.cy;

            // 如果是唯一主干（depth === 7），底部向外自然扩出稳固的古树盘根弧度
            const baseExpand = b.depth === 7 ? 1.38 : 1.0;

            ctx2d.beginPath();
            ctx2d.moveTo(x1 + nx * b.w1 * 0.5 * baseExpand, y1 + ny * b.w1 * 0.5);
            ctx2d.quadraticCurveTo(cx + nx * (b.w1 + b.w2) * 0.25, cy + ny * (b.w1 + b.w2) * 0.25, x2 + nx * b.w2 * 0.5, y2 + ny * b.w2 * 0.5);
            ctx2d.arc(x2, y2, b.w2 * 0.5, Math.atan2(ny, nx), Math.atan2(-ny, -nx));
            ctx2d.quadraticCurveTo(cx - nx * (b.w1 + b.w2) * 0.25, cy - ny * (b.w1 + b.w2) * 0.25, x1 - nx * b.w1 * 0.5 * baseExpand, y1 - ny * b.w1 * 0.5);
            ctx2d.closePath();

            // 立体圆柱冷银树皮受光渐变
            const grd = ctx2d.createLinearGradient(x1 - b.w1 * 0.5, y1, x1 + b.w1 * 0.5, y1);
            grd.addColorStop(0, "#687082");
            grd.addColorStop(0.38, "#949CAE");
            grd.addColorStop(0.78, "#D4DAE6");
            grd.addColorStop(1, "#FFFFFF");
            ctx2d.fillStyle = grd;
            ctx2d.fill();

            // 在粗树干和主枝表面刻画写实的纵向树皮纹理沟壑（让树干真实有肌理，不再像塑料管！）
            if (b.w1 > 10) {
                const lines = b.depth === 7 ? 7 : 3;
                for (let k = 1; k <= lines; k++) {
                    const ratio = (k / (lines + 1)) - 0.5;
                    ctx2d.beginPath();
                    ctx2d.moveTo(x1 + nx * b.w1 * ratio * baseExpand, y1 + ny * b.w1 * ratio);
                    ctx2d.quadraticCurveTo(cx + nx * (b.w1 + b.w2) * 0.5 * ratio, cy + ny * (b.w1 + b.w2) * 0.5 * ratio, x2 + nx * b.w2 * ratio, y2 + ny * b.w2 * ratio);
                    ctx2d.strokeStyle = k % 2 === 0 ? "rgba(72, 78, 94, 0.36)" : "rgba(255, 255, 255, 0.55)";
                    ctx2d.lineWidth = b.depth === 7 ? 1.6 : 0.9;
                    ctx2d.lineCap = "round";
                    ctx2d.stroke();
                }
            }
        }

        function drawLeafBatch(list, t) {
            list.forEach((lf) => {
                const sw = Math.sin(t * 1.4 + lf.phase) * 2.2;
                ctx2d.save();
                ctx2d.translate(lf.x + sw, lf.y);
                ctx2d.rotate(lf.rot + sw * 0.03);
                ctx2d.beginPath();
                ctx2d.moveTo(0, 0);
                ctx2d.bezierCurveTo(-lf.sz * 0.5, -lf.sz * 0.32, -lf.sz * 0.42, -lf.sz, 0, -lf.sz * 1.42);
                ctx2d.bezierCurveTo(lf.sz * 0.42, -lf.sz, lf.sz * 0.5, -lf.sz * 0.32, 0, 0);
                ctx2d.fillStyle = lf.fill;
                ctx2d.fill();
                ctx2d.restore();
            });
        }

        function renderCanvasLoop(ts) {
            if (!overlay.classList.contains("open")) { animId = null; return; }
            if (!treeDataCache) resizeCanvas();
            const t = ts * 0.001, wind = Math.sin(t * 1.0) * 2.2;

            ctx2d.clearRect(0, 0, W, H);
            const { branches, frostMist, backLeaves, frontLeaves, iceThreads, snowMotes } = treeDataCache;

            // 1. 树冠底层清冷纯白冰雾柔光云团
            frostMist.forEach((fm) => {
                const g = ctx2d.createRadialGradient(fm.x + wind * 0.5, fm.y, 4, fm.x + wind * 0.5, fm.y, fm.r);
                g.addColorStop(0, "rgba(255, 255, 255, 0.88)");
                g.addColorStop(0.6, "rgba(232, 236, 246, 0.45)");
                g.addColorStop(1, "rgba(255, 255, 255, 0)");
                ctx2d.fillStyle = g;
                ctx2d.beginPath();
                ctx2d.arc(fm.x + wind * 0.5, fm.y, fm.r, 0, Math.PI * 2);
                ctx2d.fill();
            });

            // 2. 树冠远景冷灰衬底繁叶
            drawLeafBatch(backLeaves, t);

            // 3. 垂落的银白冰丝气根
            iceThreads.forEach((it) => {
                const sw = Math.sin(t * 1.5 + it.phase) * 5.5 + wind;
                const g = ctx2d.createLinearGradient(it.x, it.y, it.x, it.y + it.len);
                g.addColorStop(0, "rgba(165, 172, 188, 0.6)");
                g.addColorStop(1, "rgba(255, 255, 255, 0)");
                ctx2d.beginPath();
                ctx2d.moveTo(it.x, it.y);
                ctx2d.quadraticCurveTo(it.x + sw * 0.4, it.y + it.len * 0.5, it.x + sw, it.y + it.len);
                ctx2d.strokeStyle = g;
                ctx2d.lineWidth = 0.9;
                ctx2d.stroke();
            });

            // 4. 唯一一根粗壮独木主干与各级伸展霜枝
            branches.forEach((b) => drawFrostSilverBranch(b, wind));

            // 5. 树冠前景受光纯白/雾银浓密繁叶（半掩树枝，饱满茂密！）
            drawLeafBatch(frontLeaves, t);

            // 6. 树根底部仙气白雾消融层
            const mistGrd = ctx2d.createLinearGradient(0, H * 0.80, 0, H);
            mistGrd.addColorStop(0, "rgba(238, 241, 247, 0)");
            mistGrd.addColorStop(0.58, "rgba(244, 246, 251, 0.86)");
            mistGrd.addColorStop(1, "#FFFFFF");
            ctx2d.fillStyle = mistGrd;
            ctx2d.fillRect(0, H * 0.80, W, H * 0.20);

            // 7. 飘浮的微雪冰尘
            snowMotes.forEach((sm) => {
                const py = (sm.y + t * sm.spY) % H;
                const px = sm.x + Math.sin(t + sm.phase) * 8;
                ctx2d.beginPath();
                ctx2d.arc(px, py, sm.r, 0, Math.PI * 2);
                ctx2d.fillStyle = "rgba(255, 255, 255, 0.9)";
                ctx2d.fill();
            });

            animId = requestAnimationFrame(renderCanvasLoop);
        }

        function getAutoPos(idx) {
            const g = idx * 2.39996, r = 9 + (idx % 7) * 4.2;
            return { xPct: Math.max(12, Math.min(72, Math.round(36 + Math.cos(g) * r * 1.35))), yPct: Math.max(12, Math.min(44, Math.round(25 + Math.sin(g) * r * 0.8))) };
        }

        function renderLeavesAndUI() {
            const c = getCtx(), data = loadTree();
            const homeBadge = topDoc.getElementById("mt-home-badge");
            if (homeBadge) homeBadge.textContent = `${data.leaves.length}叶`;
            topDoc.getElementById("mt-count-txt").textContent = `${data.leaves.length} 片记忆叶`;

            // 树上只挂纯净的写实银杏/菩提叶片标本，不挂任何年月日或文字标签，100% 绝不遮挡！
            const stage = topDoc.getElementById("mt-leaves-stage");
            stage.innerHTML = (data.leaves || []).map((lf, idx) => {
                const pos = (lf.xPct && lf.yPct) ? { xPct: lf.xPct, yPct: lf.yPct } : getAutoPos(idx);
                const isSel = Number(lf.id) === Number(data.activeId);
                const delay = ((idx * 0.41) % 3.6).toFixed(2);
                return `<div class="mt-hanging-leaf ${isSel ? "selected-leaf" : ""}" data-lid="${lf.id}" style="left:${pos.xPct}%;top:${pos.yPct}%;animation-delay:${delay}s;">
                    ${renderRealisticLeafSvg(lf.id, lf.joy, isSel, idx)}
                </div>`;
            }).join("");

            stage.querySelectorAll(".mt-hanging-leaf").forEach((node) => {
                const lid = Number(node.getAttribute("data-lid"));
                let isDown = false, moved = false, sx = 0, sy = 0;
                const onStart = (cx, cy) => { isDown = true; moved = false; sx = cx; sy = cy; node.classList.add("dragging"); };
                const onMove = (cx, cy) => {
                    if (!isDown) return;
                    if (Math.hypot(cx - sx, cy - sy) > 6) {
                        moved = true;
                        const rect = stage.getBoundingClientRect();
                        node.style.left = `${Math.max(6, Math.min(92, ((cx - rect.left) / rect.width) * 100)).toFixed(1)}%`;
                        node.style.top = `${Math.max(8, Math.min(68, ((cy - rect.top) / rect.height) * 100)).toFixed(1)}%`;
                    }
                };
                const onEnd = () => {
                    if (!isDown) return;
                    isDown = false; node.classList.remove("dragging");
                    const d = loadTree();
                    if (moved) {
                        const target = d.leaves.find((x) => Number(x.id) === lid);
                        if (target) { target.xPct = parseFloat(node.style.left); target.yPct = parseFloat(node.style.top); }
                    }
                    d.activeId = lid; saveTree(d); renderLeavesAndUI();
                };
                node.addEventListener("mousedown", (e) => { e.stopPropagation(); onStart(e.clientX, e.clientY); });
                topDoc.addEventListener("mousemove", (e) => onMove(e.clientX, e.clientY));
                topDoc.addEventListener("mouseup", onEnd);
                node.addEventListener("touchstart", (e) => { e.stopPropagation(); const t = e.touches[0]; if (t) onStart(t.clientX, t.clientY); }, { passive: true });
                node.addEventListener("touchmove", (e) => { const t = e.touches[0]; if (t) onMove(t.clientX, t.clientY); }, { passive: true });
                node.addEventListener("touchend", onEnd);
            });

            // 底部卡片与名录也全部去掉了年月日显示，干净清爽！
            const cur = data.leaves.find((x) => Number(x.id) === Number(data.activeId));
            const wrap = topDoc.getElementById("mt-leaf-card-wrap");
            if (!cur) {
                wrap.innerHTML = "";
            } else {
                const stInfo = getLeafStyleByJoy(cur.joy);
                wrap.innerHTML = `<div class="mt-float-card">
                    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
                        <div style="display:flex;align-items:center;gap:6px;min-width:0;"><span style="width:9px;height:9px;border-radius:50%;background:${stInfo.grad1};border:1.2px solid ${stInfo.stroke};flex-shrink:0;"></span><span style="font-size:11.5px;font-weight:800;color:#3A3D46;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${cur.title.replace(/</g, "&lt;")}</span></div>
                        <div style="display:flex;align-items:center;gap:8px;flex-shrink:0;"><span style="font-size:7.8px;font-weight:700;color:#585C6A;background:#F2F4F8;padding:2px 7px;border-radius:99px;">${stInfo.label}</span><span id="mt-del-leaf" style="cursor:pointer;display:inline-flex;">${MT_ICO.trash}</span><span id="mt-hide-card" style="cursor:pointer;color:#8E8E98;display:inline-flex;">${MT_ICO.close}</span></div>
                    </div>
                    <div style="font-size:10.8px;font-weight:600;color:#3A3D46;line-height:1.65;">${cur.content.replace(/</g, "&lt;")}</div>
                    <div style="margin-top:8px;padding:8px 10px;background:#F6F7FA;border-left:2px solid #585C6A;border-radius:0 8px 8px 0;font-size:10px;font-weight:600;color:#3A3D46;line-height:1.55;"><span style="font-size:7.8px;color:#989EAE;display:block;margin-bottom:2px;">${c.charName} 的叶背批注</span>${(cur.whisper || "“ 这片叶子我替你收好了。”").replace(/</g, "&lt;")}</div>
                </div>`;
                topDoc.getElementById("mt-hide-card").onclick = () => { const d = loadTree(); d.activeId = 0; saveTree(d); renderLeavesAndUI(); };
                topDoc.getElementById("mt-del-leaf").onclick = () => {
                    if (!confirm(`确定摘除「${cur.title}」这片记忆叶吗？`)) return;
                    const d = loadTree(); d.leaves = d.leaves.filter((x) => Number(x.id) !== Number(cur.id)); d.activeId = d.leaves[0]?.id || 0; saveTree(d); renderLeavesAndUI();
                };
            }

            const listBody = topDoc.getElementById("mt-all-list-body");
            listBody.innerHTML = data.leaves.map((lf) => {
                const stInfo = getLeafStyleByJoy(lf.joy);
                return `<div data-pickid="${lf.id}" style="display:flex;justify-content:space-between;align-items:center;padding:7px 10px;border-radius:10px;border:1px solid ${Number(lf.id) === Number(data.activeId) ? "#484C58" : "#EFEFF5"};background:#FFFFFF;cursor:pointer;"><div style="display:flex;align-items:center;gap:7px;min-width:0;"><span style="width:8px;height:8px;border-radius:50%;background:${stInfo.grad1};border:1px solid ${stInfo.stroke};flex-shrink:0;"></span><span style="font-size:10px;font-weight:800;color:#3A3D46;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${lf.title.replace(/</g, "&lt;")}</span></div><span style="font-size:8px;color:#8E8E98;flex-shrink:0;margin-left:8px;">${stInfo.label}</span></div>`;
            }).join("");
            listBody.querySelectorAll("[data-pickid]").forEach((row) => row.onclick = () => {
                const d = loadTree(); d.activeId = Number(row.getAttribute("data-pickid")); saveTree(d);
                topDoc.getElementById("mt-all-list-modal").style.display = "none"; renderLeavesAndUI();
            });
        }

        function openTreeOverlay() { overlay.classList.add("open"); resizeCanvas(); renderLeavesAndUI(); if (!animId) animId = requestAnimationFrame(renderCanvasLoop); }
        function closeTreeOverlay() { overlay.classList.remove("open"); if (animId) { cancelAnimationFrame(animId); animId = null; } }

        topDoc.getElementById("smt-home-open-memtree")?.addEventListener("click", (e) => { e.stopPropagation(); openTreeOverlay(); });
        topDoc.getElementById("mt-close-btn").onclick = () => closeTreeOverlay();
        topWin.addEventListener("resize", () => { if (overlay.classList.contains("open")) resizeCanvas(); });

        const addModal = topDoc.getElementById("mt-add-modal"), listModal = topDoc.getElementById("mt-all-list-modal");
        topDoc.getElementById("mt-btn-add").onclick = () => { listModal.style.display = "none"; addModal.style.display = addModal.style.display === "none" ? "block" : "none"; };
        topDoc.getElementById("mt-add-close").onclick = () => { addModal.style.display = "none"; };
        topDoc.getElementById("mt-list-btn").onclick = () => { addModal.style.display = "none"; listModal.style.display = listModal.style.display === "none" ? "block" : "none"; renderLeavesAndUI(); };
        topDoc.getElementById("mt-list-close").onclick = () => { listModal.style.display = "none"; };

        const joySlider = topDoc.getElementById("mt-new-joy"), joyLbl = topDoc.getElementById("mt-new-joy-lbl");
        joySlider.oninput = () => { joyLbl.textContent = getLeafStyleByJoy(joySlider.value).label; };

        topDoc.getElementById("mt-add-submit").onclick = async () => {
            const title = topDoc.getElementById("mt-new-title").value.trim() || "独家回忆", content = topDoc.getElementById("mt-new-content").value.trim();
            if (!content) return alert("请写下你想封存的回忆内容！");
            const joy = Number(joySlider.value) || 92, c = getCtx(), newId = Date.now(), d = loadTree(), pos = getAutoPos(d.leaves.length + 1);
            d.leaves.unshift({ id: newId, title, author: c.userName, joy, xPct: pos.xPct, yPct: pos.yPct, content, whisper: `（${c.charName} 正在叶背写下批注...）` });
            d.activeId = newId; saveTree(d);
            topDoc.getElementById("mt-new-title").value = ""; topDoc.getElementById("mt-new-content").value = "";
            addModal.style.display = "none"; renderLeavesAndUI();
            try {
                const w = await askTreeAI(`你是${c.charName}。人设：${c.charDesc.slice(0, 900)}`, `${c.userName}在有情树上挂了一片记忆叶《${title}》（开心度${joy}%）：“${content}”。请在叶背写一句深情批注(40字内)：`);
                const latest = loadTree(), t = latest.leaves.find((x) => x.id === newId);
                if (t) { t.whisper = `“ ${w.replace(/^[“"]|[”"]$/g, "").trim()} ”`; saveTree(latest); renderLeavesAndUI(); }
            } catch (e) {}
        };

        topDoc.getElementById("mt-btn-ai-leaf").onclick = async (e) => {
            const btn = e.currentTarget, orig = btn.innerHTML; btn.textContent = "结叶中...";
            const c = getCtx();
            try {
                const raw = await askTreeAI(`你是${c.charName}。人设：${c.charDesc.slice(0, 900)}\n近期剧情：${c.recentChat}`, `请在有情树上挂一片你的独家回忆叶，并根据这段回忆的情绪打分(joy: 10~100)。严格只输出JSON：{"title":"8字内标题","joy":88,"content":"50字内回忆描写","whisper":"35字内叶背情话"}`);
                const m = raw.match(/\{[\s\S]*\}/);
                if (m) {
                    const o = JSON.parse(m[0]), d = loadTree(), nid = Date.now(), pos = getAutoPos(d.leaves.length + 2);
                    d.leaves.unshift({ id: nid, title: o.title || "心动瞬间", author: c.charName, joy: Number(o.joy) || 88, xPct: pos.xPct, yPct: pos.yPct, content: o.content || "", whisper: `“ ${(o.whisper || "").replace(/^[“"]|[”"]$/g, "")} ”` });
                    d.activeId = nid; saveTree(d); renderLeavesAndUI();
                }
            } catch (err) { alert(err.message); } finally { btn.innerHTML = orig; }
        };

        topDoc.getElementById("mt-btn-absorb").onclick = async (e) => {
            const btn = e.currentTarget, orig = btn.innerHTML; btn.textContent = "汲取中...";
            const c = getCtx();
            let wx = "";
            try { wx = JSON.parse(localStorage.getItem(`sumoul_v16_wx__${c.safeScope}`) || "[]").slice(-14).map((m) => `${m.role === "user" ? c.userName : c.charName}: ${m.text}`).join("\n"); } catch (err) {}
            const src = [wx, c.recentChat].filter(Boolean).join("\n---\n") || `与 ${c.charName} 的日常`;
            try {
                const raw = await askTreeAI(`你是${c.charName}。`, `根据以下近期聊天提炼一段最值得铭记的回忆结成有情树叶片，并给出情绪开心度(joy: 10~100)。\n${src.slice(-1100)}\n严格只输出JSON：{"title":"8字内标题","joy":92,"content":"50字内回忆浓缩","whisper":"35字内叶背批注"}`);
                const m = raw.match(/\{[\s\S]*\}/);
                if (m) {
                    const o = JSON.parse(m[0]), d = loadTree(), nid = Date.now(), pos = getAutoPos(d.leaves.length + 3);
                    d.leaves.unshift({ id: nid, title: o.title || "聊天记忆", author: `${c.userName} & ${c.charName}`, joy: Number(o.joy) || 90, xPct: pos.xPct, yPct: pos.yPct, content: o.content || "", whisper: `“ ${(o.whisper || "").replace(/^[“"]|[”"]$/g, "")} ”` });
                    d.activeId = nid; saveTree(d); renderLeavesAndUI();
                }
            } catch (err) { alert(err.message); } finally { btn.innerHTML = orig; }
        };
    }

    mountColdSilverSacredTree();
})();
