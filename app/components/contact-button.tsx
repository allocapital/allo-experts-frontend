'use client'
import { Expert } from "@/lib/types";
import { Button } from "./button";
import { useState } from "react";
import ContactModal from "./contact-modal";

export default function ContactButton({ expert }: { expert: Expert }) {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  return (
    <>
      <Button
        type="secondary"
        className="sm:w-auto w-full"
        onClick={(e: React.MouseEvent<HTMLElement>) => {
          e.stopPropagation();
          setIsContactModalOpen(true);
        }}
      >
        Contact
      </Button>

      <ContactModal
        expert={expert}
        isOpen={isContactModalOpen}
        setIsOpen={setIsContactModalOpen}
      />
    </>
  );
}
