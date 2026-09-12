"use client";

import { useState, type ChangeEvent } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  SEMANTIC_COLOR_TOKENS,
  type SemanticColorToken,
} from "@/lib/semantic-colors";
import { useSemanticColors } from "@/components/semantic-color-controller";

const COLOR_GROUPS = ["Core interface", "Charts", "Sidebar"] as const;

export function SemanticColorCustomization() {
  const { colors, ready, setColor, shuffle, revert } = useSemanticColors();
  const [message, setMessage] = useState(
    "Choose a semantic color to update the app immediately."
  );

  if (!ready) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-8 sm:py-14">
        <section className="grid min-h-96 place-items-center bg-background px-6 py-12 text-center text-foreground sm:px-10">
          <p role="status" className="text-sm text-muted-foreground">
            Loading customization controls…
          </p>
        </section>
      </div>
    );
  }

  const handleColorChange =
    (token: SemanticColorToken) => (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setColor(token, value);
      setMessage(`${token} updated. The change is applied across the app.`);
    };

  const handleShuffle = () => {
    shuffle();
    setMessage("All exposed semantic colors were shuffled.");
  };

  const handleRevert = () => {
    revert();
    setMessage("Defaults restored. Saved semantic color overrides were removed.");
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-8 sm:py-14">
      <section className="bg-background px-4 py-6 text-foreground sm:px-8 sm:py-8">
        <header className="max-w-3xl">
          <p className="text-xs font-semibold tracking-[0.16em] text-primary uppercase">
            Theme controls
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-6xl">
            Customization
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
            Adjust the semantic color contract used by the product surfaces. Changes
            apply immediately and persist in this browser until you restore the
            defaults.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Button type="button" onClick={handleShuffle}>
              Shuffle
            </Button>
            <Button type="button" variant="outline" onClick={handleRevert}>
              Revert to defaults
            </Button>
            <p role="status" aria-live="polite" className="text-sm text-muted-foreground">
              {message}
            </p>
          </div>
        </header>

        <div className="mt-8 grid gap-6">
          {COLOR_GROUPS.map((group) => {
            const tokens = SEMANTIC_COLOR_TOKENS.filter(
              (token) => token.group === group
            );

            return (
              <Card key={group} className="border-border bg-card text-card-foreground">
                <CardHeader>
                  <CardTitle>{group}</CardTitle>
                  <CardDescription>
                    {group === "Core interface"
                      ? "The core surfaces, text, actions, and controls used throughout the demos."
                      : group === "Charts"
                        ? "Chart palette variables exposed by the shared theme contract."
                        : "Sidebar variables exposed by the shared theme contract."
                    }
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <fieldset className="grid gap-x-4 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
                    <legend className="sr-only">{group} semantic colors</legend>
                    {tokens.map((token) => {
                      const inputId = `semantic-color-${token.property.slice(2)}`;
                      return (
                        <div key={token.property} className="min-w-0">
                          <label
                            htmlFor={inputId}
                            className="mb-2 flex min-w-0 flex-col gap-1"
                          >
                            <span className="text-sm font-medium">{token.label}</span>
                            <code className="truncate text-xs text-muted-foreground">
                              {token.property}
                            </code>
                          </label>
                          <input
                            id={inputId}
                            type="color"
                            value={colors[token.property]}
                            onChange={handleColorChange(token.property)}
                            className="h-12 w-full cursor-pointer rounded-lg border border-input bg-background p-1 transition-colors focus-visible:border-ring focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
                            aria-label={`Choose ${token.label} color`}
                          />
                          <span className="mt-1 block font-mono text-[11px] text-muted-foreground">
                            {colors[token.property].toUpperCase()}
                          </span>
                        </div>
                      );
                    })}
                  </fieldset>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>
    </div>
  );
}
