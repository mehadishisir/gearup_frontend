"use client";

import { useEffect, useState } from "react";
import { UseFormSetValue } from "react-hook-form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { getCategories } from "@/services/CategoryService";
import { GearFormData } from "@/schemas/gear.schema";

interface Category {
  id: string;
  name: string;
}

interface CategorySelectProps {
  setValue: UseFormSetValue<GearFormData>;
}

export default function CategorySelect({
  setValue,
}: CategorySelectProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCategories() {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadCategories();
  }, []);

  return (
    <Select
       onValueChange={(value: string | null) => {
    if (value === null) return;

    setValue("categoryId", value);
  }}
    >
      <SelectTrigger>
        <SelectValue
          placeholder={
            loading
              ? "Loading categories..."
              : "Select Category"
          }
        />
      </SelectTrigger>

      <SelectContent>
        {categories.map((category) => (
          <SelectItem
            key={category.id}
            value={category.id}
          >
            {category.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}