import { Footer } from "@/app/components/footer";
import { getMechanismBySlug, getMechanisms } from "@/lib/api";
import { Mechanism } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import { remark } from "remark";
import html from "remark-html";

export async function generateStaticParams() {
  const data = await getMechanisms();
  return data.map((entry) => ({
    slug: entry.slug,
  }));
}

async function getMechanism(params: { slug: string }) {
  const data = await getMechanismBySlug(params.slug);

  if (data) {
    const processedContent = await remark().use(html).process(data.description);
    const contentHtml = processedContent.toString();
    data.description = contentHtml;
  }

  return data;
}

export default async function MechanismPage({
  params,
}: {
  params: { slug: string };
}) {
  const mechanism = await getMechanism(params);
  return (
    <>
      {" "}
      {!!mechanism ? (
        <div>
          <main className="bg-white flex flex-col gap-12">
            <section
              className={`relative sm:min-h-[250px] px-4 bg-[${mechanism.background_color}]`}
            >
              <div className="pb-16 lg:pt-16 pt-5">
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
                  <h1 className="font-bold text-3xl sm:text-6xl max-w-[11ch] !leading-[120%]">
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
              <div
                dangerouslySetInnerHTML={{ __html: mechanism.description }}
              />
            </section>

            <Footer showMechForm={true} />
          </main>
        </div>
      ) : (
        <div>Mechanism not found</div>
      )}
    </>
  );
}
