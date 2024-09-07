import createStorage from "@/utils/storage/createStorage";

const storage = createStorage();

export const userStorage = storage.create("user");
