'use client'

import useIntersectionHide from "@/hooks/useIntersectionHide";
import { MarkdownContent } from "@/components/MarkdownContent";
import { UnmannedAviationPageData } from "@/lib/api/unmanned-aviation";

type Props = {
    data: UnmannedAviationPageData;
};

export default function UnmannedAviationPage({ data}: Props) {
    const [sec1Ref, isSec1Hidden] = useIntersectionHide<HTMLDivElement>();
    const [sec2Ref, isSec2Hidden] = useIntersectionHide<HTMLDivElement>();

    return (
        <main className='unmanned_aviation_page subpage'>
            <div ref={sec1Ref} className={`container opening ${isSec1Hidden ? 'hidden' : ''}`}>
                <div>
                    <h1>{data.title}</h1>
                    <h4>{data.title}</h4>
                </div>
                <span/>
            </div>
            <section className="unmanned_aviation_content">
                <div className="text_content">
                    <div ref={sec2Ref} className={`container text ${isSec2Hidden ? "hidden" : ""}`}>
                        <MarkdownContent content={data.content}/>
                    </div>
                </div>
            </section>
        </main>
    )
}