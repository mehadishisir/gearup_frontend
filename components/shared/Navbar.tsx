import Link from "next/link";
import Image from "next/image";
import { NAV_LINKS } from "@/constants";
import logo from "@/public/logo.png"

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b bg-white/90 shadow-lg backdrop-blur">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5">

        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src={logo}
            alt="GearUp Logo"
            width={140}
            height={45}
            priority
          />
        </Link>


        {/* Nav Links */}
        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="
              font-medium
              text-slate-700
              transition
              duration-300
              hover:text-orange-500
              "
            >
              {item.label}
            </Link>
          ))}
        </div>


        {/* Auth Buttons */}
        <div className="hidden items-center gap-3 md:flex">

          <Link
            href="/auth/login"
            className="
            rounded-xl
            border
            border-slate-300
            px-5
            py-2
            font-medium
            text-slate-700
            transition
            hover:border-orange-500
            hover:text-orange-500
            "
          >
            Login
          </Link>


          <Link
            href="/auth/register"
            className="
            rounded-xl
            bg-orange-500
            px-5
            py-2
            font-medium
            text-white
            shadow-md
            transition
            hover:bg-orange-600
            "
          >
            Register
          </Link>

        </div>

      </div>
    </nav>
  );
}