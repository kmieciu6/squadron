"use client";

import useIntersectionHide from "@/hooks/useIntersectionHide";
import { MarkdownContent } from "@/components/MarkdownContent";
import { ProjectsPageData } from "@/lib/api/projects";
import Image from "next/image";

type Props = {
    data: ProjectsPageData;
};

export default function ProjectsPage({ data }: Props) {
    const [titleRef, isTitleHidden] = useIntersectionHide<HTMLDivElement>({
        revealDelayMs: 150,
    });
    const [sec1Ref, isSec1Hidden] = useIntersectionHide<HTMLDivElement>();
    const [sec2Ref, isSec2Hidden] = useIntersectionHide<HTMLDivElement>();
    const [sec3Ref, isSec3Hidden] = useIntersectionHide<HTMLDivElement>();
    const [sec4Ref, isSec4Hidden] = useIntersectionHide<HTMLDivElement>();
    const [sec5Ref, isSec5Hidden] = useIntersectionHide<HTMLDivElement>();

    const image = data.image;

    return (
        <main className="project_page subpage">
            <section className="projects_content">
                <div
                    ref={titleRef}
                    className={`opening reveal-on-scroll ${isTitleHidden ? "hidden" : ""}`}
                >
                    {image?.url && (
                        <Image
                            src={image.url}
                            alt={image.alternativeText || data.title}
                            width={1920}
                            height={1080}
                            priority
                            sizes="100vw"
                            className="opening_image"
                        />
                    )}

                    <div className="opening_overlay" />

                    {/*<div className="opening_content">*/}
                    {/*    <h1>{data.title}</h1>*/}
                    {/*</div>*/}
                </div>

                <div className="text_content">
                    <div
                        ref={sec1Ref}
                        className={`container text ${isSec1Hidden ? "hidden" : ""}`}
                    >
                        <MarkdownContent content={data.content1} />
                    </div>
                    <div
                        ref={sec2Ref}
                        className={`container text ${isSec2Hidden ? "hidden" : ""}`}
                    >
                        <MarkdownContent content={data.content2} />
                    </div>
                    <div
                        ref={sec3Ref}
                        className={`container text ${isSec3Hidden ? "hidden" : ""}`}
                    >
                        <MarkdownContent content={data.content3} />
                    </div>
                    <div
                        ref={sec4Ref}
                        className={`container text ${isSec4Hidden ? "hidden" : ""}`}
                    >
                        <MarkdownContent content={data.content4} />
                    </div>
                    <div
                        ref={sec5Ref}
                        className={`container text ${isSec5Hidden ? "hidden" : ""}`}
                    >
                        <MarkdownContent content={data.content5} />
                    </div>
                </div>
            </section>
        </main>
    );
}