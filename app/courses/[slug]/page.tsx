import BuildsCardsList from "@/app/components/builds-cards-list";
import { Button } from "@/app/components/button";
import ExpertsCardsList from "@/app/components/experts-cards-list";
import { Footer } from "@/app/components/footer";
import MechanismsCardsList from "@/app/components/mechanisms-cards-list";
import RenderMarkdown from "@/app/components/render-markdown";
import { getCourseBySlug, getCourses } from "@/lib/api";
import { Metadata, ResolvingMetadata } from "next";
import Image from "next/image";
import Link from "next/link";

export async function generateStaticParams() {
  const data = await getCourses();
  return data.map((entry) => ({
    slug: entry.slug,
  }));
}

export async function generateMetadata(
  { params }: { params: { slug: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const course = await getCourse(params);
  const ogTitle = course
    ? `${course.title} | Learning Cohort`
    : `Learning Cohorts`;
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

async function getCourse(params: { slug: string }) {
  const data = await getCourseBySlug(params.slug);
  return data;
}

export default async function CoursePage({
  params,
}: {
  params: { slug: string };
}) {
  const course = await getCourse(params);
  return (
    <>
      {!!course ? (
        <div>
          <main className="bg-white flex flex-col gap-8">
            <section className={`relative sm:min-h-[250px] px-4 bg-[]`}>
              <div className="pb-12 lg:pt-12 pt-5">
                <div className="max-w-3xl mx-auto flex items-center gap-2">
                  <div className="mb-8 lg:hidden">
                    <Link href="/courses" className="">
                      <Image
                        className={`sm:max-w-none max-w-[15px] h-auto bg-[]`}
                        src="/back-icon.svg"
                        alt="Back"
                        width={29}
                        height={44}
                        aria-label="back icon"
                      />
                    </Link>
                  </div>

                  <div className="flex items-center lg:gap-16 gap-10 flex-wrap justify-center w-full">
                    <div className="">
                      <Image
                        alt=""
                        className="sm:max-w-none max-w-[150px] h-auto rounded-[32px] border-2 border-green-700 sm:w-[250px] sm:h-[250px] aspect-square"
                        src={`${process.env.NEXT_PUBLIC_CLOUDINARY_BASE_URL}/${course.background_img}`}
                        aria-label="hidden"
                        width={250}
                        height={250}
                      />
                    </div>
                    <div>
                      <h1 className="mb-2 font-bold text-3xl sm:text-5xl max-w-[11ch] !leading-[120%] z-10 relative">
                        {course.title}
                      </h1>

                      {course.register_url ? (
                        <Link
                          href={course.register_url}
                          className="z-10 relative"
                        >
                          <Button type="secondary">View</Button>
                        </Link>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute left-24 bottom-1/2 translate-y-1/2 lg:block hidden">
                <Link href="/courses">
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
            </section>

            <section className="px-4 max-w-3xl mx-auto pt-8 border-t border-gray-900 w-full">
              <RenderMarkdown markdown={course.description} />
            </section>

            {course.related_builds?.length ? (
              <section className="mt-6 w-fit mx-auto">
                <h2 className="font-extrabold text-2xl mb-4">Related builds</h2>
                <BuildsCardsList data={course.related_builds} />
              </section>
            ) : (
              ""
            )}

            {course.related_experts?.length ? (
              <section className="mt-6 w-fit mx-auto">
                <h2 className="font-extrabold text-2xl mb-4">
                  Related experts
                </h2>
                <ExpertsCardsList data={course.related_experts} />
              </section>
            ) : (
              ""
            )}

            {course.related_mechanisms?.length ? (
              <section className="mt-6 w-fit mx-auto">
                <h2 className="font-extrabold text-2xl mb-4">
                  Related mechanisms
                </h2>
                <MechanismsCardsList data={course.related_mechanisms} />
              </section>
            ) : (
              ""
            )}

            <Footer />
          </main>
        </div>
      ) : (
        <div>Course not found</div>
      )}
    </>
  );
}
