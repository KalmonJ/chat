import { Logo } from "components/icons/Logo";

export const Navbar = () => {
  return (
    <nav className=" hidden h-auto max-w-[94px] w-full bg-header relative md:flex flex-col items-center">
      <div className="pt-[16px] px-3">
        <Logo />
      </div>
      <ul>
        <li>
          <a href="" className=""></a>
        </li>
      </ul>
    </nav>
  );
};
