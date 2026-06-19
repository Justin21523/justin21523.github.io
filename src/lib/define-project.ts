import type {
  Project,
  ProjectInput,
} from "@/types/projects";

export function defineProject(
  input: ProjectInput
): Project {
  return {
    ...input,

    links: input.links ?? [],
    media: input.media ?? [],

    metadata: {
      startedAt:
        input.metadata?.startedAt,

      updatedAt:
        input.metadata?.updatedAt ??
        `${input.year}-01-01`,

      duration:
        input.metadata?.duration,

      teamSize:
        input.metadata?.teamSize ?? 1,

      roles:
        input.metadata?.roles ?? [],

      platforms:
        input.metadata?.platforms ??
        ["Web"],

      domains:
        input.metadata?.domains ?? [],

      capabilities:
        input.metadata
          ?.capabilities ?? [],

      tools:
        input.metadata?.tools ?? [],

      keywords:
        input.metadata?.keywords ?? [],

      audiences:
        input.metadata?.audiences ?? [],

      dataTypes:
        input.metadata?.dataTypes ?? [],
    },
  };
}