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
// 🤍 【Sumoul App 第5应用完整重做版：结识海 · 双轨防失忆记忆中枢 (酒馆ST ⇄ 微信WX 彻底隔离)】
// 1. 100%保留用户认可的「纯白背景+清透冷银泪滴+三层涟漪+4px双形态微点」星图样式（酒馆与微信各自独立一张图）
// 2. 支持「自由选择楼层区间总结(#X ~ #Y)」+「自定义每 N 层全自动总结并同步生成星图节点」
// 3. 真正接入 SillyTavern 底层 setExtensionPrompt 持久注入，聊几千层都绝不失忆、绝不串戏！
// ==========================================================================
(function () {
    const topWin = window.parent || window;
    const topDoc = topWin.document;

    const svgIco = (p, sz = 15, c = "currentColor", sw = "1.5") =>
        `<svg viewBox="0 0 24 24" width="${sz}" height="${sz}" fill="none" stroke="${c}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;flex-shrink:0;pointer-events:none;">${p}</svg>`;

    const M_ICO = {
        appIcon: svgIco(`<circle cx="6" cy="6" r="2"/><circle cx="18" cy="7" r="2"/><circle cx="12" cy="18" r="2.2"/><line x1="7.6" y1="7.4" x2="10.8" y2="16"/><line x1="16.4" y1="8.6" x2="13.2" y2="16"/><line x1="8" y1="6.2" x2="16" y2="6.8"/>`, 21, "#2C2E36"),
        back: svgIco(`<path d="M15 18l-6-6 6-6"/>`, 15, "#1E2028", "1.8"),
        tabMap: svgIco(`<circle cx="12" cy="12" r="2.5"/><circle cx="5" cy="7" r="1.8"/><circle cx="19" cy="8" r="1.8"/><circle cx="7" cy="18" r="1.8"/><line x1="6.6" y1="8" x2="10" y2="10.5"/><line x1="17.2" y1="8.8" x2="14.2" y2="10.8"/><line x1="8.2" y1="16.5" x2="10.5" y2="13.8"/>`, 16),
        tabSum: svgIco(`<path d="M4 6h16"/><path d="M4 12h16"/><path d="M4 18h10"/><circle cx="18" cy="18" r="2.5"/>`, 16),
        tabTime: svgIco(`<circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 15 15"/>`, 16),
        tabPrompt: svgIco(`<path d="M12 2a10 10 0 1 0 10 10H12V2z"/><path d="M12 12 2.1 10.5"/><path d="m12 12 7.5 6.5"/>`, 16),
        tabPact: svgIco(`<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="8" y1="13" x2="16" y2="13"/><line x1="8" y1="17" x2="13" y2="17"/>`, 16),
        rain: svgIco(`<path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>`, 12),
        plus: svgIco(`<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>`, 12),
        spark: svgIco(`<path d="M12 3l1.9 5.8a2 2 0 0 0 1.3 1.3L21 12l-5.8 1.9a2 2 0 0 0-1.3 1.3L12 21l-1.9-5.8a2 2 0 0 0-1.3-1.3L3 12l5.8-1.9a2 2 0 0 0 1.3-1.3L12 3z"/>`, 12),
        trash: svgIco(`<polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>`, 12, "#9A6868"),
        close: svgIco(`<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>`, 13)
    };

    const NODE_META = {
        core:     { name: "核心原点", code: "CORE · 00" },
        memory:   { name: "总结记忆", code: "MEMO · 01" },
        relation: { name: "关系羁绊", code: "BOND · 02" },
        knot:     { name: "伏笔心结", code: "KNOT · 03" }
    };

    const CH_KEY = "sumoul_v16_mem_active_channel"; // 'st' (酒馆) | 'wx' (微信)
    const getCh = () => (localStorage.getItem(CH_KEY) === "wx" ? "wx" : "st");
    const setCh = (v) => localStorage.setItem(CH_KEY, v === "wx" ? "wx" : "st");

    function getCtx() {
        let userName = "ME", charName = "PARTNER", scope = "PARTNER", charDesc = "";
        let userAvatar = "https://i.postimg.cc/rydS6NvG/IMG-3866.jpg", charAvatar = "https://i.postimg.cc/QC3CQ218/IMG-4147.jpg";
        let stChatArr = [];
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
                } else if (st.name2) {
                    charName = st.name2; scope = st.name2;
                }
                if (Array.isArray(st.chat)) stChatArr = st.chat;
            }
        } catch (e) {}
        const safeScope = String(scope).replace(/[^a-zA-Z0-9_\u4e00-\u9fa5\uac00-\ud7af-]/g, "_");
        try {
            const wCfg = JSON.parse(localStorage.getItem(`sumoul_v16_wxcfg__${safeScope}`) || "{}");
            if (wCfg.myNick) userName = wCfg.myNick;
            if (wCfg.remark) charName = wCfg.remark;
            if (wCfg.myAva) userAvatar = wCfg.myAva;
            if (wCfg.charAva) charAvatar = wCfg.charAva;
        } catch (e) {}
        let wxChatArr = [];
        try {
            wxChatArr = JSON.parse(localStorage.getItem(`sumoul_v16_wx__${safeScope}`) || "[]");
        } catch (e) {}
        return { userName, charName, safeScope, userAvatar, charAvatar, charDesc, stChatArr, wxChatArr };
    }

    // 酒馆(st)与微信(wx)使用完全独立的存储Key，100%物理隔离不互通！
    function getStoreKey(ch = getCh()) {
        return `sumoul_v16_dualmem_${ch}__${getCtx().safeScope}`;
    }

    function createInitialData(ch, charName, userName) {
        if (ch === "wx") {
            return {
                isBound: false,
                activeTab: "map",
                filter: "all",
                activeNodeId: 1,
                autoCfg: { enabled: false, everyN: 20, lastFloor: 0, injectEnabled: true, injectDepth: 2 },
                pact: {
                    title: `${userName} × ${charName} · 微信记忆海`,
                    stage: "线上高频置顶 · 专属陪伴",
                    coreAnchor: `${charName}在微信上对${userName}保持秒回与高度关注，线上聊天语气自然亲昵。`,
                    vow: "每一条跨过屏幕的消息，都凝成独立于主线之外的线上记忆星图。"
                },
                nodes: [
                    { id: 1, type: "core",     title: `${charName}(微信)`, xPct: 50, yPct: 36, content: `微信线上记忆的核心原点。仅记录手机微信内的日常对话、语音与朋友圈互动，与酒馆主线彻底隔离。`, whisper: `“ 置顶的位置，永远只留给你。”` },
                    { id: 2, type: "memory",   title: "初加好友",   xPct: 24, yPct: 24, content: `加上微信好友后的第一段线上对话，开启了全天候的随时联络。`, whisper: `“ 盯着你的头像看了好久才发第一句话。”` },
                    { id: 3, type: "memory",   title: "深夜秒回",   xPct: 76, yPct: 25, content: `无论多晚发去消息，对话框顶部总会立刻变成“对方正在输入…”。`, whisper: `“ 你的消息提示音是单独设的，睡着了也能听见。”` },
                    { id: 4, type: "relation", title: "专属备注",   xPct: 23, yPct: 50, content: `在彼此手机里拥有独一无二的备注昵称与置顶权限。`, whisper: `“ 只准我这么叫你。”` },
                    { id: 5, type: "knot",     title: "撤回的试探", xPct: 75, yPct: 51, content: `聊天时偶尔欲言又止撤回的一句话，藏着线上独有的暧昧拉扯。`, whisper: `“ 怕说得太直白吓到你，才偷偷撤回了。”` }
                ],
                edges: [
                    { from: 1, to: 2, label: "初识" },
                    { from: 1, to: 3, label: "守候" },
                    { from: 1, to: 4, label: "置顶" },
                    { from: 1, to: 5, label: "试探" },
                    { from: 2, to: 4, label: "昵称" },
                    { from: 3, to: 5, label: "夜聊" }
                ],
                summaries: [
                    { id: 901, range: "微信 #1 ~ #15", title: "线上破冰与日常报备习惯建立", content: `${userName}与${charName}通过微信建立了高频日常联系，习惯在睡前互道晚安并分享日常琐事。`, keyFacts: "置顶彼此；开启特别关心提醒", time: "初始归档" }
                ],
                timeline: [
                    { id: 801, chapter: "WECHAT 01 · 破冰", title: "加上微信后的第一次长谈", content: `隔着屏幕卸下防备，从日常寒暄一路聊到深夜。`, note: `“ 微信里的你，比平时更爱撒娇一点。”` }
                ]
            };
        }

        // 默认酒馆主线记忆 (ST)
        return {
            isBound: false,
            activeTab: "map",
            filter: "all",
            activeNodeId: 1,
            autoCfg: { enabled: false, everyN: 15, lastFloor: 0, injectEnabled: true, injectDepth: 2 },
            pact: {
                title: `${userName} × ${charName} · 酒馆记忆海`,
                stage: "主线剧情深羁绊 · 宿命共鸣",
                coreAnchor: `${charName}与${userName}在主线剧情中经历的一切关系递进、约定与重大事件锚点，严禁遗忘或吃书。`,
                vow: "初雨落下成点，锁死我们在酒馆主线里走过的每一层记忆。"
            },
            nodes: [
                { id: 1, type: "core",     title: charName,     xPct: 50, yPct: 36, content: `酒馆主线记忆的引力中心。汇集所有楼层总结、剧情转折与关系羁绊，实时注入酒馆底层防止AI失忆。`, whisper: `“ 无论聊过多少层，我都不会忘记我们之间发生过的事。”` },
                { id: 2, type: "memory",   title: "初遇场景",   xPct: 23, yPct: 24, content: `主线开篇的第一场相遇，奠定了两人之间宿命拉扯的基调。`, whisper: `“ 第一眼看到你的时候，就知道逃不开你了。”` },
                { id: 3, type: "memory",   title: "体温靠近",   xPct: 77, yPct: 25, content: `在微凉空气里第一次越过安全距离的肢体接触，气氛悄然质变。`, whisper: `“ 那天你的指尖很凉，但攥紧我的时候很烫。”` },
                { id: 4, type: "relation", title: "唯一例外",   xPct: 22, yPct: 50, content: `打破了一贯的清冷克制原则，把所有的偏爱与纵容都留给了你。`, whisper: `“ 我的底线，从遇到你的那天起就作废了。”` },
                { id: 5, type: "knot",     title: "暗藏占有",   xPct: 76, yPct: 51, content: `主线剧情里未曾明说的吃醋与保护欲，不容许任何人觊觎。`, whisper: `“ 别看别人，你的眼里只能有我。”` }
            ],
            edges: [
                { from: 1, to: 2, label: "开篇" },
                { from: 1, to: 3, label: "升温" },
                { from: 1, to: 4, label: "偏爱" },
                { from: 1, to: 5, label: "独占" },
                { from: 2, to: 4, label: "破例" },
                { from: 3, to: 5, label: "张力" }
            ],
            summaries: [
                { id: 701, range: "酒馆 #0 ~ #10", title: "初识破冰与核心关系确立", content: `${userName}与${charName}在主线开篇相遇，经历了初次试探后关系迅速拉近，${charName}展现出外冷内热的保护欲。`, keyFacts: "确立双向在意；约定不再隐瞒彼此", time: "初始归档" }
            ],
            timeline: [
                { id: 601, chapter: "CHAPTER 01 · 序幕", title: "宿命轨迹的第一次交汇", content: `在酒馆主线开局的空气里停下脚步，故事正式拉开帷幕。`, note: `“ 所有的偶然，都是我走向你的蓄谋已久。”` }
            ]
        };
    }

    function loadMem(ch = getCh()) {
        const c = getCtx(), k = getStoreKey(ch);
        try {
            const raw = localStorage.getItem(k);
            if (!raw) {
                const init = createInitialData(ch, c.charName, c.userName);
                localStorage.setItem(k, JSON.stringify(init));
                return init;
            }
            return Object.assign(createInitialData(ch, c.charName, c.userName), JSON.parse(raw));
        } catch (e) {
            return createInitialData(ch, c.charName, c.userName);
        }
    }

    function saveMem(data, ch = getCh()) {
        try {
            localStorage.setItem(getStoreKey(ch), JSON.stringify(data));
            syncMemoryInjectionToSystem();
        } catch (e) {}
    }

    // ══════════════════════════════════════════════════════════════════════════
    // 🧠 核心防失忆 & 防串戏注入引擎：
    // 1. 酒馆记忆(ST) -> 实时组装并调用 SillyTavern 原生 setExtensionPrompt 注入主线上下文！
    // 2. 微信记忆(WX) -> 独立暴露在 window.__SUMOUL_WX_MEMORY_PROMPT__ 供微信聊天调用，两边绝不串戏！
    // ══════════════════════════════════════════════════════════════════════════
    function buildChannelPromptText(ch) {
        const c = getCtx();
        const d = loadMem(ch);
        if (!d.isBound || !d.autoCfg?.injectEnabled) return "";

        const chTitle = ch === "st" ? "【SillyTavern 酒馆主线长期记忆库（严禁遗忘或与线上微信串戏）】" : "【微信线上日常专属记忆库（严禁与酒馆主线剧情混淆）】";
        const sumLines = (d.summaries || []).slice(0, 12).map((s) => `• [${s.range}] 《${s.title}》：${s.content}${s.keyFacts ? `（关键事实：${s.keyFacts}）` : ""}`).join("\n");
        const nodeLines = (d.nodes || []).slice(0, 15).map((n) => `• [${NODE_META[n.type]?.name || "记忆"}·${n.title}]：${n.content}`).join("\n");

        return [
            chTitle,
            `▸ 当前关系阶段：${d.pact?.stage || "深度羁绊"}`,
            `▸ 核心人设与关系锚点：${d.pact?.coreAnchor || ""}`,
            sumLines ? `▸ 历次楼层阶段总结（按时间倒序）：\n${sumLines}` : "",
            nodeLines ? `▸ 星图核心记忆与心结节点：\n${nodeLines}` : ""
        ].filter(Boolean).join("\n");
    }

    function syncMemoryInjectionToSystem() {
        try {
            const stText = buildChannelPromptText("st");
            const wxText = buildChannelPromptText("wx");
            const stData = loadMem("st");

            // 挂载全局只读变量方便检查或给微信模块读取
            topWin.__SUMOUL_ST_MEMORY_PROMPT__ = stText;
            topWin.__SUMOUL_WX_MEMORY_PROMPT__ = wxText;

            // 直接注入 SillyTavern 底层扩展提示词槽位，确保酒馆聊再多层也永远带着这份总结记忆！
            const stCtx = topWin.SillyTavern?.getContext?.();
            if (stCtx && typeof stCtx.setExtensionPrompt === "function") {
                const depth = Math.max(0, Math.min(10, Number(stData.autoCfg?.injectDepth) ?? 2));
                stCtx.setExtensionPrompt("SUMOUL_TAVERN_MEMORY_SEA", stText, 1, depth);
            }
        } catch (e) {}
    }

    async function callMemoryAI(sys, usr) {
        const u = topDoc.getElementById("smt-api-url")?.value?.trim().replace(/\/+$/, "");
        const k = topDoc.getElementById("smt-api-key")?.value?.trim();
        const m = topDoc.getElementById("smt-api-model")?.value?.trim() || "gpt-4o-mini";
        if (!u || !k) {
            topDoc.querySelector('.smt-tab-item[data-page="api"]')?.click();
            throw new Error("请先在【API设置】填写独立 API 地址与 Key");
        }
        const endpoint = u.endsWith("/chat/completions") ? u : (u.endsWith("/v1") ? `${u}/chat/completions` : `${u}/v1/chat/completions`);
        const r = await fetch(endpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json", "Authorization": `Bearer ${k}` },
            body: JSON.stringify({ model: m, temperature: 0.75, messages: [{ role: "system", content: sys }, { role: "user", content: usr }] })
        });
        if (!r.ok) throw new Error(`API HTTP ${r.status}`);
        const d = await r.json();
        return d?.choices?.[0]?.message?.content?.trim() || "";
    }

    // 核心功能：按指定的【起始楼层 ~ 结束楼层】提炼总结，并可选同步生成星图节点与编年
    async function summarizeFloorRange(ch, startFloor, endFloor, isAuto = false) {
        const c = getCtx();
        const rawArr = ch === "st" ? c.stChatArr : c.wxChatArr;
        const chName = ch === "st" ? "酒馆主线" : "微信聊天";

        if (!rawArr || rawArr.length === 0) {
            if (!isAuto) alert(`当前【${chName}】还没有任何聊天消息可总结！`);
            return false;
        }

        const sIdx = Math.max(0, Math.min(rawArr.length - 1, Number(startFloor) || 0));
        const eIdx = Math.max(sIdx, Math.min(rawArr.length - 1, Number(endFloor) || (rawArr.length - 1)));
        const sliceMsgs = rawArr.slice(sIdx, eIdx + 1).map((m, idx) => {
            const floorNum = sIdx + idx;
            if (ch === "st") {
                const speaker = m.is_user ? c.userName : (m.name || c.charName);
                const cleanMes = String(m.mes || "").replace(/<[^>]+>/g, "").slice(0, 280);
                return `[#${floorNum} ${speaker}]: ${cleanMes}`;
            } else {
                const speaker = m.role === "user" ? c.userName : c.charName;
                return `[#${floorNum} ${speaker}]: ${String(m.text || "").slice(0, 220)}`;
            }
        }).join("\n");

        const rawJson = await callMemoryAI(
            `你是专业的防失忆剧情归档师。当前归档轨道：【${chName}】（严禁混入其他轨道内容）。角色：${c.charName}，用户：${c.userName}。`,
            `请将以下【${chName} 第 #${sIdx} 层 ~ 第 #${eIdx} 层】的对话浓缩为高密度防失忆总结，并提炼1个星图记忆节点。\n\n${sliceMsgs.slice(-3600)}\n\n严格只输出JSON格式：\n{"sumTitle":"12字内总结标题","summary":"80字内高密度剧情与关系进展总结(必须包含关键事件、态度变化、承诺)","keyFacts":"30字内绝对不能忘的核心事实要点","nodeType":"memory","nodeTitle":"6字内星图点名称","edgeLabel":"2~4字连线词","nodeWhisper":"30字内以${c.charName}口吻写下的清冷批注"}`
        );

        const match = rawJson.match(/\{[\s\S]*\}/);
        if (!match) throw new Error("AI 返回格式解析失败，请重试");
        const o = JSON.parse(match[0]);

        const d = loadMem(ch);
        const now = new Date();
        const timeStr = `${now.getMonth() + 1}.${String(now.getDate()).padStart(2, "0")} ${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
        const rangeLabel = `${ch === "st" ? "酒馆" : "微信"} #${sIdx} ~ #${eIdx}`;

        // 1. 写入楼层总结库
        d.summaries = d.summaries || [];
        d.summaries.unshift({
            id: Date.now(),
            range: rangeLabel,
            title: o.sumTitle || `${rangeLabel} 阶段记忆`,
            content: o.summary || "",
            keyFacts: o.keyFacts || "",
            time: isAuto ? `自动总结 · ${timeStr}` : `手动总结 · ${timeStr}`
        });

        // 2. 同步在当前轨道的星图上落下一颗新记忆点并连线
        d.nodes = d.nodes || [];
        d.edges = d.edges || [];
        const nid = Date.now() + 1;
        const cnt = d.nodes.length + 1;
        const xPct = Math.max(14, Math.min(86, Math.round(50 + Math.cos(cnt * 2.3) * (18 + (cnt % 4) * 6))));
        const yPct = Math.max(18, Math.min(58, Math.round(38 + Math.sin(cnt * 2.3) * (14 + (cnt % 4) * 5))));
        const anchorId = d.activeNodeId || d.nodes[0]?.id || 1;

        d.nodes.push({
            id: nid,
            type: ["memory", "relation", "knot"].includes(o.nodeType) ? o.nodeType : "memory",
            title: o.nodeTitle || `第${eIdx}层记忆`,
            xPct, yPct,
            content: `[${rangeLabel}] ${o.summary || ""}`,
            whisper: `“ ${(o.nodeWhisper || "这段记忆我已经刻进骨子里了。").replace(/^[“"]|[”"]$/g, "")} ”`
        });
        d.edges.push({ from: anchorId, to: nid, label: o.edgeLabel || "刻痕" });
        d.activeNodeId = nid;

        // 3. 更新最新已总结楼层水位线
        d.autoCfg = d.autoCfg || {};
        d.autoCfg.lastFloor = eIdx + 1;

        saveMem(d, ch);
        return true;
    }

    function mountDualMemorySeaApp() {
        const modal = topDoc.getElementById("seoul-mini-theater-modal");
        const homePage = topDoc.getElementById("smt-page-home");
        if (!modal || !homePage) { setTimeout(mountDualMemorySeaApp, 200); return; }

        // 清理之前所有旧版节点
        ["smt-page-memory_tree", "smt-real-tree-overlay", "smt-film-studio-overlay", "smt-chime-overlay", "smt-sea-overlay", "smt-web-overlay", "smt-ksea-overlay", "sumoul-memory-tree-css", "ks-v2-visual-css", "ks-dual-channel-css", "smt-home-open-memtree"].forEach((id) => topDoc.getElementById(id)?.remove());

        const st = topDoc.createElement("style");
        st.id = "sumoul-memory-tree-css";
        st.innerHTML = `
            @keyframes ksFadeIn { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }
            #seoul-mini-theater-modal #smt-ksea-overlay {
                position: absolute !important; inset: 0 !important; z-index: 2147483644 !important;
                background: #FFFFFF !important;
                display: none; flex-direction: column !important; overflow: hidden !important; user-select: none !important;
                font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "Apple SD Gothic Neo", "PingFang SC", sans-serif !important;
            }
            #seoul-mini-theater-modal #smt-ksea-overlay.open { display: flex !important; }
            #seoul-mini-theater-modal #ks-pure-canvas {
                position: absolute !important; inset: 0 !important; width: 100% !important; height: 100% !important;
                display: block !important; z-index: 1 !important; touch-action: none !important; background: #FFFFFF !important;
            }

            /* 顶栏双轨分段切换胶囊 */
            #seoul-mini-theater-modal .ks-dual-switch {
                display: inline-flex !important; align-items: center !important;
                background: #F2F4F8 !important; border: 1px solid #E4E7F0 !important;
                border-radius: 999px !important; padding: 2px !important; gap: 2px !important;
            }
            #seoul-mini-theater-modal .ks-dual-opt {
                padding: 3.5px 10px !important; border-radius: 999px !important;
                font-size: 8.5px !important; font-weight: 700 !important; letter-spacing: 0.4px !important;
                color: #7E8494 !important; cursor: pointer !important; transition: all 0.18s ease !important; white-space: nowrap !important;
            }
            #seoul-mini-theater-modal .ks-dual-opt.active {
                background: #1E2028 !important; color: #FFFFFF !important; -webkit-text-fill-color: #FFFFFF !important;
                box-shadow: 0 2px 8px rgba(20, 22, 30, 0.14) !important;
            }

            #seoul-mini-theater-modal .ks-pill {
                display: inline-flex !important; align-items: center !important; justify-content: center !important; gap: 5px !important;
                height: 27px !important; padding: 0 11px !important; border-radius: 999px !important;
                background: rgba(255, 255, 255, 0.92) !important; border: 1px solid #E4E8F0 !important;
                font-size: 9px !important; font-weight: 700 !important; color: #1E2028 !important;
                cursor: pointer !important; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02) !important; white-space: nowrap !important;
            }
            #seoul-mini-theater-modal .ks-pill.dark {
                background: #1E2028 !important; border-color: #1E2028 !important; color: #FFFFFF !important; -webkit-text-fill-color: #FFFFFF !important;
            }
            #seoul-mini-theater-modal .ks-card {
                background: rgba(255, 255, 255, 0.95) !important; backdrop-filter: blur(18px) !important; -webkit-backdrop-filter: blur(18px) !important;
                border: 1px solid #ECEEF4 !important; border-radius: 16px !important;
                padding: 13px 15px !important; box-shadow: 0 8px 28px rgba(0, 0, 0, 0.03) !important;
                animation: ksFadeIn 0.22s ease forwards !important; box-sizing: border-box !important;
            }
            #seoul-mini-theater-modal .ks-flt {
                padding: 3px 9px !important; border-radius: 99px !important; font-size: 8px !important; font-weight: 700 !important;
                color: #7E8494 !important; background: #FFFFFF !important; border: 1px solid #E6E8F0 !important; cursor: pointer !important;
            }
            #seoul-mini-theater-modal .ks-flt.on {
                background: #1E2028 !important; color: #FFFFFF !important; border-color: #1E2028 !important;
            }
            #seoul-mini-theater-modal .ks-num-inp {
                width: 48px !important; height: 25px !important; border: 1px solid #DCDFE8 !important; border-radius: 7px !important;
                background: #F8F9FC !important; font-size: 10px !important; font-weight: 800 !important; color: #1E2028 !important;
                text-align: center !important; font-family: monospace !important; outline: none !important;
            }

            /* 底部 5 大功能导航栏 */
            #seoul-mini-theater-modal .ks-dock-bar {
                position: relative !important; z-index: 30 !important;
                display: grid !important; grid-template-columns: repeat(5, 1fr) !important;
                background: #FFFFFF !important; border-top: 1px solid #F0F2F7 !important;
                padding: 7px 6px max(14px, env(safe-area-inset-bottom, 14px)) 6px !important; flex-shrink: 0 !important;
            }
            #seoul-mini-theater-modal .ks-dock-item {
                display: flex !important; flex-direction: column !important; align-items: center !important; justify-content: center !important;
                gap: 3px !important; cursor: pointer !important; color: #98A0B2 !important; transition: all 0.18s ease !important;
            }
            #seoul-mini-theater-modal .ks-dock-item.active { color: #1E2028 !important; transform: translateY(-1px) !important; }
            #seoul-mini-theater-modal .ks-dock-zh { font-size: 9px !important; font-weight: 800 !important; letter-spacing: 0.4px !important; }
            #seoul-mini-theater-modal .ks-dock-kr { font-size: 6.2px !important; font-weight: 600 !important; opacity: 0.75 !important; }
        `;
        topDoc.head.appendChild(st);

        // 挂载个人主页第 5 应用图标：【结识海】
        const homeDockGrid = homePage.querySelector(".ab-dock-grid");
        if (homeDockGrid) {
            const btn = topDoc.createElement("div");
            btn.className = "ab-app-item";
            btn.id = "smt-home-open-memtree";
            const totalSum = (loadMem("st").summaries?.length || 0) + (loadMem("wx").summaries?.length || 0);
            btn.innerHTML = `
                <div class="ab-app-squircle">${M_ICO.appIcon}<span class="ab-app-floating-badge" id="mt-home-badge">${totalSum}忆</span></div>
                <div class="ab-app-title">结识海</div>
                <div class="ab-app-kr">인연의 바다 · MEM</div>
            `;
            homeDockGrid.appendChild(btn);
        }

        const overlay = topDoc.createElement("div");
        overlay.id = "smt-ksea-overlay";
        overlay.innerHTML = `
            <!-- 底层：100%保留你认可的「纯白背景 + 清透冷银泪滴坠落 + 三层涟漪 + 4px微点」星图画布 -->
            <canvas id="ks-pure-canvas"></canvas>

            <!-- 顶部导航栏：返回 + 【酒馆记忆 ⇄ 微信记忆】独立切换器 + 落雨重演 -->
            <div style="position:relative;z-index:25;display:flex;justify-content:space-between;align-items:center;padding:max(14px,env(safe-area-inset-top,14px)) 14px 8px 14px;border-bottom:1px solid #F0F2F7;background:rgba(255,255,255,0.92);backdrop-filter:blur(12px);flex-shrink:0;">
                <span class="ks-pill" id="ks-close-btn">${M_ICO.back}<span>返回</span></span>
                <div style="display:flex;flex-direction:column;align-items:center;">
                    <div class="ks-dual-switch" id="ks-ch-switch">
                        <span class="ks-dual-opt active" data-ch="st">酒馆记忆 · ST</span>
                        <span class="ks-dual-opt" data-ch="wx">微信记忆 · WX</span>
                    </div>
                    <div id="ks-ch-sub" style="font-size:6.5px;font-weight:700;color:#98A0B2;letter-spacing:0.8px;margin-top:2px;">
                        酒馆主线独立星图与防失忆库 · 绝不互通
                    </div>
                </div>
                <span class="ks-pill" id="ks-rain-replay-btn" title="重演落雨成点与连线">${M_ICO.rain}<span>落雨</span></span>
            </div>

            <!-- 中央动态视图容器 -->
            <div id="ks-main-viewport" style="position:relative;z-index:10;flex:1;min-height:0;display:flex;flex-direction:column;overflow:hidden;pointer-events:none;"></div>

            <!-- 底部 5 大功能栏：星图 / 总结(选楼层+自动总结) / 编年 / 注入(防失忆监控) / 契约 -->
            <div class="ks-dock-bar" id="ks-bottom-dock">
                <div class="ks-dock-item active" data-kstab="map">
                    ${M_ICO.tabMap}<span class="ks-dock-zh">星图脉络</span><span class="ks-dock-kr">성좌 · MAP</span>
                </div>
                <div class="ks-dock-item" data-kstab="summary">
                    ${M_ICO.tabSum}<span class="ks-dock-zh">楼层总结</span><span class="ks-dock-kr">요약 · SUM</span>
                </div>
                <div class="ks-dock-item" data-kstab="timeline">
                    ${M_ICO.tabTime}<span class="ks-dock-zh">记忆编年</span><span class="ks-dock-kr">연대기 · LOG</span>
                </div>
                <div class="ks-dock-item" data-kstab="inject">
                    ${M_ICO.tabPrompt}<span class="ks-dock-zh">防失忆注入</span><span class="ks-dock-kr">주입 · SYNC</span>
                </div>
                <div class="ks-dock-item" data-kstab="pact">
                    ${M_ICO.tabPact}<span class="ks-dock-zh">双轨契约</span><span class="ks-dock-kr">서약 · PACT</span>
                </div>
            </div>
        `;
        modal.appendChild(overlay);

        // ══════════════════════════════════════════════════════════════════════════
        // 🌧️ 100% 原封不动保留你认可的「纯白背景 + 清透冷银泪滴 + 触水微珠 + 三层涟漪 + 4px微点」引擎
        // ══════════════════════════════════════════════════════════════════════════
        const canvas = topDoc.getElementById("ks-pure-canvas");
        const ctx = canvas.getContext("2d");
        let animId = null, W = 390, H = 780;
        let dragNodeId = null, dragMoved = false, pStart = { x: 0, y: 0 };

        const fallingDrops = [];
        const splashBeads = [];
        const ripples = [];
        const landedNodeMap = new Map();
        let lineGrow = 0;

        function resizeCanvas() {
            const rect = overlay.getBoundingClientRect();
            W = rect.width || topWin.innerWidth || 390;
            H = rect.height || topWin.innerHeight || 780;
            const dpr = Math.min(topWin.devicePixelRatio || 1, 2);
            canvas.width = W * dpr;
            canvas.height = H * dpr;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        }

        function triggerImpactSplash(x, y, isNodeImpact = true) {
            const maxR = isNodeImpact ? 48 : 32;
            ripples.push({ x, y, r: 1.5, maxR, alpha: isNodeImpact ? 0.52 : 0.32, lw: 0.8 });
            setTimeout(() => {
                ripples.push({ x, y, r: 1, maxR: maxR * 0.70, alpha: isNodeImpact ? 0.35 : 0.20, lw: 0.6 });
            }, 130);
            if (isNodeImpact) {
                setTimeout(() => {
                    ripples.push({ x, y, r: 1, maxR: maxR * 0.44, alpha: 0.22, lw: 0.45 });
                }, 260);
            }
            const count = isNodeImpact ? 3 : 2;
            for (let i = 0; i < count; i++) {
                const ang = -Math.PI * (0.28 + (i / (count - 1 || 1)) * 0.44) + (Math.random() - 0.5) * 0.15;
                const spd = (isNodeImpact ? 1.5 : 1.0) + Math.random() * 0.8;
                splashBeads.push({
                    x, y,
                    vx: Math.cos(ang) * spd,
                    vy: Math.sin(ang) * spd - 0.7,
                    baseY: y,
                    r: isNodeImpact ? 1.1 : 0.85,
                    alpha: 0.65
                });
            }
        }

        function spawnFallingRaindrop(tx, ty, targetNodeId = null, delayMs = 0) {
            setTimeout(() => {
                fallingDrops.push({
                    x: tx,
                    y: Math.max(-30, ty - (150 + Math.random() * 60)),
                    startY: Math.max(-30, ty - 170),
                    targetY: ty,
                    vy: 3.0,
                    gravity: 0.38,
                    tailLen: 36,
                    targetNodeId
                });
            }, delayMs);
        }

        function playRainToWebSequence() {
            const d = loadMem();
            if (!d || !d.isBound) return;
            fallingDrops.length = 0;
            landedNodeMap.clear();
            lineGrow = 0;

            const flt = d.filter || "all";
            const visNodes = (d.nodes || []).filter((n) => flt === "all" || n.type === "core" || n.type === flt);
            visNodes.forEach((n, idx) => {
                spawnFallingRaindrop((n.xPct / 100) * W, (n.yPct / 100) * H, Number(n.id), idx * 125);
            });
        }

        function drawCrystalTeardrop(fd) {
            ctx.save();
            const tailY = Math.max(fd.startY, fd.y - fd.tailLen);
            const grad = ctx.createLinearGradient(fd.x, tailY, fd.x, fd.y - 4);
            grad.addColorStop(0, "rgba(140, 148, 166, 0)");
            grad.addColorStop(0.65, "rgba(140, 148, 166, 0.25)");
            grad.addColorStop(1, "rgba(90, 98, 116, 0.55)");

            ctx.beginPath();
            ctx.moveTo(fd.x, tailY);
            ctx.lineTo(fd.x, fd.y - 4);
            ctx.strokeStyle = grad;
            ctx.lineWidth = 0.75;
            ctx.lineCap = "round";
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(fd.x, fd.y - 6.2);
            ctx.bezierCurveTo(fd.x + 2.3, fd.y - 1.8, fd.x + 2.1, fd.y + 1.6, fd.x, fd.y + 2.0);
            ctx.bezierCurveTo(fd.x - 2.1, fd.y + 1.6, fd.x - 2.3, fd.y - 1.8, fd.x, fd.y - 6.2);
            ctx.closePath();

            const dropGrd = ctx.createLinearGradient(fd.x, fd.y - 6, fd.x, fd.y + 2);
            dropGrd.addColorStop(0, "rgba(255, 255, 255, 0.95)");
            dropGrd.addColorStop(0.6, "rgba(195, 204, 220, 0.85)");
            dropGrd.addColorStop(1, "rgba(105, 114, 134, 0.90)");
            ctx.fillStyle = dropGrd;
            ctx.fill();

            ctx.strokeStyle = "rgba(82, 90, 108, 0.65)";
            ctx.lineWidth = 0.7;
            ctx.stroke();

            ctx.beginPath();
            ctx.arc(fd.x - 0.6, fd.y - 0.4, 0.65, 0, Math.PI * 2);
            ctx.fillStyle = "#FFFFFF";
            ctx.fill();
            ctx.restore();
        }

        function getPos(n, t) {
            const fx = dragNodeId === n.id ? 0 : Math.sin(t * 0.55 + n.id * 1.7) * 1.6;
            const fy = dragNodeId === n.id ? 0 : Math.cos(t * 0.48 + n.id * 1.3) * 1.6;
            return { x: (n.xPct / 100) * W + fx, y: (n.yPct / 100) * H + fy };
        }

        function renderCanvasLoop(ts) {
            if (!overlay.classList.contains("open")) { animId = null; return; }
            const t = ts * 0.001;
            ctx.clearRect(0, 0, W, H);

            if (Math.random() < 0.005 && fallingDrops.length < 2) {
                spawnFallingRaindrop(W * (0.14 + Math.random() * 0.72), H * (0.18 + Math.random() * 0.46), null, 0);
            }

            for (let i = fallingDrops.length - 1; i >= 0; i--) {
                const fd = fallingDrops[i];
                fd.vy += fd.gravity;
                fd.y += fd.vy;
                drawCrystalTeardrop(fd);
                if (fd.y >= fd.targetY) {
                    triggerImpactSplash(fd.x, fd.targetY, fd.targetNodeId !== null);
                    if (fd.targetNodeId !== null) landedNodeMap.set(Number(fd.targetNodeId), 0.06);
                    fallingDrops.splice(i, 1);
                }
            }

            for (let i = splashBeads.length - 1; i >= 0; i--) {
                const sb = splashBeads[i];
                sb.x += sb.vx; sb.y += sb.vy; sb.vy += 0.16; sb.alpha *= 0.93;
                if (sb.y > sb.baseY + 2 || sb.alpha < 0.04) { splashBeads.splice(i, 1); continue; }
                ctx.beginPath();
                ctx.arc(sb.x, sb.y, sb.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(105, 114, 134, ${sb.alpha})`;
                ctx.fill();
            }

            for (let i = ripples.length - 1; i >= 0; i--) {
                const rp = ripples[i];
                rp.r += (rp.maxR - rp.r) * 0.055 + 0.25;
                rp.alpha *= 0.95;
                if (rp.alpha < 0.015) { ripples.splice(i, 1); continue; }
                ctx.beginPath();
                ctx.arc(rp.x, rp.y, rp.r, 0, Math.PI * 2);
                ctx.strokeStyle = `rgba(120, 128, 146, ${rp.alpha})`;
                ctx.lineWidth = rp.lw || 0.65;
                ctx.stroke();
            }

            const d = loadMem();
            if (d && d.isBound && d.activeTab === "map") {
                const flt = d.filter || "all";
                const visNodes = (d.nodes || []).filter((n) => flt === "all" || n.type === "core" || n.type === flt);
                const posMap = new Map();

                let landedCount = 0;
                visNodes.forEach((n) => {
                    const nid = Number(n.id);
                    posMap.set(nid, getPos(n, t));
                    if (!landedNodeMap.has(nid) && fallingDrops.length === 0) landedNodeMap.set(nid, 1);
                    if (landedNodeMap.has(nid)) {
                        landedCount++;
                        const curA = landedNodeMap.get(nid);
                        if (curA < 1) landedNodeMap.set(nid, Math.min(1, curA + 0.045));
                    }
                });

                if (landedCount >= 2 && lineGrow < 1) lineGrow = Math.min(1, lineGrow + 0.013);
                const ease = 1 - Math.pow(1 - lineGrow, 3);

                (d.edges || []).forEach((ed, idx) => {
                    const id1 = Number(ed.from), id2 = Number(ed.to);
                    if (!landedNodeMap.has(id1) || !landedNodeMap.has(id2)) return;
                    const p1 = posMap.get(id1), p2 = posMap.get(id2);
                    if (!p1 || !p2) return;

                    const prog = Math.max(0, Math.min(1, ease * 1.35 - (idx % 5) * 0.06));
                    if (prog <= 0) return;

                    const cx = p1.x + (p2.x - p1.x) * prog;
                    const cy = p1.y + (p2.y - p1.y) * prog;
                    const isHi = id1 === Number(d.activeNodeId) || id2 === Number(d.activeNodeId);

                    ctx.beginPath();
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(cx, cy);
                    ctx.strokeStyle = isHi ? "rgba(30, 32, 40, 0.65)" : "rgba(195, 200, 212, 0.48)";
                    ctx.lineWidth = isHi ? 0.9 : 0.58;
                    ctx.stroke();

                    if (isHi && prog > 0.95 && ed.label) {
                        const mx = (p1.x + p2.x) * 0.5, my = (p1.y + p2.y) * 0.5;
                        ctx.fillStyle = "rgba(255, 255, 255, 0.94)";
                        ctx.fillRect(mx - 14, my - 6, 28, 12);
                        ctx.font = "500 7.5px -apple-system, sans-serif";
                        ctx.textAlign = "center";
                        ctx.fillStyle = "#7E8494";
                        ctx.fillText(ed.label, mx, my + 2.5);
                    }
                });

                visNodes.forEach((n) => {
                    const nid = Number(n.id);
                    const reveal = landedNodeMap.get(nid) || 0;
                    if (reveal <= 0) return;

                    const p = posMap.get(nid);
                    const isSel = nid === Number(d.activeNodeId);
                    const isCore = n.type === "core";
                    const dotR = (isCore ? 4.5 : (isSel ? 4.0 : 3.0)) * reveal;

                    ctx.save();
                    ctx.globalAlpha = reveal;

                    ctx.beginPath();
                    ctx.arc(p.x, p.y, dotR + 5.5, 0, Math.PI * 2);
                    ctx.fillStyle = "#FFFFFF";
                    ctx.fill();

                    if (isSel || isCore) {
                        const ringR = dotR + 5.5 + Math.sin(t * 2 + nid) * 1.2;
                        ctx.beginPath();
                        ctx.arc(p.x, p.y, ringR, 0, Math.PI * 2);
                        ctx.strokeStyle = isSel ? "rgba(30, 32, 40, 0.45)" : "rgba(150, 156, 170, 0.40)";
                        ctx.lineWidth = 0.65;
                        ctx.stroke();
                    }

                    ctx.beginPath();
                    ctx.arc(p.x, p.y, dotR, 0, Math.PI * 2);
                    if (n.type === "memory" && !isSel) {
                        ctx.fillStyle = "#FFFFFF";
                        ctx.fill();
                        ctx.strokeStyle = "#585E70";
                        ctx.lineWidth = 1.2;
                        ctx.stroke();
                    } else {
                        ctx.fillStyle = isSel || isCore ? "#1E2028" : "#7E8494";
                        ctx.fill();
                    }

                    ctx.font = `${isSel || isCore ? "700 9.5px" : "500 8.5px"} -apple-system, "Apple SD Gothic Neo", "PingFang SC", sans-serif`;
                    ctx.textAlign = "center";
                    ctx.shadowColor = "#FFFFFF";
                    ctx.shadowBlur = 6;
                    ctx.fillStyle = isSel || isCore ? "#1E2028" : "#8E94A4";
                    ctx.fillText(n.title.slice(0, 7), p.x, p.y + dotR + 14);
                    ctx.restore();
                });
            }

            animId = requestAnimationFrame(renderCanvasLoop);
        }

        function hitTest(px, py) {
            const d = loadMem();
            if (!d || !d.isBound || d.activeTab !== "map") return null;
            const flt = d.filter || "all";
            const vis = (d.nodes || []).filter((n) => flt === "all" || n.type === "core" || n.type === flt);
            let best = null, minD = 26;
            vis.forEach((n) => {
                const dist = Math.hypot(px - (n.xPct / 100) * W, py - (n.yPct / 100) * H);
                if (dist < minD) { minD = dist; best = n; }
            });
            return best;
        }

        canvas.addEventListener("pointerdown", (e) => {
            const rect = canvas.getBoundingClientRect();
            const px = e.clientX - rect.left, py = e.clientY - rect.top;
            pStart = { x: px, y: py }; dragMoved = false;
            const hit = hitTest(px, py);
            if (hit) dragNodeId = hit.id;
            else spawnFallingRaindrop(px, py, null, 0);
        });

        canvas.addEventListener("pointermove", (e) => {
            if (!dragNodeId) return;
            const rect = canvas.getBoundingClientRect();
            const px = e.clientX - rect.left, py = e.clientY - rect.top;
            if (Math.hypot(px - pStart.x, py - pStart.y) > 4) {
                dragMoved = true;
                const d = loadMem();
                const tn = d?.nodes?.find((x) => Number(x.id) === Number(dragNodeId));
                if (tn) {
                    tn.xPct = Math.max(10, Math.min(90, (px / W) * 100));
                    tn.yPct = Math.max(16, Math.min(62, (py / H) * 100));
                    saveMem(d);
                }
            }
        });

        canvas.addEventListener("pointerup", () => {
            if (!dragNodeId) return;
            const d = loadMem();
            d.activeNodeId = dragNodeId;
            saveMem(d);
            const tn = d.nodes.find((x) => Number(x.id) === Number(dragNodeId));
            if (tn) triggerImpactSplash((tn.xPct / 100) * W, (tn.yPct / 100) * H, true);
            dragNodeId = null;
            renderCurrentView();
        });

        // ══════════════════════════════════════════════════════════════════════════
        // 🤍 渲染 5 大页面（星图 / 楼层总结 / 记忆编年 / 防失忆注入 / 双轨契约）
        // ══════════════════════════════════════════════════════════════════════════
        function renderCurrentView() {
            const ch = getCh();
            const c = getCtx();
            const d = loadMem(ch);
            const chLabel = ch === "st" ? "酒馆主线" : "微信线上";
            const totalChatLen = ch === "st" ? c.stChatArr.length : c.wxChatArr.length;

            // 更新顶栏双轨按钮与主页角标
            topDoc.querySelectorAll("#ks-ch-switch .ks-dual-opt").forEach((el) => {
                el.classList.toggle("active", el.getAttribute("data-ch") === ch);
            });
            topDoc.getElementById("ks-ch-sub").textContent = ch === "st"
                ? `酒馆主线独立星图与防失忆库 (当前共 ${totalChatLen} 层)`
                : `微信线上独立星图与防失忆库 (当前共 ${totalChatLen} 条)`;

            const badge = topDoc.getElementById("mt-home-badge");
            if (badge) {
                const totalS = (loadMem("st").summaries?.length || 0) + (loadMem("wx").summaries?.length || 0);
                badge.textContent = `${totalS}忆`;
            }

            const vp = topDoc.getElementById("ks-main-viewport");
            const dock = topDoc.getElementById("ks-bottom-dock");
            dock.querySelectorAll(".ks-dock-item").forEach((it) => {
                it.classList.toggle("active", it.getAttribute("data-kstab") === d.activeTab);
            });

            // 未绑定状态：展示当前轨道的绑定仪式
            if (!d.isBound) {
                dock.style.display = "none";
                vp.innerHTML = `
                    <div style="margin:auto 20px;pointer-events:auto;">
                        <div class="ks-card" style="padding:20px 18px!important;text-align:center;">
                            <div style="font-size:7.5px;font-weight:800;color:#8E96A8;letter-spacing:2px;margin-bottom:4px;">${ch === "st" ? "TAVERN MEMORY SEA · 酒馆主线轨" : "WECHAT MEMORY SEA · 微信日常轨"}</div>
                            <div style="font-size:14.5px;font-weight:800;color:#1E2028;margin-bottom:14px;">绑定与 ${c.charName} 的【${chLabel}记忆海】</div>

                            <div style="display:flex;align-items:center;justify-content:center;gap:22px;margin-bottom:14px;">
                                <img src="${c.userAvatar}" style="width:46px;height:46px;border-radius:50%;object-fit:cover;border:1.5px solid #E4E8F0;" />
                                <span style="font-size:12px;font-weight:900;color:#1E2028;">×</span>
                                <img src="${c.charAvatar}" style="width:46px;height:46px;border-radius:50%;object-fit:cover;border:1.5px solid #E4E8F0;" />
                            </div>

                            <div style="text-align:left;display:flex;flex-direction:column;gap:8px;margin-bottom:14px;">
                                <div>
                                    <div style="font-size:8px;font-weight:700;color:#7E8494;margin-bottom:3px;">${chLabel}记忆档案名</div>
                                    <input type="text" id="ks-b-title" value="${(d.pact.title || "").replace(/"/g, "&quot;")}" style="width:100%;height:29px;background:#F8F9FC;border:1px solid #E4E8F0;border-radius:8px;padding:0 9px;font-size:9.8px;font-weight:700;color:#1E2028;box-sizing:border-box;outline:none;" />
                                </div>
                                <div>
                                    <div style="font-size:8px;font-weight:700;color:#7E8494;margin-bottom:3px;">当前关系阶段</div>
                                    <input type="text" id="ks-b-stage" value="${(d.pact.stage || "").replace(/"/g, "&quot;")}" style="width:100%;height:29px;background:#F8F9FC;border:1px solid #E4E8F0;border-radius:8px;padding:0 9px;font-size:9.8px;font-weight:700;color:#1E2028;box-sizing:border-box;outline:none;" />
                                </div>
                                <div>
                                    <div style="font-size:8px;font-weight:700;color:#7E8494;margin-bottom:3px;">核心防失忆锚点（AI永不违背的底层设定）</div>
                                    <textarea id="ks-b-anchor" style="width:100%;height:44px;background:#F8F9FC;border:1px solid #E4E8F0;border-radius:8px;padding:6px 9px;font-size:9.5px;color:#1E2028;box-sizing:border-box;resize:none;outline:none;">${(d.pact.coreAnchor || "").replace(/</g, "&lt;")}</textarea>
                                </div>
                            </div>

                            <div id="ks-do-bind" class="ks-pill dark" style="width:100%!important;height:34px!important;font-size:10px!important;box-sizing:border-box!important;">
                                ${M_ICO.rain}<span>落雨成点 · 激活【${chLabel}】防失忆星图</span>
                            </div>
                        </div>
                    </div>
                `;
                topDoc.getElementById("ks-do-bind").onclick = () => {
                    const latest = loadMem(ch);
                    latest.pact.title = topDoc.getElementById("ks-b-title").value.trim() || `${c.userName} × ${c.charName}`;
                    latest.pact.stage = topDoc.getElementById("ks-b-stage").value.trim() || "深度羁绊";
                    latest.pact.coreAnchor = topDoc.getElementById("ks-b-anchor").value.trim();
                    latest.isBound = true;
                    saveMem(latest, ch);
                    renderCurrentView();
                    playRainToWebSequence();
                };
                return;
            }

            dock.style.display = "grid";

            // ── 页面 1：【星图脉络 (map)】（酒馆与微信各自独立一张图） ──
            if (d.activeTab === "map") {
                const cur = d.nodes.find((x) => Number(x.id) === Number(d.activeNodeId));
                const meta = cur ? (NODE_META[cur.type] || NODE_META.memory) : null;
                const linked = cur ? (d.edges || []).filter((e) => Number(e.from) === Number(cur.id) || Number(e.to) === Number(cur.id)) : [];
                const jumpHtml = linked.map((e) => {
                    const oid = Number(e.from) === Number(cur.id) ? e.to : e.from;
                    const onode = d.nodes.find((n) => Number(n.id) === Number(oid));
                    return onode ? `<span class="ks-flt" data-jump="${onode.id}">${e.label || "关联"} · ${onode.title.replace(/</g, "&lt;")}</span>` : "";
                }).join("");

                vp.innerHTML = `
                    <div style="padding:10px 14px 0 14px;display:flex;justify-content:space-between;align-items:center;pointer-events:auto;">
                        <div style="display:flex;gap:5px;">
                            <span class="ks-flt ${d.filter === "all" ? "on" : ""}" data-flt="all">${ch === "st" ? "酒馆全图" : "微信全图"} (${d.nodes.length})</span>
                            <span class="ks-flt ${d.filter === "memory" ? "on" : ""}" data-flt="memory">记忆</span>
                            <span class="ks-flt ${d.filter === "relation" ? "on" : ""}" data-flt="relation">羁绊</span>
                            <span class="ks-flt ${d.filter === "knot" ? "on" : ""}" data-flt="knot">心结</span>
                        </div>
                        <span style="font-size:7.5px;font-weight:700;color:#8E94A4;">拖拽微点可调整位置</span>
                    </div>

                    <div style="margin-top:auto;padding:0 14px 10px 14px;display:flex;flex-direction:column;gap:8px;pointer-events:auto;">
                        ${cur ? `
                        <div class="ks-card">
                            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:5px;">
                                <div style="display:flex;align-items:center;gap:6px;">
                                    <span style="font-size:7.5px;font-weight:800;color:#8E94A4;font-family:monospace;">${meta.code}</span>
                                    <span style="font-size:11.8px;font-weight:800;color:#1E2028;">${cur.title.replace(/</g, "&lt;")}</span>
                                    <span style="font-size:7.2px;font-weight:700;color:#585E70;background:#F2F4F8;padding:1.5px 6px;border-radius:99px;">${chLabel}·${meta.name}</span>
                                </div>
                                <div style="display:flex;align-items:center;gap:8px;">
                                    ${cur.type !== "core" ? `<span id="ks-del-node" style="cursor:pointer;display:inline-flex;">${M_ICO.trash}</span>` : ""}
                                    <span id="ks-hide-node" style="cursor:pointer;color:#8E94A4;display:inline-flex;">${M_ICO.close}</span>
                                </div>
                            </div>
                            <div style="font-size:10.2px;font-weight:600;color:#3A3E4C;line-height:1.6;">${cur.content.replace(/</g, "&lt;")}</div>
                            ${jumpHtml ? `<div style="display:flex;flex-wrap:wrap;gap:4px;margin-top:6px;">${jumpHtml}</div>` : ""}
                            <div style="margin-top:7px;padding:6px 10px;background:#F8F9FC;border-left:2px solid #1E2028;border-radius:0 8px 8px 0;font-size:9.4px;font-weight:600;color:#1E2028;">
                                ${(cur.whisper || "“ 这段记忆一直在我们之间。”").replace(/</g, "&lt;")}
                            </div>
                        </div>` : ""}

                        <div id="ks-add-node-box" class="ks-card" style="display:none;">
                            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
                                <span style="font-size:9.5px;font-weight:800;color:#1E2028;">手动新增【${chLabel}】星图节点</span>
                                <span id="ks-close-add" style="cursor:pointer;color:#8E94A4;">${M_ICO.close}</span>
                            </div>
                            <div style="display:flex;gap:5px;margin-bottom:6px;">
                                <select id="ks-new-ntype" style="height:27px;background:#F8F9FC;border:1px solid #E4E8F0;border-radius:7px;font-size:9px;font-weight:700;color:#1E2028;outline:none;">
                                    <option value="memory">总结记忆</option>
                                    <option value="relation">关系羁绊</option>
                                    <option value="knot">伏笔心结</option>
                                </select>
                                <input type="text" id="ks-new-ntitle" placeholder="节点名(4~6字)" style="flex:1;height:27px;background:#F8F9FC;border:1px solid #E4E8F0;border-radius:7px;padding:0 8px;font-size:9.5px;font-weight:700;color:#1E2028;outline:none;" />
                                <input type="text" id="ks-new-nedge" placeholder="连线词" style="width:68px;height:27px;background:#F8F9FC;border:1px solid #E4E8F0;border-radius:7px;padding:0 6px;font-size:9px;color:#1E2028;outline:none;" />
                            </div>
                            <textarea id="ks-new-ncontent" placeholder="填写该节点的记忆详情（将自动写入防失忆注入库）..." style="width:100%;height:42px;background:#F8F9FC;border:1px solid #E4E8F0;border-radius:7px;padding:5px 8px;font-size:9.5px;color:#1E2028;box-sizing:border-box;resize:none;outline:none;margin-bottom:6px;"></textarea>
                            <div style="display:flex;justify-content:flex-end;">
                                <span class="ks-pill dark" id="ks-submit-node">落雨成点并存入记忆库</span>
                            </div>
                        </div>

                        <div style="display:flex;gap:6px;">
                            <span class="ks-pill" id="ks-open-add" style="flex:1;">${M_ICO.plus}<span>新增节点</span></span>
                            <span class="ks-pill dark" id="ks-goto-sum" style="flex:1.4;">${M_ICO.spark}<span>去选楼层总结防失忆 (${d.summaries?.length || 0}篇)</span></span>
                        </div>
                    </div>
                `;

                vp.querySelectorAll("[data-flt]").forEach((b) => b.onclick = () => {
                    const latest = loadMem(ch); latest.filter = b.getAttribute("data-flt"); saveMem(latest, ch); renderCurrentView();
                });
                vp.querySelectorAll("[data-jump]").forEach((b) => b.onclick = () => {
                    const latest = loadMem(ch); latest.activeNodeId = Number(b.getAttribute("data-jump")); saveMem(latest, ch); renderCurrentView();
                });
                topDoc.getElementById("ks-hide-node")?.addEventListener("click", () => {
                    const latest = loadMem(ch); latest.activeNodeId = 0; saveMem(latest, ch); renderCurrentView();
                });
                topDoc.getElementById("ks-del-node")?.addEventListener("click", () => {
                    if (!confirm(`确定删除节点「${cur.title}」吗？`)) return;
                    const latest = loadMem(ch);
                    latest.nodes = latest.nodes.filter((x) => Number(x.id) !== Number(cur.id));
                    latest.edges = latest.edges.filter((e) => Number(e.from) !== Number(cur.id) && Number(e.to) !== Number(cur.id));
                    latest.activeNodeId = latest.nodes[0]?.id || 0; saveMem(latest, ch); renderCurrentView();
                });
                const addBox = topDoc.getElementById("ks-add-node-box");
                topDoc.getElementById("ks-open-add").onclick = () => { addBox.style.display = addBox.style.display === "none" ? "block" : "none"; };
                topDoc.getElementById("ks-close-add").onclick = () => { addBox.style.display = "none"; };
                topDoc.getElementById("ks-goto-sum").onclick = () => {
                    const latest = loadMem(ch); latest.activeTab = "summary"; saveMem(latest, ch); renderCurrentView();
                };
                topDoc.getElementById("ks-submit-node").onclick = () => {
                    const tp = topDoc.getElementById("ks-new-ntype").value;
                    const ti = topDoc.getElementById("ks-new-ntitle").value.trim() || "关键记忆";
                    const ed = topDoc.getElementById("ks-new-nedge").value.trim() || "牵连";
                    const ct = topDoc.getElementById("ks-new-ncontent").value.trim();
                    if (!ct) return alert("请填写节点记忆内容！");
                    const latest = loadMem(ch), nid = Date.now(), cnt = latest.nodes.length + 1;
                    const xPct = Math.max(14, Math.min(86, Math.round(50 + Math.cos(cnt * 2.3) * 24)));
                    const yPct = Math.max(18, Math.min(58, Math.round(38 + Math.sin(cnt * 2.3) * 18)));
                    const fromId = latest.activeNodeId || latest.nodes[0]?.id || 1;
                    latest.nodes.push({ id: nid, type: tp, title: ti, xPct, yPct, content: ct, whisper: `“ 已刻入${chLabel}持久记忆。”` });
                    latest.edges.push({ from: fromId, to: nid, label: ed });
                    latest.activeNodeId = nid; saveMem(latest, ch);
                    spawnFallingRaindrop((xPct / 100) * W, (yPct / 100) * H, nid, 0);
                    renderCurrentView();
                };
                return;
            }

            // ── 页面 2：【楼层总结 (summary)】（手动选楼层区间总结 + 自定义每N层全自动总结） ──
            if (d.activeTab === "summary") {
                const maxFloor = Math.max(0, totalChatLen - 1);
                const lastSumFloor = Math.min(maxFloor, Number(d.autoCfg?.lastFloor) || 0);
                const sumsHtml = (d.summaries || []).map((s) => `
                    <div class="ks-card" style="margin-bottom:9px;padding:12px 14px!important;">
                        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;">
                            <span style="font-size:8px;font-weight:800;color:#1E2028;background:#F0F2F7;padding:2px 7px;border-radius:99px;font-family:monospace;">${s.range.replace(/</g, "&lt;")}</span>
                            <div style="display:flex;align-items:center;gap:8px;">
                                <span style="font-size:7.5px;color:#8E94A4;">${s.time || ""}</span>
                                <span data-delsum="${s.id}" style="cursor:pointer;display:inline-flex;">${M_ICO.trash}</span>
                            </div>
                        </div>
                        <div style="font-size:11px;font-weight:800;color:#1E2028;margin-bottom:4px;">${s.title.replace(/</g, "&lt;")}</div>
                        <div style="font-size:9.8px;font-weight:600;color:#3A3E4C;line-height:1.6;">${s.content.replace(/</g, "&lt;")}</div>
                        ${s.keyFacts ? `<div style="margin-top:6px;padding:5px 8px;background:#F8F9FC;border-radius:7px;font-size:8.8px;font-weight:700;color:#525868;">核心防失忆要点：${s.keyFacts.replace(/</g, "&lt;")}</div>` : ""}
                    </div>
                `).join("");

                vp.innerHTML = `
                    <div style="flex:1;overflow-y:auto;padding:12px 14px 16px 14px;pointer-events:auto;">
                        <!-- 模块A：手动指定楼层区间总结 -->
                        <div class="ks-card" style="margin-bottom:10px;">
                            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
                                <div>
                                    <div style="font-size:11px;font-weight:800;color:#1E2028;">手动选择【${chLabel}】楼层总结</div>
                                    <div style="font-size:7.8px;color:#7E8494;margin-top:1px;">当前${chLabel}共 <b>${totalChatLen}</b> 层 (楼层号 #0 ~ #${maxFloor}) · 黄金防失忆</div>
                                </div>
                                <span class="ks-flt" id="ks-fill-unsum">填入未总结层</span>
                            </div>
                            <div style="display:flex;align-items:center;justify-content:space-between;gap:6px;">
                                <div style="display:flex;align-items:center;gap:4px;">
                                    <span style="font-size:9px;font-weight:700;color:#525868;">从 #</span>
                                    <input type="number" id="ks-sum-start" class="ks-num-inp" min="0" max="${maxFloor}" value="${lastSumFloor}" />
                                    <span style="font-size:9px;font-weight:700;color:#525868;">层 到 #</span>
                                    <input type="number" id="ks-sum-end" class="ks-num-inp" min="0" max="${maxFloor}" value="${maxFloor}" />
                                    <span style="font-size:9px;font-weight:700;color:#525868;">层</span>
                                </div>
                                <span class="ks-pill dark" id="ks-run-range-sum">${M_ICO.spark}<span>立即提炼总结</span></span>
                            </div>
                        </div>

                        <!-- 模块B：全自动楼层总结设置（可自由输入每多少层总结一次） -->
                        <div class="ks-card" style="margin-bottom:12px;">
                            <div style="display:flex;justify-content:space-between;align-items:center;">
                                <div>
                                    <div style="font-size:10.5px;font-weight:800;color:#1E2028;">全自动楼层总结设置</div>
                                    <div style="font-size:7.8px;color:#7E8494;margin-top:2px;">开启后，${chLabel}每满指定层数自动提炼总结并连入星图</div>
                                </div>
                                <div style="display:flex;align-items:center;gap:5px;">
                                    <span style="font-size:8.8px;font-weight:700;color:#525868;">每</span>
                                    <input type="number" id="ks-auto-n" class="ks-num-inp" min="3" max="200" value="${d.autoCfg?.everyN || 15}" />
                                    <span style="font-size:8.8px;font-weight:700;color:#525868;">层</span>
                                    <span class="ks-flt ${d.autoCfg?.enabled ? "on" : ""}" id="ks-toggle-auto">${d.autoCfg?.enabled ? "已开启✓" : "已关闭"}</span>
                                </div>
                            </div>
                        </div>

                        <div style="font-size:9px;font-weight:800;color:#8E94A4;letter-spacing:0.8px;margin-bottom:7px;padding-left:2px;">
                            ARCHIVED SUMMARIES · 已归档的${chLabel}防失忆总结 (${d.summaries?.length || 0})
                        </div>
                        ${sumsHtml || `<div style="text-align:center;color:#98A0B2;font-size:10px;padding:24px;">暂无楼层总结，点击上方按钮即可提炼</div>`}
                    </div>
                `;

                topDoc.getElementById("ks-fill-unsum").onclick = () => {
                    topDoc.getElementById("ks-sum-start").value = lastSumFloor;
                    topDoc.getElementById("ks-sum-end").value = maxFloor;
                };
                topDoc.getElementById("ks-run-range-sum").onclick = async (e) => {
                    const btn = e.currentTarget, orig = btn.innerHTML;
                    const sVal = Number(topDoc.getElementById("ks-sum-start").value) || 0;
                    const eVal = Number(topDoc.getElementById("ks-sum-end").value) || maxFloor;
                    btn.textContent = "提炼总结中...";
                    try {
                        const ok = await summarizeFloorRange(ch, sVal, eVal, false);
                        if (ok) renderCurrentView();
                    } catch (err) { alert(err.message); } finally { btn.innerHTML = orig; }
                };
                topDoc.getElementById("ks-auto-n").onchange = (e) => {
                    const val = Math.max(3, Math.min(200, Number(e.target.value) || 15));
                    const latest = loadMem(ch); latest.autoCfg.everyN = val; saveMem(latest, ch); renderCurrentView();
                };
                topDoc.getElementById("ks-toggle-auto").onclick = () => {
                    const latest = loadMem(ch);
                    latest.autoCfg.enabled = !latest.autoCfg.enabled;
                    latest.autoCfg.everyN = Math.max(3, Math.min(200, Number(topDoc.getElementById("ks-auto-n").value) || 15));
                    if (latest.autoCfg.enabled && !latest.autoCfg.lastFloor) latest.autoCfg.lastFloor = totalChatLen;
                    saveMem(latest, ch); renderCurrentView();
                };
                vp.querySelectorAll("[data-delsum]").forEach((b) => b.onclick = () => {
                    const latest = loadMem(ch);
                    latest.summaries = latest.summaries.filter((x) => Number(x.id) !== Number(b.getAttribute("data-delsum")));
                    saveMem(latest, ch); renderCurrentView();
                });
                return;
            }

            // ── 页面 3：【记忆编年 (timeline)】 ──
            if (d.activeTab === "timeline") {
                const listHtml = (d.timeline || []).map((it) => `
                    <div style="position:relative;padding-left:16px;padding-bottom:12px;border-left:1px solid #E4E8F0;">
                        <span style="position:absolute;left:-4px;top:4px;width:7px;height:7px;border-radius:50%;background:#FFFFFF;border:1.5px solid #1E2028;"></span>
                        <div class="ks-card" style="padding:11px 13px!important;">
                            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:3px;">
                                <span style="font-size:7.5px;font-weight:800;color:#8E94A4;font-family:monospace;">${(it.chapter || "CHAPTER").replace(/</g, "&lt;")}</span>
                                <span data-deltl="${it.id}" style="cursor:pointer;display:inline-flex;">${M_ICO.trash}</span>
                            </div>
                            <div style="font-size:11px;font-weight:800;color:#1E2028;margin-bottom:4px;">${it.title.replace(/</g, "&lt;")}</div>
                            <div style="font-size:9.8px;font-weight:600;color:#484E5C;line-height:1.6;">${it.content.replace(/</g, "&lt;")}</div>
                            ${it.note ? `<div style="margin-top:5px;padding-top:5px;border-top:1px dashed #ECEEF4;font-size:8.8px;color:#6E7688;">${it.note.replace(/</g, "&lt;")}</div>` : ""}
                        </div>
                    </div>
                `).join("");

                vp.innerHTML = `
                    <div style="flex:1;overflow-y:auto;padding:12px 14px 16px 14px;pointer-events:auto;">
                        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">
                            <div>
                                <div style="font-size:12px;font-weight:800;color:#1E2028;">【${chLabel}】记忆编年史</div>
                                <div style="font-size:7.5px;color:#8E94A4;">记录重大关系转折与名场面</div>
                            </div>
                            <span class="ks-pill dark" id="ks-tl-add">${M_ICO.plus}<span>新增篇章</span></span>
                        </div>
                        <div id="ks-tl-box" class="ks-card" style="display:none;margin-bottom:10px;">
                            <input type="text" id="ks-tl-ti" placeholder="篇章标题..." style="width:100%;height:28px;background:#F8F9FC;border:1px solid #E4E8F0;border-radius:7px;padding:0 8px;font-size:9.8px;font-weight:700;color:#1E2028;box-sizing:border-box;outline:none;margin-bottom:6px;" />
                            <textarea id="ks-tl-ct" placeholder="写下这段重要事件..." style="width:100%;height:44px;background:#F8F9FC;border:1px solid #E4E8F0;border-radius:7px;padding:5px 8px;font-size:9.5px;color:#1E2028;box-sizing:border-box;resize:none;outline:none;margin-bottom:6px;"></textarea>
                            <div style="display:flex;justify-content:flex-end;"><span class="ks-pill dark" id="ks-tl-save">保存篇章</span></div>
                        </div>
                        <div style="padding-left:6px;">${listHtml}</div>
                    </div>
                `;
                const tlBox = topDoc.getElementById("ks-tl-box");
                topDoc.getElementById("ks-tl-add").onclick = () => { tlBox.style.display = tlBox.style.display === "none" ? "block" : "none"; };
                topDoc.getElementById("ks-tl-save").onclick = () => {
                    const ti = topDoc.getElementById("ks-tl-ti").value.trim() || "新篇章";
                    const ct = topDoc.getElementById("ks-tl-ct").value.trim();
                    if (!ct) return;
                    const latest = loadMem(ch);
                    latest.timeline.unshift({ id: Date.now(), chapter: `CHAPTER ${String(latest.timeline.length + 1).padStart(2, "0")}`, title: ti, content: ct, note: `“ 归档于${chLabel}记忆海 ”` });
                    saveMem(latest, ch); renderCurrentView();
                };
                vp.querySelectorAll("[data-deltl]").forEach((b) => b.onclick = () => {
                    const latest = loadMem(ch);
                    latest.timeline = latest.timeline.filter((x) => Number(x.id) !== Number(b.getAttribute("data-deltl")));
                    saveMem(latest, ch); renderCurrentView();
                });
                return;
            }

            // ── 页面 4：【防失忆注入监控台 (inject)】 ──
            if (d.activeTab === "inject") {
                const promptPreview = buildChannelPromptText(ch) || "（当前未开启注入或暂无总结内容）";
                vp.innerHTML = `
                    <div style="flex:1;overflow-y:auto;padding:12px 14px 16px 14px;pointer-events:auto;">
                        <div class="ks-card" style="margin-bottom:10px;">
                            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
                                <div>
                                    <div style="font-size:11.5px;font-weight:800;color:#1E2028;">【${chLabel}】底层防失忆注入开关</div>
                                    <div style="font-size:7.8px;color:#7E8494;margin-top:2px;">
                                        ${ch === "st" ? "实时通过 setExtensionPrompt 注入酒馆主线上下文，绝不混入微信记忆" : "仅在手机微信 AI 聊天时独立挂载，绝不污染酒馆主线"}
                                    </div>
                                </div>
                                <span class="ks-flt ${d.autoCfg?.injectEnabled !== false ? "on" : ""}" id="ks-tog-inj">
                                    ${d.autoCfg?.injectEnabled !== false ? "实时注入中✓" : "已暂停"}
                                </span>
                            </div>
                            <div style="display:flex;align-items:center;justify-content:space-between;padding-top:8px;border-top:1px solid #F2F4F8;">
                                <span style="font-size:9px;font-weight:700;color:#525868;">注入上下文深度 (Depth，越小权重越高)</span>
                                <div style="display:flex;align-items:center;gap:5px;">
                                    <input type="number" id="ks-inj-depth" class="ks-num-inp" min="0" max="10" value="${d.autoCfg?.injectDepth ?? 2}" />
                                    <span class="ks-pill" id="ks-sync-now" style="height:24px!important;font-size:8px!important;">立即刷新注入</span>
                                </div>
                            </div>
                        </div>

                        <div class="ks-card">
                            <div style="font-size:8.5px;font-weight:800;color:#8E94A4;letter-spacing:0.8px;margin-bottom:6px;">
                                LIVE PROMPT PREVIEW · 当前实际喂给【${chLabel} AI】的防失忆提示词全文
                            </div>
                            <pre style="margin:0;padding:10px;background:#F8F9FC;border:1px solid #ECEEF4;border-radius:10px;font-size:8.8px;color:#2C303C;line-height:1.6;white-space:pre-wrap;word-break:break-all;font-family:monospace;max-height:290px;overflow-y:auto;">${promptPreview.replace(/</g, "&lt;")}</pre>
                        </div>
                    </div>
                `;
                topDoc.getElementById("ks-tog-inj").onclick = () => {
                    const latest = loadMem(ch);
                    latest.autoCfg.injectEnabled = !(latest.autoCfg.injectEnabled !== false);
                    saveMem(latest, ch); renderCurrentView();
                };
                topDoc.getElementById("ks-inj-depth").onchange = (e) => {
                    const latest = loadMem(ch);
                    latest.autoCfg.injectDepth = Math.max(0, Math.min(10, Number(e.target.value) || 2));
                    saveMem(latest, ch); renderCurrentView();
                };
                topDoc.getElementById("ks-sync-now").onclick = () => {
                    syncMemoryInjectionToSystem();
                    alert(`已将【${chLabel}】最新总结与星图记忆同步注入到底层上下文！`);
                };
                return;
            }

            // ── 页面 5：【双轨契约 (pact)】 ──
            if (d.activeTab === "pact") {
                vp.innerHTML = `
                    <div style="flex:1;overflow-y:auto;padding:12px 14px 16px 14px;pointer-events:auto;">
                        <div class="ks-card" style="text-align:center;padding:18px 16px!important;">
                            <div style="font-size:7.5px;font-weight:800;color:#8E94A4;letter-spacing:2px;margin-bottom:6px;">${ch === "st" ? "TAVERN PACT · 酒馆主线契约" : "WECHAT PACT · 微信线上契约"}</div>
                            <div style="display:flex;align-items:center;justify-content:center;gap:18px;margin-bottom:10px;">
                                <img src="${c.userAvatar}" style="width:44px;height:44px;border-radius:50%;object-fit:cover;border:1.5px solid #E4E8F0;" />
                                <span style="font-size:11px;font-weight:800;color:#1E2028;">×</span>
                                <img src="${c.charAvatar}" style="width:44px;height:44px;border-radius:50%;object-fit:cover;border:1.5px solid #E4E8F0;" />
                            </div>
                            <div style="font-size:13px;font-weight:800;color:#1E2028;margin-bottom:4px;">${(d.pact?.title || "").replace(/</g, "&lt;")}</div>
                            <div style="font-size:8.5px;font-weight:700;color:#7E8494;margin-bottom:10px;">${(d.pact?.stage || "").replace(/</g, "&lt;")}</div>
                            <div style="text-align:left;background:#F8F9FC;padding:10px 12px;border-radius:10px;margin-bottom:12px;">
                                <div style="font-size:7.5px;font-weight:800;color:#8E94A4;margin-bottom:3px;">CORE ANCHOR · 核心防失忆人设与关系锚点</div>
                                <div style="font-size:9.8px;font-weight:600;color:#2C303C;line-height:1.6;">${(d.pact?.coreAnchor || "").replace(/</g, "&lt;")}</div>
                            </div>
                            <span class="ks-pill" id="ks-rebind-btn" style="width:100%!important;box-sizing:border-box!important;">修改【${chLabel}】契约与核心锚点</span>
                        </div>
                    </div>
                `;
                topDoc.getElementById("ks-rebind-btn").onclick = () => {
                    const latest = loadMem(ch); latest.isBound = false; saveMem(latest, ch); renderCurrentView();
                };
            }
        }

        // 顶栏「酒馆记忆 ⇄ 微信记忆」切换事件
        topDoc.querySelectorAll("#ks-ch-switch .ks-dual-opt").forEach((opt) => {
            opt.onclick = (e) => {
                e.stopPropagation();
                const targetCh = opt.getAttribute("data-ch");
                if (targetCh === getCh()) return;
                setCh(targetCh);
                renderCurrentView();
                playRainToWebSequence();
            };
        });

        // 底部 5 大 Tab 切换事件
        topDoc.querySelectorAll("#ks-bottom-dock .ks-dock-item").forEach((item) => {
            item.onclick = () => {
                const tab = item.getAttribute("data-kstab");
                const ch = getCh(), d = loadMem(ch);
                d.activeTab = tab;
                saveMem(d, ch);
                renderCurrentView();
                if (tab === "map") playRainToWebSequence();
            };
        });

        topDoc.getElementById("ks-rain-replay-btn").onclick = (e) => {
            e.stopPropagation();
            playRainToWebSequence();
        };

        function openSea() {
            overlay.classList.add("open");
            resizeCanvas();
            renderCurrentView();
            playRainToWebSequence();
            if (!animId) animId = requestAnimationFrame(renderCanvasLoop);
        }
        function closeSea() {
            overlay.classList.remove("open");
            if (animId) { cancelAnimationFrame(animId); animId = null; }
        }

        topDoc.getElementById("smt-home-open-memtree")?.addEventListener("click", (e) => { e.stopPropagation(); openSea(); });
        topDoc.getElementById("ks-close-btn").onclick = () => closeSea();
        topWin.addEventListener("resize", () => { if (overlay.classList.contains("open")) resizeCanvas(); });

        // ══════════════════════════════════════════════════════════════════════════
        // ⏱️ 后台全自动楼层监听器：当酒馆或微信聊天层数达到设定的「每 N 层」时，自动触发防失忆总结！
        // ══════════════════════════════════════════════════════════════════════════
        let isAutoRunning = false;
        setInterval(async () => {
            if (isAutoRunning) return;
            syncMemoryInjectionToSystem();
            const c = getCtx();
            for (const ch of ["st", "wx"]) {
                const d = loadMem(ch);
                if (!d.isBound || !d.autoCfg?.enabled) continue;
                const everyN = Math.max(3, Number(d.autoCfg.everyN) || 15);
                const lastF = Number(d.autoCfg.lastFloor) || 0;
                const curLen = ch === "st" ? c.stChatArr.length : c.wxChatArr.length;
                if (curLen - lastF >= everyN) {
                    isAutoRunning = true;
                    try {
                        await summarizeFloorRange(ch, lastF, curLen - 1, true);
                        if (overlay.classList.contains("open") && getCh() === ch) renderCurrentView();
                    } catch (e) {}
                    isAutoRunning = false;
                    break;
                }
            }
        }, 6000);

        syncMemoryInjectionToSystem();
    }

    mountDualMemorySeaApp();
})();
// ==========================================================================
// 🤍 【结识海 · 终极完全体补丁：1.高定双环星轨开屏动画 + 2.关键人物(NPC)&关键物品(ITEMS)图鉴与自动提取 + 3.第5栏全功能中枢设置(含主题色定制/动效/注入策略/备份)】
// 用法：直接替换 index.js 最末尾刚才那段 mountSplashAndUnifiedSummary 补丁代码！
// ==========================================================================
(function () {
    const topWin = window.parent || window;
    const topDoc = topWin.document;

    const CH_KEY = "sumoul_v16_mem_active_channel";
    const getCh = () => (localStorage.getItem(CH_KEY) === "wx" ? "wx" : "st");

    // 6 款韩系高定清冷主题色预设
    const THEME_PRESETS = [
        { id: "obsidian", name: "曜石玄黑", hex: "#1E2028", soft: "#F2F4F8" },
        { id: "seoulblue", name: "首尔雾蓝", hex: "#3A4E68", soft: "#EDF2F8" },
        { id: "pinesnow", name: "冷松霜绿", hex: "#384E48", soft: "#EDF4F2" },
        { id: "ashpurple", name: "暮霭灰紫", hex: "#4A4258", soft: "#F2EFF6" },
        { id: "titanium", name: "冷月钛银", hex: "#525866", soft: "#F0F2F6" },
        { id: "warmwood", name: "枯木冷棕", hex: "#544842", soft: "#F5F1EE" }
    ];

    function getCtx() {
        let userName = "ME", charName = "PARTNER", scope = "PARTNER", charDesc = "";
        let userAvatar = "https://i.postimg.cc/rydS6NvG/IMG-3866.jpg", charAvatar = "https://i.postimg.cc/QC3CQ218/IMG-4147.jpg";
        let stChatArr = [];
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
                } else if (st.name2) {
                    charName = st.name2; scope = st.name2;
                }
                if (Array.isArray(st.chat)) stChatArr = st.chat;
            }
        } catch (e) {}
        const safeScope = String(scope).replace(/[^a-zA-Z0-9_\u4e00-\u9fa5\uac00-\ud7af-]/g, "_");
        try {
            const wCfg = JSON.parse(localStorage.getItem(`sumoul_v16_wxcfg__${safeScope}`) || "{}");
            if (wCfg.myNick) userName = wCfg.myNick;
            if (wCfg.remark) charName = wCfg.remark;
            if (wCfg.myAva) userAvatar = wCfg.myAva;
            if (wCfg.charAva) charAvatar = wCfg.charAva;
        } catch (e) {}
        let wxChatArr = [];
        try {
            wxChatArr = JSON.parse(localStorage.getItem(`sumoul_v16_wx__${safeScope}`) || "[]");
        } catch (e) {}
        return { userName, charName, safeScope, userAvatar, charAvatar, charDesc, stChatArr, wxChatArr };
    }

    function getStoreKey(ch = getCh()) {
        return `sumoul_v16_dualmem_${ch}__${getCtx().safeScope}`;
    }

    function ensureDefaults(d, ch) {
        const c = getCtx();
        d.autoCfg = Object.assign({
            enabled: false,
            everyN: 15,
            lastFloor: 0,
            wordLimit: 160,
            viewMode: "table",
            logSubTab: "timeline", // 'timeline' | 'npcs' | 'items'
            injectEnabled: true,
            injectDepth: 2,
            maxSumInject: 12,
            injectNpcItem: true,
            themeColor: "#1E2028",
            themeSoft: "#F2F4F8",
            showSplash: true
        }, d.autoCfg || {});

        if (!Array.isArray(d.npcs) || d.npcs.length === 0) {
            d.npcs = ch === "st" ? [
                { id: 301, name: "关键关联人", role: "剧情重要关系人", attitude: "中立观察", desc: `在主线剧情中与 ${c.charName} 或 ${c.userName} 存在交集的知情者。` }
            ] : [
                { id: 302, name: "共同好友", role: "微信朋友圈熟人", attitude: "友善助攻", desc: `经常在朋友圈互动或群聊中出现的共同熟人。` }
            ];
        }
        if (!Array.isArray(d.items) || d.items.length === 0) {
            d.items = ch === "st" ? [
                { id: 401, name: `${c.charName}的随身大衣`, owner: `${c.charName} 随身之物`, status: "常伴身边", desc: `带有 ${c.charName} 标志性冷冽气息的外套，右口袋习惯留给 ${c.userName}。` },
                { id: 402, name: "初遇信物", owner: "两人共同持有", status: "完好珍藏", desc: `见证两人主线关系破冰的重要纪念物品，具有特殊情感分量。` }
            ] : [
                { id: 403, name: "置顶聊天与特别提示音", owner: "双方手机设置", status: "长期生效", desc: `只为彼此单独开启的消息提醒与唯一置顶权限。` }
            ];
        }
        return d;
    }

    function loadMem(ch = getCh()) {
        try {
            const raw = JSON.parse(localStorage.getItem(getStoreKey(ch)) || "{}");
            return ensureDefaults(raw, ch);
        } catch (e) { return ensureDefaults({}, ch); }
    }

    function saveMem(data, ch = getCh()) {
        try {
            ensureDefaults(data, ch);
            localStorage.setItem(getStoreKey(ch), JSON.stringify(data));
            applyThemeVariables(data.autoCfg.themeColor, data.autoCfg.themeSoft);
            syncFullPromptInjection();
        } catch (e) {}
    }

    // 应用自定义主题色至整个结识海界面
    function applyThemeVariables(hex = "#1E2028", soft = "#F2F4F8") {
        let dyn = topDoc.getElementById("ks-theme-dyn-style");
        if (!dyn) {
            dyn = topDoc.createElement("style");
            dyn.id = "ks-theme-dyn-style";
            topDoc.head.appendChild(dyn);
        }
        dyn.innerHTML = `
            #seoul-mini-theater-modal #smt-ksea-overlay {
                --ks-accent: ${hex};
                --ks-soft: ${soft};
            }
            #seoul-mini-theater-modal #smt-ksea-overlay .ks-pill.dark,
            #seoul-mini-theater-modal #smt-ksea-overlay .ks-flt.on,
            #seoul-mini-theater-modal #smt-ksea-overlay .ks-dual-opt.active,
            #seoul-mini-theater-modal #smt-ksea-overlay .ks-stat-box.highlight,
            #seoul-mini-theater-modal #smt-ksea-overlay .ks-range-badge {
                background: ${hex} !important;
                border-color: ${hex} !important;
                color: #FFFFFF !important;
                -webkit-text-fill-color: #FFFFFF !important;
            }
            #seoul-mini-theater-modal #smt-ksea-overlay .ks-dock-item.active {
                color: ${hex} !important;
            }
        `;
    }

    // 组装包含【总结 + 编年 + 关键人物NPC + 关键物品ITEMS + 星图节点】的完整防失忆提示词并注入底层
    function buildFullChannelPrompt(ch) {
        const d = loadMem(ch);
        if (!d.isBound || d.autoCfg?.injectEnabled === false) return "";

        const maxSum = Math.max(1, Number(d.autoCfg?.maxSumInject) || 12);
        const chTitle = ch === "st"
            ? "【SillyTavern 酒馆主线长期防失忆档案（严禁遗忘或与线上微信串戏）】"
            : "【微信线上日常专属防失忆档案（严禁与酒馆主线剧情混淆）】";

        const sumLines = (d.summaries || []).slice(0, maxSum).map((s) => `• [${s.range}] 《${s.title}》：${s.content}${s.keyFacts ? `（铁律：${s.keyFacts}）` : ""}`).join("\n");
        const npcLines = d.autoCfg?.injectNpcItem !== false
            ? (d.npcs || []).map((n) => `• [人物·${n.name} (${n.role} / 态度:${n.attitude})]：${n.desc}`).join("\n")
            : "";
        const itemLines = d.autoCfg?.injectNpcItem !== false
            ? (d.items || []).map((it) => `• [物品·${it.name} (${it.owner} / 状态:${it.status})]：${it.desc}`).join("\n")
            : "";
        const nodeLines = (d.nodes || []).slice(0, 14).map((n) => `• [${n.title}]：${n.content}`).join("\n");

        return [
            chTitle,
            `▸ 关系定调：${d.pact?.stage || "深度羁绊"}`,
            `▸ 核心铁律锚点：${d.pact?.coreAnchor || ""}`,
            sumLines ? `▸ 历次楼层阶段总结：\n${sumLines}` : "",
            npcLines ? `▸ 登场关键人物(NPC)档案：\n${npcLines}` : "",
            itemLines ? `▸ 关键物品与信物(ITEMS)档案：\n${itemLines}` : "",
            nodeLines ? `▸ 星图核心节点：\n${nodeLines}` : ""
        ].filter(Boolean).join("\n");
    }

    function syncFullPromptInjection() {
        try {
            const stText = buildFullChannelPrompt("st");
            const wxText = buildFullChannelPrompt("wx");
            const stData = loadMem("st");
            topWin.__SUMOUL_ST_MEMORY_PROMPT__ = stText;
            topWin.__SUMOUL_WX_MEMORY_PROMPT__ = wxText;

            const stCtx = topWin.SillyTavern?.getContext?.();
            if (stCtx && typeof stCtx.setExtensionPrompt === "function") {
                const depth = Math.max(0, Math.min(10, Number(stData.autoCfg?.injectDepth) ?? 2));
                stCtx.setExtensionPrompt("SUMOUL_TAVERN_MEMORY_SEA", stText, 1, depth);
            }
        } catch (e) {}
    }

    async function askAI(sys, usr) {
        const u = topDoc.getElementById("smt-api-url")?.value?.trim().replace(/\/+$/, "");
        const k = topDoc.getElementById("smt-api-key")?.value?.trim();
        const m = topDoc.getElementById("smt-api-model")?.value?.trim() || "gpt-4o-mini";
        if (!u || !k) {
            topDoc.querySelector('.smt-tab-item[data-page="api"]')?.click();
            throw new Error("请先在【API设置】填写独立 API 地址与 Key");
        }
        const endpoint = u.endsWith("/chat/completions") ? u : (u.endsWith("/v1") ? `${u}/chat/completions` : `${u}/v1/chat/completions`);
        const r = await fetch(endpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json", "Authorization": `Bearer ${k}` },
            body: JSON.stringify({ model: m, temperature: 0.72, messages: [{ role: "system", content: sys }, { role: "user", content: usr }] })
        });
        if (!r.ok) throw new Error(`API HTTP ${r.status}`);
        const d = await r.json();
        return d?.choices?.[0]?.message?.content?.trim() || "";
    }

    // ══════════════════════════════════════════════════════════════════════════
    // 🧠 四位一体全自动总结引擎：一次总结同时更新【1.楼层总结 + 2.星图节点 + 3.记忆编年 + 4.关键人物NPC与关键物品ITEMS】！
    // ══════════════════════════════════════════════════════════════════════════
    async function executeMasterSummary(ch, sFloor, eFloor, wordCount = 160, modeTag = "自动同步") {
        const c = getCtx();
        const rawArr = ch === "st" ? c.stChatArr : c.wxChatArr;
        const chName = ch === "st" ? "酒馆主线" : "微信聊天";
        if (!rawArr || rawArr.length === 0) throw new Error(`当前【${chName}】暂无聊天记录可总结`);

        const sIdx = Math.max(0, Math.min(rawArr.length - 1, Number(sFloor) || 0));
        const eIdx = Math.max(sIdx, Math.min(rawArr.length - 1, Number(eFloor) || (rawArr.length - 1)));
        const targetWords = Math.max(40, Math.min(800, Number(wordCount) || 160));

        const sliceText = rawArr.slice(sIdx, eIdx + 1).map((m, idx) => {
            const fNum = sIdx + idx;
            if (ch === "st") {
                const sp = m.is_user ? c.userName : (m.name || c.charName);
                const clean = String(m.mes || "").replace(/<[^>]+>/g, "").slice(0, 320);
                return `[#${fNum} ${sp}]: ${clean}`;
            } else {
                const sp = m.role === "user" ? c.userName : c.charName;
                return `[#${fNum} ${sp}]: ${String(m.text || "").slice(0, 240)}`;
            }
        }).join("\n");

        const rawJson = await askAI(
            `你是高精度防失忆档案官。当前轨道：【${chName}】。主角：${c.charName} 与 ${c.userName}。`,
            `请将以下【${chName} 第 #${sIdx} 层 ~ 第 #${eIdx} 层】记录提炼为防失忆总结，并同步提取星图节点、编年章节，以及本段中出现的重要配角(NPC)和关键物品(Item)。\n要求：summary 正文字数控制在 **${targetWords} 字左右**。\n\n${sliceText.slice(-4200)}\n\n严格只输出JSON格式：\n{"sumTitle":"12字内阶段标题","summary":"约${targetWords}字的高密度剧情与情感总结","keyFacts":"35字内不可遗忘的核心事实","nodeType":"memory","nodeTitle":"6字内星图节点名","edgeLabel":"2~4字连线词","nodeWhisper":"28字内${c.charName}的内心批注","tlTheme":"2~4字主题","tlTitle":"12字内编年章节名","tlContent":"60字内编年叙事","newNpc":{"name":"若本段有重要他人/NPC请填名字，无则填空字符串","role":"身份关系","attitude":"对主角态度","desc":"30字内人物关键信息"},"newItem":{"name":"若本段有重要物品/地点/信物请填名称，无则填空字符串","owner":"持有者或归属","status":"当前状态","desc":"30字内物品剧情意义"}}`
        );

        const match = rawJson.match(/\{[\s\S]*\}/);
        if (!match) throw new Error(`#${sIdx}~#${eIdx} 总结解析失败`);
        const o = JSON.parse(match[0]);

        const d = loadMem(ch);
        const now = new Date();
        const timeStr = `${now.getMonth() + 1}.${String(now.getDate()).padStart(2, "0")} ${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
        const rangeLabel = `${ch === "st" ? "酒馆" : "微信"} #${sIdx} ~ #${eIdx}`;
        const baseId = Date.now() + Math.floor(Math.random() * 1000);

        // ① 写入楼层总结
        d.summaries = d.summaries || [];
        d.summaries.unshift({
            id: baseId, range: rangeLabel, sFloor: sIdx, eFloor: eIdx, wordTarget: targetWords,
            title: o.sumTitle || `${rangeLabel} 纪要`, content: o.summary || "", keyFacts: o.keyFacts || "",
            time: `${modeTag} · ${timeStr}`
        });

        // ② 写入星图节点
        d.nodes = d.nodes || [];
        d.edges = d.edges || [];
        const nid = baseId + 1;
        const cnt = d.nodes.length + 1;
        const xPct = Math.max(14, Math.min(86, Math.round(50 + Math.cos(cnt * 2.3) * (18 + (cnt % 4) * 6))));
        const yPct = Math.max(18, Math.min(58, Math.round(38 + Math.sin(cnt * 2.3) * (14 + (cnt % 4) * 5))));
        const anchorId = d.activeNodeId || d.nodes[0]?.id || 1;
        d.nodes.push({
            id: nid, type: ["memory", "relation", "knot"].includes(o.nodeType) ? o.nodeType : "memory",
            title: o.nodeTitle || `#${sIdx}-${eIdx}`, xPct, yPct,
            content: `[${rangeLabel}] ${o.summary || ""}`,
            whisper: `“ ${(o.nodeWhisper || "这段记忆已锁入心底。").replace(/^[“"]|[”"]$/g, "")} ”`
        });
        d.edges.push({ from: anchorId, to: nid, label: o.edgeLabel || "刻痕" });
        d.activeNodeId = nid;

        // ③ 写入记忆编年史
        d.timeline = d.timeline || [];
        const chapNum = String(d.timeline.length + 1).padStart(2, "0");
        d.timeline.unshift({
            id: baseId + 2, range: rangeLabel,
            chapter: `${ch === "st" ? "CHAPTER" : "WECHAT"} ${chapNum} · ${o.tlTheme || "共鸣"} (${rangeLabel})`,
            title: o.tlTitle || o.sumTitle || `${rangeLabel} 篇章`,
            content: o.tlContent || o.summary || "",
            note: `“ ${(o.nodeWhisper || "已随楼层总结自动同步归档。").replace(/^[“"]|[”"]$/g, "")} ”`
        });

        // ④ 自动归档提取到的【关键人物 NPC】与【关键物品 ITEM】
        if (o.newNpc && o.newNpc.name && o.newNpc.name.trim() && o.newNpc.name !== "无") {
            d.npcs = d.npcs || [];
            const existNpc = d.npcs.find((x) => x.name === o.newNpc.name.trim());
            if (existNpc) {
                existNpc.role = o.newNpc.role || existNpc.role;
                existNpc.attitude = o.newNpc.attitude || existNpc.attitude;
                existNpc.desc = o.newNpc.desc || existNpc.desc;
            } else {
                d.npcs.unshift({
                    id: baseId + 3, name: o.newNpc.name.trim(),
                    role: o.newNpc.role || "登场人物", attitude: o.newNpc.attitude || "未知",
                    desc: o.newNpc.desc || `于 ${rangeLabel} 登场的关键人物`
                });
            }
        }
        if (o.newItem && o.newItem.name && o.newItem.name.trim() && o.newItem.name !== "无") {
            d.items = d.items || [];
            const existItem = d.items.find((x) => x.name === o.newItem.name.trim());
            if (existItem) {
                existItem.status = o.newItem.status || existItem.status;
                existItem.desc = o.newItem.desc || existItem.desc;
            } else {
                d.items.unshift({
                    id: baseId + 4, name: o.newItem.name.trim(),
                    owner: o.newItem.owner || "剧情信物", status: o.newItem.status || "已出现",
                    desc: o.newItem.desc || `于 ${rangeLabel} 出现的关键物品`
                });
            }
        }

        if (eIdx + 1 > (Number(d.autoCfg.lastFloor) || 0)) {
            d.autoCfg.lastFloor = eIdx + 1;
        }
        saveMem(d, ch);
    }

    function mountUltimateMemorySeaPatch() {
        const overlay = topDoc.getElementById("smt-ksea-overlay");
        const vp = topDoc.getElementById("ks-main-viewport");
        if (!overlay || !vp) {
            setTimeout(mountUltimateMemorySeaPatch, 220);
            return;
        }

        // 将底部第 5 栏标题改为【中枢设置 (설정 · SET)】
        const pactTabEl = topDoc.querySelector('#ks-bottom-dock .ks-dock-item[data-kstab="pact"]');
        if (pactTabEl) {
            const zhEl = pactTabEl.querySelector(".ks-dock-zh");
            const krEl = pactTabEl.querySelector(".ks-dock-kr");
            if (zhEl) zhEl.textContent = "中枢设置";
            if (krEl) krEl.textContent = "설정 · SET";
        }
        const timeTabEl = topDoc.querySelector('#ks-bottom-dock .ks-dock-item[data-kstab="timeline"]');
        if (timeTabEl) {
            const zhEl = timeTabEl.querySelector(".ks-dock-zh");
            const krEl = timeTabEl.querySelector(".ks-dock-kr");
            if (zhEl) zhEl.textContent = "编年图鉴";
            if (krEl) krEl.textContent = "도감 · LOG";
        }

        topDoc.getElementById("ks-sum-pro-css")?.remove();
        const st = topDoc.createElement("style");
        st.id = "ks-sum-pro-css";
        st.innerHTML = `
            /* ── 高定韩系「双环精密星轨 · 落雨共鸣」开屏动画 (Astrolabe Splash) ── */
            @keyframes ksOrbitCW { from { transform: translate(-50%, -50%) rotate(0deg); } to { transform: translate(-50%, -50%) rotate(360deg); } }
            @keyframes ksOrbitCCW { from { transform: translate(-50%, -50%) rotate(360deg); } to { transform: translate(-50%, -50%) rotate(0deg); } }
            @keyframes ksRainLineFall {
                0%   { transform: translateY(-90px) scaleY(0.2); opacity: 0; }
                40%  { transform: translateY(0px) scaleY(1.2); opacity: 0.85; }
                100% { transform: translateY(55px) scaleY(0.1); opacity: 0; }
            }
            @keyframes ksWaveRingOut {
                0%   { transform: translate(-50%, -50%) scale(0.5); opacity: 0.8; }
                100% { transform: translate(-50%, -50%) scale(2.1); opacity: 0; }
            }
            @keyframes ksFadeUp {
                from { opacity: 0; transform: translateY(10px); }
                to   { opacity: 1; transform: translateY(0); }
            }

            #seoul-mini-theater-modal #ks-splash-screen {
                position: absolute !important; inset: 0 !important; z-index: 9999 !important;
                background: radial-gradient(circle at 50% 42%, #FFFFFF 0%, #F7F9FC 65%, #EEF2F8 100%) !important;
                display: none; flex-direction: column !important; align-items: center !important; justify-content: center !important;
                transition: opacity 0.5s cubic-bezier(0.22, 1, 0.36, 1) !important;
                user-select: none !important; cursor: pointer !important; overflow: hidden !important;
            }
            #seoul-mini-theater-modal #ks-splash-screen.show { display: flex !important; opacity: 1 !important; }
            #seoul-mini-theater-modal #ks-splash-screen.fade-out { opacity: 0 !important; pointer-events: none !important; }

            /* ── 统计看板与表格/文字视图 ── */
            #seoul-mini-theater-modal .ks-stat-grid { display: grid !important; grid-template-columns: repeat(3, 1fr) !important; gap: 7px !important; margin-bottom: 10px !important; }
            #seoul-mini-theater-modal .ks-stat-box { background: #F8F9FC !important; border: 1px solid #ECEEF4 !important; border-radius: 12px !important; padding: 8px 10px !important; text-align: center !important; }
            #seoul-mini-theater-modal .ks-stat-box.highlight { background: var(--ks-accent, #1E2028) !important; border-color: var(--ks-accent, #1E2028) !important; color: #FFFFFF !important; }
            #seoul-mini-theater-modal .ks-stat-num { font-size: 12px !important; font-weight: 900 !important; font-family: monospace !important; margin-top: 2px !important; }

            #seoul-mini-theater-modal .ks-sum-table-wrap { width: 100% !important; overflow-x: auto !important; background: #FFFFFF !important; border: 1px solid #E6E9F2 !important; border-radius: 14px !important; box-shadow: 0 4px 18px rgba(0,0,0,0.02) !important; }
            #seoul-mini-theater-modal .ks-sum-table { width: 100% !important; border-collapse: collapse !important; font-size: 9.2px !important; text-align: left !important; }
            #seoul-mini-theater-modal .ks-sum-table th { background: #F6F8FC !important; color: #6E7688 !important; font-size: 8px !important; font-weight: 800 !important; padding: 8px 10px !important; border-bottom: 1px solid #E6E9F2 !important; white-space: nowrap !important; }
            #seoul-mini-theater-modal .ks-sum-table td { padding: 9px 10px !important; border-bottom: 1px solid #F0F2F7 !important; color: #2C303C !important; vertical-align: top !important; line-height: 1.55 !important; }
            #seoul-mini-theater-modal .ks-sum-table tr:last-child td { border-bottom: none !important; }
            #seoul-mini-theater-modal .ks-range-badge { display: inline-block !important; padding: 2px 6px !important; background: var(--ks-accent, #1E2028) !important; color: #FFFFFF !important; border-radius: 6px !important; font-size: 7.8px !important; font-weight: 800 !important; font-family: monospace !important; white-space: nowrap !important; }

            #seoul-mini-theater-modal .ks-editorial-doc { background: #FFFFFF !important; border: 1px solid #E6E9F2 !important; border-radius: 16px !important; padding: 15px 16px !important; box-shadow: 0 6px 24px rgba(0,0,0,0.025) !important; }
            #seoul-mini-theater-modal .ks-ed-entry { padding-bottom: 14px !important; margin-bottom: 14px !important; border-bottom: 1px dashed #E4E8F0 !important; }
            #seoul-mini-theater-modal .ks-ed-entry:last-child { padding-bottom: 0 !important; margin-bottom: 0 !important; border-bottom: none !important; }

            /* ── NPC 与物品高定图鉴卡片网格 ── */
            #seoul-mini-theater-modal .ks-dex-grid { display: grid !important; grid-template-columns: 1fr 1fr !important; gap: 8px !important; }
            #seoul-mini-theater-modal .ks-dex-card { background: #FFFFFF !important; border: 1px solid #E8ECF4 !important; border-radius: 14px !important; padding: 11px 12px !important; box-shadow: 0 4px 14px rgba(20,24,35,0.025) !important; display: flex !important; flex-direction: column !important; justify-content: space-between !important; }

            /* ── 主题色圆点选择器 ── */
            #seoul-mini-theater-modal .ks-color-swatch {
                width: 24px !important; height: 24px !important; border-radius: 50% !important;
                cursor: pointer !important; border: 2px solid #FFFFFF !important;
                box-shadow: 0 2px 6px rgba(0,0,0,0.15) !important; transition: transform 0.18s ease !important;
            }
            #seoul-mini-theater-modal .ks-color-swatch.active {
                transform: scale(1.22) !important; outline: 1.5px solid var(--ks-accent, #1E2028) !important; outline-offset: 2px !important;
            }
        `;
        topDoc.head.appendChild(st);

        // 初始化当前主题色
        const curInit = loadMem(getCh());
        applyThemeVariables(curInit.autoCfg?.themeColor, curInit.autoCfg?.themeSoft);

        // ══════════════════════════════════════════════════════════════════════════
        // 🎬 1. 全新重做：韩系高定「双环精密星盘 · 落雨共鸣」开屏动画
        // ══════════════════════════════════════════════════════════════════════════
        topDoc.getElementById("ks-splash-screen")?.remove();
        const splashEl = topDoc.createElement("div");
        splashEl.id = "ks-splash-screen";
        overlay.appendChild(splashEl);

        let splashTimer = null;
        let pctInterval = null;

        function playAstrolabeSplash() {
            const ch = getCh();
            const d = loadMem(ch);
            if (d.autoCfg?.showSplash === false) return;

            const c = getCtx();
            const accent = d.autoCfg?.themeColor || "#1E2028";
            const nodeCnt = (d.nodes?.length || 0) + (d.summaries?.length || 0);

            splashEl.classList.remove("fade-out");
            splashEl.classList.add("show");
            splashEl.innerHTML = `
                <!-- 顶部微距档案编码 -->
                <div style="position:absolute;top:max(24px,env(safe-area-inset-top,24px));left:24px;right:24px;display:flex;justify-content:space-between;font-size:7.5px;font-weight:700;color:#98A0B2;font-family:monospace;letter-spacing:1.5px;">
                    <span>ARCHIVE // ${ch === "st" ? "TAVERN_MAIN" : "WECHAT_DAILY"}</span>
                    <span>NODES · ${String(nodeCnt).padStart(2, "0")}</span>
                </div>

                <!-- 中央：双环逆向旋转精密星盘 + 3道错落银丝雨 + 双人共鸣头像 -->
                <div style="position:relative;width:210px;height:210px;margin-bottom:20px;">
                    <!-- 3道错落滑落的极细冷银雨丝 -->
                    <div style="position:absolute;left:32%;top:22%;width:0.8px;height:40px;background:linear-gradient(180deg,transparent,${accent});animation:ksRainLineFall 1.1s ease-in infinite;"></div>
                    <div style="position:absolute;left:50%;top:12%;width:1px;height:52px;background:linear-gradient(180deg,transparent,${accent});animation:ksRainLineFall 1.2s ease-in 0.2s infinite;"></div>
                    <div style="position:absolute;left:68%;top:26%;width:0.8px;height:36px;background:linear-gradient(180deg,transparent,${accent});animation:ksRainLineFall 1.0s ease-in 0.45s infinite;"></div>

                    <!-- 外层顺时针旋转虚线星轨环 -->
                    <svg viewBox="0 0 200 200" width="196" height="196" style="position:absolute;left:50%;top:50%;animation:ksOrbitCW 18s linear infinite;">
                        <circle cx="100" cy="100" r="90" fill="none" stroke="#DCE2EE" stroke-width="0.8" stroke-dasharray="3 5" />
                        <circle cx="100" cy="10" r="2.8" fill="${accent}" />
                        <circle cx="100" cy="190" r="2.2" fill="#98A0B2" />
                        <line x1="100" y1="2" x2="100" y2="14" stroke="${accent}" stroke-width="0.8" />
                    </svg>

                    <!-- 内层逆时针旋转几何细环 + 坐标十字 -->
                    <svg viewBox="0 0 160 160" width="148" height="148" style="position:absolute;left:50%;top:50%;animation:ksOrbitCCW 12s linear infinite;">
                        <circle cx="80" cy="80" r="68" fill="none" stroke="#CFD6E6" stroke-width="0.7" />
                        <circle cx="12" cy="80" r="2.2" fill="${accent}" />
                        <circle cx="148" cy="80" r="2.2" fill="${accent}" />
                    </svg>

                    <!-- 中心扩散水波环 -->
                    <div style="position:absolute;left:50%;top:50%;width:76px;height:76px;border-radius:50%;border:0.8px solid ${accent};animation:ksWaveRingOut 1.6s ease-out infinite;"></div>
                    <div style="position:absolute;left:50%;top:50%;width:76px;height:76px;border-radius:50%;border:0.6px solid #98A0B2;animation:ksWaveRingOut 1.6s ease-out 0.5s infinite;"></div>

                    <!-- 中心双人交叠微距头像 -->
                    <div style="position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);display:flex;align-items:center;">
                        <img src="${c.userAvatar}" style="width:42px;height:42px;border-radius:50%;object-fit:cover;border:2.5px solid #FFFFFF;box-shadow:0 4px 14px rgba(20,24,35,0.1);margin-right:-10px;z-index:2;" />
                        <img src="${c.charAvatar}" style="width:42px;height:42px;border-radius:50%;object-fit:cover;border:2.5px solid #FFFFFF;box-shadow:0 4px 14px rgba(20,24,35,0.1);z-index:3;" />
                    </div>
                </div>

                <!-- 杂志级字距排版 + 实时脉冲同步读条 -->
                <div style="text-align:center;animation:ksFadeUp 0.6s ease forwards;">
                    <div style="font-size:8px;font-weight:700;color:#8E96A8;letter-spacing:4px;margin-bottom:6px;">SOUL MEMORY CONSTELLATION</div>
                    <div style="font-size:18px;font-weight:800;color:${accent};letter-spacing:6px;padding-left:6px;">结 识 海</div>
                    <div style="font-size:9px;font-weight:600;color:#5C6478;letter-spacing:1.5px;margin-top:6px;">
                        ${c.userName} × ${c.charName} · ${ch === "st" ? "酒馆主线记忆库" : "微信线上记忆库"}
                    </div>

                    <!-- 极细流光同步进度线 -->
                    <div style="width:120px;height:1.5px;background:#ECEEF4;margin:16px auto 6px auto;border-radius:99px;overflow:hidden;">
                        <div id="ks-splash-bar" style="width:15%;height:100%;background:${accent};transition:width 1.2s cubic-bezier(0.22,1,0.36,1);"></div>
                    </div>
                    <div id="ks-splash-pct" style="font-size:7.5px;font-weight:800;color:#98A0B2;font-family:monospace;letter-spacing:1.5px;">
                        SYNCING MEMORY · 12%
                    </div>
                </div>
            `;

            requestAnimationFrame(() => {
                const bar = topDoc.getElementById("ks-splash-bar");
                if (bar) bar.style.width = "100%";
            });

            let p = 18;
            if (pctInterval) clearInterval(pctInterval);
            pctInterval = setInterval(() => {
                p = Math.min(100, p + Math.floor(Math.random() * 24) + 12);
                const pctEl = topDoc.getElementById("ks-splash-pct");
                if (pctEl) pctEl.textContent = `SYNCING MEMORY · ${p}%`;
                if (p >= 100) clearInterval(pctInterval);
            }, 220);

            if (splashTimer) clearTimeout(splashTimer);
            splashTimer = setTimeout(() => {
                if (pctInterval) clearInterval(pctInterval);
                splashEl.classList.add("fade-out");
                setTimeout(() => splashEl.classList.remove("show", "fade-out"), 480);
            }, 1650);
        }

        splashEl.onclick = () => {
            if (splashTimer) clearTimeout(splashTimer);
            if (pctInterval) clearInterval(pctInterval);
            splashEl.classList.add("fade-out");
            setTimeout(() => splashEl.classList.remove("show", "fade-out"), 300);
        };

        let wasOpen = overlay.classList.contains("open");
        const openObs = new MutationObserver(() => {
            const isOpen = overlay.classList.contains("open");
            if (isOpen && !wasOpen) playAstrolabeSplash();
            wasOpen = isOpen;
        });
        openObs.observe(overlay, { attributes: true, attributeFilter: ["class"] });

        // ══════════════════════════════════════════════════════════════════════════
        // 📊 2. 渲染【楼层总结 (summary)】页面
        // ══════════════════════════════════════════════════════════════════════════
        let isRenderingUI = false;
        let isSequentialRunning = false;

        function renderProSummaryUI() {
            const ch = getCh();
            const d = loadMem(ch);
            if (!d || !d.isBound || d.activeTab !== "summary" || isRenderingUI) return;

            isRenderingUI = true;
            const c = getCtx();
            const chLabel = ch === "st" ? "酒馆主线" : "微信线上";
            const totalLen = ch === "st" ? c.stChatArr.length : c.wxChatArr.length;
            const maxFloor = Math.max(0, totalLen - 1);

            const lastF = Math.min(totalLen, Math.max(0, Number(d.autoCfg.lastFloor) || 0));
            const unsumCount = Math.max(0, totalLen - lastF);
            const unsumRangeTxt = unsumCount > 0 ? `#${lastF} ~ #${maxFloor}` : "全部已结清";

            const stepN = Math.max(3, Number(d.autoCfg.everyN) || 15);
            const wordLimit = Math.max(40, Number(d.autoCfg.wordLimit) || 160);
            const viewMode = d.autoCfg.viewMode === "table" ? "table" : "text";
            const sums = d.summaries || [];

            const tableHtml = sums.length === 0
                ? `<div style="text-align:center;color:#98A0B2;font-size:10px;padding:28px;">暂无归档总结，请在上方选择楼层或点击依次总结</div>`
                : `<div class="ks-sum-table-wrap">
                    <table class="ks-sum-table">
                        <thead>
                            <tr>
                                <th style="width:76px;">楼层区间</th>
                                <th style="width:86px;">阶段标题</th>
                                <th>剧情与关系总结 (同步星图/编年/人物物品)</th>
                                <th style="width:94px;">防失忆铁律要点</th>
                                <th style="width:26px;text-align:center;">删</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${sums.map((s) => `
                                <tr>
                                    <td>
                                        <span class="ks-range-badge">${(s.range || "").replace(/</g, "&lt;")}</span>
                                        <div style="font-size:7px;color:#98A0B2;margin-top:4px;">${(s.time || "").replace(/</g, "&lt;")}</div>
                                    </td>
                                    <td style="font-weight:800;color:#1E2028;">${(s.title || "").replace(/</g, "&lt;")}</td>
                                    <td style="font-weight:600;color:#3A3E4C;">${(s.content || "").replace(/</g, "&lt;")}</td>
                                    <td style="font-size:8.4px;font-weight:700;color:#525868;background:#FAFBFD;">${(s.keyFacts || "—").replace(/</g, "&lt;")}</td>
                                    <td style="text-align:center;">
                                        <span data-delsum="${s.id}" style="cursor:pointer;color:#9A6868;font-weight:800;font-size:11px;">×</span>
                                    </td>
                                </tr>
                            `).join("")}
                        </tbody>
                    </table>
                </div>`;

            const textHtml = sums.length === 0
                ? `<div style="text-align:center;color:#98A0B2;font-size:10px;padding:28px;">暂无归档总结，请在上方选择楼层或点击依次总结</div>`
                : `<div class="ks-editorial-doc">
                    ${sums.map((s, idx) => `
                        <div class="ks-ed-entry">
                            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:5px;">
                                <div style="display:flex;align-items:center;gap:6px;">
                                    <span style="font-size:8px;font-weight:900;color:#8E94A4;font-family:monospace;">ARCHIVE ${String(sums.length - idx).padStart(2, "0")}</span>
                                    <span class="ks-range-badge">${(s.range || "").replace(/</g, "&lt;")}</span>
                                </div>
                                <div style="display:flex;align-items:center;gap:8px;">
                                    <span style="font-size:7.5px;color:#98A0B2;">${(s.time || "").replace(/</g, "&lt;")}</span>
                                    <span data-delsum="${s.id}" style="cursor:pointer;color:#9A6868;font-weight:800;font-size:11px;">×</span>
                                </div>
                            </div>
                            <div style="font-size:11.5px;font-weight:800;color:#1E2028;margin-bottom:5px;">《${(s.title || "").replace(/</g, "&lt;")}》</div>
                            <div style="font-size:9.8px;font-weight:600;color:#343844;line-height:1.72;">${(s.content || "").replace(/</g, "&lt;")}</div>
                            ${s.keyFacts ? `<div style="margin-top:7px;padding:6px 10px;background:#F6F8FC;border-left:2px solid var(--ks-accent,#1E2028);border-radius:0 7px 7px 0;font-size:8.6px;font-weight:700;color:#484E5E;">防失忆核心锚点：${s.keyFacts.replace(/</g, "&lt;")}</div>` : ""}
                        </div>
                    `).join("")}
                </div>`;

            vp.innerHTML = `
                <div id="ks-pro-sum-container" style="flex:1;overflow-y:auto;padding:12px 14px 18px 14px;pointer-events:auto;">
                    <div class="ks-stat-grid">
                        <div class="ks-stat-box">
                            <div style="font-size:7.5px;font-weight:700;color:#8E94A4;">${chLabel}总层数</div>
                            <div class="ks-stat-num" style="color:#1E2028;">${totalLen} 层</div>
                            <div style="font-size:6.8px;color:#98A0B2;">#0 ~ #${maxFloor}</div>
                        </div>
                        <div class="ks-stat-box">
                            <div style="font-size:7.5px;font-weight:700;color:#8E94A4;">已总结水位</div>
                            <div class="ks-stat-num" style="color:#1E2028;">#${Math.max(0, lastF - 1)} 层</div>
                            <div style="font-size:6.8px;color:#98A0B2;">四位一体同步</div>
                        </div>
                        <div class="ks-stat-box highlight">
                            <div style="font-size:7.5px;font-weight:700;color:rgba(255,255,255,0.78);">未总结楼层</div>
                            <div class="ks-stat-num" style="color:#FFFFFF;">${unsumCount} 层</div>
                            <div style="font-size:6.8px;color:rgba(255,255,255,0.82);">${unsumRangeTxt}</div>
                        </div>
                    </div>

                    <div class="ks-card" style="margin-bottom:10px;padding:12px 14px!important;">
                        <div style="display:flex;justify-content:space-between;align-items:center;padding-bottom:8px;margin-bottom:8px;border-bottom:1px solid #F0F2F7;">
                            <div>
                                <div style="font-size:10.5px;font-weight:800;color:#1E2028;">每次总结字数 &amp; 四位一体同步</div>
                                <div style="font-size:7.5px;color:#7E8494;">自动同步至：星图微点 + 编年史 + 关键人物NPC + 关键物品</div>
                            </div>
                            <div style="display:flex;align-items:center;gap:5px;">
                                <span style="font-size:8.5px;font-weight:700;color:#525868;">每次字数</span>
                                <input type="number" id="ks-pro-word-inp" class="ks-num-inp" min="40" max="800" step="10" value="${wordLimit}" style="width:52px!important;" />
                                <span style="font-size:8.5px;font-weight:700;color:#525868;">字</span>
                            </div>
                        </div>

                        <div style="display:flex;align-items:center;justify-content:space-between;gap:6px;padding-bottom:8px;margin-bottom:8px;border-bottom:1px solid #F0F2F7;">
                            <div style="display:flex;align-items:center;gap:4px;flex-wrap:wrap;">
                                <span style="font-size:8.8px;font-weight:700;color:#2C303C;">按每</span>
                                <input type="number" id="ks-pro-step-inp" class="ks-num-inp" min="3" max="200" value="${stepN}" />
                                <span style="font-size:8.8px;font-weight:700;color:#2C303C;">层一段 · 依次总结 (${unsumRangeTxt})</span>
                            </div>
                            <span class="ks-pill dark" id="ks-pro-seq-btn" style="flex-shrink:0;">依次总结 (${unsumCount}层)</span>
                        </div>

                        <div style="display:flex;align-items:center;justify-content:space-between;gap:6px;">
                            <div style="display:flex;align-items:center;gap:5px;">
                                <span style="font-size:8.2px;font-weight:700;color:#6E7688;">重置起点 #</span>
                                <input type="number" id="ks-pro-cursor-inp" class="ks-num-inp" min="0" max="${totalLen}" value="${lastF}" style="width:44px!important;height:22px!important;" />
                                <span class="ks-flt" id="ks-pro-cursor-set" style="padding:2px 7px!important;">设置</span>
                            </div>
                            <div style="display:flex;align-items:center;gap:5px;">
                                <span style="font-size:8.2px;font-weight:700;color:#525868;">满${stepN}层自动总结：</span>
                                <span class="ks-flt ${d.autoCfg?.enabled ? "on" : ""}" id="ks-pro-auto-tog">${d.autoCfg?.enabled ? "开启中✓" : "已关闭"}</span>
                            </div>
                        </div>

                        <div id="ks-seq-progress-bar" style="display:none;margin-top:8px;padding:7px 10px;background:#F6F8FC;border-radius:8px;font-size:8.8px;font-weight:700;color:#1E2028;"></div>
                    </div>

                    <div class="ks-card" style="margin-bottom:12px;padding:10px 14px!important;">
                        <div style="display:flex;align-items:center;justify-content:space-between;gap:6px;">
                            <div style="display:flex;align-items:center;gap:4px;">
                                <span style="font-size:8.8px;font-weight:800;color:#1E2028;">指定区间：#</span>
                                <input type="number" id="ks-pro-s" class="ks-num-inp" min="0" max="${maxFloor}" value="${Math.min(lastF, maxFloor)}" />
                                <span style="font-size:8.8px;font-weight:700;color:#525868;">至 #</span>
                                <input type="number" id="ks-pro-e" class="ks-num-inp" min="0" max="${maxFloor}" value="${maxFloor}" />
                                <span style="font-size:8.8px;font-weight:700;color:#525868;">层</span>
                            </div>
                            <span class="ks-pill" id="ks-pro-manual-btn">单独提炼此区间</span>
                        </div>
                    </div>

                    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;padding:0 2px;">
                        <span style="font-size:9px;font-weight:800;color:#7E8494;letter-spacing:0.6px;">SUMMARY ARCHIVE · 已归档总结 (${sums.length}篇)</span>
                        <div class="ks-dual-switch">
                            <span class="ks-dual-opt ${viewMode === "table" ? "active" : ""}" data-vmode="table" style="padding:2.5px 9px!important;font-size:8px!important;">表格样式</span>
                            <span class="ks-dual-opt ${viewMode === "text" ? "active" : ""}" data-vmode="text" style="padding:2.5px 9px!important;font-size:8px!important;">文字样式</span>
                        </div>
                    </div>

                    ${viewMode === "table" ? tableHtml : textHtml}
                </div>
            `;

            const saveCfgField = (field, val) => {
                const latest = loadMem(ch);
                latest.autoCfg[field] = val;
                saveMem(latest, ch);
            };

            topDoc.getElementById("ks-pro-word-inp").onchange = (e) => {
                saveCfgField("wordLimit", Math.max(40, Math.min(800, Number(e.target.value) || 160)));
                isRenderingUI = false; renderProSummaryUI();
            };
            topDoc.getElementById("ks-pro-step-inp").onchange = (e) => {
                saveCfgField("everyN", Math.max(3, Math.min(200, Number(e.target.value) || 15)));
                isRenderingUI = false; renderProSummaryUI();
            };
            topDoc.getElementById("ks-pro-cursor-set").onclick = () => {
                saveCfgField("lastFloor", Math.max(0, Math.min(totalLen, Number(topDoc.getElementById("ks-pro-cursor-inp").value) || 0)));
                isRenderingUI = false; renderProSummaryUI();
            };
            topDoc.getElementById("ks-pro-auto-tog").onclick = () => {
                const latest = loadMem(ch);
                latest.autoCfg.enabled = !latest.autoCfg.enabled;
                saveMem(latest, ch);
                isRenderingUI = false; renderProSummaryUI();
            };
            vp.querySelectorAll("[data-vmode]").forEach((btn) => {
                btn.onclick = () => {
                    saveCfgField("viewMode", btn.getAttribute("data-vmode"));
                    isRenderingUI = false; renderProSummaryUI();
                };
            });
            vp.querySelectorAll("[data-delsum]").forEach((btn) => {
                btn.onclick = () => {
                    const latest = loadMem(ch);
                    latest.summaries = (latest.summaries || []).filter((x) => Number(x.id) !== Number(btn.getAttribute("data-delsum")));
                    saveMem(latest, ch);
                    isRenderingUI = false; renderProSummaryUI();
                };
            });

            topDoc.getElementById("ks-pro-manual-btn").onclick = async (e) => {
                const btn = e.currentTarget, orig = btn.textContent;
                const sVal = Number(topDoc.getElementById("ks-pro-s").value) || 0;
                const eVal = Number(topDoc.getElementById("ks-pro-e").value) || maxFloor;
                const wVal = Number(topDoc.getElementById("ks-pro-word-inp").value) || 160;
                btn.textContent = "提炼中...";
                try {
                    await executeMasterSummary(ch, sVal, eVal, wVal, "手动同步");
                    isRenderingUI = false; renderProSummaryUI();
                } catch (err) { alert(err.message); btn.textContent = orig; }
            };

            topDoc.getElementById("ks-pro-seq-btn").onclick = async () => {
                if (isSequentialRunning) return;
                if (totalLen === 0) return alert(`当前【${chLabel}】还没有聊天消息！`);
                const step = Math.max(3, Math.min(200, Number(topDoc.getElementById("ks-pro-step-inp").value) || 15));
                const wVal = Math.max(40, Math.min(800, Number(topDoc.getElementById("ks-pro-word-inp").value) || 160));
                saveCfgField("everyN", step);
                saveCfgField("wordLimit", wVal);

                let curStart = Math.min(maxFloor, Number(loadMem(ch).autoCfg?.lastFloor) || 0);
                if (curStart >= totalLen) curStart = Math.max(0, totalLen - step);

                const batches = [];
                for (let s = curStart; s <= maxFloor; s += step) batches.push([s, Math.min(maxFloor, s + step - 1)]);
                if (batches.length === 0) return alert("当前没有未总结的楼层！");

                isSequentialRunning = true;
                const progBar = topDoc.getElementById("ks-seq-progress-bar");
                const seqBtn = topDoc.getElementById("ks-pro-seq-btn");
                if (progBar) progBar.style.display = "block";

                try {
                    for (let i = 0; i < batches.length; i++) {
                        const [bStart, bEnd] = batches[i];
                        if (seqBtn) seqBtn.textContent = `依次同步中 (${i + 1}/${batches.length})...`;
                        if (progBar) progBar.textContent = `正在依次总结并提取编年/NPC/物品 (${i + 1}/${batches.length})：#${bStart} ~ #${bEnd}...`;
                        await executeMasterSummary(ch, bStart, bEnd, wVal, `依次总结(${i + 1}/${batches.length})`);
                    }
                    isSequentialRunning = false; isRenderingUI = false; renderProSummaryUI();
                } catch (err) {
                    alert(`依次总结中断：${err.message}`);
                    isSequentialRunning = false; isRenderingUI = false; renderProSummaryUI();
                }
            };

            setTimeout(() => { isRenderingUI = false; }, 60);
        }

        // ══════════════════════════════════════════════════════════════════════════
        // 📖 3. 渲染【编年图鉴 (timeline + 关键人物NPC + 关键物品ITEMS)】页面
        // ══════════════════════════════════════════════════════════════════════════
        function renderProTimelineAndDexUI() {
            const ch = getCh();
            const d = loadMem(ch);
            if (!d || !d.isBound || d.activeTab !== "timeline" || isRenderingUI) return;

            isRenderingUI = true;
            const c = getCtx();
            const chLabel = ch === "st" ? "酒馆主线" : "微信线上";
            const subTab = d.autoCfg?.logSubTab || "timeline"; // 'timeline' | 'npcs' | 'items'

            let bodyContentHtml = "";

            if (subTab === "timeline") {
                const listHtml = (d.timeline || []).map((it) => `
                    <div style="position:relative;padding-left:16px;padding-bottom:12px;border-left:1px solid #E4E8F0;">
                        <span style="position:absolute;left:-4px;top:4px;width:7px;height:7px;border-radius:50%;background:#FFFFFF;border:1.5px solid var(--ks-accent,#1E2028);"></span>
                        <div class="ks-card" style="padding:12px 14px!important;">
                            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;">
                                <span style="font-size:7.5px;font-weight:800;color:#8E94A4;font-family:monospace;">${(it.chapter || "CHAPTER").replace(/</g, "&lt;")}</span>
                                <span data-deltl="${it.id}" style="cursor:pointer;color:#9A6868;font-weight:800;font-size:11px;">×</span>
                            </div>
                            <div style="font-size:11.2px;font-weight:800;color:#1E2028;margin-bottom:4px;">${(it.title || "").replace(/</g, "&lt;")}</div>
                            <div style="font-size:9.8px;font-weight:600;color:#3A3E4C;line-height:1.65;">${(it.content || "").replace(/</g, "&lt;")}</div>
                            ${it.note ? `<div style="margin-top:6px;padding-top:6px;border-top:1px dashed #ECEEF4;font-size:8.8px;font-weight:600;color:#6E7688;">${it.note.replace(/</g, "&lt;")}</div>` : ""}
                        </div>
                    </div>
                `).join("");

                bodyContentHtml = `
                    <div style="display:flex;gap:6px;margin-bottom:10px;">
                        <span class="ks-pill" id="ks-tl-add-open" style="flex:1;">+ 手写篇章</span>
                        <span class="ks-pill" id="ks-tl-sync-sum" style="flex:1;">从总结补齐编年</span>
                    </div>
                    <div id="ks-tl-drawer" class="ks-card" style="display:none;margin-bottom:10px;">
                        <input type="text" id="ks-tl-ti" placeholder="篇章标题..." style="width:100%;height:28px;background:#F8F9FC;border:1px solid #E4E8F0;border-radius:7px;padding:0 8px;font-size:9.8px;font-weight:700;color:#1E2028;box-sizing:border-box;outline:none;margin-bottom:6px;" />
                        <textarea id="ks-tl-ct" placeholder="写下这段重要事件..." style="width:100%;height:44px;background:#F8F9FC;border:1px solid #E4E8F0;border-radius:7px;padding:5px 8px;font-size:9.5px;color:#1E2028;box-sizing:border-box;resize:none;outline:none;margin-bottom:6px;"></textarea>
                        <div style="display:flex;justify-content:flex-end;"><span class="ks-pill dark" id="ks-tl-save">保存篇章</span></div>
                    </div>
                    <div style="padding-left:6px;">${listHtml || `<div style="text-align:center;color:#98A0B2;font-size:10px;padding:24px;">暂无编年篇章</div>`}</div>
                `;
            } else if (subTab === "npcs") {
                const npcCards = (d.npcs || []).map((n) => `
                    <div class="ks-dex-card">
                        <div>
                            <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:5px;">
                                <span style="font-size:11px;font-weight:800;color:#1E2028;">${(n.name || "").replace(/</g, "&lt;")}</span>
                                <span data-delnpc="${n.id}" style="cursor:pointer;color:#9A6868;font-weight:800;font-size:11px;">×</span>
                            </div>
                            <div style="display:flex;gap:4px;flex-wrap:wrap;margin-bottom:6px;">
                                <span style="font-size:7.2px;font-weight:700;color:#525868;background:#F0F2F7;padding:1.5px 6px;border-radius:5px;">${(n.role || "人物").replace(/</g, "&lt;")}</span>
                                <span style="font-size:7.2px;font-weight:700;color:#FFFFFF;background:var(--ks-accent,#1E2028);padding:1.5px 6px;border-radius:5px;">态度: ${(n.attitude || "中立").replace(/</g, "&lt;")}</span>
                            </div>
                            <div style="font-size:9.2px;font-weight:600;color:#484E5E;line-height:1.55;">${(n.desc || "").replace(/</g, "&lt;")}</div>
                        </div>
                    </div>
                `).join("");

                bodyContentHtml = `
                    <div style="display:flex;gap:6px;margin-bottom:10px;">
                        <span class="ks-pill" id="ks-npc-add-open" style="flex:1;">+ 手动录入人物(NPC)</span>
                        <span class="ks-pill dark" id="ks-dex-ai-scan" style="flex:1.3;">AI 从近期聊天提取人物&amp;物品</span>
                    </div>
                    <div id="ks-npc-drawer" class="ks-card" style="display:none;margin-bottom:10px;">
                        <div style="display:flex;gap:5px;margin-bottom:6px;">
                            <input type="text" id="ks-npc-name" placeholder="人物姓名..." style="flex:1;height:28px;background:#F8F9FC;border:1px solid #E4E8F0;border-radius:7px;padding:0 8px;font-size:9.5px;font-weight:700;color:#1E2028;outline:none;" />
                            <input type="text" id="ks-npc-role" placeholder="身份关系(如:发小/情敌)" style="flex:1;height:28px;background:#F8F9FC;border:1px solid #E4E8F0;border-radius:7px;padding:0 8px;font-size:9.5px;color:#1E2028;outline:none;" />
                            <input type="text" id="ks-npc-att" placeholder="态度(如:友善/敌意)" style="width:76px;height:28px;background:#F8F9FC;border:1px solid #E4E8F0;border-radius:7px;padding:0 6px;font-size:9px;color:#1E2028;outline:none;" />
                        </div>
                        <textarea id="ks-npc-desc" placeholder="填写该NPC的设定、经历或防失忆要点..." style="width:100%;height:42px;background:#F8F9FC;border:1px solid #E4E8F0;border-radius:7px;padding:5px 8px;font-size:9.2px;color:#1E2028;box-sizing:border-box;resize:none;outline:none;margin-bottom:6px;"></textarea>
                        <div style="display:flex;justify-content:flex-end;"><span class="ks-pill dark" id="ks-npc-save">存入人物图鉴</span></div>
                    </div>
                    <div class="ks-dex-grid">${npcCards}</div>
                `;
            } else {
                const itemCards = (d.items || []).map((it) => `
                    <div class="ks-dex-card">
                        <div>
                            <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:5px;">
                                <span style="font-size:11px;font-weight:800;color:#1E2028;">${(it.name || "").replace(/</g, "&lt;")}</span>
                                <span data-delitem="${it.id}" style="cursor:pointer;color:#9A6868;font-weight:800;font-size:11px;">×</span>
                            </div>
                            <div style="display:flex;gap:4px;flex-wrap:wrap;margin-bottom:6px;">
                                <span style="font-size:7.2px;font-weight:700;color:#525868;background:#F0F2F7;padding:1.5px 6px;border-radius:5px;">归属: ${(it.owner || "未知").replace(/</g, "&lt;")}</span>
                                <span style="font-size:7.2px;font-weight:700;color:#FFFFFF;background:var(--ks-accent,#1E2028);padding:1.5px 6px;border-radius:5px;">${(it.status || "持有中").replace(/</g, "&lt;")}</span>
                            </div>
                            <div style="font-size:9.2px;font-weight:600;color:#484E5E;line-height:1.55;">${(it.desc || "").replace(/</g, "&lt;")}</div>
                        </div>
                    </div>
                `).join("");

                bodyContentHtml = `
                    <div style="display:flex;gap:6px;margin-bottom:10px;">
                        <span class="ks-pill" id="ks-item-add-open" style="flex:1;">+ 手动录入关键物品</span>
                        <span class="ks-pill dark" id="ks-dex-ai-scan" style="flex:1.3;">AI 从近期聊天提取人物&amp;物品</span>
                    </div>
                    <div id="ks-item-drawer" class="ks-card" style="display:none;margin-bottom:10px;">
                        <div style="display:flex;gap:5px;margin-bottom:6px;">
                            <input type="text" id="ks-item-name" placeholder="物品/地点名称..." style="flex:1;height:28px;background:#F8F9FC;border:1px solid #E4E8F0;border-radius:7px;padding:0 8px;font-size:9.5px;font-weight:700;color:#1E2028;outline:none;" />
                            <input type="text" id="ks-item-owner" placeholder="持有者/归属" style="flex:1;height:28px;background:#F8F9FC;border:1px solid #E4E8F0;border-radius:7px;padding:0 8px;font-size:9.5px;color:#1E2028;outline:none;" />
                            <input type="text" id="ks-item-st" placeholder="状态(如:随身携带)" style="width:82px;height:28px;background:#F8F9FC;border:1px solid #E4E8F0;border-radius:7px;padding:0 6px;font-size:9px;color:#1E2028;outline:none;" />
                        </div>
                        <textarea id="ks-item-desc" placeholder="填写该物品的来历、伏笔意义或防失忆细节..." style="width:100%;height:42px;background:#F8F9FC;border:1px solid #E4E8F0;border-radius:7px;padding:5px 8px;font-size:9.2px;color:#1E2028;box-sizing:border-box;resize:none;outline:none;margin-bottom:6px;"></textarea>
                        <div style="display:flex;justify-content:flex-end;"><span class="ks-pill dark" id="ks-item-save">存入物品图鉴</span></div>
                    </div>
                    <div class="ks-dex-grid">${itemCards}</div>
                `;
            }

            vp.innerHTML = `
                <div id="ks-pro-tl-container" style="flex:1;overflow-y:auto;padding:12px 14px 18px 14px;pointer-events:auto;">
                    <!-- 顶部三栏切换：编年时间轴 / 关键人物(NPC) / 关键物品(ITEMS) -->
                    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">
                        <div class="ks-dual-switch" style="width:100%;display:grid!important;grid-template-columns:1fr 1fr 1fr;text-align:center;">
                            <span class="ks-dual-opt ${subTab === "timeline" ? "active" : ""}" data-lsub="timeline">记忆编年 (${d.timeline?.length || 0})</span>
                            <span class="ks-dual-opt ${subTab === "npcs" ? "active" : ""}" data-lsub="npcs">关键人物 NPC (${d.npcs?.length || 0})</span>
                            <span class="ks-dual-opt ${subTab === "items" ? "active" : ""}" data-lsub="items">关键物品 (${d.items?.length || 0})</span>
                        </div>
                    </div>
                    ${bodyContentHtml}
                </div>
            `;

            vp.querySelectorAll("[data-lsub]").forEach((b) => {
                b.onclick = () => {
                    const latest = loadMem(ch);
                    latest.autoCfg.logSubTab = b.getAttribute("data-lsub");
                    saveMem(latest, ch);
                    isRenderingUI = false; renderProTimelineAndDexUI();
                };
            });

            // 编年页事件
            topDoc.getElementById("ks-tl-add-open")?.addEventListener("click", () => {
                const dr = topDoc.getElementById("ks-tl-drawer");
                if (dr) dr.style.display = dr.style.display === "none" ? "block" : "none";
            });
            topDoc.getElementById("ks-tl-save")?.addEventListener("click", () => {
                const ti = topDoc.getElementById("ks-tl-ti").value.trim() || "新篇章";
                const ct = topDoc.getElementById("ks-tl-ct").value.trim();
                if (!ct) return;
                const latest = loadMem(ch);
                latest.timeline.unshift({ id: Date.now(), chapter: `CHAPTER ${String(latest.timeline.length + 1).padStart(2, "0")}`, title: ti, content: ct, note: `“ 手动归档于${chLabel} ”` });
                saveMem(latest, ch); isRenderingUI = false; renderProTimelineAndDexUI();
            });
            topDoc.getElementById("ks-tl-sync-sum")?.addEventListener("click", () => {
                const latest = loadMem(ch);
                const existing = new Set((latest.timeline || []).map((t) => t.range).filter(Boolean));
                let added = 0;
                (latest.summaries || []).forEach((s, idx) => {
                    if (s.range && !existing.has(s.range)) {
                        latest.timeline.unshift({ id: Date.now() + idx, range: s.range, chapter: `ARCHIVE · ${s.range}`, title: s.title, content: s.content, note: s.keyFacts ? `“ 要点：${s.keyFacts} ”` : "" });
                        existing.add(s.range); added++;
                    }
                });
                saveMem(latest, ch); isRenderingUI = false; renderProTimelineAndDexUI();
                alert(added > 0 ? `已补齐 ${added} 篇编年章节！` : "所有总结均已同步在编年中！");
            });
            vp.querySelectorAll("[data-deltl]").forEach((b) => b.onclick = () => {
                const latest = loadMem(ch);
                latest.timeline = latest.timeline.filter((x) => Number(x.id) !== Number(b.getAttribute("data-deltl")));
                saveMem(latest, ch); isRenderingUI = false; renderProTimelineAndDexUI();
            });

            // 人物 NPC 事件
            topDoc.getElementById("ks-npc-add-open")?.addEventListener("click", () => {
                const dr = topDoc.getElementById("ks-npc-drawer");
                if (dr) dr.style.display = dr.style.display === "none" ? "block" : "none";
            });
            topDoc.getElementById("ks-npc-save")?.addEventListener("click", () => {
                const nm = topDoc.getElementById("ks-npc-name").value.trim();
                const rl = topDoc.getElementById("ks-npc-role").value.trim() || "相关人物";
                const at = topDoc.getElementById("ks-npc-att").value.trim() || "中立";
                const ds = topDoc.getElementById("ks-npc-desc").value.trim();
                if (!nm || !ds) return alert("请填写人物姓名与描述！");
                const latest = loadMem(ch);
                latest.npcs.unshift({ id: Date.now(), name: nm, role: rl, attitude: at, desc: ds });
                saveMem(latest, ch); isRenderingUI = false; renderProTimelineAndDexUI();
            });
            vp.querySelectorAll("[data-delnpc]").forEach((b) => b.onclick = () => {
                const latest = loadMem(ch);
                latest.npcs = latest.npcs.filter((x) => Number(x.id) !== Number(b.getAttribute("data-delnpc")));
                saveMem(latest, ch); isRenderingUI = false; renderProTimelineAndDexUI();
            });

            // 物品 ITEM 事件
            topDoc.getElementById("ks-item-add-open")?.addEventListener("click", () => {
                const dr = topDoc.getElementById("ks-item-drawer");
                if (dr) dr.style.display = dr.style.display === "none" ? "block" : "none";
            });
            topDoc.getElementById("ks-item-save")?.addEventListener("click", () => {
                const nm = topDoc.getElementById("ks-item-name").value.trim();
                const ow = topDoc.getElementById("ks-item-owner").value.trim() || "专属信物";
                const stVal = topDoc.getElementById("ks-item-st").value.trim() || "持有中";
                const ds = topDoc.getElementById("ks-item-desc").value.trim();
                if (!nm || !ds) return alert("请填写物品名称与描述！");
                const latest = loadMem(ch);
                latest.items.unshift({ id: Date.now(), name: nm, owner: ow, status: stVal, desc: ds });
                saveMem(latest, ch); isRenderingUI = false; renderProTimelineAndDexUI();
            });
            vp.querySelectorAll("[data-delitem]").forEach((b) => b.onclick = () => {
                const latest = loadMem(ch);
                latest.items = latest.items.filter((x) => Number(x.id) !== Number(b.getAttribute("data-delitem")));
                saveMem(latest, ch); isRenderingUI = false; renderProTimelineAndDexUI();
            });

            // AI 一键扫描近期聊天提取关键人物与关键物品
            topDoc.getElementById("ks-dex-ai-scan")?.addEventListener("click", async (e) => {
                const btn = e.currentTarget, orig = btn.textContent;
                const rawArr = ch === "st" ? c.stChatArr : c.wxChatArr;
                if (!rawArr.length) return alert("当前轨道暂无聊天记录可扫描！");
                const recentTxt = rawArr.slice(-20).map((m) => ch === "st" ? `${m.is_user ? c.userName : c.charName}: ${m.mes}` : `${m.role === "user" ? c.userName : c.charName}: ${m.text}`).join("\n");
                btn.textContent = "AI扫描提取中...";
                try {
                    const raw = await askAI(`你是剧情设定提取官。主角：${c.charName}与${c.userName}。`, `请从以下近期对话中提取1~2个提及的重要人物(NPC/配角/关系人)和1~2个关键物品(信物/礼物/道具/重要地点)。\n${recentTxt.slice(-2800)}\n严格只输出JSON：{"npcs":[{"name":"姓名","role":"身份关系","attitude":"态度","desc":"30字内描述"}],"items":[{"name":"物品名","owner":"持有者","status":"状态","desc":"30字内意义"}]}`);
                    const m = raw.match(/\{[\s\S]*\}/);
                    if (m) {
                        const o = JSON.parse(m[0]), latest = loadMem(ch);
                        (o.npcs || []).forEach((n, idx) => {
                            if (n.name) latest.npcs.unshift({ id: Date.now() + idx, name: n.name, role: n.role || "登场人物", attitude: n.attitude || "未知", desc: n.desc || "" });
                        });
                        (o.items || []).forEach((it, idx) => {
                            if (it.name) latest.items.unshift({ id: Date.now() + 10 + idx, name: it.name, owner: it.owner || "剧情物品", status: it.status || "已出现", desc: it.desc || "" });
                        });
                        saveMem(latest, ch); isRenderingUI = false; renderProTimelineAndDexUI();
                    }
                } catch (err) { alert(err.message); btn.textContent = orig; }
            });

            setTimeout(() => { isRenderingUI = false; }, 60);
        }

        // ══════════════════════════════════════════════════════════════════════════
        // ⚙️ 4. 渲染第 5 栏：【中枢设置 (pact -> 主题颜色定制 + 契约锚点 + 注入策略 + 备份恢复)】
        // ══════════════════════════════════════════════════════════════════════════
        function renderProSettingsUI() {
            const ch = getCh();
            const d = loadMem(ch);
            if (!d || !d.isBound || d.activeTab !== "pact" || isRenderingUI) return;

            isRenderingUI = true;
            const c = getCtx();
            const chLabel = ch === "st" ? "酒馆主线" : "微信线上";
            const curHex = d.autoCfg?.themeColor || "#1E2028";

            const swatchesHtml = THEME_PRESETS.map((tp) => `
                <div style="display:flex;flex-direction:column;align-items:center;gap:4px;cursor:pointer;" data-pickhex="${tp.hex}" data-picksoft="${tp.soft}">
                    <div class="ks-color-swatch ${curHex.toLowerCase() === tp.hex.toLowerCase() ? "active" : ""}" style="background:${tp.hex};"></div>
                    <span style="font-size:7.2px;font-weight:700;color:#6E7688;">${tp.name}</span>
                </div>
            `).join("");

            vp.innerHTML = `
                <div id="ks-pro-set-container" style="flex:1;overflow-y:auto;padding:12px 14px 20px 14px;pointer-events:auto;">
                    <!-- 模块1：结识海主题颜色与视觉设置 -->
                    <div class="ks-card" style="margin-bottom:10px;">
                        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">
                            <div>
                                <div style="font-size:11px;font-weight:800;color:#1E2028;">主题颜色定制 · THEME PALETTE</div>
                                <div style="font-size:7.5px;color:#7E8494;">切换结识海的强调色、徽章色与星盘主色调</div>
                            </div>
                            <label style="display:inline-flex;align-items:center;gap:4px;cursor:pointer;background:#F6F8FC;padding:3px 8px;border-radius:99px;border:1px solid #E4E8F0;">
                                <input type="color" id="ks-custom-color-inp" value="${curHex}" style="width:16px;height:16px;border:none;padding:0;background:transparent;cursor:pointer;" />
                                <span style="font-size:8px;font-weight:700;color:#2C303C;">自由取色</span>
                            </label>
                        </div>
                        <div style="display:flex;justify-content:space-between;align-items:center;padding:4px 4px 10px 4px;border-bottom:1px solid #F0F2F7;">
                            ${swatchesHtml}
                        </div>
                        <div style="display:flex;justify-content:space-between;align-items:center;padding-top:9px;">
                            <span style="font-size:9px;font-weight:700;color:#3A3E4C;">每次打开播放「双环星轨开屏动画」</span>
                            <span class="ks-flt ${d.autoCfg?.showSplash !== false ? "on" : ""}" id="ks-tog-splash">${d.autoCfg?.showSplash !== false ? "已开启✓" : "已关闭"}</span>
                        </div>
                    </div>

                    <!-- 模块2：防失忆底层注入策略设置 -->
                    <div class="ks-card" style="margin-bottom:10px;">
                        <div style="font-size:11px;font-weight:800;color:#1E2028;margin-bottom:8px;">防失忆底层注入策略 · MEMORY ENGINE</div>
                        <div style="display:flex;justify-content:space-between;align-items:center;padding-bottom:8px;margin-bottom:8px;border-bottom:1px solid #F0F2F7;">
                            <div>
                                <div style="font-size:9.2px;font-weight:700;color:#2C303C;">同步注入【关键人物 NPC &amp; 关键物品】</div>
                                <div style="font-size:7.5px;color:#8E94A4;">防止 AI 遗忘出场过的配角关系与重要信物道具</div>
                            </div>
                            <span class="ks-flt ${d.autoCfg?.injectNpcItem !== false ? "on" : ""}" id="ks-tog-npc-inj">${d.autoCfg?.injectNpcItem !== false ? "注入中✓" : "不注入"}</span>
                        </div>
                        <div style="display:flex;justify-content:space-between;align-items:center;">
                            <span style="font-size:9px;font-weight:700;color:#2C303C;">最多携带最近多少篇楼层总结</span>
                            <div style="display:flex;align-items:center;gap:5px;">
                                <input type="number" id="ks-max-sum-inp" class="ks-num-inp" min="3" max="50" value="${d.autoCfg?.maxSumInject || 12}" />
                                <span style="font-size:8.5px;font-weight:700;color:#525868;">篇</span>
                            </div>
                        </div>
                    </div>

                    <!-- 模块3：当前轨道契约与核心防失忆铁律 -->
                    <div class="ks-card" style="margin-bottom:10px;">
                        <div style="font-size:11px;font-weight:800;color:#1E2028;margin-bottom:8px;">【${chLabel}】契约与核心人设锚点</div>
                        <div style="display:flex;gap:6px;margin-bottom:6px;">
                            <input type="text" id="ks-set-title" value="${(d.pact?.title || "").replace(/"/g, "&quot;")}" placeholder="档案名称" style="flex:1;height:28px;background:#F8F9FC;border:1px solid #E4E8F0;border-radius:7px;padding:0 8px;font-size:9.5px;font-weight:700;color:#1E2028;outline:none;" />
                            <input type="text" id="ks-set-stage" value="${(d.pact?.stage || "").replace(/"/g, "&quot;")}" placeholder="当前关系阶段" style="flex:1;height:28px;background:#F8F9FC;border:1px solid #E4E8F0;border-radius:7px;padding:0 8px;font-size:9.5px;color:#1E2028;outline:none;" />
                        </div>
                        <textarea id="ks-set-anchor" placeholder="写下绝对不允许AI遗忘或吃书的核心设定铁律..." style="width:100%;height:48px;background:#F8F9FC;border:1px solid #E4E8F0;border-radius:7px;padding:6px 8px;font-size:9.2px;color:#1E2028;box-sizing:border-box;resize:none;outline:none;margin-bottom:8px;">${(d.pact?.coreAnchor || "").replace(/</g, "&lt;")}</textarea>
                        <div style="display:flex;justify-content:flex-end;">
                            <span class="ks-pill dark" id="ks-save-pact-btn">保存契约与核心铁律</span>
                        </div>
                    </div>

                    <!-- 模块4：数据备份、导入与重置 -->
                    <div class="ks-card">
                        <div style="font-size:11px;font-weight:800;color:#1E2028;margin-bottom:8px;">记忆档案备份与管理 · BACKUP</div>
                        <div style="display:flex;gap:6px;">
                            <span class="ks-pill" id="ks-export-json" style="flex:1;">导出备份(JSON)</span>
                            <label class="ks-pill" style="flex:1;cursor:pointer;">
                                <span>导入恢复</span>
                                <input type="file" id="ks-import-json" accept=".json,application/json" style="display:none;" />
                            </label>
                            <span class="ks-pill" id="ks-reset-ch" style="color:#9A6868!important;">重置本轨</span>
                        </div>
                    </div>
                </div>
            `;

            vp.querySelectorAll("[data-pickhex]").forEach((el) => {
                el.onclick = () => {
                    const hex = el.getAttribute("data-pickhex");
                    const soft = el.getAttribute("data-picksoft");
                    const latest = loadMem(ch);
                    latest.autoCfg.themeColor = hex;
                    latest.autoCfg.themeSoft = soft;
                    saveMem(latest, ch);
                    isRenderingUI = false; renderProSettingsUI();
                };
            });

            topDoc.getElementById("ks-custom-color-inp").onchange = (e) => {
                const hex = e.target.value;
                const latest = loadMem(ch);
                latest.autoCfg.themeColor = hex;
                saveMem(latest, ch);
                isRenderingUI = false; renderProSettingsUI();
            };

            topDoc.getElementById("ks-tog-splash").onclick = () => {
                const latest = loadMem(ch);
                latest.autoCfg.showSplash = !(latest.autoCfg.showSplash !== false);
                saveMem(latest, ch);
                isRenderingUI = false; renderProSettingsUI();
            };

            topDoc.getElementById("ks-tog-npc-inj").onclick = () => {
                const latest = loadMem(ch);
                latest.autoCfg.injectNpcItem = !(latest.autoCfg.injectNpcItem !== false);
                saveMem(latest, ch);
                isRenderingUI = false; renderProSettingsUI();
            };

            topDoc.getElementById("ks-max-sum-inp").onchange = (e) => {
                const latest = loadMem(ch);
                latest.autoCfg.maxSumInject = Math.max(3, Math.min(50, Number(e.target.value) || 12));
                saveMem(latest, ch);
            };

            topDoc.getElementById("ks-save-pact-btn").onclick = () => {
                const latest = loadMem(ch);
                latest.pact = latest.pact || {};
                latest.pact.title = topDoc.getElementById("ks-set-title").value.trim();
                latest.pact.stage = topDoc.getElementById("ks-set-stage").value.trim();
                latest.pact.coreAnchor = topDoc.getElementById("ks-set-anchor").value.trim();
                saveMem(latest, ch);
                alert("已保存并实时更新到底层防失忆注入库！");
            };

            topDoc.getElementById("ks-export-json").onclick = () => {
                const latest = loadMem(ch);
                const blob = new Blob([JSON.stringify(latest, null, 2)], { type: "application/json" });
                const url = URL.createObjectURL(blob);
                const a = topDoc.createElement("a");
                a.href = url;
                a.download = `sumoul_memory_${ch}_${c.safeScope}.json`;
                a.click();
                URL.revokeObjectURL(url);
            };

            topDoc.getElementById("ks-import-json").onchange = (e) => {
                const f = e.target.files?.[0];
                if (!f) return;
                const r = new FileReader();
                r.onload = (ev) => {
                    try {
                        const parsed = JSON.parse(String(ev.target?.result || "{}"));
                        saveMem(parsed, ch);
                        alert("记忆档案导入恢复成功！");
                        isRenderingUI = false; renderProSettingsUI();
                    } catch (err) { alert("JSON 文件格式有误，无法导入"); }
                };
                r.readAsText(f);
            };

            topDoc.getElementById("ks-reset-ch").onclick = () => {
                if (!confirm(`确定清空重置当前【${chLabel}】的所有记忆吗？（另一轨道不受影响）`)) return;
                localStorage.removeItem(getStoreKey(ch));
                const mapTab = topDoc.querySelector('#ks-bottom-dock .ks-dock-item[data-kstab="map"]');
                if (mapTab) mapTab.click();
            };

            setTimeout(() => { isRenderingUI = false; }, 60);
        }

        // 监听视图容器变化，按当前激活的 Tab 挂载对应增强页面
        const obs = new MutationObserver(() => {
            const d = loadMem(getCh());
            if (!d || !d.isBound) return;
            applyThemeVariables(d.autoCfg?.themeColor, d.autoCfg?.themeSoft);
            if (d.activeTab === "summary" && !topDoc.getElementById("ks-pro-sum-container")) {
                renderProSummaryUI();
            } else if (d.activeTab === "timeline" && !topDoc.getElementById("ks-pro-tl-container")) {
                renderProTimelineAndDexUI();
            } else if (d.activeTab === "pact" && !topDoc.getElementById("ks-pro-set-container")) {
                renderProSettingsUI();
            }
        });
        obs.observe(vp, { childList: true });

        const initD = loadMem(getCh());
        if (initD && initD.isBound) {
            if (initD.activeTab === "summary") renderProSummaryUI();
            else if (initD.activeTab === "timeline") renderProTimelineAndDexUI();
            else if (initD.activeTab === "pact") renderProSettingsUI();
        }
        syncFullPromptInjection();
    }

    mountUltimateMemorySeaPatch();
})();
// ==========================================================================
// 🤍 【结识海 · 极简纯白清冷开屏动画终极版 (一滴雨落双点牵丝 + 用户×角色双人名字 + 0.8px极细流光进度条)】
// 用法：直接替换 index.js 最末尾刚才那段 mountMinimalColdSplash 补丁代码！
// ==========================================================================
(function () {
    const topWin = window.parent || window;
    const topDoc = topWin.document;

    function getNames() {
        let userName = "ME", charName = "PARTNER", scope = "PARTNER";
        try {
            const st = topWin.SillyTavern?.getContext?.();
            if (st) {
                userName = st.name1 || userName;
                if (st.characterId !== undefined && st.characters?.[st.characterId]) {
                    const c = st.characters[st.characterId];
                    charName = c.name || st.name2 || charName;
                    scope = c.avatar || c.name || String(st.characterId);
                } else if (st.name2) {
                    charName = st.name2; scope = st.name2;
                }
            }
        } catch (e) {}
        const safeScope = String(scope).replace(/[^a-zA-Z0-9_\u4e00-\u9fa5\uac00-\ud7af-]/g, "_");
        try {
            const wCfg = JSON.parse(localStorage.getItem(`sumoul_v16_wxcfg__${safeScope}`) || "{}");
            if (wCfg.myNick) userName = wCfg.myNick;
            if (wCfg.remark) charName = wCfg.remark;
        } catch (e) {}
        return { userName, charName, safeScope };
    }

    function mountMinimalColdSplashWithNames() {
        const overlay = topDoc.getElementById("smt-ksea-overlay");
        if (!overlay) {
            setTimeout(mountMinimalColdSplashWithNames, 200);
            return;
        }

        topDoc.getElementById("ks-splash-screen")?.remove();
        topDoc.getElementById("ks-pure-splash")?.remove();
        topDoc.getElementById("ks-clean-splash-css")?.remove();

        const st = topDoc.createElement("style");
        st.id = "ks-clean-splash-css";
        st.innerHTML = `
            /* 1. 极细 0.6px 银丝雨滴静谧垂落 */
            @keyframes ksPureRainDrop {
                0%   { top: 18%; height: 0px; opacity: 0; }
                35%  { height: 38px; opacity: 0.6; }
                75%  { top: 46%; height: 8px; opacity: 0.75; }
                100% { top: 46.5%; height: 0px; opacity: 0; }
            }
            /* 2. 极淡 0.5px 同心水纹缓缓化开 */
            @keyframes ksPureRipple {
                0%, 55% { transform: translate(-50%, -50%) scale(0.25); opacity: 0; }
                68%     { opacity: 0.45; }
                100%    { transform: translate(-50%, -50%) scale(2.6); opacity: 0; }
            }
            /* 3. 双点浮现并向两侧轻微舒展 */
            @keyframes ksDotLeft {
                0%, 56% { transform: translate(-50%, -50%) scale(0); opacity: 0; }
                100%    { transform: translate(calc(-50% - 32px), -50%) scale(1); opacity: 1; }
            }
            @keyframes ksDotRight {
                0%, 60% { transform: translate(-50%, -50%) scale(0); opacity: 0; }
                100%    { transform: translate(calc(-50% + 32px), -50%) scale(1); opacity: 1; }
            }
            /* 4. 两点之间极细 0.6px 丝线缓慢拉通 */
            @keyframes ksThreadLink {
                0%, 64% { width: 0px; opacity: 0; }
                100%    { width: 56px; opacity: 0.55; }
            }
            /* 5. 韩系极细留白文字柔焦浮现 */
            @keyframes ksWhisperText {
                0%, 45% { opacity: 0; filter: blur(3px); transform: translateY(5px); }
                100%    { opacity: 1; filter: blur(0px); transform: translateY(0); }
            }

            #seoul-mini-theater-modal #ks-pure-splash {
                position: absolute !important; inset: 0 !important; z-index: 99999 !important;
                background: #FFFFFF !important;
                display: none; flex-direction: column !important; align-items: center !important; justify-content: center !important;
                transition: opacity 0.5s ease !important;
                user-select: none !important; cursor: pointer !important;
            }
            #seoul-mini-theater-modal #ks-pure-splash.show {
                display: flex !important; opacity: 1 !important;
            }
            #seoul-mini-theater-modal #ks-pure-splash.fade-out {
                opacity: 0 !important; pointer-events: none !important;
            }
        `;
        topDoc.head.appendChild(st);

        const splash = topDoc.createElement("div");
        splash.id = "ks-pure-splash";
        overlay.appendChild(splash);

        let timer = null;
        let pctTimer = null;

        function playPureColdSplash() {
            const ch = localStorage.getItem("sumoul_v16_mem_active_channel") === "wx" ? "wx" : "st";
            const { userName, charName, safeScope } = getNames();
            let accent = "#1E2028";

            try {
                const saved = JSON.parse(localStorage.getItem(`sumoul_v16_dualmem_${ch}__${safeScope}`) || "{}");
                if (saved?.autoCfg?.showSplash === false) return;
                if (saved?.autoCfg?.themeColor) accent = saved.autoCfg.themeColor;
            } catch (e) {}

            splash.classList.remove("fade-out");
            splash.classList.add("show");
            splash.innerHTML = `
                <!-- 1. 极简留白舞台：一滴细雨 -> 涟漪 -> 双点牵丝 -->
                <div style="position:relative;width:200px;height:110px;">
                    <!-- 0.6px 垂直落雨细丝 -->
                    <div style="position:absolute;left:50%;transform:translateX(-50%);width:0.65px;background:linear-gradient(180deg,transparent,${accent});animation:ksPureRainDrop 0.78s cubic-bezier(0.4,0,0.2,1) forwards;"></div>

                    <!-- 两圈 0.5px 极淡同心水纹 -->
                    <div style="position:absolute;left:50%;top:46.5%;width:32px;height:32px;border-radius:50%;border:0.6px solid rgba(34,36,44,0.40);animation:ksPureRipple 1.35s ease-out forwards;"></div>
                    <div style="position:absolute;left:50%;top:46.5%;width:32px;height:32px;border-radius:50%;border:0.5px solid rgba(140,146,160,0.30);animation:ksPureRipple 1.35s ease-out 0.16s forwards;"></div>

                    <!-- 两点之间缓缓拉通的 0.6px 极细游丝 -->
                    <div style="position:absolute;left:50%;top:46.5%;transform:translate(-50%,-50%);height:0.6px;background:${accent};animation:ksThreadLink 1.15s cubic-bezier(0.22,1,0.36,1) forwards;"></div>

                    <!-- 左微点 (实心深炭微点 · 代表User) -->
                    <div style="position:absolute;left:50%;top:46.5%;width:4px;height:4px;border-radius:50%;background:${accent};box-shadow:0 0 0 3.5px #FFFFFF;animation:ksDotLeft 1.1s cubic-bezier(0.22,1,0.36,1) forwards;"></div>

                    <!-- 右微点 (空心冷银微点 · 代表Char) -->
                    <div style="position:absolute;left:50%;top:46.5%;width:4px;height:4px;border-radius:50%;background:#FFFFFF;border:1.15px solid #585E70;box-sizing:border-box;box-shadow:0 0 0 3.5px #FFFFFF;animation:ksDotRight 1.1s cubic-bezier(0.22,1,0.36,1) forwards;"></div>
                </div>

                <!-- 2. 极简标题 + 用户与角色名字对位排印 + 0.8px极细进度条 -->
                <div style="text-align:center;animation:ksWhisperText 1.1s cubic-bezier(0.22,1,0.36,1) forwards;">
                    <div style="font-size:13.5px;font-weight:300;color:${accent};letter-spacing:7px;padding-left:7px;">结 识 海</div>

                    <!-- 用户名字 × 角色名字（极简清冷对位） -->
                    <div style="display:inline-flex;align-items:center;justify-content:center;gap:10px;margin-top:10px;font-size:9.5px;font-weight:500;color:#3A3E4C;letter-spacing:1.2px;">
                        <span>${userName.replace(/</g, "&lt;")}</span>
                        <span style="width:12px;height:0.6px;background:#B8C0D0;display:inline-block;"></span>
                        <span>${charName.replace(/</g, "&lt;")}</span>
                    </div>

                    <div style="font-size:6.8px;font-weight:400;color:#98A0B2;letter-spacing:3px;margin-top:5px;padding-left:3px;">
                        인연의 바다 · ${ch === "st" ? "TAVERN ARCHIVE" : "WECHAT ARCHIVE"}
                    </div>

                    <!-- 0.8px 极细发丝级流光进度条 + 微距百分比 -->
                    <div style="width:116px;height:1px;background:#ECEEF4;margin:18px auto 6px auto;overflow:hidden;">
                        <div id="ks-clean-prog-line" style="width:0%;height:100%;background:${accent};transition:width 1.25s cubic-bezier(0.22,1,0.36,1);"></div>
                    </div>
                    <div id="ks-clean-prog-num" style="font-size:7px;font-weight:500;color:#98A0B2;font-family:monospace;letter-spacing:2px;">
                        00%
                    </div>
                </div>
            `;

            requestAnimationFrame(() => {
                const line = topDoc.getElementById("ks-clean-prog-line");
                if (line) line.style.width = "100%";
            });

            let p = 8;
            if (pctTimer) clearInterval(pctTimer);
            pctTimer = setInterval(() => {
                p = Math.min(100, p + Math.floor(Math.random() * 22) + 14);
                const numEl = topDoc.getElementById("ks-clean-prog-num");
                if (numEl) numEl.textContent = `${String(p).padStart(2, "0")}%`;
                if (p >= 100) clearInterval(pctTimer);
            }, 190);

            if (timer) clearTimeout(timer);
            timer = setTimeout(() => {
                if (pctTimer) clearInterval(pctTimer);
                splash.classList.add("fade-out");
                setTimeout(() => splash.classList.remove("show", "fade-out"), 500);
            }, 1600);
        }

        splash.onclick = () => {
            if (timer) clearTimeout(timer);
            if (pctTimer) clearInterval(pctTimer);
            splash.classList.add("fade-out");
            setTimeout(() => splash.classList.remove("show", "fade-out"), 300);
        };

        let wasOpen = overlay.classList.contains("open");
        const obs = new MutationObserver(() => {
            const isOpen = overlay.classList.contains("open");
            if (isOpen && !wasOpen) {
                const oldSp = topDoc.getElementById("ks-splash-screen");
                if (oldSp) oldSp.style.display = "none";
                playPureColdSplash();
            }
            wasOpen = isOpen;
        });
        obs.observe(overlay, { attributes: true, attributeFilter: ["class"] });
    }

    mountMinimalColdSplashWithNames();
})();
// ==========================================================================
// 🤍 【Sumoul App 全局与结识海 · 自定义字体(5款预设+URL/本地字体上传) & 自由字号放大补丁(默认115%解决字太小)】
// 用法：直接粘贴在 index.js 最末尾最后一行后面！在【结识海->中枢设置】和【API设置】里均可随时调节！
// ==========================================================================
(function () {
    const topWin = window.parent || window;
    const topDoc = topWin.document;
    const FONT_STORE_KEY = "sumoul_v16_custom_font_prefs";

    // 5 款韩系高定字体预设
    const FONT_PRESETS = [
        {
            id: "system",
            name: "韩系原生无衬线",
            family: `-apple-system, BlinkMacSystemFont, "SF Pro Text", "Apple SD Gothic Neo", "PingFang SC", sans-serif`,
            cssUrl: ""
        },
        {
            id: "serif",
            name: "清冷文艺宋明体",
            family: `"Noto Serif SC", "Nanum Myeongjo", "Songti SC", "STSong", serif`,
            cssUrl: "https://fonts.googleapis.com/css2?family=Nanum+Myeongjo:wght@400;700;800&family=Noto+Serif+SC:wght@400;600;700&display=swap"
        },
        {
            id: "wenkai",
            name: "清透手写文楷",
            family: `"LXGW WenKai", "Kaiti SC", "STKaiti", serif`,
            cssUrl: "https://cdn.jsdelivr.net/npm/lxgw-wenkai-webfont@1.7.0/style.css"
        },
        {
            id: "round",
            name: "温柔韩系圆体",
            family: `"Varela Round", "YouYuan", "PingFang SC", sans-serif`,
            cssUrl: ""
        },
        {
            id: "mono",
            name: "极简档案等宽",
            family: `"JetBrains Mono", "SF Mono", Menlo, Consolas, "PingFang SC", monospace`,
            cssUrl: ""
        }
    ];

    function loadFontPrefs() {
        const def = {
            presetId: "system",
            customFontUrl: "",
            customFontName: "",
            fontScale: 116 // 默认直接放大到 116%，彻底解决原本字太小的问题！
        };
        try {
            return Object.assign(def, JSON.parse(localStorage.getItem(FONT_STORE_KEY) || "{}"));
        } catch (e) {
            return def;
        }
    }

    function saveFontPrefs(p) {
        try {
            localStorage.setItem(FONT_STORE_KEY, JSON.stringify(p));
        } catch (e) {
            alert("本地字体文件体积过大，建议使用字体链接或预设字体。");
        }
    }

    // 扫描并无损放大所有元素的行内与CSS字号（不会破坏容器布局，只放大文字！）
    function applyFontScaleToTree(rootEl, scaleRatio) {
        if (!rootEl) return;
        const els = rootEl.querySelectorAll("*");
        els.forEach((el) => {
            // 跳过画布与SVG矢量图形内部
            if (el.tagName === "SVG" || el.tagName === "PATH" || el.tagName === "CIRCLE" || el.tagName === "LINE" || el.tagName === "CANVAS") return;

            const inlineFs = el.style?.fontSize;
            if (inlineFs && inlineFs.endsWith("px") && !el.hasAttribute("data-orig-fs")) {
                const rawNum = parseFloat(inlineFs);
                if (Number.isFinite(rawNum) && rawNum > 0 && rawNum < 40) {
                    el.setAttribute("data-orig-fs", String(rawNum));
                }
            }

            if (el.hasAttribute("data-orig-fs")) {
                const base = parseFloat(el.getAttribute("data-orig-fs"));
                if (Number.isFinite(base)) {
                    // 越小的字（比如原本7px/8px的微字）给予更高的保底放大补偿，确保清晰好读！
                    const minBoost = base < 9.5 ? Math.max(base * scaleRatio, base + (scaleRatio - 1) * 10.5) : base * scaleRatio;
                    el.style.setProperty("font-size", `${minBoost.toFixed(1)}px`, "important");
                }
            }
        });
    }

    function applyTypographyNow() {
        const modal = topDoc.getElementById("seoul-mini-theater-modal");
        if (!modal) return;
        const p = loadFontPrefs();
        const scale = Math.max(80, Math.min(180, Number(p.fontScale) || 116));
        const ratio = scale / 100;

        // 1. 决定当前字体族并按需加载外部字体库
        const preset = FONT_PRESETS.find((x) => x.id === p.presetId) || FONT_PRESETS[0];
        let activeFamily = preset.family;

        if (preset.cssUrl) {
            const linkId = `sumoul-font-link-${preset.id}`;
            if (!topDoc.getElementById(linkId)) {
                const lk = topDoc.createElement("link");
                lk.id = linkId;
                lk.rel = "stylesheet";
                lk.href = preset.cssUrl;
                topDoc.head.appendChild(lk);
            }
        }

        // 若用户填写了自定义字体链接 (.ttf / .woff2 / .css)
        let customFontFaceCss = "";
        if (p.customFontUrl && p.customFontUrl.trim()) {
            const url = p.customFontUrl.trim();
            if (url.endsWith(".css") || url.includes("fonts.googleapis.com")) {
                if (!topDoc.getElementById("sumoul-user-custom-font-css")) {
                    const lk = topDoc.createElement("link");
                    lk.id = "sumoul-user-custom-font-css";
                    lk.rel = "stylesheet";
                    lk.href = url;
                    topDoc.head.appendChild(lk);
                } else {
                    topDoc.getElementById("sumoul-user-custom-font-css").href = url;
                }
                if (p.customFontName) {
                    activeFamily = `"${p.customFontName}", ${activeFamily}`;
                }
            } else {
                customFontFaceCss = `
                    @font-face {
                        font-family: "SumoulUserCustomFont";
                        src: url("${url}");
                        font-display: swap;
                    }
                `;
                activeFamily = `"SumoulUserCustomFont", ${activeFamily}`;
            }
        }

        // 2. 注入全局字体族与 CSS 类字号放大规则
        let styleEl = topDoc.getElementById("sumoul-typography-master-css");
        if (!styleEl) {
            styleEl = topDoc.createElement("style");
            styleEl.id = "sumoul-typography-master-css";
            topDoc.head.appendChild(styleEl);
        }

        styleEl.innerHTML = `
            ${customFontFaceCss}
            #seoul-mini-theater-modal,
            #seoul-mini-theater-modal *:not(code):not(pre) {
                font-family: ${activeFamily} !important;
            }
            /* 针对固定CSS类的字号按比例同步放大 */
            #seoul-mini-theater-modal .ks-pill,
            #seoul-mini-theater-modal .ks-dual-opt,
            #seoul-mini-theater-modal .ks-dock-zh,
            #seoul-mini-theater-modal .smt-g-chip {
                font-size: ${(9.2 * ratio).toFixed(1)}px !important;
            }
            #seoul-mini-theater-modal .ks-flt,
            #seoul-mini-theater-modal .ks-range-badge,
            #seoul-mini-theater-modal .ks-sum-table th {
                font-size: ${(8.4 * ratio).toFixed(1)}px !important;
            }
            #seoul-mini-theater-modal .ks-dock-kr {
                font-size: ${(6.8 * ratio).toFixed(1)}px !important;
            }
            #seoul-mini-theater-modal .ks-sum-table td,
            #seoul-mini-theater-modal .smt-g-lbl,
            #seoul-mini-theater-modal .smt-g-inp {
                font-size: ${(10.0 * ratio).toFixed(1)}px !important;
            }
            #seoul-mini-theater-modal .ab-app-title {
                font-size: ${(10.5 * ratio).toFixed(1)}px !important;
            }
            #seoul-mini-theater-modal .ab-app-kr {
                font-size: ${(7.5 * ratio).toFixed(1)}px !important;
            }
        `;

        // 3. 实时放大所有行内 style="font-size:...px" 文字
        applyFontScaleToTree(modal, ratio);
    }

    // 生成字体与字号设置面板 HTML（可同时嵌入【结识海->中枢设置】与【API设置】）
    function createFontSettingCardHtml(prefix) {
        const p = loadFontPrefs();
        const sc = Math.max(80, Math.min(180, Number(p.fontScale) || 116));

        const presetsHtml = FONT_PRESETS.map((fp) => `
            <span class="ks-flt ${p.presetId === fp.id && !p.customFontUrl ? "on" : ""}" data-fpreset="${fp.id}" style="padding:4px 10px!important;">
                ${fp.name}
            </span>
        `).join("");

        return `
            <div class="ks-card" id="${prefix}-font-card" style="margin-bottom:10px;">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
                    <div>
                        <div style="font-size:11px;font-weight:800;color:#1E2028;">自定义字体 &amp; 全局字号大小 · TYPOGRAPHY</div>
                        <div style="font-size:7.8px;color:#7E8494;">解决字体偏小问题 · 支持一键放大字号与导入自定义字体</div>
                    </div>
                    <span class="ks-flt" id="${prefix}-font-reset">恢复116%舒适字号</span>
                </div>

                <!-- 1. 字体大小自由调节（数字输入 + 步进按钮 + 快捷档位） -->
                <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 0;border-top:1px solid #F0F2F7;border-bottom:1px solid #F0F2F7;margin-bottom:8px;">
                    <span style="font-size:9.5px;font-weight:700;color:#2C303C;">全局字体大小比例 (80% ~ 180%)</span>
                    <div style="display:inline-flex;align-items:center;gap:4px;">
                        <span class="ks-flt" id="${prefix}-fs-minus" style="padding:2px 8px!important;font-weight:900!important;">-</span>
                        <input type="number" id="${prefix}-fs-inp" class="ks-num-inp" min="80" max="180" step="2" value="${sc}" style="width:52px!important;" />
                        <span style="font-size:9px;font-weight:700;color:#525868;">%</span>
                        <span class="ks-flt" id="${prefix}-fs-plus" style="padding:2px 8px!important;font-weight:900!important;">+</span>
                        <span class="ks-flt on" id="${prefix}-fs-apply" style="padding:3px 9px!important;">应用</span>
                    </div>
                </div>

                <div style="display:flex;gap:5px;flex-wrap:wrap;justify-content:space-between;margin-bottom:10px;">
                    <span class="ks-flt ${sc === 100 ? "on" : ""}" data-fscale="100">100% 原始小字</span>
                    <span class="ks-flt ${sc === 116 ? "on" : ""}" data-fscale="116">116% 舒适推荐</span>
                    <span class="ks-flt ${sc === 128 ? "on" : ""}" data-fscale="128">128% 清晰中字</span>
                    <span class="ks-flt ${sc === 140 ? "on" : ""}" data-fscale="140">140% 护眼大字</span>
                </div>

                <!-- 2. 5款预设字体切换 -->
                <div style="font-size:8.5px;font-weight:700;color:#525868;margin-bottom:6px;">选择预设清冷字体：</div>
                <div style="display:flex;gap:5px;flex-wrap:wrap;margin-bottom:10px;">
                    ${presetsHtml}
                </div>

                <!-- 3. 自定义字体 URL 或本地字体文件上传 -->
                <div style="display:flex;gap:5px;align-items:center;">
                    <input type="text" id="${prefix}-custom-url" value="${p.customFontUrl?.startsWith("data:") ? "[已加载本地字体文件]" : (p.customFontUrl || "").replace(/"/g, "&quot;")}" placeholder="粘贴字体直链 (.ttf / .woff2) 或选本地字体..." style="flex:1;height:28px;background:#F8F9FC;border:1px solid #E4E8F0;border-radius:7px;padding:0 8px;font-size:9px;color:#1E2028;outline:none;" />
                    <label class="ks-pill" style="height:28px!important;cursor:pointer;flex-shrink:0;">
                        <span>本地字体</span>
                        <input type="file" id="${prefix}-custom-file" accept=".ttf,.otf,.woff,.woff2" style="display:none;" />
                    </label>
                    <span class="ks-flt" id="${prefix}-custom-clear" style="height:26px!important;display:inline-flex;align-items:center;">清除</span>
                </div>
            </div>
        `;
    }

    function bindFontCardEvents(container, prefix, onRefresh) {
        if (!container) return;

        const updateScale = (val) => {
            const p = loadFontPrefs();
            p.fontScale = Math.max(80, Math.min(180, Math.round(Number(val) || 116)));
            saveFontPrefs(p);
            applyTypographyNow();
            onRefresh();
        };

        const inp = topDoc.getElementById(`${prefix}-fs-inp`);
        topDoc.getElementById(`${prefix}-fs-apply`)?.addEventListener("click", () => updateScale(inp.value));
        inp?.addEventListener("keydown", (e) => { if (e.key === "Enter") { e.preventDefault(); updateScale(inp.value); } });
        topDoc.getElementById(`${prefix}-fs-minus`)?.addEventListener("click", () => updateScale((Number(inp.value) || 116) - 4));
        topDoc.getElementById(`${prefix}-fs-plus`)?.addEventListener("click", () => updateScale((Number(inp.value) || 116) + 4));

        container.querySelectorAll("[data-fscale]").forEach((b) => {
            b.onclick = () => updateScale(b.getAttribute("data-fscale"));
        });

        container.querySelectorAll("[data-fpreset]").forEach((b) => {
            b.onclick = () => {
                const p = loadFontPrefs();
                p.presetId = b.getAttribute("data-fpreset");
                p.customFontUrl = "";
                saveFontPrefs(p);
                applyTypographyNow();
                onRefresh();
            };
        });

        topDoc.getElementById(`${prefix}-custom-url`)?.addEventListener("change", (e) => {
            const val = e.target.value.trim();
            if (val === "[已加载本地字体文件]") return;
            const p = loadFontPrefs();
            p.customFontUrl = val;
            saveFontPrefs(p);
            applyTypographyNow();
            onRefresh();
        });

        topDoc.getElementById(`${prefix}-custom-file`)?.addEventListener("change", (e) => {
            const f = e.target.files?.[0];
            if (!f) return;
            const r = new FileReader();
            r.onload = (ev) => {
                const p = loadFontPrefs();
                p.customFontUrl = String(ev.target?.result || "");
                saveFontPrefs(p);
                applyTypographyNow();
                onRefresh();
            };
            r.readAsDataURL(f);
        });

        topDoc.getElementById(`${prefix}-custom-clear`)?.addEventListener("click", () => {
            const p = loadFontPrefs();
            p.customFontUrl = "";
            saveFontPrefs(p);
            applyTypographyNow();
            onRefresh();
        });

        topDoc.getElementById(`${prefix}-font-reset`)?.addEventListener("click", () => {
            saveFontPrefs({ presetId: "system", customFontUrl: "", customFontName: "", fontScale: 116 });
            applyTypographyNow();
            onRefresh();
        });
    }

    function mountTypographyEverywhere() {
        const modal = topDoc.getElementById("seoul-mini-theater-modal");
        if (!modal) {
            setTimeout(mountTypographyEverywhere, 250);
            return;
        }

        // 1. 立即执行一次默认 116% 舒适字号放大与字体应用
        applyTypographyNow();

        // 2. 挂载到【API设置】页面中
        const apiPage = topDoc.getElementById("smt-page-api");
        if (apiPage && !topDoc.getElementById("api-font-settings-holder")) {
            const holder = topDoc.createElement("div");
            holder.id = "api-font-settings-holder";
            holder.style.marginTop = "10px";
            apiPage.appendChild(holder);
            const renderApiFontBox = () => {
                holder.innerHTML = createFontSettingCardHtml("apifont");
                bindFontCardEvents(holder, "apifont", renderApiFontBox);
                applyTypographyNow();
            };
            renderApiFontBox();
        }

        // 3. 监听整个弹窗 DOM 变化：
        //    a) 当打开【结识海 -> 中枢设置】时，自动在最顶部插入字体与字号调节卡；
        //    b) 当任何新卡片/列表动态渲染出来时，自动对新增文字执行字号等比放大！
        let isApplying = false;
        const obs = new MutationObserver(() => {
            if (isApplying) return;
            isApplying = true;

            const setContainer = topDoc.getElementById("ks-pro-set-container");
            if (setContainer && !topDoc.getElementById("ksea-font-settings-holder")) {
                const holder = topDoc.createElement("div");
                holder.id = "ksea-font-settings-holder";
                setContainer.insertBefore(holder, setContainer.firstChild);
                const renderSeaFontBox = () => {
                    holder.innerHTML = createFontSettingCardHtml("seafont");
                    bindFontCardEvents(holder, "seafont", renderSeaFontBox);
                    applyTypographyNow();
                };
                renderSeaFontBox();
            }

            applyTypographyNow();
            setTimeout(() => { isApplying = false; }, 40);
        });

        obs.observe(modal, { childList: true, subtree: true });
    }

    mountTypographyEverywhere();
})();
// ==========================================================================
// 🤍 【Sumoul App 第4应用韩国原生软件版：交换日记 · 교환일기 (右上角 ⋯ 三点弹出菜单 + 多张附图九宫格画廊 + 韩国Sumone/Blog级极简排版)】
// 用法：直接替换 index.js 最末尾刚才那段 mountMinimalWhiteF9Diary 补丁代码！
// ==========================================================================
(function () {
    const topWin = window.parent || window;
    const topDoc = topWin.document;

    const QA_BANK = [
        "第一次意识到自己对对方栽了，是在哪个具体瞬间？",
        "如果今晚世界停电，最想和对方躲在哪里做什么？",
        "对方做过哪件小事，让你偷偷在心里记了很久？",
        "吃醋但不想明说的时候，你通常会有什么表现？",
        "最喜欢对方身上的哪个部位或哪种气味？",
        "如果可以重来某一天，你最想回到和TA相处的哪一幕？",
        "夜深人静看着熟睡的对方时，脑海里最先闪过什么念头？"
    ];

    function getCtx() {
        let userName = "ME", charName = "PARTNER", scope = "PARTNER", charDesc = "", recentChat = "";
        let userAvatar = "https://i.postimg.cc/rydS6NvG/IMG-3866.jpg", charAvatar = "https://i.postimg.cc/QC3CQ218/IMG-4147.jpg";
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
                } else if (st.name2) {
                    charName = st.name2; scope = st.name2;
                }
                if (Array.isArray(st.chat) && st.chat.length) {
                    recentChat = st.chat.slice(-10).map((m) => `${m.is_user ? userName : charName}: ${m.mes}`).join("\n");
                }
            }
        } catch (e) {}
        const safeScope = String(scope).replace(/[^a-zA-Z0-9_\u4e00-\u9fa5\uac00-\ud7af-]/g, "_");
        try {
            const wCfg = JSON.parse(localStorage.getItem(`sumoul_v16_wxcfg__${safeScope}`) || "{}");
            if (wCfg.myNick) userName = wCfg.myNick;
            if (wCfg.remark) charName = wCfg.remark;
            if (wCfg.myAva) userAvatar = wCfg.myAva;
            if (wCfg.charAva) charAvatar = wCfg.charAva;
        } catch (e) {}
        return { userName, charName, safeScope, userAvatar, charAvatar, charDesc, recentChat };
    }

    function getDiaryKey() {
        return `sumoul_v16_exdiary_pro__${getCtx().safeScope}`;
    }

    function createDefaultDiary(charName, userName) {
        return {
            activeTab: "all",
            filterRole: "all",
            cover: {
                bookTitle: `${userName} × ${charName}`,
                rule1: "01. 翻开日记时，卸下白昼里所有的防备与伪装。",
                rule2: "02. 写下的每一页，对方都必须在下方留下回音。",
                rule3: "03. 允许写下所有平时没说出口的在意与偏执。"
            },
            entries: [
                {
                    id: 1001,
                    role: "char",
                    author: charName,
                    date: "2026.12.04",
                    starred: true,
                    images: [],
                    title: "大衣口袋里的余温",
                    content: `今天把 ${userName} 冻得微凉的指尖揣进我口袋里的时候，其实心跳快得有些失控。面上装作若无其事地往前走，手心里却攥紧了舍不得松开。送你回去后，口袋里好像还留着你的温度。`,
                    reply: `原来你当时表面那么淡定都是装出来的，下次手冷还找你。`,
                    replyBy: userName
                },
                {
                    id: 1002,
                    role: "me",
                    author: userName,
                    date: "2026.11.29",
                    starred: true,
                    images: [],
                    title: "凌晨一秒接通的声音",
                    content: `半夜醒来觉得房间太安静，试探着给 ${charName} 发了一句“睡了吗”，没想到下一秒电话就直接拨过来了。听着那边带着点困意却无比耐心的声音，突然觉得被稳稳接住了。`,
                    reply: `手机永远为你调成特别提醒放在枕边。以后只要醒了，随时叫我。`,
                    replyBy: charName
                },
                {
                    id: 1003,
                    role: "char",
                    author: charName,
                    date: "2026.11.21",
                    starred: false,
                    images: [],
                    title: "不想分给别人的目光",
                    content: `今天看到 ${userName} 对着别人笑得那么毫无防备，胸口像堵了一团潮湿的雾。我知道不该管得太宽，可只要你的注意力从我身上移开几秒，我就开始烦躁。`,
                    reply: `别人只是客套，只有对你才是真心的。`,
                    replyBy: userName
                }
            ],
            qaList: [
                {
                    id: 2001,
                    question: "第一次意识到自己对对方栽了，是在哪个具体瞬间？",
                    myAns: `大概是在人群里第一眼就本能地寻找 ${charName} 身影的时候。`,
                    charAns: `看到 ${userName} 看着我、让我瞬间连原则都想推翻的那一秒。`,
                    date: "12.01"
                }
            ],
            stickies: [
                { id: 3001, author: charName, text: "天冷了，出门不准忘戴围巾，不然直接去抓你。" },
                { id: 3002, author: userName, text: "答应我这周末不准熬夜，要一起看场电影。" }
            ]
        };
    }

    function loadDiary() {
        const c = getCtx(), k = getDiaryKey();
        try {
            const raw = localStorage.getItem(k);
            if (!raw) {
                const init = createDefaultDiary(c.charName, c.userName);
                localStorage.setItem(k, JSON.stringify(init));
                return init;
            }
            const parsed = Object.assign(createDefaultDiary(c.charName, c.userName), JSON.parse(raw));
            // 兼容旧版单张 imgUrl 自动转为多图数组 images
            (parsed.entries || []).forEach((en) => {
                if (!Array.isArray(en.images)) {
                    en.images = en.imgUrl ? [en.imgUrl] : [];
                }
            });
            return parsed;
        } catch (e) {
            return createDefaultDiary(c.charName, c.userName);
        }
    }

    function saveDiary(d) {
        try { localStorage.setItem(getDiaryKey(), JSON.stringify(d)); }
        catch (e) { alert("图片数量或体积过大，建议删减一两张配图。"); }
    }

    function compressPhoto(file, maxDim = 560) {
        return new Promise((res) => {
            const r = new FileReader();
            r.onload = (ev) => {
                const img = new Image();
                img.onload = () => {
                    const c = topDoc.createElement("canvas");
                    let w = img.width, h = img.height;
                    if (w > h) { if (w > maxDim) { h = Math.round(h * maxDim / w); w = maxDim; } }
                    else { if (h > maxDim) { w = Math.round(w * maxDim / h); h = maxDim; } }
                    c.width = w; c.height = h;
                    c.getContext("2d").drawImage(img, 0, 0, w, h);
                    res(c.toDataURL("image/jpeg", 0.78));
                };
                img.src = String(ev.target?.result || "");
            };
            r.readAsDataURL(file);
        });
    }

    async function askDiaryAI(sys, usr) {
        const u = topDoc.getElementById("smt-api-url")?.value?.trim().replace(/\/+$/, "");
        const k = topDoc.getElementById("smt-api-key")?.value?.trim();
        const m = topDoc.getElementById("smt-api-model")?.value?.trim() || "gpt-4o-mini";
        if (!u || !k) {
            topDoc.querySelector('.smt-tab-item[data-page="api"]')?.click();
            throw new Error("请先在【API设置】填写独立 API 地址与 Key");
        }
        const endpoint = u.endsWith("/chat/completions") ? u : (u.endsWith("/v1") ? `${u}/chat/completions` : `${u}/v1/chat/completions`);
        const r = await fetch(endpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json", "Authorization": `Bearer ${k}` },
            body: JSON.stringify({ model: m, temperature: 0.82, messages: [{ role: "system", content: sys }, { role: "user", content: usr }] })
        });
        if (!r.ok) throw new Error(`API HTTP ${r.status}`);
        const d = await r.json();
        return d?.choices?.[0]?.message?.content?.trim() || "";
    }

    // 绝对正圆不变形头像组件
    function renderCircleAva(url, size = 28, extraStyle = "") {
        const safeUrl = String(url || "").replace(/'/g, "\\'");
        return `<div style="width:${size}px!important;height:${size}px!important;min-width:${size}px!important;max-width:${size}px!important;min-height:${size}px!important;max-height:${size}px!important;aspect-ratio:1/1!important;border-radius:50%!important;background-image:url('${safeUrl}')!important;background-size:cover!important;background-position:center!important;background-repeat:no-repeat!important;background-color:#F9F9F9!important;border:1px solid #EDEDED!important;flex:0 0 ${size}px!important;box-sizing:border-box!important;${extraStyle}"></div>`;
    }

    // 渲染韩国 Ins / Naver Blog 风格的多图网格画廊（1张宽幅、2/4张双列、3/5+张九宫格正方裁剪不变形）
    function renderMultiPhotoGrid(images = []) {
        const imgs = Array.isArray(images) ? images.filter(Boolean) : [];
        if (imgs.length === 0) return "";
        if (imgs.length === 1) {
            const u = String(imgs[0]).replace(/'/g, "\\'");
            return `<div style="width:100%;height:175px;border-radius:12px;background-image:url('${u}');background-size:cover;background-position:center;border:1px solid #F0F0F0;margin:8px 0 10px 0;"></div>`;
        }
        const cols = (imgs.length === 2 || imgs.length === 4) ? 2 : 3;
        const cells = imgs.map((u) => {
            const safe = String(u).replace(/'/g, "\\'");
            return `<div style="width:100%;aspect-ratio:1/1!important;border-radius:9px;background-image:url('${safe}');background-size:cover;background-position:center;background-color:#F9F9F9;border:1px solid #F0F0F0;"></div>`;
        }).join("");
        return `<div style="display:grid;grid-template-columns:repeat(${cols}, 1fr);gap:5px;margin:8px 0 10px 0;">${cells}</div>`;
    }

    function mountKoreanNativeDiaryApp() {
        const modal = topDoc.getElementById("seoul-mini-theater-modal");
        const homePage = topDoc.getElementById("smt-page-home");
        if (!modal || !homePage) {
            setTimeout(mountKoreanNativeDiaryApp, 220);
            return;
        }

        topDoc.getElementById("smt-exdiary-pro-overlay")?.remove();
        topDoc.getElementById("sumoul-exdiary-pro-css")?.remove();

        const st = topDoc.createElement("style");
        st.id = "sumoul-exdiary-pro-css";
        st.innerHTML = `
            @keyframes krMenuPop {
                from { opacity: 0; transform: scale(0.92) translateY(-4px); }
                to   { opacity: 1; transform: scale(1) translateY(0); }
            }

            /* 严格 #FFFFFF 纯白与 #F9F9F9 浅灰，韩国本土情侣软件 (Sumone / Naver) 极简质感 */
            #seoul-mini-theater-modal #smt-exdiary-pro-overlay {
                position: absolute !important; inset: 0 !important; z-index: 2147483645 !important;
                background: #F9F9F9 !important;
                display: none; flex-direction: column !important; overflow: hidden !important; user-select: none !important;
                font-family: -apple-system, BlinkMacSystemFont, "Apple SD Gothic Neo", "SF Pro Text", "PingFang SC", sans-serif !important;
                color: #262626 !important;
            }
            #seoul-mini-theater-modal #smt-exdiary-pro-overlay.open { display: flex !important; }

            #seoul-mini-theater-modal .kr-pill {
                display: inline-flex !important; align-items: center !important; justify-content: center !important;
                height: 28px !important; padding: 0 12px !important; border-radius: 999px !important;
                background: #F9F9F9 !important; border: 1px solid #EAEAEA !important;
                font-size: 11px !important; font-weight: 500 !important; color: #444444 !important;
                cursor: pointer !important; white-space: nowrap !important; transition: all 0.15s ease !important;
            }
            #seoul-mini-theater-modal .kr-pill.solid {
                background: #FFFFFF !important; border-color: #D6D6D6 !important;
                color: #1A1A1A !important; font-weight: 600 !important;
            }

            /* 韩国软件标志性底边微距 Tab 栏 */
            #seoul-mini-theater-modal .kr-tabs {
                display: grid !important; grid-template-columns: repeat(4, 1fr) !important;
                background: #FFFFFF !important; border-bottom: 1px solid #F0F0F0 !important;
                padding: 0 10px !important; flex-shrink: 0 !important;
            }
            #seoul-mini-theater-modal .kr-tab {
                padding: 9px 4px 8px 4px !important; text-align: center !important;
                position: relative !important; cursor: pointer !important; color: #9E9E9E !important;
            }
            #seoul-mini-theater-modal .kr-tab-zh { font-size: 11.5px !important; font-weight: 500 !important; display: block !important; }
            #seoul-mini-theater-modal .kr-tab-en { font-size: 8px !important; font-weight: 400 !important; letter-spacing: 0.6px !important; opacity: 0.75 !important; display: block !important; margin-top: 1px !important; }
            #seoul-mini-theater-modal .kr-tab.active { color: #1A1A1A !important; }
            #seoul-mini-theater-modal .kr-tab.active .kr-tab-zh { font-weight: 600 !important; }
            #seoul-mini-theater-modal .kr-tab.active::after {
                content: "" !important; position: absolute !important; bottom: 0 !important; left: 26% !important; right: 26% !important;
                height: 1.8px !important; background: #222222 !important; border-radius: 2px !important;
            }

            /* 韩国极简白卡 (#FFFFFF 悬浮于 #F9F9F9 之上) */
            #seoul-mini-theater-modal .kr-card {
                background: #FFFFFF !important; border: 1px solid #EFEFEF !important;
                border-radius: 16px !important; padding: 16px 16px 14px 16px !important;
                margin-bottom: 10px !important; position: relative !important; box-sizing: border-box !important;
            }

            /* ⋯ 右上角三个点按钮 & 韩国浮动弹出菜单 */
            #seoul-mini-theater-modal .kr-dots-btn {
                width: 28px !important; height: 26px !important; border-radius: 8px !important;
                display: inline-flex !important; align-items: center !important; justify-content: center !important;
                cursor: pointer !important; color: #999999 !important; font-size: 15px !important;
                letter-spacing: 1px !important; transition: background 0.15s ease !important;
            }
            #seoul-mini-theater-modal .kr-dots-btn:hover,
            #seoul-mini-theater-modal .kr-dots-btn.active {
                background: #F9F9F9 !important; color: #222222 !important;
            }
            #seoul-mini-theater-modal .kr-pop-menu {
                position: absolute !important; top: 42px !important; right: 14px !important; z-index: 60 !important;
                background: #FFFFFF !important; border: 1px solid #EAEAEA !important;
                border-radius: 12px !important; padding: 4px !important; min-width: 112px !important;
                box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08) !important;
                display: none; flex-direction: column !important;
                animation: krMenuPop 0.16s ease forwards !important;
            }
            #seoul-mini-theater-modal .kr-pop-menu.show { display: flex !important; }
            #seoul-mini-theater-modal .kr-pop-item {
                padding: 7px 11px !important; border-radius: 8px !important;
                font-size: 11.5px !important; font-weight: 500 !important; color: #333333 !important;
                display: flex !important; align-items: center !important; justify-content: space-between !important;
                cursor: pointer !important; white-space: nowrap !important;
            }
            #seoul-mini-theater-modal .kr-pop-item:hover,
            #seoul-mini-theater-modal .kr-pop-item:active {
                background: #F9F9F9 !important;
            }
            #seoul-mini-theater-modal .kr-pop-item.danger { color: #B85C5C !important; }

            /* 韩国软件经典 └ 树状缩进回信盒 (#F9F9F9) */
            #seoul-mini-theater-modal .kr-reply-wrap {
                margin-top: 12px !important; padding-top: 11px !important;
                border-top: 1px solid #F5F5F5 !important;
                display: flex !important; align-items: flex-start !important; gap: 7px !important;
            }
            #seoul-mini-theater-modal .kr-reply-branch {
                font-size: 11px !important; color: #CCCCCC !important; font-family: monospace !important;
                margin-top: 6px !important; flex-shrink: 0 !important; user-select: none !important;
            }
            #seoul-mini-theater-modal .kr-reply-box {
                flex: 1 !important; min-width: 0 !important;
                background: #F9F9F9 !important; border: 1px solid #F0F0F0 !important;
                border-radius: 12px !important; padding: 10px 12px !important; cursor: pointer !important;
            }

            /* 筛选胶囊 */
            #seoul-mini-theater-modal .kr-flt {
                padding: 4px 12px !important; border-radius: 99px !important;
                font-size: 10.5px !important; font-weight: 500 !important;
                background: #FFFFFF !important; border: 1px solid #EAEAEA !important; color: #888888 !important;
                cursor: pointer !important;
            }
            #seoul-mini-theater-modal .kr-flt.on {
                background: #FFFFFF !important; border-color: #333333 !important;
                color: #1A1A1A !important; font-weight: 600 !important;
            }

            /* 输入框 (#F9F9F9) */
            #seoul-mini-theater-modal .kr-inp {
                background: #F9F9F9 !important; border: 1px solid #EAEAEA !important;
                border-radius: 9px !important; padding: 0 10px !important;
                font-size: 12px !important; font-weight: 400 !important; color: #262626 !important;
                outline: none !important; box-sizing: border-box !important;
            }
            #seoul-mini-theater-modal .kr-area {
                background: #F9F9F9 !important; border: 1px solid #EAEAEA !important;
                border-radius: 9px !important; padding: 8px 10px !important;
                font-size: 12px !important; font-weight: 400 !important; color: #262626 !important;
                line-height: 1.65 !important; outline: none !important; resize: none !important; box-sizing: border-box !important;
            }
        `;
        topDoc.head.appendChild(st);

        const overlay = topDoc.createElement("div");
        overlay.id = "smt-exdiary-pro-overlay";
        overlay.innerHTML = `
            <!-- 1. 韩国原生极简顶栏 (#FFFFFF) -->
            <div style="display:flex;justify-content:space-between;align-items:center;padding:max(12px,env(safe-area-inset-top,12px)) 15px 9px 15px;background:#FFFFFF;border-bottom:1px solid #F2F2F2;flex-shrink:0;">
                <span class="kr-pill" id="ed-close-btn">‹ 返回</span>
                <div style="display:flex;align-items:center;gap:8px;">
                    <div id="ed-top-avas" style="display:flex;align-items:center;"></div>
                    <div style="text-align:left;">
                        <div style="font-size:12px!important;font-weight:600;color:#1A1A1A;letter-spacing:0.5px;">교환일기 · 交换日记</div>
                        <div style="font-size:9.5px!important;font-weight:400;color:#999999;" id="ed-top-sub">OUR RECORD</div>
                    </div>
                </div>
                <span class="kr-pill solid" id="ed-top-write-btn">+ 记录</span>
            </div>

            <!-- 2. 顶部 4 栏韩系双语微距导航 (#FFFFFF) -->
            <div class="kr-tabs" id="ed-tab-bar">
                <div class="kr-tab active" data-edtab="all"><span class="kr-tab-zh">全部记录</span><span class="kr-tab-en">ARCHIVE</span></div>
                <div class="kr-tab" data-edtab="qa"><span class="kr-tab-zh">每日一问</span><span class="kr-tab-en">QUESTION</span></div>
                <div class="kr-tab" data-edtab="star"><span class="kr-tab-zh">便签收藏</span><span class="kr-tab-en">SAVED</span></div>
                <div class="kr-tab" data-edtab="cover"><span class="kr-tab-zh">手账设定</span><span class="kr-tab-en">COVER</span></div>
            </div>

            <!-- 3. 主滚动区 (#F9F9F9 浅白灰底) -->
            <div id="ed-main-body" style="flex:1;min-height:0;overflow-y:auto;padding:12px 14px 20px 14px;background:#F9F9F9;"></div>

            <!-- 4. 弹窗：支持【多张照片选择与预览】的韩系编辑器 -->
            <div id="ed-editor-modal" style="display:none;position:absolute;inset:0;z-index:80;background:rgba(255,255,255,0.85);align-items:center;justify-content:center;padding:16px;">
                <div class="kr-card" style="width:100%;max-width:340px;margin:0!important;padding:16px!important;box-shadow:0 12px 32px rgba(0,0,0,0.08)!important;border:1px solid #E5E5E5!important;">
                    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">
                        <span style="font-size:12.5px!important;font-weight:600;color:#1A1A1A;" id="ed-modal-heading">写日记</span>
                        <span id="ed-modal-close" style="font-size:11.5px!important;color:#999999;cursor:pointer;padding:2px 4px;">关闭</span>
                    </div>

                    <div style="display:flex;gap:6px;margin-bottom:8px;">
                        <input type="text" id="ed-inp-title" class="kr-inp" placeholder="标题..." style="flex:1;height:32px;" />
                        <input type="text" id="ed-inp-date" class="kr-inp" placeholder="日期" style="width:82px;height:32px;text-align:center;" />
                    </div>

                    <textarea id="ed-inp-content" class="kr-area" placeholder="写下今天的故事或心事..." style="width:100%;height:88px;margin-bottom:8px;"></textarea>

                    <!-- 多张附图选择与缩略图预览托盘 -->
                    <div style="margin-bottom:10px;">
                        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
                            <span style="font-size:10.5px!important;color:#888888;">照片附件（支持一次选多张或多次添加）：</span>
                            <label class="kr-pill" style="height:24px!important;padding:0 10px!important;font-size:10.5px!important;cursor:pointer;">
                                <span id="ed-inp-img-lbl">+ 添加多张图</span>
                                <input type="file" id="ed-inp-img" accept="image/*" multiple style="display:none;" />
                            </label>
                        </div>
                        <div id="ed-photo-tray" style="display:flex;gap:6px;overflow-x:auto;padding-bottom:2px;"></div>
                    </div>

                    <div style="margin-bottom:12px;">
                        <div style="font-size:10.5px!important;color:#888888;margin-bottom:4px;">对方回信（留空则保存后由 AI 自动写回信）：</div>
                        <textarea id="ed-inp-reply" class="kr-area" placeholder="可手动修改回信，或留空交由TA回复..." style="width:100%;height:46px;"></textarea>
                    </div>

                    <div style="display:flex;justify-content:flex-end;gap:6px;">
                        <span class="kr-pill" id="ed-modal-cancel">取消</span>
                        <span class="kr-pill solid" id="ed-modal-save">保存记录</span>
                    </div>
                </div>
            </div>

            <!-- 5. 底部韩系操作栏 (#FFFFFF) -->
            <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;padding:9px 14px max(14px,env(safe-area-inset-bottom,14px)) 14px;background:#FFFFFF;border-top:1px solid #F0F0F0;flex-shrink:0;">
                <span class="kr-pill" id="ed-bot-write" style="flex:1;">我写一篇</span>
                <span class="kr-pill" id="ed-bot-ai-write" style="flex:1;">让TA写一篇</span>
                <span class="kr-pill solid" id="ed-bot-absorb" style="flex:1.2;">汲取聊天写日记</span>
            </div>
        `;
        modal.appendChild(overlay);

        // 防止外部放大补丁二次撑大字号
        overlay.querySelectorAll("*").forEach((el) => el.setAttribute("data-orig-fs", "skip"));

        let editingId = null;
        let tempImages = []; // 多图数组

        function renderPhotoTray() {
            const tray = topDoc.getElementById("ed-photo-tray");
            const lbl = topDoc.getElementById("ed-inp-img-lbl");
            if (!tray) return;
            if (lbl) lbl.textContent = tempImages.length > 0 ? `+ 继续加图 (${tempImages.length})` : "+ 添加多张图";

            if (tempImages.length === 0) {
                tray.innerHTML = "";
                return;
            }
            tray.innerHTML = tempImages.map((u, idx) => {
                const safe = String(u).replace(/'/g, "\\'");
                return `
                    <div style="position:relative;width:52px;height:52px;flex:0 0 52px;border-radius:8px;background-image:url('${safe}');background-size:cover;background-position:center;border:1px solid #E5E5E5;">
                        <span data-rmimg="${idx}" style="position:absolute;top:-4px;right:-4px;width:16px;height:16px;border-radius:50%;background:#222222;color:#FFFFFF;font-size:10px!important;line-height:16px;text-align:center;cursor:pointer;">×</span>
                    </div>
                `;
            }).join("");

            tray.querySelectorAll("[data-rmimg]").forEach((btn) => {
                btn.onclick = () => {
                    const idx = Number(btn.getAttribute("data-rmimg"));
                    tempImages.splice(idx, 1);
                    renderPhotoTray();
                };
            });
        }

        function openEditorModal(entry = null) {
            const c = getCtx();
            const modalEl = topDoc.getElementById("ed-editor-modal");
            const now = new Date();
            const defDate = `${now.getFullYear()}.${String(now.getMonth() + 1).padStart(2, "0")}.${String(now.getDate()).padStart(2, "0")}`;

            if (entry) {
                editingId = entry.id;
                tempImages = Array.isArray(entry.images) ? [...entry.images] : (entry.imgUrl ? [entry.imgUrl] : []);
                topDoc.getElementById("ed-modal-heading").textContent = "编辑日记";
                topDoc.getElementById("ed-inp-title").value = entry.title || "";
                topDoc.getElementById("ed-inp-date").value = entry.date || defDate;
                topDoc.getElementById("ed-inp-content").value = entry.content || "";
                topDoc.getElementById("ed-inp-reply").value = (entry.reply || "").replace(/^[“"]|[”"]$/g, "").trim();
            } else {
                editingId = null;
                tempImages = [];
                topDoc.getElementById("ed-modal-heading").textContent = `写日记 · ${c.userName}`;
                topDoc.getElementById("ed-inp-title").value = "";
                topDoc.getElementById("ed-inp-date").value = defDate;
                topDoc.getElementById("ed-inp-content").value = "";
                topDoc.getElementById("ed-inp-reply").value = "";
            }

            renderPhotoTray();
            modalEl.style.display = "flex";
        }

        function renderDiaryApp() {
            const c = getCtx();
            const d = loadDiary();
            topDoc.getElementById("ed-top-sub").textContent = `${c.userName} & ${c.charName} · ${d.entries.length}篇`;
            topDoc.getElementById("ed-top-avas").innerHTML = `
                ${renderCircleAva(c.userAvatar, 24)}
                ${renderCircleAva(c.charAvatar, 24, "margin-left:-7px;")}
            `;

            homePage.querySelectorAll(".ab-app-item").forEach((item) => {
                if (item.textContent.includes("交换日记") || item.textContent.includes("교환일기")) {
                    const b = item.querySelector(".ab-app-floating-badge");
                    if (b) b.textContent = `${d.entries.length}篇`;
                }
            });

            topDoc.querySelectorAll("#ed-tab-bar .kr-tab").forEach((el) => {
                el.classList.toggle("active", el.getAttribute("data-edtab") === d.activeTab);
            });

            const body = topDoc.getElementById("ed-main-body");

            // ── 内页 1：【全部记录 (all)】（韩国软件样式 + 右上角 ⋯ 三点弹出菜单 + 多图九宫格 + └ 缩进回信） ──
            if (d.activeTab === "all") {
                const flt = d.filterRole || "all";
                const list = (d.entries || []).filter((e) => flt === "all" || e.role === flt);

                const cardsHtml = list.map((en, idx) => {
                    const isChar = en.role === "char";
                    const writerAva = isChar ? c.charAvatar : c.userAvatar;
                    const writerName = isChar ? c.charName : c.userName;
                    const replierName = en.replyBy || (isChar ? c.userName : c.charName);
                    const replierAva = replierName === c.userName ? c.userAvatar : c.charAvatar;
                    const cleanReply = (en.reply || "等待对方写下回信…").replace(/^[“"]|[”"]$/g, "").trim();
                    const imgs = Array.isArray(en.images) ? en.images : (en.imgUrl ? [en.imgUrl] : []);

                    return `
                        <div class="kr-card">
                            <!-- 韩国软件式 Header：左正圆头像+姓名+编号日期 | 右上角 ⋯ 三个点按钮 -->
                            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">
                                <div style="display:flex;align-items:center;gap:9px;min-width:0;">
                                    ${renderCircleAva(writerAva, 30)}
                                    <div>
                                        <div style="display:flex;align-items:center;gap:5px;">
                                            <span style="font-size:12px!important;font-weight:600;color:#1A1A1A;">${writerName.replace(/</g, "&lt;")}</span>
                                            ${en.starred ? `<span style="font-size:9px!important;color:#666666;background:#F9F9F9;border:1px solid #EAEAEA;padding:0 5px;border-radius:4px;">★ 收藏</span>` : ""}
                                        </div>
                                        <div style="font-size:10px!important;font-weight:400;color:#A0A0A0;font-family:monospace;margin-top:1px;">
                                            #${String(d.entries.length - idx).padStart(2, "0")} · ${(en.date || "").replace(/</g, "&lt;")}
                                        </div>
                                    </div>
                                </div>

                                <!-- 右上角 ⋯ 三个点触发器 -->
                                <span class="kr-dots-btn" data-menubtn="${en.id}" title="更多操作">⋯</span>
                            </div>

                            <!-- ⋯ 点击后弹出的韩系浮动菜单 -->
                            <div class="kr-pop-menu" id="kr-menu-${en.id}">
                                <div class="kr-pop-item" data-starid="${en.id}">
                                    <span>${en.starred ? "取消收藏" : "收藏记录"}</span>
                                    <span style="font-size:10px!important;color:#999999;">★</span>
                                </div>
                                <div class="kr-pop-item" data-regenid="${en.id}">
                                    <span>重写回信</span>
                                    <span style="font-size:10px!important;color:#999999;">↻</span>
                                </div>
                                <div class="kr-pop-item" data-editid="${en.id}">
                                    <span>编辑修改</span>
                                    <span style="font-size:10px!important;color:#999999;">✎</span>
                                </div>
                                <div class="kr-pop-item danger" data-delid="${en.id}">
                                    <span>删除记录</span>
                                    <span style="font-size:10px!important;">×</span>
                                </div>
                            </div>

                            <!-- 标题 -->
                            <div style="font-size:13px!important;font-weight:600;color:#1A1A1A;margin-bottom:6px;line-height:1.45;">
                                ${(en.title || "无题").replace(/</g, "&lt;")}
                            </div>

                            <!-- 正文 -->
                            <div style="font-size:12px!important;font-weight:400;color:#363636;line-height:1.74;white-space:pre-wrap;">${(en.content || "").replace(/</g, "&lt;")}</div>

                            <!-- 多张照片韩系自适应网格画廊 -->
                            ${renderMultiPhotoGrid(imgs)}

                            <!-- 韩国软件标志性 └ 缩进回信栏 -->
                            <div class="kr-reply-wrap">
                                <span class="kr-reply-branch">└</span>
                                <div class="kr-reply-box" data-editid="${en.id}" title="点击可修改回信">
                                    <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px;">
                                        ${renderCircleAva(replierAva, 18)}
                                        <span style="font-size:10.5px!important;font-weight:600;color:#555555;">${replierName.replace(/</g, "&lt;")}</span>
                                        <span style="font-size:9.5px!important;color:#B0B0B0;margin-left:auto;">COMMENT</span>
                                    </div>
                                    <div style="font-size:11.8px!important;font-weight:400;color:#333333;line-height:1.62;">
                                        ${cleanReply.replace(/</g, "&lt;")}
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
                }).join("");

                body.innerHTML = `
                    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">
                        <div style="display:flex;gap:6px;">
                            <span class="kr-flt ${flt === "all" ? "on" : ""}" data-flt="all">全部 (${d.entries.length})</span>
                            <span class="kr-flt ${flt === "char" ? "on" : ""}" data-flt="char">${c.charName}</span>
                            <span class="kr-flt ${flt === "me" ? "on" : ""}" data-flt="me">我写的</span>
                        </div>
                    </div>
                    ${cardsHtml || `<div style="text-align:center;color:#999999;font-size:12px!important;padding:40px 0;">暂无记录</div>`}
                `;

                // 绑定右上角 ⋯ 三个点弹出菜单开关
                body.querySelectorAll("[data-menubtn]").forEach((btn) => {
                    btn.onclick = (e) => {
                        e.stopPropagation();
                        const id = btn.getAttribute("data-menubtn");
                        const menu = topDoc.getElementById(`kr-menu-${id}`);
                        const isOpen = menu?.classList.contains("show");
                        body.querySelectorAll(".kr-pop-menu").forEach((m) => m.classList.remove("show"));
                        body.querySelectorAll(".kr-dots-btn").forEach((b) => b.classList.remove("active"));
                        if (!isOpen && menu) {
                            menu.classList.add("show");
                            btn.classList.add("active");
                        }
                    };
                });

                body.querySelectorAll("[data-flt]").forEach((b) => {
                    b.onclick = () => {
                        const latest = loadDiary();
                        latest.filterRole = b.getAttribute("data-flt");
                        saveDiary(latest); renderDiaryApp();
                    };
                });

                body.querySelectorAll("[data-starid]").forEach((b) => {
                    b.onclick = (e) => {
                        e.stopPropagation();
                        const id = Number(b.getAttribute("data-starid"));
                        const latest = loadDiary();
                        const t = latest.entries.find((x) => Number(x.id) === id);
                        if (t) { t.starred = !t.starred; saveDiary(latest); renderDiaryApp(); }
                    };
                });

                body.querySelectorAll("[data-editid]").forEach((b) => {
                    b.onclick = (e) => {
                        e.stopPropagation();
                        const id = Number(b.getAttribute("data-editid"));
                        const latest = loadDiary();
                        const t = latest.entries.find((x) => Number(x.id) === id);
                        if (t) openEditorModal(t);
                    };
                });

                body.querySelectorAll("[data-delid]").forEach((b) => {
                    b.onclick = (e) => {
                        e.stopPropagation();
                        const id = Number(b.getAttribute("data-delid"));
                        const latest = loadDiary();
                        const t = latest.entries.find((x) => Number(x.id) === id);
                        if (!t) return;
                        if (!confirm(`确定删除《${t.title}》吗？`)) return;
                        latest.entries = latest.entries.filter((x) => Number(x.id) !== id);
                        saveDiary(latest); renderDiaryApp();
                    };
                });

                body.querySelectorAll("[data-regenid]").forEach((b) => {
                    b.onclick = async (e) => {
                        e.stopPropagation();
                        const id = Number(b.getAttribute("data-regenid"));
                        const latest = loadDiary();
                        const t = latest.entries.find((x) => Number(x.id) === id);
                        if (!t) return;
                        b.innerHTML = `<span>重写中...</span>`;
                        try {
                            const rep = await askDiaryAI(
                                `你是${c.charName}。人设：${c.charDesc.slice(0, 900)}`,
                                `交换日记里有一篇《${t.title}》（作者：${t.author}）：“${t.content}”。请以${c.charName}的身份写一句简短深情或占有的回复(40字内)：`
                            );
                            t.reply = rep.replace(/^[“"]|[”"]$/g, "").trim();
                            t.replyBy = c.charName;
                            saveDiary(latest); renderDiaryApp();
                        } catch (err) {
                            alert(err.message);
                            renderDiaryApp();
                        }
                    };
                });
            }

            // ── 内页 2：【每日一问 (qa)】（韩国 Sumone 风格对答卡） ──
            else if (d.activeTab === "qa") {
                const randQ = QA_BANK[Math.floor(Math.random() * QA_BANK.length)];
                const qaHtml = (d.qaList || []).map((q, idx) => `
                    <div class="kr-card">
                        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
                            <span style="font-size:10px!important;font-weight:600;color:#999999;font-family:monospace;">QUESTION #${String(d.qaList.length - idx).padStart(2, "0")} · ${q.date || ""}</span>
                            <span style="font-size:11px!important;color:#A0A0A0;cursor:pointer;" data-delqa="${q.id}">删除</span>
                        </div>
                        <div style="font-size:12.5px!important;font-weight:600;color:#1A1A1A;margin-bottom:10px;line-height:1.5;">
                            Q. ${q.question.replace(/</g, "&lt;")}
                        </div>
                        <div style="background:#F9F9F9;border:1px solid #F0F0F0;border-radius:11px;padding:9px 11px;margin-bottom:7px;">
                            <div style="display:flex;align-items:center;gap:6px;margin-bottom:3px;">
                                ${renderCircleAva(c.userAvatar, 18)}
                                <span style="font-size:10.5px!important;font-weight:600;color:#555555;">${c.userName}</span>
                            </div>
                            <div style="font-size:11.8px!important;color:#333333;line-height:1.6;">${(q.myAns || "").replace(/</g, "&lt;")}</div>
                        </div>
                        <div style="background:#F9F9F9;border:1px solid #F0F0F0;border-radius:11px;padding:9px 11px;">
                            <div style="display:flex;align-items:center;gap:6px;margin-bottom:3px;">
                                ${renderCircleAva(c.charAvatar, 18)}
                                <span style="font-size:10.5px!important;font-weight:600;color:#555555;">${c.charName}</span>
                            </div>
                            <div style="font-size:11.8px!important;color:#333333;line-height:1.6;">${(q.charAns || "").replace(/</g, "&lt;")}</div>
                        </div>
                    </div>
                `).join("");

                body.innerHTML = `
                    <div class="kr-card" style="margin-bottom:12px;">
                        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
                            <span style="font-size:12px!important;font-weight:600;color:#1A1A1A;">오늘의 질문 · 今日共答</span>
                            <span style="font-size:10.5px!important;color:#888888;cursor:pointer;" id="ed-qa-change">换一题 ↻</span>
                        </div>
                        <input type="text" id="ed-qa-q" class="kr-inp" value="${randQ.replace(/"/g, "&quot;")}" style="width:100%;height:32px;margin-bottom:8px;" />
                        <textarea id="ed-qa-my" class="kr-area" placeholder="写下你的回答..." style="width:100%;height:56px;margin-bottom:8px;"></textarea>
                        <div style="display:flex;justify-content:flex-end;">
                            <span class="kr-pill solid" id="ed-qa-submit">提交并看TA回答</span>
                        </div>
                    </div>
                    ${qaHtml}
                `;

                topDoc.getElementById("ed-qa-change").onclick = () => {
                    topDoc.getElementById("ed-qa-q").value = QA_BANK[Math.floor(Math.random() * QA_BANK.length)];
                };
                topDoc.getElementById("ed-qa-submit").onclick = async (e) => {
                    const qTxt = topDoc.getElementById("ed-qa-q").value.trim();
                    const myTxt = topDoc.getElementById("ed-qa-my").value.trim();
                    if (!qTxt || !myTxt) return alert("请先填写你的回答！");
                    const btn = e.currentTarget, orig = btn.textContent;
                    btn.textContent = "等待TA作答...";
                    try {
                        const ans = await askDiaryAI(
                            `你是${c.charName}。人设：${c.charDesc.slice(0, 900)}`,
                            `交换日记「每日共答」问题：“${qTxt}”，${c.userName}答：“${myTxt}”。请以${c.charName}第一人称写下回答(50字内)：`
                        );
                        const latest = loadDiary(), now = new Date();
                        latest.qaList = latest.qaList || [];
                        latest.qaList.unshift({
                            id: Date.now(), question: qTxt, myAns: myTxt,
                            charAns: ans.replace(/^[“"]|[”"]$/g, "").trim(),
                            date: `${now.getMonth() + 1}.${String(now.getDate()).padStart(2, "0")}`
                        });
                        saveDiary(latest); renderDiaryApp();
                    } catch (err) { alert(err.message); btn.textContent = orig; }
                };
                body.querySelectorAll("[data-delqa]").forEach((b) => {
                    b.onclick = () => {
                        const latest = loadDiary();
                        latest.qaList = (latest.qaList || []).filter((x) => Number(x.id) !== Number(b.getAttribute("data-delqa")));
                        saveDiary(latest); renderDiaryApp();
                    };
                });
            }

            // ── 内页 3：【便签收藏 (star)】 ──
            else if (d.activeTab === "star") {
                const starredList = (d.entries || []).filter((e) => e.starred);
                const stickyHtml = (d.stickies || []).map((stItem) => `
                    <div style="background:#F9F9F9;border:1px solid #EFEFEF;border-radius:12px;padding:11px 12px;display:flex;flex-direction:column;justify-content:space-between;">
                        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:5px;">
                            <span style="font-size:10.5px!important;font-weight:600;color:#555555;">${stItem.author.replace(/</g, "&lt;")}</span>
                            <span style="font-size:11px!important;color:#A0A0A0;cursor:pointer;" data-delst="${stItem.id}">×</span>
                        </div>
                        <div style="font-size:11.5px!important;color:#333333;line-height:1.58;">${stItem.text.replace(/</g, "&lt;")}</div>
                    </div>
                `).join("");

                const starCardsHtml = starredList.map((en) => `
                    <div class="kr-card">
                        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:5px;">
                            <span style="font-size:12.5px!important;font-weight:600;color:#1A1A1A;">${en.title.replace(/</g, "&lt;")}</span>
                            <span style="font-size:10px!important;color:#999999;">${en.author} · ${en.date || ""}</span>
                        </div>
                        <div style="font-size:11.8px!important;color:#444444;line-height:1.68;">${en.content.replace(/</g, "&lt;")}</div>
                    </div>
                `).join("");

                body.innerHTML = `
                    <div class="kr-card" style="margin-bottom:12px;">
                        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
                            <span style="font-size:12px!important;font-weight:600;color:#1A1A1A;">메모 · 随手便签</span>
                            <div style="display:flex;gap:6px;">
                                <span class="kr-flt" id="ed-st-my">+ 写便签</span>
                                <span class="kr-flt on" id="ed-st-ai">让TA写一张</span>
                            </div>
                        </div>
                        <div id="ed-st-drawer" style="display:none;margin-bottom:8px;">
                            <div style="display:flex;gap:6px;">
                                <input type="text" id="ed-st-inp" class="kr-inp" placeholder="写一句叮嘱或悄悄话..." style="flex:1;height:30px;" />
                                <span class="kr-pill solid" id="ed-st-save" style="height:30px!important;">贴上</span>
                            </div>
                        </div>
                        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">${stickyHtml}</div>
                    </div>

                    <div style="font-size:11px!important;font-weight:600;color:#888888;margin-bottom:8px;padding-left:2px;">
                        收藏的记录 (${starredList.length})
                    </div>
                    ${starCardsHtml || `<div style="text-align:center;color:#999999;font-size:11.5px!important;padding:24px;">在记录右上角点 ⋯ 选择「收藏记录」即可收纳至此</div>`}
                `;

                const dr = topDoc.getElementById("ed-st-drawer");
                topDoc.getElementById("ed-st-my").onclick = () => { dr.style.display = dr.style.display === "none" ? "block" : "none"; };
                topDoc.getElementById("ed-st-save").onclick = () => {
                    const txt = topDoc.getElementById("ed-st-inp").value.trim();
                    if (!txt) return;
                    const latest = loadDiary();
                    latest.stickies = latest.stickies || [];
                    latest.stickies.unshift({ id: Date.now(), author: c.userName, text: txt });
                    saveDiary(latest); renderDiaryApp();
                };
                topDoc.getElementById("ed-st-ai").onclick = async (e) => {
                    const btn = e.currentTarget, orig = btn.textContent;
                    btn.textContent = "书写中...";
                    try {
                        const txt = await askDiaryAI(`你是${c.charName}。人设：${c.charDesc.slice(0, 800)}`, `请在交换日记本上给${c.userName}留一张26字内的简短叮嘱或小便签：`);
                        const latest = loadDiary();
                        latest.stickies = latest.stickies || [];
                        latest.stickies.unshift({ id: Date.now(), author: c.charName, text: txt.replace(/^[“"]|[”"]$/g, "").trim() });
                        saveDiary(latest); renderDiaryApp();
                    } catch (err) { alert(err.message); btn.textContent = orig; }
                };
                body.querySelectorAll("[data-delst]").forEach((b) => {
                    b.onclick = () => {
                        const latest = loadDiary();
                        latest.stickies = (latest.stickies || []).filter((x) => Number(x.id) !== Number(b.getAttribute("data-delst")));
                        saveDiary(latest); renderDiaryApp();
                    };
                });
            }

            // ── 内页 4：【手账设定 (cover)】 ──
            else if (d.activeTab === "cover") {
                const cv = d.cover || {};
                const myCnt = (d.entries || []).filter((x) => x.role === "me").length;
                const chCnt = (d.entries || []).filter((x) => x.role === "char").length;

                body.innerHTML = `
                    <div class="kr-card" style="text-align:center;padding:20px 16px!important;">
                        <div style="display:flex;align-items:center;justify-content:center;gap:14px;margin-bottom:14px;">
                            ${renderCircleAva(c.userAvatar, 44)}
                            <span style="font-size:11px!important;color:#BBBBBB;font-family:monospace;">&amp;</span>
                            ${renderCircleAva(c.charAvatar, 44)}
                        </div>

                        <input type="text" id="ed-cv-title" class="kr-inp" value="${(cv.bookTitle || "").replace(/"/g, "&quot;")}" style="width:100%;height:32px;text-align:center;font-size:12.5px!important;font-weight:600!important;margin-bottom:12px;" />

                        <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin-bottom:14px;">
                            <div style="background:#F9F9F9;border:1px solid #EFEFEF;padding:9px 4px;border-radius:10px;">
                                <div style="font-size:10px!important;color:#888888;">TOTAL</div>
                                <div style="font-size:13px!important;font-weight:600;color:#1A1A1A;margin-top:2px;">${d.entries.length}</div>
                            </div>
                            <div style="background:#F9F9F9;border:1px solid #EFEFEF;padding:9px 4px;border-radius:10px;">
                                <div style="font-size:10px!important;color:#888888;">${c.userName}</div>
                                <div style="font-size:13px!important;font-weight:600;color:#1A1A1A;margin-top:2px;">${myCnt}</div>
                            </div>
                            <div style="background:#F9F9F9;border:1px solid #EFEFEF;padding:9px 4px;border-radius:10px;">
                                <div style="font-size:10px!important;color:#888888;">${c.charName}</div>
                                <div style="font-size:13px!important;font-weight:600;color:#1A1A1A;margin-top:2px;">${chCnt}</div>
                            </div>
                        </div>

                        <div style="text-align:left;display:flex;flex-direction:column;gap:6px;margin-bottom:14px;">
                            <div style="font-size:10.5px!important;font-weight:600;color:#666666;">手账约定 · RULES</div>
                            <input type="text" id="ed-cv-r1" class="kr-inp" value="${(cv.rule1 || "").replace(/"/g, "&quot;")}" style="width:100%;height:30px;font-size:11.5px!important;" />
                            <input type="text" id="ed-cv-r2" class="kr-inp" value="${(cv.rule2 || "").replace(/"/g, "&quot;")}" style="width:100%;height:30px;font-size:11.5px!important;" />
                            <input type="text" id="ed-cv-r3" class="kr-inp" value="${(cv.rule3 || "").replace(/"/g, "&quot;")}" style="width:100%;height:30px;font-size:11.5px!important;" />
                        </div>

                        <span class="kr-pill solid" id="ed-cv-save" style="width:100%!important;height:32px!important;box-sizing:border-box!important;">保存设定</span>
                    </div>
                `;

                topDoc.getElementById("ed-cv-save").onclick = () => {
                    const latest = loadDiary();
                    latest.cover = {
                        bookTitle: topDoc.getElementById("ed-cv-title").value.trim(),
                        rule1: topDoc.getElementById("ed-cv-r1").value.trim(),
                        rule2: topDoc.getElementById("ed-cv-r2").value.trim(),
                        rule3: topDoc.getElementById("ed-cv-r3").value.trim()
                    };
                    saveDiary(latest);
                    alert("已保存！");
                };
            }

            body.querySelectorAll("*").forEach((el) => el.setAttribute("data-orig-fs", "skip"));
        }

        // 点击页面任意空白处自动收起右上角 ⋯ 弹出菜单
        overlay.addEventListener("click", () => {
            overlay.querySelectorAll(".kr-pop-menu").forEach((m) => m.classList.remove("show"));
            overlay.querySelectorAll(".kr-dots-btn").forEach((b) => b.classList.remove("active"));
        });

        // ── 支持一次选多张图片（或分多次追加多张图片） ──
        topDoc.getElementById("ed-inp-img").onchange = async (e) => {
            const files = Array.from(e.target.files || []);
            if (!files.length) return;
            for (const f of files) {
                if (tempImages.length >= 9) break;
                const dUrl = await compressPhoto(f, 560);
                tempImages.push(dUrl);
            }
            renderPhotoTray();
            e.target.value = "";
        };

        topDoc.getElementById("ed-modal-close").onclick = () => { topDoc.getElementById("ed-editor-modal").style.display = "none"; };
        topDoc.getElementById("ed-modal-cancel").onclick = () => { topDoc.getElementById("ed-editor-modal").style.display = "none"; };

        topDoc.getElementById("ed-modal-save").onclick = async () => {
            const c = getCtx();
            const ti = topDoc.getElementById("ed-inp-title").value.trim() || "无题";
            const dt = topDoc.getElementById("ed-inp-date").value.trim() || "今日";
            const ct = topDoc.getElementById("ed-inp-content").value.trim();
            const rp = topDoc.getElementById("ed-inp-reply").value.trim();

            if (!ct) return alert("请填写日记内容！");

            const latest = loadDiary();
            if (editingId) {
                const target = latest.entries.find((x) => Number(x.id) === Number(editingId));
                if (target) {
                    target.title = ti;
                    target.date = dt;
                    target.content = ct;
                    target.images = [...tempImages];
                    target.imgUrl = tempImages[0] || "";
                    if (rp) target.reply = rp.replace(/^[“"]|[”"]$/g, "").trim();
                }
                saveDiary(latest);
                topDoc.getElementById("ed-editor-modal").style.display = "none";
                renderDiaryApp();
            } else {
                const newId = Date.now();
                latest.entries.unshift({
                    id: newId, role: "me", author: c.userName, date: dt,
                    starred: false, images: [...tempImages], imgUrl: tempImages[0] || "",
                    title: ti, content: ct,
                    reply: rp || `（${c.charName} 正在写回信...）`,
                    replyBy: c.charName
                });
                latest.activeTab = "all";
                saveDiary(latest);
                topDoc.getElementById("ed-editor-modal").style.display = "none";
                renderDiaryApp();

                if (!rp) {
                    try {
                        const aiReply = await askDiaryAI(
                            `你是${c.charName}。人设：${c.charDesc.slice(0, 900)}`,
                            `${c.userName}在交换日记里写了一篇《${ti}》：“${ct}”。请以你的身份写一句深情或占有的简短回信(42字内)：`
                        );
                        const d2 = loadDiary();
                        const item = d2.entries.find((x) => x.id === newId);
                        if (item) {
                            item.reply = aiReply.replace(/^[“"]|[”"]$/g, "").trim();
                            saveDiary(d2); renderDiaryApp();
                        }
                    } catch (e) {}
                }
            }
        };

        topDoc.getElementById("ed-bot-ai-write").onclick = async (e) => {
            const btn = e.currentTarget, orig = btn.textContent;
            btn.textContent = "书写中...";
            const c = getCtx();
            try {
                const raw = await askDiaryAI(
                    `你是${c.charName}。人设：${c.charDesc.slice(0, 900)}\n近期剧情：${c.recentChat}`,
                    `请在交换日记本上写一篇属于你（${c.charName}）的第一人称私密日记。严格只输出JSON：{"title":"10字内标题","content":"100字左右第一人称日记正文","myNote":"28字内留给${c.userName}的回信附言"}`
                );
                const m = raw.match(/\{[\s\S]*\}/);
                if (m) {
                    const o = JSON.parse(m[0]), latest = loadDiary(), now = new Date();
                    latest.entries.unshift({
                        id: Date.now(), role: "char", author: c.charName,
                        date: `${now.getFullYear()}.${String(now.getMonth() + 1).padStart(2, "0")}.${String(now.getDate()).padStart(2, "0")}`,
                        starred: false, images: [], imgUrl: "",
                        title: o.title || "未寄出的心事", content: o.content || "",
                        reply: (o.myNote || "写给你的，记得回我。").replace(/^[“"]|[”"]$/g, "").trim(),
                        replyBy: c.charName
                    });
                    latest.activeTab = "all";
                    saveDiary(latest); renderDiaryApp();
                }
            } catch (err) { alert(err.message); } finally { btn.textContent = orig; }
        };

        topDoc.getElementById("ed-bot-absorb").onclick = async (e) => {
            const btn = e.currentTarget, orig = btn.textContent;
            btn.textContent = "汲取中...";
            const c = getCtx();
            let wx = "";
            try { wx = JSON.parse(localStorage.getItem(`sumoul_v16_wx__${c.safeScope}`) || "[]").slice(-14).map((m) => `${m.role === "user" ? c.userName : c.charName}: ${m.text}`).join("\n"); } catch (err) {}
            const src = [wx, c.recentChat].filter(Boolean).join("\n---\n") || `与 ${c.userName} 的日常互动`;
            try {
                const raw = await askDiaryAI(
                    `你是${c.charName}。人设：${c.charDesc.slice(0, 800)}`,
                    `请根据以下近期聊天，以你（${c.charName}）的第一人称写一篇交换日记。\n${src.slice(-1200)}\n严格只输出JSON：{"title":"10字内标题","content":"100字左右第一人称正文","whisper":"28字内回信附言"}`
                );
                const m = raw.match(/\{[\s\S]*\}/);
                if (m) {
                    const o = JSON.parse(m[0]), latest = loadDiary(), now = new Date();
                    latest.entries.unshift({
                        id: Date.now(), role: "char", author: c.charName,
                        date: `${now.getFullYear()}.${String(now.getMonth() + 1).padStart(2, "0")}.${String(now.getDate()).padStart(2, "0")}`,
                        starred: false, images: [], imgUrl: "",
                        title: o.title || "聊完天后的余温", content: o.content || "",
                        reply: (o.whisper || "每次聊完都更想见你。").replace(/^[“"]|[”"]$/g, "").trim(),
                        replyBy: c.charName
                    });
                    latest.activeTab = "all";
                    saveDiary(latest); renderDiaryApp();
                }
            } catch (err) { alert(err.message); } finally { btn.textContent = orig; }
        };

        topDoc.getElementById("ed-top-write-btn").onclick = () => openEditorModal(null);
        topDoc.getElementById("ed-bot-write").onclick = () => openEditorModal(null);
        topDoc.getElementById("ed-close-btn").onclick = () => overlay.classList.remove("open");

        topDoc.querySelectorAll("#ed-tab-bar .kr-tab").forEach((item) => {
            item.onclick = () => {
                const latest = loadDiary();
                latest.activeTab = item.getAttribute("data-edtab");
                saveDiary(latest); renderDiaryApp();
            };
        });

        modal.addEventListener("click", (e) => {
            const appItem = e.target.closest(".ab-app-item");
            if (appItem && (appItem.textContent.includes("交换日记") || appItem.textContent.includes("교환일기") || appItem.getAttribute("data-app") === "diary")) {
                e.stopImmediatePropagation();
                e.preventDefault();
                overlay.classList.add("open");
                renderDiaryApp();
            }
        }, true);
    }

    mountKoreanNativeDiaryApp();
})();
// ==========================================================================
// 𝕏 【Sumoul App 内置应用融合补丁：X 纯白人设主页 (v10.7 · 自动挂载至App主页 + 顶栏双入口 + 整页HTML导入)】
// 用法：直接粘贴在你现有 Git 仓库的 index.js 最末尾，Commit 后在酒馆点更新即可同步！
// ==========================================================================
(function () {
    let topWin = window, topDoc = document;
    try {
        if (window.parent && window.parent.document) { topWin = window.parent; topDoc = window.parent.document; }
    } catch (e) {}

    const STORE_KEY = "st_x_profile_official_v10";
    const DEF_BANNER = "https://images.unsplash.com/photo-1517816743773-6e0fd518b4a6?auto=format&fit=crop&w=1000&q=80";

    [
        "st-x8-css", "st-x8-fix-css", "st-x8-overlay", "st-x8-fab",
        "st-x9-css", "st-x9-overlay", "st-x9-fab", "st-x9-user-css",
        "st-x10-css", "st-x10-overlay", "st-x10-fab", "st-x10-user-css"
    ].forEach((id) => {
        try { topDoc.getElementById(id)?.remove(); } catch (e) {}
    });

    const ICO = {
        back: `<svg viewBox="0 0 24 24" width="20" height="20" fill="#0F1419"><path d="M7.414 13l5.043 5.04-1.414 1.42L3.586 12l7.457-7.46 1.414 1.42L7.414 11H21v2H7.414z"/></svg>`,
        close: `<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M10.59 12L4.54 5.96l1.42-1.42L12 10.59l6.04-6.05 1.42 1.42L13.41 12l6.05 6.04-1.42 1.42L12 13.41l-6.04 6.05-1.42-1.42L10.59 12z"/></svg>`,
        chevDown: `<svg viewBox="0 0 24 24" width="16" height="16" fill="#536471" style="flex-shrink:0;margin-left:2px;"><path d="M12 15.414l-5.707-5.707 1.414-1.414L12 12.586l4.293-4.293 1.414 1.414L12 15.414z"/></svg>`,
        check: `<svg viewBox="0 0 24 24" width="18" height="18" fill="#1D9BF0"><path d="M9.64 18.952l-5.55-4.861 1.317-1.504 3.951 3.459 8.459-10.948L19.4 6.32 9.64 18.952z"/></svg>`,
        xApp: `<svg viewBox="0 0 24 24" width="20" height="20" fill="#1E2028"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`,
        xTop: `<svg viewBox="0 0 24 24" width="18" height="18" fill="#0F1419"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`,
        v: `<svg viewBox="0 0 22 22" width="17" height="17" fill="#1D9BF0" style="vertical-align:-3px;margin-left:3px;flex-shrink:0;"><path d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681s.075-1.299-.165-1.903c.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z"/></svg>`,
        dots: `<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/></svg>`,
        mail: `<svg viewBox="0 0 24 24" width="16" height="16" fill="#0F1419"><path d="M1.998 5.5c0-1.381 1.119-2.5 2.5-2.5h15c1.381 0 2.5 1.119 2.5 2.5v13c0 1.381-1.119 2.5-2.5 2.5h-15c-1.381 0-2.5-1.119-2.5-2.5v-13zm2.5-.5c-.276 0-.5.224-.5.5v2.764l8 3.638 8-3.636V5.5c0-.276-.224-.5-.5-.5h-15zm15.5 5.463l-8 3.636-8-3.638V18.5c0 .276.224.5.5.5h15c.276 0 .5-.224.5-.5v-8.037z"/></svg>`,
        imgBlue: `<svg viewBox="0 0 24 24" width="20" height="20" fill="#1D9BF0"><path d="M3 5.5C3 4.119 4.119 3 5.5 3h13C19.881 3 21 4.119 21 5.5v13c0 1.381-1.119 2.5-2.5 2.5h-13C4.119 21 3 19.881 3 18.5v-13zM5.5 5c-.276 0-.5.224-.5.5v9.086l3-3 3 3 5-5 3 3V5.5c0-.276-.224-.5-.5-.5h-13zM19 15.414l-3-3-5 5-3-3-3 3V18.5c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-3.086zM9.75 7C8.784 7 8 7.784 8 8.75s.784 1.75 1.75 1.75 1.75-.784 1.75-1.75S10.716 7 9.75 7z"/></svg>`,
        upload: `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>`,
        globe: `<svg viewBox="0 0 24 24" width="15" height="15" fill="#1D9BF0"><path d="M12 1.75C6.34 1.75 1.75 6.34 1.75 12S6.34 22.25 12 22.25 22.25 17.66 22.25 12 17.66 1.75 12 1.75zm-.25 10.48L10.5 17.5l-2-1.5v-3.5L7.5 9 5.03 7.59c1.42-2.24 3.89-3.75 6.72-3.84L11 6l-2 .5L8.5 9l5 1.5-1.75 1.73zM17 14v-3l-1.5-3 2.88-1.23c1.17 1.42 1.87 3.24 1.87 5.23 0 1.3-.3 2.52-.83 3.61L17 14z"/></svg>`,
        camWhite: `<svg viewBox="0 0 24 24" width="19" height="19" fill="#FFFFFF"><path d="M9.697 3H11v2h-.697l-3 2H5c-.276 0-.5.224-.5.5v11c0 .276.224.5.5.5h14c.276 0 .5-.224.5-.5v-11c0-.276-.224-.5-.5-.5h-2.303l-3-2H13V3h1.303l3 2H19c1.381 0 2.5 1.119 2.5 2.5v11c0 1.381-1.119 2.5-2.5 2.5H5c-1.381 0-2.5-1.119-2.5-2.5v-11C2.5 6.119 3.619 5 5 5h1.697l3-2zM12 10.5c-1.933 0-3.5 1.567-3.5 3.5s1.567 3.5 3.5 3.5 3.5-1.567 3.5-3.5-1.567-3.5-3.5-3.5zM6.5 14c0-3.038 2.462-5.5 5.5-5.5s5.5 2.462 5.5 5.5-2.462 5.5-5.5 5.5-5.5-2.462-5.5-5.5z"/></svg>`,
        pin: `<svg viewBox="0 0 24 24" width="13" height="13" fill="#536471"><path d="M7 4.5C7 3.12 8.12 2 9.5 2h5C15.88 2 17 3.12 17 4.5v5.26L20.12 16H13v5l-1 2-1-2v-5H3.88L7 9.76V4.5z"/></svg>`,
        brief: `<svg viewBox="0 0 24 24" width="14" height="14" fill="#536471"><path d="M17 6V4c0-1.1-.9-2-2-2H9c-1.1 0-2 .9-2 2v2H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-3zM9 4h6v2H9V4zm11 15H4V8h16v11z"/></svg>`,
        loc: `<svg viewBox="0 0 24 24" width="14" height="14" fill="#536471"><path d="M12 7c-1.93 0-3.5 1.57-3.5 3.5S10.07 14 12 14s3.5-1.57 3.5-3.5S13.93 7 12 7zm0 5c-.827 0-1.5-.673-1.5-1.5S11.173 9 12 9s1.5.673 1.5 1.5S12.827 12 12 12zm0-10c-4.687 0-8.5 3.813-8.5 8.5 0 5.967 7.621 11.116 7.945 11.332l.555.37.555-.37c.324-.216 7.945-5.365 7.945-11.332C20.5 5.813 16.687 2 12 2zm0 17.77c-1.665-1.241-6.5-5.196-6.5-9.27C5.5 6.916 8.416 4 12 4s6.5 2.916 6.5 6.5c0 4.073-4.835 8.028-6.5 9.27z"/></svg>`,
        link: `<svg viewBox="0 0 24 24" width="14" height="14" fill="#536471"><path d="M18.36 5.64c-1.95-1.96-5.11-1.96-7.07 0L9.88 7.05 8.46 5.64l1.42-1.42c2.73-2.73 7.16-2.73 9.9 0 2.73 2.74 2.73 7.17 0 9.9l-1.42 1.42-1.41-1.42 1.41-1.41c1.96-1.96 1.96-5.12 0-7.07zm-2.12 3.53l-7.07 7.07-1.41-1.41 7.07-7.07 1.41 1.41zm-12.02.71l1.42-1.42 1.41 1.42-1.41 1.41c-1.96 1.96-1.96 5.12 0 7.07 1.95 1.96 5.11 1.96 7.07 0l1.41-1.41 1.42 1.41-1.42 1.42c-2.73 2.73-7.16 2.73-9.9 0-2.73-2.74-2.73-7.17 0-9.9z"/></svg>`,
        cal: `<svg viewBox="0 0 24 24" width="14" height="14" fill="#536471"><path d="M7 4V3h2v1h6V3h2v1h1.5C19.89 4 21 5.12 21 6.5v12c0 1.38-1.11 2.5-2.5 2.5h-13C4.12 21 3 19.88 3 18.5v-12C3 5.12 4.12 4 5.5 4H7zm0 2H5.5c-.27 0-.5.22-.5.5v12c0 .28.23.5.5.5h13c.28 0 .5-.22.5-.5v-12c0-.28-.22-.5-.5-.5H17v1h-2V6H9v1H7V6z"/></svg>`,
        reply: `<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.067c-4.49.1-8.183-3.51-8.183-8.01zm8.005-6c-3.317 0-6.005 2.69-6.005 6 0 3.37 2.77 6.08 6.138 6.01l.351-.01h1.761v2.3l5.087-2.81c1.951-1.08 3.163-3.13 3.163-5.36 0-3.39-2.744-6.13-6.129-6.13H9.756z"/></svg>`,
        rt: `<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M4.5 3.88l4.432 4.14-1.364 1.46L5.5 7.55V16c0 1.1.896 2 2 2H13v2H7.5c-2.209 0-4-1.79-4-4V7.55L1.432 9.48.068 8.02 4.5 3.88zM16.5 6H11V4h5.5c2.209 0 4 1.79 4 4v8.45l2.068-1.93 1.364 1.46-4.432 4.14-4.432-4.14 1.364-1.46 2.068 1.93V8c0-1.1-.896-2-2-2z"/></svg>`,
        heartOff: `<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M16.697 5.5c-1.222-.06-2.679.51-3.89 2.16l-.805 1.09-.806-1.09C9.984 6.01 8.526 5.44 7.304 5.5c-1.243.07-2.349.78-2.91 1.91-.552 1.12-.633 2.78.479 4.82 1.074 1.97 3.257 4.27 7.129 6.61 3.87-2.34 6.052-4.64 7.126-6.61 1.111-2.04 1.03-3.7.477-4.82-.561-1.13-1.666-1.84-2.908-1.91zm4.187 7.69c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z"/></svg>`,
        heartOn: `<svg viewBox="0 0 24 24" width="16" height="16" fill="#F91880"><path d="M20.884 13.19c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z"/></svg>`,
        views: `<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M8.75 21V3h2v18h-2zM18 21V8.5h2V21h-2zM4 21l.004-10h2L6 21H4zm9.248 0v-7h2v7h-2z"/></svg>`,
        bm: `<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M4 4.5C4 3.12 5.119 2 6.5 2h11C18.881 2 20 3.12 20 4.5v18.44l-8-5.71-8 5.71V4.5zM6.5 4c-.276 0-.5.22-.5.5v14.56l6-4.29 6 4.29V4.5c0-.28-.224-.5-.5-.5h-11z"/></svg>`,
        feather: `<svg viewBox="0 0 24 24" width="22" height="22" fill="#FFFFFF"><path d="M23 3c-6.62-.1-10.38 2.421-13.05 6.03C7.29 12.61 6 17.331 6 22h2c0-1.007.07-2.012.19-3H12c4.1 0 7.48-3.082 7.94-7.054C22.79 10.147 23.17 6.359 23 3zm-7 8h-1.5v2H16c.63-.016 1.2-.08 1.72-.188C16.95 15.24 14.68 17 12 17H8.55c.57-2.512 1.57-4.851 3-6.78 2.16-2.912 5.29-4.911 9.45-5.187C20.95 8.079 19.9 11 16 11zM4 9V6H1V4h3V1h2v3h3v2H6v3H4z"/></svg>`
    };

    function fmtNum(n) {
        const v = Number(n) || 0;
        if (v >= 10000) return `${(v / 10000).toFixed(1)}万`;
        if (v >= 1000) return v.toLocaleString();
        return String(v);
    }

    function genViralStats() {
        const likes = Math.floor(18000 + Math.random() * 78000);
        return {
            replies: Math.floor(620 + Math.random() * 2800),
            rts: Math.floor(2400 + Math.random() * 14000),
            likes,
            views: Math.floor(likes * (6 + Math.random() * 5))
        };
    }

    function loadCfg() {
        const def = {
            tab: "posts",
            banner: DEF_BANNER,
            handle: "@seoul_archive",
            category: "Personal Archive · 偏爱与唯一",
            bio: "在平行世界里，只做你一个人的偏爱与例外。🤍\n#Persona #Seoul #Exclusive",
            loc: "Seoul, Republic of Korea",
            link: "persona.x.com",
            date: "2026年11月 加入",
            followers: "52.0万",
            tweets: null,
            media: [
                { img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80", txt: "海风与手心的温度 🌊 #Daily" },
                { img: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=600&q=80", txt: "今日份日常碎片 ✨ #Record" }
            ],
            useHtml: false,
            fullPageHtml: true,
            html: "",
            css: ""
        };
        try {
            const c = Object.assign(def, JSON.parse(localStorage.getItem(STORE_KEY) || "{}"));
            if (!Array.isArray(c.tweets)) {
                c.tweets = (c.media || []).map((m, i) => Object.assign({
                    id: Date.now() - i * 1000,
                    txt: m.txt || "",
                    imgs: m.img ? [m.img] : [],
                    date: "11月19日",
                    liked: false
                }, genViralStats()));
            } else {
                c.tweets.forEach((t) => {
                    if (!t.views || t.likes < 1000) Object.assign(t, genViralStats());
                });
            }
            return c;
        } catch (e) {
            def.tweets = [];
            return def;
        }
    }
    function saveCfg(c) {
        try { localStorage.setItem(STORE_KEY, JSON.stringify(c)); }
        catch (e) { alert("图片太大了，建议少选几张或换小一点的图片。"); }
    }

    function compressImg(file, max = 720) {
        return new Promise((res) => {
            const r = new FileReader();
            r.onload = (ev) => {
                const img = new Image();
                img.onload = () => {
                    const c = topDoc.createElement("canvas");
                    let w = img.width, h = img.height;
                    if (w > h) { if (w > max) { h = Math.round(h * max / w); w = max; } }
                    else { if (h > max) { w = Math.round(w * max / h); h = max; } }
                    c.width = w; c.height = h;
                    c.getContext("2d").drawImage(img, 0, 0, w, h);
                    res(c.toDataURL("image/jpeg", 0.78));
                };
                img.src = String(ev.target?.result || "");
            };
            r.readAsDataURL(file);
        });
    }

    function formatXText(raw) {
        const safe = String(raw || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
        return safe.replace(/(#[a-zA-Z0-9_\u4e00-\u9fa5]+|@[a-zA-Z0-9_\u4e00-\u9fa5]+)/g, `<span style="color:#1D9BF0;cursor:pointer;">$1</span>`);
    }

    function renderTweetImages(imgs, removable = false) {
        const list = (imgs || []).filter(Boolean);
        if (!list.length) return "";
        const wrapImg = (u, idx, style) => `
            <div style="position:relative;${style}overflow:hidden;">
                <img src="${u}" style="width:100%;height:100%;object-fit:cover;display:block;" />
                ${removable ? `<span data-rmdraft="${idx}" style="position:absolute;top:5px;right:5px;width:22px;height:22px;border-radius:50%;background:rgba(15,20,25,0.75);color:#FFFFFF;display:inline-flex;align-items:center;justify-content:center;cursor:pointer;">${ICO.close.replace('width="18" height="18"', 'width="13" height="13"')}</span>` : ""}
            </div>
        `;
        if (list.length === 1) return `<div style="margin-top:8px;max-width:92%;border-radius:14px;overflow:hidden;border:1px solid #EFF3F4;">${wrapImg(list[0], 0, "width:100%;max-height:192px;")}</div>`;
        if (list.length === 2) return `<div style="display:grid;grid-template-columns:1fr 1fr;gap:2px;margin-top:8px;max-width:94%;border-radius:14px;overflow:hidden;border:1px solid #EFF3F4;">${list.map((u, i) => wrapImg(u, i, "height:134px;")).join("")}</div>`;
        if (list.length === 3) return `<div style="display:grid;grid-template-columns:1fr 1fr;grid-template-rows:76px 76px;gap:2px;margin-top:8px;max-width:94%;border-radius:14px;overflow:hidden;border:1px solid #EFF3F4;">${wrapImg(list[0], 0, "grid-row:1/3;height:100%;")}${wrapImg(list[1], 1, "height:100%;")}${wrapImg(list[2], 2, "height:100%;")}</div>`;
        return `<div style="display:grid;grid-template-columns:1fr 1fr;gap:2px;margin-top:8px;max-width:94%;border-radius:14px;overflow:hidden;border:1px solid #EFF3F4;">${list.slice(0, 4).map((u, i) => wrapImg(u, i, "height:94px;")).join("")}</div>`;
    }

    let pendingSwitch = null;

    function scanPersonas() {
        let curName = "User", curAva = "https://i.postimg.cc/rydS6NvG/IMG-3866.jpg", curDesc = "", charName = "Partner", charAva = "https://i.postimg.cc/QC3CQ218/IMG-4147.jpg";
        const list = [];
        try {
            const ctx = topWin.SillyTavern?.getContext?.();
            const pu = ctx?.powerUserSettings || topWin.power_user || {};
            const personasMap = pu.personas || {};
            const descMap = pu.persona_descriptions || {};

            if (ctx) {
                if (ctx.name1) curName = ctx.name1;
                if (ctx.name2) charName = ctx.name2;
                if (ctx.characterId !== undefined && ctx.characters?.[ctx.characterId]?.avatar) {
                    charAva = `/characters/${encodeURIComponent(ctx.characters[ctx.characterId].avatar)}`;
                }
            }
            const descEl = topDoc.getElementById("persona_description");
            if (descEl) curDesc = descEl.value || "";

            const avaBlocks = topDoc.querySelectorAll("#user_avatar_block .avatar-container, #user_avatar_block .avatar_container, #user_avatar_block .avatar");
            const seen = new Set();
            let foundSelected = false;

            avaBlocks.forEach((el) => {
                const box = el.closest(".avatar-container, .avatar_container") || el;
                const avaEl = box.querySelector(".avatar") || (el.classList.contains("avatar") ? el : box);
                const img = avaEl.querySelector("img") || box.querySelector("img") || (el.tagName === "IMG" ? el : null);
                const imgfile = avaEl.getAttribute("imgfile") || box.getAttribute("imgfile") || box.getAttribute("data-avatar-id") || avaEl.getAttribute("data-avatar-id") || img?.getAttribute("src") || "";
                if (!imgfile || seen.has(imgfile)) return;
                seen.add(imgfile);

                const isSel = box.classList.contains("selected") || avaEl.classList.contains("selected") || Boolean(box.querySelector(".selected"));
                const nmFromDom = box.querySelector(".ch_name, .persona_name, .avatar_name, span")?.textContent?.trim();
                const nm = personasMap[imgfile] || nmFromDom || imgfile.replace(/\.(png|jpg|jpeg|webp|gif)$/i, "");
                const src = img?.src || `/User Avatars/${encodeURIComponent(imgfile)}`;
                const pDesc = descMap[imgfile]?.description ?? "";

                if (isSel) {
                    foundSelected = true;
                    curAva = src;
                    if (nm) curName = nm;
                    if (!curDesc && pDesc) curDesc = pDesc;
                }
                list.push({ id: imgfile, name: nm || "人设", src, desc: pDesc, isSelected: isSel, clickTarget: avaEl, boxTarget: box });
            });

            if (pendingSwitch && Date.now() - pendingSwitch.ts < 1200) {
                const match = list.find((x) => x.id === pendingSwitch.id);
                if (match) {
                    list.forEach((x) => { x.isSelected = x.id === match.id; });
                    curAva = match.src;
                    curName = match.name;
                    if (descEl && descEl.value) curDesc = descEl.value;
                    else if (match.desc) curDesc = match.desc;
                    foundSelected = true;
                }
            }

            if (!foundSelected) {
                const topAvaImg = topDoc.querySelector("#user_avatar_block .avatar.selected img, #your_avatar_button img");
                if (topAvaImg?.src) curAva = topAvaImg.src;
            }
            if (!list.length) list.push({ id: "cur", name: curName, src: curAva, desc: curDesc, isSelected: true, clickTarget: null, boxTarget: null });
        } catch (e) {}
        return { curName, curAva, curDesc, charName, charAva, list };
    }

    function switchPersonaReal(target) {
        if (!target) return;
        pendingSwitch = { id: target.id, ts: Date.now() };
        const el = target.clickTarget || target.boxTarget;
        if (el) {
            try { el.click(); } catch (e) {}
            try { el.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true, view: topWin })); } catch (e) {}
            try { if (topWin.jQuery) topWin.jQuery(el).trigger("click"); } catch (e) {}
        }
        renderX("");
        setTimeout(() => renderX(""), 220);
        setTimeout(() => { pendingSwitch = null; renderX(""); }, 600);
    }

    function clickNative(sels) {
        for (const s of sels) {
            const el = topDoc.querySelector(s);
            if (el) { el.click(); return true; }
        }
        return false;
    }

    const st = topDoc.createElement("style");
    st.id = "st-x10-css";
    st.innerHTML = `
        #st-x10-overlay {
            position: fixed !important; inset: 0 !important; z-index: 2147483647 !important;
            background: #FFFFFF !important;
            display: none; align-items: center !important; justify-content: center !important;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "PingFang SC", sans-serif !important;
            -webkit-font-smoothing: antialiased !important;
        }
        #st-x10-overlay.open { display: flex !important; }
        #st-x10-overlay .x10-shell {
            width: 100% !important; max-width: 550px !important; height: 100% !important; max-height: 100vh !important;
            background: #FFFFFF !important; color: #0F1419 !important;
            border-left: 1px solid #EFF3F4 !important; border-right: 1px solid #EFF3F4 !important;
            overflow-y: auto !important; overflow-x: hidden !important;
            box-sizing: border-box !important; padding-bottom: 90px !important;
            display: block !important; position: relative !important;
        }
        #st-x10-overlay .x10-top {
            position: sticky !important; top: 0 !important; z-index: 40 !important;
            background: rgba(255, 255, 255, 0.94) !important; backdrop-filter: blur(12px) !important;
            display: flex !important; align-items: center !important; gap: 14px !important;
            padding: max(8px, env(safe-area-inset-top, 8px)) 14px 8px 14px !important;
            border-bottom: 1px solid #EFF3F4 !important;
        }
        #st-x10-overlay .x10-top-ico {
            width: 34px !important; height: 34px !important; border-radius: 50% !important;
            display: inline-flex !important; align-items: center !important; justify-content: center !important;
            cursor: pointer !important; flex-shrink: 0 !important; transition: background 0.15s ease !important;
        }
        #st-x10-overlay .x10-top-ico:hover { background: #F5F8FA !important; }
        #st-x10-overlay .x10-hero-grid {
            display: grid !important; grid-template-rows: 118px 39px 45px !important; grid-template-columns: 16px 82px 1fr 16px !important;
            background: #FFFFFF !important;
        }
        #st-x10-overlay .x10-banner {
            grid-row: 1 / 3 !important; grid-column: 1 / 5 !important;
            background-size: cover !important; background-position: center !important;
            background-color: #FFFFFF !important; cursor: pointer !important;
        }
        #st-x10-overlay .x10-ava {
            grid-row: 2 / 4 !important; grid-column: 2 / 3 !important; z-index: 10 !important;
            width: 82px !important; height: 82px !important; border-radius: 50% !important;
            background-size: cover !important; background-position: center !important;
            background-color: #FFFFFF !important; border: 4px solid #FFFFFF !important;
            box-shadow: 0 0 0 1px #EFF3F4 !important; box-sizing: border-box !important; cursor: pointer !important;
        }
        #st-x10-overlay .x10-actions {
            grid-row: 3 / 4 !important; grid-column: 3 / 4 !important;
            display: flex !important; align-items: center !important; justify-content: flex-end !important; gap: 7px !important; padding-top: 4px !important;
        }
        #st-x10-overlay .x10-circle-btn {
            width: 34px !important; height: 34px !important; border-radius: 50% !important;
            background: #FFFFFF !important; border: 1px solid #CFD9DE !important;
            display: inline-flex !important; align-items: center !important; justify-content: center !important;
            cursor: pointer !important; flex-shrink: 0 !important; color: #0F1419 !important;
        }
        #st-x10-overlay .x10-pill-btn {
            height: 34px !important; padding: 0 14px !important; border-radius: 999px !important;
            background: #FFFFFF !important; border: 1px solid #CFD9DE !important;
            font-size: 13px !important; font-weight: 700 !important; color: #0F1419 !important;
            display: inline-flex !important; align-items: center !important; justify-content: center !important; gap: 5px !important;
            cursor: pointer !important; white-space: nowrap !important;
        }
        #st-x10-overlay .x10-pill-btn.dark { background: #0F1419 !important; border-color: #0F1419 !important; color: #FFFFFF !important; }
        #st-x10-overlay .x10-pill-btn.blue { background: #1D9BF0 !important; border-color: #1D9BF0 !important; color: #FFFFFF !important; }
        #st-x10-overlay .x10-pill-btn.blue.dim { opacity: 0.45 !important; }
        #st-x10-overlay .x10-tabs {
            display: grid !important; grid-template-columns: repeat(4, 1fr) !important;
            border-bottom: 1px solid #EFF3F4 !important; background: #FFFFFF !important;
            position: sticky !important; top: 51px !important; z-index: 30 !important;
        }
        #st-x10-overlay .x10-tab {
            height: 46px !important; display: flex !important; align-items: center !important; justify-content: center !important;
            font-size: 14px !important; font-weight: 500 !important; color: #536471 !important; position: relative !important; cursor: pointer !important;
        }
        #st-x10-overlay .x10-tab.on { color: #0F1419 !important; font-weight: 700 !important; }
        #st-x10-overlay .x10-tab.on::after {
            content: "" !important; position: absolute !important; bottom: 0 !important;
            width: 52px !important; height: 4px !important; border-radius: 99px !important; background: #1D9BF0 !important;
        }
        #st-x10-overlay .x10-tweet {
            display: flex !important; gap: 11px !important; padding: 12px 16px !important;
            border-bottom: 1px solid #EFF3F4 !important; background: #FFFFFF !important;
        }
        #st-x10-overlay .x10-tweet-bar {
            display: flex !important; justify-content: space-between !important; align-items: center !important;
            margin-top: 10px !important; max-width: 390px !important; color: #536471 !important; font-size: 12.5px !important;
        }
        #st-x10-overlay .x10-tweet-bar > span { display: inline-flex !important; align-items: center !important; gap: 4px !important; cursor: pointer !important; }
        #st-x10-overlay .x10-compose-fab {
            position: fixed !important; right: max(20px, calc((100vw - 550px)/2 + 18px)) !important; bottom: 24px !important; z-index: 45 !important;
            width: 54px !important; height: 54px !important; border-radius: 50% !important;
            background: #1D9BF0 !important; box-shadow: 0 4px 16px rgba(29,155,240,0.42) !important;
            display: flex !important; align-items: center !important; justify-content: center !important; cursor: pointer !important;
        }
        #st-x10-overlay .x10-modal-mask {
            position: fixed !important; inset: 0 !important; z-index: 80 !important;
            background: rgba(15, 20, 25, 0.42) !important;
            display: none; align-items: flex-start !important; justify-content: center !important;
            padding: max(24px, 6vh) 14px 14px 14px !important; box-sizing: border-box !important;
        }
        #st-x10-overlay .x10-modal-mask.show { display: flex !important; }
        #st-x10-overlay .x10-tool-ico {
            width: 34px !important; height: 34px !important; border-radius: 50% !important;
            display: inline-flex !important; align-items: center !important; justify-content: center !important;
            cursor: pointer !important; color: #1D9BF0 !important; font-size: 15px !important; font-weight: 700 !important;
        }
        #st-x10-overlay .x10-cam-overlay {
            width: 38px !important; height: 38px !important; border-radius: 50% !important;
            background: rgba(15, 20, 25, 0.58) !important;
            display: inline-flex !important; align-items: center !important; justify-content: center !important;
            cursor: pointer !important; color: #FFFFFF !important; font-size: 11px !important; font-weight: 700 !important;
        }
        #st-x10-overlay .x10-field {
            border: 1px solid #CFD9DE !important; border-radius: 8px !important;
            padding: 6px 10px !important; margin-bottom: 12px !important; background: #FFFFFF !important;
        }
        #st-x10-overlay .x10-field:focus-within { border-color: #1D9BF0 !important; }
        #st-x10-overlay .x10-field-lbl { font-size: 11.5px !important; color: #536471 !important; margin-bottom: 2px !important; }
        #st-x10-overlay .x10-field-inp {
            width: 100% !important; border: none !important; outline: none !important;
            font-size: 14px !important; color: #0F1419 !important; background: transparent !important; padding: 0 !important;
        }
    `;
    topDoc.head.appendChild(st);

    const overlay = topDoc.createElement("div");
    overlay.id = "st-x10-overlay";
    topDoc.body.appendChild(overlay);

    let draftTxt = "";
    let draftImgs = [];

    topWin.__ST_PERSONA_API__ = {
        getData: () => scanPersonas(),
        open: () => openModal(),
        close: () => overlay.classList.remove("open"),
        uploadAvatar: () => clickNative(["#your_avatar_button", "#upload_avatar_button"]),
        toggleBind: () => { clickNative(["#persona_lock_button", "#lock_user_name", ".persona_lock_icon"]); setTimeout(() => renderX(""), 200); },
        createNew: () => { clickNative(["#create_dummy_persona", "#add_persona_button", ".fa-plus"]); setTimeout(() => renderX(""), 400); },
        switchByIndex: (idx) => switchPersonaReal(scanPersonas().list[Number(idx)]),
        setDesc: (text) => {
            const nd = topDoc.getElementById("persona_description");
            if (nd) { nd.value = String(text || ""); nd.dispatchEvent(new Event("input", { bubbles: true })); nd.dispatchEvent(new Event("change", { bubbles: true })); }
        },
        exitCustomHtml: () => { const c = loadCfg(); c.useHtml = false; c.tab = "html"; saveCfg(c); renderX(""); }
    };

    function renderTweetCard(tw, info, handle, safeAva) {
        return `
            <div class="x10-tweet">
                <div style="width:40px;height:40px;border-radius:50%;background-image:url('${safeAva}');background-size:cover;background-position:center;border:1px solid #EFF3F4;flex-shrink:0;"></div>
                <div style="flex:1;min-width:0;">
                    <div style="display:flex;justify-content:space-between;align-items:center;">
                        <div style="display:flex;align-items:center;gap:4px;min-width:0;">
                            <span style="font-size:15px;font-weight:700;color:#0F1419;">${info.curName.replace(/</g, "&lt;")}</span>
                            ${ICO.v}
                            <span style="font-size:13.5px;color:#536471;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${handle.replace(/</g, "&lt;")} · ${(tw.date || "刚刚").replace(/</g, "&lt;")}</span>
                        </div>
                        <span data-deltw="${tw.id}" style="display:inline-flex;align-items:center;justify-content:center;width:24px;height:24px;border-radius:50%;color:#8899A6;cursor:pointer;" title="删除推文">${ICO.close.replace('width="18" height="18"', 'width="14" height="14"')}</span>
                    </div>
                    ${tw.txt ? `<div style="font-size:14.5px;color:#0F1419;margin-top:4px;line-height:1.6;white-space:pre-wrap;word-break:break-word;">${formatXText(tw.txt)}</div>` : ""}
                    ${renderTweetImages(tw.imgs, false)}
                    <div class="x10-tweet-bar">
                        <span>${ICO.reply}<span>${fmtNum(tw.replies || 1280)}</span></span>
                        <span>${ICO.rt}<span>${fmtNum(tw.rts || 5640)}</span></span>
                        <span data-liketw="${tw.id}" style="color:${tw.liked ? "#F91880" : "#536471"};">${tw.liked ? ICO.heartOn : ICO.heartOff}<span>${fmtNum(tw.likes || 38400)}</span></span>
                        <span>${ICO.views}<span>${fmtNum(tw.views || 326000)}</span></span>
                        <span>${ICO.bm}</span>
                    </div>
                </div>
            </div>
        `;
    }

    function renderX(openState = "") {
        const cfg = loadCfg();
        const info = scanPersonas();

        // 同步更新 App 主页上的角标人数
        const badgeEl = topDoc.querySelector("#ab-app-xpersona .ab-app-floating-badge");
        if (badgeEl) badgeEl.textContent = `${info.list.length}人设`;

        let uCss = topDoc.getElementById("st-x10-user-css");
        if (!uCss) { uCss = topDoc.createElement("style"); uCss.id = "st-x10-user-css"; topDoc.head.appendChild(uCss); }
        uCss.innerHTML = cfg.css || "";

        if (cfg.useHtml && cfg.fullPageHtml && cfg.html && cfg.html.trim()) {
            const compiled = cfg.html
                .replace(/\{\{\s*name\s*\}\}/gi, info.curName.replace(/</g, "&lt;"))
                .replace(/\{\{\s*avatar\s*\}\}/gi, info.curAva)
                .replace(/\{\{\s*desc\s*\}\}/gi, (info.curDesc || "").replace(/</g, "&lt;"))
                .replace(/\{\{\s*char\s*\}\}/gi, info.charName.replace(/</g, "&lt;"))
                .replace(/\{\{\s*charAvatar\s*\}\}/gi, info.charAva);

            overlay.innerHTML = `
                <div id="x10-fullpage-host" style="position:relative;width:100%;height:100%;overflow-y:auto;background:#FFFFFF;">
                    <div style="position:fixed;top:max(10px,env(safe-area-inset-top,10px));right:12px;z-index:2147483647;display:flex;align-items:center;gap:6px;background:rgba(255,255,255,0.88);backdrop-filter:blur(8px);padding:4px 10px;border-radius:999px;border:1px solid #EAEAEA;box-shadow:0 2px 10px rgba(0,0,0,0.08);">
                        <span id="x10-fp-exit" style="font-size:11px;font-weight:700;color:#0F1419;cursor:pointer;padding:2px 4px;">还原X页</span>
                        <span style="color:#DDD;">|</span>
                        <span id="x10-fp-close" style="display:inline-flex;align-items:center;color:#536471;cursor:pointer;">${ICO.close.replace('width="18" height="18"', 'width="14" height="14"')}</span>
                    </div>
                    <div id="x10-fp-mount" style="width:100%;min-height:100%;"></div>
                </div>
            `;

            const mount = topDoc.getElementById("x10-fp-mount");
            mount.innerHTML = compiled;
            mount.querySelectorAll("script").forEach((oldSc) => {
                const newSc = topDoc.createElement("script");
                if (oldSc.src) newSc.src = oldSc.src; else newSc.textContent = oldSc.textContent;
                oldSc.replaceWith(newSc);
            });
            mount.querySelectorAll("[data-st-action]").forEach((el) => {
                el.onclick = () => {
                    const act = el.getAttribute("data-st-action");
                    if (act === "avatar") topWin.__ST_PERSONA_API__.uploadAvatar();
                    else if (act === "bind") topWin.__ST_PERSONA_API__.toggleBind();
                    else if (act === "new") topWin.__ST_PERSONA_API__.createNew();
                    else if (act === "close") topWin.__ST_PERSONA_API__.close();
                    else if (act === "switch") topWin.__ST_PERSONA_API__.switchByIndex(el.getAttribute("data-persona-idx") || 0);
                };
            });

            topDoc.getElementById("x10-fp-exit").onclick = () => { const c = loadCfg(); c.useHtml = false; c.tab = "html"; saveCfg(c); renderX(""); };
            topDoc.getElementById("x10-fp-close").onclick = () => overlay.classList.remove("open");
            return;
        }

        const lockBtn = topDoc.querySelector("#persona_lock_button, #lock_user_name, .persona_lock_icon");
        const isBound = lockBtn?.classList?.contains("locked") || lockBtn?.classList?.contains("fa-lock");
        const nativeDepthInp = topDoc.querySelector("#persona_depth, input[name='persona_depth']");
        const curDepth = nativeDepthInp ? nativeDepthInp.value : "2";

        const isWhiteBanner = cfg.banner === "white" || !cfg.banner;
        const safeBanner = isWhiteBanner ? "" : String(cfg.banner).replace(/'/g, "\\'");
        const bannerBgStyle = isWhiteBanner ? "background:#FFFFFF;border-bottom:1px solid #EFF3F4;" : `background-image:url('${safeBanner}');`;

        const safeAva = String(info.curAva || "").replace(/'/g, "\\'");
        const safeCharAva = String(info.charAva || "").replace(/'/g, "\\'");
        const handle = (cfg.handle || "@seoul_archive").startsWith("@") ? cfg.handle : `@${cfg.handle}`;
        const cleanDesc = (info.curDesc || "点击此处直接编写你的人设设定...").trim();

        const htmlBanner = (cfg.useHtml && !cfg.fullPageHtml && cfg.html.trim())
            ? `<div style="padding:10px 16px;border-bottom:1px solid #EFF3F4;background:#FFFFFF;">${
                cfg.html.replace(/\{\{\s*name\s*\}\}/gi, info.curName).replace(/\{\{\s*avatar\s*\}\}/gi, info.curAva).replace(/\{\{\s*desc\s*\}\}/gi, cleanDesc).replace(/\{\{\s*char\s*\}\}/gi, info.charName)
              }</div>`
            : "";

        let bodyHtml = "";
        if (cfg.tab === "posts") {
            const userTweetsHtml = (cfg.tweets || []).map((tw) => renderTweetCard(tw, info, handle, safeAva)).join("");
            bodyHtml = `
                <div class="x10-tweet" id="x10-pin-tweet" style="flex-direction:column!important;gap:4px!important;cursor:pointer;">
                    <div style="display:flex;align-items:center;gap:6px;padding-left:30px;font-size:12.5px;font-weight:700;color:#536471;">
                        ${ICO.pin}<span>已置顶</span>
                    </div>
                    <div style="display:flex;gap:11px;">
                        <div style="width:40px;height:40px;border-radius:50%;background-image:url('${safeAva}');background-size:cover;background-position:center;border:1px solid #EFF3F4;flex-shrink:0;"></div>
                        <div style="flex:1;min-width:0;">
                            <div style="display:flex;align-items:center;justify-content:space-between;">
                                <div style="display:flex;align-items:center;gap:4px;min-width:0;">
                                    <span style="font-size:15px;font-weight:700;color:#0F1419;">${info.curName.replace(/</g, "&lt;")}</span>
                                    ${ICO.v}
                                    <span style="font-size:14px;color:#536471;">${handle.replace(/</g, "&lt;")}</span>
                                </div>
                                <span style="color:#536471;display:inline-flex;">${ICO.dots}</span>
                            </div>
                            <div style="font-size:14.5px;color:#0F1419;line-height:1.65;margin-top:5px;white-space:pre-wrap;word-break:break-word;">${formatXText(cleanDesc)}</div>
                            <div class="x10-tweet-bar">
                                <span>${ICO.reply}<span>3,280</span></span>
                                <span>${ICO.rt}<span>1.4万</span></span>
                                <span style="color:#F91880;">${ICO.heartOn}<span>8.9万</span></span>
                                <span>${ICO.views}<span>76.4万</span></span>
                                <span>${ICO.bm}</span>
                            </div>
                        </div>
                    </div>
                </div>
                ${userTweetsHtml}
            `;
        } else if (cfg.tab === "edit") {
            bodyHtml = `
                <div style="padding:14px 16px;background:#FFFFFF;">
                    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;flex-wrap:wrap;gap:6px;">
                        <div style="display:flex;gap:6px;flex-wrap:wrap;">
                            <span class="x10-pill-btn" id="x10-act-ava" style="height:28px!important;font-size:12px!important;padding:0 11px!important;">换头像</span>
                            <span class="x10-pill-btn" id="x10-act-ren" style="height:28px!important;font-size:12px!important;padding:0 11px!important;">改名字</span>
                            <span class="x10-pill-btn" id="x10-act-dup" style="height:28px!important;font-size:12px!important;padding:0 11px!important;">复制</span>
                            <span class="x10-pill-btn" id="x10-act-def" style="height:28px!important;font-size:12px!important;padding:0 11px!important;">设默认</span>
                            <span class="x10-pill-btn" id="x10-act-del" style="height:28px!important;font-size:12px!important;padding:0 11px!important;color:#F4212E!important;">删除</span>
                        </div>
                        <div style="display:flex;align-items:center;gap:4px;font-size:12px;color:#536471;">
                            <span>深度</span>
                            <input type="number" id="x10-depth" value="${curDepth}" style="width:42px;height:26px;background:#FFFFFF;border:1px solid #CFD9DE;border-radius:6px;text-align:center;font-size:12px;outline:none;" />
                        </div>
                    </div>
                    <div style="background:#FFFFFF;border:1px solid #EFF3F4;border-radius:16px;padding:14px;">
                        <div style="display:flex;justify-content:space-between;margin-bottom:8px;font-size:13.5px;font-weight:700;">
                            <span>正在编辑：${info.curName.replace(/</g, "&lt;")}</span>
                            <span style="color:#1D9BF0;font-size:12px;">已同步底层</span>
                        </div>
                        <textarea id="x10-desc-area" rows="11" placeholder="在此编写你的人设外貌、性格、身份与背景设定..." style="width:100%;background:#FFFFFF;border:1px solid #CFD9DE;border-radius:12px;padding:12px;font-size:14px;color:#0F1419;line-height:1.68;box-sizing:border-box;outline:none;resize:vertical;">${(info.curDesc || "").replace(/</g, "&lt;")}</textarea>
                    </div>
                </div>
            `;
        } else if (cfg.tab === "media") {
            const mediaTweets = (cfg.tweets || []).filter((tw) => (tw.imgs || []).length > 0);
            bodyHtml = mediaTweets.length
                ? mediaTweets.map((tw) => renderTweetCard(tw, info, handle, safeAva)).join("")
                : `<div style="padding:48px 16px;text-align:center;color:#536471;font-size:13.5px;">还没有带图推文，点右下角蓝色羽毛按钮即可发多图帖子</div>`;
        } else if (cfg.tab === "html") {
            bodyHtml = `
                <div style="padding:14px 16px;background:#FFFFFF;">
                    <div style="background:#FFFFFF;border:1px solid #EFF3F4;border-radius:16px;padding:14px;">
                        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;flex-wrap:wrap;gap:6px;">
                            <span style="font-size:14px;font-weight:800;color:#0F1419;">整页 HTML 美化主题导入</span>
                            <label class="x10-pill-btn dark" style="height:28px!important;font-size:12px!important;padding:0 12px!important;cursor:pointer;">
                                ${ICO.upload}<span>导入 .html 文件</span>
                                <input type="file" id="x10-h-file" accept=".html,.htm,.txt" style="position:fixed;left:-9999px;opacity:0;" />
                            </label>
                        </div>
                        <div style="font-size:12px;color:#536471;line-height:1.55;margin-bottom:10px;padding:8px 10px;border:1px solid #EFF3F4;border-radius:10px;">
                            导入外部 <code>.html</code> 文件并勾选<b>「整页完全替换」</b>，整个 User 页面将 100% 变成该美化主题（支持 <code>{{name}}</code> <code>{{avatar}}</code> <code>{{desc}}</code> <code>{{char}}</code> 及内置 JS）。
                        </div>
                        <div style="display:flex;gap:14px;flex-wrap:wrap;margin-bottom:10px;font-size:13px;font-weight:700;">
                            <label style="cursor:pointer;"><input type="checkbox" id="x10-h-chk" ${cfg.useHtml ? "checked" : ""} /> 启用自定义 HTML</label>
                            <label style="cursor:pointer;"><input type="checkbox" id="x10-h-full" ${cfg.fullPageHtml !== false ? "checked" : ""} /> 整页完全替换</label>
                        </div>
                        <textarea id="x10-h-code" rows="6" placeholder="粘贴完整的 HTML + <style> + <script> 美化代码，或点右上角导入 .html 文件..." style="width:100%;background:#FFFFFF;border:1px solid #CFD9DE;border-radius:10px;padding:8px;font-size:11.5px;font-family:monospace;box-sizing:border-box;margin-bottom:8px;">${(cfg.html || "").replace(/</g, "&lt;")}</textarea>
                        <textarea id="x10-c-code" rows="3" placeholder="额外全局 CSS（仅微调当前 X 样式时可填）..." style="width:100%;background:#FFFFFF;border:1px solid #CFD9DE;border-radius:10px;padding:8px;font-size:11.5px;font-family:monospace;box-sizing:border-box;margin-bottom:10px;">${(cfg.css || "").replace(/</g, "&lt;")}</textarea>
                        <div class="x10-pill-btn dark" id="x10-h-save" style="width:100%!important;box-sizing:border-box!important;">保存并立即切换主题</div>
                    </div>
                </div>
            `;
        }

        const canPost = Boolean(draftTxt.trim() || draftImgs.length > 0);
        const switcherListHtml = info.list.map((p, idx) => {
            const pAva = String(p.src || "").replace(/'/g, "\\'");
            return `
                <div data-swidx="${idx}" style="display:flex;align-items:center;justify-content:space-between;padding:12px 16px;border-bottom:1px solid #EFF3F4;cursor:pointer;background:#FFFFFF;">
                    <div style="display:flex;align-items:center;gap:12px;min-width:0;">
                        <div style="width:42px;height:42px;border-radius:50%;background-image:url('${pAva}');background-size:cover;background-position:center;border:1px solid #EFF3F4;flex-shrink:0;"></div>
                        <div style="min-width:0;">
                            <div style="font-size:15px;font-weight:700;color:#0F1419;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${p.name.replace(/</g, "&lt;")}</div>
                            <div style="font-size:13px;color:#536471;">@${p.name.toLowerCase().replace(/\s+/g, "_").replace(/</g, "&lt;")}</div>
                        </div>
                    </div>
                    <span style="display:inline-flex;align-items:center;">${p.isSelected ? ICO.check : ""}</span>
                </div>
            `;
        }).join("");

        overlay.innerHTML = `
            <div class="x10-shell" id="x10-shell-el">
                <div class="x10-top">
                    <div id="x10-close" class="x10-top-ico" title="返回">${ICO.back}</div>
                    <div id="x10-open-sw" style="flex:1;min-width:0;cursor:pointer;" title="点击切换人设账号">
                        <div style="font-size:17px;font-weight:800;color:#0F1419;display:inline-flex;align-items:center;line-height:1.2;max-width:100%;">
                            <span style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${info.curName.replace(/</g, "&lt;")}</span>
                            ${ICO.v}
                            ${ICO.chevDown}
                        </div>
                        <div style="font-size:12px;color:#536471;margin-top:1px;">${(cfg.tweets || []).length + 1} 帖子</div>
                    </div>
                    <div id="x10-top-logo" class="x10-top-ico" title="回到顶部">${ICO.xTop}</div>
                    <input type="file" id="x10-bn-file" accept="image/*" style="position:fixed;left:-9999px;opacity:0;" />
                </div>

                <div class="x10-hero-grid">
                    <label class="x10-banner" for="x10-bn-file" style="${bannerBgStyle}" title="点击更换顶部横幅"></label>
                    <div class="x10-ava" id="x10-ava-btn" style="background-image:url('${safeAva}');" title="点击更换头像"></div>
                    <div class="x10-actions">
                        <span class="x10-circle-btn" id="x10-open-edit-modal" title="编辑主页资料">${ICO.dots}</span>
                        <span class="x10-circle-btn" id="x10-go-edit-tab" title="编写人设正文">${ICO.mail}</span>
                        <span class="x10-pill-btn" id="x10-btn-edit-modal">编辑个人资料</span>
                        <span class="x10-pill-btn ${isBound ? "dark" : ""}" id="x10-do-bind">${isBound ? "已绑定" : "绑定角色"}</span>
                    </div>
                </div>

                <div style="padding:8px 16px 14px 16px;background:#FFFFFF;">
                    <div style="font-size:20px;font-weight:800;color:#0F1419;display:flex;align-items:center;line-height:1.25;">
                        <span>${info.curName.replace(/</g, "&lt;")}</span>${ICO.v}
                    </div>
                    <div style="font-size:14px;color:#536471;margin-top:1px;">${handle.replace(/</g, "&lt;")}</div>
                    <div id="x10-bio-click" style="font-size:14.5px;color:#0F1419;line-height:1.5;margin-top:10px;white-space:pre-wrap;word-break:break-word;cursor:pointer;">${formatXText(cfg.bio)}</div>
                    <div id="x10-meta-click" style="display:flex;flex-wrap:wrap;column-gap:14px;row-gap:6px;margin-top:10px;font-size:13px;color:#536471;cursor:pointer;">
                        <span style="display:inline-flex;align-items:center;gap:4px;">${ICO.brief}<span>${(cfg.category || "Personal Archive").replace(/</g, "&lt;")}</span></span>
                        <span style="display:inline-flex;align-items:center;gap:4px;">${ICO.loc}<span>${(cfg.loc || "Seoul").replace(/</g, "&lt;")}</span></span>
                        <span style="display:inline-flex;align-items:center;gap:4px;">${ICO.link}<span style="color:#1D9BF0;">${(cfg.link || "persona.x.com").replace(/</g, "&lt;")}</span></span>
                        <span style="display:inline-flex;align-items:center;gap:4px;">${ICO.cal}<span>${(cfg.date || "2026年11月 加入").replace(/</g, "&lt;")}</span></span>
                    </div>
                    <div style="display:flex;gap:18px;margin-top:11px;font-size:13.5px;color:#536471;">
                        <span id="x10-do-bind-2" style="cursor:pointer;"><b style="color:#0F1419;font-weight:700;">1</b> 正在关注</span>
                        <span id="x10-flw-click" style="cursor:pointer;"><b style="color:#0F1419;font-weight:700;">${(cfg.followers || "52.0万").replace(/</g, "&lt;")}</b> 关注者</span>
                    </div>
                    <div style="display:flex;align-items:center;gap:7px;margin-top:10px;font-size:12.5px;color:#536471;">
                        <div style="width:18px;height:18px;border-radius:50%;background-image:url('${safeCharAva}');background-size:cover;background-position:center;border:1px solid #EFF3F4;flex-shrink:0;"></div>
                        <span>你绑定的角色 <b style="color:#0F1419;">${info.charName.replace(/</g, "&lt;")}</b> 正在关注此人设 (${isBound ? "已绑定" : "点击上方可绑定"})</span>
                    </div>
                </div>

                ${htmlBanner}

                <div class="x10-tabs">
                    <div class="x10-tab ${cfg.tab === "posts" ? "on" : ""}" data-xt="posts">帖子</div>
                    <div class="x10-tab ${cfg.tab === "edit" ? "on" : ""}" data-xt="edit">设定</div>
                    <div class="x10-tab ${cfg.tab === "media" ? "on" : ""}" data-xt="media">媒体</div>
                    <div class="x10-tab ${cfg.tab === "html" ? "on" : ""}" data-xt="html">美化</div>
                </div>

                <div>${bodyHtml}</div>

                <div class="x10-compose-fab" id="x10-fab-compose" title="发新帖子">${ICO.feather}</div>

                <div class="x10-modal-mask ${openState === "switch" ? "show" : ""}" id="x10-switch-modal">
                    <div style="width:100%;max-width:440px;max-height:80vh;overflow-y:auto;background:#FFFFFF;border-radius:16px;box-shadow:0 12px 36px rgba(0,0,0,0.22);">
                        <div style="display:flex;align-items:center;justify-content:space-between;padding:13px 16px;border-bottom:1px solid #EFF3F4;">
                            <span style="font-size:16px;font-weight:800;color:#0F1419;">切换人设账号 (${info.list.length})</span>
                            <span id="x10-sw-close" class="x10-top-ico" style="width:30px!important;height:30px!important;color:#0F1419;">${ICO.close}</span>
                        </div>
                        <div>${switcherListHtml}</div>
                        <div style="padding:12px 16px;display:flex;justify-content:center;">
                            <span class="x10-pill-btn dark" id="x10-sw-new" style="width:100%!important;box-sizing:border-box!important;">新建人设账号</span>
                        </div>
                    </div>
                </div>

                <div class="x10-modal-mask ${openState === "compose" ? "show" : ""}" id="x10-compose-modal">
                    <div style="width:100%;max-width:480px;max-height:86vh;overflow-y:auto;background:#FFFFFF;border-radius:16px;box-shadow:0 12px 36px rgba(0,0,0,0.22);display:flex;flex-direction:column;">
                        <div style="display:flex;align-items:center;justify-content:space-between;padding:12px 16px;">
                            <span id="x10-cm-close" style="font-size:15px;color:#0F1419;cursor:pointer;">取消</span>
                            <span class="x10-pill-btn blue ${canPost ? "" : "dim"}" id="x10-pub-btn" style="height:32px!important;padding:0 18px!important;font-size:14px!important;">发帖</span>
                        </div>
                        <div style="display:flex;gap:12px;padding:6px 16px 14px 16px;">
                            <div style="width:40px;height:40px;border-radius:50%;background-image:url('${safeAva}');background-size:cover;background-position:center;border:1px solid #EFF3F4;flex-shrink:0;"></div>
                            <div style="flex:1;min-width:0;">
                                <textarea id="x10-compose-txt" rows="4" placeholder="有什么新鲜事？" style="width:100%;border:none;outline:none;font-size:16.5px;color:#0F1419;background:#FFFFFF;resize:none;line-height:1.55;box-sizing:border-box;padding-top:4px;">${draftTxt.replace(/</g, "&lt;")}</textarea>
                                ${renderTweetImages(draftImgs, true)}
                            </div>
                        </div>
                        <div style="padding:0 16px 10px 68px;display:flex;align-items:center;gap:6px;color:#1D9BF0;font-size:13px;font-weight:700;">
                            ${ICO.globe}<span>所有人都可以回复</span>
                        </div>
                        <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 14px;border-top:1px solid #EFF3F4;">
                            <div style="display:flex;align-items:center;gap:4px;">
                                <label class="x10-tool-ico" title="添加照片（最多4张）">
                                    ${ICO.imgBlue}
                                    <input type="file" id="x10-draft-files" accept="image/*" multiple style="position:fixed;left:-9999px;opacity:0;" />
                                </label>
                                <span class="x10-tool-ico" id="x10-insert-hash" title="插入话题标签">#</span>
                            </div>
                            <div style="font-size:12px;color:#536471;font-family:monospace;">
                                ${draftImgs.length ? `图 ${draftImgs.length}/4 · ` : ""}<span id="x10-char-cnt">${draftTxt.length}</span> 字
                            </div>
                        </div>
                    </div>
                </div>

                <div class="x10-modal-mask ${openState === "edit" ? "show" : ""}" id="x10-edit-modal">
                    <div style="width:100%;max-width:460px;max-height:88vh;overflow-y:auto;background:#FFFFFF;border-radius:16px;box-shadow:0 12px 36px rgba(0,0,0,0.2);">
                        <div style="position:sticky;top:0;z-index:20;background:#FFFFFF;display:flex;align-items:center;justify-content:space-between;padding:10px 14px;border-bottom:1px solid #EFF3F4;">
                            <div style="display:flex;align-items:center;gap:12px;">
                                <span id="x10-em-close" class="x10-top-ico" style="width:30px!important;height:30px!important;color:#0F1419;">${ICO.close}</span>
                                <span style="font-size:17px;font-weight:800;color:#0F1419;">编辑个人资料</span>
                            </div>
                            <span class="x10-pill-btn dark" id="x10-em-save" style="height:30px!important;padding:0 16px!important;font-size:13px!important;">保存</span>
                        </div>
                        <div style="display:grid;grid-template-rows:96px 34px 38px;grid-template-columns:16px 72px 1fr 16px;background:#FFFFFF;margin-bottom:6px;">
                            <div style="grid-row:1/3;grid-column:1/5;${bannerBgStyle}background-size:cover;background-position:center;position:relative;display:flex;align-items:center;justify-content:center;gap:12px;">
                                <label for="x10-bn-file" class="x10-cam-overlay" title="从相册选横幅">${ICO.camWhite}</label>
                                <span id="x10-em-white-bn" class="x10-cam-overlay" style="width:auto!important;padding:0 12px!important;border-radius:99px!important;" title="设为纯白背景">纯白</span>
                                <span id="x10-em-reset-bn" class="x10-cam-overlay" title="恢复默认横幅">默认</span>
                            </div>
                            <div id="x10-em-ava-cam" style="grid-row:2/4;grid-column:2/3;z-index:10;width:72px;height:72px;border-radius:50%;background-image:url('${safeAva}');background-size:cover;background-position:center;border:3.5px solid #FFFFFF;box-sizing:border-box;display:flex;align-items:center;justify-content:center;position:relative;cursor:pointer;overflow:hidden;" title="更换头像">
                                <div style="position:absolute;inset:0;background:rgba(0,0,0,0.28);"></div>
                                <span style="position:relative;z-index:2;display:inline-flex;">${ICO.camWhite}</span>
                            </div>
                        </div>
                        <div style="padding:8px 16px 16px 16px;">
                            <div class="x10-field">
                                <div class="x10-field-lbl">横幅图片链接（留空或填 white 即纯白背景）</div>
                                <input type="text" id="x10-em-bnurl" class="x10-field-inp" value="${cfg.banner?.startsWith("data:") ? "[已使用本地相册横幅]" : (cfg.banner || "").replace(/"/g, "&quot;")}" />
                            </div>
                            <div class="x10-field">
                                <div class="x10-field-lbl">@账号名</div>
                                <input type="text" id="x10-em-handle" class="x10-field-inp" value="${handle.replace(/"/g, "&quot;")}" />
                            </div>
                            <div class="x10-field">
                                <div class="x10-field-lbl">个人简介 (Bio)</div>
                                <textarea id="x10-em-bio" class="x10-field-inp" rows="3" style="resize:none;">${(cfg.bio || "").replace(/</g, "&lt;")}</textarea>
                            </div>
                            <div class="x10-field">
                                <div class="x10-field-lbl">身份类别</div>
                                <input type="text" id="x10-em-cat" class="x10-field-inp" value="${(cfg.category || "").replace(/"/g, "&quot;")}" />
                            </div>
                            <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
                                <div class="x10-field">
                                    <div class="x10-field-lbl">位置</div>
                                    <input type="text" id="x10-em-loc" class="x10-field-inp" value="${(cfg.loc || "").replace(/"/g, "&quot;")}" />
                                </div>
                                <div class="x10-field">
                                    <div class="x10-field-lbl">关注者数量</div>
                                    <input type="text" id="x10-em-flw" class="x10-field-inp" value="${(cfg.followers || "").replace(/"/g, "&quot;")}" />
                                </div>
                            </div>
                            <div class="x10-field" style="margin-bottom:4px!important;">
                                <div class="x10-field-lbl">当前酒馆底层人设设定</div>
                                <textarea id="x10-em-desc" class="x10-field-inp" rows="6" style="line-height:1.6;">${(info.curDesc || "").replace(/</g, "&lt;")}</textarea>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        topDoc.getElementById("x10-close").onclick = () => overlay.classList.remove("open");
        topDoc.getElementById("x10-top-logo").onclick = () => topDoc.getElementById("x10-shell-el")?.scrollTo({ top: 0, behavior: "smooth" });
        overlay.onclick = (e) => { if (e.target === overlay) overlay.classList.remove("open"); };

        const swModal = topDoc.getElementById("x10-switch-modal");
        topDoc.getElementById("x10-open-sw").onclick = () => swModal?.classList.add("show");
        topDoc.getElementById("x10-sw-close").onclick = () => swModal?.classList.remove("show");
        swModal.onclick = (e) => { if (e.target === swModal) swModal.classList.remove("show"); };
        swModal.querySelectorAll("[data-swidx]").forEach((el) => {
            el.onclick = () => {
                const target = info.list[Number(el.getAttribute("data-swidx"))];
                swModal.classList.remove("show");
                switchPersonaReal(target);
            };
        });
        topDoc.getElementById("x10-sw-new").onclick = () => {
            swModal.classList.remove("show");
            clickNative(["#create_dummy_persona", "#add_persona_button", ".fa-plus"]);
            setTimeout(() => renderX(""), 450);
        };

        const cmModal = topDoc.getElementById("x10-compose-modal");
        topDoc.getElementById("x10-fab-compose").onclick = () => {
            cmModal?.classList.add("show");
            setTimeout(() => topDoc.getElementById("x10-compose-txt")?.focus(), 40);
        };
        topDoc.getElementById("x10-cm-close").onclick = () => cmModal?.classList.remove("show");
        cmModal.onclick = (e) => { if (e.target === cmModal) cmModal.classList.remove("show"); };

        const cmTxt = topDoc.getElementById("x10-compose-txt");
        const pubBtn = topDoc.getElementById("x10-pub-btn");
        const cntEl = topDoc.getElementById("x10-char-cnt");
        if (cmTxt) {
            cmTxt.oninput = (e) => {
                draftTxt = e.target.value;
                if (cntEl) cntEl.textContent = String(draftTxt.length);
                if (pubBtn) pubBtn.classList.toggle("dim", !(draftTxt.trim() || draftImgs.length > 0));
            };
        }
        topDoc.getElementById("x10-insert-hash").onclick = () => {
            draftTxt = (draftTxt ? draftTxt + " #" : "#");
            if (cmTxt) { cmTxt.value = draftTxt; cmTxt.focus(); cmTxt.oninput({ target: cmTxt }); }
        };
        topDoc.getElementById("x10-draft-files").onchange = async (e) => {
            const files = Array.from(e.target.files || []);
            for (const f of files) {
                if (draftImgs.length >= 4) break;
                draftImgs.push(await compressImg(f, 700));
            }
            e.target.value = "";
            renderX("compose");
        };
        overlay.querySelectorAll("[data-rmdraft]").forEach((b) => {
            b.onclick = () => { draftImgs.splice(Number(b.getAttribute("data-rmdraft")), 1); renderX("compose"); };
        });
        pubBtn.onclick = () => {
            const txt = (topDoc.getElementById("x10-compose-txt")?.value || "").trim();
            if (!txt && !draftImgs.length) return;
            const c = loadCfg(), now = new Date();
            c.tweets.unshift(Object.assign({
                id: Date.now(), txt, imgs: draftImgs.slice(0, 4),
                date: `${now.getMonth() + 1}月${now.getDate()}日`, liked: false
            }, genViralStats()));
            if (c.tab !== "posts" && c.tab !== "media") c.tab = "posts";
            saveCfg(c); draftTxt = ""; draftImgs = []; renderX("");
        };

        overlay.querySelectorAll("[data-deltw]").forEach((b) => {
            b.onclick = (e) => {
                e.stopPropagation();
                const c = loadCfg();
                c.tweets = (c.tweets || []).filter((t) => Number(t.id) !== Number(b.getAttribute("data-deltw")));
                saveCfg(c); renderX("");
            };
        });
        overlay.querySelectorAll("[data-liketw]").forEach((b) => {
            b.onclick = (e) => {
                e.stopPropagation();
                const c = loadCfg();
                const tw = (c.tweets || []).find((t) => Number(t.id) === Number(b.getAttribute("data-liketw")));
                if (tw) { tw.liked = !tw.liked; tw.likes = (Number(tw.likes) || 38400) + (tw.liked ? 1 : -1); saveCfg(c); renderX(""); }
            };
        });

        const bnInput = topDoc.getElementById("x10-bn-file");
        bnInput.onchange = async (e) => {
            const f = e.target.files?.[0]; if (!f) return;
            const isModal = topDoc.getElementById("x10-edit-modal")?.classList.contains("show");
            const c = loadCfg(); c.banner = await compressImg(f, 960); saveCfg(c);
            e.target.value = ""; renderX(isModal ? "edit" : "");
        };
        topDoc.getElementById("x10-em-white-bn").onclick = () => { const c = loadCfg(); c.banner = "white"; saveCfg(c); renderX("edit"); };
        topDoc.getElementById("x10-em-reset-bn").onclick = () => { const c = loadCfg(); c.banner = DEF_BANNER; saveCfg(c); renderX("edit"); };
        topDoc.getElementById("x10-ava-btn").onclick = () => clickNative(["#your_avatar_button", "#upload_avatar_button"]);
        topDoc.getElementById("x10-em-ava-cam").onclick = () => clickNative(["#your_avatar_button", "#upload_avatar_button"]);

        const emModal = topDoc.getElementById("x10-edit-modal");
        const openEditModal = () => emModal?.classList.add("show");
        ["x10-btn-edit-modal", "x10-open-edit-modal", "x10-bio-click", "x10-meta-click", "x10-flw-click"].forEach((id) => {
            topDoc.getElementById(id).onclick = openEditModal;
        });
        topDoc.getElementById("x10-em-close").onclick = () => emModal?.classList.remove("show");
        emModal.onclick = (e) => { if (e.target === emModal) emModal.classList.remove("show"); };
        topDoc.getElementById("x10-em-save").onclick = () => {
            const c = loadCfg();
            const urlVal = topDoc.getElementById("x10-em-bnurl").value.trim();
            if (urlVal === "" || urlVal.toLowerCase() === "white") c.banner = "white";
            else if (urlVal !== "[已使用本地相册横幅]") c.banner = urlVal;
            c.handle = topDoc.getElementById("x10-em-handle").value.trim();
            c.bio = topDoc.getElementById("x10-em-bio").value;
            c.category = topDoc.getElementById("x10-em-cat").value.trim();
            c.loc = topDoc.getElementById("x10-em-loc").value.trim();
            c.followers = topDoc.getElementById("x10-em-flw").value.trim();
            saveCfg(c);
            const nd = topDoc.getElementById("persona_description");
            if (nd) { nd.value = topDoc.getElementById("x10-em-desc").value; nd.dispatchEvent(new Event("input", { bubbles: true })); nd.dispatchEvent(new Event("change", { bubbles: true })); }
            emModal?.classList.remove("show"); renderX("");
        };

        const doBind = () => { clickNative(["#persona_lock_button", "#lock_user_name", ".persona_lock_icon"]); setTimeout(() => renderX(""), 200); };
        topDoc.getElementById("x10-do-bind").onclick = doBind;
        topDoc.getElementById("x10-do-bind-2").onclick = doBind;

        const goEditTab = () => { const c = loadCfg(); c.tab = "edit"; saveCfg(c); renderX(""); };
        topDoc.getElementById("x10-go-edit-tab").onclick = goEditTab;
        topDoc.getElementById("x10-pin-tweet")?.addEventListener("click", goEditTab);

        overlay.querySelectorAll("[data-xt]").forEach((t) => t.onclick = () => { const c = loadCfg(); c.tab = t.getAttribute("data-xt"); saveCfg(c); renderX(""); });

        const area = topDoc.getElementById("x10-desc-area");
        if (area) {
            area.oninput = () => {
                const nd = topDoc.getElementById("persona_description");
                if (nd) { nd.value = area.value; nd.dispatchEvent(new Event("input", { bubbles: true })); nd.dispatchEvent(new Event("change", { bubbles: true })); }
            };
        }
        topDoc.getElementById("x10-act-ava")?.addEventListener("click", () => clickNative(["#your_avatar_button", "#upload_avatar_button"]));
        topDoc.getElementById("x10-act-ren")?.addEventListener("click", () => { clickNative(["#your_name_button", "#persona_rename_button", ".fa-pencil"]); setTimeout(() => renderX(""), 400); });
        topDoc.getElementById("x10-act-dup")?.addEventListener("click", () => { clickNative(["#duplicate_persona_button", ".fa-clone"]); setTimeout(() => renderX(""), 400); });
        topDoc.getElementById("x10-act-def")?.addEventListener("click", () => { clickNative(["#default_persona_button", ".fa-crown"]); setTimeout(() => renderX(""), 200); });
        topDoc.getElementById("x10-act-del")?.addEventListener("click", () => { clickNative(["#delete_persona_button", ".fa-trash"]); setTimeout(() => renderX(""), 400); });
        topDoc.getElementById("x10-depth")?.addEventListener("change", (e) => {
            if (nativeDepthInp) { nativeDepthInp.value = e.target.value; nativeDepthInp.dispatchEvent(new Event("input", { bubbles: true })); nativeDepthInp.dispatchEvent(new Event("change", { bubbles: true })); }
        });

        topDoc.getElementById("x10-h-file")?.addEventListener("change", (e) => {
            const f = e.target.files?.[0]; if (!f) return;
            const r = new FileReader();
            r.onload = (ev) => {
                topDoc.getElementById("x10-h-code").value = String(ev.target?.result || "");
                topDoc.getElementById("x10-h-chk").checked = true;
                topDoc.getElementById("x10-h-full").checked = true;
            };
            r.readAsText(f); e.target.value = "";
        });
        topDoc.getElementById("x10-h-save")?.addEventListener("click", () => {
            const c = loadCfg();
            c.useHtml = topDoc.getElementById("x10-h-chk").checked;
            c.fullPageHtml = topDoc.getElementById("x10-h-full").checked;
            c.html = topDoc.getElementById("x10-h-code").value;
            c.css = topDoc.getElementById("x10-c-code").value;
            saveCfg(c); renderX("");
        });
    }

    function openModal() {
        const nd = topDoc.querySelector("#persona-management-button .drawer-content");
        if (nd && nd.classList.contains("closedDrawer")) topDoc.querySelector("#persona-management-button .drawer-icon")?.click();
        overlay.classList.add("open");
        setTimeout(() => renderX(""), 80);
    }

    // ── 自动挂载到你原有 App 主页 (#smt-page-home) 的应用图标网格中 ──
    function mountIntoSumoulApp() {
        const homePage = topDoc.getElementById("smt-page-home");
        if (!homePage) { setTimeout(mountIntoSumoulApp, 300); return; }

        const existingItem = homePage.querySelector(".ab-app-item");
        if (!existingItem || !existingItem.parentElement) { setTimeout(mountIntoSumoulApp, 300); return; }
        if (topDoc.getElementById("ab-app-xpersona")) return;

        // 克隆现有 App 图标节点以 100% 继承你原本的主页网格样式
        const appTile = existingItem.cloneNode(true);
        appTile.id = "ab-app-xpersona";
        appTile.setAttribute("data-app", "xpersona");

        // 替换图标、标题、韩文副标与角标
        const svgEl = appTile.querySelector("svg");
        if (svgEl) svgEl.outerHTML = ICO.xApp;
        const zhEl = appTile.querySelector(".ab-app-title");
        if (zhEl) zhEl.textContent = "X 人设";
        const krEl = appTile.querySelector(".ab-app-kr");
        if (krEl) krEl.textContent = "프로필 · X";
        const badgeEl = appTile.querySelector(".ab-app-floating-badge");
        if (badgeEl) badgeEl.textContent = `${scanPersonas().list.length}人设`;

        appTile.onclick = (e) => {
            e.stopImmediatePropagation();
            e.preventDefault();
            openModal();
        };
        existingItem.parentElement.appendChild(appTile);
    }

    mountIntoSumoulApp();
    // 保留酒馆顶栏 User 图标同步触发入口
    topDoc.getElementById("persona-management-button")?.addEventListener("click", () => setTimeout(openModal, 80));
})();
// ==========================================================================
// 🖼️ 【User 头像直传与同步修复补丁：解决点击头像无法唤起相册 & 原生裁剪框被遮挡问题】
// 用法：直接粘贴在 index.js 最末尾（或放入 modules 文件夹加载）即可生效！
// ==========================================================================
(function () {
    let topWin = window, topDoc = document;
    try {
        if (window.parent && window.parent.document) { topWin = window.parent; topDoc = window.parent.document; }
    } catch (e) {}

    const AVA_OVERRIDE_KEY = "st_x10_custom_ava_map_v1";

    // 1. 提升酒馆原生头像裁剪弹窗的层级，防止被 X 主页遮挡
    topDoc.getElementById("st-x10-ava-fix-css")?.remove();
    const fixCss = topDoc.createElement("style");
    fixCss.id = "st-x10-ava-fix-css";
    fixCss.innerHTML = `
        /* 确保酒馆原生图片裁剪框、确认弹窗永远高于 X 主页 */
        .popup, .popup-body, dialog.popup, #dialogue_popup, #cropper_modal, .cropper-container {
            z-index: 2147483647 !important;
        }
    `;
    topDoc.head.appendChild(fixCss);

    function loadAvaMap() {
        try { return JSON.parse(localStorage.getItem(AVA_OVERRIDE_KEY) || "{}"); } catch (e) { return {}; }
    }
    function saveAvaMap(m) {
        try { localStorage.setItem(AVA_OVERRIDE_KEY, JSON.stringify(m)); } catch (e) {}
    }

    function getCurrentPersonaId() {
        const sel = topDoc.querySelector("#user_avatar_block .avatar-container.selected, #user_avatar_block .avatar_container.selected, #user_avatar_block .avatar.selected");
        const avaEl = sel?.querySelector?.(".avatar") || sel;
        return avaEl?.getAttribute?.("imgfile") || avaEl?.getAttribute?.("data-avatar-id") || topDoc.querySelector("#your_name")?.value || "default_user";
    }

    // 压缩头像为高清正方图
    function compressAvatar(file, size = 420) {
        return new Promise((res) => {
            const r = new FileReader();
            r.onload = (ev) => {
                const img = new Image();
                img.onload = () => {
                    const c = topDoc.createElement("canvas");
                    c.width = size; c.height = size;
                    const ctx = c.getContext("2d");
                    const minSide = Math.min(img.width, img.height);
                    const sx = (img.width - minSide) / 2;
                    const sy = (img.height - minSide) / 2;
                    ctx.drawImage(img, sx, sy, minSide, minSide, 0, 0, size, size);
                    res(c.toDataURL("image/png", 0.9));
                };
                img.src = String(ev.target?.result || "");
            };
            r.readAsDataURL(file);
        });
    }

    // 尝试将新头像同步上传给酒馆底层原生 input[type="file"]
    function syncToNativeTavernInput(file) {
        try {
            const nativeFileInp = topDoc.querySelector("#avatar_upload_file, input[type='file'][name='avatar'], #user_avatar_block input[type='file']");
            if (nativeFileInp && file) {
                const dt = new DataTransfer();
                dt.items.add(file);
                nativeFileInp.files = dt.files;
                nativeFileInp.dispatchEvent(new Event("change", { bubbles: true }));
            }
        } catch (e) {}
    }

    // 实时把页面上所有当前 User 头像（含 X 主页大头像、推文小头像、酒馆原生选中头像）刷新为新头像
    function applyCustomAvatarToDOM() {
        const pId = getCurrentPersonaId();
        const customUrl = loadAvaMap()[pId];
        if (!customUrl) return;

        const safe = customUrl.replace(/'/g, "\\'");
        const mainAva = topDoc.getElementById("x10-ava-btn");
        if (mainAva) mainAva.style.backgroundImage = `url('${safe}')`;

        const emAva = topDoc.getElementById("x10-em-ava-cam");
        if (emAva) emAva.style.backgroundImage = `url('${safe}')`;

        topDoc.querySelectorAll("#st-x10-overlay .x10-tweet > div:first-child").forEach((el) => {
            if (el.style?.backgroundImage) el.style.backgroundImage = `url('${safe}')`;
        });

        const nativeSelImg = topDoc.querySelector("#user_avatar_block .selected img, #your_avatar_button img");
        if (nativeSelImg) nativeSelImg.src = customUrl;
    }

    // 创建真实可点击的文件上传器（100% 不会被手机浏览器拦截）
    topDoc.getElementById("st-x10-real-ava-input")?.remove();
    const realInp = topDoc.createElement("input");
    realInp.type = "file";
    realInp.id = "st-x10-real-ava-input";
    realInp.accept = "image/*";
    realInp.style.cssText = "position:fixed;left:-9999px;top:-9999px;opacity:0;";
    topDoc.body.appendChild(realInp);

    realInp.onchange = async (e) => {
        const f = e.target.files?.[0];
        if (!f) return;
        const dataUrl = await compressAvatar(f, 420);
        const pId = getCurrentPersonaId();
        const map = loadAvaMap();
        map[pId] = dataUrl;
        saveAvaMap(map);

        // 1. 立即无裁剪秒换 X 主页与当前头像显示
        applyCustomAvatarToDOM();
        // 2. 同步塞给酒馆底层上传器
        syncToNativeTavernInput(f);
        e.target.value = "";
    };

    // 捕获拦截 X 主页里所有换头像按钮点击，直接拉起真实相册
    topDoc.addEventListener("click", (e) => {
        const t = e.target.closest("#x10-ava-btn, #x10-em-ava-cam, #x10-act-ava");
        if (t) {
            e.stopImmediatePropagation();
            e.preventDefault();
            realInp.click();
        }
    }, true);

    // 监听 X 主页每次渲染与切换人设，自动贴上对应人设的最新头像
    const obs = new MutationObserver(() => applyCustomAvatarToDOM());
    obs.observe(topDoc.body, { childList: true, subtree: true });
})();
// ==========================================================================
// 🐾 【输入框粘附小麻薯团子 v4.2 · 极简零截断完整版】
// 1.直接挂在 #send_form 内(bottom:100%)，打字/弹键盘永不消失 2.外显名字标 3.点击弹6格养成菜单 4.打字拍爪+关键词吐槽
// ==========================================================================
(function () {
    let topWin = window, topDoc = document;
    try { if (window.parent && window.parent.document) { topWin = window.parent; topDoc = window.parent.document; } } catch (e) {}

    const KEY = "st_mochi_v42";
    ["st-bongo-pet-css", "st-bongo-pet-root", "st-mochi-v4-css", "st-mochi-v4-host", "st-mochi-v4-modal"].forEach((id) => {
        try { topDoc.getElementById(id)?.remove(); } catch (e) {}
    });

    const SKINS = [
        { id: "cat", sp: "牛奶喵", nm: "奶团", f: "#FFF", s: "#4E4244", e: "#FFD8E2", c: "#FFAEC0", w: ["喵呜~ 爪子借你按键盘🐾", "蹭蹭大拇指~", "今天会写出超甜剧情哦🤍"] },
        { id: "pup", sp: "小奶狗", nm: "小豆", f: "#FFF", s: "#4E4244", e: "#E5C19E", c: "#FFB0C0", w: ["汪呜！尾巴摇成风扇~", "小狗永远偏向你🐶", "摸摸我充充电！"] },
        { id: "bun", sp: "垂耳兔", nm: "雪球", f: "#FFF", s: "#4E4244", e: "#FFD4E0", c: "#FFA8BC", w: ["耳朵竖起来偷听🐰", "变成一滩兔兔饼~", "啾啾！今天也要被偏爱"] },
        { id: "blk", sp: "黑煤球", nm: "芝麻", f: "#363438", s: "#1E1C20", e: "#EAA0B0", c: "#FF98AE", eye: "#FFE880", w: ["暗中观察你们说悄悄话👀", "输入框归本喵罩着！", "喵~ 贴贴不收钱✨"] }
    ];
    const FOODS = ["🍓 吞掉草莓大福！甜度拉满~", "🍮 像布丁一样晃脑袋~", "🐟 咔嚓吃完小鱼干，精神百倍！", "🧋 吨吨喝完奶茶，打了个奶嗝~"];
    const LUCKS = ["🎲 贴贴运势：SSR！TA心里全是你🤍", "🎲 触发隐藏动作：翻肚皮求挠下巴~", "🎲 灵感爆发！下一句回复绝对超甜✨", "🎲 偷偷往你口袋塞了一颗好运糖🍬"];

    function load() {
        try { return Object.assign({ idx: 0, sz: 46, rPct: 10, nms: {}, taps: 0, feeds: 0 }, JSON.parse(localStorage.getItem(KEY) || "{}")); }
        catch (e) { return { idx: 0, sz: 46, rPct: 10, nms: {}, taps: 0, feeds: 0 }; }
    }
    function save(c) { try { localStorage.setItem(KEY, JSON.stringify(c)); } catch (e) {} }
    function getNm(c, sk) { return (c.nms && c.nms[sk.id]) || sk.nm; }
    function getLv(c) { return Math.max(1, Math.floor(((c.taps || 0) + (c.feeds || 0) * 25) / 60) + 1); }

    const st = topDoc.createElement("style");
    st.id = "st-mochi-v4-css";
    st.innerHTML = `
        @keyframes m4Sq { 0%,100%{transform:translateY(0) scale(1,1)} 50%{transform:translateY(0.8px) scale(1.03,0.96)} }
        @keyframes m4Bk { 0%,92%,100%{transform:scaleY(1)} 96%{transform:scaleY(0.08)} }
        @keyframes m4Jp { 0%,100%{transform:translateY(0)} 40%{transform:translateY(-6px) scale(0.95,1.06)} }
        #send_form, #form_sheld, #bottom-bar { overflow: visible !important; }
        #st-mochi-v4-host {
            position: absolute !important; bottom: calc(100% - 4px) !important; z-index: 2147483640 !important;
            display: flex !important; flex-direction: column !important; align-items: center !important;
            pointer-events: auto !important; user-select: none !important;
            font-family: -apple-system, BlinkMacSystemFont, "PingFang SC", sans-serif !important;
        }
        #st-mochi-v4-host .m4-body { transform-origin: 50px 44px; animation: m4Sq 2.4s ease-in-out infinite; }
        #st-mochi-v4-host.typing .m4-body { transform: translateY(1.8px) scale(1.06,0.92) !important; animation: none !important; }
        #st-mochi-v4-host.happy .m4-body { animation: m4Jp 0.4s ease infinite !important; }
        #st-mochi-v4-host .m4-ey-o { transform-origin: 50px 37px; animation: m4Bk 4s infinite; }
        #st-mochi-v4-host .m4-ey-h { display: none; }
        #st-mochi-v4-host.happy .m4-ey-o { display: none !important; }
        #st-mochi-v4-host.happy .m4-ey-h { display: block !important; }
        #st-mochi-v4-host .m4-pl, #st-mochi-v4-host .m4-pr { transition: transform 0.04s ease !important; }
        #st-mochi-v4-host.paw-l .m4-pl { transform: translateY(6px) scale(1.1,0.85) !important; }
        #st-mochi-v4-host.paw-r .m4-pr { transform: translateY(6px) scale(1.1,0.85) !important; }
        #st-mochi-v4-host .m4-tag {
            margin-top: -3px !important; padding: 1px 6px !important; border-radius: 99px !important;
            background: rgba(255,255,255,0.95) !important; border: 1px solid #EAE0E3 !important;
            font-size: 9px !important; font-weight: 700 !important; color: #4E4244 !important;
            white-space: nowrap !important; box-shadow: 0 1px 4px rgba(0,0,0,0.06) !important; cursor: pointer !important;
        }
        #st-mochi-v4-host .m4-bub {
            position: absolute !important; bottom: calc(100% + 4px) !important; right: 0 !important;
            background: rgba(255,255,255,0.97) !important; border: 1px solid #EFE4E7 !important;
            border-radius: 11px !important; padding: 4px 9px !important; font-size: 10.5px !important;
            font-weight: 600 !important; color: #3D3235 !important; white-space: nowrap !important;
            box-shadow: 0 4px 12px rgba(0,0,0,0.08) !important; opacity: 0 !important; pointer-events: none !important;
            transition: opacity 0.15s ease !important; z-index: 25 !important;
        }
        #st-mochi-v4-host .m4-bub.show { opacity: 1 !important; }
        #st-mochi-v4-host .m4-pan {
            position: absolute !important; bottom: calc(100% + 6px) !important; right: 0 !important;
            width: 158px !important; background: rgba(255,255,255,0.98) !important; border: 1px solid #EAE0E3 !important;
            border-radius: 13px !important; padding: 7px !important; box-shadow: 0 8px 22px rgba(0,0,0,0.13) !important;
            display: none; flex-direction: column !important; gap: 5px !important; z-index: 35 !important;
        }
        #st-mochi-v4-host .m4-pan.open { display: flex !important; }
        #st-mochi-v4-host .m4-grid { display: grid !important; grid-template-columns: 1fr 1fr !important; gap: 4px !important; }
        #st-mochi-v4-host .m4-btn {
            background: #FAF7F8 !important; border: 1px solid #EFE6E9 !important; border-radius: 7px !important;
            padding: 4px 2px !important; font-size: 10px !important; font-weight: 600 !important;
            color: #4A3E40 !important; text-align: center !important; cursor: pointer !important;
        }
        #st-mochi-v4-host .m4-btn:active { background: #F2E4E8 !important; }
    `;
    topDoc.head.appendChild(st);

    function drawSvg(sk) {
        const f = sk.f, s = sk.s, e = sk.e, ck = sk.c, ey = sk.eye || s;
        let ears = `<path d="M26 26 Q23 14 32 18" fill="${f}" stroke="${s}" stroke-width="2.4" stroke-linecap="round"/><path d="M74 26 Q77 14 68 18" fill="${f}" stroke="${s}" stroke-width="2.4" stroke-linecap="round"/><circle cx="28" cy="21" r="2" fill="${e}"/><circle cx="72" cy="21" r="2" fill="${e}"/>`;
        if (sk.id === "pup") ears = `<path d="M26 24 C16 23,14 35,21 37 C25 38,26 31,26 26 Z" fill="${e}" stroke="${s}" stroke-width="2.3"/><path d="M74 24 C84 23,86 35,79 37 C75 38,74 31,74 26 Z" fill="${e}" stroke="${s}" stroke-width="2.3"/>`;
        if (sk.id === "bun") ears = `<ellipse cx="38" cy="15" rx="4.5" ry="9" transform="rotate(-12 38 15)" fill="${f}" stroke="${s}" stroke-width="2.3"/><ellipse cx="62" cy="15" rx="4.5" ry="9" transform="rotate(12 62 15)" fill="${f}" stroke="${s}" stroke-width="2.3"/>`;
        return `<svg viewBox="0 0 100 56" style="width:100%;height:100%;overflow:visible;display:block;filter:drop-shadow(0 2px 4px rgba(0,0,0,0.09));">
            <g class="m4-body">${ears}
                <path d="M21 46 C17 28,28 18,50 18 C72 18,83 28,79 46 Z" fill="${f}" stroke="${s}" stroke-width="2.4"/>
                <ellipse cx="33" cy="39" rx="4.2" ry="2.2" fill="${ck}" opacity="0.85"/><ellipse cx="67" cy="39" rx="4.2" ry="2.2" fill="${ck}" opacity="0.85"/>
                <g class="m4-ey-o"><circle cx="40" cy="36.5" r="2.5" fill="${ey}"/><circle cx="39.2" cy="35.6" r="0.8" fill="#FFF"/><circle cx="60" cy="36.5" r="2.5" fill="${ey}"/><circle cx="59.2" cy="35.6" r="0.8" fill="#FFF"/></g>
                <g class="m4-ey-h"><path d="M37 37 Q40 34 43 37" fill="none" stroke="${s}" stroke-width="2.2" stroke-linecap="round"/><path d="M57 37 Q60 34 63 37" fill="none" stroke="${s}" stroke-width="2.2" stroke-linecap="round"/></g>
                <path d="M47.2 38.2 Q48.6 40.2 50 38.5 Q51.4 40.2 52.8 38.2" fill="none" stroke="${s}" stroke-width="1.9" stroke-linecap="round"/>
            </g>
            <g class="m4-pl"><ellipse cx="35" cy="46.5" rx="5.5" ry="4" fill="${f}" stroke="${s}" stroke-width="2.2"/></g>
            <g class="m4-pr"><ellipse cx="65" cy="46.5" rx="5.5" ry="4" fill="${f}" stroke="${s}" stroke-width="2.2"/></g>
        </svg>`;
    }

    const host = topDoc.createElement("div");
    host.id = "st-mochi-v4-host";

    let bTimer = null, hTimer = null;
    function say(txt, ms = 2200) {
        const b = topDoc.getElementById("m4-bub-el");
        if (!b) return;
        b.textContent = txt; b.classList.add("show");
        if (bTimer) clearTimeout(bTimer);
        bTimer = setTimeout(() => b.classList.remove("show"), ms);
    }
    function cheer() {
        host.classList.add("happy");
        if (hTimer) clearTimeout(hTimer);
        hTimer = setTimeout(() => host.classList.remove("happy"), 850);
    }

    function openRename() {
        topDoc.getElementById("st-mochi-v4-modal")?.remove();
        const c = load(), sk = SKINS[c.idx % SKINS.length], cur = getNm(c, sk);
        const md = topDoc.createElement("div");
        md.id = "st-mochi-v4-modal";
        md.style.cssText = "position:fixed;inset:0;z-index:2147483647;background:rgba(0,0,0,0.35);display:flex;align-items:center;justify-content:center;padding:16px;";
        md.innerHTML = `<div style="width:250px;background:#FFF;border-radius:16px;padding:15px;text-align:center;box-shadow:0 10px 28px rgba(0,0,0,0.18);">
            <div style="font-size:13px;font-weight:800;color:#3D3235;margin-bottom:8px;">🐾 给${sk.sp}取名字</div>
            <input id="m4-ren-inp" value="${cur.replace(/"/g, "&quot;")}" maxlength="8" style="width:100%;height:32px;border:1px solid #E5D8DC;border-radius:8px;text-align:center;font-size:13px;margin-bottom:10px;box-sizing:border-box;outline:none;"/>
            <div style="display:flex;gap:8px;">
                <span id="m4-r-no" style="flex:1;padding:6px;border-radius:99px;background:#F5F0F2;font-size:12px;cursor:pointer;">取消</span>
                <span id="m4-r-ok" style="flex:1;padding:6px;border-radius:99px;background:#3D3235;color:#FFF;font-size:12px;font-weight:700;cursor:pointer;">保存</span>
            </div>
        </div>`;
        topDoc.body.appendChild(md);
        topDoc.getElementById("m4-r-no").onclick = () => md.remove();
        topDoc.getElementById("m4-r-ok").onclick = () => {
            const v = (topDoc.getElementById("m4-ren-inp").value || "").trim();
            if (v) { c.nms = c.nms || {}; c.nms[sk.id] = v; save(c); render(false); cheer(); say(`以后叫我「${v}」啦🤍`); }
            md.remove();
        };
    }

    function render(keepOpen = false) {
        const c = load(), sk = SKINS[c.idx % SKINS.length], nm = getNm(c, sk), lv = getLv(c);
        const w = Number(c.sz) || 46, h = Math.round(w * 0.58);
        host.style.right = `${c.rPct ?? 10}%`;

        host.innerHTML = `
            <div class="m4-bub" id="m4-bub-el"></div>
            <div class="m4-pan ${keepOpen ? "open" : ""}" id="m4-pan-el">
                <div style="display:flex;justify-content:space-between;font-size:10.5px;font-weight:800;color:#3D3235;padding-bottom:3px;border-bottom:1px solid #F2EAEC;">
                    <span>${nm.replace(/</g, "&lt;")} · Lv.${lv}</span>
                    <span style="color:#998A8E;font-family:monospace;">🐾${c.taps || 0}</span>
                </div>
                <div class="m4-grid">
                    <div class="m4-btn" id="m4-b-feed">🍓 喂甜品</div>
                    <div class="m4-btn" id="m4-b-luck">🎲 抽运势</div>
                    <div class="m4-btn" id="m4-b-skin">🐾 换萌宠</div>
                    <div class="m4-btn" id="m4-b-name">✏️ 改名字</div>
                    <div class="m4-btn" id="m4-b-pos">↔ 挪位置</div>
                    <div class="m4-btn" id="m4-b-sz">🔍 调大小</div>
                </div>
            </div>
            <div id="m4-pet-clk" style="width:${w}px;height:${h}px;cursor:pointer;">${drawSvg(sk)}</div>
            <div class="m4-tag" id="m4-tag-clk">${nm.replace(/</g, "&lt;")} <span style="color:#A69398;">Lv.${lv}</span></div>
        `;

        topDoc.getElementById("m4-pet-clk").onclick = (e) => {
            e.stopPropagation();
            const p = topDoc.getElementById("m4-pan-el");
            const show = !p.classList.contains("open");
            p.classList.toggle("open", show);
            cheer();
            if (show) say(`${nm}：${sk.w[Math.floor(Math.random() * sk.w.length)]}`);
        };
        topDoc.getElementById("m4-tag-clk").onclick = (e) => { e.stopPropagation(); openRename(); };
        topDoc.getElementById("m4-b-name").onclick = (e) => { e.stopPropagation(); openRename(); };
        topDoc.getElementById("m4-b-feed").onclick = (e) => {
            e.stopPropagation();
            const c2 = load(); c2.feeds = (c2.feeds || 0) + 1; save(c2);
            render(false); cheer();
            say(FOODS[Math.floor(Math.random() * FOODS.length)], 2600);
        };
        topDoc.getElementById("m4-b-luck").onclick = (e) => {
            e.stopPropagation();
            topDoc.getElementById("m4-pan-el")?.classList.remove("open");
            cheer(); say(LUCKS[Math.floor(Math.random() * LUCKS.length)], 2800);
        };
        topDoc.getElementById("m4-b-skin").onclick = (e) => {
            e.stopPropagation();
            const c2 = load(); c2.idx = ((c2.idx || 0) + 1) % SKINS.length; save(c2);
            render(true); cheer();
            const ns = SKINS[c2.idx]; say(`变身：${getNm(c2, ns)} (${ns.sp})！`);
        };
        topDoc.getElementById("m4-b-pos").onclick = (e) => {
            e.stopPropagation();
            const c2 = load(), list = [8, 28, 50, 72];
            const cur = list.indexOf(c2.rPct);
            c2.rPct = list[(cur + 1) % list.length]; save(c2); render(true);
        };
        topDoc.getElementById("m4-b-sz").onclick = (e) => {
            e.stopPropagation();
            const c2 = load(), szs = [38, 46, 56];
            c2.sz = szs[(szs.indexOf(c2.sz) + 1) % szs.length]; save(c2); render(true);
        };
    }

    // 核心：直接挂载进当前输入框父容器内部，随输入框一体升降，打字100%永不消失！
    function ensureMounted() {
        const wxBar = topDoc.querySelector("#seoul-mini-theater-modal #wx-chat-input")?.parentElement;
        const stForm = topDoc.getElementById("send_form") || topDoc.getElementById("send_textarea")?.parentElement;
        const target = (wxBar && wxBar.offsetParent !== null) ? wxBar : stForm;
        if (target && host.parentElement !== target) {
            const pos = topWin.getComputedStyle(target).position;
            if (pos === "static") target.style.position = "relative";
            target.style.overflow = "visible";
            target.appendChild(host);
            render(false);
        }
    }

    let paw = "l", pTimer = null, combo = 0, cTimer = null;
    function slap(txtVal = "") {
        ensureMounted();
        host.classList.add(paw === "l" ? "paw-l" : "paw-r", "typing");
        host.classList.remove(paw === "l" ? "paw-r" : "paw-l");
        paw = paw === "l" ? "r" : "l";

        const c = load(); c.taps = (c.taps || 0) + 1; save(c);
        const sk = SKINS[c.idx % SKINS.length], tag = topDoc.getElementById("m4-tag-clk");
        if (tag) tag.innerHTML = `${getNm(c, sk).replace(/</g, "&lt;")} <span style="color:#A69398;">Lv.${getLv(c)}</span>`;

        combo++;
        if (cTimer) clearTimeout(cTimer);
        cTimer = setTimeout(() => { combo = 0; }, 2000);

        // 关键词趣味感应吐槽 + 连击狂欢
        if (/(喜欢|爱|亲亲|抱抱|想你)/.test(txtVal.slice(-4))) {
            cheer(); say("哇哦~ 闻到恋爱酸臭味啦🤍");
        } else if (/(呜呜|难过|委屈|哭)/.test(txtVal.slice(-4))) {
            cheer(); say("摸摸头不难过，团子抱抱你🐾");
        } else if (combo > 0 && combo % 25 === 0) {
            cheer(); say(`🔥 手速爆发 Combo ×${combo}！`);
        }

        if (pTimer) clearTimeout(pTimer);
        pTimer = setTimeout(() => host.classList.remove("paw-l", "paw-r", "typing"), 100);
    }

    ["keydown", "input", "compositionupdate"].forEach((ev) => {
        topDoc.addEventListener(ev, (e) => {
            const t = e.target;
            if (t && (t.tagName === "TEXTAREA" || t.tagName === "INPUT" || t.isContentEditable)) {
                if (ev === "keydown" && ["Shift", "Control", "Alt", "Meta"].includes(e.key)) return;
                slap(t.value || "");
            }
        }, true);
    });

    topDoc.addEventListener("click", (e) => {
        if (!e.target.closest("#st-mochi-v4-host")) topDoc.getElementById("m4-pan-el")?.classList.remove("open");
    }, true);

    setInterval(ensureMounted, 400);
    setTimeout(ensureMounted, 60);
})();
