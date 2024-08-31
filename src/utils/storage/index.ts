import createStorage from "@/utils/storage/createStorage";

const storage = createStorage();

export const emailStorage = storage.create("email");
