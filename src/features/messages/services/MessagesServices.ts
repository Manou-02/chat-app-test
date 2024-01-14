import { Http } from "@/features/http/repository/http";
import { MessageConstants } from "../constants";

export class MessagesServices {
  static getMessagesDiscussions = async (id: string) => {
    try {
      return await Http.get(`${MessageConstants.MESSAGE}/${id}`);
    } catch (error) {
      return error;
    }
  };
}
