import Image from "next/image";
import Link from "next/link";
import { NAV_LINKS } from "@/constants";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">

          <Image
            src="/logo.png"
            alt="GearUp"
            width={170}
            height={50}
            priority
          />

        </Link>

        {/* Nav */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-medium hover:text-orange-500 transition"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Auth */}
        <div className="hidden md:flex gap-3">
          <Link
            href="/auth/login"
            className="border rounded-lg px-5 py-2"
          >
            Login
          </Link>

          <Link
            href="/auth/register"
            className="rounded-lg bg-orange-500 text-white px-5 py-2"
          >
            Register
          </Link>
        </div>

      </div>
    </nav>
  );
}