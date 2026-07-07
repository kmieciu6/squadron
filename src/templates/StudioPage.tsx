'use client'

import useIntersectionHide from "@/hooks/useIntersectionHide";
import { StudioPageData } from "@/lib/api/studio";
import { MarkdownContent } from "@/components/MarkdownContent";
import LazySection from "@/components/LazySection";

type Props = {
    data: StudioPageData;
};

export default function StudioPage({ data}: Props) {
    const [titleRef, isTitleHidden] = useIntersectionHide<HTMLDivElement>({
        revealDelayMs: 150,
    });
    const [sec1Ref, isSec1Hidden] = useIntersectionHide<HTMLDivElement>();

    return (
        <main className='studio_page subpage'>
            <div ref={titleRef} className={`container opening reveal-on-scroll ${isTitleHidden ? 'hidden' : ''}`}>
                <div>
                    <h1>{data.title}</h1>
                    <h4>{data.title}</h4>
                </div>
                <span/>
            </div>
            <LazySection className="studio_content" placeholderHeight="80vh">
                <div className="text_content">
                    <div ref={sec1Ref} className={`container text ${isSec1Hidden ? "hidden" : ""}`}>
                        <MarkdownContent content={data.content}/>
                    </div>
                </div>
            </LazySection>
        </main>
    )
}