"use client";

import * as React from "react";
import { DemoShell } from "@/components/demos/demo-shell";

export function HiddenInformationCond2({
  mode = "user", annotations = [], onRestart,
}: {
  mode?: "user" | "auditor";
  annotations?: import("@/components/demos/demo-shell").AnnotationItem[];
  onRestart?: () => void;
} = {}) {
  const reset = () => {};

  const stats = mode === "auditor" ? (
    <>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Total word count</span>
        <span className="font-mono font-semibold">1,247 words</span>
      </div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Critical clause position</span>
        <span className="font-mono font-semibold">Paragraph 14 of 18</span>
      </div>
    </>
  ) : null;

  return (
    <DemoShell mode={mode} annotations={annotations} onRestart={onRestart ?? reset}
      title="Hidden Information: Structural Burial in High-Density Text"
      caption="Structural Burial in High-Density Text — subscription duration buried in a wall of text." auditorStats={stats}>
      <div className="space-y-3">
        <div className="rounded-md border bg-foreground/5 p-3 text-xs">

          {/* Subscription offer */}
          <div className="rounded-lg border-2 border-purple-500/40 bg-purple-500/5 p-4 text-center">
            <div className="text-xs font-bold uppercase tracking-wide text-purple-600 dark:text-purple-400">Premium Access</div>
            <div className="mt-1 text-2xl font-extrabold">$4.99<span className="text-xs font-normal">/mo</span></div>
            <button className="mt-2 w-full rounded-lg bg-purple-600 py-2 text-xs font-semibold text-white">
              Subscribe Now
            </button>
          </div>

          {/* Scrollable wall of text */}
          <div className="mt-2 rounded-md border border-foreground/10 bg-foreground/[0.02]">
            <div className="px-2 py-1 text-[8px] font-semibold uppercase tracking-wider text-muted-foreground/50 border-b border-foreground/5">
              Terms & Conditions
            </div>
            <div className="h-48 overflow-y-auto px-2.5 py-2 text-[8px] leading-relaxed text-foreground/40 space-y-2">

              <p>
                1. General Terms. By accessing or using the Services provided by Premium Access Inc. ("Company"), you agree to be bound by these Terms and Conditions ("Terms"). If you do not agree to these Terms, you may not access or use the Services. These Terms constitute a legally binding agreement between you and the Company.
              </p>
              <p>
                2. Eligibility. You must be at least 18 years of age to use the Services. By using the Services, you represent and warrant that you are at least 18 years old and have the legal capacity to enter into these Terms.
              </p>
              <p>
                3. Account Registration. You may be required to register an account to access certain features of the Services. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.
              </p>
              <p>
                4. Privacy Policy. Your use of the Services is also governed by our Privacy Policy, which is incorporated into these Terms by reference. Please review our Privacy Policy to understand our practices regarding the collection, use, and disclosure of your personal information.
              </p>
              <p>
                5. User Content. The Services may allow you to create, upload, post, send, receive, and store content. You retain ownership of any intellectual property rights that you hold in such content.
              </p>
              <p>
                6. Acceptable Use. You agree not to use the Services for any unlawful purpose or in any way that could damage, disable, overburden, or impair the Services.
              </p>
              <p>
                7. Intellectual Property. All content, features, and functionality of the Services are owned by the Company and are protected by copyright, trademark, and other intellectual property laws.
              </p>
              <p>
                8. Termination. The Company may terminate or suspend your access to the Services at any time, with or without cause, with or without notice. Upon termination, your right to use the Services will immediately cease.
              </p>
              <p>
                9. Limitation of Liability. In no event shall the Company be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the Services.
              </p>
              <p>
                10. Indemnification. You agree to indemnify, defend, and hold harmless the Company, its officers, directors, employees, agents, and affiliates from and against any claims, liabilities, damages, losses, and expenses arising out of or in any way connected with your access to or use of the Services.
              </p>
              <p>
                11. Governing Law. These Terms shall be governed by and construed in accordance with the laws of the State of Delaware, without regard to its conflict of law provisions.
              </p>
              <p>
                12. Dispute Resolution. Any dispute arising out of or relating to these Terms or the Services shall be resolved through binding arbitration in accordance with the rules of the American Arbitration Association.
              </p>
              <p>
                13. Modifications. The Company reserves the right to modify these Terms at any time. Changes will be effective immediately upon posting. Your continued use of the Services after any changes constitutes acceptance of the new Terms.
              </p>
              {/* THE CRITICAL CLAUSE — buried deep */}
              <p>
                14. Subscription Duration. Your subscription commitment begins on the date of purchase and continues for a minimum period of twenty-four (24) months. Early termination of the subscription before the end of the commitment period will result in an early cancellation fee of fifty dollars ($50.00), which will be charged to the payment method on file. The subscription will automatically renew for successive twelve (12) month periods unless cancelled at least thirty (30) days prior to the end of the current commitment period.
              </p>
              <p>
                15. Severability. If any provision of these Terms is held to be unenforceable or invalid, such provision will be modified to the minimum extent necessary to make it enforceable, and the remaining provisions shall remain in full force and effect.
              </p>
              <p>
                16. Entire Agreement. These Terms, together with the Privacy Policy, constitute the entire agreement between you and the Company regarding the use of the Services, superseding any prior agreements.
              </p>
              <p>
                17. Waiver. The failure of the Company to exercise or enforce any right or provision of these Terms shall not constitute a waiver of such right or provision.
              </p>
              <p>
                18. Contact. If you have any questions about these Terms, please contact us at support@premiumaccess.example.com.
              </p>
            </div>
          </div>

          <div className="mt-1.5 text-center text-[8px] text-muted-foreground/40">
            By subscribing you agree to the Terms & Conditions above
          </div>
        </div>
      </div>
    </DemoShell>
  );
}
