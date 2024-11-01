import { BuildsCardsList } from "@/app/components/builds-cards-list";
import ContactButton from "@/app/components/contact-button";
import { CoursesCardsList } from "@/app/components/courses-cards-list";
import { Footer } from "@/app/components/footer";
import { MechanismsCardsList } from "@/app/components/mechanisms-cards-list";
import RenderMarkdown from "@/app/components/render-markdown";
import { getExpertBySlug, getExperts } from "@/lib/api";
import { Metadata, ResolvingMetadata } from "next";
import Image from "next/image";
import Link from "next/link";

export async function generateStaticParams() {
  const data = await getExperts();
  return data.map((entry) => ({
    slug: entry.slug,
  }));
}

export async function generateMetadata(
  { params }: { params: { slug: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const expert = await getExpert(params);
  const ogTitle = expert ? `${expert.name} | Allo Expert` : `Allo Experts`;
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

async function getExpert(params: { slug: string }) {
  const data = await getExpertBySlug(params.slug);
  return data;
}

export default async function ExpertPage({
  params,
}: {
  params: { slug: string };
}) {
  const expert = await getExpert(params);

  return (
    <>
      {!!expert ? (
        <div>
          <main className="bg-white flex flex-col gap-8">
            <section className={`relative sm:min-h-[250px] px-4 bg-[]`}>
              <div className="pb-12 lg:pt-12 pt-5">
                <div className="max-w-2xl mx-auto flex items-center gap-4 w-full">
                  <div className="mb-8 lg:hidden">
                    <Link href="/experts" className="">
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
                        className="sm:max-w-none max-w-[150px] h-auto rounded-[32px] border-2 border-green-700 sm:w-[250px] sm:h-[250px] aspect-square"
                        src={`${process.env.NEXT_PUBLIC_CLOUDINARY_BASE_URL}/${expert.avatar}`}
                        alt={`${expert.name} avatar`}
                        width={250}
                        height={250}
                      />
                    </div>
                    <div className="">
                      <h1 className="font-bold text-3xl sm:text-6xl max-w-[11ch] !leading-[120%] mb-4 z-10 relative">
                        <span className="sm:flex hidden flex-col gap-0.5">
                          {expert.name.split(" ").map((entry, index) => (
                            <span key={index}>{entry}</span>
                          ))}
                        </span>
                        <span className="sm:hidden"> {expert.name}</span>
                      </h1>
                      <ContactButton expert={expert} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute left-24 bottom-1/2 translate-y-1/2 lg:block hidden">
                <Link href="/experts">
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

            <section className="px-4 max-w-2xl mx-auto pt-8 border-t border-gray-900 w-full">
              <RenderMarkdown markdown={expert.description} />
            </section>

            {expert.related_builds?.length ? (
              <section className="mt-6 w-fit mx-auto">
                <h2 className="font-extrabold text-2xl mb-4">Related builds</h2>
                <BuildsCardsList data={expert.related_builds} />
              </section>
            ) : (
              ""
            )}

            {expert.related_mechanisms?.length ? (
              <section className="mt-6 w-fit mx-auto">
                <h2 className="font-extrabold text-2xl mb-4">
                  Related mechanisms
                </h2>
                <MechanismsCardsList data={expert.related_mechanisms} />
              </section>
            ) : (
              ""
            )}

            {expert.related_courses?.length ? (
              <section className="mt-6 w-fit mx-auto">
                <h2 className="font-extrabold text-2xl mb-4">
                  Related courses
                </h2>
                <CoursesCardsList data={expert.related_courses} />
              </section>
            ) : (
              ""
            )}
            <Footer />
          </main>
        </div>
      ) : (
        <div>Expert not found</div>
      )}
    </>
  );
}
