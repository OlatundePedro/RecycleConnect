import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

Deno.serve(async (req) => {
  try {
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

    const body = await req.json();

    const { amount, accountNumber, accountName, bankCode, bankName } = body;

    if (!amount || Number(amount) <= 0) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Invalid withdrawal amount",
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
    }

    if (!accountNumber || !bankCode) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Bank account details are required",
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
    }

    console.log("Withdrawal request:", {
      userId: user.id,
      amount,
      accountNumber,
      accountName,
      bankCode,
      bankName,
    });

    /*
     * FLUTTERWAVE WITHDRAWAL WILL GO HERE.
     *
     * IMPORTANT:
     * Do NOT put your Flutterwave secret key in the Expo app.
     *
     * The secret key should be stored as a Supabase Edge Function secret.
     */

    return new Response(
      JSON.stringify({
        success: true,
        message: "Withdrawal request received.",
        data: {
          amount: Number(amount),
          accountNumber,
          accountName,
          bankCode,
          bankName,
        },
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  } catch (error) {
    console.error("WITHDRAW FUNCTION ERROR:", error);

    return new Response(
      JSON.stringify({
        success: false,
        message:
          error instanceof Error ? error.message : "Internal server error",
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
