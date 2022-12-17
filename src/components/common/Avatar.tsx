import * as AvatarPrimitive from "@radix-ui/react-avatar";

export const Avatar = () => {
  return (
    <div>
      <AvatarPrimitive.Root className="inline-flex h-[40px] w-[40px] items-center align-middle overflow-hidden select-none rounded-full bg-slate-500 ">
        <AvatarPrimitive.AvatarImage
          className="w-full h-full object-cover rounded-full"
          src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"
          alt="random image"
        />
        <AvatarPrimitive.AvatarFallback className="w-full h-full flex items-center justify-center bg-white text-icon text-[16px] font-normal">
          User
        </AvatarPrimitive.AvatarFallback>
      </AvatarPrimitive.Root>
    </div>
  );
};
