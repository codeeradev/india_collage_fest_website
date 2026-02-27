const SectionWrapper = ({
  children,
  className = "",
  as: Tag = "section",
  maxWidthClass = "max-w-7xl",
  withVerticalSpacing = true,
}) => {
  const spacingClass = withVerticalSpacing ? "py-10 md:py-14 lg:py-20" : "";

  return (
    <Tag
      className={`mx-auto w-full ${maxWidthClass} overflow-x-hidden px-4 sm:px-6 lg:px-8 ${spacingClass} ${className}`.trim()}
    >
      {children}
    </Tag>
  );
};

export default SectionWrapper;
