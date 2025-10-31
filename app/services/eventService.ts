import { pb } from "./pocketbase";

export interface CreateEventData {
    id: string;
    name: string;
    desc?: string;
    category?: string;
    date: string;        // YYYY-MM-DD
    startTime?: string;  // ISO full (YYYY-MM-DDTHH:mm:ssZ)
    endTime?: string;    // ISO full (YYYY-MM-DDTHH:mm:ssZ)
    place?: string;
    lat?: number;
    lng?: number;
    images: string[];
}


export async function getEventos(): Promise<CreateEventData[]> {
    const records = await pb.collection("events").getFullList<CreateEventData>({
        sort: "-created",
    });
    console.log(records);
    
    return records;
}

export const getImageUrl = (collection: string, recordId: string, fileName: string) => {
  if (!fileName) return "https://via.placeholder.com/400x200?text=Sem+Imagem";
  return `${pb.baseUrl}/api/files/${collection}/${recordId}/${fileName}`;
};


export async function createEvento(data: CreateEventData) {
    try {
        const form = new FormData();

        form.append("name", data.name);
        form.append("desc", data.desc || "");
        form.append("category", data.category || "");
        form.append("date", data.date);

        // ⏰ Formato correto para campos tipo "date" no PB
        if (data.startTime) form.append("startTime", data.startTime);
        if (data.endTime) form.append("endTime", data.endTime);

        form.append("place", data.place || "");
        form.append("lat", String(data.lat || 0));
        form.append("lng", String(data.lng || 0));

        if (data.images?.length) {
            data.images.forEach((uri, i) => {
                form.append("images", {
                    uri,
                    name: `image_${i}.jpg`,
                    type: "image/jpeg",
                } as any);
            });
        }

        const created = await pb.collection("events").create(form);
        return created;
    } catch (error) {
        console.error("Erro ao criar evento:", error);
        throw error;
    }
}
