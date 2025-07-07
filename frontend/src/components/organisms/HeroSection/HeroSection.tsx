// components/sections/HeroSection.tsx
import Button from "@/components/atoms/Button/Button";
import Spline from "@splinetool/react-spline";

export default function HeroSection() {
  return (
    <main className="relative h-screen w-full overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <Spline scene="https://prod.spline.design/MV7IOWF7YN1Qbtra/scene.splinecode" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex h-full w-full items-center justify-center px-6 text-center">
        <div className="max-w-2xl">
          <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-white">
            Manage Money Smarter
          </h1>
          <p className="mt-4 text-lg md:text-xl text-white">
            Track spending, set goals, and stay on top of your financial life.
          </p>
          <div className="mt-6">
            <Button />
          </div>
        </div>
      </div>

      {/* Optional: overlay for contrast */}
      <div className="absolute inset-0 bg-black/40 z-[1]" />
    </main>
  );
}
