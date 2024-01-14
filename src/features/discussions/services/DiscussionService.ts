import { Http } from "@/features/http/repository/http";
import { DiscussionsConstants } from "../constants";

export class DiscussionsServices {
  static getUserDiscussions = async (id: string) => {
    try {
      return await Http.get(`${DiscussionsConstants.CHAT}/${id}`);
    } catch (error) {
      return error;
    }
  };
}
