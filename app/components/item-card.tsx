import Link from "next/link";
import { Button } from "./button";
import Image from "next/image";

export default function ItemCard({
  imgBg = "#FFE5F8",
  imgSrc = "/mechanism-placeholder.svg",
  title,
  subtitle,
  buttonTitle,
  to,
}: {
  imgSrc?: string;
  title: string;
  subtitle?: string;
  buttonTitle: string;
  imgBg?: string;
  to: string;
}) {
  return (
    <Link href={to}>
      <div className="flex flex-col gap-4">
        <Image
          src={imgSrc}
          alt=""
          className={`bg-[${imgBg}] sm:w-[250px] sm:h-[250px] aspect-square`}
          width={250}
          height={250}
        />
        <div>
          <h3 className="font-bold text-xl sm:text-2xl mb-1 max-w-[250px]">
            {title}
          </h3>
          {!!subtitle ? (
            <p className="sm:text-base text-sm line-clamp-2">{subtitle}</p>
          ) : (
            ""
          )}
        </div>
        <Button type="secondary">{buttonTitle}</Button>
      </div>
    </Link>
  );
}
