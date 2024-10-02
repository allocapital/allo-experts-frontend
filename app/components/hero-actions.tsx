"use client";
import Link from "next/link";
import { Button } from "./button";

export default function HeroActions() {
  return (
    <div className="flex sm:flex-row flex-col gap-2 items-center ">
      <Link className="sm:w-auto w-full" href={""} target="_blank">
        {" "}
        <Button
          type="primary"
          onClick={() => {}}
          isLoading={false}
          className="sm:w-auto w-full"
        >
          Become expert
        </Button>
      </Link>
      <Link className="sm:w-auto w-full" href={""} target="_blank">
        <Button
          type="secondary"
          onClick={() => {}}
          isLoading={false}
          className="sm:w-auto w-full"
        >
          Hire expert
        </Button>
      </Link>
    </div>
  );
}
