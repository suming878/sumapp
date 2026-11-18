// ==========================================================================
// 💧 【Sumoul App 真·光学水滴折射泪痕开屏补丁 (修复文字消失Bug + 3D凸透镜水珠与流光水痕折线)】
// 用法：直接替换 index.js 最末尾刚才那段开屏补丁即可！
// ==========================================================================
(function () {
    const topDoc = (window.parent || window).document;

    function mountRealWaterTearSplash() {
        const modal = topDoc.getElementById("seoul-mini-theater-modal");
        const splash = topDoc.getElementById("smt-boot-splash");
        if (!modal || !splash) {
            setTimeout(mountRealWaterTearSplash, 180);
            return;
        }

        // 清理之前冲突的 CSS
        topDoc.getElementById("sumoul-liquid-tear-css")?.remove();
        topDoc.getElementById("sumoul-tear-splash-css")?.remove();

        let rafId = null;

        function startWaterTearSplash() {
            if (rafId) cancelAnimationFrame(rafId);

            // 采用柔和冷灰蓝白渐变底，衬托出纯白透明水滴的晶莹高光与玻璃折射感
            splash.style.cssText = "position:absolute!important;inset:0!important;background:linear-gradient(180deg,#F2F4F8 0%,#E8ECF2 52%,#DFE4EC 100%)!important;z-index:10!important;display:flex!important;flex-direction:column!important;align-items:center!important;justify-content:center!important;transition:opacity 0.65s ease!important;padding:24px!important;text-align:center!important;cursor:pointer!important;";

            splash.innerHTML = `
                <div style="border:1.2px solid rgba(255,255,255,0.95)!important;border-radius:24px!important;padding:30px 24px 26px 24px!important;background:linear-gradient(160deg,rgba(255,255,255,0.65) 0%,rgba(240,243,249,0.45) 100%)!important;backdrop-filter:blur(18px)!important;-webkit-backdrop-filter:blur(18px)!important;max-width:296px!important;width:100%!important;box-sizing:border-box!important;position:relative!important;box-shadow:0 20px 45px rgba(35,42,58,0.08), inset 0 1px 3px #FFFFFF!important;">
                    <!-- 顶部刻度栏 -->
                    <div style="display:flex;justify-content:space-between;align-items:center;font-size:7.5px;font-weight:700;color:#858B99!important;letter-spacing:2px;font-family:monospace;border-bottom:1px solid rgba(255,255,255,0.7)!important;padding-bottom:8px;margin-bottom:14px;">
                        <span>SUMOUL APP</span>
                        <span id="wt-pct-num">TEAR TRACE · 0%</span>
                    </div>

                    <!-- 💧 核心舞台：SVG 3D 光学水滴折射滤镜 (feSpecularLighting) + 实时晶莹泪痕折线 -->
                    <div style="width:100%;height:132px;display:flex;align-items:center;justify-content:center;margin:2px 0 12px 0;position:relative;">
                        <svg viewBox="0 0 240 128" width="236" height="126" fill="none" xmlns="http://www.w3.org/2000/svg" style="overflow:visible!important;">
                            <defs>
                                <!-- 🔥 真实水滴光学滤镜：通过高光照明 (feSpecularLighting) + 底部柔和投影，生成玻璃上的真水滴质感！ -->
                                <filter id="realWaterFilter" x="-30%" y="-30%" width="160%" height="160%">
                                    <!-- 1. 水体厚度高光计算 -->
                                    <feGaussianBlur in="SourceAlpha" stdDeviation="2.2" result="blurAlpha" />
                                    <!-- 2. 水滴右下方透光折射暗影 -->
                                    <feOffset in="blurAlpha" dx="1.5" dy="3" result="offsetShadow" />
                                    <feComponentTransfer in="offsetShadow" result="softShadow">
                                        <feFuncA type="linear" slope="0.28" />
                                    </feComponentTransfer>
                                    <!-- 3. 水滴表面 3D 镜面高光反射 (让折线和水珠像真水一样反光！) -->
                                    <feSpecularLighting in="blurAlpha" surfaceScale="5" specularConstant="1.25" specularExponent="28" lighting-color="#FFFFFF" result="specOut">
                                        <fePointLight x="40" y="-30" z="95" />
                                    </feSpecularLighting>
                                    <feComposite in="specOut" in2="SourceAlpha" operator="in" result="specMask" />
                                    <!-- 4. 水滴内部半透明清透水色合成 -->
                                    <feMerge>
                                        <feMergeNode in="softShadow" />
                                        <feMergeNode in="SourceGraphic" />
                                        <feMergeNode in="specMask" />
                                    </feMerge>
                                </filter>

                                <!-- 水滴本体清透玻璃渐变（上浅灰透光、下纯白聚光折射） -->
                                <linearGradient id="waterBodyGrad" x1="0%" y1="0%" x2="30%" y2="100%">
                                    <stop offset="0%" stop-color="rgba(195, 204, 218, 0.55)" />
                                    <stop offset="50%" stop-color="rgba(232, 238, 246, 0.72)" />
                                    <stop offset="100%" stop-color="rgba(255, 255, 255, 0.96)" />
                                </linearGradient>
                            </defs>

                            <!-- 底层极淡的水迹预瞄细线 -->
                            <polyline points="26,18 70,52 114,24 156,68 188,46 210,86" fill="none" stroke="rgba(165,175,192,0.28)" stroke-width="1" stroke-dasharray="2 4" stroke-linecap="round" stroke-linejoin="round" />

                            <!-- 🌊 真·光学水滴与泪痕折线组（挂载 realWaterFilter 3D 水体高光滤镜） -->
                            <g filter="url(#realWaterFilter)">
                                <!-- 缓慢划过的透明水痕主折线 -->
                                <path id="wt-main-line" d="" fill="none" stroke="url(#waterBodyGrad)" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round" />

                                <!-- 5 个转折节点上凝结的饱满透明水珠 -->
                                <circle id="wt-node-0" cx="26" cy="18" r="0" fill="url(#waterBodyGrad)" />
                                <circle id="wt-node-1" cx="70" cy="52" r="0" fill="url(#waterBodyGrad)" />
                                <circle id="wt-node-2" cx="114" cy="24" r="0" fill="url(#waterBodyGrad)" />
                                <circle id="wt-node-3" cx="156" cy="68" r="0" fill="url(#waterBodyGrad)" />
                                <circle id="wt-node-4" cx="188" cy="46" r="0" fill="url(#waterBodyGrad)" />

                                <!-- 正在折线前端缓慢滑落的「领头真实水滴（上尖下圆泪滴形）」 -->
                                <g id="wt-lead-group" transform="translate(26, 18)">
                                    <path d="M0 -7.5 C0 -7.5 6.2 0.5 6.2 4.5 C6.2 8.2 3.4 11 0 11 C-3.4 11 -6.2 8.2 -6.2 4.5 C-6.2 0.5 0 -7.5 0 -7.5 Z" fill="url(#waterBodyGrad)" />
                                </g>
                            </g>

                            <!-- ✨ 叠加在水痕与水珠最顶层的纯白晶莹反光亮斑（不经过模糊，保证 100% 清透锐利！） -->
                            <path id="wt-shine-line" d="" fill="none" stroke="#FFFFFF" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" opacity="0.95" />
                            <g id="wt-shine-dots"></g>
                            <!-- 终点水波涟漪 -->
                            <ellipse id="wt-ripple" cx="210" cy="99" rx="0" ry="0" fill="none" stroke="#FFFFFF" stroke-width="1.2" opacity="0" />
                        </svg>
                    </div>

                    <!-- 文字区：由 JS 直接控制 style.opacity，100% 稳定慢慢浮现且绝不消失！ -->
                    <div id="wt-txt-1" style="opacity:0;transform:translateY(5px);transition:opacity 1.5s ease, transform 1.5s ease;font-size:14.5px;font-weight:800;letter-spacing:3px;color:#2E323B!important;margin-bottom:8px;">
                        눈물의 궤적 · 泪之轨迹
                    </div>

                    <div style="min-height:52px;margin-bottom:18px;">
                        <div id="wt-txt-2" style="opacity:0;transform:translateY(5px);transition:opacity 1.6s ease, transform 1.6s ease;font-size:10px;font-weight:700;color:#5A606E!important;line-height:1.85;letter-spacing:0.4px;">
                            “ 유리창을 타고 천천히 흐르는 투명한 눈물처럼 ”
                        </div>
                        <div id="wt-txt-3" style="opacity:0;transform:translateY(5px);transition:opacity 1.6s ease, transform 1.6s ease;font-size:8.8px;font-weight:600;color:#828896!important;line-height:1.8;letter-spacing:0.5px;margin-top:4px;">
                            如同顺着玻璃窗缓慢滑落的透明泪水，将记忆静静连结。
                        </div>
                    </div>

                    <div id="wt-txt-4" style="opacity:0;transform:translateY(4px);transition:opacity 1.4s ease, transform 1.4s ease;">
                        <div style="display:inline-flex;align-items:center;justify-content:center;padding:7px 24px;background:rgba(255,255,255,0.9)!important;border:1px solid #FFFFFF!important;border-radius:999px;font-size:8.2px;color:#3A3E48!important;letter-spacing:2px;font-weight:800;box-shadow:0 6px 16px rgba(35,42,58,0.08)!important;">
                            💧 TOUCH TO WAKE · 触碰唤醒
                        </div>
                    </div>
                </div>
                <div id="wt-txt-5" style="opacity:0;transition:opacity 1.6s ease;font-size:7.5px;font-weight:700;color:#9298A6!important;letter-spacing:2px;margin-top:16px;">
                    SUMOUL APP ·PURE WATER TEAR ARCHIVE
                </div>
            `;

            splash.onclick = () => {
                if (rafId) cancelAnimationFrame(rafId);
                splash.classList.add("fade-out");
            };

            // 折线 6 个顶点坐标
            const pts = [
                { x: 26, y: 18 },
                { x: 70, y: 52 },
                { x: 114, y: 24 },
                { x: 156, y: 68 },
                { x: 188, y: 46 },
                { x: 210, y: 86 }
            ];

            const segs = [];
            let totalLen = 0;
            for (let i = 0; i < pts.length - 1; i++) {
                const len = Math.hypot(pts[i + 1].x - pts[i].x, pts[i + 1].y - pts[i].y);
                segs.push({ p1: pts[i], p2: pts[i + 1], len, start: totalLen });
                totalLen += len;
            }

            const mainLine = topDoc.getElementById("wt-main-line");
            const shineLine = topDoc.getElementById("wt-shine-line");
            const leadGroup = topDoc.getElementById("wt-lead-group");
            const shineDots = topDoc.getElementById("wt-shine-dots");
            const rippleEl = topDoc.getElementById("wt-ripple");
            const pctEl = topDoc.getElementById("wt-pct-num");

            const txt1 = topDoc.getElementById("wt-txt-1");
            const txt2 = topDoc.getElementById("wt-txt-2");
            const txt3 = topDoc.getElementById("wt-txt-3");
            const txt4 = topDoc.getElementById("wt-txt-4");
            const txt5 = topDoc.getElementById("wt-txt-5");

            const DURATION = 5400; // 5.4秒缓慢划过
            const t0 = performance.now();

            function step(now) {
                if (!topDoc.getElementById("wt-main-line")) return;
                const elapsed = now - t0;
                const rawP = Math.min(1, elapsed / DURATION);

                // 模拟真实泪珠在玻璃上「滑行 - 节点微停顿凝结 - 再滑行」的节奏
                const n = segs.length;
                const scaled = rawP * n;
                const sIdx = Math.min(n - 1, Math.floor(scaled));
                const localT = scaled - sIdx;
                const easeLocal = localT < 0.5 ? 2 * localT * localT : 1 - Math.pow(-2 * localT + 2, 2) / 2;

                let curDist = 0;
                for (let i = 0; i < sIdx; i++) curDist += segs[i].len;
                curDist += segs[sIdx].len * easeLocal;

                if (pctEl) {
                    const num = Math.round(rawP * 100);
                    pctEl.textContent = num >= 100 ? "TEAR TRACE · 100%" : `TEAR TRACE · ${num}%`;
                }

                // 🔥 JS 直接驱动文字随泪水进度慢慢显现（显现后永久保持 opacity:1，绝不消失！）
                if (rawP > 0.12 && txt1 && txt1.style.opacity !== "1") {
                    txt1.style.opacity = "1"; txt1.style.transform = "translateY(0px)";
                }
                if (rawP > 0.36 && txt2 && txt2.style.opacity !== "1") {
                    txt2.style.opacity = "1"; txt2.style.transform = "translateY(0px)";
                }
                if (rawP > 0.62 && txt3 && txt3.style.opacity !== "1") {
                    txt3.style.opacity = "1"; txt3.style.transform = "translateY(0px)";
                    if (txt5) txt5.style.opacity = "1";
                }
                if (rawP > 0.88 && txt4 && txt4.style.opacity !== "1") {
                    txt4.style.opacity = "1"; txt4.style.transform = "translateY(0px)";
                }

                // 计算当前已划过的折线路径 d
                let dStr = `M ${pts[0].x} ${pts[0].y}`;
                let shineStr = `M ${pts[0].x - 0.5} ${pts[0].y - 0.8}`;
                let headX = pts[0].x, headY = pts[0].y;

                for (let i = 0; i < segs.length; i++) {
                    const sg = segs[i];
                    if (curDist >= sg.start + sg.len) {
                        dStr += ` L ${sg.p2.x} ${sg.p2.y}`;
                        shineStr += ` L ${sg.p2.x - 0.5} ${sg.p2.y - 0.8}`;
                        headX = sg.p2.x; headY = sg.p2.y;
                    } else if (curDist > sg.start) {
                        const r = (curDist - sg.start) / sg.len;
                        headX = sg.p1.x + (sg.p2.x - sg.p1.x) * r;
                        headY = sg.p1.y + (sg.p2.y - sg.p1.y) * r;
                        dStr += ` L ${headX.toFixed(1)} ${headY.toFixed(1)}`;
                        shineStr += ` L ${(headX - 0.5).toFixed(1)} ${(headY - 0.8).toFixed(1)}`;
                        break;
                    } else {
                        break;
                    }
                }

                mainLine.setAttribute("d", dStr);
                shineLine.setAttribute("d", shineStr);

                // 更新领头水滴的位置与轻微水波颤动
                const wobbleY = Math.sin(now * 0.008) * 1.2;
                leadGroup.setAttribute("transform", `translate(${headX.toFixed(1)}, ${(headY + (rawP >= 1 ? wobbleY : 0)).toFixed(1)})`);

                // 更新沿途 5 个转折节点上凝结的透明水珠 + 晶莹白高光点
                let acc = 0;
                let dotsHtml = `
                    <!-- 领头大泪滴内部的纯白月牙高光与纯白反光点 -->
                    <circle cx="${(headX - 2.0).toFixed(1)}" cy="${(headY + 2.2 + (rawP >= 1 ? wobbleY : 0)).toFixed(1)}" r="1.5" fill="#FFFFFF" />
                    <path d="M ${(headX - 3.2).toFixed(1)} ${(headY + 4.5 + (rawP >= 1 ? wobbleY : 0)).toFixed(1)} Q ${(headX - 1.5).toFixed(1)} ${(headY + 8.5 + (rawP >= 1 ? wobbleY : 0)).toFixed(1)} ${(headX + 1.8).toFixed(1)} ${(headY + 8.0 + (rawP >= 1 ? wobbleY : 0)).toFixed(1)}" fill="none" stroke="#FFFFFF" stroke-width="1.3" stroke-linecap="round" />
                `;

                for (let i = 0; i < 5; i++) {
                    if (i > 0) acc += segs[i - 1].len;
                    const nd = topDoc.getElementById(`wt-node-${i}`);
                    if (curDist >= acc) {
                        const grow = Math.min(1, (curDist - acc + 5) / 15);
                        const baseR = i % 2 === 1 ? 4.8 : 3.8;
                        const curR = baseR * grow;
                        if (nd) nd.setAttribute("r", curR.toFixed(2));
                        if (grow > 0.3) {
                            dotsHtml += `<circle cx="${(pts[i].x - curR * 0.32).toFixed(1)}" cy="${(pts[i].y - curR * 0.32).toFixed(1)}" r="${(curR * 0.28).toFixed(1)}" fill="#FFFFFF" />`;
                        }
                    } else {
                        if (nd) nd.setAttribute("r", "0");
                    }
                }
                shineDots.innerHTML = dotsHtml;

                // 当泪珠到达终点后，底部泛起一圈圈晶莹水波纹
                if (rawP >= 1 && rippleEl) {
                    const rt = ((now - t0 - DURATION) % 2400) / 2400;
                    rippleEl.setAttribute("rx", (3 + rt * 18).toFixed(1));
                    rippleEl.setAttribute("ry", (1.2 + rt * 6.5).toFixed(1));
                    rippleEl.setAttribute("opacity", ((1 - rt) * 0.75).toFixed(2));
                }

                rafId = requestAnimationFrame(step);
            }

            rafId = requestAnimationFrame(step);
        }

        startWaterTearSplash();

        topDoc.addEventListener("click", (e) => {
            const t = e.target;
            if (!t || !t.closest) return;
            if (t.closest("#seoul-mini-theater-btn") || t.closest("#seoul-ext-open-btn") || t.closest("#seoul-wand-menu-item")) {
                splash.classList.remove("fade-out");
                startWaterTearSplash();
            }
        }, true);
    }

    mountRealWaterTearSplash();
})();
