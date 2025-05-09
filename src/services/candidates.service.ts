import { env } from "~/env";
import type {
  ICandidateService,
  TCandidate,
} from "~/utils/types/candidates.types";
import { BaseService } from "./base.service";

class CandidatesService extends BaseService implements ICandidateService {
  constructor() {
    super(env.CANDIDATES_SERVICE_URL, "people");
  }

  async getCandidates(): Promise<TCandidate[]> {
    return await this.makeRequest<TCandidate[]>("/", "GET");
  }
}

export const candidatesService = new CandidatesService();
