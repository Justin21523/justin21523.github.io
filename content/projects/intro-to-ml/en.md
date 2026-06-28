---
title: "Intro to ML: Classical Machine Learning From Scratch"
tagline: "An intro ML curriculum hand-coding 20+ classic algorithms in pure NumPy"
summary: "A systematic, self-study introduction to machine learning spanning seven stages and roughly 40 Jupyter notebooks: linear models, basic classifiers, tree models, ensemble methods, SVMs, clustering, and dimensionality reduction. Every core algorithm is implemented from scratch in pure NumPy (no sklearn models), paired with mathematical derivations, visualizations, and worked exercise solutions emphasizing intuition and complexity analysis."
role: "Sole author and developer (self-study project)"
problem: "Most ML tutorials lean directly on high-level libraries like sklearn, leaving learners without a real grasp of the underlying mathematics, mechanics, or performance characteristics of each algorithm."
solution: "Built around a from-scratch philosophy: every classic algorithm is reimplemented in pure NumPy, organized progressively from math foundations through linear models, classification, trees, ensembles, SVMs, clustering, and dimensionality reduction. Each topic ships with a notebook, visualizations, a Markdown summary, and worked solutions; sklearn is used only to load sample datasets."
outcome: "Stages zero through seven are complete: about 40 teaching notebooks, 19+ topic summary documents, and thousands of lines of exercise solutions, with hand-coded algorithms including SMO, K-Means++, GMM-EM, DBSCAN, and t-SNE. Model evaluation and selection (stage eight) is still planned."
highlights:
  - "Seven stages and ~40 notebooks systematically covering supervised and unsupervised learning"
  - "Every core algorithm implemented from scratch in pure NumPy, with no reliance on sklearn models"
  - "Hand-coded advanced algorithms: SMO dual solver for SVM, EM for GMM, and t-SNE manifold learning"
  - "Full mathematical derivations and detailed exercise solutions (a single stage's solutions can run thousands of lines)"
  - "Rich decision-boundary and clustering visualizations to build intuition"
  - "Includes a parallelized K-Means variant exploring multi-threaded CPU speedups"
challenges:
  - "Correctly implementing more complex optimization algorithms such as SMO and EM without high-level libraries"
  - "Balancing mathematical rigor with beginner readability across derivation depth and teaching pace"
nextSteps:
  - "Complete stage eight: model evaluation, cross-validation, and hyperparameter selection"
  - "Add unit tests and sample datasets to improve reproducibility"
  - "Deploy the material as a browsable portfolio site (Docker/Nginx template already in place)"
---
## Overview

**Intro to ML** is a self-study curriculum for learning classical machine learning by hand-coding it from scratch. The goal is for learners to do more than call a library function: to genuinely understand each algorithm's mathematical intuition, implementation details, and complexity. The entire course reimplements core algorithms in pure NumPy, deliberately avoiding scikit-learn's ready-made models (borrowing only its dataset loaders).

## Structure

The course is organized into seven stages across roughly 40 Jupyter notebooks: math foundations; linear models (linear/polynomial/regularized regression, logistic regression, multiclass classification); basic classifiers (KNN, Naive Bayes, Perceptron, LDA/QDA); tree models (decision and regression trees); ensemble methods (Bagging, Random Forest, AdaBoost, Gradient Boosting); support vector machines (linear SVM, SMO dual, kernel SVM); unsupervised clustering (K-Means, hierarchical, GMM-EM, DBSCAN); and dimensionality reduction (PCA, Kernel PCA, SVD, t-SNE).

## Technical Focus

Each topic includes a from-scratch implementation, decision-boundary and result visualizations, a Markdown summary, and worked exercise solutions. The more challenging hand-coded pieces include the SMO algorithm for SVMs, EM iteration for GMMs, t-SNE manifold learning, and clustering with K-Means++ and a parallelized variant. The stack centers on Python, NumPy, and Matplotlib, with light use of SciPy.

## Honest Disclosure

This is a **learning-oriented** teaching project. Stages zero through seven are complete, while stage eight (model evaluation and selection) is still planned. The repository contains a Docker/Nginx deployment template, but the portfolio site is not yet actually deployed. The emphasis is on teaching completeness and algorithmic understanding rather than a production-grade library.
