import Link from "next/link";

export function Hero() {
  return (
<section aria-labelledby="hero-title" className="hero">
<div className="hero-copy">
<p className="eyebrow">Portfolio · Oran, Algeria</p>
<h1 id="hero-title">Hi i'm <span className="name">Sarra,</span></h1>
<p className="hero-role">Creative developer, designer<br />AI · Web · UI/UX · Art · 3D</p>
<p className="hero-location"><span aria-hidden="true">⌖</span> Oran,Algeria 31000</p>
<div className="hero-buttons">
<Link className="button" href="#education">Explore my portfolio <span aria-hidden="true">↓</span></Link>
<Link className="button button-soft" href="#foot">Contact me ! <span aria-hidden="true">↗</span></Link>
</div>
</div>
<div className="hero-art-wrap">
<span aria-hidden="true" className="sparkle sparkle-one">✦</span>
<span aria-hidden="true" className="sparkle sparkle-two">✧</span>
<span aria-live="polite" className="cat-pet-progress" hidden id="cat-pet-progress"></span>
<span aria-live="polite" className="flower-pet-progress" hidden id="flower-pet-progress"></span>
<div className="hero-scene" id="hero-scene">
<div className="hero-bob">
<svg aria-labelledby="hero-art-title" className="hero-art" viewBox="0 0 520 430">
<title id="hero-art-title">A smiling computer with a little cat, flowers, and creative tools</title>
<defs>
<radialGradient cx="50%" cy="45%" id="scene-glow" r="60%">
<stop offset="0" stopColor="#fff8ed"></stop>
<stop offset=".52" stopColor="#f8dfe8"></stop>
<stop offset="1" stopColor="#decdf3"></stop>
</radialGradient>
<linearGradient id="screen" x1="0" x2="1" y1="0" y2="1">
<stop offset="0" stopColor="#fffefa"></stop>
<stop offset="1" stopColor="#f4eaf8"></stop>
</linearGradient>
<linearGradient id="laptop" x1="0" x2="1" y1="0" y2="1">
<stop offset="0" stopColor="#4c3a5c"></stop>
<stop offset="1" stopColor="#30253a"></stop>
</linearGradient>
<linearGradient id="face-panel" x1="0" x2="1" y1="0" y2="1">
<stop offset="0" stopColor="#f9e0e9"></stop>
<stop offset="1" stopColor="#e8d8f4"></stop>
</linearGradient>
<linearGradient id="flower-pot" x1="0" x2="1" y1="0" y2="1">
<stop offset="0" stopColor="#eaa0b8"></stop>
<stop offset="1" stopColor="#c95883"></stop>
</linearGradient>
<filter height="190%" id="scene-shadow" width="170%" x="-35%" y="-35%">
<feDropShadow dx="2" dy="7" floodColor="#493047" floodOpacity=".18" stdDeviation="5"></feDropShadow>
</filter>
</defs>
<ellipse cx="265" cy="392" fill="#765d7d" opacity=".15" rx="203" ry="19"></ellipse>
<circle cx="270" cy="211" fill="url(#scene-glow)" r="177"></circle>
<circle cx="270" cy="211" fill="#e6d8f4" opacity=".37" r="145"></circle>
<circle cx="270" cy="211" fill="none" opacity=".78" r="165" stroke="#fffefa" strokeDasharray="4 11" strokeWidth="2"></circle>
<path d="M76 319c16-23 39-20 49-2 6 11-1 22-13 28-22 10-47-3-36-26Z" fill="#c9e9de"></path>
<path d="M436 114c12-19 31-18 39-4 6 11-1 21-13 25-18 6-35-5-26-21Z" fill="#f7df86"></path>
<path className="svg-star" d="M104 134l9-22 9 22 22 9-22 9-9 22-9-22-22-9z" fill="#fffefa" stroke="#30253a" strokeLinejoin="round" strokeWidth="3"></path>
<path className="svg-star svg-star-late" d="M402 304l6-15 6 15 15 6-15 6-6 15-6-15-15-6z" fill="#fffefa" stroke="#30253a" strokeLinejoin="round" strokeWidth="3"></path>
<rect fill="url(#laptop)" filter="url(#scene-shadow)" height={231} rx="31" stroke="#30253a" strokeWidth="5" width="244" x="145" y="82"></rect>
<path d="M169 94h187" fill="none" opacity=".34" stroke="#fffefa" strokeLinecap="round" strokeWidth="3"></path>
<rect fill="url(#screen)" height={199} rx="20" width="214" x="160" y="98"></rect>
<path d="M160 118a20 20 0 0 1 20-20h174a20 20 0 0 1 20 20v18H160z" fill="#f7df86"></path>
<circle cx="178" cy="115" fill="#30253a" opacity=".55" r="4"></circle>
<circle cx="191" cy="115" fill="#30253a" opacity=".38" r="4"></circle>
<circle cx="204" cy="115" fill="#30253a" opacity=".25" r="4"></circle>
<rect fill="url(#face-panel)" height={111} rx="17" width="172" x="181" y="159"></rect>
<path d="M198 178h31M198 186h21" fill="none" opacity=".77" stroke="#fffefa" strokeLinecap="round" strokeWidth="5"></path>
<path className="svg-eye" d="M215 205c0-8 6-14 14-14s14 6 14 14" fill="none" stroke="#30253a" strokeLinecap="round" strokeWidth="6"></path>
<path className="svg-eye" d="M289 205c0-8 6-14 14-14s14 6 14 14" fill="none" stroke="#30253a" strokeLinecap="round" strokeWidth="6"></path>
<path d="M239 229c13 14 28 14 41 0" fill="none" stroke="#c95883" strokeLinecap="round" strokeWidth="6"></path>
<circle cx="219" cy="221" fill="#f3a6bd" opacity=".8" r="5"></circle>
<circle cx="300" cy="221" fill="#f3a6bd" opacity=".8" r="5"></circle>
<path d="M122 323h288l-29 24H151z" fill="#30253a" stroke="#30253a" strokeLinejoin="round" strokeWidth="5"></path>
<path d="M162 326h209l-15 12H177z" fill="#f7df86"></path>
<rect fill="#fffefa" height={5} opacity=".75" rx="2.5" width="49" x="242" y="319"></rect>
<g aria-label="Pet the flower five times to open Hanamori garden mini-game" className="flower-click-target" id="hero-flower" role="button" tabIndex={0}>
<path d="M77 278h61l-9 66H87z" fill="url(#flower-pot)" filter="url(#scene-shadow)" stroke="#30253a" strokeLinejoin="round" strokeWidth="4"></path>
<path d="M75 278h65" fill="none" stroke="#30253a" strokeLinecap="round" strokeWidth="6"></path>
<path d="M93 296h28" fill="none" opacity=".68" stroke="#fff8ed" strokeLinecap="round" strokeWidth="4"></path>
<g className="svg-flower">
<g className="flower-drawing" id="flower-drawing">
<path d="M107 277v-80" fill="none" stroke="#367d68" strokeLinecap="round" strokeWidth="6"></path>
<path d="M106 256c-17-2-27-15-24-25 17-1 26 5 28 19M109 240c14-15 28-16 35-8-4 14-16 20-35 19" fill="#8bceaf" stroke="#367d68" strokeLinejoin="round" strokeWidth="3"></path>
<circle cx="107" cy="176" fill="#fffefa" r="16" stroke="#30253a" strokeWidth="3"></circle>
<circle cx="126" cy="191" fill="#fffefa" r="16" stroke="#30253a" strokeWidth="3"></circle>
<circle cx="119" cy="213" fill="#fffefa" r="16" stroke="#30253a" strokeWidth="3"></circle>
<circle cx="95" cy="213" fill="#fffefa" r="16" stroke="#30253a" strokeWidth="3"></circle>
<circle cx="88" cy="191" fill="#fffefa" r="16" stroke="#30253a" strokeWidth="3"></circle>
<circle cx="107" cy="196" fill="#f7df86" r="15" stroke="#30253a" strokeWidth="3"></circle>
<g className="flower-face flower-face-neutral">
<circle cx="102" cy="192" fill="#30253a" r="1.8"></circle><circle cx="113" cy="192" fill="#30253a" r="1.8"></circle>
<path d="M102 200q5 5 10 0" fill="none" stroke="#30253a" strokeLinecap="round" strokeWidth="2"></path>
</g>
<g className="flower-face flower-face-happy">
<path d="M99 192q3-4 6 0m5 0q3-4 6 0" fill="none" stroke="#30253a" strokeLinecap="round" strokeWidth="2.1"></path>
<path d="M102 199q5 7 10 0z" fill="#c95883" stroke="#30253a" strokeWidth="1.5"></path>
<circle cx="98" cy="198" fill="#f3a6bd" r="2.5"></circle><circle cx="117" cy="198" fill="#f3a6bd" r="2.5"></circle>
</g>
<g className="flower-face flower-face-surprised">
<circle cx="102" cy="191" fill="#fffefa" r="3.3" stroke="#30253a" strokeWidth="1.5"></circle>
<circle cx="113" cy="191" fill="#fffefa" r="3.3" stroke="#30253a" strokeWidth="1.5"></circle>
<circle cx="103" cy="192" fill="#30253a" r="1.5"></circle><circle cx="114" cy="192" fill="#30253a" r="1.5"></circle>
<ellipse cx="107.5" cy="201" fill="#c95883" rx="2.7" ry="3.4" stroke="#30253a" strokeWidth="1.2"></ellipse>
</g>
</g>
</g>
</g>
<g filter="url(#scene-shadow)" transform="rotate(8 452 268)">
<rect fill="#fffefa" height={82} rx="13" stroke="#30253a" strokeWidth="4" width="73" x="416" y="228"></rect>
<path d="M425 244h54" fill="none" stroke="#ddd0f4" strokeLinecap="round" strokeWidth="5"></path>
<circle cx="437" cy="266" fill="#f3a6bd" r="8" stroke="#30253a" strokeWidth="2"></circle>
<circle cx="462" cy="266" fill="#f7df86" r="8" stroke="#30253a" strokeWidth="2"></circle>
<circle cx="450" cy="289" fill="#a7d8c8" r="8" stroke="#30253a" strokeWidth="2"></circle>
</g>
<path className="svg-heart" d="M282 66c4-10 16-10 20 0 5 11-7 21-10 25-3-4-15-14-10-25Z" fill="#c95883"></path>
<g aria-label="Pet the cat five times to open Neko Tabi mini-game" className="svg-cat" filter="url(#scene-shadow)" id="hero-cat" role="button" tabIndex={0}>
<g className="cat-drawing" id="cat-drawing">
<path className="svg-tail" d="M433 112c27 10 44-5 39-21-4-13-17-17-25-8" fill="none" stroke="#30253a" strokeLinecap="round" strokeWidth="13"></path>
<path d="M348 74l3-36q1-8 9-4l24 17M401 51l24-18q8-5 10 5l5 36" fill="#fff2e8" stroke="#30253a" strokeLinejoin="round" strokeWidth="4"></path>
<path d="M355 48l3 15 12-10M417 54l13-10 3 20" fill="#f3a6bd"></path>
<path d="M343 87c0-27 19-43 48-43 31 0 50 18 50 45v24c0 18-14 31-33 31h-36c-18 0-29-13-29-31z" fill="#fff2e8" stroke="#30253a" strokeWidth="4"></path>
<ellipse className="cat-blush" cx="363" cy="103" fill="#f6b7c5" opacity=".68" rx="8" ry="5"></ellipse>
<ellipse className="cat-blush" cx="420" cy="103" fill="#f6b7c5" opacity=".68" rx="8" ry="5"></ellipse>
<path d="M389 99q4-4 8 0l-4 4z" fill="#c95883"></path>
<g className="cat-face cat-face-neutral">
<path className="svg-eye" d="M365 89q8-8 17 0" fill="none" stroke="#30253a" strokeLinecap="round" strokeWidth="3.5"></path>
<path className="svg-eye" d="M402 89q8-8 17 0" fill="none" stroke="#30253a" strokeLinecap="round" strokeWidth="3.5"></path>
<path d="M393 103q-5 8-10 3M393 103q5 8 10 3" fill="none" stroke="#30253a" strokeLinecap="round" strokeWidth="2"></path>
</g>
<g className="cat-face cat-face-happy">
<ellipse cx="374" cy="88" fill="#30253a" rx="5" ry="6.5"></ellipse>
<ellipse cx="411" cy="88" fill="#30253a" rx="5" ry="6.5"></ellipse>
<circle cx="375.5" cy="85.5" fill="#fffefa" r="1.8"></circle>
<circle cx="412.5" cy="85.5" fill="#fffefa" r="1.8"></circle>
<path d="M381 105q12 17 24 0z" fill="#c95883" stroke="#30253a" strokeLinejoin="round" strokeWidth="2"></path>
<path d="M388 112q5-4 10 0" fill="none" stroke="#ffd4dc" strokeLinecap="round" strokeWidth="2"></path>
</g>
<g className="cat-face cat-face-surprised">
<ellipse cx="374" cy="88" fill="#fffefa" rx="7.5" ry="9" stroke="#30253a" strokeWidth="2.5"></ellipse>
<ellipse cx="411" cy="88" fill="#fffefa" rx="7.5" ry="9" stroke="#30253a" strokeWidth="2.5"></ellipse>
<circle cx="375" cy="89" fill="#30253a" r="3.2"></circle>
<circle cx="412" cy="89" fill="#30253a" r="3.2"></circle>
<ellipse cx="393" cy="109" fill="#c95883" rx="5.5" ry="7" stroke="#30253a" strokeWidth="2"></ellipse>
<path d="m437 68 7-9m-1 17 11-2" fill="none" stroke="#c95883" strokeLinecap="round" strokeWidth="3"></path>
</g>
<path d="M353 105l-14-3M354 111l-13 3M431 105l14-3M430 111l14 3" fill="none" stroke="#30253a" strokeLinecap="round" strokeWidth="2"></path>
<ellipse cx="367" cy="141" fill="#fff2e8" rx="12" ry="7" stroke="#30253a" strokeWidth="3"></ellipse>
<ellipse cx="416" cy="141" fill="#fff2e8" rx="12" ry="7" stroke="#30253a" strokeWidth="3"></ellipse>
</g>
</g>
</svg>
<div aria-hidden="true" className="hero-sticker">✿ pet cat or flower 5×</div>
<div aria-hidden="true" className="hero-note">♥</div>
</div>
</div>
</div>
</section>
  );
}
