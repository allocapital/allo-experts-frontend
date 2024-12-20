import { Footer } from "@/app/components/footer";
import { getMechanismBySlug, getMechanisms, getTrendsBySlug } from "@/lib/api";
import { Metadata, ResolvingMetadata } from "next";
import Image from "next/image";
import Link from "next/link";
import RenderMarkdown from "@/app/components/render-markdown";
import BuildsCardsList from "@/app/components/builds-cards-list";
import ExpertsCardsList from "@/app/components/experts-cards-list";
import CoursesCardsList from "@/app/components/courses-cards-list";
import MechanismTrendChart from "./components/mechanism-trend-chart";

export async function generateStaticParams() {
  const data = await getMechanisms();
  return data.map((entry) => ({
    slug: entry.slug,
  }));
}

async function getMechanism(params: { slug: string }) {
  const data = await getMechanismBySlug(params.slug);
  return data;
}

async function getTrends(params: { slug: string }) {
  const data = await getTrendsBySlug(params.slug);
  return data;
}

export async function generateMetadata(
  { params }: { params: { slug: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const mechanism = await getMechanism(params);
  const ogTitle = mechanism
    ? `${mechanism.title} | Allocation Mechanism`
    : `Allocation Mechanisms`;
  const ogDescription = "";

  return {
    title: ogTitle,
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      url: "https://allo.expert/",
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: ogDescription,
    },
  };
}

export default async function MechanismPage({
  params,
}: {
  params: { slug: string };
}) {
  const mechanism = await getMechanism(params);
  const trends = await getTrends(params);
  return (
    <>
      {!!mechanism ? (
        <div>
          <main className="bg-white flex flex-col gap-12">
            <section
              className={`relative sm:min-h-[250px] px-4 bg-[${mechanism.background_color}]`}
            >
              <div className="pb-12 lg:pt-12 pt-5">
                <div className="max-w-2xl mx-auto">
                  <div className="mb-8 lg:hidden">
                    <Link href="/mechanisms" className="">
                      <Image
                        className={`sm:max-w-none max-w-[15px] h-auto bg-[${mechanism.background_color}]`}
                        src="/back-icon.svg"
                        alt="Back"
                        width={29}
                        height={44}
                        aria-label="back icon"
                      />
                    </Link>
                  </div>
                  <h1 className="font-bold text-3xl sm:text-6xl max-w-[11ch] !leading-[120%] z-10 relative">
                    {mechanism.title}
                  </h1>
                </div>
              </div>

              <div className="absolute left-24 bottom-1/2 translate-y-1/2 lg:block hidden">
                <Link href="/mechanisms">
                  <Image
                    className="sm:max-w-none max-w-[15px] h-auto"
                    src="/back-icon.svg"
                    alt="Back"
                    width={29}
                    height={44}
                    aria-label="back icon"
                  />
                </Link>
              </div>

              <div className="absolute right-4 sm:right-24 bottom-1/2 translate-y-1/2 overflow-hidden">
                <Image
                  className="sm:max-w-none max-w-[150px] h-auto"
                  src={`${process.env.NEXT_PUBLIC_CLOUDINARY_BASE_URL}/${mechanism.background_img}`}
                  alt=""
                  width={250}
                  height={250}
                  aria-label="hidden"
                />
              </div>
            </section>

            <section className="px-4 max-w-2xl mx-auto">
              <RenderMarkdown markdown={mechanism.description} />
            </section>

            {trends?.length && (
              <section className="px-2 w-full max-w-5xl mx-auto">
                <MechanismTrendChart data={trends} />
              </section>
            )}

            {mechanism.related_builds?.length ? (
              <section className="mt-6 w-fit mx-auto">
                <h2 className="font-extrabold text-2xl mb-4">Related builds</h2>
                <BuildsCardsList data={mechanism.related_builds} />
              </section>
            ) : (
              ""
            )}

            {mechanism.related_experts?.length ? (
              <section className="mt-6 w-fit mx-auto">
                <h2 className="font-extrabold text-2xl mb-4">
                  Related experts
                </h2>
                <ExpertsCardsList data={mechanism.related_experts} />
              </section>
            ) : (
              ""
            )}

            {mechanism.related_courses?.length ? (
              <section className="mt-6 w-fit mx-auto">
                <h2 className="font-extrabold text-2xl mb-4">
                  Related courses
                </h2>
                <CoursesCardsList data={mechanism.related_courses} />
              </section>
            ) : (
              ""
            )}
            <Footer showMechForm={true} />
          </main>
        </div>
      ) : (
        <div>Mechanism not found</div>
      )}
    </>
  );
}
