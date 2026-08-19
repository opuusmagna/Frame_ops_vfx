import React, { useState, useEffect } from 'react';
import { Sliders, Image, Layers, Palette, RotateCcw, Copy, Check, X, Sparkles } from 'lucide-react';
import './VisualCustomizer.css';

interface ThemePreset {
  id: string;
  name: string;
  desc: string;
  bgImage: string;
  bgOpacity: number;
  bgBlur: number;
  maskType: 'fade' | 'glowing' | 'gradual' | 'none';
  maskHeight: number;
  accentColor: string;
  glassOpacity: number;
  borderGlow: number;
}

const PRESET_BACKGROUNDS = [
  { id: 'tech-grid', name: 'Tech Grid', url: '/images/hero/06_global_background_clean_2560x1440.webp' },
  { id: 'cyber-neon', name: 'Cyber Neon', url: '/images/hero/03_cybersecurity_2560x1440.webp' },
  { id: 'network-mesh', name: 'Network Mesh', url: '/images/hero/01_networking_2560x1440.webp' },
  { id: 'render-matrix', name: 'Render Matrix', url: '/images/hero/04_render_farm_2560x1440.webp' },
];

const PRESET_COLORS = [
  { name: 'Cyan Cyber', value: '#00e5ff' },
  { name: 'Emerald TPN', value: '#10b981' },
  { name: 'Deep Purple', value: '#a855f7' },
  { name: 'Sky Blue', value: '#38bdf8' },
  { name: 'Pure White', value: '#ffffff' },
];

const THEME_PRESETS: ThemePreset[] = [
  {
    id: 'frame-ops-classic',
    name: 'Frame Ops Classic',
    desc: 'Equilibrado B2B Premium con red tech grid y neón cyan.',
    bgImage: '/images/hero/06_global_background_clean_2560x1440.webp',
    bgOpacity: 0.82,
    bgBlur: 0,
    maskType: 'fade',
    maskHeight: 80,
    accentColor: '#00e5ff',
    glassOpacity: 0.75,
    borderGlow: 15,
  },
  {
    id: 'high-contrast-stealth',
    name: 'High Contrast Stealth',
    desc: 'Oscuridad máxima con desenfoque de fondo y alto contraste.',
    bgImage: '/images/hero/06_global_background_clean_2560x1440.webp',
    bgOpacity: 0.92,
    bgBlur: 6,
    maskType: 'gradual',
    maskHeight: 120,
    accentColor: '#38bdf8',
    glassOpacity: 0.85,
    borderGlow: 8,
  },
  {
    id: 'tpn-security-emerald',
    name: 'TPN Security Emerald',
    desc: 'Alineado con ciberseguridad TPN y acentos verde esmeralda.',
    bgImage: '/images/hero/03_cybersecurity_2560x1440.webp',
    bgOpacity: 0.80,
    bgBlur: 0,
    maskType: 'glowing',
    maskHeight: 90,
    accentColor: '#10b981',
    glassOpacity: 0.70,
    borderGlow: 20,
  },
  {
    id: 'deep-render-purple',
    name: 'Deep Render Purple',
    desc: 'Granjas de renderizado y orquestación con tonos morados.',
    bgImage: '/images/hero/04_render_farm_2560x1440.webp',
    bgOpacity: 0.78,
    bgBlur: 2,
    maskType: 'fade',
    maskHeight: 100,
    accentColor: '#a855f7',
    glassOpacity: 0.75,
    borderGlow: 18,
  },
];

export const VisualCustomizer: React.FC = () => {
  const isLocalDev =
    Boolean(import.meta.env.DEV) ||
    (typeof window !== 'undefined' &&
      (window.location.hostname === 'localhost' ||
        window.location.hostname === '127.0.0.1' ||
        window.location.hostname === '0.0.0.0' ||
        window.location.hostname === '[::1]' ||
        window.location.hostname.endsWith('.local') ||
        window.location.hostname.startsWith('192.168.') ||
        window.location.hostname.startsWith('10.') ||
        window.location.port === '5173' ||
        window.location.port === '3000' ||
        window.location.port === '4173'));

  if (!isLocalDev) {
    return null;
  }

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'bg' | 'sections' | 'colors' | 'presets'>('bg');
  const [copied, setCopied] = useState<boolean>(false);

  // Design Tokens State
  const [bgImage, setBgImage] = useState<string>('/images/hero/06_global_background_clean_2560x1440.webp');
  const [bgOpacity, setBgOpacity] = useState<number>(0.82);
  const [bgBlur, setBgBlur] = useState<number>(0);
  const [bgAttachment, setBgAttachment] = useState<'fixed' | 'scroll'>('fixed');

  const [maskType, setMaskType] = useState<'fade' | 'glowing' | 'gradual' | 'none'>('fade');
  const [maskHeight, setMaskHeight] = useState<number>(80);
  const [maskOpacity, setMaskOpacity] = useState<number>(0.85);

  const [accentColor, setAccentColor] = useState<string>('#00e5ff');
  const [glassOpacity, setGlassOpacity] = useState<number>(0.75);
  const [borderGlow, setBorderGlow] = useState<number>(15);

  // Apply CSS custom properties to documentElement
  useEffect(() => {
    const root = document.documentElement;

    root.style.setProperty('--custom-bg-image', `url('${bgImage}')`);
    root.style.setProperty('--custom-bg-attachment', bgAttachment);
    root.style.setProperty('--custom-overlay-opacity', bgOpacity.toString());
    root.style.setProperty('--custom-bg-blur', `${bgBlur}px`);

    root.style.setProperty('--custom-mask-height', `${maskHeight}px`);
    root.style.setProperty('--custom-mask-opacity', maskOpacity.toString());

    root.style.setProperty('--custom-accent-color', accentColor);
    root.style.setProperty('--custom-glass-opacity', glassOpacity.toString());
    root.style.setProperty('--custom-border-glow', `${borderGlow}px`);

    // Dynamic background mask gradient
    if (maskType === 'none') {
      root.style.setProperty('--custom-mask-top', 'none');
      root.style.setProperty('--custom-mask-bottom', 'none');
    } else if (maskType === 'glowing') {
      root.style.setProperty(
        '--custom-mask-top',
        `linear-gradient(180deg, ${accentColor}33 0%, rgba(5, 8, 17, 0.9) 100%)`
      );
      root.style.setProperty(
        '--custom-mask-bottom',
        `linear-gradient(180deg, rgba(5, 8, 17, 0.9) 0%, ${accentColor}33 100%)`
      );
    } else if (maskType === 'gradual') {
      root.style.setProperty(
        '--custom-mask-top',
        `linear-gradient(180deg, rgba(5, 8, 17, ${maskOpacity}) 0%, transparent 100%)`
      );
      root.style.setProperty(
        '--custom-mask-bottom',
        `linear-gradient(180deg, transparent 0%, rgba(5, 8, 17, ${maskOpacity}) 100%)`
      );
    } else {
      // standard fade
      root.style.setProperty(
        '--custom-mask-top',
        `linear-gradient(180deg, rgba(5, 8, 17, ${maskOpacity}) 0%, transparent 100%)`
      );
      root.style.setProperty(
        '--custom-mask-bottom',
        `linear-gradient(180deg, transparent 0%, rgba(5, 8, 17, ${maskOpacity}) 100%)`
      );
    }
  }, [bgImage, bgAttachment, bgOpacity, bgBlur, maskType, maskHeight, maskOpacity, accentColor, glassOpacity, borderGlow]);

  const applyPreset = (preset: ThemePreset) => {
    setBgImage(preset.bgImage);
    setBgOpacity(preset.bgOpacity);
    setBgBlur(preset.bgBlur);
    setMaskType(preset.maskType);
    setMaskHeight(preset.maskHeight);
    setAccentColor(preset.accentColor);
    setGlassOpacity(preset.glassOpacity);
    setBorderGlow(preset.borderGlow);
  };

  const handleReset = () => {
    applyPreset(THEME_PRESETS[0]);
  };

  const handleCopyCSS = () => {
    const cssCode = `:root {
  /* Frame Ops VFX Customizer Export */
  --custom-bg-image: url('${bgImage}');
  --custom-bg-attachment: ${bgAttachment};
  --custom-overlay-opacity: ${bgOpacity};
  --custom-bg-blur: ${bgBlur}px;
  --custom-mask-height: ${maskHeight}px;
  --custom-mask-opacity: ${maskOpacity};
  --custom-accent-color: ${accentColor};
  --custom-glass-opacity: ${glassOpacity};
  --custom-border-glow: ${borderGlow}px;
}`;

    navigator.clipboard.writeText(cssCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="customizer-trigger-btn"
        title="Personalizar diseño visual estilo Divi/Elementor"
      >
        <Sliders size={18} className="customizer-trigger-icon" />
        <span>Personalizar Diseño</span>
      </button>

      {/* Backdrop */}
      <div
        className={`customizer-overlay ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(false)}
      />

      {/* Drawer */}
      <div className={`customizer-drawer ${isOpen ? 'open' : ''}`}>
        {/* Header */}
        <div className="customizer-header">
          <div className="customizer-header-title">
            <Sparkles size={20} style={{ color: '#00e5ff' }} />
            <h3>Personalizador Visual</h3>
            <span className="customizer-tag">DIVI / ELEMENTOR</span>
          </div>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="customizer-close-btn"
          >
            <X size={20} />
          </button>
        </div>

        {/* Tabs Bar */}
        <div className="customizer-tabs">
          <button
            type="button"
            className={`customizer-tab-btn ${activeTab === 'bg' ? 'active' : ''}`}
            onClick={() => setActiveTab('bg')}
          >
            <Image size={16} />
            <span>Fondo</span>
          </button>

          <button
            type="button"
            className={`customizer-tab-btn ${activeTab === 'sections' ? 'active' : ''}`}
            onClick={() => setActiveTab('sections')}
          >
            <Layers size={16} />
            <span>Secciones</span>
          </button>

          <button
            type="button"
            className={`customizer-tab-btn ${activeTab === 'colors' ? 'active' : ''}`}
            onClick={() => setActiveTab('colors')}
          >
            <Palette size={16} />
            <span>Colores</span>
          </button>

          <button
            type="button"
            className={`customizer-tab-btn ${activeTab === 'presets' ? 'active' : ''}`}
            onClick={() => setActiveTab('presets')}
          >
            <Sparkles size={16} />
            <span>Presets</span>
          </button>
        </div>

        {/* Body Content */}
        <div className="customizer-body">
          {/* TAB 1: FONDO Y ATMÓSFERA */}
          {activeTab === 'bg' && (
            <div className="customizer-group">
              <span className="customizer-group-label">Imagen de Fondo</span>
              <div className="preset-img-grid">
                {PRESET_BACKGROUNDS.map((item) => (
                  <div
                    key={item.id}
                    className={`preset-img-card ${bgImage === item.url ? 'active' : ''}`}
                    style={{ backgroundImage: `url('${item.url}')` }}
                    onClick={() => setBgImage(item.url)}
                  >
                    <span className="preset-img-name">{item.name}</span>
                  </div>
                ))}
              </div>

              <div className="customizer-field">
                <div className="customizer-field-header">
                  <span className="customizer-field-label">URL de Imagen Personalizada</span>
                </div>
                <input
                  type="text"
                  value={bgImage}
                  onChange={(e) => setBgImage(e.target.value)}
                  className="customizer-input-text"
                  placeholder="https://..."
                />
              </div>

              <div className="customizer-field">
                <div className="customizer-field-header">
                  <span className="customizer-field-label">Modo de Ajuste</span>
                </div>
                <div className="radio-cards-grid">
                  <button
                    type="button"
                    className={`radio-card-btn ${bgAttachment === 'fixed' ? 'active' : ''}`}
                    onClick={() => setBgAttachment('fixed')}
                  >
                    Fijo (Parallax)
                  </button>
                  <button
                    type="button"
                    className={`radio-card-btn ${bgAttachment === 'scroll' ? 'active' : ''}`}
                    onClick={() => setBgAttachment('scroll')}
                  >
                    Scroll Normal
                  </button>
                </div>
              </div>

              <span className="customizer-group-label" style={{ marginTop: '1.5rem' }}>Capa Oscura & Desenfoque</span>

              <div className="customizer-field">
                <div className="customizer-field-header">
                  <span className="customizer-field-label">Opacidad de Capa Oscura</span>
                  <span className="customizer-field-val">{Math.round(bgOpacity * 100)}%</span>
                </div>
                <input
                  type="range"
                  min={0.2}
                  max={0.98}
                  step={0.02}
                  value={bgOpacity}
                  onChange={(e) => setBgOpacity(Number(e.target.value))}
                  className="customizer-slider"
                />
              </div>

              <div className="customizer-field">
                <div className="customizer-field-header">
                  <span className="customizer-field-label">Desenfoque de Fondo (Blur)</span>
                  <span className="customizer-field-val">{bgBlur}px</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={15}
                  step={1}
                  value={bgBlur}
                  onChange={(e) => setBgBlur(Number(e.target.value))}
                  className="customizer-slider"
                />
              </div>
            </div>
          )}

          {/* TAB 2: SECCIONES Y MÁSCARAS */}
          {activeTab === 'sections' && (
            <div className="customizer-group">
              <span className="customizer-group-label">Estilo de Transición entre Secciones</span>

              <div className="radio-cards-grid" style={{ marginBottom: '1.25rem' }}>
                <button
                  type="button"
                  className={`radio-card-btn ${maskType === 'fade' ? 'active' : ''}`}
                  onClick={() => setMaskType('fade')}
                >
                  Fade Suave
                </button>
                <button
                  type="button"
                  className={`radio-card-btn ${maskType === 'glowing' ? 'active' : ''}`}
                  onClick={() => setMaskType('glowing')}
                >
                  Neón Luminoso
                </button>
                <button
                  type="button"
                  className={`radio-card-btn ${maskType === 'gradual' ? 'active' : ''}`}
                  onClick={() => setMaskType('gradual')}
                >
                  Degradado Oscuro
                </button>
                <button
                  type="button"
                  className={`radio-card-btn ${maskType === 'none' ? 'active' : ''}`}
                  onClick={() => setMaskType('none')}
                >
                  Sin Máscara
                </button>
              </div>

              <div className="customizer-field">
                <div className="customizer-field-header">
                  <span className="customizer-field-label">Altura de Máscara de Degradado</span>
                  <span className="customizer-field-val">{maskHeight}px</span>
                </div>
                <input
                  type="range"
                  min={30}
                  max={180}
                  step={5}
                  value={maskHeight}
                  onChange={(e) => setMaskHeight(Number(e.target.value))}
                  className="customizer-slider"
                />
              </div>

              <div className="customizer-field">
                <div className="customizer-field-header">
                  <span className="customizer-field-label">Intensidad de Transición</span>
                  <span className="customizer-field-val">{Math.round(maskOpacity * 100)}%</span>
                </div>
                <input
                  type="range"
                  min={0.3}
                  max={1.0}
                  step={0.05}
                  value={maskOpacity}
                  onChange={(e) => setMaskOpacity(Number(e.target.value))}
                  className="customizer-slider"
                />
              </div>
            </div>
          )}

          {/* TAB 3: COLORES Y CRISTAL */}
          {activeTab === 'colors' && (
            <div className="customizer-group">
              <span className="customizer-group-label">Color Neón de Acento</span>
              <div className="color-swatches-grid">
                {PRESET_COLORS.map((c) => (
                  <button
                    key={c.value}
                    type="button"
                    className={`color-swatch-btn ${accentColor === c.value ? 'active' : ''}`}
                    style={{ backgroundColor: c.value, color: c.value }}
                    onClick={() => setAccentColor(c.value)}
                    title={c.name}
                  />
                ))}
              </div>

              <span className="customizer-group-label" style={{ marginTop: '1.5rem' }}>Densidad de Cristal & Brillos</span>

              <div className="customizer-field">
                <div className="customizer-field-header">
                  <span className="customizer-field-label">Opacidad de Cristal de Tarjetas</span>
                  <span className="customizer-field-val">{Math.round(glassOpacity * 100)}%</span>
                </div>
                <input
                  type="range"
                  min={0.4}
                  max={0.95}
                  step={0.05}
                  value={glassOpacity}
                  onChange={(e) => setGlassOpacity(Number(e.target.value))}
                  className="customizer-slider"
                />
              </div>

              <div className="customizer-field">
                <div className="customizer-field-header">
                  <span className="customizer-field-label">Radio de Resplandor Neón</span>
                  <span className="customizer-field-val">{borderGlow}px</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={30}
                  step={2}
                  value={borderGlow}
                  onChange={(e) => setBorderGlow(Number(e.target.value))}
                  className="customizer-slider"
                />
              </div>
            </div>
          )}

          {/* TAB 4: PRESETS DE DISEÑO */}
          {activeTab === 'presets' && (
            <div className="customizer-group">
              <span className="customizer-group-label">Estilos Preconfigurados en 1 Clic</span>
              <div className="preset-themes-stack">
                {THEME_PRESETS.map((p) => (
                  <div
                    key={p.id}
                    className="preset-theme-card"
                    onClick={() => applyPreset(p)}
                  >
                    <div>
                      <div className="preset-theme-name">{p.name}</div>
                      <div className="preset-theme-desc">{p.desc}</div>
                    </div>
                    <Sparkles size={16} style={{ color: p.accentColor }} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="customizer-footer">
          <button
            type="button"
            onClick={handleReset}
            className="btn-customizer-action secondary"
            title="Restablecer valores predeterminados"
          >
            <RotateCcw size={15} />
            <span>Reset</span>
          </button>

          <button
            type="button"
            onClick={handleCopyCSS}
            className="btn-customizer-action primary"
          >
            {copied ? <Check size={15} /> : <Copy size={15} />}
            <span>{copied ? '¡Copiado!' : 'Copiar CSS'}</span>
          </button>
        </div>
      </div>
    </>
  );
};
