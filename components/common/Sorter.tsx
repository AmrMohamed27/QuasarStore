"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { sortOptions } from "@/constants";
import { useRouter, useSearchParams } from "next/navigation";
import { Dispatch, SetStateAction } from "react";

const Sorter = ({
  setSortBy,
}: {
  setSortBy: Dispatch<SetStateAction<string>>;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentValue = searchParams?.get("sort");

  const handleSelectChange = (value: string) => {
    // Convert search parameters into a URLSearchParams object
    const params = new URLSearchParams(searchParams?.toString());

    // Update or set the `sort` parameter
    params.set("sort", value);

    // Redirect to the updated URL
    router.push(`?${params.toString()}`);

    // Set sortBy state
    setSortBy(value);
  };
  return (
    <Select
      onValueChange={(value) => handleSelectChange(value)}
      defaultValue={currentValue ?? "newest"}
    >
      <SelectTrigger className="w-[250px] bg-white dark:bg-brand-dark-kohly">
        <SelectValue placeholder="Choose method" />
      </SelectTrigger>
      <SelectContent>
        {sortOptions.map(({ id, title, value }) => (
          <SelectItem
            key={id}
            value={value}
            className="bg-white dark:bg-brand-dark-kohly hover:bg-brand-blueish-gray hover:dark:bg-brand-kohly cursor-pointer"
          >
            {title}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default Sorter;
