'use client'

import useIntersectionHide from "@/hooks/useIntersectionHide";
import { PrivacyPolicyPageData } from "@/lib/api/privacy-policy";
import { MarkdownContent } from "@/components/MarkdownContent";

type Props = {
    data: PrivacyPolicyPageData;
};

export default function PrivacyPolicyPage({ data}: Props) {
    const [titleRef, isTitleHidden] = useIntersectionHide<HTMLDivElement>({
        revealDelayMs: 150,
    });
    const [sec1Ref, isSec1Hidden] = useIntersectionHide<HTMLDivElement>();

    return (
        <main className='privacy_policy_page subpage'>
            <div ref={titleRef} className={`container opening reveal-on-scroll ${isTitleHidden ? 'hidden' : ''}`}>
                <div>
                    <h1>{data.title}</h1>
                    <h4>{data.title}</h4>
                </div>
                <span/>
            </div>
            <section className="about_content">
                <div className="text_content">
                    <div ref={sec1Ref} className={`container text ${isSec1Hidden ? "hidden" : ""}`}>
                        <MarkdownContent content={data.content}/>
                    </div>
                </div>
            </section>
        </main>
    )
}