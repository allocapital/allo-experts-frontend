import Image from "next/image";
import { Button } from "./components/button";
import HeroActions from "./components/hero-actions";
import Link from "next/link";
import { Footer } from "./components/footer";
import ItemCard from "./components/item-card";
import { getBuilds, getCourses, getExperts, getMechanisms } from "@/lib/api";
import ExpertCard from "./components/expert-card";
import { formatDate } from "@/lib/utils";

async function getMechanismsList() {
  const data = await getMechanisms();
  return data;
}

async function getExpertsList() {
  const data = await getExperts();
  console.log({ data });
  return data;
}

async function getCoursesList() {
  const data = await getCourses();
  return data;
}

async function getBuildsList() {
  const data = await getBuilds();
  return data;
}

export default async function Home() {
  const [mechanisms, experts, courses, builds] = await Promise.all([
    getMechanismsList(),
    getExpertsList(),
    getCoursesList(),
    getBuildsList(),
  ]);

  return (
    <div>
      <main className="bg-white p-0 flex flex-col gap-24">
        <div className="">
          <section className="relative bg-hero-bg-gradient bg-cover bg-bottom">
            <div className="px-4 ">
              <div className="sm:pt-44 pt-32 pb-56 sm:pl-16">
                <h1 className="font-extrabold sm:text-4xl text-2xl md:text-5xl !leading-[120%] max-w-[22ch] mb-10">
                  Allo.expert{" "}
                  <span className="text-blue-600">
                    Learn about onchain capital allocation.
                  </span>
                </h1>
                <HeroActions />
              </div>
            </div>
            <Image
              className="absolute right-0 bottom-1/2 sm:translate-y-[45%] -translate-y-[45%] sm:opacity-100 opacity-30 lg:max-w-none max-w-[200px] h-auto"
              src="/hero-shape.svg"
              alt=""
              width={387}
              height={584}
              aria-label="hidden"
            />
          </section>

          {/* top section */}
          {/* <section
            className="w-fit mx-auto -mt-[10rem] relative z-10 px-2"
            id="experts"
          >
            <div className="flex items-center justify-between gap-4 flex-wrap mb-8">
              <h2 className="font-extrabold text-3xl">Experts</h2>
              <Link href="/experts" className="self-end ml-auto">
                <Button type="primary" isLoading={false}>
                  View all
                </Button>
              </Link>
            </div>
          </section> */}
        </div>
        <section className="w-fit mx-auto px-2" id="becomeExpert">
          <div className="flex items-center gap-6 sm:flex-row flex-col-reverse">
            <div>
              <h2 className="font-extrabold text-3xl text-blue-600 mb-6">
                Become an expert
              </h2>
              <p className="max-w-md mb-12">
                This book explores these possibilities within the onchain
                capital allocation design space, offering a comprehensive guide
                to the emerging innovations in capital allocation.
              </p>
              <div className="flex gap-2 items-center sm:flex-row flex-col">
                <Link
                  className="sm:w-auto w-full"
                  href={
                    "https://www.blurb.com/b/12052748-onchain-capital-allocation-handbook"
                  }
                  target="_blank"
                >
                  <Button
                    type="primary"
                    isLoading={false}
                    className="sm:w-auto w-full"
                  >
                    Get the book
                  </Button>
                </Link>
                <Link
                  href={"https://allobook.gitcoin.co/"}
                  className="sm:w-auto w-full"
                >
                  <Button
                    type="secondary"
                    isLoading={false}
                    className="sm:w-auto w-full"
                  >
                    Visit website
                  </Button>
                </Link>
              </div>
            </div>
            <Image
              src="/allobook-cover.png"
              alt="Allo book cover"
              width={329}
              height={493}
            />
          </div>
        </section>

        <section className="w-fit mx-auto px-2">
          <div className="flex items-center justify-between gap-4 flex-wrap mb-8">
            <h2 className="font-extrabold text-3xl">Join a learning cohort</h2>
            <Link href="/courses" className="self-end ml-auto">
              <Button type="primary" isLoading={false}>
                View all
              </Button>
            </Link>
          </div>
          <div>
            <div className="grid md:grid-cols-3 grid-cols-2 w-fit mx-auto gap-8">
              {courses.slice(0, 6).map((entry) => {
                return (
                  <ItemCard
                    key={entry.slug}
                    title={entry.title}
                    subtitle={
                      entry.starts_at
                        ? `Start date: ${formatDate(entry.starts_at)}`
                        : undefined
                    }
                    buttonTitle="View"
                    btnTo={entry.register_url}
                    imgBg={entry.background_color}
                    imgSrc={`${process.env.NEXT_PUBLIC_CLOUDINARY_BASE_URL}/${entry.background_img}`}
                    to={`/courses/${entry.slug}`}
                  />
                );
              })}
            </div>
            {!!courses?.length && courses.length > 6 && (
              <div className="ml-auto w-fit mt-4">
                <Link href="/courses" className="link text-lg">
                  View more →
                </Link>
              </div>
            )}
          </div>
        </section>

        <section className="w-fit mx-auto px-2">
          <div className="flex items-center justify-between gap-4 flex-wrap mb-8">
            <h2 className="font-extrabold text-3xl">Allocation Mechanisms</h2>
            <Link href="/mechanisms" className="ml-auto">
              <Button type="primary" isLoading={false}>
                View all
              </Button>
            </Link>
          </div>

          <div>
            <div className="grid md:grid-cols-3 grid-cols-2 w-fit mx-auto sm:gap-8 gap-2 gap-y-12">
              {mechanisms.slice(0, 6).map((entry) => {
                return (
                  <ItemCard
                    key={entry.slug}
                    title={entry.title}
                    buttonTitle="Learn more"
                    imgBg={entry.background_color}
                    imgSrc={`${process.env.NEXT_PUBLIC_CLOUDINARY_BASE_URL}/${entry.background_img}`}
                    to={`/mechanisms/${entry.slug}`}
                  />
                );
              })}
            </div>
            {!!mechanisms?.length && mechanisms.length > 6 && (
              <div className="ml-auto w-fit mt-4">
                <Link href="/mechanisms" className="link text-lg">
                  View more →
                </Link>
              </div>
            )}
          </div>
        </section>

        <section className="w-fit mx-auto px-2">
          <div className="flex items-center justify-between gap-4 flex-wrap mb-8">
            <h2 className="font-extrabold text-3xl">Builds</h2>
            <Link href="/builds" className="ml-auto">
              <Button type="primary" isLoading={false}>
                View all
              </Button>
            </Link>
          </div>

          <div>
            <div className="grid md:grid-cols-3 grid-cols-2 w-fit mx-auto sm:gap-8 gap-2 gap-y-12">
              {builds.slice(0, 6).map((entry) => {
                return (
                  <ItemCard
                    key={entry.slug}
                    title={entry.title}
                    subtitle={`${entry.type} / ${entry.status}`}
                    buttonTitle="Learn more"
                    imgBg={entry.background_color}
                    imgSrc={`${process.env.NEXT_PUBLIC_CLOUDINARY_BASE_URL}/${entry.background_img}`}
                    to={`/builds/${entry.slug}`}
                  />
                );
              })}
            </div>
            {!!builds?.length && builds.length > 6 && (
              <div className="ml-auto w-fit mt-4">
                <Link href="/builds" className="link text-lg">
                  View more →
                </Link>
              </div>
            )}
          </div>
        </section>

        <section className="w-fit mx-auto px-2" id="experts">
          <div className="flex items-center justify-between gap-4 flex-wrap mb-8">
            <h2 className="font-extrabold text-3xl">Experts</h2>
            <Link href="/experts" className="self-end ml-auto">
              <Button type="primary" isLoading={false}>
                View all
              </Button>
            </Link>
          </div>

          {!!experts?.length && (
            <div>
              <div className="grid sm:grid-cols-3 grid-cols-2 w-fit mx-auto sm:gap-8 gap-2 gap-y-12">
                {experts.slice(0, 6).map((entry) => (
                  <ExpertCard key={entry.id} expert={entry} />
                ))}
              </div>
              {!!experts?.length && experts.length > 6 && (
                <div className="ml-auto w-fit mt-4">
                  <Link href="/experts" className="link text-lg">
                    View more →
                  </Link>
                </div>
              )}
            </div>
          )}
        </section>

        <Footer showMechForm={true} />
      </main>
    </div>
  );
}
