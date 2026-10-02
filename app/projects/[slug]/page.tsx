import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { GAME_PROJECTS } from "@/lib/project-data";

export function generateStaticParams() {
  return GAME_PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = GAME_PROJECTS.find((p) => p.slug === slug);
  if (!project) return {};
  return { title: project.title, description: project.desc };
}

function FocusText({ text }: { text: string }) {
  const parts = text.split("<br>");
  return (
    <>
      {parts.map((part, i) => (
        <span key={i}>
          {i > 0 && (
            <>
              <br />
              <br />
            </>
          )}
          {part}
        </span>
      ))}
    </>
  );
}

export default async function GameProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = GAME_PROJECTS.find((p) => p.slug === slug);
  if (!project) notFound();

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <SiteHeader base="/" />
      <main className="project-page" id="main-content">
        <Link className="project-back" href="/#projects">
          ← Back to projects
        </Link>
        <section className="project-hero">
          <div className="project-number-large">{project.number}</div>
          <h1>{project.h1}</h1>
          <p className="project-subtitle">{project.sub}</p>
          <div className="project-meta">
            <span>{project.meta[0]}</span>
            <span>{project.meta[1]}</span>
          </div>
        </section>
        <div className="project-content">
          <article className="project-detail-card">
            <h2>What I did</h2>
            <ul>
              {project.bullets.map((bullet, i) => (
                <li key={i}>{bullet}</li>
              ))}
            </ul>
            <div className="project-note">{project.note}</div>
          </article>
          <aside className="project-side">
            <div className="project-detail-card">
              <h3>Skills &amp; tools</h3>
              <div className="project-tags">
                {project.skills.map((skill) => (
                  <span key={skill}>{skill}</span>
                ))}
              </div>
            </div>
            <div className="project-detail-card">
              <h3>Project focus</h3>
              <p
                style={{
                  margin: 0,
                  color: "var(--muted)",
                  lineHeight: 1.7,
                }}
              >
                <FocusText text={project.focus} />
              </p>
              {project.image && (
                <span className="project-visual">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={project.image.src} alt={project.image.alt} />
                </span>
              )}
            </div>
          </aside>
        </div>
        <div className="project-footer">
          <Link className="button button-soft" href="/#projects">
            ← All projects
          </Link>
          <Link className="button" href="/#foot">
            Work with me ✦
          </Link>
        </div>
      </main>
      <SiteFooter base="/" />
    </>
  );
}
