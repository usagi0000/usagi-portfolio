import Link from "next/link";

export function SiteFooter({ base = "" }: { base?: string }) {
  return (
<footer className="site-footer" id="down">
<p>© Copyright 2023 Z.Sarra</p>
<Link className="back-top" href={`${base}#up`}>Back to top ↑</Link>
</footer>
  );
}
