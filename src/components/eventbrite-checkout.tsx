
"use client";

export default function EventbriteCheckout() {
  return (
    <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 text-center">
      <h2 className="text-xl font-bold text-foreground dark:text-white mb-2">Ticket sales have ended</h2>
      <p className="text-muted-foreground">
        This Eventbrite checkout is no longer active. Please visit our events page for current tickets.
      </p>
    </div>
  );
}
