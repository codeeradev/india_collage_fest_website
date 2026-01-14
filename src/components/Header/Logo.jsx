import logo from "../../assets/logo.png"; // adjust path if needed

const Logo = () => {
  return (
    <img
      src={logo}
      alt="Site Logo"
      className="w-24 h-auto object-contain select-none"
      draggable="false"
    />
  );
};

export default Logo;
