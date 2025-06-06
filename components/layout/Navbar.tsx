import Link from "next/link";
import { ThemeSelect } from "./ThemeSelect";
export const Navbar = () => {
  return (
    <nav className="bg-[var(--background)] shadow-md py-4 px-6 flex justify-between items-center ">
      <Link
        href="/"
        className="text-2xl font-bold text-[var(--primary)] hover:text-[var(--accent)] transition-colors"
      >
        Earthquake Map
      </Link>

      <div className="flex items-center space-x-3">
        <Link
          href="/about"
          className="text-[var(--primary)] hover:text-[var(--accent)] transition-colors"
        >
          About
        </Link>
        <ThemeSelect />
      </div>
    </nav>
  );
};
