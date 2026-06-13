import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { blogPosts, getBlogPost } from "@/lib/content/blog";

type Params = { slug: string };

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) {
    return { title: "Bericht niet gevonden" };
  }
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      images: [{ url: post.hero }],
    },
  };
}

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("nl-NL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

// Render a paragraph that may contain **bold** segments
function renderInline(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} style={{ color: "var(--paars-donker)" }}>
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const paragraphs = post.content.split(/\n\n+/).filter(Boolean);

  // Two other related posts (cycle through)
  const others = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <>
      {/* Hero */}
      <section
        className="relative flex items-end overflow-hidden"
        style={{ minHeight: "60vh", background: "var(--paars-donker)" }}
      >
        <Image
          src={post.hero}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
          aria-hidden
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(61,20,72,.35) 0%, rgba(61,20,72,.55) 60%, rgba(61,20,72,.85) 100%)",
          }}
          aria-hidden
        />

        <div className="relative z-10 design-container py-20">
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-3">
              <span
                className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] bg-wit"
                style={{ color: "var(--paars-donker)" }}
              >
                {post.category}
              </span>
              <span className="text-sm text-wit/85">
                {formatDate(post.date)}
                {post.readingTime ? ` · ${post.readingTime}` : ""}
              </span>
            </div>
            <h1 className="section-h mt-5 text-wit">{post.title}</h1>
            {post.author && (
              <p className="mt-4 text-sm text-wit/80">door {post.author}</p>
            )}
          </div>
        </div>
      </section>

      {/* Article body */}
      <section className="bg-wit py-20">
        <div className="design-container">
          <article
            className="mx-auto max-w-2xl"
            style={{ fontFamily: "var(--sans)" }}
          >
            <p
              className="text-lg leading-relaxed mb-8"
              style={{ color: "var(--tekst)", fontWeight: 500 }}
            >
              {post.excerpt}
            </p>
            {paragraphs.map((para, i) => {
              // Bold-only line acts as a sub-heading
              const isHeading = /^\*\*[^*]+\*\*$/.test(para.trim());
              if (isHeading) {
                return (
                  <h2
                    key={i}
                    className="section-h mt-10"
                    style={{ fontSize: "26px" }}
                  >
                    {para.trim().slice(2, -2)}
                  </h2>
                );
              }
              return (
                <p
                  key={i}
                  className="text-[17px] leading-relaxed mt-6"
                  style={{ color: "var(--tekst)" }}
                >
                  {renderInline(para)}
                </p>
              );
            })}

            {post.tags && post.tags.length > 0 && (
              <div className="mt-12 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold"
                    style={{
                      background: "var(--creme)",
                      color: "var(--paars-donker)",
                      border: "1px solid var(--rand)",
                    }}
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link href="/blog" className="btn-link">
                <ArrowLeft />
                Terug naar overzicht
              </Link>
              <Link href="/kamperen" className="design-btn btn-paars">
                Boek je verblijf en zie ze in het echt
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </article>
        </div>
      </section>

      {/* Lees ook */}
      {others.length > 0 && (
        <section className="design-section bg-creme">
          <div className="design-container">
            <div className="section-head-row">
              <div>
                <span className="section-tag">Lees ook</span>
                <h2 className="section-h">Andere verhalen</h2>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {others.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="group flex gap-5 rounded-card bg-wit overflow-hidden p-4"
                  style={{ boxShadow: "0 6px 24px rgba(0,0,0,.05)" }}
                >
                  <div className="relative h-32 w-40 flex-shrink-0 overflow-hidden rounded-xl">
                    <Image
                      src={p.hero}
                      alt={p.title}
                      fill
                      sizes="160px"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs uppercase tracking-[0.08em] font-semibold" style={{ color: "var(--paars)" }}>
                      {p.category}
                    </span>
                    <h3 className="section-h mt-1" style={{ fontSize: "20px", lineHeight: 1.2 }}>
                      {p.title}
                    </h3>
                    <span className="mt-auto inline-flex items-center gap-2 text-sm font-semibold pt-3" style={{ color: "var(--paars)" }}>
                      Lees verder
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
