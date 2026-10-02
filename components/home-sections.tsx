import Link from "next/link";

export function HomeSections() {
  return (
    <>
<section className="section" id="about">
<div className="section-heading">
<div>
<span className="section-kicker">A little about me</span>
<h2>About Me</h2>
</div>
<p>A creative developer who loves mixing technology with art and imagination.</p>
</div>
<div className="panel" style={{ padding: "clamp(24px,4vw,42px)" }}>
<p style={{ fontSize: "1.12rem", lineHeight: "1.75", marginBottom: "18px" }}>
          Hi, I’m <strong>Sarra</strong> — a creative developer and designer who loves bringing ideas to life through code, design, and illustration.
        </p>
<p style={{ color: "var(--muted)", lineHeight: "1.75", marginBottom: "18px" }}>
          I have a <strong>Master’s degree in Computer Science, specialized in Artificial Intelligence</strong>, but my work goes beyond technology. I enjoy combining my technical background with my passion for web design, digital art, illustration, and 3D modeling to create experiences that feel both functional and full of personality.
        </p>
<p style={{ color: "var(--muted)", lineHeight: "1.75", marginBottom: "18px" }}>
          I’ve worked on websites, Shopify stores, visual identities, illustrations, product designs, and interactive projects, always paying attention to the little details that make a project feel unique. I also enjoy experimenting with new ideas and turning them into playful, polished digital experiences.
        </p>
<p style={{ color: "var(--muted)", lineHeight: "1.75", margin: "0" }}>I enjoy working at the intersection of technology and creativity — turning ideas into websites, digital products, illustrations, and interactive experiences.</p>
</div>
</section>
<section aria-labelledby="education-title" className="section" id="education">
<div className="section-heading">
<div>
<span className="section-kicker">01 · Learning path</span>
<h2 id="education-title">Education</h2>
</div>
<p>Education and study dates</p>
</div>
<div className="education-list">
<article className="education-card panel">
<span className="date-badge">Sep 2015 - jul 2017</span>
<div>
<h3>Mohamed Ben Othmane El Kebir High School</h3>
<ul><li>1st Baccalauréat, Experimental science</li></ul>
</div>
</article>
<article className="education-card panel">
<span className="date-badge">Sep 2017 - jul 2018</span>
<div>
<h3>Mohamed Ben Othmane El Kebir High School</h3>
<ul><li>2nd Baccalauréat, Experimental science</li></ul>
</div>
</article>
<article className="education-card panel">
<span className="date-badge">Sep 2018 - jul 2023</span>
<div>
<h3>University of Sciences and Techniques of Oran _ Mohamed Boudiaf (USTO-MB)</h3>
<ul><li>Master, Artificial Intelligence</li></ul>
</div>
</article>
</div>
</section>
<section aria-labelledby="experience-title" className="section" id="experience">
<div className="section-heading">
<div>
<span className="section-kicker">02 · Work &amp; projects</span>
<h2 id="experience-title">Work Experience</h2>
</div>
<p>Creative, web, product, and app development experience</p>
</div>
<div className="experience-list">
<article className="experience-card panel">
<span className="experience-type">April 2024 – May 2025</span>
<div>
<h3>Pédaludique</h3>
<p className="experience-role">Web Developer · Shopify Developer · Product &amp; Visual Designer</p>
<ul><li>Customized and developed the Pédaludique Shopify storefront using Dawn, Liquid, HTML, CSS, JavaScript, and metafields.</li><li>Designed the Duo Alphabet (casse-tête), including its product visuals and packaging.</li><li>Illustrated all drawings for the Busy Book en français and created 3D models, renders, and visual assets for educational products.</li></ul>
</div>
</article>
<article className="experience-card panel">
<span className="experience-type">Independent project</span>
<div>
<h3>Adam — Baby Tracking App</h3>
<p className="experience-role">UI/UX Designer · Visual Designer · App Concept &amp; Development</p>
<ul>
<li>Designed a baby-care tracking app covering sleep, feeding, diapers, bath and care, health, vaccinations, growth, milestones, calendar, history, and insights.</li>
<li>Created custom UI icons, baby mascot illustrations, awake/asleep artwork, and other visual elements.</li>
<li>Designed the interface and interaction system with a cute, soft pastel visual direction focused on quick everyday tracking.</li>
</ul>
</div>
</article>
<article className="experience-card panel">
<span className="experience-type">Independent / freelance</span>
<div>
<h3>Usagi Art &amp; Creative Work</h3>
<p className="experience-role">Digital Artist · Illustrator · 3D Artist · Web Designer</p>
<ul>
<li>Create digital illustrations, anime-inspired artwork, acrylic paintings, 3D models, and rendered visual assets.</li>
<li>Design portfolio, shop, and social-media visuals with a playful kawaii-inspired aesthetic.</li>
<li>Combine illustration and web skills to build cohesive visual identities and interactive creative experiences.</li>
</ul>
</div>
</article>
<article className="experience-card panel">
<span className="experience-type">Web project</span>
<div>
<h3>Kika Maison</h3>
<p className="experience-role">Web Design &amp; Development</p>
<ul>
<li>Worked on a web presence project as part of the user's portfolio of web and design work.</li>
<li>Applied a combination of visual design and front-end development skills to create a polished digital experience.</li>
</ul>
</div>
</article>
</div>
</section>
<section aria-labelledby="projects-title" className="section" id="projects">
<div className="section-heading"><div><span className="section-kicker">03 · Selected work</span><h2 id="projects-title">PROJECTS</h2></div><p>Click a project to explore what I designed, built, illustrated, and developed.</p></div>
<div className="project-grid">
<Link className="project-card" href="/projects/duo-alphabet"><span className="project-number">01</span><span className="project-type">Product · Illustration · Packaging</span><h3>Duo Alphabet</h3><p>An educational puzzle project for Pédaludique, from visual direction and packaging to supporting illustrations.</p><div className="project-tags"><span>Product Design</span><span>Packaging</span><span>Illustration</span></div></Link>
<Link className="project-card" href="/projects/busy-book"><span className="project-number">02</span><span className="project-type">Illustration · Educational Product</span><h3>Busy Book en français</h3><p>A French educational busy book where I created the illustrations and visual assets for the learning activities.</p><div className="project-tags"><span>Illustration</span><span>Educational Design</span><span>Visual Assets</span></div></Link>
<Link className="project-card" href="/projects/adam-app"><span className="project-number">03</span><span className="project-type">App · UI/UX · Visual Design</span><h3>Adam — Baby Tracking App</h3><p>A complete baby-care app concept designed around quick everyday tracking and a friendly visual system.</p><div className="project-tags"><span>UI/UX</span><span>Product Design</span><span>Icon System</span></div></Link>
<Link className="project-card" href="/projects/usagi"><span className="project-number">04</span><span className="project-type">Web · Creative Portfolio</span><h3>Usagi</h3><p>My personal creative space combining web design, digital art, illustration, 3D experiments, and playful visual identity.</p><div className="project-tags"><span>Web Design</span><span>Art Direction</span><span>3D</span></div></Link>
<Link className="project-card" href="/projects/3d-product-work"><span className="project-number">05</span><span className="project-type">3D · Product Visualization</span><h3>3D Product Work</h3><p>3D models and rendered visuals created with Blender to turn product concepts into polished presentation assets.</p><div className="project-tags"><span>Blender</span><span>3D Modeling</span><span>Rendering</span></div></Link>
<Link className="project-card" href="/projects/pedaludique-storefront"><span className="project-number">06</span><span className="project-type">Web · Shopify · Front-end</span><h3>Pédaludique Storefront</h3><p>A custom Shopify storefront using Dawn, Liquid, metafields, responsive styling, and tailored visual details.</p><div className="project-tags"><span>Shopify</span><span>Liquid</span><span>Front-end</span></div></Link>
<Link className="project-card" href="/projects/kika-maison"><span className="project-number">07</span><span className="project-type">Web · E-commerce · Front-end</span><h3>Kika Maison</h3><p>An e-commerce storefront for a bedding and home-textile business — product catalogue, shopping experience and WhatsApp ordering.</p><div className="project-tags"><span>Web Design</span><span>E-commerce</span><span>Next.js</span></div></Link>
</div></section><section aria-labelledby="languages-title" className="section" id="languages">
<div className="section-heading">
<div>
<span className="section-kicker">04 · Languages</span>
<h2 id="languages-title">Languages</h2>
</div>
<p>Heart ratings shown on the original portfolio</p>
</div>
<div className="language-grid">
<article className="language-card">
<div className="language-topline"><h3>Arabic</h3><span aria-hidden="true" className="language-mark">ع</span></div>
<div aria-label="Arabic: 6 of 6 hearts" className="hearts"><span aria-hidden="true">♥ ♥ ♥ ♥ ♥ ♥</span><span className="sr-only">6 of 6 hearts</span></div>
</article>
<article className="language-card">
<div className="language-topline"><h3>English</h3><span aria-hidden="true" className="language-mark">A</span></div>
<div aria-label="English: 5 of 6 hearts" className="hearts"><span aria-hidden="true">♥ ♥ ♥ ♥ ♥ <span className="heart-empty">♡</span></span><span className="sr-only">5 of 6 hearts</span></div>
</article>
<article className="language-card">
<div className="language-topline"><h3>French</h3><span aria-hidden="true" className="language-mark">É</span></div>
<div aria-label="French: 3 of 6 hearts" className="hearts"><span aria-hidden="true">♥ ♥ ♥ <span className="heart-empty">♡ ♡ ♡</span></span><span className="sr-only">3 of 6 hearts</span></div>
</article>
<article className="language-card">
<div className="language-topline"><h3>Japanese</h3><span aria-hidden="true" className="language-mark">あ</span></div>
<div aria-label="Japanese: 1 of 6 hearts" className="hearts"><span aria-hidden="true">♥ <span className="heart-empty">♡ ♡ ♡ ♡ ♡</span></span><span className="sr-only">1 of 6 hearts</span></div>
</article>
</div>
</section>
<section aria-labelledby="certification-title" className="section" id="Certification">
<div className="section-heading">
<div>
<span className="section-kicker">05 · Courses</span>
<h2 id="certification-title">Certification</h2>
</div>
<p>LinkedIn · August 2023</p>
</div>
<div className="certification-panel panel">
<div className="certification-intro">
<div className="certification-copy">
<svg aria-hidden="true" className="certification-medal" focusable="false" viewBox="0 0 64 64">
<path d="M18 36 12 58l17-9 12 10 5-25" fill="#f3a6bd" stroke="#30253a" strokeLinejoin="round" strokeWidth="3"></path>
<circle cx="32" cy="26" fill="#f7df86" r="20" stroke="#30253a" strokeWidth="3"></circle>
<circle cx="32" cy="26" fill="#fff6d7" r="15" stroke="#30253a" strokeWidth="2"></circle>
<path d="m32 14 3.5 7 8 1-5.8 5.5 1.5 8-7.2-3.8-7.2 3.8 1.5-8-5.8-5.5 8-1z" fill="#c95883" stroke="#30253a" strokeLinejoin="round" strokeWidth="2"></path>
</svg>
<div>
<h3>My LinkedIn Certification</h3>
<p>Course completed by Sarra ZRADNI</p>
</div>
</div>
<Link className="certificate-link" href="#certificate-list">Click to see my certification <span aria-hidden="true">↓</span></Link>
</div>
<div className="certificate-grid" id="certificate-list">
<article className="certificate-card">
<h3>Blender 2.91 Essential Training</h3>
<div className="certificate-meta"><span>Aug 03, 2023 at 09:44AM UTC</span><span>4 hours 39 minutes</span></div>
<span className="certificate-skill">Top skills covered: Blender</span>
</article>
<article className="certificate-card">
<h3>JavaScript Essential Training</h3>
<div className="certificate-meta"><span>Aug 29, 2023 at 10:57PM UTC</span><span>5 hours 29 minutes</span></div>
<span className="certificate-skill">Top skills covered: JavaScript</span>
</article>
<article className="certificate-card">
<h3>CSS for Programmers</h3>
<div className="certificate-meta"><span>Aug 04, 2023 at 10:03PM UTC</span><span>1 hour 25 minutes</span></div>
<span className="certificate-skill">Top skills covered: Cascading Style Sheets (CSS)</span>
</article>
<article className="certificate-card">
<h3>CSS Essential Training (2019)</h3>
<div className="certificate-meta"><span>Aug 15, 2023 at 09:53PM UTC</span><span>4 hours 29 minutes</span></div>
<span className="certificate-skill">Top skills covered: Cascading Style Sheets (CSS)</span>
</article>
<article className="certificate-card">
<h3>Excel Essential Training (Microsoft 365)</h3>
<div className="certificate-meta"><span>Aug 06, 2023 at 09:23AM UTC</span><span>2 hours 29 minutes</span></div>
<span className="certificate-skill">Top skills covered: Microsoft Excel</span>
</article>
<article className="certificate-card">
<h3>Figma: From Design to CSS Implementation</h3>
<div className="certificate-meta"><span>Aug 04, 2023 at 07:36AM UTC</span><span>48 minutes</span></div>
<span className="certificate-skill">Top skills covered: Web Design · Figma (Software)</span>
</article>
<article className="certificate-card">
<h3>Introduction to Graphic Design: Concepts</h3>
<div className="certificate-meta"><span>Aug 13, 2023 at 02:26AM UTC</span><span>52 minutes</span></div>
<span className="certificate-skill">Top skills covered: Graphic Design</span>
</article>
</div>
</div>
</section>
<section aria-labelledby="skills-title" className="section" id="skills">
<div className="section-heading">
<div>
<span className="section-kicker">06 · Things I work with</span>
<h2 id="skills-title">SKILLS</h2>
</div>
<p>Creative, technical, and office skills</p>
</div>
<div className="tag-grid"><span className="skill-tag"><span aria-hidden="true" className="skill-dot">✦</span> HTML</span><span className="skill-tag"><span aria-hidden="true" className="skill-dot">✦</span> CSS</span><span className="skill-tag"><span aria-hidden="true" className="skill-dot">✦</span> JavaScript</span><span className="skill-tag"><span aria-hidden="true" className="skill-dot">✦</span> Liquid</span><span className="skill-tag"><span aria-hidden="true" className="skill-dot">✦</span> Shopify</span><span className="skill-tag"><span aria-hidden="true" className="skill-dot">✦</span> Dawn Theme</span><span className="skill-tag"><span aria-hidden="true" className="skill-dot">✦</span> Metafields</span><span className="skill-tag"><span aria-hidden="true" className="skill-dot">✦</span> Python</span><span className="skill-tag"><span aria-hidden="true" className="skill-dot">✦</span> PHP</span><span className="skill-tag"><span aria-hidden="true" className="skill-dot">✦</span> UI/UX Design</span><span className="skill-tag"><span aria-hidden="true" className="skill-dot">✦</span> Web Design</span><span className="skill-tag"><span aria-hidden="true" className="skill-dot">✦</span> Figma</span><span className="skill-tag"><span aria-hidden="true" className="skill-dot">✦</span> Graphic Design</span><span className="skill-tag"><span aria-hidden="true" className="skill-dot">✦</span> Digital Illustration</span><span className="skill-tag"><span aria-hidden="true" className="skill-dot">✦</span> 2D Art</span><span className="skill-tag"><span aria-hidden="true" className="skill-dot">✦</span> Blender</span><span className="skill-tag"><span aria-hidden="true" className="skill-dot">✦</span> 3D Modeling</span><span className="skill-tag"><span aria-hidden="true" className="skill-dot">✦</span> Product Rendering</span><span className="skill-tag"><span aria-hidden="true" className="skill-dot">✦</span> Image Processing</span><span className="skill-tag"><span aria-hidden="true" className="skill-dot">✦</span> Satellite Image Processing</span><span className="skill-tag"><span aria-hidden="true" className="skill-dot">✦</span> Microsoft Word</span><span className="skill-tag"><span aria-hidden="true" className="skill-dot">✦</span> PowerPoint</span><span className="skill-tag"><span aria-hidden="true" className="skill-dot">✦</span> Excel</span></div>
</section>
<section aria-labelledby="interest-title" className="section" id="interest">
<div className="section-heading">
<div>
<span className="section-kicker">07 · Outside the canvas</span>
<h2 id="interest-title">INTEREST</h2>
</div>
<p>Things that catch my curiosity</p>
</div>
<div className="interest-grid">
<article className="interest-card"><svg aria-hidden="true" className="interest-icon" focusable="false" viewBox="0 0 64 64"><use href="#doodle-language" /></svg><strong>Foreign Languages</strong></article>
<article className="interest-card"><svg aria-hidden="true" className="interest-icon" focusable="false" viewBox="0 0 64 64"><use href="#doodle-animation" /></svg><strong>Animation</strong></article>
<article className="interest-card"><svg aria-hidden="true" className="interest-icon" focusable="false" viewBox="0 0 64 64"><use href="#doodle-art" /></svg><strong>Art and creativity</strong></article>
<article className="interest-card"><svg aria-hidden="true" className="interest-icon" focusable="false" viewBox="0 0 64 64"><use href="#doodle-paint" /></svg><strong>Paint</strong></article>
<article className="interest-card"><svg aria-hidden="true" className="interest-icon" focusable="false" viewBox="0 0 64 64"><use href="#doodle-digital" /></svg><strong>Digital artist</strong></article>
<article className="interest-card"><svg aria-hidden="true" className="interest-icon" focusable="false" viewBox="0 0 64 64"><use href="#doodle-manga" /></svg><strong>Manga</strong></article>
<article className="interest-card"><svg aria-hidden="true" className="interest-icon" focusable="false" viewBox="0 0 64 64"><use href="#doodle-game" /></svg><strong>game development</strong></article>
</div>
</section>
<section aria-labelledby="contact-title" className="section" id="foot">
<div className="contact-card">
<div className="contact-copy">
<span className="section-kicker">08 · Contact</span>
<h2 id="contact-title">Contact Me !</h2>
<ul className="contact-details">
<li><span aria-hidden="true" className="detail-icon">⌖</span><span>Oran,Algeria 31000</span></li>
<li><span aria-hidden="true" className="detail-icon">✉</span><a href="mailto:zradnisarra1999@gmail.com">zradnisarra1999@gmail.com</a></li>
</ul>
<div className="social-row">
<a className="social-link" href="https://www.instagram.com/zradni_sarra/" rel="noreferrer" target="_blank"><span aria-hidden="true">◎</span> instagram</a>
<a className="social-link" href="https://www.linkedin.com/in/sarra-zradni-31195b283/" rel="noreferrer" target="_blank"><span aria-hidden="true">in</span> LinkedIn</a>
</div>
<svg aria-hidden="true" className="contact-doodle" focusable="false" viewBox="0 0 220 165">
<ellipse cx="110" cy="153" fill="#120f18" opacity=".24" rx="80" ry="10"></ellipse>
<path d="m49 54 8-26 25 18M137 46l25-18 8 26" fill="#fff5e9" stroke="#30253a" strokeLinejoin="round" strokeWidth="4"></path>
<rect fill="#fff5e9" height={99} rx="20" stroke="#30253a" strokeWidth="4" width="160" x="30" y="49"></rect>
<path d="M35 119 86 91m99 28-51-28" fill="none" stroke="#d8bfcb" strokeLinecap="round" strokeWidth="3"></path>
<path d="M77 87q8-8 16 0m34 0q8-8 16 0" fill="none" stroke="#30253a" strokeLinecap="round" strokeWidth="4"></path>
<path d="M99 104q11 12 22 0" fill="none" stroke="#c95883" strokeLinecap="round" strokeWidth="4"></path>
<ellipse cx="73" cy="100" fill="#f3a6bd" opacity=".7" rx="9" ry="5"></ellipse>
<ellipse cx="147" cy="100" fill="#f3a6bd" opacity=".7" rx="9" ry="5"></ellipse>
<path d="M58 131h104" fill="none" stroke="#f3a6bd" strokeLinecap="round" strokeWidth="4"></path>
<path className="contact-heart" d="M105 15c4-9 15-8 18-1 4 9-6 17-13 23-8-6-17-14-13-22 2-5 6-6 8 0Z" fill="#f3a6bd" stroke="#30253a" strokeWidth="2.5"></path>
<path d="m16 53 5-11 5 11 11 5-11 5-5 11-5-11-11-5z" fill="#f7df86" stroke="#30253a" strokeLinejoin="round" strokeWidth="2"></path>
<circle cx="203" cy="54" fill="#a7d8c8" r="5"></circle>
</svg>
</div>
<form className="contact-form" id="contact-form">
<div className="field"><label htmlFor="name">name</label><input autoComplete="name" id="name" name="name" /></div>
<div className="field"><label htmlFor="email">email</label><input autoComplete="email" id="email" name="email" type="email" /></div>
<div className="field"><label htmlFor="subject">subject</label><input id="subject" name="subject" /></div>
<div className="field"><label htmlFor="project-detail">project detail</label><textarea id="project-detail" name="project detail"></textarea></div>
<p className="form-hint">Your email app opens with a draft; you choose whether to send.</p>
<button className="button send-button" type="submit">send <span aria-hidden="true">↗</span></button>
</form>
</div>
</section>
    </>
  );
}
