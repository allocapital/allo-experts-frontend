"use client";
import { useState } from "react";
import InfoModal, { InfoModalProps } from "./modal";
import { Expert } from "@/lib/types";
import Image from "next/image";

interface ContactModalProps extends InfoModalProps {
  expert: Expert;
}
export default function ContactModal({
  isOpen = false,
  setIsOpen = () => {
    /**/
  },
  expert,

  children,
  ...props
}: ContactModalProps) {
  const getTelegramLink = (username: string) => {
    if (username[0] === "@") {
      return `https://t.me/${username.slice(1)}`;
    }
    return `https://t.me/${username}`;
  };

  const getTwitterUsername = (value: string) => {
    if (value[0] === "@") {
      return `${value.slice(1)}`;
    }
    return `${value}`;
  };

  return (
    <InfoModal isOpen={isOpen} setIsOpen={setIsOpen}>
      <h3 className="text-center text-lg text-blue-600 font-semibold mb-8">
        {expert.name}
      </h3>
      <div className="flex items-center flex-col gap-5">
        <div className="flex items-center gap-2">
          <Image
            src="/email.svg"
            alt="Email"
            width={24}
            height={24}
            aria-label="email icon"
          />
          <a target="_blank" href={`mailto:${expert.contact_info_email}`}>
            {expert.contact_info_email}
          </a>
        </div>
        <div className="flex items-center gap-2">
          <Image
            src="/telegram.svg"
            alt="telegram"
            width={24}
            height={24}
            aria-label="telegram icon"
          />
          <a
            target="_blank"
            href={getTelegramLink(expert.contact_info_telegram)}
          >
            {expert.contact_info_telegram}
          </a>
        </div>
        <div className="flex items-center gap-2">
          <Image
            src="/x.svg"
            alt="x"
            width={24}
            height={24}
            aria-label="x icon"
          />
          <a
            target="_blank"
            href={`https://x.com/${getTwitterUsername(
              expert.contact_info_twitter
            )}`}
          >
            @{getTwitterUsername(expert.contact_info_twitter)}
          </a>
        </div>
      </div>
    </InfoModal>
  );
}

{
}
