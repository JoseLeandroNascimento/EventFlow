import { LocalRecord } from "@/model/Local";
import { pb } from "./pb";

export type Evento = {
    id: string;
    nome: string;
    descricao: string;
    categoria: string;
    dataEvento: string;
    horaInicio: string;
    horaFim: string;
    latitude: number;
    longitude: number;
    imagens: string[];
    local: LocalRecord
};

export async function getEventos(search: string = "") {
    const filter = search
        ? `nome ~ "${search}" || descricao ~ "${search}" || categoria ~ "${search}"`
        : "";

    const list = await pb.collection("eventos").getFullList({
        filter,
        sort: "-created",
    });

    return list.map((e) => ({
        id: e.id,
        nome: e.nome,
        descricao: e.descricao,
        categoria: e.categoria,
        dataEvento: e.dataEvento,
        horaInicio: e.horaInicio,
        horaFim: e.horaFim,
        latitude: Number(e.latitude),
        longitude: Number(e.longitude),
        imagens: e.imagens?.map((img: string) =>
            `${pb.files.getUrl(e, img)}?v=${Date.now()}`
        ) ?? [],
    }));
}

export async function getEventoById(id: string): Promise<Evento> {
  const record = await pb.collection("eventos").getOne(id, {
    expand: "local"
  });

;

  return {
    id: record.id,
    nome: record.nome,
    descricao: record.descricao,
    categoria: record.categoria,
    dataEvento: record.dataEvento,
    horaInicio: record.horaInicio,
    horaFim: record.horaFim,
    latitude: record.latitude,
    longitude: record.longitude,
    imagens: record.imagens?.map((img: string) =>
      `${pb.baseUrl}/api/files/eventos/${record.id}/${img}`
    ) || [],
    local: record.expand?.local || null,
  };
}

export async function deleteEvento(id: string) {
  return await pb.collection("eventos").delete(id);
}


