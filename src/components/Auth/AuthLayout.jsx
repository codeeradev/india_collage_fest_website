import Logo from "../Header/Logo";
import { Card, CardContent } from "../ui/card";

const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-gradient-to-b from-slate-50 via-white to-blue-50/40">
      <div className="hidden lg:flex items-center bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.22),transparent_38%),radial-gradient(circle_at_80%_10%,rgba(34,211,238,0.18),transparent_35%),linear-gradient(135deg,#020617_0%,#0b1f46_58%,#0a2d6f_100%)]">
        <div className="mx-auto w-full max-w-xl px-14 text-white">
          <div className="mb-10 rounded-2xl border border-white/15 bg-white/10 px-5 py-3 w-fit backdrop-blur-sm">
            <Logo />
          </div>

          <h1 className="text-5xl font-semibold leading-tight">
            Launch and manage events with a cleaner workflow.
          </h1>

          <ul className="mt-8 space-y-4 text-base text-slate-100/90">
            <li className="flex items-center gap-3">
              <span className="h-2.5 w-2.5 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(34,211,238,0.8)]" />
              Publish events in minutes
            </li>
            <li className="flex items-center gap-3">
              <span className="h-2.5 w-2.5 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(34,211,238,0.8)]" />
              Fast onboarding and secure auth
            </li>
            <li className="flex items-center gap-3">
              <span className="h-2.5 w-2.5 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(34,211,238,0.8)]" />
              Built for organizers and communities
            </li>
          </ul>

          <p className="mt-10 text-sm text-slate-300">
            India College Fest platform for modern event operations.
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center px-6 py-12">
        <Card className="w-full max-w-md rounded-3xl border-slate-200/90 bg-white/95 shadow-[0_26px_58px_-34px_rgba(15,23,42,0.42)] backdrop-blur-sm">
          <CardContent className="p-7 md:p-9">
          <div className="lg:hidden mb-8 text-center">
            <Logo />
          </div>
          {children}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AuthLayout;
