"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "@/lib/utils";
import { getColorClass } from "@/lib/helpers";

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> & {
    value?: number[];
    thumbClassName?: string;
  }
>(({ className, thumbClassName, value = [3], ...props }, ref) => {
  const currentValue = Array.isArray(value) ? value[0] : 3;
  const colorClass = getColorClass(currentValue);

  return (
    <SliderPrimitive.Root
      ref={ref}
      className={cn(
        "relative flex w-full touch-none select-none items-center",
        className
      )}
      value={value}
      {...props}
    >
      <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-slate-200">
        <SliderPrimitive.Range className={`absolute h-full bg-slate-500`} />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb
        className={`block h-5 w-5 rounded-full border-2 border-white ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-slate-500 ${thumbClassName}`}
        //   colorClass,
        //   thumbClassName
        // )}
      />
    </SliderPrimitive.Root>
  );
});
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
