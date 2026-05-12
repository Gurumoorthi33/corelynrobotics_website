# Corelyn Robotics - Design System Quick Reference

## 🎨 Color Palette

### Primary Colors
```css
--accent: #51B8AB          /* Primary Teal */
--accent-dark: #2d9d8f     /* Dark Teal */
--accent-light: #e8f7f5    /* Light Teal */
```

### Neutral Colors
```css
--slate-50: #f8fafc
--slate-100: #f1f5f9
--slate-200: #e2e8f0
--slate-600: #475569
--slate-900: #0f172a
--slate-950: #020617
```

### Usage Guidelines
- **Primary Actions**: `#51B8AB` (buttons, links, highlights)
- **Hover States**: `#3FA89A` (darker teal)
- **Backgrounds**: `#e8f7f5` (light teal for cards)
- **Text**: `#0f172a` (slate-900 for headings), `#475569` (slate-600 for body)

## 📝 Typography

### Font Families
```css
--font-heading: 'DM Sans', sans-serif
--font-body: 'Inter', sans-serif
```

### Font Sizes
```css
/* Headings */
h1: 42px → 64px → 76px (mobile → tablet → desktop)
h2: 36px → 48px → 64px
h3: 22px → 28px → 32px
h4: 18px → 20px → 22px

/* Body */
body: 16px → 18px
small: 13px → 14px
tiny: 11px → 12px
```

### Font Weights
```css
regular: 400
medium: 500
semibold: 600
bold: 700
```

## 📏 Spacing Scale

```css
/* Base unit: 4px */
1 = 4px
2 = 8px
3 = 12px
4 = 16px
5 = 20px
6 = 24px
8 = 32px
10 = 40px
12 = 48px
16 = 64px
20 = 80px
24 = 96px
32 = 128px
```

### Common Patterns
- **Section Padding**: `py-24 md:py-32` (96px → 128px)
- **Card Padding**: `p-6 md:p-8` (24px → 32px)
- **Button Padding**: `px-8 py-4` (32px × 16px)
- **Gap Between Elements**: `gap-4` (16px) or `gap-6` (24px)

## 🎭 Shadows

### Elevation System
```css
/* Subtle */
shadow-sm: 0 4px 24px rgba(15,23,42,0.05)

/* Medium */
shadow-md: 0 8px 32px rgba(15,23,42,0.06)

/* Strong */
shadow-lg: 0 12px 40px rgba(15,23,42,0.08)

/* Accent Glow */
shadow-accent: 0 0 24px rgba(81,184,171,0.4)
shadow-accent-hover: 0 0 32px rgba(81,184,171,0.55)
```

## 🔘 Buttons

### Primary Button
```tsx
<button className="bg-[#51B8AB] text-slate-950 px-8 py-4 rounded-2xl font-bold text-[15px] hover:bg-[#3FA89A] active:scale-95 transition-all shadow-[0_0_24px_rgba(81,184,171,0.4)] hover:shadow-[0_0_32px_rgba(81,184,171,0.55)] focus-visible:ring-2 focus-visible:ring-[#51B8AB] focus-visible:ring-offset-2">
  Primary Action
</button>
```

### Secondary Button
```tsx
<button className="border-2 border-slate-200 text-slate-900 px-8 py-4 rounded-2xl font-bold text-[15px] hover:bg-slate-50 hover:border-slate-300 active:scale-95 transition-all focus-visible:ring-2 focus-visible:ring-[#51B8AB] focus-visible:ring-offset-2">
  Secondary Action
</button>
```

### Ghost Button
```tsx
<button className="text-slate-700 px-6 py-3 rounded-xl font-medium text-[14px] hover:bg-slate-100 active:scale-95 transition-all focus-visible:ring-2 focus-visible:ring-[#51B8AB] focus-visible:ring-offset-2">
  Ghost Action
</button>
```

## 📦 Cards

### Standard Card
```tsx
<div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200/90 shadow-sm hover:shadow-md hover:border-[#51B8AB]/30 transition-all duration-300">
  {/* Content */}
</div>
```

### Feature Card
```tsx
<div className="group bg-white rounded-3xl p-8 border border-slate-200/90 shadow-[0_4px_24px_rgba(15,23,42,0.05)] hover:shadow-[0_12px_40px_rgba(81,184,171,0.12)] hover:border-[#51B8AB]/35 transition-all duration-300">
  {/* Content */}
</div>
```

## 🎬 Animations

### Transitions
```css
/* Standard */
transition-all duration-300

/* Fast */
transition-all duration-200

/* Slow */
transition-all duration-500

/* Easing */
ease-out, ease-in-out, cubic-bezier(0.22, 1, 0.36, 1)
```

### Common Animations
```tsx
/* Fade In Up */
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.5 }}

/* Scale */
whileHover={{ scale: 1.02 }}
whileTap={{ scale: 0.98 }}

/* Slide In */
initial={{ opacity: 0, x: -20 }}
animate={{ opacity: 1, x: 0 }}
```

## 📱 Breakpoints

```css
/* Mobile First */
sm: 640px   /* Small devices */
md: 768px   /* Tablets */
lg: 1024px  /* Laptops */
xl: 1280px  /* Desktops */
2xl: 1536px /* Large screens */
```

### Usage Pattern
```tsx
className="text-[16px] md:text-[18px] lg:text-[20px]"
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
className="px-6 md:px-12"
```

## ♿ Accessibility

### Focus States
```css
focus-visible:ring-2 
focus-visible:ring-[#51B8AB] 
focus-visible:ring-offset-2
```

### ARIA Attributes
```tsx
aria-label="Descriptive label"
aria-expanded={isOpen}
aria-haspopup="true"
role="navigation"
role="menubar"
```

### Semantic HTML
```tsx
<nav> for navigation
<main> for main content
<section> for sections
<article> for articles
<aside> for sidebars
<header> for headers
<footer> for footers
```

## 🎯 Component Patterns

### Section Header
```tsx
<div className="mb-16 text-center">
  <div className="inline-flex items-center gap-2 bg-[#e8f7f5] border border-[#51B8AB]/30 rounded-full px-5 py-2 mb-6">
    <div className="w-2 h-2 rounded-full bg-[#51B8AB] animate-pulse" />
    <span className="text-[12px] font-bold tracking-[0.15em] uppercase text-[#2d9d8f]">
      Section Label
    </span>
  </div>
  <h2 className="font-heading font-bold text-[42px] md:text-[64px] lg:text-[76px] leading-[1.05] text-slate-900 mb-6">
    Section Heading
  </h2>
  <p className="text-[18px] md:text-[22px] text-slate-600 leading-[1.75] max-w-3xl mx-auto">
    Section description
  </p>
</div>
```

### Badge
```tsx
<span className="inline-flex items-center gap-1.5 text-[12px] font-medium text-slate-700 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-full hover:border-[#51B8AB]/40 transition-colors">
  Badge Text
</span>
```

### Icon Container
```tsx
<div className="w-10 h-10 rounded-xl bg-[#e8f7f5] border border-[#51B8AB]/25 flex items-center justify-center text-[#2d9d8f]">
  <Icon className="w-5 h-5" />
</div>
```

## 🔍 Best Practices

### Do's ✅
- Use consistent spacing (multiples of 4px)
- Maintain color contrast ratios > 4.5:1
- Add focus states to all interactive elements
- Use semantic HTML
- Optimize images (WebP, lazy loading)
- Test on mobile devices
- Add loading states
- Include error handling

### Don'ts ❌
- Don't use pure black (#000000)
- Don't skip focus indicators
- Don't use small touch targets (< 44px)
- Don't forget alt text on images
- Don't use color alone to convey information
- Don't animate layout properties (use transforms)
- Don't nest interactive elements

## 📊 Performance Guidelines

### Image Optimization
- Use WebP format
- Lazy load below fold
- Provide width/height
- Use next/image component

### Animation Performance
- Use transform and opacity
- Avoid animating layout properties
- Use will-change sparingly
- Respect prefers-reduced-motion

### Code Splitting
- Dynamic imports for heavy components
- Route-based splitting
- Lazy load modals and dialogs

---

**Last Updated**: 2024
**Version**: 1.0.0
**Maintained by**: Corelyn Robotics Team
