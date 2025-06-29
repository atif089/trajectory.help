import { createServerFileRoute } from "@tanstack/react-start/server";
import { json } from "@tanstack/react-start";

export const ServerRoute = createServerFileRoute("/api/hello").methods({
  GET: async ({ request }) => {
    console.info("Fetching hello... @", request.url);
    return json({ message: "Hello World" });
  },
});
