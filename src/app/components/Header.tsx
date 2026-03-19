import { Logo } from "./Logo";
import { PrimaryButton } from "./PrimaryButton";

export function Header() {
  return (
    <header className="w-full flex items-center justify-between backdrop-blur-[40px] p-6">
      <Logo />
      <PrimaryButton label="Baixar CV" href="https://docs.google.com/document/d/1AIE_xj8nXJt_l9fE_-QZChB8A6H3OJZm/edit?usp=sharing&ouid=100658739830673008130&rtpof=true&sd=true" />
    </header>
  );
}
