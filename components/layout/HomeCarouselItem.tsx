"use client";
import Link from "next/link";
import { Card, CardContent } from "../ui/card";
import { CarouselItem } from "../ui/carousel";

interface HomeCarouselItemProps {
  title: string;
  description: string;
  image: string;
  link: string;
}

const HomeCarouselItem = (props: { item: HomeCarouselItemProps }) => {
  const { item } = props;
  return (
    <CarouselItem className="basis-1/2 lg:basis-1/3">
      <Card className="p-0">
        <CardContent className="flex cursor-pointer p-0 aspect-square items-center justify-center">
          <Link href={item.link} className="w-full relative h-full">
            {/* <span className="absolute z-30 text-white text-center w-full h-full flex items-center justify-center text-2xl font-bold">
              {item.title}
            </span>
            <img
              src={item.image}
              alt={item.title}
              className="relative w-full h-full z-20 rounded-xl aspect-video object-cover brightness-60 dark:brightness-40 hover:grayscale hover:brightness-100 transition-colors duration-300"
            /> */}
            <div className="relative w-full h-full group">
              <img
                src={item.image}
                alt={item.title}
                className="block w-full transition-opacity duration-300 ease-in group-hover:opacity-30 [backface-visibility:hidden] h-full z-20 rounded-xl aspect-video greyscale object-cover brightness-60 dark:brightness-40 hover:grayscale hover:brightness-100 "
              />

              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100">
                <div className="bg-accent rounded-md text-white text-base px-8 py-4 whitespace-nowrap z-30 text-center w-full h-full flex items-center justify-center font-bold">
                  {item.title}
                </div>
              </div>
            </div>
          </Link>
        </CardContent>
      </Card>
    </CarouselItem>
  );
};

export default HomeCarouselItem;
