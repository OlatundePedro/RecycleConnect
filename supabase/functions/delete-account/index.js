import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

Deno.serve(async (req) => {
  try {
    // Only allow POST
    if (req.method !== "POST") {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Method not allowed",
        }),
        {
          status: 405,
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
    }

    // Create client using the user's JWT
    const supabaseUser = createClient(
      Deno.env.get("SUPABASE_URL"),
      Deno.env.get("SUPABASE_ANON_KEY"),
      {
        global: {
          headers: {
            Authorization: req.headers.get("Authorization") || "",
          },
        },
      },
    );

    // Get authenticated user
    const {
      data: { user },
      error: userError,
    } = await supabaseUser.auth.getUser();

    if (userError || !user) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Unauthorized",
        }),
        {
          status: 401,
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
    }

    // Create admin client using the server-side secret
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL"),
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY"),
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      },
    );

    console.log("Deleting user:", user.id);

    // Delete the authenticated user permanently
    const { error: deleteError } = await supabaseAdmin.auth.admin.deleteUser(
      user.id,
      false,
    );

    if (deleteError) {
      console.error("SUPABASE DELETE ERROR:", deleteError);

      return new Response(
        JSON.stringify({
          success: false,
          message: deleteError.message,
        }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Account deleted successfully.",
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  } catch (error) {
    console.error("DELETE ACCOUNT FUNCTION ERROR:", error);

    return new Response(
      JSON.stringify({
        success: false,
        message: error?.message || "Internal server error",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }
});
