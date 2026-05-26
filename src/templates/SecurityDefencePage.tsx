'use client'

import useIntersectionHide from "@/hooks/useIntersectionHide";
import { MarkdownContent } from "@/components/MarkdownContent";
import { SecurityDefencePageData } from "@/lib/api/security-defence";

type Props = {
    data: SecurityDefencePageData;
};

export default function SecurityDefencePage({ data}: Props) {
    const [sec1Ref, isSec1Hidden] = useIntersectionHide<HTMLDivElement>();
    const [sec2Ref, isSec2Hidden] = useIntersectionHide<HTMLDivElement>();

    return (
        <main className='security_defence_page subpage'>
            <div ref={sec1Ref} className={`container opening ${isSec1Hidden ? 'hidden' : ''}`}>
                <div>
                    <h1>{data.title}</h1>
                    <h4>{data.title}</h4>
                </div>
                <span/>
            </div>
            <section className="about_content">
                <div className="text_content">
                    <div ref={sec2Ref} className={`container text ${isSec2Hidden ? "hidden" : ""}`}>
                        <MarkdownContent content={data.content}/>
                    </div>
                </div>
            </section>
        </main>
    )
}