'use client'

import useIntersectionHide from "@/hooks/useIntersectionHide";
import { StudioPageData } from "@/lib/api/studio";
import { MarkdownContent } from "@/components/MarkdownContent";

type Props = {
    data: StudioPageData;
};

export default function StudioPage({ data}: Props) {
    const [sec1Ref, isSec1Hidden] = useIntersectionHide<HTMLDivElement>();
    const [sec2Ref, isSec2Hidden] = useIntersectionHide<HTMLDivElement>();

    return (
        <main className='studio_page subpage'>
            <div ref={sec1Ref} className={`container opening ${isSec1Hidden ? 'hidden' : ''}`}>
                <div>
                    <h1>{data.title}</h1>
                    <h4>{data.title}</h4>
                </div>
                <span/>
            </div>
            <section className="studio_content">
                <div className="text_content">
                    <div ref={sec2Ref} className={`container text ${isSec2Hidden ? "hidden" : ""}`}>
                        <MarkdownContent content={data.content}/>
                    </div>
                </div>
            </section>
        </main>
    )
}