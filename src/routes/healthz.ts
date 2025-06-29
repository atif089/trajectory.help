import { createServerFileRoute } from "@tanstack/react-start/server";
import { json } from "@tanstack/react-start";
import { setResponseStatus } from "@tanstack/react-start/server";

export const ServerRoute = createServerFileRoute("/healthz").methods({
  GET: async ({ request }) => {
    setResponseStatus(200);
    return json({ message: "OK" });
  },
});
