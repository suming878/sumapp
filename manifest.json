// ==========================================================================
// 🤍 【SEOUL OS V10 · 模块化分区精修版（以后改哪块只换哪块！）】
// ==========================================================================
(function () {
    /* ══════════════════════════════════════════════════════════════════════
       【PART 1：核心底座、存储 Key、独立 API 引擎与 SVG 矢量图标库】
       ══════════════════════════════════════════════════════════════════════ */
    const topWin = window.parent || window;
    const topDoc = topWin.document;

    const K_API = "seoul_v10_api";
    const K_CHAT = "seoul_v10_wechat";
    const K_WX_CSS = "seoul_v10_wx_css";
    const K_SPACE = "seoul_v10_space";
    const K_PHONE = "seoul_v10_phone";
    const K_DIARY = "seoul_v10_diary";
    const K_MUSIC = "seoul_v10_music";
    const K_ARCH = "seoul_v10_archive";
    const K_HTML = "seoul_v10_html";
    const K_SYNC = "seoul_v10_sync";

    ["seoul-mini-theater-btn", "seoul-mini-theater-modal", "seoul-mini-theater-style", "seoul-wx-custom-style"].forEach((id) => {
        const el = topDoc.getElementById(id);
        if (el) el.remove();
    });

    function svgUri(pathD, stroke = "%23484852", viewBox = "0 0 24 24", sw = "1.6") {
        return `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='${viewBox}' fill='none' stroke='${stroke}' stroke-width='${sw}' stroke-linecap='round' stroke-linejoin='round'%3E${pathD}%3C/svg%3E")`;
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
        transfer: svgUri("%3Crect x='2' y='5' width='20' height='14' rx='3'/%3E%3Cline x1='2' y1='10' x2='22' y2='10'/%3E%3Cpath d='M7 15h4'/%3E", "%233A3A40", "0 0 24 24", "1.6"),
        petCat: svgUri("%3Cpath d='M6 9l-2-5 5 2c1.8-.6 4.2-.6 6 0l5-2-2 5c1.2 1.8 1.5 4.2.5 6.5-1.2 2.6-4.2 4-6.5 4s-5.3-1.4-6.5-4C4.5 13.2 4.8 10.8 6 9z'/%3E%3Ccircle cx='9.5' cy='12.5' r='1' fill='%23484852'/%3E%3Ccircle cx='14.5' cy='12.5' r='1' fill='%23484852'/%3E%3Cpath d='M11 14.5l1 1 1-1'/%3E", "%233A3A40", "0 0 24 24", "1.6"),
        camera4: svgUri("%3Crect x='4' y='2' width='16' height='20' rx='3'/%3E%3Cline x1='4' y1='7' x2='20' y2='7'/%3E%3Cline x1='4' y1='12' x2='20' y2='12'/%3E%3Cline x1='4' y1='17' x2='20' y2='17'/%3E", "%233A3A40", "0 0 24 24", "1.6"),
        qaBox: svgUri("%3Cpath d='M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z'/%3E%3Cpath d='M9.5 9a2.5 2.5 0 0 1 5 0c0 1.5-2.5 2-2.5 3.5'/%3E%3Ccircle cx='12' cy='15' r='0.8' fill='%233A3A40'/%3E", "%233A3A40", "0 0 24 24", "1.6"),
        pulse: svgUri("%3Cpolyline points='22 12 18 12 15 21 9 3 6 12 2 12'/%3E", "%233A3A40", "0 0 24 24", "1.7"),
        ticket: svgUri("%3Cpath d='M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z'/%3E%3Cpath d='M13 5v2M13 17v2M13 11v2'/%3E", "%233A3A40", "0 0 24 24", "1.6"),
        guestbook: svgUri("%3Cpath d='M12 20h9'/%3E%3Cpath d='M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z'/%3E", "%233A3A40", "0 0 24 24", "1.6"),
        phone: svgUri("%3Crect x='5' y='2' width='14' height='20' rx='2' ry='2'/%3E%3Cline x1='12' y1='18' x2='12.01' y2='18'/%3E", "%233A3A40", "0 0 24 24", "1.6"),
        book: svgUri("%3Cpath d='M4 19.5A2.5 2.5 0 0 1 6.5 17H20'/%3E%3Cpath d='M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z'/%3E", "%233A3A40", "0 0 24 24", "1.6"),
        music: svgUri("%3Cpath d='M9 18V5l12-2v13'/%3E%3Ccircle cx='6' cy='18' r='3'/%3E%3Ccircle cx='18' cy='16' r='3'/%3E", "%233A3A40", "0 0 24 24", "1.6")
    };

    const DEFAULT_WX_CSS = `/* 🎨 微信界面专属自定义 CSS 美化区 */
#smt-wx-stream { background-color: #F8F8F8 !important; background-size: cover !important; background-position: center !important; }
.smt-wx-row.ai .smt-wx-bubble { background-color: #FFFFFF !important; color: #333338 !important; border-radius: 4px 14px 14px 14px !important; }
.smt-wx-row.me .smt-wx-bubble { background-color: #484852 !important; color: #FFFFFF !important; border-radius: 14px 4px 14px 14px !important; }`;

    function getApiCfg() { try { return Object.assign({ url: "https://api.openai.com/v1", key: "", model: "gpt-4o-mini", ctxCount: 8 }, JSON.parse(localStorage.getItem(K_API) || "{}")); } catch (e) { return { url: "https://api.openai.com/v1", key: "", model: "gpt-4o-mini", ctxCount: 8 }; } }
    function saveApiCfg(c) { localStorage.setItem(K_API, JSON.stringify(c)); }
    function getChatList() { try { return JSON.parse(localStorage.getItem(K_CHAT) || "[]"); } catch (e) { return []; } }
    function saveChatList(list) { localStorage.setItem(K_CHAT, JSON.stringify(list.slice(-150))); }
    function getWxCss() { return localStorage.getItem(K_WX_CSS) || DEFAULT_WX_CSS; }
    function saveWxCss(css) { localStorage.setItem(K_WX_CSS, css); }
    function getSyncMode() { return localStorage.getItem(K_SYNC) === "true"; }
    function setSyncMode(val) { localStorage.setItem(K_SYNC, val ? "true" : "false"); }

    function nowTimeStr() { const d = new Date(); return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`; }

    function getSTContext(maxMes = 8) {
        let userName = "ME", charName = "PARTNER";
        let userAvatar = "https://i.postimg.cc/rydS6NvG/IMG-3866.jpg", charAvatar = "https://i.postimg.cc/QC3CQ218/IMG-4147.jpg";
        let charDesc = "", recentChat = "";
        try {
            if (typeof topWin.SillyTavern !== "undefined" && topWin.SillyTavern.getContext) {
                const ctx = topWin.SillyTavern.getContext();
                userName = ctx.name1 || userName; charName = ctx.name2 || charName;
                if (ctx.characters && ctx.characterId !== undefined && ctx.characters[ctx.characterId]) {
                    const c = ctx.characters[ctx.characterId];
                    charDesc = [c.description, c.personality, c.scenario].filter(Boolean).join("\n");
                }
                if (Array.isArray(ctx.chat) && ctx.chat.length > 0) {
                    recentChat = ctx.chat.slice(-maxMes).map((m) => `${m.is_user ? userName : charName}: ${m.mes}`).join("\n\n");
                }
            }
        } catch (e) {}
        const uMes = topDoc.querySelector('#chat .mes[is_user="true"], #chat .mes.is_user');
        if (uMes) { userName = uMes.querySelector(".name_text")?.textContent?.trim() || userName; userAvatar = uMes.querySelector(".avatar img")?.src || userAvatar; }
        const cMes = topDoc.querySelector('#chat .mes:not([is_user="true"]):not(.is_user)');
        if (cMes) { charName = cMes.querySelector(".name_text")?.textContent?.trim() || charName; charAvatar = cMes.querySelector(".avatar img")?.src || charAvatar; }
        return { userName, charName, userAvatar, charAvatar, charDesc, recentChat };
    }

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

    /* ══════════════════════════════════════════════════════════════════════
       【PART 2：全局 UI 样式表 (含微信转账卡/引用条/气泡菜单 + 情侣空间画报UI)】
       ══════════════════════════════════════════════════════════════════════ */
    const styleEl = topDoc.createElement("style");
    styleEl.id = "seoul-mini-theater-style";
    styleEl.innerHTML = `
        html body #seoul-mini-theater-btn {
            position: fixed !important; right: 12px !important; bottom: 88px !important;
            z-index: 2147483640 !important; display: inline-flex !important; align-items: center !important; gap: 6px !important;
            height: 32px !important; padding: 0 12px !important; background: #FFFFFF !important;
            border: 1px solid #EAEAF0 !important; border-radius: 999px !important; cursor: pointer !important;
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
            margin: 0 auto !important; padding: 12px 14px !important; box-sizing: border-box !important;
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

        html body #seoul-mini-theater-modal .smt-section-box { background: #F8F8F8 !important; border: 1px solid #ECECF2 !important; border-radius: 16px !important; padding: 13px !important; margin-bottom: 10px !important; }
        html body #seoul-mini-theater-modal .smt-sec-title { display: flex !important; justify-content: space-between !important; align-items: center !important; font-size: 10.2px !important; font-weight: 700 !important; color: #3A3A40 !important; margin-bottom: 10px !important; padding-bottom: 7px !important; border-bottom: 1px solid #EAEAF0 !important; }
        html body #seoul-mini-theater-modal .smt-pill-btn {
            height: 26px !important; padding: 0 11px !important; border-radius: 999px !important; font-size: 9px !important; font-weight: 600 !important;
            background: #FFFFFF !important; border: 1px solid #E6E6EC !important; color: #55555E !important;
            cursor: pointer !important; display: inline-flex !important; align-items: center !important; justify-content: center !important; gap: 4px !important; white-space: nowrap !important;
        }
        html body #seoul-mini-theater-modal .smt-pill-btn.dark { background: #484852 !important; border-color: #484852 !important; color: #FFFFFF !important; -webkit-text-fill-color: #FFFFFF !important; }

        html body #seoul-mini-theater-modal .smt-bar-bg { width: 100% !important; height: 6px !important; background: #EAEAF0 !important; border-radius: 99px !important; overflow: hidden !important; margin-top: 4px !important; }
        html body #seoul-mini-theater-modal .smt-bar-fill { height: 100% !important; background: #484852 !important; border-radius: 99px !important; transition: width 0.25s ease !important; }

        /* ── 微信气泡、仿真转账卡片、引用回复条、点击气泡弹出操作菜单 ── */
        html body #seoul-mini-theater-modal .smt-wx-top-bar { display: flex !important; align-items: center !important; justify-content: space-between !important; background: #F8F8F8 !important; border: 1px solid #ECECF2 !important; border-radius: 11px !important; padding: 5px 8px !important; margin-bottom: 8px !important; flex-shrink: 0 !important; }
        html body #seoul-mini-theater-modal #smt-wx-stream { flex: 1 !important; min-height: 0 !important; overflow-y: auto !important; background: #F8F8F8 !important; border: 1px solid #ECECF2 !important; border-radius: 16px !important; padding: 12px !important; display: flex !important; flex-direction: column !important; gap: 11px !important; margin-bottom: 8px !important; }
        html body #seoul-mini-theater-modal .smt-wx-row { display: flex !important; align-items: flex-start !important; gap: 8px !important; max-width: 84% !important; position: relative !important; }
        html body #seoul-mini-theater-modal .smt-wx-row.me { align-self: flex-end !important; flex-direction: row-reverse !important; }
        html body #seoul-mini-theater-modal .smt-wx-ava { width: 33px !important; height: 33px !important; border-radius: 50% !important; object-fit: cover !important; border: 1.5px solid #FFFFFF !important; flex-shrink: 0 !important; }
        html body #seoul-mini-theater-modal .smt-wx-row.ai .smt-wx-bubble { background: #FFFFFF !important; border: 1px solid #EAEAF0 !important; border-radius: 4px 14px 14px 14px !important; padding: 8px 11px !important; font-size: 12.2px !important; line-height: 1.58 !important; color: #333338 !important; word-break: break-word !important; cursor: pointer !important; }
        html body #seoul-mini-theater-modal .smt-wx-row.me .smt-wx-bubble { background: #484852 !important; border: 1px solid #484852 !important; border-radius: 14px 4px 14px 14px !important; padding: 8px 11px !important; font-size: 12.2px !important; line-height: 1.58 !important; color: #FFFFFF !important; -webkit-text-fill-color: #FFFFFF !important; word-break: break-word !important; cursor: pointer !important; }

        /* 微信：气泡内嵌引用块样式 */
        html body #seoul-mini-theater-modal .smt-wx-quote-box {
            margin-bottom: 6px !important; padding: 4px 8px !important;
            border-left: 2.5px solid #B0B0B8 !important; border-radius: 4px !important;
            background: rgba(150, 150, 160, 0.14) !important;
            font-size: 10px !important; line-height: 1.4 !important; opacity: 0.9 !important;
        }

        /* 微信：韩系高颜值仿真转账卡片 UI (KakaoPay / WeChat Pay 白灰高级风) */
        html body #seoul-mini-theater-modal .smt-wx-pay-card {
            width: 206px !important; background: #FFFFFF !important; background-color: #FFFFFF !important;
            border: 1.2px solid #E4E4EC !important; border-radius: 14px !important; overflow: hidden !important;
            color: #3A3A40 !important; -webkit-text-fill-color: #3A3A40 !important; cursor: pointer !important;
        }
        html body #seoul-mini-theater-modal .smt-wx-pay-top {
            display: flex !important; align-items: center !important; gap: 10px !important;
            padding: 12px 13px !important; background: #F8F8F8 !important; border-bottom: 1px solid #ECECF2 !important;
        }
        html body #seoul-mini-theater-modal .smt-wx-pay-ico {
            width: 34px !important; height: 34px !important; border-radius: 10px !important;
            background: #FFFFFF !important; border: 1px solid #E6E6EC !important; flex-shrink: 0 !important;
            background-image: ${ICO.transfer} !important; background-size: 18px 18px !important; background-repeat: no-repeat !important; background-position: center !important;
        }
        html body #seoul-mini-theater-modal .smt-wx-pay-amt { font-size: 13.5px !important; font-weight: 700 !important; color: #2C2C32 !important; -webkit-text-fill-color: #2C2C32 !important; }
        html body #seoul-mini-theater-modal .smt-wx-pay-note { font-size: 9.5px !important; color: #7A7A85 !important; -webkit-text-fill-color: #7A7A85 !important; margin-top: 2px !important; }
        html body #seoul-mini-theater-modal .smt-wx-pay-foot {
            display: flex !important; justify-content: space-between !important; align-items: center !important;
            padding: 6px 13px !important; font-size: 8.2px !important; font-weight: 700 !important; color: #9A9AA5 !important; -webkit-text-fill-color: #9A9AA5 !important;
            background: #FFFFFF !important;
        }

        /* 微信：点击气泡弹出的 [引用 / 复制 / 删除] 悬浮胶囊栏 */
        html body #seoul-mini-theater-modal .smt-wx-act-pop {
            display: inline-flex !important; gap: 4px !important; margin-top: 4px !important;
            background: #FFFFFF !important; border: 1px solid #E4E4EC !important; border-radius: 99px !important;
            padding: 3px 8px !important; font-size: 9px !important; font-weight: 600 !important; color: #484852 !important;
        }
        html body #seoul-mini-theater-modal .smt-wx-act-pop span { padding: 1px 5px !important; cursor: pointer !important; }

        /* 微信：输入框上方正在引用的预览条 */
        html body #seoul-mini-theater-modal #smt-wx-reply-preview {
            display: none; align-items: center !important; justify-content: space-between !important;
            background: #F8F8F8 !important; border: 1px solid #ECECF2 !important; border-left: 3px solid #484852 !important;
            border-radius: 8px !important; padding: 5px 10px !important; margin-bottom: 6px !important;
            font-size: 9.5px !important; color: #55555E !important; flex-shrink: 0 !important;
        }

        html body #seoul-mini-theater-modal .smt-wx-meta { font-size: 8px !important; color: #9A9AA5 !important; margin-top: 2px !important; display: flex !important; gap: 4px !important; }
        html body #seoul-mini-theater-modal .smt-wx-row.me .smt-wx-meta { justify-content: flex-end !important; }
        html body #seoul-mini-theater-modal .smt-wx-sys { align-self: center !important; background: #FFFFFF !important; border: 1px solid #ECECF2 !important; border-radius: 99px !important; padding: 2.5px 10px !important; font-size: 8.5px !important; color: #8E8E98 !important; }
        html body #seoul-mini-theater-modal .smt-wx-quick { display: flex !important; gap: 5px !important; overflow-x: auto !important; padding-bottom: 6px !important; flex-shrink: 0 !important; }
        html body #seoul-mini-theater-modal .smt-wx-bar { display: flex !important; gap: 6px !important; align-items: center !important; background: #F8F8F8 !important; border: 1px solid #ECECF2 !important; border-radius: 16px !important; padding: 5px 6px !important; flex-shrink: 0 !important; }
        html body #seoul-mini-theater-modal .smt-wx-input { flex: 1 !important; height: 30px !important; min-width: 0 !important; background: #FFFFFF !important; border: 1px solid #E6E6EC !important; border-radius: 99px !important; padding: 0 11px !important; font-size: 11px !important; color: #3A3A40 !important; outline: none !important; }
        html body #seoul-mini-theater-modal .smt-wx-btn-add { width: 30px !important; height: 30px !important; border-radius: 50% !important; background: #FFFFFF !important; border: 1px solid #E4E4EC !important; flex-shrink: 0 !important; cursor: pointer !important; background-image: ${ICO.plus} !important; background-size: 14px 14px !important; background-repeat: no-repeat !important; background-position: center !important; }
        html body #seoul-mini-theater-modal .smt-wx-btn-reply { height: 30px !important; padding: 0 11px !important; border-radius: 99px !important; background: #484852 !important; color: #FFFFFF !important; -webkit-text-fill-color: #FFFFFF !important; font-size: 9.5px !important; font-weight: 700 !important; display: inline-flex !important; align-items: center !important; gap: 4px !important; flex-shrink: 0 !important; cursor: pointer !important; }
        html body #seoul-mini-theater-modal .smt-wx-btn-reply i { width: 11px !important; height: 11px !important; display: inline-block !important; background-image: ${ICO.arrowUpRight} !important; background-size: contain !important; background-repeat: no-repeat !important; }

        /* ── 情侣空间画报级 UI (Editorial Magazine Grid) ── */
        html body #seoul-mini-theater-modal .smt- editorial-grid {
            display: grid !important; grid-template-columns: 1fr 1fr !important; gap: 10px !important; margin-bottom: 12px !important;
        }
        html body #seoul-mini-theater-modal .smt-ed-card {
            background: #F8F8F8 !important; border: 1px solid #ECECF2 !important; border-radius: 16px !important;
            padding: 13px !important; cursor: pointer !important; display: flex !important; flex-direction: column !important;
            justify-content: space-between !important; min-height: 86px !important; transition: transform 0.14s ease !important;
        }
        html body #seoul-mini-theater-modal .smt-ed-card:active { transform: scale(0.96) !important; }
        html body #seoul-mini-theater-modal .smt-ed-top { display: flex !important; justify-content: space-between !important; align-items: center !important; margin-bottom: 8px !important; }
        html body #seoul-mini-theater-modal .smt-ed-ico {
            width: 34px !important; height: 34px !important; border-radius: 10px !important;
            background: #FFFFFF !important; border: 1px solid #E6E6EC !important;
            background-size: 17px 17px !important; background-repeat: no-repeat !important; background-position: center !important;
        }
        html body #seoul-mini-theater-modal .smt-ed-num {
            font-size: 8px !important; font-weight: 700 !important; color: #8E8E98 !important;
            background: #FFFFFF !important; border: 1px solid #ECECF2 !important; border-radius: 5px !important; padding: 2px 6px !important; letter-spacing: 0.5px !important;
        }
        html body #seoul-mini-theater-modal .smt-ed-title { font-size: 11.2px !important; font-weight: 700 !important; color: #2C2C32 !important; margin-bottom: 2px !important; }
        html body #seoul-mini-theater-modal .smt-ed-desc { font-size: 8.8px !important; color: #8E8E98 !important; }

        @keyframes smtSpin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        html body #seoul-mini-theater-modal .smt-disc-spin { animation: smtSpin 12s linear infinite !important; }
    `;
    topDoc.head.appendChild(styleEl);

    const wxCustomStyleEl = topDoc.createElement("style");
    wxCustomStyleEl.id = "seoul-wx-custom-style";
    topDoc.head.appendChild(wxCustomStyleEl);
    function applyWxCustomCss() { wxCustomStyleEl.innerHTML = getWxCss(); }
    applyWxCustomCss();

    /* ══════════════════════════════════════════════════════════════════════
       【PART 3：全屏页面 HTML 骨架 (100% 恢复旋转黑胶网易云 + 升级版情侣空间)】
       ══════════════════════════════════════════════════════════════════════ */
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
                <div class="smt-header-sub" id="smt-top-sub">Personal Messenger · 18:04 KST</div>
            </div>
            <div class="smt-header-right" id="smt-top-badge">API · 独立</div>
        </div>

        <div class="smt-fs-body">
            <!-- ═══ 01. 独立微信 (支持仿真转账卡片 + 引用回复 + 单条删除) ═══ -->
            <div class="smt-page active" id="smt-page-talk">
                <div class="smt-wx-top-bar">
                    <div style="display:flex;align-items:center;gap:4px;">
                        <span class="smt-pill-btn" id="smt-sync-toggle"></span>
                        <span class="smt-pill-btn" id="smt-wx-css-btn">CSS 스킨 · 美化</span>
                    </div>
                    <div style="display:flex;gap:4px;">
                        <span class="smt-pill-btn" id="smt-wx-save-snap">存历史</span>
                        <span class="smt-pill-btn" id="smt-wx-clear">清空</span>
                    </div>
                </div>

                <div id="smt-wx-css-drawer" class="smt-section-box" style="display:none;flex-shrink:0;">
                    <div style="display:flex;justify-content:space-between;align-items:center;font-size:9px;margin-bottom:5px;">
                        <b>CUSTOM WECHAT CSS · 微信美化</b>
                        <label style="cursor:pointer;font-weight:700;">导入.css<input type="file" id="smt-wx-css-upload" accept=".css,.txt" style="display:none;"/></label>
                    </div>
                    <textarea id="smt-wx-css-textarea" style="width:100%;height:90px;background:#FFFFFF !important;border:1px solid #E4E4EC !important;border-radius:8px;padding:7px;font-size:9.5px;font-family:monospace;box-sizing:border-box;"></textarea>
                    <div style="display:flex;justify-content:space-between;margin-top:6px;">
                        <span class="smt-pill-btn" id="smt-wx-css-reset">恢复默认</span>
                        <span class="smt-pill-btn dark" id="smt-wx-css-save">立即应用</span>
                    </div>
                </div>

                <div id="smt-wx-stream"></div>

                <!-- 引用回复预览条 -->
                <div id="smt-wx-reply-preview">
                    <span id="smt-wx-quote-txt" style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:85%;"></span>
                    <span id="smt-wx-quote-cancel" style="cursor:pointer;font-weight:700;padding:0 4px;">✕</span>
                </div>

                <div class="smt-wx-quick">
                    <span class="smt-pill-btn" data-wxact="poke">콕 찌르기 · 拍一拍</span>
                    <span class="smt-pill-btn" data-wxact="transfer">송금 · 发转账卡</span>
                    <span class="smt-pill-btn" data-wxact="photo">사진 · 发照片</span>
                    <span class="smt-pill-btn" data-wxact="voice">음성 · 发语音</span>
                </div>

                <div class="smt-wx-bar">
                    <input type="text" class="smt-wx-input" id="smt-wx-input" placeholder="메시지를 입력하세요... (点击气泡可引用或删除)" />
                    <span class="smt-wx-btn-add" id="smt-wx-add-btn" title="发送上屏（可连发多条）"></span>
                    <span class="smt-wx-btn-reply" id="smt-wx-reply-btn" title="让TA回复"><span>발송</span><i></i></span>
                </div>
            </div>

            <!-- ═══ 02. 情侣空间桌面（韩系杂志拍立得双人看板 + 2×3 编号画报级 App 矩阵） ═══ -->
            <div class="smt-page" id="smt-page-space">
                <!-- 韩系杂志风双人拍立得纪念日主看板 -->
                <div class="smt-section-box" style="padding:14px !important;margin-bottom:12px !important;">
                    <div style="display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid #EAEAF0 !important;padding-bottom:8px;margin-bottom:12px;">
                        <span style="font-size:8.5px;font-weight:700;letter-spacing:0.8px;color:#8E8E98 !important;">SEOUL EDITORIAL SPACE · 커플 아카이브</span>
                        <span style="font-size:8.5px;background:#FFFFFF !important;border:1px solid #E6E6EC !important;padding:2px 9px;border-radius:99px;font-weight:700;cursor:pointer;" id="smt-sp-mood"></span>
                    </div>
                    <div style="display:grid;grid-template-columns:1fr 1.1fr 1fr;align-items:center;background:#FFFFFF !important;border:1px solid #EFEFF4 !important;border-radius:14px;padding:14px 8px;text-align:center;">
                        <div>
                            <div style="background:#F8F8F8 !important;padding:5px 5px 9px 5px;border-radius:10px;border:1px solid #ECECF2 !important;display:inline-block;">
                                <img id="smt-sp-uava" src="" style="width:52px;height:56px;border-radius:6px;object-fit:cover;display:block;" />
                                <div style="font-size:9.5px;font-weight:700;margin-top:5px;" id="smt-sp-uname">ME</div>
                            </div>
                        </div>
                        <div>
                            <div style="font-size:8px;color:#9A9AA5 !important;letter-spacing:1px;margin-bottom:2px;">TOGETHER</div>
                            <div style="font-size:20px;font-weight:700;color:#2C2C32 !important;letter-spacing:0.5px;" id="smt-sp-days">D+100</div>
                            <div style="font-size:7.8px;color:#9A9AA5 !important;cursor:pointer;margin-top:4px;background:#F8F8F8 !important;border:1px solid #ECECF2 !important;border-radius:99px;padding:2px 7px;display:inline-block;" id="smt-sp-edit-date">기념일 설정 · 改日期</div>
                        </div>
                        <div>
                            <div style="background:#F8F8F8 !important;padding:5px 5px 9px 5px;border-radius:10px;border:1px solid #ECECF2 !important;display:inline-block;">
                                <img id="smt-sp-cava" src="" style="width:52px;height:56px;border-radius:6px;object-fit:cover;display:block;" />
                                <div style="font-size:9.5px;font-weight:700;margin-top:5px;" id="smt-sp-cname">PARTNER</div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 2×3 编号画报级独立 App 矩阵（带图标 + 编号 + 中韩双语描述） -->
                <div style="display:grid;grid-template-columns:1fr 1fr;gap:9px;margin-bottom:10px;">
                    <div class="smt-ed-card" data-openapp="sp_pet">
                        <div class="smt-ed-top">
                            <div class="smt-ed-ico" style="background-image:${ICO.petCat};"></div>
                            <span class="smt-ed-num">APP · 01</span>
                        </div>
                        <div>
                            <div class="smt-ed-title">반려동물 · 云养萌宠</div>
                            <div class="smt-ed-desc">共同喂养与互动日记</div>
                        </div>
                    </div>
                    <div class="smt-ed-card" data-openapp="sp_4cut">
                        <div class="smt-ed-top">
                            <div class="smt-ed-ico" style="background-image:${ICO.camera4};"></div>
                            <span class="smt-ed-num">APP · 02</span>
                        </div>
                        <div>
                            <div class="smt-ed-title">인생네컷 · 人生四格</div>
                            <div class="smt-ed-desc">首尔街头四连拍自拍亭</div>
                        </div>
                    </div>
                    <div class="smt-ed-card" data-openapp="sp_qa">
                        <div class="smt-ed-top">
                            <div class="smt-ed-ico" style="background-image:${ICO.qaBox};"></div>
                            <span class="smt-ed-num">APP · 03</span>
                        </div>
                        <div>
                            <div class="smt-ed-title">질문캡슐 · 灵魂百问</div>
                            <div class="smt-ed-desc">每日一道双人真心话</div>
                        </div>
                    </div>
                    <div class="smt-ed-card" data-openapp="sp_mood">
                        <div class="smt-ed-top">
                            <div class="smt-ed-ico" style="background-image:${ICO.pulse};"></div>
                            <span class="smt-ed-num">APP · 04</span>
                        </div>
                        <div>
                            <div class="smt-ed-title">심박수 · 同居波频</div>
                            <div class="smt-ed-desc">感应TA此刻心率与心声</div>
                        </div>
                    </div>
                    <div class="smt-ed-card" data-openapp="sp_coupon">
                        <div class="smt-ed-top">
                            <div class="smt-ed-ico" style="background-image:${ICO.ticket};"></div>
                            <span class="smt-ed-num">APP · 05</span>
                        </div>
                        <div>
                            <div class="smt-ed-title">러브쿠폰 · 恋爱兑换券</div>
                            <div class="smt-ed-desc">向TA核销专属宠溺特权</div>
                        </div>
                    </div>
                    <div class="smt-ed-card" data-openapp="sp_guest">
                        <div class="smt-ed-top">
                            <div class="smt-ed-ico" style="background-image:${ICO.guestbook};"></div>
                            <span class="smt-ed-num">APP · 06</span>
                        </div>
                        <div>
                            <div class="smt-ed-title">방명록 · 留言与心愿</div>
                            <div class="smt-ed-desc">悄悄话留言板与百事清单</div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- ═══ 03. 个人主页 ═══ -->
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
                    <div style="display:flex;justify-content:flex-end;gap:5px;margin-top:6px;">
                        <span class="smt-pill-btn" id="smt-export-html">导出HTML</span>
                        <span class="smt-pill-btn dark" id="smt-save-html">保存主页</span>
                    </div>
                </div>

                <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:9px;">
                    <div class="smt-ed-card" data-openapp="phone" style="min-height:78px !important;">
                        <div class="smt-ed-top"><div class="smt-ed-ico" style="background-image:${ICO.phone};"></div><span class="smt-ed-num">01</span></div>
                        <div class="smt-ed-title">突击查手机</div>
                    </div>
                    <div class="smt-ed-card" data-openapp="music" style="min-height:78px !important;">
                        <div class="smt-ed-top"><div class="smt-ed-ico" style="background-image:${ICO.music};"></div><span class="smt-ed-num">02</span></div>
                        <div class="smt-ed-title">网易云同听</div>
                    </div>
                    <div class="smt-ed-card" data-openapp="diary" style="min-height:78px !important;">
                        <div class="smt-ed-top"><div class="smt-ed-ico" style="background-image:${ICO.book};"></div><span class="smt-ed-num">03</span></div>
                        <div class="smt-ed-title">交换日记本</div>
                    </div>
                </div>
            </div>

            <!-- ═══ 04. 历史记录馆 ═══ -->
            <div class="smt-page" id="smt-page-archive">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
                    <span style="font-size:10px;font-weight:700;">SAVED ARCHIVES · 历史档案馆</span>
                    <span class="smt-pill-btn" id="smt-export-arch">导出 JSON</span>
                </div>
                <div id="smt-archive-list" style="flex:1;overflow-y:auto;"></div>
            </div>

            <!-- ═══ 05. 独立 API 设置 ═══ -->
            <div class="smt-page" id="smt-page-api">
                <div class="smt-section-box" style="background:#FFFFFF !important;border:1.5px solid #484852 !important;">
                    <div style="font-size:10.5px;font-weight:700;margin-bottom:3px;">⚡ 全系统独立 API 引擎（所有 App 均按此配置生成）</div>
                    <div style="font-size:8.8px;color:#7A7A85 !important;" id="smt-api-status-tip">请确认下方已填写你的反代地址与 API Key</div>
                </div>
                <div class="smt-section-box">
                    <div style="font-size:9.5px;font-weight:700;margin-bottom:4px;">1. 独立 API 地址 (Base URL)</div>
                    <input type="text" id="smt-api-url" class="smt-wx-input" style="width:100%;box-sizing:border-box;border-radius:8px !important;" placeholder="https://api.openai.com/v1" />
                </div>
                <div class="smt-section-box">
                    <div style="font-size:9.5px;font-weight:700;margin-bottom:4px;">2. 独立 API Key</div>
                    <input type="password" id="smt-api-key" class="smt-wx-input" style="width:100%;box-sizing:border-box;border-radius:8px !important;" placeholder="sk-..." />
                </div>
                <div class="smt-section-box">
                    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;">
                        <span style="font-size:9.5px;font-weight:700;">3. 模型名称</span>
                        <span class="smt-pill-btn" id="smt-fetch-models">🔄 拉取模型列表</span>
                    </div>
                    <input type="text" id="smt-api-model" class="smt-wx-input" style="width:100%;box-sizing:border-box;border-radius:8px !important;" placeholder="gpt-4o-mini / deepseek-chat / claude..." />
                    <select id="smt-model-select" class="smt-wx-input" style="width:100%;margin-top:5px;display:none;border-radius:8px !important;"></select>
                </div>
                <div class="smt-section-box">
                    <div style="font-size:9.5px;font-weight:700;margin-bottom:4px;">4. 自动读取酒馆主线最近几层聊天作为上下文参考</div>
                    <input type="number" id="smt-api-ctx" class="smt-wx-input" style="width:100%;box-sizing:border-box;border-radius:8px !important;" value="8" />
                </div>
                <div style="display:flex;justify-content:flex-end;gap:6px;">
                    <span class="smt-pill-btn" id="smt-test-api" style="height:30px !important;padding:0 12px !important;">⚡ 测试连接</span>
                    <span class="smt-pill-btn dark" id="smt-save-api" style="height:30px !important;padding:0 16px !important;">✓ 保存独立 API 设置</span>
                </div>
            </div>

            <!-- ═══ 情侣空间 6 大独立全屏子页面 (sp_pet / sp_4cut / sp_qa / sp_mood / sp_coupon / sp_guest) ═══ -->
            <div class="smt-page" id="smt-page-sp_pet">
                <div class="smt-section-box" style="text-align:center;padding:18px 14px !important;">
                    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">
                        <span style="font-size:9px;font-weight:700;color:#8E8E98 !important;">COUPLE PET HOUSE · 반려동물 하우스</span>
                        <span class="smt-pill-btn" id="smt-pet-rename">✎ 改宠物名</span>
                    </div>
                    <div style="width:72px;height:72px;border-radius:20px;background:#FFFFFF !important;border:1.5px solid #EAEAF0 !important;margin:0 auto 8px auto;background-image:${ICO.petCat};background-size:40px 40px;background-repeat:no-repeat;background-position:center;"></div>
                    <div style="font-size:14px;font-weight:700;" id="smt-pet-name">모찌 (糯米团)</div>
                    <div style="font-size:9px;color:#7A7A85 !important;margin:2px 0 12px 0;" id="smt-pet-lv">LV.3</div>
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

            <!-- ═══ 突击查TA手机全屏页 ═══ -->
            <div class="smt-page" id="smt-page-phone">
                <div style="background:#F8F8F8 !important;border:1px solid #ECECF2 !important;border-radius:16px;padding:10px 13px;margin-bottom:10px;display:flex;align-items:center;justify-content:space-between;flex-shrink:0;">
                    <div style="display:flex;align-items:center;gap:10px;">
                        <img id="smt-ph-ava" src="" style="width:36px;height:36px;border-radius:50%;object-fit:cover;border:2px solid #FFFFFF;" />
                        <div><div style="font-size:11px;font-weight:700;" id="smt-ph-owner">TA's iPhone</div><div style="font-size:8px;color:#8E8E98 !important;">FACE ID UNLOCKED</div></div>
                    </div>
                    <span class="smt-pill-btn dark" id="smt-ph-refresh-btn">↻ 重新生成此页</span>
                </div>
                <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:5px;margin-bottom:10px;flex-shrink:0;">
                    <span class="smt-pill-btn dark" data-phtab="ins">📸 INS小号</span>
                    <span class="smt-pill-btn" data-phtab="memo">🔒 备忘录</span>
                    <span class="smt-pill-btn" data-phtab="bill">💳 Pay账单</span>
                    <span class="smt-pill-btn" data-phtab="forum">💬 匿名论坛</span>
                </div>
                <div id="smt-ph-stage" style="flex:1;min-height:0;overflow-y:auto;padding-bottom:12px;"></div>
            </div>

            <!-- ═══ 🎧 100% 原版恢复：旋转黑胶唱盘 + 三栏网易云一起听全屏页 ═══ -->
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
                    <div style="font-size:8.5px;color:#8E8E98 !important;margin:2px 0 6px 0;" id="smt-mus-sub">正在与 TA 共享蓝牙耳机同听中...</div>
                    <audio id="smt-audio-player" controls style="width:100%;height:30px;outline:none;"></audio>
                    <div id="smt-ncm-iframe-wrap" style="display:none;margin-top:4px;"></div>
                    <div style="display:flex;justify-content:center;gap:5px;margin-top:7px;flex-wrap:wrap;">
                        <span class="smt-pill-btn" id="smt-mus-like-cur">♡ 加入我喜欢</span>
                        <span class="smt-pill-btn" id="smt-mus-toggle-iframe">切换官方播放器</span>
                        <span class="smt-pill-btn dark" id="smt-ncm-ai-listen">✦ 让TA点评这首歌</span>
                    </div>
                    <div id="smt-mus-ai-comment" style="margin-top:7px;font-size:10px;background:#FFFFFF !important;border:1px solid #ECECF2 !important;border-radius:9px;padding:7px 10px;display:none;text-align:left;line-height:1.6;"></div>
                </div>

                <!-- 完整三栏页签：[♥ 我喜欢] / [🔍 搜网易云曲库] / [📥 导网易云歌单] -->
                <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:5px;margin-bottom:8px;flex-shrink:0;">
                    <span class="smt-pill-btn dark" data-mustab="liked" id="smt-tab-liked-btn">♥ 我喜欢 (4)</span>
                    <span class="smt-pill-btn" data-mustab="search">🔍 搜网易云曲库</span>
                    <span class="smt-pill-btn" data-mustab="import">📥 导网易云歌单</span>
                </div>

                <div id="smt-mus-pane-liked" style="flex:1;min-height:0;overflow-y:auto;"></div>

                <div id="smt-mus-pane-search" style="display:none;flex:1;min-height:0;flex-direction:column;">
                    <div style="display:flex;gap:5px;margin-bottom:8px;flex-shrink:0;">
                        <input type="text" id="smt-mus-search-input" class="smt-wx-input" placeholder="输入歌名或歌手搜网易云 (如: 周杰伦 / IU / NewJeans)..." />
                        <span class="smt-pill-btn dark" id="smt-mus-search-btn" style="height:30px !important;padding:0 14px !important;">搜索</span>
                    </div>
                    <div id="smt-mus-search-results" style="flex:1;min-height:0;overflow-y:auto;"></div>
                </div>

                <div id="smt-mus-pane-import" style="display:none;flex:1;min-height:0;overflow-y:auto;">
                    <div class="smt-section-box">
                        <div style="font-size:10px;font-weight:700;margin-bottom:4px;">方式一：输入网易云「公开歌单链接 / 歌单ID」整单导入</div>
                        <div style="display:flex;gap:5px;margin-bottom:5px;">
                            <input type="text" id="smt-ncm-pl-link" class="smt-wx-input" placeholder="粘贴网易云歌单分享链接 或 纯数字歌单ID..." />
                            <span class="smt-pill-btn dark" id="smt-ncm-pl-sync-btn" style="height:30px !important;padding:0 12px !important;">整单导入</span>
                        </div>
                        <div id="smt-ncm-pl-status" style="font-size:9px;color:#55555E !important;font-weight:600;"></div>
                    </div>
                    <div class="smt-section-box">
                        <div style="font-size:10px;font-weight:700;margin-bottom:4px;">方式二：直接粘贴多行歌名 / 网易云单曲链接批量导入</div>
                        <textarea id="smt-mus-import-text" style="width:100%;height:70px;background:#FFFFFF !important;border:1px solid #E4E4EC !important;border-radius:8px;padding:7px;font-size:9.5px;box-sizing:border-box;margin-bottom:6px;" placeholder="支持一行一首歌名或网易云单曲分享链接..."></textarea>
                        <div style="display:flex;justify-content:space-between;">
                            <span class="smt-pill-btn" id="smt-mus-clear-liked">清空我喜欢</span>
                            <span class="smt-pill-btn dark" id="smt-mus-import-run">＋ 批量导入到我喜欢</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- ═══ 交换日记全屏页 ═══ -->
            <div class="smt-page" id="smt-page-diary">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;flex-shrink:0;">
                    <span style="font-size:10.5px;font-weight:700;">EXCHANGE DIARY · 双人手写日记本</span>
                    <span class="smt-pill-btn dark" id="smt-diary-ai-write">✦ 让TA写今日日记</span>
                </div>
                <div id="smt-diary-list" style="flex:1;min-height:0;overflow-y:auto;margin-bottom:8px;"></div>
                <div class="smt-section-box" style="margin-bottom:0 !important;flex-shrink:0;">
                    <textarea id="smt-diary-input" style="width:100%;height:54px;background:#FFFFFF !important;border:1px solid #E6E6EC !important;border-radius:8px;padding:7px;font-size:11px;box-sizing:border-box;resize:none;margin-bottom:6px;outline:none;" placeholder="오늘의 일기... 写下你今天的日记"></textarea>
                    <div style="text-align:right;"><span class="smt-pill-btn dark" id="smt-diary-user-save">存入交换日记本</span></div>
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

    /* ══════════════════════════════════════════════════════════════════════
       【PART 4：💬 独立微信模块 (仿真转账卡片 + 引用回复 + 单条消息删除 + 连发不秒回)】
       ══════════════════════════════════════════════════════════════════════ */
    let activeQuoteText = "";
    let activeMenuMsgIdx = -1;

    function setQuotePreview(txt) {
        activeQuoteText = txt || "";
        const bar = topDoc.getElementById("smt-wx-reply-preview");
        if (activeQuoteText) {
            bar.style.display = "flex";
            topDoc.getElementById("smt-wx-quote-txt").textContent = `引用：「${activeQuoteText}」`;
        } else {
            bar.style.display = "none";
        }
    }
    topDoc.getElementById("smt-wx-quote-cancel").onclick = () => setQuotePreview("");

    function renderWeChat() {
        topDoc.getElementById("smt-sync-toggle").textContent = `主线记忆: ${getSyncMode() ? "ON" : "OFF"}`;
        const ctx = getSTContext(1), stream = topDoc.getElementById("smt-wx-stream"), list = getChatList();
        stream.innerHTML = list.length ? "" : `<div class="smt-wx-sys">CONNECTED WITH ${ctx.charName} · 点击任意气泡可【引用】或【删除】</div>`;

        list.forEach((m, idx) => {
            if (m.role === "sys") {
                const s = topDoc.createElement("div"); s.className = "smt-wx-sys"; s.textContent = m.text;
                stream.appendChild(s); return;
            }
            const isMe = m.role === "user", row = topDoc.createElement("div");
            row.className = `smt-wx-row ${isMe ? "me" : "ai"}`;

            // 识别是否为转账卡片消息
            let innerContentHtml = "";
            if (m.type === "transfer" || /^\[(微信)?转账/.test(m.text)) {
                const amt = m.amount || m.text.match(/¥?(\d+(\.\d+)?)/)?.[1] || "520.00";
                const note = m.note || m.text.split("备注:")[1]?.replace("]", "")?.trim() || "给你的零花钱";
                const accepted = m.accepted;
                innerContentHtml = `
                    <div class="smt-wx-pay-card" data-msgidx="${idx}">
                        <div class="smt-wx-pay-top">
                            <div class="smt-wx-pay-ico"></div>
                            <div>
                                <div class="smt-wx-pay-amt">₩ / ¥ ${amt}</div>
                                <div class="smt-wx-pay-note">${ accepted ? "✓ 已收款 · " + note : note }</div>
                            </div>
                        </div>
                        <div class="smt-wx-pay-foot">
                            <span>SEOUL PAY · 송금</span>
                            <span>${accepted ? "COMPLETED" : "TRANSFER"}</span>
                        </div>
                    </div>`;
            } else {
                const qHtml = m.quote ? `<div class="smt-wx-quote-box">「${m.quote.replace(/</g, "&lt;")}」</div>` : "";
                innerContentHtml = `<div class="smt-wx-bubble" data-msgidx="${idx}">${qHtml}${m.text.replace(/</g, "&lt;")}</div>`;
            }

            // 点击气泡弹出的 [引用 / 复制 / 删除] 菜单
            const menuHtml = activeMenuMsgIdx === idx ? `
                <div class="smt-wx-act-pop">
                    <span data-wxop="quote" data-idx="${idx}">💬 引用</span>
                    <span data-wxop="copy" data-idx="${idx}">📋 复制</span>
                    <span data-wxop="del" data-idx="${idx}" style="color:#B05050 !important;">🗑️ 删除</span>
                </div>` : "";

            row.innerHTML = `
                <img class="smt-wx-ava" src="${isMe ? ctx.userAvatar : ctx.charAvatar}"/>
                <div style="display:flex;flex-direction:column;align-items:${isMe ? "flex-end" : "flex-start"};">
                    ${innerContentHtml}
                    ${menuHtml}
                    <div class="smt-wx-meta"><span>${isMe ? "읽음 1" : ctx.charName}</span><span>·</span><span>${m.time || ""}</span></div>
                </div>`;
            stream.appendChild(row);
        });

        // 绑定点击气泡展开操作菜单
        stream.querySelectorAll("[data-msgidx]").forEach((el) => {
            el.onclick = (e) => {
                e.stopPropagation();
                const i = Number(el.getAttribute("data-msgidx"));
                activeMenuMsgIdx = activeMenuMsgIdx === i ? -1 : i;
                renderWeChat();
            };
        });

        // 绑定 [引用 / 复制 / 删除] 操作
        stream.querySelectorAll("[data-wxop]").forEach((btnOp) => {
            btnOp.onclick = (e) => {
                e.stopPropagation();
                const op = btnOp.getAttribute("data-wxop");
                const i = Number(btnOp.getAttribute("data-idx"));
                const arr = getChatList();
                const target = arr[i];
                activeMenuMsgIdx = -1;
                if (!target) return;
                if (op === "quote") {
                    setQuotePreview(target.text.slice(0, 36));
                    renderWeChat();
                    topDoc.getElementById("smt-wx-input").focus();
                } else if (op === "copy") {
                    navigator.clipboard?.writeText(target.text);
                    renderWeChat();
                } else if (op === "del") {
                    arr.splice(i, 1);
                    saveChatList(arr);
                    renderWeChat();
                }
            };
        });

        stream.scrollTop = stream.scrollHeight;
    }

    function appendWx(txt, sys = "", extra = {}) {
        const l = getChatList();
        if (sys) l.push({ role: "sys", text: sys, time: nowTimeStr() });
        if (txt) {
            l.push(Object.assign({
                role: "user",
                text: txt,
                quote: activeQuoteText || "",
                time: nowTimeStr()
            }, extra));
            setQuotePreview("");
        }
        saveChatList(l);
        renderWeChat();
    }

    topDoc.getElementById("smt-wx-add-btn").onclick = () => {
        const i = topDoc.getElementById("smt-wx-input");
        if (i.value.trim()) { appendWx(i.value.trim()); i.value = ""; }
    };
    topDoc.getElementById("smt-wx-input").onkeydown = (e) => {
        if (e.key === "Enter") { e.preventDefault(); topDoc.getElementById("smt-wx-add-btn").click(); }
    };

    topDoc.getElementById("smt-wx-reply-btn").onclick = async () => {
        const i = topDoc.getElementById("smt-wx-input");
        if (i.value.trim()) { appendWx(i.value.trim()); i.value = ""; }
        const sub = topDoc.getElementById("smt-top-sub");
        sub.textContent = "입력 중... 对方正在输入";
        try {
            const ctx = getSTContext(Number(getApiCfg().ctxCount) || 8);
            const allChat = getChatList();
            const rec = allChat.slice(-16).map((m) => {
                if (m.role === "sys") return `[系统提示: ${m.text}]`;
                const qPrefix = m.quote ? `(引用「${m.quote}」) ` : "";
                return `${m.role === "user" ? ctx.userName : ctx.charName}: ${qPrefix}${m.text}`;
            }).join("\n");

            const sysPrompt = `你是${ctx.charName}，在微信上与${ctx.userName}私聊。\n人设：${ctx.charDesc.slice(0, 1300)}\n近期剧情：${ctx.recentChat.slice(-1300)}\n规则：1. 用日常短句一次连回1~4条气泡，换行分隔。2. 如果对方发了转账卡片，请自然回应并可在单独一行写 [收款] 或主动发 [转账:520:备注]。`;
            const raw = await requestStandaloneAI(sysPrompt, `【微信记录】：\n${rec}\n请以 ${ctx.charName} 的口吻回复：`);

            // 若 AI 回复了收款，自动把上一张转账卡标为已收款
            if (raw.includes("收") || raw.includes("谢") || raw.includes("转账")) {
                allChat.forEach((m) => { if (m.type === "transfer") m.accepted = true; });
                saveChatList(allChat);
            }

            const lines = raw.split(/\n+/).map((s) => s.replace(/^[^:：]{1,8}[:：]\s*/, "").trim()).filter(Boolean).slice(0, 4);
            for (const b of lines) {
                await new Promise((r) => setTimeout(r, 260));
                const c = getChatList();
                if (b.startsWith("[转账")) {
                    const parts = b.replace(/[\[\]]/g, "").split(/[:：]/);
                    c.push({ role: "ai", type: "transfer", amount: parts[1] || "520.00", note: parts[2] || "给你的零花钱", text: b, time: nowTimeStr() });
                } else {
                    c.push({ role: "ai", text: b, time: nowTimeStr() });
                }
                saveChatList(c);
                renderWeChat();
            }
        } catch (err) { appendWx("", err.message); }
        finally { sub.textContent = "Personal Messenger · KST"; }
    };

    // 微信底部快捷栏（含自定义金额转账卡片！）
    topDoc.querySelectorAll("[data-wxact]").forEach((b) => b.onclick = () => {
        const a = b.getAttribute("data-wxact"), ctx = getSTContext(1);
        if (a === "poke") appendWx("", `"${ctx.userName}" 拍了拍 "${ctx.charName}" 的肩膀`);
        if (a === "transfer") {
            const amt = prompt("输入转账金额：", "520.00");
            if (!amt) return;
            const note = prompt("输入转账备注：", "给你的零花钱") || "转账给 " + ctx.charName;
            appendWx(`[微信转账 ¥${amt} · 备注:${note}]`, "", { type: "transfer", amount: amt, note: note, accepted: false });
        }
        if (a === "photo") {
            const desc = prompt("描述你发给TA的照片画面：", "刚拍的街角咖啡店随手拍");
            if (desc) appendWx(`[照片: ${desc}]`);
        }
        if (a === "voice") {
            const v = prompt("输入语音条内容：");
            if (v) appendWx(`(( 🎙️ 6" · "${v}" ))`);
        }
    });

    topDoc.getElementById("smt-sync-toggle").onclick = () => { setSyncMode(!getSyncMode()); renderWeChat(); };
    topDoc.getElementById("smt-wx-clear").onclick = () => { saveChatList([]); renderWeChat(); };
    topDoc.getElementById("smt-wx-save-snap").onclick = () => { const c = getSTContext(1); pushArchive(`[微信] 与 ${c.charName}`, getChatList().map((m) => `${m.role}: ${m.text}`).join("\n"), false); alert("✓ 已存入历史！"); };
    topDoc.getElementById("smt-wx-css-btn").onclick = () => { const d = topDoc.getElementById("smt-wx-css-drawer"); d.style.display = d.style.display === "none" ? "block" : "none"; topDoc.getElementById("smt-wx-css-textarea").value = getWxCss(); };
    topDoc.getElementById("smt-wx-css-save").onclick = () => { saveWxCss(topDoc.getElementById("smt-wx-css-textarea").value); applyWxCustomCss(); topDoc.getElementById("smt-wx-css-drawer").style.display = "none"; };
    topDoc.getElementById("smt-wx-css-reset").onclick = () => { saveWxCss(DEFAULT_WX_CSS); topDoc.getElementById("smt-wx-css-textarea").value = DEFAULT_WX_CSS; applyWxCustomCss(); };
    /* ══════════════════════════════════════════════════════════════════════
       【PART 5：🤍 情侣空间与 6 大全屏子 App 逻辑】
       ══════════════════════════════════════════════════════════════════════ */
    const QA_QUESTIONS = [
        "第一次悄悄对彼此产生超越普通关系的占有欲，是在哪个瞬间？",
        "如果今晚首尔突然停电，只有我们两个人被困在家里，最想一起做什么？",
        "对方身上有一个连TA自己都没察觉到、但你却觉得很可爱的小习惯是什么？",
        "手机相册里最舍不得删掉的一张和对方有关的照片（或截图）是什么？",
        "吵架或冷战的时候，对方做什么动作会让你瞬间心软投降？"
    ];

    function getSpaceData() {
        try {
            return Object.assign({
                startDate: "2024-05-20", mood: "오늘의 온도 · 36.5°C 서울",
                pet: { name: "모찌 (糯米团)", lv: 3, hunger: 85, mood: 92, lastLog: "糯米团正蜷在阳光地毯上打呼噜，尾巴轻轻晃了一下。" },
                life4cut: { date: "2025.05 · SEOUL", frames: ["两人并肩坐在灰白帘幕前，肩膀轻轻相贴。", "TA偏过头看向你，嘴角勾起温柔的弧度。", "第三张抓拍时，TA突然伸手捏了捏你的脸颊。", "最后一张定格，TA自然地揽过你的肩膀靠近镜头。"], sign: "우리의 계절 · 永远偏爱你" },
                qaIndex: 0, qaUserAns: "点击此处写下你的回答...", qaCharAns: "点击右上角「让TA作答」揭晓...",
                moodSync: { action: "刚洗完澡擦着头发，正看着手机等你的消息", temp: "36.8°C", bpm: "94 BPM", miss: "98%", os: "“怎么还不回我消息……是在忙，还是又熬夜了？”" },
                coupons: [
                    { title: "무조건 화해권 · 无条件和好券", desc: "无论谁生闷气，出示此券必须立刻拥抱和好" },
                    { title: "심야 호출권 · 深夜随叫随到券", desc: "凌晨任何时候想见TA，TA都会立刻出现在你面前" },
                    { title: "소원 들어주기 · 任性要求实现券", desc: "向TA提一个平时不好意思说的小要求，绝对服从" }
                ],
                couponLog: "点击上方任意特权券的「向TA使用」，即可触发 TA 的专属履约反应！",
                notes: [{ author: "SEOUL SPACE", text: "在这里写下悄悄话，TA 会在留言板直接回复你。", time: "刚刚" }],
                todos: [{ text: "在首尔街头拍一次人生四格", done: true }, { text: "一起戴同一副耳机听歌", done: false }]
            }, JSON.parse(localStorage.getItem(K_SPACE) || "{}"));
        } catch (e) { return { startDate: "2024-05-20", mood: "36.5°C", pet: { name: "糯米团", lv: 1, hunger: 80, mood: 90, lastLog: "" }, notes: [], todos: [] }; }
    }
    function saveSpaceData(d) { localStorage.setItem(K_SPACE, JSON.stringify(d)); }
    function calcTogetherDays() { const diff = Math.max(1, Math.floor((Date.now() - new Date(getSpaceData().startDate || "2024-05-20").getTime()) / 86400000)); return isNaN(diff) ? 100 : diff; }

    function renderCoupleSpaceAll() {
        const ctx = getSTContext(1), sp = getSpaceData();
        topDoc.getElementById("smt-sp-uava").src = ctx.userAvatar;
        topDoc.getElementById("smt-sp-cava").src = ctx.charAvatar;
        topDoc.getElementById("smt-sp-uname").textContent = ctx.userName;
        topDoc.getElementById("smt-sp-cname").textContent = ctx.charName;
        topDoc.getElementById("smt-sp-days").textContent = `D+${calcTogetherDays()}`;
        topDoc.getElementById("smt-sp-mood").textContent = `${sp.mood} ✎`;

        const pet = sp.pet || { name: "모찌", lv: 1, hunger: 80, mood: 90, lastLog: "" };
        topDoc.getElementById("smt-pet-name").textContent = pet.name;
        topDoc.getElementById("smt-pet-lv").textContent = `LV.${pet.lv || 1} · 与 ${ctx.charName} 共同抚养`;
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
        topDoc.getElementById("smt-qa-char-label").textContent = `${ctx.charName}'S ANSWER`;
        topDoc.getElementById("smt-qa-char-txt").textContent = sp.qaCharAns;

        const ms = sp.moodSync || { action: "正在想你", temp: "36.7°C", bpm: "92 BPM", miss: "99%", os: "" };
        topDoc.getElementById("smt-mood-stage").innerHTML = `<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-bottom:10px;"><div style="background:#FFFFFF !important;border:1px solid #EFEFF4 !important;border-radius:12px;padding:10px;text-align:center;"><div style="font-size:8px;color:#8E8E98 !important;">HEART RATE</div><div style="font-size:13px;font-weight:700;margin-top:3px;">${ms.bpm}</div></div><div style="background:#FFFFFF !important;border:1px solid #EFEFF4 !important;border-radius:12px;padding:10px;text-align:center;"><div style="font-size:8px;color:#8E8E98 !important;">BODY TEMP</div><div style="font-size:13px;font-weight:700;margin-top:3px;">${ms.temp}</div></div><div style="background:#FFFFFF !important;border:1px solid #EFEFF4 !important;border-radius:12px;padding:10px;text-align:center;"><div style="font-size:8px;color:#8E8E98 !important;">MISS YOU</div><div style="font-size:13px;font-weight:700;margin-top:3px;">${ms.miss}</div></div></div><div style="background:#FFFFFF !important;border:1px solid #EFEFF4 !important;border-radius:12px;padding:12px;margin-bottom:8px;"><div style="font-size:8.5px;color:#8E8E98 !important;font-weight:700;margin-bottom:4px;">CURRENT ACTION · 此刻动态</div><div style="font-size:11.5px;line-height:1.6;">${ms.action}</div></div><div style="background:#FFFFFF !important;border:1px solid #EFEFF4 !important;border-radius:12px;padding:12px;"><div style="font-size:8.5px;color:#8E8E98 !important;font-weight:700;margin-bottom:4px;">INNER VOICE · 内心心声</div><div style="font-size:11.5px;line-height:1.6;">${ms.os}</div></div>`;

        const cpList = topDoc.getElementById("smt-coupon-list");
        cpList.innerHTML = (sp.coupons || []).map((c, idx) => `<div style="display:flex;justify-content:space-between;align-items:center;background:#FFFFFF !important;border:1px solid #EAEAF0 !important;border-radius:12px;padding:11px 12px;margin-bottom:8px;"><div style="padding-right:10px;"><div style="font-size:11px;font-weight:700;">🎟️ ${c.title}</div><div style="font-size:9px;color:#7A7A85 !important;margin-top:2px;">${c.desc}</div></div><span class="smt-pill-btn dark" data-usecp="${idx}">向TA使用</span></div>`).join("");
        topDoc.getElementById("smt-coupon-log").textContent = sp.couponLog || "";
        cpList.querySelectorAll("[data-usecp]").forEach((b) => b.onclick = async () => {
            const idx = Number(b.getAttribute("data-usecp")), cp = sp.coupons[idx], logEl = topDoc.getElementById("smt-coupon-log");
            logEl.textContent = `⏳ 正在向 ${ctx.charName} 核销【${cp.title}】...`;
            try { const r = await requestStandaloneAI(`你是${ctx.charName}。人设：${ctx.charDesc.slice(0, 1000)}`, `${ctx.userName}向你出示了特权券：【${cp.title}（${cp.desc}）】。请描写你看到后的反应与立刻宠溺履约的行动(90字左右)：`); sp.couponLog = `✓ 已核销【${cp.title}】：\n${r}`; saveSpaceData(sp); renderCoupleSpaceAll(); } catch (err) { logEl.textContent = err.message; }
        });

        topDoc.getElementById("smt-sp-notes-list").innerHTML = sp.notes.map((n) => `<div style="background:#FFFFFF !important;border:1px solid #EFEFF4 !important;border-radius:10px;padding:8px 10px;margin-bottom:6px;font-size:10.5px;"><div style="display:flex;justify-content:space-between;font-size:8.5px;color:#8E8E98 !important;"><b>${n.author}</b><span>${n.time}</span></div><div>${n.text.replace(/</g, "&lt;")}</div></div>`).join("");
        const todoEl = topDoc.getElementById("smt-sp-todo-list"); todoEl.innerHTML = "";
        sp.todos.forEach((td, idx) => {
            const row = topDoc.createElement("div");
            row.style.cssText = "display:flex;align-items:center;justify-content:space-between;background:#FFFFFF !important;border:1px solid #EFEFF4 !important;border-radius:9px;padding:7px 10px;margin-bottom:5px;font-size:10.5px;";
            row.innerHTML = `<label style="display:flex;align-items:center;gap:7px;cursor:pointer;flex:1;"><input type="checkbox" ${td.done ? "checked" : ""}/><span style="${td.done ? "text-decoration:line-through;color:#9A9AA5;" : ""}">${td.text}</span></label><span style="cursor:pointer;" data-deltodo="${idx}">✕</span>`;
            row.querySelector("input").onchange = (e) => { const d = getSpaceData(); d.todos[idx].done = e.target.checked; saveSpaceData(d); renderCoupleSpaceAll(); };
            row.querySelector("[data-deltodo]").onclick = () => { const d = getSpaceData(); d.todos.splice(idx, 1); saveSpaceData(d); renderCoupleSpaceAll(); };
            todoEl.appendChild(row);
        });
    }

    topDoc.getElementById("smt-sp-edit-date").onclick = () => { const sp = getSpaceData(), v = prompt("相恋日期(YYYY-MM-DD)：", sp.startDate); if (v) { sp.startDate = v.trim(); saveSpaceData(sp); renderCoupleSpaceAll(); } };
    topDoc.getElementById("smt-sp-mood").onclick = () => { const sp = getSpaceData(), v = prompt("修改今日心情温度：", sp.mood); if (v) { sp.mood = v.trim(); saveSpaceData(sp); renderCoupleSpaceAll(); } };
    topDoc.getElementById("smt-pet-rename").onclick = () => { const sp = getSpaceData(), v = prompt("给宠物起名：", sp.pet.name); if (v) { sp.pet.name = v.trim(); saveSpaceData(sp); renderCoupleSpaceAll(); } };
    topDoc.getElementById("smt-pet-feed").onclick = () => { const sp = getSpaceData(); sp.pet.hunger = Math.min(100, sp.pet.hunger + 15); sp.pet.lastLog = `你喂了 ${sp.pet.name} 冻干零食，它开心地蹭了蹭你的手心！`; saveSpaceData(sp); renderCoupleSpaceAll(); };
    topDoc.getElementById("smt-pet-pat").onclick = () => { const sp = getSpaceData(); sp.pet.mood = Math.min(100, sp.pet.mood + 15); sp.pet.lastLog = `你揉了揉 ${sp.pet.name} 的脑袋，它舒服地露出肚皮打滚~`; saveSpaceData(sp); renderCoupleSpaceAll(); };
    topDoc.getElementById("smt-pet-ai-play").onclick = async (e) => {
        const ctx = getSTContext(6), sp = getSpaceData(); e.target.textContent = "互动中...";
        try { sp.pet.lastLog = await requestStandaloneAI(`你是${ctx.charName}。人设：${ctx.charDesc.slice(0, 900)}`, `描写你逗弄宠物「${sp.pet.name}」并和身旁的${ctx.userName}亲昵互动的画面(80字左右)：`); saveSpaceData(sp); renderCoupleSpaceAll(); } catch (err) { alert(err.message); } finally { e.target.textContent = "✦ 让TA陪宠物玩"; }
    };
    topDoc.getElementById("smt-4cut-gen-btn").onclick = async (e) => {
        const ctx = getSTContext(8); e.target.textContent = "⏳ 连拍中...";
        try {
            const raw = await requestStandaloneAI(`你是摄影师。角色：${ctx.charName}与${ctx.userName}。人设：${ctx.charDesc.slice(0, 1000)}`, `生成两人在自拍亭连拍4张人生四格的画面。严格只输出JSON：{"frames":["第1格","第2格","第3格","第4格亲密定格"],"sign":"手写短句"}`);
            const m = raw.match(/\{[\s\S]*\}/);
            if (m) { const obj = JSON.parse(m[0]), sp = getSpaceData(); sp.life4cut = { date: "SEOUL · " + nowTimeStr(), frames: obj.frames || [], sign: obj.sign || "우리의 계절" }; saveSpaceData(sp); renderCoupleSpaceAll(); }
        } catch (err) { alert(err.message); } finally { e.target.textContent = "✦ 和TA拍一组新四格"; }
    };
    topDoc.getElementById("smt-qa-next").onclick = () => { const sp = getSpaceData(); sp.qaIndex = ((sp.qaIndex || 0) + 1) % QA_QUESTIONS.length; sp.qaUserAns = "点击填写..."; sp.qaCharAns = "点击让TA作答..."; saveSpaceData(sp); renderCoupleSpaceAll(); };
    topDoc.getElementById("smt-qa-edit-my").onclick = () => { const sp = getSpaceData(), v = prompt("写下你的回答："); if (v) { sp.qaUserAns = v.trim(); saveSpaceData(sp); renderCoupleSpaceAll(); } };
    topDoc.getElementById("smt-qa-ai-ans").onclick = async (e) => {
        const ctx = getSTContext(6), sp = getSpaceData(), q = QA_QUESTIONS[(sp.qaIndex || 0) % QA_QUESTIONS.length]; e.target.textContent = "思考中...";
        try { sp.qaCharAns = await requestStandaloneAI(`你是${ctx.charName}。人设：${ctx.charDesc.slice(0, 1000)}`, `问题：“${q}”(${ctx.userName}答：“${sp.qaUserAns}”)。请用第一人称写下你的回答(70字左右)：`); saveSpaceData(sp); renderCoupleSpaceAll(); } catch (err) { alert(err.message); } finally { e.target.textContent = "✦ 让TA作答"; }
    };
    topDoc.getElementById("smt-mood-sync-btn").onclick = async (e) => {
        const ctx = getSTContext(8); e.target.textContent = "⏳ 感应中...";
        try {
            const raw = await requestStandaloneAI(`你是${ctx.charName}。人设：${ctx.charDesc.slice(0, 1000)}`, `感应你此刻的状态。严格只输出JSON：{"bpm":"98 BPM","temp":"36.8°C","miss":"99%","action":"此刻正在做什么","os":"脑海里关于${ctx.userName}的一句心声"}`);
            const m = raw.match(/\{[\s\S]*\}/); if (m) { const sp = getSpaceData(); sp.moodSync = JSON.parse(m[0]); saveSpaceData(sp); renderCoupleSpaceAll(); }
        } catch (err) { alert(err.message); } finally { e.target.textContent = "↻ 实时感应TA此刻状态"; }
    };
    topDoc.getElementById("smt-coupon-add").onclick = () => {
        const t = prompt("新特权券名称："); if (!t) return;
        const d = prompt("效果描述：", "出示此券，对方必须无条件照做");
        const sp = getSpaceData(); sp.coupons.unshift({ title: t.trim(), desc: (d || "").trim() }); saveSpaceData(sp); renderCoupleSpaceAll();
    };
    topDoc.getElementById("smt-sp-note-send").onclick = async () => {
        const inp = topDoc.getElementById("smt-sp-note-input"), v = inp.value.trim(); if (!v) return; inp.value = "";
        const ctx = getSTContext(6), sp = getSpaceData(); sp.notes.unshift({ author: ctx.userName, text: v, time: nowTimeStr() }); saveSpaceData(sp); renderCoupleSpaceAll();
        try { const r = await requestStandaloneAI(`你是${ctx.charName}。人设：${ctx.charDesc.slice(0, 800)}`, `${ctx.userName}留言：“${v}”，请简短回复(45字内)：`); const d = getSpaceData(); d.notes.unshift({ author: ctx.charName, text: r, time: nowTimeStr() }); saveSpaceData(d); renderCoupleSpaceAll(); } catch (err) { alert(err.message); }
    };
    topDoc.getElementById("smt-sp-ai-note").onclick = async () => {
        const ctx = getSTContext(6);
        try { const r = await requestStandaloneAI(`你是${ctx.charName}。人设：${ctx.charDesc.slice(0, 800)}`, `主动在情侣空间留言板给${ctx.userName}留一句悄悄话(45字内)：`); const d = getSpaceData(); d.notes.unshift({ author: ctx.charName, text: r, time: nowTimeStr() }); saveSpaceData(d); renderCoupleSpaceAll(); } catch (err) { alert(err.message); }
    };
    topDoc.getElementById("smt-sp-add-todo").onclick = () => { const v = prompt("新增心愿："); if (v) { const d = getSpaceData(); d.todos.push({ text: v.trim(), done: false }); saveSpaceData(d); renderCoupleSpaceAll(); } };

    /* ══════════════════════════════════════════════════════════════════════
       【PART 6：🎧 完整版网易云一起听 & 📱 查手机 & 📖 交换日记】
       ══════════════════════════════════════════════════════════════════════ */
    function getMusicData() {
        try {
            return Object.assign({
                liked: [
                    { id: "2076931657", name: "Love Lee", artist: "AKMU", cover: "https://i.postimg.cc/rydS6NvG/IMG-3866.jpg", url: "https://music.163.com/song/media/outer/url?id=2076931657.mp3" },
                    { id: "2007335243", name: "Ditto", artist: "NewJeans", cover: "https://i.postimg.cc/vmsDSqmk/IMG-3926.jpg", url: "https://music.163.com/song/media/outer/url?id=2007335243.mp3" },
                    { id: "526464293", name: "Instagram", artist: "DEAN", cover: "https://i.postimg.cc/QC3CQ218/IMG-4147.jpg", url: "https://music.163.com/song/media/outer/url?id=526464293.mp3" },
                    { id: "467952048", name: "Through the Night", artist: "IU", cover: "https://i.postimg.cc/MZg2F7Fm/IMG-4150.jpg", url: "https://music.163.com/song/media/outer/url?id=467952048.mp3" }
                ],
                currentTrack: { id: "2076931657", name: "Love Lee", artist: "AKMU", cover: "https://i.postimg.cc/rydS6NvG/IMG-3866.jpg", url: "https://music.163.com/song/media/outer/url?id=2076931657.mp3" }
            }, JSON.parse(localStorage.getItem(K_MUSIC) || "{}"));
        } catch (e) { return { liked: [], currentTrack: null }; }
    }
    function saveMusicData(m) { localStorage.setItem(K_MUSIC, JSON.stringify(m)); }

    let useNcmIframe = false;
    function playTrackObj(track) {
        if (!track) return;
        const md = getMusicData(); md.currentTrack = track; saveMusicData(md);
        topDoc.getElementById("smt-mus-title").textContent = `${track.name} - ${track.artist}`;
        if (track.cover) topDoc.getElementById("smt-mus-cover").src = track.cover;
        const audio = topDoc.getElementById("smt-audio-player"), iframeWrap = topDoc.getElementById("smt-ncm-iframe-wrap");
        const sid = track.id || track.url?.match(/id=(\d+)/)?.[1] || "";
        if (useNcmIframe && sid) {
            audio.pause(); audio.style.display = "none"; iframeWrap.style.display = "block";
            iframeWrap.innerHTML = `<iframe frameborder="no" border="0" width="100%" height="66" src="https://music.163.com/outchain/player?type=2&id=${sid}&auto=1&height=66"></iframe>`;
        } else {
            iframeWrap.style.display = "none";
            iframeWrap.innerHTML = "";
            audio.style.display = "block";
            if (audio.src !== track.url) audio.src = track.url;
            audio.play().catch(() => {});
        }
        renderMusicApp();
    }

    topDoc.getElementById("smt-mus-toggle-iframe").onclick = (e) => {
        useNcmIframe = !useNcmIframe;
        e.target.textContent = useNcmIframe ? "切换标准播放器" : "切换官方播放器";
        const cur = getMusicData().currentTrack || getMusicData().liked[0];
        if (cur) playTrackObj(cur);
    };

    function renderMusicApp() {
        const ctx = getSTContext(1), md = getMusicData(), cur = md.currentTrack || md.liked[0];
        topDoc.getElementById("smt-mus-uava").src = ctx.userAvatar;
        topDoc.getElementById("smt-mus-cava").src = ctx.charAvatar;
        topDoc.getElementById("smt-tab-liked-btn").textContent = `♥ 我喜欢 (${md.liked.length})`;
        if (cur) {
            topDoc.getElementById("smt-mus-title").textContent = `${cur.name} - ${cur.artist}`;
            if (cur.cover) topDoc.getElementById("smt-mus-cover").src = cur.cover;
        }
        const pane = topDoc.getElementById("smt-mus-pane-liked");
        pane.innerHTML = md.liked.map((t, idx) => `
            <div style="display:flex;align-items:center;justify-content:space-between;background:${cur && cur.name === t.name ? "#484852" : "#F8F8F8"} !important;color:${cur && cur.name === t.name ? "#FFFFFF" : "#3A3A40"} !important;border:1px solid #ECECF2 !important;border-radius:11px;padding:8px 11px;margin-bottom:6px;">
                <div data-playliked="${idx}" style="display:flex;align-items:center;gap:9px;flex:1;cursor:pointer;min-width:0;">
                    <img src="${t.cover || "https://i.postimg.cc/rydS6NvG/IMG-3866.jpg"}" style="width:34px;height:34px;border-radius:7px;object-fit:cover;flex-shrink:0;"/>
                    <div style="min-width:0;"><div style="font-size:11px;font-weight:700;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${t.name}</div><div style="font-size:9px;opacity:0.75;">${t.artist}</div></div>
                </div>
                <span data-delliked="${idx}" style="font-size:10px;padding:4px 8px;cursor:pointer;">✕</span>
            </div>`).join("");
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

    topDoc.getElementById("smt-mus-like-cur").onclick = () => {
        const md = getMusicData(); if (!md.currentTrack) return;
        md.liked.unshift(md.currentTrack); saveMusicData(md); renderMusicApp(); alert("♥ 已加入我喜欢！");
    };

    // 网易云 6 源搜歌与整单导入
    async function multiSourceSearch(keyword) {
        const q = encodeURIComponent(keyword);
        const urls = [
            `https://api.injahow.cn/meting/?server=netease&type=search&id=${q}`,
            `https://api.i-meto.com/meting/api?server=netease&type=search&id=${q}`,
            `https://netease-cloud-music-api-five-roan-88.vercel.app/cloudsearch?keywords=${q}&limit=20`,
            `https://music-api.heheda.top/cloudsearch?keywords=${q}&limit=20`
        ];
        for (const u of urls) {
            try {
                const r = await fetch(u);
                if (!r.ok) continue;
                const d = await r.json();
                if (Array.isArray(d) && d.length) {
                    return d.slice(0, 20).map((x) => ({
                        id: String(x.id || x.url?.match(/id=(\d+)/)?.[1] || ""),
                        name: x.name || x.title, artist: x.artist || x.author,
                        cover: x.pic || "https://i.postimg.cc/rydS6NvG/IMG-3866.jpg",
                        url: x.url || `https://music.163.com/song/media/outer/url?id=${x.id}.mp3`
                    }));
                }
                const songs = d?.result?.songs || [];
                if (songs.length) {
                    return songs.map((s) => ({
                        id: String(s.id), name: s.name, artist: (s.ar || []).map((a) => a.name).join("/"),
                        cover: s.al?.picUrl || "https://i.postimg.cc/rydS6NvG/IMG-3866.jpg",
                        url: `https://music.163.com/song/media/outer/url?id=${s.id}.mp3`
                    }));
                }
            } catch (e) {}
        }
        throw new Error("搜索超时，请直接粘贴单曲链接导入");
    }

    topDoc.getElementById("smt-mus-search-btn").onclick = async () => {
        const q = topDoc.getElementById("smt-mus-search-input").value.trim(); if (!q) return;
        const box = topDoc.getElementById("smt-mus-search-results");
        box.innerHTML = `<div style="padding:20px;text-align:center;font-size:10px;">⏳ 正在检索网易云曲库...</div>`;
        try {
            const arr = await multiSourceSearch(q);
            box.innerHTML = arr.map((t, i) => `
                <div style="display:flex;justify-content:space-between;align-items:center;background:#F8F8F8 !important;border:1px solid #ECECF2 !important;border-radius:11px;padding:8px 10px;margin-bottom:6px;">
                    <div data-sp="${i}" style="display:flex;align-items:center;gap:9px;flex:1;cursor:pointer;min-width:0;">
                        <img src="${t.cover}" style="width:34px;height:34px;border-radius:7px;object-fit:cover;"/>
                        <div style="min-width:0;"><div style="font-size:10.8px;font-weight:700;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${t.name}</div><div style="font-size:8.8px;color:#7A7A85 !important;">${t.artist}</div></div>
                    </div>
                    <div style="display:flex;gap:4px;"><span class="smt-pill-btn" data-sl="${i}">♡喜欢</span><span class="smt-pill-btn dark" data-sp="${i}">▶播放</span></div>
                </div>`).join("");
            box.querySelectorAll("[data-sp]").forEach((el) => el.onclick = () => playTrackObj(arr[Number(el.getAttribute("data-sp"))]));
            box.querySelectorAll("[data-sl]").forEach((el) => el.onclick = (e) => { const m = getMusicData(); m.liked.unshift(arr[Number(el.getAttribute("data-sl"))]); saveMusicData(m); renderMusicApp(); e.target.textContent = "♥已加"; });
        } catch (err) { box.innerHTML = `<div style="padding:16px;font-size:10px;">${err.message}</div>`; }
    };

    topDoc.getElementById("smt-ncm-pl-sync-btn").onclick = async () => {
        const raw = topDoc.getElementById("smt-ncm-pl-link").value.trim();
        const idMatch = raw.match(/playlist\?id=(\d+)/) || raw.match(/id=(\d+)/) || raw.match(/(\d{6,15})/);
        const plId = idMatch ? idMatch[1] : "";
        const st = topDoc.getElementById("smt-ncm-pl-status");
        if (!plId) { st.textContent = "✕ 请粘贴正确的歌单链接或ID"; return; }
        st.textContent = "⏳ 正在拉取歌单...";
        const urls = [
            `https://api.injahow.cn/meting/?server=netease&type=playlist&id=${plId}`,
            `https://api.i-meto.com/meting/api?server=netease&type=playlist&id=${plId}`,
            `https://netease-cloud-music-api-five-roan-88.vercel.app/playlist/detail?id=${plId}`
        ];
        for (const u of urls) {
            try {
                const r = await fetch(u); if (!r.ok) continue;
                const d = await r.json();
                const list = Array.isArray(d) ? d : (d?.playlist?.tracks || []);
                if (list.length) {
                    const tracks = list.slice(0, 60).map((x) => {
                        const sid = String(x.id || x.url?.match(/id=(\d+)/)?.[1] || "");
                        return { id: sid, name: x.name || x.title, artist: x.artist || (x.ar || []).map((a) => a.name).join("/"), cover: x.pic || x.al?.picUrl || "https://i.postimg.cc/rydS6NvG/IMG-3866.jpg", url: x.url || `https://music.163.com/song/media/outer/url?id=${sid}.mp3` };
                    });
                    const md = getMusicData(); md.liked = [...tracks, ...md.liked].slice(0, 120); saveMusicData(md); renderMusicApp();
                    st.textContent = `✓ 成功导入 ${tracks.length} 首歌！`;
                    topDoc.getElementById("smt-tab-liked-btn").click(); return;
                }
            } catch (e) {}
        }
        st.textContent = "✕ 歌单读取受限（请确认歌单已公开，或用下方方式二导入）";
    };

    topDoc.getElementById("smt-mus-import-run").onclick = async () => {
        const raw = topDoc.getElementById("smt-mus-import-text").value.trim(); if (!raw) return;
        const lines = raw.split(/\n+/).map((l) => l.trim()).filter(Boolean), md = getMusicData();
        for (const line of lines) {
            const ncmId = line.match(/id=(\d+)/) || line.match(/^(\d{5,15})$/);
            if (ncmId) {
                const sid = ncmId[1];
                md.liked.unshift({ id: sid, name: line.split("|")[0].replace(/https?.*/, "").trim() || `单曲 #${sid}`, artist: "NetEase", cover: "https://i.postimg.cc/rydS6NvG/IMG-3866.jpg", url: `https://music.163.com/song/media/outer/url?id=${sid}.mp3` });
            } else {
                try { const hits = await multiSourceSearch(line); if (hits[0]) md.liked.unshift(hits[0]); } catch (e) {}
            }
        }
        saveMusicData(md); topDoc.getElementById("smt-mus-import-text").value = ""; renderMusicApp(); topDoc.getElementById("smt-tab-liked-btn").click();
    };
    topDoc.getElementById("smt-mus-clear-liked").onclick = () => { const m = getMusicData(); m.liked = []; saveMusicData(m); renderMusicApp(); };
    topDoc.getElementById("smt-ncm-ai-listen").onclick = async () => {
        const cur = getMusicData().currentTrack || getMusicData().liked[0]; if (!cur) return;
        const ctx = getSTContext(6), cBox = topDoc.getElementById("smt-mus-ai-comment");
        cBox.style.display = "block"; cBox.textContent = "⏳ 正在听歌...";
        try { cBox.textContent = `${ctx.charName}：` + await requestStandaloneAI(`你是${ctx.charName}，正和${ctx.userName}听《${cur.name}》。人设：${ctx.charDesc.slice(0, 800)}`, "说一句关于这首歌或此刻氛围的话(50字内)："); } catch (e) { cBox.textContent = e.message; }
    };

    // 查手机与交换日记
    let currentPhoneTab = "ins";
    function getPhoneCache() { try { return JSON.parse(localStorage.getItem(K_PHONE) || "{}"); } catch (e) { return {}; } }
    function savePhoneCache(p) { localStorage.setItem(K_PHONE, JSON.stringify(p)); }
    function renderFullPhoneApp() {
        const ctx = getSTContext(1), cache = getPhoneCache(), stage = topDoc.getElementById("smt-ph-stage");
        topDoc.getElementById("smt-ph-ava").src = ctx.charAvatar; topDoc.getElementById("smt-ph-owner").textContent = `${ctx.charName} 的 iPhone`;
        stage.innerHTML = cache[currentPhoneTab] || `<div style="background:#F8F8F8 !important;border:1px dashed #DCDCE4 !important;border-radius:16px;padding:40px 16px;text-align:center;"><span class="smt-pill-btn dark" id="smt-ph-gen-empty">✦ 立即生成 ${currentPhoneTab.toUpperCase()} 界面</span></div>`;
        topDoc.getElementById("smt-ph-gen-empty")?.addEventListener("click", () => generateFullPhoneContent(currentPhoneTab));
    }
    async function generateFullPhoneContent(type) {
        const stage = topDoc.getElementById("smt-ph-stage"), ctx = getSTContext(8);
        stage.innerHTML = `<div style="padding:40px;text-align:center;font-size:10.5px;">⏳ 正在调用独立 API 生成...</div>`;
        try {
            const res = await requestStandaloneAI(`你是${ctx.charName}。人设：${ctx.charDesc.slice(0, 1200)}`, `请为【${type}】生成3条与${ctx.userName}有关的私密手机内容（韩系排版，不要代码块）：`);
            const html = `<div style="background:#FFFFFF !important;border:1px solid #ECECF2 !important;border-radius:14px;padding:14px;font-size:11.5px;line-height:1.75;white-space:pre-wrap;">${res.replace(/</g, "&lt;")}</div>`;
            const cache = getPhoneCache(); cache[type] = html; savePhoneCache(cache); stage.innerHTML = html;
        } catch (err) { stage.innerHTML = `<div style="padding:20px;">${err.message}</div>`; }
    }
    topDoc.querySelectorAll("[data-phtab]").forEach((b) => b.onclick = () => { topDoc.querySelectorAll("[data-phtab]").forEach((x) => x.classList.remove("dark")); b.classList.add("dark"); currentPhoneTab = b.getAttribute("data-phtab"); renderFullPhoneApp(); });
    topDoc.getElementById("smt-ph-refresh-btn").onclick = () => generateFullPhoneContent(currentPhoneTab);

    function getDiaryList() { try { return JSON.parse(localStorage.getItem(K_DIARY) || '[]'); } catch (e) { return []; } }
    function saveDiaryList(l) { localStorage.setItem(K_DIARY, JSON.stringify(l)); }
    function renderDiaryApp() {
        topDoc.getElementById("smt-diary-list").innerHTML = getDiaryList().map((d) => `<div style="background:#F8F8F8 !important;border:1px solid #ECECF2 !important;border-radius:14px;padding:12px;margin-bottom:8px;"><div style="display:flex;justify-content:space-between;font-size:9px;color:#7A7A85 !important;margin-bottom:5px;"><b>[${d.author}] ${d.title}</b><span>${d.time}</span></div><div style="font-size:11px;line-height:1.68;white-space:pre-wrap;">${d.content.replace(/</g, "&lt;")}</div></div>`).join("");
    }
    topDoc.getElementById("smt-diary-user-save").onclick = () => { const i = topDoc.getElementById("smt-diary-input"); if (!i.value.trim()) return; const l = getDiaryList(), c = getSTContext(1); l.unshift({ author: c.userName, title: "今日手记", content: i.value.trim(), time: nowTimeStr() }); saveDiaryList(l); i.value = ""; renderDiaryApp(); };
    topDoc.getElementById("smt-diary-ai-write").onclick = async (e) => {
        const c = getSTContext(6); e.target.textContent = "书写中...";
        try { const r = await requestStandaloneAI(`你是${c.charName}。人设：${c.charDesc.slice(0, 1200)}`, `请写一篇和${c.userName}的交换日记(150字左右)：`); const l = getDiaryList(); l.unshift({ author: c.charName, title: `${c.charName}的日记`, content: r, time: nowTimeStr() }); saveDiaryList(l); renderDiaryApp(); } catch (err) { alert(err.message); } finally { e.target.textContent = "✦ 让TA写今日日记"; }
    };

    /* ══════════════════════════════════════════════════════════════════════
       【PART 7：⚙️ 页面路由跳转、HTML 主页工坊、历史馆与独立 API 设置】
       ══════════════════════════════════════════════════════════════════════ */
    let currentPage = "talk", lastMainPage = "space";
    const SUB_APPS = ["sp_pet", "sp_4cut", "sp_qa", "sp_mood", "sp_coupon", "sp_guest", "phone", "music", "diary"];

    function navigateToPage(pageId, customTitle, customSub) {
        const isSub = SUB_APPS.includes(pageId);
        if (!isSub) {
            lastMainPage = pageId;
            topDoc.querySelectorAll(".smt-tab-item").forEach((t) => t.classList.toggle("active", t.getAttribute("data-page") === pageId));
        }
        currentPage = pageId;
        ["talk", "space", "home", "archive", "api", ...SUB_APPS].forEach((k) => {
            const el = topDoc.getElementById(`smt-page-${k}`); if (el) el.classList.toggle("active", k === pageId);
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
            const targetTab = topDoc.querySelector(`.smt-tab-item[data-page="${lastMainPage}"]`);
            navigateToPage(lastMainPage, targetTab?.getAttribute("data-title"), targetTab?.getAttribute("data-sub"));
        } else { modal.classList.remove("smt-open"); }
    };
    topDoc.getElementById("smt-top-badge").onclick = () => navigateToPage("api", "API CONFIG · 환경설정", "Standalone Connection");

    topDoc.querySelectorAll("[data-openapp]").forEach((card) => {
        card.onclick = () => navigateToPage(card.getAttribute("data-openapp"), "SEOUL EXCLUSIVE APP", "Full-Screen Interactive View");
    });
    topDoc.querySelectorAll(".smt-tab-item").forEach((tab) => tab.onclick = () => navigateToPage(tab.getAttribute("data-page"), tab.getAttribute("data-title"), tab.getAttribute("data-sub")));

    const HTML_TPLS = {
        coupleId: `<div style="background:#F8F8F8 !important;border:1px solid #ECECF2 !important;border-radius:16px !important;padding:15px !important;"><div style="display:flex;justify-content:space-around;align-items:center;background:#FFFFFF !important;border-radius:13px;padding:14px;"><div style="text-align:center;"><img src="{{avatar}}" style="width:48px;height:48px;border-radius:50%;object-fit:cover;"/><div style="font-size:10px;font-weight:700;margin-top:4px;">{{user}}</div></div><div style="font-size:12px;font-weight:700;">D+{{days}}</div><div style="text-align:center;"><img src="{{charAvatar}}" style="width:48px;height:48px;border-radius:50%;object-fit:cover;"/><div style="font-size:10px;font-weight:700;margin-top:4px;">{{char}}</div></div></div></div>`,
        polaroid: `<div style="background:#F8F8F8 !important;border:1px solid #ECECF2 !important;border-radius:16px !important;padding:12px !important;display:grid;grid-template-columns:1fr 1fr;gap:8px;"><div style="background:#FFFFFF !important;padding:7px;border-radius:10px;text-align:center;"><img src="{{avatar}}" style="width:100%;height:86px;object-fit:cover;border-radius:6px;"/><div style="font-size:10px;font-weight:700;margin-top:4px;">{{user}}</div></div><div style="background:#FFFFFF !important;padding:7px;border-radius:10px;text-align:center;"><img src="{{charAvatar}}" style="width:100%;height:86px;object-fit:cover;border-radius:6px;"/><div style="font-size:10px;font-weight:700;margin-top:4px;">{{char}}</div></div></div>`,
        receipt: `<div style="background:#F8F8F8 !important;border:1px dashed #D5D5DE !important;border-radius:14px !important;padding:14px !important;font-family:monospace;text-align:center;"><b>SEOUL RECEIPT · {{user}} &amp; {{char}} (D+{{days}})</b></div>`
    };
    function getUserHtml() { return localStorage.getItem(K_HTML) || HTML_TPLS.coupleId; }
    function saveUserHtml(h) { localStorage.setItem(K_HTML, h); }
    function getArchive() { try { return JSON.parse(localStorage.getItem(K_ARCH) || "[]"); } catch (e) { return []; } }
    function saveArchive(l) { localStorage.setItem(K_ARCH, JSON.stringify(l)); }
    function pushArchive(title, content, isHtml = false) { const l = getArchive(); l.unshift({ id: Date.now(), title, content, isHtml, time: nowTimeStr() }); saveArchive(l); }

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
    topDoc.getElementById("smt-api-url").value = cfg.url;
    topDoc.getElementById("smt-api-key").value = cfg.key;
    topDoc.getElementById("smt-api-model").value = cfg.model;
    topDoc.getElementById("smt-api-ctx").value = cfg.ctxCount;

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

    btn.onclick = () => { renderWeChat(); renderCoupleSpaceAll(); renderHomeHtml(); modal.classList.add("smt-open"); };
    renderWeChat();
})();

