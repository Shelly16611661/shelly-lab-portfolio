/* ══════════════════════════════════════════════════════════
   作品資料庫 — 沿用 GitHub 倉庫既有資料夾命名：
   ✦ 文件/PDF → public/照片/xxx.pdf
   ✦ AI 圖片 → public/照片/imags/xx.png
   ✦ 影片   → public/影片/xxx.mp4
   ══════════════════════════════════════════════════════════ */

const LINK_FILM = "https://drive.google.com/drive/folders/1yOH_R5OLjpgNuuwgPulSoXWXnp2PIGiZ?usp=sharing";

export type GalleryItem =
  | {
      kind: "image";
      id: string;
      img: string;
      no: string;
      tag: [string, string];
      title: [string, string];
      sub: [string, string];
      story: [string, string];
      tools: string[];
      tint: string;
      link?: string;
      linkLabel?: [string, string];
    }
  | {
      kind: "doc";
      id: string;
      badgeIcon: "pdf" | "film";
      no: string;
      tag: [string, string];
      title: [string, string];
      sub: [string, string];
      story: [string, string];
      tools: string[];
      tint: string;
      link?: string;
      linkLabel?: [string, string];
    };

/* ── TRACK A · 企劃文件 PPT · WORD · PDF（慢速，向左）────── */
export const trackA: GalleryItem[] = [
  {
    kind: "doc", id: "huashan", badgeIcon: "pdf", no: "D№01",
    tag: ["PPT", "PPT"],
    title: ["華山市場商圈連鎖咖啡店行銷研究", "Huashan District Chain Café Marketing Study"],
    sub: ["2024 · 市場調查分析", "2024 · Marketing Research"],
    story: [
      "我的貢獻：主導問卷設計與統計分析（因素分析、K-means、迴歸分析），繪製品牌知覺圖與競爭策略矩陣，針對路易莎、星巴克、cama、興波咖啡、怡客咖啡提出具體行銷建議。",
      "Led questionnaire design & statistics (factor analysis, K-means, regression); mapped brand perception and proposed marketing moves for five café chains.",
    ],
    tools: ["市場調查", "統計分析", "行銷策略", "品牌定位"],
    tint: "#BEAEDB",
    link: "/照片/huashan_coffee.pdf",
    linkLabel: ["查看簡報 PDF", "Open PDF"],
  },
  {
    kind: "doc", id: "subscription", badgeIcon: "pdf", no: "D№02",
    tag: ["PPT", "PPT"],
    title: ["『閱』陷『閱』深！你今天「訂閱」了沒？", "Subscription Economy Research"],
    sub: ["2025 · 創新經營模式專題", "2025 · Business Model Study"],
    story: [
      "我的貢獻：研究 Netflix、moPlus 與 Uber One 三大訂閱平台，解析消費者訂閱動機、品牌購買意願與品牌形象之關係，運用因素分析與知覺圖進行市場區隔與策略分析。",
      "Studied Netflix, moPlus & Uber One: subscription motives, purchase intent and brand image via factor analysis & perceptual mapping.",
    ],
    tools: ["訂閱經濟", "消費者行為", "品牌分析", "商業模式"],
    tint: "#F9E6A8",
    link: "/照片/subscription_economy1.pdf",
    linkLabel: ["查看簡報 PDF", "Open PDF"],
  },
  {
    kind: "doc", id: "nightmarket", badgeIcon: "pdf", no: "D№03",
    tag: ["WORD", "WORD"],
    title: ["打造永續夜市時尚新文化建立永續X時尚X文化生態圈", "Sustainable Night-Market Ecosystem"],
    sub: ["2024 · TBSA 全國大專創新企劃競賽 全國優等獎", "2024 · TBSA National Excellence Award"],
    story: [
      "我的貢獻：團隊於現場進行密集討論與協作撰寫，我負責將5位組員的實地調研洞察與發散構想，即時收斂為具邏輯性的企劃架構，並主導最終簡報的視覺設計與內容統整，確保提案論述清晰且具說服力，協助團隊在全國競賽中奪得優等獎。",
      "Condensed five teammates' field insights into a logical proposal on-site, led final deck design — won the National Excellence Award.",
    ],
    tools: ["實地調研", "創新企劃", "團隊領導"],
    tint: "#F2A7D8",
    link: "/照片/night_market_ecosystem.pdf",
    linkLabel: ["查看報告 PDF", "Open PDF"],
  },
  {
    kind: "doc", id: "rebuilding", badgeIcon: "pdf", no: "D№04",
    tag: ["PPT", "PPT"],
    title: ["《到不了的遠方，重建輝煌》", "Rebuilding Glory in the Unreachable Distance"],
    sub: ["個人專題報告 · AI 文物修復與 AR 體驗", "Solo Project · AI Restoration × AR"],
    story: [
      "我的貢獻：獨立完成簡報企劃、視覺設計與內容撰寫。將 AI 修復技術（U-Net++、GAN）、宇宙射線成像（繆子掃描）與 AR 體驗結合，以拉美西斯二世為案例，提出數位文物保存的資訊管理策略。簡報包含完整故事線、歷史考據與技術原理圖解，並融入天文模擬與 3D 重建概念。",
      "Solo deck merging U-Net++/GAN restoration, muon tomography & AR — a Ramesses II case for digital heritage management.",
    ],
    tools: ["AI 修復", "AR 體驗", "資訊管理", "文化遺產"],
    tint: "#947FC9",
    link: "/照片/rebuilding glory in the unreachable distance.pdf",
    linkLabel: ["查看簡報 PDF", "Open PDF"],
  },
  {
    kind: "doc", id: "greenpoint", badgeIcon: "pdf", no: "D№05",
    tag: ["PPT", "PPT"],
    title: ["環保集點 · 綠點驅動未來", "Green Points · Eco-Rewards App"],
    sub: ["2024 · 行銷策略專題", "2024 · Marketing Strategy"],
    story: [
      "我的貢獻：以「環保行動有價化」為核心，規劃環保集點 App 行銷企劃。完成 PEST 政治經濟社會科技情報分析、競爭者比較、消費者洞察，並設計 STP 市場策略、行銷戰術（數位集點、異業合作）、溝通活動（線上濾鏡、校園大使、實體推廣）及完整預算與時程表，打造「綠色消費循環」生態圈。",
      "Full marketing plan for an eco-points app: PEST intel, STP, tactics, campaigns, budget & timeline.",
    ],
    tools: ["行銷企劃", "永續創新", "活動設計", "數據分析"],
    tint: "#7BC98F",
    link: "/照片/greenpoint_marketing.pdf",
    linkLabel: ["查看企劃 PDF", "Open PDF"],
  },
  {
    kind: "doc", id: "fivefortune", badgeIcon: "pdf", no: "D№06",
    tag: ["PPT", "PPT"],
    title: ["五福臨門 · 北宋文化與非遺工藝", "Five Fortunes · Song Culture & Heritage Crafts"],
    sub: ["2024 · 文化研究報告", "2024 · Cultural Research"],
    story: [
      "我的貢獻：以古裝劇《五福臨門》為載體，深入考據北宋汴京市井風貌、宋制服飾（珍珠妝、包髻）、點茶文化與非遺工藝（花絲鑲嵌、刺繡紋樣）。完成「五福」人物形象設計與歷史隱喻解讀，將傳統文化元素轉化為具現代的視覺敘事，展現文化轉譯與美學分析能力。",
      "A deep dive through the drama Five Fortunes: Northern Song street life, pearl makeup, tea culture & intangible crafts, retold visually.",
    ],
    tools: ["文化研究", "歷史考據", "非遺傳承"],
    tint: "#E06464",
    link: "/照片/five_fortune_culture.pdf",
    linkLabel: ["查看簡報 PDF", "Open PDF"],
  },
  {
    kind: "doc", id: "supermarket", badgeIcon: "pdf", no: "D№07",
    tag: ["PPT", "PPT"],
    title: ["連鎖超市品牌經營與消費者行為研究", "Supermarket Brands & Consumer Behavior"],
    sub: ["2024 · 市場調查專題", "2024 · Market Research"],
    story: [
      "我的貢獻：針對全聯、家樂福、里仁三大超市品牌，設計完整研究架構與李克特量表問卷，涵蓋經營策略轉變、行業趨勢、品牌差異化與行銷永續影響力等四大構面。完成因素操作型定義、量表題項設計，並進行競爭格局與消費者需求分析，提出超市品牌差異化與危機應對策略。",
      "Research framework + Likert questionnaire across PX-Mart, Carrefour & Leezen; differentiation & crisis-response strategies.",
    ],
    tools: ["市場調查", "品牌分析", "消費者行為", "問卷設計"],
    tint: "#64A8E0",
    link: "/照片/supermarket_research.pdf",
    linkLabel: ["查看研究 PDF", "Open PDF"],
  },
  {
    kind: "doc", id: "skm", badgeIcon: "pdf", no: "D№08",
    tag: ["PPT", "PPT"],
    title: ["新光三越百貨：從零售業態到選址策略的成功方程式", "Shin Kong Mitsukoshi Retail Formula"],
    sub: ["2024 · 零售管理報告", "2024 · Retail Management"],
    story: [
      "我的貢獻：完成新光三越百貨之零售管理分析報告，涵蓋其歷史沿革、三級會員制度、產業特性、業態定位（百貨連鎖化與複合化轉型）、經營策略（大型化×連鎖化雙軸驅動、地點至上原則）及市場規模（2024年營收956億元、年客流量1.3億人次），並深入探討電商衝擊、出國潮等外部挑戰與 OMO 全通路應對策略。",
      "Full retail analysis of SKM — membership tiers, site strategy, NT$95.6B revenue scale, and OMO responses to e-commerce shocks.",
    ],
    tools: ["零售管理", "品牌分析", "選址策略", "市場趨勢", "百貨業態"],
    tint: "#E08FA6",
    link: "/照片/shin_kong_mitsukoshi.pdf",
    linkLabel: ["查看報告 PDF", "Open PDF"],
  },
  {
    kind: "doc", id: "timecafe", badgeIcon: "pdf", no: "D№09",
    tag: ["PPT", "PPT"],
    title: ["時光唱片行-Café｜音樂記憶咖啡廳創業企劃", "Time-Record Café Startup Plan"],
    sub: ["2024 · 創業管理專題", "2024 · Entrepreneurship"],
    story: [
      "我的貢獻：獨立完成「時光唱片行-Café」完整創業企劃書，以「音樂記憶」為核心，將 1980–2025 年華語音樂年代與咖啡廳體驗結合。涵蓋：空間規劃（磁帶流線設計、一樓吧檯＋二樓沉浸式展廳＋打卡長椅區）、主題菜單與 LOGO 設計、商業模式九宮格、五力分析、會員分級策略、財務報表（資產負債表／損益表／股東權益表），以及「黑膠卡帶造型餐具」設計專利保護策略，完整展現從品牌概念到落地執行的創業全貌。",
      "A complete solo startup plan: a music-memory café spanning 1980–2025 — space, menu, BMC, five forces, financials & design-patent strategy.",
    ],
    tools: ["創業企劃", "商業模式", "財務規劃", "空間設計", "品牌定位"],
    tint: "#D8A86A",
    link: "/照片/time_record_cafe.pdf",
    linkLabel: ["查看企劃 PDF", "Open PDF"],
  },
  {
    kind: "doc", id: "cama", badgeIcon: "pdf", no: "D№10",
    tag: ["PPT", "PPT"],
    title: ["cama café 五感體驗與顧客關係分析", "cama café Five-Senses Analysis"],
    sub: ["2024 · 門市服務管理", "2024 · Store Service Design"],
    story: [
      "我的貢獻：深入分析 cama café 的品牌定位與五感體驗策略（視覺：黃色招牌與 Beano 吉祥物｜聽覺：輕快音樂與咖啡機聲｜嗅覺：門市現烘咖啡豆香氣｜觸覺：周邊商品陳列與溫度｜味覺：新鮮烘焙與極厚乳三層拿鐵），並針對五感各面向提出具體優化建議報告（含音樂時段搭配、香氣調配吧、空間故事牆、包裝材質多樣化、品質管理等），展現品牌分析與服務設計的完整思維。",
      "A five-senses teardown of cama café with concrete upgrade proposals — music scheduling, aroma bar, story walls & QC.",
    ],
    tools: ["品牌分析", "五感體驗", "顧客關係", "門市服務"],
    tint: "#E0B64F",
    link: "/照片/cama_senses_analysis.pdf",
    linkLabel: ["查看報告 PDF", "Open PDF"],
  },
  {
    kind: "doc", id: "song", badgeIcon: "pdf", no: "D№11",
    tag: ["PDF", "PDF"],
    title: ["丹青映衣裳：宋畫中的宋代女子服飾", "Song-Dynasty Women's Dress in Paintings"],
    sub: ["完整研究報告", "Full Research Report"],
    story: [
      "完整研究報告：從宋畫出發，梳理宋代女子服飾的形制、色彩與妝容文化。",
      "A full report on the silhouettes, colors and beauty culture of Song women's dress, read through paintings.",
    ],
    tools: ["文獻研究", "視覺整理", "文化議題"],
    tint: "#7B86C9",
    link: "/照片/song dynasty clothing.pdf",
    linkLabel: ["查看 PDF", "Open PDF"],
  },
  {
    kind: "doc", id: "cafemenu", badgeIcon: "pdf", no: "D№12",
    tag: ["PDF", "PDF"],
    title: ["時光唱片行-Café 主題菜單", "Time-Record Café Theme Menu"],
    sub: ["菜單設計", "Menu Design"],
    story: [
      "為音樂記憶咖啡廳設計的主題菜單：以磁帶與黑膠為主視覺，把飲品與年代歌單配對。",
      "A cassette & vinyl-inspired menu pairing drinks with era playlists.",
    ],
    tools: ["菜單設計", "品牌視覺", "插畫排版"],
    tint: "#B79BDF",
    link: "public/照片/Café Theme Menu.pdf",
    linkLabel: ["查看 PDF", "Open PDF"],
  },
  {
    kind: "doc", id: "yinling", badgeIcon: "pdf", no: "D№13",
    tag: ["PDF", "PDF"],
    title: ["印鈴好味盒設計", "Yinling Delicious Box Design"],
    sub: ["包裝設計", "Package Design"],
    story: [
      "結合在地意象與送禮場景的餐盒包裝設計提案。",
      "A food-box packaging proposal blending local imagery with gifting occasions.",
    ],
    tools: ["包裝設計", "視覺提案"],
    tint: "#8E7BD8",
    link: "public/照片/yinling_delicious_box.pdf",
    linkLabel: ["查看 PDF", "Open PDF"],
  },
];

/* ── TRACK B · AI 生成影像 AI FILMS（中速，向右）────────── */
export const trackB: GalleryItem[] = [
  {
    kind: "doc", id: "summer", badgeIcon: "film", no: "V№01",
    tag: ["AI 影像", "AI FILM"],
    title: ["《夏が終わる前に》AI 生成青春敘事短片", "Before Summer Ends — AI Youth Short"],
    sub: ["AI 生成 · 全原創歌詞", "AI Film · Original Lyrics"],
    story: [
      "我的貢獻：獨立完成劇本、旁白歌詞創作，並規劃完整 AI 影片工作流——使用 GPT Image 2.0 進行概念視覺化與風格框架設計，Nano Banana Pro 建立角色四維圖（正面／側面／背面／特寫）確保視覺一致性錨點，最後以 Seedance 2.0 生成高品質動態影像。全片以「夏日暗戀」為主題，將「沒能說出口的喜歡」轉化為細膩的日常畫面（教室、操場、電車、夏日祭典），展現從文字到影像的完整敘事轉譯能力。「在空無一人的教室裡，白色的窗簾輕輕搖晃⋯⋯你從走廊的另一頭跑來，我的夏天就這樣開始了。如果夏天不會結束，我是不是就能變得勇敢一點？」",
      "Solo script, lyrics and full AI film workflow — GPT Image 2.0 for style frames, Nano Banana Pro for character consistency, Seedance 2.0 for motion.",
    ],
    tools: ["Seedance 2.0", "Nano Banana Pro", "GPT Image 2.0", "AI 影片生成", "敘事編劇"],
    tint: "#F2A7D8",
    link: LINK_FILM,
    linkLabel: ["觀看完整影片", "Watch the Film"],
  },
  {
    kind: "doc", id: "mascot", badgeIcon: "film", no: "V№02",
    tag: ["AI 影像", "AI FILM"],
    title: ["Netflix · moPlus · Uber One 吉祥物 AI 動畫", "Subscription Mascots Animation"],
    sub: ["2025 · AI 角色動畫", "2025 · AI Character Animation"],
    story: [
      "我的貢獻：為訂閱經濟研究中的三大品牌（Netflix、moPlus、Uber One）設計專屬吉祥物角色，並使用 AI 影像生成工具製作簡潔的揮手動畫，賦予品牌生動的視覺形象，讓冰冷的商業分析報告增添趣味性與辨識度。",
      "Designed mascots for Netflix, moPlus & Uber One and generated waving animations — warming up a business report with character.",
    ],
    tools: ["吉祥物設計", "角色動畫", "AI 生成", "品牌形象"],
    tint: "#F9E6A8",
    link: "/影片/nmo.mp4",
    linkLabel: ["觀看影片 MP4", "Watch MP4"],
  },
  {
    kind: "doc", id: "egypt1", badgeIcon: "film", no: "V№03",
    tag: ["影像紀錄", "FOOTAGE"],
    title: ["阿布辛貝神殿壁畫 × 拉美西斯二世博物館紀錄", "Abu Simbel Murals × Museum Footage"],
    sub: ["2026 · 文化影像紀錄", "2026 · Cultural Footage"],
    story: [
      "我的貢獻：將阿布辛貝神殿內部的精緻壁畫、神秘象形文字，以及博物館中拉美西斯二世石像與木乃伊的真實樣貌串聯成具故事性的影像，帶領觀者穿越時空，感受古埃及文明的宏偉與細節。",
      "Murals, hieroglyphs and Ramesses II statues edited into a story-driven journey through ancient Egypt.",
    ],
    tools: ["影像紀錄", "文化遺產"],
    tint: "#D8A86A",
    link: "/影片/egypt1.mp4",
    linkLabel: ["觀看影片 MP4", "Watch MP4"],
  },
  {
    kind: "doc", id: "egypt2", badgeIcon: "film", no: "V№04",
    tag: ["全景影像", "360° VIEW"],
    title: ["阿布辛貝神殿 · 從外觀到內部的全景沉浸式導覽", "Abu Simbel Panoramic Tour"],
    sub: ["2026 · 空間全景紀錄", "2026 · Panoramic Record"],
    story: [
      "我的貢獻：以全景運鏡手法拍攝與剪輯，從神殿宏偉的拉美西斯二世巨像外部廣場，逐步推進至內部聖壇，完整呈現神殿的建築佈局、空間層次與光影變化，打造身歷其境的沉浸式觀看體驗。",
      "Panoramic moves from the colossal façade to the inner sanctuary — architecture, depth and light in one immersive take.",
    ],
    tools: ["全景拍攝", "建築導覽", "沉浸體驗", "空間敘事"],
    tint: "#C9A24B",
    link: "/影片/egypt2.mp4",
    linkLabel: ["觀看影片 MP4", "Watch MP4"],
  },
];

/* ── TRACK C · AI 生成圖片 AI IMAGES（極慢，向左）────────── */
const MJ = ["Midjourney v6"];
export const trackC: GalleryItem[] = [
  {
    kind: "image", id: "i11", img: "/照片/imags/11.png", no: "A№01",
    tag: ["AI 生成圖片", "AI IMAGE"],
    title: ["咖啡廳 · 建築外觀", "Café · Facade"],
    sub: ["時光唱片行-Café 系列", "Time-Record Café Series"],
    story: ["以溫暖木質與柔和光影，營造舒適的咖啡廳氛圍。", "Warm wood and soft light for a cozy café atmosphere."],
    tools: MJ, tint: "#D8A86A",
  },
  {
    kind: "image", id: "i12", img: "/照片/imags/12.png", no: "A№02",
    tag: ["AI 生成圖片", "AI IMAGE"],
    title: ["咖啡廳 · 吧檯設計", "Café · Bar Counter"],
    sub: ["時光唱片行-Café 系列", "Time-Record Café Series"],
    story: ["吧檯區以開放式設計拉近顧客與咖啡師的距離。", "An open bar counter shortens the distance between guest and barista."],
    tools: MJ, tint: "#D8A86A",
  },
  {
    kind: "image", id: "i13", img: "/照片/imags/13.png", no: "A№03",
    tag: ["AI 生成圖片", "AI IMAGE"],
    title: ["咖啡廳 · 內部空間", "Café · Interior"],
    sub: ["時光唱片行-Café 系列", "Time-Record Café Series"],
    story: ["採用復古磁帶與音樂元素，打造沉浸式主題空間。", "Retro cassettes and music elements build an immersive themed space."],
    tools: MJ, tint: "#D8A86A",
  },
  {
    kind: "image", id: "i15", img: "/照片/imags/15.png", no: "A№04",
    tag: ["AI 生成圖片", "AI IMAGE"],
    title: ["咖啡廳 · 餐桌設計", "Café · Table Setting"],
    sub: ["時光唱片行-Café 系列", "Time-Record Café Series"],
    story: ["每張餐桌融入不同年代的音樂故事，創造獨特用餐體驗。", "Each table carries a different decade's music story."],
    tools: MJ, tint: "#D8A86A",
  },
  {
    kind: "image", id: "i16", img: "/照片/imags/16.png", no: "A№05",
    tag: ["AI 生成圖片", "AI IMAGE"],
    title: ["咖啡渣環保杯", "Coffee-Grounds Eco Cup"],
    sub: ["環保設計", "Eco Design"],
    story: ["以咖啡渣循環再利用，傳達永續生活理念。", "Recycled coffee grounds — a tangible take on sustainability."],
    tools: MJ, tint: "#7BC98F",
  },
  {
    kind: "image", id: "i17", img: "/照片/imags/17.png", no: "A№06",
    tag: ["AI 生成圖片", "AI IMAGE"],
    title: ["渲染 · 眼霜", "Render · Eye Cream"],
    sub: ["產品渲染", "Product Render"],
    story: ["以晶瑩剔透的水珠質感，呈現保養品的輕盈與高效。", "Crystal droplet textures express the product's lightness and potency."],
    tools: MJ, tint: "#8F6FC4",
  },
  {
    kind: "image", id: "i18", img: "/照片/imags/18.PNG", no: "A№07",
    tag: ["AI 生成圖片", "AI IMAGE"],
    title: ["手作餅乾 · 烘焙攝影", "Handmade Cookies"],
    sub: ["烘焙", "Bakery"],
    story: ["溫暖手作感，傳達「手作的溫度」與食材純粹。", "Warm handmade warmth and pure ingredients."],
    tools: MJ, tint: "#E0B64F",
  },
  {
    kind: "image", id: "i19", img: "/照片/imags/19.PNG", no: "A№08",
    tag: ["AI 生成圖片", "AI IMAGE"],
    title: ["餅乾細節 · 微距攝影", "Cookie Macro"],
    sub: ["烘焙", "Bakery"],
    story: ["微距攝影凸顯餅乾的酥脆紋理與金黃色澤。", "Macro shots highlight the crisp texture and golden hue."],
    tools: MJ, tint: "#E0B64F",
  },
  {
    kind: "image", id: "i20", img: "/照片/imags/20.jpeg", no: "A№09",
    tag: ["AI 生成圖片", "AI IMAGE"],
    title: ["磁帶咖啡廳 · 內部空間", "Cassette Café · Interior"],
    sub: ["時光唱片行-Café 系列", "Time-Record Café Series"],
    story: ["以卡帶牆為視覺焦點，復刻 80 年代音樂記憶。", "A cassette feature wall revives 80s music memories."],
    tools: MJ, tint: "#D8A86A",
  },
  {
    kind: "image", id: "i21", img: "/照片/imags/21.PNG", no: "A№10",
    tag: ["AI 生成圖片", "AI IMAGE"],
    title: ["餅乾細節 · 微距攝影", "Cookie Macro"],
    sub: ["烘焙", "Bakery"],
    story: ["細膩呈現手工餅乾的天然食材顆粒感。", "A close look at the natural ingredient grains."],
    tools: MJ, tint: "#E0B64F",
  },
  {
    kind: "image", id: "i22", img: "/照片/imags/22.png", no: "A№11",
    tag: ["AI 生成圖片", "AI IMAGE"],
    title: ["咖啡廳 · 吧檯設計", "Café · Bar Counter"],
    sub: ["時光唱片行-Café 系列", "Time-Record Café Series"],
    story: ["吧檯結合黑膠唱片元素，讓音樂與咖啡交融。", "The counter fuses vinyl elements — where music meets coffee."],
    tools: MJ, tint: "#D8A86A",
  },
  {
    kind: "image", id: "i23", img: "/照片/imags/23.png", no: "A№12",
    tag: ["AI 生成圖片", "AI IMAGE"],
    title: ["印尼鳳梨酥精靈 · 宣傳故事版分鏡圖", "Pineapple-Cake Sprite · Storyboard"],
    sub: ["印尼鳳梨酥", "Indonesian Pineapple Cake"],
    story: ["以精靈角色貫穿品牌故事，強化產品記憶點。", "A sprite character threads the brand story together."],
    tools: MJ, tint: "#F2A7D8",
  },
  {
    kind: "image", id: "i24", img: "/照片/imags/24.png", no: "A№13",
    tag: ["AI 生成圖片", "AI IMAGE"],
    title: ["印尼鳳梨酥精靈", "Pineapple-Cake Sprite"],
    sub: ["印尼鳳梨酥 · 角色設計", "Character Design"],
    story: ["可愛精靈形象傳達「來自印尼的熱情與美味」。", "A cute sprite carrying 'the warmth and flavor of Indonesia'."],
    tools: MJ, tint: "#F2A7D8",
  },
  {
    kind: "image", id: "i25", img: "/照片/imags/25.png", no: "A№14",
    tag: ["AI 生成圖片", "AI IMAGE"],
    title: ["餅乾細節 · 微距攝影", "Cookie Macro"],
    sub: ["烘焙", "Bakery"],
    story: ["手工餅乾的樸實美感，適合溫馨送禮場景。", "Homely charm made for heartfelt gifting."],
    tools: MJ, tint: "#E0B64F",
  },
  {
    kind: "image", id: "i26", img: "/照片/imags/26.png", no: "A№15",
    tag: ["AI 生成圖片", "AI IMAGE"],
    title: ["餅乾細節 · 微距攝影", "Cookie Macro"],
    sub: ["烘焙", "Bakery"],
    story: ["每一片餅乾都是獨一無二的掌心溫度。", "Every cookie is a one-of-a-kind palm-warmed piece."],
    tools: MJ, tint: "#E0B64F",
  },
  {
    kind: "image", id: "i27", img: "/照片/imags/27.png", no: "A№16",
    tag: ["AI 生成圖片", "AI IMAGE"],
    title: ["復古風格 · 人物創作", "Retro Portrait"],
    sub: ["人物創作", "Character Art"],
    story: ["復古穿搭與柔和色調，傳達懷舊優雅氛圍。", "Retro styling in soft tones — nostalgic elegance."],
    tools: MJ, tint: "#B98BD6",
  },
  {
    kind: "image", id: "i28", img: "/照片/imags/28.png", no: "A№17",
    tag: ["AI 生成圖片", "AI IMAGE"],
    title: ["油畫風格 · 女性肖像", "Oil-Painting Portrait"],
    sub: ["人物創作", "Character Art"],
    story: ["以油畫筆觸呈現女性的溫柔與堅毅。", "Oil-painting strokes capture both tenderness and resolve."],
    tools: MJ, tint: "#B98BD6",
  },
  {
    kind: "image", id: "i29", img: "/照片/imags/29.png", no: "A№18",
    tag: ["AI 生成圖片", "AI IMAGE"],
    title: ["油畫風格 · 女性肖像", "Oil-Painting Portrait"],
    sub: ["人物創作", "Character Art"],
    story: ["光影對比凸顯五官立體感，展現藝術性。", "Chiaroscuro sculpts the features with artistry."],
    tools: MJ, tint: "#B98BD6",
  },
  {
    kind: "image", id: "i30", img: "/照片/imags/30.png", no: "A№19",
    tag: ["AI 生成圖片", "AI IMAGE"],
    title: ["古代風格 · 藝術人像", "Classical Portrait"],
    sub: ["人物創作", "Character Art"],
    story: ["古風造型結合傳統美學，傳達東方韻味。", "Classical styling meets traditional aesthetics — an eastern charm."],
    tools: MJ, tint: "#B98BD6",
  },
  {
    kind: "image", id: "i31", img: "/照片/imags/31.png", no: "A№20",
    tag: ["AI 生成圖片", "AI IMAGE"],
    title: ["古代風格 · 藝術人像", "Classical Portrait"],
    sub: ["人物創作", "Character Art"],
    story: ["細膩的髮飾與服裝細節，重現古代仕女風采。", "Intricate hairpins and fabrics revive the classical muse."],
    tools: MJ, tint: "#B98BD6",
  },
  {
    kind: "image", id: "i32", img: "/照片/imags/32.png", no: "A№21",
    tag: ["AI 生成圖片", "AI IMAGE"],
    title: ["古代風格 · 藝術人像", "Classical Portrait"],
    sub: ["人物創作", "Character Art"],
    story: ["水墨風格背景與古典人物相得益彰。", "Ink-wash backdrop and classical figure, perfectly matched."],
    tools: MJ, tint: "#B98BD6",
  },
  {
    kind: "image", id: "i33", img: "/照片/imags/33.png", no: "A№22",
    tag: ["AI 生成圖片", "AI IMAGE"],
    title: ["古代風格 · 藝術人像", "Classical Portrait"],
    sub: ["人物創作", "Character Art"],
    story: ["以淡雅色調呈現古代女子的寧靜與從容。", "Muted tones convey her quiet composure."],
    tools: MJ, tint: "#B98BD6",
  },
];

/* Hero 拍立得用圖（沿用你 repo 既有檔名） */
export const heroShots = [
  "/照片/imags/17.png",
  "/照片/shelly.JPG",
  "/照片/imags/23.png",
];
