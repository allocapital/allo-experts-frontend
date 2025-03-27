import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Image from "next/image";

export default function InfoTooltip({
  tooltip,
  children,
}: {
  tooltip: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-1">
      {children}
      <TooltipProvider>
        <Tooltip delayDuration={0}>
          <TooltipTrigger>
            <Image
              alt=""
              width="16"
              height="16"
              src="/info-icon.svg"
              className="mb-3"
            />
          </TooltipTrigger>
          <TooltipContent className="bg-gray-100">
            <p className="text-sm max-w-sm">{tooltip}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
