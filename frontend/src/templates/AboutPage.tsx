'use client'

import useIntersectionHide from "@/hooks/useIntersectionHide";
import {AboutPageData} from "@/lib/strapi/about";

type Props = {
    data: AboutPageData;
};

export default function AboutPage({ data}: Props) {
    const [sec1Ref, isSec1Hidden] = useIntersectionHide<HTMLDivElement>();
    const [sec2Ref, isSec2Hidden] = useIntersectionHide<HTMLDivElement>();


    function renderContent(content: string) {
        const value = content.trim();

        const looksLikeHtml = /<\/?[a-z][\s\S]*>/i.test(value);
        if (looksLikeHtml) {
            const safe = value
                .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "")
                .replace(/\son\w+="[^"]*"/gi, "");

            return <div dangerouslySetInnerHTML={{ __html: safe }} />;
        }

        return (
            <div style={{ whiteSpace: "pre-wrap" }}>
                {value.replace(/\r\n/g, "\n").replace(/\r/g, "\n")}
            </div>
        );
    }

    return (
        <main className='about_page subpage'>
            <section className="about_content">
                <div ref={sec1Ref} className={`container ${isSec1Hidden ? 'hidden' : ''}`}>
                    <h1>{data.title}</h1>
                </div>

                <div className="text_content">
                    <div ref={sec2Ref} className={`container text ${isSec2Hidden ? "hidden" : ""}`}>
                        <div>{renderContent(data.content)}</div>
                    </div>
                </div>
            </section>
        </main>
    )
}