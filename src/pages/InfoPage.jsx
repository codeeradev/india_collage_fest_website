import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const CONTAINER = "max-w-5xl mx-auto px-6 py-12 md:py-20";

const contentMap = {
  terms: {
    title: "Terms & Conditions",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    gradient: "from-blue-500 to-cyan-500",
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
    gradient: "from-purple-500 to-pink-500",
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
    gradient: "from-orange-500 to-pink-500",
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
    gradient: "from-green-500 to-teal-500",
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
        href: "#"
      },
      {
        name: "Twitter",
        handle: "college_fest",
        icon: (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
          </svg>
        ),
        href: "#"
      },
      {
        name: "Instagram",
        handle: "indiacollegefest",
        icon: (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
          </svg>
        ),
        href: "#"
      },
      {
        name: "YouTube",
        handle: "India College Fest",
        icon: (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
          </svg>
        ),
        href: "#"
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-20 h-20 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
            <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Page Not Found</h2>
          <p className="text-gray-600">The page you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate("/")}
            className="mt-4 px-6 py-3 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 text-white rounded-full font-semibold hover:shadow-lg transition-all"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen">
      <div className={CONTAINER}>
        {/* Header Section */}
        <div className="mb-12">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-gray-600 mb-6">
            <button onClick={() => navigate("/")} className="hover:text-purple-600 transition-colors">
              Home
            </button>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-gray-900 font-medium">{content.title}</span>
          </nav>

          {/* Title Card */}
          <div className="relative overflow-hidden bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-3xl p-8 md:p-12 shadow-sm">
            {/* Decorative gradient */}
            <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${content.gradient} opacity-5 rounded-full blur-3xl`} />
            
            <div className="relative z-10 flex items-center gap-6">
              <div className={`hidden md:flex w-16 h-16 rounded-2xl bg-gradient-to-br ${content.gradient} items-center justify-center text-white shadow-lg`}>
                {content.icon}
              </div>
              
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
                  {content.title}
                </h1>
                <p className="text-gray-600">
                  Last updated: February 2026
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="bg-white border border-gray-200 rounded-3xl shadow-sm overflow-hidden">
          <div className="p-8 md:p-12 space-y-10">
            {/* Regular sections */}
            {content.sections?.map((section, index) => (
              <div
                key={index}
                className="group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start gap-4">
                  <div className={`flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br ${content.gradient} opacity-10 group-hover:opacity-20 transition-opacity flex items-center justify-center`}>
                    <span className={`text-lg font-bold bg-gradient-to-br ${content.gradient} bg-clip-text text-transparent`}>
                      {index + 1}
                    </span>
                  </div>
                  
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-900 mb-3">
                      {section.heading}
                    </h2>
                    <p className="text-gray-700 text-lg leading-relaxed">
                      {section.content}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* Contact-specific content */}
            {page === 'contact' && content.contacts && (
              <>
                <div className="border-t border-gray-200 pt-10">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {content.contacts.map((contact, index) => (
                      <a
                        key={index}
                        href={contact.href}
                        target={contact.href.startsWith('http') ? '_blank' : undefined}
                        rel={contact.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="group flex items-center gap-4 p-5 bg-gray-50 hover:bg-gray-100 border border-gray-200 hover:border-purple-300 rounded-xl transition-all hover:shadow-md"
                      >
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${content.gradient} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform`}>
                          {contact.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-gray-600 mb-1">{contact.type}</p>
                          <p className="text-gray-900 font-medium truncate">{contact.value}</p>
                        </div>
                        <svg className="w-5 h-5 text-gray-400 group-hover:text-purple-600 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </a>
                    ))}
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-10">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Follow Us on Social Media</h2>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {content.social.map((social, index) => (
                      <a
                        key={index}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-3 p-5 bg-gray-50 hover:bg-gradient-to-br hover:from-orange-50 hover:via-pink-50 hover:to-purple-50 border border-gray-200 hover:border-purple-300 rounded-xl transition-all hover:shadow-md"
                      >
                        <div className="w-10 h-10 rounded-full bg-white border border-gray-200 group-hover:border-purple-300 flex items-center justify-center text-gray-700 group-hover:text-purple-600 transition-all">
                          {social.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-gray-900 text-sm">{social.name}</p>
                          <p className="text-xs text-gray-600 truncate">@{social.handle}</p>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Bottom CTA */}
          <div className={`bg-gradient-to-r ${content.gradient} p-8 md:p-10`}>
            <div className="text-center text-white space-y-4">
              <h3 className="text-2xl font-bold">
                {page === 'contact' ? 'Ready to Get Started?' : 'Have Questions?'}
              </h3>
              <p className="text-white/90 max-w-2xl mx-auto">
                {page === 'contact' 
                  ? "We're here to help you discover amazing events and create unforgettable experiences."
                  : "If you have any questions or need clarification, feel free to reach out to us."
                }
              </p>
              <button
                onClick={() => navigate(page === 'contact' ? '/events' : '/info/contact')}
                className="mt-4 px-8 py-3 bg-white text-gray-900 rounded-full font-semibold hover:shadow-lg transition-all hover:scale-105 active:scale-95"
              >
                {page === 'contact' ? 'Explore Events' : 'Contact Us'}
              </button>
            </div>
          </div>
        </div>

        {/* Related Links */}
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.keys(contentMap)
            .filter(key => key !== page)
            .map((key) => (
              <button
                key={key}
                onClick={() => navigate(`/info/${key}`)}
                className="group p-6 bg-white border border-gray-200 hover:border-purple-300 rounded-2xl transition-all hover:shadow-md text-left"
              >
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${contentMap[key].gradient} opacity-10 group-hover:opacity-20 transition-opacity mb-4 flex items-center justify-center`}>
                  <div className="text-gray-700">
                    {contentMap[key].icon}
                  </div>
                </div>
                <h3 className="font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                  {contentMap[key].title}
                </h3>
                <p className="text-sm text-gray-600">
                  Learn more →
                </p>
              </button>
            ))}
        </div>
      </div>
    </div>
  );
}