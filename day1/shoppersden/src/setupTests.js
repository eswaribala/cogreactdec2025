import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

// ✅ This line is what clears DOM after every test
afterEach(() => {
  cleanup();
});