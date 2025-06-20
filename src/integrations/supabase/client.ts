
// Mock Supabase client for frontend-only operation
// This file maintains the same interface but doesn't connect to any backend

interface MockUser {
  id: string;
  email: string;
  user_metadata?: {
    first_name?: string;
    last_name?: string;
  };
}

interface MockSession {
  user: MockUser;
  access_token: string;
}

interface MockAuthResponse {
  data: {
    user: MockUser | null;
    session: MockSession | null;
  };
  error: Error | null;
}

interface MockSupabaseClient {
  auth: {
    signInWithPassword: (credentials: { email: string; password: string }) => Promise<MockAuthResponse>;
    signUp: (credentials: { email: string; password: string; options?: any }) => Promise<MockAuthResponse>;
    signInWithOAuth: (options: { provider: string; options?: any }) => Promise<MockAuthResponse>;
    signOut: () => Promise<{ error: Error | null }>;
    getSession: () => Promise<{ data: { session: MockSession | null }; error: Error | null }>;
    onAuthStateChange: (callback: (event: string, session: MockSession | null) => void) => { data: { subscription: { unsubscribe: () => void } } };
  };
  from: (table: string) => any;
  functions: {
    invoke: (functionName: string, options?: any) => Promise<any>;
  };
}

// Mock implementation that doesn't connect to any backend
const createMockSupabaseClient = (): MockSupabaseClient => ({
  auth: {
    signInWithPassword: async () => ({ data: { user: null, session: null }, error: null }),
    signUp: async () => ({ data: { user: null, session: null }, error: null }),
    signInWithOAuth: async () => ({ data: { user: null, session: null }, error: null }),
    signOut: async () => ({ error: null }),
    getSession: async () => ({ data: { session: null }, error: null }),
    onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } })
  },
  from: () => ({
    select: () => ({ data: [], error: null }),
    insert: () => ({ data: [], error: null }),
    update: () => ({ data: [], error: null }),
    delete: () => ({ data: [], error: null })
  }),
  functions: {
    invoke: async () => ({ data: null, error: null })
  }
});

export const supabase = createMockSupabaseClient();
