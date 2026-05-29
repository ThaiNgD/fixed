import * as React from "react";

import HomeCarouselItem from "@/components/layout/HomeCarouselItem";
import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { carousel } from "../constants";

export default function Home({ children }: { children: React.ReactNode }) {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-[80%] m-auto"
    >
      <CarouselContent>
        {carousel.items.map((item, index) => (
          <HomeCarouselItem key={index} item={item} />
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
