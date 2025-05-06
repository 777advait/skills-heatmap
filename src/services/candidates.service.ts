import { env } from "~/env";
import type { ICandidateService, TCandidate } from "~/types/candidates.types";
import ky, { HTTPError } from "ky";
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
