import logo from "../../assets/logo.png"; // adjust path if needed

const Logo = () => {
  return (
    <img
      src={logo}
      alt="Site Logo"
      className="h-auto w-[160px] min-w-[140px] shrink-0 max-w-full object-contain select-none drop-shadow-[0_8px_18px_rgba(29,78,216,0.18)] transition-transform duration-300 hover:scale-[1.01] sm:w-[178px] sm:min-w-[160px] md:w-[196px] lg:w-[212px] xl:w-[224px]"
      draggable="false"
    />
  );
};

export default Logo;
