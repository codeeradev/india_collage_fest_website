import logo from "../../assets/logo.png"; // adjust path if needed

const Logo = () => {
  return (
    <img
      src={logo}
      alt="Site Logo"
      className="h-auto w-[132px] max-w-full object-contain select-none drop-shadow-[0_8px_18px_rgba(29,78,216,0.18)] transition-transform duration-300 hover:scale-[1.01] sm:w-[150px] md:w-[172px] lg:w-[188px] xl:w-[200px]"
      draggable="false"
    />
  );
};

export default Logo;
