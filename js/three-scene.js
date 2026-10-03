/**
 * TAGX Labs™ — Photorealistic 3D Cybernetic Hacker Laptop & Cosmic Particle Matrix
 * 
 * Engineered Exclusively for the Hero Landing Section with Responsive Multi-Screen Adaptation
 * 
 * Features:
 * - 100% Responsive Adaptive Scaling (Mobile Phones, Tablets, Laptops & 4K Displays)
 * - Touch & Mobile Gyro Parallax Physics
 * - Scoped Exclusively to the Landing Page / Hero Section
 * - Smooth Scroll-Driven 3D Depth & Zero-Gravity Parallax
 * - Auto-pauses on scroll when hero is off-screen for 0% background GPU/CPU overhead
 * - Photorealistic 3D Floating Cybernetic Laptop with High-Performance Metal Shaders
 * - Real-Time Dynamic Green & Black Matrix / Hacker Screen with Live Terminal Stream
 * - 4,000 Interactive Neural Particle Constellation with Fluid Cosmic Wave Turbulence
 */

(function initLanding3DExperience() {
  const container = document.getElementById('three-canvas-container');
  const heroSection = document.getElementById('hero');
  if (!container || typeof THREE === 'undefined') return;

  // 1. Dimensions & Viewport Setup
  function getViewportSize() {
    return {
      width: container.clientWidth || window.innerWidth,
      height: container.clientHeight || window.innerHeight,
    };
  }

  let { width, height } = getViewportSize();

  // Scene & Camera
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 2000);

  // Responsive Camera Distance Setup
  function getResponsiveCameraZ(w) {
    if (w < 480) return 48; // Portrait Mobile
    if (w < 768) return 40; // Large Mobile / Phablet
    if (w < 1024) return 36; // Tablet / Small Laptop
    return 32; // Laptop & Desktop
  }

  camera.position.set(0, 0, getResponsiveCameraZ(width));

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.3;
  container.appendChild(renderer.domElement);

  // 2. Master Group
  const masterGroup = new THREE.Group();
  scene.add(masterGroup);

  // 3. Volumetric Dynamic Lighting with Official TAGX Palette + Cyber Screen Glow
  const ambientLight = new THREE.AmbientLight(0x060f11, 2.8);
  scene.add(ambientLight);

  const pointLight1 = new THREE.PointLight(0x14B1AB, 5.5, 100); // Ocean Cyan Teal
  pointLight1.position.set(22, 16, 20);
  scene.add(pointLight1);

  const pointLight2 = new THREE.PointLight(0xE8505B, 5.0, 80); // Coral Crimson Red
  pointLight2.position.set(-22, -14, 16);
  scene.add(pointLight2);

  const topGlowLight = new THREE.PointLight(0xF9D56E, 3.8, 70); // Golden Yellow Sun
  topGlowLight.position.set(0, 26, 12);
  scene.add(topGlowLight);

  // Screen Green Emissive Light in 3D Space
  const screenGlowLight = new THREE.PointLight(0x00FF88, 4.0, 24);
  screenGlowLight.position.set(0, 2.5, 6);
  masterGroup.add(screenGlowLight);

  // Dynamic Theme Adaptive Lighting (Light Mode: Clean studio metal sheen / Dark Mode: Cyber contrast)
  function applyThemeTo3DScene(theme) {
    const isDark = theme === 'dark';
    if (isDark) {
      ambientLight.color.setHex(0x060f11);
      ambientLight.intensity = 2.8;
      pointLight1.intensity = 5.5;
      pointLight2.intensity = 5.0;
      topGlowLight.intensity = 3.8;
    } else {
      ambientLight.color.setHex(0xd5e6e2);
      ambientLight.intensity = 2.2;
      pointLight1.intensity = 6.2;
      pointLight2.intensity = 5.5;
      topGlowLight.intensity = 4.2;
    }
  }

  window.addEventListener('tagx-theme-changed', (e) => {
    if (e.detail && e.detail.theme) {
      applyThemeTo3DScene(e.detail.theme);
    }
  });

  // Initial theme lighting setup
  const initialIsDark = document.documentElement.classList.contains('dark');
  applyThemeTo3DScene(initialIsDark ? 'dark' : 'light');

  // =========================================================================
  // 4. PROCEDURAL REAL-TIME GREEN & BLACK HACKER SCREEN ENGINE
  // =========================================================================
  const hackerCanvas = document.createElement('canvas');
  hackerCanvas.width = 1024;
  hackerCanvas.height = 640;
  const hCtx = hackerCanvas.getContext('2d');

  // Matrix Rain Columns Setup
  const fontSize = 16;
  const columns = Math.floor(hackerCanvas.width / fontSize);
  const matrixDrops = [];
  const matrixSpeeds = [];
  const matrixChars = '0123456789ABCDEFｦｱｳｴｵｶｷｹｺｻｼｽｾｿﾀﾂﾃﾅﾆﾇﾈﾊﾋﾎﾏﾐﾑﾒﾓﾔﾕﾗﾘﾜ[]{}<>/*+=#$@!%&?~|';

  for (let i = 0; i < columns; i++) {
    matrixDrops[i] = Math.floor(Math.random() * -50);
    matrixSpeeds[i] = 1 + Math.random() * 1.5;
  }

  // Scrolling Terminal Logs Buffer
  const hackerLogs = [
    '> [SYSTEM] INITIALIZING TAGX NEURAL CORE v2.6.0...',
    '> [AUTH] BYPASSING QUANTUM FIREWALL... [OVERRIDE: GRANTED]',
    '> [NETWORK] CONNECTED: 10.244.88.19 (PORT: 443/TLS-AES256)',
    '> [SECURITY] ZERO-DAY BUFFER OVERFLOW: MITIGATED',
    '> [KERNEL] NEURAL SYNAPSE OVERCLOCK: 4.88 GHz // 128 THREADS',
    '> [INJECT] DEPLOYING BESPOKE 3D WEBGL SHADER PACKETS',
    '> [MEMORY] 0x7FFF8A40 -> 64.0 GB ALLOCATED / 0% PACKET LOSS',
    '> [TELEMETRY] DECRYPTING ENCRYPTED DATASTREAM: 99.98% COMPLETE',
    '> [CLOUD] 1,024 NEURAL CLOUD NODES IN ACTIVE SYNCHRONIZATION',
    '> [AI ENGINE] INFERENCE TIME: 0.04ms // HIGH-CONCURRENCY MODE',
    '> [STATUS] TAGX PROPRIETARY PLATFORM RUNNING AT MAXIMUM EFFICIENCY'
  ];

  let frameCounter = 0;

  function renderHackerScreen(time) {
    // 1. Semi-transparent black wash for phosphorescent matrix trails
    hCtx.fillStyle = 'rgba(2, 9, 6, 0.22)';
    hCtx.fillRect(0, 0, hackerCanvas.width, hackerCanvas.height);

    // 2. Matrix Digital Rain Columns
    hCtx.font = `${fontSize}px 'JetBrains Mono', 'Courier New', monospace`;
    for (let i = 0; i < columns; i++) {
      const char = matrixChars[Math.floor(Math.random() * matrixChars.length)];
      const x = i * fontSize;
      const y = matrixDrops[i] * fontSize;

      if (y > 0 && y < hackerCanvas.height) {
        // Glowing bright white/neon green head
        hCtx.fillStyle = '#E8FFE8';
        hCtx.shadowColor = '#00FF88';
        hCtx.shadowBlur = 8;
        hCtx.fillText(char, x, y);

        // Green character behind
        hCtx.fillStyle = '#00FF66';
        hCtx.shadowBlur = 0;
        const prevChar = matrixChars[Math.floor(Math.random() * matrixChars.length)];
        hCtx.fillText(prevChar, x, y - fontSize);
      }

      matrixDrops[i] += matrixSpeeds[i] * 0.7;
      if (matrixDrops[i] * fontSize > hackerCanvas.height && Math.random() > 0.96) {
        matrixDrops[i] = 0;
      }
    }

    // 3. Cyber Terminal Window Frames (Green & Black HUD)
    hCtx.shadowBlur = 0;
    
    // Top Bar Background
    hCtx.fillStyle = 'rgba(2, 18, 12, 0.88)';
    hCtx.fillRect(20, 20, hackerCanvas.width - 40, 36);
    hCtx.strokeStyle = '#00FF88';
    hCtx.lineWidth = 1.5;
    hCtx.strokeRect(20, 20, hackerCanvas.width - 40, 36);

    // Window Dots
    hCtx.fillStyle = '#FF5F56';
    hCtx.beginPath();
    hCtx.arc(38, 38, 5, 0, Math.PI * 2);
    hCtx.fill();
    hCtx.fillStyle = '#FFBD2E';
    hCtx.beginPath();
    hCtx.arc(54, 38, 5, 0, Math.PI * 2);
    hCtx.fill();
    hCtx.fillStyle = '#27C93F';
    hCtx.beginPath();
    hCtx.arc(70, 38, 5, 0, Math.PI * 2);
    hCtx.fill();

    // Title Text
    hCtx.fillStyle = '#00FF88';
    hCtx.font = 'bold 13px "JetBrains Mono", monospace';
    hCtx.fillText('TAGX CYBER TERMINAL v2.6 // ROOT PRIVILEGES ACTIVE', 92, 42);

    // Live Telemetry in Header
    hCtx.fillStyle = '#14B1AB';
    hCtx.font = '11px "JetBrains Mono", monospace';
    hCtx.fillText('CPU: 98.4% | MEM: 14.2GB | AES-GCM-256', hackerCanvas.width - 320, 42);

    // 4. Main Left Terminal Output Window
    const mainBoxWidth = 590;
    const mainBoxHeight = hackerCanvas.height - 84;
    hCtx.fillStyle = 'rgba(1, 14, 8, 0.78)';
    hCtx.fillRect(20, 64, mainBoxWidth, mainBoxHeight);
    hCtx.strokeStyle = 'rgba(0, 255, 136, 0.6)';
    hCtx.strokeRect(20, 64, mainBoxWidth, mainBoxHeight);

    // Terminal Corner Brackets
    const bracketSize = 12;
    hCtx.strokeStyle = '#00FF88';
    hCtx.lineWidth = 2.5;
    // Top-Left
    hCtx.beginPath();
    hCtx.moveTo(20, 64 + bracketSize);
    hCtx.lineTo(20, 64);
    hCtx.lineTo(20 + bracketSize, 64);
    hCtx.stroke();
    // Bottom-Left
    hCtx.beginPath();
    hCtx.moveTo(20, 64 + mainBoxHeight - bracketSize);
    hCtx.lineTo(20, 64 + mainBoxHeight);
    hCtx.lineTo(20 + bracketSize, 64 + mainBoxHeight);
    hCtx.stroke();
    // Bottom-Right
    hCtx.beginPath();
    hCtx.moveTo(20 + mainBoxWidth - bracketSize, 64 + mainBoxHeight);
    hCtx.lineTo(20 + mainBoxWidth, 64 + mainBoxHeight);
    hCtx.lineTo(20 + mainBoxWidth, 64 + mainBoxHeight - bracketSize);
    hCtx.stroke();

    // Render Scrolling Log Lines
    hCtx.font = '13px "JetBrains Mono", monospace';
    const visibleLines = 14;
    const startIdx = Math.floor(frameCounter / 40) % hackerLogs.length;

    for (let i = 0; i < visibleLines; i++) {
      const lineIdx = (startIdx + i) % hackerLogs.length;
      const text = hackerLogs[lineIdx];
      const y = 96 + i * 32;

      if (i === visibleLines - 1) {
        // Active latest prompt line
        hCtx.fillStyle = '#E8FFE8';
        hCtx.shadowColor = '#00FF88';
        hCtx.shadowBlur = 6;
        hCtx.fillText(text, 36, y);
      } else {
        // Normal log lines with alternating emerald glow
        hCtx.fillStyle = (i % 2 === 0) ? '#00FF88' : '#38EF7D';
        hCtx.shadowBlur = 0;
        hCtx.fillText(text, 36, y);
      }
    }

    // Blinking Cyber Cursor
    if (Math.sin(time * 6) > 0) {
      hCtx.fillStyle = '#00FF88';
      hCtx.fillRect(36, 96 + (visibleLines - 1) * 32 + 4, 10, 15);
    }

    // 5. Right HUD Telemetry & Real-Time Cyber Widgets
    const rightX = 622;
    const rightWidth = hackerCanvas.width - rightX - 20;

    // Top Right: Real-time Waveform / Audio Visualizer Bars
    hCtx.fillStyle = 'rgba(1, 14, 8, 0.78)';
    hCtx.fillRect(rightX, 64, rightWidth, 160);
    hCtx.strokeStyle = 'rgba(0, 255, 136, 0.6)';
    hCtx.lineWidth = 1.5;
    hCtx.strokeRect(rightX, 64, rightWidth, 160);

    hCtx.fillStyle = '#00FF88';
    hCtx.font = 'bold 11px "JetBrains Mono", monospace';
    hCtx.fillText('// NEURAL WAVEFORM SPECTRUM', rightX + 14, 86);

    const barCount = 26;
    const barWidth = Math.floor((rightWidth - 28) / barCount) - 3;
    for (let b = 0; b < barCount; b++) {
      const bx = rightX + 14 + b * (barWidth + 3);
      const bHeight = 15 + Math.abs(Math.sin(time * 3 + b * 0.45) * Math.cos(time * 2 + b * 0.3)) * 80;
      
      const grad = hCtx.createLinearGradient(0, 200, 0, 200 - bHeight);
      grad.addColorStop(0, '#005522');
      grad.addColorStop(0.7, '#00FF88');
      grad.addColorStop(1, '#E8FFE8');
      
      hCtx.fillStyle = grad;
      hCtx.fillRect(bx, 204 - bHeight, barWidth, bHeight);
    }

    // Middle Right: Hex Memory Dump Box
    hCtx.fillStyle = 'rgba(1, 14, 8, 0.78)';
    hCtx.fillRect(rightX, 234, rightWidth, 180);
    hCtx.strokeStyle = 'rgba(0, 255, 136, 0.6)';
    hCtx.strokeRect(rightX, 234, rightWidth, 180);

    hCtx.fillStyle = '#00FF88';
    hCtx.font = 'bold 11px "JetBrains Mono", monospace';
    hCtx.fillText('// CORE MEMORY ADDRESS TABLE', rightX + 14, 254);

    hCtx.font = '11px "JetBrains Mono", monospace';
    const hexRows = [
      '0x7FFF8A40: 4F 52 43 41 20 54 41 47',
      '0x7FFF8A48: 58 2D 4E 45 55 52 41 4C',
      '0x7FFF8A50: 2E 4B 45 52 4E 45 4C 21',
      '0x7FFF8A58: 14 B1 AB E8 50 5B F9 D5',
      '0x7FFF8A60: 6E 00 24 88 FF 00 9D EA',
      '0x7FFF8A68: 8A 19 CC B4 90 22 01 EF',
    ];

    hexRows.forEach((row, idx) => {
      hCtx.fillStyle = (idx === 1 || idx === 3) ? '#F9D56E' : '#38EF7D';
      hCtx.fillText(row, rightX + 14, 276 + idx * 22);
    });

    // Bottom Right: Circular Radar Cyber Sweep
    hCtx.fillStyle = 'rgba(1, 14, 8, 0.78)';
    hCtx.fillRect(rightX, 424, rightWidth, hackerCanvas.height - 444);
    hCtx.strokeStyle = 'rgba(0, 255, 136, 0.6)';
    hCtx.strokeRect(rightX, 424, rightWidth, hackerCanvas.height - 444);

    const radarCenterX = rightX + 75;
    const radarCenterY = 516;
    const radarRadius = 55;

    hCtx.strokeStyle = 'rgba(0, 255, 136, 0.4)';
    hCtx.lineWidth = 1;
    hCtx.beginPath();
    hCtx.arc(radarCenterX, radarCenterY, radarRadius, 0, Math.PI * 2);
    hCtx.arc(radarCenterX, radarCenterY, radarRadius * 0.6, 0, Math.PI * 2);
    hCtx.arc(radarCenterX, radarCenterY, radarRadius * 0.25, 0, Math.PI * 2);
    hCtx.stroke();

    // Radar Sweep Line
    const sweepAngle = time * 2.8;
    hCtx.strokeStyle = '#00FF88';
    hCtx.lineWidth = 2;
    hCtx.beginPath();
    hCtx.moveTo(radarCenterX, radarCenterY);
    hCtx.lineTo(
      radarCenterX + Math.cos(sweepAngle) * radarRadius,
      radarCenterY + Math.sin(sweepAngle) * radarRadius
    );
    hCtx.stroke();

    // Radar Metrics next to circle
    hCtx.fillStyle = '#00FF88';
    hCtx.font = 'bold 11px "JetBrains Mono", monospace';
    hCtx.fillText('SECURITY STATUS', rightX + 145, 480);
    hCtx.fillStyle = '#E8FFE8';
    hCtx.fillText('STATUS: LOCKED', rightX + 145, 502);
    hCtx.fillStyle = '#14B1AB';
    hCtx.fillText('NODES: ACTIVE', rightX + 145, 524);
    hCtx.fillStyle = '#F9D56E';
    hCtx.fillText('ZERO EXPLOITS', rightX + 145, 546);

    // Scanline CRT Effect
    hCtx.fillStyle = 'rgba(0, 0, 0, 0.12)';
    for (let s = 0; s < hackerCanvas.height; s += 4) {
      hCtx.fillRect(0, s, hackerCanvas.width, 1.5);
    }

    frameCounter++;
  }

  // Initial draw
  renderHackerScreen(0);
  const screenTexture = new THREE.CanvasTexture(hackerCanvas);
  screenTexture.minFilter = THREE.LinearFilter;
  screenTexture.magFilter = THREE.LinearFilter;

  // =========================================================================
  // 5. PROCEDURAL HIGH-TECH KEYBOARD TEXTURE
  // =========================================================================
  function createKeyboardTexture() {
    const kbCanvas = document.createElement('canvas');
    kbCanvas.width = 512;
    kbCanvas.height = 256;
    const kCtx = kbCanvas.getContext('2d');

    // Base Bed
    kCtx.fillStyle = '#0a1215';
    kCtx.fillRect(0, 0, 512, 256);

    // Keyboard grid keys
    const rows = 5;
    const cols = 14;
    const keyW = 28;
    const keyH = 34;
    const padX = 16;
    const padY = 16;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const kx = padX + c * (keyW + 6);
        const ky = padY + r * (keyH + 12);

        // Keycap body
        kCtx.fillStyle = '#05090b';
        kCtx.fillRect(kx, ky, keyW, keyH);

        // Keycap border with subtle cyan/teal glow
        kCtx.strokeStyle = 'rgba(20, 177, 171, 0.4)';
        kCtx.lineWidth = 1;
        kCtx.strokeRect(kx, ky, keyW, keyH);

        // Key backlight dot
        kCtx.fillStyle = 'rgba(0, 255, 136, 0.6)';
        kCtx.fillRect(kx + 4, ky + keyH - 6, keyW - 8, 2);
      }
    }

    // Spacebar
    kCtx.fillStyle = '#05090b';
    kCtx.fillRect(140, padY + 4 * (keyH + 12), 220, keyH);
    kCtx.strokeStyle = 'rgba(0, 255, 136, 0.8)';
    kCtx.strokeRect(140, padY + 4 * (keyH + 12), 220, keyH);
    kCtx.fillStyle = '#00FF88';
    kCtx.fillRect(160, padY + 4 * (keyH + 12) + keyH - 5, 180, 2);

    return new THREE.CanvasTexture(kbCanvas);
  }

  // =========================================================================
  // 6. BUILD 3D PHOTOREALISTIC HACKER LAPTOP
  // =========================================================================
  const laptopGroup = new THREE.Group();
  masterGroup.add(laptopGroup);

  // Metallic Materials
  const chassisMaterial = new THREE.MeshStandardMaterial({
    color: 0x0c1418,
    metalness: 0.92,
    roughness: 0.22,
    emissive: 0x010809,
  });

  const accentBezelMaterial = new THREE.MeshStandardMaterial({
    color: 0x060b0e,
    metalness: 0.95,
    roughness: 0.18,
  });

  // A. LAPTOP BASE / LOWER CHASSIS
  const baseWidth = 16.0;
  const baseDepth = 10.8;
  const baseHeight = 0.45;
  const baseGeo = new THREE.BoxGeometry(baseWidth, baseHeight, baseDepth);
  const baseMesh = new THREE.Mesh(baseGeo, chassisMaterial);
  laptopGroup.add(baseMesh);

  // Front Edge RGB Lightbar
  const lightbarGeo = new THREE.BoxGeometry(baseWidth - 0.4, 0.08, 0.08);
  const lightbarMat = new THREE.MeshBasicMaterial({ color: 0x00FF9D });
  const lightbarMesh = new THREE.Mesh(lightbarGeo, lightbarMat);
  lightbarMesh.position.set(0, -0.1, baseDepth / 2 + 0.02);
  laptopGroup.add(lightbarMesh);

  // Keyboard Plate & Keys
  const kbGeo = new THREE.PlaneGeometry(13.8, 5.8);
  const kbMat = new THREE.MeshStandardMaterial({
    map: createKeyboardTexture(),
    roughness: 0.4,
    metalness: 0.6,
    emissive: 0x002218,
    emissiveIntensity: 0.5,
  });
  const kbMesh = new THREE.Mesh(kbGeo, kbMat);
  kbMesh.rotation.x = -Math.PI / 2;
  kbMesh.position.set(0, baseHeight / 2 + 0.01, -1.2);
  laptopGroup.add(kbMesh);

  // Trackpad
  const trackpadGeo = new THREE.PlaneGeometry(4.2, 2.8);
  const trackpadMat = new THREE.MeshStandardMaterial({
    color: 0x070e12,
    metalness: 0.85,
    roughness: 0.3,
  });
  const trackpadMesh = new THREE.Mesh(trackpadGeo, trackpadMat);
  trackpadMesh.rotation.x = -Math.PI / 2;
  trackpadMesh.position.set(0, baseHeight / 2 + 0.01, 3.2);
  laptopGroup.add(trackpadMesh);

  // Trackpad Glowing Outline
  const tpOutlineGeo = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(-2.1, 0, -1.4),
    new THREE.Vector3(2.1, 0, -1.4),
    new THREE.Vector3(2.1, 0, 1.4),
    new THREE.Vector3(-2.1, 0, 1.4),
    new THREE.Vector3(-2.1, 0, -1.4),
  ]);
  const tpOutlineMat = new THREE.LineBasicMaterial({ color: 0x14B1AB, transparent: true, opacity: 0.6 });
  const tpOutline = new THREE.Line(tpOutlineGeo, tpOutlineMat);
  tpOutline.position.set(0, baseHeight / 2 + 0.02, 3.2);
  laptopGroup.add(tpOutline);

  // B. LAPTOP LID & HACKER SCREEN
  const lidGroup = new THREE.Group();
  lidGroup.position.set(0, baseHeight / 2, -baseDepth / 2 + 0.2);
  // Tilt screen open at dynamic cyber angle (~105 degrees)
  lidGroup.rotation.x = -Math.PI * 0.08;
  laptopGroup.add(lidGroup);

  const lidHeight = 10.4;
  const lidThickness = 0.36;

  // Screen Bezel / Outer Lid Box
  const lidGeo = new THREE.BoxGeometry(baseWidth, lidHeight, lidThickness);
  const lidMesh = new THREE.Mesh(lidGeo, accentBezelMaterial);
  lidMesh.position.set(0, lidHeight / 2, 0);
  lidGroup.add(lidMesh);

  // SCREEN DISPLAY (HACKER TERMINAL MATRIX)
  const screenWidth = baseWidth - 1.0;
  const screenHeight = lidHeight - 1.0;
  const screenGeo = new THREE.PlaneGeometry(screenWidth, screenHeight);
  const screenMat = new THREE.MeshStandardMaterial({
    map: screenTexture,
    emissiveMap: screenTexture,
    emissive: 0x00FF88,
    emissiveIntensity: 0.95,
    roughness: 0.15,
    metalness: 0.2,
  });
  const screenMesh = new THREE.Mesh(screenGeo, screenMat);
  screenMesh.position.set(0, lidHeight / 2, lidThickness / 2 + 0.02);
  lidGroup.add(screenMesh);

  // Top Camera Notch / Sensor Dot
  const notchGeo = new THREE.CircleGeometry(0.12, 16);
  const notchMat = new THREE.MeshBasicMaterial({ color: 0x00FF88 });
  const notchMesh = new THREE.Mesh(notchGeo, notchMat);
  notchMesh.position.set(0, lidHeight - 0.25, lidThickness / 2 + 0.03);
  lidGroup.add(notchMesh);

  // Back of Lid: Glowing TAGX Logo Insignia
  const logoGeo = new THREE.PlaneGeometry(2.8, 2.8);
  function createTagxLogoTexture() {
    const lCanvas = document.createElement('canvas');
    lCanvas.width = 256;
    lCanvas.height = 256;
    const lCtx = lCanvas.getContext('2d');
    
    lCtx.fillStyle = 'rgba(0,0,0,0)';
    lCtx.clearRect(0, 0, 256, 256);

    const grad = lCtx.createLinearGradient(0, 0, 256, 256);
    grad.addColorStop(0, '#14B1AB');
    grad.addColorStop(0.5, '#E8505B');
    grad.addColorStop(1, '#F9D56E');

    lCtx.fillStyle = grad;
    lCtx.font = '900 110px "Space Grotesk", sans-serif';
    lCtx.textAlign = 'center';
    lCtx.textBaseline = 'middle';
    lCtx.fillText('TX', 128, 128);

    return new THREE.CanvasTexture(lCanvas);
  }

  const logoMat = new THREE.MeshBasicMaterial({
    map: createTagxLogoTexture(),
    transparent: true,
    opacity: 0.9,
    side: THREE.DoubleSide,
  });
  const logoMesh = new THREE.Mesh(logoGeo, logoMat);
  logoMesh.rotation.y = Math.PI;
  logoMesh.position.set(0, lidHeight / 2, -lidThickness / 2 - 0.02);
  lidGroup.add(logoMesh);

  // =========================================================================
  // 7. 4,000 NEURAL PARTICLE MATRIX (Fluid Deep Cosmic Wave Dispersion)
  // =========================================================================
  const particleCount = 4000;
  const particleGeo = new THREE.BufferGeometry();
  const particlePositions = new Float32Array(particleCount * 3);
  const particleColors = new Float32Array(particleCount * 3);
  const particleOriginalZ = new Float32Array(particleCount);

  const brandColors = [
    new THREE.Color(0x14B1AB), // Vibrant Ocean Teal
    new THREE.Color(0xE8505B), // Electric Crimson Rose
    new THREE.Color(0xF9D56E), // Golden Sun Yellow
    new THREE.Color(0x00FF88), // Electric Neon Matrix Green
    new THREE.Color(0xF3ECC2), // Warm Cream White
  ];

  for (let i = 0; i < particleCount; i++) {
    const i3 = i * 3;
    particlePositions[i3] = (Math.random() - 0.5) * 120;
    particlePositions[i3 + 1] = (Math.random() - 0.5) * 85;
    particlePositions[i3 + 2] = (Math.random() - 0.5) * 55;
    particleOriginalZ[i] = particlePositions[i3 + 2];

    const chosenColor = brandColors[Math.floor(Math.random() * brandColors.length)];
    particleColors[i3] = chosenColor.r;
    particleColors[i3 + 1] = chosenColor.g;
    particleColors[i3 + 2] = chosenColor.b;
  }

  particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
  particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

  function createParticleTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');

    const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    gradient.addColorStop(0, 'rgba(243, 236, 194, 1)');
    gradient.addColorStop(0.3, 'rgba(0, 255, 136, 0.85)');
    gradient.addColorStop(0.7, 'rgba(20, 177, 171, 0.35)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 64, 64);
    return new THREE.CanvasTexture(canvas);
  }

  const particleMat = new THREE.PointsMaterial({
    size: 0.65,
    map: createParticleTexture(),
    vertexColors: true,
    transparent: true,
    opacity: 0.9,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });

  const particleSystem = new THREE.Points(particleGeo, particleMat);
  scene.add(particleSystem);

  // =========================================================================
  // 8. PHOTOREALISTIC HOLOGRAPHIC FLOATING HUD DATA RAYS
  // =========================================================================
  const rayCount = 100;
  const rayGeo = new THREE.BufferGeometry();
  const rayPositions = new Float32Array(rayCount * 6);

  for (let i = 0; i < rayCount; i++) {
    const idx = i * 6;
    const rx = (Math.random() - 0.5) * 16;
    const ry = (Math.random() - 0.5) * 10;
    const rz = (Math.random() - 0.5) * 12;

    rayPositions[idx] = rx;
    rayPositions[idx + 1] = ry;
    rayPositions[idx + 2] = rz;

    rayPositions[idx + 3] = rx * 1.5;
    rayPositions[idx + 4] = ry * 1.5;
    rayPositions[idx + 5] = rz * 1.5;
  }

  rayGeo.setAttribute('position', new THREE.BufferAttribute(rayPositions, 3));
  const rayMat = new THREE.LineBasicMaterial({
    color: 0x00FF88,
    transparent: true,
    opacity: 0.35,
  });
  const rayLines = new THREE.LineSegments(rayGeo, rayMat);
  laptopGroup.add(rayLines);

  // =========================================================================
  // 9. FLUID CURSOR & TOUCH PARALLAX WITH DYNAMIC RESIZE
  // =========================================================================
  let mouseX = 0;
  let mouseY = 0;
  let targetX = 0;
  let targetY = 0;

  let targetScrollProgress = 0;
  let currentScrollProgress = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
  });

  window.addEventListener('touchmove', (e) => {
    if (e.touches.length > 0) {
      const touch = e.touches[0];
      mouseX = (touch.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(touch.clientY / window.innerHeight) * 2 + 1;
    }
  }, { passive: true });

  window.addEventListener('scroll', () => {
    const heroH = heroSection ? heroSection.offsetHeight : window.innerHeight;
    targetScrollProgress = Math.min(Math.max(window.scrollY / heroH, 0), 1);
  }, { passive: true });

  function handleResize() {
    const size = getViewportSize();
    camera.aspect = size.width / size.height;
    camera.position.z = getResponsiveCameraZ(size.width);
    camera.updateProjectionMatrix();
    renderer.setSize(size.width, size.height);
  }
  window.addEventListener('resize', handleResize);

  // =========================================================================
  // 10. 60/120 FPS HIGH-FIDELITY SIMULATION LOOP (With Cinematic Scroll Damping)
  // =========================================================================
  let clock = new THREE.Clock();
  let isHeroVisible = true;

  if (heroSection && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isHeroVisible = entry.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(heroSection);
  }

  function animate() {
    requestAnimationFrame(animate);

    if (!isHeroVisible) return;

    const elapsedTime = clock.getElapsedTime();

    // 1. Redraw Live Green & Black Hacker Screen Matrix Frame
    renderHackerScreen(elapsedTime);
    screenTexture.needsUpdate = true;

    // 2. Fluid Cosmic Wave Motion on 4,000 Particle Field
    const pPos = particleGeo.attributes.position.array;
    for (let i = 0; i < particleCount; i++) {
      const idx = i * 3;
      const originalZ = particleOriginalZ[i];
      pPos[idx + 2] = originalZ + Math.sin(pPos[idx] * 0.08 + elapsedTime * 1.5) * 4.0;
    }
    particleGeo.attributes.position.needsUpdate = true;

    // 3. Smooth Scroll Interpolation & 3D Depth Transition
    currentScrollProgress += (targetScrollProgress - currentScrollProgress) * 0.08;

    const scrollZOffset = -currentScrollProgress * 14.0;
    const scrollYOffset = currentScrollProgress * 6.0;
    const scrollRotX = currentScrollProgress * 0.35;
    const scrollScale = Math.max(1.0 - currentScrollProgress * 0.2, 0.5);

    laptopGroup.scale.set(scrollScale, scrollScale, scrollScale);
    laptopGroup.position.z = scrollZOffset;
    laptopGroup.position.y = -2.2 + Math.sin(elapsedTime * 1.4) * 0.5 + scrollYOffset;
    
    // Smooth angle revealing both the glowing keyboard and active hacker display
    const baseRotX = 0.26;
    const baseRotY = -0.28;

    laptopGroup.rotation.x = baseRotX + Math.sin(elapsedTime * 0.45) * 0.08 - targetY * 0.2 + scrollRotX;
    laptopGroup.rotation.y = baseRotY + Math.sin(elapsedTime * 0.35) * 0.15 + targetX * 0.28;
    laptopGroup.rotation.z = Math.cos(elapsedTime * 0.4) * 0.05;

    // Disperse particles softly into depth on scroll
    particleSystem.position.z = -currentScrollProgress * 20.0;

    // Soft opacity fade on the WebGL canvas as user scrolls into the next section
    if (renderer.domElement) {
      const alpha = Math.max(1.0 - currentScrollProgress * 1.3, 0);
      renderer.domElement.style.opacity = alpha.toString();
    }

    // 4. Dynamic Space Light Oscillations
    pointLight1.position.x = Math.sin(elapsedTime * 0.8) * 26;
    pointLight1.position.y = Math.cos(elapsedTime * 0.6) * 18;
    pointLight2.position.x = -Math.sin(elapsedTime * 0.7) * 26;
    pointLight2.position.y = -Math.cos(elapsedTime * 0.9) * 18;

    // Pulsing Screen Point Light
    screenGlowLight.intensity = (3.5 + Math.sin(elapsedTime * 4.0) * 0.6) * Math.max(1 - currentScrollProgress, 0);

    // 5. Smooth Camera Parallax Damping
    targetX += (mouseX * 2.2 - targetX) * 0.04;
    targetY += (mouseY * 1.8 - targetY) * 0.04;

    masterGroup.position.x = targetX;
    masterGroup.position.y = targetY;

    renderer.render(scene, camera);
  }

  animate();
})();
