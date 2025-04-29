
export interface UserProfile {
  id: string;
  user_id: string;
  nombre_completo: string;
  rol?: string;
  avatar_url?: string;
  created_at?: string;
}

export interface Session {
  user: {
    id: string;
    email: string;
    aud: string;
  };
  access_token: string;
  refresh_token: string;
}

export type AuthUser = {
  id: string;
  email: string;
  profile?: UserProfile | null;
};
