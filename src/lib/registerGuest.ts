import axios from "axios";
import type { GuestData } from "@/types/libTypes";
import { LocalStorageManager } from "@/services/storage";
import { toast } from "react-hot-toast";

const API_URL = import.meta.env.VITE_SUPABASE_EDGE_URL;

export async function getOrCreateGuest(): Promise<GuestData | null> {
  try {
    const url = `${API_URL}/register-guest`;

    const res = await axios.post(
      url,
      {},
      {
        timeout: 10_000,
      }
    );

    if (res.status === 403) {
      toast.error(res.data?.error || "Guest access limit reached. Please sign in.");
      return null;
    }

    const data: GuestData = res.data;

    LocalStorageManager.set("guest_user", data);

    return data;
  } catch (err: any) {
    // if (axios.isAxiosError(err)) {
    //   const serverMsg = err.response?.data?.error || err.message;
    //   toast.error("Failed to register guest. " + (serverMsg ? serverMsg : ""));
    // } else {
      toast.error("Failed to register guest. Please try again.");
    // }
    return null;
  }
}

export function clearGuestData() {
  LocalStorageManager.delete("guest_user");
}
