# 项目上下文

## 项目简介

火牛AIGC 官网 — 一家专注于AIGC技术研发与落地的创新企业官网。深色沉浸式设计，大牌高级感，融合火焰粒子动画、毛玻璃卡片、全屏视差叙事。

### 版本技术栈

- **Framework**: Next.js 16 (App Router)
- **Core**: React 19
- **Language**: TypeScript 5
- **UI 组件**: shadcn/ui (基于 Radix UI)
- **Styling**: Tailwind CSS 4

### 品牌色彩

| Token | Hex | 用途 |
|-------|-----|------|
| 炽焰橙 | #FF4D1F | 主强调色、CTA |
| 明橙 | #FF9A00 | 渐变终点、悬停态 |
| 深空藏蓝 | #0F1730 | 页面主背景 |
| 电光紫 | #6D5CFF | 次要强调 |
| 冷灰 | #F2F4F7 | 浅色区块背景 |

## 目录结构

```
├── public/                 # 静态资源
├── scripts/                # 构建与启动脚本
├── src/
│   ├── app/
│   │   ├── globals.css     # 全局样式 + 品牌色 + 动画
│   │   ├── layout.tsx      # 根布局
│   │   └── page.tsx        # 首页（全站单页面，含所有区块）
│   ├── components/ui/      # Shadcn UI 组件库
│   ├── hooks/              # 自定义 Hooks
│   ├── lib/                # 工具库
│   │   └── utils.ts        # 通用工具函数 (cn)
│   └── server.ts           # 自定义服务端入口
├── DESIGN.md               # 设计规范
├── next.config.ts          # Next.js 配置
├── package.json            # 项目依赖管理
└── tsconfig.json           # TypeScript 配置
```

- 项目文件默认初始化到 `src/` 目录下。
- 首页采用单页面全屏叙事设计，所有区块在同一 `page.tsx` 中。

## 包管理规范

**仅允许使用 pnpm** 作为包管理器，**严禁使用 npm 或 yarn**。
**常用命令**：
- 安装依赖：`pnpm add <package>`
- 安装开发依赖：`pnpm add -D <package>`
- 安装所有依赖：`pnpm install`
- 移除依赖：`pnpm remove <package>`

## 开发规范

### 编码规范

- 默认按 TypeScript `strict` 心智写代码；优先复用当前作用域已声明的变量、函数、类型和导入，禁止引用未声明标识符或拼错变量名。
- 禁止隐式 `any` 和 `as any`；函数参数、返回值、解构项、事件对象、`catch` 错误在使用前应有明确类型或先完成类型收窄，并清理未使用的变量和导入。

### next.config 配置规范

- 配置的路径不要写死绝对路径，必须使用 path.resolve(__dirname, ...)、import.meta.dirname 或 process.cwd() 动态拼接。

### Hydration 问题防范

1. 严禁在 JSX 渲染逻辑中直接使用 typeof window、Date.now()、Math.random() 等动态数据。**必须使用 'use client' 并配合 useEffect + useState 确保动态内容仅在客户端挂载后渲染**；同时严禁非法 HTML 嵌套（如 <p> 嵌套 <div>）。
2. **禁止使用 head 标签**，优先使用 metadata，详见文档：https://nextjs.org/docs/app/api-reference/functions/generate-metadata
   1. 三方 CSS、字体等资源可在 `globals.css` 中顶部通过 `@import` 引入或使用 next/font
   2. preload, preconnect, dns-prefetch 通过 ReactDOM 的 preload、preconnect、dns-prefetch 方法引入
   3. json-ld 可阅读 https://nextjs.org/docs/app/guides/json-ld

## UI 设计与组件规范 (UI & Styling Standards)

- 模板默认预装核心组件库 `shadcn/ui`，位于`src/components/ui/`目录下
- Next.js 项目**必须默认**采用 shadcn/ui 组件、风格和规范，**除非用户指定用其他的组件和规范。**

## 页面区块说明

首页包含以下区块（自上而下）：
1. **Navbar** — 毛玻璃固定导航栏，滚动后背景加深
2. **HeroSection** — 全屏深色背景 + 火焰粒子Canvas + Logo + Slogan
3. **AboutSection** — 关于我们，双栏布局 + 数据统计卡片
4. **CapabilitiesSection** — 四大核心能力，毛玻璃四宫格卡片
5. **CasesSection** — 案例展示，左侧案例列表 + 右侧详情切换
6. **BrandSection** — 品牌基因，Logo展示 + IP形象 + 品牌色系
7. **ContactSection** — CTA行动号召
8. **Footer** — 品牌色条 + 链接 + 版权
