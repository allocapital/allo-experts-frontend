import Image from "next/image";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./button";

export default function Header() {
  return (
    <header className="sm:px-6 px-2 bg-black flex items-center justify-between sm:gap-8 gap-4 py-2">
      <div className="flex items-center sm:gap-16 gap-4">
        <Link href="/">
          <Image
            src="/allo-logo.svg"
            alt="Allo logo"
            width={74}
            height={20}
            className="sm:max-h-[none] max-h-[15px] sm:w-[74px] w-auto"
          />
        </Link>
        <div className="sm:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger className="text-white font-semibold">
              <div className="flex items-center gap-2">
                Experts
                <Image alt="" width="12" height="11" src="/down-icon.svg" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-black">
              <DropdownMenuItem>
                <Link
                  href="https://leaderboard.allo.gitcoin.co/"
                  className="w-full"
                >
                  Leaderboard
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="https://allobook.gitcoin.co/" className="w-full">
                  Book
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <nav className="sm:block hidden">
          <ul className="font-semibold flex items-center sm:gap-8 gap-4 text-white">
            <li>
              <Link href="/" className="link white selected">
                Experts
              </Link>
            </li>
            <li>
              <Link
                href="https://leaderboard.allo.gitcoin.co/"
                className="link white"
              >
                Leaderboard
              </Link>
            </li>
            <li>
              <Link href="https://allobook.gitcoin.co/" className="link white">
                Book
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <Link href="https://t.me/+eY1-8OcToHI3ZWJh" target="_blank">
        <Button type="tertiary" className="sm:text-base text-sm sm:px-5 px-2">
          Join Telegram
        </Button>
      </Link>
    </header>
  );
}
