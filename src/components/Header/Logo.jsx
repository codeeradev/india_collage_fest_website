import logo from "../../assets/logo.png"; // adjust path if needed

const Logo = () => {
  return (
    <img
      src={logo}
      alt="Site Logo"
      className="w-[170px] md:w-[190px] h-auto object-contain select-none drop-shadow-[0_8px_18px_rgba(29,78,216,0.18)] transition-transform duration-300 hover:scale-[1.01]"
      draggable="false"
    />
  );
};

export default Logo;
