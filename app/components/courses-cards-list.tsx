import { Course } from "@/lib/types";
import ItemCard from "./item-card";

export const CoursesCardsList = ({ data }: { data: Course[] }) => (
  <section className="px-4 mx-auto">
    <div className="grid md:grid-cols-3 grid-cols-2 w-fit mx-auto sm:gap-8 gap-2 gap-y-16">
      {data.map((entry) => (
        <ItemCard
          to={`/courses/${entry.slug}`}
          key={entry.id}
          title={entry.title}
          buttonTitle="Learn more"
          imgSrc={`${process.env.NEXT_PUBLIC_CLOUDINARY_BASE_URL}/${entry.background_img}`}
          imgBg={entry.background_color}
          btnTo={entry.register_url}
        />
      ))}
    </div>
  </section>
);
