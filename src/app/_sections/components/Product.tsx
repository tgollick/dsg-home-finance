import { Card } from "@/components/ui/card";
import Image, { type StaticImageData } from "next/image";

type Props = {
  title: string;
  img: StaticImageData;
  content: string;
  alt: string;
};

const Product = (props: Props) => {
  return (
    <Card className="overflow-hidden transition-shadow hover:shadow-md bg-white border-gray-200 text-black">
      <div className="flex flex-col">
        <div className="relative w-full shrink-0">
          <Image
            src={props.img || "/placeholder.svg"}
            alt={props.alt}
            className="object-cover w-full h-full"
            width={500}
            height={500}
          />
        </div>
        <div className="flex flex-col justify-between p-6">
          <div className="space-y-2">
            <h3 className="text-2xl font-serif leading-tight">
              "{props.title}"
            </h3>
            <p className="text-sm text-muted-foreground font-sans">
              {props.content}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default Product;
