import Image from "next/image";
import Link from "next/link";
import { Footer } from "../components/footer";
import { getMechanisms } from "@/lib/api";
import { MechanismsCardsList } from "../components/mechanisms-cards-list";

async function getData() {
  const data = await getMechanisms();
  return data;
}

export default async function MechanismsPage() {
  const data = await getData();
  console.log(data);
  return (
    <div>
      <main className="bg-white flex flex-col sm:gap-12 gap-8">
        <section className={`relative px-4`}>
          <div className="lg:pb-24 pb-8 lg:pt-12 pt-5">
            <div className="mx-auto">
              <div className="mb-1 lg:hidden">
                <Link href="/" className="">
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
              <div className="relative flex items-center justify-center">
                <h1 className="absolute text-center font-bold text-3xl sm:text-4xl xl:text-6xl max-w-[11ch] !leading-[120%]">
                  Allocation Mechanisms
                </h1>
                <Image
                  className="sm:max-w-none max-w-[150px] h-auto"
                  src="/mechanisms-bg.svg"
                  alt=""
                  width={333}
                  height={333}
                  aria-label="hidden"
                />
              </div>
            </div>
          </div>

          <div className="absolute left-24 bottom-1/2 translate-y-1/2 lg:block hidden">
            <Link href="/">
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

        <MechanismsCardsList data={data} />

        <Footer showMechForm={true} />
      </main>
    </div>
  );
}
