"use client";

import {
  create,
} from "zustand";

import {
  persist,
} from "zustand/middleware";

const MAX_COMPARE_PROJECTS = 3;

interface ProjectPreferencesState {
  favoriteSlugs: string[];
  compareSlugs: string[];

  toggleFavorite: (
    slug: string
  ) => void;

  addToCompare: (
    slug: string
  ) => boolean;

  removeFromCompare: (
    slug: string
  ) => void;

  clearCompare: () => void;
}

export const useProjectPreferences =
  create<ProjectPreferencesState>()(
    persist(
      (set, get) => ({
        favoriteSlugs: [],
        compareSlugs: [],

        toggleFavorite: (
          slug
        ) => {
          set((state) => {
            const isFavorite =
              state.favoriteSlugs.includes(
                slug
              );

            return {
              favoriteSlugs:
                isFavorite
                  ? state.favoriteSlugs.filter(
                      (
                        currentSlug
                      ) =>
                        currentSlug !==
                        slug
                    )
                  : [
                      ...state.favoriteSlugs,
                      slug,
                    ],
            };
          });
        },

        addToCompare: (
          slug
        ) => {
          const {
            compareSlugs,
          } = get();

          if (
            compareSlugs.includes(
              slug
            )
          ) {
            return true;
          }

          if (
            compareSlugs.length >=
            MAX_COMPARE_PROJECTS
          ) {
            return false;
          }

          set({
            compareSlugs: [
              ...compareSlugs,
              slug,
            ],
          });

          return true;
        },

        removeFromCompare: (
          slug
        ) => {
          set((state) => ({
            compareSlugs:
              state.compareSlugs.filter(
                (
                  currentSlug
                ) =>
                  currentSlug !==
                  slug
              ),
          }));
        },

        clearCompare: () => {
          set({
            compareSlugs: [],
          });
        },
      }),
      {
        name:
          "justin-portfolio-project-preferences",

        partialize: (
          state
        ) => ({
          favoriteSlugs:
            state.favoriteSlugs,

          compareSlugs:
            state.compareSlugs,
        }),
      }
    )
  );