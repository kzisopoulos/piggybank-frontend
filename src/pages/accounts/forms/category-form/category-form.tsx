"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Category } from "../../types/category";
import { useCategories } from "../../hooks/use-categories";

const PRESET_COLORS = [
  "#ef4444", // red
  "#f97316", // orange
  "#eab308", // yellow
  "#22c55e", // green
  "#06b6d4", // cyan
  "#3b82f6", // blue
  "#8b5cf6", // violet
  "#ec4899", // pink
];

interface CategoryFormProps {
  category?: Category;
  onSuccess: () => void;
}

export function CategoryForm({ category, onSuccess }: CategoryFormProps) {
  const {
    createCategoryMutation: { mutate: addCategory },
    updateCategoryMutation: { mutate: updateCategory },
  } = useCategories();
  const [formData, setFormData] = useState({
    name: category?.name || "",
    type: category?.type || ("EXPENSE" as const),
    color: category?.color || PRESET_COLORS[0],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    setIsSubmitting(true);
    try {
      if (category) {
        updateCategory({ id: category.id, ...formData });
      } else {
        addCategory(formData);
      }
      onSuccess();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Category Name</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="e.g., Food & Dining"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="type">Type</Label>
        <select
          id="type"
          value={formData.type}
          onChange={(e) =>
            setFormData({
              ...formData,
              type: e.target.value as "INCOME" | "EXPENSE",
            })
          }
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          required
        >
          <option value="EXPENSE">Expense</option>
          <option value="INCOME">Income</option>
        </select>
      </div>

      <div className="space-y-2">
        <Label>Color (Optional)</Label>
        <div className="flex gap-2 flex-wrap">
          {PRESET_COLORS.map((color) => (
            <button
              key={color}
              type="button"
              className={`w-8 h-8 rounded-full border-2 ${
                formData.color === color ? "border-foreground" : "border-muted"
              }`}
              style={{ backgroundColor: color }}
              onClick={() => setFormData({ ...formData, color })}
            />
          ))}
        </div>
      </div>

      <div className="flex gap-2 pt-4">
        <Button type="submit" disabled={isSubmitting || !formData.name.trim()}>
          {isSubmitting
            ? "Saving..."
            : category
            ? "Update Category"
            : "Create Category"}
        </Button>
      </div>
    </form>
  );
}
