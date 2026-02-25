const featureItems = [
  "Trusted by 50,000+ organizers worldwide",
  "24/7 customer support for your events",
  "Secure payment processing with instant payouts",
  "Free event listing - only pay when you sell",
  "Marketing tools to reach more attendees",
  "Mobile app for managing events on the go",
];

const WhyBookWithUs = () => {

  return (
    <section aria-label="Why Book With Us" className="rounded-[28px] border border-slate-200 bg-white/90 p-5 md:p-8 lg:p-10">
      <header className="mx-auto max-w-4xl text-center">
        <h2 className="text-3xl font-semibold text-slate-900 md:text-5xl">
          Why Bring events with us?
        </h2>
        <p className="mx-auto mt-4 max-w-3xl text-base text-slate-600 md:text-xl md:leading-relaxed">
          Join thousands of successful event organizers who trust our platform to bring their events to life
        </p>
      </header>

      <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {featureItems.map((item, index) => (
          <article
            key={item}
            style={{ animationDelay: `${index * 60}ms` }}
            className="animate-enter-up rounded-2xl border border-slate-200 bg-white p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-sm"
          >
            <div className="flex items-start gap-3">
              <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m5 12 4 4 10-10" />
                </svg>
              </span>
              <p className="text-xl text-slate-800">{item}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default WhyBookWithUs;
