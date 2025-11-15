
import { LocalRecord } from "@/model/Local";
import { LocalListResponse } from "@/model/LocalListResponse ";
import { pb } from "@/services/pb";

export async function getLocais(filter?: string): Promise<LocalListResponse> {
  return await pb.collection("locais").getList<LocalRecord>(1, 50, {
    filter: filter
      ? `endereco ~ "${filter}" || cidade ~ "${filter}" || bairro ~ "${filter}"`
      : "",
    sort: "-created",
  });
}

export async function getAllLocais() {
  return await pb.collection("locais").getFullList({
    sort: "endereco",
  });
}
