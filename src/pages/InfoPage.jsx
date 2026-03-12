import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "../components/ui/button";
import PageLayout from "../components/layout/PageLayout";
import SectionWrapper from "../components/layout/SectionWrapper";

const contentMap = {
  terms: {
    title: "Terms & Conditions",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    gradient: "from-blue-600 to-sky-500",
    sections: [
      {
        heading: "Welcome to India College Fest",
        content: "By accessing and using our website, you agree to comply with these Terms & Conditions. Please read them carefully before using our services."
      },
      {
        heading: "Use of Services",
        content: "Our website provides information about college events, festivals, workshops, and webinars. You must not use our website for illegal activities or disrupt the user experience. All content is provided for informational purposes only."
      },
      {
        heading: "Content Rights",
        content: "We reserve the right to modify, update, or remove content as we see fit. All content on this website is protected by copyright and intellectual property laws."
      },
      {
        heading: "User Responsibilities",
        content: "Users are responsible for maintaining the confidentiality of their account information and for all activities that occur under their account."
      },
      {
        heading: "Contact",
        content: "For any issues related to content or terms, please contact us directly at indiacollegefest@gmail.com"
      }
    ],
  },

  privacy: {
    title: "Privacy Policy",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    gradient: "from-blue-600 to-indigo-500",
    sections: [
      {
        heading: "Your Privacy Matters",
        content: "At India College Fest, we value your privacy and are committed to protecting your personal information. This policy explains how we collect, use, and safeguard your data."
      },
      {
        heading: "Information We Collect",
        content: "We collect data such as IP addresses, cookies, and browsing data to improve your experience. This information helps us understand user preferences and optimize our platform."
      },
      {
        heading: "How We Use Your Data",
        content: "Your data is used to personalize your experience, improve our services, and communicate important updates about events and features."
      },
      {
        heading: "Data Sharing",
        content: "We do not share your data with third parties except for services required to operate our website (hosting, analytics, email services). We ensure all third-party services comply with privacy standards."
      },
      {
        heading: "Your Control",
        content: "You can control cookie usage in your browser settings. You may also request access to, correction of, or deletion of your personal data. By using our website, you consent to this policy."
      }
    ],
  },

  about: {
    title: "About Us",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    gradient: "from-blue-600 to-blue-500",
    sections: [
      {
        heading: "Welcome to India College Fest",
        content: "Your ultimate platform for discovering college festivals, webinars, workshops, expos, and exciting events across India."
      },
      {
        heading: "Our Mission",
        content: "We connect students, educators, and event organizers by delivering up-to-date event information in one centralized platform. Our goal is to make discovering and attending events effortless and enjoyable."
      },
      {
        heading: "What We Offer",
        content: "From cultural festivals and technical symposiums to career workshops and networking events, we bring you comprehensive event listings with detailed information, easy booking, and personalized recommendations."
      },
      {
        heading: "Our Community",
        content: "Join thousands of students and educators who trust India College Fest to stay connected with the vibrant college event ecosystem. Explore, learn, connect, and celebrate with us."
      },
      {
        heading: "Our Vision",
        content: "To become India's most trusted and comprehensive platform for college events, fostering connections and creating memorable experiences for the student community."
      }
    ],
  },

  contact: {
    title: "Contact Us",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    gradient: "from-blue-600 to-cyan-500",
    contacts: [
      {
        type: "Email",
        value: "indiacollegefest@gmail.com",
        icon: (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        ),
        href: "mailto:indiacollegefest@gmail.com"
      },
      {
        type: "Phone",
        value: "+91 8930486972",
        icon: (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
        ),
        href: "tel:+918930486972"
      },
      {
        type: "WhatsApp",
        value: "+91 8930486972",
        icon: (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
          </svg>
        ),
        href: "https://wa.me/918930486972"
      },
      {
        type: "Website",
        value: "indiacollegefest.com",
        icon: (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
          </svg>
        ),
        href: "https://indiacollegefest.com"
      }
    ],
    social: [
      {
        name: "Facebook",
        handle: "IndiaCollegeFest",
        icon: (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
        ),
        href: "https://www.facebook.com/indiacollegefest"
      },
      {
        name: "Twitter",
        handle: "college_fest",
        icon: (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
          </svg>
        ),
        href: "https://twitter.com/indiacollegefest"
      },
      {
        name: "Instagram",
        handle: "indiacollegefest",
        icon: (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
          </svg>
        ),
        href: "https://www.instagram.com/indiacollegefest/"
      },
      {
        name: "YouTube",
        handle: "India College Fest",
        icon: (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
          </svg>
        ),
        href: "https://www.youtube.com"
      }
    ],
    sections: [
      {
        heading: "Get in Touch",
        content: "Have questions, feedback, or need support? We're here to help! Reach out to us through any of the channels below, and our team will get back to you as soon as possible."
      },
      {
        heading: "Business Inquiries",
        content: "For partnership opportunities, event collaborations, or advertising inquiries, please email us at indiacollegefest@gmail.com with the subject line 'Business Inquiry'."
      },
      {
        heading: "Support Hours",
        content: "Our support team is available Monday to Saturday, 9:00 AM to 6:00 PM IST. We typically respond to all inquiries within 24-48 hours."
      }
    ]
  },
};

export default function InfoPage() {
  const { page } = useParams();
  const navigate = useNavigate();

  const content = contentMap[page];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  if (!content) {
    return (
      <PageLayout mainClassName="bg-gradient-to-b from-slate-50 via-white to-slate-100/70 flex flex-col gap-0">
        <SectionWrapper as="div" maxWidthClass="max-w-6xl">
            <div className="mx-auto max-w-2xl rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-[0_20px_60px_-38px_rgba(15,23,42,0.45)] md:p-12">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-slate-100">
                <svg className="h-10 w-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>

              <h2 className="mt-5 text-2xl font-semibold text-slate-900">Page Not Found</h2>
              <p className="mt-2 text-slate-600">The page you are looking for does not exist.</p>

              <Button
                onClick={() => navigate("/")}
                className="mt-6 rounded-full bg-gradient-to-r from-blue-700 to-cyan-500 px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:shadow-lg"
              >
                Go Home
              </Button>
            </div>
        </SectionWrapper>
      </PageLayout>
    );
  }

  return (
    <PageLayout mainClassName="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-100/70 flex flex-col gap-0">
        <div className="pointer-events-none absolute -top-32 left-[-8rem] h-72 w-72 rounded-full bg-blue-200/45 blur-3xl" />
        <div className="pointer-events-none absolute top-44 right-[-9rem] h-72 w-72 rounded-full bg-cyan-200/35 blur-3xl" />

        <SectionWrapper as="div" maxWidthClass="max-w-6xl" className="relative z-10">
          <nav className="mb-6 flex items-center gap-2 text-sm text-slate-500">
            <Button onClick={() => navigate("/")} className="transition-colors hover:text-blue-700">
              Home
            </Button>
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="font-semibold text-slate-800">{content.title}</span>
          </nav>

          <section className="relative overflow-hidden rounded-[32px] border border-slate-200/80 bg-white/95 p-8 shadow-[0_24px_60px_-40px_rgba(15,23,42,0.45)] md:p-10">
            <div className="pointer-events-none absolute -top-16 right-[-4rem] h-56 w-56 rounded-full bg-primary/10 blur-3xl" />

            <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg">
                {content.icon}
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Policy and Information</p>
                <h1 className="mt-2 text-3xl font-semibold text-slate-900 md:text-5xl">{content.title}</h1>
                <p className="mt-2 text-sm text-slate-600">Last updated: February 19, 2026</p>
              </div>
            </div>
          </section>

          <section className="mt-8 overflow-hidden rounded-[32px] border border-slate-200/80 bg-white/95 shadow-[0_24px_60px_-42px_rgba(15,23,42,0.45)]">
            <div className="space-y-8 p-6 md:p-10">
              {content.sections?.map((section, index) => (
                <article
                  key={index}
                  style={{ animationDelay: `${index * 70}ms` }}
                  className="animate-enter-up rounded-2xl border border-slate-200/80 bg-white p-5 md:p-6"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-sm font-semibold text-primary-foreground">
                      {index + 1}
                    </div>

                    <div>
                      <h2 className="text-xl font-semibold text-slate-900 md:text-2xl">{section.heading}</h2>
                      <p className="mt-2 text-[15px] leading-relaxed text-slate-700 md:text-base">{section.content}</p>
                    </div>
                  </div>
                </article>
              ))}

              {page === "contact" && content.contacts && (
                <section className="border-t border-slate-200 pt-8">
                  <h2 className="text-2xl font-semibold text-slate-900">Contact Information</h2>
                  <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    {content.contacts.map((contact, index) => (
                      <a
                        key={index}
                        href={contact.href}
                        target={contact.href.startsWith("http") ? "_blank" : undefined}
                        rel={contact.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="group flex items-center gap-4 rounded-xl border border-slate-200 bg-slate-50 p-4 transition-all hover:-translate-y-0.5 hover:border-blue-300 hover:bg-white hover:shadow-md"
                      >
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-md">
                          {contact.icon}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{contact.type}</p>
                          <p className="truncate text-sm font-medium text-slate-900">{contact.value}</p>
                        </div>
                        <svg className="h-4 w-4 text-slate-400 transition-all group-hover:translate-x-0.5 group-hover:text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </a>
                    ))}
                  </div>
                </section>
              )}

              {page === "contact" && content.social && (
                <section className="border-t border-slate-200 pt-8">
                  <h2 className="text-2xl font-semibold text-slate-900">Follow Us</h2>
                  <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {content.social.map((social, index) => (
                      <a
                        key={index}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4 transition-all hover:-translate-y-0.5 hover:border-blue-300 hover:bg-white hover:shadow-md"
                      >
                        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition-colors group-hover:border-blue-300 group-hover:text-blue-600">
                          {social.icon}
                        </div>
                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-slate-900">{social.name}</p>
                          <p className="truncate text-xs text-slate-500">@{social.handle}</p>
                        </div>
                      </a>
                    ))}
                  </div>
                </section>
              )}
            </div>

            <div className="relative overflow-hidden bg-primary px-6 py-9 text-center text-primary-foreground md:px-10 md:py-12">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_30%,rgba(255,255,255,0.2),transparent_38%),radial-gradient(circle_at_85%_78%,rgba(255,255,255,0.14),transparent_34%)]" />

              <div className="relative z-10">
                <h3 className="text-2xl font-semibold tracking-tight md:text-3xl">
                  {page === "contact" ? "Ready to Get Started?" : "Need Support?"}
                </h3>
                <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-primary-foreground/90 md:text-base">
                  {page === "contact"
                    ? "We are here to help you discover events and create better experiences."
                    : "Reach out to our team for any questions about policies, account usage, or platform support."}
                </p>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate(page === "contact" ? "/events" : "/info/contact")}
                  className="mt-6 h-auto rounded-full border-border/70 bg-background px-7 py-3 text-sm font-semibold text-foreground shadow-md transition hover:-translate-y-0.5 hover:bg-background/90 hover:text-foreground hover:shadow-lg"
                >
                  {page === "contact" ? "Explore Events" : "Contact Us"}
                </Button>
              </div>
            </div>
          </section>

          <section className="mt-10">
            <div className="mb-4 flex items-center justify-between gap-3">
              <h2 className="text-lg font-semibold text-slate-900 md:text-xl">Explore More</h2>
              <p className="text-xs uppercase tracking-[0.14em] text-slate-500">Quick Navigation</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {Object.keys(contentMap)
                .filter((key) => key !== page)
                .map((key) => (
                  <Button
                    key={key}
                    type="button"
                    variant="ghost"
                    onClick={() => navigate(`/info/${key}`)}
                    className="group h-auto w-full flex-col items-start justify-start whitespace-normal rounded-2xl border border-border bg-card p-5 text-left transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:bg-accent/30 hover:shadow-md"
                  >
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
                      {contentMap[key].icon}
                    </div>
                    <h3 className="text-base font-semibold text-foreground transition-colors group-hover:text-primary">
                      {contentMap[key].title}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">Learn more -&gt;</p>
                  </Button>
                ))}
            </div>
          </section>
        </SectionWrapper>
    </PageLayout>
  );
}
