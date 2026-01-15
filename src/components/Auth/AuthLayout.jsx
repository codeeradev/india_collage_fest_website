import Logo from "../Header/Logo";

const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">

      {/* LEFT BANNER */}
      <div
        className="hidden lg:flex items-center"
        style={{
          background: "linear-gradient(135deg, #312e81, #1e1b4b, #020617)",
        }}
      >
        <div
          className="flex flex-col justify-center px-16 max-w-xl"
          style={{ color: "#ffffff" }}
        >
          <div className="mb-10">
            <Logo />
          </div>

          <h1 className="text-5xl font-extrabold leading-tight mb-8">
            It’s time to <br />
            <span style={{ color: "#fb7185" }}>rock</span> events 🎸
          </h1>

          <ul className="space-y-5 text-lg">
            <li className="flex items-center gap-3">
              <span style={{ color: "#22c55e", fontSize: "20px" }}>✔</span>
              Create event page
            </li>
            <li className="flex items-center gap-3">
              <span style={{ color: "#22c55e", fontSize: "20px" }}>✔</span>
              Easy sign-up & activation
            </li>
            <li className="flex items-center gap-3">
              <span style={{ color: "#22c55e", fontSize: "20px" }}>✔</span>
              Simple registration
            </li>
            <li className="flex items-center gap-3">
              <span style={{ color: "#22c55e", fontSize: "20px" }}>✔</span>
              Zero setup cost
            </li>
          </ul>

          <p className="mt-10 text-sm" style={{ color: "#e5e7eb" }}>
            All the events start here 🚀
          </p>
        </div>
      </div>

      {/* RIGHT FORM */}
      <div className="flex items-center justify-center px-6 bg-white">
        <div className="w-full max-w-md">
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
