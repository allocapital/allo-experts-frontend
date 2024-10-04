import { getMechanismBySlug, getMechanisms } from "@/lib/api";
import { ImageResponse } from "next/og";

export async function generateStaticParams() {
  const data = await getMechanisms();
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
  const mechanism = await getMechanismBySlug(params.slug);
  if (!mechanism) return;

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
          tw={`font-sans flex items-center justify-center px-12 bg-[${mechanism.background_color}] w-[900px] h-[450px]`}
        >
          <h1 tw="font-bold text-[65px] max-w-[11ch] !leading-[120%] text-wrap whitespace-pre-line word-break">
            {mechanism.title}
          </h1>

          <div tw="flex">
            <img
              src={`${process.env.NEXT_PUBLIC_CLOUDINARY_BASE_URL}/${mechanism.background_img}`}
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
