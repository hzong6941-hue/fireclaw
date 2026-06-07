'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

/* ============================================
   类型定义
   ============================================ */
interface CaseStudy {
  id: number;
  category: string;
  categoryLabel: string;
  brand: string;
  brandEn: string;
  brandInitial: string;
  project: string;
  description: string;
  tags: string[];
  accent: string;
  featured?: boolean;
  visualGradient: string;
  visualPattern: 'dots' | 'lines' | 'circles' | 'grid';
  results?: string[];
}

/* ============================================
   数据常量
   ============================================ */
const CASE_CATEGORIES = [
  { id: 'all', label: '全部案例' },
  { id: 'brand', label: '品牌营销' },
  { id: 'platform', label: '平台合作' },
  { id: 'tourism', label: '文旅推广' },
  { id: 'ai', label: 'AI创意' },
];

const CASES: CaseStudy[] = [
  {
    id: 1, category: 'brand', categoryLabel: '品牌营销',
    brand: '名创优品', brandEn: 'MINISO', brandInitial: 'M',
    project: '迪士尼盲盒 · 跨境推广',
    description: '以AI技术为核心生产力，结合迪士尼《疯狂动物城》经典IP，生成高质感虚拟人物手持盲盒视频内容，突破传统拍摄局限，高效完成跨境推广素材的规模化输出。',
    tags: ['跨境推广', 'AI视频生成', 'IP联名', '提升曝光'],
    accent: '#FF4D1F', featured: true,
    visualGradient: 'linear-gradient(135deg, #FF4D1F 0%, #FF9A00 100%)',
    visualPattern: 'dots',
    results: ['AI视频生成量提升300%', '跨境曝光量突破5000万+', '素材产出效率翻5倍'],
  },
  {
    id: 2, category: 'brand', categoryLabel: '品牌营销',
    brand: '偌闪女包', brandEn: 'NOXXON', brandInitial: 'N',
    project: '全域营销推广',
    description: '深度绑定NOXXON品牌调性，以全域整合营销为策略核心，覆盖内容种草、数字运营与销售转化全链路。从品牌曝光到用户决策，构建完整的增长闭环，助力品牌在竞争激烈的女包赛道中实现品效合一。',
    tags: ['整合营销', '数字运营', '品牌曝光', '销售转化'],
    accent: '#FF4D1F', featured: true,
    visualGradient: 'linear-gradient(135deg, #E84393 0%, #FD79A8 100%)',
    visualPattern: 'circles',
    results: ['全域曝光增长200%+', '品牌搜索指数翻倍', '销售转化率提升45%'],
  },
  {
    id: 3, category: 'brand', categoryLabel: '品牌营销',
    brand: '深蓝内裤', brandEn: 'LUXE BLUE', brandInitial: 'L',
    project: '产品种草 + 全域投放',
    description: '以数据分析为底层驱动，深度优化投放策略，重构产品视觉表达，从内容种草到全域精准投放，构建高效的销售转化路径，实现品牌声量与销量的双向增长。',
    tags: ['数据分析', '优化策略', '重构视觉', '销售转化'],
    accent: '#FF9A00',
    visualGradient: 'linear-gradient(135deg, #0984E3 0%, #74B9FF 100%)',
    visualPattern: 'lines',
    results: ['CPM降低40%', 'ROI提升3.2倍', '全域阅读量破亿'],
  },
  {
    id: 4, category: 'brand', categoryLabel: '品牌营销',
    brand: '至上元气', brandEn: 'zisoungenki', brandInitial: 'Z',
    project: '全域营销推广',
    description: '围绕品牌核心，以整合营销为策略主轴，覆盖节庆家庭、日常养生、户外运动等多元生活场景，深度渗透目标人群，从品牌曝光到销售转化，构建全链路增长闭环，助力人参饮品类突围。',
    tags: ['整合营销', '数字运营', '品牌曝光', '销售转化'],
    accent: '#FF9A00',
    visualGradient: 'linear-gradient(135deg, #00B894 0%, #55EFC4 100%)',
    visualPattern: 'grid',
    results: ['品牌曝光量增长180%', '全渠道销售额提升60%', '私域用户沉淀15万+'],
  },
  {
    id: 5, category: 'brand', categoryLabel: '品牌营销',
    brand: '喜来鹿精酿', brandEn: 'SHERALOO', brandInitial: 'S',
    project: '品牌宣传 + 电商运营',
    description: '全程借助AI技术完成内容创作，涵盖品牌视觉素材生成、场景化产品图、种草文案撰写等，大幅提升内容产出效率，同时保持高质感的视觉呈现。结合专业的电商运营策略，实现品牌曝光与销售转化的双重目标。',
    tags: ['品牌宣传', '数字运营', '品牌曝光', '销售转化'],
    accent: '#FF9A00',
    visualGradient: 'linear-gradient(135deg, #FDCB6E 0%, #E17055 100%)',
    visualPattern: 'dots',
    results: ['AI内容产出效率提升5倍', '电商月销突破百万', '品牌认知度提升120%'],
  },
  {
    id: 6, category: 'platform', categoryLabel: '平台合作',
    brand: '小红书点点', brandEn: 'RED Diandian', brandInitial: 'R',
    project: '平台推广运营',
    description: '聚焦平台推广运营，围绕「点点AI」的核心功能与使用场景，通过定制化内容策略，在小红书平台进行精准推广，帮助产品快速触达目标用户群体，提升功能认知与活跃使用率。',
    tags: ['定制推广', '内容孵化', '矩阵搭建', '爆款话题'],
    accent: '#6D5CFF',
    visualGradient: 'linear-gradient(135deg, #FF6B6B 0%, #EE5A24 100%)',
    visualPattern: 'circles',
    results: ['小红书话题曝光2000万+', '用户活跃度提升65%', '功能认知度提升80%'],
  },
  {
    id: 7, category: 'platform', categoryLabel: '平台合作',
    brand: '豆包', brandEn: 'Doubao', brandInitial: 'D',
    project: '品牌推广与内容合作',
    description: '围绕豆包APP推广与内容共创展开，深度挖掘豆包在生活场景中的趣味应用，以贴近年轻用户的真实使用场景为切入点，打造具有强代入感与传播力的内容，助力豆包APP在目标人群中快速破圈。',
    tags: ['品牌推广', 'AI创意营销', '内容共创', '份额增长'],
    accent: '#6D5CFF',
    visualGradient: 'linear-gradient(135deg, #6D5CFF 0%, #A29BFE 100%)',
    visualPattern: 'lines',
    results: ['APP下载量增长150%', '内容传播率提升90%', '目标人群触达3亿+'],
  },
  {
    id: 8, category: 'tourism', categoryLabel: '文旅推广',
    brand: '茂名电白文旅', brandEn: 'Dianbai Tourism', brandInitial: 'DB',
    project: '区域文旅推广项目',
    description: '聚焦区域文旅推广，通过系统性的内容策划与多渠道传播，全面提升电白文旅的品牌知名度与市场吸引力，将当地独特的自然风光与文化魅力转化为实际的旅游流量与游客增长。',
    tags: ['内容创作', '策划主题', '游客转化', '提升市场'],
    accent: '#FF9A00',
    visualGradient: 'linear-gradient(135deg, #00CEC9 0%, #55EFC4 100%)',
    visualPattern: 'grid',
    results: ['文旅品牌认知度提升200%', '游客转化增长85%', '全网曝光量破5000万'],
  },
  {
    id: 9, category: 'ai', categoryLabel: 'AI创意',
    brand: 'AI漫剧', brandEn: 'AI Comics', brandInitial: 'AC',
    project: '影视内容特效',
    description: '聚焦影视内容特效制作，充分发挥AI在画面生成、场景渲染与人物塑造上的技术优势，为漫剧内容注入更具冲击力的视觉体验，助力内容在短视频与流媒体平台上实现高效传播。',
    tags: ['AI影像生成', '多题材覆盖', '特效视觉升级', '降本提效'],
    accent: '#6D5CFF',
    visualGradient: 'linear-gradient(135deg, #6D5CFF 0%, #FF4D1F 100%)',
    visualPattern: 'dots',
    results: ['特效制作成本降低60%', '视觉品质评分提升40%', '内容传播效率提升3倍'],
  },
  {
    id: 10, category: 'ai', categoryLabel: 'AI创意',
    brand: 'MCN & 博主', brandEn: 'Valorant Collab', brandInitial: 'V',
    project: '无畏契约道具 · 虚实结合',
    description: '联合MCN机构与头部博主，围绕《无畏契约》游戏新道具发布节点，打造"虚实结合"的创新营销内容。通过AI生成的高质感游戏角色形象与真实博主的Cosplay呈现相互融合，模糊虚拟与现实的边界。',
    tags: ['虚实融合', 'AI形象定制', '博主矩阵', '道具借势'],
    accent: '#6D5CFF',
    visualGradient: 'linear-gradient(135deg, #FF4D1F 0%, #6D5CFF 100%)',
    visualPattern: 'circles',
    results: ['虚实融合内容播放量破亿', '博主矩阵覆盖5000万粉丝', '道具搜索量增长300%'],
  },
];

const SERVICES = [
  { icon: '✦', title: 'AI文案', subtitle: '智能内容创作', desc: '短视频脚本、种草文案、直播话术、商品标题、卖点描述自动生成', color: '#FF4D1F' },
  { icon: '◈', title: 'AI视觉', subtitle: '一键视觉输出', desc: '主图海报、KV设计、产品精修、多场景图一键批量输出', color: '#FF9A00' },
  { icon: '▷', title: 'AI视频', subtitle: '视频智能生产', desc: '短视频批量生成、智能剪辑优化、数字人主播全天候直播', color: '#6D5CFF' },
  { icon: '◎', title: 'AI投放', subtitle: '精准流量获取', desc: '智能选词、精准人群定向、投放数据复盘自动优化', color: '#FF4D1F' },
  { icon: '⬡', title: 'AI数据', subtitle: '数据驱动迭代', desc: '全链路数据监控、竞品分析、增长策略智能迭代', color: '#FF9A00' },
];

const ADVANTAGES = [
  { num: '01', title: '实战操盘', desc: '全真实可验证增长数据，拒绝纸上谈兵，用结果说话', icon: '◆' },
  { num: '02', title: 'AI + 电商双驱动', desc: '利用前沿AI技术提效，结合专业运营落地，确保方案有效', icon: '◇' },
  { num: '03', title: '全链路闭环服务', desc: '内容生产 → 流量获取 → 销售转化 → 用户复购，一站式解决', icon: '○' },
  { num: '04', title: '资源生态雄厚', desc: '整合达人、媒体、供应链一手资源，5000+KOL/MCN，300+供应商', icon: '●' },
];

const BRANDS_ROW1 = ['名创优品', '小红书', '豆包', '菲洛嘉', '比亚迪', 'Babycare', '美的', '卡西欧', '哈佛汽车', 'URBAN REVIVO', '以纯', 'TEENIE WEENIE'];
const BRANDS_ROW2 = ['半亩花田', '宝生园', '雀巢', '佳能', '可口可乐', 'KEEP', '汤臣倍健', '奈雪的茶', '南方航空', '欧派', '花西子', 'Kappa'];
const BRANDS_ROW3 = ['小林制药', '乐扣乐扣', '深蓝内裤', '喜来鹿', '美贺庄园', '宋朝香氛', '英氏', '秋田满满', '爷爷的农场', 'Miimeow', 'CLECT', '大眼橙'];

/* ============================================
   火焰粒子系统
   ============================================ */
function FireParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    const particles: { x: number; y: number; size: number; speedY: number; speedX: number; opacity: number; color: string; life: number; maxLife: number }[] = [];

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener('resize', resize);

    const colors = ['#FF4D1F', '#FF9A00', '#6D5CFF', '#FF6B3D', '#FFB347', '#FF7B54'];

    const createParticle = () => ({
      x: Math.random() * canvas.width,
      y: canvas.height + Math.random() * 100,
      size: Math.random() * 3 + 1,
      speedY: -(Math.random() * 1.5 + 0.5),
      speedX: (Math.random() - 0.5) * 0.8,
      opacity: Math.random() * 0.6 + 0.3,
      color: colors[Math.floor(Math.random() * colors.length)],
      life: 0,
      maxLife: Math.random() * 200 + 100,
    });

    for (let i = 0; i < 80; i++) {
      const p = createParticle();
      p.y = Math.random() * canvas.height;
      p.life = Math.random() * p.maxLife;
      particles.push(p);
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.speedX;
        p.y += p.speedY;
        p.life++;
        p.speedX += (Math.random() - 0.5) * 0.05;
        const lifeRatio = p.life / p.maxLife;
        const alpha = lifeRatio < 0.1 ? p.opacity * (lifeRatio / 0.1) : lifeRatio > 0.7 ? p.opacity * (1 - (lifeRatio - 0.7) / 0.3) : p.opacity;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * (1 - lifeRatio * 0.3), 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, alpha);
        ctx.fill();

        if (p.size > 1.5) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
          const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3);
          gradient.addColorStop(0, p.color);
          gradient.addColorStop(1, 'transparent');
          ctx.fillStyle = gradient;
          ctx.globalAlpha = Math.max(0, alpha * 0.15);
          ctx.fill();
        }

        if (p.life >= p.maxLife) { particles[i] = createParticle(); }
      }
      ctx.globalAlpha = 1;
      animationId = requestAnimationFrame(animate);
    };

    animate();
    return () => { cancelAnimationFrame(animationId); window.removeEventListener('resize', resize); };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }} />;
}

/* ============================================
   IP 吉祥物浮层组件 — 多层虚化背景
   ============================================ */
function MascotLayer({ className, style, opacity = 0.08, blur = 20, animation = 'float', size = 200 }: {
  className?: string;
  style?: React.CSSProperties;
  opacity?: number;
  blur?: number;
  animation?: 'float' | 'float-slow' | 'breath' | 'drift' | 'none';
  size?: number;
}) {
  const animClass = animation === 'float' ? 'animate-mascot-float' :
    animation === 'float-slow' ? 'animate-mascot-float-slow' :
    animation === 'breath' ? 'animate-mascot-breath' :
    animation === 'drift' ? 'animate-mascot-drift' : '';

  return (
    <div
      className={`mascot-layer ${animClass} ${className ?? ''}`}
      style={{
        '--mascot-opacity': opacity,
        opacity,
        filter: `blur(${blur}px)`,
        ...style,
      } as React.CSSProperties}
    >
      <img
        src="/mascot.png"
        alt=""
        width={size}
        height={size}
        style={{ width: size, height: size, objectFit: 'contain' }}
      />
    </div>
  );
}

/* ============================================
   IP 吉祥物装饰小元素
   ============================================ */
function MascotBadge({ size = 48, className = '' }: { size?: number; className?: string }) {
  return (
    <img
      src="/mascot.png"
      alt="火牛IP"
      width={size}
      height={size}
      className={`object-contain opacity-60 hover:opacity-90 transition-opacity duration-500 ${className}`}
      style={{ width: size, height: size }}
    />
  );
}

/* ============================================
   滚动淡入组件
   ============================================ */
function FadeIn({ children, className }: { children: React.ReactNode; className?: string }) {
  const [visible, setVisible] = useState(false);
  const ref = useCallback((node: HTMLDivElement | null) => {
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.unobserve(node); } }, { threshold: 0.12 });
    observer.observe(node);
  }, []);
  return <div ref={ref} className={`fade-up ${visible ? 'visible' : ''} ${className ?? ''}`}>{children}</div>;
}

/* ============================================
   计数动画组件
   ============================================ */
function CountUp({ end, suffix = '', prefix = '', duration = 2000 }: { end: number; suffix?: string; prefix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const observe = useCallback((node: HTMLSpanElement | null) => {
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setStarted(true); observer.unobserve(node); } }, { threshold: 0.3 });
    observer.observe(node);
  }, []);

  useEffect(() => {
    if (!started) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [started, end, duration]);

  return <span ref={observe}>{prefix}{count}{suffix}</span>;
}

/* ============================================
   导航栏
   ============================================ */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { label: '关于我们', href: '#about' },
    { label: '核心优势', href: '#advantages' },
    { label: 'AIGC服务', href: '#services' },
    { label: '案例展示', href: '#cases' },
    { label: '联系我们', href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'nav-scrolled py-3' : 'py-5'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#" className="flex items-center gap-3 group">
          <img src="/logo.png" alt="火牛AIGC" className="h-10 w-auto group-hover:shadow-[0_0_20px_rgba(255,77,31,0.3)] transition-shadow duration-300 rounded" />
        </a>

        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 tracking-wide">{link.label}</a>
          ))}
          <a href="#contact" className="btn-fire text-white text-sm font-semibold px-5 py-2 rounded-full">开始合作</a>
        </div>

        <button className="md:hidden text-foreground p-2" onClick={() => setMobileOpen(!mobileOpen)}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {mobileOpen ? <><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></> : <><line x1="4" y1="7" x2="20" y2="7" /><line x1="4" y1="12" x2="20" y2="12" /><line x1="4" y1="17" x2="20" y2="17" /></>}
          </svg>
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden nav-scrolled mt-2 mx-4 rounded-2xl p-6 flex flex-col gap-4">
          {links.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setMobileOpen(false)} className="text-foreground/80 hover:text-foreground transition-colors text-lg">{link.label}</a>
          ))}
          <a href="#contact" onClick={() => setMobileOpen(false)} className="btn-fire text-white text-center font-semibold px-5 py-3 rounded-full mt-2">开始合作</a>
        </div>
      )}
    </nav>
  );
}

/* ============================================
   Hero 区 — IP 分层背景 + 火焰粒子
   ============================================ */
function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 底色渐变 */}
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse 120% 80% at 50% 40%, rgba(255,77,31,0.08) 0%, transparent 50%), radial-gradient(ellipse 80% 60% at 80% 70%, rgba(109,92,255,0.06) 0%, transparent 50%), radial-gradient(ellipse 100% 100% at 20% 90%, rgba(255,154,0,0.05) 0%, transparent 50%), linear-gradient(170deg, #0A0A14 0%, #0B0F1E 40%, #0D0B18 70%, #0A0A14 100%)',
      }} />

      {/* IP 吉祥物分层背景 — 远景（最虚、最淡） */}
      <MascotLayer
        size={500}
        opacity={0.04}
        blur={60}
        animation="drift"
        className="top-[5%] left-[-8%]"
      />
      {/* IP 吉祥物分层背景 — 中景 */}
      <MascotLayer
        size={350}
        opacity={0.06}
        blur={35}
        animation="float-slow"
        className="bottom-[10%] right-[-5%]"
        style={{ animationDelay: '2s' }}
      />
      {/* IP 吉祥物分层背景 — 前景（稍清晰） */}
      <MascotLayer
        size={250}
        opacity={0.08}
        blur={18}
        animation="float"
        className="top-[30%] right-[8%]"
        style={{ animationDelay: '4s' }}
      />
      {/* IP 吉祥物分层背景 — 近景左下 */}
      <MascotLayer
        size={180}
        opacity={0.05}
        blur={25}
        animation="breath"
        className="bottom-[20%] left-[5%]"
        style={{ animationDelay: '1s' }}
      />

      <FireParticles />

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0A0A14]/20 to-[#0A0A14]" style={{ zIndex: 2 }} />
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* IP + Logo 组合 */}
        <div className="mb-8 flex justify-center items-end gap-4">
          <div className="relative animate-mascot-float">
            <img src="/mascot.png" alt="火牛IP" className="w-24 h-24 md:w-32 md:h-32 object-contain drop-shadow-[0_0_30px_rgba(255,77,31,0.3)]" />
          </div>
          <div className="relative">
            <img src="/logo.png" alt="火牛AIGC" className="w-20 h-20 md:w-28 md:h-28 object-contain" />
            <div className="absolute -inset-8 rounded-full bg-fire-orange/5 blur-3xl" />
          </div>
        </div>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight mb-6">
          <span className="text-gradient-fire">AIGC</span>
          <span className="text-foreground"> + 全域电商</span>
        </h1>
        <p className="text-2xl md:text-4xl font-bold text-foreground/90 mb-4">增长一体化服务商</p>
        <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
          以人工智能重塑内容生产模式，驱动品牌从0到亿的全链路电商增长
        </p>
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {['内容生产', '流量投放', '爆品孵化', '品效合一', '跨境出海'].map((tag) => (
            <span key={tag} className="px-4 py-1.5 text-sm rounded-full border border-fire-orange/20 text-fire-orange/80 bg-fire-orange/5">{tag}</span>
          ))}
        </div>
        <a href="#about" className="inline-flex items-center gap-2 btn-fire text-white font-semibold px-8 py-3.5 rounded-full text-base">
          探索更多
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 3v10M3 8l5-5 5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" transform="rotate(90 8 8)"/></svg>
        </a>
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 opacity-50">
        <span className="text-xs tracking-widest uppercase text-muted-foreground">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-fire-orange to-transparent" />
      </div>
    </section>
  );
}

/* ============================================
   合作品牌 Marquee
   ============================================ */
function BrandMarquee() {
  return (
    <section className="py-16 relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #0A0A14 0%, #0D0B18 50%, #0A0A14 100%)' }}>
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 60% 80% at 50% 50%, rgba(255,77,31,0.03) 0%, transparent 70%)' }} />
      {/* IP 装饰 */}
      <MascotLayer size={120} opacity={0.04} blur={30} animation="breath" className="top-0 right-[15%]" />
      <FadeIn>
        <p className="text-center text-sm text-muted-foreground tracking-widest uppercase mb-10">合作品牌</p>
        {[BRANDS_ROW1, BRANDS_ROW2, BRANDS_ROW3].map((row, i) => (
          <div key={i} className="flex mb-4" style={{ overflow: 'hidden' }}>
            <div className={`flex gap-10 items-center ${i === 1 ? 'animate-marquee-reverse' : 'animate-marquee'}`} style={{ width: 'max-content' }}>
              {[...row, ...row, ...row, ...row].map((brand, j) => (
                <span key={`${brand}-${j}`} className="text-sm md:text-base text-white/25 whitespace-nowrap hover:text-white/60 transition-colors duration-300 cursor-default select-none">{brand}</span>
              ))}
            </div>
          </div>
        ))}
      </FadeIn>
    </section>
  );
}

/* ============================================
   关于我们
   ============================================ */
function AboutSection() {
  const positions = [
    { title: '核心定位', desc: 'AIGC + 全域电商增长一体化服务商，专注技术与实战结合', icon: '◆' },
    { title: '企业使命', desc: '用AI降本增效，用数据驱动品牌增长，实现价值最大化', icon: '◇' },
    { title: '专注领域', desc: 'AI技术 + 电商实战 + 全域流量运营三位一体，打造核心竞争力', icon: '○' },
    { title: '增长定位', desc: '0-1冷启动 · 1-100规模化增长伙伴，全程助力品牌发展', icon: '●' },
  ];

  return (
    <section id="about" className="py-24 md:py-32 relative">
      {/* 背景氛围 */}
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse 70% 50% at 30% 50%, rgba(255,77,31,0.04) 0%, transparent 60%), radial-gradient(ellipse 50% 60% at 80% 30%, rgba(109,92,255,0.03) 0%, transparent 60%), linear-gradient(180deg, #0A0A14 0%, #0B0F1E 50%, #0D0B18 100%)',
      }} />
      {/* IP 分层装饰 */}
      <MascotLayer size={300} opacity={0.04} blur={40} animation="drift" className="top-[10%] right-[-5%]" />
      <MascotLayer size={150} opacity={0.05} blur={20} animation="breath" className="bottom-[15%] left-[3%]" style={{ animationDelay: '3s' }} />

      <div className="relative max-w-7xl mx-auto px-6">
        <FadeIn>
          <p className="text-sm text-fire-orange tracking-widest uppercase mb-4">About Us</p>
          <h2 className="text-3xl md:text-5xl font-black text-foreground mb-6">
            以火焰<span className="text-gradient-fire">点燃智能</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mb-16 leading-relaxed">
            聚焦电商领域的智能增长，率先将AIGC技术融入品牌全链路运营，打破传统内容生产瓶颈，为品牌提供"内容生产—资源匹配—高效转化"的一站式解决方案。
          </p>
        </FadeIn>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {positions.map((item, i) => (
            <FadeIn key={item.title} className={`fade-up-d${i + 1}`}>
              <div className="glass-card glass-card-hover rounded-2xl p-6 h-full relative overflow-hidden group">
                {/* IP 水印 */}
                <div className="absolute -bottom-2 -right-2 opacity-[0.03] pointer-events-none">
                  <img src="/mascot.png" alt="" width={80} height={80} className="object-contain" />
                </div>
                <span className="text-3xl text-fire-orange/60 block mb-4">{item.icon}</span>
                <h3 className="text-lg font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================
   核心优势
   ============================================ */
function AdvantagesSection() {
  return (
    <section id="advantages" className="py-24 md:py-32 relative">
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse 60% 40% at 60% 60%, rgba(255,154,0,0.04) 0%, transparent 60%), linear-gradient(180deg, #0D0B18 0%, #0A0A14 50%, #0B0F1E 100%)',
      }} />
      <MascotLayer size={220} opacity={0.04} blur={30} animation="float-slow" className="top-[20%] left-[8%]" style={{ animationDelay: '1s' }} />

      <div className="relative max-w-7xl mx-auto px-6">
        <FadeIn>
          <p className="text-sm text-fire-orange tracking-widest uppercase mb-4">Why Choose Us</p>
          <h2 className="text-3xl md:text-5xl font-black text-foreground mb-16">
            选择火牛AIGC的<span className="text-gradient-fire">4大理由</span>
          </h2>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-6">
          {ADVANTAGES.map((item, i) => (
            <FadeIn key={item.title} className={`fade-up-d${i + 1}`}>
              <div className="advantage-card glass-card rounded-2xl p-8 h-full relative overflow-hidden group">
                <span className="advantage-number text-7xl font-black text-white/[0.04] absolute top-4 right-6 transition-all duration-500">{item.num}</span>
                <div className="relative">
                  <span className="text-2xl text-fire-orange block mb-4">{item.icon}</span>
                  <h3 className="text-xl font-bold text-foreground mb-3">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
                {/* IP 角落装饰 */}
                <div className="absolute bottom-3 right-3 opacity-[0.03] pointer-events-none">
                  <img src="/mascot.png" alt="" width={50} height={50} className="object-contain" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-fire-orange/0 to-transparent group-hover:via-fire-orange/40 transition-all duration-500" />
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================
   AIGC 服务
   ============================================ */
function ServicesSection() {
  return (
    <section id="services" className="py-24 md:py-32 relative">
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse 80% 50% at 40% 40%, rgba(255,77,31,0.05) 0%, transparent 50%), radial-gradient(ellipse 50% 60% at 70% 70%, rgba(109,92,255,0.04) 0%, transparent 60%), linear-gradient(180deg, #0B0F1E 0%, #0A0A14 50%, #0D0B18 100%)',
      }} />
      <MascotLayer size={280} opacity={0.04} blur={35} animation="drift" className="bottom-[5%] right-[2%]" style={{ animationDelay: '2s' }} />
      <MascotLayer size={140} opacity={0.05} blur={22} animation="float" className="top-[10%] left-[12%]" style={{ animationDelay: '5s' }} />

      <div className="relative max-w-7xl mx-auto px-6">
        <FadeIn>
          <div className="flex items-center gap-3 mb-4">
            <MascotBadge size={36} />
            <p className="text-sm text-fire-orange tracking-widest uppercase">AIGC Services</p>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-foreground mb-4">
            AI工业化内容生产 · <span className="text-gradient-fire">降本增效</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-16">从"手工作坊"升级为"智能工厂"</p>
        </FadeIn>

        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-5">
          {SERVICES.map((svc, i) => (
            <FadeIn key={svc.title} className={`fade-up-d${i + 1}`}>
              <div className="service-card glass-card rounded-2xl p-6 h-full text-center relative overflow-hidden group">
                <div
                  className="service-icon w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-5 text-2xl transition-all duration-500"
                  style={{ background: `${svc.color}15`, color: svc.color, border: `1px solid ${svc.color}30` }}
                >
                  {svc.icon}
                </div>
                <h3 className="text-lg font-bold text-foreground mb-1">{svc.title}</h3>
                <p className="text-xs text-fire-orange/70 mb-3">{svc.subtitle}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{svc.desc}</p>
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-transparent to-transparent group-hover:via-fire-orange/30 transition-all duration-500" />
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================
   案例详情浮层 — 升级版带视觉
   ============================================ */
function CaseDetailOverlay({ caseStudy, onClose }: { caseStudy: CaseStudy | null; onClose: () => void }) {
  if (!caseStudy) return null;

  return (
    <div className="fixed inset-0 z-[60] flex justify-end" onClick={onClose}>
      <div className="case-overlay-backdrop absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div className="case-overlay-panel relative w-full max-w-xl h-full overflow-y-auto" style={{ background: 'linear-gradient(180deg, #0A0A14 0%, #0D0B18 100%)', borderLeft: '1px solid rgba(255,255,255,0.06)' }} onClick={(e) => e.stopPropagation()}>
        {/* 顶部视觉 Banner */}
        <div className="relative h-48 overflow-hidden" style={{ background: caseStudy.visualGradient }}>
          <div className="case-visual-pattern" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-8xl font-black text-white/20 case-visual-icon">{caseStudy.brandInitial}</span>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A14] via-transparent to-transparent" />
          <button onClick={onClose} className="absolute top-4 right-4 w-10 h-10 rounded-full glass-card flex items-center justify-center text-white/70 hover:text-white transition-colors z-10">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><line x1="14" y1="4" x2="4" y2="14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><line x1="4" y1="4" x2="14" y2="14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
          </button>
        </div>

        <div className="p-8 md:p-12 -mt-8 relative">
          <div className="mb-8">
            <span className="inline-block px-3 py-1 text-xs rounded-full border mb-4" style={{ color: caseStudy.accent, borderColor: `${caseStudy.accent}40`, background: `${caseStudy.accent}10` }}>{caseStudy.categoryLabel}</span>
            <h3 className="text-3xl md:text-4xl font-black text-foreground mb-1">{caseStudy.brand}</h3>
            <p className="text-sm text-muted-foreground tracking-wide">{caseStudy.brandEn}</p>
          </div>

          <div className="section-divider mb-8" />

          <div className="mb-8">
            <p className="text-xs text-muted-foreground tracking-widest uppercase mb-2">合作项目</p>
            <p className="text-xl font-bold text-gradient-fire">{caseStudy.project}</p>
          </div>

          <div className="mb-8">
            <p className="text-xs text-muted-foreground tracking-widest uppercase mb-3">项目详情</p>
            <p className="text-foreground/80 leading-[1.8]">{caseStudy.description}</p>
          </div>

          {/* 项目成果 */}
          {caseStudy.results && (
            <div className="mb-8">
              <p className="text-xs text-muted-foreground tracking-widest uppercase mb-3">项目成果</p>
              <div className="space-y-2">
                {caseStudy.results.map((r) => (
                  <div key={r} className="flex items-start gap-2 text-sm text-foreground/70">
                    <span className="text-fire-orange mt-0.5 flex-shrink-0 text-xs">&#9654;</span>
                    {r}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div>
            <p className="text-xs text-muted-foreground tracking-widest uppercase mb-4">服务标签</p>
            <div className="flex flex-wrap gap-2">
              {caseStudy.tags.map((tag) => (
                <span key={tag} className="px-3 py-1.5 text-sm rounded-full border border-white/[0.08] text-foreground/70 bg-white/[0.03]">{tag}</span>
              ))}
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-white/[0.06]">
            <a href="#contact" onClick={onClose} className="btn-fire inline-flex items-center gap-2 text-white font-semibold px-6 py-3 rounded-full">
              咨询类似项目
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================
   案例展示画廊 — 升级版带视觉内容
   ============================================ */
function CasesSection() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedCase, setSelectedCase] = useState<CaseStudy | null>(null);

  const filteredCases = activeCategory === 'all' ? CASES : CASES.filter((c) => c.category === activeCategory);

  return (
    <section id="cases" className="py-24 md:py-32 relative">
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse 70% 50% at 50% 30%, rgba(255,77,31,0.05) 0%, transparent 60%), radial-gradient(ellipse 60% 60% at 80% 80%, rgba(109,92,255,0.03) 0%, transparent 60%), linear-gradient(180deg, #0B0F1E 0%, #0A0A14 50%, #0D0B18 100%)',
      }} />
      {/* IP 分层装饰 */}
      <MascotLayer size={350} opacity={0.03} blur={50} animation="drift" className="top-[5%] left-[-3%]" style={{ animationDelay: '3s' }} />
      <MascotLayer size={200} opacity={0.05} blur={25} animation="float-slow" className="bottom-[10%] right-[5%]" style={{ animationDelay: '1s' }} />

      <div className="relative max-w-7xl mx-auto px-6">
        <FadeIn>
          <div className="flex items-center gap-3 mb-4">
            <MascotBadge size={32} />
            <p className="text-sm text-fire-orange tracking-widest uppercase">Case Studies</p>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-foreground mb-12">
            合作<span className="text-gradient-fire">品牌案例</span>
          </h2>
        </FadeIn>

        {/* 分类筛选 */}
        <FadeIn className="fade-up-d1">
          <div className="flex flex-wrap gap-3 mb-12">
            {CASE_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`filter-tab px-5 py-2 text-sm rounded-full border border-white/[0.08] ${activeCategory === cat.id ? 'active' : 'text-muted-foreground'}`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </FadeIn>

        {/* 案例卡片网格 — 升级版带视觉 Banner */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredCases.map((c, i) => (
            <FadeIn
              key={c.id}
              className={`fade-up-d${Math.min(i + 1, 5)} ${c.featured ? 'md:col-span-1 lg:col-span-1' : ''}`}
            >
              <div className="case-gallery-card glass-card rounded-2xl overflow-hidden h-full" onClick={() => setSelectedCase(c)} style={{ '--case-accent': c.accent } as React.CSSProperties}>
                {/* 视觉 Banner 区 */}
                <div className="case-visual-banner relative h-36 overflow-hidden" style={{ background: c.visualGradient }}>
                  <div className="case-visual-pattern" />
                  {/* 大品牌首字母 */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="case-visual-icon text-6xl md:text-7xl font-black text-white/20 select-none">{c.brandInitial}</span>
                  </div>
                  {/* IP 水印 */}
                  <div className="absolute bottom-2 right-2 opacity-10">
                    <img src="/mascot.png" alt="" width={40} height={40} className="object-contain" />
                  </div>
                  {/* 底部渐变遮罩 */}
                  <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[rgba(10,10,20,0.9)] to-transparent" />
                  {/* 分类标签浮于 Banner 上 */}
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full" style={{ background: c.accent }} />
                    <span className="text-xs tracking-wider uppercase text-white/80 font-medium drop-shadow-lg">{c.categoryLabel}</span>
                  </div>
                </div>

                <div className="case-card-border relative p-6 flex flex-col border border-transparent">
                  {/* 悬停发光 */}
                  <div className="case-card-glow absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500 pointer-events-none" style={{ boxShadow: `0 0 30px ${c.accent}20, inset 0 0 30px ${c.accent}08` }} />

                  {/* 品牌名 */}
                  <h3 className="case-brand-name text-2xl md:text-3xl font-black text-foreground mb-1 transition-colors duration-300">{c.brand}</h3>
                  <p className="text-xs text-muted-foreground mb-4 tracking-wide">{c.brandEn}</p>

                  {/* 项目 */}
                  <p className="text-base font-semibold text-gradient-fire mb-3">{c.project}</p>

                  {/* 描述 */}
                  <p className="text-sm text-muted-foreground leading-relaxed mb-5 flex-1 line-clamp-2">{c.description}</p>

                  {/* 核心成果 */}
                  {c.results && (
                    <div className="mb-4 space-y-1">
                      {c.results.slice(0, 2).map((r) => (
                        <div key={r} className="flex items-center gap-1.5 text-xs text-foreground/50">
                          <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: c.accent }} />
                          <span className="truncate">{r}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* 标签 */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {c.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="px-2.5 py-1 text-xs rounded-md border border-white/[0.06] text-foreground/50 bg-white/[0.02]">{tag}</span>
                    ))}
                  </div>

                  {/* 查看详情 */}
                  <div className="flex items-center gap-1 text-sm text-fire-orange/70 mt-auto">
                    <span>查看详情</span>
                    <svg className="case-arrow w-4 h-4 transition-all duration-300 opacity-0.5" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>

      {/* 案例详情浮层 */}
      <CaseDetailOverlay caseStudy={selectedCase} onClose={() => setSelectedCase(null)} />
    </section>
  );
}

/* ============================================
   数据指标
   ============================================ */
function DataSection() {
  const metrics = [
    { value: 100, suffix: 'x', label: '效率提升', desc: '内容生产效率大幅飞跃，AI驱动快速迭代' },
    { value: 70, suffix: '%', label: '成本优化', desc: '综合运营成本显著降低，实现降本增效目标' },
    { value: 10, suffix: 'x', label: '爆款操盘', desc: '单品牌年流水从1000万到1亿+，10倍增长' },
    { value: 2654, suffix: 'w+', label: '人群资产', desc: '服务总人群超同行95.78%，构建庞大私域池' },
  ];

  return (
    <section className="py-24 md:py-32 relative">
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse 80% 60% at 30% 50%, rgba(255,154,0,0.05) 0%, transparent 50%), linear-gradient(180deg, #0D0B18 0%, #0A0A14 50%, #0B0F1E 100%)',
      }} />
      <MascotLayer size={260} opacity={0.04} blur={35} animation="float-slow" className="top-[15%] right-[3%]" style={{ animationDelay: '4s' }} />

      <div className="relative max-w-7xl mx-auto px-6">
        <FadeIn>
          <p className="text-sm text-fire-orange tracking-widest uppercase mb-4">Impact</p>
          <h2 className="text-3xl md:text-5xl font-black text-foreground mb-16">
            服务客户<span className="text-gradient-fire">核心价值</span>
          </h2>
        </FadeIn>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((m, i) => (
            <FadeIn key={m.label} className={`fade-up-d${i + 1}`}>
              <div className="metric-card glass-card rounded-2xl p-8 text-center h-full relative overflow-hidden">
                {/* IP 角落装饰 */}
                <div className="absolute -top-2 -right-2 opacity-[0.03] pointer-events-none">
                  <img src="/mascot.png" alt="" width={60} height={60} className="object-contain" />
                </div>
                <p className="metric-value text-5xl md:text-6xl font-black text-gradient-fire mb-2 transition-all duration-500">
                  <CountUp end={m.value} suffix={m.suffix} />
                </p>
                <p className="text-lg font-bold text-foreground mb-3">{m.label}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{m.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn className="fade-up-d3">
          <div className="mt-12 glass-card rounded-2xl p-8 md:p-10">
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <p className="text-sm text-muted-foreground mb-2">投放效率</p>
                <p className="text-2xl font-black text-foreground">CPM低至 <span className="text-gradient-fire">4.46</span></p>
                <p className="text-sm text-muted-foreground mt-1">CPE仅0.05，投放效率领先行业均值</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">杠杆效应</p>
                <p className="text-2xl font-black text-foreground"><span className="text-gradient-fire">20w</span> → <span className="text-gradient-fire">1500w</span></p>
                <p className="text-sm text-muted-foreground mt-1">20w投放撬动1500w曝光，杠杆效应显著</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">核心客群</p>
                <p className="text-2xl font-black text-foreground"><span className="text-gradient-fire">18-35岁</span> Z世代</p>
                <p className="text-sm text-muted-foreground mt-1">精准覆盖高消费潜力人群，用户粘性强</p>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ============================================
   全链路服务体系
   ============================================ */
function ServiceFlowSection() {
  const flows = [
    { title: '爆品孵化', desc: '选品 → 内容 → 投放 → 转化，全流程闭环操盘', icon: '◆' },
    { title: '全域运营', desc: '抖音/小红书/天猫/得物及跨境平台，多平台协同流量矩阵', icon: '◇' },
    { title: '品宣联名', desc: '达人/艺人/IP/杂志整合传播，提升品牌声量', icon: '○' },
    { title: '品牌冷启动', desc: '0-1快速起号 + 1-100规模化增长策略', icon: '●' },
  ];

  return (
    <section className="py-24 md:py-32 relative">
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse 60% 50% at 70% 40%, rgba(109,92,255,0.04) 0%, transparent 60%), linear-gradient(180deg, #0B0F1E 0%, #0A0A14 50%, #0D0B18 100%)',
      }} />
      <MascotLayer size={180} opacity={0.05} blur={22} animation="breath" className="top-[8%] left-[5%]" style={{ animationDelay: '2s' }} />

      <div className="relative max-w-7xl mx-auto px-6">
        <FadeIn>
          <p className="text-sm text-fire-orange tracking-widest uppercase mb-4">Full Chain Service</p>
          <h2 className="text-3xl md:text-5xl font-black text-foreground mb-6">
            全链路一站式<span className="text-gradient-fire">增长解决方案</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-16">助力品牌实现从0到100的跨越</p>
        </FadeIn>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {flows.map((f, i) => (
            <FadeIn key={f.title} className={`fade-up-d${i + 1}`}>
              <div className="flow-step glass-card rounded-2xl p-6 h-full border border-transparent relative overflow-hidden">
                <span className="text-2xl text-fire-orange block mb-4">{f.icon}</span>
                <h3 className="text-lg font-bold text-foreground mb-3">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                {/* IP 水印 */}
                <div className="absolute -bottom-1 -right-1 opacity-[0.03] pointer-events-none">
                  <img src="/mascot.png" alt="" width={45} height={45} className="object-contain" />
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* 服务流程示意 */}
        <FadeIn className="fade-up-d3">
          <div className="glass-card rounded-2xl p-6 md:p-8 overflow-x-auto">
            <div className="flex items-center justify-between min-w-[600px] gap-2">
              {['需求诊断', '策略制定', '内容生产', '资源匹配', '投放执行', '数据复盘', '持续优化'].map((step, i) => (
                <div key={step} className="flex items-center gap-2">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-fire-orange/10 border border-fire-orange/30 flex items-center justify-center text-fire-orange text-sm font-bold">{i + 1}</div>
                    <span className="text-xs text-muted-foreground mt-2 whitespace-nowrap">{step}</span>
                  </div>
                  {i < 6 && <svg width="20" height="10" viewBox="0 0 20 10" className="flex-shrink-0 opacity-30"><path d="M0 5h16M12 1l4 4-4 4" stroke="#FF4D1F" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ============================================
   创始人核心战绩
   ============================================ */
function TeamSection() {
  const achievements = [
    { title: '爆款操盘', subtitle: '10倍增长奇迹', items: ['单品牌年流水从1000万 → 1亿+(10倍增长)', 'Clect珂里单品售50w+件，销售额破5000w+', '得物前三、抖音搜索前五，全域曝光10亿+'] },
    { title: '人群资产', subtitle: 'Z世代核心客群', items: ['沉淀总人群2654w+，超同行95.78%', '核心画像：18-35岁高净值Z世代年轻群体', '私域复购率高，用户粘性强，品牌忠诚度显著'] },
    { title: '投放数据', subtitle: '极致ROI与转化', items: ['全域阅读4.1亿，CPM低至4.46，CPE仅0.05', '鲨鱼菲特：20w投放撬动1500w曝光', '菲洛嘉：双十一销售额增长295%，销量涨447倍'] },
    { title: '资源与品宣', subtitle: '顶级IP与达人库', items: ['顶级达人：陶白白、小鱼海棠、谢可寅等头部艺人背书', 'IP联名：巴啦啦小魔仙、铠甲勇士，覆盖全年龄层', '资源库：5000+KOL/MCN、300+供应商，跨境直播转化1:2'] },
  ];

  return (
    <section className="py-24 md:py-32 relative">
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse 70% 50% at 40% 50%, rgba(255,77,31,0.04) 0%, transparent 60%), linear-gradient(180deg, #0D0B18 0%, #0A0A14 50%, #0B0F1E 100%)',
      }} />
      <MascotLayer size={200} opacity={0.04} blur={28} animation="float" className="bottom-[5%] left-[10%]" style={{ animationDelay: '6s' }} />

      <div className="relative max-w-7xl mx-auto px-6">
        <FadeIn>
          <p className="text-sm text-fire-orange tracking-widest uppercase mb-4">Founder Track Record</p>
          <h2 className="text-3xl md:text-5xl font-black text-foreground mb-6">
            创始人<span className="text-gradient-fire">核心战绩</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-16">饰品品类全域操盘专家 — 从千万到亿级的增长实战专家</p>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-6">
          {achievements.map((a, i) => (
            <FadeIn key={a.title} className={`fade-up-d${i + 1}`}>
              <div className="glass-card glass-card-hover rounded-2xl p-8 h-full relative overflow-hidden">
                {/* IP 角落 */}
                <div className="absolute top-4 right-4 opacity-[0.04] pointer-events-none">
                  <img src="/mascot.png" alt="" width={50} height={50} className="object-contain" />
                </div>
                <div className="flex items-baseline gap-3 mb-2">
                  <h3 className="text-xl font-bold text-foreground">{a.title}</h3>
                  <span className="text-sm text-gradient-fire font-semibold">{a.subtitle}</span>
                </div>
                <ul className="space-y-3 mt-4">
                  {a.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground leading-relaxed">
                      <span className="text-fire-orange mt-1 flex-shrink-0">◆</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================
   品牌形象
   ============================================ */
function BrandSection() {
  const colors = [
    { name: '炽焰橙', hex: '#FF4D1F', desc: '火牛之焰' },
    { name: '明橙', hex: '#FF9A00', desc: '火焰最亮处' },
    { name: '深空藏蓝', hex: '#0B0F1E', desc: '午夜宇宙' },
    { name: '电光紫', hex: '#6D5CFF', desc: '数字裂隙之光' },
    { name: '冷灰', hex: '#F2F4F7', desc: '太空舱内壁' },
  ];

  return (
    <section id="brand" className="py-24 md:py-32 relative">
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(255,77,31,0.04) 0%, transparent 60%), linear-gradient(180deg, #0B0F1E 0%, #0A0A14 50%, #0D0B18 100%)',
      }} />
      <MascotLayer size={400} opacity={0.03} blur={50} animation="drift" className="top-[5%] right-[-5%]" style={{ animationDelay: '5s' }} />

      <div className="relative max-w-7xl mx-auto px-6">
        <FadeIn>
          <p className="text-sm text-fire-orange tracking-widest uppercase mb-4">Brand Identity</p>
          <h2 className="text-3xl md:text-5xl font-black text-foreground mb-16">
            品牌<span className="text-gradient-fire">基因</span>
          </h2>
        </FadeIn>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Logo 展示 */}
          <FadeIn className="fade-up-d1">
            <div className="glass-card rounded-2xl p-10 flex flex-col items-center justify-center min-h-[320px] relative overflow-hidden">
              {/* 氛围光 */}
              <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(circle at 50% 50%, rgba(255,77,31,0.06) 0%, transparent 60%)' }} />
              <img src="/logo.png" alt="火牛AIGC Logo" className="w-40 h-40 object-contain mb-6 relative z-10" />
              <p className="text-xl font-bold text-foreground relative z-10">火牛AIGC</p>
              <p className="text-sm text-muted-foreground mt-1 relative z-10">AI-Driven · Innovation · Growth · Connect</p>
              <div className="flex gap-2 mt-4 relative z-10">
                {['AI-DRIVEN', 'INNOVATION', 'GROWTH', 'CONNECT'].map((kw) => (
                  <span key={kw} className="px-2 py-0.5 text-[10px] rounded border border-fire-orange/20 text-fire-orange/60">{kw}</span>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* IP形象 — 升级版带浮动动画 */}
          <FadeIn className="fade-up-d2">
            <div className="glass-card rounded-2xl p-10 flex flex-col items-center justify-center min-h-[320px] relative overflow-hidden">
              {/* 氛围光 */}
              <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(circle at 50% 50%, rgba(109,92,255,0.06) 0%, transparent 60%)' }} />
              <div className="relative z-10 animate-mascot-float">
                <img src="/mascot.png" alt="火牛AIGC IP形象" className="w-60 h-60 object-contain mb-4 drop-shadow-[0_0_40px_rgba(255,77,31,0.2)]" />
              </div>
              <p className="text-lg font-bold text-foreground relative z-10">火牛AIGC IP Mascot</p>
              <p className="text-sm text-muted-foreground mt-1 relative z-10">赛博太空牛 · 数字裂隙中的守护者</p>
            </div>
          </FadeIn>
        </div>

        {/* 品牌色系 */}
        <FadeIn className="fade-up-d3">
          <p className="text-sm text-muted-foreground tracking-widest uppercase mb-6">Brand Colors</p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {colors.map((c) => (
              <div key={c.hex} className="group cursor-default">
                <div className="h-20 rounded-xl mb-3 transition-transform duration-300 group-hover:scale-105" style={{ background: c.hex, boxShadow: `0 4px 20px ${c.hex}40` }} />
                <p className="text-sm font-semibold text-foreground">{c.name}</p>
                <p className="text-xs text-muted-foreground">{c.hex}</p>
                <p className="text-xs text-muted-foreground/60 mt-0.5">{c.desc}</p>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ============================================
   联系我们
   ============================================ */
function ContactSection() {
  return (
    <section id="contact" className="py-24 md:py-32 relative">
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(255,77,31,0.06) 0%, transparent 50%), radial-gradient(ellipse 60% 60% at 80% 80%, rgba(109,92,255,0.04) 0%, transparent 60%), linear-gradient(180deg, #0A0A14 0%, #0D0B18 50%, #0A0A14 100%)',
      }} />
      {/* IP 浮层装饰 */}
      <MascotLayer size={300} opacity={0.05} blur={30} animation="drift" className="top-[10%] left-[5%]" style={{ animationDelay: '1s' }} />
      <MascotLayer size={200} opacity={0.04} blur={25} animation="float-slow" className="bottom-[15%] right-[8%]" style={{ animationDelay: '4s' }} />

      <div className="relative max-w-7xl mx-auto px-6 text-center">
        <FadeIn>
          <div className="flex justify-center mb-6">
            <div className="animate-mascot-float">
              <img src="/mascot.png" alt="火牛IP" className="w-20 h-20 object-contain drop-shadow-[0_0_20px_rgba(255,77,31,0.2)]" />
            </div>
          </div>
          <p className="text-sm text-fire-orange tracking-widest uppercase mb-4">Contact Us</p>
          <h2 className="text-3xl md:text-5xl font-black text-foreground mb-6">
            成为全球领先的<span className="text-gradient-fire">AIGC电商增长引擎</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
            我们相信，每一个好产品都值得被更多人看见。火牛AIGC以技术为引擎，以数据为罗盘，以内容为桥梁，陪伴品牌从0到1走向1到100。
          </p>
        </FadeIn>

        <FadeIn className="fade-up-d1">
          <div className="flex flex-col items-center gap-6 mb-16">
            <a href="tel:18824441222" className="btn-fire text-white font-bold px-10 py-4 rounded-full text-lg inline-flex items-center gap-3">
              预约免费咨询
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M5 1v16M13 1v16M1 5h16M1 13h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
            </a>
            <p className="text-sm text-muted-foreground">欢迎品牌方洽谈合作，免费AIGC电商增长需求咨询</p>
          </div>
        </FadeIn>

        <FadeIn className="fade-up-d2">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="glass-card rounded-xl p-5 text-center">
              <p className="text-xs text-muted-foreground mb-2">联系电话</p>
              <p className="text-foreground font-semibold">18824441222</p>
            </div>
            <div className="glass-card rounded-xl p-5 text-center">
              <p className="text-xs text-muted-foreground mb-2">微信号</p>
              <p className="text-foreground font-semibold">Action1222</p>
            </div>
            <div className="glass-card rounded-xl p-5 text-center">
              <p className="text-xs text-muted-foreground mb-2">邮箱地址</p>
              <p className="text-foreground font-semibold text-sm">huoniuaigc@163.com</p>
            </div>
            <div className="glass-card rounded-xl p-5 text-center">
              <p className="text-xs text-muted-foreground mb-2">公司地址</p>
              <p className="text-foreground font-semibold">广东省广州市</p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ============================================
   页脚
   ============================================ */
function Footer() {
  return (
    <footer style={{ background: '#0A0A14' }}>
      <div className="brand-stripe h-1" />
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src="/logo.png" alt="火牛AIGC" className="h-12 w-auto rounded" />
              <MascotBadge size={36} className="opacity-40" />
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              广州火牛智能物联网有限公司<br />AIGC赋能，让电商增长更高效
            </p>
          </div>
          <div>
            <h4 className="text-sm font-bold text-foreground mb-4 tracking-wider uppercase">核心服务</h4>
            <ul className="space-y-2">
              {['AIGC内容生产', 'KOL资源整合', '全链路增长服务', '品牌冷启动', '跨境出海'].map((s) => (
                <li key={s} className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-default">{s}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-bold text-foreground mb-4 tracking-wider uppercase">关于火牛</h4>
            <ul className="space-y-2">
              {['公司介绍', '创始团队', '合作品牌', '联系我们'].map((s) => (
                <li key={s} className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-default">{s}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="section-divider mb-6" />
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">&copy; 2026 广州火牛智能物联网有限公司 · 与你共建智能电商新生态</p>
          <p className="text-xs text-muted-foreground">AI-DRIVEN / INNOVATION / GROWTH / CONNECT</p>
        </div>
      </div>
    </footer>
  );
}

/* ============================================
   主页面
   ============================================ */
export default function Home() {
  return (
    <main className="page-bg min-h-screen">
      <Navbar />
      <HeroSection />
      <BrandMarquee />
      <AboutSection />
      <AdvantagesSection />
      <ServicesSection />
      <CasesSection />
      <DataSection />
      <ServiceFlowSection />
      <TeamSection />
      <BrandSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
