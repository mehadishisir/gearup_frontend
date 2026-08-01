import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Calendar, MapPin, Star, User } from "lucide-react";

const gearData = {
  id: "1",
  name: "Trekking Tent",
  category: "Camping",
  brand: "North Face",
  price: 500,
  stock: 3,
  available: true,
  description: "4-person waterproof tent perfect for mountain trekking. Lightweight at 2.5kg with easy setup.",
  images: ["/images/hero.jpg"],
  specs: { Capacity: "4 Person", Weight: "2.5kg", Waterproof: "3000mm", Setup: "5 minutes" },
  provider: { name: "Adventure Gear BD", location: "Dhaka" },
  rating: 4.8,
  reviews: 12,
};

export default function GearDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-[#F8FAFC] py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Link href="/gear" className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-orange-600">
          <ArrowLeft className="h-4 w-4" /> Back to browse
        </Link>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="aspect-4/3 overflow-hidden rounded-2xl bg-slate-100 relative">
            <Image src={gearData.images[0]} alt={gearData.name} fill className="object-cover" unoptimized />
          </div>

          <div>
            <div className="flex items-center gap-3 mb-4">
              <Badge className="bg-orange-100 text-orange-700">{gearData.category}</Badge>
              <span className={`text-sm font-medium ${gearData.available ? "text-emerald-600" : "text-red-500"}`}>
                {gearData.available ? "Available" : "Out of Stock"}
              </span>
            </div>

            <h1 className="text-3xl font-bold text-slate-900">{gearData.name}</h1>
            <p className="mt-2 text-slate-500">{gearData.brand}</p>

            <div className="mt-4 flex items-center gap-4">
              <div className="flex items-center gap-1 text-amber-500">
                <Star className="h-5 w-5 fill-current" />
                <span className="font-semibold text-slate-900">{gearData.rating}</span>
                <span className="text-slate-400">({gearData.reviews} reviews)</span>
              </div>
            </div>

            <p className="mt-6 text-lg text-slate-600">{gearData.description}</p>

            <div className="mt-8">
              <p className="text-3xl font-bold text-slate-900">৳{gearData.price} <span className="text-lg font-normal text-slate-400">/ day</span></p>
            </div>

            <Card className="mt-8 border-0 shadow-sm">
              <CardContent className="p-4">
                <h3 className="mb-3 font-semibold text-slate-900">Specifications</h3>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(gearData.specs).map(([key, val]) => (
                    <div key={key}>
                      <p className="text-xs text-slate-500">{key}</p>
                      <p className="font-medium text-slate-900">{val}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="mt-6 flex items-center gap-3 rounded-xl bg-white p-4 shadow-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100">
                <User className="h-5 w-5 text-slate-600" />
              </div>
              <div>
                <p className="font-medium text-slate-900">{gearData.provider.name}</p>
                <p className="flex items-center gap-1 text-xs text-slate-500">
                  <MapPin className="h-3 w-3" /> {gearData.provider.location}
                </p>
              </div>
            </div>

            <div className="mt-8 flex gap-4">
              <Button size="lg" className="flex-1 bg-orange-500 hover:bg-orange-600 text-white">
                <Calendar className="mr-2 h-4 w-4" /> Rent Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}