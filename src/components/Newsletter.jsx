const Newsletter = () => {
  return (
    <section aria-label="Newletter Section" className="pt-10">
      <div className="relative flex flex-col-reverse lg:flex-row md:flex-col md:justify-center lg:justify-center md:items-center lg:items-center">
        <div className="flex-shrink-0 mb-10 lg:mb-0 lg:mr-10 lg:w-2/5">
          <h2 className="font-semibold text-3xl md:text-4xl">Join Our Newsletter! 📬</h2>
          <span className="block mt-5 text-gray-500">We get it – spam is no one&#x27;s friend! That&#x27;s why our newsletter is different.🎉</span>
          <ul className="space-y-4 mt-10">
            <li className="flex items-center space-x-4">
              <span className="rounded-full text-blue-700 bg-blue-100 text-xs py-1 px-3">01</span>
              <span className="font-medium text-gray-700">Access to upcoming events, webinars, and more. 🤩</span>
            </li>
            <li className="flex items-center space-x-4">
              <span className="rounded-full text-red-700 bg-red-100 text-xs py-1 px-3">02</span>
              <span className="font-medium text-gray-700">Exclusive offers and coupons just for our subscribers. 🌟</span>
            </li>
          </ul>
          <div>
            <form className="mt-10 relative max-w-sm" aria-label="Subscribe to newsletter">
              <label htmlFor="email-input" className="sr-only">Enter your email to subscribe</label>
              <div>
                <div className="relative z-0">
                  <label className="text-sm text-slate-600 leading-6 capitalize cursor-pointer block w-full font-medium"></label>
                  <input className="w-full mt-1 border border-slate-200 focus:outline-none focus:ring-[1.3px] focus:ring-blue-300 focus:border-transparent transition duration-300 ease-in-out focus:ring-opacity-90 placeholder:text-slate-400 placeholder:font-normal rounded-full h-12 w-full py-3 border-2 border-slate-200 px-3" type="email" placeholder="Enter your email" maxLength="255" id="email-input" name="email" value="" />
                </div>
              </div>
              <button aria-label="Submit email" title="Submit email" type="submit" className="absolute mt-0.5 transform top-1/2 -translate-y-1/2 right-2 hover:scale-95 duration-200 text-white rounded-full bg-[#ff5862] flex justify-center items-center p-2">
                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" className="text-lg" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                  <path d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l370.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128z"></path>
                </svg>
              </button>
            </form>
          </div>
        </div>
        <div className="mb-5 md:mb-0">
          <img alt="doodle" draggable="false" fetchPriority="high" loading="eager" width="400" height="400" decoding="async" data-nimg="1" className="noContextmenu" style={{ color: 'transparent' }} srcSet="../_next/image?url=%2F_next%2Fstatic%2Fmedia%2FNew%20letter%20at%20landing.41a9404a.webp&amp;w=640&amp;q=75 1x, ../_next/image?url=%2F_next%2Fstatic%2Fmedia%2FNew%20letter%20at%20landing.41a9404a.webp&amp;w=828&amp;q=75 2x" src="../_next/image?url=%2F_next%2Fstatic%2Fmedia%2FNew%20letter%20at%20landing.41a9404a.webp&amp;w=828&amp;q=75" />
        </div>
      </div>
    </section>
  );
};

export default Newsletter;