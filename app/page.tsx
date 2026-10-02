import { Hero } from "@/components/hero";
import { HomeSections } from "@/components/home-sections";
import { MiniGames } from "@/components/mini-games";
import { PortfolioScripts } from "@/components/portfolio-scripts";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SvgSprite } from "@/components/svg-sprite";

export default function HomePage() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <SiteHeader />
      <SvgSprite />
      <main className="page-shell" id="main-content">
        <Hero />
        <HomeSections />
      </main>
      <SiteFooter />
      <MiniGames />
      <PortfolioScripts />
    </>
  );
}
