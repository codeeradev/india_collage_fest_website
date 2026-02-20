import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

import { get } from "../api/apiClient";
import { ENDPOINTS } from "../api/endpoints";
import Header from "../components/Header/Header";
import Footer from "../components/Footer";
import { resolveMediaUrl, withImageFallback } from "../utils/mediaUrl";

const containerClass = "max-w-6xl mx-auto px-6";

const getExcerpt = (blog) => {
  if (blog?.excerpt) return blog.excerpt;
  if (blog?.content) return blog.content.slice(0, 180) + "...";
  return "";
};

const formatDate = (value) => {
  if (!value) return "N/A";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "N/A";
  return date.toLocaleDateString();
};

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError("");
        const res = await get(ENDPOINTS.GET_BLOGS);
        setBlogs(res?.data?.data || []);
      } catch (err) {
        setError("Failed to load blogs");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const origin = typeof window !== "undefined" ? window.location.origin : "";
  const pageTitle = "Blog - India College Fest";
  const pageDescription =
    "Read the latest stories, guides, and updates from India College Fest.";

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-slate-100/70">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="website" />
        <link rel="canonical" href={`${origin}/blog`} />
      </Helmet>

      <Header />

      <div className="pt-28 pb-16">
        <div className={containerClass}>
          <div className="mb-10">
            <h1 className="text-3xl md:text-5xl font-semibold text-slate-900">
              India Fest Blog
            </h1>
            <p className="mt-2 text-slate-600 max-w-2xl">
              Latest updates, highlights, and stories from college events.
            </p>
          </div>

          {loading && (
            <div className="py-12 text-center text-slate-500">Loading blogs...</div>
          )}

          {error && (
            <div className="py-12 text-center text-red-500">{error}</div>
          )}

          {!loading && !error && blogs.length === 0 && (
            <div className="py-12 text-center text-slate-500">No blogs yet.</div>
          )}

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {blogs.map((blog) => (
              <Link
                key={blog._id}
                to={`/blog/${blog.slug}`}
                className="bg-white rounded-3xl border border-slate-200/80 shadow-[0_12px_30px_-24px_rgba(15,23,42,0.35)] hover:shadow-[0_25px_60px_-35px_rgba(15,23,42,0.45)] transition-all duration-300 overflow-hidden group hover:-translate-y-1"
              >
                <div className="h-44 bg-slate-100 overflow-hidden">
                {blog.image ? (
                  <img
                    src={resolveMediaUrl(blog.image, "/images/event-placeholder.svg")}
                    alt={blog.title}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(eventTarget) =>
                      withImageFallback(eventTarget, "/images/event-placeholder.svg")
                    }
                  />
                ) : (
                    <div className="h-full w-full flex items-center justify-center text-slate-400">
                      No image
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <div className="text-xs text-slate-500">
                    {formatDate(blog.publishedAt || blog.createdAt)}
                  </div>
                  <h3 className="mt-2 text-lg font-semibold text-slate-900 line-clamp-2">
                    {blog.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-600 line-clamp-3">
                    {getExcerpt(blog)}
                  </p>
                  {blog.tags?.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {blog.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 text-xs rounded-full bg-slate-100 text-slate-600"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BlogList;
