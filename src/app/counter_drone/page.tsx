import CounterDronePage from "@/templates/CounterDronePage";
import { getCounterDronePage } from "@/lib/api/counter-drone";
import { notFound } from "next/navigation";
import { getRequestLocale } from "@/lib/i18n/getRequestLocale";

export default async function CounterDrone() {
    const locale = await getRequestLocale();
    const data = await getCounterDronePage(locale);

    if (!data) return notFound();

    return (
        <CounterDronePage data={data} />
    );
}