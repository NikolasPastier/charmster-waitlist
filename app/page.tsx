import { isLaunched } from "@/lib/launch"
import Nav from "@/components/sections/Nav"
import Hero from "@/components/sections/Hero"
import TrustBar from "@/components/sections/TrustBar"
import Hook from "@/components/sections/Hook"
import VoiceShowcase from "@/components/sections/VoiceShowcase"
import PracticeAvatars from "@/components/sections/PracticeAvatars"
import CoachRoster from "@/components/sections/CoachRoster"
import HowItWorks from "@/components/sections/HowItWorks"
import HowShedFeel from "@/components/sections/HowShedFeel"
import Features from "@/components/sections/Features"
import LectureShowcase from "@/components/sections/LectureShowcase"
import SkillPath from "@/components/sections/SkillPath"
import Vision from "@/components/sections/Vision"
import Testimonials from "@/components/sections/Testimonials"
import FinalCTA from "@/components/sections/FinalCTA"
import Footer from "@/components/sections/Footer"
import LaunchHero from "@/components/sections/LaunchHero"

export default async function Page({
    searchParams,
}: {
    searchParams: Promise<{ utm_source?: string }>
}) {
    const { utm_source } = await searchParams
    if (await isLaunched()) return <LaunchHero />

    return (
        <>
            <Nav />
            <main>
                <Hero source={utm_source} />
                <TrustBar />
                <Hook />
                <VoiceShowcase />
                <PracticeAvatars />
                <CoachRoster />
                <HowItWorks />
                <HowShedFeel />
                <Features />
                <LectureShowcase />
                <SkillPath />
                <Vision />
                <Testimonials />
                <FinalCTA source={utm_source} />
            </main>
            <Footer />
        </>
    )
}