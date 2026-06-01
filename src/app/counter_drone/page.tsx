import CounterDronePage from "@/templates/CounterDronePage";
import { cookies } from "next/headers";
import { getCounterDronePage } from "@/lib/api/counter-drone";
import { notFound } from "next/navigation";

export default async function CounterDrone() {
    const cookieStore = await cookies();
    const locale = cookieStore.get("locale")?.value ?? "en";
    const data = await getCounterDronePage(locale);

    if (!data) return notFound();

    return (
        <CounterDronePage data={data} />
    );
}