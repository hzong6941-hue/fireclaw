"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

// ============ 品牌真实数据 (来自 PDF 原文) ============
const BRAND = {
  name: "广州火牛AIGC",
  fullName: "广州火牛智能物联网有限公司",
  slogan: "AIGC + 全域电商增长一体化服务商",
  subSlogan: "以人工智能重塑内容生产模式，驱动品牌从0到亿的全链路电商增长",
  services: ["内容生产", "流量投放", "爆品孵化", "品效合一", "跨境出海"],
  mission: "用AI降本增效，用数据驱动品牌增长，实现价值最大化",
  focus: "AI技术 + 电商实战 + 全域流量运营三位一体",
  growth: "0-1冷启动 · 1-100规模化增长伙伴",
};

const ADVANTAGES = [
  {
    title: "实战操盘",
    desc: "全真实可验证增长数据，拒绝纸上谈兵，用结果说话",
  },
  {
    title: "AI + 电商双驱动",
    desc: "利用前沿AI技术提效，结合专业运营落地，确保方案有效",
  },
  {
    title: "全链路闭环服务",
    desc: "内容生产 - 流量获取 - 销售转化 - 用户复购一站式解决",
  },
  {
    title: "资源生态雄厚",
    desc: "整合达人、媒体、供应链一手资源，为品牌增长强力赋能",
  },
];

const CASES = [
  {
    brand: "名创优品 (MINISO)",
    project: "名创优品迪士尼盲盒·跨境推广",
    desc: "以AI技术为核心生产力，结合迪士尼《疯狂动物城》经典IP，生成高质感虚拟人物手持盲盒视频内容，突破传统拍摄局限，高效完成跨境推广素材的规模化输出。",
    tags: ["跨境推广", "提升曝光", "整合资源", "突破销量"],
    color: "from-[#FF4D1F] to-[#FF9A00]",
  },
  {
    brand: "偌闪女包 (NOXXON)",
    project: "全域营销推广",
    desc: "深度绑定NOXXON品牌调性，以全域整合营销为策略核心，覆盖内容种草、数字运营与销售转化全链路。从品牌曝光到用户决策，构建完整的增长闭环。",
    tags: ["整合营销", "数字运营", "品牌曝光", "销售转化"],
    color: "from-[#6D5CFF] to-[#FF9A00]",
  },
  {
    brand: "深蓝内裤 (LUXE BLUE)",
    project: "产品种草 + 全域投放",
    desc: "以数据分析为底层驱动，深度优化投放策略，重构产品视觉表达，从内容种草到全域精准投放，构建高效的销售转化路径。",
    tags: ["数据分析", "优化策略", "重构视觉", "销售转化"],
    color: "from-[#0F1730] to-[#6D5CFF]",
  },
  {
    brand: "至上元气人参饮",
    project: "全域营销推广",
    desc: "围绕至上元气品牌核心，以整合营销为策略主轴，覆盖节庆家庭、日常养生、户外运动等多元生活场景，深度渗透目标人群。",
    tags: ["整合营销", "数字运营", "品牌曝光", "销售转化"],
    color: "from-[#FF4D1F] to-[#6D5CFF]",
  },
  {
    brand: "喜来鹿东方精酿 (SHERALOO)",
    project: "品牌宣传 + 电商运营",
    desc: "全程借助AI技术完成内容创作，涵盖品牌视觉素材生成、场景化产品图、种草文案撰写等，大幅提升内容产出效率，同时保持高质感的视觉呈现。",
    tags: ["品牌宣传", "数字运营", "品牌曝光", "销售转化"],
    color: "from-[#FF9A00] to-[#FF4D1F]",
  },
  {
    brand: "小红书点点",
    project: "平台推广运营",
    desc: "聚焦平台推广运营，围绕「点点AI」的核心功能与使用场景，通过定制化内容策略，在小红书平台进行精准推广，帮助产品快速触达目标用户群体。",
    tags: ["定制推广", "内容孵化", "矩阵搭建", "爆款话题"],
    color: "from-[#FF4D1F] to-[#6D5CFF]",
  },
  {
    brand: "豆包",
    project: "品牌推广与内容合作",
    desc: "围绕豆包APP推广与内容共创展开，深度挖掘豆包在生活场景中的趣味应用，以贴近年轻用户的真实使用场景为切入点，打造具有强代入感与传播力的内容。",
    tags: ["品牌推广", "AI创意营销", "内容共创", "份额增长"],
    color: "from-[#6D5CFF] to-[#FF4D1F]",
  },
];

const PARTNERS = [
  "名创优品", "小红书", "豆包", "菲洛嘉", "比亚迪", "Babycare", "偌闪",
  "URBAN REVIVO", "本来", "以纯", "TEENIE WEENIE", "GU", "大家乐",
  "CLECT", "HAVAL", "宝生园", "Miimeow", "半亩花田", "四喜财神",
  "奢蓝之家", "美的", "哈佛汽车", "东风启辰", "卡西欧", "宋朝香氛",
  "喜来鹿", "美贺庄园", "至上元气", "HENGE", "baxter", "大眼橙",
  "希诺舒", "Takebebe", "米仓食堂", "英氏", "秋田满满", "爷爷的农场",
  "雀巢", "佳能", "小林制药", "乐扣乐扣", "可口可乐", "KEEP",
  "汤臣倍健", "奈雪的茶", "欧派", "南方航空", "拉芳", "Kappa", "花西子",
];

const SERVICE_FLOW = [
  { step: "01", title: "内容生产", desc: "AI工业化内容生产，降本增效，规模化输出高质感素材" },
  { step: "02", title: "流量获取", desc: "全域投放·资源运营，精准触达目标用户" },
  { step: "03", title: "销售转化", desc: "数据驱动·策略优化，提升转化效率" },
  { step: "04", title: "用户复购", desc: "私域沉淀·持续运营，激活品牌长期价值" },
];

// ============ 工具组件 ============
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function FadeIn({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(40px)",
        transition: `opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 0.9s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// IP 形象作为通透背景层
function MascotBackdrop({ position, size, opacity, rotate, delay = "0s" }: { position: string; size: number; opacity: number; rotate?: number; delay?: string }) {
  return (
    <div
      className="absolute pointer-events-none select-none"
      style={{
        ...parsePosition(position),
        width: size,
        height: size,
        opacity,
        transform: `rotate(${rotate || 0}deg)`,
        animation: `mascotFloat 12s ease-in-out ${delay} infinite`,
        filter: "blur(1px)",
        mixBlendMode: "screen",
      }}
    >
      <Image src="/mascot.png" alt="mascot" width={size} height={size} className="w-full h-full object-contain" />
    </div>
  );
}

function parsePosition(pos: string): React.CSSProperties {
  const parts = pos.split(" ");
  const style: React.CSSProperties = {};
  parts.forEach(p => {
    const [k, v] = p.split(":");
    if (k === "t") style.top = v;
    if (k === "b") style.bottom = v;
    if (k === "l") style.left = v;
    if (k === "r") style.right = v;
  });
  return style;
}

// 火焰粒子画布
function FlameCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;
    
    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * w,
      y: h + Math.random() * 100,
      vx: (Math.random() - 0.5) * 0.5,
      vy: -(Math.random() * 1.5 + 0.5),
      size: Math.random() * 3 + 1,
      color: ["#FF4D1F", "#FF9A00", "#6D5CFF", "#FFD700"][Math.floor(Math.random() * 4)],
      life: 1,
    }));
    
    let raf = 0;
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.005;
        if (p.life <= 0 || p.y < -10) {
          p.x = Math.random() * w;
          p.y = h + 10;
          p.life = 1;
        }
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.life * 0.6;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    
    const onResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", onResize); };
  }, []);
  
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
}

// ============ 主页面 ============
export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [activeCase, setActiveCase] = useState<typeof CASES[0] | null>(null);
  
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  
  return (
    <main className="relative overflow-x-hidden">
      {/* ============== NAVBAR ============== */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "backdrop-blur-2xl bg-[#0A0A14]/80 border-b border-white/5" : ""}`}>
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12">
              <Image src="/logo.png" alt="火牛AIGC" width={48} height={48} className="object-contain" />
            </div>
            <div className="hidden sm:block">
              <div className="text-white font-bold text-lg tracking-wide">火牛AIGC</div>
              <div className="text-white/40 text-[10px] tracking-[0.2em] uppercase">Huoniu AIGC</div>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-10 text-sm text-white/70">
            <a href="#about" className="hover:text-white transition">关于</a>
            <a href="#advantage" className="hover:text-white transition">优势</a>
            <a href="#cases" className="hover:text-white transition">案例</a>
            <a href="#service" className="hover:text-white transition">服务</a>
            <a href="#contact" className="hover:text-white transition">联系</a>
          </div>
          <a href="#contact" className="px-5 py-2 rounded-full bg-gradient-to-r from-[#FF4D1F] to-[#FF9A00] text-white text-sm font-medium hover:shadow-[0_0_30px_rgba(255,77,31,0.5)] transition">
            开始合作
          </a>
        </div>
      </nav>

      {/* ============== HERO ============== */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* 多层径向渐变 */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(255,77,31,0.25),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_80%,rgba(109,92,255,0.2),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(255,154,0,0.1),transparent_70%)]" />
        
        {/* 火焰粒子 */}
        <FlameCanvas />
        
        {/* IP 作为巨型通透背景 */}
        <MascotBackdrop position="t:-5% r:-10%" size={700} opacity={0.08} rotate={-15} delay="0s" />
        <MascotBackdrop position="b:-10% l:-5%" size={500} opacity={0.06} rotate={15} delay="3s" />
        
        {/* 网格 */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)", backgroundSize: "80px 80px" }} />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 grid lg:grid-cols-2 gap-12 items-center">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.02] backdrop-blur-sm mb-8">
              <span className="w-2 h-2 rounded-full bg-[#FF4D1F] animate-pulse" />
              <span className="text-xs text-white/70 tracking-widest">AIGC + 全域电商</span>
            </div>
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-black leading-[0.95] tracking-tight mb-6">
              <span className="block bg-gradient-to-br from-white via-white to-white/60 bg-clip-text text-transparent">
                {BRAND.slogan.split("+")[0]}
              </span>
              <span className="block bg-gradient-to-r from-[#FF4D1F] via-[#FF9A00] to-[#FF4D1F] bg-clip-text text-transparent">
                + {BRAND.slogan.split("+")[1]}
              </span>
            </h1>
            <p className="text-lg md:text-xl text-white/60 max-w-xl leading-relaxed mb-10">
              {BRAND.subSlogan}
            </p>
            <div className="flex flex-wrap gap-3 mb-12">
              {BRAND.services.map((s, i) => (
                <span key={i} className="px-4 py-2 rounded-full text-sm text-white/80 border border-white/10 bg-white/[0.02] backdrop-blur-sm">
                  {s}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-4">
              <a href="#cases" className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-[#FF4D1F] to-[#FF9A00] text-white font-medium shadow-[0_0_40px_rgba(255,77,31,0.4)] hover:shadow-[0_0_60px_rgba(255,77,31,0.6)] transition">
                查看案例
                <span className="group-hover:translate-x-1 transition">→</span>
              </a>
              <a href="#contact" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-white/20 text-white hover:bg-white/5 transition">
                联系我们
              </a>
            </div>
          </FadeIn>
          
          <FadeIn delay={300} className="relative flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-[#FF4D1F]/30 to-[#6D5CFF]/30 blur-3xl rounded-full scale-90" />
              <Image
                src="/mascot.png"
                alt="火牛IP吉祥物"
                width={500}
                height={500}
                className="relative w-full max-w-md h-auto"
                style={{ animation: "heroFloat 6s ease-in-out infinite" }}
                priority
              />
            </div>
          </FadeIn>
        </div>
        
        {/* 向下滚动指示 */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40 text-xs">
          <span>SCROLL</span>
          <div className="w-px h-12 bg-gradient-to-b from-white/40 to-transparent" />
        </div>
      </section>

      {/* ============== 品牌滚动条 ============== */}
      <section className="relative py-20 border-y border-white/5 overflow-hidden">
        <MascotBackdrop position="t:50% l:50%" size={400} opacity={0.04} />
        <div className="flex gap-12 animate-marquee whitespace-nowrap">
          {[...PARTNERS, ...PARTNERS].map((p, i) => (
            <span key={i} className="text-2xl md:text-3xl font-bold text-white/20 hover:text-white/60 transition tracking-wider">
              {p}
            </span>
          ))}
        </div>
      </section>

      {/* ============== 关于公司 ============== */}
      <section id="about" className="relative py-32 overflow-hidden">
        <MascotBackdrop position="t:10% r:-5%" size={600} opacity={0.05} rotate={-10} delay="2s" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_50%,rgba(109,92,255,0.15),transparent_60%)]" />
        
        <div className="relative max-w-7xl mx-auto px-6">
          <FadeIn>
            <div className="text-center mb-20">
              <div className="text-sm tracking-[0.3em] text-[#FF4D1F] mb-4">COMPANY</div>
              <h2 className="text-5xl md:text-6xl font-black mb-6">
                <span className="bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">关于</span>
                <span className="bg-gradient-to-r from-[#FF4D1F] to-[#FF9A00] bg-clip-text text-transparent">{BRAND.name}</span>
              </h2>
              <p className="text-white/50 max-w-2xl mx-auto text-lg">
                {BRAND.fullName} — {BRAND.slogan}
              </p>
            </div>
          </FadeIn>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <FadeIn className="space-y-6">
              <div className="text-xl md:text-2xl text-white/90 leading-relaxed">
                聚焦电商领域的智能增长，率先将AIGC技术融入品牌全链路运营，打破传统内容生产瓶颈，为品牌提供
                <span className="text-[#FF4D1F] font-semibold">「内容生产—资源匹配—高效转化」</span>
                的一站式解决方案。
              </div>
              <div className="space-y-4 pt-6">
                {[
                  { label: "核心定位", value: "AIGC + 全域电商增长一体化服务商，专注技术与实战结合" },
                  { label: "企业使命", value: BRAND.mission },
                  { label: "专注领域", value: BRAND.focus },
                  { label: "增长定位", value: BRAND.growth },
                ].map((item, i) => (
                  <FadeIn key={i} delay={i * 100}>
                    <div className="flex gap-4 items-start p-4 rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-sm hover:border-[#FF4D1F]/30 transition">
                      <div className="w-1 h-12 bg-gradient-to-b from-[#FF4D1F] to-[#FF9A00] rounded-full flex-shrink-0" />
                      <div>
                        <div className="text-xs text-white/40 tracking-widest mb-1">{item.label}</div>
                        <div className="text-white/85 text-sm leading-relaxed">{item.value}</div>
                      </div>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </FadeIn>
            
            <FadeIn delay={300} className="relative">
              <div className="relative aspect-square rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-white/[0.04] to-white/[0.01] backdrop-blur-xl p-8">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,77,31,0.2),transparent_70%)]" />
                <div className="relative h-full flex flex-col items-center justify-center text-center">
                  <div className="w-32 h-32 mb-6 relative">
                    <Image src="/logo.png" alt="logo" fill className="object-contain" />
                  </div>
                  <div className="text-3xl font-black bg-gradient-to-r from-[#FF4D1F] to-[#FF9A00] bg-clip-text text-transparent mb-3">
                    0→1→100
                  </div>
                  <div className="text-white/60 text-sm leading-relaxed max-w-xs">
                    冷启动到规模化增长<br/>全周期赋能品牌价值
                  </div>
                  <div className="mt-8 grid grid-cols-5 gap-2 w-full">
                    {BRAND.services.map((s, i) => (
                      <div key={i} className="text-center py-3 rounded-xl border border-white/10 bg-white/[0.02] text-[10px] text-white/70">
                        {s}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ============== 核心优势 ============== */}
      <section id="advantage" className="relative py-32 overflow-hidden">
        <MascotBackdrop position="b:0 l:50%" size={800} opacity={0.05} rotate={5} delay="1s" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_70%,rgba(255,154,0,0.15),transparent_60%)]" />
        
        <div className="relative max-w-7xl mx-auto px-6">
          <FadeIn>
            <div className="text-center mb-20">
              <div className="text-sm tracking-[0.3em] text-[#FF4D1F] mb-4">ADVANTAGES</div>
              <h2 className="text-5xl md:text-6xl font-black mb-6">
                <span className="bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">选择</span>
                <span className="bg-gradient-to-r from-[#FF4D1F] to-[#FF9A00] bg-clip-text text-transparent">火牛AIGC</span>
                <span className="bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">的 4 大理由</span>
              </h2>
            </div>
          </FadeIn>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {ADVANTAGES.map((adv, i) => (
              <FadeIn key={i} delay={i * 120}>
                <div className="group relative h-full p-8 rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-xl hover:border-[#FF4D1F]/50 transition-all duration-500 hover:-translate-y-2">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#FF4D1F]/0 to-[#FF9A00]/0 group-hover:from-[#FF4D1F]/10 group-hover:to-[#FF9A00]/10 rounded-3xl transition-all duration-500" />
                  <div className="relative">
                    <div className="text-7xl font-black bg-gradient-to-br from-[#FF4D1F] to-[#FF9A00] bg-clip-text text-transparent mb-4 opacity-30 group-hover:opacity-60 transition">
                      0{i + 1}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">{adv.title}</h3>
                    <p className="text-sm text-white/60 leading-relaxed">{adv.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ============== 案例展示 ============== */}
      <section id="cases" className="relative py-32 overflow-hidden">
        <MascotBackdrop position="t:0 r:0" size={500} opacity={0.04} rotate={20} delay="4s" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(109,92,255,0.12),transparent_60%)]" />
        
        <div className="relative max-w-7xl mx-auto px-6">
          <FadeIn>
            <div className="text-center mb-20">
              <div className="text-sm tracking-[0.3em] text-[#FF4D1F] mb-4">CASES</div>
              <h2 className="text-5xl md:text-6xl font-black mb-6">
                <span className="bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">合作品牌</span>
                <span className="bg-gradient-to-r from-[#FF4D1F] to-[#FF9A00] bg-clip-text text-transparent">案例</span>
              </h2>
              <p className="text-white/50 max-w-2xl mx-auto">真实合作品牌 · 真实业务场景 · 真实增长数据</p>
            </div>
          </FadeIn>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CASES.map((c, i) => (
              <FadeIn key={i} delay={i * 80}>
                <button
                  onClick={() => setActiveCase(c)}
                  className="group w-full text-left h-full p-8 rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-xl hover:border-[#FF4D1F]/50 transition-all duration-500 hover:-translate-y-1"
                >
                  <div className={`relative h-40 -mx-8 -mt-8 mb-6 rounded-t-3xl overflow-hidden bg-gradient-to-br ${c.color}`}>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.2),transparent_50%)]" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-7xl font-black text-white/20">{c.brand.charAt(0)}</span>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-3 left-4 text-xs text-white/80 tracking-widest">CASE 0{i + 1}</div>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-1">{c.brand}</h3>
                  <div className="text-xs text-[#FF4D1F] mb-4 tracking-wider">{c.project}</div>
                  <p className="text-sm text-white/55 leading-relaxed mb-5 line-clamp-3">{c.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {c.tags.slice(0, 3).map((t, j) => (
                      <span key={j} className="text-[10px] px-2.5 py-1 rounded-full border border-white/10 text-white/60">
                        {t}
                      </span>
                    ))}
                  </div>
                </button>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ============== 全链路服务 ============== */}
      <section id="service" className="relative py-32 overflow-hidden">
        <MascotBackdrop position="t:20% l:-5%" size={600} opacity={0.05} rotate={-15} delay="2s" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_30%,rgba(255,77,31,0.15),transparent_60%)]" />
        
        <div className="relative max-w-7xl mx-auto px-6">
          <FadeIn>
            <div className="text-center mb-20">
              <div className="text-sm tracking-[0.3em] text-[#FF4D1F] mb-4">SERVICE FLOW</div>
              <h2 className="text-5xl md:text-6xl font-black mb-6">
                <span className="bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">全链路</span>
                <span className="bg-gradient-to-r from-[#FF4D1F] to-[#FF9A00] bg-clip-text text-transparent">服务体系</span>
              </h2>
              <p className="text-white/50 max-w-2xl mx-auto">全链路一站式增长解决方案</p>
            </div>
          </FadeIn>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICE_FLOW.map((s, i) => (
              <FadeIn key={i} delay={i * 100}>
                <div className="relative h-full p-8 rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-xl hover:border-[#6D5CFF]/40 transition-all duration-500 group">
                  <div className="text-5xl font-black bg-gradient-to-br from-[#6D5CFF] to-[#FF4D1F] bg-clip-text text-transparent mb-4">
                    {s.step}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{s.title}</h3>
                  <p className="text-sm text-white/55 leading-relaxed">{s.desc}</p>
                  {i < SERVICE_FLOW.length - 1 && (
                    <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 text-white/20 text-2xl z-10">→</div>
                  )}
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ============== 品牌基因 ============== */}
      <section className="relative py-32 overflow-hidden">
        <MascotBackdrop position="t:0 l:0" size={500} opacity={0.06} rotate={-20} delay="1s" />
        <MascotBackdrop position="b:0 r:0" size={500} opacity={0.06} rotate={20} delay="3s" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(255,154,0,0.12),transparent_60%)]" />
        
        <div className="relative max-w-7xl mx-auto px-6">
          <FadeIn>
            <div className="text-center mb-20">
              <div className="text-sm tracking-[0.3em] text-[#FF4D1F] mb-4">BRAND DNA</div>
              <h2 className="text-5xl md:text-6xl font-black mb-6">
                <span className="bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">品牌</span>
                <span className="bg-gradient-to-r from-[#FF4D1F] to-[#FF9A00] bg-clip-text text-transparent">基因</span>
              </h2>
            </div>
          </FadeIn>
          
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <FadeIn>
              <div className="relative aspect-square rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-white/[0.04] to-white/[0.01] backdrop-blur-xl p-12 flex items-center justify-center">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,77,31,0.2),transparent_70%)]" />
                <div className="relative w-3/4 h-3/4">
                  <Image src="/logo.png" alt="logo" fill className="object-contain" style={{ animation: "float 6s ease-in-out infinite" }} />
                </div>
              </div>
              <div className="text-center mt-4 text-sm text-white/40 tracking-widest">BRAND LOGO</div>
            </FadeIn>
            
            <FadeIn delay={200}>
              <div className="relative aspect-square rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-white/[0.04] to-white/[0.01] backdrop-blur-xl p-8 flex items-center justify-center">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(109,92,255,0.2),transparent_70%)]" />
                <div className="relative w-full h-full">
                  <Image src="/mascot.png" alt="mascot" fill className="object-contain" style={{ animation: "float 8s ease-in-out infinite" }} />
                </div>
              </div>
              <div className="text-center mt-4 text-sm text-white/40 tracking-widest">IP MASCOT</div>
            </FadeIn>
          </div>
          
          {/* 品牌色 */}
          <FadeIn>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {[
                { name: "炽焰橙", hex: "#FF4D1F" },
                { name: "明橙", hex: "#FF9A00" },
                { name: "深空藏蓝", hex: "#0F1730" },
                { name: "电光紫", hex: "#6D5CFF" },
                { name: "冷灰", hex: "#F2F4F7" },
              ].map((c, i) => (
                <div key={i} className="p-4 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm text-center hover:border-white/30 transition">
                  <div className="w-full h-16 rounded-xl mb-3 border border-white/10" style={{ backgroundColor: c.hex }} />
                  <div className="text-sm font-medium text-white">{c.name}</div>
                  <div className="text-xs text-white/40 mt-1 font-mono">{c.hex}</div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ============== CTA ============== */}
      <section id="contact" className="relative py-32 overflow-hidden">
        <MascotBackdrop position="t:50% l:50%" size={900} opacity={0.06} delay="2s" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(255,77,31,0.25),transparent_60%)]" />
        
        <div className="relative max-w-5xl mx-auto px-6 text-center">
          <FadeIn>
            <div className="text-sm tracking-[0.3em] text-[#FF4D1F] mb-4">LET'S TALK</div>
            <h2 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
              <span className="bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">共创</span>
              <span className="bg-gradient-to-r from-[#FF4D1F] via-[#FF9A00] to-[#FF4D1F] bg-clip-text text-transparent">全域增长</span>
              <br/>
              <span className="bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">新可能</span>
            </h2>
            <p className="text-xl text-white/60 max-w-2xl mx-auto mb-12 leading-relaxed">
              以科技赋能商业，共创未来无限可能<br/>
              与火牛AIGC一起，开启品牌的下一个增长曲线
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="#" className="group inline-flex items-center gap-2 px-10 py-4 rounded-full bg-gradient-to-r from-[#FF4D1F] to-[#FF9A00] text-white font-medium shadow-[0_0_60px_rgba(255,77,31,0.4)] hover:shadow-[0_0_80px_rgba(255,77,31,0.6)] transition text-lg">
                开始合作
                <span className="group-hover:translate-x-1 transition">→</span>
              </a>
            </div>
            <div className="mt-16 text-white/40 text-sm tracking-widest">
              {BRAND.fullName}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ============== FOOTER ============== */}
      <footer className="relative py-12 border-t border-white/5 backdrop-blur-xl bg-[#0A0A14]/50">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10">
              <Image src="/logo.png" alt="logo" fill className="object-contain" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">火牛AIGC</div>
              <div className="text-[10px] text-white/40">广州火牛智能物联网有限公司</div>
            </div>
          </div>
          <div className="text-xs text-white/30 text-center md:text-right">
            © 2025 火牛AIGC · AI-Driven · Innovation · Growth · Connect
          </div>
        </div>
        <div className="h-1 mt-8 bg-gradient-to-r from-[#FF4D1F] via-[#FF9A00] to-[#6D5CFF]" />
      </footer>

      {/* ============== 案例详情弹窗 ============== */}
      {activeCase && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl" onClick={() => setActiveCase(null)}>
          <div className="relative max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-3xl border border-white/10 bg-[#0A0A14] p-8" onClick={e => e.stopPropagation()}>
            <button onClick={() => setActiveCase(null)} className="absolute top-4 right-4 w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:border-white/30 transition">✕</button>
            <div className={`relative h-48 -mx-8 -mt-8 mb-8 rounded-t-3xl overflow-hidden bg-gradient-to-br ${activeCase.color}`}>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-9xl font-black text-white/20">{activeCase.brand.charAt(0)}</span>
              </div>
            </div>
            <h3 className="text-3xl font-black text-white mb-2">{activeCase.brand}</h3>
            <div className="text-sm text-[#FF4D1F] mb-6 tracking-wider">{activeCase.project}</div>
            <p className="text-white/70 leading-relaxed mb-6">{activeCase.desc}</p>
            <div className="flex flex-wrap gap-2">
              {activeCase.tags.map((t, j) => (
                <span key={j} className="text-xs px-3 py-1.5 rounded-full border border-[#FF4D1F]/30 text-[#FF9A00] bg-[#FF4D1F]/5">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
      
      <style jsx global>{`
        @keyframes heroFloat {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(2deg); }
        }
        @keyframes mascotFloat {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(20px, -30px) rotate(3deg); }
          50% { transform: translate(-10px, -20px) rotate(-2deg); }
          75% { transform: translate(15px, -10px) rotate(1deg); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee { animation: marquee 40s linear infinite; }
        .line-clamp-3 { display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
      `}</style>
    </main>
  );
}
