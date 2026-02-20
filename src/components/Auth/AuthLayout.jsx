import Logo from "../Header/Logo";

const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-gradient-to-b from-slate-50 via-white to-slate-100/70">
      <div className="hidden lg:flex items-center bg-gradient-to-br from-slate-950 via-blue-950 to-cyan-950">
        <div className="mx-auto w-full max-w-xl px-14 text-white">
          <div className="mb-10 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 w-fit">
            <Logo />
          </div>

          <h1 className="text-5xl font-semibold leading-tight">
            Launch and manage events with a cleaner workflow.
          </h1>

          <ul className="mt-8 space-y-4 text-base text-slate-100/90">
            <li className="flex items-center gap-3">
              <span className="h-2.5 w-2.5 rounded-full bg-cyan-300" />
              Publish events in minutes
            </li>
            <li className="flex items-center gap-3">
              <span className="h-2.5 w-2.5 rounded-full bg-cyan-300" />
              Fast onboarding and secure auth
            </li>
            <li className="flex items-center gap-3">
              <span className="h-2.5 w-2.5 rounded-full bg-cyan-300" />
              Built for organizers and communities
            </li>
          </ul>

          <p className="mt-10 text-sm text-slate-300">
            India College Fest platform for modern event operations.
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-7 shadow-[0_24px_50px_-38px_rgba(15,23,42,0.45)] md:p-9">
          <div className="lg:hidden mb-8 text-center">
            <Logo />
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;