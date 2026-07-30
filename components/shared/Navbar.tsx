import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="border-b p-4">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <h1 className="text-2xl font-bold">🏋️ GearUp</h1>

        <div className="flex gap-6">
          <Link href="/">Home</Link>
          <Link href="/gear">Gear</Link>
          <Link href="/auth/login">Login</Link>
        </div>
      </div>
    </nav>
  );
}