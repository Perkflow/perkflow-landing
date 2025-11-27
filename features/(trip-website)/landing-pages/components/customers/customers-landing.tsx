"use client";
import React from "react";
import Link from "next/link";

export default function CustomersLanding() {
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-4 py-20">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900">Customers</h1>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            See how teams use Perkflow to increase engagement, recognition,
            and results. Case studies and customer stories are coming soon.
          </p>

          <div className="mt-8 flex items-center justify-center gap-4">
            <Link
              href="/contact"
              className="rounded-md bg-sky-600 px-5 py-3 text-sm font-medium text-white hover:bg-sky-700"
            >
              Contact sales
            </Link>
            <Link
              href="/waitlist"
              className="rounded-md border border-slate-200 px-5 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Join the waitlist
            </Link>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg border p-6">
            <h3 className="text-lg font-semibold">Short case study</h3>
            <p className="mt-2 text-sm text-gray-600">Placeholder for a customer story highlighting a measurable result.</p>
          </div>
          <div className="rounded-lg border p-6">
            <h3 className="text-lg font-semibold">Testimonial</h3>
            <p className="mt-2 text-sm text-gray-600">Placeholder for a quote from a satisfied customer.</p>
          </div>
          <div className="rounded-lg border p-6">
            <h3 className="text-lg font-semibold">Metrics</h3>
            <p className="mt-2 text-sm text-gray-600">Placeholder for a short list of impact metrics (engagement, retention...)</p>
          </div>
        </div>
      </div>
    </div>
  );
}
