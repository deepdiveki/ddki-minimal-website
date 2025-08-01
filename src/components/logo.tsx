import darkLogo from "@/assets/logos/deepdiveki-logo.svg";
import logo from "@/assets/logos/deepdiveki-logo.svg";
import Image from "next/image";

export function Logo() {
  return (
    <div className="flex items-center gap-2 h-8 max-w-[12rem]">
      <div className="relative h-8 w-8">
        <Image
          src={logo}
          fill
          className="dark:hidden"
          alt="DeepDiveKI logo"
          role="presentation"
          quality={100}
        />

        <Image
          src={darkLogo}
          fill
          className="hidden dark:block"
          alt="DeepDiveKI logo"
          role="presentation"
          quality={100}
        />
      </div>
      <span className="font-semibold text-black">
        DeepDiveKI
      </span>
    </div>
  );
}
