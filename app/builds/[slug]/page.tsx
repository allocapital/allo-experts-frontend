import { Footer } from "@/app/components/footer";
import { getBuildBySlug, getBuilds } from "@/lib/api";
import { Metadata, ResolvingMetadata } from "next";
import Image from "next/image";
import Link from "next/link";
import RenderMarkdown from "@/app/components/render-markdown";
import MechanismsCardsList from "@/app/components/mechanisms-cards-list";
import ExpertsCardsList from "@/app/components/experts-cards-list";
import CoursesCardsList from "@/app/components/courses-cards-list";

export async function generateStaticParams() {
  const data = await getBuilds();
  return data.map((entry) => ({
    slug: entry.slug,
  }));
}

async function getBuild(params: { slug: string }) {
  const data = await getBuildBySlug(params.slug);

  return data;
}

export async function generateMetadata(
  { params }: { params: { slug: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const builds = await getBuild(params);
  const ogTitle = builds ? `${builds.title} | Builds` : `Builds`;
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

export default async function BuildPage({
  params,
}: {
  params: { slug: string };
}) {
  const build = await getBuild(params);
  return (
    <>
      {!!build ? (
        <div>
          <main className="bg-white flex flex-col gap-12">
            <section
              className={`relative sm:min-h-[250px] px-4 bg-[${build.background_color}]`}
            >
              <div className="pb-12 lg:pt-12 pt-5">
                <div className="max-w-2xl mx-auto">
                  <div className="mb-8 lg:hidden">
                    <Link href="/builds" className="">
                      <Image
                        className={`sm:max-w-none max-w-[15px] h-auto bg-[${build.background_color}]`}
                        src="/back-icon.svg"
                        alt="Back"
                        width={29}
                        height={44}
                        aria-label="back icon"
                      />
                    </Link>
                  </div>
                  <h1 className="font-bold text-3xl sm:text-6xl max-w-[11ch] !leading-[120%] z-10 relative">
                    {build.title}
                  </h1>
                </div>
              </div>

              <div className="absolute left-24 bottom-1/2 translate-y-1/2 lg:block hidden">
                <Link href="/builds">
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
                  src={`${process.env.NEXT_PUBLIC_CLOUDINARY_BASE_URL}/${build.background_img}`}
                  alt=""
                  width={250}
                  height={250}
                  aria-label="hidden"
                />
              </div>
            </section>

            <section className="px-4 max-w-2xl mx-auto">
              <RenderMarkdown markdown={build.description} />
            </section>

            {build.related_mechanisms?.length ? (
              <section className="mt-6 w-fit mx-auto">
                <h2 className="font-extrabold text-2xl mb-4">
                  Related mechanisms
                </h2>
                <MechanismsCardsList data={build.related_mechanisms} />
              </section>
            ) : (
              ""
            )}

            {build.related_experts?.length ? (
              <section className="mt-6 w-fit mx-auto">
                <h2 className="font-extrabold text-2xl mb-4">
                  Related experts
                </h2>
                <ExpertsCardsList data={build.related_experts} />
              </section>
            ) : (
              ""
            )}

            {build.related_courses?.length ? (
              <section className="mt-6 w-fit mx-auto">
                <h2 className="font-extrabold text-2xl mb-4">
                  Related courses
                </h2>
                <CoursesCardsList data={build.related_courses} />
              </section>
            ) : (
              ""
            )}

            <Footer />
          </main>
        </div>
      ) : (
        <div>Build not found</div>
      )}
    </>
  );
}
