import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { options } from "@/constants";
import { EllipsisVertical } from "lucide-react";
import Link from "next/link";
import { Models } from "node-appwrite";

const OptionsMenu = (file: Models.Document) => {
  const { file: fileData } = file;
  const backgroundColors: string[] = [];
  options.forEach((option) => {
    if (option.backgroundColor)
      backgroundColors.push(`bg-[${option.backgroundColor}]`);
  });
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <EllipsisVertical />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-4">
        <DropdownMenuLabel className="font-bold text-xl p-2">
          {fileData.name}
        </DropdownMenuLabel>
        {options.map((option, index) => (
          <div key={option.id}>
            <DropdownMenuItem className="flex flex-row items-center gap-2 focus:bg-inherit">
              {/* Icon */}
              <div
                className={`rounded-full p-2 ${
                  index === 0
                    ? "bg-accent-green"
                    : index === 1
                    ? "bg-accent-pink"
                    : index === 2
                    ? "bg-accent-orange"
                    : index === 3
                    ? "bg-accent-light-blue"
                    : "bg-brand-red-1"
                } bg-opacity-20`}
              >
                <option.icon
                  className="w-4 h-4"
                  color={option.backgroundColor}
                />
              </div>
              {/* Title */}
              <Link href={option.url}>
                <span>{option.title}</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </div>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default OptionsMenu;
