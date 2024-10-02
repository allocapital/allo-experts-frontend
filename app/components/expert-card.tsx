"use client";
import { Expert, EXPERT_IN } from "@/lib/types";
import Image from "next/image";
import { Button } from "./button";
import { useState } from "react";
import ContactModal from "./contact-modal";

export default function ExpertCard({ expert }: { expert: Expert }) {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col gap-4">
        <Image
          src={`${process.env.NEXT_PUBLIC_CLOUDINARY_BASE_URL}/${expert.avatar}`}
          alt=""
          className={`rounded-[32px] bg-green-500 sm:w-[250px] sm:h-[250px] aspect-square`}
          width={250}
          height={250}
        />

        <div>
          <h3 className="font-bold text-xl sm:text-2xl text-blue-600 mb-1">
            {expert.name}
          </h3>
          <p className="sm:text-base text-sm">
            Expert in{" "}
            {expert.expert_in == EXPERT_IN.ALLO_DEV
              ? "Allo Dev"
              : "Allo Mechanisms"}
          </p>
        </div>
        <Button
          type="secondary"
          className="sm:w-auto w-full"
          onClick={() => setIsContactModalOpen(true)}
        >
          Contact
        </Button>
      </div>

      <ContactModal
        expert={expert}
        isOpen={isContactModalOpen}
        setIsOpen={setIsContactModalOpen}
      />
    </>
  );
}
