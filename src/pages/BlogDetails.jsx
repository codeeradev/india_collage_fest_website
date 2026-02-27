import { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet";

import { get } from "../api/apiClient";
import { ENDPOINTS } from "../api/endpoints";
import { resolveMediaUrl, withImageFallback } from "../utils/mediaUrl";
import PageLayout from "../components/layout/PageLayout";
import SectionWrapper from "../components/layout/SectionWrapper";

const formatDate = (value) => {
  if (!value) return "N/A";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "N/A";
  return date.toLocaleDateString();
};

const BlogDetails = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError("");
        const res = await get(`${ENDPOINTS.GET_BLOG_BY_SLUG}/${slug}`);
        setBlog(res?.data?.data || null);
      } catch (err) {
        setError("Blog not found");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [slug]);

  const origin = typeof window !== "undefined" ? window.location.origin : "";

  const meta = useMemo(() => {
    if (!blog) return null;
    const title = blog.metaTitle || blog.title || "Blog";
    const description =
      blog.metaDescription || blog.excerpt || blog.content?.slice(0, 160) || "";
    const image = blog.image
      ? resolveMediaUrl(blog.image, "/images/event-placeholder.svg")
      : "";
    const canonical = `${origin}/blog/${blog.slug}`;
    const publishedAt = blog.publishedAt || blog.createdAt;
    const updatedAt = blog.updatedAt || blog.createdAt;

    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: title,
      description,
      image: image || undefined,
      author: {
        "@type": "Person",
        name: blog.author || "India College Fest",
      },
      datePublished: publishedAt,
      dateModified: updatedAt,
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": canonical,
      },
    };

    return { title, description, image, canonical, jsonLd };
  }, [blog, origin]);

  return (
    <PageLayout mainClassName="bg-gradient-to-b from-white via-slate-50 to-slate-100/70 flex flex-col gap-0">
      {meta && (
        <Helmet>
          <title>{meta.title}</title>
          <meta name="description" content={meta.description} />
          <meta property="og:title" content={meta.title} />
          <meta property="og:description" content={meta.description} />
          {meta.image && <meta property="og:image" content={meta.image} />}
          <meta property="og:type" content="article" />
          <link rel="canonical" href={meta.canonical} />
          <script type="application/ld+json">{JSON.stringify(meta.jsonLd)}</script>
        </Helmet>
      )}

      <SectionWrapper as="div" maxWidthClass="max-w-4xl">
          <div className="mb-6">
            <Link to="/blog" className="text-sm text-slate-500 hover:text-blue-600 transition-colors">
              &larr; Back to blogs
            </Link>
          </div>

          {loading && (
            <div className="py-12 text-center text-slate-500">Loading blog...</div>
          )}

          {error && (
            <div className="py-12 text-center text-red-500">{error}</div>
          )}

          {!loading && !error && blog && (
            <>
              {blog.image && (
                <div className="w-full h-64 md:h-80 rounded-3xl overflow-hidden bg-slate-100 shadow-[0_20px_60px_-40px_rgba(15,23,42,0.35)]">
                  <img
                    src={resolveMediaUrl(blog.image, "/images/event-placeholder.svg")}
                    alt={blog.title}
                    className="w-full h-full object-cover"
                    onError={(eventTarget) =>
                      withImageFallback(eventTarget, "/images/event-placeholder.svg")
                    }
                  />
                </div>
              )}

              <div className="mt-8">
                <h1 className="text-3xl md:text-5xl font-semibold text-slate-900">
                  {blog.title}
                </h1>
                <div className="mt-3 flex flex-wrap gap-3 text-sm text-slate-500">
                  <span>{formatDate(blog.publishedAt || blog.createdAt)}</span>
                  {blog.author && <span>By {blog.author}</span>}
                </div>
              </div>

              {blog.tags?.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {blog.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 text-xs rounded-full bg-slate-100 text-slate-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {blog.excerpt && (
                <p className="mt-6 text-lg text-slate-700 font-medium">
                  {blog.excerpt}
                </p>
              )}

              <div className="mt-6 text-base text-slate-700 leading-relaxed whitespace-pre-line">
                {blog.content}
              </div>
            </>
          )}
      </SectionWrapper>
    </PageLayout>
  );
};

export default BlogDetails;
