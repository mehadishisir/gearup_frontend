import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative h-[85vh] min-h-[600px] w-full">
      {/* Background Image */}
      <Image
        src="/images/hero.jpg"
        alt="GearUp Hero"
        fill
        priority
        className="object-cover"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/55" />

      {/* Content */}
      <div className="absolute inset-0 flex items-center">
        <div className="mx-auto w-full max-w-7xl px-6">
          <div className="max-w-2xl space-y-6 text-white">
            <span className="rounded-full bg-white/20 px-4 py-2 text-sm backdrop-blur">
              Premium Sports & Outdoor Gear
            </span>

            <h1 className="text-4xl font-bold leading-tight md:text-6xl">
              Rent Sports & Outdoor Gear Instantly
            </h1>

            <p className="text-lg text-gray-200">
              Explore mountains, trails, courts, and camps with premium rental
              equipment from trusted providers across the country.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                href="/gear"
                className="rounded-lg bg-orange-500 px-6 py-3 text-center font-semibold transition hover:bg-orange-600"
              >
                Browse Gear
              </Link>

              <Link
                href="/auth/register"
                className="rounded-lg border border-white px-6 py-3 text-center transition hover:bg-white hover:text-black"
              >
                Become a Provider
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}