"use client";

import Link from "next/link";
import { ThemeSelect } from "./ThemeSelect";
import { useSettingStore } from "@/providers/StateProvider";
import { Button } from "../ui/button";
import { SettingsDropdown } from "../common/SettingsDropdown";

export const Navbar = () => {
  const { toggleShow } = useSettingStore((state) => state);

  return (
    <header className="bg-[var(--background)] text-white p-4 flex flex-col sm:flex-row justify-between items-center gap-4">
      <div className="flex items-center space-x-4">
        <Link
          href="/"
          className="text-2xl font-bold text-[var(--primary)] hover:text-[var(--accent)] transition-colors"
        >
          Earthquake Map
        </Link>
      </div>
      <nav className="flex flex-wrap flex-col sm:flex-row items-center justify-center gap-2 md:gap-4">
        <Link
          href="/about"
          className="text-[var(--primary)] hover:text-[var(--accent)] transition-colors"
        >
          About
        </Link>
        <SettingsDropdown />
        <ThemeSelect />
      </nav>
    </header>
  );
};
