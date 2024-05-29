export interface UserData {
  avatar_url: string;
  name: string;
  bio: string;
  followers: number;
  following: number;
  location: string;
  public_repos: number;
}

export interface RepoData {
  name: string;
  description: string;
  language: string;
  topics: string[];
  svn_url: string;
}
