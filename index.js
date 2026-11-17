// ==========================================================================
// 🤍 【SEOUL OS V12 · GitHub 扩展 & 酒馆助手通用终极完整版 (index.js)】
// 新增三重入口：1.右下角常驻悬浮球  2.酒馆扩展(Extensions)面板内大按钮  3.聊天框左下角魔法棒菜单入口
// 包含全套功能：微信(#F8F8F8长圆气泡/双尾巴CSS/全屏设置/批量表情/区间总结) + 情侣空间(A+B融合版) + 旋转黑胶网易云 + 查手机 + 日记
// ==========================================================================
(function () {
    const topWin = window.parent || window;
    const topDoc = topWin.document;

    function bootSeoulOS() {
        if (!topDoc || !topDoc.body) {
            setTimeout(bootSeoulOS, 300);
            return;
        }

        // 清理旧节点
        ["seoul-mini-theater-btn", "seoul-mini-theater-modal", "seoul-mini-theater-style", "seoul-wx-custom-style", "seoul-ext-settings-panel", "seoul-wand-menu-item"].forEach((id) => {
            topDoc.getElementById(id)?.remove();
        });

        /* ══════════════════════════════════════════════════════════════════
           【PART 1：核心底座、按角色独立分库引擎、独立 API 与 SVG 图标库】
           ══════════════════════════════════════════════════════════════════ */
        const K_API = "seoul_v12_api";
        const K_WX_CSS = "seoul_v12_wx_css";
        const K_MUSIC = "seoul_v12_music";
        const K_HTML = "seoul_v12_html";
        const K_SYNC = "seoul_v12_sync";
        const K_STICKERS = "seoul_v12_stickers";

        function svgUri(pathD, stroke = "%23484852", viewBox = "0 0 24 24", sw = "1.6") {
            return `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='${viewBox}' fill='none' stroke='${stroke}' stroke-width='${sw}' stroke-linecap='round' stroke-linejoin='round'%3E${pathD}%3C/svg%3E")`;
        }

        function inlineSvg(pathD, color = "#484852", size = 12) {
            return `<svg viewBox="0 0 24 24" width="${size}" height="${size}" fill="none" stroke="${color}" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block !important;visibility:visible !important;opacity:1 !important;width:${size}px !important;height:${size}px !important;min-width:${size}px !important;flex-shrink:0 !important;vertical-align:middle !important;margin:0 !important;padding:0 !important;pointer-events:none !important;">${pathD}</svg>`;
        }

        function svgImg(paths, size = 22, color = "%233A3A40", sw = "1.5") {
            const src = `data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='${color}' stroke-width='${sw}' stroke-linecap='round' stroke-linejoin='round'%3E${paths}%3C/svg%3E`;
            return `<img src="${src}" style="width:${size}px !important;height:${size}px !important;min-width:${size}px !important;min-height:${size}px !important;display:block !important;object-fit:contain !important;border:none !important;border-radius:0 !important;background:transparent !important;margin:0 !important;padding:0 !important;pointer-events:none !important;" />`;
        }

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
            pet: svgImg("%3Cpath d='M5 9.5L3.5 4l5 2.2c2.2-.6 4.8-.6 7 0L20.5 4 19 9.5c1.2 1.7 1.6 4 .8 6.2-1.1 3-4.3 4.8-7.8 4.8s-6.7-1.8-7.8-4.8c-.8-2.2-.4-4.5.8-6.2z'/%3E%3Ccircle cx='9' cy='12.5' r='1' fill='%233A3A40'/%3E%3Ccircle cx='15' cy='12.5' r='1' fill='%233A3A40'/%3E%3Cpath d='M11 14.8l1 .8 1-.8'/%3E%3Cpath d='M2.5 13h2.5M19 13h2.5'/%3E", 22),
            petLg: svgImg("%3Cpath d='M5 9.5L3.5 4l5 2.2c2.2-.6 4.8-.6 7 0L20.5 4 19 9.5c1.2 1.7 1.6 4 .8 6.2-1.1 3-4.3 4.8-7.8 4.8s-6.7-1.8-7.8-4.8c-.8-2.2-.4-4.5.8-6.2z'/%3E%3Ccircle cx='9' cy='12.5' r='1' fill='%233A3A40'/%3E%3Ccircle cx='15' cy='12.5' r='1' fill='%233A3A40'/%3E%3Cpath d='M11 14.8l1 .8 1-.8'/%3E%3Cpath d='M2.5 13h2.5M19 13h2.5'/%3E", 38),
            cam4: svgImg("%3Crect x='4' y='2' width='16' height='20' rx='3'/%3E%3Cline x1='4' y1='8' x2='20' y2='8'/%3E%3Cline x1='4' y1='14' x2='20' y2='14'/%3E%3Ccircle cx='8.5' cy='5' r='1' fill='%233A3A40'/%3E%3Ccircle cx='8.5' cy='11' r='1' fill='%233A3A40'/%3E%3Ccircle cx='8.5' cy='17' r='1' fill='%233A3A40'/%3E%3Cpath d='M12 5h4M12 11h4M12 17h4'/%3E", 22),
            qa: svgImg("%3Cpath d='M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z'/%3E%3Cpath d='M9.5 9.5a2.5 2.5 0 0 1 5 0c0 1.5-2.5 2-2.5 3.5'/%3E%3Ccircle cx='12' cy='16' r='0.8' fill='%233A3A40'/%3E", 22),
            wave: svgImg("%3Cpath d='M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z'/%3E%3Cpolyline points='6 12 9.5 12 11 9 13 15 14.5 12 18 12'/%3E", 22),
            ticket: svgImg("%3Cpath d='M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z'/%3E%3Cline x1='14' y1='5' x2='14' y2='19' stroke-dasharray='2 2.5'/%3E%3Cpath d='M6 10h5M6 14h3'/%3E", 22),
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
            sunMorning: inlineSvg(`<path d="M17 18a5 5 0 0 0-10 0"/><line x1="12" y1="2" x2="12" y2="9"/><line x1="4.22" y1="10.22" x2="5.64" y2="11.64"/><line x1="1" y1="18" x2="3" y2="18"/><line x1="21" y1="18" x2="23" y2="18"/><line x1="18.36" y1="11.64" x2="19.78" y2="10.22"/>`, "#55555E", 13),
            sunDay: inlineSvg(`<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>`, "#55555E", 13),
            sunDusk: inlineSvg(`<path d="M17 18a5 5 0 0 0-10 0"/><line x1="12" y1="9" x2="12" y2="2"/><line x1="4.22" y1="10.22" x2="5.64" y2="11.64"/><line x1="1" y1="18" x2="23" y2="18"/>`, "#55555E", 13),
            moonNight: inlineSvg(`<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>`, "#55555E", 13)
        };

        function nowTimeStr() { const d = new Date(); return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`; }

        function getRealTimeInfo() {
            const now = new Date();
            const hh = String(now.getHours()).padStart(2, "0"), mm = String(now.getMinutes()).padStart(2, "0");
            const daysKr = ["일요일(周日)", "월요일(周一)", "화요일(周二)", "수요일(周三)", "목요일(周四)", "금요일(周五)", "토요일(周六)"];
            const dayStr = daysKr[now.getDay()], h = now.getHours();
            let periodKr = "심야 · 深夜", periodCn = "深夜", icon = WX_ICO.moonNight;
            if (h >= 5 && h < 11) { periodKr = "아침 · 清晨"; periodCn = "清晨"; icon = WX_ICO.sunMorning; }
            else if (h >= 11 && h < 17) { periodKr = "낮 · 白昼"; periodCn = "白天"; icon = WX_ICO.sunDay; }
            else if (h >= 17 && h < 20) { periodKr = "저녁 · 傍晚"; periodCn = "傍晚"; icon = WX_ICO.sunDusk; }
            else if (h >= 20 && h <= 23) { periodKr = "밤 · 夜晚"; periodCn = "夜晚"; icon = WX_ICO.moonNight; }
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
                    } else if (st.groupId) {
                        charScopeId = "group_" + String(st.groupId);
                        charName = st.name2 || "GROUP";
                    } else if (st.name2) {
                        charName = st.name2; charScopeId = st.name2;
                    }
                    if (Array.isArray(st.chat) && st.chat.length > 0) {
                        recentChat = st.chat.slice(-maxMes).map((m) => `${m.is_user ? userName : (charName || "TA")}: ${m.mes}`).join("\n\n");
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
            return { userName, charName, charScopeId: safeScope, userAvatar, charAvatar, charDesc, recentChat };
        }

        function getSafeScopedKey(baseKey) {
            return `${baseKey}__${getSTContext(1).charScopeId}`;
        }

        const NEW_DEFAULT_WX_CSS = `/* 🎨 【微信专属 CSS 美化工作台】
   💡 头像本地上传、昵称、备注、时间感知请点击旁边的「聊天设置」全屏页！
   👇 下方专门用来改【长圆形气泡颜色】与【我 / 对方两个独立的气泡尾巴图片 URL】 👇 */

#seoul-mini-theater-modal #smt-page-talk {
    --我的气泡底色: #F8F8F8;
    --我的气泡字色: #3A3A40;
    --我的气泡边框: #EAEAF0;

    --对方气泡底色: #FFFFFF;
    --对方气泡字色: #333338;
    --对方气泡边框: #EAEAF0;

    --气泡长圆角: 999px;

    /* 把 none 改成 url("你的透明尾巴图链接") 即可分别显示在左右气泡角上！ */
    --我的气泡尾巴-url: none;
    --对方的气泡尾巴-url: none;

    --我的尾巴宽: 13px;
    --我的尾巴高: 13px;
    --我的尾巴右侧偏移: -6px;
    --我的尾巴底部偏移: 2px;

    --对方尾巴宽: 13px;
    --对方尾巴高: 13px;
    --对方尾巴左侧偏移: -6px;
    --对方尾巴底部偏移: 2px;
}

#smt-wx-stream {
    background-color: #FFFFFF !important;
    background-size: cover !important;
    background-position: center !important;
}

#seoul-mini-theater-modal #smt-wx-stream .smt-wx-row.me .smt-wx-bubble {
    background-color: var(--我的气泡底色, #F8F8F8) !important;
    color: var(--我的气泡字色, #3A3A40) !important;
    -webkit-text-fill-color: var(--我的气泡字色, #3A3A40) !important;
    border: 1px solid var(--我的气泡边框, #EAEAF0) !important;
    border-radius: var(--气泡长圆角, 999px) !important;
}

#seoul-mini-theater-modal #smt-wx-stream .smt-wx-row.ai .smt-wx-bubble {
    background-color: var(--对方气泡底色, #FFFFFF) !important;
    color: var(--对方气泡字色, #333338) !important;
    -webkit-text-fill-color: var(--对方气泡字色, #333338) !important;
    border: 1px solid var(--对方气泡边框, #EAEAF0) !important;
    border-radius: var(--气泡长圆角, 999px) !important;
}

#seoul-mini-theater-modal #smt-wx-stream .smt-wx-bubble.multiline {
    border-radius: 20px !important;
}

#seoul-mini-theater-modal #smt-wx-stream .smt-wx-row.me .smt-wx-bubble::after {
    content: "" !important; display: block !important; position: absolute !important;
    right: var(--我的尾巴右侧偏移, -6px) !important; bottom: var(--我的尾巴底部偏移, 2px) !important;
    width: var(--我的尾巴宽, 13px) !important; height: var(--我的尾巴高, 13px) !important;
    background-image: var(--我的气泡尾巴-url, none) !important;
    background-size: contain !important; background-repeat: no-repeat !important; pointer-events: none !important; z-index: 3 !important;
}

#seoul-mini-theater-modal #smt-wx-stream .smt-wx-row.ai .smt-wx-bubble::before {
    content: "" !important; display: block !important; position: absolute !important;
    left: var(--对方尾巴左侧偏移, -6px) !important; bottom: var(--对方尾巴底部偏移, 2px) !important;
    width: var(--对方尾巴宽, 13px) !important; height: var(--对方尾巴高, 13px) !important;
    background-image: var(--对方的气泡尾巴-url, none) !important;
    background-size: contain !important; background-repeat: no-repeat !important; pointer-events: none !important; z-index: 3 !important;
}`;

        function getApiCfg() { try { return Object.assign({ url: "https://api.openai.com/v1", key: "", model: "gpt-4o-mini", ctxCount: 8 }, JSON.parse(localStorage.getItem(K_API) || "{}")); } catch (e) { return { url: "https://api.openai.com/v1", key: "", model: "gpt-4o-mini", ctxCount: 8 }; } }
        function saveApiCfg(c) { localStorage.setItem(K_API, JSON.stringify(c)); }
        function getChatList() { try { return JSON.parse(localStorage.getItem(getSafeScopedKey("seoul_v12_wx")) || "[]"); } catch (e) { return []; } }
        function saveChatList(list) { localStorage.setItem(getSafeScopedKey("seoul_v12_wx"), JSON.stringify(list.slice(-150))); }
        function getWxCfg() {
            try { return Object.assign({ myNick: "", myBio: "連線中 · Personal Inbox", myAva: "", remark: "", charBio: "随时在线 · 置顶联系人", charAva: "", avaSize: 33, timeAware: true, customBgNote: "" }, JSON.parse(localStorage.getItem(getSafeScopedKey("seoul_v12_wxcfg")) || "{}")); }
            catch (e) { return { myNick: "", myBio: "連線中 · Personal Inbox", myAva: "", remark: "", charBio: "随时在线 · 置顶联系人", charAva: "", avaSize: 33, timeAware: true, customBgNote: "" }; }
        }
        function saveWxCfg(cfg) { try { localStorage.setItem(getSafeScopedKey("seoul_v12_wxcfg"), JSON.stringify(cfg)); } catch (e) {} }
        function getWxCss() { return localStorage.getItem(K_WX_CSS) || NEW_DEFAULT_WX_CSS; }
        function saveWxCss(css) { localStorage.setItem(K_WX_CSS, css); }
        function getSyncMode() { return localStorage.getItem(K_SYNC) === "true"; }
        function setSyncMode(val) { localStorage.setItem(K_SYNC, val ? "true" : "false"); }
        function getStickerList() {
            try { return JSON.parse(localStorage.getItem(K_STICKERS) || JSON.stringify([{ name: "猫猫探头", url: "https://i.postimg.cc/rydS6NvG/IMG-3866.jpg" }, { name: "委屈巴巴", url: "https://i.postimg.cc/vmsDSqmk/IMG-3926.jpg" }])); }
            catch (e) { return []; }
        }
        function saveStickerList(l) { localStorage.setItem(K_STICKERS, JSON.stringify(l.slice(0, 150))); }
        function getArchive() { try { return JSON.parse(localStorage.getItem(getSafeScopedKey("seoul_v12_arch")) || "[]"); } catch (e) { return []; } }
        function saveArchive(l) { localStorage.setItem(getSafeScopedKey("seoul_v12_arch"), JSON.stringify(l.slice(0, 150))); }
        function pushArchive(title, content, isHtml = false) { const l = getArchive(); l.unshift({ id: Date.now(), title, content, isHtml, time: nowTimeStr() }); saveArchive(l); }

        async function requestStandaloneAI(systemText, userText) {
            const cfg = getApiCfg();
            if (!cfg.url || !cfg.key) {
                navigateToPage("api", "API CONFIG · 환경설정", "请先配置独立 API");
                throw new Error("请先在【05. API设置】填写独立 API 地址与 Key 并保存！");
            }
            let url = cfg.url.trim().replace(/\/+$/, "");
            if (!url.endsWith("/chat/completions")) {
                if (!url.endsWith("/v1")) url += "/v1";
                url += "/chat/completions";
            }
            const res = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json", "Authorization": `Bearer ${cfg.key.trim()}` },
                body: JSON.stringify({
                    model: cfg.model || "gpt-4o-mini",
                    temperature: 0.85,
                    messages: [{ role: "system", content: systemText }, { role: "user", content: userText }]
                })
            });
            if (!res.ok) throw new Error(`API HTTP ${res.status}`);
            const data = await res.json();
            return data?.choices?.[0]?.message?.content?.trim() || "";
        }

        /* ══════════════════════════════════════════════════════════════════
           【PART 2：全局 UI 样式表 (含 A+B 融合版情侣空间 + 长圆#F8F8F8气泡)】
           ══════════════════════════════════════════════════════════════════ */
        const styleEl = topDoc.createElement("style");
        styleEl.id = "seoul-mini-theater-style";
        styleEl.innerHTML = `
            html body #seoul-mini-theater-btn {
                position: fixed !important; right: 12px !important; bottom: 88px !important;
                z-index: 2147483640 !important; display: inline-flex !important; align-items: center !important; gap: 6px !important;
                height: 32px !important; padding: 0 12px !important; background: #FFFFFF !important;
                border: 1.2px solid #E4E4EC !important; border-radius: 999px !important; cursor: pointer !important;
                user-select: none !important; touch-action: none !important;
                font-family: -apple-system, BlinkMacSystemFont, "Apple SD Gothic Neo", "PingFang SC", sans-serif !important;
            }
            html body #seoul-mini-theater-btn .smt-ico-entry { width: 14px !important; height: 14px !important; display: inline-block !important; background-image: ${ICO.chatAct} !important; background-size: contain !important; background-repeat: no-repeat !important; }
            html body #seoul-mini-theater-btn .smt-btn-kr { font-size: 9.8px !important; font-weight: 700 !important; color: #3A3A40 !important; -webkit-text-fill-color: #3A3A40 !important; }

            html body #seoul-mini-theater-modal {
                position: fixed !important; inset: 0 !important; width: 100vw !important; height: 100dvh !important;
                z-index: 2147483646 !important; background: #FFFFFF !important; background-color: #FFFFFF !important;
                display: none; flex-direction: column !important; box-sizing: border-box !important;
                font-family: -apple-system, BlinkMacSystemFont, "Apple SD Gothic Neo", "SF Pro Text", "PingFang SC", sans-serif !important;
                color: #3A3A40 !important; overflow: hidden !important;
            }
            html body #seoul-mini-theater-modal.smt-open { display: flex !important; }

            html body #seoul-mini-theater-modal .smt-fs-header {
                position: relative !important; display: flex !important; align-items: center !important; justify-content: space-between !important;
                height: 48px !important; min-height: 48px !important; margin-top: env(safe-area-inset-top, 0px) !important;
                padding: 0 14px !important; background: #FFFFFF !important; border-bottom: 1px solid #F2F2F6 !important; flex-shrink: 0 !important;
            }
            html body #seoul-mini-theater-modal .smt-exit-btn {
                display: inline-flex !important; align-items: center !important; gap: 3px !important;
                height: 28px !important; padding: 0 10px 0 6px !important; background: #F8F8F8 !important;
                border: 1px solid #ECECF2 !important; border-radius: 999px !important;
                font-size: 9.8px !important; font-weight: 700 !important; color: #3A3A40 !important; cursor: pointer !important; z-index: 2 !important;
            }
            html body #seoul-mini-theater-modal .smt-ico-back { width: 13px !important; height: 13px !important; display: inline-block !important; background-image: ${ICO.back} !important; background-size: contain !important; background-repeat: no-repeat !important; }
            html body #seoul-mini-theater-modal .smt-header-center {
                position: absolute !important; left: 50% !important; top: 50% !important; transform: translate(-50%, -50%) !important;
                text-align: center !important; pointer-events: none !important; width: max-content !important; max-width: 200px !important;
            }
            html body #seoul-mini-theater-modal .smt-header-title { font-size: 11.2px !important; font-weight: 700 !important; color: #3A3A40 !important; letter-spacing: 0.4px !important; white-space: nowrap !important; }
            html body #seoul-mini-theater-modal .smt-header-sub { font-size: 8.2px !important; font-weight: 500 !important; color: #9A9AA5 !important; margin-top: 1px !important; white-space: nowrap !important; }
            html body #seoul-mini-theater-modal .smt-header-right {
                display: inline-flex !important; align-items: center !important; height: 22px !important; padding: 0 8px !important;
                background: #F8F8F8 !important; border: 1px solid #ECECF2 !important; border-radius: 999px !important;
                font-size: 8px !important; font-weight: 700 !important; color: #7A7A85 !important; z-index: 2 !important; cursor: pointer !important;
            }

            html body #seoul-mini-theater-modal .smt-fs-body {
                flex: 1 !important; min-height: 0 !important; width: 100% !important; max-width: 440px !important;
                margin: 0 auto !important; padding: 10px 14px !important; box-sizing: border-box !important;
                display: flex !important; flex-direction: column !important; overflow: hidden !important; background: #FFFFFF !important;
            }
            html body #seoul-mini-theater-modal .smt-page { display: none !important; flex-direction: column !important; flex: 1 !important; min-height: 0 !important; overflow-y: auto !important; }
            html body #seoul-mini-theater-modal .smt-page.active { display: flex !important; }

            html body #seoul-mini-theater-modal .smt-bottom-dock {
                display: grid !important; grid-template-columns: repeat(5, 1fr) !important;
                background: #FFFFFF !important; border-top: 1px solid #F2F2F6 !important;
                padding: 6px 10px max(10px, env(safe-area-inset-bottom, 10px)) 10px !important;
                flex-shrink: 0 !important; max-width: 440px !important; width: 100% !important; margin: 0 auto !important; box-sizing: border-box !important;
            }
            html body #seoul-mini-theater-modal .smt-tab-item { display: flex !important; flex-direction: column !important; align-items: center !important; justify-content: center !important; gap: 3px !important; padding: 5px 2px !important; border-radius: 10px !important; cursor: pointer !important; }
            html body #seoul-mini-theater-modal .smt-tab-item.active { background: #F8F8F8 !important; }
            html body #seoul-mini-theater-modal .smt-tab-ico { width: 18px !important; height: 18px !important; display: block !important; background-size: 18px 18px !important; background-repeat: no-repeat !important; background-position: center !important; }
            html body #seoul-mini-theater-modal .smt-tab-item[data-page="talk"] .smt-tab-ico { background-image: ${ICO.chat} !important; }
            html body #seoul-mini-theater-modal .smt-tab-item[data-page="talk"].active .smt-tab-ico { background-image: ${ICO.chatAct} !important; }
            html body #seoul-mini-theater-modal .smt-tab-item[data-page="space"] .smt-tab-ico { background-image: ${ICO.heart} !important; }
            html body #seoul-mini-theater-modal .smt-tab-item[data-page="space"].active .smt-tab-ico { background-image: ${ICO.heartAct} !important; }
            html body #seoul-mini-theater-modal .smt-tab-item[data-page="home"] .smt-tab-ico { background-image: ${ICO.user} !important; }
            html body #seoul-mini-theater-modal .smt-tab-item[data-page="home"].active .smt-tab-ico { background-image: ${ICO.userAct} !important; }
            html body #seoul-mini-theater-modal .smt-tab-item[data-page="archive"] .smt-tab-ico { background-image: ${ICO.archive} !important; }
            html body #seoul-mini-theater-modal .smt-tab-item[data-page="archive"].active .smt-tab-ico { background-image: ${ICO.archiveAct} !important; }
            html body #seoul-mini-theater-modal .smt-tab-item[data-page="api"] .smt-tab-ico { background-image: ${ICO.settings} !important; }
            html body #seoul-mini-theater-modal .smt-tab-item[data-page="api"].active .smt-tab-ico { background-image: ${ICO.settingsAct} !important; }
            html body #seoul-mini-theater-modal .smt-tab-txt { font-size: 8.8px !important; font-weight: 600 !important; color: #8E8E98 !important; }
            html body #seoul-mini-theater-modal .smt-tab-item.active .smt-tab-txt { font-weight: 700 !important; color: #2C2C32 !important; }

            html body #seoul-mini-theater-modal .smt-pill-btn {
                height: 24px !important; padding: 0 8px !important; margin: 0 !important; border-radius: 999px !important;
                font-size: 9px !important; font-weight: 600 !important; line-height: 1 !important;
                background: #FFFFFF !important; border: 1px solid #E6E6EC !important; color: #55555E !important;
                cursor: pointer !important; display: inline-flex !important; align-items: center !important; justify-content: center !important;
                gap: 3.5px !important; text-indent: 0 !important; white-space: nowrap !important; box-sizing: border-box !important;
            }
            html body #seoul-mini-theater-modal .smt-pill-btn span { margin: 0 !important; padding: 0 !important; text-indent: 0 !important; line-height: 1 !important; }
            html body #seoul-mini-theater-modal .smt-pill-btn.dark { background: #484852 !important; border-color: #484852 !important; color: #FFFFFF !important; -webkit-text-fill-color: #FFFFFF !important; }

            html body #seoul-mini-theater-modal .smt-section-box { background: #F8F8F8 !important; border: 1px solid #ECECF2 !important; border-radius: 16px !important; padding: 13px !important; margin-bottom: 10px !important; }
            html body #seoul-mini-theater-modal .smt-sec-title { display: flex !important; justify-content: space-between !important; align-items: center !important; font-size: 10.2px !important; font-weight: 700 !important; color: #3A3A40 !important; margin-bottom: 10px !important; padding-bottom: 7px !important; border-bottom: 1px solid #EAEAF0 !important; }
            html body #seoul-mini-theater-modal .smt-bar-bg { width: 100% !important; height: 6px !important; background: #EAEAF0 !important; border-radius: 99px !important; overflow: hidden !important; margin-top: 4px !important; }
            html body #seoul-mini-theater-modal .smt-bar-fill { height: 100% !important; background: #484852 !important; border-radius: 99px !important; transition: width 0.25s ease !important; }

            /* ── 微信样式：头像顶部对齐 + #F8F8F8 长圆气泡 + 转账卡 ── */
            html body #seoul-mini-theater-modal .smt-wx-top-bar { display: flex !important; align-items: center !important; justify-content: space-between !important; background: #F8F8F8 !important; border: 1px solid #ECECF2 !important; border-radius: 11px !important; padding: 5px 8px !important; margin-bottom: 8px !important; flex-shrink: 0 !important; }
            html body #seoul-mini-theater-modal #smt-wx-stream { flex: 1 !important; min-height: 0 !important; overflow-y: auto !important; background: #FFFFFF !important; border: 1px solid #ECECF2 !important; border-radius: 16px !important; padding: 12px !important; display: flex !important; flex-direction: column !important; gap: 11px !important; margin-bottom: 8px !important; }
            html body #seoul-mini-theater-modal #smt-wx-stream .smt-wx-row { display: flex !important; align-items: flex-start !important; gap: 8px !important; max-width: 82% !important; position: relative !important; }
            html body #seoul-mini-theater-modal #smt-wx-stream .smt-wx-row.me { align-self: flex-end !important; flex-direction: row-reverse !important; }
            html body #seoul-mini-theater-modal #smt-wx-stream .smt-wx-ava { margin-top: 1px !important; border-radius: 50% !important; object-fit: cover !important; border: 1.5px solid #FFFFFF !important; flex-shrink: 0 !important; }
            html body #seoul-mini-theater-modal #smt-wx-stream .smt-wx-bubble { padding: 7px 15px !important; font-size: 12px !important; line-height: 1.48 !important; position: relative !important; overflow: visible !important; word-break: break-word !important; cursor: pointer !important; box-sizing: border-box !important; }
            html body #seoul-mini-theater-modal .smt-wx-quote-box { margin-bottom: 4px !important; padding: 3px 8px !important; border-left: 2px solid #9A9AA5 !important; border-radius: 6px !important; background: rgba(0, 0, 0, 0.035) !important; font-size: 9.5px !important; color: #6E6E77 !important; }
            html body #seoul-mini-theater-modal .smt-wx-pay-card { width: 204px !important; background: #FFFFFF !important; border: 1.2px solid #E4E4EC !important; border-radius: 14px !important; overflow: hidden !important; cursor: pointer !important; }
            html body #seoul-mini-theater-modal .smt-wx-pay-top { display: flex !important; align-items: center !important; gap: 10px !important; padding: 11px 12px !important; background: #F8F8F8 !important; border-bottom: 1px solid #ECECF2 !important; }
            html body #seoul-mini-theater-modal .smt-wx-pay-ico { width: 32px !important; height: 32px !important; border-radius: 9px !important; background: #FFFFFF !important; border: 1px solid #E6E6EC !important; flex-shrink: 0 !important; background-image: ${ICO.transfer} !important; background-size: 17px 17px !important; background-repeat: no-repeat !important; background-position: center !important; }
            html body #seoul-mini-theater-modal .smt-wx-pay-amt { font-size: 13px !important; font-weight: 700 !important; color: #2C2C32 !important; }
            html body #seoul-mini-theater-modal .smt-wx-pay-note { font-size: 9px !important; color: #7A7A85 !important; margin-top: 2px !important; }
            html body #seoul-mini-theater-modal .smt-wx-pay-foot { display: flex !important; justify-content: space-between !important; padding: 5px 12px !important; font-size: 8px !important; font-weight: 700 !important; color: #9A9AA5 !important; background: #FFFFFF !important; }
            html body #seoul-mini-theater-modal .smt-wx-sticker-msg { display: inline-block !important; cursor: pointer !important; border-radius: 12px !important; overflow: hidden !important; border: 1px solid #EFEFF4 !important; }
            html body #seoul-mini-theater-modal .smt-wx-sticker-msg img { max-width: 104px !important; max-height: 104px !important; display: block !important; object-fit: contain !important; border-radius: 11px !important; }
            html body #seoul-mini-theater-modal .smt-wx-act-pop { display: inline-flex !important; align-items: center !important; flex-wrap: wrap !important; gap: 2px !important; margin-top: 4px !important; padding: 2px 5px !important; background: #FFFFFF !important; border: 1px solid #E4E4EC !important; border-radius: 999px !important; z-index: 20 !important; }
            html body #seoul-mini-theater-modal .smt-wx-act-item { display: inline-flex !important; align-items: center !important; justify-content: center !important; gap: 3px !important; padding: 3px 6px !important; border-radius: 999px !important; font-size: 8.5px !important; font-weight: 600 !important; color: #484852 !important; cursor: pointer !important; white-space: nowrap !important; line-height: 1 !important; }
            html body #seoul-mini-theater-modal .smt-wx-idx-tag { font-size: 7.5px !important; font-weight: 700 !important; color: #A0A0AA !important; background: #F8F8F8 !important; border: 1px solid #ECECF2 !important; border-radius: 99px !important; padding: 0px 5px !important; }
            html body #seoul-mini-theater-modal .smt-wx-edit-box { width: 220px !important; max-width: 100% !important; margin-top: 4px !important; background: #FFFFFF !important; border: 1px solid #D0D0DA !important; border-radius: 12px !important; padding: 7px !important; box-sizing: border-box !important; }
            html body #seoul-mini-theater-modal .smt-wx-edit-area { width: 100% !important; min-height: 48px !important; background: #F8F8F8 !important; border: 1px solid #E6E6EC !important; border-radius: 8px !important; padding: 5px 7px !important; font-size: 10.5px !important; color: #3A3A40 !important; box-sizing: border-box !important; margin-bottom: 5px !important; outline: none !important; }
            html body #seoul-mini-theater-modal #smt-wx-reply-preview { display: none; align-items: center !important; justify-content: space-between !important; background: #F8F8F8 !important; border: 1px solid #ECECF2 !important; border-left: 3px solid #484852 !important; border-radius: 8px !important; padding: 5px 10px !important; margin-bottom: 6px !important; font-size: 9.5px !important; color: #55555E !important; flex-shrink: 0 !important; }
            html body #seoul-mini-theater-modal .smt-wx-meta { font-size: 8px !important; color: #9A9AA5 !important; margin-top: 3px !important; display: flex !important; gap: 4px !important; align-items: center !important; }
            html body #seoul-mini-theater-modal .smt-wx-row.me .smt-wx-meta { justify-content: flex-end !important; }
            html body #seoul-mini-theater-modal .smt-wx-sys { align-self: center !important; background: #F8F8F8 !important; border: 1px solid #ECECF2 !important; border-radius: 99px !important; padding: 2.5px 10px !important; font-size: 8.5px !important; color: #8E8E98 !important; }
            html body #seoul-mini-theater-modal .smt-wx-quick { display: flex !important; gap: 5px !important; overflow-x: auto !important; padding-bottom: 6px !important; flex-shrink: 0 !important; }
            html body #seoul-mini-theater-modal .smt-wx-bar { display: flex !important; gap: 6px !important; align-items: center !important; background: #F8F8F8 !important; border: 1px solid #ECECF2 !important; border-radius: 16px !important; padding: 5px 6px !important; flex-shrink: 0 !important; }
            html body #seoul-mini-theater-modal .smt-wx-input { flex: 1 !important; height: 30px !important; min-width: 0 !important; background: #FFFFFF !important; border: 1px solid #E6E6EC !important; border-radius: 99px !important; padding: 0 11px !important; font-size: 11px !important; color: #3A3A40 !important; outline: none !important; }
            html body #seoul-mini-theater-modal .smt-wx-btn-add { width: 28px !important; height: 28px !important; border-radius: 50% !important; background: #FFFFFF !important; border: 1px solid #E4E4EC !important; flex-shrink: 0 !important; cursor: pointer !important; background-image: ${ICO.plus} !important; background-size: 13px 13px !important; background-repeat: no-repeat !important; background-position: center !important; }
            html body #seoul-mini-theater-modal .smt-wx-btn-reply { height: 28px !important; padding: 0 10px !important; border-radius: 999px !important; background: #484852 !important; color: #FFFFFF !important; -webkit-text-fill-color: #FFFFFF !important; font-size: 9px !important; font-weight: 700 !important; display: inline-flex !important; align-items: center !important; justify-content: center !important; gap: 3px !important; flex-shrink: 0 !important; cursor: pointer !important; }
            html body #seoul-mini-theater-modal .smt-wx-btn-reply i { width: 10px !important; height: 10px !important; display: inline-block !important; background-image: ${ICO.arrowUpRight} !important; background-size: contain !important; background-repeat: no-repeat !important; }

            html body #seoul-mini-theater-modal #smt-wx-emoji-drawer { display: none; background: #F8F8F8 !important; border: 1px solid #ECECF2 !important; border-radius: 14px !important; padding: 9px 10px !important; margin-bottom: 6px !important; flex-shrink: 0 !important; }
            html body #seoul-mini-theater-modal .smt-kaomoji-grid { display: grid !important; grid-template-columns: repeat(4, 1fr) !important; gap: 5px !important; max-height: 115px !important; overflow-y: auto !important; }
            html body #seoul-mini-theater-modal .smt-kaomoji-item { background: #FFFFFF !important; border: 1px solid #EAEAF0 !important; border-radius: 8px !important; padding: 6px 2px !important; font-size: 10px !important; text-align: center !important; cursor: pointer !important; white-space: nowrap !important; overflow: hidden !important; text-overflow: ellipsis !important; }
            html body #seoul-mini-theater-modal .smt-sticker-grid { display: grid !important; grid-template-columns: repeat(4, 1fr) !important; gap: 7px !important; max-height: 115px !important; overflow-y: auto !important; margin-bottom: 7px !important; }
            html body #seoul-mini-theater-modal .smt-sticker-card { position: relative !important; background: #FFFFFF !important; border: 1px solid #EAEAF0 !important; border-radius: 10px !important; padding: 4px !important; text-align: center !important; cursor: pointer !important; }
            html body #seoul-mini-theater-modal .smt-sticker-card img { width: 100% !important; height: 48px !important; object-fit: contain !important; border-radius: 6px !important; display: block !important; }
            html body #seoul-mini-theater-modal .smt-sticker-card .smt-st-name { font-size: 8px !important; color: #7A7A85 !important; margin-top: 2px !important; white-space: nowrap !important; overflow: hidden !important; text-overflow: ellipsis !important; }
            html body #seoul-mini-theater-modal .smt-sticker-card .smt-st-del { position: absolute !important; top: 2px !important; right: 2px !important; width: 14px !important; height: 14px !important; border-radius: 50% !important; background: rgba(255,255,255,0.92) !important; border: 1px solid #E4E4EC !important; font-size: 8px !important; line-height: 13px !important; color: #9A6868 !important; }
            html body #seoul-mini-theater-modal .smt-prof-card { background: #F8F8F8 !important; border: 1px solid #ECECF2 !important; border-radius: 16px !important; padding: 13px !important; margin-bottom: 10px !important; }
            html body #seoul-mini-theater-modal .smt-prof-row { display: flex !important; align-items: center !important; gap: 12px !important; background: #FFFFFF !important; border: 1px solid #EFEFF4 !important; border-radius: 13px !important; padding: 11px 12px !important; margin-bottom: 8px !important; }
            html body #seoul-mini-theater-modal .smt-prof-ava-wrap { position: relative !important; width: 54px !important; height: 54px !important; flex-shrink: 0 !important; cursor: pointer !important; }
            html body #seoul-mini-theater-modal .smt-prof-ava-wrap img { width: 54px !important; height: 54px !important; border-radius: 50% !important; object-fit: cover !important; border: 1.5px solid #EAEAF0 !important; display: block !important; }
            html body #seoul-mini-theater-modal .smt-prof-cam-badge { position: absolute !important; right: -2px !important; bottom: -2px !important; width: 20px !important; height: 20px !important; border-radius: 50% !important; background: #FFFFFF !important; border: 1px solid #DCDCE6 !important; display: flex !important; align-items: center !important; justify-content: center !important; }

            /* ── A+B 融合版情侣空间样式 ── */
            html body #seoul-mini-theater-modal #smt-page-space { padding: 4px 2px 20px 2px !important; gap: 14px !important; }
            html body #seoul-mini-theater-modal .ab-profile-shell { background: #F8F8F8 !important; border: 1px solid #ECECF2 !important; border-radius: 22px !important; overflow: hidden !important; flex-shrink: 0 !important; }
            html body #seoul-mini-theater-modal .ab-room-banner { height: 88px !important; background-color: #EFEFF4 !important; background-image: linear-gradient(135deg, #F5F5F8 0%, #EAEAF0 100%); background-size: cover !important; background-position: center !important; position: relative !important; padding: 10px 12px !important; box-sizing: border-box !important; display: flex !important; justify-content: space-between !important; align-items: flex-start !important; }
            html body #seoul-mini-theater-modal .ab-glass-pill { background: rgba(255, 255, 255, 0.88) !important; border: 1px solid rgba(230, 230, 236, 0.9) !important; border-radius: 999px !important; padding: 3px 9px !important; font-size: 8.5px !important; font-weight: 700 !important; color: #3A3A40 !important; display: inline-flex !important; align-items: center !important; gap: 4px !important; cursor: pointer !important; }
            html body #seoul-mini-theater-modal .ab-ins-body { background: #FFFFFF !important; margin: -18px 10px 10px 10px !important; border-radius: 18px !important; border: 1px solid #EFEFF4 !important; padding: 13px 14px !important; position: relative !important; z-index: 2 !important; }
            html body #seoul-mini-theater-modal .ab-ins-top { display: flex !important; align-items: center !important; justify-content: space-between !important; gap: 12px !important; margin-bottom: 10px !important; }
            html body #seoul-mini-theater-modal .ab-couple-avas { display: flex !important; align-items: center !important; flex-shrink: 0 !important; }
            html body #seoul-mini-theater-modal .ab-couple-avas img { width: 48px !important; height: 48px !important; border-radius: 50% !important; object-fit: cover !important; border: 2.5px solid #FFFFFF !important; background: #F8F8F8 !important; }
            html body #seoul-mini-theater-modal .ab-couple-avas img:last-child { margin-left: -14px !important; }
            html body #seoul-mini-theater-modal .ab-ins-stats { flex: 1 !important; display: grid !important; grid-template-columns: repeat(3, 1fr) !important; text-align: center !important; background: #F8F8F8 !important; border: 1px solid #ECECF2 !important; border-radius: 12px !important; padding: 7px 4px !important; }
            html body #seoul-mini-theater-modal .ab-stat-num { font-size: 11.5px !important; font-weight: 700 !important; color: #2C2C32 !important; }
            html body #seoul-mini-theater-modal .ab-stat-lbl { font-size: 7.8px !important; color: #8E8E98 !important; margin-top: 1px !important; }
            html body #seoul-mini-theater-modal .ab-ins-bio { display: flex !important; justify-content: space-between !important; align-items: center !important; padding-top: 8px !important; border-top: 1px solid #F4F4F8 !important; font-size: 9.5px !important; color: #484852 !important; }
            html body #seoul-mini-theater-modal .ab-dock-section { background: #F8F8F8 !important; border: 1px solid #ECECF2 !important; border-radius: 22px !important; padding: 15px 12px !important; flex-shrink: 0 !important; }
            html body #seoul-mini-theater-modal .ab-dock-grid { display: grid !important; grid-template-columns: repeat(3, 1fr) !important; row-gap: 14px !important; column-gap: 8px !important; }
            html body #seoul-mini-theater-modal .ab-app-item { display: flex !important; flex-direction: column !important; align-items: center !important; text-align: center !important; cursor: pointer !important; position: relative !important; transition: transform 0.14s ease !important; }
            html body #seoul-mini-theater-modal .ab-app-item:active { transform: scale(0.93) !important; }
            html body #seoul-mini-theater-modal .ab-app-squircle { width: 52px !important; height: 52px !important; border-radius: 16px !important; background: #FFFFFF !important; border: 1px solid #E6E6EC !important; display: flex !important; align-items: center !important; justify-content: center !important; margin-bottom: 6px !important; position: relative !important; }
            html body #seoul-mini-theater-modal .ab-app-floating-badge { position: absolute !important; top: -5px !important; right: -8px !important; background: #484852 !important; color: #FFFFFF !important; -webkit-text-fill-color: #FFFFFF !important; font-size: 7.5px !important; font-weight: 700 !important; padding: 1.5px 5px !important; border-radius: 99px !important; border: 1.5px solid #FFFFFF !important; line-height: 1 !important; }
            html body #seoul-mini-theater-modal .ab-app-title { font-size: 10.5px !important; font-weight: 700 !important; color: #2C2C32 !important; line-height: 1.2 !important; }
            html body #seoul-mini-theater-modal .ab-app-kr { font-size: 7.8px !important; color: #9A9AA5 !important; margin-top: 1px !important; }
            html body #seoul-mini-theater-modal .ab-ins-feed-box { background: #F8F8F8 !important; border: 1px solid #ECECF2 !important; border-radius: 22px !important; padding: 14px 12px !important; flex-shrink: 0 !important; }
            html body #seoul-mini-theater-modal .ab-ins-grid { display: grid !important; grid-template-columns: repeat(3, 1fr) !important; gap: 6px !important; }
            html body #seoul-mini-theater-modal .ab-ins-square { aspect-ratio: 1 / 1 !important; background: #FFFFFF !important; border: 1px solid #EAEAF0 !important; border-radius: 12px !important; padding: 8px !important; box-sizing: border-box !important; display: flex !important; flex-direction: column !important; justify-content: space-between !important; cursor: pointer !important; overflow: hidden !important; position: relative !important; }

            @keyframes smtSpin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
            html body #seoul-mini-theater-modal .smt-disc-spin { animation: smtSpin 12s linear infinite !important; }
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

        /* ══════════════════════════════════════════════════════════════════
           【PART 3：全屏 HTML 骨架构建】
           ══════════════════════════════════════════════════════════════════ */
        const btn = topDoc.createElement("div");
        btn.id = "seoul-mini-theater-btn";
        btn.innerHTML = `<span class="smt-ico-entry"></span><span class="smt-btn-kr">SEOUL OS</span>`;

        const modal = topDoc.createElement("div");
        modal.id = "seoul-mini-theater-modal";
        modal.innerHTML = `
            <div class="smt-fs-header">
                <div class="smt-exit-btn" id="smt-header-back-btn"><span class="smt-ico-back"></span><span id="smt-back-text">나가기</span></div>
                <div class="smt-header-center">
                    <div class="smt-header-title" id="smt-top-title">SEOUL TALK · 서울톡</div>
                    <div class="smt-header-sub" id="smt-top-sub">Personal Messenger · KST</div>
                </div>
                <div class="smt-header-right" id="smt-top-badge">API · 独立</div>
            </div>

            <div class="smt-fs-body">
                <!-- 01. 独立微信 -->
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
                        <textarea id="smt-wx-css-textarea" style="width:100%;height:96px;background:#FFFFFF !important;border:1px solid #E4E4EC !important;border-radius:8px;padding:7px;font-size:9.5px;font-family:monospace;box-sizing:border-box;"></textarea>
                        <div style="display:flex;justify-content:space-between;margin-top:6px;">
                            <span class="smt-pill-btn" id="smt-wx-css-reset">恢复默认</span>
                            <span class="smt-pill-btn dark" id="smt-wx-css-save">立即应用</span>
                        </div>
                    </div>

                    <div id="smt-wx-sum-drawer" class="smt-section-box" style="display:none;flex-shrink:0;padding:10px !important;">
                        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
                            <span style="font-size:9.5px;font-weight:700;">${WX_ICO.sum} MEMORY SUMMARY · 微信区间总结</span>
                            <span id="smt-wx-sum-close" style="cursor:pointer;font-size:10px;color:#8E8E98 !important;">✕</span>
                        </div>
                        <div style="display:flex;align-items:center;gap:5px;margin-bottom:7px;font-size:9px;">
                            <span>#</span><input type="number" id="smt-sum-from" class="smt-wx-input" style="width:46px !important;height:22px !important;text-align:center;padding:0 !important;" value="1" />
                            <span>至 #</span><input type="number" id="smt-sum-to" class="smt-wx-input" style="width:46px !important;height:22px !important;text-align:center;padding:0 !important;" value="10" />
                            <span class="smt-pill-btn dark" id="smt-sum-run-btn" style="margin-left:auto;">生成总结</span>
                        </div>
                        <textarea id="smt-sum-result" style="width:100%;height:62px;background:#FFFFFF !important;border:1px solid #E4E4EC !important;border-radius:8px;padding:6px 8px;font-size:9.8px;box-sizing:border-box;resize:none;margin-bottom:5px;" placeholder="提炼所选楼层区间的核心记忆..."></textarea>
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
                            <span id="smt-wx-emoji-close" style="cursor:pointer;font-size:10px;color:#8E8E98 !important;">✕</span>
                        </div>
                        <div id="smt-em-pane-kaomoji" class="smt-kaomoji-grid"></div>
                        <div id="smt-em-pane-sticker" style="display:none;">
                            <div id="smt-sticker-grid" class="smt-sticker-grid"></div>
                            <div style="display:flex;gap:4px;align-items:center;">
                                <input type="text" id="smt-st-name-inp" class="smt-wx-input" style="width:68px !important;flex:none !important;height:25px !important;font-size:9.5px !important;" placeholder="名称" />
                                <input type="text" id="smt-st-url-inp" class="smt-wx-input" style="flex:1 !important;height:25px !important;font-size:9.5px !important;" placeholder="粘贴单张表情图片 URL..." />
                                <label class="smt-pill-btn" style="cursor:pointer;height:25px !important;">${WX_ICO.cam}<input type="file" id="smt-st-file-inp" accept="image/*" style="display:none;" /></label>
                                <span class="smt-pill-btn dark" id="smt-st-add-btn" style="height:25px !important;">＋添加</span>
                            </div>
                        </div>
                        <div id="smt-em-pane-batch" style="display:none;">
                            <textarea id="smt-st-batch-inp" style="width:100%;height:70px;background:#FFFFFF !important;border:1px solid #E4E4EC !important;border-radius:8px;padding:6px 8px;font-size:9.5px;box-sizing:border-box;resize:none;margin-bottom:6px;" placeholder="一行一个批量粘贴！格式：名字 | 图片URL（或直接纯图片URL一行一个）"></textarea>
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

                <!-- 全屏微信个人与聊天设置页 -->
                <div class="smt-page" id="smt-page-wx_settings">
                    <div style="display:flex;align-items:center;justify-content:space-between;background:#F8F8F8 !important;border:1px solid #ECECF2 !important;border-radius:13px;padding:8px 11px;margin-bottom:10px;flex-shrink:0;">
                        <span class="smt-pill-btn" id="smt-wxset-back-chat" style="height:26px !important;font-weight:700 !important;">${WX_ICO.backLeft}<span>대화방으로 · 返回聊天界面</span></span>
                        <div class="smt-pill-btn" id="smt-wxset-time-pill" style="pointer-events:none;"></div>
                    </div>
                    <div style="flex:1;min-height:0;overflow-y:auto;padding-bottom:12px;">
                        <div class="smt-prof-card">
                            <div class="smt-sec-title" style="margin-bottom:8px !important;">
                                <span id="smt-wxset-time-title" style="display:inline-flex;align-items:center;gap:5px;"></span>
                                <span class="smt-pill-btn dark" id="smt-wxset-time-toggle"></span>
                            </div>
                            <div style="background:#FFFFFF !important;border:1px solid #EFEFF4 !important;border-radius:11px;padding:9px 12px;font-size:10px;">
                                <div style="font-weight:700;color:#2C2C32 !important;" id="smt-wxset-clock-big"></div>
                                <div style="font-size:8.5px;color:#8E8E98 !important;margin-top:2px;">开启后，TA在微信中会实时感知你手机当前的真实时间与昼夜时段</div>
                            </div>
                        </div>
                        <div class="smt-prof-card">
                            <div class="smt-sec-title">
                                <span>${WX_ICO.userSet} MY PROFILE · 我的个人信息</span>
                                <label class="smt-pill-btn" style="cursor:pointer;">${WX_ICO.cam}<span>本地导入头像</span><input type="file" id="smt-cfg-myava-file" accept="image/*" style="display:none;" /></label>
                            </div>
                            <div class="smt-prof-row">
                                <img id="smt-cfg-myava-preview" src="" style="width:52px;height:52px;border-radius:50%;object-fit:cover;border:1.5px solid #EAEAF0;" />
                                <div style="flex:1;min-width:0;">
                                    <input type="text" id="smt-cfg-mynick" class="smt-wx-input" style="width:100%;height:26px !important;font-size:10px !important;box-sizing:border-box;margin-bottom:5px;" placeholder="我的微信昵称 (留空用原名)" />
                                    <input type="text" id="smt-cfg-mybio" class="smt-wx-input" style="width:100%;height:26px !important;font-size:10px !important;box-sizing:border-box;" placeholder="我的状态签名" />
                                </div>
                            </div>
                            <input type="text" id="smt-cfg-myava" class="smt-wx-input" style="width:100%;height:26px !important;font-size:10px !important;box-sizing:border-box;" placeholder="或粘贴我的头像图片 URL..." />
                        </div>
                        <div class="smt-prof-card">
                            <div class="smt-sec-title">
                                <span>${WX_ICO.userSet} PARTNER PROFILE · 对方聊天设置</span>
                                <label class="smt-pill-btn" style="cursor:pointer;">${WX_ICO.cam}<span>本地导入TA头像</span><input type="file" id="smt-cfg-charava-file" accept="image/*" style="display:none;" /></label>
                            </div>
                            <div class="smt-prof-row">
                                <img id="smt-cfg-charava-preview" src="" style="width:52px;height:52px;border-radius:50%;object-fit:cover;border:1.5px solid #EAEAF0;" />
                                <div style="flex:1;min-width:0;">
                                    <input type="text" id="smt-cfg-remark" class="smt-wx-input" style="width:100%;height:26px !important;font-size:10px !important;box-sizing:border-box;margin-bottom:5px;" placeholder="TA的专属备注名 (留空显示原名)" />
                                    <input type="text" id="smt-cfg-charbio" class="smt-wx-input" style="width:100%;height:26px !important;font-size:10px !important;box-sizing:border-box;" placeholder="TA的顶栏状态签名" />
                                </div>
                            </div>
                            <div style="display:grid;grid-template-columns:1fr 82px;gap:6px;">
                                <input type="text" id="smt-cfg-charava" class="smt-wx-input" style="width:100%;height:26px !important;font-size:10px !important;box-sizing:border-box;" placeholder="TA的头像图片 URL..." />
                                <input type="number" id="smt-cfg-avasize" class="smt-wx-input" style="width:100%;height:26px !important;font-size:10px !important;text-align:center;box-sizing:border-box;" value="33" title="头像尺寸px" />
                            </div>
                        </div>
                        <div class="smt-prof-card" style="margin-bottom:0 !important;">
                            <textarea id="smt-cfg-bgnote" style="width:100%;height:48px;background:#FFFFFF !important;border:1px solid #E4E4EC !important;border-radius:9px;padding:6px 8px;font-size:10px;box-sizing:border-box;resize:none;margin-bottom:8px;" placeholder="补充当前微信私聊专属背景设定 (选填)..."></textarea>
                            <div style="display:flex;justify-content:space-between;">
                                <span class="smt-pill-btn" id="smt-cfg-reset-btn">恢复默认</span>
                                <span class="smt-pill-btn dark" id="smt-cfg-save-btn" style="height:28px !important;padding:0 16px !important;">✓ 保存并返回微信</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 02. 情侣空间桌面（A+B 融合版：同居小屋横幅 + iPad圆润图标坞 + INS九宫格墙） -->
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
                                <div class="ab-couple-avas">
                                    <img id="smt-sp-uava" src="" />
                                    <img id="smt-sp-cava" src="" />
                                </div>
                                <div class="ab-ins-stats">
                                    <div id="smt-sp-edit-date" style="cursor:pointer;">
                                        <div class="ab-stat-num" id="smt-sp-days">D+100</div>
                                        <div class="ab-stat-lbl">相伴天数 ✎</div>
                                    </div>
                                    <div data-openapp="sp_pet" style="cursor:pointer;">
                                        <div class="ab-stat-num" id="smt-stat-pet">LV.2</div>
                                        <div class="ab-stat-lbl" id="smt-stat-petname">萌宠 모찌</div>
                                    </div>
                                    <div data-openapp="sp_coupon" style="cursor:pointer;">
                                        <div class="ab-stat-num" id="smt-stat-fund">3张</div>
                                        <div class="ab-stat-lbl">特权兑换券</div>
                                    </div>
                                </div>
                            </div>
                            <div style="font-size:11px;font-weight:700;color:#2C2C32 !important;margin-bottom:3px;" id="smt-sp-couple-names">ME &amp; PARTNER</div>
                            <div class="ab-ins-bio">
                                <span id="smt-sp-live-bio" style="flex:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;"></span>
                                <span class="smt-pill-btn" id="smt-sp-refresh-live" style="height:21px !important;font-size:8px !important;margin-left:6px !important;">↻ 刷新TA状态</span>
                            </div>
                        </div>
                    </div>

                    <div class="ab-dock-section">
                        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;padding:0 2px;">
                            <span style="font-size:9px;font-weight:700;color:#8E8E98 !important;letter-spacing:0.6px;">OUR SWEET HOME APPS · 双人同居空间应用</span>
                            <span style="font-size:8px;color:#9A9AA5 !important;">点击图标进入全屏 ▸</span>
                        </div>
                        <div class="ab-dock-grid">
                            <div class="ab-app-item" data-openapp="sp_pet">
                                <div class="ab-app-squircle">${AB_ICO.pet}<span class="ab-app-floating-badge" id="smt-badge-pet">LV.2</span></div>
                                <div class="ab-app-title">云养萌宠</div><div class="ab-app-kr">반려동물 · PET</div>
                            </div>
                            <div class="ab-app-item" data-openapp="sp_4cut">
                                <div class="ab-app-squircle">${AB_ICO.cam4}<span class="ab-app-floating-badge">BOOTH</span></div>
                                <div class="ab-app-title">人生四格</div><div class="ab-app-kr">인생네컷 · PHOTO</div>
                            </div>
                            <div class="ab-app-item" data-openapp="sp_qa">
                                <div class="ab-app-squircle">${AB_ICO.qa}<span class="ab-app-floating-badge">Q&amp;A</span></div>
                                <div class="ab-app-title">灵魂百问</div><div class="ab-app-kr">질문캡슐 · ASK</div>
                            </div>
                            <div class="ab-app-item" data-openapp="sp_mood">
                                <div class="ab-app-squircle">${AB_ICO.wave}<span class="ab-app-floating-badge" id="smt-badge-bpm">96</span></div>
                                <div class="ab-app-title">同居波频</div><div class="ab-app-kr">심박동기 · SYNC</div>
                            </div>
                            <div class="ab-app-item" data-openapp="sp_coupon">
                                <div class="ab-app-squircle">${AB_ICO.ticket}<span class="ab-app-floating-badge" id="smt-badge-coupon">3张</span></div>
                                <div class="ab-app-title">恋爱兑换券</div><div class="ab-app-kr">러브쿠폰 · TICKET</div>
                            </div>
                            <div class="ab-app-item" data-openapp="sp_guest">
                                <div class="ab-app-squircle">${AB_ICO.guest}<span class="ab-app-floating-badge" id="smt-badge-todo">留言</span></div>
                                <div class="ab-app-title">留言与心愿</div><div class="ab-app-kr">방명록 · NOTES</div>
                            </div>
                        </div>
                    </div>

                    <div class="ab-ins-feed-box">
                        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">
                            <div style="display:flex;align-items:center;gap:5px;font-size:9.5px;font-weight:700;color:#2C2C32 !important;">
                                ${AB_ICO.grid}<span>COUPLE INS FEED · 双人九宫格手账墙</span>
                            </div>
                            <div style="display:flex;gap:4px;">
                                <span class="smt-pill-btn" id="smt-ins-user-add">＋ 我发格</span>
                                <span class="smt-pill-btn dark" id="smt-ins-ai-add">✦ 让TA发情侣格</span>
                            </div>
                        </div>
                        <div id="smt-ins-detail-pop" style="display:none;background:#FFFFFF !important;border:1px solid #EAEAF0 !important;border-radius:14px;padding:11px 12px;margin-bottom:9px;font-size:10.5px;line-height:1.6;"></div>
                        <div class="ab-ins-grid" id="smt-ab-ins-grid"></div>
                    </div>
                </div>

                <!-- 情侣空间 6 大全屏子页面 -->
                <div class="smt-page" id="smt-page-sp_pet">
                    <div class="smt-section-box" style="text-align:center;padding:18px 14px !important;">
                        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">
                            <span style="font-size:9px;font-weight:700;color:#8E8E98 !important;">COUPLE PET HOUSE · 반려동물 하우스</span>
                            <span class="smt-pill-btn" id="smt-pet-rename">✎ 改宠物名</span>
                        </div>
                        <div style="width:72px;height:72px;border-radius:20px;background:#FFFFFF !important;border:1.5px solid #EAEAF0 !important;margin:0 auto 8px auto;display:flex;align-items:center;justify-content:center;">${AB_ICO.petLg}</div>
                        <div style="font-size:14px;font-weight:700;" id="smt-pet-name">모찌 (糯米团)</div>
                        <div style="font-size:9px;color:#7A7A85 !important;margin:2px 0 12px 0;" id="smt-pet-lv">LV.2</div>
                        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;background:#FFFFFF !important;border:1px solid #EFEFF4 !important;border-radius:12px;padding:11px;text-align:left;margin-bottom:12px;">
                            <div><div style="display:flex;justify-content:space-between;font-size:9.5px;"><span>饱食度</span><b id="smt-pet-hunger-txt">85%</b></div><div class="smt-bar-bg"><div class="smt-bar-fill" id="smt-pet-hunger-bar" style="width:85%;"></div></div></div>
                            <div><div style="display:flex;justify-content:space-between;font-size:9.5px;"><span>亲密心情</span><b id="smt-pet-mood-txt">92%</b></div><div class="smt-bar-bg"><div class="smt-bar-fill" id="smt-pet-mood-bar" style="width:92%;"></div></div></div>
                        </div>
                        <div id="smt-pet-log" style="font-size:11px;line-height:1.68;background:#FFFFFF !important;border:1px solid #EAEAF0 !important;border-radius:12px;padding:12px;text-align:left;min-height:64px;margin-bottom:12px;"></div>
                        <div style="display:flex;gap:6px;">
                            <span class="smt-pill-btn" id="smt-pet-feed" style="flex:1;height:30px !important;">喂冻干零食</span>
                            <span class="smt-pill-btn" id="smt-pet-pat" style="flex:1;height:30px !important;">揉揉小脑袋</span>
                            <span class="smt-pill-btn dark" id="smt-pet-ai-play" style="flex:1.3;height:30px !important;">✦ 让TA陪宠物玩</span>
                        </div>
                    </div>
                </div>

                <div class="smt-page" id="smt-page-sp_4cut">
                    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">
                        <span style="font-size:10.5px;font-weight:700;">인생네컷 · 首尔街头人生四格自拍亭</span>
                        <span class="smt-pill-btn dark" id="smt-4cut-gen-btn">✦ 和TA拍一组新四格</span>
                    </div>
                    <div id="smt-4cut-stage" style="background:#F8F8F8 !important;border:1.5px solid #E6E6EC !important;border-radius:18px;padding:16px 14px;text-align:center;"></div>
                </div>

                <div class="smt-page" id="smt-page-sp_qa">
                    <div class="smt-section-box">
                        <div class="smt-sec-title">
                            <span>LOVE Q&amp;A · 情侣灵魂提问箱</span>
                            <div style="display:flex;gap:5px;"><span class="smt-pill-btn" id="smt-qa-next">换一题</span><span class="smt-pill-btn dark" id="smt-qa-ai-ans">✦ 让TA作答</span></div>
                        </div>
                        <div style="background:#FFFFFF !important;border:1px solid #EAEAF0 !important;border-radius:12px;padding:13px;margin-bottom:10px;">
                            <div style="font-size:8.5px;color:#8E8E98 !important;font-weight:700;margin-bottom:3px;">TODAY'S QUESTION</div>
                            <div style="font-size:12px;font-weight:700;line-height:1.55;" id="smt-qa-q"></div>
                        </div>
                        <div style="background:#FFFFFF !important;border:1px solid #EAEAF0 !important;border-radius:12px;padding:12px;margin-bottom:9px;cursor:pointer;" id="smt-qa-edit-my">
                            <div style="font-size:8.5px;color:#8E8E98 !important;font-weight:700;margin-bottom:3px;">MY ANSWER · 点击填写</div>
                            <div style="font-size:11px;line-height:1.6;" id="smt-qa-my-txt"></div>
                        </div>
                        <div style="background:#FFFFFF !important;border:1px solid #EAEAF0 !important;border-radius:12px;padding:12px;">
                            <div style="font-size:8.5px;color:#8E8E98 !important;font-weight:700;margin-bottom:3px;" id="smt-qa-char-label">PARTNER'S ANSWER</div>
                            <div style="font-size:11px;line-height:1.6;" id="smt-qa-char-txt"></div>
                        </div>
                    </div>
                </div>

                <div class="smt-page" id="smt-page-sp_mood">
                    <div class="smt-section-box">
                        <div class="smt-sec-title"><span>HEARTBEAT &amp; STATUS · 实时同居波频监测</span><span class="smt-pill-btn dark" id="smt-mood-sync-btn">↻ 实时感应TA此刻状态</span></div>
                        <div id="smt-mood-stage"></div>
                    </div>
                </div>

                <div class="smt-page" id="smt-page-sp_coupon">
                    <div class="smt-section-box">
                        <div class="smt-sec-title"><span>LOVE COUPON · 情侣特权兑换券包</span><span class="smt-pill-btn" id="smt-coupon-add">＋ 自定义新券</span></div>
                        <div id="smt-coupon-list"></div>
                        <div id="smt-coupon-log" style="background:#FFFFFF !important;border:1px dashed #D5D5DE !important;border-radius:12px;padding:12px;font-size:11px;line-height:1.65;margin-top:10px;"></div>
                    </div>
                </div>

                <div class="smt-page" id="smt-page-sp_guest">
                    <div class="smt-section-box">
                        <div class="smt-sec-title"><span>GUESTBOOK · 双人悄悄话留言板</span><span class="smt-pill-btn" id="smt-sp-ai-note">让TA主动留言</span></div>
                        <div id="smt-sp-notes-list" style="max-height:180px;overflow-y:auto;margin-bottom:8px;"></div>
                        <div style="display:flex;gap:5px;">
                            <input type="text" id="smt-sp-note-input" class="smt-wx-input" placeholder="방명록 남기기... 写下悄悄话让TA回复" />
                            <span class="smt-pill-btn dark" id="smt-sp-note-send" style="height:30px !important;padding:0 12px !important;">留言</span>
                        </div>
                    </div>
                    <div class="smt-section-box">
                        <div class="smt-sec-title"><span>BUCKET LIST · 恋爱百事心愿单</span><span class="smt-pill-btn" id="smt-sp-add-todo">＋ 新增心愿</span></div>
                        <div id="smt-sp-todo-list"></div>
                    </div>
                </div>

                <!-- 03. 个人主页与应用 -->
                <div class="smt-page" id="smt-page-home">
                    <div id="smt-user-html-stage" style="margin-bottom:8px;"></div>
                    <div style="display:flex;justify-content:space-between;align-items:center;gap:4px;flex-wrap:wrap;margin-bottom:12px;">
                        <div style="display:flex;gap:4px;">
                            <span class="smt-pill-btn" data-tpl="coupleId">模板1: 情侣卡</span>
                            <span class="smt-pill-btn" data-tpl="polaroid">模板2: 拍立得</span>
                            <span class="smt-pill-btn" data-tpl="receipt">模板3: 票根</span>
                        </div>
                        <span class="smt-pill-btn dark" id="smt-open-html-edit">导入/编辑主页HTML</span>
                    </div>
                    <div id="smt-html-editor" style="display:none;" class="smt-section-box">
                        <div style="display:flex;justify-content:space-between;font-size:8.5px;margin-bottom:5px;">
                            <span>变量: {{user}} {{char}} {{avatar}} {{charAvatar}} {{days}} {{count}}</span>
                            <label style="cursor:pointer;font-weight:700;">上传.html<input type="file" id="smt-upload-html" accept=".html,.txt" style="display:none;"/></label>
                        </div>
                        <textarea id="smt-html-textarea" style="width:100%;height:96px;background:#FFFFFF !important;border:1px solid #E4E4EC !important;border-radius:8px;padding:7px;font-size:9.5px;font-family:monospace;box-sizing:border-box;"></textarea>
                        <div style="display:flex;justify-content:flex-end;gap:5px;margin-top:6px;"><span class="smt-pill-btn dark" id="smt-save-html">保存主页</span></div>
                    </div>
                    <div class="ab-dock-section">
                        <div class="ab-dock-grid">
                            <div class="ab-app-item" data-openapp="phone">
                                <div class="ab-app-squircle">${AB_ICO.phone}</div>
                                <div class="ab-app-title">突击查手机</div><div class="ab-app-kr">PHONE CHECK</div>
                            </div>
                            <div class="ab-app-item" data-openapp="music">
                                <div class="ab-app-squircle">${AB_ICO.music}</div>
                                <div class="ab-app-title">网易云同听</div><div class="ab-app-kr">MUSIC BOOTH</div>
                            </div>
                            <div class="ab-app-item" data-openapp="diary">
                                <div class="ab-app-squircle">${AB_ICO.book}</div>
                                <div class="ab-app-title">交换日记本</div><div class="ab-app-kr">SHARED DIARY</div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 查手机 / 旋转黑胶网易云 / 交换日记 全屏页 -->
                <div class="smt-page" id="smt-page-phone">
                    <div style="background:#F8F8F8 !important;border:1px solid #ECECF2 !important;border-radius:16px;padding:10px 13px;margin-bottom:10px;display:flex;align-items:center;justify-content:space-between;flex-shrink:0;">
                        <div style="display:flex;align-items:center;gap:10px;"><img id="smt-ph-ava" src="" style="width:36px;height:36px;border-radius:50%;object-fit:cover;border:2px solid #FFFFFF;" /><div><div style="font-size:11px;font-weight:700;" id="smt-ph-owner">TA's iPhone</div><div style="font-size:8px;color:#8E8E98 !important;">FACE ID UNLOCKED</div></div></div>
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
                            <img id="smt-mus-uava" src="" style="width:40px;height:40px;border-radius:50%;object-fit:cover;border:2px solid #FFFFFF;" />
                            <div class="smt-disc-spin" style="width:58px;height:58px;border-radius:50%;background:radial-gradient(circle, #FFFFFF 22%, #3A3A40 24%, #484852 68%, #EAEAF0 70%);border:2px solid #ECECF2;display:flex;align-items:center;justify-content:center;overflow:hidden;">
                                <img id="smt-mus-cover" src="https://i.postimg.cc/rydS6NvG/IMG-3866.jpg" style="width:26px;height:26px;border-radius:50%;object-fit:cover;" />
                            </div>
                            <img id="smt-mus-cava" src="" style="width:40px;height:40px;border-radius:50%;object-fit:cover;border:2px solid #FFFFFF;" />
                        </div>
                        <div style="font-size:12px;font-weight:700;" id="smt-mus-title">Love Lee - AKMU</div>
                        <div style="font-size:8.5px;color:#8E8E98 !important;margin:2px 0 6px 0;" id="smt-mus-sub">蓝牙耳机共享同听中</div>
                        <audio id="smt-audio-player" controls style="width:100%;height:30px;outline:none;"></audio>
                        <div id="smt-ncm-iframe-wrap" style="display:none;margin-top:4px;"></div>
                        <div style="display:flex;justify-content:center;gap:5px;margin-top:7px;">
                            <span class="smt-pill-btn" id="smt-mus-like-cur">♡ 加入我喜欢</span>
                            <span class="smt-pill-btn" id="smt-mus-toggle-iframe">切换官方播放器</span>
                            <span class="smt-pill-btn dark" id="smt-ncm-ai-listen">✦ 让TA点评这首歌</span>
                        </div>
                        <div id="smt-mus-ai-comment" style="margin-top:7px;font-size:10px;background:#FFFFFF !important;border:1px solid #ECECF2 !important;border-radius:9px;padding:7px 10px;display:none;text-align:left;line-height:1.6;"></div>
                    </div>
                    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:5px;margin-bottom:8px;flex-shrink:0;">
                        <span class="smt-pill-btn dark" data-mustab="liked" id="smt-tab-liked-btn">♥ 我喜欢</span>
                        <span class="smt-pill-btn" data-mustab="search">🔍 搜网易云曲库</span>
                        <span class="smt-pill-btn" data-mustab="import">📥 导网易云歌单</span>
                    </div>
                    <div id="smt-mus-pane-liked" style="flex:1;min-height:0;overflow-y:auto;"></div>
                    <div id="smt-mus-pane-search" style="display:none;flex:1;min-height:0;flex-direction:column;">
                        <div style="display:flex;gap:5px;margin-bottom:8px;flex-shrink:0;"><input type="text" id="smt-mus-search-input" class="smt-wx-input" placeholder="输入歌名或歌手搜索..." /><span class="smt-pill-btn dark" id="smt-mus-search-btn" style="height:30px !important;padding:0 14px !important;">搜索</span></div>
                        <div id="smt-mus-search-results" style="flex:1;min-height:0;overflow-y:auto;"></div>
                    </div>
                    <div id="smt-mus-pane-import" style="display:none;flex:1;min-height:0;overflow-y:auto;">
                        <div class="smt-section-box">
                            <div style="display:flex;gap:5px;margin-bottom:5px;"><input type="text" id="smt-ncm-pl-link" class="smt-wx-input" placeholder="粘贴网易云公开歌单链接或ID..." /><span class="smt-pill-btn dark" id="smt-ncm-pl-sync-btn" style="height:30px !important;padding:0 12px !important;">整单导入</span></div>
                            <div id="smt-ncm-pl-status" style="font-size:9px;color:#55555E !important;font-weight:600;"></div>
                        </div>
                        <div class="smt-section-box">
                            <textarea id="smt-mus-import-text" style="width:100%;height:70px;background:#FFFFFF !important;border:1px solid #E4E4EC !important;border-radius:8px;padding:7px;font-size:9.5px;box-sizing:border-box;margin-bottom:6px;" placeholder="支持一行一首歌名或网易云单曲分享链接..."></textarea>
                            <div style="display:flex;justify-content:space-between;"><span class="smt-pill-btn" id="smt-mus-clear-liked">清空我喜欢</span><span class="smt-pill-btn dark" id="smt-mus-import-run">＋ 批量导入到我喜欢</span></div>
                        </div>
                    </div>
                </div>

                <div class="smt-page" id="smt-page-diary">
                    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;flex-shrink:0;"><span style="font-size:10.5px;font-weight:700;">EXCHANGE DIARY · 双人交换日记本</span><span class="smt-pill-btn dark" id="smt-diary-ai-write">✦ 让TA写今日日记</span></div>
                    <div id="smt-diary-list" style="flex:1;min-height:0;overflow-y:auto;margin-bottom:8px;"></div>
                    <div class="smt-section-box" style="margin-bottom:0 !important;flex-shrink:0;">
                        <textarea id="smt-diary-input" style="width:100%;height:52px;background:#FFFFFF !important;border:1px solid #E6E6EC !important;border-radius:8px;padding:7px;font-size:11px;box-sizing:border-box;resize:none;margin-bottom:6px;" placeholder="오늘의 일기... 写下你今天的日记"></textarea>
                        <div style="text-align:right;"><span class="smt-pill-btn dark" id="smt-diary-user-save">存入交换日记本</span></div>
                    </div>
                </div>

                <!-- 04. 历史记录馆 -->
                <div class="smt-page" id="smt-page-archive">
                    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;"><span style="font-size:10px;font-weight:700;">SAVED ARCHIVES · 当前角色历史馆</span><span class="smt-pill-btn" id="smt-export-arch">导出 JSON</span></div>
                    <div id="smt-archive-list" style="flex:1;overflow-y:auto;"></div>
                </div>

                <!-- 05. 独立 API 设置 -->
                <div class="smt-page" id="smt-page-api">
                    <div class="smt-section-box" style="background:#FFFFFF !important;border:1.5px solid #484852 !important;">
                        <div style="font-size:10.5px;font-weight:700;margin-bottom:3px;">⚡ 全系统独立 API 引擎（所有功能均按此配置生成）</div>
                        <div style="font-size:8.8px;color:#7A7A85 !important;" id="smt-api-status-tip">请确认下方已填写你的反代地址与 API Key</div>
                    </div>
                    <div class="smt-section-box"><div style="font-size:9.5px;font-weight:700;margin-bottom:4px;">1. 独立 API 地址 (Base URL)</div><input type="text" id="smt-api-url" class="smt-wx-input" style="width:100%;box-sizing:border-box;border-radius:8px !important;" placeholder="https://api.openai.com/v1" /></div>
                    <div class="smt-section-box"><div style="font-size:9.5px;font-weight:700;margin-bottom:4px;">2. 独立 API Key</div><input type="password" id="smt-api-key" class="smt-wx-input" style="width:100%;box-sizing:border-box;border-radius:8px !important;" placeholder="sk-..." /></div>
                    <div class="smt-section-box">
                        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;"><span style="font-size:9.5px;font-weight:700;">3. 模型名称</span><span class="smt-pill-btn" id="smt-fetch-models">🔄 拉取模型</span></div>
                        <input type="text" id="smt-api-model" class="smt-wx-input" style="width:100%;box-sizing:border-box;border-radius:8px !important;" placeholder="gpt-4o-mini / deepseek-chat / claude..." />
                        <select id="smt-model-select" class="smt-wx-input" style="width:100%;margin-top:5px;display:none;border-radius:8px !important;"></select>
                    </div>
                    <div class="smt-section-box"><div style="font-size:9.5px;font-weight:700;margin-bottom:4px;">4. 自动读取主线最近几层聊天作为上下文参考</div><input type="number" id="smt-api-ctx" class="smt-wx-input" style="width:100%;box-sizing:border-box;border-radius:8px !important;" value="8" /></div>
                    <div style="display:flex;justify-content:flex-end;gap:6px;">
                        <span class="smt-pill-btn" id="smt-test-api" style="height:30px !important;padding:0 12px !important;">⚡ 测试连接</span>
                        <span class="smt-pill-btn dark" id="smt-save-api" style="height:30px !important;padding:0 16px !important;">✓ 保存独立 API 设置</span>
                    </div>
                </div>
            </div>

            <div class="smt-bottom-dock">
                <div class="smt-tab-item active" data-page="talk" data-title="SEOUL TALK · 서울톡" data-sub="Personal Messenger · KST"><span class="smt-tab-ico"></span><span class="smt-tab-txt">微信</span></div>
                <div class="smt-tab-item" data-page="space" data-title="COUPLE SPACE · 커플공간" data-sub="6 Exclusive Couple Apps"><span class="smt-tab-ico"></span><span class="smt-tab-txt">情侣空间</span></div>
                <div class="smt-tab-item" data-page="home" data-title="MY HOME · 마이페이지" data-sub="Custom HTML &amp; Utility Apps"><span class="smt-tab-ico"></span><span class="smt-tab-txt">主页/应用</span></div>
                <div class="smt-tab-item" data-page="archive" data-title="ARCHIVE · 보관함" data-sub="Saved Records &amp; Cards"><span class="smt-tab-ico"></span><span class="smt-tab-txt">历史</span></div>
                <div class="smt-tab-item" data-page="api" data-title="API CONFIG · 환경설정" data-sub="Standalone Connection"><span class="smt-tab-ico"></span><span class="smt-tab-txt">API设置</span></div>
            </div>
        `;

        topDoc.body.appendChild(btn);
        topDoc.body.appendChild(modal);

        /* ══════════════════════════════════════════════════════════════════
           【PART 4：路由跳转与微信模块核心逻辑】
           ══════════════════════════════════════════════════════════════════ */
        let currentPage = "talk", lastMainPage = "space";
        const SUB_APPS = ["wx_settings", "sp_pet", "sp_4cut", "sp_qa", "sp_mood", "sp_coupon", "sp_guest", "phone", "music", "diary"];

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

            if (pageId === "talk") renderWeChat();
            if (pageId === "space" || pageId.startsWith("sp_")) renderCoupleSpaceAll();
            if (pageId === "home") renderHomeHtml();
            if (pageId === "archive") renderArchive();
            if (pageId === "phone") renderFullPhoneApp();
            if (pageId === "music") renderMusicApp();
            if (pageId === "diary") renderDiaryApp();
        }

        topDoc.getElementById("smt-header-back-btn").onclick = () => {
            if (SUB_APPS.includes(currentPage)) {
                const target = currentPage === "wx_settings" ? "talk" : lastMainPage;
                const targetTab = topDoc.querySelector(`.smt-tab-item[data-page="${target}"]`);
                navigateToPage(target, targetTab?.getAttribute("data-title"), targetTab?.getAttribute("data-sub"));
            } else {
                modal.classList.remove("smt-open");
            }
        };
        topDoc.getElementById("smt-top-badge").onclick = () => navigateToPage("api", "API CONFIG · 환경설정", "Standalone Connection");
        topDoc.querySelectorAll(".smt-tab-item").forEach((tab) => tab.onclick = () => navigateToPage(tab.getAttribute("data-page"), tab.getAttribute("data-title"), tab.getAttribute("data-sub")));
        topDoc.querySelectorAll("[data-openapp]").forEach((card) => card.onclick = () => navigateToPage(card.getAttribute("data-openapp"), "SEOUL EXCLUSIVE APP", "Full-Screen Interactive View"));

        const KAOMOJI_LIST = ["૮꒰ ˶• ༝ •˶꒱ა", "(｡•́︿•̀｡)", "♡(˃͈ દ ˂͈ ༶ )", "( ´͈ ᵕ `͈ )◞♡", "(⁎⁍̴̛ᴗ⁍̴̛⁎)", "(¬_¬ )", "( ˘•ω•˘ )", "✧(≖ ◡ ≖✿)", "(っ´ω`c)", "૮ • ﻌ - ა", "(⁄ ⁄•⁄ω⁄•⁄ ⁄)", "(╬▔皿▔)╯", "🥺", "🤍", "😭", "💢"];
        let activeQuoteText = "", activeMenuMsgIdx = -1, activeEditMsgIdx = -1, lastObservedCharScope = "";

        function refreshSyncedMemoryPool() {
            const list = getChatList().filter((m) => m.role !== "sys").slice(-12);
            const ctxInfo = getSTContext(1);
            const memoryBlock = (getSyncMode() && list.length > 0)
                ? `[近期手机微信私聊记忆 (${ctxInfo.userName} 与 ${ctxInfo.charName} 在线上聊过的内容)：${list.map((m) => `${m.role === "user" ? ctxInfo.userName : ctxInfo.charName}: ${m.text}`).join(" | ")}]`
                : "";
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
                topDoc.getElementById("smt-top-title").textContent = `${displayCharName} · 서울톡`;
                topDoc.getElementById("smt-top-sub").textContent = `${wCfg.charBio || "Personal Messenger"} · ${rt.timeStr} ${rt.periodCn}`;
                topDoc.getElementById("smt-top-badge").innerHTML = `${rt.icon}<span style="margin-left:3px;">${rt.timeStr}</span>`;
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
                    innerHtml = `<div class="smt-wx-pay-card" data-msgidx="${idx}"><div class="smt-wx-pay-top"><div class="smt-wx-pay-ico"></div><div><div class="smt-wx-pay-amt">₩ / ¥ ${amt}</div><div class="smt-wx-pay-note">${m.accepted ? "✓ 已收款 · " + note : note}</div></div></div><div class="smt-wx-pay-foot"><span>SEOUL PAY</span><span>${m.accepted ? "COMPLETED" : "TRANSFER"}</span></div></div>`;
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
                        <span class="smt-wx-act-item" data-wxop="del" data-idx="${idx}" style="color:#9A6868 !important;">${WX_ICO.del}<span>删除</span></span>
                    </div>` : "";

                const editHtml = activeEditMsgIdx === idx ? `
                    <div class="smt-wx-edit-box">
                        <textarea class="smt-wx-edit-area" id="smt-wx-edit-input-${idx}">${m.text.replace(/</g, "&lt;")}</textarea>
                        <div style="display:flex;justify-content:flex-end;gap:4px;"><span class="smt-pill-btn" data-editcancel="${idx}">取消</span><span class="smt-pill-btn dark" data-editsave="${idx}">保存</span></div>
                    </div>` : "";

                row.innerHTML = `
                    <img class="smt-wx-ava" src="${isMe ? displayMyAva : displayCharAva}" style="width:${avaPx} !important;height:${avaPx} !important;min-width:${avaPx} !important;min-height:${avaPx} !important;"/>
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

        // 表情抽屉与批量导入
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

        // 全屏聊天设置页
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
        topDoc.getElementById("smt-wxset-back-chat").onclick = () => navigateToPage("talk", "SEOUL TALK · 서울톡", "Personal Messenger · KST");
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
            navigateToPage("talk", "SEOUL TALK · 서울톡", "Personal Messenger · KST");
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

        /* ══════════════════════════════════════════════════════════════════
           【PART 5：🤍 A+B 融合版情侣空间逻辑】
           ══════════════════════════════════════════════════════════════════ */
        const QA_QUESTIONS = [
            "第一次悄悄对彼此产生超越普通关系的占有欲，是在哪个瞬间？",
            "如果今晚首尔突然停电，只有我们两个人被困在家里，最想一起做什么？",
            "对方身上有一个连TA自己都没察觉到、但你却觉得很可爱的小习惯是什么？",
            "手机相册里最舍不得删掉的一张和对方有关的照片（或截图）是什么？",
            "吵架或冷战的时候，对方做什么动作会让你瞬间心软投降？"
        ];

        function getSpaceData() {
            const ctx = getSTContext(1), key = getSafeScopedKey("seoul_v12_space");
            const def = {
                startDate: "2024-05-20", mood: "36.7°C · SWEET HOME", bgUrl: "", charNow: "正在小厨房给你热牛奶",
                pet: { name: "모찌 (糯米团)", lv: 2, hunger: 85, mood: 92, lastLog: `与 ${ctx.charName} 共同领养的小宠物正蜷在地毯上打呼噜。` },
                life4cut: { date: "SEOUL STUDIO", frames: [`点击右上角生成你与 ${ctx.charName} 的专属四连拍`, "第二格画面", "第三格画面", "第四格定格"], sign: `${ctx.charName} & ME` },
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
                    { tag: "DAY 01", scene: "两人并肩走过的首尔街角路灯与被拉长的影子", caption: "우리의 시작 · 我们的开始", likes: 52, time: "置顶" },
                    { tag: "HOME", scene: "茶几上并排放着的两只马克杯，热气氤氲", caption: "나른한 오후 · 慵懒午后", likes: 64, time: "置顶" },
                    { tag: "PET", scene: "蜷在沙发角落熟睡的小宠物，身上盖着TA的外套", caption: "새 가족 · 家里的小成员", likes: 88, time: "置顶" }
                ]
            };
            try { return Object.assign(def, JSON.parse(localStorage.getItem(key) || "{}")); } catch (e) { return def; }
        }
        function saveSpaceData(d) { localStorage.setItem(getSafeScopedKey("seoul_v12_space"), JSON.stringify(d)); }
        function calcTogetherDays() { const diff = Math.max(1, Math.floor((Date.now() - new Date(getSpaceData().startDate || "2024-05-20").getTime()) / 86400000)); return isNaN(diff) ? 100 : diff; }

        function renderCoupleSpaceAll() {
            const ctx = getSTContext(1), wCfg = getWxCfg(), sp = getSpaceData();
            const myName = wCfg.myNick || ctx.userName, charName = wCfg.remark || ctx.charName;
            const myAva = wCfg.myAva || ctx.userAvatar, charAva = wCfg.charAva || ctx.charAvatar;

            const heroCard = topDoc.getElementById("smt-sp-hero-card");
            if (heroCard) {
                heroCard.style.backgroundImage = sp.bgUrl
                    ? `linear-gradient(to bottom, rgba(0,0,0,0.08), rgba(0,0,0,0.22)), url('${sp.bgUrl}')`
                    : "linear-gradient(135deg, #F5F5F8 0%, #EAEAF0 100%)";
            }
            topDoc.getElementById("smt-sp-char-scope-tag").innerHTML = `${AB_ICO.heartSm}<span>${charName} · HOME</span>`;
            topDoc.getElementById("smt-sp-uava").src = myAva;
            topDoc.getElementById("smt-sp-cava").src = charAva;
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
            gridEl.innerHTML = feed.slice(0, 9).map((post, idx) => `
                <div class="ab-ins-square" data-insidx="${idx}">
                    <div style="display:flex;justify-content:space-between;font-size:7.5px;font-weight:700;color:#8E8E98 !important;">
                        <span>${post.tag || `0${idx + 1}`}</span><span>♥ ${post.likes || 52}</span>
                    </div>
                    <div style="font-size:9px;color:#3A3A40 !important;line-height:1.35;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden;font-weight:500;margin:auto 0;">${post.scene || ""}</div>
                    <div style="font-size:8px;font-weight:700;color:#2C2C32 !important;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;border-top:1px solid #F0F0F5 !important;padding-top:3px;">${post.caption || ""}</div>
                </div>`).join("");

            gridEl.querySelectorAll("[data-insidx]").forEach((sq) => sq.onclick = () => {
                const idx = Number(sq.getAttribute("data-insidx")), p = feed[idx]; if (!p) return;
                const pop = topDoc.getElementById("smt-ins-detail-pop"); pop.style.display = "block";
                pop.innerHTML = `<div style="display:flex;justify-content:space-between;margin-bottom:4px;"><b>📸 [${p.tag}] ${p.caption}</b><div><span data-delins="${idx}" style="font-size:9px;color:#9A6868 !important;cursor:pointer;margin-right:8px;">删除</span><span id="smt-ins-pop-close" style="cursor:pointer;">✕</span></div></div><div>${p.scene}</div>`;
                pop.querySelector("#smt-ins-pop-close").onclick = () => (pop.style.display = "none");
                pop.querySelector("[data-delins]").onclick = () => { const d = getSpaceData(); d.insGrid.splice(idx, 1); saveSpaceData(d); pop.style.display = "none"; renderCoupleSpaceAll(); };
            });

            topDoc.getElementById("smt-pet-name").textContent = pet.name;
            topDoc.getElementById("smt-pet-lv").textContent = `LV.${pet.lv || 1} · 与 ${charName} 共同抚养`;
            topDoc.getElementById("smt-pet-hunger-txt").textContent = `${pet.hunger}%`;
            topDoc.getElementById("smt-pet-hunger-bar").style.width = `${pet.hunger}%`;
            topDoc.getElementById("smt-pet-mood-txt").textContent = `${pet.mood}%`;
            topDoc.getElementById("smt-pet-mood-bar").style.width = `${pet.mood}%`;
            topDoc.getElementById("smt-pet-log").textContent = `🐾 ${pet.lastLog}`;

            const cut = sp.life4cut || { date: "SEOUL", frames: [], sign: "" };
            topDoc.getElementById("smt-4cut-stage").innerHTML = `<div style="background:#FFFFFF !important;border:1px solid #EAEAF0 !important;border-radius:14px;padding:14px;max-width:290px;margin:0 auto;"><div style="font-size:8.5px;font-weight:700;letter-spacing:1.2px;color:#8E8E98 !important;margin-bottom:10px;">LIFE4CUT · 인생네컷 STUDIO</div>${(cut.frames || []).slice(0, 4).map((f, i) => `<div style="background:#F8F8F8 !important;border:1px solid #ECECF2 !important;border-radius:10px;padding:12px;margin-bottom:8px;text-align:left;"><span style="font-size:8px;font-weight:700;color:#9A9AA5 !important;display:block;margin-bottom:3px;">CUT 0${i + 1}</span><div style="font-size:11px;line-height:1.6;">${f}</div></div>`).join("")}<div style="display:flex;justify-content:space-between;font-size:9px;color:#6E6E77 !important;font-weight:700;"><span>${cut.sign}</span><span>${cut.date}</span></div></div>`;

            const qIdx = (sp.qaIndex || 0) % QA_QUESTIONS.length;
            topDoc.getElementById("smt-qa-q").textContent = `Q${qIdx + 1}. ${QA_QUESTIONS[qIdx]}`;
            topDoc.getElementById("smt-qa-my-txt").textContent = sp.qaUserAns;
            topDoc.getElementById("smt-qa-char-label").textContent = `${charName}'S ANSWER`;
            topDoc.getElementById("smt-qa-char-txt").textContent = sp.qaCharAns;

            topDoc.getElementById("smt-mood-stage").innerHTML = `<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-bottom:10px;"><div style="background:#FFFFFF !important;border:1px solid #EFEFF4 !important;border-radius:12px;padding:10px;text-align:center;"><div style="font-size:8px;color:#8E8E98 !important;">HEART RATE</div><div style="font-size:13px;font-weight:700;margin-top:3px;">${ms.bpm}</div></div><div style="background:#FFFFFF !important;border:1px solid #EFEFF4 !important;border-radius:12px;padding:10px;text-align:center;"><div style="font-size:8px;color:#8E8E98 !important;">BODY TEMP</div><div style="font-size:13px;font-weight:700;margin-top:3px;">${ms.temp}</div></div><div style="background:#FFFFFF !important;border:1px solid #EFEFF4 !important;border-radius:12px;padding:10px;text-align:center;"><div style="font-size:8px;color:#8E8E98 !important;">MISS YOU</div><div style="font-size:13px;font-weight:700;margin-top:3px;">${ms.miss}</div></div></div><div style="background:#FFFFFF !important;border:1px solid #EFEFF4 !important;border-radius:12px;padding:12px;margin-bottom:8px;"><div style="font-size:8.5px;color:#8E8E98 !important;font-weight:700;margin-bottom:4px;">CURRENT ACTION · 此刻动态</div><div style="font-size:11.5px;line-height:1.6;">${ms.action}</div></div><div style="background:#FFFFFF !important;border:1px solid #EFEFF4 !important;border-radius:12px;padding:12px;"><div style="font-size:8.5px;color:#8E8E98 !important;font-weight:700;margin-bottom:4px;">INNER VOICE · 内心心声</div><div style="font-size:11.5px;line-height:1.6;">${ms.os}</div></div>`;

            const cpList = topDoc.getElementById("smt-coupon-list");
            cpList.innerHTML = (sp.coupons || []).map((c, idx) => `<div style="display:flex;justify-content:space-between;align-items:center;background:#FFFFFF !important;border:1px solid #EAEAF0 !important;border-radius:12px;padding:11px 12px;margin-bottom:8px;"><div style="padding-right:10px;"><div style="font-size:11px;font-weight:700;">🎟️ ${c.title}</div><div style="font-size:9px;color:#7A7A85 !important;margin-top:2px;">${c.desc}</div></div><span class="smt-pill-btn dark" data-usecp="${idx}">向TA使用</span></div>`).join("");
            topDoc.getElementById("smt-coupon-log").textContent = sp.couponLog || "";
            cpList.querySelectorAll("[data-usecp]").forEach((b) => b.onclick = async () => {
                const idx = Number(b.getAttribute("data-usecp")), cp = sp.coupons[idx], logEl = topDoc.getElementById("smt-coupon-log");
                logEl.textContent = `⏳ 正在向 ${charName} 核销【${cp.title}】...`;
                try { const r = await requestStandaloneAI(`你是${ctx.charName}。人设：${ctx.charDesc.slice(0, 1000)}`, `${myName}向你出示了特权券：【${cp.title}（${cp.desc}）】。请描写你看到后的反应与立刻宠溺履约的行动(90字左右)：`); sp.couponLog = `✓ 已核销【${cp.title}】：\n${r}`; saveSpaceData(sp); renderCoupleSpaceAll(); } catch (err) { logEl.textContent = err.message; }
            });

            topDoc.getElementById("smt-sp-notes-list").innerHTML = (sp.notes || []).map((n) => `<div style="background:#FFFFFF !important;border:1px solid #EFEFF4 !important;border-radius:10px;padding:8px 10px;margin-bottom:6px;font-size:10.5px;"><div style="display:flex;justify-content:space-between;font-size:8.5px;color:#8E8E98 !important;"><b>${n.author}</b><span>${n.time}</span></div><div>${n.text.replace(/</g, "&lt;")}</div></div>`).join("");
            const todoEl = topDoc.getElementById("smt-sp-todo-list"); todoEl.innerHTML = "";
            (sp.todos || []).forEach((td, idx) => {
                const row = topDoc.createElement("div");
                row.style.cssText = "display:flex;align-items:center;justify-content:space-between;background:#FFFFFF !important;border:1px solid #EFEFF4 !important;border-radius:9px;padding:7px 10px;margin-bottom:5px;font-size:10.5px;";
                row.innerHTML = `<label style="display:flex;align-items:center;gap:7px;cursor:pointer;flex:1;"><input type="checkbox" ${td.done ? "checked" : ""}/><span style="${td.done ? "text-decoration:line-through;color:#9A9AA5;" : ""}">${td.text}</span></label><span style="cursor:pointer;" data-deltodo="${idx}">✕</span>`;
                row.querySelector("input").onchange = (e) => { const d = getSpaceData(); d.todos[idx].done = e.target.checked; saveSpaceData(d); renderCoupleSpaceAll(); };
                row.querySelector("[data-deltodo]").onclick = () => { const d = getSpaceData(); d.todos.splice(idx, 1); saveSpaceData(d); renderCoupleSpaceAll(); };
                todoEl.appendChild(row);
            });
        }

        topDoc.getElementById("smt-sp-bg-btn").onclick = () => { const sp = getSpaceData(), u = prompt("粘贴同居背景横幅图片 URL（留空恢复极简柔灰）：", sp.bgUrl || ""); if (u !== null) { sp.bgUrl = u.trim(); saveSpaceData(sp); renderCoupleSpaceAll(); } };
        topDoc.getElementById("smt-sp-edit-date").onclick = () => { const sp = getSpaceData(), v = prompt("相恋日期(YYYY-MM-DD)：", sp.startDate); if (v) { sp.startDate = v.trim(); saveSpaceData(sp); renderCoupleSpaceAll(); } };
        topDoc.getElementById("smt-sp-mood").onclick = () => { const sp = getSpaceData(), v = prompt("修改今日心情温度：", sp.mood); if (v) { sp.mood = v.trim(); saveSpaceData(sp); renderCoupleSpaceAll(); } };
        topDoc.getElementById("smt-sp-reset-char").onclick = () => { const c = getSTContext(1); if (confirm(`确定重置与【${c.charName}】的情侣空间数据吗？`)) { localStorage.removeItem(getSafeScopedKey("seoul_v12_space")); renderCoupleSpaceAll(); } };

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
            const sp = getSpaceData(); sp.insGrid = sp.insGrid || []; sp.insGrid.unshift({ tag: "MY POST", scene: scene.trim(), caption: caption.trim(), likes: 99, time: nowTimeStr() });
            saveSpaceData(sp); renderCoupleSpaceAll();
        };
        topDoc.getElementById("smt-ins-ai-add").onclick = async (e) => {
            const ctx = getSTContext(6), sp = getSpaceData(); e.target.textContent = "⏳ 拍摄中...";
            try {
                const raw = await requestStandaloneAI(`你是${ctx.charName}。人设：${ctx.charDesc.slice(0, 1000)}`, `请在你们的情侣空间九宫格照片墙新发一格动态，记录你和${ctx.userName}的甜蜜日常。严格只输出JSON：{"tag":"英文短词","scene":"40字以内的照片画面描写","caption":"12字以内的韩文+中文心情短句"}`);
                const m = raw.match(/\{[\s\S]*\}/);
                if (m) { const obj = JSON.parse(m[0]); sp.insGrid = sp.insGrid || []; sp.insGrid.unshift({ tag: obj.tag || "COUPLE", scene: obj.scene || "", caption: obj.caption || "", likes: Math.floor(Math.random() * 50) + 50, time: nowTimeStr() }); saveSpaceData(sp); renderCoupleSpaceAll(); }
            } catch (err) { alert(err.message); } finally { e.target.textContent = "✦ 让TA发情侣格"; }
        };

        topDoc.getElementById("smt-pet-rename").onclick = () => { const sp = getSpaceData(), v = prompt("给宠物起名：", sp.pet.name); if (v) { sp.pet.name = v.trim(); saveSpaceData(sp); renderCoupleSpaceAll(); } };
        topDoc.getElementById("smt-pet-feed").onclick = () => { const sp = getSpaceData(); sp.pet.hunger = Math.min(100, sp.pet.hunger + 15); sp.pet.lastLog = `你喂了 ${sp.pet.name} 冻干零食，它开心地蹭了蹭你的手心！`; saveSpaceData(sp); renderCoupleSpaceAll(); };
        topDoc.getElementById("smt-pet-pat").onclick = () => { const sp = getSpaceData(); sp.pet.mood = Math.min(100, sp.pet.mood + 15); sp.pet.lastLog = `你揉了揉 ${sp.pet.name} 的脑袋，它舒服地露出肚皮打滚~`; saveSpaceData(sp); renderCoupleSpaceAll(); };
        topDoc.getElementById("smt-pet-ai-play").onclick = async (e) => { const ctx = getSTContext(6), sp = getSpaceData(); e.target.textContent = "互动中..."; try { sp.pet.lastLog = await requestStandaloneAI(`你是${ctx.charName}。人设：${ctx.charDesc.slice(0, 900)}`, `描写你逗弄宠物「${sp.pet.name}」并和身旁的${ctx.userName}亲昵互动的画面(80字左右)：`); saveSpaceData(sp); renderCoupleSpaceAll(); } catch (err) { alert(err.message); } finally { e.target.textContent = "✦ 让TA陪宠物玩"; } };
        topDoc.getElementById("smt-4cut-gen-btn").onclick = async (e) => { const ctx = getSTContext(8); e.target.textContent = "⏳ 连拍中..."; try { const raw = await requestStandaloneAI(`你是摄影师。角色：${ctx.charName}与${ctx.userName}。人设：${ctx.charDesc.slice(0, 1000)}`, `生成两人在自拍亭连拍4张人生四格的画面。严格只输出JSON：{"frames":["第1格","第2格","第3格","第4格亲密定格"],"sign":"手写短句"}`); const m = raw.match(/\{[\s\S]*\}/); if (m) { const obj = JSON.parse(m[0]), sp = getSpaceData(); sp.life4cut = { date: "SEOUL · " + nowTimeStr(), frames: obj.frames || [], sign: obj.sign || "우리의 계절" }; saveSpaceData(sp); renderCoupleSpaceAll(); } } catch (err) { alert(err.message); } finally { e.target.textContent = "✦ 和TA拍一组新四格"; } };
        topDoc.getElementById("smt-qa-next").onclick = () => { const sp = getSpaceData(); sp.qaIndex = ((sp.qaIndex || 0) + 1) % QA_QUESTIONS.length; sp.qaUserAns = "点击填写..."; sp.qaCharAns = "点击让TA作答..."; saveSpaceData(sp); renderCoupleSpaceAll(); };
        topDoc.getElementById("smt-qa-edit-my").onclick = () => { const sp = getSpaceData(), v = prompt("写下你的回答："); if (v) { sp.qaUserAns = v.trim(); saveSpaceData(sp); renderCoupleSpaceAll(); } };
        topDoc.getElementById("smt-qa-ai-ans").onclick = async (e) => { const ctx = getSTContext(6), sp = getSpaceData(), q = QA_QUESTIONS[(sp.qaIndex || 0) % QA_QUESTIONS.length]; e.target.textContent = "思考中..."; try { sp.qaCharAns = await requestStandaloneAI(`你是${ctx.charName}。人设：${ctx.charDesc.slice(0, 1000)}`, `问题：“${q}”(${ctx.userName}答：“${sp.qaUserAns}”)。请用第一人称写下你的回答(70字左右)：`); saveSpaceData(sp); renderCoupleSpaceAll(); } catch (err) { alert(err.message); } finally { e.target.textContent = "✦ 让TA作答"; } };
        topDoc.getElementById("smt-mood-sync-btn").onclick = async (e) => { const ctx = getSTContext(8); e.target.textContent = "⏳ 感应中..."; try { const raw = await requestStandaloneAI(`你是${ctx.charName}。人设：${ctx.charDesc.slice(0, 1000)}`, `感应你此刻的状态。严格只输出JSON：{"bpm":"98 BPM","temp":"36.8°C","miss":"99%","action":"此刻正在做什么","os":"脑海里关于${ctx.userName}的一句心声"}`); const m = raw.match(/\{[\s\S]*\}/); if (m) { const sp = getSpaceData(); sp.moodSync = JSON.parse(m[0]); saveSpaceData(sp); renderCoupleSpaceAll(); } } catch (err) { alert(err.message); } finally { e.target.textContent = "↻ 实时感应TA此刻状态"; } };
        topDoc.getElementById("smt-coupon-add").onclick = () => { const t = prompt("新特权券名称："); if (!t) return; const d = prompt("效果描述：", "出示此券，对方必须无条件照做"); const sp = getSpaceData(); sp.coupons.unshift({ title: t.trim(), desc: (d || "").trim() }); saveSpaceData(sp); renderCoupleSpaceAll(); };
        topDoc.getElementById("smt-sp-note-send").onclick = async () => { const inp = topDoc.getElementById("smt-sp-note-input"), v = inp.value.trim(); if (!v) return; inp.value = ""; const ctx = getSTContext(6), sp = getSpaceData(); sp.notes.unshift({ author: ctx.userName, text: v, time: nowTimeStr() }); saveSpaceData(sp); renderCoupleSpaceAll(); try { const r = await requestStandaloneAI(`你是${ctx.charName}。人设：${ctx.charDesc.slice(0, 800)}`, `${ctx.userName}留言：“${v}”，请简短回复(45字内)：`); const d = getSpaceData(); d.notes.unshift({ author: ctx.charName, text: r, time: nowTimeStr() }); saveSpaceData(d); renderCoupleSpaceAll(); } catch (err) { alert(err.message); } };
        topDoc.getElementById("smt-sp-ai-note").onclick = async () => { const ctx = getSTContext(6); try { const r = await requestStandaloneAI(`你是${ctx.charName}。人设：${ctx.charDesc.slice(0, 800)}`, `主动在情侣空间留言板给${ctx.userName}留一句悄悄话(45字内)：`); const d = getSpaceData(); d.notes.unshift({ author: ctx.charName, text: r, time: nowTimeStr() }); saveSpaceData(d); renderCoupleSpaceAll(); } catch (err) { alert(err.message); } };
        topDoc.getElementById("smt-sp-add-todo").onclick = () => { const v = prompt("新增心愿："); if (v) { const d = getSpaceData(); d.todos.push({ text: v.trim(), done: false }); saveSpaceData(d); renderCoupleSpaceAll(); } };

        /* ══════════════════════════════════════════════════════════════════
           【PART 6 & 7：🎧 旋转黑胶网易云 + 查手机 + 日记 + HTML主页 + 三重入口】
           ══════════════════════════════════════════════════════════════════ */
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
            pane.innerHTML = md.liked.map((t, idx) => `<div style="display:flex;align-items:center;justify-content:space-between;background:${cur && cur.name === t.name ? "#484852" : "#F8F8F8"} !important;color:${cur && cur.name === t.name ? "#FFFFFF" : "#3A3A40"} !important;border:1px solid #ECECF2 !important;border-radius:11px;padding:8px 11px;margin-bottom:6px;"><div data-playliked="${idx}" style="display:flex;align-items:center;gap:9px;flex:1;cursor:pointer;"><img src="${t.cover || "https://i.postimg.cc/rydS6NvG/IMG-3866.jpg"}" style="width:32px;height:32px;border-radius:7px;object-fit:cover;"/><div><div style="font-size:11px;font-weight:700;">${t.name}</div><div style="font-size:8.5px;opacity:0.75;">${t.artist}</div></div></div><span data-delliked="${idx}" style="cursor:pointer;padding:4px;">✕</span></div>`).join("");
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
                box.innerHTML = arr.map((t, i) => `<div style="display:flex;justify-content:space-between;align-items:center;background:#F8F8F8 !important;border:1px solid #ECECF2 !important;border-radius:10px;padding:7px 10px;margin-bottom:5px;font-size:10px;"><div><b>${t.name}</b> - ${t.artist}</div><div style="display:flex;gap:4px;"><span class="smt-pill-btn" data-sl="${i}">♡喜欢</span><span class="smt-pill-btn dark" data-sp="${i}">▶播放</span></div></div>`).join("");
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
        function getPhoneCache() { try { return JSON.parse(localStorage.getItem(getSafeScopedKey("seoul_v12_phone")) || "{}"); } catch (e) { return {}; } }
        function savePhoneCache(p) { localStorage.setItem(getSafeScopedKey("seoul_v12_phone"), JSON.stringify(p)); }
        function renderFullPhoneApp() {
            const c = getSTContext(1), cache = getPhoneCache(), stage = topDoc.getElementById("smt-ph-stage");
            topDoc.getElementById("smt-ph-ava").src = c.charAvatar; topDoc.getElementById("smt-ph-owner").textContent = `${c.charName} 的 iPhone`;
            stage.innerHTML = cache[currentPhoneTab] || `<div style="background:#F8F8F8 !important;border:1px dashed #DCDCE4 !important;border-radius:16px;padding:40px 16px;text-align:center;"><span class="smt-pill-btn dark" id="smt-ph-gen-empty">✦ 立即生成 ${currentPhoneTab.toUpperCase()} 界面</span></div>`;
            topDoc.getElementById("smt-ph-gen-empty")?.addEventListener("click", () => generateFullPhoneContent(currentPhoneTab));
        }
        async function generateFullPhoneContent(type) {
            const stage = topDoc.getElementById("smt-ph-stage"), c = getSTContext(8);
            stage.innerHTML = `<div style="padding:40px;text-align:center;font-size:10.5px;">⏳ 正在调用独立 API 生成...</div>`;
            try {
                const res = await requestStandaloneAI(`你是${c.charName}。人设：${c.charDesc.slice(0, 1200)}`, `请为【${type}】生成3条与${c.userName}有关的私密手机内容（韩系排版，不要代码块）：`);
                const html = `<div style="background:#FFFFFF !important;border:1px solid #ECECF2 !important;border-radius:14px;padding:14px;font-size:11.5px;line-height:1.75;white-space:pre-wrap;">${res.replace(/</g, "&lt;")}</div>`;
                const cache = getPhoneCache(); cache[type] = html; savePhoneCache(cache); stage.innerHTML = html;
            } catch (err) { stage.innerHTML = `<div style="padding:20px;">${err.message}</div>`; }
        }
        topDoc.querySelectorAll("[data-phtab]").forEach((b) => b.onclick = () => { topDoc.querySelectorAll("[data-phtab]").forEach((x) => x.classList.remove("dark")); b.classList.add("dark"); currentPhoneTab = b.getAttribute("data-phtab"); renderFullPhoneApp(); });
        topDoc.getElementById("smt-ph-refresh-btn").onclick = () => generateFullPhoneContent(currentPhoneTab);

        function getDiaryList() { try { return JSON.parse(localStorage.getItem(getSafeScopedKey("seoul_v12_diary")) || "[]"); } catch (e) { return []; } }
        function saveDiaryList(l) { localStorage.setItem(getSafeScopedKey("seoul_v12_diary"), JSON.stringify(l)); }
        function renderDiaryApp() {
            topDoc.getElementById("smt-diary-list").innerHTML = getDiaryList().map((d) => `<div style="background:#F8F8F8 !important;border:1px solid #ECECF2 !important;border-radius:14px;padding:12px;margin-bottom:8px;"><div style="display:flex;justify-content:space-between;font-size:9px;color:#7A7A85 !important;margin-bottom:5px;"><b>[${d.author}] ${d.title}</b><span>${d.time}</span></div><div style="font-size:11px;line-height:1.68;white-space:pre-wrap;">${d.content.replace(/</g, "&lt;")}</div></div>`).join("");
        }
        topDoc.getElementById("smt-diary-user-save").onclick = () => { const i = topDoc.getElementById("smt-diary-input"); if (!i.value.trim()) return; const l = getDiaryList(), c = getSTContext(1); l.unshift({ author: c.userName, title: "今日手记", content: i.value.trim(), time: nowTimeStr() }); saveDiaryList(l); i.value = ""; renderDiaryApp(); };
        topDoc.getElementById("smt-diary-ai-write").onclick = async (e) => { const c = getSTContext(6); e.target.textContent = "书写中..."; try { const r = await requestStandaloneAI(`你是${c.charName}。人设：${c.charDesc.slice(0, 1200)}`, `请写一篇和${c.userName}的交换日记(150字左右)：`); const l = getDiaryList(); l.unshift({ author: c.charName, title: `${c.charName}的日记`, content: r, time: nowTimeStr() }); saveDiaryList(l); renderDiaryApp(); } catch (err) { alert(err.message); } finally { e.target.textContent = "✦ 让TA写今日日记"; } };

        const HTML_TPLS = {
            coupleId: `<div style="background:#F8F8F8 !important;border:1px solid #ECECF2 !important;border-radius:18px !important;padding:16px !important;"><div style="display:flex;justify-content:space-around;align-items:center;background:#FFFFFF !important;border-radius:14px;padding:15px;"><div style="text-align:center;"><img src="{{avatar}}" style="width:50px;height:50px;border-radius:50%;object-fit:cover;"/><div style="font-size:10px;font-weight:700;margin-top:5px;">{{user}}</div></div><div style="font-size:14px;font-weight:700;">D+{{days}}</div><div style="text-align:center;"><img src="{{charAvatar}}" style="width:50px;height:50px;border-radius:50%;object-fit:cover;"/><div style="font-size:10px;font-weight:700;margin-top:5px;">{{char}}</div></div></div></div>`,
            polaroid: `<div style="background:#F8F8F8 !important;border:1px solid #ECECF2 !important;border-radius:18px !important;padding:12px !important;display:grid;grid-template-columns:1fr 1fr;gap:8px;"><div style="background:#FFFFFF !important;padding:7px;border-radius:11px;text-align:center;"><img src="{{avatar}}" style="width:100%;height:86px;object-fit:cover;border-radius:7px;"/><div style="font-size:10px;font-weight:700;margin-top:4px;">{{user}}</div></div><div style="background:#FFFFFF !important;padding:7px;border-radius:11px;text-align:center;"><img src="{{charAvatar}}" style="width:100%;height:86px;object-fit:cover;border-radius:7px;"/><div style="font-size:10px;font-weight:700;margin-top:4px;">{{char}}</div></div></div>`,
            receipt: `<div style="background:#F8F8F8 !important;border:1px dashed #D5D5DE !important;border-radius:14px !important;padding:14px !important;font-family:monospace;text-align:center;"><b>SEOUL RECEIPT · {{user}} &amp; {{char}} (D+{{days}})</b></div>`
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
            box.innerHTML = list.length ? "" : `<div style="text-align:center;padding:36px;font-size:10px;color:#9A9AA5 !important;">暂无历史存档</div>`;
            list.forEach((item) => {
                const card = topDoc.createElement("div"); card.className = "smt-section-box";
                card.innerHTML = `<div style="display:flex;justify-content:space-between;font-size:10px;margin-bottom:5px;"><b>${item.title}</b><span>${item.time}</span></div><div class="smt-arch-txt" style="background:#FFFFFF !important;border-radius:9px;padding:8px;font-size:10.5px;"></div>`;
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

        function openSeoulModal() {
            renderWeChat();
            renderCoupleSpaceAll();
            renderHomeHtml();
            modal.classList.add("smt-open");
        }

        btn.onclick = () => openSeoulModal();

        // 🔥 入口二 & 入口三：自动往酒馆的【扩展面板 (#extensions_settings)】和【聊天框左下角魔法棒菜单 (#extensionsMenu)】注入醒目打开按钮！
        function ensureTavernExtensionButtons() {
            // 1. 守护右下角悬浮球不被清理
            if (!topDoc.getElementById("seoul-mini-theater-btn")) {
                topDoc.body.appendChild(btn);
            }
            if (!topDoc.getElementById("seoul-mini-theater-modal")) {
                topDoc.body.appendChild(modal);
            }

            // 2. 注入到酒馆顶部「扩展（Extensions 积木图标）」面板内，点开扩展就能看到大按钮！
            const extSettings = topDoc.getElementById("extensions_settings") || topDoc.getElementById("extensions_settings2");
            if (extSettings && !topDoc.getElementById("seoul-ext-settings-panel")) {
                const panel = topDoc.createElement("div");
                panel.id = "seoul-ext-settings-panel";
                panel.className = "inline-drawer";
                panel.innerHTML = `
                    <div class="inline-drawer-toggle inline-drawer-header">
                        <b>🤍 SEOUL OS · 韩系全屏手机系统</b>
                        <div class="inline-drawer-icon fa-solid fa-circle-chevron-down down"></div>
                    </div>
                    <div class="inline-drawer-content" style="display:block;padding:10px;">
                        <div style="font-size:12px;margin-bottom:8px;opacity:0.85;">独立微信 · A+B情侣空间 · 网易云一起听 · 突击查手机</div>
                        <div id="seoul-ext-open-btn" class="menu_button" style="width:100%;text-align:center;padding:8px 0;font-weight:700;cursor:pointer;">
                            📱 立即打开 SEOUL OS 全屏系统
                        </div>
                    </div>
                `;
                extSettings.prepend(panel);
                topDoc.getElementById("seoul-ext-open-btn")?.addEventListener("click", () => openSeoulModal());
            }

            // 3. 注入到聊天输入框左下角的「🪄 魔法棒菜单 (#extensionsMenu)」里！
            const wandMenu = topDoc.getElementById("extensionsMenu");
            if (wandMenu && !topDoc.getElementById("seoul-wand-menu-item")) {
                const item = topDoc.createElement("div");
                item.id = "seoul-wand-menu-item";
                item.className = "list-group-item flex-container flexGap5 interactable";
                item.style.cursor = "pointer";
                item.innerHTML = `<span>🤍</span><span>打开 SEOUL OS 手机系统</span>`;
                item.addEventListener("click", () => openSeoulModal());
                wandMenu.prepend(item);
            }
        }

        ensureTavernExtensionButtons();

        // 定时巡检：切换角色自动刷新存档 + 确保扩展按钮始终在位
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

    bootSeoulOS();
})();
// ==========================================================================
// 🤍 【SEOUL OS 独立安全模块：韩系开屏动画 + 防二传 QQ 号手动审核登录系统 + 作者内置算号器】
// 用法：直接粘贴在 index.js 最末尾！自动拦截所有打开入口，未授权 QQ 绝对无法进入系统！
// ==========================================================================
(function () {
    const topWin = window.parent || window;
    const topDoc = topWin.document;

    /* ──────────────────────────────────────────────────────────────────────
       👑 【作者专属配置区（请修改为你自己的暗号与QQ号）】
       ────────────────────────────────────────────────────────────────────── */
    // 1. 你的作者加密盐值（随便改一串只有你自己知道的字母数字，别人不知道这串字就永远算不出激活码！）
    const AUTHOR_SECRET_SALT = "SEOUL_OS_BY_MY_SECRET_2025";

    // 2. 你自己的作者 QQ 号（填在这里的 QQ 号无需激活码可直接免密登录）
    const BUILTIN_WHITELIST_QQ = [
        "3425740873" // 👈 把这里改成你自己的 QQ 号
    ];

    // 3. GitHub 云端白名单地址（选填：如果你在 GitHub 仓库建了一个 allow.json 写上 ["qq1","qq2"]，把 raw 链接填在这即可云端实时放行）
    const CLOUD_WHITELIST_URL = "";

    // 4. 作者内置发卡器密码（在锁屏页连续点击顶部小锁图标 5 下，输入此密码即可打开算号器给别人生成激活码！）
    const AUTHOR_ADMIN_PIN = "1102";

    // 5. 锁屏底部显示的作者联系方式提示
    const AUTHOR_CONTACT_TIP = "本系统已开启防二传保护 · 请联系作者审核通过你的 QQ 号";

    const K_AUTH_STATE = "seoul_os_qq_auth_v1";

    /* ──────────────────────────────────────────────────────────────────────
       🔐 核心加密算法：根据【QQ号 + 作者私密盐值】生成唯一 6 位专属激活码
       ────────────────────────────────────────────────────────────────────── */
    function computeLicenseCode(qq) {
        const cleanQQ = String(qq || "").trim();
        const raw = `${cleanQQ}::${AUTHOR_SECRET_SALT}::SEOUL_LOCK`;
        let h1 = 0x811c9dc5;
        let h2 = 0x1b873593;
        for (let i = 0; i < raw.length; i++) {
            const ch = raw.charCodeAt(i);
            h1 ^= ch;
            h1 = Math.imul(h1, 0x01000193);
            h2 ^= ch * (i + 1);
            h2 = Math.imul(h2, 0x5bd1e995);
        }
        const part1 = (h1 >>> 0).toString(36).toUpperCase().padStart(4, "0").slice(-3);
        const part2 = (h2 >>> 0).toString(36).toUpperCase().padStart(4, "0").slice(-3);
        return `SL-${part1}${part2}`;
    }

    function getSavedAuth() {
        try { return JSON.parse(localStorage.getItem(K_AUTH_STATE) || "null"); } catch (e) { return null; }
    }
    function saveAuth(qq, code) {
        localStorage.setItem(K_AUTH_STATE, JSON.stringify({ qq: String(qq).trim(), code: String(code).trim().toUpperCase(), time: Date.now() }));
    }

    // 检查某个 QQ + 激活码是否合法（支持：作者白名单 / 云端 GitHub 白名单 / 专属激活码）
    let cachedCloudList = null;
    async function verifyQQAccess(qq, inputCode) {
        const cleanQQ = String(qq || "").trim();
        const cleanCode = String(inputCode || "").trim().toUpperCase();
        if (!/^[1-9][0-9]{4,11}$/.test(cleanQQ)) {
            return { ok: false, msg: "请输入正确的 5~12 位数字 QQ 号" };
        }

        // 1. 检查内置白名单
        if (BUILTIN_WHITELIST_QQ.includes(cleanQQ)) {
            return { ok: true, mode: "whitelist" };
        }

        // 2. 检查专属激活码（一Q一码）
        const expectedCode = computeLicenseCode(cleanQQ);
        if (cleanCode && cleanCode === expectedCode) {
            return { ok: true, mode: "code" };
        }

        // 3. 检查 GitHub 云端白名单（若配置了 CLOUD_WHITELIST_URL）
        if (CLOUD_WHITELIST_URL) {
            try {
                const res = await fetch(`${CLOUD_WHITELIST_URL}?t=${Date.now()}`);
                if (res.ok) {
                    const arr = await res.json();
                    if (Array.isArray(arr) && arr.map(String).includes(cleanQQ)) {
                        return { ok: true, mode: "cloud" };
                    }
                }
            } catch (e) {}
        }

        if (!cleanCode) {
            return { ok: false, msg: "该 QQ 号尚未在云端白名单通过，请输入作者发放的专属通行码！" };
        }
        return { ok: false, msg: "通行码与该 QQ 号不匹配！请等待作者手动审核通过。" };
    }

    /* ──────────────────────────────────────────────────────────────────────
       🎬 挂载开屏动画与 iOS 锁屏登录层
       ────────────────────────────────────────────────────────────────────── */
    function mountBootLockSystem() {
        const modal = topDoc.getElementById("seoul-mini-theater-modal");
        if (!modal) {
            setTimeout(mountBootLockSystem, 350);
            return;
        }

        topDoc.getElementById("seoul-boot-lock-style")?.remove();
        topDoc.getElementById("seoul-boot-lock-layer")?.remove();

        const lockStyle = topDoc.createElement("style");
        lockStyle.id = "seoul-boot-lock-style";
        lockStyle.innerHTML = `
            html body #seoul-mini-theater-modal #seoul-boot-lock-layer {
                position: absolute !important;
                inset: 0 !important;
                width: 100% !important;
                height: 100% !important;
                z-index: 2147483647 !important;
                background: #FFFFFF !important;
                background-color: #FFFFFF !important;
                display: flex !important;
                flex-direction: column !important;
                align-items: center !important;
                justify-content: space-between !important;
                padding: max(24px, env(safe-area-inset-top, 24px)) 20px max(28px, env(safe-area-inset-bottom, 28px)) 20px !important;
                box-sizing: border-box !important;
                font-family: -apple-system, BlinkMacSystemFont, "Apple SD Gothic Neo", "SF Pro Display", "PingFang SC", sans-serif !important;
                color: #3A3A40 !important;
                transition: transform 0.65s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.55s ease !important;
                overflow: hidden !important;
            }
            /* 解锁上滑消失动画 */
            html body #seoul-mini-theater-modal #seoul-boot-lock-layer.smt-unlocked-hide {
                transform: translateY(-102%) !important;
                opacity: 0 !important;
                pointer-events: none !important;
            }

            /* 阶段1：开屏呼吸 Logo 舞台 */
            html body #seoul-mini-theater-modal #smt-boot-splash {
                position: absolute !important;
                inset: 0 !important;
                background: #FFFFFF !important;
                z-index: 5 !important;
                display: flex !important;
                flex-direction: column !important;
                align-items: center !important;
                justify-content: center !important;
                transition: opacity 0.45s ease !important;
            }
            html body #seoul-mini-theater-modal #smt-boot-splash.fade-out {
                opacity: 0 !important;
                pointer-events: none !important;
            }
            @keyframes smtPulseFloat {
                0%, 100% { transform: translateY(0px) scale(1); }
                50% { transform: translateY(-5px) scale(1.03); }
            }
            @keyframes smtLoadProgress {
                0% { width: 0%; }
                60% { width: 78%; }
                100% { width: 100%; }
            }
            html body #seoul-mini-theater-modal .smt-splash-logo {
                width: 64px !important;
                height: 64px !important;
                border-radius: 20px !important;
                background: #F8F8F8 !important;
                border: 1.2px solid #EAEAF0 !important;
                display: flex !important;
                align-items: center !important;
                justify-content: center !important;
                margin-bottom: 16px !important;
                animation: smtPulseFloat 2.4s ease-in-out infinite !important;
            }
            html body #seoul-mini-theater-modal .smt-splash-bar-wrap {
                width: 120px !important;
                height: 3px !important;
                background: #EFEFF4 !important;
                border-radius: 99px !important;
                overflow: hidden !important;
                margin-top: 18px !important;
            }
            html body #seoul-mini-theater-modal .smt-splash-bar-fill {
                height: 100% !important;
                background: #3A3A40 !important;
                border-radius: 99px !important;
                animation: smtLoadProgress 1.15s cubic-bezier(0.4, 0, 0.2, 1) forwards !important;
            }

            /* 阶段2：韩系 iOS 锁屏大时钟与 QQ 验证卡 */
            html body #seoul-mini-theater-modal .smt-lock-clock-box {
                text-align: center !important;
                margin-top: 12px !important;
            }
            html body #seoul-mini-theater-modal .smt-lock-time {
                font-size: 46px !important;
                font-weight: 700 !important;
                color: #2C2C32 !important;
                letter-spacing: -1px !important;
                line-height: 1.05 !important;
            }
            html body #seoul-mini-theater-modal .smt-lock-date {
                font-size: 11px !important;
                font-weight: 600 !important;
                color: #8E8E98 !important;
                letter-spacing: 0.6px !important;
                margin-top: 6px !important;
            }

            html body #seoul-mini-theater-modal .smt-auth-card {
                width: 100% !important;
                max-width: 340px !important;
                background: #F8F8F8 !important;
                border: 1px solid #ECECF2 !important;
                border-radius: 24px !important;
                padding: 22px 18px !important;
                box-sizing: border-box !important;
                text-align: center !important;
            }
            html body #seoul-mini-theater-modal .smt-qq-ava-ring {
                width: 66px !important;
                height: 66px !important;
                border-radius: 50% !important;
                background: #FFFFFF !important;
                border: 2px solid #EAEAF0 !important;
                padding: 3px !important;
                margin: 0 auto 12px auto !important;
                box-sizing: border-box !important;
            }
            html body #seoul-mini-theater-modal .smt-qq-ava-ring img {
                width: 100% !important;
                height: 100% !important;
                border-radius: 50% !important;
                object-fit: cover !important;
                display: block !important;
            }
            html body #seoul-mini-theater-modal .smt-auth-inp {
                width: 100% !important;
                height: 38px !important;
                background: #FFFFFF !important;
                border: 1px solid #E4E4EC !important;
                border-radius: 12px !important;
                padding: 0 14px !important;
                font-size: 12px !important;
                color: #2C2C32 !important;
                box-sizing: border-box !important;
                outline: none !important;
                margin-bottom: 9px !important;
                text-align: center !important;
                font-weight: 600 !important;
            }
            html body #seoul-mini-theater-modal .smt-auth-btn {
                width: 100% !important;
                height: 40px !important;
                background: #3A3A40 !important;
                color: #FFFFFF !important;
                -webkit-text-fill-color: #FFFFFF !important;
                border-radius: 12px !important;
                font-size: 11.5px !important;
                font-weight: 700 !important;
                letter-spacing: 0.5px !important;
                display: flex !important;
                align-items: center !important;
                justify-content: center !important;
                cursor: pointer !important;
                margin-top: 4px !important;
                transition: transform 0.12s ease !important;
            }
            html body #seoul-mini-theater-modal .smt-auth-btn:active {
                transform: scale(0.98) !important;
            }
        `;
        topDoc.head.appendChild(lockStyle);

        const lockSvgIcon = `<svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="#3A3A40" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`;
        const smallLockSvg = `<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="#6E6E77" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle;margin-right:4px;"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`;

        const lockLayer = topDoc.createElement("div");
        lockLayer.id = "seoul-boot-lock-layer";
        lockLayer.innerHTML = `
            <!-- 阶段1：韩系开屏呼吸动画层 -->
            <div id="smt-boot-splash">
                <div class="smt-splash-logo">${lockSvgIcon}</div>
                <div style="font-size:13px;font-weight:700;letter-spacing:2px;color:#2C2C32 !important;">SEOUL OS</div>
                <div style="font-size:8.5px;color:#9A9AA5 !important;letter-spacing:1px;margin-top:4px;">PERSONAL COUPLE SYSTEM</div>
                <div class="smt-splash-bar-wrap"><div class="smt-splash-bar-fill" id="smt-splash-bar"></div></div>
            </div>

            <!-- 顶部：退出按钮 + 隐藏作者发卡器触发点（连点小锁5下） -->
            <div style="width:100%;max-width:420px;display:flex;justify-content:space-between;align-items:center;">
                <span class="smt-pill-btn" id="smt-lock-exit-btn" style="height:26px !important;padding:0 10px !important;">‹ 나가기 · 退出</span>
                <span class="smt-pill-btn" id="smt-admin-secret-trigger" style="height:26px !important;padding:0 10px !important;cursor:pointer;" title="作者管理">
                    ${smallLockSvg}<span>PROTECTED · 防二传锁</span>
                </span>
            </div>

            <!-- 中上部：iOS 锁屏大时钟 -->
            <div class="smt-lock-clock-box">
                <div class="smt-lock-time" id="smt-lock-big-time">18:04</div>
                <div class="smt-lock-date" id="smt-lock-big-date">SEOUL STANDARD TIME · KST</div>
            </div>

            <!-- 中部：QQ号登录与通行码核验卡片 -->
            <div class="smt-auth-card" id="smt-user-auth-box">
                <div class="smt-qq-ava-ring">
                    <img id="smt-lock-qq-ava" src="https://i.postimg.cc/rydS6NvG/IMG-3866.jpg" />
                </div>
                <div style="font-size:12.5px;font-weight:700;color:#2C2C32 !important;margin-bottom:3px;" id="smt-lock-welcome-title">ACCESS VERIFICATION</div>
                <div style="font-size:9px;color:#8E8E98 !important;margin-bottom:14px;">请输入你的 QQ 号进行身份核验（自动拉取QQ头像）</div>

                <input type="text" class="smt-auth-inp" id="smt-auth-qq-inp" placeholder="输入你的 QQ 号码..." inputmode="numeric" />
                <input type="text" class="smt-auth-inp" id="smt-auth-code-inp" placeholder="输入作者审核发放的专属通行码 (如 SL-XXXXXX)" />

                <div id="smt-auth-err-msg" style="font-size:9.5px;color:#9A6868 !important;font-weight:600;min-height:16px;margin-bottom:4px;"></div>

                <div class="smt-auth-btn" id="smt-auth-submit-btn">UNLOCK SYSTEM · 验证并进入系统</div>
            </div>

            <!-- 👑 隐藏的作者专属算号发卡器（连点顶部 PROTECTED 小锁 5 下并输入作者密码开启） -->
            <div class="smt-auth-card" id="smt-admin-keygen-box" style="display:none;border:1.5px solid #3A3A40 !important;">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">
                    <b style="font-size:11px;color:#2C2C32 !important;">👑 作者专属 · 一Q一码发卡器</b>
                    <span id="smt-admin-close-btn" style="cursor:pointer;font-size:11px;color:#8E8E98 !important;">✕ 关闭</span>
                </div>
                <div style="font-size:9px;color:#6E6E77 !important;margin-bottom:10px;text-align:left;line-height:1.5;">
                    把申请人的 QQ 号填在下方，点击生成即可算出<b>只属于该 QQ 号的唯一通行码</b>（发给别人无效）：
                </div>
                <input type="text" class="smt-auth-inp" id="smt-keygen-qq-inp" placeholder="输入申请人的 QQ 号..." />
                <div style="background:#FFFFFF !important;border:1px dashed #484852 !important;border-radius:10px;padding:10px;margin-bottom:10px;font-family:monospace;font-size:14px;font-weight:700;color:#2C2C32 !important;" id="smt-keygen-output">等待生成...</div>
                <div class="smt-auth-btn" id="smt-keygen-run-btn">生成该 QQ 专属通行码并复制</div>
            </div>

            <!-- 底部版权与防二传提示 -->
            <div style="text-align:center;font-size:8.8px;color:#9A9AA5 !important;letter-spacing:0.3px;">
                <div>${AUTHOR_CONTACT_TIP}</div>
                <div style="margin-top:3px;font-size:7.8px;opacity:0.75;">SEOUL PERSONAL OS · UNAUTHORIZED REDISTRIBUTION PROHIBITED</div>
            </div>
        `;
        modal.appendChild(lockLayer);

        // 更新锁屏实时时钟
        function updateLockClock() {
            const now = new Date();
            const hh = String(now.getHours()).padStart(2, "0");
            const mm = String(now.getMinutes()).padStart(2, "0");
            const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
            const tEl = topDoc.getElementById("smt-lock-big-time");
            const dEl = topDoc.getElementById("smt-lock-big-date");
            if (tEl) tEl.textContent = `${hh}:${mm}`;
            if (dEl) dEl.textContent = `${now.getFullYear()}.${String(now.getMonth() + 1).padStart(2, "0")}.${String(now.getDate()).padStart(2, "0")} ${days[now.getDay()]} · SEOUL OS`;
        }
        updateLockClock();
        setInterval(updateLockClock, 10000);

        // 当输入 QQ 号时，实时拉取真实高清 QQ 头像显示在锁屏中央！
        const qqInp = topDoc.getElementById("smt-auth-qq-inp");
        const codeInp = topDoc.getElementById("smt-auth-code-inp");
        const avaImg = topDoc.getElementById("smt-lock-qq-ava");
        const errEl = topDoc.getElementById("smt-auth-err-msg");

        qqInp.addEventListener("input", () => {
            const val = qqInp.value.trim();
            if (/^[1-9][0-9]{4,11}$/.test(val)) {
                avaImg.src = `https://q1.qlogo.cn/g?b=qq&nk=${val}&s=640`;
                topDoc.getElementById("smt-lock-welcome-title").textContent = `QQ: ${val}`;
            }
        });

        // 预填上次保存的 QQ 与激活码
        const saved = getSavedAuth();
        if (saved && saved.qq) {
            qqInp.value = saved.qq;
            codeInp.value = saved.code || "";
            avaImg.src = `https://q1.qlogo.cn/g?b=qq&nk=${saved.qq}&s=640`;
            topDoc.getElementById("smt-lock-welcome-title").textContent = `WELCOME BACK · ${saved.qq}`;
        }

        // 点击退出按钮直接关闭弹窗
        topDoc.getElementById("smt-lock-exit-btn").onclick = () => {
            modal.classList.remove("smt-open");
        };

        // 点击「验证并进入系统」
        topDoc.getElementById("smt-auth-submit-btn").onclick = async (e) => {
            const qq = qqInp.value.trim();
            const code = codeInp.value.trim();
            e.target.textContent = "⏳ 正在核验授权...";
            errEl.textContent = "";

            const res = await verifyQQAccess(qq, code);
            if (res.ok) {
                saveAuth(qq, code || computeLicenseCode(qq));
                e.target.textContent = "✓ 验证通过 · 正在解锁系统...";
                setTimeout(() => {
                    lockLayer.classList.add("smt-unlocked-hide");
                }, 220);
            } else {
                errEl.textContent = `✕ ${res.msg}`;
                e.target.textContent = "UNLOCK SYSTEM · 验证并进入系统";
            }
        };

        // 👑 连点顶部「PROTECTED · 防二传锁」5 下，输入作者密码即可打开内置算号发卡器！
        let secretTapCount = 0;
        let secretTapTimer = null;
        topDoc.getElementById("smt-admin-secret-trigger").onclick = () => {
            secretTapCount++;
            clearTimeout(secretTapTimer);
            secretTapTimer = setTimeout(() => { secretTapCount = 0; }, 1500);
            if (secretTapCount >= 5) {
                secretTapCount = 0;
                const pin = prompt("👑 作者后台验证 · 请输入作者管理密码：");
                if (pin === AUTHOR_ADMIN_PIN) {
                    topDoc.getElementById("smt-user-auth-box").style.display = "none";
                    topDoc.getElementById("smt-admin-keygen-box").style.display = "block";
                } else if (pin !== null) {
                    alert("密码错误！");
                }
            }
        };

        topDoc.getElementById("smt-admin-close-btn").onclick = () => {
            topDoc.getElementById("smt-admin-keygen-box").style.display = "none";
            topDoc.getElementById("smt-user-auth-box").style.display = "block";
        };

        topDoc.getElementById("smt-keygen-run-btn").onclick = () => {
            const targetQQ = topDoc.getElementById("smt-keygen-qq-inp").value.trim();
            if (!/^[1-9][0-9]{4,11}$/.test(targetQQ)) {
                return alert("请输入申请人正确的纯数字 QQ 号！");
            }
            const code = computeLicenseCode(targetQQ);
            topDoc.getElementById("smt-keygen-output").textContent = `QQ: ${targetQQ} ➔ ${code}`;
            navigator.clipboard?.writeText(code);
            alert(`✓ 已生成【QQ: ${targetQQ}】的专属唯一通行码：\n\n${code}\n\n（已自动复制到剪贴板，直接发给该用户即可！）`);
        };

        // 每次打开 SEOUL OS 时触发开屏动画：
        // 若已验证通过，播放 1.1 秒高级开屏动画后自动丝滑上滑进入；若未验证通过，播完开屏动画后停在 QQ 锁屏页拦截！
        async function triggerBootSequence() {
            const splash = topDoc.getElementById("smt-boot-splash");
            const bar = topDoc.getElementById("smt-splash-bar");
            lockLayer.classList.remove("smt-unlocked-hide");
            splash.classList.remove("fade-out");
            if (bar) {
                bar.style.animation = "none";
                void bar.offsetWidth;
                bar.style.animation = "smtLoadProgress 1.1s cubic-bezier(0.4, 0, 0.2, 1) forwards";
            }

            updateLockClock();
            const curSaved = getSavedAuth();
            let alreadyAuthorized = false;
            if (curSaved && curSaved.qq) {
                const chk = await verifyQQAccess(curSaved.qq, curSaved.code);
                alreadyAuthorized = chk.ok;
            }

            setTimeout(() => {
                splash.classList.add("fade-out");
                if (alreadyAuthorized) {
                    // 已授权用户：播完开屏动画后直接丝滑上滑解锁进主界面！
                    setTimeout(() => {
                        lockLayer.classList.add("smt-unlocked-hide");
                    }, 220);
                }
            }, 1050);
        }

        // 监听全屏弹窗的打开动作，每次点开自动播放开屏动画与鉴权检查
        let wasOpen = modal.classList.contains("smt-open");
        const observer = new MutationObserver(() => {
            const isOpen = modal.classList.contains("smt-open");
            if (isOpen && !wasOpen) {
                triggerBootSequence();
            }
            wasOpen = isOpen;
        });
        observer.observe(modal, { attributes: true, attributeFilter: ["class"] });

        if (wasOpen) triggerBootSequence();
    }

    mountBootLockSystem();
})();
