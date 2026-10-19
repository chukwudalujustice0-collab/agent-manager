// Cloudflare Pages Function providing runtime environment configuration
// This enables Cloudflare Pages to pass environment variables to the frontend
// even if the static bundle was built before variables were configured.

interface PagesContext {
  env: Record<string, string | undefined>;
}

export async function onRequestGet(context: PagesContext): Promise<Response> {
  const supabaseUrl =
    context.env.VITE_SUPABASE_URL ||
    context.env.SUPABASE_URL ||
    context.env.PUBLIC_SUPABASE_URL ||
    '';

  const supabaseAnonKey =
    context.env.VITE_SUPABASE_ANON_KEY ||
    context.env.SUPABASE_ANON_KEY ||
    context.env.PUBLIC_SUPABASE_ANON_KEY ||
    '';

  return new Response(
    JSON.stringify({
      supabaseUrl,
      supabaseAnonKey,
    }),
    {
      headers: {
        'content-type': 'application/json',
        'cache-control': 'public, max-age=60',
        'access-control-allow-origin': '*',
      },
    }
  );
}
