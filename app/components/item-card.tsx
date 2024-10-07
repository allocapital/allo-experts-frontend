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
  btnTo,
}: {
  imgSrc?: string;
  title: string;
  subtitle?: string;
  buttonTitle: string;
  imgBg?: string;
  to: string;
  btnTo?: string;
}) {
  return (
    <div>
      <div className="flex flex-col gap-4">
        <Link href={to}>
          <Image
            src={imgSrc}
            alt=""
            className={`bg-[${imgBg}] sm:w-[250px] sm:h-[250px] aspect-square`}
            width={250}
            height={250}
          />
        </Link>
        <div>
          <Link href={to}>
            <h3 className="font-bold text-xl sm:text-2xl mb-1 max-w-[250px]">
              {title}
            </h3>
          </Link>
          {!!subtitle ? (
            <p className="sm:text-base text-sm line-clamp-2">{subtitle}</p>
          ) : (
            ""
          )}
        </div>
        <Link href={btnTo ?? to}>
          <Button type="secondary">{buttonTitle}</Button>
        </Link>
      </div>
    </div>
  );
}
