import Header from "../Header/Header";
import Footer from "../Footer";

const PageLayout = ({
  children,
  className = "",
  mainClassName = "",
  showHeader = true,
  showFooter = true,
}) => {
  const topOffsetClass = showHeader ? "pt-[70px]" : "";

  return (
    <div className={`min-h-screen flex flex-col ${className}`.trim()}>
      {showHeader ? <Header /> : null}

      <main className={`flex-1 flex flex-col ${topOffsetClass} ${mainClassName}`.trim()}>
        {children}
      </main>

      {showFooter ? <Footer /> : null}
    </div>
  );
};

export default PageLayout;
