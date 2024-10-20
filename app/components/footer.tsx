import Image from "next/image";
import Link from "next/link";
import { Button } from "./button";

export const Footer = ({
  showMechForm = false,
}: {
  showMechForm?: boolean;
}) => (
  <div className="mt-20 relative bg-footer-gradient-bg  sm:px-6 px-2 bg-top bg-cover">
    {showMechForm ? (
      <section className="py-24">
        <div className="w-fit mx-auto">
          <h2 className="font-bold text-3xl mb-6">Submit a new mechanism</h2>
          <div className="flex sm:items-center gap-6 sm:flex-row flex-col">
            <p className="max-w-xl">
              Got a new capital allocation mechanism that you think is a fit for this site?  Submit it here.
            </p>

            <Link
              href="https://docs.google.com/forms/d/e/1FAIpQLSfBZRHFHQBcFeMXpSxo9JDu0ReKT7CfQog6nX5R1cjuFH4j6w/viewform"
              target="_blank"
            >
              <Button type="primary" isLoading={false}>
                Submit
              </Button>
            </Link>
          </div>
        </div>
      </section>
    ) : (
      ""
    )}
    <footer className="py-10">
      <div className="flex items-center sm:flex-row flex-col gap-4 sm:gap-10">
        <Link href="https://allo.gitcoin.co/" target="_blank">
          <Image
            className="max-h-[20px] w-auto"
            src="/allo-logo-black.svg"
            alt="Allo Protocol Logo"
            width={111}
            height={30}
          />
        </Link>

        <nav>
          <ul className="font-semibold flex items-center gap-8">
            <li>
              <Link href="/" className="link selected">
                Experts
              </Link>
            </li>
            <li>
              <Link
                href="https://leaderboard.allo.gitcoin.co/"
                className="link"
              >
                Leaderboard
              </Link>
            </li>
            <li>
              <Link href="https://allobook.gitcoin.co/" className="link">
                Book
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  </div>
);
