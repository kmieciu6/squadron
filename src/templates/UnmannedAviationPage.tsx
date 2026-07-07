'use client'

import useIntersectionHide from "@/hooks/useIntersectionHide";
import { MarkdownContent } from "@/components/MarkdownContent";
import { UnmannedAviationPageData } from "@/lib/api/unmanned-aviation";
import LazySection from "@/components/LazySection";

type Props = {
    data: UnmannedAviationPageData;
};

export default function UnmannedAviationPage({ data}: Props) {
    const [titleRef, isTitleHidden] = useIntersectionHide<HTMLDivElement>({
        revealDelayMs: 150,
    });
    const [sec1Ref, isSec1Hidden] = useIntersectionHide<HTMLDivElement>();

    return (
        <main className='unmanned_aviation_page subpage'>
            <div ref={titleRef} className={`container opening reveal-on-scroll ${isTitleHidden ? 'hidden' : ''}`}>
                <div>
                    <h1>{data.title}</h1>
                    <h4>{data.title}</h4>
                </div>
                <span/>
            </div>
            <LazySection className="unmanned_aviation_content" placeholderHeight="80vh">
                <div className="text_content">
                    <div ref={sec1Ref} className={`container text ${isSec1Hidden ? "hidden" : ""}`}>
                        <MarkdownContent content={data.content}/>
                    </div>
                </div>
            </LazySection>
        </main>
    )
}