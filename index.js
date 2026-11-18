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
// 🤍 【Sumoul App 强行破壁接管补丁：全新韩国杂志画报级动态流 + 泪水折线慢连结开屏 + 满配独立情侣空间】
// 特性：自带防覆盖霸权锁，无视前面残留的旧补丁，粘在 index.js 最末尾 100% 立即生效！
// ==========================================================================
(function () {
    const topWin = window.parent || window;
    const topDoc = topWin.document;

    // 停掉之前旧补丁可能残留的冲突标记
    topWin.__SUMOUL_V25_ACTIVE = true;

    function forceMountV25() {
        const modal = topDoc.getElementById("seoul-mini-theater-modal");
        const spacePage = topDoc.getElementById("smt-page-space");
        const homePage = topDoc.getElementById("smt-page-home");
        const fsBody = modal?.querySelector(".smt-fs-body");
        if (!modal || !spacePage || !homePage || !fsBody) {
            setTimeout(forceMountV25, 200);
            return;
        }

        // 1. 挂载防崩隐形护盾（防止主代码找不到旧ID报错）
        if (!topDoc.getElementById("smt-legacy-shield")) {
            const shield = topDoc.createElement("div");
            shield.id = "smt-legacy-shield";
            shield.style.cssText = "display:none!important;";
            [
                "smt-sp-hero-card", "smt-sp-char-scope-tag", "smt-sp-uava", "smt-sp-cava", "smt-sp-uname", "smt-sp-cname",
                "smt-sp-days", "smt-sp-mood", "smt-sp-couple-names", "smt-sp-live-bio", "smt-stat-pet", "smt-stat-petname",
                "smt-stat-fund", "smt-badge-pet", "smt-badge-bpm", "smt-badge-coupon", "smt-badge-todo", "smt-ab-ins-grid",
                "smt-ins-detail-pop", "smt-pet-name", "smt-pet-lv", "smt-pet-hunger-txt", "smt-pet-hunger-bar",
                "smt-pet-mood-txt", "smt-pet-mood-bar", "smt-pet-log", "smt-4cut-stage", "smt-qa-q", "smt-qa-my-txt",
                "smt-qa-char-label", "smt-qa-char-txt", "smt-mood-stage", "smt-coupon-list", "smt-coupon-log",
                "smt-sp-notes-list", "smt-sp-todo-list"
            ].forEach((id) => {
                const d = topDoc.createElement("div");
                d.id = id;
                shield.appendChild(d);
            });
            modal.appendChild(shield);
        }

        // 2. 注入全新「韩国独立摄影杂志风动态流 + 泪水折线慢连结开屏」最高权重 CSS
        ["sumoul-moments-css", "sumoul-ins-feed-css", "sumoul-minimal-space-css", "sumoul-v25-master-css"].forEach((id) => topDoc.getElementById(id)?.remove());
        const st = topDoc.createElement("style");
        st.id = "sumoul-v25-master-css";
        st.innerHTML = `
            /* ── 💧 泪水折线缓慢连结开屏动画 ── */
            @keyframes v25TearDraw {
                0% { stroke-dashoffset: 360; opacity: 0.15; }
                15% { opacity: 1; }
                100% { stroke-dashoffset: 0; opacity: 1; }
            }
            @keyframes v25NodeBead {
                0% { transform: scale(0); opacity: 0; }
                65% { transform: scale(1.3); opacity: 1; }
                100% { transform: scale(1); opacity: 0.9; }
            }
            @keyframes v25DropFall {
                0% { transform: translateY(-8px) scale(0.2); opacity: 0; }
                60% { transform: translateY(1.5px) scale(1.05); opacity: 1; }
                100% { transform: translateY(0px) scale(1); opacity: 1; }
            }
            @keyframes v25Ripple {
                0% { r: 2px; opacity: 0.75; stroke-width: 1.3px; }
                100% { r: 19px; opacity: 0; stroke-width: 0.2px; }
            }
            #seoul-mini-theater-modal #smt-boot-splash .v25-tear-line {
                stroke-dasharray: 360 !important;
                stroke-dashoffset: 360 !important;
                animation: v25TearDraw 3.4s cubic-bezier(0.32, 0, 0.2, 1) forwards !important;
            }
            #seoul-mini-theater-modal #smt-boot-splash .v25-bead {
                transform-box: fill-box !important;
                transform-origin: center !important;
                opacity: 0 !important;
            }
            #seoul-mini-theater-modal #smt-boot-splash .v25-bead.b1 { animation: v25NodeBead 0.55s ease 0.3s forwards !important; }
            #seoul-mini-theater-modal #smt-boot-splash .v25-bead.b2 { animation: v25NodeBead 0.55s ease 0.95s forwards !important; }
            #seoul-mini-theater-modal #smt-boot-splash .v25-bead.b3 { animation: v25NodeBead 0.55s ease 1.55s forwards !important; }
            #seoul-mini-theater-modal #smt-boot-splash .v25-bead.b4 { animation: v25NodeBead 0.55s ease 2.15s forwards !important; }
            #seoul-mini-theater-modal #smt-boot-splash .v25-bead.b5 { animation: v25NodeBead 0.55s ease 2.70s forwards !important; }
            #seoul-mini-theater-modal #smt-boot-splash .v25-tear-drop {
                transform-box: fill-box !important;
                transform-origin: center top !important;
                opacity: 0 !important;
                animation: v25DropFall 0.85s cubic-bezier(0.22, 1, 0.36, 1) 2.95s forwards !important;
            }
            #seoul-mini-theater-modal #smt-boot-splash .v25-rip-1 { opacity: 0 !important; animation: v25Ripple 2.6s ease-out 3.2s infinite !important; }
            #seoul-mini-theater-modal #smt-boot-splash .v25-rip-2 { opacity: 0 !important; animation: v25Ripple 2.6s ease-out 4.1s infinite !important; }

            /* ── 底部第2栏图标 ── */
            #seoul-mini-theater-modal .smt-tab-item[data-page="space"] .smt-tab-ico {
                background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%237A7A85' stroke-width='1.7' stroke-linecap='round' stroke-linejoin='round'%3E%3Crect x='3' y='3' width='18' height='18' rx='5'/%3E%3Ccircle cx='12' cy='12' r='4'/%3E%3Ccircle cx='17.5' cy='6.5' r='1' fill='%237A7A85'/%3E%3C/svg%3E") !important;
            }
            #seoul-mini-theater-modal .smt-tab-item[data-page="space"].active .smt-tab-ico {
                background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%232C2C32' stroke-width='2.1' stroke-linecap='round' stroke-linejoin='round'%3E%3Crect x='3' y='3' width='18' height='18' rx='5'/%3E%3Ccircle cx='12' cy='12' r='4'/%3E%3Ccircle cx='17.5' cy='6.5' r='1' fill='%232C2C32'/%3E%3C/svg%3E") !important;
            }

            /* ── 1. 顶部纯白无底色头像栏 + 纯白无边框放大版椭圆泡泡 ── */
            #seoul-mini-theater-modal #smt-page-space { padding: 0 !important; gap: 0 !important; background: #FFFFFF !important; }
            #seoul-mini-theater-modal .v25-stories-row {
                display: flex !important; align-items: flex-end !important; gap: 15px !important;
                overflow-x: auto !important; padding: 26px 8px 13px 8px !important;
                background: #FFFFFF !important; border-bottom: 1px solid #F0F0F5 !important;
                flex-shrink: 0 !important; scrollbar-width: none !important;
            }
            #seoul-mini-theater-modal .v25-stories-row::-webkit-scrollbar { display: none !important; }
            #seoul-mini-theater-modal .v25-story-cell {
                display: flex !important; flex-direction: column !important; align-items: center !important;
                position: relative !important; cursor: pointer !important; flex-shrink: 0 !important; width: 64px !important;
            }
            /* 纯白无边框微放大椭圆冒泡 */
            #seoul-mini-theater-modal .v25-white-bubble {
                position: absolute !important; top: -15px !important; left: 50% !important; transform: translateX(-50%) !important;
                background: #FFFFFF !important; background-color: #FFFFFF !important; border: none !important;
                border-radius: 22px !important; padding: 5.5px 12px !important; z-index: 6 !important;
                box-shadow: 0 4px 14px rgba(20, 20, 30, 0.11), 0 1px 4px rgba(20, 20, 30, 0.05) !important;
                display: inline-flex !important; align-items: center !important; justify-content: center !important; min-width: 42px !important;
            }
            #seoul-mini-theater-modal .v25-white-bubble span {
                display: block !important; font-size: 9.3px !important; font-weight: 700 !important; color: #2C2C32 !important;
                white-space: nowrap !important; max-width: 70px !important; overflow: hidden !important; text-overflow: ellipsis !important; line-height: 1.15 !important;
            }
            #seoul-mini-theater-modal .v25-white-bubble.muted span { color: #8E8E98 !important; font-size: 8.8px !important; }
            #seoul-mini-theater-modal .v25-white-bubble::before {
                content: "" !important; position: absolute !important; bottom: -4px !important; left: 13px !important;
                width: 7.5px !important; height: 7.5px !important; border-radius: 50% !important;
                background: #FFFFFF !important; border: none !important; box-shadow: 0 3px 5px rgba(20, 20, 30, 0.07) !important; z-index: -1 !important;
            }
            #seoul-mini-theater-modal .v25-white-bubble::after {
                content: "" !important; position: absolute !important; bottom: -8px !important; left: 17px !important;
                width: 4.2px !important; height: 4.2px !important; border-radius: 50% !important;
                background: #FFFFFF !important; border: none !important; box-shadow: 0 2px 3px rgba(20, 20, 30, 0.08) !important; z-index: -2 !important;
            }

            /* 柔炭黑半透明头像环 */
            #seoul-mini-theater-modal .v25-ring {
                width: 56px !important; height: 56px !important; border-radius: 50% !important; padding: 2.5px !important;
                background: #FFFFFF !important; border: 1.4px solid rgba(58, 58, 64, 0.22) !important;
                display: flex !important; align-items: center !important; justify-content: center !important; box-sizing: border-box !important; position: relative !important;
            }
            #seoul-mini-theater-modal .v25-ring.active-char {
                border: 1.7px solid rgba(58, 58, 64, 0.55) !important;
            }
            #seoul-mini-theater-modal .v25-ring-in {
                width: 100% !important; height: 100% !important; border-radius: 50% !important; overflow: hidden !important;
                background: #F4F4F8 !important; display: flex !important; align-items: center !important; justify-content: center !important;
            }
            #seoul-mini-theater-modal .v25-ring-in img { width: 100% !important; height: 100% !important; object-fit: cover !important; display: block !important; }
            #seoul-mini-theater-modal .v25-plus-dot {
                position: absolute !important; right: -1px !important; bottom: -1px !important; width: 18px !important; height: 18px !important;
                border-radius: 50% !important; background: #484852 !important; border: 2px solid #FFFFFF !important;
                display: flex !important; align-items: center !important; justify-content: center !important; z-index: 4 !important;
            }
            #seoul-mini-theater-modal .v25-story-label {
                font-size: 9px !important; font-weight: 700 !important; color: #2C2C32 !important; margin-top: 6px !important;
                white-space: nowrap !important; overflow: hidden !important; text-overflow: ellipsis !important; max-width: 62px !important;
            }

            /* ── 2. 全新样式：韩国独立杂志画报风动态流 (K-Magazine Editorial Feed) ── */
            #seoul-mini-theater-modal .v25-filter-bar {
                display: flex !important; align-items: center !important; justify-content: space-between !important;
                padding: 9px 6px !important; border-bottom: 1px solid #F2F2F6 !important; background: #FFFFFF !important; flex-shrink: 0 !important;
            }
            #seoul-mini-theater-modal .v25-mag-post {
                background: #FFFFFF !important;
                border-bottom: 1px solid #EAEAF0 !important;
                padding: 18px 4px 20px 4px !important;
            }
            #seoul-mini-theater-modal .v25-mag-head {
                display: flex !important; align-items: center !important; justify-content: space-between !important;
                margin-bottom: 12px !important; padding: 0 4px !important;
            }
            #seoul-mini-theater-modal .v25-mag-author {
                display: flex !important; align-items: center !important; gap: 10px !important;
            }
            #seoul-mini-theater-modal .v25-mag-ava {
                width: 38px !important; height: 38px !important; border-radius: 50% !important;
                object-fit: cover !important; border: 1px solid rgba(58,58,64,0.25) !important; padding: 2px !important; background: #FFF !important;
            }
            /* 银盐灰白杂志画报相纸框（带四角极细取景准星与胶片编号） */
            #seoul-mini-theater-modal .v25-mag-canvas {
                background: linear-gradient(180deg, #F7F7FA 0%, #EFEFF4 100%) !important;
                border: 1px solid #E4E4EC !important;
                border-radius: 4px !important;
                padding: 26px 20px 22px 20px !important;
                margin: 0 2px 12px 2px !important;
                position: relative !important;
            }
            #seoul-mini-theater-modal .v25-mag-canvas::before {
                content: "⌜" !important; position: absolute !important; top: 6px !important; left: 8px !important;
                font-size: 11px !important; color: #9A9AA5 !important; line-height: 1 !important; pointer-events: none !important;
            }
            #seoul-mini-theater-modal .v25-mag-canvas::after {
                content: "⌟" !important; position: absolute !important; bottom: 6px !important; right: 8px !important;
                font-size: 11px !important; color: #9A9AA5 !important; line-height: 1 !important; pointer-events: none !important;
            }
            #seoul-mini-theater-modal .v25-mag-canvas img.v25-real-img {
                width: 100% !important; max-height: 240px !important; object-fit: cover !important;
                border-radius: 3px !important; display: block !important; margin-bottom: 12px !important;
            }
            #seoul-mini-theater-modal .v25-canvas-top {
                display: flex !important; justify-content: space-between !important; align-items: center !important;
                font-size: 7.5px !important; font-weight: 700 !important; color: #8E8E98 !important;
                letter-spacing: 1.6px !important; font-family: monospace !important; margin-bottom: 14px !important;
            }
            #seoul-mini-theater-modal .v25-canvas-desc {
                font-size: 11px !important; font-weight: 600 !important; line-height: 1.75 !important;
                color: #3A3A40 !important; text-align: center !important; padding: 4px 8px !important;
            }
            /* INS 原版极简图标操作栏 */
            #seoul-mini-theater-modal .v25-mag-tools {
                display: flex !important; align-items: center !important; justify-content: space-between !important;
                padding: 2px 6px 8px 6px !important;
            }
            #seoul-mini-theater-modal .v25-mag-text {
                padding: 0 6px !important; font-size: 11.5px !important; font-weight: 600 !important;
                line-height: 1.65 !important; color: #2C2C32 !important;
            }
            /* 左侧竖线缩进式高冷评论区 */
            #seoul-mini-theater-modal .v25-mag-cmts {
                margin: 10px 6px 0 6px !important; padding: 6px 0 2px 10px !important;
                border-left: 2px solid #E2E2EA !important; font-size: 10.2px !important; font-weight: 600 !important; line-height: 1.6 !important;
            }

            /* ── 3. 严格控制独立情侣空间 App 仅在激活时显示，绝不串页！ ── */
            #seoul-mini-theater-modal #smt-page-couple_app {
                display: none !important; flex-direction: column !important; flex: 1 !important;
                min-height: 0 !important; overflow-y: auto !important; padding: 2px 2px 20px 2px !important; gap: 11px !important;
            }
            #seoul-mini-theater-modal #smt-page-couple_app.active { display: flex !important; }
            #seoul-mini-theater-modal .cp-hero-box { background: #F8F8FA !important; border: 1px solid #EAEAF0 !important; border-radius: 22px !important; padding: 15px !important; background-size: cover !important; background-position: center !important; flex-shrink: 0 !important; }
            #seoul-mini-theater-modal .cp-hero-glass { background: rgba(255, 255, 255, 0.94) !important; border: 1px solid #EFEFF4 !important; border-radius: 17px !important; padding: 16px 12px 13px 12px !important; }
            #seoul-mini-theater-modal .cp-live-row { display: grid !important; grid-template-columns: 1.15fr 0.85fr !important; gap: 9px !important; flex-shrink: 0 !important; }
            #seoul-mini-theater-modal .cp-live-card { background: #F8F8FA !important; border: 1px solid #EAEAF0 !important; border-radius: 17px !important; padding: 12px 13px !important; cursor: pointer !important; display: flex !important; flex-direction: column !important; justify-content: space-between !important; }
            #seoul-mini-theater-modal .cp-bento-grid { display: grid !important; grid-template-columns: 1fr 1fr !important; gap: 9px !important; flex-shrink: 0 !important; }
            #seoul-mini-theater-modal .cp-bento-card { background: #F8F8FA !important; border: 1px solid #EAEAF0 !important; border-radius: 18px !important; padding: 13px 14px !important; cursor: pointer !important; display: flex !important; flex-direction: column !important; justify-content: space-between !important; min-height: 88px !important; }
            #seoul-mini-theater-modal .cp-bento-top { display: flex !important; align-items: center !important; justify-content: space-between !important; margin-bottom: 9px !important; }
            #seoul-mini-theater-modal .cp-bento-ico { width: 38px !important; height: 38px !important; border-radius: 12px !important; background: #FFFFFF !important; border: 1px solid #E6E6EC !important; display: flex !important; align-items: center !important; justify-content: center !important; }
            #seoul-mini-theater-modal .cp-bento-badge { font-size: 8px !important; font-weight: 700 !important; color: #484852 !important; background: #FFFFFF !important; border: 1px solid #EAEAF0 !important; border-radius: 99px !important; padding: 2.5px 8px !important; }
            #seoul-mini-theater-modal .smt-ticket-card { display: flex !important; align-items: stretch !important; background: #FFFFFF !important; border: 1px solid #E6E6EC !important; border-radius: 13px !important; margin-bottom: 8px !important; overflow: hidden !important; }
            #seoul-mini-theater-modal .smt-ticket-left { flex: 1 !important; padding: 10px 12px !important; border-right: 1.5px dashed #E4E4EC !important; }
            #seoul-mini-theater-modal .smt-ticket-right { width: 72px !important; background: #F8F8FA !important; display: flex !important; flex-direction: column !important; align-items: center !important; justify-content: center !important; padding: 6px !important; cursor: pointer !important; }
        `;
        topDoc.head.appendChild(st);

        // 3. 挂载「泪水折线缓慢连结」开屏动画
        const splash = topDoc.getElementById("smt-boot-splash");
        function renderTearBootSplash() {
            if (!splash) return;
            splash.style.cssText = "position:absolute!important;inset:0!important;background:linear-gradient(180deg,#FFFFFF 0%,#F5F5F8 58%,#ECECF0 100%)!important;z-index:10!important;display:flex!important;flex-direction:column!important;align-items:center!important;justify-content:center!important;transition:opacity 0.65s ease!important;padding:24px!important;text-align:center!important;cursor:pointer!important;";
            splash.innerHTML = `
                <div style="border:1px solid #E2E2EA!important;border-radius:6px!important;padding:34px 26px 28px 26px!important;background:rgba(255,255,255,0.86)!important;max-width:286px!important;width:100%!important;box-sizing:border-box!important;position:relative!important;box-shadow:0 12px 32px rgba(30,30,40,0.03)!important;">
                    <div style="display:flex;justify-content:space-between;align-items:center;font-size:7.5px;color:#9A9AA5!important;letter-spacing:2px;font-family:monospace;border-bottom:1px solid #EFEFF4!important;padding-bottom:8px;margin-bottom:18px;">
                        <span>SUMOUL APP</span><span>TEAR TRACE · 04:00</span>
                    </div>
                    <div style="width:100%;height:112px;display:flex;align-items:center;justify-content:center;margin:4px 0 14px 0;">
                        <svg viewBox="0 0 220 108" width="210" height="104" fill="none" xmlns="http://www.w3.org/2000/svg" style="overflow:visible!important;">
                            <defs>
                                <linearGradient id="v25LineG" x1="24" y1="12" x2="186" y2="82" gradientUnits="userSpaceOnUse">
                                    <stop offset="0%" stop-color="#C8C8D2" /><stop offset="55%" stop-color="#7A7A85" /><stop offset="100%" stop-color="#3A3A40" />
                                </linearGradient>
                                <linearGradient id="v25DropG" x1="184" y1="68" x2="184" y2="92" gradientUnits="userSpaceOnUse">
                                    <stop offset="0%" stop-color="#FFFFFF" /><stop offset="45%" stop-color="#D8D8E2" /><stop offset="100%" stop-color="#55555E" />
                                </linearGradient>
                            </defs>
                            <polyline points="26,16 66,44 104,24 142,60 166,46 184,70" fill="none" stroke="#E2E2EA" stroke-width="1" stroke-dasharray="2 3.5" stroke-linecap="round" stroke-linejoin="round" />
                            <polyline class="v25-tear-line" points="26,16 66,44 104,24 142,60 166,46 184,70" fill="none" stroke="url(#v25LineG)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <circle class="v25-bead b1" cx="26" cy="16" r="2.3" fill="#FFFFFF" stroke="#8E8E98" stroke-width="1.2" />
                            <circle class="v25-bead b2" cx="66" cy="44" r="2.6" fill="#FFFFFF" stroke="#7A7A85" stroke-width="1.2" />
                            <circle class="v25-bead b3" cx="104" cy="24" r="2.3" fill="#FFFFFF" stroke="#7A7A85" stroke-width="1.2" />
                            <circle class="v25-bead b4" cx="142" cy="60" r="2.8" fill="#FFFFFF" stroke="#55555E" stroke-width="1.3" />
                            <circle class="v25-bead b5" cx="166" cy="46" r="2.3" fill="#FFFFFF" stroke="#484852" stroke-width="1.2" />
                            <circle class="v25-rip-1" cx="184" cy="90" r="3" fill="none" stroke="#8E8E98" />
                            <circle class="v25-rip-2" cx="184" cy="90" r="3" fill="none" stroke="#A0A0AA" />
                            <g class="v25-tear-drop">
                                <path d="M184 69 C184 69 176.5 79.5 176.5 84.5 C176.5 88.8 179.8 92 184 92 C188.2 92 191.5 88.8 191.5 84.5 C191.5 79.5 184 69 184 69 Z" fill="url(#v25DropG)" stroke="#3A3A40" stroke-width="1.25" stroke-linejoin="round" />
                                <path d="M180.5 82.5 C180 84.5 181 87 182.8 88" fill="none" stroke="#FFFFFF" stroke-width="1.2" stroke-linecap="round" />
                            </g>
                        </svg>
                    </div>
                    <div style="font-size:14.5px;font-weight:700;letter-spacing:3px;color:#2C2C32!important;margin-bottom:7px;">눈물의 궤적 · 泪之轨迹</div>
                    <div style="font-size:9.5px;color:#6E6E77!important;line-height:1.85;letter-spacing:0.4px;margin-bottom:20px;">
                        “ 천천히 이어지는 회색빛 눈물의 선,<br>그 끝에서 다시 너를 만난다. ”<br>
                        <span style="font-size:8.2px;color:#9A9AA5!important;display:block;margin-top:4px;">缓慢连结的灰白泪线，在尽头处与你重逢。</span>
                    </div>
                    <div style="display:inline-block;padding:6px 20px;background:#F4F4F8!important;border:1px solid #E2E2EA!important;border-radius:999px;font-size:8px;color:#484852!important;letter-spacing:2px;font-weight:700;">
                        TOUCH TO CONNECT · 触碰连结
                    </div>
                </div>
            `;
            splash.onclick = () => splash.classList.add("fade-out");
        }
        renderTearBootSplash();

        // 4. 矢量图标库
        const mkIco = (d, sz = 18, stroke = "%232C2C32", fill = "none", sw = "1.75") => `<img src="data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='${fill}' stroke='${stroke}' stroke-width='${sw}' stroke-linecap='round' stroke-linejoin='round'%3E${d}%3C/svg%3E" style="width:${sz}px!important;height:${sz}px!important;display:inline-block!important;vertical-align:middle!important;pointer-events:none!important;" />`;
        const V_ICO = {
            heart: mkIco("%3Cpath d='M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z'/%3E", 19, "%232C2C32", "none"),
            heartFill: mkIco("%3Cpath d='M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z'/%3E", 19, "%232C2C32", "%232C2C32"),
            cmt: mkIco("%3Cpath d='M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z'/%3E", 18, "%232C2C32", "none"),
            send: mkIco("%3Cline x1='22' y1='2' x2='11' y2='13'/%3E%3Cpolygon points='22 2 15 22 11 13 2 9 22 2'/%3E", 17, "%232C2C32", "none"),
            mark: mkIco("%3Cpath d='m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z'/%3E", 18, "%232C2C32", "none"),
            more: mkIco("%3Ccircle cx='12' cy='12' r='1.2'/%3E%3Ccircle cx='19' cy='12' r='1.2'/%3E%3Ccircle cx='5' cy='12' r='1.2'/%3E", 15, "%237A7A85", "none", "2.2"),
            dots: mkIco("%3Ccircle cx='12' cy='12' r='1.5' fill='%2355555E'/%3E%3Ccircle cx='18' cy='12' r='1.5' fill='%2355555E'/%3E%3Ccircle cx='6' cy='12' r='1.5' fill='%2355555E'/%3E", 20, "%2355555E", "none", "2"),
            plus: mkIco("%3Cline x1='12' y1='5' x2='12' y2='19'/%3E%3Cline x1='5' y1='12' x2='19' y2='12'/%3E", 10, "%23FFFFFF", "none", "2.5"),
            pin: mkIco("%3Cpath d='M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z'/%3E%3Ccircle cx='12' cy='10' r='3'/%3E", 11, "%238E8E98", "none", "1.8")
        };

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

        function getCtx() {
            let userName = "ME", charName = "", charScopeId = "";
            let userAvatar = "https://i.postimg.cc/rydS6NvG/IMG-3866.jpg", charAvatar = "https://i.postimg.cc/QC3CQ218/IMG-4147.jpg";
            let charDesc = "", recentChat = "", otherChars = [], totalOtherCount = 0;
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
                    } else if (st.name2) { charName = st.name2; charScopeId = st.name2; }
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
                                    story: `【${ch.name} · 限时快拍】最近与你聊过天，更新了一条日常状态。`
                                };
                            })
                            .sort((a, b) => b.sortScore - a.sortScore);
                        totalOtherCount = allOthers.length;
                        otherChars = allOthers.slice(0, 3);
                    }
                }
            } catch (e) {}

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

        // 5. 强行重建 `#smt-page-space` 为全新的「韩国杂志画报级动态流」
        spacePage.innerHTML = `
            <div class="v25-stories-row" id="v25-stories-bar"></div>
            <div id="v25-story-pop" style="display:none;background:#F8F8FA!important;border-bottom:1px solid #EAEAF0!important;padding:12px 14px!important;flex-shrink:0!important;"></div>
            <div class="v25-filter-bar">
                <div style="display:flex;gap:5px;">
                    <span class="smt-pill-btn dark" data-v25filter="all">ALL · 全部画报</span>
                    <span class="smt-pill-btn" data-v25filter="char" id="v25-filter-char">ONLY · TA</span>
                </div>
                <div style="display:flex;gap:5px;">
                    <span class="smt-pill-btn" id="v25-user-post-btn">＋ 我发日常</span>
                    <span class="smt-pill-btn dark" id="v25-ai-post-btn">✦ 让TA发新帖</span>
                </div>
            </div>
            <div id="v25-post-drawer" class="smt-section-box" style="display:none;margin:8px 4px!important;flex-shrink:0;">
                <div style="font-size:9.5px;font-weight:700;color:#2C2C32;margin-bottom:6px;">NEW EDITORIAL · 发布我的新动态</div>
                <textarea id="v25-post-txt" style="width:100%;height:52px;background:#FFF;border:1px solid #E4E4EC;border-radius:9px;padding:7px;font-size:10.5px;font-weight:600;box-sizing:border-box;resize:none;margin-bottom:6px;outline:none;" placeholder="写下一句心情..."></textarea>
                <input type="text" id="v25-post-img" class="smt-wx-input" style="width:100%;height:26px!important;font-size:9.5px!important;box-sizing:border-box;margin-bottom:7px;" placeholder="照片画面描述 或 粘贴图片URL (选填)..." />
                <div style="display:flex;justify-content:flex-end;gap:5px;">
                    <span class="smt-pill-btn" id="v25-post-cancel">取消</span>
                    <span class="smt-pill-btn dark" id="v25-post-submit">发布</span>
                </div>
            </div>
            <div id="v25-feed-stream" style="flex:1;min-height:0;overflow-y:auto;padding-bottom:18px;"></div>
        `;

        function getFeedKey() { return `sumoul_v19_boldfeed__${getCtx().safeScope}`; }
        function getFeedData() {
            const c = getCtx(), key = getFeedKey();
            const def = {
                owner: c.charName, myNote: "", charNote: "想你了",
                charStory: `凌晨 · ${c.charName} 随手拍下窗外灰白色的街景，玻璃上映出半张侧脸，配文：“又到了会想起你的时间。”`,
                posts: [{
                    id: 1, isMe: false, author: c.charName, loc: "SEOUL · 한남동", time: "18分钟前", filmNo: "KODAK 400 · 01",
                    photoDesc: `灰白色的雨夜车窗外，街角便利店的冷白灯光映在后视镜里，${c.charName} 的指尖搭在方向盘上，副驾驶座放着给你带的热饮。`,
                    imgUrl: "", text: "비가 오니까 또 네 생각이 나네. 데리러 갈까?\n下雨了，又想起你。要去接你吗？",
                    liked: true, likesCount: 52, comments: [{ who: "共同好友", text: "这副驾驶的位置永远是专属预留啊😏" }, { who: c.charName, text: "嗯，不载别人。" }]
                }]
            };
            try { return Object.assign(def, JSON.parse(localStorage.getItem(key) || "{}")); } catch (e) { return def; }
        }
        function saveFeedData(d) { localStorage.setItem(getFeedKey(), JSON.stringify(d)); }

        let curFilter = "all";

        function renderV25Feed() {
            const c = getCtx(), data = getFeedData();
            const fBtn = topDoc.getElementById("v25-filter-char");
            if (fBtn) fBtn.textContent = `只看 ${c.charName}`;

            const extraList = c.otherChars.length > 0 ? c.otherChars : [
                { name: "서윤", ava: "https://i.postimg.cc/vmsDSqmk/IMG-3926.jpg", story: `刚冲洗出来的黑白胶卷。` },
                { name: "한남동", ava: "https://i.postimg.cc/MZg2F7Fm/IMG-4150.jpg", story: `玻璃窗上的雨痕与浓缩咖啡。` }
            ];
            const remainCount = Math.max(0, c.totalOtherCount - extraList.length);

            const bar = topDoc.getElementById("v25-stories-bar");
            if (!bar) return;

            const myBub = data.myNote
                ? `<div class="v25-white-bubble"><span>${data.myNote}</span></div>`
                : `<div class="v25-white-bubble muted"><span>想法...</span></div>`;
            const charBub = `<div class="v25-white-bubble"><span>${data.charNote || "想你了"}</span></div>`;

            bar.innerHTML = `
                <div class="v25-story-cell" id="v25-st-me">
                    ${myBub}
                    <div class="v25-ring"><div class="v25-ring-in"><img src="${c.userAvatar}" /></div><span class="v25-plus-dot">${V_ICO.plus}</span></div>
                    <div class="v25-story-label">${c.userName}</div>
                </div>
                <div class="v25-story-cell" id="v25-st-char">
                    ${charBub}
                    <div class="v25-ring active-char"><div class="v25-ring-in"><img src="${c.charAvatar}" /></div></div>
                    <div class="v25-story-label">${c.charName}</div>
                </div>
                ${extraList.map((ch, idx) => `
                    <div class="v25-story-cell" data-v25other="${idx}">
                        <div class="v25-ring"><div class="v25-ring-in"><img src="${ch.ava}" /></div></div>
                        <div class="v25-story-label">${ch.name}</div>
                    </div>
                `).join("")}
                <div class="v25-story-cell" id="v25-st-dots">
                    <div class="v25-ring"><div class="v25-ring-in" style="background:#F6F6FA!important;">${V_ICO.dots}</div></div>
                    <div class="v25-story-label" style="color:#8E8E98!important;">${remainCount > 0 ? `+${remainCount} 更多` : "···"}</div>
                </div>
            `;

            topDoc.getElementById("v25-st-me").onclick = () => {
                const d = getFeedData(), v = prompt("写下你头像上方的纯白想法泡泡（留空则恢复默认）：", d.myNote || "");
                if (v !== null) { d.myNote = v.trim().slice(0, 8); saveFeedData(d); renderV25Feed(); }
            };

            const pop = topDoc.getElementById("v25-story-pop");
            topDoc.getElementById("v25-st-char").onclick = () => {
                const d = getFeedData(); pop.style.display = "block";
                pop.innerHTML = `<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;"><b style="font-size:10px;color:#2C2C32;">${c.charName} · 24H 限时快拍</b><span id="v25-pop-close" style="cursor:pointer;font-weight:700;color:#8E8E98;">✕</span></div><div style="font-size:10.5px;font-weight:600;line-height:1.65;color:#3A3A40;background:#FFF;border:1px solid #EAEAF0;border-radius:11px;padding:10px 12px;">${d.charStory}</div>`;
                pop.querySelector("#v25-pop-close").onclick = () => (pop.style.display = "none");
            };

            bar.querySelectorAll("[data-v25other]").forEach((el) => el.onclick = () => {
                const ch = extraList[Number(el.getAttribute("data-v25other"))]; if (!ch) return;
                pop.style.display = "block";
                pop.innerHTML = `<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;"><b style="font-size:10px;color:#2C2C32;">${ch.name} · 最近聊天快拍</b><span id="v25-pop-close2" style="cursor:pointer;font-weight:700;color:#8E8E98;">✕</span></div><div style="font-size:10.5px;font-weight:600;line-height:1.65;color:#3A3A40;background:#FFF;border:1px solid #EAEAF0;border-radius:11px;padding:10px 12px;">${ch.story}</div>`;
                pop.querySelector("#v25-pop-close2").onclick = () => (pop.style.display = "none");
            });

            topDoc.getElementById("v25-st-dots").onclick = () => {
                pop.style.display = "block";
                pop.innerHTML = `<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;"><b style="font-size:10px;color:#2C2C32;">RECENT CHARS · 最近聊天排序</b><span id="v25-pop-close3" style="cursor:pointer;font-weight:700;color:#8E8E98;">✕</span></div><div style="font-size:10px;font-weight:600;color:#55555E;background:#FFF;border:1px solid #EAEAF0;border-radius:11px;padding:10px 12px;">已按你最近聊天的先后顺序排列（酒馆内共有 ${c.totalOtherCount} 位其他角色）。</div>`;
                pop.querySelector("#v25-pop-close3").onclick = () => (pop.style.display = "none");
            };

            // 渲染全新「韩国独立摄影杂志画报流」
            const stream = topDoc.getElementById("v25-feed-stream");
            const posts = (data.posts || []).filter((p) => curFilter === "all" || !p.isMe);
            if (!posts.length) {
                stream.innerHTML = `<div style="text-align:center;padding:44px 16px;font-size:10.5px;font-weight:700;color:#9A9AA5;">暂无画报动态 · 点击右上角「让TA发新帖」</div>`;
                return;
            }

            stream.innerHTML = posts.map((p, idx) => {
                const ava = p.isMe ? c.userAvatar : c.charAvatar;
                const name = p.isMe ? c.userName : c.charName;
                const cmtsHtml = (p.comments && p.comments.length) ? `
                    <div class="v25-mag-cmts">
                        ${p.comments.map((cm) => `<div style="margin-bottom:3px;"><b style="color:#2C2C32;margin-right:5px;">${cm.who}</b><span style="color:#55555E;">${cm.text.replace(/</g, "&lt;")}</span></div>`).join("")}
                    </div>` : "";

                return `
                    <div class="v25-mag-post">
                        <div class="v25-mag-head">
                            <div class="v25-mag-author">
                                <img class="v25-mag-ava" src="${ava}" />
                                <div>
                                    <div style="font-size:11.5px;font-weight:800;color:#2C2C32;letter-spacing:.2px;">${name}</div>
                                    <div style="display:flex;align-items:center;gap:3px;font-size:8.5px;font-weight:600;color:#8E8E98;margin-top:2px;">
                                        ${V_ICO.pin}<span>${p.loc || "SEOUL"} · ${p.time || "刚刚"}</span>
                                    </div>
                                </div>
                            </div>
                            <div style="display:flex;align-items:center;gap:8px;">
                                <span style="font-size:8px;font-weight:700;color:#9A9AA5;font-family:monospace;">NO.0${idx + 1}</span>
                                <span data-v25del="${p.id}" style="cursor:pointer;padding:4px;">${V_ICO.more}</span>
                            </div>
                        </div>

                        <!-- 杂志级银盐灰白取景画幅 -->
                        <div class="v25-mag-canvas">
                            <div class="v25-canvas-top">
                                <span>${p.filmNo || "MONO ARCHIVE · 35MM"}</span>
                                <span>SEOUL EDITION</span>
                            </div>
                            ${p.imgUrl && /^https?:|^data:/.test(p.imgUrl) ? `<img class="v25-real-img" src="${p.imgUrl}" />` : ""}
                            ${p.photoDesc ? `<div class="v25-canvas-desc">“ ${p.photoDesc.replace(/</g, "&lt;")} ”</div>` : ""}
                        </div>

                        <!-- 原版 INS 极简四图标栏 -->
                        <div class="v25-mag-tools">
                            <div style="display:flex;align-items:center;gap:15px;">
                                <span data-v25like="${p.id}" style="cursor:pointer;display:inline-flex;align-items:center;gap:5px;">
                                    ${p.liked ? V_ICO.heartFill : V_ICO.heart}
                                    <b style="font-size:10.5px;color:#2C2C32;">${p.likesCount || 42}</b>
                                </span>
                                <span data-v25cmt="${p.id}" style="cursor:pointer;display:inline-flex;align-items:center;gap:5px;">
                                    ${V_ICO.cmt}
                                    <b style="font-size:10px;color:#55555E;">${(p.comments || []).length}</b>
                                </span>
                                <span style="cursor:pointer;display:inline-flex;align-items:center;">${V_ICO.send}</span>
                            </div>
                            <span style="cursor:pointer;display:inline-flex;align-items:center;">${V_ICO.mark}</span>
                        </div>

                        <!-- 粗体用户名与双语正文 -->
                        <div class="v25-mag-text">
                            <div style="white-space:pre-wrap;"><b style="margin-right:6px;font-weight:800;">${name}</b>${(p.text || "").replace(/</g, "&lt;")}</div>
                        </div>

                        ${cmtsHtml}
                        <div data-v25cmt="${p.id}" style="padding:6px 6px 0 6px;font-size:9px;font-weight:600;color:#9A9AA5;cursor:pointer;">댓글 달기... 点击写下评论（TA会秒回你）</div>
                    </div>
                `;
            }).join("");

            stream.querySelectorAll("[data-v25like]").forEach((b) => b.onclick = () => {
                const pid = Number(b.getAttribute("data-v25like")), d = getFeedData(), t = d.posts.find((x) => x.id === pid);
                if (t) { t.liked = !t.liked; t.likesCount = Math.max(1, (t.likesCount || 10) + (t.liked ? 1 : -1)); saveFeedData(d); renderV25Feed(); }
            });
            stream.querySelectorAll("[data-v25del]").forEach((b) => b.onclick = () => {
                if (!confirm("删除这条动态吗？")) return;
                const pid = Number(b.getAttribute("data-v25del")), d = getFeedData();
                d.posts = d.posts.filter((x) => x.id !== pid); saveFeedData(d); renderV25Feed();
            });
            stream.querySelectorAll("[data-v25cmt]").forEach((b) => b.onclick = async () => {
                const pid = Number(b.getAttribute("data-v25cmt")), d = getFeedData(), target = d.posts.find((x) => x.id === pid);
                if (!target) return;
                const txt = prompt(`评论 ${target.author}：`); if (!txt || !txt.trim()) return;
                const ctx = getCtx(); target.comments = target.comments || []; target.comments.push({ who: ctx.userName, text: txt.trim() }); saveFeedData(d); renderV25Feed();
                try {
                    const u = topDoc.getElementById("smt-api-url")?.value?.trim().replace(/\/+$/, ""), k = topDoc.getElementById("smt-api-key")?.value?.trim(), m = topDoc.getElementById("smt-api-model")?.value?.trim() || "gpt-4o-mini";
                    if (!u || !k) return;
                    const ep = u.endsWith("/chat/completions") ? u : (u.endsWith("/v1") ? `${u}/chat/completions` : `${u}/v1/chat/completions`);
                    const r = await fetch(ep, { method: "POST", headers: { "Content-Type": "application/json", "Authorization": `Bearer ${k}` }, body: JSON.stringify({ model: m, temperature: 0.85, messages: [{ role: "system", content: `你是${ctx.charName}。人设：${ctx.charDesc.slice(0, 900)}` }, { role: "user", content: `在动态「${target.text}」下方，${ctx.userName}评论了：“${txt.trim()}”。请简短回复(35字以内)：` }] }) });
                    const resJson = await r.json(), aiReply = resJson?.choices?.[0]?.message?.content?.trim();
                    if (aiReply) { const latest = getFeedData(), t2 = latest.posts.find((x) => x.id === pid); if (t2) { t2.comments.push({ who: `${ctx.charName} ▸ ${ctx.userName}`, text: aiReply }); saveFeedData(latest); renderV25Feed(); } }
                } catch (e) {}
            });
        }

        spacePage.querySelectorAll("[data-v25filter]").forEach((b) => b.onclick = () => {
            spacePage.querySelectorAll("[data-v25filter]").forEach((x) => x.classList.remove("dark"));
            b.classList.add("dark"); curFilter = b.getAttribute("data-v25filter"); renderV25Feed();
        });

        const pDrawer = topDoc.getElementById("v25-post-drawer");
        topDoc.getElementById("v25-user-post-btn").onclick = () => { pDrawer.style.display = pDrawer.style.display === "none" ? "block" : "none"; };
        topDoc.getElementById("v25-post-cancel").onclick = () => (pDrawer.style.display = "none");
        topDoc.getElementById("v25-post-submit").onclick = () => {
            const txt = topDoc.getElementById("v25-post-txt").value.trim(), imgInput = topDoc.getElementById("v25-post-img").value.trim();
            if (!txt && !imgInput) return;
            const c = getCtx(), d = getFeedData(), isUrl = /^https?:|^data:/.test(imgInput);
            d.posts.unshift({ id: Date.now(), isMe: true, author: c.userName, loc: "SEOUL", time: "刚刚", filmNo: "MY FILM · 35MM", text: txt, imgUrl: isUrl ? imgInput : "", photoDesc: isUrl ? "" : (imgInput || "随手定格的日常瞬间"), liked: true, likesCount: 19, comments: [] });
            saveFeedData(d); topDoc.getElementById("v25-post-txt").value = ""; topDoc.getElementById("v25-post-img").value = ""; pDrawer.style.display = "none"; renderV25Feed();
        };

        topDoc.getElementById("v25-ai-post-btn").onclick = async (e) => {
            const c = getCtx(); e.target.textContent = "⏳ 生成中...";
            try {
                const u = topDoc.getElementById("smt-api-url")?.value?.trim().replace(/\/+$/, ""), k = topDoc.getElementById("smt-api-key")?.value?.trim(), m = topDoc.getElementById("smt-api-model")?.value?.trim() || "gpt-4o-mini";
                if (!u || !k) { topDoc.querySelector('.smt-tab-item[data-page="api"]')?.click(); throw new Error("请先在05.API设置填写地址与Key"); }
                const ep = u.endsWith("/chat/completions") ? u : (u.endsWith("/v1") ? `${u}/chat/completions` : `${u}/v1/chat/completions`);
                const r = await fetch(ep, { method: "POST", headers: { "Content-Type": "application/json", "Authorization": `Bearer ${k}` }, body: JSON.stringify({ model: m, temperature: 0.85, messages: [{ role: "system", content: `你是${c.charName}。人设：${c.charDesc.slice(0, 1000)}\n近期剧情：${c.recentChat}` }, { role: "user", content: `请在你的个人社交主页发一条新动态（韩国清冷白灰文艺风，与${c.userName}有关）。严格只输出JSON：{"loc":"首尔地点","note":"你头顶的5字以内纯白泡泡状态词","photoDesc":"45字以内的照片画面细腻描写","text":"动态正文(含1句韩文+中文翻译)","friendName":"1位共同好友的名字","friendComment":"该好友在底下的评论"}` }] }) });
                const resJson = await r.json(), raw = resJson?.choices?.[0]?.message?.content?.trim() || "";
                const mt = raw.match(/\{[\s\S]*\}/);
                if (mt) {
                    const obj = JSON.parse(mt[0]), d = getFeedData();
                    if (obj.note) d.charNote = obj.note;
                    d.posts.unshift({ id: Date.now(), isMe: false, author: c.charName, loc: obj.loc || "SEOUL", time: "刚刚", filmNo: "KODAK 400 · FILM", photoDesc: obj.photoDesc || "", imgUrl: "", text: obj.text || "", liked: false, likesCount: Math.floor(Math.random() * 50) + 25, comments: obj.friendComment ? [{ who: obj.friendName || "好友", text: obj.friendComment }] : [] });
                    saveFeedData(d); renderV25Feed();
                }
            } catch (err) { alert(err.message); } finally { e.target.textContent = "✦ 让TA发新帖"; }
        };

        renderV25Feed();

        // 6. 守护锁：如果前面残留的旧定时器试图把 spacePage 改回旧的 .kr-notes-tray，立即毫秒级拦截并重绘 V25 新版！
        const guard = new MutationObserver(() => {
            if (!topDoc.getElementById("v25-stories-bar")) {
                renderV25Feed();
            }
        });
        guard.observe(spacePage, { childList: true });

        topDoc.querySelector('.smt-tab-item[data-page="space"]')?.addEventListener("click", () => {
            topDoc.getElementById("smt-page-couple_app")?.classList.remove("active");
            setTimeout(renderV25Feed, 20);
        }, true);
    }

    forceMountV25();
})();
// ==========================================================================
// 💧 【Sumoul App 清透玻璃泪痕开屏补丁：Canvas 实时透明泪珠滑落折射 + 6.5秒极慢速连结 + 文字逐行雾化慢显】
// 用法：直接粘贴在 index.js 最末尾（替换刚才那个液态开屏补丁即可）！
// ==========================================================================
(function () {
    const topDoc = (window.parent || window).document;

    function mountCrystalTearSplash() {
        const modal = topDoc.getElementById("seoul-mini-theater-modal");
        const splash = topDoc.getElementById("smt-boot-splash");
        if (!modal || !splash) {
            setTimeout(mountCrystalTearSplash, 180);
            return;
        }

        // 1. 注入「文字从水雾模糊中极慢速逐行浮现」的 CSS 动画
        topDoc.getElementById("sumoul-liquid-tear-css")?.remove();
        const st = topDoc.createElement("style");
        st.id = "sumoul-liquid-tear-css";
        st.innerHTML = `
            /* 文字像水汽凝结一样：从模糊透明慢慢浮现清晰 */
            @keyframes tearTextSlowReveal {
                0% {
                    opacity: 0;
                    filter: blur(6px);
                    transform: translateY(6px);
                }
                100% {
                    opacity: 1;
                    filter: blur(0px);
                    transform: translateY(0px);
                }
            }
            #seoul-mini-theater-modal #smt-boot-splash .t-slow-1 {
                opacity: 0 !important;
                animation: tearTextSlowReveal 2.4s cubic-bezier(0.22, 1, 0.36, 1) 1.6s forwards !important;
            }
            #seoul-mini-theater-modal #smt-boot-splash .t-slow-2 {
                opacity: 0 !important;
                animation: tearTextSlowReveal 2.6s cubic-bezier(0.22, 1, 0.36, 1) 3.2s forwards !important;
            }
            #seoul-mini-theater-modal #smt-boot-splash .t-slow-3 {
                opacity: 0 !important;
                animation: tearTextSlowReveal 2.6s cubic-bezier(0.22, 1, 0.36, 1) 4.6s forwards !important;
            }
            #seoul-mini-theater-modal #smt-boot-splash .t-slow-4 {
                opacity: 0 !important;
                animation: tearTextSlowReveal 2.2s cubic-bezier(0.22, 1, 0.36, 1) 6.0s forwards !important;
            }
        `;
        topDoc.head.appendChild(st);

        let animReqId = null;

        function playCrystalTearAnimation() {
            if (animReqId) cancelAnimationFrame(animReqId);

            splash.style.cssText = "position:absolute!important;inset:0!important;background:linear-gradient(180deg,#F9FAFC 0%,#EFF1F6 52%,#E5E8F0 100%)!important;z-index:10!important;display:flex!important;flex-direction:column!important;align-items:center!important;justify-content:center!important;transition:opacity 0.8s ease!important;padding:24px!important;text-align:center!important;cursor:pointer!important;";

            splash.innerHTML = `
                <div style="border:1px solid rgba(255,255,255,0.9)!important;border-radius:22px!important;padding:32px 24px 28px 24px!important;background:linear-gradient(165deg,rgba(255,255,255,0.72) 0%,rgba(244,246,250,0.52) 100%)!important;backdrop-filter:blur(16px)!important;-webkit-backdrop-filter:blur(16px)!important;max-width:296px!important;width:100%!important;box-sizing:border-box!important;position:relative!important;box-shadow:0 20px 50px rgba(40,45,60,0.06), inset 0 1px 2px #FFFFFF!important;">
                    <!-- 顶部极淡玻璃刻度 -->
                    <div style="display:flex;justify-content:space-between;align-items:center;font-size:7.5px;font-weight:700;color:#9A9EA8!important;letter-spacing:2px;font-family:monospace;border-bottom:1px solid rgba(220,224,232,0.6)!important;padding-bottom:8px;margin-bottom:14px;">
                        <span>SUMOUL APP</span>
                        <span id="tear-progress-label">TEAR TRACE · 0%</span>
                    </div>

                    <!-- 💧 高清 Canvas 玻璃水痕舞台：呈现真正的透明水滴折射、高光水脊与缓慢滑落折线 -->
                    <div style="width:100%;height:136px;display:flex;align-items:center;justify-content:center;margin:2px 0 12px 0;position:relative;">
                        <canvas id="sumoul-tear-canvas" style="width:246px!important;height:132px!important;display:block!important;"></canvas>
                    </div>

                    <!-- 逐行极慢速浮现的文字 -->
                    <div class="t-slow-1" style="font-size:14.5px;font-weight:700;letter-spacing:3.2px;color:#3A3D46!important;margin-bottom:10px;">
                        눈물의 궤적 · 泪之轨迹
                    </div>

                    <div style="min-height:54px;margin-bottom:18px;">
                        <div class="t-slow-2" style="font-size:10px;font-weight:600;color:#6E7380!important;line-height:1.9;letter-spacing:0.5px;">
                            “ 유리창을 타고 천천히 흐르는 투명한 눈물처럼 ”
                        </div>
                        <div class="t-slow-3" style="font-size:8.8px;font-weight:500;color:#9499A6!important;line-height:1.8;letter-spacing:0.6px;margin-top:4px;">
                            如同顺着玻璃窗缓慢滑落的透明泪水，将记忆静静连结。
                        </div>
                    </div>

                    <!-- 等泪线与文字全部慢显后才缓缓浮现的唤醒按钮 -->
                    <div class="t-slow-4">
                        <div style="display:inline-flex;align-items:center;justify-content:center;padding:7px 24px;background:rgba(255,255,255,0.85)!important;border:1px solid rgba(210,215,225,0.8)!important;border-radius:999px;font-size:8.2px;color:#484C56!important;letter-spacing:2.2px;font-weight:700;box-shadow:0 4px 14px rgba(40,45,60,0.05), inset 0 1px 1px #FFFFFF!important;">
                            TOUCH TO WAKE · 触碰唤醒
                        </div>
                    </div>
                </div>
                <div class="t-slow-3" style="font-size:7.5px;font-weight:600;color:#A2A6B2!important;letter-spacing:2px;margin-top:16px;">
                    SUMOUL APP · GLASS TEAR ARCHIVE
                </div>
            `;

            splash.onclick = () => {
                if (animReqId) cancelAnimationFrame(animReqId);
                splash.classList.add("fade-out");
            };

            // 2. 启动 Canvas 透明玻璃水痕 + 领头泪珠极慢速滑落物理绘制
            const canvas = topDoc.getElementById("sumoul-tear-canvas");
            const pctLabel = topDoc.getElementById("tear-progress-label");
            if (!canvas) return;

            const dpr = window.devicePixelRatio || 2;
            const W = 246, H = 132;
            canvas.width = W * dpr;
            canvas.height = H * dpr;
            const ctx = canvas.getContext("2d");
            ctx.scale(dpr, dpr);

            // 泪水滑落的 6 个折线转折点
            const pts = [
                { x: 28, y: 18 },
                { x: 72, y: 54 },
                { x: 112, y: 28 },
                { x: 154, y: 72 },
                { x: 186, y: 50 },
                { x: 212, y: 92 }
            ];

            // 计算每段折线的长度
            const segs = [];
            let totalLen = 0;
            for (let i = 0; i < pts.length - 1; i++) {
                const dx = pts[i + 1].x - pts[i].x;
                const dy = pts[i + 1].y - pts[i].y;
                const len = Math.hypot(dx, dy);
                segs.push({ p1: pts[i], p2: pts[i + 1], len, startDist: totalLen });
                totalLen += len;
            }

            // 画出单颗「清透无色玻璃水珠」（底部微阴影 + 透明边缘 + 内部折射 + 左上角纯白月牙高光）
            function drawGlassWaterDrop(x, y, r, alpha = 1, isTearShape = false) {
                if (alpha <= 0.01 || r <= 0.2) return;
                ctx.save();

                // 1. 水珠底部的柔和投影（让透明水珠从白灰背景上浮凸出来）
                ctx.shadowColor = `rgba(75, 85, 105, ${0.22 * alpha})`;
                ctx.shadowBlur = r * 1.4;
                ctx.shadowOffsetX = r * 0.25;
                ctx.shadowOffsetY = r * 0.45;

                // 2. 水珠本体渐变（上半部透明微暗，下半部折射透亮白光——这才是真水珠的光学原理！）
                const grad = ctx.createRadialGradient(
                    x - r * 0.25, y - r * 0.25, r * 0.05,
                    x + r * 0.15, y + r * 0.25, r * 1.15
                );
                grad.addColorStop(0, `rgba(210, 218, 230, ${0.35 * alpha})`);
                grad.addColorStop(0.55, `rgba(235, 240, 248, ${0.55 * alpha})`);
                grad.addColorStop(0.88, `rgba(255, 255, 255, ${0.92 * alpha})`);
                grad.addColorStop(1, `rgba(175, 185, 202, ${0.55 * alpha})`);

                ctx.beginPath();
                if (isTearShape) {
                    // 欲滴落的悬挂水滴形状
                    ctx.moveTo(x, y - r * 1.35);
                    ctx.bezierCurveTo(x + r * 1.1, y - r * 0.2, x + r * 1.05, y + r, x, y + r);
                    ctx.bezierCurveTo(x - r * 1.05, y + r, x - r * 1.1, y - r * 0.2, x, y - r * 1.35);
                } else {
                    ctx.arc(x, y, r, 0, Math.PI * 2);
                }
                ctx.fillStyle = grad;
                ctx.fill();

                // 清除阴影画内部高光
                ctx.shadowColor = "transparent";

                // 3. 玻璃水珠极细半透明轮廓线
                ctx.lineWidth = 0.7;
                ctx.strokeStyle = `rgba(165, 175, 192, ${0.42 * alpha})`;
                ctx.stroke();

                // 4. 水珠左上角最灵魂的「纯白晶莹高光点」与右下角「次级反光弧」
                ctx.beginPath();
                ctx.arc(x - r * 0.34, y - r * 0.32, Math.max(0.8, r * 0.26), 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${0.98 * alpha})`;
                ctx.fill();

                ctx.beginPath();
                ctx.arc(x, y, r * 0.72, 0.15 * Math.PI, 0.42 * Math.PI);
                ctx.lineWidth = Math.max(0.7, r * 0.16);
                ctx.lineCap = "round";
                ctx.strokeStyle = `rgba(255, 255, 255, ${0.85 * alpha})`;
                ctx.stroke();

                ctx.restore();
            }

            const DURATION = 6200; // 6.2秒极慢速划过
            const startTime = performance.now();

            // 带有节点停顿呼吸感的缓动函数（每经过一个转折点会轻微放慢凝结，再继续滑落）
            function getTearDistance(elapsed) {
                const rawP = Math.min(1, elapsed / DURATION);
                // 整体柔和缓动 + 每个转折点微停顿波动
                const n = segs.length;
                const scaled = rawP * n;
                const segIdx = Math.min(n - 1, Math.floor(scaled));
                const localT = scaled - segIdx;
                // S型平滑曲线让水珠在节点处慢下来凝结，在折线中段自然滑落
                const smoothLocal = localT < 0.5
                    ? 2 * localT * localT
                    : 1 - Math.pow(-2 * localT + 2, 2) / 2;
                let dist = 0;
                for (let i = 0; i < segIdx; i++) dist += segs[i].len;
                dist += segs[segIdx].len * smoothLocal;
                return { dist, rawP };
            }

            function renderFrame(now) {
                if (!topDoc.getElementById("sumoul-tear-canvas")) return;
                const elapsed = now - startTime;
                const { dist, rawP } = getTearDistance(elapsed);

                if (pctLabel) {
                    const pNum = Math.round(rawP * 100);
                    pctLabel.textContent = pNum >= 100 ? "TEAR TRACE · CONNECTED" : `TEAR TRACE · ${pNum}%`;
                }

                ctx.clearRect(0, 0, W, H);

                // 0. 底层极淡的干涸水迹虚线预瞄
                ctx.save();
                ctx.beginPath();
                pts.forEach((p, idx) => idx === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y));
                ctx.strokeStyle = "rgba(180, 188, 202, 0.25)";
                ctx.lineWidth = 1;
                ctx.setLineDash([2, 4]);
                ctx.stroke();
                ctx.restore();

                // 计算当前已经划过的折线顶点与领头泪珠坐标
                const activePts = [pts[0]];
                let headX = pts[0].x, headY = pts[0].y;

                for (let i = 0; i < segs.length; i++) {
                    const sg = segs[i];
                    if (dist >= sg.startDist + sg.len) {
                        activePts.push(sg.p2);
                        headX = sg.p2.x;
                        headY = sg.p2.y;
                    } else if (dist > sg.startDist) {
                        const t = (dist - sg.startDist) / sg.len;
                        headX = sg.p1.x + (sg.p2.x - sg.p1.x) * t;
                        headY = sg.p1.y + (sg.p2.y - sg.p1.y) * t;
                        activePts.push({ x: headX, y: headY });
                        break;
                    } else {
                        break;
                    }
                }

                // 💧 绘制已经划过的「三层清透玻璃水痕折线」
                if (activePts.length > 1) {
                    // 第一层：水痕两侧的半透明浸润水晕 + 微弱底部水影
                    ctx.save();
                    ctx.beginPath();
                    activePts.forEach((p, idx) => idx === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y));
                    ctx.lineCap = "round";
                    ctx.lineJoin = "round";
                    ctx.lineWidth = 4.6;
                    ctx.strokeStyle = "rgba(205, 214, 228, 0.34)";
                    ctx.shadowColor = "rgba(80, 90, 110, 0.16)";
                    ctx.shadowBlur = 4;
                    ctx.shadowOffsetY = 2;
                    ctx.stroke();
                    ctx.restore();

                    // 第二层：水痕边缘的极细透明折射边
                    ctx.save();
                    ctx.beginPath();
                    activePts.forEach((p, idx) => idx === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y));
                    ctx.lineCap = "round";
                    ctx.lineJoin = "round";
                    ctx.lineWidth = 2.4;
                    ctx.strokeStyle = "rgba(170, 180, 198, 0.42)";
                    ctx.stroke();
                    ctx.restore();

                    // 第三层（最关键的水感灵魂！）：水痕正脊上的 1.2px 纯白晶莹高光折射亮线
                    ctx.save();
                    ctx.beginPath();
                    activePts.forEach((p, idx) => idx === 0 ? ctx.moveTo(p.x, p.y - 0.5) : ctx.lineTo(p.x, p.y - 0.5));
                    ctx.lineCap = "round";
                    ctx.lineJoin = "round";
                    ctx.lineWidth = 1.25;
                    ctx.strokeStyle = "rgba(255, 255, 255, 0.96)";
                    ctx.stroke();
                    ctx.restore();

                    // 第四层：顺着已连结水痕缓慢滑落的细小晶莹水珠
                    const flowOffset = (now * 0.022) % totalLen;
                    for (let d = flowOffset; d < dist; d += 38) {
                        for (let i = 0; i < segs.length; i++) {
                            const sg = segs[i];
                            if (d >= sg.startDist && d <= sg.startDist + sg.len) {
                                const t = (d - sg.startDist) / sg.len;
                                const bx = sg.p1.x + (sg.p2.x - sg.p1.x) * t;
                                const by = sg.p1.y + (sg.p2.y - sg.p1.y) * t;
                                drawGlassWaterDrop(bx, by, 2.1, 0.85, false);
                                break;
                            }
                        }
                    }
                }

                // 💧 绘制每个转折节点上留下的「透明凝结露珠」
                let acc = 0;
                for (let i = 0; i < pts.length; i++) {
                    if (i > 0) acc += segs[i - 1].len;
                    if (dist >= acc - 1) {
                        const age = Math.min(1, (dist - acc + 8) / 18);
                        const pulse = 1 + 0.06 * Math.sin(now * 0.003 + i);
                        const radius = (i === pts.length - 1 ? 6.2 : (i % 2 === 1 ? 4.4 : 3.6)) * pulse;
                        const isLast = i === pts.length - 1;
                        drawGlassWaterDrop(pts[i].x, isLast ? pts[i].y + 4 : pts[i].y, radius, age, isLast);
                    }
                }

                // 💧 绘制正在折线最前端缓慢滑行的「领头透明泪珠」（带有轻微颤动水感）
                if (rawP < 1) {
                    const wobble = Math.sin(now * 0.012) * 0.4;
                    drawGlassWaterDrop(headX, headY + wobble, 4.8, 1, false);
                } else {
                    // 连结完成后，终点悬挂的大泪滴下方泛起柔和的透明水波圈
                    const ripT = ((now - startTime - DURATION) % 2600) / 2600;
                    if (ripT >= 0) {
                        ctx.save();
                        ctx.beginPath();
                        ctx.ellipse(pts[5].x, pts[5].y + 14, 3 + ripT * 18, 1.2 + ripT * 6, 0, 0, Math.PI * 2);
                        ctx.strokeStyle = `rgba(160, 170, 188, ${(1 - ripT) * 0.55})`;
                        ctx.lineWidth = 1;
                        ctx.stroke();
                        ctx.restore();
                    }
                }

                animReqId = requestAnimationFrame(renderFrame);
            }

            animReqId = requestAnimationFrame(renderFrame);
        }

        playCrystalTearAnimation();

        // 每次点击打开 Sumoul App 时，重新从 0% 开始播放透明泪水划过与文字慢显动画
        topDoc.addEventListener("click", (e) => {
            const t = e.target;
            if (!t || !t.closest) return;
            if (t.closest("#seoul-mini-theater-btn") || t.closest("#seoul-ext-open-btn") || t.closest("#seoul-wand-menu-item")) {
                splash.classList.remove("fade-out");
                playCrystalTearAnimation();
            }
        }, true);
    }

    mountCrystalTearSplash();
})();
