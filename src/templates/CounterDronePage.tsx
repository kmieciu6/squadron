'use client'

import { CounterDronePageData } from "@/lib/api/counter-drone";
import { MarkdownContent } from "@/components/MarkdownContent";
import useIntersectionHide from "@/hooks/useIntersectionHide";

type Props = {
    data: CounterDronePageData;
};

export default function CounterDronePage({ data}: Props) {
    const [titleRef, isTitleHidden] = useIntersectionHide<HTMLDivElement>({
        revealDelayMs: 150,
    });
    const [sec1Ref, isSec1Hidden] = useIntersectionHide<HTMLDivElement>();

    return (
        <main className='counter_drone_page subpage'>
            <div ref={titleRef} className={`container opening reveal-on-scroll ${isTitleHidden ? 'hidden' : ''}`}>
                <div>
                    <h1>{data.title}</h1>
                    <h4>{data.title}</h4>
                </div>
                <span/>
            </div>
            <section className="counter_drone_content">
                <div className="text_content">
                    <div ref={sec1Ref} className={`container text ${isSec1Hidden ? "hidden" : ""}`}>
                        <MarkdownContent content={data.content}/>
                    </div>
                </div>
            </section>
        </main>
    )
}