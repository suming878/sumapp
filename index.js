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
// 🤍 【Sumoul App 韩系动态流 · 像素级高定重做版（修复角色独立隔离 + 真韩系1px双层留白圆环与思绪云朵气泡）】
// 用法：直接替换 index.js 最末尾的旧动态补丁！
// ==========================================================================
(function () {
    const topWin = window.parent || window;
    const topDoc = topWin.document;

    function mountKoreanPureMoments() {
        const modal = topDoc.getElementById("seoul-mini-theater-modal");
        const spacePage = topDoc.getElementById("smt-page-space");
        const homePage = topDoc.getElementById("smt-page-home");
        const fsBody = modal?.querySelector(".smt-fs-body");
        if (!modal || !spacePage || !homePage || !fsBody) {
            setTimeout(mountKoreanPureMoments, 250);
            return;
        }

        // 1. 极细 1.3px 矢量图标生成器
        const mkIco = (d, sz = 18, stroke = "%232C2C32", fill = "none", sw = "1.4") => `<img src="data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='${fill}' stroke='${stroke}' stroke-width='${sw}' stroke-linecap='round' stroke-linejoin='round'%3E${d}%3C/svg%3E" style="width:${sz}px!important;height:${sz}px!important;display:block!important;pointer-events:none!important;" />`;

        const KR_ICO = {
            heart: mkIco("%3Cpath d='M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z'/%3E", 19, "%233A3A40", "none", "1.4"),
            heartFill: mkIco("%3Cpath d='M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z'/%3E", 19, "%232C2C32", "%232C2C32", "1.4"),
            cmt: mkIco("%3Cpath d='M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z'/%3E", 18, "%233A3A40", "none", "1.4"),
            send: mkIco("%3Cline x1='22' y1='2' x2='11' y2='13'/%3E%3Cpolygon points='22 2 15 22 11 13 2 9 22 2'/%3E", 17, "%233A3A40", "none", "1.4"),
            mark: mkIco("%3Cpath d='m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z'/%3E", 18, "%233A3A40", "none", "1.4"),
            more: mkIco("%3Ccircle cx='12' cy='12' r='1'/%3E%3Ccircle cx='19' cy='12' r='1'/%3E%3Ccircle cx='5' cy='12' r='1'/%3E", 15, "%238E8E98", "none", "1.8"),
            plus: mkIco("%3Cline x1='12' y1='5' x2='12' y2='19'/%3E%3Cline x1='5' y1='12' x2='19' y2='12'/%3E", 11, "%233A3A40", "none", "2"),
            cam: mkIco("%3Crect width='18' height='18' x='3' y='3' rx='2'/%3E%3Ccircle cx='9' cy='9' r='2'/%3E%3Cpath d='m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21'/%3E", 20),
            pet: mkIco("%3Cpath d='M12 5c.67 0 1.35.09 2 .26 1.78-2 5.03-2.84 6.42-2.26 1.4.58-.42 7-.42 7 .57 1.07 1 2.24 1 3.44C21 17.9 16.97 21 12 21s-9-3.1-9-7.56c0-1.25.5-2.4 1-3.44 0 0-1.89-6.42-.5-7 1.39-.58 4.72.23 6.5 2.23A9.04 9.04 0 0 1 12 5Z'/%3E%3Cpath d='M8 14v.5M16 14v.5M11.25 16.25h1.5L12 17l-.75-.75Z'/%3E", 20),
            qa: mkIco("%3Cpath d='M7.9 20A9 9 0 1 0 4 16.1L2 22Z'/%3E%3Cpath d='M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3'/%3E", 20),
            wave: mkIco("%3Cpath d='M22 12h-4l-3 9L9 3l-3 9H2'/%3E", 20),
            ticket: mkIco("%3Cpath d='M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z'/%3E%3Cpath d='M13 5v2M13 17v2M13 11v2'/%3E", 20),
            note: mkIco("%3Cpath d='M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z'/%3E", 20)
        };

        // 2. 注入真正具有「韩国冷淡风白灰质感」的精修 CSS
        topDoc.getElementById("sumoul-ins-feed-css")?.remove();
        const st = topDoc.createElement("style");
        st.id = "sumoul-ins-feed-css";
        st.innerHTML = `
            #seoul-mini-theater-modal .smt-tab-item[data-page="space"] .smt-tab-ico {
                background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%237A7A85' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Crect x='3' y='3' width='18' height='18' rx='5'/%3E%3Ccircle cx='12' cy='12' r='4'/%3E%3Ccircle cx='17.5' cy='6.5' r='1' fill='%237A7A85'/%3E%3C/svg%3E") !important;
            }
            #seoul-mini-theater-modal .smt-tab-item[data-page="space"].active .smt-tab-ico {
                background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%232C2C32' stroke-width='1.9' stroke-linecap='round' stroke-linejoin='round'%3E%3Crect x='3' y='3' width='18' height='18' rx='5'/%3E%3Ccircle cx='12' cy='12' r='4'/%3E%3Ccircle cx='17.5' cy='6.5' r='1' fill='%232C2C32'/%3E%3C/svg%3E") !important;
            }

            #seoul-mini-theater-modal #smt-page-space {
                padding: 0 !important;
                gap: 0 !important;
                background: #FFFFFF !important;
            }

            /* ── 顶部：韩国 IG Notes 极简留白圆头像横栏 ── */
            #seoul-mini-theater-modal .kr-notes-tray {
                display: flex !important;
                align-items: flex-end !important;
                gap: 16px !important;
                overflow-x: auto !important;
                padding: 28px 10px 14px 10px !important;
                background: #FFFFFF !important;
                border-bottom: 1px solid #F2F2F6 !important;
                flex-shrink: 0 !important;
                scrollbar-width: none !important;
            }
            #seoul-mini-theater-modal .kr-notes-tray::-webkit-scrollbar { display: none !important; }

            #seoul-mini-theater-modal .kr-note-unit {
                display: flex !important;
                flex-direction: column !important;
                align-items: center !important;
                position: relative !important;
                cursor: pointer !important;
                flex-shrink: 0 !important;
                width: 64px !important;
            }

            /* 头顶思绪云朵胶囊（带底部两颗微小心思圆点，还原真 IG Notes 味道！） */
            #seoul-mini-theater-modal .kr-thought-pill {
                position: absolute !important;
                top: -20px !important;
                left: 50% !important;
                transform: translateX(-50%) !important;
                background: #FFFFFF !important;
                border: 1px solid #E4E4EC !important;
                border-radius: 14px !important;
                padding: 3.5px 8px !important;
                font-size: 8px !important;
                font-weight: 500 !important;
                color: #3A3A40 !important;
                letter-spacing: 0.2px !important;
                white-space: nowrap !important;
                max-width: 76px !important;
                overflow: hidden !important;
                text-overflow: ellipsis !important;
                z-index: 4 !important;
                box-shadow: 0 3px 10px rgba(30, 30, 40, 0.04) !important;
            }
            #seoul-mini-theater-modal .kr-thought-pill::after {
                content: "" !important;
                position: absolute !important;
                bottom: -4px !important;
                left: 14px !important;
                width: 5px !important;
                height: 5px !important;
                border-radius: 50% !important;
                background: #FFFFFF !important;
                border-bottom: 1px solid #E4E4EC !important;
                border-right: 1px solid #E4E4EC !important;
            }
            #seoul-mini-theater-modal .kr-thought-pill.active-char {
                background: #F6F6F9 !important;
                border-color: #DCDCE6 !important;
                color: #2C2C32 !important;
                font-weight: 600 !important;
            }

            /* 精修 1px 极细冷灰双层留白头像环（告别笨重黑框！） */
            #seoul-mini-theater-modal .kr-ava-ring {
                width: 58px !important;
                height: 58px !important;
                border-radius: 50% !important;
                padding: 2.5px !important;
                background: #FFFFFF !important;
                border: 1px solid #E2E2EA !important;
                display: flex !important;
                align-items: center !important;
                justify-content: center !important;
                box-sizing: border-box !important;
                position: relative !important;
                transition: transform 0.15s ease !important;
            }
            #seoul-mini-theater-modal .kr-note-unit:active .kr-ava-ring {
                transform: scale(0.94) !important;
            }
            /* 未读快拍的对外极细深灰呼吸环 */
            #seoul-mini-theater-modal .kr-ava-ring.unread {
                border: 1.3px solid #55555E !important;
            }
            #seoul-mini-theater-modal .kr-ava-inner {
                width: 100% !important;
                height: 100% !important;
                border-radius: 50% !important;
                overflow: hidden !important;
                background: #F4F4F8 !important;
            }
            #seoul-mini-theater-modal .kr-ava-inner img {
                width: 100% !important;
                height: 100% !important;
                object-fit: cover !important;
                display: block !important;
                filter: contrast(97%) saturate(90%) !important;
            }
            #seoul-mini-theater-modal .kr-ava-badge {
                position: absolute !important;
                right: -1px !important;
                bottom: -1px !important;
                width: 18px !important;
                height: 18px !important;
                border-radius: 50% !important;
                background: #FFFFFF !important;
                border: 1px solid #DCDCE6 !important;
                display: flex !important;
                align-items: center !important;
                justify-content: center !important;
                z-index: 3 !important;
            }
            #seoul-mini-theater-modal .kr-unit-name {
                font-size: 8.8px !important;
                font-weight: 500 !important;
                color: #55555E !important;
                margin-top: 6px !important;
                letter-spacing: 0.2px !important;
                white-space: nowrap !important;
                overflow: hidden !important;
                text-overflow: ellipsis !important;
                max-width: 62px !important;
            }

            /* ── 次顶栏：极简无框感 Tab 切换条 ── */
            #seoul-mini-theater-modal .kr-sub-nav {
                display: flex !important;
                align-items: center !important;
                justify-content: space-between !important;
                padding: 8px 12px !important;
                background: #FFFFFF !important;
                border-bottom: 1px solid #F4F4F8 !important;
                flex-shrink: 0 !important;
            }
            #seoul-mini-theater-modal .kr-nav-tabs {
                display: flex !important;
                gap: 14px !important;
                font-size: 9.5px !important;
                color: #9A9AA5 !important;
            }
            #seoul-mini-theater-modal .kr-nav-tabs span {
                cursor: pointer !important;
                padding: 3px 0 !important;
                position: relative !important;
            }
            #seoul-mini-theater-modal .kr-nav-tabs span.active {
                color: #2C2C32 !important;
                font-weight: 700 !important;
            }
            #seoul-mini-theater-modal .kr-nav-tabs span.active::after {
                content: "" !important;
                position: absolute !important;
                left: 0 !important;
                right: 0 !important;
                bottom: -2px !important;
                height: 1.5px !important;
                background: #2C2C32 !important;
            }

            /* ── 韩国软件无外框感纯净动态流 (Clean Editorial Feed) ── */
            #seoul-mini-theater-modal .kr-clean-post {
                background: #FFFFFF !important;
                border-bottom: 1px solid #F0F0F5 !important;
                padding: 16px 4px 18px 4px !important;
            }
            #seoul-mini-theater-modal .kr-post-head {
                display: flex !important;
                align-items: center !important;
                justify-content: space-between !important;
                padding: 0 6px !important;
                margin-bottom: 11px !important;
            }
            #seoul-mini-theater-modal .kr-post-user {
                display: flex !important;
                align-items: center !important;
                gap: 9px !important;
            }
            #seoul-mini-theater-modal .kr-post-user img {
                width: 34px !important;
                height: 34px !important;
                border-radius: 50% !important;
                object-fit: cover !important;
                border: 1px solid #EAEAF0 !important;
                padding: 1.5px !important;
                background: #FFFFFF !important;
            }
            /* 银盐灰白画报相纸框 */
            #seoul-mini-theater-modal .kr-film-frame {
                background: #F7F7FA !important;
                border: 1px solid #ECECF2 !important;
                border-radius: 14px !important;
                padding: 24px 20px !important;
                margin: 0 2px 11px 2px !important;
                position: relative !important;
            }
            #seoul-mini-theater-modal .kr-film-frame img.real-photo {
                width: 100% !important;
                max-height: 240px !important;
                object-fit: cover !important;
                border-radius: 10px !important;
                display: block !important;
                margin-bottom: 10px !important;
            }
            #seoul-mini-theater-modal .kr-film-meta {
                display: flex !important;
                justify-content: space-between !important;
                align-items: center !important;
                font-size: 7.5px !important;
                color: #A0A0AA !important;
                letter-spacing: 1.4px !important;
                font-family: monospace !important;
                margin-bottom: 12px !important;
            }
            #seoul-mini-theater-modal .kr-film-scene {
                font-size: 10.5px !important;
                line-height: 1.75 !important;
                color: #484852 !important;
                letter-spacing: 0.3px !important;
                padding-left: 10px !important;
                border-left: 1.5px solid #D5D5E0 !important;
            }
            #seoul-mini-theater-modal .kr-post-bar {
                display: flex !important;
                align-items: center !important;
                justify-content: space-between !important;
                padding: 2px 6px 8px 6px !important;
            }
            #seoul-mini-theater-modal .kr-post-caption {
                padding: 0 6px !important;
                font-size: 11px !important;
                line-height: 1.65 !important;
                color: #2C2C32 !important;
            }
            #seoul-mini-theater-modal .kr-cmt-list {
                margin: 9px 6px 0 6px !important;
                padding-top: 8px !important;
                border-top: 1px solid #F6F6FA !important;
                font-size: 10px !important;
                line-height: 1.6 !important;
            }

            /* 独立情侣空间 App 极简样式 */
            #seoul-mini-theater-modal .cp-pure-card { background:#F8F8FA!important;border:1px solid #EAEAEF!important;border-radius:20px!important;padding:22px 18px!important;text-align:center!important;margin-bottom:22px!important;background-size:cover!important;background-position:center!important; }
            #seoul-mini-theater-modal .cp-pure-inner { background:rgba(255,255,255,.94)!important;border:1px solid #EFEFF4!important;border-radius:16px!important;padding:22px 14px 16px 14px!important; }
            #seoul-mini-theater-modal .cp-pure-grid { display:grid!important;grid-template-columns:repeat(3,1fr)!important;row-gap:20px!important;column-gap:10px!important; }
            #seoul-mini-theater-modal .cp-pure-item { display:flex!important;flex-direction:column!important;align-items:center!important;text-align:center!important;cursor:pointer!important; }
            #seoul-mini-theater-modal .cp-pure-ico { width:52px!important;height:52px!important;border-radius:17px!important;background:#F8F8FA!important;border:1px solid #EAEAEF!important;display:flex!important;align-items:center!important;justify-content:center!important;margin-bottom:7px!important; }
        `;
        topDoc.head.appendChild(st);

        // 3. 更新底部第 2 栏名称为「动态」
        const tab2 = modal.querySelector('.smt-tab-item[data-page="space"]');
        if (tab2) {
            tab2.setAttribute("data-title", "SUMOUL FEED · 피드");
            tab2.setAttribute("data-sub", "Monochrome Social · 动态");
            const txtEl = tab2.querySelector(".smt-tab-txt");
            if (txtEl) txtEl.textContent = "动态";
        }

        // 4. 确保主页已挂载独立的【情侣空间 App (#smt-page-couple_app)】
        let coupleAppPage = topDoc.getElementById("smt-page-couple_app");
        if (!coupleAppPage) {
            coupleAppPage = topDoc.createElement("div");
            coupleAppPage.id = "smt-page-couple_app";
            coupleAppPage.className = "smt-page";
            coupleAppPage.innerHTML = `
                <div style="display:none!important;">
                    <span id="smt-sp-char-scope-tag"></span><span id="smt-stat-pet"></span><span id="smt-stat-petname"></span>
                    <span id="smt-stat-fund"></span><span id="smt-badge-pet"></span><span id="smt-badge-bpm"></span>
                    <span id="smt-badge-coupon"></span><span id="smt-badge-todo"></span><div id="smt-ab-ins-grid"></div>
                    <div id="smt-ins-detail-pop"></div><span id="smt-ins-user-add"></span><span id="smt-ins-ai-add"></span>
                </div>
                <div class="cp-pure-card" id="smt-sp-hero-card">
                    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
                        <span style="font-size:8px;color:#9A9AA5;letter-spacing:1.6px;font-family:monospace;">COUPLE SPACE · 커플앱</span>
                        <div style="display:flex;gap:5px;">
                            <span class="smt-pill-btn" id="smt-sp-bg-btn" style="height:20px!important;font-size:8px!important;">背景</span>
                            <span class="smt-pill-btn" id="smt-sp-mood" style="height:20px!important;font-size:8px!important;">36.7°C</span>
                            <span class="smt-pill-btn" id="smt-sp-reset-char" style="height:20px!important;font-size:8px!important;">重置</span>
                        </div>
                    </div>
                    <div class="cp-pure-inner">
                        <div style="display:flex;align-items:center;justify-content:center;gap:18px;margin-bottom:14px;">
                            <img id="smt-sp-uava" src="" style="width:52px;height:52px;border-radius:50%;object-fit:cover;border:1.5px solid #EAEAEF;padding:2px;background:#FFF;" />
                            <div id="smt-sp-edit-date" style="cursor:pointer;min-width:74px;">
                                <div style="font-size:17px;font-weight:700;color:#2C2C32;letter-spacing:.8px;" id="smt-sp-days">D+100</div>
                                <div style="width:60px;height:1px;border-bottom:1px dashed #D0D0DA;margin:5px auto;"></div>
                                <div style="font-size:7.5px;color:#A0A0AA;letter-spacing:1.2px;">ANNIVERSARY ✎</div>
                            </div>
                            <img id="smt-sp-cava" src="" style="width:52px;height:52px;border-radius:50%;object-fit:cover;border:1.5px solid #EAEAEF;padding:2px;background:#FFF;" />
                        </div>
                        <div style="font-size:11px;font-weight:600;color:#3A3A40;margin-bottom:5px;" id="smt-sp-couple-names">ME &amp; PARTNER</div>
                        <div style="font-size:9px;color:#8E8E98;cursor:pointer;" id="smt-sp-refresh-live">
                            <span id="smt-sp-live-bio">正在安静地陪在你身边</span> <span style="font-size:8px;">↻</span>
                        </div>
                    </div>
                </div>
                <div class="cp-pure-grid">
                    <div class="cp-pure-item" data-cpopen="sp_pet"><div class="cp-pure-ico">${KR_ICO.pet}</div><div style="font-size:10.5px;font-weight:600;color:#3A3A40;">云养萌宠</div><div style="font-size:7.5px;color:#A0A0AA;margin-top:2px;">PET HOUSE</div></div>
                    <div class="cp-pure-item" data-cpopen="sp_4cut"><div class="cp-pure-ico">${KR_ICO.cam}</div><div style="font-size:10.5px;font-weight:600;color:#3A3A40;">人生四格</div><div style="font-size:7.5px;color:#A0A0AA;margin-top:2px;">LIFE 4 CUT</div></div>
                    <div class="cp-pure-item" data-cpopen="sp_qa"><div class="cp-pure-ico">${KR_ICO.qa}</div><div style="font-size:10.5px;font-weight:600;color:#3A3A40;">灵魂百问</div><div style="font-size:7.5px;color:#A0A0AA;margin-top:2px;">CAPSULE Q&amp;A</div></div>
                    <div class="cp-pure-item" data-cpopen="sp_mood"><div class="cp-pure-ico">${KR_ICO.wave}</div><div style="font-size:10.5px;font-weight:600;color:#3A3A40;">同居波频</div><div style="font-size:7.5px;color:#A0A0AA;margin-top:2px;">HEARTBEAT</div></div>
                    <div class="cp-pure-item" data-cpopen="sp_coupon"><div class="cp-pure-ico">${KR_ICO.ticket}</div><div style="font-size:10.5px;font-weight:600;color:#3A3A40;">恋爱兑换券</div><div style="font-size:7.5px;color:#A0A0AA;margin-top:2px;">COUPONS</div></div>
                    <div class="cp-pure-item" data-cpopen="sp_guest"><div class="cp-pure-ico">${KR_ICO.note}</div><div style="font-size:10.5px;font-weight:600;color:#3A3A40;">留言与心愿</div><div style="font-size:7.5px;color:#A0A0AA;margin-top:2px;">GUESTBOOK</div></div>
                </div>
            `;
            fsBody.appendChild(coupleAppPage);

            const homeDockGrid = homePage.querySelector(".ab-dock-grid");
            if (homeDockGrid && !topDoc.getElementById("smt-home-open-couple-app")) {
                homeDockGrid.style.setProperty("grid-template-columns", "repeat(4, 1fr)", "important");
                const cpAppBtn = topDoc.createElement("div");
                cpAppBtn.className = "ab-app-item";
                cpAppBtn.id = "smt-home-open-couple-app";
                cpAppBtn.innerHTML = `<div class="ab-app-squircle">${KR_ICO.heart}</div><div class="ab-app-title">情侣空间</div><div class="ab-app-kr">COUPLE APP</div>`;
                homeDockGrid.prepend(cpAppBtn);
            }
        }

        // 5. 构建第 2 栏【韩国冷淡风白灰动态页面】骨架
        spacePage.innerHTML = `
            <!-- ① 顶部：1px 双层留白圆头像 + 思绪云朵小气泡横栏 -->
            <div class="kr-notes-tray" id="smt-ins-stories-bar"></div>

            <!-- 点击圆头像弹出的「限时快拍 Story 胶片预览卡」 -->
            <div id="smt-story-viewer" style="display:none;background:#F8F8FA!important;border-bottom:1px solid #EAEAF0!important;padding:14px 14px!important;flex-shrink:0!important;"></div>

            <!-- ② 次顶栏：极简底线式分类切换 + 发帖操作 -->
            <div class="kr-sub-nav">
                <div class="kr-nav-tabs">
                    <span class="active" data-feedfilter="all">ALL · 全部</span>
                    <span data-feedfilter="char" id="smt-filter-char-btn">PARTNER</span>
                </div>
                <div style="display:flex;gap:5px;">
                    <span class="smt-pill-btn" id="smt-mom-user-post" style="height:22px!important;font-size:8.5px!important;">＋ 发日常</span>
                    <span class="smt-pill-btn dark" id="smt-mom-ai-post" style="height:22px!important;font-size:8.5px!important;">✦ 让TA发帖</span>
                </div>
            </div>

            <!-- 发动态展开抽屉 -->
            <div id="smt-mom-post-drawer" class="smt-section-box" style="display:none;margin:8px 6px!important;flex-shrink:0;">
                <div style="font-size:9px;font-weight:700;color:#55555E;margin-bottom:6px;">NEW MOMENT · 记录此刻日常 (发布后TA与好友会自动回复)</div>
                <textarea id="smt-mom-post-txt" style="width:100%;height:52px;background:#FFF;border:1px solid #E4E4EC;border-radius:8px;padding:7px;font-size:10.5px;box-sizing:border-box;resize:none;margin-bottom:6px;outline:none;" placeholder="写下一句心情..."></textarea>
                <input type="text" id="smt-mom-post-img" class="smt-wx-input" style="width:100%;height:26px!important;font-size:9.5px!important;box-sizing:border-box;margin-bottom:7px;" placeholder="照片画面描述 或 粘贴图片URL (选填)..." />
                <div style="display:flex;justify-content:flex-end;gap:5px;">
                    <span class="smt-pill-btn" id="smt-mom-post-cancel">取消</span>
                    <span class="smt-pill-btn dark" id="smt-mom-post-submit">发布</span>
                </div>
            </div>

            <!-- ③ 下方：无边框感韩系白灰画报动态流 -->
            <div id="smt-mom-stream" style="flex:1;min-height:0;overflow-y:auto;padding-bottom:16px;"></div>
        `;

        // 6. 零报错、严格按角色物理隔离的 getCtx()（彻底修复之前的 lastU 拼写错误！）
        function getCtx() {
            let userName = "ME", charName = "", charScopeId = "";
            let userAvatar = "https://i.postimg.cc/rydS6NvG/IMG-3866.jpg", charAvatar = "https://i.postimg.cc/QC3CQ218/IMG-4147.jpg";
            let charDesc = "", recentChat = "";
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
                        charScopeId = "group_" + String(st.groupId);
                        charName = st.name2 || "GROUP";
                    } else if (st.name2) {
                        charName = st.name2;
                        charScopeId = st.name2;
                    }
                    if (Array.isArray(st.chat) && st.chat.length) {
                        recentChat = st.chat.slice(-8).map((m) => `${m.is_user ? userName : (charName || "TA")}: ${m.mes}`).join("\n");
                    }
                }
            } catch (e) {}

            const selCh = topDoc.querySelector("#rm_button_selected_ch h2, #character_name_pole");
            if (!charName && selCh?.textContent?.trim()) charName = selCh.textContent.trim();

            const aiMes = topDoc.querySelectorAll('#chat .mes:not([is_user="true"]):not(.is_user)');
            if (aiMes.length > 0) {
                const lastAi = aiMes[aiMes.length - 1];
                const n = lastAi.querySelector(".name_text")?.textContent?.trim();
                const a = lastAi.querySelector(".avatar img")?.src;
                if (n) charName = n;
                if (a) charAvatar = a;
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
            return { userName, charName, safeScope, userAvatar, charAvatar, charDesc, recentChat };
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

        // 每个角色完全独立的动态数据库（Key 包含 safeScope 角色唯一指纹！）
        function getFeedKey() {
            return `sumoul_v18_krfeed__${getCtx().safeScope}`;
        }

        function createDefaultFeed(charName) {
            return {
                owner: charName,
                myNote: "조용한 밤 · 放空",
                charNote: "네 생각 · 想你",
                charStory: `凌晨 · ${charName} 随手拍下窗外灰白色的街景，玻璃上映出半张清冷的侧脸，配文：“又到了会想起你的时间。”`,
                friends: [
                    { name: "서윤 · 摄影师", note: "필름 현상중", ava: "https://i.postimg.cc/vmsDSqmk/IMG-3926.jpg", story: `【摄影师 서윤 的快拍】刚冲洗出来的黑白胶卷，其中有一张是上次在街角抓拍到的 ${charName} 看向你的眼神。` },
                    { name: "한남동 Cafe", note: "OPEN · 雨", ava: "https://i.postimg.cc/MZg2F7Fm/IMG-4150.jpg", story: `【汉南洞 Cafe 快拍】玻璃窗上的雨痕与刚萃好的浓缩咖啡。今天店里放的是你最喜欢的那首慢歌。` },
                    { name: "새벽 라디오", note: "FM 94.5", ava: "https://i.postimg.cc/rydS6NvG/IMG-3866.jpg", story: `【凌晨电台 FM 94.5】“今夜首尔气温 14°C，有微雨。祝那个还没睡的人，能梦到想见的人。”` }
                ],
                posts: [
                    {
                        id: 1,
                        isMe: false,
                        author: charName,
                        loc: "SEOUL · 한남동",
                        time: "18分钟前",
                        filmNo: "KODAK TRI-X 400 · #01",
                        photoDesc: `灰白色的雨夜车窗外，街角便利店的冷白灯光映在后视镜里，${charName} 的指尖搭在方向盘上，副驾驶座放着给你带的热饮。`,
                        imgUrl: "",
                        text: "비가 오니까 또 네 생각이 나네.\n下雨了，又不可避免地想起你。",
                        liked: true,
                        likesCount: 42,
                        comments: [
                            { who: "共同好友", text: "这副驾驶的位置永远是专属预留啊。" },
                            { who: charName, text: "嗯，不载别人。" }
                        ]
                    }
                ]
            };
        }

        function getFeedData() {
            const c = getCtx(), key = getFeedKey();
            try {
                const raw = localStorage.getItem(key);
                if (!raw) {
                    const init = createDefaultFeed(c.charName);
                    localStorage.setItem(key, JSON.stringify(init));
                    return init;
                }
                return Object.assign(createDefaultFeed(c.charName), JSON.parse(raw));
            } catch (e) {
                return createDefaultFeed(c.charName);
            }
        }

        function saveFeedData(data) {
            localStorage.setItem(getFeedKey(), JSON.stringify(data));
        }

        let currentFilter = "all";
        let observedCharScope = "";

        // 7. 渲染顶部 1px 双层留白圆头像栏 + 下方无边框感韩系画报动态流
        function renderKrMoments() {
            const c = getCtx(), data = getFeedData();
            observedCharScope = c.safeScope;

            const filterCharBtn = topDoc.getElementById("smt-filter-char-btn");
            if (filterCharBtn) filterCharBtn.textContent = `ONLY · ${c.charName}`;

            const friends = data.friends || createDefaultFeed(c.charName).friends;
            const storiesBar = topDoc.getElementById("smt-ins-stories-bar");

            storiesBar.innerHTML = `
                <!-- 1. 我的圆头像 + 头顶云朵气泡 -->
                <div class="kr-note-unit" id="smt-story-me">
                    <div class="kr-thought-pill">${data.myNote || "状态"}</div>
                    <div class="kr-ava-ring">
                        <div class="kr-ava-inner"><img src="${c.userAvatar}" /></div>
                        <span class="kr-ava-badge">${KR_ICO.plus}</span>
                    </div>
                    <div class="kr-unit-name">${c.userName}</div>
                </div>

                <!-- 2. TA 的圆头像（1.3px 深灰呼吸细环 + 头顶实时思绪云朵气泡） -->
                <div class="kr-note-unit" id="smt-story-char">
                    <div class="kr-thought-pill active-char">${data.charNote || "네 생각"}</div>
                    <div class="kr-ava-ring unread">
                        <div class="kr-ava-inner"><img src="${c.charAvatar}" /></div>
                    </div>
                    <div class="kr-unit-name" style="color:#2C2C32!important;font-weight:700!important;">${c.charName}</div>
                </div>

                <!-- 3~5. 韩国摄影风真实感好友/电台圆头像（全部采用灰调摄影头像 + 1px 细环） -->
                ${friends.map((fr, idx) => `
                    <div class="kr-note-unit" data-fridx="${idx}">
                        <div class="kr-thought-pill">${fr.note}</div>
                        <div class="kr-ava-ring">
                            <div class="kr-ava-inner"><img src="${fr.ava}" /></div>
                        </div>
                        <div class="kr-unit-name">${fr.name}</div>
                    </div>
                `).join("")}
            `;

            // 点击我的圆头像：改头顶思绪气泡
            topDoc.getElementById("smt-story-me").onclick = () => {
                const d = getFeedData();
                const v = prompt("修改你头顶的思绪小气泡（8字以内）：", d.myNote || "조용한 밤");
                if (v && v.trim()) { d.myNote = v.trim().slice(0, 10); saveFeedData(d); renderKrMoments(); }
            };

            // 点击 TA 的圆头像：展开看 TA 的限时快拍 Story，并可让 AI 刷新
            const viewer = topDoc.getElementById("smt-story-viewer");
            topDoc.getElementById("smt-story-char").onclick = () => {
                const d = getFeedData();
                viewer.style.display = "block";
                viewer.innerHTML = `
                    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
                        <div style="display:flex;align-items:center;gap:8px;">
                            <img src="${c.charAvatar}" style="width:24px;height:24px;border-radius:50%;object-fit:cover;border:1px solid #DCDCE4;" />
                            <span style="font-size:9.5px;font-weight:700;color:#2C2C32;letter-spacing:.3px;">${c.charName} · 24H STORY ARCHIVE</span>
                        </div>
                        <div style="display:flex;gap:5px;align-items:center;">
                            <span class="smt-pill-btn dark" id="smt-story-ai-gen" style="height:20px!important;font-size:8px!important;">↻ 刷新快拍</span>
                            <span id="smt-story-close" style="cursor:pointer;font-size:11px;color:#8E8E98;padding:0 4px;">✕</span>
                        </div>
                    </div>
                    <div style="font-size:10.5px;line-height:1.7;color:#3A3A40;background:#FFFFFF;border:1px solid #EAEAF0;border-radius:12px;padding:12px 14px;">${d.charStory}</div>
                `;
                viewer.querySelector("#smt-story-close").onclick = () => (viewer.style.display = "none");
                viewer.querySelector("#smt-story-ai-gen").onclick = async (ev) => {
                    ev.target.textContent = "⏳ 刷新中...";
                    try {
                        const raw = await askAI(`你是${c.charName}。人设：${c.charDesc.slice(0, 900)}`, `请生成一条你在社交软件顶部 24 小时限时快拍(Story)里随手发的灰白氛围画面，以及你头顶的6字以内思绪气泡词。严格只输出JSON：{"note":"6字以内思绪词(如:보고싶어/刚结束工作)","story":"55字以内描述你拍下的快拍画面与配文"}`);
                        const m = raw.match(/\{[\s\S]*\}/);
                        if (m) {
                            const obj = JSON.parse(m[0]), latest = getFeedData();
                            latest.charNote = obj.note || "네 생각";
                            latest.charStory = obj.story || latest.charStory;
                            saveFeedData(latest);
                            renderKrMoments();
                            topDoc.getElementById("smt-story-char").click();
                        }
                    } catch (err) { alert(err.message); }
                };
            };

            // 点击好友/电台圆头像
            storiesBar.querySelectorAll("[data-fridx]").forEach((el) => {
                el.onclick = () => {
                    const idx = Number(el.getAttribute("data-fridx")), fr = friends[idx];
                    if (!fr) return;
                    viewer.style.display = "block";
                    viewer.innerHTML = `
                        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
                            <b style="font-size:9.5px;color:#3A3A40;">${fr.name} · STORY</b>
                            <span id="smt-fr-st-close" style="cursor:pointer;color:#8E8E98;">✕</span>
                        </div>
                        <div style="font-size:10.5px;line-height:1.65;color:#484852;background:#FFF;border:1px solid #EAEAF0;border-radius:11px;padding:11px 12px;">${fr.story}</div>
                    `;
                    viewer.querySelector("#smt-fr-st-close").onclick = () => (viewer.style.display = "none");
                };
            });

            // 渲染下方韩系无框感画报动态流
            const stream = topDoc.getElementById("smt-mom-stream");
            const posts = (data.posts || []).filter((p) => currentFilter === "all" || !p.isMe);
            if (!posts.length) {
                stream.innerHTML = `<div style="text-align:center;padding:44px 16px;font-size:10px;color:#9A9AA5;letter-spacing:.5px;">NO MOMENTS YET · 点击右上角「让TA发帖」生成动态</div>`;
                return;
            }

            stream.innerHTML = posts.map((p, idx) => {
                const ava = p.isMe ? c.userAvatar : c.charAvatar;
                const name = p.isMe ? c.userName : c.charName;
                const cmtsHtml = (p.comments && p.comments.length) ? `
                    <div class="kr-cmt-list">
                        ${p.comments.map((cm) => `<div style="margin-bottom:3px;"><b style="color:#2C2C32;margin-right:5px;">${cm.who}</b><span style="color:#55555E;">${cm.text.replace(/</g, "&lt;")}</span></div>`).join("")}
                    </div>` : "";

                return `
                    <div class="kr-clean-post">
                        <div class="kr-post-head">
                            <div class="kr-post-user">
                                <img src="${ava}" />
                                <div>
                                    <div style="font-size:11px;font-weight:700;color:#2C2C32;letter-spacing:.2px;">${name}</div>
                                    <div style="font-size:8px;color:#9A9AA5;letter-spacing:.4px;margin-top:1px;">${p.loc || "SEOUL"} · ${p.time || "刚刚"}</div>
                                </div>
                            </div>
                            <span data-insdel="${p.id}" style="cursor:pointer;padding:4px;" title="删除此条动态">${KR_ICO.more}</span>
                        </div>

                        <div class="kr-film-frame">
                            <div class="kr-film-meta">
                                <span>${p.filmNo || `ARCHIVE · 0${idx + 1}`}</span>
                                <span>MONOCHROME</span>
                            </div>
                            ${p.imgUrl && /^https?:|^data:/.test(p.imgUrl) ? `<img class="real-photo" src="${p.imgUrl}" />` : ""}
                            ${p.photoDesc ? `<div class="kr-film-scene">${p.photoDesc.replace(/</g, "&lt;")}</div>` : ""}
                        </div>

                        <div class="kr-post-bar">
                            <div style="display:flex;align-items:center;gap:14px;">
                                <span data-inslike="${p.id}" style="cursor:pointer;display:inline-flex;align-items:center;gap:5px;">
                                    ${p.liked ? KR_ICO.heartFill : KR_ICO.heart}
                                    <b style="font-size:10px;color:#2C2C32;">${p.likesCount || 24}</b>
                                </span>
                                <span data-inscmt="${p.id}" style="cursor:pointer;display:inline-flex;align-items:center;gap:4px;">
                                    ${KR_ICO.cmt}
                                    <span style="font-size:9.5px;color:#6E6E77;">${(p.comments || []).length}</span>
                                </span>
                                <span style="cursor:pointer;display:inline-flex;align-items:center;">${KR_ICO.send}</span>
                            </div>
                            <span style="cursor:pointer;display:inline-flex;align-items:center;">${KR_ICO.mark}</span>
                        </div>

                        <div class="kr-post-caption">
                            <div style="white-space:pre-wrap;"><b style="margin-right:6px;">${name}</b>${(p.text || "").replace(/</g, "&lt;")}</div>
                        </div>
                        ${cmtsHtml}
                        <div data-inscmt="${p.id}" style="padding:5px 6px 0 6px;font-size:8.8px;color:#A0A0AA;cursor:pointer;">댓글 달기... 点击写下评论</div>
                    </div>
                `;
            }).join("");

            stream.querySelectorAll("[data-inslike]").forEach((btn) => btn.onclick = () => {
                const pid = Number(btn.getAttribute("data-inslike")), d = getFeedData();
                const target = d.posts.find((x) => x.id === pid);
                if (target) {
                    target.liked = !target.liked;
                    target.likesCount = Math.max(1, (target.likesCount || 10) + (target.liked ? 1 : -1));
                    saveFeedData(d); renderKrMoments();
                }
            });

            stream.querySelectorAll("[data-insdel]").forEach((btn) => btn.onclick = () => {
                if (!confirm("删除这条动态吗？")) return;
                const pid = Number(btn.getAttribute("data-insdel")), d = getFeedData();
                d.posts = d.posts.filter((x) => x.id !== pid);
                saveFeedData(d); renderKrMoments();
            });

            stream.querySelectorAll("[data-inscmt]").forEach((btn) => btn.onclick = async () => {
                const pid = Number(btn.getAttribute("data-inscmt")), d = getFeedData();
                const target = d.posts.find((x) => x.id === pid);
                if (!target) return;
                const txt = prompt(`评论 ${target.author}：`);
                if (!txt || !txt.trim()) return;
                const ctx = getCtx();
                target.comments = target.comments || [];
                target.comments.push({ who: ctx.userName, text: txt.trim() });
                saveFeedData(d); renderKrMoments();

                try {
                    const aiReply = await askAI(
                        `你是${ctx.charName}。人设：${ctx.charDesc.slice(0, 1000)}\n近期剧情：${ctx.recentChat}`,
                        `在动态「${target.text}（画面：${target.photoDesc || ""}）」下方，${ctx.userName}评论了：“${txt.trim()}”。请以${ctx.charName}的口吻直接回复一条简短评论(35字以内，不要引号)：`
                    );
                    const latest = getFeedData();
                    const t2 = latest.posts.find((x) => x.id === pid);
                    if (t2) {
                        t2.comments.push({ who: `${ctx.charName} ▸ ${ctx.userName}`, text: aiReply });
                        saveFeedData(latest); renderKrMoments();
                    }
                } catch (e) {}
            });
        }

        // 8. 切换筛选、发布动态与 AI 生成新帖
        spacePage.querySelectorAll("[data-feedfilter]").forEach((b) => b.onclick = () => {
            spacePage.querySelectorAll("[data-feedfilter]").forEach((x) => x.classList.remove("active"));
            b.classList.add("active");
            currentFilter = b.getAttribute("data-feedfilter");
            renderKrMoments();
        });

        const postDrawer = topDoc.getElementById("smt-mom-post-drawer");
        topDoc.getElementById("smt-mom-user-post").onclick = () => {
            postDrawer.style.display = postDrawer.style.display === "none" ? "block" : "none";
        };
        topDoc.getElementById("smt-mom-post-cancel").onclick = () => (postDrawer.style.display = "none");

        topDoc.getElementById("smt-mom-post-submit").onclick = async () => {
            const txt = topDoc.getElementById("smt-mom-post-txt").value.trim();
            const imgInput = topDoc.getElementById("smt-mom-post-img").value.trim();
            if (!txt && !imgInput) return alert("请填写动态文案或配图画面！");
            const c = getCtx(), d = getFeedData();
            const isUrl = /^https?:|^data:/.test(imgInput);
            const newPost = {
                id: Date.now(),
                isMe: true,
                author: c.userName,
                loc: "SEOUL",
                time: "刚刚",
                filmNo: "MY FILM · 35MM",
                text: txt,
                imgUrl: isUrl ? imgInput : "",
                photoDesc: isUrl ? "" : (imgInput || "随手定格的日常瞬间"),
                liked: true,
                likesCount: 16,
                comments: []
            };
            d.posts.unshift(newPost);
            saveFeedData(d);
            topDoc.getElementById("smt-mom-post-txt").value = "";
            topDoc.getElementById("smt-mom-post-img").value = "";
            postDrawer.style.display = "none";
            renderKrMoments();

            try {
                const aiReply = await askAI(
                    `你是${c.charName}。人设：${c.charDesc.slice(0, 1000)}\n近期剧情：${c.recentChat}`,
                    `${c.userName}刚发了一条动态：“${txt}”（配图：${imgInput || "日常随手拍"}）。请以${c.charName}的身份在底下留一条评论(35字以内)：`
                );
                const latest = getFeedData();
                const target = latest.posts.find((x) => x.id === newPost.id);
                if (target) {
                    target.comments.push({ who: c.charName, text: aiReply });
                    saveFeedData(latest); renderKrMoments();
                }
            } catch (e) {}
        };

        topDoc.getElementById("smt-mom-ai-post").onclick = async (e) => {
            const c = getCtx();
            e.target.textContent = "⏳ 生成中...";
            try {
                const raw = await askAI(
                    `你是${c.charName}。人设：${c.charDesc.slice(0, 1100)}\n近期剧情：${c.recentChat}`,
                    `请在你的个人社交主页发一条新动态（韩国清冷白灰文艺风，暗戳戳或直接与${c.userName}有关）。严格只输出JSON：{"loc":"首尔地点","note":"你头顶的6字以内思绪气泡词","photoDesc":"45字以内的照片画面细腻描写","text":"动态正文(含1句韩文+中文翻译)","friendName":"1位共同好友的名字","friendComment":"该好友在底下的评论"}`
                );
                const m = raw.match(/\{[\s\S]*\}/);
                if (m) {
                    const obj = JSON.parse(m[0]), d = getFeedData();
                    if (obj.note) d.charNote = obj.note;
                    d.posts.unshift({
                        id: Date.now(),
                        isMe: false,
                        author: c.charName,
                        loc: obj.loc || "SEOUL",
                        time: "刚刚",
                        filmNo: "KODAK 400 · ARCHIVE",
                        photoDesc: obj.photoDesc || "",
                        imgUrl: "",
                        text: obj.text || "",
                        liked: false,
                        likesCount: Math.floor(Math.random() * 50) + 20,
                        comments: obj.friendComment ? [{ who: obj.friendName || "好友", text: obj.friendComment }] : []
                    });
                    saveFeedData(d);
                    renderKrMoments();
                }
            } catch (err) { alert(err.message); }
            finally { e.target.textContent = "✦ 让TA发帖"; }
        };

        // 9. 绑定主页【情侣空间 App】跳转与角色切换自动刷新
        function openStandaloneCoupleApp() {
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
                topDoc.querySelector('.smt-tab-item[data-page="home"]')?.click();
            }
        }, true);

        // 实时检测角色切换：一旦你在酒馆切换了角色，动态流立即自动切换为新角色的独立动态！
        setInterval(() => {
            if (!modal.classList.contains("smt-open")) return;
            const cur = getCtx().safeScope;
            if (cur && cur !== observedCharScope) {
                renderKrMoments();
            }
        }, 1200);

        tab2?.addEventListener("click", () => setTimeout(renderKrMoments, 30));
        renderKrMoments();
    }

    mountKoreanPureMoments();
})();
