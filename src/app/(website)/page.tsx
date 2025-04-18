
import Image from "next/image"
import { Check } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { PLANS } from "@/constans/page"
import Link from "next/link"

export default function Home() {


    return (
        <main>
            <section className="relative min-h-screen bg-gradient-to-b from-slate-950 via-blue-900 to-bg">
                <div
                    className="absolute inset-0 bg-[linear-gradient(to_right, #0f172a_1px, transparent_1px), linear-gradient(to_bottom, #0f172a_1px, transparent_1px)] bg-[size:4rem_4rem] [mask-image: radial-gradient(ellipse_60%_50%_at_50%_0%, #000_70%, transparent_110%)]"
                />
                <div className="relative">
                    <header className="container mx-auto flex items-center justify-between py-6">
                        <div className="flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-white text-blue-950">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-pause"><rect width="4" height="16" x="6" y="4" /><rect width="4" height="16" x="14" y="4" /></svg>
                            </div>
                            <span className="text-xl font-bold text-white">Slide</span>
                        </div>
                        <nav className="hidden md:block">
                            <ul className="flex gap-8">
                                <li><Link href="#features" className="text-blue-100 hover:text-white">Features</Link></li>
                                <li><Link href="#pricing" className="text-blue-100 hover:text-white">Pricing</Link></li>
                                <li><Link href="#about" className="text-blue-100 hover:text-white">About</Link></li>
                            </ul>
                        </nav>
                        <Button className="bg-white text-blue-950 hover:bg-blue-50 cursor-pointer">
                            <Link href="/dashboard">
                                Login
                            </Link>
                        </Button>
                    </header>

                    <main className="container mx-auto px-4 py-16 md:py-24">
                        <div className="mx-auto max-w-4xl text-center">
                            <h1 className="mb-6 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
                                Transform Your Instagram Engagement with Slide
                            </h1>
                            <p className="mx-auto mb-10 max-w-2xl text-lg text-blue-100 md:text-xl">
                                Slide revolutionizes how you connect with your audience on Instagram. Automate responses and boost engagement effortlessly, turning interactions into valuable business opportunities.
                            </p>
                            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                                <Button className="w-full bg-blue-600 px-8 py-6 text-lg font-medium text-white hover:bg-blue-700 sm:w-auto">
                                    Get Started
                                </Button>
                                <Button variant="outline" className="w-full border-white bg-transparent px-8 py-6 text-lg font-medium text-white hover:bg-white/10 sm:w-auto">
                                    Learn More
                                </Button>
                            </div>
                        </div>

                        <div className="mt-20 flex justify-center gap-6 md:gap-8">
                            {[
                                { radius: "rounded-tl-[40px]" },
                                { radius: "rounded-tr-[40px]" },
                                { radius: "rounded-bl-[40px]" },
                                { radius: "rounded-br-[40px]" }
                            ].map((style, index) => (
                                <div key={index} className={`relative h-64 w-[260px] overflow-hidden bg-blue-800/50 ${style.radius}`}>
                                    <Image
                                        src={`https://picsum.photos/seed/picsum/200/300`}
                                        alt={`User ${index}`}
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-blue-950/80 to-transparent" />
                                </div>
                            ))}
                        </div>
                    </main>
                </div>
            </section>
            <section className="w-full py-12 md:py-24 lg:py-32">
                <div className=" w-auto px-4 md:px-6">
                    <div className="flex flex-col items-center justify-center space-y-4 text-center">
                        <div className="space-y-2">
                            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                                Choose Your Plan
                            </h2>
                            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                                Select the perfect plan to boost your Instagram engagement
                            </p>
                        </div>
                    </div>
                    <div className="mx-auto grid  max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8 py-8">
                        {PLANS.map((plan, index) => (
                            <Card
                                key={index}
                                className={`flex flex-col ${plan.featured ? 'border-primary bg-primary/5' : ''}`}
                            >
                                <CardHeader className="flex flex-col space-y-1.5 pb-4">
                                    <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                                    <CardDescription>{plan.description}</CardDescription>
                                </CardHeader>
                                <CardContent className="pb-2">
                                    <div className="mb-4 text-5xl font-bold">
                                        {plan.price} <span className="text-base font-normal text-muted-foreground">/month</span>
                                    </div>
                                    <ul className="space-y-2.5">
                                        {plan.features.map((feature, i) => (
                                            <Feature key={i}>{feature}</Feature>
                                        ))}
                                    </ul>
                                </CardContent>
                                <CardFooter className="mt-auto pt-4">
                                    <Button
                                        className="w-full"
                                        size="lg"
                                        variant={plan.featured ? 'default' : 'secondary'}
                                    >
                                        {plan.cta}
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    )
}

type Props = {
    children: React.ReactNode
}


function Feature({ children }: Props) {
    return (
        <li className="flex items-start gap-2">
            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10">
                <Check className="h-3.5 w-3.5 text-primary" />
            </div>
            <span className="text-sm text-muted-foreground">{children}</span>
        </li>
    )
}