import Image from 'next/image'

export default function Hero() {
    return (
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
            <div className="grid items-center gap-10 lg:grid-cols-2">
                <div>
                    <p className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-accent">
                        Workout Library
                    </p>
                    <h1 className="mt-3 font-display text-4xl font-bold uppercase leading-tight text-foreground sm:text-5xl">
                        Train With Intent.
                        <br />
                        Log Every Set.
                    </h1>
                    <p className="mt-5 max-w-md text-muted">
                        FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today&apos;s plan,
                        and watch the week&apos;s work add up.
                    </p>
                    <a href="#library"
                        className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition hover:opacity-90">
                        Browse Workouts
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                    </a>
                </div>

                <div className="flex justify-center lg:justify-end">
                    <Image
                        src="/banner.png"
                        alt="Illustration of a muscular figure using a gym machine"
                        width={480}
                        height={480}
                        priority
                        className="w-full max-w-sm"
                    />
                </div>
            </div>
        </section>
    )
}