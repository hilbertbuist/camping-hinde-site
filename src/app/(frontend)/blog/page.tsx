import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { blogPosts } from "@/lib/content/blog";

export const metadata: Metadata = {
  title: "Nieuws en verhalen van De Hinde | Boerderijcamping in Dronten",
  description:
    "Laatste nieuws, verhalen en seizoenstips van Boerderijcamping De Hinde. Volg het boerenleven door het jaar heen.",
  alternates: { canonical: "/blog" },
};

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("nl-NL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

export default function BlogPage() {
  const featured = blogPosts[0];
  const rest = blogPosts.slice(1);

  return (
    <>
      {/* Hero */}
      <section className="design-section bg-creme">
        <div className="design-container">
          <div className="max-w-3xl">
            <span className="section-tag">Nieuws &amp; verhalen</span>
            <h1 className="section-h">Wat er speelt op de boerderij</h1>
            <p className="mt-6 text-lg leading-relaxed" style={{ color: "var(--tekst-grijs)" }}>
              Verhalen van het seizoen, tips voor je verblijf, en alles wat we delen willen.
            </p>
          </div>
        </div>
      </section>

      {/* Featured */}
      {featured && (
        <section className="design-section bg-wit">
          <div className="design-container">
            <div className="section-head-row">
              <div>
                <span className="section-tag">Uitgelicht</span>
                <h2 className="section-h">Net binnen</h2>
              </div>
            </div>

            <article className="grid gap-10 lg:grid-cols-2 lg:items-center">
              <Link
                href={`/blog/${featured.slug}`}
                className="block overflow-hidden rounded-card group"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <Image
                    src={featured.hero}
                    alt={featured.title}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    priority
                  />
                </div>
              </Link>

              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <span
                    className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em]"
                    style={{ background: "var(--oranje)", color: "var(--paars-donker)" }}
                  >
                    {featured.category}
                  </span>
                  <span className="text-sm" style={{ color: "var(--tekst-grijs)" }}>
                    {formatDate(featured.date)}
                  </span>
                </div>
                <h3 className="section-h mt-4" style={{ fontSize: "clamp(28px, 3.5vw, 44px)" }}>
                  <Link href={`/blog/${featured.slug}`} className="hover:underline">
                    {featured.title}
                  </Link>
                </h3>
                <p className="mt-5 text-[17px] leading-relaxed" style={{ color: "var(--tekst)" }}>
                  {featured.excerpt}
                </p>
                <Link href={`/blog/${featured.slug}`} className="btn-link mt-6">
                  Lees verder
                  <ArrowRight />
                </Link>
              </div>
            </article>
          </div>
        </section>
      )}

      {/* Rest */}
      {rest.length > 0 && (
        <section className="design-section bg-creme">
          <div className="design-container">
            <div className="section-head-row">
              <div>
                <span className="section-tag">Meer berichten</span>
                <h2 className="section-h">Eerder verschenen</h2>
              </div>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              {rest.map((post) => (
                <article
                  key={post.slug}
                  className="rounded-card bg-wit overflow-hidden flex flex-col"
                  style={{ boxShadow: "0 6px 24px rgba(0,0,0,.05)" }}
                >
                  <Link href={`/blog/${post.slug}`} className="group block relative">
                    <div className="relative aspect-[4/3] w-full overflow-hidden">
                      <Image
                        src={post.hero}
                        alt={post.title}
                        fill
                        sizes="(min-width: 768px) 50vw, 100vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <span
                      className="absolute top-4 left-4 inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em]"
                      style={{ background: "var(--oranje)", color: "var(--paars-donker)" }}
                    >
                      {post.category}
                    </span>
                  </Link>

                  <div className="p-7 flex flex-col flex-1">
                    <span className="text-sm" style={{ color: "var(--tekst-grijs)" }}>
                      {formatDate(post.date)}
                    </span>
                    <h3 className="section-h mt-2" style={{ fontSize: "26px" }}>
                      <Link href={`/blog/${post.slug}`} className="hover:underline">
                        {post.title}
                      </Link>
                    </h3>
                    <p className="mt-3 leading-relaxed flex-1" style={{ color: "var(--tekst)" }}>
                      {post.excerpt}
                    </p>
                    <Link href={`/blog/${post.slug}`} className="btn-link mt-5 self-start">
                      Lees verder
                      <ArrowRight />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
