import Image from "next/image";

export default function Loading() {
  return (
    <div className="h-[85vh] w-full flex flex-col items-center justify-center gap-4 font-semibold text-lg">
      <Image
        className="max-h-[20px] w-auto"
        src="/allo-logo-black.svg"
        alt="Allo Protocol Logo"
        width={111}
        height={30}
      />
      Loading...
    </div>
  );
}
