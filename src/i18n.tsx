import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "zh" | "en";

const zh = {
  nav: {
    items: [
      { id: "home", label: "首頁", en: "Home" },
      { id: "lab", label: "作品廊道", en: "Gallery" },
      { id: "insights", label: "AI 觀測站", en: "Insights" },
      { id: "about", label: "關於我", en: "About" },
      { id: "exp", label: "經歷", en: "Journey" },
      { id: "contact", label: "聯絡＋留言", en: "Guestbook" },
    ],
    paletteTitle: "試色選單",
    paletteSub: "SWATCH MENU ★ PICK A SHADE",
    hoverHint: "hover / tap 打開色盤",
    close: "關閉",
  },
  splash: {
    title: "ENTER THE LAB",
    sub: "吳宣萱的 AIGC 視覺實驗室",
    visitors: "實驗室訪客",
    hint: "點擊任意處進入",
    est: "EST. 2005 ★ TAIPEI",
  },
  hero: {
    eyebrow: "AIGC × LUXURY BEAUTY ★ 商業邏輯 × AI 視覺轉化",
    hi: "嗨，我是",
    name: "吳宣萱",
    nameEn: "Shelly Wu",
    roles: ["INTJ 企劃人", "AI 視覺煉金師", "從 0 到 1 的建構者"],
    lineA: "我用 AIGC 替",
    lineB: "專櫃美妝",
    lineC: "寫視覺情書。",
    desc: "人生就是從一無所有到一無所有的過程，開始與結束已定，中間的經歷由你自己決定。",
    note: "為避免誤入詐騙陷阱，暫不接聽陌生電話 — 歡迎寫信給我，文字比聲音更長久。",
    cta1: "逛逛作品廊道",
    cta2: "觀看 AI 短片",
    badge: "100% SPEC ADS ✦ AIGC ✦ EST. 2005 ✦ ",
    polaroids: ["AI 渲染作品", "ME ✦ 本人", "AI 角色創作"],
    scroll: "往下滑",
    marquee: [
      "AIGC 視覺策略", "LUXURY BEAUTY", "專櫃美妝廣告", "SPEC AD ARCHIVE",
      "動態廊道", "商業企劃", "AI CONTENT", "從 0 到 1",
    ],
  },
  gallery: {
    kicker: "GALLERY · 作品廊道",
    titleA: "作品",
    titleB: "廊道",
    desc: "從課堂企劃到競賽報告，從 AI 生成影像到 AI 生成圖片 — 把每一個做過的企劃，像走秀一樣排進三條賽道。滑過即暫停，懸停翻面看故事。",
    touchNote: "觸控裝置：輕點卡片翻面，滑動後自動繼續。",
    tracks: [
      { code: "TRACK A", name: "企劃文件", en: "PPT · WORD · PDF", speed: "SLOW ←" },
      { code: "TRACK B", name: "AI 生成影像", en: "AI VIDEO", speed: "MEDIUM →" },
      { code: "TRACK C", name: "AI 生成圖片", en: "AI IMAGES", speed: "SLOWEST ←" },
    ],
    tag: "作品",
    story: "作品說明",
    tools: "使用工具",
    view: "查看",
    openLink: "開啟檔案／連結",
    flipHint: "翻面看說明",
    resumed: "已恢復走秀",
    paused: "走秀暫停中",
    docNote: "＊企劃文件請放置於 public/photos/ 資料夾，並在 src/data/gallery.ts 更新對應檔名。",
  },
  lab: {
    kicker: "GALLERY · 作品廊道",
    titleA: "動態",
    titleB: "廊道",
    desc: "從課堂企劃到競賽報告，從 AI 生成影像到 AI 生成圖片 — 把每一個做過的企劃，像走秀一樣排進三條賽道。滑過即暫停，懸停翻面看故事。",
    touchNote: "觸控裝置：輕點卡片翻面，滑動後自動繼續。",
    tracks: [
      { code: "TRACK A", name: "企劃文件", en: "PPT · WORD · PDF", speed: "SLOW ←" },
      { code: "TRACK B", name: "AI 生成影像", en: "AI VIDEO", speed: "MEDIUM →" },
      { code: "TRACK C", name: "AI 生成圖片", en: "AI IMAGES", speed: "SLOWEST ←" },
    ],
    tag: "作品",
    story: "作品說明",
    tools: "使用工具",
    view: "查看",
    openLink: "開啟檔案／連結",
    flipHint: "翻面看說明",
    resumed: "已恢復走秀",
    paused: "走秀暫停中",
    dragHint: "可拖曳滑動",
    docNote: "＊如果把一臺設備連接到我的大腦任一神經元上，你會發現，人類思維中有一種不可預測的隨機性，這是AI永遠不具備的",
  },
  insights: {
    kicker: "觀測日誌 · FIELD NOTES",
    titleA: "AI",
    titleB: "觀測站",
    desc: "不堆長文，只標座標 — 五個我正在觀測的行業悖論，與我的判斷。",
    entries: [
      {
        no: "OBS-01", kind: "bridge", tag: "能力悖論",
        title: "能力過載 × 結果缺失",
        left: { h: "模型通用能力", s: "已觸及甚至超越人類平均" },
        gap: "THE GAP 縫隙",
        right: { h: "具體業務場景", s: "落地效果天差地別" },
        bridge: "FDE 全棧交付",
        bridgeSub: "「補位者」— 把最佳實踐封裝成可複製路徑",
        points: [
          "FDE 不是外包、也不是培訓，而是填補縫隙的「補位者」",
          "真正的價值不在寫代碼，而在把 AI 能力「服務化」",
          "讓前 5% 的超級用戶，為其餘 95% 提供自動化解方",
        ],
        punch: "軟體已死，服務永生 — AI 是 Token 提供的服務，而非軟體。",
      },
      {
        no: "OBS-02", kind: "race", tag: "速度差",
        title: "技術狂奔 vs 組織僵化",
        fast: { h: "技術側 · AI", s: "每 2–3 個月一次質變" },
        slow: { h: "組織側 · 流程", s: "簽章一天・採購兩月" },
        notes: ["「簽約蓋章，耗費一整天」", "「流程走兩個月，專案都黃了」"],
        points: [
          "技術接入不是難點 — 難點是採購、合規、財務與舊 SOP",
          "AI 在比特世界勢如破竹，在原子世界寸步難行",
        ],
        punch: "在新舊齒輪之間注入「服務」這滴潤滑油的人，掌握 B 端金礦。",
      },
      {
        no: "OBS-03", kind: "fork", tag: "產品終局",
        title: "Agent-Native × X+Agent",
        pathA: { h: "X + Agent", s: "巨頭的嫁接路線", d: "在微信／飛書／Office 上嫁接 AI — 體驗割裂，AI 淪為舊框架裡的「高級功能」。" },
        pathB: { h: "Agent-Native", s: "新勢力的原生路線", d: "以 Agent 為唯一入口，萬物沉入底層 — 但人類需要可視化儀表盤，對抗健忘。" },
        quote: "未來的作業系統不是 APP Store，而是動態生成的 UI — 基於上下文的「目錄式倉庫」。",
        punch: "軟體不會消失，但會退化為 Agent 調用的「無形 API」。",
      },
      {
        no: "OBS-04", kind: "echo", tag: "認知陷阱",
        title: "上下文悖論 × 回音室",
        warning: "警惕 · 信息繭房 2.0",
        echoA: "YOU", echoB: "AGENT",
        points: [
          "長上下文不是銀彈 — 過去的平均水準，會把你拉回來",
          "上下文需要「邊界感」與專案管理，如同記憶需要遺忘與歸類",
          "與 Agent 形成閉環，極易陷入互相吹捧的幻覺循環",
        ],
        punch: "你用 Agent「發現」的新框架，本身可能就是最大的幻覺。",
      },
      {
        no: "OBS-05", kind: "stamp", tag: "變現真相",
        title: "C 端困局 × 蓋章經濟學",
        sealHint: "點擊蓋章 TAP TO SEAL",
        ink: "護城河＝合規服務層",
        inkSub: "STAMPED · 成交",
        points: [
          "C 端 Skills 靠 Token 消耗：收費即流失、免費即虧損",
          "開源特性使 C 端無法保密 — 本質仍是「引流玩具」",
          "B 端真金白銀：電子發票、企業採購、簽約蓋章",
        ],
        punch: "誰把最後一公里的髒活累活幹好，誰就賺到錢。",
      },
    ],
  },
  about: {
    kicker: "PROFILE · 人物檔案",
    title: "關於我",
    titleEn: "BEHIND THE PALETTE",
    profile: [
      ["姓名", "吳宣萱 Shelly"],
      ["出生", "2005.09"],
      ["就讀", "國立臺北商業大學・企業管理系"],
      ["學業", "長期保持班級前 10 名"],
      ["人格", "INTJ・建築師"],
    ],
    bio: "企業管理背景賦予我敏銳的商業洞察（PEST／波特五力），同時我沉迷於用 AI 工具打磨 Prompt 與內容產出 — 從高品質簡報、社群圖文到專櫃級 AIGC 廣告視覺。我兼具視覺美感與商業轉換思維，習慣在高壓賽事中擔任組長，把想法落地成可執行的方案。",
    chips: ["戰略領導力", "跨域執行力", "卓越交付", "AI 視覺內容企劃", "質性訪談調研", "簡報敘事設計"],
    paletteTitle: "技能色盤",
    paletteEn: "SKILL PALETTE",
    paletteNote: "飽和度 = 自評熟練度",
    skills: [
      { name: "商業分析企劃", en: "Business Analysis", pct: 92, tint: "#BEAEDB" },
      { name: "簡報視覺美編", en: "Deck Design", pct: 90, tint: "#A98FD4" },
      { name: "團隊領導控管", en: "Leadership", pct: 85, tint: "#947FC9" },
      { name: "質性訪談調研", en: "Field Research", pct: 80, tint: "#75619D" },
      { name: "AI 圖像生成 Prompt", en: "AI Image Craft", pct: 74, tint: "#5F4A85" },
      { name: "量化交易邏輯", en: "Quant Logic", pct: 62, tint: "#4A3670" },
    ],
    honorsTitle: "高光時刻",
    honorsEn: "HIGHLIGHTS",
    honors: [
      "第 13 屆 TBSA 全國大專創新企劃競賽 — 全國優等獎",
      "六項全國性商業／永續／科技競賽 組長或統籌",
      "林口觀音寺・龍山寺・農業部・保安宮 獎學金",
      "TQC 簡報／文書／試算表／雲端 + TIMS 行銷認證",
    ],
  },
  exp: {
    kicker: "JOURNEY · 時間軸",
    title: "經歷",
    titleEn: "THE ROAD SO FAR",
    tags: { lead: "組長", part: "參賽者", work: "工作經驗", coord: "項目統籌" },
    items: [
      {
        title: "2025 永續創新與創業跨校聯合競賽", tag: "lead", date: "2025.09 – 2025.10",
        pts: ["主導專案選題與問題定義，以文獻調研驗證受眾需求", "編製產品計畫簡報，規劃落地路徑與關鍵衡量指標"],
      },
      {
        title: "2025 第三屆程式實盤模擬交易競賽", tag: "part", date: "2025.02 – 2025.03",
        pts: ["自主研習量化交易邏輯，以 XQ 平台建構自動化策略", "克服資源限制優化程式結構，展現金融科技實踐力"],
      },
      {
        title: "國立臺北商業大學 — 教學發展中心", tag: "work", date: "2024 – 2025",
        pts: ["美編助理：主導教育專案視覺、簡報、宣傳圖卡與活動剪輯", "優化內部素材管理流程，支援跨部門溝通與新媒體內容開發"],
      },
      {
        title: "2025 第五屆 永續生活實驗室獎", tag: "lead", date: "2024.11 – 2024.12",
        pts: ["主導 SDGs 減碳 App 專案，獨立完成介面原型與企劃", "對接指導老師優化產品邏輯，確保體驗與技術可行性"],
      },
      {
        title: "2025 L'ORÉAL Brandstorm", tag: "coord", date: "2024.10 – 2024.12",
        pts: ["以 PEST 及波特五力分析解構男性美妝市場痛點", "轉化洞察為商業模式與行銷策略，整合團隊提案簡報"],
      },
      {
        title: "第二屆 台灣尤努斯基金會「三零行動家」", tag: "lead", date: "2024.08",
        pts: ["執行「關愛之家」深度訪談，辨識無國籍兒童議題缺口", "倡議社會企業解方，提煉具社會影響力的行動方案"],
      },
      {
        title: "第 13 屆 TBSA 全國大專創新企劃競賽", tag: "lead", date: "2023.11 – 2024.05",
        pts: ["率領 5 人團隊執行夜市改革實地調研，轉化為創新企劃", "協調分工並主導企劃書撰寫 — 奪得全國優等獎"],
      },
      {
        title: "自家餐飲業", tag: "work", date: "2020 – 2024",
        pts: ["外場工讀：第一線顧客服務、訂單管理與突發客訴處理", "協調內外場溝通效率，確保高峰時段營運流暢"],
      },
    ],
    eduTitle: "教育",
    eduEn: "EDUCATION",
    edu: [
      ["2021 – 2026", "國立臺北商業大學・五專 企業管理系"],
      ["2018 – 2021", "新北市立重慶國民中學"],
    ],
  },
  contact: {
    kicker: "SAY HI · 聯絡",
    title: "聯絡與留言板",
    titleEn: "GUESTBOOK ★ SIGN IN",
    desc: "想找會做 AIGC 美妝視覺、又懂商業企劃的人？在這裡留下你的座標。",
    phone: "電話",
    email: "信箱",
    school: "學校",
    gbTitle: "星光留言板",
    gbEn: "STAR WALL",
    gbName: "你的稱呼",
    gbMsg: "留一句話給我……",
    gbBtn: "貼上星光貼紙",
    gbThanks: "已貼上你的星星！",
    gbEmpty: "第一顆星星等你來點亮",
  },
  footer: {
    marquee: "SHELLY WU ✦ 吳宣萱 ✦ AIGC VISUAL LAB ✦ 商業邏輯 × AI 視覺轉化 ✦ ",
    best: "BEST VIEWED UNDER STARLIGHT",
    rights: "© 2026 吳宣萱 Shelly Wu — 靈魂的渴望 是命運的先知",
    nowPlaying: "♪ NOW SHOWING",
    film: "夏が終わる前に · AI 青春敘事短片",
    top: "回到星空頂端",
  },
};

export type Content = typeof zh;

const en: Content = {
  nav: {
    items: [
      { id: "home", label: "Home", en: "首頁" },
      { id: "lab", label: "Gallery", en: "作品廊道" },
      { id: "insights", label: "Insights", en: "AI 觀測站" },
      { id: "about", label: "About", en: "關於我" },
      { id: "exp", label: "Journey", en: "經歷" },
      { id: "contact", label: "Guestbook", en: "留一個言" },
    ],
    paletteTitle: "SWATCH MENU",
    paletteSub: "試色選單 ★ PICK A SHADE",
    hoverHint: "hover / tap to open palette",
    close: "Close",
  },
  splash: {
    title: "ENTER THE LAB",
    sub: "The AIGC Visual Lab of Shelly Wu",
    visitors: "LAB VISITORS",
    hint: "CLICK ANYWHERE TO ENTER",
    est: "EST. 2005 ★ TAIPEI",
  },
  hero: {
    eyebrow: "AIGC × LUXURY BEAUTY ★ BUSINESS LOGIC MEETS AI VISUALS",
    hi: "Hi, I'm",
    name: "Shelly Wu",
    nameEn: "吳宣萱",
    roles: ["INTJ Strategist", "AI Visual Alchemist", "Zero-to-One Builder"],
    lineA: "I write AI love-letters",
    lineB: "to luxury",
    lineC: "beauty brands.",
    desc: "Life goes from nothing to nothing — the start and the end are set; everything in between is yours to write.",
    note: "No calls from unknown numbers (scam alert!) — write to me instead; words outlive sound.",
    cta1: "Browse the Gallery",
    cta2: "Watch the AI Film",
    badge: "100% SPEC ADS ✦ AIGC ✦ EST. 2005 ✦ ",
    polaroids: ["AI RENDER", "ME ✦", "AI SPRITE"],
    scroll: "SCROLL",
    marquee: [
      "AIGC STRATEGY", "LUXURY BEAUTY", "SPEC AD ARCHIVE", "動態廊道",
      "AI CONTENT", "BUSINESS DESIGN", "ZERO TO ONE", "星光實驗室",
    ],
  },
  gallery: {
    kicker: "GALLERY · 作品廊道",
    titleA: "My",
    titleB: "Gallery",
    desc: "From class decks to competition reports, from AI films to AI images — every project I've made walks one of these three runways. Hover to freeze, flip a card to read its story.",
    touchNote: "On touch screens: tap any card to flip it.",
    tracks: [
      { code: "TRACK A", name: "Project Files", en: "企劃文件", speed: "SLOW ←" },
      { code: "TRACK B", name: "AI Films", en: "AI 生成影像", speed: "MEDIUM →" },
      { code: "TRACK C", name: "AI Images", en: "AI 生成圖片", speed: "SLOWEST ←" },
    ],
    tag: "WORK",
    story: "ABOUT",
    tools: "TOOLS",
    view: "View",
    openLink: "Open file / link",
    flipHint: "flip for story",
    resumed: "show resumed",
    paused: "show paused",
    docNote: "*Place your project files in public/photos/ and update src/data/gallery.ts.",
  },
  lab: {
    kicker: "GALLERY · 作品廊道",
    titleA: "My",
    titleB: "Gallery",
    desc: "From class decks to competition reports, from AI films to AI images — every project I've made walks one of these three runways. Hover to freeze, flip a card to read its story.",
    touchNote: "On touch screens: tap any card to flip it.",
    tracks: [
      { code: "TRACK A", name: "Project Files", en: "企劃文件", speed: "SLOW ←" },
      { code: "TRACK B", name: "AI Films", en: "AI 生成影像", speed: "MEDIUM →" },
      { code: "TRACK C", name: "AI Images", en: "AI 生成圖片", speed: "SLOWEST ←" },
    ],
    tag: "WORK",
    story: "ABOUT",
    tools: "TOOLS",
    view: "View",
    openLink: "Open file / link",
    flipHint: "flip for story",
    resumed: "show resumed",
    paused: "show paused",
    dragHint: "drag to scrub",
    docNote: "*Folders mirror your GitHub repo: docs in public/照片/, images in public/照片/imags/, videos in public/影片/ — Vercel deploys as-is.",
  },
  insights: {
    kicker: "FIELD NOTES · 觀測日誌",
    titleA: "AI",
    titleB: "Observatory",
    desc: "No walls of text, just coordinates — five industry paradoxes I'm watching, and my take on each.",
    entries: [
      {
        no: "OBS-01", kind: "bridge", tag: "The Paradox",
        title: "Overload × Absence",
        left: { h: "Model capability", s: "at or above human average" },
        gap: "THE GAP",
        right: { h: "Business context", s: "wildly uneven outcomes" },
        bridge: "FDE Delivery",
        bridgeSub: "The gap-filler — packaging best practice into repeatable paths",
        points: [
          "FDE is not outsourcing nor training — it fills the gap",
          "The value isn't code; it's turning AI capability into a service",
          "Top 5% power users automate for the other 95%",
        ],
        punch: "Software is dead, service is forever — AI is a token-served service, not software.",
      },
      {
        no: "OBS-02", kind: "race", tag: "Speed Gap",
        title: "Sprinting Tech × Rigid Org",
        fast: { h: "Tech side · AI", s: "a leap every 2–3 months" },
        slow: { h: "Org side · process", s: "a seal per day, procurement per season" },
        notes: ["“One whole day, just to get the contract stamped”", "“Two months of procurement — and the project died”"],
        points: [
          "Integration is never the hard part — compliance, finance & legacy SOPs are",
          "AI conquers the bit world but crawls in the atom world",
        ],
        punch: "Whoever oils the mesh between old gears and new ones owns the B2B goldmine.",
      },
      {
        no: "OBS-03", kind: "fork", tag: "Endgame",
        title: "Agent-Native × X+Agent",
        pathA: { h: "X + Agent", s: "the incumbents' path", d: "Bolting AI onto WeChat / Feishu / Office — a disjointed AI, demoted to a 'premium feature'." },
        pathB: { h: "Agent-Native", s: "the challengers' path", d: "Agent as the only entry, everything sinks below — yet humans still need visible dashboards to remember." },
        quote: "The future OS is not an App Store, but dynamically generated UI — a context-based, catalog-style warehouse.",
        punch: "Software won't vanish — it degrades into invisible APIs the Agent calls.",
      },
      {
        no: "OBS-04", kind: "echo", tag: "Cognition",
        title: "Context Paradox × Echo Chamber",
        warning: "Beware · Filter Bubble 2.0",
        echoA: "YOU", echoB: "AGENT",
        points: [
          "Long context is no silver bullet — your past average pulls you back",
          "Context needs boundaries & project management, like memory needs forgetting",
          "Closed loops with an Agent breed mutual-flattery hallucinations",
        ],
        punch: "The new framework you 'discovered' with your Agent may itself be the biggest hallucination.",
      },
      {
        no: "OBS-05", kind: "stamp", tag: "Monetization",
        title: "C-end Trap × Seal Economics",
        sealHint: "TAP TO SEAL 點擊蓋章",
        ink: "MOAT = COMPLIANCE SERVICE",
        inkSub: "STAMPED · DEAL",
        points: [
          "C-end skills burn tokens: charge and lose users, stay free and bleed cash",
          "Open-source traits kill secrecy — C-end is essentially a 'lead magnet toy'",
          "B2B money is real: e-invoices, procurement flows, contracts & seals",
        ],
        punch: "Whoever does the dirty last-mile work is the one who gets paid.",
      },
    ],
  },
  about: {
    kicker: "PROFILE · 人物檔案",
    title: "About",
    titleEn: "BEHIND THE PALETTE",
    profile: [
      ["Name", "Shelly Wu 吳宣萱"],
      ["Born", "2005.09"],
      ["Study", "Business Administration, NTUB Taipei"],
      ["Academic", "Top 10 of class, consistently"],
      ["Type", "INTJ · Architect"],
    ],
    bio: "A business-school core gives me sharp commercial instincts (PEST, Porter's Five Forces), while an AI obsession lets me craft prompts into counter-grade campaign visuals — from decks to social content to AIGC beauty ads. I lead teams under pressure and land ideas as executable plans.",
    chips: ["Strategic Leadership", "Cross-domain Execution", "Premium Delivery", "AI Visual Planning", "Field Research", "Deck Storytelling"],
    paletteTitle: "Skill Palette",
    paletteEn: "技能色盤",
    paletteNote: "saturation = self-rated mastery",
    skills: [
      { name: "Business Analysis", en: "商業分析企劃", pct: 92, tint: "#BEAEDB" },
      { name: "Deck Design", en: "簡報視覺美編", pct: 90, tint: "#A98FD4" },
      { name: "Leadership", en: "團隊領導控管", pct: 85, tint: "#947FC9" },
      { name: "Field Research", en: "質性訪談調研", pct: 80, tint: "#75619D" },
      { name: "AI Image Craft", en: "AI 圖像生成 Prompt", pct: 74, tint: "#5F4A85" },
      { name: "Quant Logic", en: "量化交易邏輯", pct: 62, tint: "#4A3670" },
    ],
    honorsTitle: "Highlights",
    honorsEn: "高光時刻",
    honors: [
      "13th TBSA National Innovation Competition — National Excellence Award",
      "Captain / coordinator in six national business, sustainability & tech contests",
      "Scholarships: Linkou Guanyin Temple, Longshan Temple, MOA, Baoan Temple",
      "Certified: TQC Deck / Docs / Sheets / Cloud + TIMS Marketing",
    ],
  },
  exp: {
    kicker: "JOURNEY · 時間軸",
    title: "Journey",
    titleEn: "THE ROAD SO FAR",
    tags: { lead: "LEADER", part: "ENTRANT", work: "WORK", coord: "LEAD" },
    items: [
      {
        title: "2025 Sustainable Innovation & Entrepreneurship Cup", tag: "lead", date: "2025.09 – 2025.10",
        pts: ["Owned topic selection & problem definition via literature research", "Built the product plan deck with rollout path & KPIs"],
      },
      {
        title: "3rd Live Algorithmic Trading Competition", tag: "part", date: "2025.02 – 2025.03",
        pts: ["Self-taught quant logic; built automated strategies on XQ", "Optimized program structure under resource constraints"],
      },
      {
        title: "NTUB — Center for Teaching & Learning", tag: "work", date: "2024 – 2025",
        pts: ["Graphic design assistant: decks, posters & event edits for education projects", "Streamlined asset management; supported cross-team content development"],
      },
      {
        title: "5th Sustainable Living Lab Award", tag: "lead", date: "2024.11 – 2024.12",
        pts: ["Led an SDGs carbon-cutting app — solo UI prototype & proposal", "Iterated product logic with faculty to secure feasibility"],
      },
      {
        title: "2025 L'ORÉAL Brandstorm", tag: "coord", date: "2024.10 – 2024.12",
        pts: ["Decoded men's beauty pain points with PEST & Five Forces", "Turned insight into a business model & merged the team deck"],
      },
      {
        title: "Yunus Foundation — 3ZERO Actionist (2nd)", tag: "lead", date: "2024.08",
        pts: ["Ran in-depth interviews at Harmony Home on stateless children", "Proposed a social-enterprise solution with real impact"],
      },
      {
        title: "13th TBSA National Innovation Competition", tag: "lead", date: "2023.11 – 2024.05",
        pts: ["Led 5 people through night-market field research into a reform proposal", "Orchestrated the writing — won the National Excellence Award"],
      },
      {
        title: "Family Restaurant", tag: "work", date: "2020 – 2024",
        pts: ["Front-of-house: service, orders & on-the-spot complaint handling", "Kept rush-hour operations smooth via inside-outside coordination"],
      },
    ],
    eduTitle: "Education",
    eduEn: "教育",
    edu: [
      ["2021 – 2026", "National Taipei University of Business — Business Administration"],
      ["2018 – 2021", "New Taipei Municipal Chongqing Junior High School"],
    ],
  },
  contact: {
    kicker: "SAY HI · 聯絡",
    title: "Guestbook",
    titleEn: "GUESTBOOK ★ SIGN IN",
    desc: "Looking for someone who pairs AIGC beauty visuals with real business planning? Leave your coordinates right here.",
    phone: "PHONE",
    email: "EMAIL",
    school: "CAMPUS",
    gbTitle: "Star Wall",
    gbEn: "星光留言板",
    gbName: "Your name",
    gbMsg: "Leave me one line…",
    gbBtn: "Pin a star sticker",
    gbThanks: "Your star is on the wall!",
    gbEmpty: "Be the first star on the wall",
  },
  footer: {
    marquee: "SHELLY WU ✦ 吳宣萱 ✦ AIGC VISUAL LAB ✦ BUSINESS × AI VISUALS ✦ ",
    best: "BEST VIEWED UNDER STARLIGHT",
    rights: "© 2025 Shelly Wu 吳宣萱 — handmade with stars & wisteria",
    nowPlaying: "♪ NOW SHOWING",
    film: "Before Summer Ends — AI Youth Short Film",
    top: "Back to the top of the sky",
  },
};

const content: Record<Lang, Content> = { zh, en };

interface LangCtx {
  lang: Lang;
  c: Content;
  toggle: () => void;
  t: (pair: [string, string]) => string;
}

const Ctx = createContext<LangCtx | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => {
    if (typeof window === "undefined") return "zh";
    return (localStorage.getItem("lab-lang") as Lang) || "zh";
  });

  useEffect(() => {
    localStorage.setItem("lab-lang", lang);
    document.documentElement.lang = lang === "zh" ? "zh-Hant" : "en";
  }, [lang]);

  const toggle = () => setLang((l) => (l === "zh" ? "en" : "zh"));
  const t = (pair: [string, string]) => (lang === "zh" ? pair[0] : pair[1]);

  return <Ctx.Provider value={{ lang, c: content[lang], toggle, t }}>{children}</Ctx.Provider>;
}

export function useLang() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useLang must be used inside LanguageProvider");
  return ctx;
}
