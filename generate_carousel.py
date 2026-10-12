import os
import base64
import subprocess
from PIL import Image

CWD = os.path.dirname(os.path.abspath(__file__))
EDGE_PATH = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"

# 1. Base64 Assets
with open(os.path.join(CWD, 'images', 'tagx-logo-white-blue@2x.png'), 'rb') as f:
    logo_b64 = 'data:image/png;base64,' + base64.b64encode(f.read()).decode('utf-8')

with open(os.path.join(CWD, 'images', 'mousepilot-badge.png'), 'rb') as f:
    mp_b64 = 'data:image/png;base64,' + base64.b64encode(f.read()).decode('utf-8')

common_css = """
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
}
body {
    width: 1080px;
    height: 1080px;
    overflow: hidden;
    background: #070B14;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Plus Jakarta Sans', Helvetica, Arial, sans-serif;
    color: #FFFFFF;
    position: relative;
}
.slide-canvas {
    width: 1080px;
    height: 1080px;
    padding: 56px 64px 48px 64px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background: radial-gradient(circle at 50% 36%, #183158 0%, #0D1B30 55%, #070C16 100%);
    position: relative;
    border: 2px solid rgba(61, 116, 182, 0.45);
    box-shadow: inset 0 0 100px rgba(0, 0, 0, 0.7);
}
.top-laser {
    position: absolute;
    top: 0;
    left: 220px;
    right: 220px;
    height: 3px;
    background: linear-gradient(90deg, transparent, #EAC8A6, #3D74B6, transparent);
    box-shadow: 0 0 15px #3D74B6;
}
.header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
}
.brand-group {
    display: flex;
    align-items: center;
    gap: 12px;
}
.brand-logo {
    height: 38px;
    width: auto;
    object-fit: contain;
}
.brand-labs {
    font-size: 24px;
    font-weight: 800;
    color: #EAC8A6;
    letter-spacing: 0.5px;
}
.header-badge {
    display: flex;
    align-items: center;
    gap: 14px;
}
.pill {
    padding: 6px 16px;
    border-radius: 9999px;
    font-size: 13px;
    font-weight: 800;
    letter-spacing: 1.2px;
    text-transform: uppercase;
    background: rgba(61, 116, 182, 0.22);
    border: 1px solid rgba(61, 116, 182, 0.5);
    color: #FBF5DE;
}
.slide-num {
    font-size: 15px;
    font-weight: 800;
    color: #EAC8A6;
    font-family: monospace;
    letter-spacing: 1px;
}
.footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding-top: 18px;
    border-top: 1px solid rgba(255, 255, 255, 0.12);
}
.footer-handle {
    font-size: 15px;
    font-weight: 600;
    color: #94A3B8;
    letter-spacing: 0.5px;
}
.footer-cta {
    font-size: 15px;
    font-weight: 800;
    color: #EAC8A6;
    display: flex;
    align-items: center;
    gap: 6px;
}
"""

# =========================================================================
# SLIDE 1: OFFICIAL COVER & VALUE PROP
# =========================================================================
html_s1 = f"""<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
{common_css}
.hero-box {{
    display: flex;
    flex-direction: column;
    gap: 16px;
}}
.eyebrow {{
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
    font-weight: 800;
    letter-spacing: 2px;
    color: #6EBEFF;
    text-transform: uppercase;
    font-family: monospace;
}}
.hero-h1 {{
    font-size: 64px;
    font-weight: 900;
    line-height: 1.08;
    letter-spacing: -1.5px;
    color: #FFFFFF;
}}
.gradient-text {{
    background: linear-gradient(135deg, #6EBEFF 0%, #3D74B6 45%, #EAC8A6 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}}
.hero-sub {{
    font-size: 20px;
    line-height: 1.45;
    color: #CBD5E1;
    max-width: 900px;
    font-weight: 500;
}}
.stats-grid {{
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 18px;
    margin-top: 8px;
}}
.stat-card {{
    background: rgba(14, 25, 46, 0.85);
    border: 1px solid rgba(61, 116, 182, 0.4);
    border-radius: 20px;
    padding: 24px 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    backdrop-filter: blur(10px);
}}
.stat-card::before {{
    content: '';
    position: absolute;
    top: 0;
    left: 20px;
    right: 20px;
    height: 3px;
    border-radius: 3px;
}}
.stat-1::before {{ background: #3D74B6; box-shadow: 0 0 12px #3D74B6; }}
.stat-2::before {{ background: #DC3C22; box-shadow: 0 0 12px #DC3C22; }}
.stat-3::before {{ background: #34D399; box-shadow: 0 0 12px #34D399; }}
.stat-val {{
    font-size: 38px;
    font-weight: 900;
    line-height: 1;
    margin-bottom: 8px;
}}
.stat-1 .stat-val {{ color: #6EBEFF; }}
.stat-2 .stat-val {{ color: #F87171; }}
.stat-3 .stat-val {{ color: #34D399; }}
.stat-lbl {{
    font-size: 13.5px;
    color: #94A3B8;
    font-weight: 600;
    line-height: 1.35;
}}
</style>
</head>
<body>
<div class="slide-canvas">
    <div class="top-laser"></div>
    <div class="header">
        <div class="brand-group">
            <img class="brand-logo" src="{logo_b64}">
            <span class="brand-labs">Labs<span style="font-size: 14px; vertical-align: top;">™</span></span>
        </div>
        <div class="header-badge">
            <span class="pill">FOUNDER LAUNCH • 2026</span>
            <span class="slide-num">01 / 04</span>
        </div>
    </div>
    <div class="hero-box">
        <div class="eyebrow">⚡ DUAL-ENGINE TECH STUDIO</div>
        <h1 class="hero-h1">
            WE ENGINEER<br>
            <span class="gradient-text">NEXT-GEN SOFTWARE.</span>
        </h1>
        <p class="hero-sub">
            Engineering proprietary in-house software products and high-performance bespoke digital solutions. Founded by ambitious fresher developers.
        </p>
        <div class="stats-grid">
            <div class="stat-card stat-1">
                <div class="stat-val">3</div>
                <div class="stat-lbl">Core Pillars: In-House Products, Bespoke Client Apps &amp; Freelance</div>
            </div>
            <div class="stat-card stat-2">
                <div class="stat-val">100%</div>
                <div class="stat-lbl">Direct Developer Focus: Zero Middlemen or Bloated Agency Layers</div>
            </div>
            <div class="stat-card stat-3">
                <div class="stat-val">v1.0 ⚡</div>
                <div class="stat-lbl">MousePilot™ Flagship Windows Utility Live &amp; Available Now</div>
            </div>
        </div>
    </div>
    <div class="footer">
        <span class="footer-handle">@tagx_lab • tagx-lab.github.io</span>
        <span class="footer-cta">Swipe to explore ➔</span>
    </div>
</div>
</body>
</html>"""

# =========================================================================
# SLIDE 2: THE TRI-FORCE MODEL (WHO WE ARE & HOW WE BUILD)
# =========================================================================
html_s2 = f"""<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
{common_css}
.intro-box {{
    display: flex;
    flex-direction: column;
    gap: 10px;
}}
.section-title {{
    font-size: 48px;
    font-weight: 900;
    line-height: 1.15;
    letter-spacing: -1px;
    color: #FFFFFF;
}}
.section-sub {{
    font-size: 19px;
    line-height: 1.45;
    color: #CBD5E1;
    font-weight: 500;
}}
.pillars-list {{
    display: flex;
    flex-direction: column;
    gap: 16px;
}}
.pillar-card {{
    background: rgba(14, 25, 46, 0.85);
    border: 1px solid rgba(61, 116, 182, 0.35);
    border-radius: 20px;
    padding: 22px 26px;
    display: flex;
    gap: 20px;
    align-items: flex-start;
    position: relative;
    backdrop-filter: blur(10px);
}}
.pillar-card::before {{
    content: '';
    position: absolute;
    left: 0;
    top: 20px;
    bottom: 20px;
    width: 4px;
    border-radius: 4px;
}}
.p-1::before {{ background: #3D74B6; box-shadow: 0 0 10px #3D74B6; }}
.p-2::before {{ background: #DC3C22; box-shadow: 0 0 10px #DC3C22; }}
.p-3::before {{ background: #EAC8A6; box-shadow: 0 0 10px #EAC8A6; }}
.pillar-icon {{
    width: 48px;
    height: 48px;
    border-radius: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 22px;
    flex-shrink: 0;
}}
.p-1 .pillar-icon {{ background: rgba(61, 116, 182, 0.25); border: 1px solid rgba(61, 116, 182, 0.5); }}
.p-2 .pillar-icon {{ background: rgba(220, 60, 34, 0.25); border: 1px solid rgba(220, 60, 34, 0.5); }}
.p-3 .pillar-icon {{ background: rgba(234, 200, 166, 0.25); border: 1px solid rgba(234, 200, 166, 0.5); }}
.pillar-content {{
    display: flex;
    flex-direction: column;
    gap: 6px;
}}
.pillar-head {{
    font-size: 22px;
    font-weight: 800;
    color: #FFFFFF;
    display: flex;
    align-items: center;
    gap: 10px;
}}
.p-badge {{
    font-size: 11px;
    font-weight: 800;
    font-family: monospace;
    padding: 3px 10px;
    border-radius: 6px;
    text-transform: uppercase;
}}
.p-1 .p-badge {{ background: rgba(61, 116, 182, 0.3); color: #6EBEFF; border: 1px solid rgba(61, 116, 182, 0.5); }}
.p-2 .p-badge {{ background: rgba(220, 60, 34, 0.3); color: #FCA5A5; border: 1px solid rgba(220, 60, 34, 0.5); }}
.p-3 .p-badge {{ background: rgba(234, 200, 166, 0.3); color: #EAC8A6; border: 1px solid rgba(234, 200, 166, 0.5); }}
.pillar-desc {{
    font-size: 15.5px;
    color: #94A3B8;
    line-height: 1.45;
    font-weight: 500;
}}
</style>
</head>
<body>
<div class="slide-canvas">
    <div class="top-laser"></div>
    <div class="header">
        <div class="brand-group">
            <img class="brand-logo" src="{logo_b64}">
            <span class="brand-labs">Labs<span style="font-size: 14px; vertical-align: top;">™</span></span>
        </div>
        <div class="header-badge">
            <span class="pill">THE TRI-FORCE MODEL</span>
            <span class="slide-num">02 / 04</span>
        </div>
    </div>
    <div class="intro-box">
        <h2 class="section-title">Who We Are &amp; How We Build.</h2>
        <p class="section-sub">
            Founded by fresher developers who reject cliché agency bloat and AI slop. We ship real, production-ready software with obsessive craft.
        </p>
    </div>
    <div class="pillars-list">
        <div class="pillar-card p-1">
            <div class="pillar-icon">🚀</div>
            <div class="pillar-content">
                <div class="pillar-head">
                    <span>Proprietary In-House Products</span>
                    <span class="p-badge">Force 01</span>
                </div>
                <p class="pillar-desc">
                    We conceive, design, and ship our own standalone tools and applications — starting with our debut release <strong style="color: #6EBEFF;">MousePilot™ v1.0</strong>.
                </p>
            </div>
        </div>
        <div class="pillar-card p-2">
            <div class="pillar-icon">⚡</div>
            <div class="pillar-content">
                <div class="pillar-head">
                    <span>Bespoke Engineering Solutions</span>
                    <span class="p-badge">Force 02</span>
                </div>
                <p class="pillar-desc">
                    Custom digital products, 3D web experiences, and scalable software built from scratch for founders and startups worldwide.
                </p>
            </div>
        </div>
        <div class="pillar-card p-3">
            <div class="pillar-icon">💼</div>
            <div class="pillar-content">
                <div class="pillar-head">
                    <span>Direct Developer Freelance Sprints</span>
                    <span class="p-badge">Force 03</span>
                </div>
                <p class="pillar-desc">
                    High-velocity freelance contracts. Zero agency middlemen — you collaborate directly with the dedicated builder coding your solution.
                </p>
            </div>
        </div>
    </div>
    <div class="footer">
        <span class="footer-handle">@tagx_lab • tagx-lab.github.io</span>
        <span class="footer-cta">Swipe ➔</span>
    </div>
</div>
</body>
</html>"""

# =========================================================================
# SLIDE 3: CAPABILITIES & CORE STACK
# =========================================================================
html_s3 = f"""<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
{common_css}
.intro-box {{
    display: flex;
    flex-direction: column;
    gap: 8px;
}}
.section-title {{
    font-size: 46px;
    font-weight: 900;
    line-height: 1.15;
    letter-spacing: -1px;
    color: #FFFFFF;
}}
.section-sub {{
    font-size: 19px;
    line-height: 1.45;
    color: #CBD5E1;
    font-weight: 500;
}}
.bento-grid {{
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
}}
.bento-card {{
    background: rgba(14, 25, 46, 0.85);
    border: 1px solid rgba(61, 116, 182, 0.35);
    border-radius: 20px;
    padding: 22px 24px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
    backdrop-filter: blur(10px);
}}
.bento-header {{
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 8px;
}}
.bento-icon {{
    font-size: 24px;
}}
.bento-title {{
    font-size: 20px;
    font-weight: 800;
    color: #FFFFFF;
}}
.b-1 .bento-title {{ color: #6EBEFF; }}
.b-2 .bento-title {{ color: #34D399; }}
.b-3 .bento-title {{ color: #EAC8A6; }}
.b-4 .bento-title {{ color: #F87171; }}
.bento-desc {{
    font-size: 14.5px;
    color: #94A3B8;
    line-height: 1.45;
    margin-bottom: 12px;
    font-weight: 500;
}}
.tag-row {{
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    padding-top: 10px;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
}}
.tag {{
    font-size: 11.5px;
    font-weight: 700;
    font-family: monospace;
    padding: 3px 8px;
    border-radius: 6px;
    background: rgba(255, 255, 255, 0.06);
    color: #CBD5E1;
    border: 1px solid rgba(255, 255, 255, 0.1);
}}
</style>
</head>
<body>
<div class="slide-canvas">
    <div class="top-laser"></div>
    <div class="header">
        <div class="brand-group">
            <img class="brand-logo" src="{logo_b64}">
            <span class="brand-labs">Labs<span style="font-size: 14px; vertical-align: top;">™</span></span>
        </div>
        <div class="header-badge">
            <span class="pill">CORE CAPABILITIES</span>
            <span class="slide-num">03 / 04</span>
        </div>
    </div>
    <div class="intro-box">
        <h2 class="section-title">What &amp; All We Do.<br><span style="color: #6EBEFF;">Full-Spectrum Engineering.</span></h2>
        <p class="section-sub">
            From interactive 3D web canvases to native desktop tools and high-concurrency cloud backends.
        </p>
    </div>
    <div class="bento-grid">
        <div class="bento-card b-1">
            <div>
                <div class="bento-header">
                    <span class="bento-icon">🌐</span>
                    <span class="bento-title">3D WebGL Web Experiences</span>
                </div>
                <p class="bento-desc">
                    Fluid Three.js particle systems, 60 FPS physics, and bespoke editorial frontend architectures.
                </p>
            </div>
            <div class="tag-row">
                <span class="tag">Three.js</span>
                <span class="tag">WebGL</span>
                <span class="tag">Tailwind</span>
                <span class="tag">Next.js 15</span>
            </div>
        </div>
        <div class="bento-card b-2">
            <div>
                <div class="bento-header">
                    <span class="bento-icon">💻</span>
                    <span class="bento-title">Native Desktop Software</span>
                </div>
                <p class="bento-desc">
                    High-performance utilities for Windows &amp; macOS with 0% bloat, zero tracking, and clean native packaging.
                </p>
            </div>
            <div class="tag-row">
                <span class="tag">Inno Setup</span>
                <span class="tag">Offline-First</span>
                <span class="tag">Tauri / Electron</span>
            </div>
        </div>
        <div class="bento-card b-3">
            <div>
                <div class="bento-header">
                    <span class="bento-icon">📱</span>
                    <span class="bento-title">Cross-Platform Mobile</span>
                </div>
                <p class="bento-desc">
                    60/120 FPS mobile experiences engineered with tactile haptics, responsive ergonomics &amp; offline sync.
                </p>
            </div>
            <div class="tag-row">
                <span class="tag">Flutter</span>
                <span class="tag">React Native</span>
                <span class="tag">iOS &amp; Android</span>
            </div>
        </div>
        <div class="bento-card b-4">
            <div>
                <div class="bento-header">
                    <span class="bento-icon">⚡</span>
                    <span class="bento-title">Cloud Backends &amp; APIs</span>
                </div>
                <p class="bento-desc">
                    Resilient microservice architectures, ACID databases, secure JWT auth &amp; enterprise rate-limiting.
                </p>
            </div>
            <div class="tag-row">
                <span class="tag">Node / TypeScript</span>
                <span class="tag">PostgreSQL</span>
                <span class="tag">Redis</span>
            </div>
        </div>
    </div>
    <div class="footer">
        <span class="footer-handle">@tagx_lab • tagx-lab.github.io</span>
        <span class="footer-cta">Swipe ➔</span>
    </div>
</div>
</body>
</html>"""

# =========================================================================
# SLIDE 4: CALL TO ACTION & MOUSEPILOT DEBUT
# =========================================================================
html_s4 = f"""<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
{common_css}
.intro-box {{
    display: flex;
    flex-direction: column;
    gap: 8px;
}}
.section-title {{
    font-size: 46px;
    font-weight: 900;
    line-height: 1.15;
    letter-spacing: -1px;
    color: #FFFFFF;
}}
.section-sub {{
    font-size: 19px;
    line-height: 1.45;
    color: #CBD5E1;
    font-weight: 500;
}}
.cta-stack {{
    display: flex;
    flex-direction: column;
    gap: 16px;
}}
.cta-card {{
    background: rgba(14, 25, 46, 0.85);
    border-radius: 20px;
    padding: 22px 24px;
    display: flex;
    gap: 20px;
    align-items: center;
    backdrop-filter: blur(10px);
}}
.c-product {{
    border: 1px solid rgba(52, 211, 153, 0.45);
    background: linear-gradient(135deg, rgba(14, 25, 46, 0.95), rgba(6, 78, 59, 0.25));
}}
.c-service {{
    border: 1px solid rgba(61, 116, 182, 0.45);
    background: linear-gradient(135deg, rgba(14, 25, 46, 0.95), rgba(30, 58, 138, 0.25));
}}
.cta-img {{
    width: 90px;
    height: 90px;
    border-radius: 16px;
    object-fit: cover;
    flex-shrink: 0;
    border: 1px solid rgba(52, 211, 153, 0.4);
    box-shadow: 0 0 20px rgba(52, 211, 153, 0.2);
}}
.cta-service-icon {{
    width: 90px;
    height: 90px;
    border-radius: 16px;
    background: rgba(61, 116, 182, 0.2);
    border: 1px solid rgba(61, 116, 182, 0.4);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 40px;
    flex-shrink: 0;
}}
.cta-details {{
    display: flex;
    flex-direction: column;
    gap: 6px;
}}
.cta-head {{
    font-size: 21px;
    font-weight: 800;
    color: #FFFFFF;
    display: flex;
    align-items: center;
    gap: 8px;
}}
.c-product .cta-head {{ color: #34D399; }}
.c-service .cta-head {{ color: #EAC8A6; }}
.cta-desc {{
    font-size: 14.5px;
    color: #CBD5E1;
    line-height: 1.4;
    font-weight: 500;
}}
.cta-action {{
    font-size: 13.5px;
    font-weight: 800;
    color: #FFFFFF;
    margin-top: 4px;
}}
.big-pill {{
    background: linear-gradient(90deg, #3D74B6 0%, #2563EB 100%);
    border: 1px solid #EAC8A6;
    border-radius: 16px;
    padding: 18px 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    font-size: 20px;
    font-weight: 800;
    color: #FFFFFF;
    box-shadow: 0 10px 30px rgba(37, 99, 235, 0.35);
}}
</style>
</head>
<body>
<div class="slide-canvas">
    <div class="top-laser"></div>
    <div class="header">
        <div class="brand-group">
            <img class="brand-logo" src="{logo_b64}">
            <span class="brand-labs">Labs<span style="font-size: 14px; vertical-align: top;">™</span></span>
        </div>
        <div class="header-badge">
            <span class="pill">START &amp; BUILD WITH US</span>
            <span class="slide-num">04 / 04</span>
        </div>
    </div>
    <div class="intro-box">
        <h2 class="section-title">Start With Us.<br><span style="color: #6EBEFF;">Build With Us.</span></h2>
        <p class="section-sub">
            Experience our debut software release or partner directly with our squad for your next product.
        </p>
    </div>
    <div class="cta-stack">
        <div class="cta-card c-product">
            <img class="cta-img" src="{mp_b64}">
            <div class="cta-details">
                <div class="cta-head">🖱️ MousePilot™ v1.0 (Live Now)</div>
                <p class="cta-desc">
                    Enterprise autonomous cursor keep-alive &amp; anti-sleep utility for Windows. Zero synthetic clicks, instant human yield, 4 kinematic engines &amp; 0.02% CPU.
                </p>
                <div class="cta-action">👉 Free Download &amp; Kinematics Simulator via link in bio!</div>
            </div>
        </div>
        <div class="cta-card c-service">
            <div class="cta-service-icon">🤝</div>
            <div class="cta-details">
                <div class="cta-head">Work With The TAGX Squad</div>
                <p class="cta-desc">
                    Have an ambitious startup idea, 3D experience, or custom app? We take on select freelance contracts with guaranteed rapid turnaround sprints.
                </p>
                <div class="cta-action">👉 DM us on Instagram or submit project brief on website!</div>
            </div>
        </div>
        <div class="big-pill">
            <span>🌐</span>
            <span>Explore Official Portal: tagx-lab.github.io  (Link in Bio)</span>
        </div>
    </div>
    <div class="footer">
        <span class="footer-handle">@tagx_lab • Turn On Notifications 🔔</span>
        <span class="footer-cta">Follow @tagx_lab 🚀</span>
    </div>
</div>
</body>
</html>"""

# Save all 4 HTML files
slides_data = [
    ('slide1.html', html_s1, 'images/carousel-slide-1-cover.png'),
    ('slide2.html', html_s2, 'images/carousel-slide-2-who-we-are.png'),
    ('slide3.html', html_s3, 'images/carousel-slide-3-what-we-build.png'),
    ('slide4.html', html_s4, 'images/carousel-slide-4-launch-cta.png'),
]

for html_file, content, out_png in slides_data:
    html_path = os.path.join(CWD, html_file)
    with open(html_path, 'w', encoding='utf-8') as f:
        f.write(content)
    
    out_path = os.path.join(CWD, out_png)
    file_url = 'file:///' + html_path.replace('\\\\', '/')
    
    # Run Edge headless screenshot
    cmd = [
        EDGE_PATH,
        '--headless=new',
        '--disable-gpu',
        '--hide-scrollbars',
        '--force-device-scale-factor=1',
        f'--screenshot={out_path}',
        '--window-size=1080,1080',
        file_url
    ]
    subprocess.run(cmd, check=True)
    print(f"Rendered: {out_png}")

# Create 4-slide collage overview
im1 = Image.open(os.path.join(CWD, 'images', 'carousel-slide-1-cover.png')).resize((540, 540), Image.Resampling.LANCZOS)
im2 = Image.open(os.path.join(CWD, 'images', 'carousel-slide-2-who-we-are.png')).resize((540, 540), Image.Resampling.LANCZOS)
im3 = Image.open(os.path.join(CWD, 'images', 'carousel-slide-3-what-we-build.png')).resize((540, 540), Image.Resampling.LANCZOS)
im4 = Image.open(os.path.join(CWD, 'images', 'carousel-slide-4-launch-cta.png')).resize((540, 540), Image.Resampling.LANCZOS)

collage = Image.new('RGB', (1080, 1080), (10, 15, 25))
collage.paste(im1, (0, 0))
collage.paste(im2, (540, 0))
collage.paste(im3, (0, 540))
collage.paste(im4, (540, 540))
collage.save(os.path.join(CWD, 'images', 'carousel-showcase-all-slides.png'), 'PNG')
print("Collage generated successfully!")
