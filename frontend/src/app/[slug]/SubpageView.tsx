"use client";

import useIntersectionHide from "@/app/hooks/useIntersectionHide";

type Props = {
    title: string;
    content: string;
};

export default function SubpageView({ title, content }: Props) {
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
        <div className="subpage">
            <div ref={sec1Ref} className={`container opening ${isSec1Hidden ? "hidden" : ""}`}>
                <h1>{title}</h1>
            </div>
            <div className="text_content">
                <div ref={sec2Ref} className={`container text ${isSec2Hidden ? "hidden" : ""}`}>
                    <div>{renderContent(content)}</div>
                </div>
            </div>
        </div>
    );
}