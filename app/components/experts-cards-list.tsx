import { Expert } from "@/lib/types";
import ExpertCard from "./expert-card";

const ExpertsCardsList = ({ data }: { data: Expert[] }) => (
  <section className="px-4 mx-auto">
    {!!data?.length && (
      <div className="grid md:grid-cols-3 grid-cols-2 w-fit mx-auto sm:gap-8 gap-2 gap-y-16">
        {data.map((entry) => (
          <ExpertCard key={entry.id} expert={entry} />
        ))}
      </div>
    )}
  </section>
);

export default ExpertsCardsList;
