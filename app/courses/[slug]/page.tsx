import { Button } from "@/app/components/button";
import { Footer } from "@/app/components/footer";
import { getCourseBySlug, getCourses } from "@/lib/api";
import { Metadata, ResolvingMetadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { remark } from "remark";
import html from "remark-html";

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
  if (data?.description) {
    const processedContent = await remark().use(html).process(data.description);
    if (!processedContent) return;
    const contentHtml = processedContent.toString();
    data.description = contentHtml;
  }
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
                <div className="max-w-2xl mx-auto flex items-center gap-2">
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

                  <div>
                    <h1 className="mb-2 font-bold text-3xl sm:text-6xl max-w-[11ch] !leading-[120%]">
                      {course.title}
                    </h1>

                    {course.register_url ? (
                      <Link href={course.register_url}>
                        <Button type="secondary">View</Button>
                      </Link>
                    ) : (
                      ""
                    )}
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

              <div className="absolute right-4 sm:right-24 bottom-1/2 translate-y-1/2 overflow-hidden">
                <Image
                  className="sm:max-w-none max-w-[150px] h-auto"
                  src={`${process.env.NEXT_PUBLIC_CLOUDINARY_BASE_URL}/${course.background_img}`}
                  alt=""
                  width={250}
                  height={250}
                  aria-label="hidden"
                />
              </div>
            </section>

            <section className="px-4 max-w-2xl mx-auto pt-8 border-t border-gray-900 w-full">
              <div dangerouslySetInnerHTML={{ __html: course.description }} />
            </section>

            <Footer />
          </main>
        </div>
      ) : (
        <div>Course not found</div>
      )}
    </>
  );
}
