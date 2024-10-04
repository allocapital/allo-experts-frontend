import { getExpertBySlug, getExperts } from "@/lib/api";
import { EXPERT_IN } from "@/lib/types";
import { ImageResponse } from "next/og";

export async function generateStaticParams() {
  const data = await getExperts();
  return data.map((entry) => ({
    slug: entry.slug,
  }));
}

export const size = {
  width: 900,
  height: 450,
};

export const runtime = "edge";

export default async function GET({ params }: { params: { slug: string } }) {
  const expert = await getExpertBySlug(params.slug);
  if (!expert) return;

  const getMono = async () => {
    const response = await fetch(
      new URL("../../DMSans-ExtraBold.ttf", import.meta.url)
    );
    const mono = await response.arrayBuffer();

    return mono;
  };

  return new ImageResponse(
    (
      <>
        <section
          tw={`relative font-sans bg-cover bg-bottom flex items-center justify-center gap-6 px-12 w-[900px] h-[450px]`}
        >
          <img
            tw="absolute top-0 left-0 right-0 bottom-0"
            src={`https://allo.expert/hero-gradient-bg.png`}
            alt=""
            width={1000}
            height={524}
          />
          <div tw="flex flex-col mr-6">
            <h1 tw="mb-2 font-bold text-[65px] max-w-[11ch] !leading-[120%] text-wrap whitespace-pre-line word-break">
              {expert.name}
            </h1>

            <p tw="text-md">
              Expert in{" "}
              {expert.expert_in == EXPERT_IN.ALLO_DEV
                ? "Allo Dev"
                : "Allo Mechanisms"}
            </p>
          </div>
          <div tw="flex ml-8">
            <img
              tw="rounded-[32px] border-2 border-green-700 w-[250px] h-[250px] aspect-square "
              src={`${process.env.NEXT_PUBLIC_CLOUDINARY_BASE_URL}/${expert.avatar}`}
              alt=""
              width={250}
              height={250}
            />
          </div>
        </section>
      </>
    ),
    {
      width: 900,
      height: 450,
      fonts: [
        {
          name: "DM_Mono",
          data: await getMono(),
          style: "normal",
          weight: 800,
        },
      ],
    }
  );
}
