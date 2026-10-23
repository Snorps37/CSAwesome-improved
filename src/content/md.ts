/** Tagged template for markdown: raw backslashes, and § stands in for a backtick. */
export const md = (strings: TemplateStringsArray, ...vals: unknown[]) => String.raw(strings, ...vals);
