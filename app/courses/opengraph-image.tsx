import { ImageResponse } from "next/og";

export const size = {
  width: 900,
  height: 450,
};

export const runtime = "edge";

export default async function GET() {
  const getMono = async () => {
    const response = await fetch(
      new URL("../DMSans-ExtraBold.ttf", import.meta.url)
    );
    const mono = await response.arrayBuffer();

    return mono;
  };

  return new ImageResponse(
    (
      <>
        <div tw="relative flex items-center justify-center w-[900px] h-[450px]">
          <img
            tw="absolute top-0 left-0 right-0 bottom-0"
            src={`https://allo.expert/hero-gradient-bg.png`}
            alt=""
            width={1000}
            height={524}
          />
          <div tw="z-0 absolute flex">
            <img
              src="https://allo.expert/mechanisms-bg.svg"
              alt=""
              width={400}
              height={400}
              aria-label="hidden"
            />
          </div>
          <h1 tw="!z-10 text-center font-bold text-6xl max-w-[11ch] !leading-[120%] flex flex-col items-center justify-between gap-6">
            <span tw="mb-4">Learning</span>
            <span>Cohorts</span>
          </h1>
        </div>
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
