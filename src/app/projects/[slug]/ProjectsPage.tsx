"use client";

import useIntersectionHide from "@/hooks/useIntersectionHide";
import { MarkdownContent } from "@/components/MarkdownContent";
import { ProjectsPageData } from "@/lib/api/pages";

type Props = {
    data: ProjectsPageData;
};

export default function ProjectsPage({ data }: Props) {
    const [sec1Ref, isSec1Hidden] = useIntersectionHide<HTMLDivElement>();
    const [sec2Ref, isSec2Hidden] = useIntersectionHide<HTMLDivElement>();

    return (
        <main className="project_page subpage">
            <section className="projects_content">
                <div ref={sec1Ref} className={`container opening ${isSec1Hidden ? "hidden" : ""}`}>
                    <h1>{data.title}</h1>
                </div>

                <div className="text_content">
                    <div ref={sec2Ref} className={`container text ${isSec2Hidden ? "hidden" : ""}`}>
                        <MarkdownContent content={data.content} />
                    </div>
                </div>
            </section>
        </main>
    );
}