import { Expert, EXPERT_IN } from "@/lib/types";
import Image from "next/image";
import ContactButton from "./contact-button";
import Link from "next/link";

export default function ExpertCard({ expert }: { expert: Expert }) {
  return (
    <>
      <div className="flex flex-col gap-4">
        <Link href={`/experts/${expert.slug}`}>
          <Image
            src={`${process.env.NEXT_PUBLIC_CLOUDINARY_BASE_URL}/${expert.avatar}`}
            alt=""
            className={`rounded-[32px] border-2 border-green-700 sm:w-[250px] sm:h-[250px] aspect-square`}
            width={250}
            height={250}
          />
        </Link>

        <div>
          <Link href={`/experts/${expert.slug}`}>
            <h3 className="font-bold text-xl sm:text-2xl text-blue-600 mb-1">
              {expert.name}
            </h3>
          </Link>
          <p className="sm:text-base text-sm">
            Expert in{" "}
            {expert.expert_in == EXPERT_IN.ALLO_DEV
              ? "Allo Dev"
              : "Allo Mechanisms"}
          </p>
        </div>

        <ContactButton expert={expert} />
      </div>
    </>
  );
}
