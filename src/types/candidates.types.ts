export type TCandidate = {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  bio: string;
};

export interface ICandidateService {
  getCandidates(): Promise<TCandidate[]>;
  // getCandidate(id: string): Promise<TCandidate>;
}
